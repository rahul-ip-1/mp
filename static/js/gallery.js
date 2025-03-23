document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const dots = document.querySelectorAll('.gallery-dots .dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentIndex = 0;
    let intervalId;
    
    // Initialize gallery
    function initGallery() {
        showSlide(currentIndex);
        startAutoSlide();
        
        // Add event listeners
        prevBtn.addEventListener('click', showPrevSlide);
        nextBtn.addEventListener('click', showNextSlide);
        
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showSlide(index);
                resetAutoSlide();
            });
        });
        
        // Pause auto-slide on mouse hover
        const galleryWrapper = document.querySelector('.gallery-wrapper');
        galleryWrapper.addEventListener('mouseenter', pauseAutoSlide);
        galleryWrapper.addEventListener('mouseleave', startAutoSlide);
        
        // Handle touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        galleryWrapper.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            pauseAutoSlide();
        }, { passive: true });
        
        galleryWrapper.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, { passive: true });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left, show next slide
                showNextSlide();
            } else if (touchEndX > touchStartX + 50) {
                // Swipe right, show previous slide
                showPrevSlide();
            }
        }
    }
    
    // Show slide by index
    function showSlide(index) {
        // Hide all slides
        galleryItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Deactivate all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Validate index
        if (index < 0) {
            currentIndex = galleryItems.length - 1;
        } else if (index >= galleryItems.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        // Show current slide and activate dot
        galleryItems[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // Navigate to previous slide
    function showPrevSlide() {
        showSlide(currentIndex - 1);
        resetAutoSlide();
    }
    
    // Navigate to next slide
    function showNextSlide() {
        showSlide(currentIndex + 1);
        resetAutoSlide();
    }
    
    // Start auto-sliding
    function startAutoSlide() {
        if (!intervalId) {
            intervalId = setInterval(() => {
                showNextSlide();
            }, 50000); // Change slide every 5 seconds
        }
    }
    
    // Pause auto-sliding
    function pauseAutoSlide() {
        clearInterval(intervalId);
        intervalId = null;
    }
    
    // Reset auto-slide timer
    function resetAutoSlide() {
        pauseAutoSlide();
        startAutoSlide();
    }
    
    // Initialize the gallery if it exists on the page
    if (galleryItems.length > 0 && dots.length > 0) {
        initGallery();
    }
    
    // Add fade-in animation for gallery items when they load
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            img.style.opacity = '1';
            img.onload = function() {
                setTimeout(() => {
                    img.style.transition = 'opacity 0.5s ease';
                    img.style.opacity = '1';
                }, 300);
            };
        }
    });
});
