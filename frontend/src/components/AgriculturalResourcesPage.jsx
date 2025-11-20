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
  
  const [resources, setResources] = useState({
    Pupuk: [],
    Pestisida: [],
    Obat: []
  });
  const [fertilizerFilter, setFertilizerFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAgriculturalResources();
      const groupedResources = response.data.reduce((acc, resource) => {
        const { category } = resource;
        if (category === 'Pupuk Organik' || category === 'Pupuk Anorganik') {
          acc.Pupuk.push(resource);
        } else if (acc[category]) {
          acc[category].push(resource);
        }
        return acc;
      }, { Pupuk: [], Pestisida: [], Obat: [] });
      setResources(groupedResources);
    } catch (err) {
      console.error('Error fetching resources:', err);
      setError(t('agriculturalResources.failedToLoad', 'Gagal memuat sumber daya.'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const renderCardGrid = (resourceList) => (
    <div className="agrius-disease-cards-flex">
      {resourceList.map(resource => (
        <Link to={`/agricultural-resources/${resource.id}`} key={resource.id} className="agrius-disease-card">
          <img 
            src={resource.image || 'https://via.placeholder.com/300x200'} 
            alt={resource.name} 
            className="agrius-disease-card-img"
          />
          <div className="agrius-disease-card-body">
            <p className="agrius-card-subcategory">{resource.category}</p>
            <h5 className="agrius-card-title">{resource.name}</h5>
            <p className="agrius-card-text">{resource.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
  
  const filteredFertilizers = resources.Pupuk
    .filter(p => {
      if (fertilizerFilter === 'Organik') return p.category === 'Pupuk Organik';
      if (fertilizerFilter === 'Anorganik') return p.category === 'Pupuk Anorganik';
      return true; // 'Semua'
    })
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (loading) return <div className="agrius-page-container"><p>{t('diseaseList.loading', 'Loading...')}</p></div>;
  if (error) return <div className="agrius-page-container"><p className="agrius-error-message">{error}</p></div>;

  const renderSection = (title, resourceList, isFertilizerSection = false) => {
    if (resourceList.length === 0 && !isFertilizerSection) return null;

    return (
      <div id={`${title.toLowerCase().replace(/ /g, '-')}-section`} className="agrius-content-section">
        <div className="agrius-list-header">
          <h2>{title}</h2>
          {isFertilizerSection && (
            <div className="agrius-filter-container" style={{ gap: '1rem' }}>
               <input
                type="text"
                placeholder={t('filter.search_fertilizer', 'Cari nama pupuk...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="agrius-filter-dropdown" // Reusing style for consistency
              />
              <select 
                className="agrius-filter-dropdown"
                value={fertilizerFilter}
                onChange={(e) => setFertilizerFilter(e.target.value)}
              >
                <option value="Semua">{t('filter.all_fertilizers', 'Semua Pupuk')}</option>
                <option value="Organik">{t('filter.organic_fertilizer', 'Pupuk Organik')}</option>
                <option value="Anorganik">{t('filter.inorganic_fertilizer', 'Pupuk Anorganik')}</option>
              </select>
            </div>
          )}
        </div>
        {resourceList.length > 0 ? 
          renderCardGrid(resourceList) : 
          <p>{t('filter.no_results', 'Tidak ada item yang cocok dengan filter Anda.')}</p>
        }
      </div>
    );
  };

  return (
    <div className="agrius-page-container agricultural-resources-page">
      <h1 className="agrius-page-title">{t('agriculturalResources.pageTitle', 'Sumber Daya Pertanian')}</h1>
      <p className="agrius-page-description">{t('agriculturalResources.pageDescription', 'Informasi lengkap mengenai obat, pupuk, dan pestisida untuk budidaya padi yang sehat.')}</p>

      {renderSection(t('agriculturalResources.fertilizerSectionTitle', 'Pupuk'), filteredFertilizers, true)}
      {renderSection(t('agriculturalResources.pesticideSectionTitle', 'Pestisida'), resources.Pestisida)}
      {renderSection(t('agriculturalResources.medicineSectionTitle', 'Obat'), resources.Obat)}
    </div>
  );
};

export default AgriculturalResourcesPage;

