import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'; // Import the Footer component
import './MainLayout.css';

const MainLayout = ({ loggedIn, setLoggedIn }) => {
  return (
    <div>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </div>
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
};

export default MainLayout;
