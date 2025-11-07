// backend/services/detectionService.js
import { InferenceSession, Tensor } from 'onnxruntime-node';
import sharp from 'sharp';
import path from 'path';
import db from "../config/db.js";

const modelPath = path.resolve(process.cwd(), '../model/best_resnet50v2.onnx');

const labels = [
  'Bacterial Leaf Blight',
  'Brown Spot',
  'Healthy Rice Leaf',
  'Leaf Blast',
  'Leaf Scald',
  'Narrow Brown Leaf Spot',
  'Rice Hispa',
  'Sheath Blight'
];

let session = null;

export async function loadModel() {
  try {
    console.log("🧠 Loading ONNX model:", modelPath);
    session = await InferenceSession.create(modelPath);
    console.log('✅ Model loaded successfully.');
  } catch (error) {
    console.error('❌ Failed to load ONNX model:', error);
    throw error;
  }
}

function softmax(arr) {
  const max = Math.max(...arr);
  const exp = arr.map(x => Math.exp(x - max));
  const sum = exp.reduce((a, b) => a + b, 0);
  return exp.map(x => x / sum);
}

export async function runInference(imageBuffer) {
  if (!session) throw new Error('Model not initialized. Run loadModel() first.');

  try {
    const raw = await sharp(imageBuffer)
      .resize(224, 224)
      .toColorspace('srgb')
      .removeAlpha()
      .raw()
      .toBuffer();

    const float32Data = new Float32Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      float32Data[i] = (raw[i] / 127.5) - 1.0; // [-1, 1] normalisasi TF
    }

    const inputTensor = new Tensor('float32', float32Data, [1, 224, 224, 3]);
    const feeds = { [session.inputNames[0]]: inputTensor };
    const results = await session.run(feeds);

    const output = results[session.outputNames[0]].data;
    const probs = softmax(Array.from(output));

    const maxProb = Math.max(...probs);
    const maxIndex = probs.indexOf(maxProb);
    const predictedDiseaseName = labels[maxIndex] || "Unknown Disease";

    console.log(`✅ Prediction: ${predictedDiseaseName}, Confidence: ${maxProb.toFixed(4)}`);

    // --- PERBAIKAN DIMULAI DISINI ---
    const diseaseDetails = await new Promise((resolve) => {
      db.query(
        // 1. Mengganti 'name' menjadi 'disease_name' agar sesuai dengan DB
        // 2. Menambahkan 'treatment_recommendations' ke query
        "SELECT description, prevention, treatment_recommendations FROM diseases WHERE disease_name = ?",
        [predictedDiseaseName],
        (err, results) => {
          if (err) {
            console.error("Error fetching disease details:", err);
            return resolve({
              description: "No description found.",
              prevention: "No prevention tips available.",
              treatment_recommendations: "No treatment recommendations available." // Default
            });
          }
          // Memberikan nilai default jika 'results[0]' kosong
          resolve(results[0] || {
            description: "No description available.",
            prevention: "No prevention tips available.",
            treatment_recommendations: "No treatment recommendations available."
          });
        }
      );
    });

    return {
      disease: predictedDiseaseName,
      confidence: Number(maxProb.toFixed(4)),
      description: diseaseDetails.description,
      prevention: diseaseDetails.prevention,
      treatment_recommendations: diseaseDetails.treatment_recommendations // 3. Menambahkan data baru ke return
    };
    // --- PERBAIKAN SELESAI DISINI ---
  } catch (error) {
    console.error("❌ Error during inference:", error);
    throw error;
  }
}