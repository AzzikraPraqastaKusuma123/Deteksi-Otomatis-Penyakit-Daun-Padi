import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { registerUser } from '../services/api';
import './Auth.css';

const Register = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ username, email, password, full_name: fullName, location });
      toast.success(t('register.alert.success'));
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      const errorMessage = error.response?.data?.message || t('register.alert.failed');
      toast.error(errorMessage);
    }
  };

  return (
    <div className="agrius-auth-container">
      <div className="agrius-auth-image-section">
        <div className="agrius-auth-image-content">
          <h1>{t('register.welcome')}</h1>
          <p>{t('register.promo')}</p>
        </div>
      </div>
      <div className="agrius-auth-form-section">
        <div className="agrius-auth-card">
          <div className="agrius-auth-header">
            <h1>{t('register.title')}</h1>
            <p>{t('register.subtitle')}</p>
          </div>
          <form onSubmit={handleRegister}>
            <div className="agrius-input-group">
              <span className="agrius-input-group-text">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                className="agrius-form-control"
                placeholder={t('register.username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="agrius-input-group">
              <span className="agrius-input-group-text">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                className="agrius-form-control"
                placeholder={t('register.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="agrius-input-group">
              <span className="agrius-input-group-text">
                <i className="fas fa-id-card"></i>
              </span>
              <input
                type="text"
                className="agrius-form-control"
                placeholder={t('register.fullName')}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="agrius-input-group">
              <span className="agrius-input-group-text">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <input
                type="text"
                className="agrius-form-control"
                placeholder={t('register.location')}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="agrius-input-group">
              <span className="agrius-input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                className="agrius-form-control"
                placeholder={t('register.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="agrius-btn-primary agrius-auth-btn">{t('register.button')}</button>
          </form>
          <div className="agrius-auth-link">
            <p>{t('register.hasAccount')} <Link to="/login" className="agrius-link">{t('register.loginLink')}</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;