import React from 'react';
import { Link } from 'react-router-dom';

const usersData = [
  { user_id: 1, username: 'budi_petani', email: 'budi.petani@email.com', full_name: 'Budi Santoso', location: 'Karawang, Jawa Barat' },
  { user_id: 2, username: 'siti_agri', email: 'siti.agri@email.com', full_name: 'Siti Aminah', location: 'Indramayu, Jawa Barat' },
];

function UserList() {
  return (
    <div className="container">
      <h1>Users</h1>
      <div className="list-group">
        {usersData.map(user => (
          <Link to={`/users/${user.user_id}`} key={user.user_id} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{user.full_name} ({user.username})</h5>
            </div>
            <p className="mb-1">{user.email}</p>
            <small>{user.location}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UserList;