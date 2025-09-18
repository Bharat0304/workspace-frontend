import React from 'react';
import HeroSection from '../components/dashboard/HeroSection';
import StatsCards from '../components/dashboard/StatsCards';
import QuickActions from '../components/dashboard/QuickActions';
import AIFeedback from '../components/dashboard/AIFeedback';
import ActiveSession from '../components/session/ActiveSession';
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
