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

export async function getGenerativeInfo(diseaseName, lang = 'id') {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not found. Skipping generative info.");
    return null;
  }

  const languageInstruction = lang === 'id' ? 'dalam Bahasa Indonesia' : 'in English';

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

  const prompt = `
    Anda adalah seorang ahli pertanian dan pakar penyakit tanaman padi. Berikan penjelasan yang ringkas, langsung pada intinya, dan mudah dipahami oleh petani, seolah-olah Anda sedang memberikan informasi cepat.

    Berdasarkan nama penyakit berikut: "${diseaseName}"

    Tolong berikan jawaban ${languageInstruction} HANYA dalam format JSON dengan struktur berikut. Setiap bidang teks harus berupa SATU paragraf yang padat dan informatif, dan rekomendasi produk dalam format array:
    {
      "informasi_detail": "Jelaskan penyakit ini secara ringkas, meliputi gejala utama, penyebab, dan dampaknya pada tanaman padi dalam satu paragraf.",
      "solusi_penyembuhan": "Sajikan panduan pencegahan dan penyembuhan utama dalam satu paragraf yang mencakup metode kultural, organik, dan, jika relevan, kimiawi.",
      "rekomendasi_produk": [
        {"nama_produk": "Nama Produk 1 (misal: Pupuk Urea)", "deskripsi_singkat": "Deskripsi singkat tentang manfaat produk ini untuk penyakit tersebut atau kesehatan tanaman."}
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
    console.log("Raw Gemini response data:", JSON.stringify(response.data, null, 2)); // Log raw response

    try {
      const jsonString = response.data.candidates[0].content.parts[0].text;
      const parsedJson = JSON.parse(jsonString);
      console.log("Parsed Gemini JSON:", JSON.stringify(parsedJson, null, 2)); // Log parsed JSON
      return parsedJson;
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

export async function getGenerativeAgriculturalResourceInfo(resourceName, resourceDescription, lang = 'id') {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not found. Skipping generative info for agricultural resource.");
    return null;
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

    console.log("✅ Successfully received response from Gemini API for agricultural resource.");
    // console.log("Raw Gemini resource response data:", JSON.stringify(response.data, null, 2)); // Log raw response

    try {
      const jsonString = response.data.candidates[0].content.parts[0].text;
      const parsedJson = JSON.parse(jsonString);
      // console.log("Parsed Gemini Resource JSON:", JSON.stringify(parsedJson, null, 2)); // Log parsed JSON
      return parsedJson;
    } catch (parseError) {
      console.error("❌ Failed to parse JSON response from Gemini for agricultural resource:", parseError);
      return { 
        error: true, 
        message: "Failed to parse AI response for agricultural resource." 
      };
    }
  } catch (error) {
    console.error("❌ Error calling Gemini API for agricultural resource:", error.response ? error.response.data : error.message);
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