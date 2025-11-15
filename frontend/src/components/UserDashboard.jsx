import React from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';


const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
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
  );
};

export default UserDashboard;
