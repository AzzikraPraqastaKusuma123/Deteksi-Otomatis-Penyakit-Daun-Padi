import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const Navbar = ({ loggedIn }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Outside click handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`agrius-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="agrius-navbar-container">
        <NavLink className="agrius-navbar-logo" to="/">
          <img src="/logo.png" alt="PadiGuard Logo" />
        </NavLink>

        {/* --- DESKTOP NAVIGATION --- */}
        {loggedIn && (
          <div className="agrius-desktop-nav">
            <ul className="agrius-nav-links">
              <li className="agrius-nav-dropdown" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="agrius-nav-link-button">
                  {t('navbar.home')} <FiChevronDown className={`agrius-chevron ${isDropdownOpen ? 'open' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <div className="agrius-dropdown-menu">
                    <NavLink to="/detections" onClick={() => setDropdownOpen(false)}>{t('navbar.detectionHistory')}</NavLink>
                    <NavLink to="/detect" onClick={() => setDropdownOpen(false)}>{t('navbar.liveDetect')}</NavLink>
                  </div>
                )}
              </li>
              <li><NavLink to="/diseases">{t('navbar.diseaseList')}</NavLink></li>
              <li><NavLink to="/agricultural-resources">{t('agriculturalResources.pageTitle')}</NavLink></li>
              <li><NavLink to="/pests">{t('navbar.pestList')}</NavLink></li>
            </ul>
          </div>
        )}

        {/* --- UTILITIES --- */}
        <div className="agrius-navbar-utils">
          <div className="agrius-language-switcher">
            <button className={`agrius-lang-btn ${i18n.language === 'en' ? 'active' : ''}`} onClick={() => changeLanguage('en')} title="English">EN</button>
            <button className={`agrius-lang-btn ${i18n.language === 'id' ? 'active' : ''}`} onClick={() => changeLanguage('id')} title="Bahasa Indonesia">ID</button>
          </div>
          <div className="agrius-auth-buttons">
            {loggedIn ? (
              <>
                <NavLink to="/profile" className="agrius-profile-icon" title={t('navbar.profile')}>
                    <i className="fas fa-user"></i>
                </NavLink>
              </>
            ) : (
              <button className="agrius-btn-primary" onClick={() => navigate('/login')}>{t('navbar.login')}</button>
            )}
          </div>
          
          {loggedIn && (
            <button className="agrius-mobile-toggle" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          )}
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      {loggedIn && (
        <>
          <div className={`agrius-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}></div>
          <div className={`agrius-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="agrius-mobile-menu-header">
              <img src="/logo.png" alt="PadiGuard Logo" />
              <button onClick={closeMobileMenu} className="agrius-mobile-close-btn"><FiX /></button>
            </div>
            <ul className="agrius-nav-links mobile">
              <li><NavLink to="/dashboard" onClick={closeMobileMenu}>{t('navbar.dashboard')}</NavLink></li>
              <li><NavLink to="/detections" onClick={closeMobileMenu}>{t('navbar.detectionHistory')}</NavLink></li>
              <li><NavLink to="/detect" onClick={closeMobileMenu}>{t('navbar.liveDetect')}</NavLink></li>
              <li><NavLink to="/diseases" onClick={closeMobileMenu}>{t('navbar.diseaseList')}</NavLink></li>
              <li><NavLink to="/agricultural-resources" onClick={closeMobileMenu}>{t('agriculturalResources.pageTitle')}</NavLink></li>
              <li><NavLink to="/pests" onClick={closeMobileMenu}>{t('navbar.pestList')}</NavLink></li>
              <li><NavLink to="/profile" onClick={closeMobileMenu}>{t('navbar.profile')}</NavLink></li>
            </ul>
            <div className="agrius-mobile-logout">
              <button className="agrius-btn-secondary" onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
                closeMobileMenu();
              }}>{t('navbar.logout')}</button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};


export default Navbar;