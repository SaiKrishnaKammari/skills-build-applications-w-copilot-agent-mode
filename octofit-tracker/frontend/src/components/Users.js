import React, { useEffect, useState } from 'react';

const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log('Fetching users from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched users:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);
  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <ul className="list-group">
        {users.map((u, i) => (
          <li key={u.id || i} className="list-group-item">
            {u.name} ({u.email}) - Team: {u.team}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Users;
