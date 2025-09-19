import React from 'react';
import './Header.css';

const Footer: React.FC = () => {
  return (
    <footer style={{
      borderTop: '1px solid #e5e7eb',
      padding: '1rem 0',
      background: '#ffffff'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#6b7280',
        fontSize: 14
      }}>
        <div>
          © {new Date().getFullYear()} WorkSpace • All rights reserved
        </div>
        <div style={{display: 'flex', gap: '1rem'}}>
          <a href="#support" style={{color: '#6b7280', textDecoration: 'none'}}>Help & Support</a>
          <a href="#privacy" style={{color: '#6b7280', textDecoration: 'none'}}>Privacy</a>
          <a href="#terms" style={{color: '#6b7280', textDecoration: 'none'}}>Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
