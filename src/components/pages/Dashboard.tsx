import React from 'react';
import HeroSection from '../dashboard/HeroSection';
import StatsCards from '../dashboard/StatsCard';
import QuickActions from '../dashboard/QuickAction';
import AIFeedback from '../dashboard/AIFeedback';
import ActiveSession from '../session/ActiveSession';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <HeroSection />
      <ActiveSession />
      <div className="dashboard-content">
        <StatsCards />
        <AIFeedback />
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
