// File#: _1_hiding-nav
// Usage: codyhouse.co/license
(function () {

  const headerGlobal = document.getElementById('header-global');

  if (window.innerWidth <= 1024) {
    headerGlobal.classList.remove('js-hide-nav');
    headerGlobal.classList.remove('js-hide-nav--main');
  }

  var hidingNav = document.getElementsByClassName('js-hide-nav');
  if (hidingNav.length > 0 && window.requestAnimationFrame) {
    var mainNav = Array.prototype.filter.call(hidingNav, function (element) {
      return Util.hasClass(element, 'js-hide-nav--main');
    }),
      subNav = Array.prototype.filter.call(hidingNav, function (element) {
        return Util.hasClass(element, 'js-hide-nav--sub');
      });

    var scrolling = false,
      previousTop = window.scrollY,
      currentTop = window.scrollY,
      scrollDelta = 10,
      scrollOffset = 150, // scrollY needs to be bigger than scrollOffset to hide navigation
      headerHeight = 0;

    var navIsFixed = false; // check if main navigation is fixed
    if (mainNav.length > 0 && Util.hasClass(mainNav[0], 'hide-nav--fixed')) navIsFixed = true;

    // store button that triggers navigation on mobile
    var triggerMobile = getTriggerMobileMenu();
    var prevElement = createPrevElement();
    var mainNavTop = 0;
    // list of classes the hide-nav has when it is expanded -> do not hide if it has those classes
    var navOpenClasses = hidingNav[0].getAttribute('data-nav-target-class'),
      navOpenArrayClasses = [];
    if (navOpenClasses) navOpenArrayClasses = navOpenClasses.split(' ');
    getMainNavTop();
    if (mainNavTop > 0) {
      scrollOffset = scrollOffset + mainNavTop;
    }

    // init navigation and listen to window scroll event
    getHeaderHeight();
    initSecondaryNav();
    initFixedNav();
    resetHideNav();
    window.addEventListener('scroll', function (event) {
      if (scrolling) return;
      scrolling = true;
      window.requestAnimationFrame(resetHideNav);
    });

    window.addEventListener('resize', function (event) {
      if (scrolling) return;
      scrolling = true;
      window.requestAnimationFrame(function () {
        if (headerHeight > 0) {
          getMainNavTop();
          getHeaderHeight();
          initSecondaryNav();
          initFixedNav();
        }
        // reset both navigation
        hideNavScrollUp();

        scrolling = false;
      });
    });

    function getHeaderHeight() {
      headerHeight = mainNav[0].offsetHeight;
    };

    function initSecondaryNav() { // if there's a secondary nav, set its top equal to the header height
      if (subNav.length < 1 || mainNav.length < 1) return;
      subNav[0].style.top = (headerHeight - 1) + 'px';
    };

    function initFixedNav() {
      if (!navIsFixed || mainNav.length < 1) return;
      mainNav[0].style.marginBottom = '-' + headerHeight + 'px';
    };

    function resetHideNav() { // check if navs need to be hidden/revealed
      currentTop = window.scrollY;
      if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
        hideNavScrollDown();
      } else if (previousTop - currentTop > scrollDelta || (previousTop - currentTop > 0 && currentTop < scrollOffset)) {
        hideNavScrollUp();
      } else if (previousTop - currentTop > 0 && subNav.length > 0 && subNav[0].getBoundingClientRect().top > 0) {
        setTranslate(subNav[0], '0%');
      }
      // if primary nav is fixed -> toggle bg class
      if (navIsFixed) {
        var scrollTop = window.scrollY || window.pageYOffset;
        Util.toggleClass(mainNav[0], 'hide-nav--has-bg', (scrollTop > headerHeight + mainNavTop));
      }
      previousTop = currentTop;
      scrolling = false;
    };

    function hideNavScrollDown() {
      // if there's a secondary nav -> it has to reach the top before hiding nav
      if (subNav.length > 0 && subNav[0].getBoundingClientRect().top > headerHeight) return;
      // on mobile -> hide navigation only if dropdown is not open
      if (triggerMobile && triggerMobile.getAttribute('aria-expanded') == "true") return;
      // check if main nav has one of the following classes
      if (mainNav.length > 0 && (!navOpenClasses || !checkNavExpanded())) {
        setTranslate(mainNav[0], '-100%');
        mainNav[0].addEventListener('transitionend', addOffCanvasClass);
      }
      if (subNav.length > 0) setTranslate(subNav[0], '-' + headerHeight + 'px');
    };

    function hideNavScrollUp() {
      if (mainNav.length > 0) { setTranslate(mainNav[0], '0%'); Util.removeClass(mainNav[0], 'hide-nav--off-canvas'); mainNav[0].removeEventListener('transitionend', addOffCanvasClass); }
      if (subNav.length > 0) setTranslate(subNav[0], '0%');
    };

    function addOffCanvasClass() {
      mainNav[0].removeEventListener('transitionend', addOffCanvasClass);
      Util.addClass(mainNav[0], 'hide-nav--off-canvas');
    };

    function setTranslate(element, val) {
      element.style.transform = 'translateY(' + val + ')';
    };

    function getTriggerMobileMenu() {
      // store trigger that toggle mobile navigation dropdown
      var triggerMobileClass = hidingNav[0].getAttribute('data-mobile-trigger');
      if (!triggerMobileClass) return false;
      if (triggerMobileClass.indexOf('#') == 0) { // get trigger by ID
        var trigger = document.getElementById(triggerMobileClass.replace('#', ''));
        if (trigger) return trigger;
      } else { // get trigger by class name
        var trigger = hidingNav[0].getElementsByClassName(triggerMobileClass);
        if (trigger.length > 0) return trigger[0];
      }

      return false;
    };

    function createPrevElement() {
      // create element to be inserted right before the mainNav to get its top value
      if (mainNav.length < 1) return false;
      var newElement = document.createElement("div");
      newElement.setAttribute('aria-hidden', 'true');
      mainNav[0].parentElement.insertBefore(newElement, mainNav[0]);
      var prevElement = mainNav[0].previousElementSibling;
      prevElement.style.opacity = '0';
      return prevElement;
    };

    function getMainNavTop() {
      if (!prevElement) return;
      mainNavTop = prevElement.getBoundingClientRect().top + window.scrollY;
    };

    function checkNavExpanded() {
      var navIsOpen = false;
      for (var i = 0; i < navOpenArrayClasses.length; i++) {
        if (Util.hasClass(mainNav[0], navOpenArrayClasses[i].trim())) {
          navIsOpen = true;
          break;
        }
      }
      return navIsOpen;
    };

  } else {
    // if window requestAnimationFrame is not supported -> add bg class to fixed header
    var mainNav = document.getElementsByClassName('js-hide-nav--main');
    if (mainNav.length < 1) return;
    if (Util.hasClass(mainNav[0], 'hide-nav--fixed')) Util.addClass(mainNav[0], 'hide-nav--has-bg');
  }


  var path = window.location.pathname;
  let actualPage = path.split("/").pop();
  actualPage = actualPage.split('.')[0];
  const mainLogo = document.querySelector('.main-logo');
  const desktopHeader = document.getElementById("desktop-header");
  const itemsDesktop = desktopHeader.querySelectorAll('.f-header__item');
  const linksDesktop = desktopHeader.querySelectorAll('.f-header__link');
  const logoMobile = document.querySelector('.logo-mobile-1');
  let below = false;
  let doneAbove = false;
  let doneBelow = false;

  

  if (actualPage === 'felino' || actualPage === 'historia' || actualPage ==='terroir' || actualPage === 'felino-cabernet' || actualPage === 'felino-red-blend' || actualPage === 'felino-chardonnay' || actualPage === 'bramare' || actualPage === 'bramare-patagonia' || actualPage === 'bramare-valle-de-uco' || actualPage === 'cocodrilo') {
    checkBackdropBlur2();
    document.addEventListener('scroll', () => {
      checkBackdropBlur2();
    });
  } else {
    checkBackdropBlur();
    document.addEventListener('scroll', () => {
      checkBackdropBlur();
    });
  }




  function checkBackdropBlur() {
    if (window.pageYOffset === 0) {
      headerGlobal.classList.remove('backdrop-blur-10');
      headerGlobal.style.backgroundColor = 'rgba(0,0,0,0)';
    } else {
      if (window.pageYOffset > 0) {
        headerGlobal.classList.add('backdrop-blur-10');
        headerGlobal.style.backgroundColor = 'rgba(0,0,0,0.8)';
      }
    }
  }
  function checkBackdropBlur2() {
    if (window.pageYOffset === 0) {
      below = false;
      doneBelow = false;
      headerGlobal.classList.remove('backdrop-blur-10');
      headerGlobal.style.backgroundColor = 'rgba(0,0,0,0)';
      mainLogo.setAttribute('src', '../assets/img/logo-black.svg');
      logoMobile.setAttribute('src', '../assets/img/logo-black.svg');
      if (!below && !doneAbove) {
        itemsDesktop.forEach(item => {
          item.classList.remove('nav--line');
          item.classList.add('nav--line-black');
        });
        linksDesktop.forEach(item => {
          item.classList.remove('btn--nav');
          item.classList.add('btn--nav-black');
        });
        doneAbove = true;
      }
    } else {
      if (window.pageYOffset > 0) {
        doneAbove = false;
        headerGlobal.classList.add('backdrop-blur-10');
        headerGlobal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        mainLogo.setAttribute('src', '../assets/img/logo.svg');
        logoMobile.setAttribute('src', '../assets/img/logo.svg');
        if (!below && !doneBelow) {
          itemsDesktop.forEach(item => {
            item.classList.remove('nav--line-black');
            item.classList.add('nav--line');
          });
          linksDesktop.forEach(item => {
            item.classList.remove('btn--nav-black');
            item.classList.add('btn--nav');
          });
          doneBelow = true;
        }
      }
    }
  }
}());