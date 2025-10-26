// src/services/api.js
import axios from "axios";

// Base URL pointing to your backend server
// Ganti ke URL backend-mu jika deploy, misal: https://padiguard-backend.vercel.app
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Middleware untuk menambahkan token JWT jika ada
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
