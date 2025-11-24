# Panduan Integrasi LLM Fallback: Dari Gemini ke Ollama Llama

Dokumen ini menjelaskan arsitektur dan langkah-langkah implementasi untuk mengintegrasikan model AI lokal (Ollama Llama) sebagai sistem *fallback* (cadangan) untuk Google Gemini API pada proyek PadiGuard.

## 1. Konsep Arsitektur Fallback

Tujuan utamanya adalah membuat sistem Anda lebih tangguh (*resilient*). Jika layanan utama gagal, layanan sekunder akan mengambil alih secara otomatis.

### Alur Kerja Logika:
1.  **Prioritaskan Gemini:** Aplikasi akan selalu mencoba menghubungi Google Gemini API terlebih dahulu sebagai layanan primer.
2.  **Deteksi Kegagalan:** Jika panggilan ke Gemini gagal (misalnya, error jaringan, API key tidak valid, server Gemini down, atau respons yang diterima tidak valid), sistem tidak langsung menampilkan error.
3.  **Aktifkan Fallback ke Ollama:** Sistem secara otomatis akan mencoba layanan sekunder, yaitu model Llama yang berjalan secara lokal melalui server Ollama.
4.  **Sajikan Respons Lokal:** Jika Ollama berhasil memberikan respons, respons tersebut akan diolah dan disajikan kepada pengguna. Pengguna bahkan mungkin tidak menyadari bahwa layanan primer telah gagal.
5.  **Kegagalan Final:** Jika Ollama juga gagal, barulah sistem akan menampilkan pesan error standar kepada pengguna.

### Keuntungan Arsitektur Ini:
- **Ketahanan (Resilience):** Aplikasi tetap dapat memberikan respons cerdas meskipun koneksi internet ke layanan Google terputus atau bermasalah.
- **Kemampuan Offline:** Karena Ollama berjalan di mesin lokal, fitur ini bisa berfungsi sepenuhnya secara offline.
- **Potensi Penghematan Biaya:** Mengurangi jumlah panggilan ke API berbayar (Gemini) jika terjadi kegagalan sementara.

---

## 2. Langkah-langkah Implementasi di Backend

Perubahan utama akan dilakukan di backend Node.js, khususnya pada file `backend/services/detectionService.js`.

### 2.1. Persiapan: Pastikan Ollama Berjalan

Sebelum mengubah kode, Anda harus memastikan Ollama sudah terinstal dan model Llama sudah tersedia di mesin lokal Anda.

- **Instal Ollama:** Unduh dari [ollama.com](https://ollama.com/).
- **Jalankan Model Llama:** Buka terminal dan jalankan perintah berikut untuk mengunduh dan menjalankan model (misalnya, `llama3`):
  ```bash
  ollama run llama3
  ```
- **Verifikasi API:** Ollama secara default akan menyediakan API endpoint di `http://localhost:11434`.

### 2.2. Modifikasi `detectionService.js`

Fungsi `getGenerativeInfo` perlu dimodifikasi untuk menyertakan logika fallback.

#### Contoh Struktur Logika Baru:
```javascript
// Struktur sederhana dari fungsi getGenerativeInfo yang baru

export const getGenerativeInfo = async (diseaseName, lang) => {
  try {
    // 1. Coba panggil Gemini API
    console.log(`Mencoba mengambil data dari Gemini untuk: ${diseaseName}`);
    const geminiResult = await getGenerativeInfoFromGemini(diseaseName, lang); // Asumsikan logika Gemini dipisah ke fungsi sendiri

    // 2. Validasi respons dari Gemini
    if (geminiResult && !geminiResult.error && geminiResult.informasi_detail) {
      console.log("Sukses: Mendapatkan data dari Gemini.");
      return geminiResult;
    }

    // Jika respons Gemini tidak valid, picu error untuk beralih ke fallback
    console.warn("Peringatan: Respons Gemini tidak valid, beralih ke fallback Ollama.");
    throw new Error("Invalid response from Gemini");

  } catch (geminiError) {
    // 3. Jika terjadi error saat memanggil Gemini, panggil Ollama
    console.error("Error saat memanggil Gemini:", geminiError.message);
    console.log("Info: Beralih ke fallback Ollama Llama.");

    try {
      const ollamaResult = await getGenerativeInfoFromOllama(diseaseName, lang);
      return ollamaResult;
    } catch (ollamaError) {
      console.error("Error saat memanggil Ollama fallback:", ollamaError.message);
      // Jika keduanya gagal, kembalikan objek error standar
      return { 
        error: "Failed to get generative information from both Gemini and Ollama.",
        informasi_detail: "Gagal memuat informasi dari AI.",
        solusi_penyembuhan: "Gagal memuat solusi dari AI.",
        rekomendasi_produk: []
      };
    }
  }
};
```

### 2.3. Buat Fungsi untuk Memanggil Ollama

Anda perlu membuat fungsi baru yang bertanggung jawab untuk berinteraksi dengan API Ollama.

**Poin Kunci:** Fungsi ini **wajib** mengubah respons dari Ollama menjadi struktur data (JSON) yang **sama persis** dengan yang dihasilkan oleh Gemini agar tidak perlu ada perubahan di sisi frontend.

#### Contoh Implementasi Fungsi Ollama:
```javascript
import axios from 'axios';

// Fungsi baru untuk memanggil Ollama
async function getGenerativeInfoFromOllama(diseaseName, lang) {
  // URL ini sebaiknya disimpan di file .env
  const ollamaEndpoint = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';

  const prompt = `
    You are an expert agricultural assistant. Based on the disease name "${diseaseName}", provide information in ${lang === 'id' ? 'Indonesian' : 'English'}.
    Provide the response strictly in a JSON format with the following keys: "informasi_detail", "solusi_penyembuhan", and "rekomendasi_produk".
    - "informasi_detail": A detailed explanation of the disease.
    - "solusi_penyembuhan": Practical steps for prevention and treatment.
    - "rekomendasi_produk": An array of product recommendations with "nama_produk" and "deskripsi_singkat". If you don't have product recommendations, return an empty array.
    
    JSON response only:
  `;

  try {
    const response = await axios.post(ollamaEndpoint, {
      model: "llama3", // Model yang Anda gunakan
      prompt: prompt,
      stream: false,
      format: "json" // Meminta Ollama untuk memastikan outputnya adalah JSON
    });

    console.log("Sukses: Mendapatkan data dari Ollama.");

    // Parse dan transformasikan respons
    const ollamaData = JSON.parse(response.data.response);

    // Pastikan struktur data output sama dengan struktur dari Gemini
    return {
      informasi_detail: ollamaData.informasi_detail || "Informasi detail tidak tersedia dari model lokal.",
      solusi_penyembuhan: ollamaData.solusi_penyembuhan || "Solusi penyembuhan tidak tersedia dari model lokal.",
      rekomendasi_produk: ollamaData.rekomendasi_produk || []
    };

  } catch (error) {
    console.error(`Gagal menghubungi Ollama API di ${ollamaEndpoint}:`, error.message);
    throw new Error("Ollama API call failed");
  }
}
```

---

## 3. Penjelasan: Menjalankan Ollama di Luar Folder Proyek (misal: di Drive D:)

Ini adalah poin penting yang sering disalahpahami.

**Ollama tidak berjalan "dari dalam" sebuah folder proyek.** Ollama adalah sebuah **aplikasi server** yang berjalan sebagai layanan (*service*) di sistem operasi Anda (Windows, macOS, atau Linux).

- **Lokasi Instalasi Tidak Penting:** Anda bisa menginstal aplikasi Ollama di mana saja, entah itu di `C:\Program Files\Ollama` atau di `D:\Aplikasi\Ollama`. Lokasi instalasi ini tidak memengaruhi cara proyek Anda berinteraksi dengannya.
- **Lokasi Model Terpusat:** Ketika Anda menjalankan `ollama run llama3`, model `llama3` tidak diunduh ke folder proyek Anda. Ollama menyimpannya di satu lokasi terpusat di sistem Anda (misalnya, di `C:\Users\NamaAnda\.ollama` pada Windows).
- **Komunikasi via Jaringan (localhost):** Proyek backend Anda (Node.js) berkomunikasi dengan server Ollama melalui **permintaan jaringan (HTTP)**, bukan melalui akses file langsung. Alamat standarnya adalah `http://localhost:11434`. `localhost` berarti "komputer ini juga".

Jadi, tidak peduli di mana folder proyek Anda berada (`C:`) atau di mana aplikasi Ollama terinstal (`D:`), keduanya akan tetap bisa berkomunikasi selama keduanya berjalan di mesin yang sama.

### Implementasi Terbaik: Gunakan Environment Variables

Untuk membuat kode Anda fleksibel, jangan menulis alamat `http://localhost:11434` langsung di dalam kode (`hardcoding`). Simpan alamat tersebut di file `.env` pada folder `backend`.

**Langkah Implementasi:**

1.  **Tambahkan Variabel di File `.env`:**
    Buka atau buat file `.env` di dalam folder `backend/` dan tambahkan baris berikut:

    ```env
    #... variabel lain yang sudah ada
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=...
    DB_NAME=db_padi_guard
    JWT_SECRET=...
    GEMINI_API_KEY=...

    # Tambahkan baris ini
    OLLAMA_API_URL=http://localhost:11434/api/generate
    ```

2.  **Gunakan Variabel di Kode:**
    Pastikan fungsi `getGenerativeInfoFromOllama` Anda menggunakan variabel lingkungan ini.

    ```javascript
    // Di dalam backend/services/detectionService.js

    async function getGenerativeInfoFromOllama(diseaseName, lang) {
      // Baca URL dari environment variable, dengan fallback jika tidak ada
      const ollamaEndpoint = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';

      // ... sisa logika
    }
    ```

Dengan pendekatan ini, jika suatu saat Anda memutuskan untuk menjalankan Ollama di komputer lain dalam jaringan lokal Anda, Anda hanya perlu mengubah nilai `OLLAMA_API_URL` di file `.env` tanpa menyentuh kode program sama sekali.
