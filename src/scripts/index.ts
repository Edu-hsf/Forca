function redirectToCategories () {
    window.location.href = 'categories.html'
}

function openGuide () {
    document.querySelector<HTMLElement>('.menu-buttons')!.setAttribute('style', 'display: none;')
    document.querySelector<HTMLElement>('.guide')!.removeAttribute('style')
}

function closeGuide () {
    document.querySelector<HTMLElement>('.menu-buttons')!.removeAttribute('style')
    document.querySelector<HTMLElement>('.guide')!.setAttribute('style', 'display: none;')
}

document.querySelector<HTMLElement>('.container-main')!.classList.add('appear');

document.querySelector('.guide-button')!.addEventListener('click', openGuide)
document.querySelector('.close-guide')!.addEventListener('click', closeGuide)