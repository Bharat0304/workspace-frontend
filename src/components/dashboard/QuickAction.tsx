import React from 'react';
import { Play, Calendar, BarChart3 } from 'lucide-react';
import './QuickActions.css';

const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: <Play size={20} />,
      title: 'Start Quick Session',
      description: 'Begin focused study time',
      color: 'green'
    },
    {
      icon: <Calendar size={20} />,
      title: 'Add to Schedule',
      description: 'Plan your study sessions',
      color: 'blue'
    },
    {
      icon: <BarChart3 size={20} />,
      title: 'View Analytics',
      description: 'Check your progress',
      color: 'purple'
    }
  ];

  return (
    <div className="quick-actions">
      <h3 className="actions-title">Quick Actions</h3>
      
      <div className="actions-grid">
        {actions.map((action, index) => (
          <button key={index} className={`action-card ${action.color}`}>
            <div className="action-icon">{action.icon}</div>
            <div className="action-content">
              <span className="action-title">{action.title}</span>
              <span className="action-description">{action.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
