import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAgriculturalResources, getAllPests, getAllDiseases } from '../services/api';
import { Spinner } from 'react-bootstrap';
import './UserDashboard.css';
import AnimatedCard from './AnimatedCard'; // Import the new component
import DashboardCarousel from './DashboardCarousel'; // Import DashboardCarousel
import HomepageDiseaseList from './HomepageDiseaseList'; // Import HomepageDiseaseList

const UserDashboard = () => {
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  const [carouselItems, setCarouselItems] = useState([]);

  const diseaseCarouselSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

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
          description: d.description, // Correctly map the description
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
              <AnimatedCard delay={0.1}><div className="agrius-feature-card"><i className="fas fa-leaf agrius-feature-card-icon"></i><h3>{t('userDashboard.featureDetection')}</h3><p>{t('userDashboard.featureDetectionDesc')}</p></div></AnimatedCard>
              <AnimatedCard delay={0.2}><div className="agrius-feature-card"><i className="fas fa-history agrius-feature-card-icon"></i><h3>{t('userDashboard.featureHistory')}</h3><p>{t('userDashboard.featureHistoryDesc')}</p></div></AnimatedCard>
              <AnimatedCard delay={0.3}><div className="agrius-feature-card"><i className="fas fa-book-open agrius-feature-card-icon"></i><h3>{t('userDashboard.featureLibrary')}</h3><p>{t('userDashboard.featureLibraryDesc')}</p></div></AnimatedCard>
              <AnimatedCard delay={0.4}><div className="agrius-feature-card"><i className="fas fa-user-cog agrius-feature-card-icon"></i><h3>{t('userDashboard.featureProfile')}</h3><p>{t('userDashboard.featureProfileDesc')}</p></div></AnimatedCard>
            </div>
          </div>
        </div>
      </div>

      {/* New Carousel Section */}
      {!loading && carouselItems.length > 0 && <DashboardCarousel items={carouselItems} />}

      {/* Disease Library Section - Refactored */}
      <div className="agrius-user-dashboard-container">
        <div className="disease-library-header">
          <h2>{t('userDashboard.diseaseLibrarySectionTitle')}</h2>
          <p className="disease-library-subtitle">
            {t('userDashboard.diseaseLibrarySectionDescription', 'Kumpulan informasi penyakit padi lengkap dengan ciri-ciri visual dan penjelasan singkat untuk membantu pengguna mengenali penyakit sejak dini.')}
          </p>
        </div>
        <HomepageDiseaseList diseases={diseases} />
      </div>
    </>
  );
};

export default UserDashboard;

