// src/services/api.js
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
export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const detectImage = (formData) => {
  // Endpoint ini ('/detections/detect') akan otomatis mendapatkan token
  // berkat interceptor di atas.
  return api.post('/detections/detect', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Tambahkan fungsi API lain di sini (register, getUser, dll.)

export default api;