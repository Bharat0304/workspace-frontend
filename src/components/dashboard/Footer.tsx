import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const footerLinks = [
    { label: 'Help & Support', onClick: () => console.log('Help & Support') },
    { label: 'Send Feedback', onClick: () => console.log('Send Feedback') },
    { label: 'Productivity Tips', onClick: () => console.log('Productivity Tips') }
  ];

  return (
    <footer className="dashboard-footer">
      <div className="footer-links">
        {footerLinks.map((link, index) => (
          <button key={index} className="footer-link" onClick={link.onClick}>
            {link.label}
          </button>
        ))}
      </div>
      <div className="footer-info">
        <span>WorkSpace v2.1.0 • Last sync: 2 minutes ago</span>
      </div>
    </footer>
  );
};

export default Footer;
