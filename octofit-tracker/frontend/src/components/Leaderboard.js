import React, { useEffect, useState } from 'react';

const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/leaderboard/`;

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    console.log('Fetching leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setEntries(results);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);
  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {entries.map((e, i) => (
          <li key={e.id || i} className="list-group-item">
            User: {e.user} - Score: {e.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Leaderboard;
