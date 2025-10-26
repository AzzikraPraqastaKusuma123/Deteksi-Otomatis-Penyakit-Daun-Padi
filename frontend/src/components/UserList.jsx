import React from 'react';
import { Link } from 'react-router-dom';
import './List.css';

function UserList({ users, loading }) {
  if (loading) {
    return <div className="list-container"><p>Loading users...</p></div>;
  }

  return (
    <div className="list-container">
      <h1 className="list-title">Users</h1>
      <div className="row">
        {users.length > 0 ? (
          users.map(user => (
            <div className="col-md-6 col-lg-4 mb-4" key={user.user_id}>
              <div className="card list-card">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-user-circle fa-3x me-3 text-primary"></i>
                    <div>
                      <h5 className="card-title mb-0">{user.full_name || 'No Name'}</h5>
                      <p className="card-subtitle">@{user.username}</p>
                    </div>
                  </div>
                  <p className="card-text"><i className="fas fa-envelope me-2 text-muted"></i>{user.email}</p>
                  <p className="card-text"><i className="fas fa-map-marker-alt me-2 text-muted"></i>{user.location || '-'}</p>
                  <Link to={`/users/${user.user_id}`} className="btn btn-primary mt-3">View Details</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default UserList;
