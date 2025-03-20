// Datos de las preguntas (agrega más hasta llegar a 20)
const quizData = [
    {
        question: "¿Qué día nos hicimos novios?",
        options: ["22 de abril", "25 de julio", "15 de agosto"],
        answer: "25 de julio"
    },
    {
        question: "¿Qué día nos vimos por primera vez?",
        options: ["Jueves", "Martes", "Lunes"],
        answer: "Jueves"
    },
    {
        question: "¿Qué dia cumplo años?",
        options: ["5 de junio", "12 de agosto", "17 de noviembre"],
        answer: "17 de noviembre"
    },
    {
        question: "¿Qué día celebramos nuestro primer San Valentín?",
        options: ["14 de febrero 2025", "14 de febrero 2023", "14 de febrero 2024"],
        answer: "14 de febrero 2025"
    },
    {
        question: "¿Cuantas cartas me diste amor en la primera vez?",
        options: ["4", "15", "2"],
        answer: "2"
    },
    {
        question: "¿Qué le gusta a boris de comer siempre?",
        options: ["Pollo asado", "salchipollo", "pezcado frito"],
        answer: "salchipollo"
    },
    {
        question: "¿Cual es el segundo nombre mio?",
        options: ["dison", "dixon", "boris"],
        answer: "dixon"
    },
    {
        question: "¿Cuanto mide ya sabes que?",
        options: ["17", "14", "19"],
        answer: "17"
    },
    {
        question: "¿Cual fue el primer regalo que te di?",
        options: ["Un llavero de delfin", "una tortuga", "una mosca"],
        answer: "Un llavero de delfin"
    },
    {
        question: "¿Cual es el color favorito de boris?",
        options: ["azul", "celeste", "negro"],
        answer: "azul"
    },
    {
        question: "¿que equipo le va boris en ecuador?",
        options: ["emelec", "liga", "aucas"],
        answer: "emelec"
    },
    {
        question: "¿Que le gusta mas a boris de ti?",
        options: ["labios", "ojos", "personalidad"],
        answer: "ojos"
    },
    {
        question: "¿Cuanto años tenia boris cuando se conocieron?",
        options: ["17", "14", "19"],
        answer: "19"
    },
    {
        question: "¿Que no le gusta a boris en comer?",
        options: ["cebolla", "zanahoria", "brocoli"],
        answer: "brocoli"
    },
    {
        question: "¿Plato favorito de borisito?",
        options: ["patacones con pezcado frito", "arroz con menetra y pezcado frito", "arroz con pollo"],
        answer: "patacones con pezcado frito"
    },
    {
        question: "¿Borisito a que le teme?",
        options: ["los pitbulls", "vacas locas", "que se vaya mishita"],
        answer: "que se vaya mishita"
    },
    {
        question: "¿Borisito que apodo le gusta mas que le digan?",
        options: ["guapo", "papi", "mi niño"],
        answer: "papi"
    },
    {
        question: "¿Cuando meses cumplimos?",
        options: ["8", "7", "2"],
        answer: "8"
    },
    {
        question: "¿Borisito es lindo??",
        options: ["no mames q asco", "tiiii", "ñoo"],
        answer: "tiii"
    },
    {
        question: "¿Cuantos carritos tiene borisito que le ha dado mishita(tu)?",
        options: ["2", "8", "6"],
        answer: "6"
    },
    
    // Agrega más preguntas aquí (hasta 20) siguiendo el mismo formato
    /*
    {
        question: "¿Qué día [tu pregunta sobre una fecha]?",
        options: ["Fecha 1", "Fecha 2", "Fecha 3"],
        answer: "Fecha 2"
    }
    */
];

// Variables globales
let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = 20; // Cambia esto cuando agregues más preguntas

// Generar el test dinámicamente
function loadQuestion() {
    const testContent = document.getElementById('test-content');
    testContent.innerHTML = '';

    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Crear elementos de la pregunta
        const questionElement = document.createElement('h3');
        questionElement.textContent = `Pregunta ${currentQuestionIndex + 1}`;
        testContent.appendChild(questionElement);

        const questionText = document.createElement('p');
        questionText.className = 'question';
        questionText.textContent = currentQuestion.question;
        testContent.appendChild(questionText);

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options';

        currentQuestion.options.forEach(option => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `q${currentQuestionIndex}`;
            input.value = option;
            input.addEventListener('change', enableNextButton);

            const span = document.createElement('span');
            span.textContent = option;

            label.appendChild(input);
            label.appendChild(span);
            optionsContainer.appendChild(label);
        });

        testContent.appendChild(optionsContainer);

        const navigation = document.createElement('div');
        navigation.className = 'navigation';

        const prevButton = document.createElement('button');
        prevButton.className = 'btn-prev';
        prevButton.textContent = 'Anterior';
        prevButton.onclick = prevQuestion;
        if (currentQuestionIndex === 0) prevButton.disabled = true;
        navigation.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.className = 'btn-next';
        nextButton.id = 'next-button';
        nextButton.textContent = currentQuestionIndex === quizData.length - 1 ? 'Finalizar' : 'Siguiente';
        nextButton.onclick = nextQuestion;
        nextButton.disabled = true;
        nextButton.style.opacity = '0.5';
        nextButton.style.cursor = 'not-allowed';
        navigation.appendChild(nextButton);

        testContent.appendChild(navigation);
    } else {
        showResults();
    }
}

function enableNextButton() {
    const nextButton = document.getElementById('next-button');
    nextButton.disabled = false;
    nextButton.style.opacity = '1';
    nextButton.style.cursor = 'pointer';

    // Resaltar la opción seleccionada
    document.querySelectorAll('.options label').forEach(label => {
        label.style.backgroundColor = '#fff4f7';
        label.style.borderColor = 'transparent';
    });
    this.parentElement.style.backgroundColor = '#ffe6ec';
    this.parentElement.style.borderColor = '#ff6b95';
}

function nextQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    const selectedAnswer = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);

    if (selectedAnswer) {
        if (selectedAnswer.value === currentQuestion.answer) {
            score++;
            Swal.fire({
                title: '¡Correcto!',
                text: '¡Sabes mucho de nosotros, mi amor!',
                icon: 'success',
                confirmButtonColor: '#ff6b95'
            });
        } else {
            Swal.fire({
                title: '¡Ups!',
                text: 'No es correcto, pero te amo igual.',
                icon: 'error',
                confirmButtonColor: '#ff6b95'
            });
        }
        currentQuestionIndex++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function showResults() {
    const testContent = document.getElementById('test-content');
    testContent.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = '¡Te Amo! ❤️';
    testContent.appendChild(title);

    const heart = document.createElement('div');
    heart.className = 'final-heart';
    heart.innerHTML = '<div class="heart"></div>';
    testContent.appendChild(heart);

    const message = document.createElement('p');
    message.className = 'message';
    message.id = 'final-message';
    testContent.appendChild(message);

    const navigation = document.createElement('div');
    navigation.className = 'navigation';

    const restartButton = document.createElement('a');
    restartButton.className = 'btn-restart';
    restartButton.href = 'index.html';
    restartButton.textContent = 'Volver al inicio';
    navigation.appendChild(restartButton);

    testContent.appendChild(navigation);

    let customMessage = '';
    let titleText = '';
    let icon = '';

    // Mensaje explícito sobre las respuestas correctas
    const correctMessage = `Contestaste correctamente ${score} de ${quizData.length} preguntas.\n\n`;

    if (score === totalQuestions) {
        titleText = '¡Increíble, mi amor!';
        customMessage = `${correctMessage}Adivinaste todas las respuestas (${score}/${totalQuestions}). ¡Te ganaste un gran premio! Te amo con todo mi corazón.`;
        icon = 'success';
    } else if (score >= 16 && score <= 19) {
        titleText = '¡Muy bien!';
        customMessage = `${correctMessage}Adivinaste ${score} de ${totalQuestions}. ¡Te ganaste un premio! Eres el amor de mi vida.`;
        icon = 'success';
    } else if (score >= 11 && score <= 15) {
        titleText = 'Mmm, bueno';
        customMessage = `${correctMessage}Adivinaste ${score} de ${totalQuestions}. No está mal, mi amor, pero podemos mejorar. Te amo igual.`;
        icon = 'info';
    } else if (score >= 8 && score <= 10) {
        titleText = 'Nada, sabes?';
        customMessage = `${correctMessage}Adivinaste ${score} de ${totalQuestions}. Creo que necesitas recordar más de mí. Te amo de todas formas.`;
        icon = 'warning';
    } else {
        titleText = '¡A repasar!';
        customMessage = `${correctMessage}Adivinaste ${score} de ${totalQuestions}. Mi amor, necesitas repasar un poco más sobre nosotros. Te amo con todo mi corazón.`;
        icon = 'error';
    }

    Swal.fire({
        title: titleText,
        text: customMessage,
        icon: icon,
        confirmButtonColor: '#ff6b95'
    });

    message.textContent = customMessage;
}

// Cargar la primera pregunta al iniciar
document.addEventListener('DOMContentLoaded', loadQuestion);