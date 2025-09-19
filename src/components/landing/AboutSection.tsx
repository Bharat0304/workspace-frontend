import React from 'react';
import './AboutSection.css';

const AboutSection: React.FC = () => {
  const stats = [
    { value: "50K+", label: "Active Students" },
    { value: "98%", label: "Success Rate" },
    { value: "2M+", label: "Study Hours" }
  ];

  return (
    <section className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">
              About <span className="highlight">WorkSpace</span>
            </h2>
            <p className="about-description">
              Founded by former IIT students who understood the struggle of maintaining focus during 
              intense exam preparation, WorkSpace was born from the need to bridge the gap between 
              intention and action in studying.
            </p>

            <div className="mission-vision">
              <div className="mission-item">
                <div className="mission-icon purple">🎯</div>
                <div>
                  <h4>Our Mission</h4>
                  <p>To democratize access to advanced productivity tools and help every student achieve their academic potential through AI-powered focus management.</p>
                </div>
              </div>

              <div className="mission-item">
                <div className="mission-icon green">👁️</div>
                <div>
                  <h4>Our Vision</h4>
                  <p>A world where every student has the tools and insights needed to maximize their learning potential and achieve their dreams without burning out.</p>
                </div>
              </div>

              <div className="mission-item">
                <div className="mission-icon purple">👥</div>
                <div>
                  <h4>Our Values</h4>
                  <p>Privacy-first approach, student-centric design, and continuous innovation based on real user feedback and educational research.</p>
                </div>
              </div>
            </div>

            <div className="stats-row">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="award-badge">
              <div className="award-icon">🏆</div>
              <div>
                <strong>Award Winning</strong>
                <p>Best EdTech Innovation 2024</p>
              </div>
            </div>
          </div>

          <div className="about-image">
            <img src="/api/placeholder/600/400" alt="WorkSpace team" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
