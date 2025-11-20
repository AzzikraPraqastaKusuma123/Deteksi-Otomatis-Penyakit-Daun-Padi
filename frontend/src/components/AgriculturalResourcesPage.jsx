// frontend/src/components/AgriculturalResourcesPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAgriculturalResources } from '../services/api';
import './DiseaseList.css'; // Borrow styles from DiseaseList for card consistency
import './AgriculturalResourcesPage.css'; // Keep original page styles for headers etc.

const AgriculturalResourcesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [resources, setResources] = useState({ Pupuk: [], Pestisida: [], Obat: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAgriculturalResources();
      // Group resources by category
      const groupedResources = response.data.reduce((acc, resource) => {
        const { category } = resource;
        if (!acc[category]) {
          // Initialize with an empty array if category doesn't exist
          acc[category] = [];
        }
        acc[category].push(resource);
        return acc;
      }, { Pupuk: [], Pestisida: [], Obat: [] }); // Ensure all categories are initialized
      setResources(groupedResources);
    } catch (err) {
      console.error('Error fetching resources:', err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError(t('diseaseList.sessionExpired')); // Reusing translation
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(t('agriculturalResources.failedToLoad', 'Gagal memuat sumber daya.'));
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, t]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const renderResourceSection = (title, resourceList) => (
    <div id={`${title.toLowerCase()}-section`} className="agrius-content-section">
      <div className="agrius-list-header" style={{ marginBottom: 'var(--spacing-lg)' }}>
        <h2>{title}</h2>
      </div>
      {resourceList.length > 0 ? (
        <div className="agrius-disease-cards-flex">
          {resourceList.map(resource => (
            <Link to={`/agricultural-resources/${resource.id}`} key={resource.id} className="agrius-disease-card">
              <img 
                src={resource.image || 'https://via.placeholder.com/300x200'} 
                alt={resource.name} 
                className="agrius-disease-card-img"
              />
              <div className="agrius-disease-card-body">
                <h5 className="agrius-card-title">{resource.name}</h5>
                <p className="agrius-card-text">{resource.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>{t('agriculturalResources.noItems', `Belum ada item untuk kategori ${title}`)}</p>
      )}
    </div>
  );

  if (loading) return <div className="agrius-page-container"><p>{t('diseaseList.loading', 'Loading...')}</p></div>;
  if (error) return <div className="agrius-page-container"><p className="agrius-error-message">{error}</p></div>;

  return (
    <div className="agrius-page-container agricultural-resources-page">
      <h1 className="agrius-page-title">{t('agriculturalResources.pageTitle', 'Sumber Daya Pertanian')}</h1>
      <p className="agrius-page-description">{t('agriculturalResources.pageDescription', 'Informasi lengkap mengenai obat, pupuk, dan pestisida untuk budidaya padi yang sehat.')}</p>

      {renderResourceSection(t('agriculturalResources.fertilizerSectionTitle', 'Pupuk'), resources.Pupuk)}
      {renderResourceSection(t('agriculturalResources.pesticideSectionTitle', 'Pestisida'), resources.Pestisida)}
      {renderResourceSection(t('agriculturalResources.medicineSectionTitle', 'Obat'), resources.Obat)}
    </div>
  );
};

export default AgriculturalResourcesPage;

