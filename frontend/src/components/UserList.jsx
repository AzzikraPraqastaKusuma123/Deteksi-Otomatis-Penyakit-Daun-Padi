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
    <div className="agrius-user-list-container">
      <div className="agrius-user-list-header">
        <h1>Manage Users</h1>
        <div className="agrius-header-actions">
          <div className="agrius-search-bar">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search by username or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="agrius-form-control"
            />
          </div>
          <Link to="/admin/users/add" className="agrius-btn-primary agrius-btn-add-user">
            <i className="fas fa-plus"></i> Add User
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="agrius-loading-container"><p className="agrius-loading-text">Loading users...</p></div>
      ) : (
        <div className="agrius-table-responsive">
          <table className="agrius-user-table">
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
                      <span className={`agrius-role-badge agrius-role-${user.role}`}>{user.role}</span>
                    </td>
                    <td className="agrius-action-buttons">
                      <Link to={`/admin/users/edit/${user.id}`} className="agrius-btn-action agrius-btn-edit">
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                      <button onClick={() => handleDelete(user.id)} className="agrius-btn-action agrius-btn-delete">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                      <Link to={`/admin/users/${user.id}`} className="agrius-btn-action agrius-btn-view">
                        <i className="fas fa-eye"></i>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="agrius-no-users-found">No users found matching your search.</td>
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