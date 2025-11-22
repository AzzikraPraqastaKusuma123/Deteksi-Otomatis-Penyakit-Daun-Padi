import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    navigate('/login');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar navbar-expand-lg agrius-navbar">
      {/* Section 1: Logo (Far Left) */}
      <NavLink className="navbar-brand agrius-navbar-brand agrius-logo-only" to="/">
        <img src="/logo.png" alt="PadiGuard Logo" className="agrius-logo-img" />
      </NavLink>

      {/* Bootstrap Toggler (for mobile) */}
      <button className="navbar-toggler agrius-navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Section 2 & 3 - Collapsible content for mobile / Flex for desktop */}
      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        {/* Hidden on desktop, takes full width on mobile */}
        <div className="d-lg-none"> {/* This div acts as a placeholder or can contain mobile-specific elements */}
          {loggedIn && (
            <ul className="navbar-nav mb-2">
              <li className={`nav-item dropdown ${dropdownOpen ? 'agrius-nav-link active-dropdown-parent' : ''}`}>
                <a
                  className="nav-link dropdown-toggle agrius-nav-link"
                  href="#"
                  id="navbarDropdownMobile"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {t('navbar.home')}
                </a>
                <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdownMobile">
                  <li>
                    <NavLink
                      className={({ isActive }) => (isActive ? "dropdown-item agrius-dropdown-item active" : "dropdown-item agrius-dropdown-item")}
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {t('navbar.dashboard')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => (isActive ? "dropdown-item agrius-dropdown-item active" : "dropdown-item agrius-dropdown-item")}
                      to="/detections"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {t('navbar.detection')} {/* Changed from realtimeDetect to detection */}
                    </NavLink>
                  </li>
                   <li>
                    <NavLink
                      className={({ isActive }) => (isActive ? "dropdown-item agrius-dropdown-item active" : "dropdown-item agrius-dropdown-item")}
                      to="/detect"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {t('navbar.liveDetect')} {/* New key for real-time detect */}
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? "nav-link agrius-nav-link active" : "nav-link agrius-nav-link")} to="/diseases">{t('navbar.diseaseList')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? "nav-link agrius-nav-link active" : "nav-link agrius-nav-link")} to="/agricultural-resources">{t('agriculturalResources.pageTitle')}</NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Section 2: The Menu Container (Absolute Center - Pill Shaped for desktop) */}
        <div className="agrius-menu-pill-container d-none d-lg-flex justify-content-center">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {loggedIn && (
              <>
                {/* Dropdown for Beranda (Home) */}
                <li className={`nav-item dropdown ${dropdownOpen ? 'agrius-nav-link active-dropdown-parent' : ''}`}>
                  <a
                    className="nav-link dropdown-toggle agrius-nav-link"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {t('navbar.home')}
                  </a>
                  <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                    <li>
                      <NavLink
                        className={({ isActive }) => (isActive ? "dropdown-item agrius-dropdown-item active" : "dropdown-item agrius-dropdown-item")}
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {t('navbar.dashboard')}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) => (isActive ? "dropdown-item agrius-dropdown-item active" : "dropdown-item agrius-dropdown-item")}
                        to="/detections"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {t('navbar.detection')} {/* Changed from realtimeDetect to detection */}
                      </NavLink>
                    </li>
                     <li>
                      <NavLink
                        className={({ isActive }) => (isActive ? "dropdown-item agrius-dropdown-item active" : "dropdown-item agrius-dropdown-item")}
                        to="/detect"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {t('navbar.liveDetect')} {/* New key for real-time detect */}
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

        {/* Section 3: Utilities (Far Right) - Inside collapse for mobile, but visible desktop flex item */}
        <div className="d-flex align-items-center agrius-utilities-right">
          {/* Language Switcher */}
          <div className="agrius-language-buttons-wrapper d-flex align-items-center me-2">
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
              {/* Login Link (outline style button) */}
              <NavLink className="btn agrius-btn-outline-accent" to="/login">{t('navbar.login')}</NavLink>
              {/* Register Link (outline style button) */}
              <NavLink className="btn agrius-btn-outline-accent ms-2" to="/register">{t('navbar.register')}</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;