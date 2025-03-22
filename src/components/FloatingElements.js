import React, { useEffect } from 'react';
import '../styles/FloatingElements.css';

const FloatingElements = () => {
  useEffect(() => {
    // Create floating elements on component mount
    createFloatingElements();
    
    // Cleanup floating elements on component unmount
    return () => {
      const container = document.querySelector('.floating-elements');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);
  
  const createFloatingElements = () => {
    const container = document.querySelector('.floating-elements');
    if (!container) return;
    
    // Create an array of element types with their emoji representations
    const elements = [
      { type: 'heart', content: '❤️' },
      { type: 'balloon', content: '🎈' },
      { type: 'gift', content: '🎁' },
      { type: 'star', content: '⭐' }
    ];
    
    // Create a set number of random floating elements
    for (let i = 0; i < 15; i++) {
      // Choose a random element type
      const randomElement = elements[Math.floor(Math.random() * elements.length)];
      
      // Create the element
      const element = document.createElement('div');
      element.className = `floating-element ${randomElement.type}`;
      element.textContent = randomElement.content;
      
      // Apply random positioning and animation properties
      const size = Math.random() * 20 + 20; // between 20px and 40px
      const left = Math.random() * 100; // random position from 0% to 100%
      const animationDuration = Math.random() * 15 + 15; // between 15s and 30s
      const animationDelay = Math.random() * 15; // between 0s and 15s
      
      element.style.fontSize = `${size}px`;
      element.style.left = `${left}%`;
      element.style.animationDuration = `${animationDuration}s`;
      element.style.animationDelay = `${animationDelay}s`;
      
      // Add the element to the container
      container.appendChild(element);
    }
  };
  
  return <div className="floating-elements"></div>;
};

export default FloatingElements;