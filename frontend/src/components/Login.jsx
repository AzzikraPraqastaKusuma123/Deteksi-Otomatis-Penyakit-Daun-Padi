// frontend/src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import { loginUser } from '../services/api';

const Login = ({ setLoggedIn, setUserRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

        alert('Login successful!');

        // Arahkan user sesuai perannya
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        alert(error.response.data.message || 'Invalid credentials');
      } else {
        alert('Failed to connect to the server');
      }
    }
  };

  return (
    <div className="auth-container">
      {/* Bagian kiri dengan teks promosi */}
      <div className="auth-image-section">
        <div className="auth-image-content">
          <h1>Welcome to PadiGuard</h1>
          <p>Your partner in protecting rice crops. Login to access your dashboard and start detecting diseases.</p>
        </div>
      </div>

      {/* Bagian kanan: form login */}
      <div className="auth-form-section">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Input Username */}
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Input Password */}
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Tombol login */}
            <button type="submit" className="btn-auth">Login</button>
          </form>

          {/* Link ke register */}
          <div className="auth-link">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
