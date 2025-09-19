import React from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/dashboard" className="brand" aria-label="Go to dashboard">
          <div className="brand-icon">⚡</div>
          <span className="brand-text">WorkSpace</span>
        </Link>
        
        <nav className="navigation">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/dashboard/analytics" className="nav-link">Analytics</Link>
          <Link to="/dashboard/schedule" className="nav-link">Schedule</Link>
          <Link to="/dashboard" className="nav-link">Goals</Link>
          <Link to="/dashboard/settings" className="nav-link">Settings</Link>
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
