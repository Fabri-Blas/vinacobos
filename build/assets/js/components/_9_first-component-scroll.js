const firstComponentAnimation = document.querySelector(".first-component-animation");
const secondComponentReveal = document.getElementById("second-component-reveal");

if (firstComponentAnimation && secondComponentReveal && window.innerWidth > 1024) {
    document.body.style.overflowY = 'hidden';

    let firstComponentHidden = false;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    window.addEventListener('scroll', () => {
        revealFirstComponent();
    });

    window.addEventListener('wheel', (e) => {
        revealFirstComponent();

        if (window.scrollY == 0 && !firstComponentHidden && getDelta() < 0) {
            setTimeout(() => {
                document.body.style.overflowY = 'overlay';
                firstComponentHidden = true;
            }, 800);
            firstComponentAnimation.style.top = '-52%';
            secondComponentReveal.style.backgroundColor = 'transparent';
            secondComponentReveal.style.backdropFilter = 'blur(0px)';
        }
    });

    function revealFirstComponent() {
        if (window.scrollY == 0 && getDelta() > 0) {
            firstComponentAnimation.style.top = "50%";
            secondComponentReveal.style.backgroundColor = 'black';
            secondComponentReveal.style.backdropFilter = 'blur(15px)';
            document.body.style.overflowY = 'hidden';
            firstComponentHidden = false;
        }
    }

    function getDelta() {
        var e = window.event || e;
        return Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    }
}