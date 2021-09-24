const BOX_CONTACTO = document.getElementById("box-contacto");
const BOX_VISITAS = document.getElementById("box-visitas");
const BOX_ADMINISTRACION = document.getElementById("box-administracion");
const BOX_UBICACION = document.getElementById("box-ubicacion");

const FORM_CONTACTO = document.getElementById('form-contacto');
const FORM_VISITAS = document.getElementById('form-visitas');
const INFO_ADMINISTRACION = document.getElementById('info-administracion');
const INFO_UBICACION = document.getElementById('info-ubicacion');

function resetForms() {
    BOX_CONTACTO.classList.remove('contact-section-inactive');
    BOX_CONTACTO.classList.add('contact-section-selected');

    BOX_VISITAS.classList.add('contact-section-inactive');
    BOX_VISITAS.classList.remove('contact-section-selected');
    BOX_ADMINISTRACION.classList.add('contact-section-inactive');
    BOX_ADMINISTRACION.classList.remove('contact-section-selected');
    BOX_UBICACION.classList.add('contact-section-inactive');
    BOX_UBICACION.classList.remove('contact-section-selected');
    
    FORM_CONTACTO.classList.remove('is-hidden');
    FORM_VISITAS.classList.add('is-hidden');
    INFO_ADMINISTRACION.classList.add('is-hidden');
    INFO_UBICACION.classList.add('is-hidden');
}

function showVisitas(){
    BOX_VISITAS.classList.remove('contact-section-inactive');
    BOX_VISITAS.classList.add('contact-section-selected');

    BOX_CONTACTO.classList.add('contact-section-inactive');
    BOX_CONTACTO.classList.remove('contact-section-selected');
    BOX_ADMINISTRACION.classList.add('contact-section-inactive');
    BOX_ADMINISTRACION.classList.remove('contact-section-selected');
    BOX_UBICACION.classList.add('contact-section-inactive');
    BOX_UBICACION.classList.remove('contact-section-selected');

    FORM_CONTACTO.classList.add('is-hidden');
    FORM_VISITAS.classList.remove('is-hidden');
    INFO_ADMINISTRACION.classList.add('is-hidden');
    INFO_UBICACION.classList.add('is-hidden');
}
function showAdministracion(){
    BOX_ADMINISTRACION.classList.remove('contact-section-inactive');
    BOX_ADMINISTRACION.classList.add('contact-section-selected');

    BOX_VISITAS.classList.add('contact-section-inactive');
    BOX_VISITAS.classList.remove('contact-section-selected');
    BOX_CONTACTO.classList.add('contact-section-inactive');
    BOX_CONTACTO.classList.remove('contact-section-selected');
    BOX_UBICACION.classList.add('contact-section-inactive');
    BOX_UBICACION.classList.remove('contact-section-selected');

    FORM_CONTACTO.classList.add('is-hidden');
    FORM_VISITAS.classList.add('is-hidden');
    INFO_ADMINISTRACION.classList.remove('is-hidden');
    INFO_UBICACION.classList.add('is-hidden');
}
function showUbicacion(){
    BOX_UBICACION.classList.remove('contact-section-inactive');
    BOX_UBICACION.classList.add('contact-section-selected');

    BOX_ADMINISTRACION.classList.add('contact-section-inactive');
    BOX_ADMINISTRACION.classList.remove('contact-section-selected');
    BOX_VISITAS.classList.add('contact-section-inactive');
    BOX_VISITAS.classList.remove('contact-section-selected');
    BOX_CONTACTO.classList.add('contact-section-inactive');
    BOX_CONTACTO.classList.remove('contact-section-selected');

    FORM_CONTACTO.classList.add('is-hidden');
    FORM_VISITAS.classList.add('is-hidden');
    INFO_ADMINISTRACION.classList.add('is-hidden');
    INFO_UBICACION.classList.remove('is-hidden');
}