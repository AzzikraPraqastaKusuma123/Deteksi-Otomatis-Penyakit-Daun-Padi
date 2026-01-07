// backend/services/detectionService.js
import { InferenceSession, Tensor } from 'onnxruntime-node';
import sharp from 'sharp';
import path from 'path';
import db from "../config/db.js";
import axios from 'axios';
import 'dotenv/config';
import { getDiseaseFallbackData, getResourceFallbackData } from './fallbackData.js';

// Path model diperbarui ke file yang benar dari notebook
const modelPath = path.resolve(process.cwd(), '../model/best_resnet50v2_latest.onnx');

const labels = [
  'Bacterial Leaf Blight',
  'Brown Spot',
  'Grass',
  'Healthy Rice Leaf',
  'Leaf Blast',
  'Leaf scald',
  'Narrow Brown Leaf Spot',
  'Rice Hispa',
  'Sheath Blight'
];

let session = null;

export async function loadModel() {
  try {
    console.log("🧠 Loading ONNX model:", modelPath);
    const fs = await import('fs');
    if (!fs.existsSync(modelPath)) {
        throw new Error(`Model file not found at: ${modelPath}`);
    }
    session = await InferenceSession.create(modelPath);
    console.log('✅ Model loaded successfully.');
  } catch (error) {
    console.error('❌ Failed to load ONNX model:', error);
    process.exit(1); 
  }
}

export async function getGenerativeInfo(diseaseName, lang = 'id') {
  if (diseaseName === 'Healthy Rice Leaf') {
    if (lang === 'id') {
      return {
        informasi_detail: "Daun padi dalam kondisi sehat, tidak menunjukkan gejala penyakit. Pertahankan praktik pertanian yang baik untuk menjaga kesehatan tanaman. Penting untuk terus memantau kondisi tanaman secara rutin.",
        solusi_penyembuhan: "Tidak diperlukan tindakan penyembuhan atau pencegahan khusus karena tanaman sehat. Fokus pada praktik budidaya optimal untuk mempertahankan kondisi ini.",
        rekomendasi_produk: []
      };
    } else {
      return {
        description: "Healthy rice leaves show no disease symptoms. Maintain good agricultural practices to keep plants healthy.",
        prevention: "No specific prevention needed as the plant is healthy. Continue routine monitoring and optimal cultivation practices.",
        cultivation_tips: "Ensure adequate soil nutrients, proper irrigation, and weed control. Choose superior varieties resistant to various environmental conditions. Implement crop rotation regularly."
      };
    }
  }

  if (!process.env.GEMINI_API_KEY) {
    console.warn("⚠️ GEMINI_API_KEY not found. Using fallback data.");
    return getDiseaseFallbackData(diseaseName, lang);
  }

  const languageInstruction = lang === 'id' ? 'dalam Bahasa Indonesia' : 'in English';
  const prompt = `
    Anda adalah seorang ahli pertanian dan pakar penyakit tanaman padi. Berikan penjelasan yang ringkas, langsung pada intinya, dan mudah dipahami oleh petani. Pastikan informasi yang diberikan komprehensif dan selalu terisi dengan detail yang relevan.

    Berdasarkan nama penyakit berikut: "${diseaseName}"

    Tolong berikan jawaban ${languageInstruction} HANYA dalam format JSON dengan struktur berikut. Setiap bidang teks untuk "informasi_detail" dan "solusi_penyembuhan" harus berupa beberapa paragraf singkat yang padat dan informatif. Jika Anda tidak menemukan informasi spesifik, berikan penjelasan umum yang relevan atau gunakan teks placeholder seperti "Informasi detail mengenai aspek ini akan segera ditambahkan." Bidang "rekomendasi_produk" harus dalam format array:
    {
      "informasi_detail": "Jelaskan penyakit ini secara ringkas namun komprehensif, meliputi gejala utama, penyebab, dan dampaknya pada tanaman padi. Gunakan beberapa paragraf singkat jika diperlukan untuk kejelasan.",
      "solusi_penyembuhan": "Sajikan panduan pencegahan dan penyembuhan utama secara komprehensif, mencakup metode kultural, organik, dan, jika relevan, kimiawi. Gunakan beberapa paragraf singkat jika diperlukan untuk kejelasan.",
      "rekomendasi_produk": [
        {"nama_produk": "Nama Produk 1 (misal: Pupuk Urea)", "deskripsi_singkat": "Deskripsi singkat tentang manfaat produk ini untuk penyakit tersebut atau kesehatan tanaman."}
      ]
    }
  `;

  const modelsToTry = ['gemini-2.5-flash'];

  try {
    for (const model of modelsToTry) {
      console.log(`🚀 Trying to call Gemini API with model: ${model}`);
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      );

      console.log(`✅ Successfully received response from Gemini API using model: ${model}.`);
      let jsonString = response.data.candidates[0].content.parts[0].text;
      if (jsonString.startsWith("```json")) {
        jsonString = jsonString.slice(7, -3).trim();
      }
      const parsedJson = JSON.parse(jsonString);
      return { ...parsedJson, isFallback: false };
    }
    throw new Error("All models in the loop failed or parsing failed.");
  } catch (error) {
    console.warn(`🛑 Gemini API call failed. Reason: ${error.message}. Using fallback data.`);
    return getDiseaseFallbackData(diseaseName, lang);
  }
}

export async function getGenerativeAgriculturalResourceInfo(resourceName, resourceDescription, lang = 'id') {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("⚠️ GEMINI_API_KEY not found. Using fallback data for agricultural resource.");
    return getResourceFallbackData(resourceName, lang);
  }

  const languageInstruction = lang === 'id' ? 'dalam Bahasa Indonesia' : 'in English';

  const prompt = `
    Anda adalah seorang ahli pertanian dan pakar sumber daya pertanian (pupuk, pestisida, obat). Berikan penjelasan yang ringkas, langsung pada intinya, dan mudah dipahami oleh petani.

    Berdasarkan nama sumber daya pertanian berikut: "${resourceName}" dan deskripsi aslinya: "${resourceDescription}"

    Tolong ringkas dan jelaskan deskripsi asli di atas secara sangat mendetail, komprehensif, dan jelas, seolah-olah Anda adalah seorang ahli pertanian yang memberikan informasi lengkap dan mendalam yang mudah dipahami oleh petani. Berikan jawaban ${languageInstruction} HANYA dalam format JSON dengan struktur berikut. Bidang "overview" harus berupa penjelasan yang sangat mendetail dan jelas, dapat mencakup beberapa paragraf panjang. Bidang "usage_tips" harus tetap ringkas dan informatif dalam satu paragraf. Bidang "benefits" dan "additional_recommendations" harus berupa array objek, di mana setiap objek memiliki satu properti string.
    {
      "overview": "Jelaskan sumber daya ini secara komprehensif dan mendalam, meliputi apa itu, fungsi utamanya, bagaimana cara kerjanya, serta pentingnya bagi pertanian padi. Penjelasan ini harus mudah dipahami oleh petani dan dapat mencakup beberapa paragraf panjang untuk memberikan pemahaman yang menyeluruh.",
      "usage_tips": "Sajikan panduan penggunaan, dosis anjuran, waktu aplikasi yang tepat, dan tips praktis lainnya yang mendetail dan berguna bagi petani untuk memaksimalkan efektivitas sumber daya ini.",
      "benefits": [
        {"point": "Manfaat utama 1 dari penggunaan sumber daya ini."},
        {"point": "Manfaat utama 2 dari penggunaan sumber daya ini."}
      ],
      "additional_recommendations": [
        {"recommendation": "Rekomendasi tambahan 1 (misal: kombinasi yang baik dengan produk lain, kondisi terbaik penggunaan)."},
        {"recommendation": "Rekomendasi tambahan 2."}
      ]
    }
  `;

  const modelsToTry = ['gemini-2.5-flash'];

  try {
    for (const model of modelsToTry) {
      console.log(`🚀 Trying to call Gemini API for resource info with model: ${model}`);
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      );

      console.log(`✅ Successfully received response from Gemini API for resource info using model: ${model}.`);
      let jsonString = response.data.candidates[0].content.parts[0].text;
      if (jsonString.startsWith("```json")) {
        jsonString = jsonString.slice(7, -3).trim();
      }
      const parsedJson = JSON.parse(jsonString);
      return { ...parsedJson, isFallback: false };
    }
    throw new Error("All models for resource info failed.");
  } catch (error) {
    console.warn(`🛑 Gemini API call for resource info failed. Reason: ${error.message}. Using fallback data.`);
    return getResourceFallbackData(resourceName, lang);
  }
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
      // Normalisasi [-1, 1] yang sesuai dengan mode 'tf' Keras
      float32Data[i] = (raw[i] / 127.5) - 1.0; 
    }

    // Bentuk tensor NHWC [batch, height, width, channels] yang diharapkan model
    const inputTensor = new Tensor('float32', float32Data, [1, 224, 224, 3]);
    
    const feeds = { [session.inputNames[0]]: inputTensor };
    const results = await session.run(feeds);

    const output = results[session.outputNames[0]].data;
    const probs = Array.from(output);

    const maxProb = Math.max(...probs);
    const maxIndex = probs.indexOf(maxProb);
    const predictedDiseaseName = labels[maxIndex] || "Unknown Disease";

    console.log(`✅ Prediction: ${predictedDiseaseName}, Confidence: ${maxProb.toFixed(4)}`);

    if (predictedDiseaseName === 'Grass') {
      return {
        disease: 'Grass',
        confidence: maxProb,
        description: 'Gambar yang diunggah terdeteksi sebagai rumput atau gulma, bukan daun padi.',
        prevention: 'Pastikan untuk membersihkan area tanam dari gulma yang dapat bersaing dengan tanaman padi untuk nutrisi dan sinar matahari.',
        treatment_recommendations: 'Tidak ada perawatan yang diperlukan karena ini bukan penyakit. Fokus pada pengendalian gulma secara manual atau menggunakan herbisida yang sesuai.'
      };
    }

    const diseaseDetails = await new Promise((resolve) => {
      db.query(
        "SELECT description, prevention, treatment_recommendations FROM diseases WHERE disease_name = ?",
        [predictedDiseaseName],
        (err, results) => {
          if (err) {
            console.error("Error fetching disease details:", err);
            return resolve({
              description: "No description found.",
              prevention: "No prevention tips available.",
              treatment_recommendations: "No treatment recommendations available."
            });
          }
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
      confidence: maxProb,
      description: diseaseDetails.description,
      prevention: diseaseDetails.prevention,
      treatment_recommendations: diseaseDetails.treatment_recommendations
    };
  } catch (error) {
    console.error("❌ Error during inference:", error);
    throw error;
  }
}
