# Penjelasan Proyek: Deteksi Otomatis Penyakit Daun Padi

Proyek "Deteksi-Otomatis-Penyakit-Daun-Padi" adalah aplikasi web full-stack yang inovatif, dirancang untuk membantu petani dalam mengidentifikasi penyakit pada daun padi secara otomatis. Dengan memanfaatkan teknologi machine learning dan integrasi API cerdas, aplikasi ini menyediakan platform yang efisien untuk deteksi, analisis, dan rekomendasi terkait kesehatan tanaman padi.

## Tujuan Proyek

Tujuan utama proyek ini adalah untuk menyediakan alat yang mudah digunakan dan akurat bagi petani untuk mendeteksi penyakit daun padi. Dengan deteksi dini, petani dapat mengambil tindakan pencegahan atau pengobatan yang tepat waktu, sehingga mengurangi kerugian panen dan meningkatkan produktivitas pertanian.

## Arsitektur Aplikasi

Aplikasi ini mengadopsi arsitektur full-stack yang terdiri dari tiga komponen utama:

1.  **Frontend (Antarmuka Pengguna):** Dibangun dengan React.js, menyediakan antarmuka yang responsif dan interaktif bagi pengguna.
2.  **Backend (API Server):** Ditenagai oleh Node.js dan Express.js, berfungsi sebagai jembatan antara frontend, database, dan model machine learning.
3.  **Model Machine Learning:** Model deep learning yang telah dilatih untuk klasifikasi gambar daun padi.

## Fitur Utama

### Frontend

*   **Autentikasi Pengguna:** Sistem registrasi dan login yang aman menggunakan JSON Web Tokens (JWT).
*   **Unggah Gambar & Pindai Kamera:** Pengguna dapat mengunggah gambar daun padi atau menggunakan fitur pemindaian kamera real-time.
*   **Deteksi Penyakit:** Mengirimkan gambar ke backend untuk analisis machine learning.
*   **Hasil Analisis Rinci:** Menampilkan prediksi penyakit, tingkat kepercayaan, deskripsi penyakit, metode pencegahan, dan rekomendasi yang dihasilkan secara dinamis oleh Google Gemini API.
*   **Manajemen Profil Pengguna:** Pengguna dapat melihat dan memperbarui informasi profil mereka.
*   **Dasbor Admin:** Fungsionalitas untuk administrator guna mengelola pengguna dan data penyakit.
*   **Internasionalisasi:** Dukungan multibahasa menggunakan `react-i18next`.

### Backend

*   **Manajemen Pengguna:** API CRUD (Create, Read, Update, Delete) untuk pengelolaan data pengguna.
*   **Autentikasi Aman:** Implementasi autentikasi berbasis JWT untuk melindungi endpoint API.
*   **Manajemen Data Penyakit:** Menyimpan dan mengelola informasi statis tentang berbagai penyakit padi.
*   **Penanganan Unggahan File:** Menggunakan `Multer` untuk memproses unggahan gambar dengan efisien.
*   **Integrasi Model Machine Learning:** Memuat dan menjalankan model ResNet50v2 (format ONNX) menggunakan `onnxruntime-node` untuk inferensi gambar.
*   **Integrasi Google Gemini API:** Memanfaatkan Gemini API untuk menghasilkan wawasan dan rekomendasi yang kaya berdasarkan hasil deteksi.
*   **Database:** Menggunakan MySQL2 untuk interaksi dengan database MySQL, menyimpan data pengguna, riwayat deteksi, dan informasi penyakit.
*   **Penyajian Gambar Statis:** Menyajikan gambar-gambar yang diunggah dari direktori `uploads` dan gambar sumber daya dari `public/images`.

### Model Machine Learning

*   **ResNet50v2 ONNX Model:** Model deep learning yang dioptimalkan, `best_resnet50v2.onnx`, digunakan untuk klasifikasi gambar daun padi guna mengidentifikasi jenis penyakit.

## Teknologi yang Digunakan

### Frontend

*   **React.js:** Library JavaScript untuk membangun antarmuka pengguna.
*   **Vite:** Tooling frontend untuk pengembangan cepat.
*   **React Router DOM:** Untuk navigasi dan routing dalam aplikasi.
*   **Axios:** Klien HTTP untuk melakukan permintaan ke API backend.
*   **Bootstrap & React-Bootstrap:** Kerangka kerja CSS untuk desain responsif dan komponen UI.
*   **React Dropzone:** Untuk fungsionalitas drag-and-drop file upload.
*   **React Icons:** Koleksi ikon yang mudah digunakan.
*   **i18next & React-i18next:** Untuk dukungan internasionalisasi.

### Backend

*   **Node.js:** Lingkungan runtime JavaScript.
*   **Express.js:** Kerangka kerja aplikasi web untuk Node.js.
*   **MySQL2:** Driver MySQL untuk Node.js.
*   **jsonwebtoken (JWT):** Untuk autentikasi berbasis token.
*   **bcryptjs:** Untuk hashing kata sandi.
*   **Multer:** Middleware Node.js untuk menangani `multipart/form-data`, terutama untuk unggahan file.
*   **sharp:** (Diduga digunakan) Untuk pemrosesan gambar yang efisien.
*   **onnxruntime-node:** Untuk menjalankan model ONNX di lingkungan Node.js.
*   **Google Gemini API:** Untuk menghasilkan konten dinamis dan rekomendasi.
*   **dotenv:** Untuk mengelola variabel lingkungan.
*   **cors:** Middleware untuk mengaktifkan Cross-Origin Resource Sharing.

### Database

*   **MySQL:** Sistem manajemen basis data relasional.

Dengan kombinasi teknologi-teknologi ini, proyek "Deteksi-Otomatis-Penyakit-Daun-Padi" bertujuan untuk menjadi solusi komprehensif dalam mendukung pertanian padi yang lebih cerdas dan berkelanjutan.
