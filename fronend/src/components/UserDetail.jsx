import React from 'react';
import { useParams, Link } from 'react-router-dom';

const usersData = [
  { user_id: 1, username: 'budi_petani', email: 'budi.petani@email.com', full_name: 'Budi Santoso', location: 'Karawang, Jawa Barat' },
  { user_id: 2, username: 'siti_agri', email: 'siti.agri@email.com', full_name: 'Siti Aminah', location: 'Indramayu, Jawa Barat' },
];

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

function UserDetail() {
  const { userId } = useParams();
  const user = usersData.find(u => u.user_id === parseInt(userId));
  const userDetections = detectionsData.filter(d => d.user_id === parseInt(userId));

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{user.full_name} ({user.username})</h1>
          <p className="card-text">Email: {user.email}</p>
          <p className="card-text">Location: {user.location}</p>
        </div>
      </div>

      <h2>Detections by {user.username}</h2>
      {userDetections.length > 0 ? (
        <div className="list-group">
          {userDetections.map(detection => (
            <Link to={`/detections/${detection.detection_id}`} key={detection.detection_id} className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{getDiseaseName(detection.detected_disease_id)}</h5>
                <small>{detection.detection_timestamp}</small>
              </div>
              <p className="mb-1">Confidence: {detection.confidence_score}</p>
              <p className="mb-1">Healthy: {detection.is_healthy ? 'Yes' : 'No'}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p>No detections found for this user.</p>
      )}
    </div>
  );
}

export default UserDetail;