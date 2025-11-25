// frontend/src/components/PestListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllPests } from '../services/api';
import './DiseaseList.css'; // Reusing the same CSS for now

function PestListPage() {
  const [pests, setPests] = useState([]);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchPests = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllPests(i18n.language);
      setPests(response.data);
    } catch (err) {
      console.error('Error fetching pests:', err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError(t('pestList.sessionExpired'));
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(t('pestList.failedToLoad'));
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, t, i18n.language]);

  useEffect(() => {
    fetchPests();
  }, [fetchPests, i18n.language]);

  if (loading) return <div className="agrius-user-list-container"><p className="agrius-loading-text">{t('pestList.loadingPests')}</p></div>;
  if (error) return <div className="agrius-user-list-container"><p className="agrius-error-message">{error}</p></div>;

  return (
    <div className="agrius-user-list-container">
      <div className="agrius-user-list-header">
        <h1>{t('pestList.pageTitle')}</h1>
      </div>

      <div className="agrius-disease-cards-flex">
        {pests.map(pest => {
          const detailPath = `/pests/${pest.id}`;
          const name = i18n.language === 'id' ? pest.name_id : pest.name_en;
          const description = i18n.language === 'id' ? pest.description_id : pest.description_en;

          return (
            <div className="agrius-disease-card" key={pest.id}>
              <img 
                src={pest.image_url ? `http://localhost:5000${pest.image_url}` : 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='} 
                alt={name} 
                className="agrius-disease-card-img"
              />
              <div className="agrius-disease-card-body">
                <h5 className="agrius-card-title">{name}</h5>
                <p className="agrius-card-text">{description}</p>
                <div className="agrius-card-actions">
                  <Link to={detailPath} className="agrius-btn-secondary agrius-btn-view-details">{t('pestList.viewDetails')}</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PestListPage;
