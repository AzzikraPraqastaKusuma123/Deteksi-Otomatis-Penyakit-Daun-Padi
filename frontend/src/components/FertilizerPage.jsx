import React from 'react';
import { useTranslation } from 'react-i18next';
import './PageLayout.css'; // Import generic PageLayout.css

const FertilizerPage = () => {
  const { t } = useTranslation();

  return (
    <div className="agrius-page-container">
      <h1 className="agrius-page-title">{t('fertilizer.pageTitle')}</h1>
      <p className="agrius-page-description">{t('fertilizer.pageDescription')}</p>

      <div className="agrius-content-section">
        <h2>{t('fertilizer.section1Title')}</h2>
        <p>{t('fertilizer.section1Content')}</p>
      </div>

      <div className="agrius-content-section">
        <h2>{t('fertilizer.section2Title')}</h2>
        <p>{t('fertilizer.section2Content')}</p>
      </div>
    </div>
  );
};

export default FertilizerPage;
