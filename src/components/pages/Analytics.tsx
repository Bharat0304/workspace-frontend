import React from 'react';
import { ArrowLeft, Download, FileText, Mail } from 'lucide-react';
import SessionAnalytics from '../components/analytics/SessionAnalytics';
import FocusChart from '../components/analytics/FocusChart';
import DistractionAnalysis from '../components/analytics/DistractionAnalysis';
import './Analytics.css';

const Analytics: React.FC = () => {
  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div className="header-left">
          <button className="back-btn">
            <ArrowLeft size={20} />
          </button>
          <div className="header-content">
            <h1>Session Analytics & Reports</h1>
            <p>Track your focus patterns and get insights</p>
          </div>
        </div>
        
        <div className="header-actions">
          <button className="export-btn">
            <Download size={16} />
            Export
          </button>
          <button className="user-btn">⚡</button>
        </div>
      </div>

      <div className="analytics-content">
        <div className="analytics-main">
          <div className="session-header">
            <div className="session-info">
              <h2>Mathematics - Calculus</h2>
              <p>Chapter 12: Limits and Derivatives</p>
            </div>
            
            <div className="export-options">
              <button className="export-pdf">
                <FileText size={16} />
                PDF
              </button>
              <button className="export-email">
                <Mail size={16} />
                Email
              </button>
            </div>
          </div>

          <div className="session-details">
            <div className="detail-item">
              <span className="detail-label">Date</span>
              <span className="detail-value">Dec 18, 2024</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Start Time</span>
              <span className="detail-value">2:00 PM</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">End Time</span>
              <span className="detail-value">2:58 PM</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Duration</span>
              <span className="detail-value">58 minutes</span>
            </div>
          </div>

          <FocusChart />
          <DistractionAnalysis />
        </div>

        <SessionAnalytics />
      </div>
    </div>
  );
};

export default Analytics;
