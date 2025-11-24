// frontend/src/services/api.js
import axios from 'axios';

// === 1. Inisialisasi Instance Axios ===
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Sesuaikan dengan server backend kamu
});

// === 2. Interceptor untuk Menyertakan Token Otomatis ===
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// === 3. AUTHENTICATION ===
export const loginUser = (credentials) => {
  // POST /auth/login
  return api.post('/auth/login', credentials);
};

export const registerUser = (data) => {
  // POST /auth/register
  return api.post('/auth/register', data);
};

// === 4. DISEASE MANAGEMENT ===
export const getAllDiseases = (lang = 'id') => {
  // GET /diseases?lang=id OR /diseases?lang=en
  return api.get(`/diseases?lang=${lang}`);
};

export const getDiseaseById = (id, lang = 'id') => {
  // GET /diseases/:id?lang=id OR /diseases/:id?lang=en
  return api.get(`/diseases/${id}?lang=${lang}`);
};

export const addDisease = (diseaseData) => {
  // POST /diseases
  return api.post('/diseases', diseaseData);
};

export const updateDisease = (id, formData) => {
  // PUT /diseases/:id
  return api.put(`/diseases/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteDisease = (id) => {
  // DELETE /diseases/:id
  return api.delete(`/diseases/${id}`);
};

export const getDiseasesCount = () => {
  // GET /diseases/count
  return api.get('/diseases/count');
};

export const getDiseaseDetailsByName = (name, lang = 'id') => {
  // GET /diseases/byName?name=...&lang=...
  return api.get(`/diseases/byName?name=${name}&lang=${lang}`);
};


// === 5. DETECTION SYSTEM ===
export const detectImage = (formData) => {
  // POST /detections/detect
  return api.post('/detections/detect', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getDetections = () => {
  // GET /detections
  return api.get('/detections');
};

export const getDetectionsCount = () => {
  // GET /detections/count
  return api.get('/detections/count');
};

export const detectRealtimeImage = (imageData) => {
  const formData = new FormData();
  formData.append('image', imageData, 'frame.jpeg'); // imageData should be a Blob or File object
  return api.post('/detections/realtime', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// === 6. USER MANAGEMENT (Admin) ===
export const getAllUsers = () => {
  // GET /users
  return api.get('/users');
};

export const getUserById = (id) => {
  // GET /users/:id
  return api.get(`/users/${id}`);
};

export const addUser = (userData) => {
  // POST /users
  return api.post('/users', userData);
};

export const updateUser = (id, userData) => {
  // PUT /users/:id
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = (id) => {
  // DELETE /users/:id
  return api.delete(`/users/${id}`);
};

// === 7. USER PROFILE (Untuk User Login) ===
export const updateUserProfile = (id, data) => {
  // PUT /users/profile/:id
  return api.put(`/users/profile/${id}`, data);
};

export const getUserProfile = (id) => {
  // GET /users/:id (ambil detail user + deteksi)
  return api.get(`/users/${id}`);
};

// === 8. AGRICULTURAL RESOURCES ===
export const getAgriculturalResources = () => {
  // GET /agricultural-resources
  return api.get('/agricultural-resources');
};

export const getAgriculturalResourceById = (id) => {
  // GET /agricultural-resources/:id
  return api.get(`/agricultural-resources/${id}`);
};

export const createAgriculturalResource = (formData) => {
  // POST /agricultural-resources
  return api.post('/agricultural-resources', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateAgriculturalResource = (id, formData) => {
  // PUT /agricultural-resources/:id
  return api.put(`/agricultural-resources/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteAgriculturalResource = (id) => {
  // DELETE /agricultural-resources/:id
  return api.delete(`/agricultural-resources/${id}`);
};

// === 10. PEST MANAGEMENT ===
export const getAllPests = (lang = 'id') => {
  // GET /pests?lang=id OR /pests?lang=en
  return api.get(`/pests?lang=${lang}`);
};

export const getPestById = (id, lang = 'id') => {
  // GET /pests/:id?lang=id OR /pests/:id?lang=en
  return api.get(`/pests/${id}?lang=${lang}`);
};

// === 9. Ekspor default ===
export { api };
export default api;
