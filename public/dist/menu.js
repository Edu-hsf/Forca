"use strict";
function redirectToCategories() {
    window.location.href = 'categories.html';
}
function openGuide() {
    document.querySelector('.menu-buttons').setAttribute('style', 'display: none;');
    document.querySelector('.guide').removeAttribute('style');
}
function closeGuide() {
    document.querySelector('.menu-buttons').removeAttribute('style');
    document.querySelector('.guide').setAttribute('style', 'display: none;');
}
document.querySelector('.container-main').classList.add('appear');
document.querySelector('.guide-button').addEventListener('click', openGuide);
document.querySelector('.close-guide').addEventListener('click', closeGuide);
