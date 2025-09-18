import React from 'react';
import { AlertTriangle } from 'lucide-react';
import './DistractionAlert.css';

interface DistractionAlertProps {
  isVisible: boolean;
  onRefocus: () => void;
  onSnooze: () => void;
}

const DistractionAlert: React.FC<DistractionAlertProps> = ({ 
  isVisible, 
  onRefocus, 
  onSnooze 
}) => {
  if (!isVisible) return null;

  return (
    <div className="distraction-overlay">
      <div className="distraction-modal">
        <div className="alert-icon">
          <AlertTriangle size={32} />
        </div>
        
        <h2 className="alert-title">Distraction Detected!</h2>
        <p className="alert-message">
          You switched to Instagram. Return to your study window to maintain focus.
        </p>
        
        <div className="alert-actions">
          <button className="refocus-btn" onClick={onRefocus}>
            ↻ Refocus Now
          </button>
          <button className="snooze-btn" onClick={onSnooze}>
            ⏰ Snooze 2min
          </button>
        </div>
      </div>
    </div>
  );
};

export default DistractionAlert;
