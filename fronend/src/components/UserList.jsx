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
      <ul>
        {usersData.map(user => (
          <li key={user.user_id}>
            <div className="card">
              <Link to={`/users/${user.user_id}`}>
                <h2>{user.full_name} ({user.username})</h2>
              </Link>
              <p>Email: {user.email}</p>
              <p>Location: {user.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
