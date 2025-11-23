import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom'; // Import Link
import './DetailedAnalysisPage.css';
import './DiseaseList.css'; // Import for recommendation card styles

const DetailedAnalysisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction } = location.state || {}; // Safely access state
  console.log("Data received on Detailed Analysis Page:", prediction); // Debugging line

  if (!prediction) {
    return (
      <div className="detailed-analysis-page">
        <div className="error-container">
          <h2>Error: No Analysis Data</h2>
          <p>No analysis data was found. Please go back and perform a new detection.</p>
          <button onClick={() => navigate('/detect')} className="btn-back">
            Back to Detection
          </button>
        </div>
      </div>
    );
  }

  const { disease, generativeInfo, image_url, recommendedSolutions } = prediction; // Destructure recommendedSolutions
  const serverBaseUrl = 'http://localhost:5000';

  return (
    <div className="detailed-analysis-page">
      <div className="analysis-header">
        <h1>In-depth AI Analysis</h1>
        <button onClick={() => navigate('/detect')} className="btn-back">
          <i className="fas fa-arrow-left"></i> New Detection
        </button>
      </div>

      <div className="content-grid">
        <div className="main-content">
          <div className="result-card-detailed">
            <div className="result-header-detailed">
              <h2>{disease.replace(/_/g, ' ')}</h2>
            </div>

            {/* Gemini Error Display */}
            {generativeInfo && generativeInfo.error && (
              <div className="gemini-error">
                <h4><i className="fas fa-exclamation-triangle"></i> Failed to Get AI Info</h4>
                <p>An error occurred while trying to retrieve additional information from the AI service.</p>
                <pre>Detail: {JSON.stringify(generativeInfo.message || 'Unknown error', null, 2)}</pre>
              </div>
            )}

            {/* Gemini Content */}
            {generativeInfo && !generativeInfo.error && disease !== 'Healthy Rice Leaf' && (
              <div className="gemini-info-detailed">
                <div className="gemini-section-detailed">
                  <h4><i className="fas fa-info-circle"></i> Ringkasan Analisis</h4>
                  <p className="text-justify">
                    <strong>Deskripsi:</strong> {generativeInfo.informasi_detail 
                      ? generativeInfo.informasi_detail.replace(/\*/g, '').replace(/\n/g, ' ')
                      : 'No detailed information available from AI.'}
                  </p>
                  <p className="text-justify">
                    <strong>Pencegahan:</strong> {generativeInfo.solusi_penyembuhan 
                      ? generativeInfo.solusi_penyembuhan.replace(/\*/g, '').replace(/\n/g, ' ')
                      : 'No solution and healing information available from AI.'}
                  </p>
                </div>

                {generativeInfo.rekomendasi_produk && generativeInfo.rekomendasi_produk.length > 0 && (
                  <div className="gemini-section-detailed">
                    <h4><i className="fas fa-prescription-bottle-alt"></i> Product Recommendations</h4>
                    <ul className="product-list-detailed">
                      {generativeInfo.rekomendasi_produk.map((product, index) => (
                        <li key={index} className="product-item-detailed">
                          <strong>{product.nama_produk}</strong>: {product.deskripsi_singkat}
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
                <p>The rice leaf appears to be healthy! Based on our AI analysis, no treatment is necessary. Continue to maintain good farming practices such as balanced fertilization and proper irrigation to keep your plants healthy.</p>
              </div>
            )}

            {/* Recommended Solutions Section from DB */}
            {recommendedSolutions && recommendedSolutions.length > 0 && (
              <div className="agrius-recommendations-wrapper">
                <h3 className="agrius-recommendations-title-small">Recommended Agricultural Resources</h3>

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
        <div className="sidebar-content">
          <div className="image-card">
            <h3>Detected Image</h3>
            <img src={`${serverBaseUrl}${image_url}`} alt="Detected" className="detected-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedAnalysisPage;