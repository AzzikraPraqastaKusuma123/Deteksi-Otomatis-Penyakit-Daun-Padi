import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simpan token dari backend di localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        setLoggedIn(true);
        alert('Login successful!');
        navigate('/');
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Failed to connect to the server');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="text-center mb-4">
          <h1 className="h3 fw-bold">PadiGuard</h1>
          <p className="text-muted">Welcome back! Please login to your account.</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group mb-3">
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
          <div className="input-group mb-3">
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
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <p className="text-muted">Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
