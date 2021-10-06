// =================================GALLERY VARS=================================
let galleryActual = document.querySelector('.gallery-actual');
let galleryActualMobile = document.querySelector('.gallery-actual-mobile');

let selected = null;
let previous = null;

// =================================DESKTOP GALLERY=================================
if (galleryActual) {

    galleryActual = galleryActual.firstElementChild;
    let galleryPreviewBackdrop = document.querySelectorAll('.gallery-preview-selected');
    
    clearGalleryBackdrops();

    galleryPreviewBackdrop.forEach(preview => {
        preview.addEventListener('click', () => {
            clearGalleryBackdrops();
            preview.style.opacity = '1';
            preview.firstElementChild.setAttribute('style', 'transform: scale(1) rotate(0deg); opacity: 1;');
        });
    });

    const gallery1 = {
        preview: document.querySelector('.gallery-preview-1'),
        path: '../assets/img/felino/desktop/malbec/gallery/felino-desktop-gallery-1.png',
        selected: false
    }
    const gallery2 = {
        preview: document.querySelector('.gallery-preview-2'),
        path: '../assets/img/felino/desktop/malbec/gallery/felino-desktop-gallery-2.png',
        selected: false
    }
    const gallery3 = {
        preview: document.querySelector('.gallery-preview-3'),
        path: '../assets/img/felino/desktop/malbec/gallery/felino-desktop-gallery-3.png',
        selected: false
    }
    const gallery4 = {
        preview: document.querySelector('.gallery-preview-4'),
        path: '../assets/img/felino/desktop/malbec/gallery/felino-desktop-gallery-4.png',
        selected: false
    }

    initGalleryPaths();

    galleryClickEvent(gallery1);
    galleryClickEvent(gallery2);
    galleryClickEvent(gallery3);
    galleryClickEvent(gallery4);

    gallerySelect(gallery1);

    function initGalleryPaths() {
        galleryActual.setAttribute('src', gallery2.path);
        galleryActual.setAttribute('src', gallery3.path);
        galleryActual.setAttribute('src', gallery4.path);
        galleryActual.setAttribute('src', gallery1.path);
    }

    function clearGalleryBackdrops() {
        galleryPreviewBackdrop.forEach(preview => {
            preview.style.opacity = '0';
            preview.firstElementChild.setAttribute('style', 'transform: scale(0.5) rotate(-360deg); opacity: 0;');
        });
    }

    function galleryClickEvent(gallery) {
        gallery.preview.addEventListener('click', () => {
            if (!gallery.selected) {
                clearGallerySelect(); gallerySelect(gallery);
                gallery.selected = true;
            }
        });
    }

    function clearGallerySelect() {
        gallery1.preview.firstElementChild.style.boxShadow = "none";
        gallery2.preview.firstElementChild.style.boxShadow = "none";
        gallery3.preview.firstElementChild.style.boxShadow = "none";
        gallery4.preview.firstElementChild.style.boxShadow = "none";

        gallery1.selected = false;
        gallery2.selected = false;
        gallery3.selected = false;
        gallery4.selected = false;
    }

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

}

// =================================MOBILE GALLERY=================================
if (galleryActualMobile) {

    galleryActualMobile = galleryActualMobile.firstElementChild;

    let galleryPreviewBackdropMobile = document.querySelectorAll('.gallery-preview-selected-mobile');

    clearGalleryBackdropsMobile();

    galleryPreviewBackdropMobile.forEach(preview => {
        preview.addEventListener('click', () => {
            clearGalleryBackdropsMobile();
            preview.style.opacity = '1';
            preview.firstElementChild.setAttribute('style', 'transform: scale(1) rotate(0deg); opacity: 1;');
        });
    });

    const gallery1Mobile = {
        preview: document.querySelector('.gallery-mobile-preview-1'),
        path: '../assets/img/felino/mobile/malbec/gallery/felino-mobile-gallery-1.png',
        selected: false
    }
    const gallery2Mobile = {
        preview: document.querySelector('.gallery-mobile-preview-2'),
        path: '../assets/img/felino/mobile/malbec/gallery/felino-mobile-gallery-2.png',
        selected: false
    }
    const gallery3Mobile = {
        preview: document.querySelector('.gallery-mobile-preview-3'),
        path: '../assets/img/felino/mobile/malbec/gallery/felino-mobile-gallery-3.png',
        selected: false
    }
    const gallery4Mobile = {
        preview: document.querySelector('.gallery-mobile-preview-4'),
        path: '../assets/img/felino/mobile/malbec/gallery/felino-mobile-gallery-4.png',
        selected: false
    }

    initGalleryPathsMobile();

    galleryClickEventMobile(gallery1Mobile);
    galleryClickEventMobile(gallery2Mobile);
    galleryClickEventMobile(gallery3Mobile);
    galleryClickEventMobile(gallery4Mobile);

    gallerySelectMobile(gallery1Mobile);

    function initGalleryPathsMobile() {
        galleryActualMobile.setAttribute('src', gallery2Mobile.path);
        galleryActualMobile.setAttribute('src', gallery3Mobile.path);
        galleryActualMobile.setAttribute('src', gallery4Mobile.path);
        galleryActualMobile.setAttribute('src', gallery1Mobile.path);
    }

    function galleryClickEventMobile(gallery) {
        gallery.preview.addEventListener('click', () => {
            if (!gallery.selected) {
                clearGallerySelectMobile(); gallerySelectMobile(gallery);
                gallery.selected = true;
            }
        });
    }

    function clearGallerySelectMobile() {
        gallery1Mobile.selected = false;
        gallery2Mobile.selected = false;
        gallery3Mobile.selected = false;
        gallery4Mobile.selected = false;
    }

    function clearGalleryBackdropsMobile() {
        galleryPreviewBackdropMobile.forEach(preview => {
            preview.style.opacity = '0';
            preview.firstElementChild.setAttribute('style', 'transform: scale(0.5) rotate(-360deg); opacity: 0;');
        });
    }

    function gallerySelectMobile(gallery) {
        galleryActualMobile.style.opacity = '0';
        galleryActualMobile.style.filter = 'blur(20px)';
        galleryActualMobile.style.transform = 'translateY(30px)';

        setTimeout(() => {
            galleryActualMobile.setAttribute('src', gallery.path);
            galleryActualMobile.style.opacity = '1';
            galleryActualMobile.style.filter = 'blur(0px)';
            galleryActualMobile.style.transform = 'translateY(0px)';
        }, 900);
    }
}

