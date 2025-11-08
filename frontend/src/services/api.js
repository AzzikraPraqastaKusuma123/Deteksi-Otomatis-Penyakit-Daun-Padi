import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

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


export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const detectImage = (formData) => {
  return api.post('/detections/detect', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getDetections = () => {
  return api.get('/detections');
};

export const getAllDiseases = () => {
  return api.get('/diseases');
};

export const getDiseaseById = (id) => {
  return api.get(`/diseases/${id}`);
};

export const addDisease = (diseaseData) => {
  return api.post('/diseases', diseaseData);
};

export default api;