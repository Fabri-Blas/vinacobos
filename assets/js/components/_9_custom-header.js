const mainDocument = document.getElementsByTagName('main')[0];
const headerToggle = document.querySelector('.anim-menu-btn');
const headerContainer = document.getElementsByTagName('header')[0];
isHeaderToggleOpen = false;

if (headerToggle && headerContainer) {

    const links = headerContainer.querySelectorAll('.animation-header-link');

    headerToggle.style.backgroundColor = 'black';
    headerToggle.addEventListener('click', () => {
        if (!isHeaderToggleOpen) {
            mainDocument.classList.add('opacity-fade');

            headerToggle.style.backgroundColor = 'white';
            headerToggle.style.color = 'black';
            headerContainer.style.right = '0%';
            if (window.innerWidth <= 800) {
                console.log('entra')
                headerContainer.style.width = '100vw'
            }

            isHeaderToggleOpen = true;

            setTimeout(() => headerLinksAnimation(links, 1, 'translateY(0px)', 50), 500);
        } else {
            mainDocument.classList.remove('opacity-fade');

            headerToggle.style.backgroundColor = 'black';
            headerToggle.style.color = 'white';
            headerContainer.style.right = '-100%';
            isHeaderToggleOpen = false;

            headerLinksAnimation(links, 0, 'translateY(15px)', 25);
        }
    })
}

function headerLinksAnimation(links, opacity, transform, timing) {
    let t = timing;
    links.forEach(link => {
        setTimeout(() => {
            link.style.opacity = `${opacity}`;
            link.style.transform = `${transform}`;
        }, t += timing)
    })
}