import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LastSessionSummary.css';

interface Distraction {
  name: string;
  icon: string;
  count: number;
  duration: string;
  color: 'pink' | 'green' | 'blue' | 'red' | 'yellow';
}

interface SessionData {
  subject: string;
  duration: string;
  focusScore: number;
  sessionDuration: string;
  focusedTime: string;
  distractionTime: string;
  totalDistractions: number;
  mainDistractions: Distraction[];
  aiFeedback: string;
}

const LastSessionSummary: React.FC = () => {
  const [sessionData] = useState<SessionData>({
    subject: 'Chemistry - Organic',
    duration: '2 hours session',
    focusScore: 88,
    sessionDuration: '2h 15m',
    focusedTime: '1h 58m',
    distractionTime: '17m',
    totalDistractions: 8,
    mainDistractions: [
      { 
        name: 'Instagram', 
        icon: '📷', 
        count: 4, 
        duration: '8m', 
        color: 'pink' 
      },
      { 
        name: 'WhatsApp', 
        icon: '💬', 
        count: 2, 
        duration: '5m', 
        color: 'green' 
      },
      { 
        name: 'Looking Away', 
        icon: '👁️', 
        count: 2, 
        duration: '4m', 
        color: 'blue' 
      }
    ],
    aiFeedback: "Great focus overall! Try putting your phone in another room during the next session to reduce Instagram distractions. Consider taking a 5-minute break every hour to maintain concentration."
  });

  const handleViewFullAnalytics = () => {
    console.log('Navigating to full analytics...');
  };

  const handleSeeAllSessions = () => {
    console.log('Navigating to all sessions...');
  };

  const getDistractionIcon = (name: string): string => {
    switch (name.toLowerCase()) {
      case 'instagram':
        return '📷';
      case 'whatsapp':
        return '💬';
      case 'looking away':
        return '👁️';
      case 'phone':
        return '📱';
      case 'youtube':
        return '📺';
      case 'facebook':
        return '👥';
      case 'twitter':
        return '🐦';
      default:
        return '📱';
    }
  };

  const formatPercentage = (score: number): string => {
    return `${score}%`;
  };

  return (
    <div className="last-session-summary">
      {/* Header */}
      <div className="summary-header">
        <h2>Last Session Summary</h2>
        <button 
          className="view-analytics-btn"
          onClick={handleViewFullAnalytics}
        >
          View Full Analytics →
        </button>
      </div>

      {/* Session Overview */}
      <div className="session-overview">
        <div className="session-subject-info">
          <div className="subject-icon">📚</div>
          <div className="subject-details">
            <h3>{sessionData.subject}</h3>
            <p>{sessionData.duration}</p>
          </div>
        </div>
        <div className="session-score">
          <div className="score-value">{formatPercentage(sessionData.focusScore)}</div>
          <div className="score-label">Focus Score</div>
        </div>
      </div>

      {/* Session Metrics */}
      <div className="session-metrics">
        <div className="metric-item">
          <div className="metric-label">Session Duration</div>
          <div className="metric-value">{sessionData.sessionDuration}</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">Focused Time</div>
          <div className="metric-value green">{sessionData.focusedTime}</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">Distraction Time</div>
          <div className="metric-value red">{sessionData.distractionTime}</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">Total Distractions</div>
          <div className="metric-value">{sessionData.totalDistractions}</div>
        </div>
      </div>

      {/* Main Distractions */}
      <div className="main-distractions">
        <h3>Main Distractions</h3>
        <div className="distractions-list">
          {sessionData.mainDistractions.map((distraction, index) => (
            <div key={index} className="distraction-item">
              <div className={`distraction-icon ${distraction.color}`}>
                {getDistractionIcon(distraction.name)}
              </div>
              <div className="distraction-info">
                <div className="distraction-name">{distraction.name}</div>
              </div>
              <div className="distraction-stats">
                <div className="distraction-count">
                  {distraction.count} times, {distraction.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Feedback */}
      <div className="ai-feedback">
        <div className="ai-header">
          <div className="ai-icon">🤖</div>
          <h3>AI Feedback</h3>
        </div>
        <p>{sessionData.aiFeedback}</p>
      </div>

      {/* Action Buttons */}
      <div className="summary-actions">
        <button 
          className="btn-primary"
          onClick={handleViewFullAnalytics}
        >
          View Full Analytics
        </button>
        <button 
          className="btn-secondary"
          onClick={handleSeeAllSessions}
        >
          See All Sessions
        </button>
      </div>
    </div>
  );
};

export default LastSessionSummary;
