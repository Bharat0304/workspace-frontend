import React from 'react';
import { Bot } from 'lucide-react';
import '../dashboard/'

const AIFeedback: React.FC = () => {
  return (
    <div className="ai-feedback">
      <div className="feedback-header">
        <Bot className="ai-icon" size={24} />
        <span className="feedback-title">AI Feedback</span>
      </div>
      
      <div className="feedback-content">
        <p>
          Great focus overall! Try putting your phone in another room during the next 
          session to reduce Instagram distractions. Consider taking a 5-minute break 
          every hour to maintain concentration.
        </p>
      </div>
    </div>
  );
};

export default AIFeedback;
