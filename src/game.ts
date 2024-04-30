import keyWords from "./KeyWords.js";

const category = window.localStorage.getItem('category')!

document.querySelector<HTMLElement>('.name-category h1')!.innerText = category;
let keyWord: string = ''
let formattedKeyWord: string = ''
let lifeBarWidth:number = 100

function playAgain () {
    window.location.href = 'game.html'
}

function backToCategories () {
    window.location.href = 'categories.html'
}

function quitGame () {
    window.location.href = 'menu.html'
}

function generateKeyWord() {
    switch (category) {
        case 'Esportes':
            keyWord = keyWords.esportes[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase()
            break;
        
        case 'Filmes':
            keyWord = keyWords.filmes[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase()
            keyWords.filmes
            break;
        
        case 'Programas':
            keyWord = keyWords.programas[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase()
            keyWords.programas
            break;
        
        case 'Anime':
            keyWord = keyWords.anime[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase()
            keyWords.anime
            break;
        
        case 'Países':
            keyWord = keyWords.paises[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase()
            keyWords.paises
            break;
        
        case 'Capitais':
            keyWord = keyWords.capitais[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase()
            keyWords.capitais
            break;
        
        case 'Animais':
            keyWord = keyWords.animais[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase()
            keyWords.animais
            break;
        
        case 'Comidas':
            keyWord = keyWords.comidas[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase()
            keyWords.comidas
            break;
        
        case 'Marcas':
            keyWord = keyWords.marcas[Math.floor(Math.random() * keyWords.esportes.length)].toUpperCase()
            keyWords.marcas
            break;
        
        default:
            break;
    }
    formattedKeyWord = keyWord.replace(/[ÁÀÃÂ]/g, 'A')
    .replace(/[ÉÈÊ]/g, 'E')
    .replace(/[ÍÌ]/g, 'I')
    .replace(/[ÓÒÕÔ]/g, 'O')
    .replace(/[ÚÙÛ]/g, 'U')
    .replace(/[Ç]/g, 'C')
}

function createKeyWord () {
    generateKeyWord()
    const arrayKeyWord: string[] = keyWord.split(' ')
    
    arrayKeyWord.forEach((element, i) => {
        document.querySelector<HTMLElement>('.key-words')!.innerHTML += `
        <div class= "word word-${i+1}">
        </div>
        `

        const word = document.querySelector(`.word-${i+1}`)!

        for (let i = 0; i < element.length; i++) {
            word.innerHTML += `
                <div class= "letter letter-${i+1} empty">
                </div>
            `
        }
    });
}

function checkLetter (event: MouseEvent | string) {
    let letter: any
    if (typeof event === 'string') {
        letter = event
    } else {
        letter = (event.target as HTMLElement).dataset.letter!
    }

    const arrayKeyWord: any = keyWord.split(' ')
    const formattedArrayKeyWord: any = formattedKeyWord.split(' ')
    checkedLetterStyle(letter)

    arrayKeyWord.forEach((element: string, i: number) => {
        arrayKeyWord[i] = element.split('')
    });

    formattedArrayKeyWord.forEach((element: string, i: number) => {
        formattedArrayKeyWord[i] = element.split('')
    });

    let letterExist: boolean = false
    
    for (let i = 0; i < formattedKeyWord.length; i++) {
        if (letter === formattedKeyWord[i]) {
            letterExist = true
        } 
    }

    try {
        if (letterExist === true) {
            formattedArrayKeyWord.forEach((workElement: string[], i: number) => {
                workElement.forEach((letterElement, j) => {
                    if (letter === letterElement) {
                        setLetter(i, j, arrayKeyWord[i][j])
                    }
                });
            });
    
        } else {
            throw new Error('incorrect letter')
        }
    } catch (err) {
        playerDamage() 
    }
}

function checkLetterByKeyboard (ev: KeyboardEvent) {
    const pressedLetter = ev.key
    const regex = /[a-zA-Z]/

    if (pressedLetter.length === 1) {
        if (regex.test(pressedLetter)) {
            checkLetter(pressedLetter.toUpperCase())
        }
    }
}

function setLetter (workElement: number, letterElement: number, letter: string) {

    const wordContent = document.querySelector(`.word-${workElement+1}`)!
    const letterContent = wordContent.querySelector(`.letter-${letterElement+1}`)!
    letterContent.textContent = letter
    youWin()
}

function checkedLetterStyle (letter: string) {
    const alphabet = document.querySelector('.alphabet')!.querySelectorAll('.letter')!

    alphabet.forEach((element) => {
        if (element.textContent === letter) {
            element.className = `letter letter-${letter} letter-checked`
        }
    })
}

function playerDamage () {
    if (lifeBarWidth == 0) {
        
    }
    const lifePlayer = document.querySelector<HTMLElement>('.remaining-life')!
    lifePlayer.style.width = `${lifeBarWidth - 20}%`
    lifeBarWidth -= 20
    gameOver()
}

function gameOver () {
    if (lifeBarWidth == 0) {
        document.querySelector<HTMLElement>('.main-game')!.style.display = 'none'
        document.querySelector<HTMLElement>('.game-over')!.removeAttribute('style')
        
        setTimeout(() => {
            document.querySelector<HTMLElement>('.game-over')!.classList.add('appear');
        }, 500);
    } 
}

function youWin () {
    let filledFields: boolean = true
    document.querySelector<HTMLElement>('.key-words')!.querySelectorAll<HTMLElement>('.word').forEach(word => {
        word.querySelectorAll<HTMLElement>('.letter')!.forEach(letter => {
            if (letter.innerText === '') {
                filledFields = false
            }
        });
    });

    if (filledFields == true) {
        document.querySelector<HTMLElement>('.main-game')!.style.display = 'none'
        document.querySelector<HTMLElement>('.you-win')!.removeAttribute('style')
        setTimeout(() => {
            document.querySelector<HTMLElement>('.you-win')!.classList.add('appear');
        }, 1000);
        
    }
}

document.addEventListener('keyup', checkLetterByKeyboard)
document.querySelector('.button-back')!.addEventListener('click', backToCategories)
document.querySelector('.back-to-categories')!.addEventListener('click', backToCategories)
document.querySelector('.play-again')!.addEventListener('click', playAgain)
document.querySelector('.quit-game')!.addEventListener('click', quitGame)
createKeyWord()
document.querySelector<HTMLElement>('.alphabet')!.querySelectorAll<HTMLElement>('.letter').forEach(element => {
    element.addEventListener('click', checkLetter)
});
document.querySelector<HTMLElement>('.main-game')!.classList.add('appear');
