import React from 'react';
import './ProfilePage.css'; // Kita akan buat file CSS ini

const ProfilePage = () => {
  // Ambil data pengguna dari localStorage (disimpan oleh Login.jsx)
  const user = JSON.parse(localStorage.getItem('user'));

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
            {/* Anda dapat menambahkan lebih banyak data dari 'user' jika ada */}
          </div>
        ) : (
          <p>Gagal memuat data pengguna. Silakan login kembali.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;