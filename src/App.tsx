import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/pages/Dashboard';
import Analytics from './components/pages/Analytics';
import Schedule from './components/pages/Schedule';
import Settings from './components/pages/Settings';
import Pricing from './components/pages/Pricing';

// New Landing Page Components
import LandingPage from './components/pages/LandingPage';

import './components/styles/globals.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route (Public) */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Routes (Wrapped in Layout) */}
        <Route path="/dashboard/*" element={
          <Layout>
            <Routes>
              <Route path="" element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="settings" element={<Settings />} />
              <Route path="pricing" element={<Pricing />} />
            </Routes>
          </Layout>
        } />

        {/* Legacy Routes - Redirect to Dashboard */}
        <Route path="/analytics" element={<Navigate to="/dashboard/analytics" replace />} />
        <Route path="/schedule" element={<Navigate to="/dashboard/schedule" replace />} />
        <Route path="/settings" element={<Navigate to="/dashboard/settings" replace />} />
        <Route path="/pricing" element={<Navigate to="/dashboard/pricing" replace />} />

        {/* Catch all route - redirect to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
