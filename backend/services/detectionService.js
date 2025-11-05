// backend/services/detectionService.js
import { InferenceSession, Tensor } from 'onnxruntime-node';
import sharp from 'sharp';
import path from 'path';
import db from "../config/db.js";

// 🧠 Lokasi model di luar folder backend → gunakan ../model/
const modelPath = path.resolve(process.cwd(), '../model/best_resnet50v2.onnx');

// Label sesuai dengan kelas model kamu
const labels = [
  'Bacterial Leaf Blight',
  'Brown Spot',
  'Healthy Rice Leaf',
  'Leaf Blast',
  'Leaf scald',
  'Narrow Brown Leaf Spot',
  'Rice Hispa',
  'Sheath Blight'
];

let session = null;

/**
 * 🧩 Load model ONNX saat server mulai
 */
export async function loadModel() {
  try {
    console.log("Loading ONNX model from:", modelPath);
    session = await InferenceSession.create(modelPath);
    console.log('✅ ONNX model loaded successfully.');
  } catch (error) {
    console.error('❌ Failed to load ONNX model:', error);
    throw error;
  }
}

/**
 * 🔢 Fungsi Softmax untuk menghitung probabilitas
 */
function softmax(arr) {
  const max = Math.max(...arr);
  const exps = arr.map(x => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(x => x / sum);
}

/**
 * 🧠 Proses inferensi gambar
 */
export async function runInference(imageBuffer) {
  if (!session) {
    throw new Error('Model session is not initialized. Call loadModel() first.');
  }

  console.log('Backend: Starting inference...');

  try {
    // 1️⃣ Resize & preprocessing gambar → 224x224 RGB
    const raw = await sharp(imageBuffer)
      .resize(224, 224)
      .removeAlpha()
      .raw()
      .toBuffer();

    console.log('Backend: Image preprocessed successfully.');

    // 2️⃣ Normalisasi piksel (0–1)
    const float32Data = new Float32Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      float32Data[i] = raw[i] / 255.0;
    }

    // 3️⃣ Bentuk tensor [1, 224, 224, 3] (NHWC)
    const inputTensor = new Tensor('float32', float32Data, [1, 224, 224, 3]);

    // 4️⃣ Jalankan model
    const feeds = { [session.inputNames[0]]: inputTensor };
    const results = await session.run(feeds);

    const outputName = session.outputNames[0];
    const output = results[outputName].data;
    console.log('Backend: Model inference completed.');

    // 5️⃣ Konversi ke probabilitas & ambil hasil tertinggi
    const probs = softmax(Array.from(output));
    const maxProb = Math.max(...probs);
    const maxIndex = probs.indexOf(maxProb);
    const predictedDiseaseName = labels[maxIndex] || "Unknown Disease";

    console.log(`✅ Prediction: ${predictedDiseaseName}, Confidence: ${maxProb.toFixed(4)}`);

    // 6️⃣ Ambil detail penyakit dari database
    const diseaseDetails = await new Promise((resolve) => {
      const query = `
        SELECT description, prevention
        FROM diseases
        WHERE name = ?
      `;
      db.query(query, [predictedDiseaseName], (err, results) => {
        if (err) {
          console.error("Error fetching disease details:", err);
          return resolve({
            description: "Error fetching description.",
            prevention: "Error fetching prevention tips.",
          });
        }
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve({
            description: "No description available.",
            prevention: "No prevention tips available.",
          });
        }
      });
    });

    // 7️⃣ Kembalikan hasil lengkap
    return {
      disease: predictedDiseaseName,
      confidence: Number(maxProb.toFixed(4)),
      description: diseaseDetails.description,
      prevention: diseaseDetails.prevention,
    };
  } catch (error) {
    console.error("❌ Error during inference run:", error);
    throw error;
  }
}
