// =================================GALLERY CLASS=================================
class galleryPreview {
    constructor(preview, path, selected) {
        this.preview = preview;
        this.path = path;
        this.selected = selected;
    }
}


// =================================GALLERY VARS=================================
const mainGalleryVars = document.querySelectorAll('.main-gallery');
const mainGalleryVarsMobile = document.querySelectorAll('.main-gallery-mobile');

// =================================DESKTOP GALLERY=================================
if (mainGalleryVars) {
    mainGalleryVars.forEach(mainGallery => {
        let galleryActual = mainGallery.querySelector('.gallery-actual');

        if (galleryActual) {

            galleryActual = galleryActual.firstElementChild;
            let galleryPreviewBackdrop = mainGallery.querySelectorAll('.gallery-preview-selected');

            clearGalleryBackdrops();

            galleryPreviewBackdrop.forEach(previewBackdrop => {
                previewBackdrop.addEventListener('click', () => {
                    clearGalleryBackdrops();
                    setGalleryBackdrops(previewBackdrop);
                });
            });

            const allGalleryPreviews = mainGallery.querySelectorAll('.gallery-preview');
            const previewsCont = allGalleryPreviews.length;

            const galleryObjects = [];

            for (let i = 0; i < previewsCont; i++) {
                const galleryObject = new galleryPreview(
                    preview = allGalleryPreviews[i],
                    path = allGalleryPreviews[i].childNodes[3].getAttribute('gallery-src'),
                    false
                );
                galleryObjects.push(galleryObject);
            }

            galleryObjects.forEach(gallery => {
                galleryClickEvent(gallery);
            });

            clearGalleryBackdrops();
            clearGallerySelect();
            galleryObjects[0].preview.click();
            setGalleryBackdrops(galleryPreviewBackdrop[0]);

            function clearGalleryBackdrops() {
                galleryPreviewBackdrop.forEach(preview => {
                    preview.style.opacity = '0';
                    preview.firstElementChild.setAttribute('style', 'transform: scale(0.5) rotate(-360deg); opacity: 0;');
                });
            }

            function setGalleryBackdrops(preview) {
                preview.style.opacity = '1';
                preview.firstElementChild.setAttribute('style', 'transform: scale(1) rotate(0deg); opacity: 1;');
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
                galleryObjects.forEach(gallery => {
                    gallery.preview.firstElementChild.style.boxShadow = "none";
                    gallery.selected = false;
                });
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
    });
}

// =================================MOBILE GALLERY=================================
if (mainGalleryVarsMobile) {
    mainGalleryVarsMobile.forEach(mainGalleryMobile => {
        let galleryActualMobile = mainGalleryMobile.querySelector('.gallery-actual-mobile');

        if (galleryActualMobile) {

            galleryActualMobile = galleryActualMobile.firstElementChild;

            let galleryPreviewBackdropMobile = mainGalleryMobile.querySelectorAll('.gallery-preview-selected-mobile');

            clearGalleryBackdropsMobile();

            galleryPreviewBackdropMobile.forEach(preview => {
                preview.addEventListener('click', () => {
                    clearGalleryBackdropsMobile();
                    setGalleryBackdropsMobile(preview);
                });
            });


            const galleryObjectsMobile = [];

            const allGalleryPreviewsMobile = mainGalleryMobile.querySelectorAll('.gallery-preview');
            const previewsContMobile = allGalleryPreviewsMobile.length;

            for (let i = 0; i < previewsContMobile; i++) {
                const galleryObject = new galleryPreview(
                    preview = allGalleryPreviewsMobile[i],
                    path = allGalleryPreviewsMobile[i].childNodes[3].getAttribute('gallery-src'),
                    false
                )
                galleryObjectsMobile.push(galleryObject);
            }


            galleryObjectsMobile.forEach(gallery => {
                galleryClickEventMobile(gallery);
            });

            clearGalleryBackdropsMobile();
            clearGallerySelectMobile();
            galleryObjectsMobile[0].preview.click();
            setGalleryBackdropsMobile(galleryPreviewBackdropMobile[0]);

            function galleryClickEventMobile(gallery) {
                gallery.preview.addEventListener('click', () => {
                    if (!gallery.selected) {
                        clearGallerySelectMobile(); gallerySelectMobile(gallery);
                        gallery.selected = true;
                    }
                });
            }

            function clearGallerySelectMobile() {
                galleryObjectsMobile.forEach(gallery => {
                    gallery.selected = false;
                });
            }

            function clearGalleryBackdropsMobile() {
                galleryPreviewBackdropMobile.forEach(preview => {
                    preview.style.opacity = '0';
                    preview.firstElementChild.setAttribute('style', 'transform: scale(0.5) rotate(-360deg); opacity: 0;');
                });
            }
            function setGalleryBackdropsMobile(preview) {
                preview.style.opacity = '1';
                preview.firstElementChild.setAttribute('style', 'transform: scale(1) rotate(0deg); opacity: 1;');
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

    });
}
