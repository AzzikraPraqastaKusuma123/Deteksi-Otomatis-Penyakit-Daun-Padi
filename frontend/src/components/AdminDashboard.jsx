import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  // Placeholders for other stats
  const [detectionCount, setDetectionCount] = useState(125);
  const [diseaseCount, setDiseaseCount] = useState(15);

  useEffect(() => {
    // In a real app, you would fetch these counts from your API
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => {
        setUserCount(data.length);
      })
      .catch(error => {
        console.error('Error fetching user count:', error);
      });
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Dashboard</h1>
      <p>Welcome back, Admin! Here's an overview of your application.</p>

      <div className="dashboard-stats">
        <div className="stat-card users">
          <div className="stat-card-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-card-info">
            <p>Total Users</p>
            <h3>{userCount}</h3>
          </div>
        </div>
        <div className="stat-card detections">
          <div className="stat-card-icon">
            <i className="fas fa-camera-retro"></i>
          </div>
          <div className="stat-card-info">
            <p>Total Detections</p>
            <h3>{detectionCount}</h3>
          </div>
        </div>
        <div className="stat-card diseases">
          <div className="stat-card-icon">
            <i className="fas fa-leaf"></i>
          </div>
          <div className="stat-card-info">
            <p>Total Diseases</p>
            <h3>{diseaseCount}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-main-content">
        <div className="chart-container">
          <h2>Detections Overview</h2>
          {/* In a real app, you would use a charting library like Chart.js or Recharts */}
          <div className="chart-placeholder">
            <p>Chart will be displayed here</p>
          </div>
        </div>
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <Link to="/admin/users" className="quick-action-btn">Manage Users</Link>
          <Link to="/admin/diseases/add" className="quick-action-btn">Add New Disease</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
