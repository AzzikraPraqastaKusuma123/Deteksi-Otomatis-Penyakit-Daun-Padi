import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css'; // Keep custom CSS for specific overrides

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const { t, i18n } = useTranslation(); // Destructure i18n here
  const navigate = useNavigate();

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
                  <NavLink className={({ isActive }) => (isActive ? "nav-link agrius-nav-link active" : "nav-link agrius-nav-link")} to="/dashboard">{t('navbar.home')}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? "nav-link agrius-nav-link active" : "nav-link agrius-nav-link")} to="/detections">{t('navbar.detection')}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? "nav-link agrius-nav-link active" : "nav-link agrius-nav-link")} to="/diseases">{t('navbar.diseaseList')}</NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {/* Language Switcher */}
            <li className="nav-item language-switcher-item">
              <button className="btn agrius-lang-btn" onClick={() => changeLanguage('en')} title={t('language.english')}>
                🇬🇧
              </button>
            </li>
            <li className="nav-item language-switcher-item">
              <button className="btn agrius-lang-btn" onClick={() => changeLanguage('id')} title={t('language.indonesian')}>
                🇮🇩
              </button>
            </li>

            {loggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => (isActive ? "nav-link agrius-nav-link profile-link active" : "nav-link agrius-nav-link profile-link")} 
                    to="/profile" 
                    title={t('navbar.profile')}
                  >
                    <i className="fas fa-user"></i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="btn agrius-btn-secondary" onClick={handleLogout}>{t('navbar.logout')}</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link agrius-nav-link" to="/login">{t('navbar.login')}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="btn agrius-btn-primary" to="/register">{t('navbar.register')}</NavLink>
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