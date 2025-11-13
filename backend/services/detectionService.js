// backend/services/detectionService.js
import { InferenceSession, Tensor } from 'onnxruntime-node';
import sharp from 'sharp';
import path from 'path';
import db from "../config/db.js";
import axios from 'axios';
import 'dotenv/config';

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

export async function getGenerativeInfo(diseaseName) {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not found. Skipping generative info.");
    return null;
  }

  if (diseaseName === 'Healthy Rice Leaf') {
    return {
      informasi_detail: "Daun padi dalam kondisi sehat, tidak menunjukkan gejala penyakit.",
      solusi_penyembuhan: "Tidak diperlukan penyembuhan. Pertahankan praktik pertanian yang baik untuk menjaga kesehatan tanaman.",
      rekomendasi_produk: []
    };
  }

  const prompt = `
    Anda adalah seorang ahli pertanian dan pakar penyakit tanaman padi dari Indonesia yang sangat berpengalaman.

    Berikan penjelasan yang sangat mendalam, detail, dan panjang untuk setiap bagian. Anggap setiap bagian adalah sebuah esai singkat. Gunakan bahasa yang mudah dipahami namun tetap akurat, seolah-olah Anda sedang memberikan konsultasi langsung kepada seorang petani.

    Berdasarkan nama penyakit berikut: "${diseaseName}"

    Tolong berikan jawaban HANYA dalam format JSON dengan struktur berikut:
    {
      "informasi_detail": "Jelaskan secara mendalam dengan minimal 100 kata tentang penyakit ini. Mulai dari gejala awal yang samar, bagaimana perkembangan gejala menjadi parah, apa nama ilmiah penyebabnya (jamur/bakteri), bagaimana cara patogen tersebut menyerang jaringan tanaman, kondisi cuaca dan lingkungan (suhu, kelembaban) yang paling ideal untuk wabah, dan apa dampak ekonomi jika dibiarkan.",
      "solusi_penyembuhan": "Berikan panduan langkah-demi-langkah yang sangat komprehensif dengan minimal 150 kata. Untuk bagian (A) Metode Pengendalian Kultural & Organik, jelaskan setidaknya 3-4 teknik secara detail, seperti rotasi tanaman, penggunaan varietas tahan, sanitasi (pembersihan gulma/sisa tanaman), dan penggunaan musuh alami atau pestisida nabati. Untuk bagian (B) Metode Pengendalian Kimiawi, sebutkan 2-3 jenis zat aktif yang berbeda, jelaskan perbedaan cara kerjanya (sistemik vs. kontak), berikan contoh waktu aplikasi (misal: pagi hari, tidak hujan), dan tekankan pentingnya mengikuti dosis anjuran untuk menghindari resistensi.",
      "rekomendasi_produk": [
        { "nama_produk": "Contoh Merek Dagang Fungisida/Bakterisida", "deskripsi_singkat": "Jelaskan secara singkat produk ini mengandung zat aktif apa dan untuk apa." },
        { "nama_produk": "Contoh Merek Dagang Pupuk/Produk Pendukung", "deskripsi_singkat": "Jelaskan mengapa produk ini direkomendasikan untuk pemulihan atau pencegahan." }
      ]
    }
  `;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: "application/json",
        },
      }
    );

    console.log("✅ Successfully received response from Gemini API.");
    try {
      // The response from Gemini is a JSON string, parse it into an object
      const jsonString = response.data.candidates[0].content.parts[0].text;
      return JSON.parse(jsonString);
    } catch (parseError) {
      console.error("❌ Failed to parse JSON response from Gemini:", parseError);
      return { 
        error: true, 
        message: "Failed to parse AI response." 
      };
    }
  } catch (error) {
    console.error("❌ Error calling Gemini API:", error.response ? error.response.data : error.message);
    // Return a structured error object instead of null
    return { 
      error: true, 
      message: error.response ? error.response.data : error.message 
    };
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