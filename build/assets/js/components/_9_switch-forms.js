const BOX_CONTACTO = document.getElementById("box-contacto");
const BOX_VISITAS = document.getElementById("box-visitas");
const BOX_ADMINISTRACION = document.getElementById("box-administracion");
const BOX_UBICACION = document.getElementById("box-ubicacion");

const FORM_CONTACTO = document.getElementById('form-contacto');
const FORM_VISITAS = document.getElementById('form-visitas');
const INFO_ADMINISTRACION = document.getElementById('info-administracion');
const INFO_UBICACION = document.getElementById('info-ubicacion');

const BOX_CONTACTO_MOBILE = document.getElementById("box-contacto-mobile");
const BOX_VISITAS_MOBILE = document.getElementById("box-visitas-mobile");
const BOX_ADMINISTRACION_MOBILE = document.getElementById("box-administracion-mobile");
const BOX_UBICACION_MOBILE = document.getElementById("box-ubicacion-mobile");

const FORM_CONTACTO_MOBILE = document.getElementById('form-contacto-mobile');
const FORM_VISITAS_MOBILE = document.getElementById('form-visitas-mobile');
const INFO_ADMINISTRACION_MOBILE = document.getElementById('info-administracion-mobile');
const INFO_UBICACION_MOBILE = document.getElementById('info-ubicacion-mobile');



// =================DESKTOP FUNCTIONS=================
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


// =================MOBILE FUNCTIONS=================

function resetFormsMobile() {
    BOX_CONTACTO_MOBILE.classList.remove('contact-section-inactive');
    BOX_CONTACTO_MOBILE.classList.add('contact-section-selected');

    BOX_VISITAS_MOBILE.classList.add('contact-section-inactive');
    BOX_VISITAS_MOBILE.classList.remove('contact-section-selected');
    BOX_ADMINISTRACION_MOBILE.classList.add('contact-section-inactive');
    BOX_ADMINISTRACION_MOBILE.classList.remove('contact-section-selected');
    BOX_UBICACION_MOBILE.classList.add('contact-section-inactive');
    BOX_UBICACION_MOBILE.classList.remove('contact-section-selected');
    
    FORM_CONTACTO_MOBILE.classList.remove('is-hidden');
    FORM_VISITAS_MOBILE.classList.add('is-hidden');
    INFO_ADMINISTRACION_MOBILE.classList.add('is-hidden');
    INFO_UBICACION_MOBILE.classList.add('is-hidden');
}

function showVisitasMobile(){
    BOX_VISITAS_MOBILE.classList.remove('contact-section-inactive');
    BOX_VISITAS_MOBILE.classList.add('contact-section-selected');

    BOX_CONTACTO_MOBILE.classList.add('contact-section-inactive');
    BOX_CONTACTO_MOBILE.classList.remove('contact-section-selected');
    BOX_ADMINISTRACION_MOBILE.classList.add('contact-section-inactive');
    BOX_ADMINISTRACION_MOBILE.classList.remove('contact-section-selected');
    BOX_UBICACION_MOBILE.classList.add('contact-section-inactive');
    BOX_UBICACION_MOBILE.classList.remove('contact-section-selected');

    FORM_CONTACTO_MOBILE.classList.add('is-hidden');
    FORM_VISITAS_MOBILE.classList.remove('is-hidden');
    INFO_ADMINISTRACION_MOBILE.classList.add('is-hidden');
    INFO_UBICACION_MOBILE.classList.add('is-hidden');
}
function showAdministracionMobile(){
    BOX_ADMINISTRACION_MOBILE.classList.remove('contact-section-inactive');
    BOX_ADMINISTRACION_MOBILE.classList.add('contact-section-selected');

    BOX_VISITAS_MOBILE.classList.add('contact-section-inactive');
    BOX_VISITAS_MOBILE.classList.remove('contact-section-selected');
    BOX_CONTACTO_MOBILE.classList.add('contact-section-inactive');
    BOX_CONTACTO_MOBILE.classList.remove('contact-section-selected');
    BOX_UBICACION_MOBILE.classList.add('contact-section-inactive');
    BOX_UBICACION_MOBILE.classList.remove('contact-section-selected');

    FORM_CONTACTO_MOBILE.classList.add('is-hidden');
    FORM_VISITAS_MOBILE.classList.add('is-hidden');
    INFO_ADMINISTRACION_MOBILE.classList.remove('is-hidden');
    INFO_UBICACION_MOBILE.classList.add('is-hidden');
}
function showUbicacionMobile(){
    BOX_UBICACION_MOBILE.classList.remove('contact-section-inactive');
    BOX_UBICACION_MOBILE.classList.add('contact-section-selected');

    BOX_ADMINISTRACION_MOBILE.classList.add('contact-section-inactive');
    BOX_ADMINISTRACION_MOBILE.classList.remove('contact-section-selected');
    BOX_VISITAS_MOBILE.classList.add('contact-section-inactive');
    BOX_VISITAS_MOBILE.classList.remove('contact-section-selected');
    BOX_CONTACTO_MOBILE.classList.add('contact-section-inactive');
    BOX_CONTACTO_MOBILE.classList.remove('contact-section-selected');

    FORM_CONTACTO_MOBILE.classList.add('is-hidden');
    FORM_VISITAS_MOBILE.classList.add('is-hidden');
    INFO_ADMINISTRACION_MOBILE.classList.add('is-hidden');
    INFO_UBICACION_MOBILE.classList.remove('is-hidden');
}