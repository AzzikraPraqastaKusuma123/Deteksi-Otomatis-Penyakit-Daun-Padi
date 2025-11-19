// frontend/src/components/DiseaseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getDiseaseById } from '../services/api';
import './DiseaseDetail.css';

function DiseaseDetail() {
  const { t } = useTranslation();
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
          setError(t('diseaseDetail.sessionExpired'));
          setTimeout(() => navigate('/login'), 1500);
        } else if (err.response && err.response.status === 404) {
          setError(t('diseaseDetail.notFound'));
        } else {
          setError(t('diseaseDetail.failedToLoad'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDisease();
  }, [diseaseId, navigate, t]);

  // Tentukan konteks (admin atau user) agar tombol Back mengarah ke list yang sesuai
  const isAdminContext = location.pathname.startsWith('/admin');
  const backTo = isAdminContext ? '/admin/diseases' : '/diseases';

  if (loading) return <div className="agrius-detail-container"><p className="agrius-loading-text">{t('diseaseDetail.loadingDetails')}</p></div>;
  if (error) return <div className="agrius-detail-container"><p className="agrius-error-message">{error}</p></div>;
  if (!disease) return <div className="agrius-detail-container"><p className="agrius-no-data-message">{t('diseaseDetail.noData')}</p></div>;

  return (
    <div className="agrius-detail-container">
      <Link to={backTo} className="agrius-back-link"><i className="fas fa-arrow-left me-2"></i>{t('diseaseDetail.backToList')}</Link>
      <div className="row agrius-detail-row">
        <div className="col-md-5">
          <div className="agrius-card agrius-detail-card">
            <img 
              src={disease.image_url_example || `https://placehold.co/600x400/4CAF50/FFFFFF?text=${encodeURIComponent(disease.disease_name)}`} 
              className="agrius-detail-image" 
              alt={disease.disease_name}
            />
          </div>
        </div>

        <div className="col-md-7">
          <div className="agrius-card agrius-detail-card">
            <h1 className="agrius-detail-title">{disease.disease_name}</h1>
            <div className="agrius-detail-info">
              {disease.scientific_name && <p><strong>{t('diseaseDetail.scientificName')}</strong> {disease.scientific_name}</p>}
              <p><strong>{t('diseaseDetail.description')}</strong> {disease.description}</p>
              {disease.symptoms && <p><strong>{t('diseaseDetail.symptoms')}</strong> {disease.symptoms}</p>}
              {disease.prevention && <p><strong>{t('diseaseDetail.prevention')}</strong> {disease.prevention}</p>}
              {disease.treatment_recommendations && <p><strong>{t('diseaseDetail.treatment')}</strong> {disease.treatment_recommendations}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiseaseDetail;
