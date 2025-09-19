import React from 'react';
import './SupportSection.css';

const SupportSection: React.FC = () => {
  const supportOptions = [
    {
      icon: "🎧",
      title: "24/7 Support",
      description: "Get instant help through our chat support system",
      action: "Contact Support",
      color: "blue"
    },
    {
      icon: "📚",
      title: "Knowledge Base", 
      description: "Comprehensive guides and tutorials",
      action: "Browse Articles",
      color: "green"
    },
    {
      icon: "👥",
      title: "Community",
      description: "Connect with other students and share tips",
      action: "Join Community", 
      color: "purple"
    },
    {
      icon: "🎥",
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features",
      action: "Watch Videos",
      color: "orange"
    }
  ];

  return (
    <section className="support-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            We're Here to <span className="highlight">Help</span>
          </h2>
          <p className="section-description">
            Get the support you need to make the most of WorkSpace with our comprehensive help resources
          </p>
        </div>

        <div className="support-grid">
          {supportOptions.map((option, index) => (
            <div key={index} className={`support-card ${option.color}`}>
              <div className="support-icon">{option.icon}</div>
              <h3 className="support-title">{option.title}</h3>
              <p className="support-description">{option.description}</p>
              <button className="support-action">{option.action}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
