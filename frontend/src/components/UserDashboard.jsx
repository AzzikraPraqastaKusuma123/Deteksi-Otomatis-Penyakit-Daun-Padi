import React from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';
import Detection from './Detection'; // Import the new component

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="user-dashboard">
      <div className="hero-section">
        <div className="hero-text">
          <h1>Welcome, {user?.username}!</h1>
          <p>Your partner in protecting rice crops. Ready to detect diseases and get recommendations?</p>
          {/* Tombol ini bisa diarahkan ke section scan atau halaman upload */}
          <a href="#camera-scan" className="hero-cta-btn">Start Camera Scan</a>
        </div>
      </div>

      {/* New Camera Detection Section */}
      <div id="camera-scan" className="dashboard-section">
        <Detection />
      </div>

      <div className="dashboard-cards">
        <Link to="/detections/add" className="dashboard-card detect">
          <div className="card-icon">
            <i className="fas fa-upload"></i>
          </div>
          <h3>Upload Image</h3>
          <p>Upload an image of a rice leaf to detect diseases.</p>
        </Link>

        <Link to="/detections" className="dashboard-card history">
          <div className="card-icon">
            <i className="fas fa-history"></i>
          </div>
          <h3>Detection History</h3>
          <p>View your past disease detection results and recommendations.</p>
        </Link>

        <Link to="/diseases" className="dashboard-card diseases">
          <div className="card-icon">
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
