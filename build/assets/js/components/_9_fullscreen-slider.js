const fs_slider = document.querySelectorAll(".fs-slider");
const fs_slider_reveal = document.querySelectorAll(".fs-slider-reveal");
const fs_scroll_slider = document.getElementById("scroll-slider");
const desktopHeaderHistoria = document.getElementById("desktop-header");
const headerLogoHistoria = document.querySelectorAll('.vinacobos-logo');
const itemsDesktopHistoria = desktopHeaderHistoria.querySelectorAll('.f-header__item');
const linksDesktopHistoria = desktopHeaderHistoria.querySelectorAll('.f-header__link');
const dropdownArrowHistoria = document.querySelector('.vinos-dropdown-arrow-polygon');

let actualSlider = 0;
let inAnimation = false;

if (fs_slider.length > 0 && window.innerWidth > 1024) {
    let fsSliderLenght = fs_slider.length - 1;
    let scrollValue = 100 / fsSliderLenght;
    setTimeout(() => {
        document.querySelector(".scroll-indicator-container").classList.remove("is-hidden");
    }, 100);
    fs_scroll_slider.style.height = "0%";
    fs_slider.forEach(slider => slider.style.zIndex = `${fsSliderLenght--}`);
    fs_slider.forEach(slider => (fs_slider.length--) > 0 ? slider.style.top = '65%' : console.log('slider component init'));

    fsSliderLenght = fs_slider.length - 1;

    fs_slider_reveal.forEach(reveal => {
        reveal.style.backgroundColor = 'white';
        reveal.style.backdropFilter = 'blur(15px)';
    });

    document.body.style.overflowY = 'hidden';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fs_slider[0].style.top = '50%';

    window.addEventListener('wheel', (e) => {

        if (actualSlider == 1 && !inAnimation && getDelta() > 0) {
            console.log('Start');
            inAnimation = true;
            fs_slider[0].style.top = '50%';
            fs_scroll_slider.style.height = '0%';
            setTimeout(() => inAnimation = false, 1750);

            actualSlider = 0;
        } else {
            if (actualSlider == (fsSliderLenght - 1) && !inAnimation && getDelta() < 0) {
                console.log('End');
                inAnimation = true;
                fs_slider[actualSlider].style.top = '-52%';
                fs_slider[actualSlider + 1].style.top = '50%';
                fs_slider_reveal[actualSlider].style.backgroundColor = 'transparent';
                fs_slider_reveal[actualSlider].style.backdropFilter = 'blur(0px)';
                headerLogoHistoria[0].style.fill = "white"; headerLogoHistoria[1].style.fill = "white";
                itemsDesktopHistoria.forEach(item => {
                    if (item.classList.contains('nav--line-selected-black')) {
                        item.classList.remove('nav--line-selected-black');
                        item.classList.add('nav--line-selected');
                    } else {
                        item.classList.remove('nav--line-black');
                        item.classList.add('nav--line');
                    }
                    dropdownArrowHistoria.style.fill = 'white';
                });
                linksDesktopHistoria.forEach(item => {
                    item.classList.remove('btn--nav-black');
                    item.classList.add('btn--nav');
                });
                setTimeout(() => inAnimation = false, 1750);

                actualSlider++;
            } else {
                switch (getDelta()) {
                    case -1:
                        if (actualSlider < fs_slider.length - 1 && fs_slider[actualSlider + 1] && !inAnimation) {
                            inAnimation = true;
                            fs_slider[actualSlider].style.top = '-52%';
                            fs_slider[actualSlider + 1].style.top = '50%';
                            fs_slider_reveal[actualSlider].style.backgroundColor = 'transparent';
                            fs_slider_reveal[actualSlider].style.backdropFilter = 'blur(0px)';
                            actualSlider++;
                            setTimeout(() => inAnimation = false, 1750);
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
                            setTimeout(() => inAnimation = false, 1750);
                        }
                        break;
                }
                fs_scroll_slider.style.height = `${actualSlider * scrollValue}%`;
                itemsDesktopHistoria.forEach(item => {
                    if (item.classList.contains('nav--line-selected')) {
                        item.classList.remove('nav--line-selected');
                        item.classList.add('nav--line-selected-black');
                    } else {
                        item.classList.remove('nav--line');
                        item.classList.add('nav--line-black');
                    }
                    dropdownArrowHistoria.style.fill = 'black';
                });
                linksDesktopHistoria.forEach(item => {
                    item.classList.remove('btn--nav');
                    item.classList.add('btn--nav-black');
                });
                headerLogoHistoria[0].style.fill = "black"; headerLogoHistoria[1].style.fill = "black";
            }

        }
    });

    function getDelta() {
        var e = window.event || e;
        return Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    }
}