import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

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

            <button
              className="agrius-btn-primary agrius-btn-edit-profile"
              onClick={() => navigate("/profile/edit")}
            >
              <i className="fas fa-edit"></i> Edit Profile
            </button>
          </div>
        ) : (
          <p className="agrius-error-message">Failed to load user data. Please log in again.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
