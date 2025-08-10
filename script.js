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

document.getElementById('download-pdf').addEventListener('click', function() {
    // Ruta al archivo PDF (asegúrate que es correcta)
    const pdfUrl = 'felicitacion.pdf';

    // Solución universal para todos los navegadores
    const xhr = new XMLHttpRequest();
    xhr.open('GET', pdfUrl, true);
    xhr.responseType = 'blob';

    xhr.onload = function() {
        if (this.status === 200) {
            const blob = new Blob([this.response], {type: 'application/pdf'});
            const downloadUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'FelizCumpleanos.pdf'; // Nombre del archivo a descargar
            document.body.appendChild(a);
            a.click();

            // Limpieza
            setTimeout(function() {
                document.body.removeChild(a);
                URL.revokeObjectURL(downloadUrl);
            }, 100);
        } else {
            // Manejo de errores
            console.error('No se pudo cargar el archivo PDF');
            alert('No se pudo cargar el archivo. Por favor intenta más tarde.');
        }
    };

    xhr.onerror = function() {
        console.error('Error de red al intentar descargar el PDF');
        alert('Ocurrió un error de conexión.');
    };

    xhr.send();
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

// Configuración del quiz (personaliza esto)
const quizConfig = {
    name: "Perlita", // Cambia por el nombre
    questions: [
        {
            question: "¿Cuál es tu color favorito para usar en ropa?",
            options: ["Negro", "Azul", "Verde", "Rojo"],
            answer: 0 // Índice de la opción correcta (0-based)
        },
        {
            question: "¿En qué día naciste?",
            options: ["3 de Octubre del 1990", "14 de Abril del 1995", "30 de Diciembre del 2000", "10 de Agosto del 2005"],
            answer: 3
        },
        {
            question: "¿Qué prefieres comer?",
            options: ["Pizza", "Esquites", "Higado encebollado", "Coca-cola"],
            answer: 1
        },
        {
            question: "¿Qué hobby disfrutas más?",
            options: ["Dormir", "Estudiar inglés", "Ir a correr", "Ver tele"],
            answer: 2
        },
        {
            question: "¿Cómo se llama tu gatito?",
            options: ["Pánfilo", "Bruno", "Pepe", "Solovino"],
            answer: 1
        }
    ],
    results: [
        { score: 0, text: "¡Ups! Parece que no te conoces tanto 😅" },
        { score: 2, text: "¡No está mal! Sabes algunas cosas importantes 😊" },
        { score: 4, text: "¡Impresionante! Eres una verdadera conocedora jaja 🎉" },
        { score: 5, text: "¡PERFECTO! 💖 Te mereces un abrazo" }
    ]
};

// Variables del juego
let currentQuestion = 0;
let score = 0;
let quizStarted = false;

// Elementos del DOM
const quizSection = document.getElementById('quiz-section');
const startQuizBtn = document.getElementById('start-quiz');
const quizNameSpan = document.getElementById('quiz-name');
const quizQuestion = document.getElementById('quiz-question');
const quizOptions = document.getElementById('quiz-options');
const quizNextBtn = document.getElementById('quiz-next');
const quizResult = document.getElementById('quiz-result');
const quizProgress = document.getElementById('quiz-progress');

// Iniciar quiz
startQuizBtn.addEventListener('click', function() {
    quizStarted = true;
    quizSection.style.display = 'block';
    startQuizBtn.style.display = 'none';
    quizNameSpan.textContent = quizConfig.name;
    loadQuestion();

    // Animación de globos al empezar (usa tu función existente)
    for (let i = 0; i < 10; i++) {
        createBalloon();
    }
});

// Cargar pregunta
function loadQuestion() {
    const question = quizConfig.questions[currentQuestion];

    // Barra de progreso
    quizProgress.innerHTML = `
        <div id="quiz-progress-bar" style="width: ${(currentQuestion / quizConfig.questions.length) * 100}%"></div>
        <p>Pregunta ${currentQuestion + 1} de ${quizConfig.questions.length}</p>
    `;

    quizQuestion.textContent = question.question;
    quizOptions.innerHTML = '';

    // Opciones
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        quizOptions.appendChild(optionElement);
    });

    quizNextBtn.style.display = 'none';
}

// Seleccionar opción
function selectOption(selectedIndex) {
    const question = quizConfig.questions[currentQuestion];
    const options = document.querySelectorAll('.option');

    // Deshabilitar todas las opciones
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    // Marcar respuesta correcta/incorrecta
    if (selectedIndex === question.answer) {
        options[selectedIndex].classList.add('correct');
        score++;

        // Animación de confeti para respuestas correctas (usa tu función existente)
        for (let i = 0; i < 20; i++) {
            createConfetti();
        }
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.answer].classList.add('correct');
    }

    quizNextBtn.style.display = 'inline-block';
}

// Siguiente pregunta o mostrar resultados
quizNextBtn.addEventListener('click', function() {
    currentQuestion++;

    if (currentQuestion < quizConfig.questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// Mostrar resultados
function showResult() {
    quizQuestion.style.display = 'none';
    quizOptions.style.display = 'none';
    quizNextBtn.style.display = 'none';
    quizProgress.style.display = 'none';

    // Determinar mensaje basado en puntaje
    let resultText = '';
    quizConfig.results.forEach(result => {
        if (score >= result.score) {
            resultText = result.text;
        }
    });

    quizResult.innerHTML = `
        <h3>¡Tu puntaje: ${score} de ${quizConfig.questions.length}!</h3>
        <p>${resultText}</p>
        <button onclick="restartQuiz()" class="quiz-btn">Jugar de nuevo</button>
    `;
    quizResult.style.display = 'block';

    // Animación final
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createConfetti(), i * 100);
    }
}

// Reiniciar quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    quizQuestion.style.display = 'block';
    quizOptions.style.display = 'grid';
    quizProgress.style.display = 'block';
    quizResult.style.display = 'none';

    loadQuestion();
}

// Hacer la función global para el botón de reinicio
window.restartQuiz = restartQuiz;


