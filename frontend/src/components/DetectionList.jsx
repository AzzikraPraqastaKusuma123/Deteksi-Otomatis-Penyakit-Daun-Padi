// DetectionList.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './DetectionList.css';
// 1. Impor fungsi getDetections dari file service API Anda
import { getDetections } from '../services/api';

function DetectionList() {
  const { t } = useTranslation();
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
          setError(t('detectionList.sessionExpired'));
          localStorage.removeItem('token'); // Hapus token lama
          localStorage.removeItem('user');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError(t('detectionList.failedToLoad'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetections();
  }, [navigate, t]); // Tambahkan navigate dan t sebagai dependensi

  // 5. Tampilkan status loading
  if (loading) {
    return <div className="agrius-detection-list-container"><p className="agrius-loading-text">{t('detectionList.loadingHistory')}</p></div>;
  }

  // 6. Tampilkan pesan error
  if (error) {
    return <div className="agrius-detection-list-container"><p className="agrius-error-message">{error}</p></div>;
  }

  return (
    <div className="agrius-detection-list-container">
      <div className="agrius-list-header">
        <h1>{t('detectionList.pageTitle')}</h1>
        <Link to="/detect" className="agrius-btn-primary agrius-btn-add-new">{t('detectionList.startNewDetection')}</Link>
      </div>

      {/* 7. Tampilkan pesan jika tidak ada data */}
      {detections.length === 0 ? (
        <div className="agrius-no-detections">
          <p>{t('detectionList.noHistoryFound')}</p>
          <p>{t('detectionList.startFirstAnalysis')}</p>
        </div>
      ) : (
        <div className="agrius-detection-cards-flex">
          {/* 8. Render data dinamis dari state 'detections' */}
          {detections.map(detection => {
            // Cek apakah sehat berdasarkan nama penyakit
            const isHealthy = detection.disease_name.toLowerCase().includes('healthy') || detection.disease_name.toLowerCase().includes('sehat');
            
            return (
              <div className="agrius-detection-card" key={detection.id}> {/* Gunakan detection.id */}
                {/* Pastikan URL gambar benar, controller menyimpan '/uploads/...' */}
                <img src={`http://localhost:5000${detection.image_url}`} className="agrius-card-img-top" alt={detection.disease_name}/>
                <div className="agrius-detection-card-body">
                  <span className={`agrius-status-badge ${isHealthy ? 'agrius-status-healthy' : 'agrius-status-disease'}`}>
                    {isHealthy ? t('detectionList.healthy') : t('detectionList.disease')}
                  </span>
                  {/* Tampilkan disease_name langsung dari DB */}
                  <h5 className="agrius-card-title">{detection.disease_name}</h5>
                  {/* Tampilkan confidence dari DB (decimal) */}
                  <p className="agrius-card-text">{t('detectionList.confidence')}: <strong>{(detection.confidence * 100).toFixed(2)}%</strong></p>
                  {/* Tampilkan detected_at dari DB (timestamp) */}
                  <p className="agrius-card-text"><small className="agrius-text-muted">{new Date(detection.detected_at).toLocaleString()}</small></p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DetectionList;