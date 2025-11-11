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

  // ✅ Hanya dijalankan sekali saat komponen mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setEmail(storedUser.email || '');
      setFullName(storedUser.full_name || '');
      setLocation(storedUser.location || '');
    } else {
      navigate('/login'); // jika belum login
    }
  }, [navigate]); // ✅ dependency array agar tidak infinite loop

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser?.id;

      if (!userId) {
        alert('User tidak ditemukan. Silakan login ulang.');
        return navigate('/login');
      }

      const updatedData = {
        email,
        full_name: fullName,
        location,
        password: password || undefined, // password opsional
      };

      // panggil API update profile
      await updateUserProfile(userId, updatedData);

      // update localStorage agar data terbaru langsung tampil
      const updatedUser = { ...storedUser, email, full_name: fullName, location };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      alert('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <i className="fas fa-user-edit profile-avatar"></i>
          <h1>Edit Profile</h1>
          <p>Update your account details below</p>
        </div>

        <form onSubmit={handleSave} className="edit-profile-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>New Password (optional)</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>

          <Link to="/profile" className="btn-cancel">Cancel</Link>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
