document.addEventListener('DOMContentLoaded', function() {
    // Welcome overlay animation
    const welcomeOverlay = document.getElementById('welcome-overlay');
    
    // Show welcome overlay after 2 seconds
    setTimeout(() => {
    welcomeOverlay.classList.add('show');
    }, 0); // Slightly earlier than the CSS animation to ensure smooth transition
    
    // Handle click to dismiss welcome overlay
    welcomeOverlay.addEventListener('click', () => {
        welcomeOverlay.classList.add('hide');
        welcomeOverlay.classList.remove('show');
        
        // Add some extra celebration when entering the main content
        setTimeout(() => {
            createHeartConfetti();
        }, 500);
    });


    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    let currentIndex = 0;

    function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % images.length; // Loop back to first image
    const offset = -currentIndex * 100; // Move to the next slide
    slider.style.transform = `translateX(${offset}%)`;
    }

    // Move to the next slide every 3 seconds
    setInterval(moveToNextSlide, 3000);

    
    
    // Set current year in footer
    // document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Start journey button
    const startJourneyBtn = document.getElementById('start-journey');
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', function() {
            const countdownSection = document.getElementById('countdown');
            window.scrollTo({
                top: countdownSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate sections and scroll transitions when they come into view
    const sections = document.querySelectorAll('section');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const scrollTransitionElements = document.querySelectorAll('.scroll-transition');
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    // Check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add visible class to elements in viewport
    function checkVisibility() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible');
            }
        });
        
        timelineItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('visible');
            }
        });
        
        // Trigger scroll transitions when scrolled into view
        scrollTransitionElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Parallax effect on scroll
    let lastScrollY = window.scrollY;
    
    function handleParallax() {
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - lastScrollY;
        
        parallaxElements.forEach(element => {
            const speedFactor = element.classList.contains('parallax-slow') ? 0.05 : 
                               element.classList.contains('parallax-fast') ? 0.15 : 0.1;
            
            // Get current transform values
            const transform = window.getComputedStyle(element).getPropertyValue('transform');
            const matrix = new DOMMatrix(transform);
            const currentY = matrix.m42; // Y transform value
            
            // Apply parallax movement based on scroll direction and speed
            const movementY = scrollDelta * speedFactor;
            element.style.transform = `translateY(${currentY - movementY}px)`;
        });
        
        lastScrollY = scrollY;
    }
    
    // Check for parallax on scroll
    window.addEventListener('scroll', handleParallax);
    
    // Position floating elements randomly
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(element => {
        // Random starting positions
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        // Random animation duration and delay
        const duration = 15 + Math.random() * 20;
        const delay = Math.random() * 15;
        
        element.style.left = `${startX}px`;
        element.style.top = `${startY}px`;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
    });
    
    // Birthday candle blowing
    const blowButton = document.getElementById('blow-candle');
    if (blowButton) {
        blowButton.addEventListener('click', function() {
            const cakeContainer = document.querySelector('.cake-container');
            cakeContainer.classList.add('blown');
            
            // Show surprise message
            setTimeout(() => {
                const finalWish = document.querySelector('.final-wish');
                finalWish.textContent = 'Wish Granted! Happy Birthday! Mrunali(Bitu)';
                finalWish.classList.add('shimmer');
                
                // Add additional celebration effects
                createConfetti();
            }, 1000);
        });
    }
    
    // Create confetti effect
    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * window.innerWidth;
            const posY = -100 - Math.random() * 100;
            const rotation = Math.random() * 360;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 0.5;
            
            // Random colors
            const colors = ['#ff85a2', '#ff5c8d', '#f9c6d4', '#ffc0cb', '#ffb6c1'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.position = 'fixed';
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${posX}px`;
            confetti.style.top = `${posY}px`;
            confetti.style.transform = `rotate(${rotation}deg)`;
            confetti.style.opacity = '0.8';
            confetti.style.zIndex = '1000';
            confetti.style.animation = `fall ${duration}s linear ${delay}s forwards`;
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }
    }
    
    // Add falling animation for confetti
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    @keyframes fall {
        0% {
            top: -100px;
            transform: rotate(${Math.random() * 360}deg) translateX(0);
        }
        25% {
            transform: rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 - 50}px);
        }
        50% {
            transform: rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 - 50}px);
        }
        75% {
            transform: rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 - 50}px);
        }
        100% {
            top: 100vh;
            transform: rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 - 50}px);
        }
    }`;
    document.head.appendChild(styleSheet);
    
    // Virtual Gifts Interaction
    const giftBoxes = document.querySelectorAll('.gift-box');
    if (giftBoxes.length > 0) {
        giftBoxes.forEach(giftBox => {
            giftBox.addEventListener('click', function() {
                // Toggle the opened class to animate the gift box
                this.classList.toggle('opened');
                
                // If we're opening the gift, add a small confetti burst
                if (this.classList.contains('opened')) {
                    // Play a gift opening sound effect
                    const audio = new Audio();
                    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2019/07/19/sfx-2019-07-19-69947-569.mp3';
                    audio.volume = 0.3;
                    audio.play().catch(e => console.log('Audio play failed:', e));
                    
                    // Create a small confetti effect just above this gift
                    createGiftConfetti(this);
                }
            });
        });
    }
    
    // Special gift interaction
    const specialGiftTrigger = document.getElementById('special-gift-trigger');
    const specialGiftReveal = document.getElementById('special-gift-reveal');
    
    if (specialGiftTrigger && specialGiftReveal) {
        specialGiftTrigger.addEventListener('click', function() {
            // Show the special gift with a fade-in animation
            specialGiftReveal.classList.remove('hidden');
            
            // Add the visible class to trigger the transition
            setTimeout(() => {
                specialGiftReveal.classList.add('visible');
            }, 10);
            
            // Special heart confetti effect
            setTimeout(() => {
                createHeartConfetti();
            }, 300);
            
            // Hide the trigger button
            this.style.display = 'none';
        });
    }
    
    // Create confetti effect for gift boxes
    function createGiftConfetti(giftElement) {
        const rect = giftElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const topY = rect.top;
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            
            // Random properties
            const size = Math.random() * 8 + 3;
            const rotation = Math.random() * 360;
            const duration = Math.random() * 1 + 1;
            const distance = Math.random() * 100 + 50;
            const angle = Math.random() * Math.PI * 2;
            const finalX = distance * Math.cos(angle);
            const finalY = distance * Math.sin(angle) - 100;
            
            // Random colors
            const colors = ['#ff85a2', '#ff5c8d', '#f9c6d4', '#ffc0cb', '#ffb6c1', '#ffda89', '#ffcb45'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.position = 'fixed';
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.left = `${centerX}px`;
            confetti.style.top = `${topY}px`;
            confetti.style.transform = `rotate(${rotation}deg)`;
            confetti.style.opacity = '0.8';
            confetti.style.zIndex = '1000';
            confetti.style.transition = `all ${duration}s ease-out`;
            
            document.body.appendChild(confetti);
            
            // Force a reflow to ensure the transition works
            confetti.offsetHeight;
            
            // Set final position
            confetti.style.transform = `translate(${finalX}px, ${finalY}px) rotate(${rotation + 360}deg)`;
            confetti.style.opacity = '0';
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
    }
    
    // Create heart confetti for special gift
    function createHeartConfetti() {
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
    }
});
