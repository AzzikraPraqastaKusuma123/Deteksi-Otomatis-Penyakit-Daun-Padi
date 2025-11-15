import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Keep custom CSS for specific overrides

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg agrius-navbar">
      <div className="container-fluid">
        <NavLink className="navbar-brand agrius-navbar-brand" to="/">
          <img src="/logo.png" alt="PadiGuard Logo" className="agrius-logo-img" />
        </NavLink>
        <button className="navbar-toggler agrius-navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {loggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? "nav-link agrius-nav-link active" : "nav-link agrius-nav-link")} to="/dashboard">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? "nav-link agrius-nav-link active" : "nav-link agrius-nav-link")} to="/detections">Detections</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? "nav-link agrius-nav-link active" : "nav-link agrius-nav-link")} to="/diseases">Diseases</NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {loggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => (isActive ? "nav-link agrius-nav-link profile-link active" : "nav-link agrius-nav-link profile-link")} 
                    to="/profile" 
                    title="Profile"
                  >
                    <i className="fas fa-user"></i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="btn agrius-btn-secondary" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link agrius-nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="btn agrius-btn-primary" to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;