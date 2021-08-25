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

setTimeout(() => {

    console.log('iniciado');

    const felino = document.getElementById("felino-section");
    const compsect2b = document.querySelector('.component-section-2b').clientHeight;
    const fHeaders = document.querySelectorAll('.f-header__item');
    const fLinks = document.querySelectorAll('.f-header__link');
    const logo = document.getElementById("logo");

    let paseFelino = false;

    function calcActPos(offsetTop) {
        return (window.pageYOffset - offsetTop);
    }

    document.addEventListener("scroll", () => {

        let actPos = calcActPos(felino.offsetTop - compsect2b);


        if (paseFelino && actPos < 0) {
            // ============ CAMBIO AL COLOR BLANCO DEL HEADER ============
            logo.setAttribute('src', './assets/img/logo.svg');

            fHeaders.forEach(header => {
                header.classList.remove('nav--line-black');
                header.classList.add('nav--line');
            });
            fLinks.forEach(link => {
                link.classList.remove('btn--nav-black');
                link.classList.add('btn--nav');
            });
            paseFelino = false;
        } else {
            if (!paseFelino && actPos >= 0) {
                // ============ CAMBIO AL COLOR NEGRO DEL HEADER ============
                logo.setAttribute('src', './assets/img/logo-black.svg');

                fHeaders.forEach(header => {
                    header.classList.remove('nav--line');
                    header.classList.add('nav--line-black');
                });
                fLinks.forEach(link => {
                    link.classList.remove('btn--nav');
                    link.classList.add('btn--nav-black');
                });

                paseFelino = true;
            }
        }
    });
}, 500);