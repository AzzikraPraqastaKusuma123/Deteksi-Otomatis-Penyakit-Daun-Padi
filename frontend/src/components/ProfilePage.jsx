import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <i className="fas fa-user-circle profile-avatar"></i>
          <h1>User Profile</h1>
          <p>Informasi akun Anda</p>
        </div>

        {user ? (
          <div className="profile-body">
            <div className="profile-item">
              <strong>Username:</strong>
              <span>{user.username}</span>
            </div>
            <div className="profile-item">
              <strong>Email:</strong>
              <span>{user.email}</span>
            </div>
            <div className="profile-item">
              <strong>Role:</strong>
              <span>{user.role}</span>
            </div>
            <div className="profile-item">
              <strong>Location:</strong>
              <span>{user.location || "-"}</span>
            </div>

            <button
              className="btn-edit-profile"
              onClick={() => navigate("/profile/edit")}
            >
              <i className="fas fa-edit"></i> Edit Profile
            </button>
          </div>
        ) : (
          <p>Gagal memuat data pengguna. Silakan login kembali.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
