import React from 'react';
import { useTranslation } from 'react-i18next';
import './PageLayout.css'; // Import generic PageLayout.css

const MedicinePage = () => {
  const { t } = useTranslation();

  return (
    <div className="agrius-page-container">
      <h1 className="agrius-page-title">{t('medicine.pageTitle')}</h1>
      <p className="agrius-page-description">{t('medicine.pageDescription')}</p>

      <div className="agrius-content-section">
        <h2>{t('medicine.section1Title')}</h2>
        <p>{t('medicine.section1Content')}</p>
      </div>

      <div className="agrius-content-section">
        <h2>{t('medicine.section2Title')}</h2>
        <p>{t('medicine.section2Content')}</p>
      </div>
    </div>
  );
};

export default MedicinePage;
