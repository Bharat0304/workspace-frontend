import React, { useState, useEffect } from 'react';
import ActiveSession from '../dashboard/ActiveSession';
import TodaySchedule from '../dashboard/TodaySchedule';
import StatsGrid from '../dashboard/StatsCard';
import QuickActions from '../dashboard/QuickAction';
import LastSessionSummary from '../dashboard/LastSessionSummary';
import Footer from '../dashboard/Footer';
import './Dashboard.css';

interface StudySession {
  id: string;
  subject: string;
  chapter: string;
  startTime: string;
  endTime: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSession, setActiveSession] = useState<StudySession | null>({
    id: '1',
    subject: 'Mathematics - Calculus',
    chapter: 'Chapter 12: Limits and Derivatives',
    startTime: '2:00 PM',
    endTime: '4:00 PM',
    status: 'in-progress'
  });

  const [todaySchedule] = useState<StudySession[]>([
    {
      id: '1',
      subject: 'Mathematics - Calculus',
      chapter: 'Chapter 12: Limits and Derivatives',
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      status: 'in-progress'
    },
    {
      id: '2',
      subject: 'Physics - Mechanics',
      chapter: 'Chapter 8: Rotational Motion',
      startTime: '4:30 PM',
      endTime: '6:00 PM',
      status: 'upcoming'
    },
    {
      id: '3',
      subject: 'Chemistry - Organic',
      chapter: 'Chapter 15: Alcohols and Phenols',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      status: 'completed'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePauseSession = () => {
    console.log('Pausing session...');
  };

  const handleEndSession = () => {
    setActiveSession(null);
    console.log('Ending session...');
  };

  const handleRefocus = () => {
    console.log('Refocusing...');
  };

  const handleAddSession = () => {
    console.log('Adding new session...');
  };

  const handleEditSchedule = () => {
    console.log('Editing schedule...');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {activeSession && (
          <ActiveSession
            session={activeSession}
            onPause={handlePauseSession}
            onEnd={handleEndSession}
            onRefocus={handleRefocus}
          />
        )}

        <TodaySchedule
          schedule={todaySchedule}
          currentDate="Wednesday, March 15, 2024"
          onAddSession={handleAddSession}
          onEditSchedule={handleEditSchedule}
        />

        <StatsGrid />

        <div className="dashboard-grid">
          <div className="dashboard-left">
            <LastSessionSummary />
          </div>
          
          <div className="dashboard-right">
            <QuickActions />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
