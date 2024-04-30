import keyWords from "./KeyWords.js";
const category = window.localStorage.getItem('category');
document.querySelector('.name-category h1').innerText = category;
let keyWord = '';
let formattedKeyWord = '';
let lifeBarWidth = 100;
function playAgain() {
    window.location.href = 'game.html';
}
function backToCategories() {
    window.location.href = 'categories.html';
}
function quitGame() {
    window.location.href = 'index.html';
}
function generateKeyWord() {
    switch (category) {
        case 'Esportes':
            keyWord = keyWords.esportes[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase();
            break;
        case 'Filmes':
            keyWord = keyWords.filmes[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase();
            keyWords.filmes;
            break;
        case 'Programas':
            keyWord = keyWords.programas[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase();
            keyWords.programas;
            break;
        case 'Anime':
            keyWord = keyWords.anime[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase();
            keyWords.anime;
            break;
        case 'Países':
            keyWord = keyWords.paises[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase();
            keyWords.paises;
            break;
        case 'Capitais':
            keyWord = keyWords.capitais[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase();
            keyWords.capitais;
            break;
        case 'Animais':
            keyWord = keyWords.animais[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase();
            keyWords.animais;
            break;
        case 'Comidas':
            keyWord = keyWords.comidas[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase();
            keyWords.comidas;
            break;
        case 'Marcas':
            keyWord = keyWords.marcas[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase();
            keyWords.marcas;
            break;
        default:
            break;
    }
    formattedKeyWord = keyWord.replace(/[ÁÀÃÂ]/g, 'A')
        .replace(/[ÉÈÊ]/g, 'E')
        .replace(/[ÍÌ]/g, 'I')
        .replace(/[ÓÒÕÔ]/g, 'O')
        .replace(/[ÚÙÛ]/g, 'U')
        .replace(/[Ç]/g, 'C');
}
function createKeyWord() {
    generateKeyWord();
    const arrayKeyWord = keyWord.split(' ');
    arrayKeyWord.forEach((element, i) => {
        document.querySelector('.key-words').innerHTML += `
        <div class= "word word-${i + 1}">
        </div>
        `;
        const word = document.querySelector(`.word-${i + 1}`);
        for (let i = 0; i < element.length; i++) {
            word.innerHTML += `
                <div class= "letter letter-${i + 1} empty">
                </div>
            `;
        }
    });
}
function checkLetter(event) {
    let letter;
    if (typeof event === 'string') {
        letter = event;
    }
    else {
        letter = event.target.dataset.letter;
    }
    const arrayKeyWord = keyWord.split(' ');
    const formattedArrayKeyWord = formattedKeyWord.split(' ');
    checkedLetterStyle(letter);
    arrayKeyWord.forEach((element, i) => {
        arrayKeyWord[i] = element.split('');
    });
    formattedArrayKeyWord.forEach((element, i) => {
        formattedArrayKeyWord[i] = element.split('');
    });
    let letterExist = false;
    for (let i = 0; i < formattedKeyWord.length; i++) {
        if (letter === formattedKeyWord[i]) {
            letterExist = true;
        }
    }
    try {
        if (letterExist === true) {
            formattedArrayKeyWord.forEach((workElement, i) => {
                workElement.forEach((letterElement, j) => {
                    if (letter === letterElement) {
                        setLetter(i, j, arrayKeyWord[i][j]);
                    }
                });
            });
        }
        else {
            throw new Error('incorrect letter');
        }
    }
    catch (err) {
        playerDamage();
    }
}
function checkLetterByKeyboard(ev) {
    const pressedLetter = ev.key;
    const regex = /[a-zA-Z]/;
    if (pressedLetter.length === 1) {
        if (regex.test(pressedLetter)) {
            checkLetter(pressedLetter.toUpperCase());
        }
    }
}
function setLetter(workElement, letterElement, letter) {
    const wordContent = document.querySelector(`.word-${workElement + 1}`);
    const letterContent = wordContent.querySelector(`.letter-${letterElement + 1}`);
    letterContent.textContent = letter;
    youWin();
}
function checkedLetterStyle(letter) {
    const alphabet = document.querySelector('.alphabet').querySelectorAll('.letter');
    alphabet.forEach((element) => {
        if (element.textContent === letter) {
            element.className = `letter letter-${letter} letter-checked`;
        }
    });
}
function playerDamage() {
    if (lifeBarWidth == 0) {
    }
    const lifePlayer = document.querySelector('.remaining-life');
    lifePlayer.style.width = `${lifeBarWidth - 20}%`;
    lifeBarWidth -= 20;
    gameOver();
}
function gameOver() {
    if (lifeBarWidth == 0) {
        document.querySelector('.main-game').style.display = 'none';
        document.querySelector('.game-over').removeAttribute('style');
        setTimeout(() => {
            const gameOverElement = document.querySelector('.game-over');
            gameOverElement.classList.add('appear');
            gameOverElement.querySelector('.back-to-categories').addEventListener('click', backToCategories);
            gameOverElement.querySelector('.play-again').addEventListener('click', playAgain);
            gameOverElement.querySelector('.quit-game').addEventListener('click', quitGame);
        }, 500);
    }
}
function youWin() {
    let filledFields = true;
    document.querySelector('.key-words').querySelectorAll('.word').forEach(word => {
        word.querySelectorAll('.letter').forEach(letter => {
            if (letter.innerText === '') {
                filledFields = false;
            }
        });
    });
    if (filledFields == true) {
        document.querySelector('.main-game').style.display = 'none';
        document.querySelector('.you-win').removeAttribute('style');
        setTimeout(() => {
            const youWinElement = document.querySelector('.you-win');
            youWinElement.classList.add('appear');
            youWinElement.querySelector('.back-to-categories').addEventListener('click', backToCategories);
            youWinElement.querySelector('.play-again').addEventListener('click', playAgain);
            youWinElement.querySelector('.quit-game').addEventListener('click', quitGame);
        }, 1000);
    }
}
createKeyWord();
document.addEventListener('keyup', checkLetterByKeyboard);
document.querySelector('.button-back').addEventListener('click', backToCategories);
document.querySelector('.alphabet').querySelectorAll('.letter').forEach(element => {
    element.addEventListener('click', checkLetter);
});
document.querySelector('.main-game').classList.add('appear');
