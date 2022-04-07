const gif = document.getElementById('gif-history')
const img = document.getElementById('img-history')

setTimeout(() => {
    gif.classList.add('is-hidden')
    img.classList.remove('is-hidden')
}, 6000);