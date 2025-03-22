import React, { useEffect, useState, useRef } from 'react';
import '../styles/GallerySection.css';

const GallerySection = () => {
  // Gallery images - replace these with actual image paths
  const images = [
    { 
      src: 'https://via.placeholder.com/800x600?text=Your+Photo+1', 
      alt: 'Special memory 1',
      caption: 'Our first date at the park'
    },
    { 
      src: 'https://via.placeholder.com/800x600?text=Your+Photo+2', 
      alt: 'Special memory 2',
      caption: 'That amazing vacation last summer'
    },
    { 
      src: 'https://via.placeholder.com/800x600?text=Your+Photo+3', 
      alt: 'Special memory 3',
      caption: 'The day we went hiking together'
    },
    { 
      src: 'https://via.placeholder.com/800x600?text=Your+Photo+4', 
      alt: 'Special memory 4',
      caption: 'Your beautiful smile that I love'
    },
    { 
      src: 'https://via.placeholder.com/800x600?text=Your+Photo+5', 
      alt: 'Special memory 5',
      caption: 'Our anniversary dinner'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlideActive, setAutoSlideActive] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const sectionRef = useRef(null);
  const autoSlideTimerRef = useRef(null);
  
  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    resetAutoSlide();
  };
  
  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    resetAutoSlide();
  };
  
  // Jump to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetAutoSlide();
  };
  
  // Reset auto slide timer
  const resetAutoSlide = () => {
    if (autoSlideTimerRef.current) {
      clearTimeout(autoSlideTimerRef.current);
    }
    
    if (autoSlideActive) {
      autoSlideTimerRef.current = setTimeout(() => {
        nextSlide();
      }, 5000);
    }
  };
  
  // Handle touch events for swiping
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };
  
  // Set up auto slide
  useEffect(() => {
    resetAutoSlide();
    
    return () => {
      if (autoSlideTimerRef.current) {
        clearTimeout(autoSlideTimerRef.current);
      }
    };
  }, [autoSlideActive, currentIndex]);
  
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
    <section ref={sectionRef} className="gallery-section">
      <h2 className="section-title">Our Special Moments</h2>
      
      <div 
        className="gallery-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="gallery-wrapper">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`gallery-slide ${index === currentIndex ? 'active' : ''}`}
              style={{transform: `translateX(${(index - currentIndex) * 100}%)`}}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="gallery-image"
                onMouseEnter={() => setAutoSlideActive(false)}
                onMouseLeave={() => setAutoSlideActive(true)}
              />
              <div className="gallery-caption">{image.caption}</div>
            </div>
          ))}
        </div>
        
        <button className="gallery-nav prev" onClick={prevSlide} aria-label="Previous slide">
          &#10094;
        </button>
        <button className="gallery-nav next" onClick={nextSlide} aria-label="Next slide">
          &#10095;
        </button>
      </div>
      
      <div className="gallery-dots">
        {images.map((_, index) => (
          <span 
            key={index} 
            className={`gallery-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
      
      <div className="gallery-controls">
        <button 
          className={`gallery-control ${autoSlideActive ? '' : 'active'}`}
          onClick={() => setAutoSlideActive(!autoSlideActive)}
        >
          {autoSlideActive ? 'Pause' : 'Play'} Slideshow
        </button>
      </div>
    </section>
  );
};

export default GallerySection;