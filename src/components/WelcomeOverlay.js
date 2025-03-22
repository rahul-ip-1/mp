import React, { useEffect, useState } from 'react';
import '../styles/WelcomeOverlay.css';

const WelcomeOverlay = ({ onClose }) => {
  const [isReady, setIsReady] = useState(false);
  const [heartAnimated, setHeartAnimated] = useState(false);
  
  useEffect(() => {
    // Start heart animation after 1 second
    const heartTimer = setTimeout(() => {
      setHeartAnimated(true);
    }, 1000);
    
    // Make the overlay ready to be dismissed after 2.5 seconds
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 2500);
    
    return () => {
      clearTimeout(heartTimer);
      clearTimeout(readyTimer);
    };
  }, []);
  
  const handleClick = () => {
    if (isReady) {
      onClose();
    }
  };
  
  return (
    <div 
      className={`welcome-overlay ${isReady ? 'ready' : ''}`} 
      onClick={handleClick}
    >
      <div className="welcome-content">
        <div className={`welcome-heart ${heartAnimated ? 'animated' : ''}`}>❤️</div>
        <h1 className="welcome-title">For My Love</h1>
        <p className="welcome-subtitle">A special birthday surprise just for you</p>
        {isReady && (
          <button className="welcome-button">Click to Enter</button>
        )}
      </div>
    </div>
  );
};

export default WelcomeOverlay;