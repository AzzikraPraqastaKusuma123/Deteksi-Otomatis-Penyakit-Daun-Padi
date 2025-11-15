// frontend/src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import { loginUser } from '../services/api';

const Login = ({ setLoggedIn, setUserRole }) => {
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="agrius-auth-container">
      {/* Bagian kiri dengan teks promosi */}
      <div className="agrius-auth-image-section">
        <div className="agrius-auth-image-content">
          <h1>Welcome to PadiGuard</h1>
          <p>Your partner in protecting rice crops. Login to access your dashboard and start detecting diseases.</p>
        </div>
      </div>

      {/* Bagian kanan: form login */}
      <div className="agrius-auth-form-section">
        <div className="agrius-auth-card">
          <div className="agrius-auth-header">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
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
                placeholder="Username"
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="agrius-password-toggle-icon" onClick={togglePasswordVisibility}>
                <i className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
              </span>
            </div>

            {/* Tombol login */}
            <button type="submit" className="agrius-btn-primary agrius-auth-btn">Login</button>
          </form>

          {/* Link ke register */}
          <div className="agrius-auth-link">
            <p>
              Don't have an account? <Link to="/register" className="agrius-link">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
