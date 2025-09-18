import React, { useState, useEffect } from 'react';
import { Pause, Square, RotateCcw } from 'lucide-react';
import './ActiveSession.css';

const ActiveSession: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState('2:36:52');
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="active-session">
      <div className="session-header">
        <div className="session-status">
          <span className="status-indicator active">⚪ Active Session</span>
          <h2 className="session-title">Mathematics - Calculus</h2>
          <p className="session-subtitle">Chapter 12: Limits and Derivatives</p>
        </div>
        
        <div className="session-timer">
          <span className="timer-value">{timeElapsed}</span>
          <span className="timer-label">Time Elapsed</span>
        </div>
      </div>

      <div className="session-metrics">
        <div className="metric-card">
          <span className="metric-value">94%</span>
          <span className="metric-label">Focus Score</span>
        </div>
        
        <div className="metric-card">
          <span className="metric-value">00:45</span>
          <span className="metric-label">Remaining</span>
        </div>
        
        <div className="metric-card">
          <span className="metric-value">3</span>
          <span className="metric-label">Distractions</span>
        </div>
      </div>

      <div className="session-controls">
        <button className="control-btn pause">
          <Pause size={16} />
          Pause Session
        </button>
        
        <button className="control-btn end">
          <Square size={16} />
          End Session
        </button>
        
        <button className="control-btn refocus">
          <RotateCcw size={16} />
          Refocus
        </button>
      </div>
    </div>
  );
};

export default ActiveSession;
