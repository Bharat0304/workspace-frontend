import React from 'react';
import './StatsGrid.css';

const StatsGrid: React.FC = () => {
  const stats = [
    {
      icon: '⏰',
      value: '6h 32m',
      label: "Today's Focus Time",
      color: 'green'
    },
    {
      icon: '📊',
      value: '91%',
      label: 'Weekly Avg Focus',
      color: 'blue'
    },
    {
      icon: '🏆',
      value: '15',
      label: 'Goals Completed',
      color: 'purple'
    },
    {
      icon: '🔥',
      value: '7',
      label: 'Day Streak',
      color: 'orange'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.color}`}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
