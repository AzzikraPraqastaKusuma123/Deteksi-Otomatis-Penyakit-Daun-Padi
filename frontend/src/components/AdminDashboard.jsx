import React, { useEffect, useState } from 'react';
import UserList from './UserList';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      
      <div className="card-deck">
        <div className="card text-white bg-primary mb-3" style={{maxWidth: "18rem"}}>
          <div className="card-header">Total Users</div>
          <div className="card-body">
            <h5 className="card-title">{users.length}</h5>
            <p className="card-text">Registered Users</p>
          </div>
        </div>
      </div>

      <hr />

      <UserList users={users} loading={loading} />
    </div>
  );
};

export default AdminDashboard;
