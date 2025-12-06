import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { getDetectionById } from '../services/api'; // Import the new API function
import './DetailedAnalysisPage.css';
import './DiseaseList.css'; // Import for recommendation card styles

const DetailedAnalysisPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const [detectionData, setDetectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetectionDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getDetectionById(id, i18n.language); 
        setDetectionData(response.data);
      } catch (err) {
        console.error("Failed to fetch detection details:", err);
        setError("Failed to load detection details. Please try again or check the ID."); 
      } finally {
        setLoading(false);
      }
    };

    // New logic: Check for state from navigation first
    if (location.state && location.state.prediction) {
      setDetectionData(location.state.prediction);
      setLoading(false);
    } else if (id) {
      // Fallback to fetching if ID is present
      fetchDetectionDetails();
    } else {
      // No ID and no state, so it's an error or invalid access
      setError("No detection data found. Please perform a new detection.");
      setLoading(false);
    }
  }, [id, i18n.language, location.state, navigate]);

  if (loading) {
    return (
      <div className="detailed-analysis-page">
        <div className="loading-container">
          <h2>{t('detailedAnalysis.loadingAnalysis')}</h2> {/* Use translation */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detailed-analysis-page">
        <div className="error-container">
          <h2>{t('detailedAnalysis.errorTitle')}: {error}</h2> {/* Use translation */}
          <p>{t('detailedAnalysis.errorPrompt')}</p> {/* Use translation */}
          <button onClick={() => navigate('/detections')} className="btn-back">
            {t('detailedAnalysis.backToDetections')} {/* Use translation */}
          </button>
        </div>
      </div>
    );
  }

  if (!detectionData) {
    return (
      <div className="detailed-analysis-page">
        <div className="error-container">
          <h2>{t('detailedAnalysis.detectionNotFoundTitle')}</h2> {/* Use translation */}
          <p>{t('detailedAnalysis.detectionNotFoundPrompt')}</p> {/* Use translation */}
          <button onClick={() => navigate('/detections')} className="btn-back">
            {t('detailedAnalysis.backToDetections')} {/* Use translation */}
          </button>
        </div>
      </div>
    );
  }

  const { disease, generativeInfo, image_url, recommendedSolutions } = detectionData; // Destructure from detectionData
  const serverBaseUrl = 'http://localhost:5000';

  return (
    <div className="detailed-analysis-page">
      <div className="analysis-header">
        <h1>{t('detailedAnalysis.pageTitle')}</h1> {/* Use translation */}
        <button onClick={() => navigate('/detect')} className="btn-back">
          <i className="fas fa-arrow-left"></i> {t('detailedAnalysis.newDetection')} {/* Use translation */}
        </button>
      </div>

      <div className="content-grid">
        <div className="main-content">
          {/* Moved Detected Image card here */}
          <div className="disease-header-layout">
            <div className="image-card">
              <img src={`${serverBaseUrl}${image_url}`} alt="Detected" className="detected-image" />
            </div>
            <div className="result-header-detailed">
              <h2>{disease.replace(/_/g, ' ')}</h2>
            </div>
          </div>
          <div className="result-card-detailed">

            {/* Gemini Error Display */}
            {generativeInfo && generativeInfo.error && (
              <div className="gemini-error">
                <h4><i className="fas fa-exclamation-triangle"></i> {t('detailedAnalysis.aiInfoFailedTitle')}</h4> {/* Use translation */}
                <p>{t('detailedAnalysis.aiInfoFailedPrompt')}</p> {/* Use translation */}
                <pre>Detail: {JSON.stringify(generativeInfo.message || 'Unknown error', null, 2)}</pre>
              </div>
            )}

            {/* Gemini Content */}
            {generativeInfo && !generativeInfo.error && disease !== 'Healthy Rice Leaf' && (
              <div className="gemini-info-detailed">
                <div className="gemini-section-detailed">
                  <h4><i className="fas fa-info-circle"></i> {t('detailedAnalysis.analysisSummary')}</h4> {/* Use translation */}
                  <p className="text-justify">
                    <strong>{t('detailedAnalysis.description')}:</strong> {generativeInfo.informasi_detail 
                      ? generativeInfo.informasi_detail.replace(/\*/g, '').replace(/\n/g, ' ')
                      : t('detailedAnalysis.noDetailedInfoFromAI')} {/* Use translation */}
                  </p>
                  <p className="text-justify">
                    <strong>{t('detailedAnalysis.prevention')}:</strong> {generativeInfo.solusi_penyembuhan 
                      ? generativeInfo.solusi_penyembuhan.replace(/\*/g, '').replace(/\n/g, ' ')
                      : t('detailedAnalysis.noSolutionInfoFromAI')} {/* Use translation */}
                  </p>
                </div>

                {generativeInfo.rekomendasi_produk && generativeInfo.rekomendasi_produk.length > 0 && (
                  <div className="gemini-section-detailed">
                    <h4><i className="fas fa-prescription-bottle-alt"></i> {t('detailedAnalysis.productRecommendations')}</h4> {/* Use translation */}
                    <ul className="product-list-detailed">
                      {generativeInfo.rekomendasi_produk.map((product, index) => (
                        <li key={index} className="product-item-detailed text-justify">
                          <strong>{product.nama_produk}</strong>: <span dangerouslySetInnerHTML={formatTextWithBold(product.deskripsi_singkat)}></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Healthy Leaf Message */}
            {disease === 'Healthy Rice Leaf' && (
              <div className="gemini-info-detailed healthy-leaf-detailed">
                <p>{t('detailedAnalysis.healthyLeafMessage')}</p> {/* Use translation */}
              </div>
            )}

            {/* Grass Message */}
            {disease === 'Grass' && (
              <div className="gemini-info-detailed grass-leaf-detailed">
                <p>{detectionData.description}</p>
              </div>
            )}

            {/* Recommended Solutions Section from DB */}
            {recommendedSolutions && recommendedSolutions.length > 0 && (
              <div className="agrius-recommendations-wrapper">
                <h3 className="agrius-recommendations-title-small">{t('detailedAnalysis.recommendedResources')}</h3> {/* Use translation */}

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
      </div>
    </div>
  );
};

// Helper function to format text with bold for asterisks
const formatTextWithBold = (text) => {
  if (!text) return { __html: '' };
  // Replace *text* with <strong>text</strong>
  const formattedText = text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
  return { __html: formattedText };
};

export default DetailedAnalysisPage;