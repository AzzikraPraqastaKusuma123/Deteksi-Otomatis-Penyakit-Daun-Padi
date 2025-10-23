import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Detail.css';

const detectionsData = [
  { detection_id: 1, user_id: 1, detected_disease_id: 1, image_path: 'uploads/budi/20251015_093012.jpg', confidence_score: '0.9650', is_healthy: 0, llm_generated_response: 'Daun padi Anda terindikasi kuat terkena Hawar Daun Bakteri. Gejalanya adalah bercak basah di tepi daun. Segera atur jarak tanam dan kontrol pemupukan nitrogen.', detection_timestamp: '2025-10-15 04:14:12' },
  { detection_id: 2, user_id: 2, detected_disease_id: 4, image_path: 'uploads/siti/20251015_100545.jpg', confidence_score: '0.9910', is_healthy: 1, llm_generated_response: 'Selamat! Daun padi Anda terlihat sehat. Pertahankan kondisi ini dengan pemupukan berimbang dan pengairan yang cukup.', detection_timestamp: '2025-10-15 04:14:12' },
  { detection_id: 3, user_id: 1, detected_disease_id: 2, image_path: 'uploads/budi/20251015_101500.jpg', confidence_score: '0.8975', is_healthy: 0, llm_generated_response: 'Terdeteksi gejala Bercak Coklat pada daun. Ini disebabkan oleh jamur. Pastikan Anda menggunakan benih yang sehat untuk penanaman berikutnya dan lakukan sanitasi lahan.', detection_timestamp: '2025-10-15 04:14:12' },
];

const diseasesData = [
  { disease_id: 1, disease_name: 'Hawar Daun Bakteri', scientific_name: 'Xanthomonas oryzae', description: 'Penyakit yang disebabkan oleh bakteri dan menyerang daun, menyebabkan daun kering dan mati.', symptoms: 'Bercak kebasahan pada tepi daun, daun menjadi kuning pucat lalu putih kelabu dan mati.', treatment_recommendations: 'Gunakan varietas padi yang tahan, atur jarak tanam agar tidak terlalu rapat, hindari pemupukan Nitrogen berlebih.', image_url_example: null },
  { disease_id: 2, disease_name: 'Bercak Coklat', scientific_name: 'Cochliobolus miyabeanus', description: 'Penyakit yang disebabkan oleh jamur dan menimbulkan bercak oval pada daun.', symptoms: 'Bercak berbentuk oval seperti wijen berwarna coklat dengan titik tengah keabu-abuan atau keputihan.', treatment_recommendations: 'Gunakan benih sehat, lakukan sanitasi lahan, semprot dengan fungisida yang mengandung mankozeb atau propikonazol jika serangan parah.', image_url_example: null },
  { disease_id: 3, disease_name: 'Tungro', scientific_name: 'Rice tungro virus', description: 'Penyakit virus yang disebarkan oleh wereng hijau. Sangat berbahaya dan dapat menyebabkan gagal panen.', symptoms: 'Tanaman menjadi kerdil, daun muda berwarna kuning hingga oranye, jumlah anakan berkurang.', treatment_recommendations: 'Kendalikan vektor wereng hijau, lakukan penanaman serentak untuk memutus siklus hidup wereng, eradikasi tanaman yang terinfeksi.', image_url_example: null },
  { disease_id: 4, disease_name: 'Sehat', scientific_name: null, description: 'Daun tidak menunjukkan gejala penyakit atau serangan hama.', symptoms: 'Daun berwarna hijau segar, tidak ada bercak atau perubahan warna abnormal.', treatment_recommendations: 'Lanjutkan praktik budidaya yang baik, lakukan pemantauan rutin untuk deteksi dini masalah.', image_url_example: null },
];

const usersData = [
  { user_id: 1, username: 'budi_petani', email: 'budi.petani@email.com', full_name: 'Budi Santoso', location: 'Karawang, Jawa Barat' },
  { user_id: 2, username: 'siti_agri', email: 'siti.agri@email.com', full_name: 'Siti Aminah', location: 'Indramayu, Jawa Barat' },
];

function getDiseaseName(disease_id) {
  const disease = diseasesData.find(d => d.disease_id === disease_id);
  return disease ? disease.disease_name : 'Unknown';
}

function getUserName(user_id) {
  const user = usersData.find(u => u.user_id === user_id);
  return user ? user.username : 'Unknown';
}

function DetectionDetail() {
  const { detectionId } = useParams();
  const detection = detectionsData.find(d => d.detection_id === parseInt(detectionId));

  if (!detection) {
    return <div>Detection not found</div>;
  }

  return (
    <div className="detail-container">
      <Link to="/detections" className="back-link"><i className="fas fa-arrow-left me-2"></i>Back to Detections</Link>
      <div className="row">
        <div className="col-md-5">
          <div className="card detail-card">
            <img src={`https://placehold.co/600x400/4CAF50/FFFFFF?text=PadiGuard`} className="detail-image" alt="..."/>
          </div>
        </div>
        <div className="col-md-7">
          <div className="card detail-card">
            <h1 className="detail-title">Detection Details</h1>
            <div className="detail-info">
              <p><strong>ID:</strong> {detection.detection_id}</p>
              <p><strong>User:</strong> <Link to={`/users/${detection.user_id}`}>{getUserName(detection.user_id)}</Link></p>
              <p><strong>Disease:</strong> <Link to={`/diseases/${detection.detected_disease_id}`}>{getDiseaseName(detection.detected_disease_id)}</Link></p>
              <p><strong>Confidence Score:</strong> {detection.confidence_score}</p>
              <p><strong>Is Healthy:</strong> {detection.is_healthy ? 'Yes' : 'No'}</p>
              <p><strong>LLM Generated Response:</strong> {detection.llm_generated_response}</p>
              <p><strong>Detection Timestamp:</strong> {new Date(detection.detection_timestamp).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetectionDetail;