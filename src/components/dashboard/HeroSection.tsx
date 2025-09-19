import React from 'react';
import { Play, ArrowRight, CheckCircle2, Shield, Star } from 'lucide-react';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section" aria-label="WorkSpace landing hero">
      <div className="hero-content">
        <div className="hero-text">
          {/* Trust strip */}
          <div className="trust-row" aria-label="social proof">
            <div className="trust-item">
              <Star className="icon" aria-hidden="true" />
              <span><strong>4.8/5</strong> average rating</span>
            </div>
            <div className="divider" role="presentation" />
            <div className="trust-item">
              <Shield className="icon" aria-hidden="true" />
              <span>Private by design</span>
            </div>
          </div>

          <h1 className="hero-title">
            Master Your <span className="highlight-yellow">Focus.</span>
            <br />
            Conquer Your <span className="highlight-green">Exams.</span>
          </h1>

          <p className="hero-description">
            AI-powered PWA for students to eliminate distractions and boost productivity.
            Transform your study sessions with intelligent focus tracking and real-time guidance.
          </p>

          {/* Feature bullets */}
          <ul className="feature-list" aria-label="Key features">
            <li className="feature-item"><CheckCircle2 className="icon" aria-hidden="true" /> Real-time focus tracking</li>
            <li className="feature-item"><CheckCircle2 className="icon" aria-hidden="true" /> Smart schedules & reminders</li>
            <li className="feature-item"><CheckCircle2 className="icon" aria-hidden="true" /> Gentle distraction blocking</li>
          </ul>

          <div className="hero-actions">
            <a className="btn-primary" href="/pricing" aria-label="Start free trial">
              Start Free Trial <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="btn-secondary" href="#demo" aria-label="Watch product demo">
              <Play size={18} aria-hidden="true" /> Watch Demo
            </a>
          </div>
        </div>

        <div className="hero-image">
          <div className="focus-indicator">
            <span className="focus-badge">✓ Focus Mode Active</span>
          </div>

          {/* Image card */}
          <div className="image-frame" role="img" aria-label="Student studying with WorkSpace on a laptop">
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ef2f7b5387-133bbd44e012e7efd9ec.png"
              alt="Student studying with WorkSpace"
              loading="eager"
              decoding="async"
              className="hero-img"
            />
            <div className="image-glow" aria-hidden="true" />
          </div>

          {/* Secondary badges under image */}
          <div className="badge-row" aria-label="app capabilities">
            <span className="badge">PWA • Works Offline</span>
            <span className="badge">iOS & Android</span>
            <span className="badge">No data sold</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
