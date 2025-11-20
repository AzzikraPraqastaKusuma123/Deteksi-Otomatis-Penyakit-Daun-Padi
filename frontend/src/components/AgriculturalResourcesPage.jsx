import React from 'react';
import { useTranslation } from 'react-i18next';
import './PageLayout.css'; // Use the shared PageLayout.css
import './AgriculturalResourcesPage.css'; // Import custom styling for this page

const AgriculturalResourcesPage = () => {
  const { t, i18n } = useTranslation(); // Include i18n instance to ensure reactivity

  // Ensure translations are loaded and react to language changes
  const pageTitle = t('agriculturalResources.pageTitle', 'Agricultural Resources for Rice Plants');
  const pageDescription = t('agriculturalResources.pageDescription', 'Comprehensive information on medicines, fertilizers, and pesticides for healthy rice cultivation.');
  const medicineTitle = t('agriculturalResources.medicineSectionTitle', 'Rice Plant Medicine');
  const fertilizerTitle = t('agriculturalResources.fertilizerSectionTitle', 'Rice Plant Fertilizer');
  const pesticideTitle = t('agriculturalResources.pesticideSectionTitle', 'Rice Plant Pesticide');

  // Medicine content with fallbacks
  const medicineContent1 = t('agriculturalResources.medicineSectionContent1', 'Explore a comprehensive list of common rice plant diseases and their treatments.');
  const medicineContent2 = t('agriculturalResources.medicineSectionContent2', 'Understand the proper application methods for medicines on rice plants.');

  // Fertilizer content with fallbacks
  const fertilizerContent1 = t('agriculturalResources.fertilizerSectionContent1', 'Discover various types of fertilizers suitable for different growth stages.');
  const fertilizerContent2 = t('agriculturalResources.fertilizerSectionContent2', 'Master the best practices for applying fertilizers.');
  const fertilizerContent3 = t('agriculturalResources.fertilizerSectionContent3', 'Guide on different types of fertilizers for rice plants.');
  const fertilizerContent4 = t('agriculturalResources.fertilizerSectionContent4', 'Types of Fertilizers for Rice.');
  const fertilizerContent5 = t('agriculturalResources.fertilizerSectionContent5', 'Fertilizer Application Techniques.');

  // Pesticide content with fallbacks
  const pesticideContent1 = t('agriculturalResources.pesticideSectionContent1', 'Identify common rice pests and effective pesticide solutions.');
  const pesticideContent2 = t('agriculturalResources.pesticideSectionContent2', 'Understand safe handling and application of pesticides.');
  const pesticideContent3 = t('agriculturalResources.pesticideSectionContent3', 'Important information about pesticides for controlling rice pests.');
  const pesticideContent4 = t('agriculturalResources.pesticideSectionContent4', 'Pest Identification & Control.');
  const pesticideContent5 = t('agriculturalResources.pesticideSectionContent5', 'Safe Pesticide Use & Alternatives.');

  return (
    <div className="agrius-page-container agricultural-resources-page">
      <h1 className="agrius-page-title">{pageTitle}</h1>
      <p className="agrius-page-description">{pageDescription}</p>

      {/* Internal Navigation */}
      <nav className="agricultural-resources-nav">
        <a href="#medicine-section">{medicineTitle}</a>
        <a href="#fertilizer-section">{fertilizerTitle}</a>
        <a href="#pesticide-section">{pesticideTitle}</a>
      </nav>

      <img src="/image/petani.jpg" alt={pageTitle} className="agricultural-resources-image" />

      {/* Medicine Section */}
      <div id="medicine-section" className="agrius-content-section">
        <h2>{medicineTitle}</h2>
        <p>{medicineContent1}</p>
        <p>{medicineContent2}</p>
      </div>

      {/* Fertilizer Section */}
      <div id="fertilizer-section" className="agrius-content-section">
        <h2>{fertilizerTitle}</h2>
        <p>{fertilizerContent1}</p>
        <p>{fertilizerContent2}</p>
        <p>{fertilizerContent3}</p>
        <p>{fertilizerContent4}</p>
        <p>{fertilizerContent5}</p>
      </div>

      {/* Pesticide Section */}
      <div id="pesticide-section" className="agrius-content-section">
        <h2>{pesticideTitle}</h2>
        <p>{pesticideContent1}</p>
        <p>{pesticideContent2}</p>
        <p>{pesticideContent3}</p>
        <p>{pesticideContent4}</p>
        <p>{pesticideContent5}</p>
      </div>
    </div>
  );
};

export default AgriculturalResourcesPage;
