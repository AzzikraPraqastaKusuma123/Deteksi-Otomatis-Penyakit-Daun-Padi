import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>PadiGuard</h3>
      </div>
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-users"></i>
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/diseases" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fas fa-leaf"></i>
            <span>Diseases</span>
          </NavLink>
        </li>
        {/* Add more admin links here */}
      </ul>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;