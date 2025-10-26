import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Welcome, {user?.username}!</h1>
          <p>This is your personal dashboard.</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-camera-retro fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Detect Disease</h5>
              <p className="card-text">Upload an image of a rice leaf to detect diseases.</p>
              <Link to="/detections/add" className="btn btn-primary">Add Detection</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-history fa-3x text-success mb-3"></i>
              <h5 className="card-title">Detection History</h5>
              <p className="card-text">View your past disease detection results.</p>
              <Link to="/detections" className="btn btn-success">View History</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
