const vinoVolturno = document.getElementById("vino-volturno-img");
const logoVolturno = document.getElementById("vino-volturno-logo");

logoVolturno.addEventListener('mouseover',() =>{
    vinoVolturno.style.opacity = '1';

});

logoVolturno.addEventListener('mouseout',() =>{
    vinoVolturno.style.opacity = '0';

});
