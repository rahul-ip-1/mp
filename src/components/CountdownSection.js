import React, { useEffect, useState, useRef } from 'react';
import '../styles/CountdownSection.css';

const CountdownSection = () => {
  // Set the birthday date - change this to the actual birthday date
  // Format: new Date(year, month-1, day) (months are 0-indexed in JavaScript)
  const birthdayDate = new Date(new Date().getFullYear(), 6, 15); // July 15 of current year
  
  // If the birthday has already occurred this year, set to next year
  if (birthdayDate < new Date()) {
    birthdayDate.setFullYear(birthdayDate.getFullYear() + 1);
  }
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isBirthday, setIsBirthday] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Function to update the countdown
    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = birthdayDate - now;
      
      // Check if it's birthday
      if (timeDifference <= 0) {
        setIsBirthday(true);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      // Calculate time units
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };
    
    // Update the countdown initially
    updateCountdown();
    
    // Update the countdown every second
    const timer = setInterval(updateCountdown, 1000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [birthdayDate]);
  
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
    <section ref={sectionRef} className="countdown-section">
      <h2 className="section-title">Birthday Countdown</h2>
      
      <div className="countdown-container">
        {isBirthday ? (
          <div className="birthday-message">
            <h3>Happy Birthday!</h3>
            <p>Today is your special day. I hope it's as amazing as you are!</p>
            <div className="celebration-icon">🎉</div>
          </div>
        ) : (
          <>
            <div className="countdown-wrapper">
              <div className="countdown-item">
                <div className="countdown-value">{timeLeft.days}</div>
                <div className="countdown-label">Days</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-value">{timeLeft.hours}</div>
                <div className="countdown-label">Hours</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-value">{timeLeft.minutes}</div>
                <div className="countdown-label">Minutes</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-value">{timeLeft.seconds}</div>
                <div className="countdown-label">Seconds</div>
              </div>
            </div>
            
            <div className="countdown-message">
              {timeLeft.days > 30 && (
                <p>The big day is still a while away, but I'm already excited to celebrate you!</p>
              )}
              {timeLeft.days <= 30 && timeLeft.days > 7 && (
                <p>Less than a month to go! I can't wait to celebrate your special day!</p>
              )}
              {timeLeft.days <= 7 && timeLeft.days > 1 && (
                <p>Only {timeLeft.days} days left! The excitement is building up!</p>
              )}
              {timeLeft.days === 1 && (
                <p>Just one more day! The countdown is almost over!</p>
              )}
              {timeLeft.days < 1 && (
                <p>Less than 24 hours to go! Your special day is almost here!</p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CountdownSection;