import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllDiseases } from '../services/api';
import { Card, Button, Spinner } from 'react-bootstrap';
import './UserDashboard.css';

const UserDashboard = () => {
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await getAllDiseases(i18n.language);
        setDiseases(response.data);
      } catch (error) {
        console.error("Failed to fetch diseases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiseases();
  }, [i18n.language]);



  return (
    <>
      <div className="agrius-user-dashboard">
        <div className="agrius-hero-section">
          <div className="agrius-hero-text">
            <h1>{t('userDashboard.welcome', { username: user?.username })}</h1>
            <p>{t('userDashboard.promo')}</p>
            <Link to="/detect" className="agrius-btn-primary agrius-hero-cta-btn">{t('userDashboard.startDetection')}</Link>
          </div>
        </div>

        {/* Responsive Dashboard Cards */}
        <div className="agrius-dashboard-cards-flex">
          <Link to="/detect" className="agrius-dashboard-card">
            <div className="agrius-card-icon">
              <i className="fas fa-upload"></i>
            </div>
            <h3>{t('userDashboard.uploadImage')}</h3>
            <p>{t('userDashboard.uploadImageDesc')}</p>
          </Link>

          <Link to="/detections" className="agrius-dashboard-card">
            <div className="agrius-card-icon">
              <i className="fas fa-history"></i>
            </div>
            <h3>{t('userDashboard.detectionHistory')}</h3>
            <p>{t('userDashboard.detectionHistoryDesc')}</p>
          </Link>

          <Link to="/diseases" className="agrius-dashboard-card">
            <div className="agrius-card-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <h3>{t('userDashboard.diseaseLibrary')}</h3>
            <p>{t('userDashboard.diseaseLibraryDesc')}</p>
          </Link>
        </div>
      </div>

      {/* New Split-Screen Section 2 */}
      <div className="agrius-split-screen-section-2">
        <div className="agrius-split-screen-left-2">
          <div className="agrius-split-screen-content-wrapper-2">
            <img src="/image/petani1.png" alt="Petani Padi" className="agrius-split-screen-image-2" />
          </div>
        </div>
        <div className="agrius-split-screen-right-2">
          <div className="agrius-split-screen-content-wrapper-2">
            <h2>{t('userDashboard.modernSolutionsTitle')}</h2>
            <p>{t('userDashboard.modernSolutionsDesc')}</p>

            <div className="agrius-feature-cards-grid">
              <div className="agrius-feature-card">
                <i className="fas fa-leaf agrius-feature-card-icon"></i>
                <h3>{t('userDashboard.featureDetection')}</h3>
                <p>{t('userDashboard.featureDetectionDesc')}</p>
              </div>
              <div className="agrius-feature-card">
                <i className="fas fa-history agrius-feature-card-icon"></i>
                <h3>{t('userDashboard.featureHistory')}</h3>
                <p>{t('userDashboard.featureHistoryDesc')}</p>
              </div>
              <div className="agrius-feature-card">
                <i className="fas fa-book-open agrius-feature-card-icon"></i>
                <h3>{t('userDashboard.featureLibrary')}</h3>
                <p>{t('userDashboard.featureLibraryDesc')}</p>
              </div>
              <div className="agrius-feature-card">
                <i className="fas fa-user-cog agrius-feature-card-icon"></i>
                <h3>{t('userDashboard.featureProfile')}</h3>
                <p>{t('userDashboard.featureProfileDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="agrius-user-dashboard">
        {/* Disease Library Carousel Section */}
        <div className="agrius-disease-library-section">
          <h2 className="agrius-section-title">{t('userDashboard.diseaseLibrarySectionTitle')}</h2>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" variant="success">
                <span className="visually-hidden">{t('userDashboard.loading')}</span>
              </Spinner>
            </div>
          ) : (
            <div className="agrius-disease-cards-container">
              {diseases.map((disease) => (
                <Card key={disease.id} className="agrius-disease-card">
                  <Card.Img 
                    variant="top" 
                    src={disease.image_url_example ? `http://localhost:5000${disease.image_url_example}` : 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='} 
                    className="agrius-disease-card-img"
                  />
                  <Card.Body>
                    <Card.Title>{disease[`disease_name_${i18n.language}`]}</Card.Title>
                    {/* Display Gemini Info */}
                    {disease.gemini_informasi_detail && (
                      <Card.Text className="agrius-disease-card-text">
                        <strong>{t('diseaseList.aiInfo')}:</strong> {disease.gemini_informasi_detail}
                      </Card.Text>
                    )}
                    {disease.gemini_solusi_penyembuhan && (
                      <Card.Text className="agrius-disease-card-text">
                        <strong>{t('diseaseList.aiSolution')}:</strong> {disease.gemini_solusi_penyembuhan}
                      </Card.Text>
                    )}
                    {disease.gemini_rekomendasi_produk && disease.gemini_rekomendasi_produk.length > 0 && (
                      <Card.Text className="agrius-disease-card-text">
                        <strong>{t('diseaseList.productRecs')}:</strong> {disease.gemini_rekomendasi_produk.length} {t('diseaseList.productsFound')}
                      </Card.Text>
                    )}
                    {/* Fallback to original description if no Gemini info is available */}
                    {!disease.gemini_informasi_detail && !disease.gemini_solusi_penyembuhan && (
                      <Card.Text className="agrius-disease-card-text">
                        {disease[`description_${i18n.language}`] || t('diseaseList.noDescription')}
                      </Card.Text>
                    )}
                    <Button as={Link} to={`/diseases/${disease.id}`} className="agrius-btn-primary">{t('userDashboard.viewDetails')}</Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* New Split-Screen Section */}
        <div className="agrius-split-screen-section">
          <div className="agrius-split-screen-left">
            <h2>{t('userDashboard.empoweringFarmersTitle')}</h2>
            <p>{t('userDashboard.empoweringFarmersDesc')}</p>
            <Link to="/about" className="agrius-btn-primary agrius-split-screen-cta">{t('userDashboard.learnMore')}</Link>
          </div>
          <div className="agrius-split-screen-right">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Rice Farmer" className="agrius-split-screen-image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
