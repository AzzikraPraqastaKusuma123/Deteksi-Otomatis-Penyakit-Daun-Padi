import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import './EditUser.css';

const EditUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Password is optional for update
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        const user = response.data.user;
        setUsername(user.username);
        setEmail(user.email);
        setFullName(user.full_name || '');
        setLocation(user.location || '');
        setRole(user.role);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to fetch user data.');
        navigate('/admin/users'); // Redirect if user not found or error
      }
    };
    fetchUser();
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, full_name: fullName, location, role };
    if (password) {
      userData.password = password; // Only include password if it's provided
    }
    console.log('Updating user with data:', userData);
    try {
      await api.put(`/users/${userId}`, userData);
      toast.success('User updated successfully!');
      navigate('/admin/users');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user. Please try again.');
    }
  };

  return (
    <div className="agrius-edit-user-container">
      <div className="agrius-card agrius-edit-user-card">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit} className="agrius-edit-user-form">
          <div className="agrius-form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" className="agrius-form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="agrius-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="agrius-form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="agrius-form-group">
            <label htmlFor="password">Password (leave blank to keep current password)</label>
            <input type="password" id="password" className="agrius-form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
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
          <button type="submit" className="agrius-btn-primary agrius-btn-submit">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;