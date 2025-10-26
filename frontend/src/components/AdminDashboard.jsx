import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './AdminDashboard.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [detectionCount, setDetectionCount] = useState(0);
  const [diseaseCount, setDiseaseCount] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [users, detections, diseases] = await Promise.all([
          api.get('/users'),
          api.get('/detections/count'),
          api.get('/diseases/count')
        ]);
        console.log('users:', users);
        console.log('detections:', detections);
        console.log('diseases:', diseases);
        setUserCount(users.data.length);
        setDetectionCount(detections.data.count);
        setDiseaseCount(diseases.data.count);

        // Mock data for the chart
        setChartData([
          { name: 'Users', count: users.data.length },
          { name: 'Detections', count: detections.data.count },
          { name: 'Diseases', count: diseases.data.count },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, Admin! Here's an overview of your application.</p>
      </header>

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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3498db" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <Link to="/admin/users" className="quick-action-btn">
            <i className="fas fa-user-cog"></i>
            <span>Manage Users</span>
          </Link>
          <Link to="/admin/diseases/add" className="quick-action-btn">
            <i className="fas fa-plus-circle"></i>
            <span>Add New Disease</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;