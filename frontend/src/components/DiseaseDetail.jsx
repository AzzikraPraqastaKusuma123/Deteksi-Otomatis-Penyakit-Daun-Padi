// frontend/src/components/DiseaseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getDiseaseById } from '../services/api';
import './DiseaseDetail.css';
import './DiseaseList.css'; // Import for recommendation card styles

function DiseaseDetail() {
  const { t, i18n } = useTranslation();
  const { diseaseId } = useParams();
  const [disease, setDisease] = useState(null);
  const [recommendedSolutions, setRecommendedSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDiseaseDetails = async () => {
      setLoading(true);
      try {
        const response = await getDiseaseById(diseaseId, i18n.language);
        setDisease(response.data.disease);
        setRecommendedSolutions(response.data.recommendedSolutions || []);
      } catch (err) {
        console.error("Error fetching disease details:", err);
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

    fetchDiseaseDetails();
  }, [diseaseId, navigate, t, i18n.language]);

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
              src={disease.image_url_example ? `http://localhost:5000${disease.image_url_example}` : 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='} 
              className="agrius-detail-image" 
              alt={disease.disease_name}
            />
            {/* Recommended Solutions Section moved here, below the image */}
            {recommendedSolutions.length > 0 && (
              <div className="agrius-recommendations-wrapper">
                <h3 className="agrius-recommendations-title-small">{t('diseaseDetail.solutionRecs')}</h3>
                <div className="agrius-disease-cards-carousel">
                                    {recommendedSolutions.map((solution, index) => (
                                      <Link to={`/agricultural-resources/${solution.id}`} key={solution.id || index} className="agrius-disease-card agrius-carousel-card">
                                          <img
                                            src={solution.image || 'https://via.placeholder.com/300x200'}
                                            alt={solution.name}
                                            className="agrius-disease-card-img"
                                          />
                                          <div className="agrius-disease-card-body">
                                            <p className="agrius-card-subcategory">{solution.category}</p>
                                            <h5 className="agrius-card-title">{solution.name}</h5>
                                          </div>
                                        </Link>
                                    ))}
                                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-7">
          <div className="agrius-card agrius-detail-card">
            <h1 className="agrius-detail-title">{disease.disease_name}</h1>
            <div className="agrius-detail-info">
              {disease.scientific_name && (
                <div className="agrius-detail-section">
                  <h3><i className="fas fa-flask agrius-section-icon"></i> {t('diseaseDetail.scientificName')}</h3>
                  <p>{disease.scientific_name}</p>
                </div>
              )}
              
              {/* Render Gemini Summaries */}
              {disease.gemini_summary ? (
                <>
                  <div className="agrius-detail-section">
                    <h3><i className="fas fa-leaf agrius-section-icon"></i> {t('diseaseDetail.symptoms')}</h3>
                    <p>{disease.gemini_summary.symptoms?.toString()}</p>
                  </div>
                  <div className="agrius-detail-section">
                    <h3><i className="fas fa-shield-alt agrius-section-icon"></i> {t('diseaseDetail.prevention')}</h3>
                    <p>{disease.gemini_summary.prevention?.toString()}</p>
                  </div>
                  <div className="agrius-detail-section">
                    <h3><i className="fas fa-medkit agrius-section-icon"></i> {t('diseaseDetail.treatment')}</h3>
                    <p>{disease.gemini_summary.treatment?.toString()}</p>
                  </div>
                  {/* The solutions from gemini_summary are a paragraph, not product list */}
                  {disease.gemini_summary.solutions && (
                    <div className="agrius-detail-section">
                      <h3><i className="fas fa-lightbulb agrius-section-icon"></i> {t('diseaseDetail.solutionsSummary')}</h3>
                      <p>{disease.gemini_summary.solutions.toString()}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Fallback to original data if gemini_summary is not available */}
                  {disease.symptoms_original && (
                    <div className="agrius-detail-section">
                      <h3><i className="fas fa-leaf agrius-section-icon"></i> {t('diseaseDetail.symptoms')}</h3>
                      <p>{disease.symptoms_original}</p>
                    </div>
                  )}
                  {disease.prevention_original && (
                    <div className="agrius-detail-section">
                      <h3><i className="fas fa-shield-alt agrius-section-icon"></i> {t('diseaseDetail.prevention')}</h3>
                      <p>{disease.prevention_original}</p>
                    </div>
                  )}
                  {disease.treatment_original && (
                    <div className="agrius-detail-section">
                      <h3><i className="fas fa-medkit agrius-section-icon"></i> {t('diseaseDetail.treatment')}</h3>
                      <p>{disease.treatment_original}</p>
                    </div>
                  )}
                </>
              )}

              {/* Render Gemini Product Recommendations if available */}
              {disease.gemini_rekomendasi_produk_json && disease.gemini_rekomendasi_produk_json.length > 0 && (
                <div className="agrius-detail-section">
                  <h3><i className="fas fa-seedling agrius-section-icon"></i> {t('diseaseDetail.productRecs')}</h3>
                  <ul className="agrius-product-list">
                    {disease.gemini_rekomendasi_produk_json.map((product, index) => (
                      <li key={product.nama_produk || index} className="agrius-product-item text-justify">
                        <strong>{product.nama_produk}:</strong> <span dangerouslySetInnerHTML={formatTextWithBold(product.deskripsi_singkat)}></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to format text with bold for asterisks
const formatTextWithBold = (text) => {
  if (!text) return { __html: '' };
  // Replace *text* with <strong>text</strong>
  const formattedText = text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
  return { __html: formattedText };
};

export default DiseaseDetail;