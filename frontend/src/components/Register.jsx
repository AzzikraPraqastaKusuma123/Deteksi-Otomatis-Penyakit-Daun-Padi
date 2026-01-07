import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { registerUser } from '../services/api';
import './Auth.css';
import { FiUser, FiMail, FiLock, FiMapPin, FiUserCheck } from 'react-icons/fi';

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
      if (error.response && error.response.status === 409) {
        toast.error(t('register.alert.userExists'));
      } else {
        const errorMessage = error.response?.data?.message || t('register.alert.failed');
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="eco-auth-container">
      <div className="eco-auth-split-left">
        <div className="eco-auth-overlay"></div>
        <div className="eco-auth-content">
          <img src="/logo.png" alt="PadiGuard Logo" className="eco-auth-logo-large" />
          <h1 className="eco-auth-tagline">{t('register.welcome', 'Bergabunglah Bersama Kami')}</h1>
          <p className="eco-auth-subtitle">{t('register.promo', 'Daftar sekarang dan lindungi tanaman padi Anda dengan teknologi AI terdepan')}</p>
        </div>
      </div>

      <div className="eco-auth-split-right">
        <div className="eco-auth-form-wrapper">
          <div className="eco-auth-header">
            <h2>{t('register.title')}</h2>
            <p>{t('register.subtitle')}</p>
          </div>

          <form onSubmit={handleRegister} className="eco-auth-form">
            <div className="eco-input-group">
              <FiUser className="eco-input-icon" />
              <input
                type="text"
                className="eco-form-control"
                placeholder={t('register.username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="eco-input-group">
              <FiMail className="eco-input-icon" />
              <input
                type="email"
                className="eco-form-control"
                placeholder={t('register.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="eco-input-group">
              <FiUserCheck className="eco-input-icon" />
              <input
                type="text"
                className="eco-form-control"
                placeholder={t('register.fullName')}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="eco-input-group">
              <FiMapPin className="eco-input-icon" />
              <input
                type="text"
                className="eco-form-control"
                placeholder={t('register.location')}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="eco-input-group">
              <FiLock className="eco-input-icon" />
              <input
                type="password"
                className="eco-form-control"
                placeholder={t('register.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="eco-btn-primary eco-btn-full">
              {t('register.button')}
            </button>
          </form>

          <div className="eco-auth-footer">
            <p>
              {t('register.hasAccount')} <Link to="/login" className="eco-link">{t('register.loginLink')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;