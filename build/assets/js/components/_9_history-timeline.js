if (window.location.pathname === '/history.html') {

    const gif = document.getElementById('gif-history')
    const img = document.getElementById('img-history')

    setTimeout(() => {
        gif.classList.add('is-hidden')
        img.classList.remove('is-hidden')
    }, 6000);

    const d1988 = document.getElementById('1988')
    const d1992 = document.getElementById('1992')
    const d1997 = document.getElementById('1997')
    const d1999 = document.getElementById('1999')
    const d2013 = document.getElementById('2013')
    const d2014 = document.getElementById('2014')
    const d2017 = document.getElementById('2017')
    const d2022 = document.getElementById('2022')

    const historiaPrincipal = document.getElementById('historia-principal')

    const text1988 = document.getElementById('text-1988')
    const text1992 = document.getElementById('text-1992')
    const text1997 = document.getElementById('text-1997')
    const text1999 = document.getElementById('text-1999')
    const text2013 = document.getElementById('text-2013')
    const text2014 = document.getElementById('text-2014')
    const text2017 = document.getElementById('text-2017')
    const text2022 = document.getElementById('text-2022')


    d1988.addEventListener('mouseover', function () {
        text1988.classList.remove('is-hidden')
        text1988.classList.add('selected')

        text1992.classList.add('is-hidden')
        text1997.classList.add('is-hidden')
        text1999.classList.add('is-hidden')
        text2013.classList.add('is-hidden')
        text2014.classList.add('is-hidden')
        text2017.classList.add('is-hidden')
        text2022.classList.add('is-hidden')

        historiaPrincipal.classList.add('is-hidden')
    })
    d1988.addEventListener('mouseout', function () {

        text1988.classList.add('is-hidden')
        text1988.classList.remove('selected')

        text1992.classList.add('is-hidden')
        text1997.classList.add('is-hidden')
        text1999.classList.add('is-hidden')
        text2013.classList.add('is-hidden')
        text2014.classList.add('is-hidden')
        text2017.classList.add('is-hidden')
        text2022.classList.add('is-hidden')

        historiaPrincipal.classList.remove('is-hidden')

    })




    d1992.addEventListener('mouseover', function () {
        text1992.classList.remove('is-hidden')
        text1992.classList.add('selected')

        text1988.classList.add('is-hidden')
        text1997.classList.add('is-hidden')
        text1999.classList.add('is-hidden')
        text2013.classList.add('is-hidden')
        text2014.classList.add('is-hidden')
        text2017.classList.add('is-hidden')
        text2022.classList.add('is-hidden')

        historiaPrincipal.classList.add('is-hidden')
    })
    d1992.addEventListener('mouseout', function () {

        text1992.classList.add('is-hidden')
        text1992.classList.remove('selected')

        text1988.classList.add('is-hidden')
        text1997.classList.add('is-hidden')
        text1999.classList.add('is-hidden')
        text2013.classList.add('is-hidden')
        text2014.classList.add('is-hidden')
        text2017.classList.add('is-hidden')
        text2022.classList.add('is-hidden')

        historiaPrincipal.classList.remove('is-hidden')
    })





    d1997.addEventListener('mouseover', function () {
        text1997.classList.remove('is-hidden')
        text1997.classList.add('selected')

        text1988.classList.add('is-hidden')
        text1992.classList.add('is-hidden')
        text1999.classList.add('is-hidden')
        text2013.classList.add('is-hidden')
        text2014.classList.add('is-hidden')
        text2017.classList.add('is-hidden')
        text2022.classList.add('is-hidden')

        historiaPrincipal.classList.add('is-hidden')
    })
    d1997.addEventListener('mouseout', function () {

        text1997.classList.add('is-hidden')
        text1997.classList.remove('selected')

        text1988.classList.add('is-hidden')
        text1992.classList.add('is-hidden')
        text1999.classList.add('is-hidden')
        text2013.classList.add('is-hidden')
        text2014.classList.add('is-hidden')
        text2017.classList.add('is-hidden')
        text2022.classList.add('is-hidden')


        historiaPrincipal.classList.remove('is-hidden')

    })



    d1999.addEventListener('mouseover', function () {
        text1999.classList.remove('is-hidden')
        text1999.classList.add('selected')

        text1988.classList.add('is-hidden')
        text1997.classList.add('is-hidden')
        text1992.classList.add('is-hidden')
        text2013.classList.add('is-hidden')
        text2014.classList.add('is-hidden')
        text2017.classList.add('is-hidden')
        text2022.classList.add('is-hidden')

        historiaPrincipal.classList.add('is-hidden')
    })
    d1999.addEventListener('mouseout', function () {

        text1999.classList.add('is-hidden')
        text1999.classList.remove('selected')

        text1988.classList.add('is-hidden')
        text1997.classList.add('is-hidden')
        text1992.classList.add('is-hidden')
        text2013.classList.add('is-hidden')
        text2014.classList.add('is-hidden')
        text2017.classList.add('is-hidden')
        text2022.classList.add('is-hidden')

        historiaPrincipal.classList.remove('is-hidden')

    })




    d2013.addEventListener('mouseover', function () {
        text2013.classList.remove('is-hidden')
        text2013.classList.add('selected')

        text1988.classList.add('is-hidden')
        text1997.classList.add('is-hidden')
        text1999.classList.add('is-hidden')
        text1992.classList.add('is-hidden')
        text2014.classList.add('is-hidden')
        text2017.classList.add('is-hidden')
        text2022.classList.add('is-hidden')

        historiaPrincipal.classList.add('is-hidden')
    })
    d2013.addEventListener('mouseout', function () {

        text2013.classList.add('is-hidden')
        text2013.classList.remove('selected')

        text1988.classList.add('is-hidden')
        text1997.classList.add('is-hidden')
        text1999.classList.add('is-hidden')
        text1992.classList.add('is-hidden')
        text2014.classList.add('is-hidden')
        text2017.classList.add('is-hidden')
        text2022.classList.add('is-hidden')

        historiaPrincipal.classList.remove('is-hidden')

    })




    d2014.addEventListener('mouseover', function () {
        text2014.classList.remove('is-hidden')
        text2014.classList.add('selected')

        text1988.classList.add('is-hidden')
        text1997.classList.add('is-hidden')
        text1999.classList.add('is-hidden')
        text2013.classList.add('is-hidden')
        text1992.classList.add('is-hidden')
        text2017.classList.add('is-hidden')
        text2022.classList.add('is-hidden')

        historiaPrincipal.classList.add('is-hidden')
    })
    d2014.addEventListener('mouseout', function () {

        text2014.classList.add('is-hidden')
        text2014.classList.remove('selected')

        text1988.classList.add('is-hidden')
        text1997.classList.add('is-hidden')
        text1999.classList.add('is-hidden')
        text2013.classList.add('is-hidden')
        text1992.classList.add('is-hidden')
        text2017.classList.add('is-hidden')
        text2022.classList.add('is-hidden')

        historiaPrincipal.classList.remove('is-hidden')

    })




    d2017.addEventListener('mouseover', function () {
        text2017.classList.remove('is-hidden')
        text2017.classList.add('selected')

        text1988.classList.add('is-hidden')
        text1997.classList.add('is-hidden')
        text1999.classList.add('is-hidden')
        text2013.classList.add('is-hidden')
        text2014.classList.add('is-hidden')
        text1992.classList.add('is-hidden')
        text2022.classList.add('is-hidden')

        historiaPrincipal.classList.add('is-hidden')
    })
    d2017.addEventListener('mouseout', function () {

        text2017.classList.add('is-hidden')
        text2017.classList.remove('selected')

        text1988.classList.add('is-hidden')
        text1997.classList.add('is-hidden')
        text1999.classList.add('is-hidden')
        text2013.classList.add('is-hidden')
        text2014.classList.add('is-hidden')
        text1992.classList.add('is-hidden')
        text2022.classList.add('is-hidden')

        historiaPrincipal.classList.remove('is-hidden')

    })




    d2022.addEventListener('mouseover', function () {
        text2022.classList.remove('is-hidden')
        text2022.classList.add('selected')

        text1988.classList.add('is-hidden')
        text1997.classList.add('is-hidden')
        text1999.classList.add('is-hidden')
        text2013.classList.add('is-hidden')
        text2014.classList.add('is-hidden')
        text2017.classList.add('is-hidden')
        text1992.classList.add('is-hidden')

        historiaPrincipal.classList.add('is-hidden')
    })
    d2022.addEventListener('mouseout', function () {

        text2022.classList.add('is-hidden')
        text2022.classList.remove('selected')

        text1988.classList.add('is-hidden')
        text1997.classList.add('is-hidden')
        text1999.classList.add('is-hidden')
        text2013.classList.add('is-hidden')
        text2014.classList.add('is-hidden')
        text2017.classList.add('is-hidden')
        text1992.classList.add('is-hidden')

        historiaPrincipal.classList.remove('is-hidden')

    })

}
