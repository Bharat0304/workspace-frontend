import React from 'react';
import { Check } from 'lucide-react';
import './PricingCards.css';

const PricingCards: React.FC = () => {
  const plans = [
    {
      name: 'Free Starter',
      price: '₹0',
      period: '/month',
      description: 'Perfect for trying out WorkSpace',
      features: [
        'Basic distraction detection',
        'Simple schedule tracking',
        'Weekly analytics',
        '1 study goal'
      ],
      buttonText: 'Get Started Free',
      buttonClass: 'btn-outline'
    },
    {
      name: 'Pro Student',
      price: '₹299',
      period: '/month',
      description: 'Everything you need to excel',
      features: [
        'Advanced AI distraction detection',
        'Smart schedule optimization',
        'Daily detailed analytics',
        'Unlimited study goals',
        'PDF report exports',
        'Priority support'
      ],
      buttonText: 'Start Pro Trial',
      buttonClass: 'btn-primary',
      popular: true
    },
    {
      name: 'Premium Elite',
      price: '₹499',
      period: '/month',
      description: 'For serious exam aspirants',
      features: [
        'Everything in Pro',
        '1-on-1 productivity coaching',
        'Custom study strategies',
        'Parent/teacher dashboards',
        '24/7 priority support'
      ],
      buttonText: 'Go Premium',
      buttonClass: 'btn-primary'
    }
  ];

  return (
    <div className="pricing-section">
      <div className="pricing-header">
        <h2>Choose Your Success Plan</h2>
        <p>Flexible pricing options designed for every student's needs and budget</p>
      </div>
      
      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            
            <div className="plan-header">
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="price">{plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
              <p className="plan-description">{plan.description}</p>
            </div>

            <div className="plan-features">
              {plan.features.map((feature, i) => (
                <div key={i} className="feature">
                  <Check size={16} className="feature-check" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button className={plan.buttonClass}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
      
      <div className="pricing-footer">
        <p>All plans include 14-day free trial • No credit card required • Cancel anytime</p>
        <div className="guarantees">
          <span>🛡️ Secure Payment</span>
          <span>↩️ 30-Day Money Back</span>
          <span>🎧 24/7 Support</span>
        </div>
      </div>
    </div>
  );
};

export default PricingCards;
