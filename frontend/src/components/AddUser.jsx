import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './AddUser.css';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, password, full_name: fullName, location, role };
    try {
      await api.post('/users', userData);
      navigate('/admin/users');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please try again.');
    }
  };

  return (
    <div className="agrius-add-user-container">
      <div className="agrius-card agrius-add-user-card">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit} className="agrius-add-user-form">
          <div className="agrius-form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" className="agrius-form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="agrius-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="agrius-form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="agrius-form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="agrius-form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="agrius-form-group">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" className="agrius-form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="agrius-form-group">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" className="agrius-form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="agrius-form-group">
            <label htmlFor="role">Role</label>
            <select id="role" className="agrius-form-control" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="agrius-btn-primary agrius-btn-submit">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;