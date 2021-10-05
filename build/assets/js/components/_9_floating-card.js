const body = document.getElementsByTagName('body');
const outline = document.getElementById('outline-card');
const cardContainer = document.getElementById('floating-card');
const svgLine = document.getElementById('svg-line');
const textCard = document.getElementById('text-card');
const sContainer = document.querySelector('.scroll-indicator-container');
const sIndicator = document.querySelector('.scroll-indicator');
let scrollH = window.pageYOffset / 23.4;

const vinosHome = document.getElementById("vinos-home");
const cobosHome = document.getElementById("cobos-home");
const contactoHome = document.getElementById("contacto-home");
const terroirHome = document.getElementById("terroir-home");
const historiaHome = document.getElementById("historia-home");
const volturnoHome = document.getElementById("volturno-home");
const vdChanaresHome = document.getElementById("vd-chanares-home");
const vdZingarettiHome = document.getElementById("vd-zingaretti-home");
const vdMarchioriHome = document.getElementById("vd-marchiori-home");
const vinculumHome = document.getElementById("vinculum-malbec-home");
const vinculumChardonnayHome = document.getElementById("vinculum-chardonnay-home");
const felinoHome = document.getElementById("felino-home");
const felinoCabernetHome = document.getElementById("felino-cabernet-home");
const felinoChardonnayHome = document.getElementById("felino-chardonnay-home");
const felinoRedBlendHome = document.getElementById("felino-redblend-home");
const bramareHome = document.getElementById("bramare-home");
const cocodriloHome = document.getElementById("cocodrilo-home");

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
    }else if (cobosHome){
        sContainerCheck(cobosHome);
    }else if (contactoHome){
        sContainerCheck(contactoHome);
    }else if (terroirHome){
        sContainerCheck(terroirHome);
    }else if (historiaHome){
        sContainerCheck(historiaHome);
    }else if (volturnoHome){
        sContainerCheck(volturnoHome);
    }else if (vdChanaresHome){
        sContainerCheck(vdChanaresHome);
    }else if (vdZingarettiHome){
        sContainerCheck(vdZingarettiHome);
    }else if (vdMarchioriHome){
        sContainerCheck(vdMarchioriHome);
    }else if (vinculumHome){
        sContainerCheck(vinculumHome);
    }else if (vinculumChardonnayHome){
        sContainerCheck(vinculumChardonnayHome);
    }else if (felinoCabernetHome){
        sContainerCheck(felinoCabernetHome);
    }else if (felinoChardonnayHome){
        sContainerCheck(felinoChardonnayHome);
    }else if (felinoRedBlendHome){
        sContainerCheck(felinoRedBlendHome);
    }else if (bramareHome){
        sContainerCheck(bramareHome);
    }else if (cocodriloHome){
        sContainerCheck(cocodriloHome);
    }
});