// frontend/src/components/DiseaseList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllDiseases } from '../services/api';
import './DiseaseList.css';

function DiseaseList() {
  const [diseases, setDiseases] = useState([]);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const fetchDiseases = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllDiseases(i18n.language);
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
  }, [navigate, t, i18n.language]);

  useEffect(() => {
    fetchDiseases();
  }, [fetchDiseases, i18n.language]);

  const handleDelete = async (diseaseId) => {
    if (window.confirm(t('diseaseList.deleteConfirm'))) {
      try {
        await api.delete(`/diseases/${diseaseId}`); // Use api.delete from services/api
        fetchDiseases(); // Refresh the list
      } catch (err) {
        console.error('Error deleting disease:', err);
        alert(t('diseaseList.failedToDelete'));
      }
    }
  };

  const isAdminContext = location.pathname.startsWith('/admin');

  if (loading) return <div className="agrius-user-list-container"><p className="agrius-loading-text">{t('diseaseList.loadingDiseases')}</p></div>;
  if (error) return <div className="agrius-user-list-container"><p className="agrius-error-message">{error}</p></div>;

  return (
    <div className="agrius-user-list-container">
      <div className="agrius-user-list-header">
        <h1>{t('diseaseList.pageTitle')}</h1>
        {isAdminContext && (
          <div className="agrius-header-actions">
            <Link to="/admin/diseases/add" className="agrius-btn-primary agrius-btn-add-user">
              <i className="fas fa-plus"></i> {t('diseaseList.addDisease')}
            </Link>
          </div>
        )}
      </div>

      {loading ? (
        <div className="agrius-loading-container"><p className="agrius-loading-text">{t('diseaseList.loadingDiseases')}</p></div>
      ) : error ? (
        <div className="agrius-loading-container"><p className="agrius-error-message">{error}</p></div>
      ) : isAdminContext ? ( // Admin context: render table
        <div className="agrius-table-responsive">
          <table className="agrius-user-table">
            <thead>
              <tr>
                <th>{t('diseaseList.tableHeaderImage')}</th>
                <th>{t('diseaseList.tableHeaderDiseaseName')}</th>
                <th>{t('diseaseList.tableHeaderScientificName')}</th>
                <th>{t('diseaseList.tableHeaderActions')}</th>
              </tr>
            </thead>
            <tbody>
              {diseases.length > 0 ? (
                diseases.map(disease => {
                  const detailPath = `/admin/diseases/${disease.id}`;
                  const editPath = `/admin/diseases/edit/${disease.id}`;

                  return (
                    <tr key={disease.id}>
                      <td>
                        <img 
                          src={disease.image_url_example ? `http://localhost:5000${disease.image_url_example}` : 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='} 
                          alt={disease.disease_name} 
                          className="agrius-resource-image-thumbnail" // Reusing class for thumbnail
                        />
                      </td>
                      <td>{disease.disease_name}</td>
                      <td>{disease.scientific_name || '-'}</td>
                      <td className="agrius-action-buttons">
                        <Link to={editPath} className="agrius-btn-action agrius-btn-edit">
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <button onClick={() => handleDelete(disease.id)} className="agrius-btn-action agrius-btn-delete">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                        <Link to={detailPath} className="agrius-btn-action agrius-btn-view">
                          <i className="fas fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="agrius-no-diseases-found">{t('diseaseList.noDiseasesFound')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : ( // Non-admin context: render cards
        <div className="agrius-disease-cards-flex">
          {diseases.map(disease => {
            const detailPath = `/diseases/${disease.id}`; // Non-admin detail path

            return (
              <div className="agrius-disease-card" key={disease.id}>
                <img 
                  src={disease.image_url_example ? `http://localhost:5000${disease.image_url_example}` : 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='} 
                  alt={disease.disease_name} 
                  className="agrius-disease-card-img"
                />
                <div className="agrius-disease-card-body">
                  <h5 className="agrius-card-title">{disease.disease_name}</h5>
                  
                  {(() => {
                    const explanation = disease.gemini_informasi_detail || disease.description;
                    const solution = disease.gemini_solusi_penyembuhan;

                    const truncate = (text, length) => (text && text.length > length) ? text.substring(0, length) + '...' : text;
                    
                    const truncatedExplanation = truncate(explanation, 100);

                    if (!truncatedExplanation && !solution) {
                      return <p className="agrius-card-text">{t('diseaseList.noDescription', 'No description available.')}</p>;
                    }

                    return (
                      <>
                        {truncatedExplanation && (
                          <p className="agrius-card-text">{truncatedExplanation}</p>
                        )}
                        {solution && (
                          <div className="agrius-gemini-summary mt-2">
                            <p className="agrius-gemini-info-text">
                              <strong>{t('diseaseList.aiSolution', 'Solusi AI')}:</strong> {truncate(solution, 80)}
                            </p>
                          </div>
                        )}
                      </>
                    );
                  })()}
                  
                  <div className="agrius-card-actions">
                    <Link to={detailPath} className="agrius-btn-secondary agrius-btn-view-details">{t('diseaseList.viewDetails')}</Link>
                    {/* Admin actions not visible in user context */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DiseaseList;
