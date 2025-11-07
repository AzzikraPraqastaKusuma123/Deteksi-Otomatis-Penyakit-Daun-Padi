// Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
// 1. Impor 'loginUser' dari file service Anda
import { loginUser } from '../services/api'; 

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 2. Ganti 'fetch' dengan 'loginUser'
      const response = await loginUser({ username, password });

      // 3. 'data' sekarang ada di 'response.data' (standar axios)
      const data = response.data;

      if (data.token) {
        // Logika Anda yang lain sudah benar
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setLoggedIn(true);
        alert('Login successful!');
        
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      // 4. Penanganan error untuk Axios
      console.error('Error during login:', error);
      if (error.response) {
        alert(error.response.data.message || 'Invalid credentials');
      } else {
        alert('Failed to connect to the server');
      }
    }
  };

  // --- Sisa JSX Anda (form, div, dll) tidak perlu diubah ---
  return (
    <div className="auth-container">
      <div className="auth-image-section">
        <div className="auth-image-content">
          <h1>Welcome to PadiGuard</h1>
          <p>Your partner in protecting rice crops. Login to access your dashboard and start detecting diseases.</p>
        </div>
      </div>
      <div className="auth-form-section">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
          </div>
          <form onSubmit={handleLogin}>
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
          _       required
              />
            </div>
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
            <button type="submit" className="btn-auth">Login</button>
          </form>
          <div className="auth-link">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;