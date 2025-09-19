import React, { useState, useEffect } from 'react';
import './ActiveSession.css';

interface ActiveSessionProps {
  session: {
    subject: string;
    chapter: string;
  };
  onPause: () => void;
  onEnd: () => void;
  onRefocus: () => void;
}

const ActiveSession: React.FC<ActiveSessionProps> = ({ session, onPause, onEnd, onRefocus }) => {
  const [timeElapsed, setTimeElapsed] = useState({ hours: 2, minutes: 34, seconds: 29 });
  const [focusScore] = useState(94);
  const [timeRemaining] = useState({ minutes: 0, seconds: 45 });
  const [distractions] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        let newSeconds = prev.seconds + 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds >= 60) {
          newSeconds = 0;
          newMinutes++;
        }
        if (newMinutes >= 60) {
          newMinutes = 0;
          newHours++;
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: { hours: number; minutes: number; seconds: number }) => {
    return `${time.hours}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="active-session">
      <div className="active-session-header">
        <div className="session-info">
          <div className="session-status">
            <span className="status-indicator"></span>
            Active Session
          </div>
          <h2 className="session-title">{session.subject}</h2>
          <p className="session-chapter">{session.chapter}</p>
        </div>
        <div className="session-timer">
          <div className="timer-value">{formatTime(timeElapsed)}</div>
          <div className="timer-label">Time Elapsed</div>
        </div>
      </div>

      <div className="session-stats">
        <div className="stat-card">
          <div className="stat-value">{focusScore}%</div>
          <div className="stat-label">Focus Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">00:{timeRemaining.seconds.toString().padStart(2, '0')}</div>
          <div className="stat-label">Remaining</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{distractions}</div>
          <div className="stat-label">Distractions</div>
        </div>
      </div>

      <div className="session-actions">
        <button className="btn-pause" onClick={onPause}>
          <span className="pause-icon">⏸</span>
          Pause Session
        </button>
        <button className="btn-end" onClick={onEnd}>
          <span className="stop-icon">⏹</span>
          End Session
        </button>
        <button className="btn-refocus" onClick={onRefocus}>
          <span className="refocus-icon">🎯</span>
          Refocus
        </button>
      </div>
    </div>
  );
};

export default ActiveSession;
