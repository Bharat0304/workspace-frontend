import React from 'react';
import './FeaturesSection.css';

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-header">
          <div className="feature-badge">💡 WorkSpace is the Solution</div>
          <h2 className="features-title">
            Powerful Features for <span className="highlight">Peak Performance</span>
          </h2>
          <p className="features-description">
            Experience the next generation of study productivity with AI-driven insights and 
            real-time focus optimization
          </p>
        </div>

        <div className="features-grid">
          {/* Distraction Statistics */}
          <div className="feature-card stats-card">
            <h3 className="stats-title">Struggling with <span className="highlight-red">Distractions?</span></h3>
            <p className="stats-description">
              Every minute lost to distractions is a step away from your goals. WorkSpace 
              transforms your study environment into a distraction-free zone with AI-powered 
              focus management.
            </p>
            
            <div className="distraction-stats">
              <div className="stat-item">
                <div className="stat-icon red">📱</div>
                <div className="stat-content">
                  <h4>Social Media Addiction</h4>
                  <p>Average student checks phone 150+ times daily during study sessions</p>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon yellow">⏰</div>
                <div className="stat-content">
                  <h4>Time Mismanagement</h4>
                  <p>65% of study time wasted on unproductive activities and procrastination</p>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon blue">🧠</div>
                <div className="stat-content">
                  <h4>Lack of Self-Awareness</h4>
                  <p>Students don't realize when they lose focus until it's too late</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Detection Feature */}
          <div className="feature-card ai-detection-card">
            <div className="feature-badge">🤖 AI-Powered Detection</div>
            <h3 className="feature-title">
              Stay Focused with Real-Time AI-Powered Distraction Detection
            </h3>
            <p className="feature-description">
              WorkSpace continuously monitors your webcam and browser activity using advanced 
              cloud-based AI to detect when you shift away from your study focus, instantly 
              nudging you back on track without manual intervention.
            </p>
            
            <div className="ai-features">
              <div className="ai-feature">
                <span className="check-icon">✅</span>
                <div>
                  <strong>Computer Vision AI</strong>
                  <p>Advanced facial recognition detects when you look away</p>
                </div>
              </div>
              
              <div className="ai-feature">
                <span className="check-icon">✅</span>
                <div>
                  <strong>Browser Activity Monitoring</strong>
                  <p>Real-time tracking of tabs and applications</p>
                </div>
              </div>
              
              <div className="ai-feature">
                <span className="check-icon">✅</span>
                <div>
                  <strong>Instant Gentle Reminders</strong>
                  <p>Non-intrusive notifications to redirect attention</p>
                </div>
              </div>
            </div>
            
            <button className="btn-demo">Try Detection Demo →</button>
            
            <div className="ai-demo-image">
              <img src="/api/placeholder/600/400" alt="AI Detection Demo" />
              <div className="demo-overlay">
                <div className="detection-alert">⚠️ Distraction Detected</div>
                <div className="ai-assistant">
                  <span className="assistant-icon">🤖</span>
                  <div>
                    <strong>AI Assistant</strong>
                    <p>Redirecting focus...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PWA Feature */}
          <div className="feature-card pwa-card">
            <div className="feature-badge">📱 Progressive Web App</div>
            <h3 className="feature-title">
              Focus Anywhere, On Any Device — No Install Needed
            </h3>
            <p className="feature-description">
              Access WorkSpace from any browser on desktop or mobile. Enjoy fast load times, 
              offline session caching, and intuitive touch and keyboard controls — all without 
              installing an app.
            </p>
            
            <div className="pwa-features">
              <div className="pwa-feature">
                <div className="pwa-icon purple">🚀</div>
                <div>
                  <strong>Lightning Fast</strong>
                  <p>Sub-second load times</p>
                </div>
              </div>
              
              <div className="pwa-feature">
                <div className="pwa-icon blue">⬇️</div>
                <div>
                  <strong>No Downloads</strong>
                  <p>Browser-based access</p>
                </div>
              </div>
              
              <div className="pwa-feature">
                <div className="pwa-icon green">📱</div>
                <div>
                  <strong>Cross-Platform</strong>
                  <p>Works everywhere</p>
                </div>
              </div>
              
              <div className="pwa-feature">
                <div className="pwa-icon red">🔒</div>
                <div>
                  <strong>Secure</strong>
                  <p>End-to-end encrypted</p>
                </div>
              </div>
            </div>
            
            <button className="btn-offline">📱 Works Offline</button>
            
            <div className="pwa-demo-image">
              <img src="/api/placeholder/500/300" alt="Multi-device compatibility" />
            </div>
          </div>

          {/* Analytics Feature */}
          <div className="feature-card analytics-card">
            <div className="feature-badge">📊 Advanced Analytics</div>
            <h3 className="feature-title">
              Insights to Improve Your Focus Every Session
            </h3>
            <p className="feature-description">
              Receive detailed reports after each study session, including focus percentages, 
              distraction types, and personalized AI tips designed to help you enhance future sessions.
            </p>
            
            <div className="analytics-preview">
              <h4>Analytics Dashboard Preview</h4>
              
              <div className="analytics-stats">
                <div className="analytics-stat green">
                  <span className="stat-dot"></span>
                  <span className="stat-label">Focus Time</span>
                  <span className="stat-value">2h 45m</span>
                </div>
                
                <div className="analytics-stat red">
                  <span className="stat-dot"></span>
                  <span className="stat-label">Distractions</span>
                  <span className="stat-value">12 instances</span>
                </div>
                
                <div className="analytics-stat blue">
                  <span className="stat-dot"></span>
                  <span className="stat-label">Productivity Score</span>
                  <span className="stat-value">87%</span>
                </div>
              </div>
              
              <div className="analytics-actions">
                <button className="btn-demo-report">View Demo Report</button>
                <button className="btn-export">Export PDF</button>
              </div>
            </div>
            
            <div className="analytics-dashboard-image">
              <img src="/api/placeholder/600/400" alt="Analytics Dashboard" />
              <div className="dashboard-overlay">
                <div className="goal-achievement">
                  <span className="achievement-icon">🏆</span>
                  <div>
                    <strong>Daily Goal</strong>
                    <p className="achieved">Achieved!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="features-cta">
          <div className="cta-card">
            <h3>Ready to explore all features?</h3>
            <p>Discover the complete WorkSpace experience with advanced productivity tools</p>
            <button className="btn-explore">Explore All Features →</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
