import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import './UserList.css';

function UserList() {
  const { t } = useTranslation();
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
    if (window.confirm(t('userList.deleteConfirm'))) {
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
        <h1>{t('userList.pageTitle')}</h1>
        <div className="agrius-header-actions">
          <div className="agrius-search-bar">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder={t('userList.searchPlaceholder')}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="agrius-form-control"
            />
          </div>
          <Link to="/admin/users/add" className="agrius-btn-primary agrius-btn-add-user">
            <i className="fas fa-plus"></i> {t('userList.addUser')}
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="agrius-loading-container"><p className="agrius-loading-text">{t('userList.loadingUsers')}</p></div>
      ) : (
        <div className="agrius-table-responsive">
          <table className="agrius-user-table">
            <thead>
              <tr>
                <th>{t('userList.tableHeaderUsername')}</th>
                <th>{t('userList.tableHeaderEmail')}</th>
                <th>{t('userList.tableHeaderFullName')}</th>
                <th>{t('userList.tableHeaderLocation')}</th>
                <th>{t('userList.tableHeaderRole')}</th>
                <th>{t('userList.tableHeaderActions')}</th>
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
                  <td colSpan="6" className="agrius-no-users-found">{t('userList.noUsersFound')}</td>
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