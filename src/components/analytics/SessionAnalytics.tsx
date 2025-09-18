import React from 'react';

const SessionAnalytics: React.FC = () => {
  return (
    <aside className="session-analytics">
      <h3>Session Summary</h3>
      <ul>
        <li>Total Focused Time: 54.5 min</li>
        <li>Distractions: 3</li>
        <li>Breaks: 2</li>
      </ul>
    </aside>
  );
};

export default SessionAnalytics;
