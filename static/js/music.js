document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('music-toggle');
    const volumeIcon = document.getElementById('volume-icon');
    const backgroundMusic = document.getElementById('background-music');
    
    let isMusicPlaying = false;
    
    // Function to play background music
    function playMusic() {
        backgroundMusic.play()
            .then(() => {
                isMusicPlaying = true;
                updateMusicButton();
            })
            .catch(error => {
                console.log('Failed to play audio: ', error);
                // Browser might have blocked autoplay
                isMusicPlaying = false;
                updateMusicButton();
            });
    }
    
    // Function to pause background music
    function pauseMusic() {
        backgroundMusic.pause();
        isMusicPlaying = false;
        updateMusicButton();
    }
    
    // Update music button appearance
    function updateMusicButton() {
        if (isMusicPlaying) {
            volumeIcon.className = 'fas fa-volume-up';
            musicToggle.classList.remove('muted');
        } else {
            volumeIcon.className = 'fas fa-volume-mute';
            musicToggle.classList.add('muted');
        }
    }
    
    // Toggle music on button click
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (isMusicPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        });
    }
    
    // Initialize music button state
    updateMusicButton();
    
    // Play music when user interacts with the page for better user experience
    function playMusicOnInteraction() {
        if (!isMusicPlaying) {
            playMusic();
        }
        // Remove event listeners after first interaction
        document.removeEventListener('click', playMusicOnInteraction);
        document.removeEventListener('touchstart', playMusicOnInteraction);
    }
    
    // Add event listeners for user interaction
    document.addEventListener('click', playMusicOnInteraction);
    document.addEventListener('touchstart', playMusicOnInteraction, { passive: true });
    
    // Handle page visibility changes to pause/resume music
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden, pause music if it's playing
            if (isMusicPlaying) {
                backgroundMusic.pause();
                // Don't update the state as we want to resume when visible again
            }
        } else {
            // Page is visible again, resume music if it was playing
            if (isMusicPlaying) {
                backgroundMusic.play().catch(error => {
                    console.log('Failed to resume audio: ', error);
                });
            }
        }
    });
    
    // Add volume control functionality
    let currentVolume = 0.7; // Default volume level
    backgroundMusic.volume = currentVolume;
    
    // Create volume control
    const volumeControl = document.createElement('div');
    volumeControl.className = 'volume-control';
    volumeControl.innerHTML = `
        <input type="range" id="volume-slider" min="0" max="1" step="0.1" value="${currentVolume}">
    `;
    
    // Add volume control next to music toggle
    const audioControl = document.querySelector('.audio-control');
    if (audioControl) {
        audioControl.appendChild(volumeControl);
        
        // Style the volume control
        const volumeStyles = document.createElement('style');
        volumeStyles.textContent = `
            .volume-control {
                position: absolute;
                bottom: 60px;
                right: 0;
                width: 30px;
                height: 100px;
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 10px;
                padding: 10px 5px;
                display: none;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            }
            
            .audio-control:hover .volume-control {
                display: block;
            }
            
            #volume-slider {
                -webkit-appearance: none;
                width: 80px;
                height: 4px;
                background: var(--primary-color);
                outline: none;
                transform: rotate(-90deg);
                transform-origin: 50% 50%;
                position: absolute;
                top: 50%;
                left: -25px;
            }
            
            #volume-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: var(--secondary-color);
                cursor: pointer;
            }
            
            #volume-slider::-moz-range-thumb {
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: var(--secondary-color);
                cursor: pointer;
            }
        `;
        document.head.appendChild(volumeStyles);
        
        // Volume slider functionality
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', function() {
                currentVolume = this.value;
                backgroundMusic.volume = currentVolume;
                
                // Update icon based on volume level
                if (currentVolume === 0) {
                    volumeIcon.className = 'fas fa-volume-mute';
                } else if (currentVolume < 0.5) {
                    volumeIcon.className = 'fas fa-volume-down';
                } else {
                    volumeIcon.className = 'fas fa-volume-up';
                }
            });
        }
    }
});
