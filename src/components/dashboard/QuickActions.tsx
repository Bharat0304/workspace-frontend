import React from 'react';
import './QuickActions.css';

const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: '▶️',
      title: 'Start Quick Session',
      description: 'Begin focused study time',
      color: 'green',
      onClick: () => console.log('Starting quick session')
    },
    {
      icon: '📅',
      title: 'Add to Schedule',
      description: 'Plan your study sessions',
      color: 'blue',
      onClick: () => console.log('Adding to schedule')
    },
    {
      icon: '📊',
      title: 'View Analytics',
      description: 'Check your progress',
      color: 'purple',
      onClick: () => console.log('Viewing analytics')
    }
  ];

  return (
    <div className="quick-actions">
      <h2>Quick Actions</h2>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <div key={index} className={`action-card ${action.color}`} onClick={action.onClick}>
            <div className="action-icon">{action.icon}</div>
            <div className="action-content">
              <h3>{action.title}</h3>
              <p>{action.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
