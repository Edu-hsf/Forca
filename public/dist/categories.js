"use strict";
function backToMenu() {
    window.location.href = 'index.html';
}
function redirectToGame(category) {
    window.localStorage.setItem('category', category);
    window.location.href = 'game.html';
}
document.querySelector('header').classList.add('appear');
document.querySelector('.categories').classList.add('appear');
