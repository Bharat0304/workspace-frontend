import React from 'react';
import './TestimonialsSection.css';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      rating: 5,
      text: "WorkSpace completely transformed my JEE preparation. The AI distraction detection helped me maintain focus for 6+ hours daily. I improved my mock test scores by 40% in just 2 months!",
      author: "Arjun Sharma",
      role: "JEE Aspirant, Delhi",
      avatar: "/api/placeholder/60/60"
    },
    {
      rating: 5,
      text: "The schedule tracking feature is incredible! I finally stick to my study plan and the analytics help me understand my productivity patterns. My parents are amazed by the change.",
      author: "Priya Patel",
      role: "NEET Aspirant, Mumbai",
      avatar: "/api/placeholder/60/60"
    },
    {
      rating: 5,
      text: "As someone who struggled with phone addiction, WorkSpace's distraction detection was a game-changer. I went from 2 hours of actual study to 8 hours of focused learning daily.",
      author: "Rohit Kumar",
      role: "Engineering Student, Bangalore",
      avatar: "/api/placeholder/60/60"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            What Students Are <span className="highlight">Saying</span>
          </h2>
          <p className="section-description">
            Real success stories from students who transformed their study habits
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              
              <blockquote className="testimonial-text">
                "{testimonial.text}"
              </blockquote>
              
              <div className="testimonial-author">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="author-avatar"
                />
                <div className="author-info">
                  <div className="author-name">{testimonial.author}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="trusted-institutions">
          <h3>Trusted by Leading Educational Institutions</h3>
          <div className="institutions-logos">
            <span>IIT Delhi</span>
            <span>AIIMS</span>
            <span>Kota Coaching</span>
            <span>Allen Career</span>
            <span>Aakash Institute</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
