import React from 'react';
import './FocusChart.css';

const FocusChart: React.FC = () => {
  return (
    <div className="focus-performance">
      <h3>Focus Performance</h3>
      
      <div className="focus-score-container">
        <div className="focus-score-circle">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="12"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#10b981"
              strokeWidth="12"
              strokeDasharray={`${94 * 5.02} 502`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className="score-text">
            <span className="score-value">94%</span>
            <span className="score-label">Focus Score</span>
          </div>
        </div>
        
        <div className="focus-metrics">
          <div className="metric">
            <span className="metric-dot green"></span>
            <span className="metric-label">Focused Time</span>
            <span className="metric-value">54.5 min</span>
          </div>
          
          <div className="metric">
            <span className="metric-dot red"></span>
            <span className="metric-label">Distracted Time</span>
            <span className="metric-value">3.5 min</span>
          </div>
          
          <div className="metric">
            <span className="metric-dot blue"></span>
            <span className="metric-label">Productivity Score</span>
            <span className="metric-value">A+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusChart;
