import React from 'react';
import { Clock, Target, Trophy, Calendar } from 'lucide-react';
import './StatsCard.css';

const StatsCards: React.FC = () => {
  const stats = [
    {
      icon: <Clock size={24} />,
      value: '6h 32m',
      label: "Today's Focus Time",
      color: 'green'
    },
    {
      icon: <Target size={24} />,
      value: '91%',
      label: 'Weekly Avg Focus',
      color: 'blue'
    },
    {
      icon: <Trophy size={24} />,
      value: '15',
      label: 'Goals Completed',
      color: 'purple'
    },
    {
      icon: <Calendar size={24} />,
      value: '7',
      label: 'Day Streak',
      color: 'orange'
    }
  ];

  return (
    <div className="stats-cards">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.color}`}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
