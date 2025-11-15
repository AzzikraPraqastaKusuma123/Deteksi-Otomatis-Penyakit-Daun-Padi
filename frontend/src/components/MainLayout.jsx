import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'; // Import the Footer component
import './MainLayout.css';

const MainLayout = ({ loggedIn, setLoggedIn }) => {
  return (
    <div className="agrius-main-layout-wrapper">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className="agrius-main-content">
        {/* Removed Bootstrap 'container' to allow for full-width sections */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
