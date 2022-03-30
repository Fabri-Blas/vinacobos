const buttonTeamwork = document.getElementById('teamwork')
const buttonRespect = document.getElementById('respect')
const buttonAtention = document.getElementById('atention')

const carouselTeamwork = document.getElementById('carousel-teamwork')
const carouselRespect = document.getElementById('carousel-respect')
const carouselAtention = document.getElementById('carousel-atention')


function teamwork() {
    buttonTeamwork.classList.add('identity-active')
    buttonAtention.classList.remove('identity-active')
    buttonRespect.classList.remove('identity-active')

    carouselAtention.classList.add('hide')
    carouselRespect.classList.add('hide')
    carouselTeamwork.classList.remove('hide')
}

function respect() {
    buttonTeamwork.classList.remove('identity-active')
    buttonAtention.classList.remove('identity-active')
    buttonRespect.classList.add('identity-active')

    carouselAtention.classList.add('hide')
    carouselRespect.classList.remove('hide')
    carouselTeamwork.classList.add('hide')
}

function atention() {
    buttonTeamwork.classList.remove('identity-active')
    buttonAtention.classList.add('identity-active')
    buttonRespect.classList.remove('identity-active')

    carouselAtention.classList.remove('hide')
    carouselRespect.classList.add('hide')
    carouselTeamwork.classList.add('hide')
}
