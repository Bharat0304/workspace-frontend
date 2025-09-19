import React from 'react';
import Header from '../layout/Header';
import HeroSection from '../landing/HeroSection';
import FeaturesSection from '../landing/FeaturesSection';
import HowItWorksSection from '../landing/HowItWorksSection';
import TestimonialsSection from '../landing/TestimonialsSection';
import PricingSection from '../landing/PricingSection';
import AboutSection from '../landing/AboutSection';
import FAQSection from '../landing/FAQSection';
import SupportSection from '../landing/SupportSection';
import CTASection from '../landing/CTASection';
import Footer from '../layout/Footer';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <AboutSection />
      <FAQSection />
      <SupportSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
