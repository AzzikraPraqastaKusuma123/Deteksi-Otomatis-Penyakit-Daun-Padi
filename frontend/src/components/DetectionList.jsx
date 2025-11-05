import React from 'react';
import { Link } from 'react-router-dom';
import './DetectionList.css';

const detectionsData = [
  { detection_id: 1, user_id: 1, detected_disease_id: 1, image_path: 'uploads/budi/20251015_093012.jpg', confidence_score: '0.9650', is_healthy: 0, llm_generated_response: 'Daun padi Anda terindikasi kuat terkena Hawar Daun Bakteri. Gejalanya adalah bercak basah di tepi daun. Segera atur jarak tanam dan kontrol pemupukan nitrogen.', detection_timestamp: '2025-10-15 04:14:12' },
  { detection_id: 2, user_id: 2, detected_disease_id: 4, image_path: 'uploads/siti/20251015_100545.jpg', confidence_score: '0.9910', is_healthy: 1, llm_generated_response: 'Selamat! Daun padi Anda terlihat sehat. Pertahankan kondisi ini dengan pemupukan berimbang dan pengairan yang cukup.', detection_timestamp: '2025-10-15 04:14:12' },
  { detection_id: 3, user_id: 1, detected_disease_id: 2, image_path: 'uploads/budi/20251015_101500.jpg', confidence_score: '0.8975', is_healthy: 0, llm_generated_response: 'Terdeteksi gejala Bercak Coklat pada daun. Ini disebabkan oleh jamur. Pastikan Anda menggunakan benih yang sehat untuk penanaman berikutnya dan lakukan sanitasi lahan.', detection_timestamp: '2025-10-15 04:14:12' },
];

const diseasesData = [
  { disease_id: 1, disease_name: 'Hawar Daun Bakteri' },
  { disease_id: 2, disease_name: 'Bercak Coklat' },
  { disease_id: 3, disease_name: 'Tungro' },
  { disease_id: 4, disease_name: 'Sehat' },
];

function getDiseaseName(disease_id) {
  const disease = diseasesData.find(d => d.disease_id === disease_id);
  return disease ? disease.disease_name : 'Unknown';
}

function DetectionList() {
  return (
    <div className="detection-list-container">
      <div className="list-header">
        <h1>Detection History</h1>
        <Link to="/detect" className="btn-add-new">Start New Detection</Link>
      </div>
      <div className="detection-cards-grid">
        {detectionsData.map(detection => (
          <div className="detection-card" key={detection.detection_id}>
            <img src={`http://localhost:5000/${detection.image_path}`} className="card-img-top" alt="Detection"/>
            <div className="detection-card-body">
              <span className={`status-badge ${detection.is_healthy ? 'status-healthy' : 'status-disease'}`}>
                {detection.is_healthy ? 'Healthy' : 'Disease'}
              </span>
              <h5 className="card-title">{getDiseaseName(detection.detected_disease_id)}</h5>
              <p className="card-text">Confidence: <strong>{parseFloat(detection.confidence_score * 100).toFixed(2)}%</strong></p>
              <p className="card-text"><small className="text-muted">{new Date(detection.detection_timestamp).toLocaleString()}</small></p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetectionList;