import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const filteredUsers = users.filter(user => 
    (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1>Manage Users</h1>
        <div className="header-actions">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search by username or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/admin/users/add" className="btn-add-user">
            <i className="fas fa-plus"></i> Add User
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="loading-container"><p>Loading users...</p></div>
      ) : (
        <div className="table-responsive">
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Full Name</th>
                <th>Location</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.full_name || '-'}</td>
                    <td>{user.location || '-'}</td>
                    <td>
                      <span className={`role-badge role-${user.role}`}>{user.role}</span>
                    </td>
                    <td className="action-buttons">
                      <Link to={`/admin/users/edit/${user.id}`} className="btn-action btn-edit">
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                      <button onClick={() => handleDelete(user.id)} className="btn-action btn-delete">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                      <Link to={`/admin/users/${user.id}`} className="btn-action btn-view">
                        <i className="fas fa-eye"></i>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-users-found">No users found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;