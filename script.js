document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const targetDateInput = document.getElementById('target-date');
    const targetTimeInput = document.getElementById('target-time');
    const daysDisplay = document.getElementById('days');
    const hoursDisplay = document.getElementById('hours');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const messageDisplay = document.getElementById('message');
    
    let countdownInterval;
    let targetTime;
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    targetDateInput.setAttribute('min', today);
    
    startBtn.addEventListener('click', startCountdown);
    resetBtn.addEventListener('click', resetCountdown);
    
    function startCountdown() {
        // Validate inputs
        if (!targetDateInput.value || !targetTimeInput.value) {
            alert('Please select both date and time');
            return;
        }
        
        // Get target date and time
        const targetDate = new Date(`${targetDateInput.value}T${targetTimeInput.value}`);
        targetTime = targetDate.getTime();
        
        // Check if target time is in the future
        if (targetTime <= Date.now()) {
            alert('Please select a future date and time');
            return;
        }
        
        // Clear any existing interval
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        
        // Hide message if shown
        messageDisplay.classList.add('hidden');
        
        // Start the countdown
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetTime - now;
        
        // If countdown is finished
        if (distance <= 0) {
            clearInterval(countdownInterval);
            showCompletion();
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        daysDisplay.textContent = formatTime(days);
        hoursDisplay.textContent = formatTime(hours);
        minutesDisplay.textContent = formatTime(minutes);
        secondsDisplay.textContent = formatTime(seconds);
    }
    
    function showCompletion() {
        daysDisplay.textContent = '00';
        hoursDisplay.textContent = '00';
        minutesDisplay.textContent = '00';
        secondsDisplay.textContent = '00';
        
        messageDisplay.classList.remove('hidden');
        
        // Optional: Play sound when countdown completes
        // const audio = new Audio('sounds/alarm.mp3');
        // audio.play();
    }
    
    function resetCountdown() {
        clearInterval(countdownInterval);
        daysDisplay.textContent = '00';
        hoursDisplay.textContent = '00';
        minutesDisplay.textContent = '00';
        secondsDisplay.textContent = '00';
        messageDisplay.classList.add('hidden');
        targetDateInput.value = '';
        targetTimeInput.value = '';
    }
    
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
});