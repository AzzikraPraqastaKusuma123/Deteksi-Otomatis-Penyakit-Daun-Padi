import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { updateUserProfile } from '../services/api';
import './EditProfilePage.css';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setEmail(storedUser.email || '');
      setFullName(storedUser.full_name || '');
      setLocation(storedUser.location || '');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser?.id;

      if (!userId) {
        setMessage({ type: 'error', text: 'User not found. Please log in again.' });
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      const updatedData = {
        email,
        full_name: fullName,
        location,
        password: password || undefined,
      };

      await updateUserProfile(userId, updatedData);

      const updatedUser = { ...storedUser, email, full_name: fullName, location };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => navigate('/profile'), 1500);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agrius-edit-profile-container">
      <div className="agrius-card agrius-edit-profile-card">
        <div className="agrius-edit-profile-header">
          <i className="fas fa-user-edit agrius-edit-profile-avatar"></i>
          <h1>Edit Profile</h1>
          <p className="agrius-edit-profile-subtitle">Update your account details below</p>
        </div>

        <form onSubmit={handleSave} className="agrius-edit-profile-form">
          {message.text && (
            <div className={`agrius-form-message ${message.type}`}>
              {message.text}
            </div>
          )}
          <div className="agrius-profile-edit-grid">
            <div className="agrius-form-group">
              <label>Email:</label>
              <input
                type="email"
                className="agrius-form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="agrius-form-group">
              <label>Full Name:</label>
              <input
                type="text"
                className="agrius-form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="agrius-form-group">
              <label>Location:</label>
              <input
                type="text"
                className="agrius-form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="agrius-form-group">
              <label>New Password (optional):</label>
              <input
                type="password"
                className="agrius-form-control"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="agrius-edit-profile-actions">
            <button type="submit" className="agrius-btn-primary agrius-btn-submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <Link to="/profile" className="agrius-btn-secondary agrius-btn-cancel">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;


