// frontend/src/components/AgriculturalResourceDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAgriculturalResourceById } from '../services/api';
import './DiseaseDetail.css'; // Reusing the existing CSS for consistency
import './DiseaseList.css';   // Reusing for the card styles

function AgriculturalResourceDetail() {
  const [resource, setResource] = useState(null);
  const [relatedDiseases, setRelatedDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchResource = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAgriculturalResourceById(id);
      setResource(response.data.resource);
      setRelatedDiseases(response.data.relatedDiseases || []);
    } catch (err) {
      console.error('Error fetching resource details:', err);
      setError('Gagal memuat detail sumber daya. Mungkin tidak ada atau terjadi kesalahan server.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchResource();
  }, [fetchResource]);

  if (loading) {
    return <div className="agrius-detail-container"><p className="agrius-loading-text">Loading...</p></div>;
  }

  if (error) {
    return <div className="agrius-detail-container"><p className="agrius-error-message">{error}</p></div>;
  }

  if (!resource) {
    return <div className="agrius-detail-container"><p className="agrius-no-data-message">Sumber daya tidak ditemukan.</p></div>;
  }

  return (
    <div className="agrius-detail-container">
      <Link to="/agricultural-resources" className="agrius-back-link">
        <i className="fas fa-arrow-left"></i>
        <span>Kembali ke Semua Sumber Daya</span>
      </Link>
      
      <div className="agrius-detail-card">
        <h1 className="agrius-detail-title">{resource.name}</h1>
        <div className="agrius-detail-row">
          <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
            {resource.image && (
              <img src={resource.image} alt={resource.name} className="agrius-detail-image" />
            )}
          </div>
          <div style={{ flex: '1 1 500px' }}>
            <div className="agrius-detail-info">
              <div className="agrius-detail-section">
                <h3>
                  <i className="fas fa-tag agrius-section-icon"></i>
                  Kategori
                </h3>
                <p><strong>{resource.category}</strong></p>
              </div>
              <div className="agrius-detail-section">
                <h3>
                  <i className="fas fa-align-left agrius-section-icon"></i>
                  Deskripsi Lengkap
                </h3>
                <p>{resource.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Diseases Section */}
      {relatedDiseases.length > 0 && (
        <div className="agrius-recommendations-section">
          <h2 className="agrius-recommendations-title">Efektif Untuk Mengatasi</h2>
          <div className="agrius-disease-cards-flex">
            {relatedDiseases.map(disease => (
              <Link to={`/diseases/${disease.id}`} key={disease.id} className="agrius-disease-card">
                <img 
                  src={disease.image_url_example || 'https://via.placeholder.com/300x200'} 
                  alt={disease.disease_name} 
                  className="agrius-disease-card-img"
                />
                <div className="agrius-disease-card-body">
                  <h5 className="agrius-card-title">{disease.disease_name}</h5>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AgriculturalResourceDetail;
