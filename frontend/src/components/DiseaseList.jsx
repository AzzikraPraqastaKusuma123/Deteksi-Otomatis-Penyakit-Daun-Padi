// frontend/src/components/DiseaseList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllDiseases, deleteDisease } from '../services/api';
import './DiseaseList.css';

function DiseaseList() {
  const { t } = useTranslation();
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const fetchDiseases = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllDiseases();
      setDiseases(response.data);
    } catch (err) {
      console.error('Error fetching diseases:', err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError(t('diseaseList.sessionExpired'));
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(t('diseaseList.failedToLoad'));
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, t]);

  useEffect(() => {
    fetchDiseases();
  }, [fetchDiseases]);

  const handleDelete = async (diseaseId) => {
    if (window.confirm('Are you sure you want to delete this disease?')) {
      try {
        await deleteDisease(diseaseId);
        fetchDiseases(); // Refresh the list
      } catch (err) {
        console.error('Error deleting disease:', err);
        alert('Failed to delete disease.');
      }
    }
  };

  const isAdminContext = location.pathname.startsWith('/admin');

  if (loading) return <div className="agrius-disease-list-container"><p className="agrius-loading-text">{t('diseaseList.loadingDiseases')}</p></div>;
  if (error) return <div className="agrius-disease-list-container"><p className="agrius-error-message">{error}</p></div>;

  return (
    <div className="agrius-disease-list-container">
      <div className="agrius-list-header">
        <h1>{t('diseaseList.pageTitle')}</h1>
        {isAdminContext && <Link to="/admin/diseases/add" className="agrius-btn-primary agrius-btn-add-new">{t('diseaseList.addDisease')}</Link>}
      </div>

      <div className="agrius-disease-cards-flex">
        {diseases.map(disease => {
          const detailPath = isAdminContext
            ? `/admin/diseases/${disease.id}`
            : `/diseases/${disease.id}`;
          const editPath = `/admin/diseases/edit/${disease.id}`;

          return (
            <div className="agrius-disease-card" key={disease.id}>
              <img 
                src={disease.image_url_example ? `http://localhost:5000${disease.image_url_example}` : 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='} 
                alt={disease.disease_name} 
                className="agrius-disease-card-img"
              />
              <div className="agrius-disease-card-body">
                <h5 className="agrius-card-title">{disease.disease_name}</h5>
                <p className="agrius-card-text">{disease.description || t('diseaseList.noDescription')}</p>
                <div className="agrius-card-actions">
                  <Link to={detailPath} className="agrius-btn-secondary agrius-btn-view-details">{t('diseaseList.viewDetails')}</Link>
                  {isAdminContext && (
                    <>
                      <Link to={editPath} className="agrius-btn-action agrius-btn-edit">
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                      <button onClick={() => handleDelete(disease.id)} className="agrius-btn-action agrius-btn-delete">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DiseaseList;
