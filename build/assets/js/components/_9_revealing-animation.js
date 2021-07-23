var hero = document.getElementById('hero')

function smoothScroll(starget, duration){
    let sctarget = document.querySelector(starget),
    targetPosition = sctarget.getBoundingClientRect().top,
    startPosition = window.pageYOffset,
    distance = targetPosition - startPosition,
    startTime = null



    function animation(currentTime){
        if(startTime === null) startTime = currentTime
        let timeElapsed = currentTime - startTime
        let run = ease(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if(timeElapsed < duration) requestAnimationFrame(animation)
    }

    function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    };

    requestAnimationFrame(animation)
}
function inViewport(el){
    var bb = el.getBoundingClientRect();
    return !(bb.top > innerHeight || bb.bottom < 0);
}

document.addEventListener('scroll',(e)=>{
    // if(window.pageYOffset < 500){
    //     e.preventDefault
    //     console.log('scrolleando')
    //     smoothScroll('.model-3d', 1000)
    //  }
    // console.log('pageoffset', window.pageYOffset)
})

