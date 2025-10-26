import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
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
    </div>
  );
};

export default Sidebar;
