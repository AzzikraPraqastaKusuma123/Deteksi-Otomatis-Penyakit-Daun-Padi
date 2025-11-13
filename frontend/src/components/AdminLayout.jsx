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
    <div className={`admin-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <main className="admin-content">
        <Outlet />
      </main>
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
};

export default AdminLayout;