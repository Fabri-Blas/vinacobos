const body = document.getElementsByTagName('body');
const outline = document.getElementById('outline-card');
const cardContainer = document.getElementById('floating-card');
const svgLine = document.getElementById('svg-line');
const textCard = document.getElementById('text-card');
const sContainer = document.querySelector('.scroll-indicator-container');
const sIndicator = document.querySelector('.scroll-indicator');
let scrollH = window.pageYOffset / 23.4;

const vinosHome = document.getElementById("vinos-home");
const felinoHome = document.getElementById("felino-home");

function inViewport(el) {
    if (el.getBoundingClientRect()) {
        var bb = el.getBoundingClientRect();
        return !(bb.top > innerHeight || bb.bottom < 0);
    }
}

function sContainerCheck(elem){
    if (!inViewport(elem)) {
        sContainer.classList.remove('is-hidden')
    } else {
        if (!sContainer.classList.contains('is-hidden')) {
            sContainer.classList.add('is-hidden')
        }
    }
    sIndicator.setAttribute('style', `height: ${(window.pageYOffset - 912) / 40}%`);
}

sContainer.classList.add('is-hidden');

document.addEventListener('scroll', () => {
    if (hero) {
        sContainerCheck(hero);
    }else if(vinosHome){
        sContainerCheck(vinosHome);
    }else if (felinoHome){
        sContainerCheck(felinoHome);
    }
});