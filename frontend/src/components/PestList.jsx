// frontend/src/components/PestList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllPests, deletePest } from '../services/api';
import './PestList.css';

function PestList() {
  const [pests, setPests] = useState([]);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleDelete = async (pestId) => {
    if (window.confirm(t('pestList.deleteConfirm'))) {
      try {
        await deletePest(pestId);
        fetchPests(); 
      } catch (err) {
        console.error('Error deleting pest:', err);
        alert(t('pestList.failedToDelete'));
      }
    }
  };

  const isAdminContext = location.pathname.startsWith('/admin');

  if (loading) return <div className="agrius-user-list-container"><p className="agrius-loading-text">{t('pestList.loadingPests')}</p></div>;
  if (error) return <div className="agrius-user-list-container"><p className="agrius-error-message">{error}</p></div>;

  return (
    <div className="agrius-user-list-container">
      <div className="agrius-user-list-header">
        <h1>{t('pestList.pageTitle')}</h1>
        {isAdminContext && (
          <div className="agrius-header-actions">
            <Link to="/admin/pests/add" className="agrius-btn-primary agrius-btn-add-user">
              <i className="fas fa-plus"></i> {t('pestList.addPest')}
            </Link>
          </div>
        )}
      </div>

      {loading ? (
        <div className="agrius-loading-container"><p className="agrius-loading-text">{t('pestList.loadingPests')}</p></div>
      ) : error ? (
        <div className="agrius-loading-container"><p className="agrius-error-message">{error}</p></div>
      ) : isAdminContext ? ( // Admin context: render table
        <div className="agrius-table-responsive">
          <table className="agrius-user-table">
            <thead>
              <tr>
                <th>{t('pestList.tableHeaderImage')}</th>
                <th>{t('pestList.tableHeaderPestName')}</th>
                <th>{t('pestList.tableHeaderScientificName')}</th>
                <th>{t('pestList.tableHeaderActions')}</th>
              </tr>
            </thead>
            <tbody>
              {pests.length > 0 ? (
                pests.map(pest => {
                  const detailPath = `/admin/pests/${pest.id}`;
                  const editPath = `/admin/pests/edit/${pest.id}`;
                  const name = i18n.language === 'id' ? pest.name_id : pest.name_en;

                  return (
                    <tr key={pest.id}>
                      <td>
                        <img 
                          src={pest.image_url ? `http://localhost:5000${pest.image_url}` : 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='} 
                          alt={name} 
                          className="agrius-resource-image-thumbnail"
                        />
                      </td>
                      <td>{name}</td>
                      <td>{pest.scientific_name || '-'}</td>
                      <td className="agrius-action-buttons">
                        <Link to={editPath} className="agrius-btn-action agrius-btn-edit">
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <button onClick={() => handleDelete(pest.id)} className="agrius-btn-action agrius-btn-delete">
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
                  <td colSpan="4" className="agrius-no-pests-found">{t('pestList.noPestsFound')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : ( // Non-admin context: render cards
        <div className="agrius-disease-cards-flex">
          {pests.map(pest => {
            const detailPath = `/pests/${pest.id}`; // Non-admin detail path
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
                  
                  {(() => {
                    const explanation = description;
                    const solution = i18n.language === 'id' ? pest.treatment_id : pest.treatment_en;

                    const truncate = (text, length) => (text && text.length > length) ? text.substring(0, length) + '...' : text;
                    
                    const truncatedExplanation = truncate(explanation, 100);

                    if (!truncatedExplanation && !solution) {
                      return <p className="agrius-card-text">{t('pestList.noDescription', 'No description available.')}</p>;
                    }

                    return (
                      <>
                        {truncatedExplanation && (
                          <p className="agrius-card-text">{truncatedExplanation}</p>
                        )}
                        {solution && (
                          <div className="agrius-gemini-summary mt-2">
                            <p className="agrius-gemini-info-text">
                              <strong>{t('pestList.aiSolution', 'Solusi AI')}:</strong> {truncate(solution, 80)}
                            </p>
                          </div>
                        )}
                      </>
                    );
                  })()}
                  
                  <div className="agrius-card-actions">
                    <Link to={detailPath} className="agrius-btn-secondary agrius-btn-view-details">{t('pestList.viewDetails')}</Link>
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

export default PestList;
