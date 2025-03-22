import React, { useState, useEffect } from 'react';
import WelcomeOverlay from './components/WelcomeOverlay';
import Header from './components/Header';
import CountdownSection from './components/CountdownSection';
import GallerySection from './components/GallerySection';
import MemorySection from './components/MemorySection';
import GiftSection from './components/GiftSection';
import CakeSection from './components/CakeSection';
import Footer from './components/Footer';
import FloatingElements from './components/FloatingElements';
import './styles/App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Handle welcome overlay dismissal
  const handleWelcomeClose = () => {
    setShowWelcome(false);
    
    // Create heart confetti effect when entering main content
    setTimeout(() => {
      createHeartConfetti();
    }, 500);
  };
  
  // Create heart confetti effect
  const createHeartConfetti = () => {
    for (let i = 0; i < 40; i++) {
      const heart = document.createElement('div');
      
      // Random properties
      const size = Math.random() * 15 + 10;
      const startX = window.innerWidth / 2;
      const startY = window.innerHeight / 2;
      const duration = Math.random() * 3 + 2;
      const distance = Math.random() * 200 + 100;
      const angle = Math.random() * Math.PI * 2;
      const finalX = distance * Math.cos(angle);
      const finalY = distance * Math.sin(angle);
      
      // Create heart shape using emoji for simplicity
      heart.textContent = '❤️';
      heart.style.position = 'fixed';
      heart.style.fontSize = `${size}px`;
      heart.style.left = `${startX}px`;
      heart.style.top = `${startY}px`;
      heart.style.zIndex = '1000';
      heart.style.opacity = '0.9';
      heart.style.transform = 'translate(-50%, -50%)';
      heart.style.transition = `all ${duration}s ease-out`;
      
      document.body.appendChild(heart);
      
      // Force a reflow to ensure the transition works
      heart.offsetHeight;
      
      // Set final position
      heart.style.transform = `translate(${finalX}px, ${finalY}px) rotate(${Math.random() * 360}deg)`;
      heart.style.opacity = '0';
      
      // Remove heart after animation
      setTimeout(() => {
        heart.remove();
      }, duration * 1000);
    }
  };
  
  // Set current year in footer
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="App">
      {showWelcome && <WelcomeOverlay onClose={handleWelcomeClose} />}
      
      <FloatingElements />
      
      <Header />
      
      <main>
        <CountdownSection />
        <GallerySection />
        <MemorySection />
        <GiftSection createHeartConfetti={createHeartConfetti} />
        <CakeSection />
      </main>
      
      <Footer year={currentYear} />
    </div>
  );
}

export default App;