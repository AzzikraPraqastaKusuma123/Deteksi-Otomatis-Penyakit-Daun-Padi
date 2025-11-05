
import { InferenceSession, Tensor } from 'onnxruntime-node';
import sharp from 'sharp';
import path from 'path';
import db from "../config/db.js"; // Import the database connection

const modelPath = path.resolve(process.cwd(), '../model/best_resnet50v2.onnx');
const labels = ['bacterial_leaf_blight', 'brown_spot', 'healthy', 'leaf_blast', 'leaf_scald', 'narrow_brown_spot', 'neck_blast', 'rice_hispa', 'sheath_blight', 'tungro'];

let session;

async function loadModel() {
  try {
    session = await InferenceSession.create(modelPath);
    console.log('ONNX model loaded successfully.');
  } catch (error) {
    console.error('Failed to load ONNX model:', error);
    throw error;
  }
}

function softmax(arr) {
    const max = Math.max(...arr);
    const exps = arr.map(x => Math.exp(x - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(x => x / sum);
}

async function runInference(imageBuffer) {
  if (!session) {
    throw new Error('Model session is not initialized. Call loadModel() first.');
  }

  console.log('Backend: Starting inference...');

  try {
    // 1. Resize and get raw, interleaved pixel data (RGBRGBRGB...)
    const rawPixelData = await sharp(imageBuffer)
      .resize(224, 224, { fit: 'fill' })
      .removeAlpha() // Ensure 3 channels
      .raw()
      .toBuffer();

    console.log('Backend: Image preprocessed successfully.');

    // 2. Normalize the interleaved data directly for NHWC format
    const tensorData = new Float32Array(rawPixelData.length);
    for (let i = 0; i < rawPixelData.length; i++) {
      tensorData[i] = rawPixelData[i] / 255.0;
    }

    console.log('Backend: Image normalized for NHWC format.');

    // 3. Create the tensor with the correct NHWC shape [1, 224, 224, 3]
    const inputTensor = new Tensor('float32', tensorData, [1, 224, 224, 3]);
    console.log('Backend: Input tensor created with shape [1, 224, 224, 3].');

    const inputName = session.inputNames[0];
    const feeds = { [inputName]: inputTensor };

    // 4. Run the model
    console.log('Backend: Running model inference...');
    const results = await session.run(feeds);
    console.log('Backend: Inference completed.');

    const outputName = session.outputNames[0];
    const outputData = results[outputName].data;

    // 5. Post-process the output
    const probabilities = softmax(Array.from(outputData));

    let predictedDiseaseName = "Unknown Disease";
    let maxProb = 0;

    if (probabilities.length > 0) {
      maxProb = Math.max(...probabilities);
      const maxIndex = probabilities.indexOf(maxProb);

      if (maxIndex >= 0 && maxIndex < labels.length) {
        predictedDiseaseName = labels[maxIndex];
      }
    }

    console.log(`Backend: Prediction: ${predictedDiseaseName}, Confidence: ${maxProb}`);

    // Fetch disease details from the database
    const diseaseDetails = await new Promise((resolve, reject) => {
      const query = "SELECT description, treatment_recommendations FROM diseases WHERE disease_name = ?";
      db.query(query, [predictedDiseaseName], (err, results) => {
        if (err) {
          console.error("Backend: Error fetching disease details:", err);
          return resolve({ description: "Error fetching description.", prevention: "Error fetching prevention tips." });
        }
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve({ description: "No description available.", treatment_recommendations: "No prevention tips available." });
        }
      });
    });

    return {
      disease: predictedDiseaseName,
      confidence: maxProb,
      description: diseaseDetails.description,
      prevention: diseaseDetails.treatment_recommendations, // Map to prevention
    };
  } catch (error) {
    console.error("Backend: Error during inference run:", error);
    throw error;
  }
}

export { loadModel, runInference };
