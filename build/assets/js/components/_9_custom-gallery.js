const galleryActual = document.querySelector('.gallery-actual').firstElementChild;

const gallery1 = {
    preview: document.querySelector('.gallery-preview-1'),
    path: '../assets/img/felino/desktop/malbec/gallery/felino-desktop-gallery-1.png'
}
const gallery2 = {
    preview: document.querySelector('.gallery-preview-2'),
    path: '../assets/img/felino/desktop/malbec/gallery/felino-desktop-gallery-2.png'
}
const gallery3 = {
    preview: document.querySelector('.gallery-preview-3'),
    path: '../assets/img/felino/desktop/malbec/gallery/felino-desktop-gallery-3.png'
}
const gallery4 = {
    preview: document.querySelector('.gallery-preview-4'),
    path: '../assets/img/felino/desktop/malbec/gallery/felino-desktop-gallery-4.png'
}

gallery1.preview.addEventListener('click', () => gallerySelect(gallery1));
gallery2.preview.addEventListener('click', () => gallerySelect(gallery2));
gallery3.preview.addEventListener('click', () => gallerySelect(gallery3));
gallery4.preview.addEventListener('click', () => gallerySelect(gallery4));

function gallerySelect(gallery) {
    galleryActual.style.opacity = '0';
    galleryActual.style.filter = 'blur(20px)';
    galleryActual.style.transform = 'translateY(30px)';

    setTimeout(() => {
        galleryActual.setAttribute('src', gallery.path);
        galleryActual.style.opacity = '1';
        galleryActual.style.filter = 'blur(0px)';
        galleryActual.style.transform = 'translateY(0px)';
    }, 900);
}

