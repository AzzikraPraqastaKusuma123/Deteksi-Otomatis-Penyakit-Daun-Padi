import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // New state for mobile menu

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`agrius-sidebar ${isCollapsed ? 'agrius-sidebar-collapsed' : ''} ${isMobileMenuOpen ? 'agrius-sidebar-open' : ''}`}>
      <div className="agrius-sidebar-header">
        <h3>PadiGuard</h3>
        <button className="agrius-sidebar-toggle" onClick={toggleSidebar}>
          <i className="fas fa-chevron-left"></i>
        </button>
        {/* New: Mobile menu toggle button */}
        <button className="agrius-menu-toggle" onClick={handleMobileMenuToggle}>
          <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>
      </div>
      <ul className="agrius-sidebar-nav">
        <li>
          <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'agrius-nav-link active' : 'agrius-nav-link')}>
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/detections" className={({ isActive }) => (isActive ? 'agrius-nav-link active' : 'agrius-nav-link')}>
            <i className="fas fa-camera-retro"></i>
            <span>All Detections</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'agrius-nav-link active' : 'agrius-nav-link')}>
            <i className="fas fa-users"></i>
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/diseases" className={({ isActive }) => (isActive ? 'agrius-nav-link active' : 'agrius-nav-link')}>
            <i className="fas fa-leaf"></i>
            <span>Diseases</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/agricultural-resources" className={({ isActive }) => (isActive ? 'agrius-nav-link active' : 'agrius-nav-link')}>
            <i className="fas fa-tractor"></i>
            <span>Sumber Daya</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/pests" className={({ isActive }) => (isActive ? 'agrius-nav-link active' : 'agrius-nav-link')}>
            <i className="fas fa-bug"></i>
            <span>Pests</span>
          </NavLink>
        </li>
        {/* Add more admin links here */}
      </ul>
      <div className="agrius-sidebar-footer">
        <button onClick={handleLogout} className="agrius-logout-btn">
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;