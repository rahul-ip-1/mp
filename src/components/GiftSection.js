import React, { useEffect, useState, useRef } from 'react';
import '../styles/GiftSection.css';

const GiftSection = ({ createHeartConfetti }) => {
  const [openedGifts, setOpenedGifts] = useState([]);
  const sectionRef = useRef(null);
  
  // Gift data with messages
  const gifts = [
    {
      id: 1,
      emoji: '🎁',
      color: '#ff85a2',
      message: "A box of your favorite memories we've shared together, to remind you of all our special moments."
    },
    {
      id: 2,
      emoji: '💝',
      color: '#ff5c8d',
      message: "A heart full of love that grows stronger each day. My love for you is endless."
    },
    {
      id: 3,
      emoji: '🌹',
      color: '#ff7676',
      message: "A promise to continue being your partner, best friend, and biggest supporter in everything you do."
    },
    {
      id: 4,
      emoji: '✨',
      color: '#ffcb85',
      message: "The gift of endless adventures and new experiences that we'll create together in the coming year."
    },
    {
      id: 5,
      emoji: '🌠',
      color: '#85c1ff',
      message: "A wish upon a star for all your dreams to come true. You deserve everything wonderful."
    }
  ];
  
  // Handle gift opening
  const openGift = (id) => {
    if (!openedGifts.includes(id)) {
      setOpenedGifts([...openedGifts, id]);
      
      // Create heart confetti effect
      createHeartConfetti();
      
      // Play a sound effect
      playGiftSound();
    }
  };
  
  // Play gift opening sound
  const playGiftSound = () => {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-magical-spell-sparkle-sound-2598.mp3');
    audio.volume = 0.3;
    audio.play().catch(error => console.log('Audio playback error:', error));
  };
  
  // Check if gift is open
  const isGiftOpen = (id) => {
    return openedGifts.includes(id);
  };
  
  // Add scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="gift-section">
      <h2 className="section-title">Virtual Gifts For You</h2>
      
      <p className="gift-instructions">
        Click on each gift to unwrap a special message from me to you
      </p>
      
      <div className="gifts-container">
        {gifts.map((gift) => (
          <div 
            key={gift.id} 
            className={`gift-box ${isGiftOpen(gift.id) ? 'opened' : ''}`}
            onClick={() => openGift(gift.id)}
            style={{ 
              '--gift-color': gift.color,
              animationDelay: `${(gift.id - 1) * 0.2}s` 
            }}
          >
            <div className="gift-box-inner">
              <div className="gift-front">
                <div className="gift-emoji">{gift.emoji}</div>
                <div className="gift-ribbon">
                  <div className="gift-ribbon-line"></div>
                  <div className="gift-ribbon-bow">
                    <div className="gift-ribbon-bow-left"></div>
                    <div className="gift-ribbon-bow-right"></div>
                  </div>
                </div>
                <p className="gift-hint">Click to open</p>
              </div>
              <div className="gift-back">
                <p className="gift-message">{gift.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GiftSection;