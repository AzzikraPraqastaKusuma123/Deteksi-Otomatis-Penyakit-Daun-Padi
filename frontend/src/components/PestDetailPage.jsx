// frontend/src/components/PestDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPestById } from '../services/api';
import './DiseaseDetail.css'; // Reusing the same CSS for now

function PestDetailPage() {
  const { t, i18n } = useTranslation();
  const { pestId } = useParams();
  const [pest, setPest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPestDetails = async () => {
      setLoading(true);
      try {
        const response = await getPestById(pestId, i18n.language);
        setPest(response.data);
      } catch (err) {
        console.error("Error fetching pest details:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError(t('pestDetail.sessionExpired'));
          setTimeout(() => navigate('/login'), 1500);
        } else if (err.response && err.response.status === 404) {
          setError(t('pestDetail.notFound'));
        } else {
          setError(t('pestDetail.failedToLoad'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPestDetails();
  }, [pestId, navigate, t, i18n.language]);

  if (loading) return <div className="agrius-detail-container"><p className="agrius-loading-text">{t('pestDetail.loadingDetails')}</p></div>;
  if (error) return <div className="agrius-detail-container"><p className="agrius-error-message">{error}</p></div>;
  if (!pest) return <div className="agrius-detail-container"><p className="agrius-no-data-message">{t('pestDetail.noData')}</p></div>;

  return (
    <div className="agrius-detail-container">
      <Link to="/pests" className="agrius-back-link"><i className="fas fa-arrow-left me-2"></i>{t('pestDetail.backToList')}</Link>
      <div className="row agrius-detail-row">
        <div className="col-md-5">
          <div className="agrius-card agrius-detail-card">
            <img 
              src={pest.image_url ? `http://localhost:5000${pest.image_url}` : 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='} 
              className="agrius-detail-image" 
              alt={pest.name}
            />
          </div>
        </div>

        <div className="col-md-7">
          <div className="agrius-card agrius-detail-card">
            <h1 className="agrius-detail-title">{pest.name}</h1>
            <div className="agrius-detail-info">
              {pest.scientific_name && (
                <div className="agrius-detail-section">
                  <h3><i className="fas fa-flask agrius-section-icon"></i> {t('pestDetail.scientificName')}</h3>
                  <p>{pest.scientific_name}</p>
                </div>
              )}
              {pest.description && (
                <div className="agrius-detail-section">
                  <h3><i className="fas fa-leaf agrius-section-icon"></i> {t('pestDetail.description')}</h3>
                  <p>{pest.description}</p>
                </div>
              )}
              {pest.symptoms && (
                <div className="agrius-detail-section">
                  <h3><i className="fas fa-shield-alt agrius-section-icon"></i> {t('pestDetail.symptoms')}</h3>
                  <p>{pest.symptoms}</p>
                </div>
              )}
              {pest.prevention && (
                <div className="agrius-detail-section">
                  <h3><i className="fas fa-medkit agrius-section-icon"></i> {t('pestDetail.prevention')}</h3>
                  <p>{pest.prevention}</p>
                </div>
              )}
               {pest.treatment && (
                <div className="agrius-detail-section">
                  <h3><i className="fas fa-medkit agrius-section-icon"></i> {t('pestDetail.treatment')}</h3>
                  <p>{pest.treatment}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PestDetailPage;
