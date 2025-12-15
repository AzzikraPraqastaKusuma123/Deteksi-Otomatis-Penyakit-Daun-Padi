// frontend/src/components/DashboardCarousel.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowRight } from 'react-icons/fi';
import './DashboardCarousel.css'; // Custom styles for the carousel

const DashboardCarousel = ({ items }) => {
  const { t } = useTranslation();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="agrius-dashboard-carousel-section">
      <h2 className="agrius-section-title">{t('userDashboard.exploreContentTitle')}</h2>
      <div className="horizontal-scroll-container">
        {items.map((item, index) => (
          <Link to={item.link} key={item.id + '-' + index} className="agrius-carousel-item-wrapper">
            <Card className="agrius-dashboard-carousel-card">
              <Card.Img variant="top" src={item.image} className="agrius-carousel-card-img" />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text className="agrius-carousel-card-type">{item.type}</Card.Text>
                <Button className="agrius-btn-primary agrius-carousel-btn">
                  {t('userDashboard.viewDetails')} <FiArrowRight />
                </Button>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardCarousel;
