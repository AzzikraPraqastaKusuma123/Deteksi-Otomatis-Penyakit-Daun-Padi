// frontend/src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import './Auth.css';
import { loginUser } from '../services/api';

const Login = ({ setLoggedIn, setUserRole }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ username, password });
      const data = response.data;

      if (data.token) {
        // Simpan token dan data user ke localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Update state global di App.jsx
        setLoggedIn(true);
        if (setUserRole) setUserRole(data.user.role);

        toast.success(t('login.alert.success'));

        // Arahkan user sesuai perannya
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
    <div className="agrius-auth-container">
      {/* Bagian kiri dengan teks promosi */}
      <div className="agrius-auth-image-section">
        <div className="agrius-auth-image-content">
          <h1>{t('login.welcome')}</h1>
          <p>{t('login.promo')}</p>
        </div>
      </div>

      {/* Bagian kanan: form login */}
      <div className="agrius-auth-form-section">
        <div className="agrius-auth-card">
          <div className="agrius-auth-header">
            <h1>{t('login.title')}</h1>
            <p>{t('login.subtitle')}</p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Input Username */}
            <div className="agrius-input-group">
              <span className="agrius-input-group-text">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                className="agrius-form-control"
                placeholder={t('login.username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Input Password */}
            <div className="agrius-input-group">
              <span className="agrius-input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'} // Dynamic type
                className="agrius-form-control"
                placeholder={t('login.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="agrius-password-toggle-icon" onClick={togglePasswordVisibility}>
                <i className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
              </span>
            </div>

            {/* Tombol login */}
            <button type="submit" className="agrius-btn-primary agrius-auth-btn">{t('login.button')}</button>
          </form>

          {/* Link ke register */}
          <div className="agrius-auth-link">
            <p>
              {t('login.noAccount')} <Link to="/register" className="agrius-link">{t('login.registerLink')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
