// DetectionList.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DetectionList.css';
// 1. Impor fungsi getDetections dari file service API Anda
import { getDetections } from '../services/api';

function DetectionList() {
  // 3. Siapkan state untuk data, loading, dan error
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 4. Gunakan useEffect untuk mengambil data saat komponen dimuat
  useEffect(() => {
    const fetchDetections = async () => {
      try {
        setError(null);
        setLoading(true);
        
        // Memanggil API (token akan otomatis terkirim)
        const response = await getDetections();
        
        // Data dari backend adalah array, urutkan dari yang terbaru
        setDetections(response.data.sort((a, b) => new Date(b.detected_at) - new Date(a.detected_at)));
      } catch (err) {
        console.error("Failed to fetch detections:", err);
        // Jika token tidak valid/habis (401 atau 403), redirect ke login
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError("Sesi Anda telah berakhir. Silakan login kembali.");
          localStorage.removeItem('token'); // Hapus token lama
          localStorage.removeItem('user');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError("Gagal memuat riwayat deteksi.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetections();
  }, [navigate]); // Tambahkan navigate sebagai dependensi

  // 5. Tampilkan status loading
  if (loading) {
    return <div className="detection-list-container"><p>Loading history...</p></div>;
  }

  // 6. Tampilkan pesan error
  if (error) {
    return <div className="detection-list-container"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="detection-list-container">
      <div className="list-header">
        <h1>Detection History</h1>
        <Link to="/detect" className="btn-add-new">Start New Detection</Link>
      </div>

      {/* 7. Tampilkan pesan jika tidak ada data */}
      {detections.length === 0 ? (
        <div className="no-detections">
          <p>No detection history found.</p>
          <p>Start your first analysis!</p>
        </div>
      ) : (
        <div className="detection-cards-grid">
          {/* 8. Render data dinamis dari state 'detections' */}
          {detections.map(detection => {
            // Cek apakah sehat berdasarkan nama penyakit
            const isHealthy = detection.disease_name.toLowerCase().includes('healthy') || detection.disease_name.toLowerCase().includes('sehat');
            
            return (
              <div className="detection-card" key={detection.id}> {/* Gunakan detection.id */}
                {/* Pastikan URL gambar benar, controller menyimpan '/uploads/...' */}
                <img src={`http://localhost:5000${detection.image_url}`} className="card-img-top" alt={detection.disease_name}/>
                <div className="detection-card-body">
                  <span className={`status-badge ${isHealthy ? 'status-healthy' : 'status-disease'}`}>
                    {isHealthy ? 'Healthy' : 'Disease'}
                  </span>
                  {/* Tampilkan disease_name langsung dari DB */}
                  <h5 className="card-title">{detection.disease_name}</h5>
                  {/* Tampilkan confidence dari DB (decimal) */}
                  <p className="card-text">Confidence: <strong>{(detection.confidence * 100).toFixed(2)}%</strong></p>
                  {/* Tampilkan detected_at dari DB (timestamp) */}
                  <p className="card-text"><small className="text-muted">{new Date(detection.detected_at).toLocaleString()}</small></p>
                </div>
              </div>
            ); {/* <-- KARAKTER '_' YANG ERROR TELAH DIHAPUS DARI SINI */}
          })}
        </div>
      )}
    </div>
  );
}

export default DetectionList;