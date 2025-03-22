import React, { useEffect, useRef } from 'react';
import '../styles/MemorySection.css';

const MemorySection = () => {
  // Memory entries with titles and descriptions
  const memories = [
    {
      title: "The Day We Met",
      content: "I still remember the day we first met. Your smile lit up the entire room, and I knew at that moment that you were someone special. That day changed my life forever, and I'm grateful for every moment since then."
    },
    {
      title: "Our First Date",
      content: "Remember our first date? I was so nervous, but you made everything feel so natural. We talked for hours, and it felt like we'd known each other forever. That evening will always have a special place in my heart."
    },
    {
      title: "Adventures Together",
      content: "From spontaneous road trips to quiet evenings at home, every adventure with you becomes a cherished memory. Your sense of adventure and joy for life makes every experience together magical."
    },
    {
      title: "Why I Love You",
      content: "I love your kindness, your strength, and the way you make everyone around you feel special. Your laughter is my favorite sound, and your heart is the most beautiful thing I've ever known. You make the world a better place just by being you."
    }
  ];
  
  const sectionRef = useRef(null);
  const memoryRefs = useRef([]);
  
  // Set up memory refs
  useEffect(() => {
    memoryRefs.current = memoryRefs.current.slice(0, memories.length);
  }, [memories.length]);
  
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
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    memoryRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      memoryRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="memory-section">
      <h2 className="section-title">Our Precious Memories</h2>
      
      <div className="memories-container">
        {memories.map((memory, index) => (
          <div 
            key={index} 
            ref={(el) => (memoryRefs.current[index] = el)}
            className={`memory-card scroll-transition ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div className="memory-icon">
              {index === 0 ? '💫' : index === 1 ? '💖' : index === 2 ? '🌈' : '✨'}
            </div>
            <div className="memory-content">
              <h3 className="memory-title">{memory.title}</h3>
              <p className="memory-text">{memory.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="special-message scroll-transition">
        <h3 className="message-title">My Birthday Wish For You</h3>
        <p className="message-content">
          On your special day, I wish you all the happiness your heart can hold. 
          May this year bring you endless joy, abundant love, and incredible adventures. 
          You deserve all the beautiful things life has to offer, and I'm so grateful 
          to be celebrating another year of your amazing life with you. Happy Birthday, my love!
        </p>
        <div className="message-signature">With all my love</div>
      </div>
    </section>
  );
};

export default MemorySection;