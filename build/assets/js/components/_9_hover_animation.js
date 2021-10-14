const logoVolturno = document.getElementById("vino-volturno-logo");


if(logoVolturno){
    const vinoVolturno = document.getElementById("vino-volturno-img");
    
    logoVolturno.addEventListener('mouseover',() =>{
        vinoVolturno.style.opacity = '1';
    });
    
    logoVolturno.addEventListener('mouseout',() =>{
        vinoVolturno.style.opacity = '0';
    });
}


