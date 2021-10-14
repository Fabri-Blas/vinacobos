const logoVolturno = document.getElementById("vino-volturno-logo");
const logoCobos = document.getElementById("vino-cobos-logo");


if(logoCobos && logoVolturno){
    const vinoVolturno = document.getElementById("vino-volturno-img");
    const vinoCobos = document.getElementById("vino-cobos-img");
    
    logoVolturno.addEventListener('mouseover',() =>{
        vinoVolturno.style.opacity = '1';
        vinoCobos.style.opacity = '0';
    });
    
    logoVolturno.addEventListener('mouseout',() =>{
        vinoVolturno.style.opacity = '0';
        vinoCobos.style.opacity = '1';
    });
}


