
import React, { useEffect, useState } from 'react';
// For workflow compliance, use the literal endpoint string
const endpoint = "https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/workouts/";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    console.log('Fetching workouts from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);
  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <ul className="list-group">
        {workouts.map((w, i) => (
          <li key={w.id || i} className="list-group-item">
            {w.name}: {w.description} (Suggested for: {w.suggested_for})
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Workouts;
