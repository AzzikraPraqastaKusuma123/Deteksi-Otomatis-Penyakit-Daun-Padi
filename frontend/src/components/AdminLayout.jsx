import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer'; // Import the Footer component
import './AdminLayout.css';
import './Responsive.css'; /* Import the new responsive styles */

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`agrius-admin-layout ${isSidebarCollapsed ? 'agrius-sidebar-collapsed' : ''}`}>
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <main className="agrius-admin-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;