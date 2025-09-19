import React from 'react';
import './CTASection.css';

const CTASection: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to Transform Your <span className="highlight-yellow">Study Habits?</span>
          </h2>
          <p className="cta-description">
            Join thousands of students who have already revolutionized their learning experience with WorkSpace
          </p>
          
          <div className="cta-buttons">
            <button className="btn-primary large">
              Get Started Free 🚀
            </button>
            <button className="btn-secondary large">
              Schedule Demo 📅
            </button>
          </div>
          
          <div className="cta-guarantees">
            <div className="guarantee-item">
              <strong>14 Days</strong>
              <span>Free Trial</span>
            </div>
            <div className="guarantee-item">
              <strong>No Card</strong>
              <span>Required</span>
            </div>
            <div className="guarantee-item">
              <strong>Cancel</strong>
              <span>Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
