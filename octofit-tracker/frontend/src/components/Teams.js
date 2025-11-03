import React, { useEffect, useState } from 'react';

const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    console.log('Fetching teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);
  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <ul className="list-group">
        {teams.map((t, i) => (
          <li key={t.id || i} className="list-group-item">
            {t.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Teams;
