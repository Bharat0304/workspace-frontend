import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="landing-header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">WorkSpace</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav desktop-nav">
            <button onClick={() => scrollToSection('features')} className="nav-link">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="nav-link">How It Works</button>
            <button onClick={() => scrollToSection('pricing')} className="nav-link">Pricing</button>
            <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
            <button onClick={() => scrollToSection('support')} className="nav-link">Support</button>
          </nav>

          {/* Desktop Actions */}
          <div className="header-actions desktop-actions">
            <Link to="/dashboard" className="btn-login">Go to Dashboard</Link>
            <Link to="/dashboard" className="btn-try-free">Try for Free</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <button onClick={() => scrollToSection('features')} className="mobile-nav-link">Features</button>
          <button onClick={() => scrollToSection('how-it-works')} className="mobile-nav-link">How It Works</button>
          <button onClick={() => scrollToSection('pricing')} className="mobile-nav-link">Pricing</button>
          <button onClick={() => scrollToSection('about')} className="mobile-nav-link">About</button>
          <button onClick={() => scrollToSection('support')} className="mobile-nav-link">Support</button>
          <div className="mobile-actions">
            <Link to="/dashboard" className="mobile-btn-login" onClick={toggleMobileMenu}>Dashboard</Link>
            <Link to="/dashboard" className="mobile-btn-register" onClick={toggleMobileMenu}>Try for Free</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
