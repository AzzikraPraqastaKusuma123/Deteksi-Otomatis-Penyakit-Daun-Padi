![PadiGuard Logo](frontend/public/logo.png)

# Deteksi-Otomatis-Penyakit-Daun-Padi

## 🌾 Sistem Deteksi Otomatis Penyakit Daun Padi

Proyek ini adalah aplikasi web full-stack yang dirancang untuk deteksi otomatis penyakit pada daun padi. Pengguna dapat mengunggah gambar daun padi, dan sistem akan menganalisisnya menggunakan model machine learning yang telah dilatih sebelumnya. Aplikasi ini menyediakan informasi rinci tentang penyakit yang terdeteksi, termasuk deskripsi, metode pencegahan, dan rekomendasi kaya yang dihasilkan secara dinamis oleh Google Gemini API.

## ✨ Fitur

**Frontend (Aplikasi React):**
*   **Autentikasi Pengguna:** Registrasi dan login aman menggunakan JWT.
*   **Unggah Gambar & Pindai Kamera:** Pengguna dapat mengunggah gambar atau menggunakan kamera perangkat mereka (dengan kemampuan beralih kamera depan/belakang) untuk pemindaian real-time.
*   **Deteksi Penyakit:** Kirim gambar daun padi untuk analisis.
*   **Hasil Analisis Rinci:** Lihat prediksi penyakit, skor kepercayaan, deskripsi statis, metode pencegahan, dan wawasan yang dihasilkan AI dari Google Gemini.
*   **Manajemen Profil Pengguna:** Lihat dan edit detail profil pengguna.
*   **Dasbor Admin:** (Tersirat dari rute backend) Mengelola pengguna dan informasi penyakit.
*   **Desain Responsif:** Dioptimalkan untuk berbagai perangkat, termasuk seluler.

**Backend (API Node.js & Express.js):**
*   **Manajemen Pengguna:** Operasi CRUD untuk pengguna.
*   **Autentikasi:** Autentikasi berbasis JWT untuk akses API yang aman.
*   **Manajemen Informasi Penyakit:** Menyimpan dan mengambil data penyakit statis (deskripsi, pencegahan).
*   **Penanganan Unggahan Gambar:** Menggunakan `multer` untuk unggahan gambar yang efisien.
*   **Integrasi Model Machine Learning:** Mengintegrasikan model ResNet50v2 berformat ONNX untuk inferensi gambar menggunakan `onnxruntime-node`.
*   **Integrasi Google Gemini API:** Mengambil informasi dan rekomendasi dinamis yang kaya untuk penyakit yang terdeteksi.
*   **Integrasi Basis Data:** Menyimpan data pengguna, riwayat deteksi, dan informasi penyakit dalam basis data MySQL.

**Model Machine Learning:**
*   **Model ONNX ResNet50v2:** Model deep learning yang telah dilatih sebelumnya (`best_resnet50v2.onnx`) yang dioptimalkan untuk klasifikasi penyakit daun padi.

## 🛠️ Teknologi yang Digunakan

**Frontend:**
*   React.js
*   Vite (Alat Pembangun)
*   React Router DOM
*   Axios (Klien HTTP)
*   React Dropzone
*   React Icons
*   CSS3

**Backend:**
*   Node.js
*   Express.js
*   MySQL2 (Klien MySQL)
*   JSON Web Tokens (JWT)
*   Bcrypt.js (Hashing Kata Sandi)
*   Multer (Unggahan File)
*   Sharp (Pemrosesan Gambar - *tersirat, sering digunakan dengan Multer*)
*   ONNX Runtime Node (untuk inferensi model ML)
*   Google Gemini API

**Basis Data:**
*   MySQL

**Machine Learning:**
*   ResNet50v2 (format ONNX)

## 🚀 Memulai

Petunjuk ini akan membantu Anda mendapatkan salinan proyek yang berjalan di mesin lokal Anda untuk tujuan pengembangan dan pengujian.

### Prasyarat

*   Node.js (versi LTS direkomendasikan)
*   Server MySQL
*   Git

### Instalasi

**1. Kloning repositori:**
```bash
git clone https://github.com/your-username/Deteksi-Otomatis-Penyakit-Daun-Padi.git
cd Deteksi-Otomatis-Penyakit-Daun-Padi
```

**2. Penyiapan Backend:**
Navigasi ke direktori `backend` dan instal dependensi:
```bash
cd backend
npm install
```
Buat file `.env` di direktori `backend` dan konfigurasikan basis data serta kunci rahasia JWT Anda:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=db_padi_guard
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```
Impor file `db_padi_guard.sql` (terletak di `backend/sql/`) ke basis data MySQL Anda.

Mulai server backend:
```bash
npm start
```
Server backend akan berjalan di `http://localhost:5000` (atau port yang Anda konfigurasikan).

**3. Penyiapan Frontend:**
Buka terminal baru, navigasi ke direktori `frontend` dan instal dependensi:
```bash
cd frontend
npm install
```
Mulai server pengembangan frontend:
```bash
npm run dev
```
Aplikasi frontend akan terbuka di browser Anda, biasanya di `http://localhost:5173`.

**4. Model Machine Learning:**
Pastikan model `best_resnet50v2.onnx` ditempatkan di direktori `model/` di root proyek. Backend akan memuat model ini saat startup.

## 💡 Penggunaan

1.  **Daftar/Login:** Akses aplikasi melalui frontend dan daftarkan akun baru atau masuk dengan kredensial yang ada.
2.  **Deteksi Penyakit:** Navigasi ke halaman deteksi. Anda dapat mengunggah gambar daun padi atau menggunakan kamera perangkat Anda untuk mengambil gambar secara langsung.
3.  **Lihat Analisis:** Setelah analisis, sistem akan menampilkan penyakit yang terdeteksi, tingkat kepercayaan, dan informasi rinci.
4.  **Kelola Profil:** Perbarui informasi pengguna Anda dari halaman profil.

## 📄 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file `LICENSE` untuk detailnya. (Catatan: File `LICENSE` saat ini tidak ada dalam struktur proyek, ini adalah placeholder.)
