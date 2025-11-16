import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllDiseases } from '../services/api';
import { Carousel, Card, Button, Spinner } from 'react-bootstrap';
import './UserDashboard.css';

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await getAllDiseases();
        setDiseases(response.data);
      } catch (error) {
        console.error("Failed to fetch diseases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiseases();
  }, []);

  // Helper function to chunk the diseases array for carousel slides
  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  const diseaseChunks = chunk(diseases, 3); // Show 3 cards per slide

  return (
    <>
      <div className="agrius-user-dashboard">
        <div className="agrius-hero-section">
          <div className="agrius-hero-text">
            <h1>Welcome, {user?.username}!</h1>
            <p>Your partner in protecting rice crops. Ready to detect diseases and get recommendations?</p>
            <Link to="/detect" className="agrius-btn-primary agrius-hero-cta-btn">Start Detection</Link>
          </div>
        </div>

        <div className="agrius-dashboard-cards">
          <Link to="/detect" className="agrius-dashboard-card">
            <div className="agrius-card-icon">
              <i className="fas fa-upload"></i>
            </div>
            <h3>Upload Image</h3>
            <p>Upload an image of a rice leaf to detect diseases.</p>
          </Link>

          <Link to="/detections" className="agrius-dashboard-card">
            <div className="agrius-card-icon">
              <i className="fas fa-history"></i>
            </div>
            <h3>Detection History</h3>
            <p>View your past disease detection results and recommendations.</p>
          </Link>

          <Link to="/diseases" className="agrius-dashboard-card">
            <div className="agrius-card-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <h3>Disease Library</h3>
            <p>Browse the library of known rice diseases and their treatments.</p>
          </Link>
        </div>
      </div>

      {/* New Split-Screen Section 2 */}
      <div className="agrius-split-screen-section-2">
        <div className="agrius-split-screen-left-2">
          <div className="agrius-split-screen-content-wrapper-2">
            <img src="/image/petani1.png" alt="Petani Padi" className="agrius-split-screen-image-2" />
          </div>
        </div>
        <div className="agrius-split-screen-right-2">
          <div className="agrius-split-screen-content-wrapper-2">
            <h2>PadiGuard: Modern Rice Farming Solutions</h2>
            <p>PadiGuard is here to help rice farmers manage their crops more intelligently and efficiently. With advanced AI technology, we provide accurate disease detection, in-depth information, and practical recommendations to increase your harvest.</p>

            <div className="agrius-feature-cards-grid">
              <div className="agrius-feature-card">
                <i className="fas fa-leaf agrius-feature-card-icon"></i>
                <h3>Disease Detection</h3>
                <p>Upload an image of your rice leaf and get an instant, highly accurate disease diagnosis.</p>
              </div>
              <div className="agrius-feature-card">
                <i className="fas fa-history agrius-feature-card-icon"></i>
                <h3>Detection History</h3>
                <p>Review all your detection history, monitor progress, and access previous recommendations.</p>
              </div>
              <div className="agrius-feature-card">
                <i className="fas fa-book-open agrius-feature-card-icon"></i>
                <h3>Disease Library</h3>
                <p>Access a comprehensive database of rice diseases, symptoms, prevention, and treatment solutions.</p>
              </div>
              <div className="agrius-feature-card">
                <i className="fas fa-user-cog agrius-feature-card-icon"></i>
                <h3>Profile Management</h3>
                <p>Manage your account information, update personal details, and change your password easily.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="agrius-user-dashboard">
        {/* Disease Library Carousel Section */}
        <div className="agrius-disease-library-section">
          <h2 className="agrius-section-title">Disease Library</h2>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" variant="success">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Carousel indicators={false} interval={5000}>
              {diseaseChunks.map((chunk, index) => (
                <Carousel.Item key={index}>
                  <div className="d-flex justify-content-center">
                    {chunk.map((disease) => (
                      <Card key={disease.id} className="agrius-disease-card">
                        <Card.Img 
                          variant="top" 
                          src={disease.image_url || 'https://via.placeholder.com/300x200.png?text=No+Image'} 
                          className="agrius-disease-card-img"
                        />
                        <Card.Body>
                          <Card.Title>{disease.disease_name}</Card.Title>
                          <Card.Text className="agrius-disease-card-text">
                            {disease.description.substring(0, 100)}...
                          </Card.Text>
                          <Button as={Link} to={`/diseases/${disease.id}`} className="agrius-btn-primary">View Details</Button>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>

        {/* New Split-Screen Section */}
        <div className="agrius-split-screen-section">
          <div className="agrius-split-screen-left">
            <h2>Empowering Farmers with Smart Solutions</h2>
            <p>Discover how our advanced AI-powered system helps you identify rice leaf diseases quickly and accurately, providing timely insights for better crop management and higher yields. Join our community of successful farmers today!</p>
            <Link to="/about" className="agrius-btn-primary agrius-split-screen-cta">Learn More</Link>
          </div>
          <div className="agrius-split-screen-right">
            <img src="https://via.placeholder.com/600x400.png?text=Rice+Farmer" alt="Rice Farmer" className="agrius-split-screen-image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
