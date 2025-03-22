import React, { useEffect, useState } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-content">
          <h1 className="header-title">Happy Birthday My Love</h1>
          <p className="header-subtitle">A celebration of you and our journey together</p>
        </div>
      </div>
      <div className="header-decorations">
        <div className="sparkle sparkle-1"></div>
        <div className="sparkle sparkle-2"></div>
        <div className="sparkle sparkle-3"></div>
      </div>
      <div className="scroll-arrow">
        <span>▼</span>
      </div>
    </header>
  );
};

export default Header;