import React from 'react';
import { useTranslation } from 'react-i18next';
import './PageLayout.css'; // Import generic PageLayout.css

const PesticidePage = () => {
  const { t } = useTranslation();

  return (
    <div className="agrius-page-container">
      <h1 className="agrius-page-title">{t('pesticide.pageTitle')}</h1>
      <p className="agrius-page-description">{t('pesticide.pageDescription')}</p>

      <div className="agrius-content-section">
        <h2>{t('pesticide.section1Title')}</h2>
        <p>{t('pesticide.section1Content')}</p>
      </div>

      <div className="agrius-content-section">
        <h2>{t('pesticide.section2Title')}</h2>
        <p>{t('pesticide.section2Content')}</p>
      </div>
    </div>
  );
};

export default PesticidePage;
