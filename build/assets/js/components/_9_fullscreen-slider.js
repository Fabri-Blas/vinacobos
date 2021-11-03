const fs_slider = document.querySelectorAll(".fs-slider");
const fs_slider_reveal = document.querySelectorAll(".fs-slider-reveal");
let actualSlider = 0;
let inAnimation = false;

console.log(fs_slider[actualSlider]);

if (fs_slider.length > 0 && window.innerWidth > 1024) {
    let fsSliderLenght = fs_slider.length;
    fs_slider.forEach(slider => slider.style.zIndex = `${fsSliderLenght--}`);
    fs_slider.forEach(slider => (fs_slider.length--) > 0 ? slider.style.top = '65%' : console.log('slider component init'));
    fs_slider_reveal.forEach(reveal => {
        reveal.style.backgroundColor = 'white';
        reveal.style.backdropFilter = 'blur(15px)';
    });

    document.body.style.overflowY = 'hidden';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fs_slider[0].style.top = '50%';

    window.addEventListener('wheel', (e) => {

        if (actualSlider == 1 && !inAnimation && getDelta == 1) {
            inAnimation = true;
            fs_slider[0].style.top = '50%';
            setTimeout(() => inAnimation = false, 780);
        } else {
            if (actualSlider == fs_slider.length && !inAnimation && getDelta == -1) {
                inAnimation = true;
                fs_slider[fs_slider.length].style.top = '50%';
                fs_slider_reveal[fs_slider.length].style.backgroundColor = 'transparent';
                fs_slider_reveal[fs_slider.length].style.backdropFilter = 'blur(0px)';
                setTimeout(() => inAnimation = false, 780);
            } else {
                switch (getDelta()) {
                    case -1:
                        if (actualSlider < fs_slider.length && fs_slider[actualSlider + 1] && !inAnimation) {
                            inAnimation = true;
                            fs_slider[actualSlider].style.top = '-52%';
                            fs_slider[actualSlider + 1].style.top = '50%';
                            fs_slider_reveal[actualSlider].style.backgroundColor = 'transparent';
                            fs_slider_reveal[actualSlider].style.backdropFilter = 'blur(0px)';
                            actualSlider++;
                            setTimeout(() => inAnimation = false, 780);
                        }
                        break;
                    case 1:
                        if (actualSlider >= 0 && fs_slider[actualSlider - 1] && !inAnimation) {
                            inAnimation = true;
                            fs_slider[actualSlider - 1].style.top = '50%';
                            fs_slider[actualSlider].style.top = '65%';
                            fs_slider_reveal[actualSlider - 1].style.backgroundColor = 'white';
                            fs_slider_reveal[actualSlider - 1].style.backdropFilter = 'blur(15px)';
                            actualSlider--;
                            setTimeout(() => inAnimation = false, 780);
                        }
                        break;
                }
            }
        }
    });

    function getDelta() {
        var e = window.event || e;
        return Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    }
}