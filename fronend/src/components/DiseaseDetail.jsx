import React from 'react';
import { useParams } from 'react-router-dom';

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
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{disease.disease_name}</h1>
          {disease.scientific_name && <p className="card-text"><strong>Scientific Name:</strong> {disease.scientific_name}</p>}
          <p className="card-text"><strong>Description:</strong> {disease.description}</p>
          <p className="card-text"><strong>Symptoms:</strong> {disease.symptoms}</p>
          <p className="card-text"><strong>Treatment:</strong> {disease.treatment_recommendations}</p>
          {disease.image_url_example && <img src={disease.image_url_example} alt={disease.disease_name} className="img-fluid mt-3" />}
        </div>
      </div>
    </div>
  );
}

export default DiseaseDetail;