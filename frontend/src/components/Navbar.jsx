import React, { useState } from 'react'; // Import useState for dropdown
import { NavLink, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { useTranslation } from 'react-i18next';
import './Navbar.css'; // Keep custom CSS for specific overrides

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const { t, i18n } = useTranslation(); // Destructure i18n here
  const navigate = useNavigate();
  const location = useLocation(); // To check active path for dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    navigate('/login');
  };

  const changeLanguage = (lng) => {
    console.log(`Attempting to change language to: ${lng}`);
    i18n.changeLanguage(lng);
  };

  // Determine if 'Beranda' dropdown parent link should be active
  const isBerandaActive = location.pathname === '/dashboard' || location.pathname === '/realtime-detect';

  return (
    <nav className="navbar navbar-expand-lg agrius-navbar d-flex justify-content-between align-items-center">
      {/* Left Section: Logo and Nav Links */}
      <div className="d-flex align-items-center"> {/* Group for Left Section */}
        <NavLink className="navbar-brand agrius-navbar-brand" to="/">
          <img src="/logo.png" alt="PadiGuard Logo" className="agrius-logo-img" />
          <span className="agrius-brand-text">PadiGuard</span> {/* Consolidated brand text */}
        </NavLink>
        <button className="navbar-toggler agrius-navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-2 mb-2 mb-lg-0"> {/* Adjusted margin for spacing */}
            {loggedIn && (
              <>
                {/* Dropdown for Beranda (Home) */}
                <li className={`nav-item dropdown ${isBerandaActive ? 'agrius-nav-link active-dropdown-parent' : ''}`}>
                  <a 
                    className="nav-link dropdown-toggle agrius-nav-link" 
                    href="#" 
                    id="navbarDropdown" 
                    role="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown state manually
                  >
                    {t('navbar.home')}
                  </a>
                  <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                    <li>
                      <NavLink 
                        className={({ isActive }) => (isActive ? "dropdown-item agrius-dropdown-item active" : "dropdown-item agrius-dropdown-item")} 
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)} // Close dropdown on item click
                      >
                        {t('navbar.dashboard')}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink 
                        className={({ isActive }) => (isActive ? "dropdown-item agrius-dropdown-item active" : "dropdown-item agrius-dropdown-item")} 
                        to="/realtime-detect"
                        onClick={() => setDropdownOpen(false)} // Close dropdown on item click
                      >
                        {t('navbar.realtimeDetect')} {/* This is the new "Deteksi" */}
                      </NavLink>
                    </li>
                  </ul>
                </li>
                {/* Main links after Beranda Dropdown */}
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? "nav-link agrius-nav-link active" : "nav-link agrius-nav-link")} to="/diseases">{t('navbar.diseaseList')}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? "nav-link agrius-nav-link active" : "nav-link agrius-nav-link")} to="/agricultural-resources">{t('agriculturalResources.pageTitle')}</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Right Section: Language Switcher, Profile, Action Button */}
      <div className="d-flex align-items-center"> {/* Group for Right Section */}
        {/* Language Switcher */}
        <div className="agrius-language-buttons-wrapper d-flex align-items-center me-2"> {/* Added me-2 for spacing */}
          <button 
            className={`btn agrius-lang-btn ${i18n.language === 'en' ? 'active' : ''}`} 
            onClick={() => changeLanguage('en')} 
            title={t('language.english')}
          >
            🇬🇧
          </button>
          <button 
            className={`btn agrius-lang-btn ${i18n.language === 'id' ? 'active' : ''}`} 
            onClick={() => changeLanguage('id')} 
            title={t('language.indonesian')}
          >
            🇮🇩
          </button>
        </div>

        {loggedIn ? (
          <>
            {/* User Profile Icon */}
            <NavLink 
              className={({ isActive }) => (isActive ? "nav-link agrius-nav-link profile-link active" : "nav-link agrius-nav-link profile-link")} 
              to="/profile" 
              title={t('navbar.profile')}
            >
              <i className="fas fa-user"></i>
            </NavLink>
            {/* Logout Button (Outline Style) */}
            <button className="btn agrius-btn-outline-accent ms-2" onClick={handleLogout}>{t('navbar.logout')}</button>
          </>
        ) : (
          <>
            {/* Login Link (now outline style button) */}
            <NavLink className="btn agrius-btn-outline-accent" to="/login">{t('navbar.login')}</NavLink>
            {/* Register Link (now outline style button) */}
            <NavLink className="btn agrius-btn-outline-accent ms-2" to="/register">{t('navbar.register')}</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;