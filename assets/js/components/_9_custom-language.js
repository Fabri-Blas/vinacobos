const spanish = document.getElementById('es');
const english = document.getElementById('en');

spanish.addEventListener('click', function () {
    if (spanish.classList.contains('color-language-active')) {
        english.classList.remove('color-language-active');
    } else {
        spanish.classList.add('color-language-active');
        english.classList.remove('color-language-active');
    }
    spanish.classList.add('color-language-active');
    english.classList.remove('color-language-active');
})

english.addEventListener('click', function () {
    if (english.classList.contains('color-language-active')) {
        spanish.classList.remove('color-language-active');
    } else {
        english.classList.add('color-language-active');
        spanish.classList.remove('color-language-active');
    }
    english.classList.add('color-language-active');
    spanish.classList.remove('color-language-active');
})

