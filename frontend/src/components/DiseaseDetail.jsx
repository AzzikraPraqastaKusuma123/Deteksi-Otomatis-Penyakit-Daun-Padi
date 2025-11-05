import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './DiseaseDetail.css';

const diseasesData = [
  { disease_id: 1, disease_name: 'Hawar Daun Bakteri', scientific_name: 'Xanthomonas oryzae', description: 'Penyakit yang disebabkan oleh bakteri dan menyerang daun, menyebabkan daun kering dan mati.', symptoms: 'Bercak kebasahan pada tepi daun, daun menjadi kuning pucat lalu putih kelabu dan mati.', treatment_recommendations: 'Gunakan varietas padi yang tahan, atur jarak tanam agar tidak terlalu rapat, hindari pemupukan Nitrogen berlebih.', image_url_example: null },
  { disease_id: 2, disease_name: 'Bercak Coklat', scientific_name: 'Cochliobolus miyabeanus', description: 'Penyakit yang disebabkan oleh jamur dan menimbulkan bercak oval pada daun.', symptoms: 'Bercak berbentuk oval seperti wijen berwarna coklat dengan titik tengah keabu-abuan atau keputihan.', treatment_recommendations: 'Gunakan benih sehat, lakukan sanitasi lahan, semprot dengan fungisida yang mengandung mankozeb atau propikonazol jika serangan parah.', image_url_example: null },
  { disease_id: 3, disease_name: 'Tungro', scientific_name: 'Rice tungro virus', description: 'Penyakit virus yang disebarkan oleh wereng hijau. Sangat berbahaya dan dapat menyebabkan gagal panen.', symptoms: 'Tanaman menjadi kerdil, daun muda berwarna kuning hingga oranye, jumlah anakan berkurang.', treatment_recommendations: 'Kendalikan vektor wereng hijau, lakukan penanaman serentak untuk memutus siklus hidup wereng, eradikasi tanaman yang terinfeksi.', image_url_example: null },
  { disease_id: 4, disease_name: 'Sehat', scientific_name: null, description: 'Daun tidak menunjukkan gejala penyakit atau serangan hama.', symptoms: 'Daun berwarna hijau segar, tidak ada bercak atau perubahan warna abnormal.', treatment_recommendations: 'Lanjutkan praktik budidaya yang baik, lakukan pemantauan rutin untuk deteksi dini masalah.', image_url_example: null },
];

function DiseaseDetail() {
  const { diseaseId } = useParams();
  const disease = diseasesData.find(d => d.disease_id === parseInt(diseaseId));

  if (!disease) {
    return <div>Disease not found</div>;
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
            <h1 className="detail-title">{disease.disease_name}</h1>
            <div className="detail-info">
              {disease.scientific_name && <p><strong>Scientific Name:</strong> {disease.scientific_name}</p>}
              <p><strong>Description:</strong> {disease.description}</p>
              <p><strong>Symptoms:</strong> {disease.symptoms}</p>
              <p><strong>Treatment:</strong> {disease.treatment_recommendations}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiseaseDetail;