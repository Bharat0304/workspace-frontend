import React from 'react';
import './TodaySchedule.css';

interface ScheduleItem {
  id: string;
  subject: string;
  chapter: string;
  startTime: string;
  endTime: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

interface TodayScheduleProps {
  schedule: ScheduleItem[];
  currentDate: string;
  onAddSession: () => void;
  onEditSchedule: () => void;
}

const TodaySchedule: React.FC<TodayScheduleProps> = ({ 
  schedule, 
  currentDate, 
  onAddSession, 
  onEditSchedule 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'blue';
      case 'in-progress': return 'green';
      case 'upcoming': return 'gray';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'COMPLETED';
      case 'in-progress': return 'IN PROGRESS';
      case 'upcoming': return 'UPCOMING';
      default: return 'UPCOMING';
    }
  };

  return (
    <div className="today-schedule">
      <div className="schedule-header">
        <div className="schedule-title-section">
          <h2 className="schedule-title">Today's Schedule</h2>
          <p className="schedule-date">{currentDate}</p>
        </div>
        <div className="schedule-actions">
          <button className="btn-add-session" onClick={onAddSession}>
            <span className="plus-icon">+</span>
            Add Session
          </button>
          <button className="btn-edit-schedule" onClick={onEditSchedule}>
            <span className="edit-icon">✏️</span>
            Edit Schedule
          </button>
        </div>
      </div>

      <div className="schedule-list">
        {schedule.map((item) => (
          <div key={item.id} className={`schedule-item ${item.status}`}>
            <div className={`schedule-indicator ${getStatusColor(item.status)}`}></div>
            <div className="schedule-content">
              <div className="schedule-info">
                <h3 className="schedule-subject">{item.subject}</h3>
                <p className="schedule-chapter">{item.chapter}</p>
              </div>
              <div className="schedule-meta">
                <div className={`schedule-status ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </div>
                <div className="schedule-time">
                  {item.startTime} - {item.endTime}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Daily Progress */}
        <div className="daily-progress">
          <div className="progress-icon">📊</div>
          <div className="progress-content">
            <div className="progress-info">
              <h3>Daily Progress</h3>
              <p>4 hours completed, 2.5 hours remaining</p>
            </div>
            <div className="progress-meta">
              <div className="progress-percentage">62%</div>
              <div className="progress-label">Complete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaySchedule;
