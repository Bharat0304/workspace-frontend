import React from 'react';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Master Your <span className="highlight-yellow">Focus.</span>
            <br />
            Conquer Your <span className="highlight-green">Exams.</span>
          </h1>
          <p className="hero-description">
            AI-powered PWA for students to eliminate distractions and boost productivity. 
            Transform your study sessions with intelligent focus tracking and real-time guidance.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Start Free Trial →</button>
            <button className="btn-secondary">Watch Demo ▶</button>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="focus-indicator">
            <span className="focus-badge">✓ Focus Mode Active</span>
          </div>
          <img 
            src="/api/placeholder/500/400" 
            alt="Student studying with WorkSpace"
            className="hero-img"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
