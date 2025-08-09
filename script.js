document.getElementById('confetti-btn').addEventListener('click', function() {
    // Reproducir audio
    const audio = document.getElementById('birthdayAudio');
    audio.play();

    // Crear efecto de confeti (usando una librería simple)
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }

    // Crear globos de colores
    for (let i = 0; i < 20; i++) {
        createBalloon();
    }
});

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.innerHTML = '🎈';
    balloon.style.position = 'fixed';
    balloon.style.fontSize = `${Math.random() * 30 + 20}px`;
    balloon.style.left = Math.random() * window.innerWidth + 'px';
    balloon.style.bottom = '-50px';
    balloon.style.opacity = '0.8';
    balloon.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
    document.body.appendChild(balloon);

    const animationDuration = Math.random() * 5 + 5;

    // Animación usando requestAnimationFrame para mejor performance
    let startTime = null;
    const animateBalloon = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (animationDuration * 1000);

        if (progress < 1) {
            const newBottom = -50 + (window.innerHeight + 100) * progress;
            balloon.style.bottom = `${newBottom}px`;
            // Movimiento horizontal oscilante
            balloon.style.left = `${parseFloat(balloon.style.left) + Math.sin(progress * 10) * 2}px`;
            requestAnimationFrame(animateBalloon);
        } else {
            balloon.remove();
        }
    };

    requestAnimationFrame(animateBalloon);
}
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    document.body.appendChild(confetti);

    const animationDuration = Math.random() * 3 + 2;
    confetti.style.transition = `top ${animationDuration}s linear, transform ${animationDuration}s ease-out`;

    setTimeout(() => {
        confetti.style.top = window.innerHeight + 'px';
        confetti.style.transform = 'rotate(360deg)';
    }, 10);

    setTimeout(() => {
        confetti.remove();
    }, animationDuration * 1000);
}

function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff9ff3', '#feca57'];
    return colors[Math.floor(Math.random() * colors.length)];
}