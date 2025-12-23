// frontend/src/components/HomepageDiseaseList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './HomepageDiseaseList.css'; // Import the new CSS

function HomepageDiseaseList({ diseases }) {
  const { t } = useTranslation();

  // Defensive check to prevent crash if diseases is not an array
  if (!Array.isArray(diseases)) {
    return null; // or render a loading/error state
  }

  return (
    <div className="agrius-homepage-disease-cards-grid">
      {diseases.map(disease => {
        const detailPath = `/diseases/${disease.id}`;

        return (
          <div className="agrius-homepage-disease-card" key={disease.id}>
            <div className="agrius-homepage-disease-image-container">
              <img
                src={disease.image} // Use the image prop directly as it contains the full URL
                alt={disease.name}
                className="agrius-homepage-disease-image"
              />
              <Link to={detailPath} className="agrius-homepage-view-details-btn">
                {t('diseaseList.viewDetails')}
              </Link>
            </div>
            <div className="agrius-homepage-disease-card-body">
              <h5 className="agrius-homepage-disease-card-title">{disease.name}</h5>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HomepageDiseaseList;
