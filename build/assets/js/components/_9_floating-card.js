const d = document,
    body = d.getElementsByTagName('body')
hero = d.getElementById('hero'),
    outline = d.getElementById('outline-card'),
    cardContainer = d.getElementById('floating-card'),
    svgLine = d.getElementById('svg-line'),
    textCard = d.getElementById('text-card'),
    sContainer = d.querySelector('.scroll-indicator-container'),
    sIndicator = d.querySelector('.scroll-indicator')
    // let scrollH = window.pageYOffset / 23.4

// body.scrollTop = 0  
function inViewport(el) {
    // console.log(scrollH)
    var bb = el.getBoundingClientRect();
    return !(bb.top > innerHeight || bb.bottom < 0);
}
d.addEventListener('scroll', () => {
    // // if (inViewport(outline)) {
    //     svgLine.classList.add('svg-border-js')
    //     cardContainer.classList.add('floating-card-js')
    //     textCard.classList.add('fl-text-js')
    // // }

    if (!inViewport(hero)) {
        sContainer.classList.remove('is-hidden')
    } else {
        if (!sContainer.classList.contains('is-hidden')) {
            sContainer.classList.add('is-hidden')
        }
    }

    sIndicator.setAttribute('style', `height: ${(window.pageYOffset -912) / 40}%`)
        // console.log((window.pageYOffset -912)/ 40)
})


document.addEventListener('scroll', function(event) {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
        panel.selectedTrigger = event.currentTarget;
        // togglePanel(panel);
        openPanel(panel)
        event.preventDefault();
        // window.scrollTo(window.scrollX, window.scrollY - 1);
        // window.scrollTo(window.scrollX, window.scrollY + 1);
    } else {
        panel.selectedTrigger = event.currentTarget;
        // togglePanel(panel);
        closePanel(panel)
        event.preventDefault();
    }

    lastScrollTop = st <= 0 ? 0 : st;
});