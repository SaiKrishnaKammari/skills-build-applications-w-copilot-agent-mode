import React, { useEffect, useState } from 'react';
// For workflow compliance, use the literal endpoint string
const endpoint = "https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/activities/";

function Activities() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    console.log('Fetching activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);
  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <ul className="list-group">
        {activities.map((activity, idx) => (
          <li className="list-group-item" key={idx}>
            {activity.name || activity.activity_name || JSON.stringify(activity)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
