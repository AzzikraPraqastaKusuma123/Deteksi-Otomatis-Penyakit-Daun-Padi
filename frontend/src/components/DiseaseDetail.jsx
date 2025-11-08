// frontend/src/components/DiseaseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { getDiseaseById } from '../services/api';
import './DiseaseDetail.css';

function DiseaseDetail() {
  const { diseaseId } = useParams(); // sesuai route '/:diseaseId'
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const response = await getDiseaseById(diseaseId);
        setDisease(response.data);
      } catch (err) {
        console.error("Error fetching disease:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError('Sesi Anda berakhir. Silakan login kembali.');
          setTimeout(() => navigate('/login'), 1500);
        } else if (err.response && err.response.status === 404) {
          setError('Penyakit tidak ditemukan.');
        } else {
          setError('Gagal memuat data penyakit.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDisease();
  }, [diseaseId, navigate]);

  // Tentukan konteks (admin atau user) agar tombol Back mengarah ke list yang sesuai
  const isAdminContext = location.pathname.startsWith('/admin');
  const backTo = isAdminContext ? '/admin/diseases' : '/diseases';

  if (loading) return <div className="detail-container"><p>Loading details...</p></div>;
  if (error) return <div className="detail-container"><p className="error-message">{error}</p></div>;
  if (!disease) return <div className="detail-container"><p>No disease data.</p></div>;

  return (
    <div className="detail-container">
      <Link to={backTo} className="back-link"><i className="fas fa-arrow-left me-2"></i>Back to Disease List</Link>
      <div className="row">
        <div className="col-md-5">
          <div className="card detail-card">
            <img 
              src={disease.image_url_example || `https://placehold.co/600x400/4CAF50/FFFFFF?text=${encodeURIComponent(disease.disease_name)}`} 
              className="detail-image" 
              alt={disease.disease_name}
            />
          </div>
        </div>

        <div className="col-md-7">
          <div className="card detail-card">
            <h1 className="detail-title">{disease.disease_name}</h1>
            <div className="detail-info">
              {disease.scientific_name && <p><strong>Scientific Name:</strong> {disease.scientific_name}</p>}
              <p><strong>Description:</strong> {disease.description}</p>
              {disease.symptoms && <p><strong>Symptoms:</strong> {disease.symptoms}</p>}
              {disease.prevention && <p><strong>Prevention:</strong> {disease.prevention}</p>}
              {disease.treatment_recommendations && <p><strong>Treatment:</strong> {disease.treatment_recommendations}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiseaseDetail;
