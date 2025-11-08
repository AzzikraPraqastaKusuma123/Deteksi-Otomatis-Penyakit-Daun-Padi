import axios from 'axios';

// 1. Buat instance axios terpusat
const api = axios.create({
  // Pastikan URL ini SAMA PERSIS dengan yang Anda gunakan di Login.jsx
  baseURL: 'http://localhost:5000/api'
});

/**
 * 2. INTERCEPTOR (Bagian Paling Penting)
 * Kode ini akan berjalan OTOMATIS setiap kali Anda memanggil API
 * menggunakan 'api.post()' atau 'api.get()'.
 */
api.interceptors.request.use(
  (config) => {
    // Mengambil token yang disimpan saat login
    const token = localStorage.getItem('token');
    
    if (token) {
      // Menambahkan token ke header 'Authorization'
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config; // Lanjutkan request dengan header baru
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Definisikan semua fungsi API Anda di sini

/**
 * Untuk halaman Login
 */
export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials);
};

/**
 * Untuk halaman DetectionPage
 */
export const detectImage = (formData) => {
  // Endpoint ini ('/detections/detect') akan otomatis mendapatkan token
  // berkat interceptor di atas.
  return api.post('/detections/detect', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * [TAMBAHAN BARU]
 * Untuk halaman DetectionList.jsx.
 * Mengambil semua riwayat deteksi milik pengguna.
 */
export const getDetections = () => {
  // Ini akan memanggil endpoint GET /api/detections/
  // Token akan otomatis ditambahkan oleh interceptor
  return api.get('/detections');
};

// Anda bisa menambahkan fungsi lain di sini (register, getCount, dll.)
// export const getDetectionCount = () => api.get('/detections/count');

export default api;