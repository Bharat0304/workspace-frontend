import React from 'react';
import { Bell, User } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="brand">
          <div className="brand-icon">⚡</div>
          <span className="brand-text">WorkSpace</span>
        </div>
        
        <nav className="navigation">
          <a href="/" className="nav-link">Dashboard</a>
          <a href="/analytics" className="nav-link">Analytics</a>
          <a href="/schedule" className="nav-link">Schedule</a>
          <a href="/goals" className="nav-link">Goals</a>
          <a href="/settings" className="nav-link">Settings</a>
        </nav>

        <div className="header-actions">
          <button className="notification-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          
          <div className="user-menu">
            <img 
              src="/api/placeholder/32/32" 
              alt="Arjun Sharma" 
              className="user-avatar"
            />
            <span className="user-name">Arjun Sharma</span>
            <span className="user-plan">Pro Student</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
