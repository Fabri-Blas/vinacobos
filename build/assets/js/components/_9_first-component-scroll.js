const firstComponentScrolleable = document.getElementsByClassName('first-component-scrolleable')[0];
const secondComponentScrolleable = document.getElementsByClassName('second-component-scrolleable')[0];
let inSecondComponent = false;
let animationDone = false;


window.addEventListener('scroll', () => {
    if (firstComponentScrolleable && secondComponentScrolleable) {
        var actualPageY = window.scrollY;
        if (actualPageY === 0) {
            animationDone = false;
            inSecondComponent = false;
        } else if (actualPageY > 0 && !animationDone) {
            secondComponentScrolleable.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            animationDone = true;
            document.body.style.overflowY = 'hidden';
        } else if (!inSecondComponent && window.scrollY + 10 > (firstComponentScrolleable.offsetTop + firstComponentScrolleable.offsetHeight)) {
            document.body.style.overflowY = 'scroll';
            inSecondComponent = true;
        }
    }
});