document.addEventListener('DOMContentLoaded', function() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownMessage = document.querySelector('.countdown-message');
    
    // Set the target date to March 24, 2025
    const targetDate = new Date('2025-03-23T00:00:00'); // Set to 12:00 AM on March 24, 2025
    
    // Update countdown timer
    function updateCountdown() {
        const currentDate = new Date();
        
        const timeDifference = targetDate - currentDate;
        
        // If the target date has passed
        if (timeDifference <= 0) {
            displayBirthdayMessage();
            return;
        }
        
        // Calculate remaining time
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        // Display the countdown
        daysElement.textContent = formatTime(days);
        hoursElement.textContent = formatTime(hours);
        minutesElement.textContent = formatTime(minutes);
        secondsElement.textContent = formatTime(seconds);
        
        // Update countdown message based on remaining time
        updateCountdownMessage(days);
        
        // Call this function again in 1 second
        setTimeout(updateCountdown, 1000);
    }
    
    // Format time to always have 2 digits
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    
    // Update countdown message based on remaining days
    function updateCountdownMessage(days) {
        if (!countdownMessage) return;
        
        if (days > 30) {
            countdownMessage.textContent = "There's still time, but I'm already excited for your special day!";
        } else if (days > 7) {
            countdownMessage.textContent = "Your birthday is approaching! I can't wait to celebrate with you!";
        } else if (days > 1) {
            countdownMessage.textContent = "Just a few more days until we celebrate the amazing you!";
        } else if (days === 1) {
            countdownMessage.textContent = "Tomorrow is the big day! Get ready for some birthday magic!";
        } else {
            countdownMessage.textContent = "It's almost here! Counting down the final hours to your birthday!";
        }
    }
    
    // Display birthday message when it's the target date
    function displayBirthdayMessage() {
        if (daysElement) daysElement.textContent = "00";
        if (hoursElement) hoursElement.textContent = "00";
        if (minutesElement) minutesElement.textContent = "00";
        if (secondsElement) secondsElement.textContent = "00";
        
        if (countdownMessage) {
            countdownMessage.textContent = "Happy Birthday! Today is your special day!";
            countdownMessage.classList.add('animate-bounce');
        }
        
        // Add special effects to the page for the birthday
        const body = document.body;
        body.classList.add('birthday-mode');
        
        // Create a celebratory banner
        const banner = document.createElement('div');
        banner.className = 'birthday-banner';
        banner.innerHTML = `
            <h2 class="shimmer">Happy Birthday!</h2>
            <p>Today is all about celebrating the amazing person you are!</p>
        `;
        
        // Insert banner at the top of the countdown section
        const countdownSection = document.querySelector('.countdown-section');
        if (countdownSection) {
            countdownSection.insertBefore(banner, countdownSection.firstChild);
        }
        
        // Add CSS for the birthday mode
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .birthday-mode {
                background-image: linear-gradient(to right, #fcf1f5, #ffe8f0, #fcf1f5);
                background-size: 200% 200%;
                animation: gradientBackground 10s ease infinite;
            }
            
            @keyframes gradientBackground {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            .birthday-banner {
                background-color: var(--primary-color);
                color: white;
                text-align: center;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 30px;
                animation: fadeInUp 1s forwards;
                box-shadow: 0 5px 15px rgba(255, 92, 141, 0.4);
            }
            
            .birthday-banner h2 {
                color: white;
                font-size: 2.5rem;
                margin-bottom: 10px;
            }
            
            .shimmer {
                background: linear-gradient(
                    90deg,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0.8) 50%,
                    rgba(255, 255, 255, 0) 100%
                );
                background-size: 200% auto;
                animation: shimmer 2s infinite;
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            @keyframes shimmer {
                to {
                    background-position: 200% center;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Start the countdown if elements exist
    if (daysElement && hoursElement && minutesElement && secondsElement) {
        updateCountdown();
    }
});
