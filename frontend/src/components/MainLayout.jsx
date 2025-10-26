import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
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
    </div>
  );
};

export default MainLayout;
