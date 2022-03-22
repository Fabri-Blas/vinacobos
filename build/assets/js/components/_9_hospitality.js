const formContacto = document.getElementById('form-contact')
const formVisitas = document.getElementById('form-visitas')
const formMaps = document.getElementById('maps')
const btnVisit = document.getElementById('btn-visit')
const btnContact = document.getElementById('btn-contact')
const btnMaps = document.getElementById('btn-maps')
const hrBtnVisit = document.getElementById('hr-btn-visit')
const hrBtnContact = document.getElementById('hr-btn-contact')
const hrBtnMaps = document.getElementById('hr-btn-maps')


// btnVisit.addEventListener('click', function () {

// })
function visit() {
    formVisitas.classList.remove('hide')
    formContacto.classList.add('hide')
    formMaps.classList.add('hide')

    btnVisit.classList.add('btn-hospitality-active')
    hrBtnVisit.classList.remove('hide')
    btnContact.classList.remove('btn-hospitality-active')
    btnContact.classList.add('btn-hospitality')
    hrBtnContact.classList.add('hide')
    btnMaps.classList.remove('btn-hospitality-active')
    hrBtnMaps.classList.add('hide')

}

function contact() {
    formContacto.classList.remove('hide')
    formVisitas.classList.add('hide')
    formMaps.classList.add('hide')

    btnVisit.classList.remove('btn-hospitality-active')
    hrBtnVisit.classList.add('hide')
    btnContact.classList.add('btn-hospitality-active')
    hrBtnContact.classList.remove('hide')
    btnMaps.classList.remove('btn-hospitality-active')
    hrBtnMaps.classList.add('hide')
}

function maps() {
    formContacto.classList.add('hide')
    formVisitas.classList.add('hide')
    formMaps.classList.remove('hide')

    btnVisit.classList.remove('btn-hospitality-active')
    hrBtnVisit.classList.add('hide')
    btnContact.classList.remove('btn-hospitality-active')
    btnContact.classList.add('btn-hospitality')
    hrBtnContact.classList.add('hide')
    btnMaps.classList.add('btn-hospitality-active')
    hrBtnMaps.classList.remove('hide')
}
