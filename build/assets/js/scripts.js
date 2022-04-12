// Utility function
function Util () {};

/* 
	class manipulation functions
*/
Util.hasClass = function(el, className) {
	return el.classList.contains(className);
};

Util.addClass = function(el, className) {
	var classList = className.split(' ');
 	el.classList.add(classList[0]);
 	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
	var classList = className.split(' ');
	el.classList.remove(classList[0]);	
	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
	if(bool) Util.addClass(el, className);
	else Util.removeClass(el, className);
};

Util.setAttributes = function(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

/* 
  DOM manipulation
*/
Util.getChildrenByClassName = function(el, className) {
  var children = el.children,
    childrenByClass = [];
  for (var i = 0; i < children.length; i++) {
    if (Util.hasClass(children[i], className)) childrenByClass.push(children[i]);
  }
  return childrenByClass;
};

Util.is = function(elem, selector) {
  if(selector.nodeType){
    return elem === selector;
  }

  var qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector),
    length = qa.length,
    returnArr = [];

  while(length--){
    if(qa[length] === elem){
      return true;
    }
  }

  return false;
};

/* 
	Animate height of an element
*/
Util.setHeight = function(start, to, element, duration, cb, timeFunction) {
	var change = to - start,
	    currentTime = null;

  var animateHeight = function(timestamp){  
    if (!currentTime) currentTime = timestamp;         
    var progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    var val = parseInt((progress/duration)*change + start);
    if(timeFunction) {
      val = Math[timeFunction](progress, start, to - start, duration);
    }
    element.style.height = val+"px";
    if(progress < duration) {
        window.requestAnimationFrame(animateHeight);
    } else {
    	if(cb) cb();
    }
  };
  
  //set the height of the element before starting animation -> fix bug on Safari
  element.style.height = start+"px";
  window.requestAnimationFrame(animateHeight);
};

/* 
	Smooth Scroll
*/

Util.scrollTo = function(final, duration, cb, scrollEl) {
  var element = scrollEl || window;
  var start = element.scrollTop || document.documentElement.scrollTop,
    currentTime = null;

  if(!scrollEl) start = window.scrollY || document.documentElement.scrollTop;
      
  var animateScroll = function(timestamp){
  	if (!currentTime) currentTime = timestamp;        
    var progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    var val = Math.easeInOutQuad(progress, start, final-start, duration);
    element.scrollTo(0, val);
    if(progress < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      cb && cb();
    }
  };

  window.requestAnimationFrame(animateScroll);
};

/* 
  Focus utility classes
*/

//Move focus to an element
Util.moveFocus = function (element) {
  if( !element ) element = document.getElementsByTagName("body")[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};

/* 
  Misc
*/

Util.getIndexInArray = function(array, el) {
  return Array.prototype.indexOf.call(array, el);
};

Util.cssSupports = function(property, value) {
  if('CSS' in window) {
    return CSS.supports(property, value);
  } else {
    var jsProperty = property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();});
    return jsProperty in document.body.style;
  }
};

// merge a set of user options into plugin defaults
// https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
Util.extend = function() {
  // Variables
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;

  // Check if a deep merge
  if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
    deep = arguments[0];
    i++;
  }

  // Merge the object into the extended object
  var merge = function (obj) {
    for ( var prop in obj ) {
      if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
        // If deep merge and property is an object, merge properties
        if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
          extended[prop] = extend( true, extended[prop], obj[prop] );
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for ( ; i < length; i++ ) {
    var obj = arguments[i];
    merge(obj);
  }

  return extended;
};

// Check if Reduced Motion is enabled
Util.osHasReducedMotion = function() {
  if(!window.matchMedia) return false;
  var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(matchMediaObj) return matchMediaObj.matches;
  return false; // return false if not supported
}; 

/* 
	Polyfills
*/
//Closest() method
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1); 
		return null;
	};
}

//Custom Event() constructor
if ( typeof window.CustomEvent !== "function" ) {

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
}

/* 
	Animation curves
*/
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

Math.easeInQuart = function (t, b, c, d) {
	t /= d;
	return c*t*t*t*t + b;
};

Math.easeOutQuart = function (t, b, c, d) { 
  t /= d;
	t--;
	return -c * (t*t*t*t - 1) + b;
};

Math.easeInOutQuart = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t + b;
	t -= 2;
	return -c/2 * (t*t*t*t - 2) + b;
};

Math.easeOutElastic = function (t, b, c, d) {
  var s=1.70158;var p=d*0.7;var a=c;
  if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
  if (a < Math.abs(c)) { a=c; var s=p/4; }
  else var s = p/(2*Math.PI) * Math.asin (c/a);
  return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
};


/* JS Utility Classes */

// make focus ring visible only for keyboard navigation (i.e., tab key) 
(function() {
  var focusTab = document.getElementsByClassName('js-tab-focus'),
    shouldInit = false,
    outlineStyle = false,
    eventDetected = false;

  function detectClick() {
    if(focusTab.length > 0) {
      resetFocusStyle(false);
      window.addEventListener('keydown', detectTab);
    }
    window.removeEventListener('mousedown', detectClick);
    outlineStyle = false;
    eventDetected = true;
  };

  function detectTab(event) {
    if(event.keyCode !== 9) return;
    resetFocusStyle(true);
    window.removeEventListener('keydown', detectTab);
    window.addEventListener('mousedown', detectClick);
    outlineStyle = true;
  };

  function resetFocusStyle(bool) {
    var outlineStyle = bool ? '' : 'none';
    for(var i = 0; i < focusTab.length; i++) {
      focusTab[i].style.setProperty('outline', outlineStyle);
    }
  };

  function initFocusTabs() {
    if(shouldInit) {
      if(eventDetected) resetFocusStyle(outlineStyle);
      return;
    }
    shouldInit = focusTab.length > 0;
    window.addEventListener('mousedown', detectClick);
  };

  initFocusTabs();
  window.addEventListener('initFocusTabs', initFocusTabs);
}());

function resetFocusTabsStyle() {
  window.dispatchEvent(new CustomEvent('initFocusTabs'));
};
// File#: _1_anim-menu-btn
// Usage: codyhouse.co/license
(function () {
    var menuBtns = document.getElementsByClassName('js-anim-menu-btn');
    if (menuBtns.length > 0) {
        for (var i = 0; i < menuBtns.length; i++) {
            (function (i) {
                initMenuBtn(menuBtns[i]);
            })(i);
        }

        function initMenuBtn(btn) {
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                var status = !Util.hasClass(btn, 'anim-menu-btn--state-b');
                Util.toggleClass(btn, 'anim-menu-btn--state-b', status);
                // emit custom event
                var event = new CustomEvent('anim-menu-btn-clicked', { detail: status });
                btn.dispatchEvent(event);
            });
        };
    }
}());
// File#: _1_responsive-sidebar
// Usage: codyhouse.co/license
(function () {
    var Sidebar = function (element) {
        this.element = element;
        this.triggers = document.querySelectorAll('[aria-controls="' + this.element.getAttribute('id') + '"]');
        this.firstFocusable = null;
        this.lastFocusable = null;
        this.selectedTrigger = null;
        this.showClass = "sidebar--is-visible";
        this.staticClass = "sidebar--static";
        this.customStaticClass = "";
        this.readyClass = "sidebar--loaded";
        this.contentReadyClass = "sidebar-loaded:show";
        this.layout = false; // this will be static or mobile
        this.preventScrollEl = getPreventScrollEl(this);
        getCustomStaticClass(this); // custom classes for static version
        initSidebar(this);
    };

    function getPreventScrollEl(element) {
        var scrollEl = false;
        var querySelector = element.element.getAttribute('data-sidebar-prevent-scroll');
        if (querySelector) scrollEl = document.querySelector(querySelector);
        return scrollEl;
    };

    function getCustomStaticClass(element) {
        var customClasses = element.element.getAttribute('data-static-class');
        if (customClasses) element.customStaticClass = ' ' + customClasses;
    };

    function initSidebar(sidebar) {
        initSidebarResize(sidebar); // handle changes in layout -> mobile to static and viceversa

        if (sidebar.triggers) { // open sidebar when clicking on trigger buttons - mobile layout only
            for (var i = 0; i < sidebar.triggers.length; i++) {
                sidebar.triggers[i].addEventListener('click', function (event) {
                    event.preventDefault();
                    toggleSidebar(sidebar, event.target);
                });
            }
        }

        // use the 'openSidebar' event to trigger the sidebar
        sidebar.element.addEventListener('openSidebar', function (event) {
            toggleSidebar(sidebar, event.detail);
        });
    };

    function toggleSidebar(sidebar, target) {
        if (Util.hasClass(sidebar.element, sidebar.showClass)) {
            sidebar.selectedTrigger = target;
            closeSidebar(sidebar);
            return;
        }
        sidebar.selectedTrigger = target;
        showSidebar(sidebar);
        initSidebarEvents(sidebar);
    };

    function showSidebar(sidebar) { // mobile layout only
        Util.addClass(sidebar.element, sidebar.showClass);
        getFocusableElements(sidebar);
        Util.moveFocus(sidebar.element);
        // change the overflow of the preventScrollEl
        if (sidebar.preventScrollEl) sidebar.preventScrollEl.style.overflow = 'hidden';
    };

    function closeSidebar(sidebar) { // mobile layout only
        Util.removeClass(sidebar.element, sidebar.showClass);
        sidebar.firstFocusable = null;
        sidebar.lastFocusable = null;
        if (sidebar.selectedTrigger) sidebar.selectedTrigger.focus();
        sidebar.element.removeAttribute('tabindex');
        //remove listeners
        cancelSidebarEvents(sidebar);
        // change the overflow of the preventScrollEl
        if (sidebar.preventScrollEl) sidebar.preventScrollEl.style.overflow = '';
    };

    function initSidebarEvents(sidebar) { // mobile layout only
        //add event listeners
        sidebar.element.addEventListener('keydown', handleEvent.bind(sidebar));
        sidebar.element.addEventListener('click', handleEvent.bind(sidebar));
    };

    function cancelSidebarEvents(sidebar) { // mobile layout only
        //remove event listeners
        sidebar.element.removeEventListener('keydown', handleEvent.bind(sidebar));
        sidebar.element.removeEventListener('click', handleEvent.bind(sidebar));
    };

    function handleEvent(event) { // mobile layout only
        switch (event.type) {
            case 'click': {
                initClick(this, event);
            }
            case 'keydown': {
                initKeyDown(this, event);
            }
        }
    };

    function initKeyDown(sidebar, event) { // mobile layout only
        if (event.keyCode && event.keyCode == 27 || event.key && event.key == 'Escape') {
            //close sidebar window on esc
            closeSidebar(sidebar);
        } else if (event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab') {
            //trap focus inside sidebar
            trapFocus(sidebar, event);
        }
    };

    function initClick(sidebar, event) { // mobile layout only
        //close sidebar when clicking on close button or sidebar bg layer 
        if (!event.target.closest('.js-sidebar__close-btn') && !Util.hasClass(event.target, 'js-sidebar')) return;
        event.preventDefault();
        closeSidebar(sidebar);
    };

    function trapFocus(sidebar, event) { // mobile layout only
        if (sidebar.firstFocusable == document.activeElement && event.shiftKey) {
            //on Shift+Tab -> focus last focusable element when focus moves out of sidebar
            event.preventDefault();
            sidebar.lastFocusable.focus();
        }
        if (sidebar.lastFocusable == document.activeElement && !event.shiftKey) {
            //on Tab -> focus first focusable element when focus moves out of sidebar
            event.preventDefault();
            sidebar.firstFocusable.focus();
        }
    };

    function initSidebarResize(sidebar) {
        // custom event emitted when window is resized - detect only if the sidebar--static@{breakpoint} class was added
        var beforeContent = getComputedStyle(sidebar.element, ':before').getPropertyValue('content');
        if (beforeContent && beforeContent != '' && beforeContent != 'none') {
            checkSidebarLayout(sidebar);

            sidebar.element.addEventListener('update-sidebar', function (event) {
                checkSidebarLayout(sidebar);
            });
        }
        // check if there a main element to show
        var mainContent = document.getElementsByClassName(sidebar.contentReadyClass);
        if (mainContent.length > 0) Util.removeClass(mainContent[0], sidebar.contentReadyClass);
        Util.addClass(sidebar.element, sidebar.readyClass);
    };

    function checkSidebarLayout(sidebar) {
        var layout = getComputedStyle(sidebar.element, ':before').getPropertyValue('content').replace(/\'|"/g, '');
        if (layout == sidebar.layout) return;
        sidebar.layout = layout;
        if (layout != 'static') Util.addClass(sidebar.element, 'is-hidden');
        Util.toggleClass(sidebar.element, sidebar.staticClass + sidebar.customStaticClass, layout == 'static');
        if (layout != 'static') setTimeout(function () { Util.removeClass(sidebar.element, 'is-hidden') });
        // reset element role 
        (layout == 'static') ? sidebar.element.removeAttribute('role', 'alertdialog') : sidebar.element.setAttribute('role', 'alertdialog');
        // reset mobile behaviour
        if (layout == 'static' && Util.hasClass(sidebar.element, sidebar.showClass)) closeSidebar(sidebar);
    };

    function getFocusableElements(sidebar) {
        //get all focusable elements inside the drawer
        var allFocusable = sidebar.element.querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary');
        getFirstVisible(sidebar, allFocusable);
        getLastVisible(sidebar, allFocusable);
    };

    function getFirstVisible(sidebar, elements) {
        //get first visible focusable element inside the sidebar
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length) {
                sidebar.firstFocusable = elements[i];
                return true;
            }
        }
    };

    function getLastVisible(sidebar, elements) {
        //get last visible focusable element inside the sidebar
        for (var i = elements.length - 1; i >= 0; i--) {
            if (elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length) {
                sidebar.lastFocusable = elements[i];
                return true;
            }
        }
    };

    window.Sidebar = Sidebar;

    //initialize the Sidebar objects
    var sidebar = document.getElementsByClassName('js-sidebar');
    if (sidebar.length > 0) {
        for (var i = 0; i < sidebar.length; i++) {
            (function (i) { new Sidebar(sidebar[i]); })(i);
        }
        // switch from mobile to static layout
        var customEvent = new CustomEvent('update-sidebar');
        window.addEventListener('resize', function (event) {
            (!window.requestAnimationFrame) ? setTimeout(function () { resetLayout(); }, 250) : window.requestAnimationFrame(resetLayout);
        });

        (window.requestAnimationFrame) // init sidebar layout
            ? window.requestAnimationFrame(resetLayout)
            : resetLayout();

        function resetLayout() {
            for (var i = 0; i < sidebar.length; i++) {
                (function (i) { sidebar[i].dispatchEvent(customEvent) })(i);
            };
        };
    }
}());
// File#: _1_scrolling-animations
// Usage: codyhouse.co/license
(function () {
  var ScrollFx = function (element, scrollableSelector) {
    this.element = element;
    this.options = [];
    this.boundingRect = this.element.getBoundingClientRect();
    this.windowHeight = window.innerHeight;
    this.scrollingFx = [];
    this.animating = [];
    this.deltaScrolling = [];
    this.observer = [];
    this.scrollableSelector = scrollableSelector; // if the scrollable element is not the window 
    this.scrollableElement = false;
    initScrollFx(this);
    // ToDo - option to pass two selectors to target the element start and stop animation scrolling values -> to be used for sticky/fixed elements
  };

  function initScrollFx(element) {
    // do not animate if reduced motion is on
    if (Util.osHasReducedMotion()) return;
    // get scrollable element
    setScrollableElement(element);
    // get animation params
    var animation = element.element.getAttribute('data-scroll-fx');
    if (animation) {
      element.options.push(extractAnimation(animation));
    } else {
      getAnimations(element, 1);
    }
    // set Intersection Observer
    initObserver(element);
    // update params on resize
    initResize(element);
  };

  function setScrollableElement(element) {
    if (element.scrollableSelector) element.scrollableElement = document.querySelector(element.scrollableSelector);
  };

  function initObserver(element) {
    for (var i = 0; i < element.options.length; i++) {
      (function (i) {
        element.scrollingFx[i] = false;
        element.deltaScrolling[i] = getDeltaScrolling(element, i);
        element.animating[i] = false;

        element.observer[i] = new IntersectionObserver(
          function (entries, observer) {
            scrollFxCallback(element, i, entries, observer);
          },
          {
            rootMargin: (element.options[i][5] - 100) + "% 0px " + (0 - element.options[i][4]) + "% 0px"
          }
        );

        element.observer[i].observe(element.element);

        // set initial value
        setTimeout(function () {
          animateScrollFx.bind(element, i)();
        })
      })(i);
    }
  };

  function scrollFxCallback(element, index, entries, observer) {
    if (entries[0].isIntersecting) {
      if (element.scrollingFx[index]) return; // listener for scroll event already added
      // reset delta
      resetDeltaBeforeAnim(element, index);
      triggerAnimateScrollFx(element, index);
    } else {
      if (!element.scrollingFx[index]) return; // listener for scroll event already removed
      window.removeEventListener('scroll', element.scrollingFx[index]);
      element.scrollingFx[index] = false;
    }
  };

  function triggerAnimateScrollFx(element, index) {
    element.scrollingFx[index] = animateScrollFx.bind(element, index);
    (element.scrollableElement)
      ? element.scrollableElement.addEventListener('scroll', element.scrollingFx[index])
      : window.addEventListener('scroll', element.scrollingFx[index]);
  };

  function animateScrollFx(index) {
    // if window scroll is outside the proper range -> return
    if (getScrollY(this) < this.deltaScrolling[index][0]) {
      setCSSProperty(this, index, this.options[index][1]);
      return;
    }
    if (getScrollY(this) > this.deltaScrolling[index][1]) {
      setCSSProperty(this, index, this.options[index][2]);
      return;
    }
    if (this.animating[index]) return;
    this.animating[index] = true;
    window.requestAnimationFrame(updatePropertyScroll.bind(this, index));
  };

  function updatePropertyScroll(index) { // get value
    // check if this is a theme value or a css property
    if (isNaN(this.options[index][1])) {
      // this is a theme value to update
      (getScrollY(this) >= this.deltaScrolling[index][1])
        ? setCSSProperty(this, index, this.options[index][2])
        : setCSSProperty(this, index, this.options[index][1]);
    } else {
      // this is a CSS property
      var value = this.options[index][1] + (this.options[index][2] - this.options[index][1]) * (getScrollY(this) - this.deltaScrolling[index][0]) / (this.deltaScrolling[index][1] - this.deltaScrolling[index][0]);
      // update css property
      setCSSProperty(this, index, value);
    }

    this.animating[index] = false;
  };

  function setCSSProperty(element, index, value) {
    if (isNaN(value)) {
      // this is a theme value that needs to be updated
      setThemeValue(element, value);
      return;
    }
    if (element.options[index][0] == '--scroll-fx-skew' || element.options[index][0] == '--scroll-fx-scale') {
      // set 2 different CSS properties for the transformation on both x and y axis
      element.element.style.setProperty(element.options[index][0] + '-x', value + element.options[index][3]);
      element.element.style.setProperty(element.options[index][0] + '-y', value + element.options[index][3]);
    } else {
      // set single CSS property
      element.element.style.setProperty(element.options[index][0], value + element.options[index][3]);
    }
  };

  function setThemeValue(element, value) {
    // if value is different from the theme in use -> update it
    if (element.element.getAttribute('data-theme') != value) {
      Util.addClass(element.element, 'scroll-fx--theme-transition');
      element.element.offsetWidth;
      element.element.setAttribute('data-theme', value);
      element.element.addEventListener('transitionend', function cb() {
        element.element.removeEventListener('transitionend', cb);
        Util.removeClass(element.element, 'scroll-fx--theme-transition');
      });
    }
  };

  function getAnimations(element, index) {
    var option = element.element.getAttribute('data-scroll-fx-' + index);
    if (option) {
      // multiple animations for the same element - iterate through them
      element.options.push(extractAnimation(option));
      getAnimations(element, index + 1);
    }
    return;
  };

  function extractAnimation(option) {
    var array = option.split(',').map(function (item) {
      return item.trim();
    });
    var propertyOptions = getPropertyValues(array[1], array[2]);
    var animation = [getPropertyLabel(array[0]), propertyOptions[0], propertyOptions[1], propertyOptions[2], parseInt(array[3]), parseInt(array[4])];
    return animation;
  };

  function getPropertyLabel(property) {
    var propertyCss = '--scroll-fx-';
    for (var i = 0; i < property.length; i++) {
      propertyCss = (property[i] == property[i].toUpperCase())
        ? propertyCss + '-' + property[i].toLowerCase()
        : propertyCss + property[i];
    }
    if (propertyCss == '--scroll-fx-rotate') {
      propertyCss = '--scroll-fx-rotate-z';
    } else if (propertyCss == '--scroll-fx-translate') {
      propertyCss = '--scroll-fx-translate-x';
    }
    return propertyCss;
  };

  function getPropertyValues(val1, val2) {
    var nbVal1 = parseFloat(val1),
      nbVal2 = parseFloat(val2),
      unit = val1.replace(nbVal1, '');
    if (isNaN(nbVal1)) {
      // property is a theme value
      nbVal1 = val1;
      nbVal2 = val2;
      unit = '';
    }
    return [nbVal1, nbVal2, unit];
  };

  function getDeltaScrolling(element, index) {
    // this retrieve the max and min scroll value that should trigger the animation
    var topDelta = getScrollY(element) - (element.windowHeight - (element.windowHeight + element.boundingRect.height) * element.options[index][4] / 100) + element.boundingRect.top,
      bottomDelta = getScrollY(element) - (element.windowHeight - (element.windowHeight + element.boundingRect.height) * element.options[index][5] / 100) + element.boundingRect.top;
    return [topDelta, bottomDelta];
  };

  function initResize(element) {
    var resizingId = false;
    window.addEventListener('resize', function () {
      clearTimeout(resizingId);
      resizingId = setTimeout(resetResize.bind(element), 500);
    });
    // emit custom event -> elements have been initialized
    var event = new CustomEvent('scrollFxReady');
    element.element.dispatchEvent(event);
  };

  function resetResize() {
    // on resize -> make sure to update all scrolling delta values
    this.boundingRect = this.element.getBoundingClientRect();
    this.windowHeight = window.innerHeight;
    for (var i = 0; i < this.deltaScrolling.length; i++) {
      this.deltaScrolling[i] = getDeltaScrolling(this, i);
      animateScrollFx.bind(this, i)();
    }
    // emit custom event -> elements have been resized
    var event = new CustomEvent('scrollFxResized');
    this.element.dispatchEvent(event);
  };

  function resetDeltaBeforeAnim(element, index) {
    element.boundingRect = element.element.getBoundingClientRect();
    element.windowHeight = window.innerHeight;
    element.deltaScrolling[index] = getDeltaScrolling(element, index);
  };

  function getScrollY(element) {
    if (!element.scrollableElement) return window.scrollY;
    return element.scrollableElement.scrollTop;
  }

  window.ScrollFx = ScrollFx;

  var scrollFx = document.getElementsByClassName('js-scroll-fx');
  for (var i = 0; i < scrollFx.length; i++) {
    (function (i) {
      var scrollableElement = scrollFx[i].getAttribute('data-scrollable-element');
      new ScrollFx(scrollFx[i], scrollableElement);
    })(i);
  }
}());
// File#: _1_sliding-panels
// Usage: codyhouse.co/license
(function () {
  var SlidingPanels = function (element) {
    this.element = element;
    this.itemsList = this.element.getElementsByClassName('js-s-panels__projects-list');
    this.items = this.itemsList[0].getElementsByClassName('js-s-panels__project-preview');
    this.navigationToggle = this.element.getElementsByClassName('js-s-panels__nav-control');
    this.navigation = this.element.getElementsByClassName('js-s-panels__nav-wrapper');
    this.transitionLayer = this.element.getElementsByClassName('js-s-panels__overlay-layer');
    this.selectedSection = false; // will be used to store the visible project content section
    this.animating = false;
    // aria labels for the navigationToggle button
    this.toggleAriaLabels = ['Toggle navigation', 'Close Project'];
    initSlidingPanels(this);
  };

  function initSlidingPanels(element) {
    // detect click on toggle menu
    if (element.navigationToggle.length > 0 && element.navigation.length > 0) {
      element.navigationToggle[0].addEventListener('click', function (event) {
        if (element.animating) return;

        // if project is open -> close project
        if (closeProjectIfVisible(element)) return;

        // toggle navigation
        var openNav = Util.hasClass(element.navigation[0], 'is-hidden');
        toggleNavigation(element, openNav);
      });
    }

    // open project
    element.element.addEventListener('click', function (event) {
      if (element.animating) return;

      var link = event.target.closest('.js-s-panels__project-control');
      if (!link) return;
      event.preventDefault();
      openProject(element, event.target.closest('.js-s-panels__project-preview'), link.getAttribute('href').replace('#', ''));
    });
  };

  // check if there's a visible project to close and close it
  function closeProjectIfVisible(element) {
    var visibleProject = element.element.getElementsByClassName('s-panels__project-preview--selected');
    if (visibleProject.length > 0) {
      element.animating = true;
      closeProject(element);
      return true;
    }

    return false;
  };

  function toggleNavigation(element, openNavigation) {
    element.animating = true;
    if (openNavigation) Util.removeClass(element.navigation[0], 'is-hidden');
    slideProjects(element, openNavigation, false, function () {
      element.animating = false;
      if (!openNavigation) Util.addClass(element.navigation[0], 'is-hidden');
    });
    Util.toggleClass(element.navigationToggle[0], 's-panels__nav-control--arrow-down', openNavigation);
  };

  function openProject(element, project, id) {
    element.animating = true;
    var projectIndex = Util.getIndexInArray(element.items, project);
    // hide navigation
    Util.removeClass(element.itemsList[0], 'bg-opacity-0');
    // expand selected projects
    Util.addClass(project, 's-panels__project-preview--selected');
    // hide remaining projects
    slideProjects(element, true, projectIndex, function () {
      // reveal section content
      element.selectedSection = document.getElementById(id);
      if (element.selectedSection) Util.removeClass(element.selectedSection, 'is-hidden');
      element.animating = false;
      // trigger a custom event - this can be used to init the project content (if required)
      element.element.dispatchEvent(new CustomEvent('slidingPanelOpen', { detail: projectIndex }));
    });
    // modify toggle button appearance
    Util.addClass(element.navigationToggle[0], 's-panels__nav-control--close');
    // modify toggle button aria-label
    element.navigationToggle[0].setAttribute('aria-label', element.toggleAriaLabels[1]);
  };

  function closeProject(element) {
    // remove transitions from projects
    toggleTransitionProjects(element, true);
    // hide navigation
    Util.removeClass(element.itemsList[0], 'bg-opacity-0');
    // reveal transition layer
    Util.addClass(element.transitionLayer[0], 's-panels__overlay-layer--visible');
    // wait for end of transition layer effect
    element.transitionLayer[0].addEventListener('transitionend', function cb(event) {
      if (event.propertyName != 'opacity') return;
      element.transitionLayer[0].removeEventListener('transitionend', cb);
      // update projects classes
      resetProjects(element);

      setTimeout(function () {
        // hide transition layer
        Util.removeClass(element.transitionLayer[0], 's-panels__overlay-layer--visible');
        // reveal projects
        slideProjects(element, false, false, function () {
          Util.addClass(element.itemsList[0], 'bg-opacity-0');
          element.animating = false;
        });
      }, 200);
    });

    // modify toggle button appearance
    Util.removeClass(element.navigationToggle[0], 's-panels__nav-control--close');
    // modify toggle button aria-label
    element.navigationToggle[0].setAttribute('aria-label', element.toggleAriaLabels[0]);
  };

  function slideProjects(element, openNav, exclude, cb) {
    // projects will slide out in a random order
    var randomList = getRandomList(element.items.length, exclude);
    for (var i = 0; i < randomList.length; i++) {
      (function (i) {
        setTimeout(function () {
          Util.toggleClass(element.items[randomList[i]], 's-panels__project-preview--hide', openNav);
          toggleProjectAccessibility(element.items[randomList[i]], openNav);
          if (cb && i == randomList.length - 1) {
            // last item to be animated -> execute callback function at the end of the animation
            element.items[randomList[i]].addEventListener('transitionend', function cbt() {
              if (event.propertyName != 'transform') return;
              if (cb) cb();
              element.items[randomList[i]].removeEventListener('transitionend', cbt);
            });
          }
        }, i * 100);
      })(i);
    }
  };

  function toggleTransitionProjects(element, bool) {
    // remove transitions from project elements
    for (var i = 0; i < element.items.length; i++) {
      Util.toggleClass(element.items[i], 's-panels__project-preview--no-transition', bool);
    }
  };

  function resetProjects(element) {
    // reset projects classes -> remove selected/no-transition class + add hide class
    for (var i = 0; i < element.items.length; i++) {
      Util.removeClass(element.items[i], 's-panels__project-preview--selected s-panels__project-preview--no-transition');
      Util.addClass(element.items[i], 's-panels__project-preview--hide');
    }

    // hide project content
    if (element.selectedSection) Util.addClass(element.selectedSection, 'is-hidden');
    element.selectedSection = false;
  };

  function getRandomList(maxVal, exclude) {
    // get list of random integer from 0 to (maxVal - 1) excluding (exclude) if defined
    var uniqueRandoms = [];
    var randomArray = [];

    function makeUniqueRandom() {
      // refill the array if needed
      if (!uniqueRandoms.length) {
        for (var i = 0; i < maxVal; i++) {
          if (exclude === false || i != exclude) uniqueRandoms.push(i);
        }
      }
      var index = Math.floor(Math.random() * uniqueRandoms.length);
      var val = uniqueRandoms[index];
      // now remove that value from the array
      uniqueRandoms.splice(index, 1);
      return val;
    }

    for (var j = 0; j < maxVal; j++) {
      randomArray.push(makeUniqueRandom());
    }

    return randomArray;
  };

  function toggleProjectAccessibility(project, bool) {
    bool ? project.setAttribute('aria-hidden', 'true') : project.removeAttribute('aria-hidden');
    var link = project.getElementsByClassName('js-s-panels__project-control');
    if (link.length > 0) {
      bool ? link[0].setAttribute('tabindex', '-1') : link[0].removeAttribute('tabindex');
    }
  };

  //initialize the SlidingPanels objects
  var slidingPanels = document.getElementsByClassName('js-s-panels');
  if (slidingPanels.length > 0) {
    for (var i = 0; i < slidingPanels.length; i++) {
      (function (i) { new SlidingPanels(slidingPanels[i]); })(i);
    }
  }
}());
// File#: _1_swipe-content
(function () {
	var SwipeContent = function (element) {
		this.element = element;
		this.delta = [false, false];
		this.dragging = false;
		this.intervalId = false;
		initSwipeContent(this);
	};

	function initSwipeContent(content) {
		content.element.addEventListener('mousedown', handleEvent.bind(content));
		content.element.addEventListener('touchstart', handleEvent.bind(content), { passive: true });
	};

	function initDragging(content) {
		//add event listeners
		content.element.addEventListener('mousemove', handleEvent.bind(content));
		content.element.addEventListener('touchmove', handleEvent.bind(content), { passive: true });
		content.element.addEventListener('mouseup', handleEvent.bind(content));
		content.element.addEventListener('mouseleave', handleEvent.bind(content));
		content.element.addEventListener('touchend', handleEvent.bind(content));
	};

	function cancelDragging(content) {
		//remove event listeners
		if (content.intervalId) {
			(!window.requestAnimationFrame) ? clearInterval(content.intervalId) : window.cancelAnimationFrame(content.intervalId);
			content.intervalId = false;
		}
		content.element.removeEventListener('mousemove', handleEvent.bind(content));
		content.element.removeEventListener('touchmove', handleEvent.bind(content));
		content.element.removeEventListener('mouseup', handleEvent.bind(content));
		content.element.removeEventListener('mouseleave', handleEvent.bind(content));
		content.element.removeEventListener('touchend', handleEvent.bind(content));
	};

	function handleEvent(event) {
		switch (event.type) {
			case 'mousedown':
			case 'touchstart':
				startDrag(this, event);
				break;
			case 'mousemove':
			case 'touchmove':
				drag(this, event);
				break;
			case 'mouseup':
			case 'mouseleave':
			case 'touchend':
				endDrag(this, event);
				break;
		}
	};

	function startDrag(content, event) {
		content.dragging = true;
		// listen to drag movements
		initDragging(content);
		content.delta = [parseInt(unify(event).clientX), parseInt(unify(event).clientY)];
		// emit drag start event
		emitSwipeEvents(content, 'dragStart', content.delta, event.target);
	};

	function endDrag(content, event) {
		cancelDragging(content);
		// credits: https://css-tricks.com/simple-swipe-with-vanilla-javascript/
		var dx = parseInt(unify(event).clientX),
			dy = parseInt(unify(event).clientY);

		// check if there was a left/right swipe
		if (content.delta && (content.delta[0] || content.delta[0] === 0)) {
			var s = getSign(dx - content.delta[0]);

			if (Math.abs(dx - content.delta[0]) > 30) {
				(s < 0) ? emitSwipeEvents(content, 'swipeLeft', [dx, dy]) : emitSwipeEvents(content, 'swipeRight', [dx, dy]);
			}

			content.delta[0] = false;
		}
		// check if there was a top/bottom swipe
		if (content.delta && (content.delta[1] || content.delta[1] === 0)) {
			var y = getSign(dy - content.delta[1]);

			if (Math.abs(dy - content.delta[1]) > 30) {
				(y < 0) ? emitSwipeEvents(content, 'swipeUp', [dx, dy]) : emitSwipeEvents(content, 'swipeDown', [dx, dy]);
			}

			content.delta[1] = false;
		}
		// emit drag end event
		emitSwipeEvents(content, 'dragEnd', [dx, dy]);
		content.dragging = false;
	};

	function drag(content, event) {
		if (!content.dragging) return;
		// emit dragging event with coordinates
		(!window.requestAnimationFrame)
			? content.intervalId = setTimeout(function () { emitDrag.bind(content, event); }, 250)
			: content.intervalId = window.requestAnimationFrame(emitDrag.bind(content, event));
	};

	function emitDrag(event) {
		emitSwipeEvents(this, 'dragging', [parseInt(unify(event).clientX), parseInt(unify(event).clientY)]);
	};

	function unify(event) {
		// unify mouse and touch events
		return event.changedTouches ? event.changedTouches[0] : event;
	};

	function emitSwipeEvents(content, eventName, detail, el) {
		var trigger = false;
		if (el) trigger = el;
		// emit event with coordinates
		var event = new CustomEvent(eventName, { detail: { x: detail[0], y: detail[1], origin: trigger } });
		content.element.dispatchEvent(event);
	};

	function getSign(x) {
		if (!Math.sign) {
			return ((x > 0) - (x < 0)) || +x;
		} else {
			return Math.sign(x);
		}
	};

	window.SwipeContent = SwipeContent;

	//initialize the SwipeContent objects
	var swipe = document.getElementsByClassName('js-swipe-content');
	if (swipe.length > 0) {
		for (var i = 0; i < swipe.length; i++) {
			(function (i) { new SwipeContent(swipe[i]); })(i);
		}
	}
}());
// File#: _2_carousel
// Usage: codyhouse.co/license
(function () {
  var Carousel = function (opts) {
    this.options = Util.extend(Carousel.defaults, opts);
    this.element = this.options.element;
    this.listWrapper = this.element.getElementsByClassName('carousel__wrapper')[0];
    this.list = this.element.getElementsByClassName('carousel__list')[0];
    this.items = this.element.getElementsByClassName('carousel__item');
    this.initItems = []; // store only the original elements - will need this for cloning
    this.itemsNb = this.items.length; //original number of items
    this.visibItemsNb = 1; // tot number of visible items
    this.itemsWidth = 1; // this will be updated with the right width of items
    this.itemOriginalWidth = false; // store the initial width to use it on resize
    this.selectedItem = 0; // index of first visible item 
    this.translateContainer = 0; // this will be the amount the container has to be translated each time a new group has to be shown (negative)
    this.containerWidth = 0; // this will be used to store the total width of the carousel (including the overflowing part)
    this.ariaLive = false;
    // navigation
    this.controls = this.element.getElementsByClassName('js-carousel__control');
    this.animating = false;
    // autoplay
    this.autoplayId = false;
    this.autoplayPaused = false;
    //drag
    this.dragStart = false;
    // resize
    this.resizeId = false;
    // used to re-initialize js
    this.cloneList = [];
    // store items min-width
    this.itemAutoSize = false;
    // store translate value (loop = off)
    this.totTranslate = 0;
    // modify loop option if navigation is on
    if (this.options.nav) this.options.loop = false;
    // store counter elements (if present)
    this.counter = this.element.getElementsByClassName('js-carousel__counter');
    this.counterTor = this.element.getElementsByClassName('js-carousel__counter-tot');
    initCarouselLayout(this); // get number visible items + width items
    setItemsWidth(this, true);
    insertBefore(this, this.visibItemsNb); // insert clones before visible elements
    updateCarouselClones(this); // insert clones after visible elements
    resetItemsTabIndex(this); // make sure not visible items are not focusable
    initAriaLive(this); // set aria-live region for SR
    initCarouselEvents(this); // listen to events
    initCarouselCounter(this);
    Util.addClass(this.element, 'carousel--loaded');
  };

  //public carousel functions
  Carousel.prototype.showNext = function () {
    showNextItems(this);
  };

  Carousel.prototype.showPrev = function () {
    showPrevItems(this);
  };

  Carousel.prototype.startAutoplay = function () {
    startAutoplay(this);
  };

  Carousel.prototype.pauseAutoplay = function () {
    pauseAutoplay(this);
  };

  //private carousel functions
  function initCarouselLayout(carousel) {
    // evaluate size of single elements + number of visible elements
    var itemStyle = window.getComputedStyle(carousel.items[0]),
      containerStyle = window.getComputedStyle(carousel.listWrapper),
      itemWidth = parseFloat(itemStyle.getPropertyValue('width')),
      itemMargin = parseFloat(itemStyle.getPropertyValue('margin-right')),
      containerPadding = parseFloat(containerStyle.getPropertyValue('padding-left')),
      containerWidth = parseFloat(containerStyle.getPropertyValue('width'));

    if (!carousel.itemAutoSize) {
      carousel.itemAutoSize = itemWidth;
    }

    // if carousel.listWrapper is hidden -> make sure to retrieve the proper width
    containerWidth = getCarouselWidth(carousel, containerWidth);

    if (!carousel.itemOriginalWidth) { // on resize -> use initial width of items to recalculate 
      carousel.itemOriginalWidth = itemWidth;
    } else {
      itemWidth = carousel.itemOriginalWidth;
    }

    if (carousel.itemAutoSize) {
      carousel.itemOriginalWidth = parseInt(carousel.itemAutoSize);
      itemWidth = carousel.itemOriginalWidth;
    }
    // make sure itemWidth is smaller than container width
    if (containerWidth < itemWidth) {
      carousel.itemOriginalWidth = containerWidth
      itemWidth = carousel.itemOriginalWidth;
    }
    // get proper width of elements
    carousel.visibItemsNb = parseInt((containerWidth - 2 * containerPadding + itemMargin) / (itemWidth + itemMargin));
    carousel.itemsWidth = parseFloat((((containerWidth - 2 * containerPadding + itemMargin) / carousel.visibItemsNb) - itemMargin).toFixed(1));
    carousel.containerWidth = (carousel.itemsWidth + itemMargin) * carousel.items.length;
    carousel.translateContainer = 0 - ((carousel.itemsWidth + itemMargin) * carousel.visibItemsNb);
    // flexbox fallback
    if (!flexSupported) carousel.list.style.width = (carousel.itemsWidth + itemMargin) * carousel.visibItemsNb * 3 + 'px';

    // this is used when loop == off
    carousel.totTranslate = 0 - carousel.selectedItem * (carousel.itemsWidth + itemMargin);
    if (carousel.items.length <= carousel.visibItemsNb) carousel.totTranslate = 0;

    centerItems(carousel); // center items if carousel.items.length < visibItemsNb
    alignControls(carousel); // check if controls need to be aligned to a different element
  };

  function setItemsWidth(carousel, bool) {
    for (var i = 0; i < carousel.items.length; i++) {
      carousel.items[i].style.width = carousel.itemsWidth + "px";
      if (bool) carousel.initItems.push(carousel.items[i]);
    }
  };

  function updateCarouselClones(carousel) {
    if (!carousel.options.loop) return;
    // take care of clones after visible items (needs to run after the update of clones before visible items)
    if (carousel.items.length < carousel.visibItemsNb * 3) {
      insertAfter(carousel, carousel.visibItemsNb * 3 - carousel.items.length, carousel.items.length - carousel.visibItemsNb * 2);
    } else if (carousel.items.length > carousel.visibItemsNb * 3) {
      removeClones(carousel, carousel.visibItemsNb * 3, carousel.items.length - carousel.visibItemsNb * 3);
    }
    // set proper translate value for the container
    setTranslate(carousel, 'translateX(' + carousel.translateContainer + 'px)');
  };

  function initCarouselEvents(carousel) {
    // listen for click on previous/next arrow
    // dots navigation
    if (carousel.options.nav) {
      carouselCreateNavigation(carousel);
      carouselInitNavigationEvents(carousel);
    }

    if (carousel.controls.length > 0) {
      carousel.controls[0].addEventListener('click', function (event) {
        event.preventDefault();
        showPrevItems(carousel);
        updateAriaLive(carousel);
      });
      carousel.controls[1].addEventListener('click', function (event) {
        event.preventDefault();
        showNextItems(carousel);
        updateAriaLive(carousel);
      });

      // update arrow visility -> loop == off only
      resetCarouselControls(carousel);
      // emit custom event - items visible
      emitCarouselActiveItemsEvent(carousel)
    }
    // autoplay
    if (carousel.options.autoplay) {
      startAutoplay(carousel);
      // pause autoplay if user is interacting with the carousel
      if (!carousel.options.autoplayOnHover) {
        carousel.element.addEventListener('mouseenter', function (event) {
          pauseAutoplay(carousel);
          carousel.autoplayPaused = true;
        });
        carousel.element.addEventListener('mouseleave', function (event) {
          carousel.autoplayPaused = false;
          startAutoplay(carousel);
        });
      }
      if (!carousel.options.autoplayOnFocus) {
        carousel.element.addEventListener('focusin', function (event) {
          pauseAutoplay(carousel);
          carousel.autoplayPaused = true;
        });

        carousel.element.addEventListener('focusout', function (event) {
          carousel.autoplayPaused = false;
          startAutoplay(carousel);
        });
      }
    }
    // drag events
    if (carousel.options.drag && window.requestAnimationFrame) {
      //init dragging
      new SwipeContent(carousel.element);
      carousel.element.addEventListener('dragStart', function (event) {
        if (event.detail.origin && event.detail.origin.closest('.js-carousel__control')) return;
        if (event.detail.origin && event.detail.origin.closest('.js-carousel__navigation')) return;
        if (event.detail.origin && !event.detail.origin.closest('.carousel__wrapper')) return;
        Util.addClass(carousel.element, 'carousel--is-dragging');
        pauseAutoplay(carousel);
        carousel.dragStart = event.detail.x;
        animateDragEnd(carousel);
      });
      carousel.element.addEventListener('dragging', function (event) {
        if (!carousel.dragStart) return;
        if (carousel.animating || Math.abs(event.detail.x - carousel.dragStart) < 10) return;
        var translate = event.detail.x - carousel.dragStart + carousel.translateContainer;
        if (!carousel.options.loop) {
          translate = event.detail.x - carousel.dragStart + carousel.totTranslate;
        }
        setTranslate(carousel, 'translateX(' + translate + 'px)');
      });
    }
    // reset on resize
    window.addEventListener('resize', function (event) {
      pauseAutoplay(carousel);
      clearTimeout(carousel.resizeId);
      carousel.resizeId = setTimeout(function () {
        resetCarouselResize(carousel);
        // reset dots navigation
        resetDotsNavigation(carousel);
        resetCarouselControls(carousel);
        setCounterItem(carousel);
        startAutoplay(carousel);
        centerItems(carousel); // center items if carousel.items.length < visibItemsNb
        alignControls(carousel);
        // emit custom event - items visible
        emitCarouselActiveItemsEvent(carousel)
      }, 250)
    });
    // keyboard navigation
    carousel.element.addEventListener('keydown', function (event) {
      if (event.keyCode && event.keyCode == 39 || event.key && event.key.toLowerCase() == 'arrowright') {
        carousel.showNext();
      } else if (event.keyCode && event.keyCode == 37 || event.key && event.key.toLowerCase() == 'arrowleft') {
        carousel.showPrev();
      }
    });
  };

  function showPrevItems(carousel) {
    if (carousel.animating) return;
    carousel.animating = true;
    carousel.selectedItem = getIndex(carousel, carousel.selectedItem - carousel.visibItemsNb);
    animateList(carousel, '0', 'prev');
  };

  function showNextItems(carousel) {
    if (carousel.animating) return;
    carousel.animating = true;
    carousel.selectedItem = getIndex(carousel, carousel.selectedItem + carousel.visibItemsNb);
    animateList(carousel, carousel.translateContainer * 2 + 'px', 'next');
  };

  function animateDragEnd(carousel) { // end-of-dragging animation
    carousel.element.addEventListener('dragEnd', function cb(event) {
      carousel.element.removeEventListener('dragEnd', cb);
      Util.removeClass(carousel.element, 'carousel--is-dragging');
      if (event.detail.x - carousel.dragStart < -40) {
        carousel.animating = false;
        showNextItems(carousel);
      } else if (event.detail.x - carousel.dragStart > 40) {
        carousel.animating = false;
        showPrevItems(carousel);
      } else if (event.detail.x - carousel.dragStart == 0) { // this is just a click -> no dragging
        return;
      } else { // not dragged enought -> do not update carousel, just reset
        carousel.animating = true;
        animateList(carousel, carousel.translateContainer + 'px', false);
      }
      carousel.dragStart = false;
    });
  };

  function animateList(carousel, translate, direction) { // takes care of changing visible items
    pauseAutoplay(carousel);
    Util.addClass(carousel.list, 'carousel__list--animating');
    var initTranslate = carousel.totTranslate;
    if (!carousel.options.loop) {
      translate = noLoopTranslateValue(carousel, direction);
    }
    setTimeout(function () { setTranslate(carousel, 'translateX(' + translate + ')'); });
    if (transitionSupported) {
      carousel.list.addEventListener('transitionend', function cb(event) {
        if (event.propertyName && event.propertyName != 'transform') return;
        Util.removeClass(carousel.list, 'carousel__list--animating');
        carousel.list.removeEventListener('transitionend', cb);
        animateListCb(carousel, direction);
      });
    } else {
      animateListCb(carousel, direction);
    }
    if (!carousel.options.loop && (initTranslate == carousel.totTranslate)) {
      // translate value was not updated -> trigger transitionend event to restart carousel
      carousel.list.dispatchEvent(new CustomEvent('transitionend'));
    }
    resetCarouselControls(carousel);
    setCounterItem(carousel);
    // emit custom event - items visible
    emitCarouselActiveItemsEvent(carousel)
  };

  function noLoopTranslateValue(carousel, direction) {
    var translate = carousel.totTranslate;
    if (direction == 'next') {
      translate = carousel.totTranslate + carousel.translateContainer;
    } else if (direction == 'prev') {
      translate = carousel.totTranslate - carousel.translateContainer;
    } else if (direction == 'click') {
      translate = carousel.selectedDotIndex * carousel.translateContainer;
    }
    if (translate > 0) {
      translate = 0;
      carousel.selectedItem = 0;
    }
    if (translate < - carousel.translateContainer - carousel.containerWidth) {
      translate = - carousel.translateContainer - carousel.containerWidth;
      carousel.selectedItem = carousel.items.length - carousel.visibItemsNb;
    }
    if (carousel.visibItemsNb > carousel.items.length) translate = 0;
    carousel.totTranslate = translate;
    return translate + 'px';
  };

  function animateListCb(carousel, direction) { // reset actions after carousel has been updated
    if (direction) updateClones(carousel, direction);
    carousel.animating = false;
    // reset autoplay
    startAutoplay(carousel);
    // reset tab index
    resetItemsTabIndex(carousel);
  };

  function updateClones(carousel, direction) {
    if (!carousel.options.loop) return;
    // at the end of each animation, we need to update the clones before and after the visible items
    var index = (direction == 'next') ? 0 : carousel.items.length - carousel.visibItemsNb;
    // remove clones you do not need anymore
    removeClones(carousel, index, false);
    // add new clones 
    (direction == 'next') ? insertAfter(carousel, carousel.visibItemsNb, 0) : insertBefore(carousel, carousel.visibItemsNb);
    //reset transform
    setTranslate(carousel, 'translateX(' + carousel.translateContainer + 'px)');
  };

  function insertBefore(carousel, nb, delta) {
    if (!carousel.options.loop) return;
    var clones = document.createDocumentFragment();
    var start = 0;
    if (delta) start = delta;
    for (var i = start; i < nb; i++) {
      var index = getIndex(carousel, carousel.selectedItem - i - 1),
        clone = carousel.initItems[index].cloneNode(true);
      Util.addClass(clone, 'js-clone');
      clones.insertBefore(clone, clones.firstChild);
    }
    carousel.list.insertBefore(clones, carousel.list.firstChild);
    emitCarouselUpdateEvent(carousel);
  };

  function insertAfter(carousel, nb, init) {
    if (!carousel.options.loop) return;
    var clones = document.createDocumentFragment();
    for (var i = init; i < nb + init; i++) {
      var index = getIndex(carousel, carousel.selectedItem + carousel.visibItemsNb + i),
        clone = carousel.initItems[index].cloneNode(true);
      Util.addClass(clone, 'js-clone');
      clones.appendChild(clone);
    }
    carousel.list.appendChild(clones);
    emitCarouselUpdateEvent(carousel);
  };

  function removeClones(carousel, index, bool) {
    if (!carousel.options.loop) return;
    if (!bool) {
      bool = carousel.visibItemsNb;
    }
    for (var i = 0; i < bool; i++) {
      if (carousel.items[index]) carousel.list.removeChild(carousel.items[index]);
    }
  };

  function resetCarouselResize(carousel) { // reset carousel on resize
    var visibleItems = carousel.visibItemsNb;
    // get new items min-width value
    resetItemAutoSize(carousel);
    initCarouselLayout(carousel);
    setItemsWidth(carousel, false);
    resetItemsWidth(carousel); // update the array of original items -> array used to create clones
    if (carousel.options.loop) {
      if (visibleItems > carousel.visibItemsNb) {
        removeClones(carousel, 0, visibleItems - carousel.visibItemsNb);
      } else if (visibleItems < carousel.visibItemsNb) {
        insertBefore(carousel, carousel.visibItemsNb, visibleItems);
      }
      updateCarouselClones(carousel); // this will take care of translate + after elements
    } else {
      // reset default translate to a multiple value of (itemWidth + margin)
      var translate = noLoopTranslateValue(carousel);
      setTranslate(carousel, 'translateX(' + translate + ')');
    }
    resetItemsTabIndex(carousel); // reset focusable elements
  };

  function resetItemAutoSize(carousel) {
    if (!cssPropertiesSupported) return;
    // remove inline style
    carousel.items[0].removeAttribute('style');
    // get original item width 
    carousel.itemAutoSize = getComputedStyle(carousel.items[0]).getPropertyValue('width');
  };

  function resetItemsWidth(carousel) {
    for (var i = 0; i < carousel.initItems.length; i++) {
      carousel.initItems[i].style.width = carousel.itemsWidth + "px";
    }
  };

  function resetItemsTabIndex(carousel) {
    var carouselActive = carousel.items.length > carousel.visibItemsNb;
    var j = carousel.items.length;
    for (var i = 0; i < carousel.items.length; i++) {
      if (carousel.options.loop) {
        if (i < carousel.visibItemsNb || i >= 2 * carousel.visibItemsNb) {
          carousel.items[i].setAttribute('tabindex', '-1');
        } else {
          if (i < j) j = i;
          carousel.items[i].removeAttribute('tabindex');
        }
      } else {
        if ((i < carousel.selectedItem || i >= carousel.selectedItem + carousel.visibItemsNb) && carouselActive) {
          carousel.items[i].setAttribute('tabindex', '-1');
        } else {
          if (i < j) j = i;
          carousel.items[i].removeAttribute('tabindex');
        }
      }
    }
    resetVisibilityOverflowItems(carousel, j);
  };

  function startAutoplay(carousel) {
    if (carousel.options.autoplay && !carousel.autoplayId && !carousel.autoplayPaused) {
      carousel.autoplayId = setInterval(function () {
        showNextItems(carousel);
      }, carousel.options.autoplayInterval);
    }
  };

  function pauseAutoplay(carousel) {
    if (carousel.options.autoplay) {
      clearInterval(carousel.autoplayId);
      carousel.autoplayId = false;
    }
  };

  function initAriaLive(carousel) { // create an aria-live region for SR
    if (!carousel.options.ariaLive) return;
    // create an element that will be used to announce the new visible slide to SR
    var srLiveArea = document.createElement('div');
    Util.setAttributes(srLiveArea, { 'class': 'sr-only js-carousel__aria-live', 'aria-live': 'polite', 'aria-atomic': 'true' });
    carousel.element.appendChild(srLiveArea);
    carousel.ariaLive = srLiveArea;
  };

  function updateAriaLive(carousel) { // announce to SR which items are now visible
    if (!carousel.options.ariaLive) return;
    carousel.ariaLive.innerHTML = 'Item ' + (carousel.selectedItem + 1) + ' selected. ' + carousel.visibItemsNb + ' items of ' + carousel.initItems.length + ' visible';
  };

  function getIndex(carousel, index) {
    if (index < 0) index = getPositiveValue(index, carousel.itemsNb);
    if (index >= carousel.itemsNb) index = index % carousel.itemsNb;
    return index;
  };

  function getPositiveValue(value, add) {
    value = value + add;
    if (value > 0) return value;
    else return getPositiveValue(value, add);
  };

  function setTranslate(carousel, translate) {
    carousel.list.style.transform = translate;
    carousel.list.style.msTransform = translate;
  };

  function getCarouselWidth(carousel, computedWidth) { // retrieve carousel width if carousel is initially hidden
    var closestHidden = carousel.listWrapper.closest('.sr-only');
    if (closestHidden) { // carousel is inside an .sr-only (visually hidden) element
      Util.removeClass(closestHidden, 'sr-only');
      computedWidth = carousel.listWrapper.offsetWidth;
      Util.addClass(closestHidden, 'sr-only');
    } else if (isNaN(computedWidth)) {
      computedWidth = getHiddenParentWidth(carousel.element, carousel);
    }
    return computedWidth;
  };

  function getHiddenParentWidth(element, carousel) {
    var parent = element.parentElement;
    if (parent.tagName.toLowerCase() == 'html') return 0;
    var style = window.getComputedStyle(parent);
    if (style.display == 'none' || style.visibility == 'hidden') {
      parent.setAttribute('style', 'display: block!important; visibility: visible!important;');
      var computedWidth = carousel.listWrapper.offsetWidth;
      parent.style.display = '';
      parent.style.visibility = '';
      return computedWidth;
    } else {
      return getHiddenParentWidth(parent, carousel);
    }
  };

  function resetCarouselControls(carousel) {
    if (carousel.options.loop) return;
    // update arrows status
    if (carousel.controls.length > 0) {
      (carousel.totTranslate == 0)
        ? carousel.controls[0].setAttribute('disabled', true)
        : carousel.controls[0].removeAttribute('disabled');
      (carousel.totTranslate == (- carousel.translateContainer - carousel.containerWidth) || carousel.items.length <= carousel.visibItemsNb)
        ? carousel.controls[1].setAttribute('disabled', true)
        : carousel.controls[1].removeAttribute('disabled');
    }
    // update carousel dots
    if (carousel.options.nav) {
      var selectedDot = carousel.navigation.getElementsByClassName(carousel.options.navigationItemClass + '--selected');
      if (selectedDot.length > 0) Util.removeClass(selectedDot[0], carousel.options.navigationItemClass + '--selected');

      var newSelectedIndex = getSelectedDot(carousel);
      if (carousel.totTranslate == (- carousel.translateContainer - carousel.containerWidth)) {
        newSelectedIndex = carousel.navDots.length - 1;
      }
      Util.addClass(carousel.navDots[newSelectedIndex], carousel.options.navigationItemClass + '--selected');
    }

    (carousel.totTranslate == 0 && (carousel.totTranslate == (- carousel.translateContainer - carousel.containerWidth) || carousel.items.length <= carousel.visibItemsNb))
      ? Util.addClass(carousel.element, 'carousel--hide-controls')
      : Util.removeClass(carousel.element, 'carousel--hide-controls');
  };

  function emitCarouselUpdateEvent(carousel) {
    carousel.cloneList = [];
    var clones = carousel.element.querySelectorAll('.js-clone');
    for (var i = 0; i < clones.length; i++) {
      Util.removeClass(clones[i], 'js-clone');
      carousel.cloneList.push(clones[i]);
    }
    emitCarouselEvents(carousel, 'carousel-updated', carousel.cloneList);
  };

  function carouselCreateNavigation(carousel) {
    if (carousel.element.getElementsByClassName('js-carousel__navigation').length > 0) return;

    var navigation = document.createElement('ol'),
      navChildren = '';

    var navClasses = carousel.options.navigationClass + ' js-carousel__navigation';
    if (carousel.items.length <= carousel.visibItemsNb) {
      navClasses = navClasses + ' is-hidden';
    }
    navigation.setAttribute('class', navClasses);

    var dotsNr = Math.ceil(carousel.items.length / carousel.visibItemsNb),
      selectedDot = getSelectedDot(carousel),
      indexClass = carousel.options.navigationPagination ? '' : 'sr-only'
    for (var i = 0; i < dotsNr; i++) {
      var className = (i == selectedDot) ? 'class="' + carousel.options.navigationItemClass + ' ' + carousel.options.navigationItemClass + '--selected js-carousel__nav-item"' : 'class="' + carousel.options.navigationItemClass + ' js-carousel__nav-item"';
      navChildren = navChildren + '<li ' + className + '><button class="reset js-tab-focus" style="outline: none;"><span class="' + indexClass + '">' + (i + 1) + '</span></button></li>';
    }
    navigation.innerHTML = navChildren;
    carousel.element.appendChild(navigation);
  };

  function carouselInitNavigationEvents(carousel) {
    carousel.navigation = carousel.element.getElementsByClassName('js-carousel__navigation')[0];
    carousel.navDots = carousel.element.getElementsByClassName('js-carousel__nav-item');
    carousel.navIdEvent = carouselNavigationClick.bind(carousel);
    carousel.navigation.addEventListener('click', carousel.navIdEvent);
  };

  function carouselRemoveNavigation(carousel) {
    if (carousel.navigation) carousel.element.removeChild(carousel.navigation);
    if (carousel.navIdEvent) carousel.navigation.removeEventListener('click', carousel.navIdEvent);
  };

  function resetDotsNavigation(carousel) {
    if (!carousel.options.nav) return;
    carouselRemoveNavigation(carousel);
    carouselCreateNavigation(carousel);
    carouselInitNavigationEvents(carousel);
  };

  function carouselNavigationClick(event) {
    var dot = event.target.closest('.js-carousel__nav-item');
    if (!dot) return;
    if (this.animating) return;
    this.animating = true;
    var index = Util.getIndexInArray(this.navDots, dot);
    this.selectedDotIndex = index;
    this.selectedItem = index * this.visibItemsNb;
    animateList(this, false, 'click');
  };

  function getSelectedDot(carousel) {
    return Math.ceil(carousel.selectedItem / carousel.visibItemsNb);
  };

  function initCarouselCounter(carousel) {
    if (carousel.counterTor.length > 0) carousel.counterTor[0].textContent = carousel.itemsNb;
    setCounterItem(carousel);
  };

  function setCounterItem(carousel) {
    if (carousel.counter.length == 0) return;
    var totalItems = carousel.selectedItem + carousel.visibItemsNb;
    if (totalItems > carousel.items.length) totalItems = carousel.items.length;
    carousel.counter[0].textContent = totalItems;
  };

  function centerItems(carousel) {
    if (!carousel.options.justifyContent) return;
    Util.toggleClass(carousel.list, 'justify-center', carousel.items.length < carousel.visibItemsNb);
  };

  function alignControls(carousel) {
    if (carousel.controls.length < 1 || !carousel.options.alignControls) return;
    if (!carousel.controlsAlignEl) {
      carousel.controlsAlignEl = carousel.element.querySelector(carousel.options.alignControls);
    }
    if (!carousel.controlsAlignEl) return;
    var translate = (carousel.element.offsetHeight - carousel.controlsAlignEl.offsetHeight);
    for (var i = 0; i < carousel.controls.length; i++) {
      carousel.controls[i].style.marginBottom = translate + 'px';
    }
  };

  function emitCarouselActiveItemsEvent(carousel) {
    emitCarouselEvents(carousel, 'carousel-active-items', { firstSelectedItem: carousel.selectedItem, visibleItemsNb: carousel.visibItemsNb });
  };

  function emitCarouselEvents(carousel, eventName, eventDetail) {
    var event = new CustomEvent(eventName, { detail: eventDetail });
    carousel.element.dispatchEvent(event);
  };

  function resetVisibilityOverflowItems(carousel, j) {
    if (!carousel.options.overflowItems) return;
    var itemWidth = carousel.containerWidth / carousel.items.length,
      delta = (window.innerWidth - itemWidth * carousel.visibItemsNb) / 2,
      overflowItems = Math.ceil(delta / itemWidth);

    for (var i = 0; i < overflowItems; i++) {
      var indexPrev = j - 1 - i; // prev element
      if (indexPrev >= 0) carousel.items[indexPrev].removeAttribute('tabindex');
      var indexNext = j + carousel.visibItemsNb + i; // next element
      if (indexNext < carousel.items.length) carousel.items[indexNext].removeAttribute('tabindex');
    }
  };

  Carousel.defaults = {
    element: '',
    autoplay: false,
    autoplayOnHover: false,
    autoplayOnFocus: false,
    autoplayInterval: 5000,
    loop: true,
    nav: false,
    navigationItemClass: 'carousel__nav-item',
    navigationClass: 'carousel__navigation',
    navigationPagination: false,
    drag: false,
    justifyContent: false,
    alignControls: false,
    overflowItems: false
  };

  window.Carousel = Carousel;

  //initialize the Carousel objects
  var carousels = document.getElementsByClassName('js-carousel'),
    flexSupported = Util.cssSupports('align-items', 'stretch'),
    transitionSupported = Util.cssSupports('transition'),
    cssPropertiesSupported = ('CSS' in window && CSS.supports('color', 'var(--color-var)'));

  if (carousels.length > 0) {
    for (var i = 0; i < carousels.length; i++) {
      (function (i) {
        var autoplay = (carousels[i].getAttribute('data-autoplay') && carousels[i].getAttribute('data-autoplay') == 'on') ? true : false,
          autoplayInterval = (carousels[i].getAttribute('data-autoplay-interval')) ? carousels[i].getAttribute('data-autoplay-interval') : 5000,
          autoplayOnHover = (carousels[i].getAttribute('data-autoplay-hover') && carousels[i].getAttribute('data-autoplay-hover') == 'on') ? true : false,
          autoplayOnFocus = (carousels[i].getAttribute('data-autoplay-focus') && carousels[i].getAttribute('data-autoplay-focus') == 'on') ? true : false,
          drag = (carousels[i].getAttribute('data-drag') && carousels[i].getAttribute('data-drag') == 'on') ? true : false,
          loop = (carousels[i].getAttribute('data-loop') && carousels[i].getAttribute('data-loop') == 'off') ? false : true,
          nav = (carousels[i].getAttribute('data-navigation') && carousels[i].getAttribute('data-navigation') == 'on') ? true : false,
          navigationItemClass = carousels[i].getAttribute('data-navigation-item-class') ? carousels[i].getAttribute('data-navigation-item-class') : 'carousel__nav-item',
          navigationClass = carousels[i].getAttribute('data-navigation-class') ? carousels[i].getAttribute('data-navigation-class') : 'carousel__navigation',
          navigationPagination = (carousels[i].getAttribute('data-navigation-pagination') && carousels[i].getAttribute('data-navigation-pagination') == 'on') ? true : false,
          overflowItems = (carousels[i].getAttribute('data-overflow-items') && carousels[i].getAttribute('data-overflow-items') == 'on') ? true : false,
          alignControls = carousels[i].getAttribute('data-align-controls') ? carousels[i].getAttribute('data-align-controls') : false,
          justifyContent = (carousels[i].getAttribute('data-justify-content') && carousels[i].getAttribute('data-justify-content') == 'on') ? true : false;
        new Carousel({ element: carousels[i], autoplay: autoplay, autoplayOnHover: autoplayOnHover, autoplayOnFocus: autoplayOnFocus, autoplayInterval: autoplayInterval, drag: drag, ariaLive: true, loop: loop, nav: nav, navigationItemClass: navigationItemClass, navigationPagination: navigationPagination, navigationClass: navigationClass, overflowItems: overflowItems, justifyContent: justifyContent, alignControls: alignControls });
      })(i);
    }
  };
}());
// File#: _2_draggable-img-gallery
// Usage: codyhouse.co/license
(function () {
  var DragGallery = function (element) {
    this.element = element;
    this.list = this.element.getElementsByTagName('ul')[0];
    this.imgs = this.list.children;
    this.gestureHint = this.element.getElementsByClassName('drag-gallery__gesture-hint');// drag gesture hint
    this.galleryWidth = getGalleryWidth(this);
    this.translate = 0; // store container translate value
    this.dragStart = false; // start dragging position
    // drag momentum option
    this.dragMStart = false;
    this.dragTimeMStart = false;
    this.dragTimeMEnd = false;
    this.dragMSpeed = false;
    this.dragAnimId = false;
    initDragGalleryEvents(this);
  };

  function initDragGalleryEvents(gallery) {
    initDragging(gallery); // init dragging

    gallery.element.addEventListener('update-gallery-width', function (event) { // window resize
      gallery.galleryWidth = getGalleryWidth(gallery);
      // reset translate value if not acceptable
      checkTranslateValue(gallery);
      setTranslate(gallery);
    });

    if (intersectionObsSupported) initOpacityAnim(gallery); // init image animation

    if (!reducedMotion && gallery.gestureHint.length > 0) initHintGesture(gallery); // init hint gesture element animation

    initKeyBoardNav(gallery);
  };

  function getGalleryWidth(gallery) {
    return gallery.list.scrollWidth - gallery.list.offsetWidth;
  };

  function initDragging(gallery) { // gallery drag
    new SwipeContent(gallery.element);
    gallery.element.addEventListener('dragStart', function (event) {
      window.cancelAnimationFrame(gallery.dragAnimId);
      Util.addClass(gallery.element, 'drag-gallery--is-dragging');
      gallery.dragStart = event.detail.x;
      gallery.dragMStart = event.detail.x;
      gallery.dragTimeMStart = new Date().getTime();
      gallery.dragTimeMEnd = false;
      gallery.dragMSpeed = false;
      initDragEnd(gallery);
    });

    gallery.element.addEventListener('dragging', function (event) {
      if (!gallery.dragStart) return;
      if (Math.abs(event.detail.x - gallery.dragStart) < 5) return;
      gallery.translate = Math.round(event.detail.x - gallery.dragStart + gallery.translate);
      gallery.dragStart = event.detail.x;
      checkTranslateValue(gallery);
      setTranslate(gallery);
    });
  };

  function initDragEnd(gallery) {
    gallery.element.addEventListener('dragEnd', function cb(event) {
      gallery.element.removeEventListener('dragEnd', cb);
      Util.removeClass(gallery.element, 'drag-gallery--is-dragging');
      initMomentumDrag(gallery); // drag momentum
      gallery.dragStart = false;
    });
  };

  function initKeyBoardNav(gallery) {
    gallery.element.setAttribute('tabindex', 0);
    // navigate gallery using right/left arrows
    gallery.element.addEventListener('keyup', function (event) {
      if (event.keyCode && event.keyCode == 39 || event.key && event.key.toLowerCase() == 'arrowright') {
        keyboardNav(gallery, 'right');
      } else if (event.keyCode && event.keyCode == 37 || event.key && event.key.toLowerCase() == 'arrowleft') {
        keyboardNav(gallery, 'left');
      }
    });
  };

  function keyboardNav(gallery, direction) {
    var delta = parseFloat(window.getComputedStyle(gallery.imgs[0]).marginRight) + gallery.imgs[0].offsetWidth;
    gallery.translate = (direction == 'right') ? gallery.translate - delta : gallery.translate + delta;
    checkTranslateValue(gallery);
    setTranslate(gallery);
  };

  function checkTranslateValue(gallery) { // make sure translate is in the right interval
    if (gallery.translate > 0) {
      gallery.translate = 0;
      gallery.dragMSpeed = 0;
    }
    if (Math.abs(gallery.translate) > gallery.galleryWidth) {
      gallery.translate = gallery.galleryWidth * -1;
      gallery.dragMSpeed = 0;
    }
  };

  function setTranslate(gallery) {
    gallery.list.style.transform = 'translateX(' + gallery.translate + 'px)';
    gallery.list.style.msTransform = 'translateX(' + gallery.translate + 'px)';
  };

  function initOpacityAnim(gallery) { // animate img opacities on drag
    for (var i = 0; i < gallery.imgs.length; i++) {
      var observer = new IntersectionObserver(opacityCallback.bind(gallery.imgs[i]), { threshold: [0, 0.1] });
      observer.observe(gallery.imgs[i]);
    }
  };

  function opacityCallback(entries, observer) { // reveal images when they enter the viewport
    var threshold = entries[0].intersectionRatio.toFixed(1);
    if (threshold > 0) {
      Util.addClass(this, 'drag-gallery__item--visible');
      observer.unobserve(this);
    }
  };

  function initMomentumDrag(gallery) {
    // momentum effect when drag is over
    if (reducedMotion) return;
    var timeNow = new Date().getTime();
    gallery.dragMSpeed = 0.95 * (gallery.dragStart - gallery.dragMStart) / (timeNow - gallery.dragTimeMStart);

    var currentTime = false;

    function animMomentumDrag(timestamp) {
      if (!currentTime) currentTime = timestamp;
      var progress = timestamp - currentTime;
      currentTime = timestamp;
      if (Math.abs(gallery.dragMSpeed) < 0.01) {
        gallery.dragAnimId = false;
        return;
      } else {
        gallery.translate = Math.round(gallery.translate + (gallery.dragMSpeed * progress));
        checkTranslateValue(gallery);
        setTranslate(gallery);
        gallery.dragMSpeed = gallery.dragMSpeed * 0.95;
        gallery.dragAnimId = window.requestAnimationFrame(animMomentumDrag);
      }
    };

    gallery.dragAnimId = window.requestAnimationFrame(animMomentumDrag);
  };

  function initHintGesture(gallery) { // show user a hint about gallery dragging
    var observer = new IntersectionObserver(hintGestureCallback.bind(gallery.gestureHint[0]), { threshold: [0, 1] });
    observer.observe(gallery.gestureHint[0]);
  };

  function hintGestureCallback(entries, observer) {
    var threshold = entries[0].intersectionRatio.toFixed(1);
    if (threshold > 0) {
      Util.addClass(this, 'drag-gallery__gesture-hint--animate');
      observer.unobserve(this);
    }
  };

  //initialize the DragGallery objects
  var dragGallery = document.getElementsByClassName('js-drag-gallery'),
    intersectionObsSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype),
    reducedMotion = Util.osHasReducedMotion();

  if (dragGallery.length > 0) {
    var dragGalleryArray = [];
    for (var i = 0; i < dragGallery.length; i++) {
      (function (i) {
        if (!intersectionObsSupported || reducedMotion) Util.addClass(dragGallery[i], 'drag-gallery--anim-off');
        dragGalleryArray.push(new DragGallery(dragGallery[i]));
      })(i);
    }

    // resize event
    var resizingId = false,
      customEvent = new CustomEvent('update-gallery-width');

    window.addEventListener('resize', function () {
      clearTimeout(resizingId);
      resizingId = setTimeout(doneResizing, 500);
    });

    function doneResizing() {
      for (var i = 0; i < dragGalleryArray.length; i++) {
        (function (i) { dragGalleryArray[i].element.dispatchEvent(customEvent) })(i);
      };
    };
  }
}());
// File#: _2_slideshow
// Usage: codyhouse.co/license
(function () {
	var Slideshow = function (opts) {
		this.options = Util.extend(Slideshow.defaults, opts);
		this.element = this.options.element;
		this.items = this.element.getElementsByClassName('js-slideshow__item');
		this.controls = this.element.getElementsByClassName('js-slideshow__control');
		this.selectedSlide = 0;
		this.autoplayId = false;
		this.autoplayPaused = false;
		this.navigation = false;
		this.navCurrentLabel = false;
		this.ariaLive = false;
		this.moveFocus = false;
		this.animating = false;
		this.supportAnimation = Util.cssSupports('transition');
		this.animationOff = (!Util.hasClass(this.element, 'slideshow--transition-fade') && !Util.hasClass(this.element, 'slideshow--transition-slide') && !Util.hasClass(this.element, 'slideshow--transition-prx'));
		this.animationType = Util.hasClass(this.element, 'slideshow--transition-prx') ? 'prx' : 'slide';
		this.animatingClass = 'slideshow--is-animating';
		initSlideshow(this);
		initSlideshowEvents(this);
		initAnimationEndEvents(this);
	};

	Slideshow.prototype.showNext = function () {
		showNewItem(this, this.selectedSlide + 1, 'next');
	};

	Slideshow.prototype.showPrev = function () {
		showNewItem(this, this.selectedSlide - 1, 'prev');
	};

	Slideshow.prototype.showItem = function (index) {
		showNewItem(this, index, false);
	};

	Slideshow.prototype.startAutoplay = function () {
		var self = this;
		if (this.options.autoplay && !this.autoplayId && !this.autoplayPaused) {
			self.autoplayId = setInterval(function () {
				self.showNext();
			}, self.options.autoplayInterval);
		}
	};

	Slideshow.prototype.pauseAutoplay = function () {
		var self = this;
		if (this.options.autoplay) {
			clearInterval(self.autoplayId);
			self.autoplayId = false;
		}
	};

	function initSlideshow(slideshow) { // basic slideshow settings
		// if no slide has been selected -> select the first one
		if (slideshow.element.getElementsByClassName('slideshow__item--selected').length < 1) Util.addClass(slideshow.items[0], 'slideshow__item--selected');
		slideshow.selectedSlide = Util.getIndexInArray(slideshow.items, slideshow.element.getElementsByClassName('slideshow__item--selected')[0]);
		// create an element that will be used to announce the new visible slide to SR
		var srLiveArea = document.createElement('div');
		Util.setAttributes(srLiveArea, { 'class': 'sr-only js-slideshow__aria-live', 'aria-live': 'polite', 'aria-atomic': 'true' });
		slideshow.element.appendChild(srLiveArea);
		slideshow.ariaLive = srLiveArea;
	};

	function initSlideshowEvents(slideshow) {
		// if slideshow navigation is on -> create navigation HTML and add event listeners
		if (slideshow.options.navigation) {
			// check if navigation has already been included
			if (slideshow.element.getElementsByClassName('js-slideshow__navigation').length == 0) {
				var navigation = document.createElement('ol'),
					navChildren = '';

				var navClasses = slideshow.options.navigationClass + ' js-slideshow__navigation';
				if (slideshow.items.length <= 1) {
					navClasses = navClasses + ' is-hidden';
				}

				navigation.setAttribute('class', navClasses);
				for (var i = 0; i < slideshow.items.length; i++) {
					var className = (i == slideshow.selectedSlide) ? 'class="' + slideshow.options.navigationItemClass + ' ' + slideshow.options.navigationItemClass + '--selected js-slideshow__nav-item"' : 'class="' + slideshow.options.navigationItemClass + ' js-slideshow__nav-item"',
						navCurrentLabel = (i == slideshow.selectedSlide) ? '<span class="sr-only js-slideshow__nav-current-label">Current Item</span>' : '';
					navChildren = navChildren + '<li ' + className + '><button class="reset"><span class="sr-only">' + (i + 1) + '</span>' + navCurrentLabel + '</button></li>';
				}
				navigation.innerHTML = navChildren;
				slideshow.element.appendChild(navigation);
			}

			slideshow.navCurrentLabel = slideshow.element.getElementsByClassName('js-slideshow__nav-current-label')[0];
			slideshow.navigation = slideshow.element.getElementsByClassName('js-slideshow__nav-item');

			var dotsNavigation = slideshow.element.getElementsByClassName('js-slideshow__navigation')[0];

			dotsNavigation.addEventListener('click', function (event) {
				navigateSlide(slideshow, event, true);
			});
			dotsNavigation.addEventListener('keyup', function (event) {
				navigateSlide(slideshow, event, (event.key.toLowerCase() == 'enter'));
			});
		}
		// slideshow arrow controls
		if (slideshow.controls.length > 0) {
			// hide controls if one item available
			if (slideshow.items.length <= 1) {
				Util.addClass(slideshow.controls[0], 'is-hidden');
				Util.addClass(slideshow.controls[1], 'is-hidden');
			}
			slideshow.controls[0].addEventListener('click', function (event) {
				event.preventDefault();
				slideshow.showPrev();
				updateAriaLive(slideshow);
			});
			slideshow.controls[1].addEventListener('click', function (event) {
				event.preventDefault();
				slideshow.showNext();
				updateAriaLive(slideshow);
			});
		}
		// swipe events
		if (slideshow.options.swipe) {
			//init swipe
			new SwipeContent(slideshow.element);
			slideshow.element.addEventListener('swipeLeft', function (event) {
				slideshow.showNext();
			});
			slideshow.element.addEventListener('swipeRight', function (event) {
				slideshow.showPrev();
			});
		}
		// autoplay
		if (slideshow.options.autoplay) {
			slideshow.startAutoplay();
			// pause autoplay if user is interacting with the slideshow
			if (!slideshow.options.autoplayOnHover) {
				slideshow.element.addEventListener('mouseenter', function (event) {
					slideshow.pauseAutoplay();
					slideshow.autoplayPaused = true;
				});
				slideshow.element.addEventListener('mouseleave', function (event) {
					slideshow.autoplayPaused = false;
					slideshow.startAutoplay();
				});
			}
			if (!slideshow.options.autoplayOnFocus) {
				slideshow.element.addEventListener('focusin', function (event) {
					slideshow.pauseAutoplay();
					slideshow.autoplayPaused = true;
				});
				slideshow.element.addEventListener('focusout', function (event) {
					slideshow.autoplayPaused = false;
					slideshow.startAutoplay();
				});
			}
		}
		// detect if external buttons control the slideshow
		var slideshowId = slideshow.element.getAttribute('id');
		if (slideshowId) {
			var externalControls = document.querySelectorAll('[data-controls="' + slideshowId + '"]');
			for (var i = 0; i < externalControls.length; i++) {
				(function (i) { externalControlSlide(slideshow, externalControls[i]); })(i);
			}
		}
		// custom event to trigger selection of a new slide element
		slideshow.element.addEventListener('selectNewItem', function (event) {
			// check if slide is already selected
			if (event.detail) {
				if (event.detail - 1 == slideshow.selectedSlide) return;
				showNewItem(slideshow, event.detail - 1, false);
			}
		});

		// keyboard navigation
		slideshow.element.addEventListener('keydown', function (event) {
			if (event.keyCode && event.keyCode == 39 || event.key && event.key.toLowerCase() == 'arrowright') {
				slideshow.showNext();
			} else if (event.keyCode && event.keyCode == 37 || event.key && event.key.toLowerCase() == 'arrowleft') {
				slideshow.showPrev();
			}
		});
	};

	function navigateSlide(slideshow, event, keyNav) {
		// user has interacted with the slideshow navigation -> update visible slide
		var target = (Util.hasClass(event.target, 'js-slideshow__nav-item')) ? event.target : event.target.closest('.js-slideshow__nav-item');
		if (keyNav && target && !Util.hasClass(target, 'slideshow__nav-item--selected')) {
			slideshow.showItem(Util.getIndexInArray(slideshow.navigation, target));
			slideshow.moveFocus = true;
			updateAriaLive(slideshow);
		}
	};

	function initAnimationEndEvents(slideshow) {
		// remove animation classes at the end of a slide transition
		for (var i = 0; i < slideshow.items.length; i++) {
			(function (i) {
				slideshow.items[i].addEventListener('animationend', function () { resetAnimationEnd(slideshow, slideshow.items[i]); });
				slideshow.items[i].addEventListener('transitionend', function () { resetAnimationEnd(slideshow, slideshow.items[i]); });
			})(i);
		}
	};

	function resetAnimationEnd(slideshow, item) {
		setTimeout(function () { // add a delay between the end of animation and slideshow reset - improve animation performance
			if (Util.hasClass(item, 'slideshow__item--selected')) {
				if (slideshow.moveFocus) Util.moveFocus(item);
				emitSlideshowEvent(slideshow, 'newItemVisible', slideshow.selectedSlide);
				slideshow.moveFocus = false;
			}
			Util.removeClass(item, 'slideshow__item--' + slideshow.animationType + '-out-left slideshow__item--' + slideshow.animationType + '-out-right slideshow__item--' + slideshow.animationType + '-in-left slideshow__item--' + slideshow.animationType + '-in-right');
			item.removeAttribute('aria-hidden');
			slideshow.animating = false;
			Util.removeClass(slideshow.element, slideshow.animatingClass);
		}, 100);
	};

	function showNewItem(slideshow, index, bool) {
		if (slideshow.items.length <= 1) return;
		if (slideshow.animating && slideshow.supportAnimation) return;
		slideshow.animating = true;
		Util.addClass(slideshow.element, slideshow.animatingClass);
		if (index < 0) index = slideshow.items.length - 1;
		else if (index >= slideshow.items.length) index = 0;
		// skip slideshow item if it is hidden
		if (bool && Util.hasClass(slideshow.items[index], 'is-hidden')) {
			slideshow.animating = false;
			index = bool == 'next' ? index + 1 : index - 1;
			showNewItem(slideshow, index, bool);
			return;
		}
		// index of new slide is equal to index of slide selected item
		if (index == slideshow.selectedSlide) {
			slideshow.animating = false;
			return;
		}
		var exitItemClass = getExitItemClass(slideshow, bool, slideshow.selectedSlide, index);
		var enterItemClass = getEnterItemClass(slideshow, bool, slideshow.selectedSlide, index);
		// transition between slides
		if (!slideshow.animationOff) Util.addClass(slideshow.items[slideshow.selectedSlide], exitItemClass);
		Util.removeClass(slideshow.items[slideshow.selectedSlide], 'slideshow__item--selected');
		slideshow.items[slideshow.selectedSlide].setAttribute('aria-hidden', 'true'); //hide to sr element that is exiting the viewport
		if (slideshow.animationOff) {
			Util.addClass(slideshow.items[index], 'slideshow__item--selected');
		} else {
			Util.addClass(slideshow.items[index], enterItemClass + ' slideshow__item--selected');
		}
		// reset slider navigation appearance
		resetSlideshowNav(slideshow, index, slideshow.selectedSlide);
		slideshow.selectedSlide = index;
		// reset autoplay
		slideshow.pauseAutoplay();
		slideshow.startAutoplay();
		// reset controls/navigation color themes
		resetSlideshowTheme(slideshow, index);
		// emit event
		emitSlideshowEvent(slideshow, 'newItemSelected', slideshow.selectedSlide);
		if (slideshow.animationOff) {
			slideshow.animating = false;
			Util.removeClass(slideshow.element, slideshow.animatingClass);
		}
	};

	function getExitItemClass(slideshow, bool, oldIndex, newIndex) {
		var className = '';
		if (bool) {
			className = (bool == 'next') ? 'slideshow__item--' + slideshow.animationType + '-out-right' : 'slideshow__item--' + slideshow.animationType + '-out-left';
		} else {
			className = (newIndex < oldIndex) ? 'slideshow__item--' + slideshow.animationType + '-out-left' : 'slideshow__item--' + slideshow.animationType + '-out-right';
		}
		return className;
	};

	function getEnterItemClass(slideshow, bool, oldIndex, newIndex) {
		var className = '';
		if (bool) {
			className = (bool == 'next') ? 'slideshow__item--' + slideshow.animationType + '-in-right' : 'slideshow__item--' + slideshow.animationType + '-in-left';
		} else {
			className = (newIndex < oldIndex) ? 'slideshow__item--' + slideshow.animationType + '-in-left' : 'slideshow__item--' + slideshow.animationType + '-in-right';
		}
		return className;
	};

	function resetSlideshowNav(slideshow, newIndex, oldIndex) {
		if (slideshow.navigation) {
			Util.removeClass(slideshow.navigation[oldIndex], 'slideshow__nav-item--selected');
			Util.addClass(slideshow.navigation[newIndex], 'slideshow__nav-item--selected');
			slideshow.navCurrentLabel.parentElement.removeChild(slideshow.navCurrentLabel);
			slideshow.navigation[newIndex].getElementsByTagName('button')[0].appendChild(slideshow.navCurrentLabel);
		}
	};

	function resetSlideshowTheme(slideshow, newIndex) {
		var dataTheme = slideshow.items[newIndex].getAttribute('data-theme');
		if (dataTheme) {
			if (slideshow.navigation) slideshow.navigation[0].parentElement.setAttribute('data-theme', dataTheme);
			if (slideshow.controls[0]) slideshow.controls[0].parentElement.setAttribute('data-theme', dataTheme);
		} else {
			if (slideshow.navigation) slideshow.navigation[0].parentElement.removeAttribute('data-theme');
			if (slideshow.controls[0]) slideshow.controls[0].parentElement.removeAttribute('data-theme');
		}
	};

	function emitSlideshowEvent(slideshow, eventName, detail) {
		var event = new CustomEvent(eventName, { detail: detail });
		slideshow.element.dispatchEvent(event);
	};

	function updateAriaLive(slideshow) {
		slideshow.ariaLive.innerHTML = 'Item ' + (slideshow.selectedSlide + 1) + ' of ' + slideshow.items.length;
	};

	function externalControlSlide(slideshow, button) { // control slideshow using external element
		button.addEventListener('click', function (event) {
			var index = button.getAttribute('data-index');
			if (!index || index == slideshow.selectedSlide + 1) return;
			event.preventDefault();
			showNewItem(slideshow, index - 1, false);
		});
	};

	Slideshow.defaults = {
		element: '',
		navigation: true,
		autoplay: false,
		autoplayOnHover: false,
		autoplayOnFocus: false,
		autoplayInterval: 5000,
		navigationItemClass: 'slideshow__nav-item',
		navigationClass: 'slideshow__navigation',
		swipe: false
	};

	window.Slideshow = Slideshow;

	//initialize the Slideshow objects
	var slideshows = document.getElementsByClassName('js-slideshow');
	if (slideshows.length > 0) {
		for (var i = 0; i < slideshows.length; i++) {
			(function (i) {
				var navigation = (slideshows[i].getAttribute('data-navigation') && slideshows[i].getAttribute('data-navigation') == 'off') ? false : true,
					autoplay = (slideshows[i].getAttribute('data-autoplay') && slideshows[i].getAttribute('data-autoplay') == 'on') ? true : false,
					autoplayOnHover = (slideshows[i].getAttribute('data-autoplay-hover') && slideshows[i].getAttribute('data-autoplay-hover') == 'on') ? true : false,
					autoplayOnFocus = (slideshows[i].getAttribute('data-autoplay-focus') && slideshows[i].getAttribute('data-autoplay-focus') == 'on') ? true : false,
					autoplayInterval = (slideshows[i].getAttribute('data-autoplay-interval')) ? slideshows[i].getAttribute('data-autoplay-interval') : 5000,
					swipe = (slideshows[i].getAttribute('data-swipe') && slideshows[i].getAttribute('data-swipe') == 'on') ? true : false,
					navigationItemClass = slideshows[i].getAttribute('data-navigation-item-class') ? slideshows[i].getAttribute('data-navigation-item-class') : 'slideshow__nav-item',
					navigationClass = slideshows[i].getAttribute('data-navigation-class') ? slideshows[i].getAttribute('data-navigation-class') : 'slideshow__navigation';
				new Slideshow({ element: slideshows[i], navigation: navigation, autoplay: autoplay, autoplayOnHover: autoplayOnHover, autoplayOnFocus: autoplayOnFocus, autoplayInterval: autoplayInterval, swipe: swipe, navigationItemClass: navigationItemClass, navigationClass: navigationClass });
			})(i);
		}
	}
}());
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
const es = document.getElementById('es');
const en = document.getElementById('en');
const home = document.getElementById('home');
const history = document.getElementById('history');
const identity = document.getElementById('identity');
const farming = document.getElementById('farming');
const wines = document.getElementById('wines')
const hospitality = document.getElementById('hospitality');
const shop = document.getElementById('shop');
const legal = document.getElementById('legal');




const gif = document.getElementById('gif-history')
const img = document.getElementById('img-history')

setTimeout(() => {
    gif.classList.add('is-hidden')
    img.classList.remove('is-hidden')
}, 6000);
const formContacto = document.getElementById('form-contact')
const formVisitas = document.getElementById('form-visitas')
const formMaps = document.getElementById('maps')
const btnVisit = document.getElementById('btn-visit')
const btnContact = document.getElementById('btn-contact')
const btnMaps = document.getElementById('btn-maps')
const hrBtnVisit = document.getElementById('hr-btn-visit')
const hrBtnContact = document.getElementById('hr-btn-contact')
const hrBtnMaps = document.getElementById('hr-btn-maps')


// btnVisit.addEventListener('click', function () {

// })
function visit() {
    formVisitas.classList.remove('hide')
    formContacto.classList.add('hide')
    formMaps.classList.add('hide')

    btnVisit.classList.add('btn-hospitality-active')
    hrBtnVisit.classList.remove('hide')
    btnContact.classList.remove('btn-hospitality-active')
    btnContact.classList.add('btn-hospitality')
    hrBtnContact.classList.add('hide')
    btnMaps.classList.remove('btn-hospitality-active')
    hrBtnMaps.classList.add('hide')

}

function contact() {
    formContacto.classList.remove('hide')
    formVisitas.classList.add('hide')
    formMaps.classList.add('hide')

    btnVisit.classList.remove('btn-hospitality-active')
    hrBtnVisit.classList.add('hide')
    btnContact.classList.add('btn-hospitality-active')
    hrBtnContact.classList.remove('hide')
    btnMaps.classList.remove('btn-hospitality-active')
    hrBtnMaps.classList.add('hide')
}

function maps() {
    formContacto.classList.add('hide')
    formVisitas.classList.add('hide')
    formMaps.classList.remove('hide')

    btnVisit.classList.remove('btn-hospitality-active')
    hrBtnVisit.classList.add('hide')
    btnContact.classList.remove('btn-hospitality-active')
    btnContact.classList.add('btn-hospitality')
    hrBtnContact.classList.add('hide')
    btnMaps.classList.add('btn-hospitality-active')
    hrBtnMaps.classList.remove('hide')
}

const buttonTeamwork = document.getElementById('teamwork')
const buttonRespect = document.getElementById('respect')
const buttonAtention = document.getElementById('atention')

const carouselTeamwork = document.getElementById('carousel-teamwork')
const carouselRespect = document.getElementById('carousel-respect')
const carouselAtention = document.getElementById('carousel-atention')


function teamwork() {
    buttonTeamwork.classList.add('identity-active')
    buttonAtention.classList.remove('identity-active')
    buttonRespect.classList.remove('identity-active')

    carouselAtention.classList.add('hide')
    carouselRespect.classList.add('hide')
    carouselTeamwork.classList.remove('hide')
}

function respect() {
    buttonTeamwork.classList.remove('identity-active')
    buttonAtention.classList.remove('identity-active')
    buttonRespect.classList.add('identity-active')

    carouselAtention.classList.add('hide')
    carouselRespect.classList.remove('hide')
    carouselTeamwork.classList.add('hide')
}

function atention() {
    buttonTeamwork.classList.remove('identity-active')
    buttonAtention.classList.add('identity-active')
    buttonRespect.classList.remove('identity-active')

    carouselAtention.classList.remove('hide')
    carouselRespect.classList.add('hide')
    carouselTeamwork.classList.add('hide')
}

const sectionWines = document.getElementById('wines-list')
const infoCobos = document.getElementById('info-cobos')
const infoVolturno = document.getElementById('info-volturno')
const infoVineyard = document.getElementById('info-vineyard')
const infoVinculum = document.getElementById('info-vinculum')
const infoBramare = document.getElementById('info-bramare')
const infoCocodrilo = document.getElementById('info-cocodrilo')
const infoFelino = document.getElementById('info-felino')

const liCobos = document.getElementById('cobos')
const liVolturno = document.getElementById('volturno')
const liVineyard = document.getElementById('vc-vineyard')
const liVinculum = document.getElementById('vc-vinculum')
const liBramare = document.getElementById('bramare')
const liCocodrilo = document.getElementById('cocodrilo')
const liFelino = document.getElementById('felino')

function cobos() {
    sectionWines.style.backgroundImage = "url('./assets/img/wines/fondo-wines/Cobos.png')"
    sectionWines.style.transition = '1s'

    liCobos.classList.add('list-wines-active')
    liVolturno.classList.remove('list-wines-active')
    liVineyard.classList.remove('list-wines-active')
    liVinculum.classList.remove('list-wines-active')
    liBramare.classList.remove('list-wines-active')
    liCocodrilo.classList.remove('list-wines-active')
    liFelino.classList.remove('list-wines-active')

    liVinculum.classList.remove('list-wines-white')
    liVolturno.classList.remove('list-wines-white')
    liVineyard.classList.remove('list-wines-white')
    liBramare.classList.remove('list-wines-white')
    liCocodrilo.classList.remove('list-wines-white')
    liFelino.classList.remove('list-wines-white')

    infoCobos.classList.remove('hide')
    infoCobos.classList.add('info-wines-white')
    infoCobos.style.transition = '1s'
    infoVolturno.classList.add('hide')
    infoVineyard.classList.add('hide')
    infoVinculum.classList.add('hide')
    infoBramare.classList.add('hide')
    infoCocodrilo.classList.add('hide')
    infoFelino.classList.add('hide')

}

function volturno() {
    sectionWines.style.backgroundImage = "url('./assets/img/wines/fondo-wines/Volturno.png')"
    sectionWines.style.transition = '1s'

    liVolturno.classList.add('list-wines-active')
    liCobos.classList.remove('list-wines-active')
    liVineyard.classList.remove('list-wines-active')
    liVinculum.classList.remove('list-wines-active')
    liBramare.classList.remove('list-wines-active')
    liCocodrilo.classList.remove('list-wines-active')
    liFelino.classList.remove('list-wines-active')

    liCobos.classList.remove('list-wines-white')
    liVinculum.classList.remove('list-wines-white')
    liVineyard.classList.remove('list-wines-white')
    liBramare.classList.remove('list-wines-white')
    liCocodrilo.classList.remove('list-wines-white')
    liFelino.classList.remove('list-wines-white')

    infoVolturno.classList.remove('hide')
    infoVolturno.classList.add('info-wines-white')
    infoVolturno.style.transition = '1s'
    infoCobos.classList.add('hide')
    infoVineyard.classList.add('hide')
    infoVinculum.classList.add('hide')
    infoBramare.classList.add('hide')
    infoCocodrilo.classList.add('hide')
    infoFelino.classList.add('hide')
}

function vineyard() {
    sectionWines.style.backgroundImage = "url('./assets/img/wines/fondo-wines/VD.png')"
    sectionWines.style.transition = '1s'

    liVineyard.classList.add('list-wines-active')
    liVolturno.classList.remove('list-wines-active')
    liCobos.classList.remove('list-wines-active')
    liVinculum.classList.remove('list-wines-active')
    liBramare.classList.remove('list-wines-active')
    liCocodrilo.classList.remove('list-wines-active')
    liFelino.classList.remove('list-wines-active')

    liCobos.classList.remove('list-wines-white')
    liVolturno.classList.remove('list-wines-white')
    liVinculum.classList.remove('list-wines-white')
    liBramare.classList.remove('list-wines-white')
    liCocodrilo.classList.remove('list-wines-white')
    liFelino.classList.remove('list-wines-white')

    infoVineyard.classList.remove('hide')
    infoVineyard.classList.add('info-wines-white')
    infoVineyard.style.transition = '1s'
    infoVolturno.classList.add('hide')
    infoCobos.classList.add('hide')
    infoVinculum.classList.add('hide')
    infoBramare.classList.add('hide')
    infoCocodrilo.classList.add('hide')
    infoFelino.classList.add('hide')
}

function vinculum() {
    sectionWines.style.backgroundImage = "url('./assets/img/wines/fondo-wines/Vinculum.png')"
    sectionWines.style.transition = '1s'

    liVinculum.classList.add('list-wines-active')
    liVolturno.classList.remove('list-wines-active')
    liVineyard.classList.remove('list-wines-active')
    liCobos.classList.remove('list-wines-active')
    liBramare.classList.remove('list-wines-active')
    liCocodrilo.classList.remove('list-wines-active')
    liFelino.classList.remove('list-wines-active')

    liCobos.classList.remove('list-wines-white')
    liVolturno.classList.remove('list-wines-white')
    liVineyard.classList.remove('list-wines-white')
    liBramare.classList.remove('list-wines-white')
    liCocodrilo.classList.remove('list-wines-white')
    liFelino.classList.remove('list-wines-white')

    infoVinculum.classList.remove('hide')
    infoVinculum.classList.add('info-wines-white')
    infoVinculum.style.transition = '1s'
    infoVolturno.classList.add('hide')
    infoVineyard.classList.add('hide')
    infoCobos.classList.add('hide')
    infoBramare.classList.add('hide')
    infoCocodrilo.classList.add('hide')
    infoFelino.classList.add('hide')
}

function bramare() {
    sectionWines.style.backgroundImage = "url('./assets/img/wines/fondo-wines/Bramare.png')"
    sectionWines.style.transition = '1s'

    liBramare.classList.add('list-wines-active')
    liVolturno.classList.remove('list-wines-active')
    liVineyard.classList.remove('list-wines-active')
    liVinculum.classList.remove('list-wines-active')
    liCobos.classList.remove('list-wines-active')
    liCocodrilo.classList.remove('list-wines-active')
    liFelino.classList.remove('list-wines-active')

    liCobos.classList.add('list-wines-white')
    liVolturno.classList.add('list-wines-white')
    liVineyard.classList.add('list-wines-white')
    liVinculum.classList.add('list-wines-white')
    liCocodrilo.classList.add('list-wines-white')
    liFelino.classList.add('list-wines-white')


    infoBramare.classList.remove('hide')
    infoBramare.classList.add('info-wines')
    infoBramare.style.transition = '1s'
    infoVolturno.classList.add('hide')
    infoVineyard.classList.add('hide')
    infoVinculum.classList.add('hide')
    infoCobos.classList.add('hide')
    infoCocodrilo.classList.add('hide')
    infoFelino.classList.add('hide')
}

function cocodrilo() {
    sectionWines.style.backgroundImage = "url('./assets/img/wines/fondo-wines/Cocodrilo.png')"
    sectionWines.style.transition = '1s'

    liCocodrilo.classList.add('list-wines-active')
    liVolturno.classList.remove('list-wines-active')
    liVineyard.classList.remove('list-wines-active')
    liVinculum.classList.remove('list-wines-active')
    liBramare.classList.remove('list-wines-active')
    liCobos.classList.remove('list-wines-active')
    liFelino.classList.remove('list-wines-active')

    liCobos.classList.add('list-wines-white')
    liVolturno.classList.add('list-wines-white')
    liVineyard.classList.add('list-wines-white')
    liVinculum.classList.add('list-wines-white')
    liBramare.classList.add('list-wines-white')
    liFelino.classList.add('list-wines-white')

    infoCocodrilo.classList.remove('hide')
    infoCocodrilo.classList.add('info-wines')
    infoCocodrilo.style.transition = '1s'
    infoVolturno.classList.add('hide')
    infoVineyard.classList.add('hide')
    infoVinculum.classList.add('hide')
    infoBramare.classList.add('hide')
    infoCobos.classList.add('hide')
    infoFelino.classList.add('hide')
}

function felino() {
    sectionWines.style.backgroundImage = "url('./assets/img/wines/fondo-wines/Felino.png')"
    sectionWines.style.transition = '1s'

    liFelino.classList.add('list-wines-active')
    liVolturno.classList.remove('list-wines-active')
    liVineyard.classList.remove('list-wines-active')
    liVinculum.classList.remove('list-wines-active')
    liBramare.classList.remove('list-wines-active')
    liCocodrilo.classList.remove('list-wines-active')
    liCobos.classList.remove('list-wines-active')

    liCobos.classList.add('list-wines-white')
    liVolturno.classList.add('list-wines-white')
    liVineyard.classList.add('list-wines-white')
    liVinculum.classList.add('list-wines-white')
    liCocodrilo.classList.add('list-wines-white')
    liBramare.classList.add('list-wines-white')

    infoFelino.classList.remove('hide')
    infoFelino.classList.add('info-wines')
    infoFelino.style.transition = '1s'
    infoVolturno.classList.add('hide')
    infoVineyard.classList.add('hide')
    infoVinculum.classList.add('hide')
    infoBramare.classList.add('hide')
    infoCocodrilo.classList.add('hide')
    infoCobos.classList.add('hide')
}
