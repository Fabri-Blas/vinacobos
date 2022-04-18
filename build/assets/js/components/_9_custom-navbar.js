const home = document.getElementById('home');
const historia = document.getElementById('history');
const identity = document.getElementById('identity');
const farming = document.getElementById('farming');
const wines = document.getElementById('wines')
const hospitality = document.getElementById('hospitality');
const shop = document.getElementById('shop');
const legal = document.getElementById('legal');



if (window.location.pathname === '/index.html') {
    home.classList.add('color-subtitle-active');
    historia.classList.remove('color-subtitle-active');
    identity.classList.remove('color-subtitle-active');
    farming.classList.remove('color-subtitle-active');
    wines.classList.remove('color-subtitle-active');
    hospitality.classList.remove('color-subtitle-active');
    shop.classList.remove('color-subtitle-active')
    legal.classList.remove('color-subtitle-active')
     
}  

if (window.location.pathname === '/history.html') {
    historia.classList.add('color-subtitle-active');
    home.classList.remove('color-subtitle-active');
    identity.classList.remove('color-subtitle-active');
    farming.classList.remove('color-subtitle-active');
    wines.classList.remove('color-subtitle-active');
    hospitality.classList.remove('color-subtitle-active');
    shop.classList.remove('color-subtitle-active')
    legal.classList.remove('color-subtitle-active')
     
}  

if (window.location.pathname === '/identity.html') {
    identity.classList.add('color-subtitle-active');
    historia.classList.remove('color-subtitle-active');
    home.classList.remove('color-subtitle-active');
    farming.classList.remove('color-subtitle-active');
    wines.classList.remove('color-subtitle-active');
    hospitality.classList.remove('color-subtitle-active');
    shop.classList.remove('color-subtitle-active')
    legal.classList.remove('color-subtitle-active')
     
}  


if (window.location.pathname === '/farming.html') {
    farming.classList.add('color-subtitle-active');
    historia.classList.remove('color-subtitle-active');
    identity.classList.remove('color-subtitle-active');
    home.classList.remove('color-subtitle-active');
    wines.classList.remove('color-subtitle-active');
    hospitality.classList.remove('color-subtitle-active');
    shop.classList.remove('color-subtitle-active')
    legal.classList.remove('color-subtitle-active')
     
}  


if (window.location.pathname === '/wines.html' || window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) === '/wines') {
    wines.classList.add('color-subtitle-active');
    historia.classList.remove('color-subtitle-active');
    identity.classList.remove('color-subtitle-active');
    farming.classList.remove('color-subtitle-active');
    home.classList.remove('color-subtitle-active');
    hospitality.classList.remove('color-subtitle-active');
    shop.classList.remove('color-subtitle-active')
    legal.classList.remove('color-subtitle-active')
     
}  


if (window.location.pathname === '/hospitality.html') {
    hospitality.classList.add('color-subtitle-active');
    historia.classList.remove('color-subtitle-active');
    identity.classList.remove('color-subtitle-active');
    farming.classList.remove('color-subtitle-active');
    wines.classList.remove('color-subtitle-active');
    home.classList.remove('color-subtitle-active');
    shop.classList.remove('color-subtitle-active')
    legal.classList.remove('color-subtitle-active')
     
}  

if (window.location.pathname === '/legal.html') {
    legal.classList.add('color-subtitle-active');
    historia.classList.remove('color-subtitle-active');
    identity.classList.remove('color-subtitle-active');
    farming.classList.remove('color-subtitle-active');
    wines.classList.remove('color-subtitle-active');
    hospitality.classList.remove('color-subtitle-active');
    shop.classList.remove('color-subtitle-active')
    home.classList.remove('color-subtitle-active')
     
}  