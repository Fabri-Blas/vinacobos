const firstComponentAnimation = document.querySelector(".first-component-animation");
const secondComponentReveal = document.getElementById("second-component-reveal");

if (firstComponentAnimation && secondComponentReveal && window.innerWidth > 1024) {
    document.body.style.overflowY = 'hidden';

    let firstComponentHidden = false;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    window.addEventListener('scroll', () => {
        revealFirstComponent(e);
        resetFirstComponent(e);
    });

    window.addEventListener('wheel', (e) => {
        revealFirstComponent(e);
        resetFirstComponent(e);
    });

    function revealFirstComponent(e) {
        if (window.scrollY == 0 && firstComponentHidden && getDelta(e) > 0) {
            setTimeout(() => {
                firstComponentHidden = false;
            }, 1000);
            document.body.style.overflowY = 'hidden';
            firstComponentAnimation.style.top = "50%";
            secondComponentReveal.style.backgroundColor = 'black';
            secondComponentReveal.style.backdropFilter = 'blur(15px)';
        }
    }
    function resetFirstComponent(e) {
        if (window.scrollY == 0 && !firstComponentHidden && getDelta(e) < 0) {
            setTimeout(() => {
                document.body.style.overflowY = 'overlay';
                firstComponentHidden = true;
            }, 1000);
            firstComponentAnimation.style.top = '-52%';
            secondComponentReveal.style.backgroundColor = 'transparent';
            secondComponentReveal.style.backdropFilter = 'blur(0px)';
        }
    }

    function getDelta(e) {
        var e = window.event || e;
        return Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    }
}