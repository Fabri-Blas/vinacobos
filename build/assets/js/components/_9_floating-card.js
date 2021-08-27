const body = document.getElementsByTagName('body');
const outline = document.getElementById('outline-card');
const cardContainer = document.getElementById('floating-card');
const svgLine = document.getElementById('svg-line');
const textCard = document.getElementById('text-card');
const sContainer = document.querySelector('.scroll-indicator-container');
const sIndicator = document.querySelector('.scroll-indicator');
let scrollH = window.pageYOffset / 23.4;

function inViewport(el) {
    var bb = el.getBoundingClientRect();
    return !(bb.top > innerHeight || bb.bottom < 0);
}
document.addEventListener('scroll', () => {

    if (!inViewport(hero)) {
        sContainer.classList.remove('is-hidden')
    } else {
        if (!sContainer.classList.contains('is-hidden')) {
            sContainer.classList.add('is-hidden')
        }
    }

    sIndicator.setAttribute('style', `height: ${(window.pageYOffset - 912) / 40}%`);
})