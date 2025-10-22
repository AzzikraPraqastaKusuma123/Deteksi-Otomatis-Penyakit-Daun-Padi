import React from 'react';
import { Link } from 'react-router-dom';

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
    <div className="container">
      <h1>Detections</h1>
      <ul>
        {detectionsData.map(detection => (
          <li key={detection.detection_id}>
            <div className="card">
              <h2>Detection ID: {detection.detection_id}</h2>
              <p>User ID: {detection.user_id}</p>
              <p>Disease: <Link to={`/diseases/${detection.detected_disease_id}`}>{getDiseaseName(detection.detected_disease_id)}</Link></p>
              <p>Confidence: {detection.confidence_score}</p>
              <p>Healthy: {detection.is_healthy ? 'Yes' : 'No'}</p>
              <p>Timestamp: {detection.detection_timestamp}</p>
              <p>{detection.llm_generated_response}</p>
              <Link to={`/detections/${detection.detection_id}`}>View Details</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetectionList;
