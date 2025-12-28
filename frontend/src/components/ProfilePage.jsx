import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import { FiEdit, FiLogOut } from 'react-icons/fi';

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirecting to login will cause App.jsx to re-evaluate and update the loggedIn state
    navigate('/login');
  };

  return (
    <div className="agrius-profile-container">
      <div className="agrius-card agrius-profile-card">
        <div className="agrius-profile-header">
          <i className="fas fa-user-circle agrius-profile-avatar"></i>
          <h1>User Profile</h1>
          <p className="agrius-profile-subtitle">Your account information</p>
        </div>

        {user ? (
          <div className="agrius-profile-body">
            <div className="agrius-profile-item">
              <strong>Username:</strong>
              <span>{user.username}</span>
            </div>
            <div className="agrius-profile-item">
              <strong>Email:</strong>
              <span>{user.email}</span>
            </div>
            <div className="agrius-profile-item">
              <strong>Role:</strong>
              <span className={`agrius-role-badge agrius-role-${user.role}`}>{user.role}</span>
            </div>
            <div className="agrius-profile-item">
              <strong>Location:</strong>
              <span>{user.location || "-"}</span>
            </div>

            <div className="agrius-profile-actions">
              <button
                className="agrius-btn-primary agrius-btn-edit-profile"
                onClick={() => navigate("/profile/edit")}
              >
                <FiEdit /> <span>Edit Profile</span>
              </button>
              <button
                className="agrius-btn-secondary agrius-btn-logout"
                onClick={handleLogout}
              >
                <FiLogOut /> <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <p className="agrius-error-message">Failed to load user data. Please log in again.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
