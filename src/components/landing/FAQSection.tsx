import React, { useState } from 'react';
import './FAQSection.css';

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI distraction detection work?",
      answer: "Our AI uses computer vision and browser monitoring to detect when you're distracted and provides gentle reminders to refocus."
    },
    {
      question: "What devices are supported?",
      answer: "WorkSpace works on all modern browsers across desktop, tablet, and mobile devices without any installation required."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, all data is encrypted and processed securely. We never share your personal information with third parties."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel anytime from your account settings. Your access continues until the end of your billing period."
    },
    {
      question: "Can I use WorkSpace offline?",
      answer: "Yes, our PWA technology allows you to continue studying even when offline, with data syncing when you reconnect."
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes, we offer special pricing for verified students and bulk discounts for educational institutions."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-description">Find quick answers to common questions</p>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openFAQ === index ? 'open' : ''}`}>
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="faq-toggle">{openFAQ === index ? '−' : '+'}</span>
              </button>
              {openFAQ === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
