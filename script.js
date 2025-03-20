// Variables globales
let currentCardIndex = 0;
const cards = document.querySelectorAll('.card');
const totalCards = cards.length;

// Mostrar la primera tarjeta al cargar la página
window.onload = function() {
    cards[0].classList.add('visible');
    cards[0].classList.remove('hidden');
};

// Funciones para navegar entre tarjetas
function nextCard() {
    if (currentCardIndex < totalCards - 1) {
        hideCard(currentCardIndex);
        currentCardIndex++;
        showCard(currentCardIndex);

        setTimeout(() => {
            cards[currentCardIndex].style.animation = 'none';
            cards[currentCardIndex].offsetHeight;
            cards[currentCardIndex].style.animation = null;
        }, 10);
    }
}

function prevCard() {
    if (currentCardIndex > 0) {
        hideCard(currentCardIndex);
        currentCardIndex--;
        showCard(currentCardIndex);
    }
}

function hideCard(index) {
    cards[index].classList.remove('visible');
    cards[index].classList.add('hidden');
}

function showCard(index) {
    cards[index].classList.remove('hidden');
    cards[index].classList.add('visible');
}