import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllDiseases, getAllPests, getAgriculturalResources } from '../services/api';
import { Card, Button, Spinner } from 'react-bootstrap';
import './UserDashboard.css';

const UserDashboard = () => {
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  const [carouselItems, setCarouselItems] = useState([]);
  const [carouselLoading, setCarouselLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [diseaseRes, pestRes, resourceRes] = await Promise.all([
          getAllDiseases(i18n.language),
          getAllPests(i18n.language),
          getAgriculturalResources() // No lang param for this one
        ]);

        // Process diseases
        const diseaseData = diseaseRes.data.map(d => ({
          id: d.id,
          type: t('userDashboard.carouselTypeDisease', 'Penyakit'),
          name: d.disease_name,
          image: d.image_url_example ? `http://localhost:5000${d.image_url_example}` : 'https://via.placeholder.com/300x200?text=No+Image',
          link: `/diseases/${d.id}`
        }));
        setDiseases(diseaseData); // Still set diseases for the original library section
        
        // Process pests
        const pestData = pestRes.data.map(p => ({
          id: p.id,
          type: t('userDashboard.carouselTypePest', 'Hama'),
          name: p[`name_${i18n.language}`] || p.name_id,
          image: p.image_url ? `http://localhost:5000${p.image_url}` : 'https://via.placeholder.com/300x200?text=No+Image',
          link: `/pests/${p.id}`
        }));

        // Process agricultural resources
        const resourceData = resourceRes.data.map(r => ({
          id: r.id,
          type: r.category || t('userDashboard.carouselTypeResource', 'Sumber Daya'),
          name: r.name,
          image: r.image || 'https://via.placeholder.com/300x200?text=No+Image',
          link: `/agricultural-resources/${r.id}`
        }));

        // Combine and shuffle for the carousel
        const combined = [...diseaseData, ...pestData, ...resourceData];
        const shuffled = combined.sort(() => 0.5 - Math.random());
        setCarouselItems(shuffled);

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false); // For original disease list
        setCarouselLoading(false); // For new carousel
      }
    };

    fetchAllData();
  }, [i18n.language, t]);

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
              <div className="agrius-feature-card"><i className="fas fa-leaf agrius-feature-card-icon"></i><h3>{t('userDashboard.featureDetection')}</h3><p>{t('userDashboard.featureDetectionDesc')}</p></div>
              <div className="agrius-feature-card"><i className="fas fa-history agrius-feature-card-icon"></i><h3>{t('userDashboard.featureHistory')}</h3><p>{t('userDashboard.featureHistoryDesc')}</p></div>
              <div className="agrius-feature-card"><i className="fas fa-book-open agrius-feature-card-icon"></i><h3>{t('userDashboard.featureLibrary')}</h3><p>{t('userDashboard.featureLibraryDesc')}</p></div>
              <div className="agrius-feature-card"><i className="fas fa-user-cog agrius-feature-card-icon"></i><h3>{t('userDashboard.featureProfile')}</h3><p>{t('userDashboard.featureProfileDesc')}</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="agrius-user-dashboard">
        <div className="agrius-disease-library-section">
          <h2 className="agrius-section-title">{t('userDashboard.diseaseLibrarySectionTitle')}</h2>
          {loading ? (
            <div className="text-center"><Spinner animation="border" role="status" variant="success"><span className="visually-hidden">{t('userDashboard.loading')}</span></Spinner></div>
          ) : (
            <div className="agrius-disease-cards-container">
              {diseases.map((disease) => (
                <Card key={disease.id} className="agrius-disease-card">
                  <Card.Img variant="top" src={disease.image} className="agrius-disease-card-img" />
                  <Card.Body>
                    <Card.Title>{disease.name}</Card.Title>
                    <Card.Text className="agrius-card-text">{disease.description || t('diseaseList.noDescription')}</Card.Text>
                    <Button as={Link} to={disease.link} className="agrius-btn-primary">{t('userDashboard.viewDetails')}</Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </div>


      </div>
    </>
  );
};

export default UserDashboard;
