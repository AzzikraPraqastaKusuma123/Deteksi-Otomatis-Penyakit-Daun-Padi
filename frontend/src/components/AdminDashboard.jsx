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
    <div className="agrius-admin-dashboard">
      <header className="agrius-dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, Admin! Here's an overview of your application.</p>
      </header>

      <div className="agrius-dashboard-stats">
        <div className="agrius-stat-card">
          <div className="agrius-stat-card-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="agrius-stat-card-info">
            <p>Total Users</p>
            <h3>{userCount}</h3>
          </div>
        </div>
        <div className="agrius-stat-card">
          <div className="agrius-stat-card-icon">
            <i className="fas fa-camera-retro"></i>
          </div>
          <div className="agrius-stat-card-info">
            <p>Total Detections</p>
            <h3>{detectionCount}</h3>
          </div>
        </div>
        <div className="agrius-stat-card">
          <div className="agrius-stat-card-icon">
            <i className="fas fa-leaf"></i>
          </div>
          <div className="agrius-stat-card-info">
            <p>Total Diseases</p>
            <h3>{diseaseCount}</h3>
          </div>
        </div>
      </div>

      <div className="agrius-dashboard-main-content">
        <div className="agrius-chart-container">
          <h2>Detections Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--agrius-neutral-gray-1)" />
              <XAxis dataKey="name" stroke="var(--agrius-neutral-gray-1)" />
              <YAxis stroke="var(--agrius-neutral-gray-1)" />
              <Tooltip cursor={{ fill: 'rgba(255, 251, 239, 0.3)' }} contentStyle={{ backgroundColor: 'var(--agrius-cream-off-white)', borderColor: 'var(--agrius-neutral-gray-1)', color: 'var(--color-text-dark)' }} />
              <Legend wrapperStyle={{ color: 'var(--color-text-dark)' }} />
              <Bar dataKey="count" fill="var(--color-primary-bg)" /> {/* Agrius Forest Green Dark */}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="agrius-quick-actions">
          <h2>Quick Actions</h2>
          <Link to="/admin/users" className="agrius-btn-secondary agrius-quick-action-btn">
            <i className="fas fa-user-cog"></i>
            <span>Manage Users</span>
          </Link>
          <Link to="/admin/diseases/add" className="agrius-btn-primary agrius-quick-action-btn">
            <i className="fas fa-plus-circle"></i>
            <span>Add New Disease</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;