// frontend/src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import './Auth.css';
import { loginUser } from '../services/api';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = ({ setLoggedIn, setUserRole }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      const data = response.data;
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setLoggedIn(true);
        if (setUserRole) setUserRole(data.user.role);
        toast.success(t('login.alert.success'));
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error(data.message || t('login.alert.invalid'));
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        let errorMessage;
        if (error.response.status === 404) {
          errorMessage = t('login.alert.userNotFound');
        } else if (error.response.status === 401) {
          errorMessage = t('login.alert.invalidPassword');
        } else {
          errorMessage = t('login.alert.failed');
        }
        toast.error(errorMessage);
      } else {
        toast.error(t('login.alert.serverError'));
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="agrius-auth-page">
      <div className="agrius-auth-card">
        <div className="agrius-auth-logo">
          <img src="/logo.png" alt="PadiGuard Logo" />
        </div>
        
        <div className="agrius-auth-header">
          <h2>{t('login.title')}</h2>
          <p>{t('login.subtitle')}</p>
        </div>

        <form onSubmit={handleLogin} className="agrius-auth-form">
          <div className="agrius-input-group">
            <FiUser className="agrius-input-icon" />
            <input
              type="text"
              className="agrius-form-control"
              placeholder={t('login.username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="agrius-input-group">
            <FiLock className="agrius-input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="agrius-form-control"
              placeholder={t('login.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" className="agrius-password-toggle-btn" onClick={togglePasswordVisibility}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button type="submit" className="agrius-btn-primary agrius-auth-btn">
            {t('login.button')}
          </button>
        </form>

        <div className="agrius-auth-footer">
          <p>
            {t('login.noAccount')} <Link to="/register">{t('login.registerLink')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
