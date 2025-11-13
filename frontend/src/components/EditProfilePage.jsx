import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { updateUserProfile } from '../services/api';
import './EditProfilePage.css'; // Keep this for now, will refactor later
import './ProfilePage.css'; // Import ProfilePage.css for shared styles

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
    <div className="profile-container"> {/* Reusing profile-container */}
      <div className="profile-card"> {/* Reusing profile-card */}
        <div className="profile-header"> {/* Reusing profile-header */}
          <i className="fas fa-user-edit profile-avatar"></i>
          <h1>Edit Profile</h1> {/* Changed to h1 */}
          <p>Update your account details below</p>
        </div>

        <form onSubmit={handleSave} className="edit-profile-form">
          {message.text && (
            <div className={`form-message ${message.type}`}>
              {message.text}
            </div>
          )}
          <div className="profile-edit-grid"> {/* New wrapper for grid layout */}
            <div className="profile-edit-item"> {/* New class for input rows */}
              <strong>Email:</strong>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="profile-edit-item">
              <strong>Full Name:</strong>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="profile-edit-item">
              <strong>Location:</strong>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="profile-edit-item">
              <strong>New Password (optional):</strong>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div> {/* End of profile-edit-grid */}

          <div className="edit-profile-actions"> {/* New container for buttons */}
            <button type="submit" className="btn-edit-profile" disabled={loading}> {/* Reusing btn-edit-profile style */}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <Link to="/profile" className="btn-cancel">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;

