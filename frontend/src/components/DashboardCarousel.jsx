// frontend/src/components/DashboardCarousel.jsx
import React, { useRef, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowRight } from 'react-icons/fi';
import './DashboardCarousel.css'; // Custom styles for the carousel

const DashboardCarousel = ({ items }) => {
  const { t } = useTranslation();
  const scrollRef = useRef(null); // Ref for the scroll container
  const scrollIntervalRef = useRef(null); // Ref for the interval ID

  console.log("DashboardCarousel rendered. Items:", items); // Debug log

  // Auto-scrolling logic
  useEffect(() => {
    console.log("DashboardCarousel useEffect ran. scrollRef.current:", scrollRef.current); // Debug log
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) {
      console.log("Scroll container not found."); // Debug log
      return;
    }

    const scrollSpeed = 1; // Pixels per interval tick
    const intervalTime = 15; // Milliseconds between ticks

    const startScrolling = () => {
      scrollIntervalRef.current = setInterval(() => {
        scrollContainer.scrollLeft += scrollSpeed;

        // If scrolled to the end, reset to beginning
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }, intervalTime);
    };

    const stopScrolling = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };

    // Start auto-scrolling
    startScrolling();

    // Pause on hover
    scrollContainer.addEventListener('mouseenter', stopScrolling);
    scrollContainer.addEventListener('mouseleave', startScrolling);

    // Pause on manual scroll (and resume after a short delay)
    let scrollTimeout;
    const handleManualScroll = () => {
      stopScrolling();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(startScrolling, 1000); // Resume after 1 second of no manual scroll
    };
    scrollContainer.addEventListener('scroll', handleManualScroll);


    // Cleanup on component unmount
    return () => {
      stopScrolling();
      scrollContainer.removeEventListener('mouseenter', stopScrolling);
      scrollContainer.removeEventListener('mouseleave', startScrolling);
      scrollContainer.removeEventListener('scroll', handleManualScroll);
      clearTimeout(scrollTimeout);
    };
  }, [items]); // Re-run effect if items change

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="agrius-dashboard-carousel-section">
      <div className="agrius-carousel-content-wrapper">
        <div className="carousel-inner-container">
          <h2 className="agrius-section-title">{t('userDashboard.exploreContentTitle')}</h2>
          <div className="horizontal-scroll-container" ref={scrollRef}>
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
      </div>
    </div>
  );
};

export default DashboardCarousel;
