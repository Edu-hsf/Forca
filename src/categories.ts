function  backToMenu() {
    window.location.href = 'index.html'
}

function redirectToGame (category: string) {
    window.localStorage.setItem('category', category)
    window.location.href = 'game.html'
}

document.querySelector<HTMLElement>('header')!.classList.add('appear');
document.querySelector<HTMLElement>('.categories')!.classList.add('appear');