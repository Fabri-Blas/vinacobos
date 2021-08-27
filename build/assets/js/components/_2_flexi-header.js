// File#: _2_flexi-header
// Usage: codyhouse.co/license
(function () {
	var flexHeader = document.getElementsByClassName('js-f-header');

	if (flexHeader.length > 0) {
		var menuTrigger = flexHeader[0].getElementsByClassName('js-anim-menu-btn')[0],
			firstFocusableElement = getMenuFirstFocusable();

		// we'll use these to store the node that needs to receive focus when the mobile menu is closed 
		var focusMenu = false;

		resetFlexHeaderOffset();

		menuTrigger.addEventListener('anim-menu-btn-clicked', function (event) {
			toggleMenuNavigation(event.detail);
		});

		// listen for key events
		window.addEventListener('keyup', function (event) {
			// listen for esc key
			if ((event.keyCode && event.keyCode == 27) || (event.key && event.key.toLowerCase() == 'escape')) {
				// close navigation on mobile if open
				if (menuTrigger.getAttribute('aria-expanded') == 'true' && isVisible(menuTrigger)) {
					focusMenu = menuTrigger; // move focus to menu trigger when menu is close
					menuTrigger.click();
				}
			}
			// listen for tab key
			if ((event.keyCode && event.keyCode == 9) || (event.key && event.key.toLowerCase() == 'tab')) {
				// close navigation on mobile if open when nav loses focus
				if (menuTrigger.getAttribute('aria-expanded') == 'true' && isVisible(menuTrigger) && !document.activeElement.closest('.js-f-header')) menuTrigger.click();
			}
		});

		// listen for resize
		var resizingId = false;
		window.addEventListener('resize', function () {
			clearTimeout(resizingId);
			resizingId = setTimeout(doneResizing, 500);
		});

		function getMenuFirstFocusable() {
			var focusableEle = flexHeader[0].getElementsByClassName('f-header__nav')[0].querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary'),
				firstFocusable = false;
			for (var i = 0; i < focusableEle.length; i++) {
				if (focusableEle[i].offsetWidth || focusableEle[i].offsetHeight || focusableEle[i].getClientRects().length) {
					firstFocusable = focusableEle[i];
					break;
				}
			}

			return firstFocusable;
		};

		function isVisible(element) {
			return (element.offsetWidth || element.offsetHeight || element.getClientRects().length);
		};

		function doneResizing() {
			if (!isVisible(menuTrigger) && Util.hasClass(flexHeader[0], 'f-header--expanded')) {
				menuTrigger.click();
			}
			resetFlexHeaderOffset();
		};

		function toggleMenuNavigation(bool) { // toggle menu visibility on small devices
			Util.toggleClass(document.getElementsByClassName('f-header__nav')[0], 'f-header__nav--is-visible', bool);
			Util.toggleClass(flexHeader[0], 'f-header--expanded', bool);
			menuTrigger.setAttribute('aria-expanded', bool);
			if (bool) firstFocusableElement.focus(); // move focus to first focusable element
			else if (focusMenu) {
				focusMenu.focus();
				focusMenu = false;
			}
		};

		function resetFlexHeaderOffset() {
			// on mobile -> update max height of the flexi header based on its offset value (e.g., if there's a fixed pre-header element)
			document.documentElement.style.setProperty('--f-header-offset', flexHeader[0].getBoundingClientRect().top + 'px');
		};
	}
}());

const headerGlobal = document.getElementById('header-global');

checkBackdropBlur();

document.addEventListener('scroll', () => {
	checkBackdropBlur();
});

function checkBackdropBlur(){
	if(window.pageYOffset === 0){
		headerGlobal.classList.remove('backdrop-blur-10');
		headerGlobal.style.backgroundColor = 'rgba(0,0,0,0)';
	}else{
		if(window.pageYOffset > 0){
			headerGlobal.classList.add('backdrop-blur-10');
			headerGlobal.style.backgroundColor = 'rgba(0,0,0,0.8)';
		}
	}
}

checkWindowSize();

function checkWindowSize(){
	if(window.pageXOffset > 1024){
		headerGlobal.classList.add("js-hide-nav", "js-hide-nav--main");
	}else{
		if(window.pageXOffset <= 1024){
			headerGlobal.classList.remove("js-hide-nav", "js-hide-nav--main");
		}
	}
}