import React from 'react';
import './HowItWorksSection.css';

const HowItWorksSection: React.FC = () => {
  return (
    <section className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            How It <span className="highlight">Works</span>
          </h2>
          <p className="section-description">
            Get started in minutes with our simple 3-step process designed for maximum efficiency
          </p>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">
              <span className="number">1</span>
            </div>
            <div className="step-icon purple">
              📅
            </div>
            <h3 className="step-title">Set Your Schedule</h3>
            <p className="step-description">
              Create your personalized study plan using our intuitive drag-and-drop calendar. 
              Set subjects, time blocks, and goals with AI-powered recommendations.
            </p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">
              <span className="number">2</span>
            </div>
            <div className="step-icon green">
              🧠
            </div>
            <h3 className="step-title">Work, WorkSpace Handles the Rest</h3>
            <p className="step-description">
              Focus on your studies while our AI monitors your attention, tracks distractions, 
              and provides gentle guidance to keep you on track automatically.
            </p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">
              <span className="number">3</span>
            </div>
            <div className="step-icon orange">
              📈
            </div>
            <h3 className="step-title">Get Insights and Improve</h3>
            <p className="step-description">
              Review detailed analytics, receive personalized recommendations, and continuously 
              optimize your study habits for peak performance.
            </p>
          </div>
        </div>

        <div className="cta-container">
          <button className="btn-start-journey">Start Your Journey Today 🚀</button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
