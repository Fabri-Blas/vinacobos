const sectionWines = document.getElementById('wines-list')
const infoCobos = document.getElementById('info-cobos')
const infoVolturno = document.getElementById('info-volturno')
const infoVineyard = document.getElementById('info-vineyard')
const infoVinculum = document.getElementById('info-vinculum')
const infoBramare = document.getElementById('info-bramare')
const infoCocodrilo = document.getElementById('info-cocodrilo')
const infoFelino = document.getElementById('info-felino')

const liCobos = document.getElementById('cobos')
const liVolturno = document.getElementById('volturno')
const liVineyard = document.getElementById('vc-vineyard')
const liVinculum = document.getElementById('vc-vinculum')
const liBramare = document.getElementById('bramare')
const liCocodrilo = document.getElementById('cocodrilo')
const liFelino = document.getElementById('felino')

function cobos() {
    sectionWines.style.backgroundImage = "url('./assets/img/wines/fondo-wines/Cobos.png')"
    sectionWines.style.transition = '1s'

    liCobos.classList.add('list-wines-active')
    liVolturno.classList.remove('list-wines-active')
    liVineyard.classList.remove('list-wines-active')
    liVinculum.classList.remove('list-wines-active')
    liBramare.classList.remove('list-wines-active')
    liCocodrilo.classList.remove('list-wines-active')
    liFelino.classList.remove('list-wines-active')

    liVinculum.classList.remove('list-wines-white')
    liVolturno.classList.remove('list-wines-white')
    liVineyard.classList.remove('list-wines-white')
    liBramare.classList.remove('list-wines-white')
    liCocodrilo.classList.remove('list-wines-white')
    liFelino.classList.remove('list-wines-white')

    infoCobos.classList.remove('hide')
    infoCobos.classList.add('info-wines-white')
    infoCobos.style.transition = '1s'
    infoVolturno.classList.add('hide')
    infoVineyard.classList.add('hide')
    infoVinculum.classList.add('hide')
    infoBramare.classList.add('hide')
    infoCocodrilo.classList.add('hide')
    infoFelino.classList.add('hide')

}

function volturno() {
    sectionWines.style.backgroundImage = "url('./assets/img/wines/fondo-wines/Volturno.png')"
    sectionWines.style.transition = '1s'

    liVolturno.classList.add('list-wines-active')
    liCobos.classList.remove('list-wines-active')
    liVineyard.classList.remove('list-wines-active')
    liVinculum.classList.remove('list-wines-active')
    liBramare.classList.remove('list-wines-active')
    liCocodrilo.classList.remove('list-wines-active')
    liFelino.classList.remove('list-wines-active')

    liCobos.classList.remove('list-wines-white')
    liVinculum.classList.remove('list-wines-white')
    liVineyard.classList.remove('list-wines-white')
    liBramare.classList.remove('list-wines-white')
    liCocodrilo.classList.remove('list-wines-white')
    liFelino.classList.remove('list-wines-white')

    infoVolturno.classList.remove('hide')
    infoVolturno.classList.add('info-wines-white')
    infoVolturno.style.transition = '1s'
    infoCobos.classList.add('hide')
    infoVineyard.classList.add('hide')
    infoVinculum.classList.add('hide')
    infoBramare.classList.add('hide')
    infoCocodrilo.classList.add('hide')
    infoFelino.classList.add('hide')
}

function vineyard() {
    sectionWines.style.backgroundImage = "url('./assets/img/wines/fondo-wines/VD.png')"
    sectionWines.style.transition = '1s'

    liVineyard.classList.add('list-wines-active')
    liVolturno.classList.remove('list-wines-active')
    liCobos.classList.remove('list-wines-active')
    liVinculum.classList.remove('list-wines-active')
    liBramare.classList.remove('list-wines-active')
    liCocodrilo.classList.remove('list-wines-active')
    liFelino.classList.remove('list-wines-active')

    liCobos.classList.remove('list-wines-white')
    liVolturno.classList.remove('list-wines-white')
    liVinculum.classList.remove('list-wines-white')
    liBramare.classList.remove('list-wines-white')
    liCocodrilo.classList.remove('list-wines-white')
    liFelino.classList.remove('list-wines-white')

    infoVineyard.classList.remove('hide')
    infoVineyard.classList.add('info-wines-white')
    infoVineyard.style.transition = '1s'
    infoVolturno.classList.add('hide')
    infoCobos.classList.add('hide')
    infoVinculum.classList.add('hide')
    infoBramare.classList.add('hide')
    infoCocodrilo.classList.add('hide')
    infoFelino.classList.add('hide')
}

function vinculum() {
    sectionWines.style.backgroundImage = "url('./assets/img/wines/fondo-wines/Vinculum.png')"
    sectionWines.style.transition = '1s'

    liVinculum.classList.add('list-wines-active')
    liVolturno.classList.remove('list-wines-active')
    liVineyard.classList.remove('list-wines-active')
    liCobos.classList.remove('list-wines-active')
    liBramare.classList.remove('list-wines-active')
    liCocodrilo.classList.remove('list-wines-active')
    liFelino.classList.remove('list-wines-active')

    liCobos.classList.remove('list-wines-white')
    liVolturno.classList.remove('list-wines-white')
    liVineyard.classList.remove('list-wines-white')
    liBramare.classList.remove('list-wines-white')
    liCocodrilo.classList.remove('list-wines-white')
    liFelino.classList.remove('list-wines-white')

    infoVinculum.classList.remove('hide')
    infoVinculum.classList.add('info-wines-white')
    infoVinculum.style.transition = '1s'
    infoVolturno.classList.add('hide')
    infoVineyard.classList.add('hide')
    infoCobos.classList.add('hide')
    infoBramare.classList.add('hide')
    infoCocodrilo.classList.add('hide')
    infoFelino.classList.add('hide')
}

function bramare() {
    sectionWines.style.backgroundImage = "url('./assets/img/wines/fondo-wines/Bramare.png')"
    sectionWines.style.transition = '1s'

    liBramare.classList.add('list-wines-active')
    liVolturno.classList.remove('list-wines-active')
    liVineyard.classList.remove('list-wines-active')
    liVinculum.classList.remove('list-wines-active')
    liCobos.classList.remove('list-wines-active')
    liCocodrilo.classList.remove('list-wines-active')
    liFelino.classList.remove('list-wines-active')

    liCobos.classList.add('list-wines-white')
    liVolturno.classList.add('list-wines-white')
    liVineyard.classList.add('list-wines-white')
    liVinculum.classList.add('list-wines-white')
    liCocodrilo.classList.add('list-wines-white')
    liFelino.classList.add('list-wines-white')


    infoBramare.classList.remove('hide')
    infoBramare.classList.add('info-wines')
    infoBramare.style.transition = '1s'
    infoVolturno.classList.add('hide')
    infoVineyard.classList.add('hide')
    infoVinculum.classList.add('hide')
    infoCobos.classList.add('hide')
    infoCocodrilo.classList.add('hide')
    infoFelino.classList.add('hide')
}

function cocodrilo() {
    sectionWines.style.backgroundImage = "url('./assets/img/wines/fondo-wines/Cocodrilo.png')"
    sectionWines.style.transition = '1s'

    liCocodrilo.classList.add('list-wines-active')
    liVolturno.classList.remove('list-wines-active')
    liVineyard.classList.remove('list-wines-active')
    liVinculum.classList.remove('list-wines-active')
    liBramare.classList.remove('list-wines-active')
    liCobos.classList.remove('list-wines-active')
    liFelino.classList.remove('list-wines-active')

    liCobos.classList.add('list-wines-white')
    liVolturno.classList.add('list-wines-white')
    liVineyard.classList.add('list-wines-white')
    liVinculum.classList.add('list-wines-white')
    liBramare.classList.add('list-wines-white')
    liFelino.classList.add('list-wines-white')

    infoCocodrilo.classList.remove('hide')
    infoCocodrilo.classList.add('info-wines')
    infoCocodrilo.style.transition = '1s'
    infoVolturno.classList.add('hide')
    infoVineyard.classList.add('hide')
    infoVinculum.classList.add('hide')
    infoBramare.classList.add('hide')
    infoCobos.classList.add('hide')
    infoFelino.classList.add('hide')
}

function felino() {
    sectionWines.style.backgroundImage = "url('./assets/img/wines/fondo-wines/Felino.png')"
    sectionWines.style.transition = '1s'

    liFelino.classList.add('list-wines-active')
    liVolturno.classList.remove('list-wines-active')
    liVineyard.classList.remove('list-wines-active')
    liVinculum.classList.remove('list-wines-active')
    liBramare.classList.remove('list-wines-active')
    liCocodrilo.classList.remove('list-wines-active')
    liCobos.classList.remove('list-wines-active')

    liCobos.classList.add('list-wines-white')
    liVolturno.classList.add('list-wines-white')
    liVineyard.classList.add('list-wines-white')
    liVinculum.classList.add('list-wines-white')
    liCocodrilo.classList.add('list-wines-white')
    liBramare.classList.add('list-wines-white')

    infoFelino.classList.remove('hide')
    infoFelino.classList.add('info-wines')
    infoFelino.style.transition = '1s'
    infoVolturno.classList.add('hide')
    infoVineyard.classList.add('hide')
    infoVinculum.classList.add('hide')
    infoBramare.classList.add('hide')
    infoCocodrilo.classList.add('hide')
    infoCobos.classList.add('hide')
}
