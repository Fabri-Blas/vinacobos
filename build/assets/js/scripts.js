// Utility function
function Util () {};

/* 
	class manipulation functions
*/
Util.hasClass = function(el, className) {
	if (el.classList) return el.classList.contains(className);
	else return !!el.getAttribute('class').match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function(el, className) {
	var classList = className.split(' ');
 	if (el.classList) el.classList.add(classList[0]);
  else if (!Util.hasClass(el, classList[0])) el.setAttribute('class', el.getAttribute('class') +  " " + classList[0]);
 	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
	var classList = className.split(' ');
	if (el.classList) el.classList.remove(classList[0]);	
	else if(Util.hasClass(el, classList[0])) {
		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
    el.setAttribute('class', el.getAttribute('class').replace(reg, ' '));
	}
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
  for (var i = 0; i < el.children.length; i++) {
    if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
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
(function() {
	var menuBtns = document.getElementsByClassName('js-anim-menu-btn');
	if( menuBtns.length > 0 ) {
		for(var i = 0; i < menuBtns.length; i++) {(function(i){
			initMenuBtn(menuBtns[i]);
		})(i);}

		function initMenuBtn(btn) {
			btn.addEventListener('click', function(event){	
				event.preventDefault();
				var status = !Util.hasClass(btn, 'anim-menu-btn--state-b');
				Util.toggleClass(btn, 'anim-menu-btn--state-b', status);
				// emit custom event
				var event = new CustomEvent('anim-menu-btn-clicked', {detail: status});
				btn.dispatchEvent(event);
			});
		};
	}
}());
// File#: _1_animated-headline
// Usage: codyhouse.co/license
(function() {
  var TextAnim = function(element) {
    this.element = element;
    this.wordsWrapper = this.element.getElementsByClassName(' js-text-anim__wrapper');
    this.words = this.element.getElementsByClassName('js-text-anim__word');
    this.selectedWord = 0;
    // interval between two animations
    this.loopInterval = parseFloat(getComputedStyle(this.element).getPropertyValue('--text-anim-pause'))*1000 || 1000;
    // duration of single animation (e.g., time for a single word to rotate)
    this.transitionDuration = parseFloat(getComputedStyle(this.element).getPropertyValue('--text-anim-duration'))*1000 || 1000;
    // keep animating after first loop was completed
    this.loop = (this.element.getAttribute('data-loop') && this.element.getAttribute('data-loop') == 'off') ? false : true;
    this.wordInClass = 'text-anim__word--in';
    this.wordOutClass = 'text-anim__word--out';
    // check for specific animations
    this.isClipAnim = Util.hasClass(this.element, 'text-anim--clip');
    if(this.isClipAnim) {
      this.animBorderWidth = parseInt(getComputedStyle(this.element).getPropertyValue('--text-anim-border-width')) || 2;
      this.animPulseClass = 'text-anim__wrapper--pulse';
    }
    initTextAnim(this);
  };

  function initTextAnim(element) {
    // make sure there's a word with the wordInClass
    setSelectedWord(element);
    // if clip animation -> add pulse class
    if(element.isClipAnim) {
      Util.addClass(element.wordsWrapper[0], element.animPulseClass);
    }
    // init loop
    loopWords(element);
  };

  function setSelectedWord(element) {
    var selectedWord = element.element.getElementsByClassName(element.wordInClass);
    if(selectedWord.length == 0) {
      Util.addClass(element.words[0], element.wordInClass);
    } else {
      element.selectedWord = Util.getIndexInArray(element.words, selectedWord[0]);
    }
  };

  function loopWords(element) {
    // stop animation after first loop was completed
    if(!element.loop && element.selectedWord == element.words.length - 1) {
      return;
    }
    var newWordIndex = getNewWordIndex(element);
    setTimeout(function() {
      if(element.isClipAnim) { // clip animation only
        switchClipWords(element, newWordIndex);
      } else {
        switchWords(element, newWordIndex);
      }
    }, element.loopInterval);
  };

  function switchWords(element, newWordIndex) {
    // switch words
    Util.removeClass(element.words[element.selectedWord], element.wordInClass);
    Util.addClass(element.words[element.selectedWord], element.wordOutClass);
    Util.addClass(element.words[newWordIndex], element.wordInClass);
    // reset loop
    resetLoop(element, newWordIndex);
  };

  function resetLoop(element, newIndex) {
    setTimeout(function() { 
      // set new selected word
      Util.removeClass(element.words[element.selectedWord], element.wordOutClass);
      element.selectedWord = newIndex;
      loopWords(element); // restart loop
    }, element.transitionDuration);
  };

  function switchClipWords(element, newWordIndex) {
    // clip animation only
    var startWidth =  element.words[element.selectedWord].offsetWidth,
      endWidth = element.words[newWordIndex].offsetWidth;
    
    // remove pulsing animation
    Util.removeClass(element.wordsWrapper[0], element.animPulseClass);
    // close word
    animateWidth(startWidth, element.animBorderWidth, element.wordsWrapper[0], element.transitionDuration, function() {
      // switch words
      Util.removeClass(element.words[element.selectedWord], element.wordInClass);
      Util.addClass(element.words[newWordIndex], element.wordInClass);
      element.selectedWord = newWordIndex;

      // open word
      animateWidth(element.animBorderWidth, endWidth, element.wordsWrapper[0], element.transitionDuration, function() {
        // add pulsing class
        Util.addClass(element.wordsWrapper[0], element.animPulseClass);
        loopWords(element);
      });
    });
  };

  function getNewWordIndex(element) {
    // get index of new word to be shown
    var index = element.selectedWord + 1;
    if(index >= element.words.length) index = 0;
    return index;
  };

  function animateWidth(start, to, element, duration, cb) {
    // animate width of a word for the clip animation
    var currentTime = null;

    var animateProperty = function(timestamp){  
      if (!currentTime) currentTime = timestamp;         
      var progress = timestamp - currentTime;
      
      var val = Math.easeInOutQuart(progress, start, to - start, duration);
      element.style.width = val+"px";
      if(progress < duration) {
          window.requestAnimationFrame(animateProperty);
      } else {
        cb();
      }
    };
  
    //set the width of the element before starting animation -> fix bug on Safari
    element.style.width = start+"px";
    window.requestAnimationFrame(animateProperty);
  };

  // init TextAnim objects
  var textAnim = document.getElementsByClassName('js-text-anim'),
    reducedMotion = Util.osHasReducedMotion();
  if( textAnim ) {
    if(reducedMotion) return;
    for( var i = 0; i < textAnim.length; i++) {
      (function(i){ new TextAnim(textAnim[i]);})(i);
    }
  }
}());
// File#: _1_diagonal-movement
// Usage: codyhouse.co/license
/*
  Modified version of the jQuery-menu-aim plugin
  https://github.com/kamens/jQuery-menu-aim
  - Replaced jQuery with Vanilla JS
  - Minor changes
*/
(function() {
  var menuAim = function(opts) {
    init(opts);
  };

  window.menuAim = menuAim;

  function init(opts) {
    var activeRow = null,
      mouseLocs = [],
      lastDelayLoc = null,
      timeoutId = null,
      options = Util.extend({
        menu: '',
        rows: false, //if false, get direct children - otherwise pass nodes list 
        submenuSelector: "*",
        submenuDirection: "right",
        tolerance: 75,  // bigger = more forgivey when entering submenu
        enter: function(){},
        exit: function(){},
        activate: function(){},
        deactivate: function(){},
        exitMenu: function(){}
      }, opts),
      menu = options.menu;

    var MOUSE_LOCS_TRACKED = 3,  // number of past mouse locations to track
      DELAY = 300;  // ms delay when user appears to be entering submenu

    /**
     * Keep track of the last few locations of the mouse.
     */
    var mouseMoveFallback = function(event) {
      (!window.requestAnimationFrame) ? mousemoveDocument(event) : window.requestAnimationFrame(function(){mousemoveDocument(event);});
    };

    var mousemoveDocument = function(e) {
      mouseLocs.push({x: e.pageX, y: e.pageY});

      if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
        mouseLocs.shift();
      }
    };

    /**
     * Cancel possible row activations when leaving the menu entirely
     */
    var mouseleaveMenu = function() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // If exitMenu is supplied and returns true, deactivate the
      // currently active row on menu exit.
      if (options.exitMenu(this)) {
        if (activeRow) {
          options.deactivate(activeRow);
        }

        activeRow = null;
      }
    };

    /**
     * Trigger a possible row activation whenever entering a new row.
     */
    var mouseenterRow = function() {
      if (timeoutId) {
        // Cancel any previous activation delays
        clearTimeout(timeoutId);
      }

      options.enter(this);
      possiblyActivate(this);
    },
    mouseleaveRow = function() {
      options.exit(this);
    };

    /*
     * Immediately activate a row if the user clicks on it.
     */
    var clickRow = function() {
      activate(this);
    };  

    /**
     * Activate a menu row.
     */
    var activate = function(row) {
      if (row == activeRow) {
        return;
      }

      if (activeRow) {
        options.deactivate(activeRow);
      }

      options.activate(row);
      activeRow = row;
    };

    /**
     * Possibly activate a menu row. If mouse movement indicates that we
     * shouldn't activate yet because user may be trying to enter
     * a submenu's content, then delay and check again later.
     */
    var possiblyActivate = function(row) {
      var delay = activationDelay();

      if (delay) {
        timeoutId = setTimeout(function() {
          possiblyActivate(row);
        }, delay);
      } else {
        activate(row);
      }
    };

    /**
     * Return the amount of time that should be used as a delay before the
     * currently hovered row is activated.
     *
     * Returns 0 if the activation should happen immediately. Otherwise,
     * returns the number of milliseconds that should be delayed before
     * checking again to see if the row should be activated.
     */
    var activationDelay = function() {
      if (!activeRow || !Util.is(activeRow, options.submenuSelector)) {
        // If there is no other submenu row already active, then
        // go ahead and activate immediately.
        return 0;
      }

      function getOffset(element) {
        var rect = element.getBoundingClientRect();
        return { top: rect.top + window.pageYOffset, left: rect.left + window.pageXOffset };
      };

      var offset = getOffset(menu),
          upperLeft = {
              x: offset.left,
              y: offset.top - options.tolerance
          },
          upperRight = {
              x: offset.left + menu.offsetWidth,
              y: upperLeft.y
          },
          lowerLeft = {
              x: offset.left,
              y: offset.top + menu.offsetHeight + options.tolerance
          },
          lowerRight = {
              x: offset.left + menu.offsetWidth,
              y: lowerLeft.y
          },
          loc = mouseLocs[mouseLocs.length - 1],
          prevLoc = mouseLocs[0];

      if (!loc) {
        return 0;
      }

      if (!prevLoc) {
        prevLoc = loc;
      }

      if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x || prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
        // If the previous mouse location was outside of the entire
        // menu's bounds, immediately activate.
        return 0;
      }

      if (lastDelayLoc && loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
        // If the mouse hasn't moved since the last time we checked
        // for activation status, immediately activate.
        return 0;
      }

      // Detect if the user is moving towards the currently activated
      // submenu.
      //
      // If the mouse is heading relatively clearly towards
      // the submenu's content, we should wait and give the user more
      // time before activating a new row. If the mouse is heading
      // elsewhere, we can immediately activate a new row.
      //
      // We detect this by calculating the slope formed between the
      // current mouse location and the upper/lower right points of
      // the menu. We do the same for the previous mouse location.
      // If the current mouse location's slopes are
      // increasing/decreasing appropriately compared to the
      // previous's, we know the user is moving toward the submenu.
      //
      // Note that since the y-axis increases as the cursor moves
      // down the screen, we are looking for the slope between the
      // cursor and the upper right corner to decrease over time, not
      // increase (somewhat counterintuitively).
      function slope(a, b) {
        return (b.y - a.y) / (b.x - a.x);
      };

      var decreasingCorner = upperRight,
        increasingCorner = lowerRight;

      // Our expectations for decreasing or increasing slope values
      // depends on which direction the submenu opens relative to the
      // main menu. By default, if the menu opens on the right, we
      // expect the slope between the cursor and the upper right
      // corner to decrease over time, as explained above. If the
      // submenu opens in a different direction, we change our slope
      // expectations.
      if (options.submenuDirection == "left") {
        decreasingCorner = lowerLeft;
        increasingCorner = upperLeft;
      } else if (options.submenuDirection == "below") {
        decreasingCorner = lowerRight;
        increasingCorner = lowerLeft;
      } else if (options.submenuDirection == "above") {
        decreasingCorner = upperLeft;
        increasingCorner = upperRight;
      }

      var decreasingSlope = slope(loc, decreasingCorner),
        increasingSlope = slope(loc, increasingCorner),
        prevDecreasingSlope = slope(prevLoc, decreasingCorner),
        prevIncreasingSlope = slope(prevLoc, increasingCorner);

      if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {
        // Mouse is moving from previous location towards the
        // currently activated submenu. Delay before activating a
        // new menu row, because user may be moving into submenu.
        lastDelayLoc = loc;
        return DELAY;
      }

      lastDelayLoc = null;
      return 0;
    };

    var reset = function(triggerDeactivate) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (activeRow && triggerDeactivate) {
        options.deactivate(activeRow);
      }

      activeRow = null;
    };

    var destroyInstance = function() {
      menu.removeEventListener('mouseleave', mouseleaveMenu);  
      document.removeEventListener('mousemove', mouseMoveFallback);
      if(rows.length > 0) {
        for(var i = 0; i < rows.length; i++) {
          rows[i].removeEventListener('mouseenter', mouseenterRow);  
          rows[i].removeEventListener('mouseleave', mouseleaveRow);
          rows[i].removeEventListener('click', clickRow);  
        }
      }
      
    };

    /**
     * Hook up initial menu events
     */
    menu.addEventListener('mouseleave', mouseleaveMenu);  
    var rows = (options.rows) ? options.rows : menu.children;
    if(rows.length > 0) {
      for(var i = 0; i < rows.length; i++) {(function(i){
        rows[i].addEventListener('mouseenter', mouseenterRow);  
        rows[i].addEventListener('mouseleave', mouseleaveRow);
        rows[i].addEventListener('click', clickRow);  
      })(i);}
    }

    document.addEventListener('mousemove', mouseMoveFallback);

    /* Reset/destroy menu */
    menu.addEventListener('reset', function(event){
      reset(event.detail);
    });
    menu.addEventListener('destroy', destroyInstance);
  };
}());


// File#: _1_drawer
// Usage: codyhouse.co/license
(function() {
	var Drawer = function(element) {
		this.element = element;
		this.content = document.getElementsByClassName('js-drawer__body')[0];
		this.triggers = document.querySelectorAll('[aria-controls="'+this.element.getAttribute('id')+'"]');
		this.firstFocusable = null;
		this.lastFocusable = null;
		this.selectedTrigger = null;
		this.isModal = Util.hasClass(this.element, 'js-drawer--modal');
		this.showClass = "drawer--is-visible";
		this.initDrawer();
	};

	Drawer.prototype.initDrawer = function() {
		var self = this;
		//open drawer when clicking on trigger buttons
		if ( this.triggers ) {
			for(var i = 0; i < this.triggers.length; i++) {
				this.triggers[i].addEventListener('click', function(event) {
					event.preventDefault();
					if(Util.hasClass(self.element, self.showClass)) {
						self.closeDrawer(event.target);
						return;
					}
					self.selectedTrigger = event.target;
					self.showDrawer();
					self.initDrawerEvents();
				});
			}
		}

		// if drawer is already open -> we should initialize the drawer events
		if(Util.hasClass(this.element, this.showClass)) this.initDrawerEvents();
	};

	Drawer.prototype.showDrawer = function() {
		var self = this;
		this.content.scrollTop = 0;
		Util.addClass(this.element, this.showClass);
		this.getFocusableElements();
		Util.moveFocus(this.element);
		// wait for the end of transitions before moving focus
		this.element.addEventListener("transitionend", function cb(event) {
			Util.moveFocus(self.element);
			self.element.removeEventListener("transitionend", cb);
		});
		this.emitDrawerEvents('drawerIsOpen', this.selectedTrigger);
	};

	Drawer.prototype.closeDrawer = function(target) {
		Util.removeClass(this.element, this.showClass);
		this.firstFocusable = null;
		this.lastFocusable = null;
		if(this.selectedTrigger) this.selectedTrigger.focus();
		//remove listeners
		this.cancelDrawerEvents();
		this.emitDrawerEvents('drawerIsClose', target);
	};

	Drawer.prototype.initDrawerEvents = function() {
		//add event listeners
		this.element.addEventListener('keydown', this);
		this.element.addEventListener('click', this);
	};

	Drawer.prototype.cancelDrawerEvents = function() {
		//remove event listeners
		this.element.removeEventListener('keydown', this);
		this.element.removeEventListener('click', this);
	};

	Drawer.prototype.handleEvent = function (event) {
		switch(event.type) {
			case 'click': {
				this.initClick(event);
			}
			case 'keydown': {
				this.initKeyDown(event);
			}
		}
	};

	Drawer.prototype.initKeyDown = function(event) {
		if( event.keyCode && event.keyCode == 27 || event.key && event.key == 'Escape' ) {
			//close drawer window on esc
			this.closeDrawer(false);
		} else if( this.isModal && (event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab' )) {
			//trap focus inside drawer
			this.trapFocus(event);
		}
	};

	Drawer.prototype.initClick = function(event) {
		//close drawer when clicking on close button or drawer bg layer 
		if( !event.target.closest('.js-drawer__close') && !Util.hasClass(event.target, 'js-drawer') ) return;
		event.preventDefault();
		this.closeDrawer(event.target);
	};

	Drawer.prototype.trapFocus = function(event) {
		if( this.firstFocusable == document.activeElement && event.shiftKey) {
			//on Shift+Tab -> focus last focusable element when focus moves out of drawer
			event.preventDefault();
			this.lastFocusable.focus();
		}
		if( this.lastFocusable == document.activeElement && !event.shiftKey) {
			//on Tab -> focus first focusable element when focus moves out of drawer
			event.preventDefault();
			this.firstFocusable.focus();
		}
	}

	Drawer.prototype.getFocusableElements = function() {
		//get all focusable elements inside the drawer
		var allFocusable = this.element.querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary');
		this.getFirstVisible(allFocusable);
		this.getLastVisible(allFocusable);
	};

	Drawer.prototype.getFirstVisible = function(elements) {
		//get first visible focusable element inside the drawer
		for(var i = 0; i < elements.length; i++) {
			if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
				this.firstFocusable = elements[i];
				return true;
			}
		}
	};

	Drawer.prototype.getLastVisible = function(elements) {
		//get last visible focusable element inside the drawer
		for(var i = elements.length - 1; i >= 0; i--) {
			if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
				this.lastFocusable = elements[i];
				return true;
			}
		}
	};

	Drawer.prototype.emitDrawerEvents = function(eventName, target) {
		var event = new CustomEvent(eventName, {detail: target});
		this.element.dispatchEvent(event);
	};

	window.Drawer = Drawer;

	//initialize the Drawer objects
	var drawer = document.getElementsByClassName('js-drawer');
	if( drawer.length > 0 ) {
		for( var i = 0; i < drawer.length; i++) {
			(function(i){new Drawer(drawer[i]);})(i);
		}
	}
}());
// File#: _1_hiding-nav
// Usage: codyhouse.co/license
(function() {
  var hidingNav = document.getElementsByClassName('js-hide-nav');
  if(hidingNav.length > 0 && window.requestAnimationFrame) {
    var mainNav = Array.prototype.filter.call(hidingNav, function(element) {
      return Util.hasClass(element, 'js-hide-nav--main');
    }),
    subNav = Array.prototype.filter.call(hidingNav, function(element) {
      return Util.hasClass(element, 'js-hide-nav--sub');
    });
    
    var scrolling = false,
      previousTop = window.scrollY,
      currentTop = window.scrollY,
      scrollDelta = 10,
      scrollOffset = 150, // scrollY needs to be bigger than scrollOffset to hide navigation
      headerHeight = 0; 

    var navIsFixed = false; // check if main navigation is fixed
    if(mainNav.length > 0 && Util.hasClass(mainNav[0], 'hide-nav--fixed')) navIsFixed = true;

    // store button that triggers navigation on mobile
    var triggerMobile = getTriggerMobileMenu();
    var prevElement = createPrevElement();
    var mainNavTop = 0;
    // list of classes the hide-nav has when it is expanded -> do not hide if it has those classes
    var navOpenClasses = hidingNav[0].getAttribute('data-nav-target-class'),
      navOpenArrayClasses = [];
    if(navOpenClasses) navOpenArrayClasses = navOpenClasses.split(' ');
    getMainNavTop();
    if(mainNavTop > 0) {
      scrollOffset = scrollOffset + mainNavTop;
    }
    
    // init navigation and listen to window scroll event
    getHeaderHeight();
    initSecondaryNav();
    initFixedNav();
    resetHideNav();
    window.addEventListener('scroll', function(event){
      if(scrolling) return;
      scrolling = true;
      window.requestAnimationFrame(resetHideNav);
    });

    window.addEventListener('resize', function(event){
      if(scrolling) return;
      scrolling = true;
      window.requestAnimationFrame(function(){
        if(headerHeight > 0) {
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
      if(subNav.length < 1 || mainNav.length < 1) return;
      subNav[0].style.top = (headerHeight - 1)+'px';
    };

    function initFixedNav() {
      if(!navIsFixed || mainNav.length < 1) return;
      mainNav[0].style.marginBottom = '-'+headerHeight+'px';
    };

    function resetHideNav() { // check if navs need to be hidden/revealed
      currentTop = window.scrollY;
      if(currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
        hideNavScrollDown();
      } else if( previousTop - currentTop > scrollDelta || (previousTop - currentTop > 0 && currentTop < scrollOffset) ) {
        hideNavScrollUp();
      } else if( previousTop - currentTop > 0 && subNav.length > 0 && subNav[0].getBoundingClientRect().top > 0) {
        setTranslate(subNav[0], '0%');
      }
      // if primary nav is fixed -> toggle bg class
      if(navIsFixed) {
        var scrollTop = window.scrollY || window.pageYOffset;
        Util.toggleClass(mainNav[0], 'hide-nav--has-bg', (scrollTop > headerHeight + mainNavTop));
      }
      previousTop = currentTop;
      scrolling = false;
    };

    function hideNavScrollDown() {
      // if there's a secondary nav -> it has to reach the top before hiding nav
      if( subNav.length  > 0 && subNav[0].getBoundingClientRect().top > headerHeight) return;
      // on mobile -> hide navigation only if dropdown is not open
      if(triggerMobile && triggerMobile.getAttribute('aria-expanded') == "true") return;
      // check if main nav has one of the following classes
      if( mainNav.length > 0 && (!navOpenClasses || !checkNavExpanded())) {
        setTranslate(mainNav[0], '-100%'); 
        mainNav[0].addEventListener('transitionend', addOffCanvasClass);
      }
      if( subNav.length  > 0 ) setTranslate(subNav[0], '-'+headerHeight+'px');
    };

    function hideNavScrollUp() {
      if( mainNav.length > 0 ) {setTranslate(mainNav[0], '0%'); Util.removeClass(mainNav[0], 'hide-nav--off-canvas');mainNav[0].removeEventListener('transitionend', addOffCanvasClass);}
      if( subNav.length  > 0 ) setTranslate(subNav[0], '0%');
    };

    function addOffCanvasClass() {
      mainNav[0].removeEventListener('transitionend', addOffCanvasClass);
      Util.addClass(mainNav[0], 'hide-nav--off-canvas');
    };

    function setTranslate(element, val) {
      element.style.transform = 'translateY('+val+')';
    };

    function getTriggerMobileMenu() {
      // store trigger that toggle mobile navigation dropdown
      var triggerMobileClass = hidingNav[0].getAttribute('data-mobile-trigger');
      if(!triggerMobileClass) return false;
      if(triggerMobileClass.indexOf('#') == 0) { // get trigger by ID
        var trigger = document.getElementById(triggerMobileClass.replace('#', ''));
        if(trigger) return trigger;
      } else { // get trigger by class name
        var trigger = hidingNav[0].getElementsByClassName(triggerMobileClass);
        if(trigger.length > 0) return trigger[0];
      }
      
      return false;
    };

    function createPrevElement() {
      // create element to be inserted right before the mainNav to get its top value
      if( mainNav.length < 1) return false;
      var newElement = document.createElement("div"); 
      newElement.setAttribute('aria-hidden', 'true');
      mainNav[0].parentElement.insertBefore(newElement, mainNav[0]);
      var prevElement =  mainNav[0].previousElementSibling;
      prevElement.style.opacity = '0';
      return prevElement;
    };

    function getMainNavTop() {
      if(!prevElement) return;
      mainNavTop = prevElement.getBoundingClientRect().top + window.scrollY;
    };

    function checkNavExpanded() {
      var navIsOpen = false;
      for(var i = 0; i < navOpenArrayClasses.length; i++){
        if(Util.hasClass(mainNav[0], navOpenArrayClasses[i].trim())) {
          navIsOpen = true;
          break;
        }
      }
      return navIsOpen;
    };
    
  } else {
    // if window requestAnimationFrame is not supported -> add bg class to fixed header
    var mainNav = document.getElementsByClassName('js-hide-nav--main');
    if(mainNav.length < 1) return;
    if(Util.hasClass(mainNav[0], 'hide-nav--fixed')) Util.addClass(mainNav[0], 'hide-nav--has-bg');
  }
}());
// File#: _1_looping_tabs
// Usage: codyhouse.co/license
(function() { 
  var LoopTab = function(opts) {
    this.options = Util.extend(LoopTab.defaults , opts);
		this.element = this.options.element;
		this.tabList = this.element.getElementsByClassName('js-loop-tabs__controls')[0];
		this.listItems = this.tabList.getElementsByTagName('li');
		this.triggers = this.tabList.getElementsByTagName('a');
		this.panelsList = this.element.getElementsByClassName('js-loop-tabs__panels')[0];
    this.panels = Util.getChildrenByClassName(this.panelsList, 'js-loop-tabs__panel');
    this.assetsList = this.element.getElementsByClassName('js-loop-tabs__assets')[0];
		this.assets = this.assetsList.getElementsByTagName('li');
		this.videos = getVideoElements(this);
    this.panelShowClass = 'loop-tabs__panel--selected';
		this.assetShowClass = 'loop-tabs__asset--selected';
		this.assetExitClass = 'loop-tabs__asset--exit';
    this.controlActiveClass = 'loop-tabs__control--selected';
    // autoplay
    this.autoplayPaused = false;
		this.loopTabAutoId = false;
		this.loopFillAutoId = false;
		this.loopFill = 0;
		initLoopTab(this);
	};
	
	function getVideoElements(tab) {
		var videos = [];
		for(var i = 0; i < tab.assets.length; i++) {
			var video = tab.assets[i].getElementsByTagName('video');
			videos[i] = video.length > 0 ? video[0] : false;
		}
		return videos;
	};
  
  function initLoopTab(tab) {
    //set initial aria attributes
		tab.tabList.setAttribute('role', 'tablist');
		for( var i = 0; i < tab.triggers.length; i++) {
			var bool = Util.hasClass(tab.triggers[i], tab.controlActiveClass),
        panelId = tab.panels[i].getAttribute('id');
			tab.listItems[i].setAttribute('role', 'presentation');
			Util.setAttributes(tab.triggers[i], {'role': 'tab', 'aria-selected': bool, 'aria-controls': panelId, 'id': 'tab-'+panelId});
			Util.addClass(tab.triggers[i], 'js-loop-tabs__trigger'); 
      Util.setAttributes(tab.panels[i], {'role': 'tabpanel', 'aria-labelledby': 'tab-'+panelId});
      Util.toggleClass(tab.panels[i], tab.panelShowClass, bool);
			Util.toggleClass(tab.assets[i], tab.assetShowClass, bool);
			
			resetVideo(tab, i, bool); // play/pause video if available

			if(!bool) tab.triggers[i].setAttribute('tabindex', '-1'); 
		}
		// add autoplay-off class if needed
		!tab.options.autoplay && Util.addClass(tab.element, 'loop-tabs--autoplay-off');
		//listen for Tab events
		initLoopTabEvents(tab);
  };

  function initLoopTabEvents(tab) {
		if(tab.options.autoplay) { 
			initLoopTabAutoplay(tab); // init autoplay
			// pause autoplay if user is interacting with the tabs
			tab.element.addEventListener('focusin', function(event){
				pauseLoopTabAutoplay(tab);
				tab.autoplayPaused = true;
			});
			tab.element.addEventListener('focusout', function(event){
				tab.autoplayPaused = false;
				initLoopTabAutoplay(tab);
			});
		}

    //click on a new tab -> select content
		tab.tabList.addEventListener('click', function(event) {
			if( event.target.closest('.js-loop-tabs__trigger') ) triggerLoopTab(tab, event.target.closest('.js-loop-tabs__trigger'), event);
		});
		
    //arrow keys to navigate through tabs 
		tab.tabList.addEventListener('keydown', function(event) {
			if( !event.target.closest('.js-loop-tabs__trigger') ) return;
			if( event.keyCode && event.keyCode == 39 || event.key && event.key.toLowerCase() == 'arrowright' ) {
				pauseLoopTabAutoplay(tab);
				selectNewLoopTab(tab, 'next', true);
			} else if( event.keyCode && event.keyCode == 37 || event.key && event.key.toLowerCase() == 'arrowleft' ) {
				pauseLoopTabAutoplay(tab);
				selectNewLoopTab(tab, 'prev', true);
			}
		});
  };

  function initLoopTabAutoplay(tab) {
		if(!tab.options.autoplay || tab.autoplayPaused) return;
		tab.loopFill = 0;
		var selectedTab = tab.tabList.getElementsByClassName(tab.controlActiveClass)[0];
		// reset css variables
		for(var i = 0; i < tab.triggers.length; i++) {
			if(cssVariableSupport) tab.triggers[i].style.setProperty('--loop-tabs-filling', 0);
		}
		
		tab.loopTabAutoId = setTimeout(function(){
      selectNewLoopTab(tab, 'next', false);
		}, tab.options.autoplayInterval);
		
		if(cssVariableSupport) { // tab fill effect
			tab.loopFillAutoId = setInterval(function(){
				tab.loopFill = tab.loopFill + 0.005;
				selectedTab.style.setProperty('--loop-tabs-filling', tab.loopFill);
			}, tab.options.autoplayInterval/200);
		}
  };

  function pauseLoopTabAutoplay(tab) { // pause autoplay
    if(tab.loopTabAutoId) {
			clearTimeout(tab.loopTabAutoId);
			tab.loopTabAutoId = false;
			clearInterval(tab.loopFillAutoId);
			tab.loopFillAutoId = false;
			// make sure the filling line is scaled up
			var selectedTab = tab.tabList.getElementsByClassName(tab.controlActiveClass);
			if(selectedTab.length > 0) selectedTab[0].style.setProperty('--loop-tabs-filling', 1);
		}
  };

  function selectNewLoopTab(tab, direction, bool) {
    var selectedTab = tab.tabList.getElementsByClassName(tab.controlActiveClass)[0],
			index = Util.getIndexInArray(tab.triggers, selectedTab);
		index = (direction == 'next') ? index + 1 : index - 1;
		//make sure index is in the correct interval 
		//-> from last element go to first using the right arrow, from first element go to last using the left arrow
		if(index < 0) index = tab.listItems.length - 1;
		if(index >= tab.listItems.length) index = 0;	
		triggerLoopTab(tab, tab.triggers[index]);
		bool && tab.triggers[index].focus();
  };

  function triggerLoopTab(tab, tabTrigger, event) {
		pauseLoopTabAutoplay(tab);
		event && event.preventDefault();	
		var index = Util.getIndexInArray(tab.triggers, tabTrigger);
		//no need to do anything if tab was already selected
		if(Util.hasClass(tab.triggers[index], tab.controlActiveClass)) return;
		
		for( var i = 0; i < tab.triggers.length; i++) {
			var bool = (i == index),
				exit = Util.hasClass(tab.triggers[i], tab.controlActiveClass);
			Util.toggleClass(tab.triggers[i], tab.controlActiveClass, bool);
      Util.toggleClass(tab.panels[i], tab.panelShowClass, bool);
			Util.toggleClass(tab.assets[i], tab.assetShowClass, bool);
			Util.toggleClass(tab.assets[i], tab.assetExitClass, exit);
			tab.triggers[i].setAttribute('aria-selected', bool);
			bool ? tab.triggers[i].setAttribute('tabindex', '0') : tab.triggers[i].setAttribute('tabindex', '-1');

			resetVideo(tab, i, bool); // play/pause video if available

			// listen for the end of animation on asset element and remove exit class
			if(exit) {(function(i){
				tab.assets[i].addEventListener('transitionend', function cb(event){
					tab.assets[i].removeEventListener('transitionend', cb);
					Util.removeClass(tab.assets[i], tab.assetExitClass);
				});
			})(i);}
		}
    
    // restart tab autoplay
    initLoopTabAutoplay(tab);
	};

	function resetVideo(tab, i, bool) {
		if(tab.videos[i]) {
			if(bool) {
				tab.videos[i].play();
			} else {
				tab.videos[i].pause();
				tab.videos[i].currentTime = 0;
			} 
		}
	};

  LoopTab.defaults = {
    element : '',
    autoplay : true,
    autoplayInterval: 5000
  };

  //initialize the Tab objects
	var loopTabs = document.getElementsByClassName('js-loop-tabs');
	if( loopTabs.length > 0 ) {
		var reducedMotion = Util.osHasReducedMotion(),
			cssVariableSupport = ('CSS' in window) && Util.cssSupports('color', 'var(--var)');
		for( var i = 0; i < loopTabs.length; i++) {
			(function(i){
        var autoplay = (loopTabs[i].getAttribute('data-autoplay') && loopTabs[i].getAttribute('data-autoplay') == 'off' || reducedMotion) ? false : true,
        autoplayInterval = (loopTabs[i].getAttribute('data-autoplay-interval')) ? loopTabs[i].getAttribute('data-autoplay-interval') : 5000;
        new LoopTab({element: loopTabs[i], autoplay : autoplay, autoplayInterval : autoplayInterval});
      })(i);
		}
	}
}());
// File#: _1_modal-window
// Usage: codyhouse.co/license
(function() {
	var Modal = function(element) {
		this.element = element;
		this.triggers = document.querySelectorAll('[aria-controls="'+this.element.getAttribute('id')+'"]');
		this.firstFocusable = null;
		this.lastFocusable = null;
		this.moveFocusEl = null; // focus will be moved to this element when modal is open
		this.modalFocus = this.element.getAttribute('data-modal-first-focus') ? this.element.querySelector(this.element.getAttribute('data-modal-first-focus')) : null;
		this.selectedTrigger = null;
		this.preventScrollEl = this.getPreventScrollEl();
		this.showClass = "modal--is-visible";
		this.initModal();
	};

	Modal.prototype.getPreventScrollEl = function() {
		var scrollEl = false;
		var querySelector = this.element.getAttribute('data-modal-prevent-scroll');
		if(querySelector) scrollEl = document.querySelector(querySelector);
		return scrollEl;
	};

	Modal.prototype.initModal = function() {
		var self = this;
		//open modal when clicking on trigger buttons
		if ( this.triggers ) {
			for(var i = 0; i < this.triggers.length; i++) {
				this.triggers[i].addEventListener('click', function(event) {
					event.preventDefault();
					if(Util.hasClass(self.element, self.showClass)) {
						self.closeModal();
						return;
					}
					self.selectedTrigger = event.target;
					self.showModal();
					self.initModalEvents();
				});
			}
		}

		// listen to the openModal event -> open modal without a trigger button
		this.element.addEventListener('openModal', function(event){
			if(event.detail) self.selectedTrigger = event.detail;
			self.showModal();
			self.initModalEvents();
		});

		// listen to the closeModal event -> close modal without a trigger button
		this.element.addEventListener('closeModal', function(event){
			if(event.detail) self.selectedTrigger = event.detail;
			self.closeModal();
		});

		// if modal is open by default -> initialise modal events
		if(Util.hasClass(this.element, this.showClass)) this.initModalEvents();
	};

	Modal.prototype.showModal = function() {
		var self = this;
		Util.addClass(this.element, this.showClass);
		this.getFocusableElements();
		if(this.moveFocusEl) {
			this.moveFocusEl.focus();
			// wait for the end of transitions before moving focus
			this.element.addEventListener("transitionend", function cb(event) {
				self.moveFocusEl.focus();
				self.element.removeEventListener("transitionend", cb);
			});
		}
		this.emitModalEvents('modalIsOpen');
		// change the overflow of the preventScrollEl
		if(this.preventScrollEl) this.preventScrollEl.style.overflow = 'hidden';
	};

	Modal.prototype.closeModal = function() {
		if(!Util.hasClass(this.element, this.showClass)) return;
		Util.removeClass(this.element, this.showClass);
		this.firstFocusable = null;
		this.lastFocusable = null;
		this.moveFocusEl = null;
		if(this.selectedTrigger) this.selectedTrigger.focus();
		//remove listeners
		this.cancelModalEvents();
		this.emitModalEvents('modalIsClose');
		// change the overflow of the preventScrollEl
		if(this.preventScrollEl) this.preventScrollEl.style.overflow = '';
	};

	Modal.prototype.initModalEvents = function() {
		//add event listeners
		this.element.addEventListener('keydown', this);
		this.element.addEventListener('click', this);
	};

	Modal.prototype.cancelModalEvents = function() {
		//remove event listeners
		this.element.removeEventListener('keydown', this);
		this.element.removeEventListener('click', this);
	};

	Modal.prototype.handleEvent = function (event) {
		switch(event.type) {
			case 'click': {
				this.initClick(event);
			}
			case 'keydown': {
				this.initKeyDown(event);
			}
		}
	};

	Modal.prototype.initKeyDown = function(event) {
		if( event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab' ) {
			//trap focus inside modal
			this.trapFocus(event);
		} else if( (event.keyCode && event.keyCode == 13 || event.key && event.key == 'Enter') && event.target.closest('.js-modal__close')) {
			event.preventDefault();
			this.closeModal(); // close modal when pressing Enter on close button
		}	
	};

	Modal.prototype.initClick = function(event) {
		//close modal when clicking on close button or modal bg layer 
		if( !event.target.closest('.js-modal__close') && !Util.hasClass(event.target, 'js-modal') ) return;
		event.preventDefault();
		this.closeModal();
	};

	Modal.prototype.trapFocus = function(event) {
		if( this.firstFocusable == document.activeElement && event.shiftKey) {
			//on Shift+Tab -> focus last focusable element when focus moves out of modal
			event.preventDefault();
			this.lastFocusable.focus();
		}
		if( this.lastFocusable == document.activeElement && !event.shiftKey) {
			//on Tab -> focus first focusable element when focus moves out of modal
			event.preventDefault();
			this.firstFocusable.focus();
		}
	}

	Modal.prototype.getFocusableElements = function() {
		//get all focusable elements inside the modal
		var allFocusable = this.element.querySelectorAll(focusableElString);
		this.getFirstVisible(allFocusable);
		this.getLastVisible(allFocusable);
		this.getFirstFocusable();
	};

	Modal.prototype.getFirstVisible = function(elements) {
		//get first visible focusable element inside the modal
		for(var i = 0; i < elements.length; i++) {
			if( isVisible(elements[i]) ) {
				this.firstFocusable = elements[i];
				break;
			}
		}
	};

	Modal.prototype.getLastVisible = function(elements) {
		//get last visible focusable element inside the modal
		for(var i = elements.length - 1; i >= 0; i--) {
			if( isVisible(elements[i]) ) {
				this.lastFocusable = elements[i];
				break;
			}
		}
	};

	Modal.prototype.getFirstFocusable = function() {
		if(!this.modalFocus || !Element.prototype.matches) {
			this.moveFocusEl = this.firstFocusable;
			return;
		}
		var containerIsFocusable = this.modalFocus.matches(focusableElString);
		if(containerIsFocusable) {
			this.moveFocusEl = this.modalFocus;
		} else {
			this.moveFocusEl = false;
			var elements = this.modalFocus.querySelectorAll(focusableElString);
			for(var i = 0; i < elements.length; i++) {
				if( isVisible(elements[i]) ) {
					this.moveFocusEl = elements[i];
					break;
				}
			}
			if(!this.moveFocusEl) this.moveFocusEl = this.firstFocusable;
		}
	};

	Modal.prototype.emitModalEvents = function(eventName) {
		var event = new CustomEvent(eventName, {detail: this.selectedTrigger});
		this.element.dispatchEvent(event);
	};

	function isVisible(element) {
		return element.offsetWidth || element.offsetHeight || element.getClientRects().length;
	};

	window.Modal = Modal;

	//initialize the Modal objects
	var modals = document.getElementsByClassName('js-modal');
	// generic focusable elements string selector
	var focusableElString = '[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary';
	if( modals.length > 0 ) {
		var modalArrays = [];
		for( var i = 0; i < modals.length; i++) {
			(function(i){modalArrays.push(new Modal(modals[i]));})(i);
		}

		window.addEventListener('keydown', function(event){ //close modal window on esc
			if(event.keyCode && event.keyCode == 27 || event.key && event.key.toLowerCase() == 'escape') {
				for( var i = 0; i < modalArrays.length; i++) {
					(function(i){modalArrays[i].closeModal();})(i);
				};
			}
		});
	}
}());
// File#: _1_off-canvas-content
// Usage: codyhouse.co/license
(function() {
  var OffCanvas = function(element) {
    this.element = element;
    this.wrapper = document.getElementsByClassName('js-off-canvas')[0];
    this.main = document.getElementsByClassName('off-canvas__main')[0];
    this.triggers = document.querySelectorAll('[aria-controls="'+this.element.getAttribute('id')+'"]');
    this.closeBtn = this.element.getElementsByClassName('js-off-canvas__close-btn');
    this.selectedTrigger = false;
    this.firstFocusable = null;
    this.lastFocusable = null;
    this.animating = false;
    initOffCanvas(this);
  };	

  function initOffCanvas(panel) {
    let lastScrollTop = 0;
    panel.element.setAttribute('aria-hidden', 'true');
    for(var i = 0 ; i < panel.triggers.length; i++) { // listen to the click on off-canvas content triggers
      document.addEventListener('scroll', function(event){
        const st = window.pageYOffset || document.documentElement.scrollTop;
        console.log('scroll', window.pageYOffset)
        if(st > lastScrollTop){
          panel.selectedTrigger = event.currentTarget;
          // togglePanel(panel);
          openPanel(panel)
          event.preventDefault();
          // window.scrollTo(window.scrollX, window.scrollY - 1);
          // window.scrollTo(window.scrollX, window.scrollY + 1);
        }else{
          panel.selectedTrigger = event.currentTarget;
          // togglePanel(panel);
          closePanel(panel)
          event.preventDefault();
        }
        
        lastScrollTop = st <= 0 ? 0 : st;
      });
    }

    // listen to the triggerOpenPanel event -> open panel without a trigger button
    panel.element.addEventListener('triggerOpenPanel', function(event){
      if(event.detail) panel.selectedTrigger = event.detail;
      openPanel(panel);
    });
    // listen to the triggerClosePanel event -> open panel without a trigger button
    panel.element.addEventListener('triggerClosePanel', function(event){
      closePanel(panel);
    });
  };

  function togglePanel(panel) {
    var status = (panel.element.getAttribute('aria-hidden') == 'true') ? 'close' : 'open';
    if(status == 'close') openPanel(panel);
    else closePanel(panel);
  };

  function openPanel(panel) {
    if(panel.animating) return; // already animating
    emitPanelEvents(panel, 'openPanel', '');
    panel.animating = true;
    panel.element.setAttribute('aria-hidden', 'false');
    Util.addClass(panel.wrapper, 'off-canvas--visible');
    getFocusableElements(panel);
    var transitionEl = panel.element;
    if(panel.closeBtn.length > 0 && !Util.hasClass(panel.closeBtn[0], 'js-off-canvas__a11y-close-btn')) transitionEl = 	panel.closeBtn[0];
    transitionEl.addEventListener('transitionend', function cb(){
      // wait for the end of transition to move focus and update the animating property
      panel.animating = false;
      Util.moveFocus(panel.element);
      transitionEl.removeEventListener('transitionend', cb);
    });
    if(!transitionSupported) panel.animating = false;
    initPanelEvents(panel);
  };

  function closePanel(panel, bool) {
    if(panel.animating) return;
    panel.animating = true;
    panel.element.setAttribute('aria-hidden', 'true');
    Util.removeClass(panel.wrapper, 'off-canvas--visible');
    panel.main.addEventListener('transitionend', function cb(){
      panel.animating = false;
      if(panel.selectedTrigger) panel.selectedTrigger.focus();
      setTimeout(function(){panel.selectedTrigger = false;}, 10);
      panel.main.removeEventListener('transitionend', cb);
    });
    if(!transitionSupported) panel.animating = false;
    cancelPanelEvents(panel);
    emitPanelEvents(panel, 'closePanel', bool);
  };

  function initPanelEvents(panel) { //add event listeners
    panel.element.addEventListener('keydown', handleEvent.bind(panel));
    panel.element.addEventListener('click', handleEvent.bind(panel));
  };

  function cancelPanelEvents(panel) { //remove event listeners
    panel.element.removeEventListener('keydown', handleEvent.bind(panel));
    panel.element.removeEventListener('click', handleEvent.bind(panel));
  };

  function handleEvent(event) {
    switch(event.type) {
      case 'keydown':
        initKeyDown(this, event);
        break;
      case 'click':
        initClick(this, event);
        break;
    }
  };

  function initClick(panel, event) { // close panel when clicking on close button
    if( !event.target.closest('.js-off-canvas__close-btn')) return;
    event.preventDefault();
    closePanel(panel, 'close-btn');
  };

  function initKeyDown(panel, event) {
    if( event.keyCode && event.keyCode == 27 || event.key && event.key == 'Escape' ) {
      //close off-canvas panel on esc
      closePanel(panel, 'key');
    } else if( event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab' ) {
      //trap focus inside panel
      trapFocus(panel, event);
    }
  };

  function trapFocus(panel, event) {
    if( panel.firstFocusable == document.activeElement && event.shiftKey) {
      //on Shift+Tab -> focus last focusable element when focus moves out of panel
      event.preventDefault();
      panel.lastFocusable.focus();
    }
    if( panel.lastFocusable == document.activeElement && !event.shiftKey) {
      //on Tab -> focus first focusable element when focus moves out of panel
      event.preventDefault();
      panel.firstFocusable.focus();
    }
  };

  function getFocusableElements(panel) { //get all focusable elements inside the off-canvas content
    var allFocusable = panel.element.querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary');
    getFirstVisible(panel, allFocusable);
    getLastVisible(panel, allFocusable);
  };

  function getFirstVisible(panel, elements) { //get first visible focusable element inside the off-canvas content
    for(var i = 0; i < elements.length; i++) {
      if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
        panel.firstFocusable = elements[i];
        return true;
      }
    }
  };

  function getLastVisible(panel, elements) { //get last visible focusable element inside the off-canvas content
    for(var i = elements.length - 1; i >= 0; i--) {
      if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
        panel.lastFocusable = elements[i];
        return true;
      }
    }
  };

  function emitPanelEvents(panel, eventName, target) { // emit custom event
    var event = new CustomEvent(eventName, {detail: target});
    panel.element.dispatchEvent(event);
  };

  //initialize the OffCanvas objects
  var offCanvas = document.getElementsByClassName('js-off-canvas__panel'),
    transitionSupported = Util.cssSupports('transition');
  if( offCanvas.length > 0 ) {
    for( var i = 0; i < offCanvas.length; i++) {
      (function(i){new OffCanvas(offCanvas[i]);})(i);
    }
  }
}());
// File#: _1_overscroll-section
// Usage: codyhouse.co/license
(function() {
  var OverscrollSection = function(element) {
    this.element = element;
    this.stickyContent = this.element.getElementsByClassName('js-overscroll-section__sticky-content');
    this.scrollContent = this.element.getElementsByClassName('js-overscroll-section__scroll-content');
    this.scrollingFn = false;
    this.scrolling = false;
    this.resetOpacity = false;
    this.disabledClass = 'overscroll-section--disabled';
    initOverscrollSection(this);
  };

  function initOverscrollSection(element) {
    // set position of sticky element
    setTop(element);
    // create a new node - to be inserted before the scroll element
    createPrevElement(element);
    // on resize -> reset element top position
    element.element.addEventListener('update-overscroll-section', function(){
      setTop(element);
      setPrevElementTop(element);
    });
    // set initial opacity value
    animateOverscrollSection.bind(element)(); 
    // change opacity of layer
    var observer = new IntersectionObserver(overscrollSectionCallback.bind(element));
    observer.observe(element.prevElement);
  };

  function createPrevElement(element) {
    if(element.scrollContent.length == 0) return;
    var newElement = document.createElement("div"); 
    newElement.setAttribute('aria-hidden', 'true');
    element.element.insertBefore(newElement, element.scrollContent[0]);
    element.prevElement =  element.scrollContent[0].previousElementSibling;
    element.prevElement.style.opacity = '0';
    setPrevElementTop(element);
  };

  function setPrevElementTop(element) {
    element.prevElementTop = element.prevElement.getBoundingClientRect().top + window.scrollY;
  };

  function overscrollSectionCallback(entries) {
    if(entries[0].isIntersecting) {
      if(this.scrollingFn) return; // listener for scroll event already added
      overscrollSectionInitEvent(this);
    } else {
      if(!this.scrollingFn) return; // listener for scroll event already removed
      window.removeEventListener('scroll', this.scrollingFn);
      updateOpacityValue(this, 0);
      this.scrollingFn = false;
    }
  };

  function overscrollSectionInitEvent(element) {
    element.scrollingFn = overscrollSectionScrolling.bind(element);
    window.addEventListener('scroll', element.scrollingFn);
  };

  function overscrollSectionScrolling() {
    if(this.scrolling) return;
    this.scrolling = true;
    window.requestAnimationFrame(animateOverscrollSection.bind(this));
  };

  function animateOverscrollSection() {
    if(this.stickyContent.length == 0) return;
    setPrevElementTop(this);
    if( parseInt(this.stickyContent[0].style.top) != window.innerHeight - this.stickyContent[0].offsetHeight) {
      setTop(this);
    }
    if(this.prevElementTop - window.scrollY < window.innerHeight*2/3) {
      var opacity = Math.easeOutQuart(window.innerHeight*2/3 + window.scrollY - this.prevElementTop, 0, 1, window.innerHeight*2/3);
      if(opacity > 0 ) {
        this.resetOpacity = false;
        updateOpacityValue(this, opacity);
      } else if(!this.resetOpacity) {
        this.resetOpacity = true;
        updateOpacityValue(this, 0);
      } 
    } else {
      updateOpacityValue(this, 0);
    }
    this.scrolling = false;
  };

  function updateOpacityValue(element, value) {
    element.element.style.setProperty('--overscroll-section-opacity', value);
  };

  function setTop(element) {
    if(element.stickyContent.length == 0) return;
    var translateValue = window.innerHeight - element.stickyContent[0].offsetHeight;
    element.stickyContent[0].style.top = translateValue+'px';
    // check if effect should be disabled
    Util.toggleClass(element.element, element.disabledClass, translateValue > 2);
  };

  //initialize the OverscrollSection objects
  var overscrollSections = document.getElementsByClassName('js-overscroll-section');
  var stickySupported = Util.cssSupports('position', 'sticky') || Util.cssSupports('position', '-webkit-sticky'),
    intObservSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype),
    reducedMotion = Util.osHasReducedMotion();
	if( overscrollSections.length > 0 && stickySupported && !reducedMotion && intObservSupported) {
    var overscrollSectionsArray = [];
		for( var i = 0; i < overscrollSections.length; i++) {
      (function(i){overscrollSectionsArray.push(new OverscrollSection(overscrollSections[i]));})(i);
    }
    
    var resizingId = false,
      customEvent = new CustomEvent('update-overscroll-section');

    window.addEventListener('resize', function() {
      clearTimeout(resizingId);
      resizingId = setTimeout(doneResizing, 100);
    });

    // wait for font to be loaded
    document.fonts.onloadingdone = function (fontFaceSetEvent) {
      doneResizing();
    };

    function doneResizing() {
      for( var i = 0; i < overscrollSectionsArray.length; i++) {
        (function(i){overscrollSectionsArray[i].element.dispatchEvent(customEvent)})(i);
      };
    };
	}
}());
// File#: _1_parallax-image
// Usage: codyhouse.co/license
(function() {
  var ParallaxImg = function(element, rotationLevel) {
    this.element = element;
    this.figure = this.element.getElementsByClassName('js-parallax-img__assets')[0];
    this.imgs = this.element.getElementsByTagName('img');
    this.maxRotation = rotationLevel || 2; // rotate level
    if(this.maxRotation > 5) this.maxRotation = 5;
    this.scale = 1;
    this.animating = false;
    initParallax(this);
    initParallaxEvents(this);
  };

  function initParallax(element) {
    element.count = 0;
    window.requestAnimationFrame(checkImageLoaded.bind(element));
    for(var i = 0; i < element.imgs.length; i++) {(function(i){
      var loaded = false;
      element.imgs[i].addEventListener('load', function(){
        if(loaded) return;
        element.count = element.count + 1;
      });
      if(element.imgs[i].complete && !loaded) {
        loaded = true;
        element.count = element.count + 1;
      }
    })(i);}
  };

  function checkImageLoaded() {
    if(this.count >= this.imgs.length) {
      initScale(this);
      if(this.loaded) {
        window.cancelAnimationFrame(this.loaded);
        this.loaded = false;
      }
    } else {
      this.loaded = window.requestAnimationFrame(checkImageLoaded.bind(this));
    }
  };

  function initScale(element) {
    var maxImgResize = getMaxScale(element);
    element.scale = maxImgResize/(Math.sin(Math.PI / 2 - element.maxRotation*Math.PI/180));
    element.figure.style.transform = 'scale('+element.scale+')';  
    Util.addClass(element.element, 'parallax-img--loaded');  
  };

  function getMaxScale(element) {
    var minWidth = 0;
    var maxWidth = 0;
    for(var i = 0; i < element.imgs.length; i++) {
      var width = element.imgs[i].getBoundingClientRect().width;
      if(width < minWidth || i == 0 ) minWidth = width;
      if(width > maxWidth || i == 0 ) maxWidth = width;
    }
    var scale = Math.ceil(10*maxWidth/minWidth)/10;
    if(scale < 1.1) scale = 1.1;
    return scale;
  }

  function initParallaxEvents(element) {
    element.element.addEventListener('mousemove', function(event){
      if(element.animating) return;
      element.animating = true;
      window.requestAnimationFrame(moveImage.bind(element, event));
    });
  };

  function moveImage(event, timestamp) {
    var wrapperPosition = this.element.getBoundingClientRect();
    var rotateY = 2*(this.maxRotation/wrapperPosition.width)*(wrapperPosition.left - event.clientX + wrapperPosition.width/2);
    var rotateX = 2*(this.maxRotation/wrapperPosition.height)*(event.clientY - wrapperPosition.top - wrapperPosition.height/2);

    if(rotateY > this.maxRotation) rotateY = this.maxRotation;
		if(rotateY < -1*this.maxRotation) rotateY = -this.maxRotation;
		if(rotateX > this.maxRotation) rotateX = this.maxRotation;
    if(rotateX < -1*this.maxRotation) rotateX = -this.maxRotation;
    this.figure.style.transform = 'scale('+this.scale+') rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)';
    this.animating = false;
  };

  window.ParallaxImg = ParallaxImg;

  //initialize the ParallaxImg objects
	var parallaxImgs = document.getElementsByClassName('js-parallax-img');
	if( parallaxImgs.length > 0 && Util.cssSupports('transform', 'translateZ(0px)')) {
		for( var i = 0; i < parallaxImgs.length; i++) {
			(function(i){
        var rotationLevel = parallaxImgs[i].getAttribute('data-perspective');
        new ParallaxImg(parallaxImgs[i], rotationLevel);
      })(i);
		}
	};
}());
// File#: _1_reveal-effects
// Usage: codyhouse.co/license
(function() {
    var fxElements = document.getElementsByClassName('reveal-fx');
    var intersectionObserverSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype);
    if(fxElements.length > 0) {
      // deactivate effect if Reduced Motion is enabled
      if (Util.osHasReducedMotion() || !intersectionObserverSupported) {
        fxRemoveClasses();
        return;
      }
      //on small devices, do not animate elements -> reveal all
      if( fxDisabled(fxElements[0]) ) {
        fxRevealAll();
        return;
      }
  
      var fxRevealDelta = 120; // amount (in pixel) the element needs to enter the viewport to be revealed - if not custom value (data-reveal-fx-delta)
      
      var viewportHeight = window.innerHeight,
        fxChecking = false,
        fxRevealedItems = [],
        fxElementDelays = fxGetDelays(), //elements animation delay
        fxElementDeltas = fxGetDeltas(); // amount (in px) the element needs enter the viewport to be revealed (default value is fxRevealDelta) 
      
      
      // add event listeners
      window.addEventListener('load', fxReveal);
      window.addEventListener('resize', fxResize);
      window.addEventListener('restartAll', fxRestart);
  
      // observe reveal elements
      var observer = [];
      initObserver();
  
      function initObserver() {
        for(var i = 0; i < fxElements.length; i++) {
          observer[i] = new IntersectionObserver(
            function(entries, observer) { 
              if(entries[0].isIntersecting) {
                fxRevealItemObserver(entries[0].target);
                observer.unobserve(entries[0].target);
              }
            }, 
            {rootMargin: "0px 0px -"+fxElementDeltas[i]+"px 0px"}
          );
    
          observer[i].observe(fxElements[i]);
        }
      };
  
      function fxRevealAll() { // reveal all elements - small devices
        for(var i = 0; i < fxElements.length; i++) {
          Util.addClass(fxElements[i], 'reveal-fx--is-visible');
        }
      };
  
      function fxResize() { // on resize - check new window height and reveal visible elements
        if(fxChecking) return;
        fxChecking = true;
        (!window.requestAnimationFrame) ? setTimeout(function(){fxReset();}, 250) : window.requestAnimationFrame(fxReset);
      };
  
      function fxReset() {
        viewportHeight = window.innerHeight;
        fxReveal();
      };
  
      function fxReveal() { // reveal visible elements
        for(var i = 0; i < fxElements.length; i++) {(function(i){
          if(fxRevealedItems.indexOf(i) != -1 ) return; //element has already been revelead
          if(fxElementIsVisible(fxElements[i], i)) {
            fxRevealItem(i);
            fxRevealedItems.push(i);
          }})(i); 
        }
        fxResetEvents(); 
        fxChecking = false;
      };
  
      function fxRevealItem(index) {
        if(fxElementDelays[index] && fxElementDelays[index] != 0) {
          // wait before revealing element if a delay was added
          setTimeout(function(){
            Util.addClass(fxElements[index], 'reveal-fx--is-visible');
          }, fxElementDelays[index]);
        } else {
          Util.addClass(fxElements[index], 'reveal-fx--is-visible');
        }
      };
  
      function fxRevealItemObserver(item) {
        var index = Util.getIndexInArray(fxElements, item);
        if(fxRevealedItems.indexOf(index) != -1 ) return; //element has already been revelead
        fxRevealItem(index);
        fxRevealedItems.push(index);
        fxResetEvents(); 
        fxChecking = false;
      };
  
      function fxGetDelays() { // get anmation delays
        var delays = [];
        for(var i = 0; i < fxElements.length; i++) {
          delays.push( fxElements[i].getAttribute('data-reveal-fx-delay') ? parseInt(fxElements[i].getAttribute('data-reveal-fx-delay')) : 0);
        }
        return delays;
      };
  
      function fxGetDeltas() { // get reveal delta
        var deltas = [];
        for(var i = 0; i < fxElements.length; i++) {
          deltas.push( fxElements[i].getAttribute('data-reveal-fx-delta') ? parseInt(fxElements[i].getAttribute('data-reveal-fx-delta')) : fxRevealDelta);
        }
        return deltas;
      };
  
      function fxDisabled(element) { // check if elements need to be animated - no animation on small devices
        return !(window.getComputedStyle(element, '::before').getPropertyValue('content').replace(/'|"/g, "") == 'reveal-fx');
      };
  
      function fxElementIsVisible(element, i) { // element is inside viewport
        return (fxGetElementPosition(element) <= viewportHeight - fxElementDeltas[i]);
      };
  
      function fxGetElementPosition(element) { // get top position of element
        return element.getBoundingClientRect().top;
      };
  
      function fxResetEvents() { 
        if(fxElements.length > fxRevealedItems.length) return;
        // remove event listeners if all elements have been revealed
        window.removeEventListener('load', fxReveal);
        window.removeEventListener('resize', fxResize);
      };
  
      function fxRemoveClasses() {
        // Reduced Motion on or Intersection Observer not supported
        while(fxElements[0]) {
          // remove all classes starting with 'reveal-fx--'
          var classes = fxElements[0].getAttribute('class').split(" ").filter(function(c) {
            return c.lastIndexOf('reveal-fx--', 0) !== 0;
          });
          fxElements[0].setAttribute('class', classes.join(" ").trim());
          Util.removeClass(fxElements[0], 'reveal-fx');
        }
      };
  
      function fxRestart() {
        // restart the reveal effect -> hide all elements and re-init the observer
        if (Util.osHasReducedMotion() || !intersectionObserverSupported || fxDisabled(fxElements[0])) {
          return;
        }
        // check if we need to add the event listensers back
        if(fxElements.length <= fxRevealedItems.length) {
          window.addEventListener('load', fxReveal);
          window.addEventListener('resize', fxResize);
        }
        // remove observer and reset the observer array
        for(var i = 0; i < observer.length; i++) {
          if(observer[i]) observer[i].disconnect();
        }
        observer = [];
        // remove visible class
        for(var i = 0; i < fxElements.length; i++) {
          Util.removeClass(fxElements[i], 'reveal-fx--is-visible');
        }
        // reset fxRevealedItems array
        fxRevealedItems = [];
        // restart observer
        initObserver();
      };
    }
  }());
// File#: _1_revealing-section
// Usage: codyhouse.co/license
(function() {
  var RevealingSection = function(element) {
    this.element = element;
    this.scrollingFn = false;
    this.scrolling = false;
    this.resetOpacity = false;
    initRevealingSection(this);
  };

  function initRevealingSection(element) {
    // set position of sticky element
    setBottom(element);
    // create a new node - to be inserted before the sticky element
    createPrevElement(element);
    // on resize -> reset element bottom position
    element.element.addEventListener('update-reveal-section', function(){
      setBottom(element);
      setPrevElementTop(element);
    });
    animateRevealingSection.bind(element)(); // set initial status
    // change opacity of layer
    var observer = new IntersectionObserver(revealingSectionCallback.bind(element));
		observer.observe(element.prevElement);
  };

  function createPrevElement(element) {
    var newElement = document.createElement("div"); 
    newElement.setAttribute('aria-hidden', 'true');
    element.element.parentElement.insertBefore(newElement, element.element);
    element.prevElement =  element.element.previousElementSibling;
    element.prevElement.style.opacity = '0';
    element.prevElement.style.height = '1px';
    setPrevElementTop(element);
  };

  function setPrevElementTop(element) {
    element.prevElementTop = element.prevElement.getBoundingClientRect().top + window.scrollY;
  };

  function revealingSectionCallback(entries, observer) {
		if(entries[0].isIntersecting) {
      if(this.scrollingFn) return; // listener for scroll event already added
      revealingSectionInitEvent(this);
    } else {
      if(!this.scrollingFn) return; // listener for scroll event already removed
      window.removeEventListener('scroll', this.scrollingFn);
      updateOpacityValue(this, 0);
      this.scrollingFn = false;
    }
  };
  
  function revealingSectionInitEvent(element) {
    element.scrollingFn = revealingSectionScrolling.bind(element);
    window.addEventListener('scroll', element.scrollingFn);
  };

  function revealingSectionScrolling() {
    if(this.scrolling) return;
    this.scrolling = true;
    window.requestAnimationFrame(animateRevealingSection.bind(this));
  };

  function animateRevealingSection() {
    if(this.prevElementTop - window.scrollY < window.innerHeight) {
      var opacity = (1 - (window.innerHeight + window.scrollY - this.prevElementTop)/window.innerHeight).toFixed(2);
      if(opacity > 0 ) {
        this.resetOpacity = false;
        updateOpacityValue(this, opacity);
      } else if(!this.resetOpacity) {
        this.resetOpacity = true;
        updateOpacityValue(this, 0);
      } 
    }
    this.scrolling = false;
  };

  function updateOpacityValue(element, value) {
    element.element.style.setProperty('--reavealing-section-overlay-opacity', value);
  };

  function setBottom(element) {
    var translateValue = window.innerHeight - element.element.offsetHeight;
    if(translateValue > 0) translateValue = 0;
    element.element.style.bottom = ''+translateValue+'px';
  };

  //initialize the Revealing Section objects
  var revealingSection = document.getElementsByClassName('js-revealing-section');
  var stickySupported = Util.cssSupports('position', 'sticky') || Util.cssSupports('position', '-webkit-sticky');
	if( revealingSection.length > 0 && stickySupported) {
    var revealingSectionArray = [];
		for( var i = 0; i < revealingSection.length; i++) {
      (function(i){revealingSectionArray.push(new RevealingSection(revealingSection[i]));})(i);
    }
    
    var resizingId = false,
      customEvent = new CustomEvent('update-reveal-section');

    window.addEventListener('resize', function() {
      clearTimeout(resizingId);
      resizingId = setTimeout(doneResizing, 100);
    });

    // wait for font to be loaded
    if(document.fonts) {
      document.fonts.onloadingdone = function (fontFaceSetEvent) {
        doneResizing();
      };
    }

    function doneResizing() {
      for( var i = 0; i < revealingSectionArray.length; i++) {
        (function(i){revealingSectionArray[i].element.dispatchEvent(customEvent)})(i);
      };
    };
	}
}());
// File#: _1_scrolling-animations
// Usage: codyhouse.co/license
(function() {
  var ScrollFx = function(element, scrollableSelector) {
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
    if(Util.osHasReducedMotion()) return;
    // get scrollable element
    setScrollableElement(element);
    // get animation params
    var animation = element.element.getAttribute('data-scroll-fx');
    if(animation) {
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
    if(element.scrollableSelector) element.scrollableElement = document.querySelector(element.scrollableSelector);
  };

  function initObserver(element) {
    for(var i = 0; i < element.options.length; i++) {
      (function(i){
        element.scrollingFx[i] = false;
        element.deltaScrolling[i] = getDeltaScrolling(element, i);
        element.animating[i] = false;

        element.observer[i] = new IntersectionObserver(
          function(entries, observer) { 
            scrollFxCallback(element, i, entries, observer);
          },
          {
            rootMargin: (element.options[i][5] -100)+"% 0px "+(0 - element.options[i][4])+"% 0px"
          }
        );
    
        element.observer[i].observe(element.element);

        // set initial value
        setTimeout(function(){
          animateScrollFx.bind(element, i)();
        })
      })(i);
    }
  };

  function scrollFxCallback(element, index, entries, observer) {
		if(entries[0].isIntersecting) {
      if(element.scrollingFx[index]) return; // listener for scroll event already added
      // reset delta
      resetDeltaBeforeAnim(element, index);
      triggerAnimateScrollFx(element, index);
    } else {
      if(!element.scrollingFx[index]) return; // listener for scroll event already removed
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
    if(getScrollY(this) < this.deltaScrolling[index][0]) {
      setCSSProperty(this, index, this.options[index][1]);
      return;
    }
    if(getScrollY(this) > this.deltaScrolling[index][1]) {
      setCSSProperty(this, index, this.options[index][2]);
      return;
    }
    if(this.animating[index]) return;
    this.animating[index] = true;
    window.requestAnimationFrame(updatePropertyScroll.bind(this, index));
  };

  function updatePropertyScroll(index) { // get value
    // check if this is a theme value or a css property
    if(isNaN(this.options[index][1])) {
      // this is a theme value to update
      (getScrollY(this) >= this.deltaScrolling[index][1]) 
        ? setCSSProperty(this, index, this.options[index][2])
        : setCSSProperty(this, index, this.options[index][1]);
    } else {
      // this is a CSS property
      var value = this.options[index][1] + (this.options[index][2] - this.options[index][1])*(getScrollY(this) - this.deltaScrolling[index][0])/(this.deltaScrolling[index][1] - this.deltaScrolling[index][0]);
      // update css property
      setCSSProperty(this, index, value);
    }
    
    this.animating[index] = false;
  };

  function setCSSProperty(element, index, value) {
    if(isNaN(value)) {
      // this is a theme value that needs to be updated
      setThemeValue(element, value);
      return;
    }
    if(element.options[index][0] == '--scroll-fx-skew' || element.options[index][0] == '--scroll-fx-scale') {
      // set 2 different CSS properties for the transformation on both x and y axis
      element.element.style.setProperty(element.options[index][0]+'-x', value+element.options[index][3]);
      element.element.style.setProperty(element.options[index][0]+'-y', value+element.options[index][3]);
    } else {
      // set single CSS property
      element.element.style.setProperty(element.options[index][0], value+element.options[index][3]);
    }
  };

  function setThemeValue(element, value) {
    // if value is different from the theme in use -> update it
    if(element.element.getAttribute('data-theme') != value) {
      Util.addClass(element.element, 'scroll-fx--theme-transition');
      element.element.offsetWidth;
      element.element.setAttribute('data-theme', value);
      element.element.addEventListener('transitionend', function cb(){
        element.element.removeEventListener('transitionend', cb);
        Util.removeClass(element.element, 'scroll-fx--theme-transition');
      });
    }
  };

  function getAnimations(element, index) {
    var option = element.element.getAttribute('data-scroll-fx-'+index);
    if(option) {
      // multiple animations for the same element - iterate through them
      element.options.push(extractAnimation(option));
      getAnimations(element, index+1);
    } 
    return;
  };

  function extractAnimation(option) {
    var array = option.split(',').map(function(item) {
      return item.trim();
    });
    var propertyOptions = getPropertyValues(array[1], array[2]);
    var animation = [getPropertyLabel(array[0]), propertyOptions[0], propertyOptions[1], propertyOptions[2], parseInt(array[3]), parseInt(array[4])];
    return animation;
  };

  function getPropertyLabel(property) {
    var propertyCss = '--scroll-fx-';
    for(var i = 0; i < property.length; i++) {
      propertyCss = (property[i] == property[i].toUpperCase())
        ? propertyCss + '-'+property[i].toLowerCase()
        : propertyCss +property[i];
    }
    if(propertyCss == '--scroll-fx-rotate') {
      propertyCss = '--scroll-fx-rotate-z';
    } else if(propertyCss == '--scroll-fx-translate') {
      propertyCss = '--scroll-fx-translate-x';
    }
    return propertyCss;
  };

  function getPropertyValues(val1, val2) {
    var nbVal1 = parseFloat(val1), 
      nbVal2 = parseFloat(val2),
      unit = val1.replace(nbVal1, '');
    if(isNaN(nbVal1)) {
      // property is a theme value
      nbVal1 = val1;
      nbVal2 = val2;
      unit = '';
    }
    return [nbVal1, nbVal2, unit];
  };

  function getDeltaScrolling(element, index) {
    // this retrieve the max and min scroll value that should trigger the animation
    var topDelta = getScrollY(element) - (element.windowHeight - (element.windowHeight + element.boundingRect.height)*element.options[index][4]/100) + element.boundingRect.top,
      bottomDelta = getScrollY(element) - (element.windowHeight - (element.windowHeight + element.boundingRect.height)*element.options[index][5]/100) + element.boundingRect.top;
    return [topDelta, bottomDelta];
  };

  function initResize(element) {
    var resizingId = false;
    window.addEventListener('resize', function() {
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
    for(var i = 0; i < this.deltaScrolling.length; i++) {
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
    if(!element.scrollableElement) return window.scrollY;
    return element.scrollableElement.scrollTop;
  }

  window.ScrollFx = ScrollFx;

  var scrollFx = document.getElementsByClassName('js-scroll-fx');
  for(var i = 0; i < scrollFx.length; i++) {
    (function(i){
      var scrollableElement = scrollFx[i].getAttribute('data-scrollable-element');
      new ScrollFx(scrollFx[i], scrollableElement);
    })(i);
  }
}());
// File#: _1_sticky-hero
// Usage: codyhouse.co/license
(function() {
	var StickyBackground = function(element) {
		this.element = element;
		this.scrollingElement = this.element.getElementsByClassName('sticky-hero__content')[0];
		this.nextElement = this.element.nextElementSibling;
		this.scrollingTreshold = 0;
		this.nextTreshold = 0;
		initStickyEffect(this);
	};

	function initStickyEffect(element) {
		var observer = new IntersectionObserver(stickyCallback.bind(element), { threshold: [0, 0.1, 1] });
		observer.observe(element.scrollingElement);
		if(element.nextElement) observer.observe(element.nextElement);
	};

	function stickyCallback(entries, observer) {
		var threshold = entries[0].intersectionRatio.toFixed(1);
		(entries[0].target ==  this.scrollingElement)
			? this.scrollingTreshold = threshold
			: this.nextTreshold = threshold;

		Util.toggleClass(this.element, 'sticky-hero--media-is-fixed', (this.nextTreshold > 0 || this.scrollingTreshold > 0));
	};


	var stickyBackground = document.getElementsByClassName('js-sticky-hero'),
		intersectionObserverSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype);
	if(stickyBackground.length > 0 && intersectionObserverSupported) { // if IntersectionObserver is not supported, animations won't be triggeres
		for(var i = 0; i < stickyBackground.length; i++) {
			(function(i){ // if animations are enabled -> init the StickyBackground object
        if( Util.hasClass(stickyBackground[i], 'sticky-hero--overlay-layer') || Util.hasClass(stickyBackground[i], 'sticky-hero--scale')) new StickyBackground(stickyBackground[i]);
      })(i);
		}
	}
}());
// File#: _1_swipe-content
(function() {
	var SwipeContent = function(element) {
		this.element = element;
		this.delta = [false, false];
		this.dragging = false;
		this.intervalId = false;
		initSwipeContent(this);
	};

	function initSwipeContent(content) {
		content.element.addEventListener('mousedown', handleEvent.bind(content));
		content.element.addEventListener('touchstart', handleEvent.bind(content));
	};

	function initDragging(content) {
		//add event listeners
		content.element.addEventListener('mousemove', handleEvent.bind(content));
		content.element.addEventListener('touchmove', handleEvent.bind(content));
		content.element.addEventListener('mouseup', handleEvent.bind(content));
		content.element.addEventListener('mouseleave', handleEvent.bind(content));
		content.element.addEventListener('touchend', handleEvent.bind(content));
	};

	function cancelDragging(content) {
		//remove event listeners
		if(content.intervalId) {
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
		switch(event.type) {
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
		if(content.delta && (content.delta[0] || content.delta[0] === 0)) {
	    var s = getSign(dx - content.delta[0]);
			
			if(Math.abs(dx - content.delta[0]) > 30) {
				(s < 0) ? emitSwipeEvents(content, 'swipeLeft', [dx, dy]) : emitSwipeEvents(content, 'swipeRight', [dx, dy]);	
			}
	    
	    content.delta[0] = false;
	  }
		// check if there was a top/bottom swipe
	  if(content.delta && (content.delta[1] || content.delta[1] === 0)) {
	  	var y = getSign(dy - content.delta[1]);

	  	if(Math.abs(dy - content.delta[1]) > 30) {
	    	(y < 0) ? emitSwipeEvents(content, 'swipeUp', [dx, dy]) : emitSwipeEvents(content, 'swipeDown', [dx, dy]);
	    }

	    content.delta[1] = false;
	  }
		// emit drag end event
	  emitSwipeEvents(content, 'dragEnd', [dx, dy]);
	  content.dragging = false;
	};

	function drag(content, event) {
		if(!content.dragging) return;
		// emit dragging event with coordinates
		(!window.requestAnimationFrame) 
			? content.intervalId = setTimeout(function(){emitDrag.bind(content, event);}, 250) 
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
		if(el) trigger = el;
		// emit event with coordinates
		var event = new CustomEvent(eventName, {detail: {x: detail[0], y: detail[1], origin: trigger}});
		content.element.dispatchEvent(event);
	};

	function getSign(x) {
		if(!Math.sign) {
			return ((x > 0) - (x < 0)) || +x;
		} else {
			return Math.sign(x);
		}
	};

	window.SwipeContent = SwipeContent;
	
	//initialize the SwipeContent objects
	var swipe = document.getElementsByClassName('js-swipe-content');
	if( swipe.length > 0 ) {
		for( var i = 0; i < swipe.length; i++) {
			(function(i){new SwipeContent(swipe[i]);})(i);
		}
	}
}());
// File#: _1_vertical-timeline
// Usage: codyhouse.co/license
(function() {
    var VTimeline = function(element) {
      this.element = element;
      this.sections = this.element.getElementsByClassName('js-v-timeline__section');
      this.animate = this.element.getAttribute('data-animation') && this.element.getAttribute('data-animation') == 'on' ? true : false;
      this.animationClass = 'v-timeline__section--animate';
      this.animationDelta = '-150px';
      initVTimeline(this);
    };
  
    function initVTimeline(element) {
      if(!element.animate) return;
      for(var i = 0; i < element.sections.length; i++) {
        var observer = new IntersectionObserver(vTimelineCallback.bind(element, i),
        {rootMargin: "0px 0px "+element.animationDelta+" 0px"});
        observer.observe(element.sections[i]);
      }
    };
  
    function vTimelineCallback(index, entries, observer) {
      if(entries[0].isIntersecting) {
        Util.addClass(this.sections[index], this.animationClass);
        observer.unobserve(this.sections[index]);
      } 
    };
  
    //initialize the VTimeline objects
    var timelines = document.querySelectorAll('.js-v-timeline'),
      intersectionObserverSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype),
      reducedMotion = Util.osHasReducedMotion();
    if( timelines.length > 0) {
      for( var i = 0; i < timelines.length; i++) {
        if(intersectionObserverSupported && !reducedMotion) (function(i){new VTimeline(timelines[i]);})(i);
        else timelines[i].removeAttribute('data-animation');
      }
    }
  }());
// File#: _2_carousel
// Usage: codyhouse.co/license
(function() {
  var Carousel = function(opts) {
    this.options = Util.extend(Carousel.defaults , opts);
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
    if(this.options.nav) this.options.loop = false;
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
  Carousel.prototype.showNext = function() {
    showNextItems(this);
  };

  Carousel.prototype.showPrev = function() {
    showPrevItems(this);
  };

  Carousel.prototype.startAutoplay = function() {
    startAutoplay(this);
  };

  Carousel.prototype.pauseAutoplay = function() {
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

    if(!carousel.itemAutoSize) {
      carousel.itemAutoSize = itemWidth;
    }

    // if carousel.listWrapper is hidden -> make sure to retrieve the proper width
    containerWidth = getCarouselWidth(carousel, containerWidth);

    if( !carousel.itemOriginalWidth) { // on resize -> use initial width of items to recalculate 
      carousel.itemOriginalWidth = itemWidth;
    } else {
      itemWidth = carousel.itemOriginalWidth;
    }

    if(carousel.itemAutoSize) {
      carousel.itemOriginalWidth = parseInt(carousel.itemAutoSize);
      itemWidth = carousel.itemOriginalWidth;
    }
    // make sure itemWidth is smaller than container width
    if(containerWidth < itemWidth) {
      carousel.itemOriginalWidth = containerWidth
      itemWidth = carousel.itemOriginalWidth;
    }
    // get proper width of elements
    carousel.visibItemsNb = parseInt((containerWidth - 2*containerPadding + itemMargin)/(itemWidth+itemMargin));
    carousel.itemsWidth = parseFloat( (((containerWidth - 2*containerPadding + itemMargin)/carousel.visibItemsNb) - itemMargin).toFixed(1));
    carousel.containerWidth = (carousel.itemsWidth+itemMargin)* carousel.items.length;
    carousel.translateContainer = 0 - ((carousel.itemsWidth+itemMargin)* carousel.visibItemsNb);
    // flexbox fallback
    if(!flexSupported) carousel.list.style.width = (carousel.itemsWidth + itemMargin)*carousel.visibItemsNb*3+'px';
    
    // this is used when loop == off
    carousel.totTranslate = 0 - carousel.selectedItem*(carousel.itemsWidth+itemMargin);
    if(carousel.items.length <= carousel.visibItemsNb) carousel.totTranslate = 0;

    centerItems(carousel); // center items if carousel.items.length < visibItemsNb
    alignControls(carousel); // check if controls need to be aligned to a different element
  };

  function setItemsWidth(carousel, bool) {
    for(var i = 0; i < carousel.items.length; i++) {
      carousel.items[i].style.width = carousel.itemsWidth+"px";
      if(bool) carousel.initItems.push(carousel.items[i]);
    }
  };

  function updateCarouselClones(carousel) { 
    if(!carousel.options.loop) return;
    // take care of clones after visible items (needs to run after the update of clones before visible items)
    if(carousel.items.length < carousel.visibItemsNb*3) {
      insertAfter(carousel, carousel.visibItemsNb*3 - carousel.items.length, carousel.items.length - carousel.visibItemsNb*2);
    } else if(carousel.items.length > carousel.visibItemsNb*3 ) {
      removeClones(carousel, carousel.visibItemsNb*3, carousel.items.length - carousel.visibItemsNb*3);
    }
    // set proper translate value for the container
    setTranslate(carousel, 'translateX('+carousel.translateContainer+'px)');
  };

  function initCarouselEvents(carousel) {
    // listen for click on previous/next arrow
    // dots navigation
    if(carousel.options.nav) {
      carouselCreateNavigation(carousel);
      carouselInitNavigationEvents(carousel);
    }

    if(carousel.controls.length > 0) {
      carousel.controls[0].addEventListener('click', function(event){
        event.preventDefault();
        showPrevItems(carousel);
        updateAriaLive(carousel);
      });
      carousel.controls[1].addEventListener('click', function(event){
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
    if(carousel.options.autoplay) {
      startAutoplay(carousel);
      // pause autoplay if user is interacting with the carousel
      carousel.element.addEventListener('mouseenter', function(event){
        pauseAutoplay(carousel);
        carousel.autoplayPaused = true;
      });
      carousel.element.addEventListener('focusin', function(event){
        pauseAutoplay(carousel);
        carousel.autoplayPaused = true;
      });
      carousel.element.addEventListener('mouseleave', function(event){
        carousel.autoplayPaused = false;
        startAutoplay(carousel);
      });
      carousel.element.addEventListener('focusout', function(event){
        carousel.autoplayPaused = false;
        startAutoplay(carousel);
      });
    }
    // drag events
    if(carousel.options.drag && window.requestAnimationFrame) {
      //init dragging
      new SwipeContent(carousel.element);
      carousel.element.addEventListener('dragStart', function(event){
        if(event.detail.origin && event.detail.origin.closest('.js-carousel__control')) return;
        if(event.detail.origin && event.detail.origin.closest('.js-carousel__navigation')) return;
        if(event.detail.origin && !event.detail.origin.closest('.carousel__wrapper')) return;
        Util.addClass(carousel.element, 'carousel--is-dragging');
        pauseAutoplay(carousel);
        carousel.dragStart = event.detail.x;
        animateDragEnd(carousel);
      });
      carousel.element.addEventListener('dragging', function(event){
        if(!carousel.dragStart) return;
        if(carousel.animating || Math.abs(event.detail.x - carousel.dragStart) < 10) return;
        var translate = event.detail.x - carousel.dragStart + carousel.translateContainer;
        if(!carousel.options.loop) {
          translate = event.detail.x - carousel.dragStart + carousel.totTranslate; 
        }
        setTranslate(carousel, 'translateX('+translate+'px)');
      });
    }
    // reset on resize
    window.addEventListener('resize', function(event){
      pauseAutoplay(carousel);
      clearTimeout(carousel.resizeId);
      carousel.resizeId = setTimeout(function(){
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
    carousel.element.addEventListener('keydown', function(event){
			if(event.keyCode && event.keyCode == 39 || event.key && event.key.toLowerCase() == 'arrowright') {
				carousel.showNext();
			} else if(event.keyCode && event.keyCode == 37 || event.key && event.key.toLowerCase() == 'arrowleft') {
				carousel.showPrev();
			}
		});
  };

  function showPrevItems(carousel) {
    if(carousel.animating) return;
    carousel.animating = true;
    carousel.selectedItem = getIndex(carousel, carousel.selectedItem - carousel.visibItemsNb);
    animateList(carousel, '0', 'prev');
  };

  function showNextItems(carousel) {
    if(carousel.animating) return;
    carousel.animating = true;
    carousel.selectedItem = getIndex(carousel, carousel.selectedItem + carousel.visibItemsNb);
    animateList(carousel, carousel.translateContainer*2+'px', 'next');
  };

  function animateDragEnd(carousel) { // end-of-dragging animation
    carousel.element.addEventListener('dragEnd', function cb(event){
      carousel.element.removeEventListener('dragEnd', cb);
      Util.removeClass(carousel.element, 'carousel--is-dragging');
      if(event.detail.x - carousel.dragStart < -40) {
        carousel.animating = false;
        showNextItems(carousel);
      } else if(event.detail.x - carousel.dragStart > 40) {
        carousel.animating = false;
        showPrevItems(carousel);
      } else if(event.detail.x - carousel.dragStart == 0) { // this is just a click -> no dragging
        return;
      } else { // not dragged enought -> do not update carousel, just reset
        carousel.animating = true;
        animateList(carousel, carousel.translateContainer+'px', false);
      }
      carousel.dragStart = false;
    });
  };

  function animateList(carousel, translate, direction) { // takes care of changing visible items
    pauseAutoplay(carousel);
    Util.addClass(carousel.list, 'carousel__list--animating');
    var initTranslate = carousel.totTranslate;
    if(!carousel.options.loop) {
      translate = noLoopTranslateValue(carousel, direction);
    }
    setTimeout(function() {setTranslate(carousel, 'translateX('+translate+')');});
    if(transitionSupported) {
      carousel.list.addEventListener('transitionend', function cb(event){
        if(event.propertyName && event.propertyName != 'transform') return;
        Util.removeClass(carousel.list, 'carousel__list--animating');
        carousel.list.removeEventListener('transitionend', cb);
        animateListCb(carousel, direction);
      });
    } else {
      animateListCb(carousel, direction);
    }
    if(!carousel.options.loop && (initTranslate == carousel.totTranslate)) {
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
    if(direction == 'next') {
      translate = carousel.totTranslate + carousel.translateContainer;
    } else if(direction == 'prev') {
      translate = carousel.totTranslate - carousel.translateContainer;
    } else if(direction == 'click') {
      translate = carousel.selectedDotIndex*carousel.translateContainer;
    }
    if(translate > 0)  {
      translate = 0;
      carousel.selectedItem = 0;
    }
    if(translate < - carousel.translateContainer - carousel.containerWidth) {
      translate = - carousel.translateContainer - carousel.containerWidth;
      carousel.selectedItem = carousel.items.length - carousel.visibItemsNb;
    }
    if(carousel.visibItemsNb > carousel.items.length) translate = 0;
    carousel.totTranslate = translate;
    return translate + 'px';
  };

  function animateListCb(carousel, direction) { // reset actions after carousel has been updated
    if(direction) updateClones(carousel, direction);
    carousel.animating = false;
    // reset autoplay
    startAutoplay(carousel);
    // reset tab index
    resetItemsTabIndex(carousel);
  };

  function updateClones(carousel, direction) {
    if(!carousel.options.loop) return;
    // at the end of each animation, we need to update the clones before and after the visible items
    var index = (direction == 'next') ? 0 : carousel.items.length - carousel.visibItemsNb;
    // remove clones you do not need anymore
    removeClones(carousel, index, false);
    // add new clones 
    (direction == 'next') ? insertAfter(carousel, carousel.visibItemsNb, 0) : insertBefore(carousel, carousel.visibItemsNb);
    //reset transform
    setTranslate(carousel, 'translateX('+carousel.translateContainer+'px)');
  };

  function insertBefore(carousel, nb, delta) {
    if(!carousel.options.loop) return;
    var clones = document.createDocumentFragment();
    var start = 0;
    if(delta) start = delta;
    for(var i = start; i < nb; i++) {
      var index = getIndex(carousel, carousel.selectedItem - i - 1),
        clone = carousel.initItems[index].cloneNode(true);
      Util.addClass(clone, 'js-clone');
      clones.insertBefore(clone, clones.firstChild);
    }
    carousel.list.insertBefore(clones, carousel.list.firstChild);
    emitCarouselUpdateEvent(carousel);
  };

  function insertAfter(carousel, nb, init) {
    if(!carousel.options.loop) return;
    var clones = document.createDocumentFragment();
    for(var i = init; i < nb + init; i++) {
      var index = getIndex(carousel, carousel.selectedItem + carousel.visibItemsNb + i),
        clone = carousel.initItems[index].cloneNode(true);
      Util.addClass(clone, 'js-clone');
      clones.appendChild(clone);
    }
    carousel.list.appendChild(clones);
    emitCarouselUpdateEvent(carousel);
  };

  function removeClones(carousel, index, bool) {
    if(!carousel.options.loop) return;
    if( !bool) {
      bool = carousel.visibItemsNb;
    }
    for(var i = 0; i < bool; i++) {
      if(carousel.items[index]) carousel.list.removeChild(carousel.items[index]);
    }
  };

  function resetCarouselResize(carousel) { // reset carousel on resize
    var visibleItems = carousel.visibItemsNb;
    // get new items min-width value
    resetItemAutoSize(carousel);
    initCarouselLayout(carousel); 
    setItemsWidth(carousel, false);
    resetItemsWidth(carousel); // update the array of original items -> array used to create clones
    if(carousel.options.loop) {
      if(visibleItems > carousel.visibItemsNb) {
        removeClones(carousel, 0, visibleItems - carousel.visibItemsNb);
      } else if(visibleItems < carousel.visibItemsNb) {
        insertBefore(carousel, carousel.visibItemsNb, visibleItems);
      }
      updateCarouselClones(carousel); // this will take care of translate + after elements
    } else {
      // reset default translate to a multiple value of (itemWidth + margin)
      var translate = noLoopTranslateValue(carousel);
      setTranslate(carousel, 'translateX('+translate+')');
    }
    resetItemsTabIndex(carousel); // reset focusable elements
  };

  function resetItemAutoSize(carousel) {
    if(!cssPropertiesSupported) return;
    // remove inline style
    carousel.items[0].removeAttribute('style');
    // get original item width 
    carousel.itemAutoSize = getComputedStyle(carousel.items[0]).getPropertyValue('width');
  };

  function resetItemsWidth(carousel) {
    for(var i = 0; i < carousel.initItems.length; i++) {
      carousel.initItems[i].style.width = carousel.itemsWidth+"px";
    }
  };

  function resetItemsTabIndex(carousel) {
    var carouselActive = carousel.items.length > carousel.visibItemsNb;
    var j = carousel.items.length;
    for(var i = 0; i < carousel.items.length; i++) {
      if(carousel.options.loop) {
        if(i < carousel.visibItemsNb || i >= 2*carousel.visibItemsNb ) {
          carousel.items[i].setAttribute('tabindex', '-1');
        } else {
          if(i < j) j = i;
          carousel.items[i].removeAttribute('tabindex');
        }
      } else {
        if( (i < carousel.selectedItem || i >= carousel.selectedItem + carousel.visibItemsNb) && carouselActive) {
          carousel.items[i].setAttribute('tabindex', '-1');
        } else {
          if(i < j) j = i;
          carousel.items[i].removeAttribute('tabindex');
        }
      }
    }
    resetVisibilityOverflowItems(carousel, j);
  };

  function startAutoplay(carousel) {
    if(carousel.options.autoplay && !carousel.autoplayId && !carousel.autoplayPaused) {
      carousel.autoplayId = setInterval(function(){
        showNextItems(carousel);
      }, carousel.options.autoplayInterval);
    }
  };

  function pauseAutoplay(carousel) {
    if(carousel.options.autoplay) {
      clearInterval(carousel.autoplayId);
      carousel.autoplayId = false;
    }
  };

  function initAriaLive(carousel) { // create an aria-live region for SR
    if(!carousel.options.ariaLive) return;
    // create an element that will be used to announce the new visible slide to SR
    var srLiveArea = document.createElement('div');
    Util.setAttributes(srLiveArea, {'class': 'sr-only js-carousel__aria-live', 'aria-live': 'polite', 'aria-atomic': 'true'});
    carousel.element.appendChild(srLiveArea);
    carousel.ariaLive = srLiveArea;
  };

  function updateAriaLive(carousel) { // announce to SR which items are now visible
    if(!carousel.options.ariaLive) return;
    carousel.ariaLive.innerHTML = 'Item '+(carousel.selectedItem + 1)+' selected. '+carousel.visibItemsNb+' items of '+carousel.initItems.length+' visible';
  };

  function getIndex(carousel, index) {
    if(index < 0) index = getPositiveValue(index, carousel.itemsNb);
    if(index >= carousel.itemsNb) index = index % carousel.itemsNb;
    return index;
  };

  function getPositiveValue(value, add) {
    value = value + add;
    if(value > 0) return value;
    else return getPositiveValue(value, add);
  };

  function setTranslate(carousel, translate) {
    carousel.list.style.transform = translate;
    carousel.list.style.msTransform = translate;
  };

  function getCarouselWidth(carousel, computedWidth) { // retrieve carousel width if carousel is initially hidden
    var closestHidden = carousel.listWrapper.closest('.sr-only');
    if(closestHidden) { // carousel is inside an .sr-only (visually hidden) element
      Util.removeClass(closestHidden, 'sr-only');
      computedWidth = carousel.listWrapper.offsetWidth;
      Util.addClass(closestHidden, 'sr-only');
    } else if(isNaN(computedWidth)){
      computedWidth = getHiddenParentWidth(carousel.element, carousel);
    }
    return computedWidth;
  };

  function getHiddenParentWidth(element, carousel) {
    var parent = element.parentElement;
    if(parent.tagName.toLowerCase() == 'html') return 0;
    var style = window.getComputedStyle(parent);
    if(style.display == 'none' || style.visibility == 'hidden') {
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
    if(carousel.options.loop) return;
    // update arrows status
    if(carousel.controls.length > 0) {
      (carousel.totTranslate == 0) 
        ? carousel.controls[0].setAttribute('disabled', true) 
        : carousel.controls[0].removeAttribute('disabled');
      (carousel.totTranslate == (- carousel.translateContainer - carousel.containerWidth) || carousel.items.length <= carousel.visibItemsNb) 
        ? carousel.controls[1].setAttribute('disabled', true) 
        : carousel.controls[1].removeAttribute('disabled');
    }
    // update carousel dots
    if(carousel.options.nav) {
      var selectedDot = carousel.navigation.getElementsByClassName(carousel.options.navigationItemClass+'--selected');
      if(selectedDot.length > 0) Util.removeClass(selectedDot[0], carousel.options.navigationItemClass+'--selected');

      var newSelectedIndex = getSelectedDot(carousel);
      if(carousel.totTranslate == (- carousel.translateContainer - carousel.containerWidth)) {
        newSelectedIndex = carousel.navDots.length - 1;
      }
      Util.addClass(carousel.navDots[newSelectedIndex], carousel.options.navigationItemClass+'--selected');
    }

    (carousel.totTranslate == 0 && (carousel.totTranslate == (- carousel.translateContainer - carousel.containerWidth) || carousel.items.length <= carousel.visibItemsNb))
        ? Util.addClass(carousel.element, 'carousel--hide-controls')
        : Util.removeClass(carousel.element, 'carousel--hide-controls');
  };

  function emitCarouselUpdateEvent(carousel) {
    carousel.cloneList = [];
    var clones = carousel.element.querySelectorAll('.js-clone');
    for(var i = 0; i < clones.length; i++) {
      Util.removeClass(clones[i], 'js-clone');
      carousel.cloneList.push(clones[i]);
    }
    emitCarouselEvents(carousel, 'carousel-updated', carousel.cloneList);
  };

  function carouselCreateNavigation(carousel) {
    if(carousel.element.getElementsByClassName('js-carousel__navigation').length > 0) return;
  
    var navigation = document.createElement('ol'),
      navChildren = '';

    var navClasses = carousel.options.navigationClass+' js-carousel__navigation';
    if(carousel.items.length <= carousel.visibItemsNb) {
      navClasses = navClasses + ' is-hidden';
    }
    navigation.setAttribute('class', navClasses);

    var dotsNr = Math.ceil(carousel.items.length/carousel.visibItemsNb),
      selectedDot = getSelectedDot(carousel),
      indexClass = carousel.options.navigationPagination ? '' : 'sr-only'
    for(var i = 0; i < dotsNr; i++) {
      var className = (i == selectedDot) ? 'class="'+carousel.options.navigationItemClass+' '+carousel.options.navigationItemClass+'--selected js-carousel__nav-item"' :  'class="'+carousel.options.navigationItemClass+' js-carousel__nav-item"';
      navChildren = navChildren + '<li '+className+'><button class="reset js-tab-focus" style="outline: none;"><span class="'+indexClass+'">'+ (i+1) + '</span></button></li>';
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
    if(carousel.navigation) carousel.element.removeChild(carousel.navigation);
    if(carousel.navIdEvent) carousel.navigation.removeEventListener('click', carousel.navIdEvent);
  };

  function resetDotsNavigation(carousel) {
    if(!carousel.options.nav) return;
    carouselRemoveNavigation(carousel);
    carouselCreateNavigation(carousel);
    carouselInitNavigationEvents(carousel);
  };

  function carouselNavigationClick(event) {
    var dot = event.target.closest('.js-carousel__nav-item');
    if(!dot) return;
    if(this.animating) return;
    this.animating = true;
    var index = Util.getIndexInArray(this.navDots, dot);
    this.selectedDotIndex = index;
    this.selectedItem = index*this.visibItemsNb;
    animateList(this, false, 'click');
  };

  function getSelectedDot(carousel) {
    return Math.ceil(carousel.selectedItem/carousel.visibItemsNb);
  };

  function initCarouselCounter(carousel) {
    if(carousel.counterTor.length > 0) carousel.counterTor[0].textContent = carousel.itemsNb;
    setCounterItem(carousel);
  };

  function setCounterItem(carousel) {
    if(carousel.counter.length == 0) return;
    var totalItems = carousel.selectedItem + carousel.visibItemsNb;
    if(totalItems > carousel.items.length) totalItems = carousel.items.length;
    carousel.counter[0].textContent = totalItems;
  };

  function centerItems(carousel) {
    if(!carousel.options.justifyContent) return;
    Util.toggleClass(carousel.list, 'justify-center', carousel.items.length < carousel.visibItemsNb);
  };

  function alignControls(carousel) {
    if(carousel.controls.length < 1 || !carousel.options.alignControls) return;
    if(!carousel.controlsAlignEl) {
      carousel.controlsAlignEl = carousel.element.querySelector(carousel.options.alignControls);
    }
    if(!carousel.controlsAlignEl) return;
    var translate = (carousel.element.offsetHeight - carousel.controlsAlignEl.offsetHeight);
    for(var i = 0; i < carousel.controls.length; i++) {
      carousel.controls[i].style.marginBottom = translate + 'px';
    }
  };

  function emitCarouselActiveItemsEvent(carousel) {
    emitCarouselEvents(carousel, 'carousel-active-items', {firstSelectedItem: carousel.selectedItem, visibleItemsNb: carousel.visibItemsNb});
  };

  function emitCarouselEvents(carousel, eventName, eventDetail) {
    var event = new CustomEvent(eventName, {detail: eventDetail});
    carousel.element.dispatchEvent(event);
  };

  function resetVisibilityOverflowItems(carousel, j) {
    if(!carousel.options.overflowItems) return;
    var itemWidth = carousel.containerWidth/carousel.items.length,
      delta = (window.innerWidth - itemWidth*carousel.visibItemsNb)/2,
      overflowItems = Math.ceil(delta/itemWidth);

    for(var i = 0; i < overflowItems; i++) {
      var indexPrev = j - 1 - i; // prev element
      if(indexPrev >= 0 ) carousel.items[indexPrev].removeAttribute('tabindex');
      var indexNext = j + carousel.visibItemsNb + i; // next element
      if(indexNext < carousel.items.length) carousel.items[indexNext].removeAttribute('tabindex');
    }
  };

  Carousel.defaults = {
    element : '',
    autoplay : false,
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

  if( carousels.length > 0) {
    for( var i = 0; i < carousels.length; i++) {
      (function(i){
        var autoplay = (carousels[i].getAttribute('data-autoplay') && carousels[i].getAttribute('data-autoplay') == 'on') ? true : false,
          autoplayInterval = (carousels[i].getAttribute('data-autoplay-interval')) ? carousels[i].getAttribute('data-autoplay-interval') : 5000,
          drag = (carousels[i].getAttribute('data-drag') && carousels[i].getAttribute('data-drag') == 'on') ? true : false,
          loop = (carousels[i].getAttribute('data-loop') && carousels[i].getAttribute('data-loop') == 'off') ? false : true,
          nav = (carousels[i].getAttribute('data-navigation') && carousels[i].getAttribute('data-navigation') == 'on') ? true : false,
          navigationItemClass = carousels[i].getAttribute('data-navigation-item-class') ? carousels[i].getAttribute('data-navigation-item-class') : 'carousel__nav-item',
          navigationClass = carousels[i].getAttribute('data-navigation-class') ? carousels[i].getAttribute('data-navigation-class') : 'carousel__navigation',
          navigationPagination = (carousels[i].getAttribute('data-navigation-pagination') && carousels[i].getAttribute('data-navigation-pagination') == 'on') ? true : false,
          overflowItems = (carousels[i].getAttribute('data-overflow-items') && carousels[i].getAttribute('data-overflow-items') == 'on') ? true : false,
          alignControls = carousels[i].getAttribute('data-align-controls') ? carousels[i].getAttribute('data-align-controls') : false,
          justifyContent = (carousels[i].getAttribute('data-justify-content') && carousels[i].getAttribute('data-justify-content') == 'on') ? true : false;
        new Carousel({element: carousels[i], autoplay : autoplay, autoplayInterval : autoplayInterval, drag: drag, ariaLive: true, loop: loop, nav: nav, navigationItemClass: navigationItemClass, navigationPagination: navigationPagination, navigationClass: navigationClass, overflowItems: overflowItems, justifyContent: justifyContent, alignControls: alignControls});
      })(i);
    }
  };
}());
// File#: _2_draggable-img-gallery
// Usage: codyhouse.co/license
(function() {
  var DragGallery = function(element) {
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

    gallery.element.addEventListener('update-gallery-width', function(event){ // window resize
      gallery.galleryWidth = getGalleryWidth(gallery); 
      // reset translate value if not acceptable
      checkTranslateValue(gallery);
      setTranslate(gallery);
    });
     
    if(intersectionObsSupported) initOpacityAnim(gallery); // init image animation

    if(!reducedMotion && gallery.gestureHint.length > 0) initHintGesture(gallery); // init hint gesture element animation

    initKeyBoardNav(gallery);
  };

  function getGalleryWidth(gallery) {
    return gallery.list.scrollWidth - gallery.list.offsetWidth;
  };

  function initDragging(gallery) { // gallery drag
    new SwipeContent(gallery.element);
    gallery.element.addEventListener('dragStart', function(event){
      window.cancelAnimationFrame(gallery.dragAnimId);
      Util.addClass(gallery.element, 'drag-gallery--is-dragging'); 
      gallery.dragStart = event.detail.x;
      gallery.dragMStart = event.detail.x;
      gallery.dragTimeMStart = new Date().getTime();
      gallery.dragTimeMEnd = false;
      gallery.dragMSpeed = false;
      initDragEnd(gallery);
    });

    gallery.element.addEventListener('dragging', function(event){
      if(!gallery.dragStart) return;
      if(Math.abs(event.detail.x - gallery.dragStart) < 5) return;
      gallery.translate = Math.round(event.detail.x - gallery.dragStart + gallery.translate);
      gallery.dragStart = event.detail.x;
      checkTranslateValue(gallery);
      setTranslate(gallery);
    });
  };

  function initDragEnd(gallery) {
    gallery.element.addEventListener('dragEnd', function cb(event){
      gallery.element.removeEventListener('dragEnd', cb);
      Util.removeClass(gallery.element, 'drag-gallery--is-dragging');
      initMomentumDrag(gallery); // drag momentum
      gallery.dragStart = false;
    });
  };

  function initKeyBoardNav(gallery) {
    gallery.element.setAttribute('tabindex', 0);
    // navigate gallery using right/left arrows
    gallery.element.addEventListener('keyup', function(event){
      if( event.keyCode && event.keyCode == 39 || event.key && event.key.toLowerCase() == 'arrowright' ) {
        keyboardNav(gallery, 'right');
      } else if(event.keyCode && event.keyCode == 37 || event.key && event.key.toLowerCase() == 'arrowleft') {
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
    if(gallery.translate > 0) {
      gallery.translate = 0;
      gallery.dragMSpeed = 0;
    }
    if(Math.abs(gallery.translate) > gallery.galleryWidth) {
      gallery.translate = gallery.galleryWidth*-1;
      gallery.dragMSpeed = 0;
    }
  };

  function setTranslate(gallery) {
    gallery.list.style.transform = 'translateX('+gallery.translate+'px)';
    gallery.list.style.msTransform = 'translateX('+gallery.translate+'px)';
  };

  function initOpacityAnim(gallery) { // animate img opacities on drag
    for(var i = 0; i < gallery.imgs.length; i++) {
      var observer = new IntersectionObserver(opacityCallback.bind(gallery.imgs[i]), { threshold: [0, 0.1] });
		  observer.observe(gallery.imgs[i]);
    }
  };

  function opacityCallback(entries, observer) { // reveal images when they enter the viewport
    var threshold = entries[0].intersectionRatio.toFixed(1);
		if(threshold > 0) {
      Util.addClass(this, 'drag-gallery__item--visible');
      observer.unobserve(this);
    }
  };

  function initMomentumDrag(gallery) {
    // momentum effect when drag is over
    if(reducedMotion) return;
    var timeNow = new Date().getTime();
    gallery.dragMSpeed = 0.95*(gallery.dragStart - gallery.dragMStart)/(timeNow - gallery.dragTimeMStart);

    var currentTime = false;

    function animMomentumDrag(timestamp) {
      if (!currentTime) currentTime = timestamp;         
      var progress = timestamp - currentTime;
      currentTime = timestamp;
      if(Math.abs(gallery.dragMSpeed) < 0.01) {
        gallery.dragAnimId = false;
        return;
      } else {
        gallery.translate = Math.round(gallery.translate + (gallery.dragMSpeed*progress));
        checkTranslateValue(gallery);
        setTranslate(gallery);
        gallery.dragMSpeed = gallery.dragMSpeed*0.95;
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
		if(threshold > 0) {
      Util.addClass(this, 'drag-gallery__gesture-hint--animate');
      observer.unobserve(this);
    }
  };

  //initialize the DragGallery objects
  var dragGallery = document.getElementsByClassName('js-drag-gallery'),
    intersectionObsSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype),
    reducedMotion = Util.osHasReducedMotion();

  if( dragGallery.length > 0 ) {
    var dragGalleryArray = [];
    for( var i = 0; i < dragGallery.length; i++) {
      (function(i){ 
        if(!intersectionObsSupported || reducedMotion) Util.addClass(dragGallery[i], 'drag-gallery--anim-off');
        dragGalleryArray.push(new DragGallery(dragGallery[i]));
      })(i);
    }

    // resize event
    var resizingId = false,
      customEvent = new CustomEvent('update-gallery-width');
    
    window.addEventListener('resize', function() {
      clearTimeout(resizingId);
      resizingId = setTimeout(doneResizing, 500);
    });

    function doneResizing() {
      for( var i = 0; i < dragGalleryArray.length; i++) {
        (function(i){dragGalleryArray[i].element.dispatchEvent(customEvent)})(i);
      };
    };
  }
}());
// File#: _2_drawer-navigation
// Usage: codyhouse.co/license
(function() {
  function initDrNavControl(element) {
    var circle = element.getElementsByTagName('circle');
    if(circle.length > 0) {
      // set svg attributes to create fill-in animation on click
      initCircleAttributes(element, circle[0]);
    }

    var drawerId = element.getAttribute('aria-controls'),
      drawer = document.getElementById(drawerId);
    if(drawer) {
      // when the drawer is closed without click (e.g., user presses 'Esc') -> reset trigger status
      drawer.addEventListener('drawerIsClose', function(event){ 
        if(!event.detail || (event.detail && !event.detail.closest('.js-dr-nav-control[aria-controls="'+drawerId+'"]')) ) resetTrigger(element);
      });
    }
  };

  function initCircleAttributes(element, circle) {
    // set circle stroke-dashoffset/stroke-dasharray values
    var circumference = (2*Math.PI*circle.getAttribute('r')).toFixed(2);
    circle.setAttribute('stroke-dashoffset', circumference);
    circle.setAttribute('stroke-dasharray', circumference);
    Util.addClass(element, 'dr-nav-control--ready-to-animate');
  };

  function resetTrigger(element) {
    Util.removeClass(element, 'anim-menu-btn--state-b'); 
  };

  var drNavControl = document.getElementsByClassName('js-dr-nav-control');
  if(drNavControl.length > 0) initDrNavControl(drNavControl[0]);
}());
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
// File#: _2_modal-video
// Usage: codyhouse.co/license
(function() {
	var ModalVideo = function(element) {
		this.element = element;
		this.modalContent = this.element.getElementsByClassName('js-modal-video__content')[0];
		this.media = this.element.getElementsByClassName('js-modal-video__media')[0];
		this.contentIsIframe = this.media.tagName.toLowerCase() == 'iframe';
		this.modalIsOpen = false;
		this.initModalVideo();
	};

	ModalVideo.prototype.initModalVideo = function() {
		var self = this;
		// reveal modal content when iframe is ready
		this.addLoadListener();
		// listen for the modal element to be open -> set new iframe src attribute
		this.element.addEventListener('modalIsOpen', function(event){
			self.modalIsOpen = true;
			self.media.setAttribute('src', event.detail.closest('[aria-controls]').getAttribute('data-url'));
		});
		// listen for the modal element to be close -> reset iframe and hide modal content
		this.element.addEventListener('modalIsClose', function(event){
			self.modalIsOpen = false;
			Util.addClass(self.element, 'modal--is-loading');
			self.media.setAttribute('src', '');
		});
	};

	ModalVideo.prototype.addLoadListener = function() {
		var self = this;
		if(this.contentIsIframe) {
			this.media.onload = function () {
				self.revealContent();
			};
		} else {
			this.media.addEventListener('loadedmetadata', function(){
				self.revealContent();
			});
		}
		
	};

	ModalVideo.prototype.revealContent = function() {
		if( !this.modalIsOpen ) return;
		Util.removeClass(this.element, 'modal--is-loading');
		this.contentIsIframe ? this.media.contentWindow.focus() : this.media.focus();
	};

	//initialize the ModalVideo objects
	var modalVideos = document.getElementsByClassName('js-modal-video__media');
	if( modalVideos.length > 0 ) {
		for( var i = 0; i < modalVideos.length; i++) {
			(function(i){new ModalVideo(modalVideos[i].closest('.js-modal'));})(i);
		}
	}
}());
// File#: _3_main-header-v2
// Usage: codyhouse.co/license
(function() {
	var Submenu = function(element) {
		this.element = element;
		this.trigger = this.element.getElementsByClassName('header-v2__nav-link')[0];
		this.dropdown = this.element.getElementsByClassName('header-v2__nav-dropdown')[0];
		this.triggerFocus = false;
		this.dropdownFocus = false;
		this.hideInterval = false;
		this.prevFocus = false; // nested dropdown - store element that was in focus before focus changed
		initSubmenu(this);
		initNestedDropdown(this);
	};

	function initSubmenu(list) {
		initElementEvents(list, list.trigger);
		initElementEvents(list, list.dropdown);
	};

	function initElementEvents(list, element, bool) {
		element.addEventListener('focus', function(){
			bool = true;
			showDropdown(list);
		});
		element.addEventListener('focusout', function(event){
			bool = false;
			hideDropdown(list, event);
		});
	};

	function showDropdown(list) {
		if(list.hideInterval) clearInterval(list.hideInterval);
		Util.addClass(list.dropdown, 'header-v2__nav-list--is-visible');
		resetDropdownStyle(list.dropdown, true);
	};

	function hideDropdown(list, event) {
		if(list.hideInterval) clearInterval(this.hideInterval);
		list.hideInterval = setTimeout(function(){
			var submenuFocus = document.activeElement.closest('.header-v2__nav-item--main'),
				inFocus = submenuFocus && (submenuFocus == list.element);
			if(!list.triggerFocus && !list.dropdownFocus && !inFocus) { // hide if focus is outside submenu
				Util.removeClass(list.dropdown, 'header-v2__nav-list--is-visible');
				resetDropdownStyle(list.dropdown, false);
				hideSubLevels(list);
				list.prevFocus = false;
			}
		}, 100);
	};

	function initNestedDropdown(list) {
		var dropdownMenu = list.element.getElementsByClassName('header-v2__nav-list');
		for(var i = 0; i < dropdownMenu.length; i++) {
			var listItems = dropdownMenu[i].children;
			// bind hover
	    new menuAim({
	      menu: dropdownMenu[i],
	      activate: function(row) {
	      	var subList = row.getElementsByClassName('header-v2__nav-dropdown')[0];
	      	if(!subList) return;
	      	Util.addClass(row.querySelector('a.header-v2__nav-link'), 'header-v2__nav-link--hover');
	      	showLevel(list, subList);
	      },
	      deactivate: function(row) {
	      	var subList = row.getElementsByClassName('header-v2__nav-dropdown')[0];
	      	if(!subList) return;
	      	Util.removeClass(row.querySelector('a.header-v2__nav-link'), 'header-v2__nav-link--hover');
	      	hideLevel(list, subList);
	      },
	      exitMenu: function() {
	        return true;
	      },
	      submenuSelector: '.header-v2__nav-item--has-children',
	    });
		}
		// store focus element before change in focus
		list.element.addEventListener('keydown', function(event) { 
			if( event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab' ) {
				list.prevFocus = document.activeElement;
			}
		});
		// make sure that sublevel are visible when their items are in focus
		list.element.addEventListener('keyup', function(event) {
			if( event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab' ) {
				// focus has been moved -> make sure the proper classes are added to subnavigation
				var focusElement = document.activeElement,
					focusElementParent = focusElement.closest('.header-v2__nav-dropdown'),
					focusElementSibling = focusElement.nextElementSibling;

				// if item in focus is inside submenu -> make sure it is visible
				if(focusElementParent && !Util.hasClass(focusElementParent, 'header-v2__nav-list--is-visible')) {
					showLevel(list, focusElementParent);
				}
				// if item in focus triggers a submenu -> make sure it is visible
				if(focusElementSibling && !Util.hasClass(focusElementSibling, 'header-v2__nav-list--is-visible')) {
					showLevel(list, focusElementSibling);
				}

				// check previous element in focus -> hide sublevel if required 
				if( !list.prevFocus) return;
				var prevFocusElementParent = list.prevFocus.closest('.header-v2__nav-dropdown'),
					prevFocusElementSibling = list.prevFocus.nextElementSibling;
				
				if( !prevFocusElementParent ) return;
				
				// element in focus and element prev in focus are siblings
				if( focusElementParent && focusElementParent == prevFocusElementParent) {
					if(prevFocusElementSibling) hideLevel(list, prevFocusElementSibling);
					return;
				}

				// element in focus is inside submenu triggered by element prev in focus
				if( prevFocusElementSibling && focusElementParent && focusElementParent == prevFocusElementSibling) return;
				
				// shift tab -> element in focus triggers the submenu of the element prev in focus
				if( focusElementSibling && prevFocusElementParent && focusElementSibling == prevFocusElementParent) return;
				
				var focusElementParentParent = focusElementParent.parentNode.closest('.header-v2__nav-dropdown');
				
				// shift tab -> element in focus is inside the dropdown triggered by a siblings of the element prev in focus
				if(focusElementParentParent && focusElementParentParent == prevFocusElementParent) {
					if(prevFocusElementSibling) hideLevel(list, prevFocusElementSibling);
					return;
				}
				
				if(prevFocusElementParent && Util.hasClass(prevFocusElementParent, 'header-v2__nav-list--is-visible')) {
					hideLevel(list, prevFocusElementParent);
				}
			}
		});
	};

	function hideSubLevels(list) {
		var visibleSubLevels = list.dropdown.getElementsByClassName('header-v2__nav-list--is-visible');
		if(visibleSubLevels.length == 0) return;
		while (visibleSubLevels[0]) {
			hideLevel(list, visibleSubLevels[0]);
	 	}
	 	var hoveredItems = list.dropdown.getElementsByClassName('header-v2__nav-link--hover');
	 	while (hoveredItems[0]) {
			Util.removeClass(hoveredItems[0], 'header-v2__nav-link--hover');
	 	}
	};

	function showLevel(list, level, bool) {
		if(bool == undefined) {
			//check if the sublevel needs to be open to the left
			Util.removeClass(level, 'header-v2__nav-dropdown--nested-left');
			var boundingRect = level.getBoundingClientRect();
			if(window.innerWidth - boundingRect.right < 5 && boundingRect.left + window.scrollX > 2*boundingRect.width) Util.addClass(level, 'header-v2__nav-dropdown--nested-left');
		}
		Util.addClass(level, 'header-v2__nav-list--is-visible');
	};

	function hideLevel(list, level) {
		if(!Util.hasClass(level, 'header-v2__nav-list--is-visible')) return;
		Util.removeClass(level, 'header-v2__nav-list--is-visible');
		
		level.addEventListener('transition', function cb(){
			level.removeEventListener('transition', cb);
			Util.removeClass(level, 'header-v2__nav-dropdown--nested-left');
		});
	};

	var mainHeader = document.getElementsByClassName('js-header-v2');
	if(mainHeader.length > 0) {
		var menuTrigger = mainHeader[0].getElementsByClassName('js-anim-menu-btn')[0],
			firstFocusableElement = getMenuFirstFocusable();

		// we'll use these to store the node that needs to receive focus when the mobile menu is closed 
		var focusMenu = false;

		menuTrigger.addEventListener('anim-menu-btn-clicked', function(event){ // toggle menu visibility an small devices
			Util.toggleClass(document.getElementsByClassName('header-v2__nav')[0], 'header-v2__nav--is-visible', event.detail);
			Util.toggleClass(mainHeader[0], 'header-v2--expanded', event.detail);
			menuTrigger.setAttribute('aria-expanded', event.detail);
			if(event.detail) firstFocusableElement.focus(); // move focus to first focusable element
			else if(focusMenu) {
				focusMenu.focus();
				focusMenu = false;
			}
		});

		// take care of submenu
		var mainList = mainHeader[0].getElementsByClassName('header-v2__nav-list--main');
		if(mainList.length > 0) {
			for( var i = 0; i < mainList.length; i++) {
				(function(i){
					new menuAim({ // use diagonal movement detection for main submenu
			      menu: mainList[i],
			      activate: function(row) {
			      	var submenu = row.getElementsByClassName('header-v2__nav-dropdown');
			      	if(submenu.length == 0 ) return;
			      	Util.addClass(submenu[0], 'header-v2__nav-list--is-visible');
			      	resetDropdownStyle(submenu[0], true);
			      },
			      deactivate: function(row) {
			      	var submenu = row.getElementsByClassName('header-v2__nav-dropdown');
			      	if(submenu.length == 0 ) return;
			      	Util.removeClass(submenu[0], 'header-v2__nav-list--is-visible');
			      	resetDropdownStyle(submenu[0], false);
			      },
			      exitMenu: function() {
			        return true;
			      },
			      submenuSelector: '.header-v2__nav-item--has-children',
			      submenuDirection: 'below'
			    });

			    // take care of focus event for main submenu
					var subMenu = mainList[i].getElementsByClassName('header-v2__nav-item--main');
					for(var j = 0; j < subMenu.length; j++) {(function(j){if(Util.hasClass(subMenu[j], 'header-v2__nav-item--has-children')) new Submenu(subMenu[j]);})(j);};
				})(i);
			}
		}

		// if data-animation-offset is set -> check scrolling
		var animateHeader = mainHeader[0].getAttribute('data-animation');
		if(animateHeader && animateHeader == 'on') {
			var scrolling = false,
				scrollOffset = (mainHeader[0].getAttribute('data-animation-offset')) ? parseInt(mainHeader[0].getAttribute('data-animation-offset')) : 400,
				mainHeaderHeight = mainHeader[0].offsetHeight,
				mainHeaderWrapper = mainHeader[0].getElementsByClassName('header-v2__wrapper')[0];

			window.addEventListener("scroll", function(event) {
				if( !scrolling ) {
					scrolling = true;
					(!window.requestAnimationFrame) ? setTimeout(function(){checkMainHeader();}, 250) : window.requestAnimationFrame(checkMainHeader);
				}
			});

			function checkMainHeader() {
				var windowTop = window.scrollY || document.documentElement.scrollTop;
				Util.toggleClass(mainHeaderWrapper, 'header-v2__wrapper--is-fixed', windowTop >= mainHeaderHeight);
				Util.toggleClass(mainHeaderWrapper, 'header-v2__wrapper--slides-down', windowTop >= scrollOffset);
				scrolling = false;
			};
		}

		// listen for key events
		window.addEventListener('keyup', function(event){
			// listen for esc key
			if( (event.keyCode && event.keyCode == 27) || (event.key && event.key.toLowerCase() == 'escape' )) {
				// close navigation on mobile if open
				if(menuTrigger.getAttribute('aria-expanded') == 'true' && isVisible(menuTrigger)) {
					focusMenu = menuTrigger; // move focus to menu trigger when menu is close
					menuTrigger.click();
				}
			}
			// listen for tab key
			if( (event.keyCode && event.keyCode == 9) || (event.key && event.key.toLowerCase() == 'tab' )) {
				// close navigation on mobile if open when nav loses focus
				if(menuTrigger.getAttribute('aria-expanded') == 'true' && isVisible(menuTrigger) && !document.activeElement.closest('.js-header-v2')) menuTrigger.click();
			}
		});

		// listen for resize
		var resizingId = false;
		window.addEventListener('resize', function() {
			clearTimeout(resizingId);
			resizingId = setTimeout(doneResizing, 500);
		});

		function doneResizing() {
			if( !isVisible(menuTrigger) && Util.hasClass(mainHeader[0], 'header-v2--expanded')) menuTrigger.click();
		};

		function getMenuFirstFocusable() {
			var focusableEle = mainHeader[0].getElementsByClassName('header-v2__nav')[0].querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary'),
				firstFocusable = false;
			for(var i = 0; i < focusableEle.length; i++) {
				if( focusableEle[i].offsetWidth || focusableEle[i].offsetHeight || focusableEle[i].getClientRects().length ) {
					firstFocusable = focusableEle[i];
					break;
				}
			}

			return firstFocusable;
		};
	}

	function resetDropdownStyle(dropdown, bool) {
		if(!bool) {
			dropdown.addEventListener('transitionend', function cb(){
				dropdown.removeAttribute('style');
				dropdown.removeEventListener('transitionend', cb);
			});
		} else {
			var boundingRect = dropdown.getBoundingClientRect();
			if(window.innerWidth - boundingRect.right < 5 && boundingRect.left + window.scrollX > 2*boundingRect.width) {
				var left = parseFloat(window.getComputedStyle(dropdown).getPropertyValue('left'));
				dropdown.style.left = (left + window.innerWidth - boundingRect.right - 5) + 'px';
			}
		}
	};

	function isVisible(element) {
		return (element.offsetWidth || element.offsetHeight || element.getClientRects().length);
	};
}());
const body = document.getElementsByTagName('body');
const outline = document.getElementById('outline-card');
const cardContainer = document.getElementById('floating-card');
const svgLine = document.getElementById('svg-line');
const textCard = document.getElementById('text-card');
const sContainer = document.querySelector('.scroll-indicator-container');
const sIndicator = document.querySelector('.scroll-indicator');
let scrollH = window.pageYOffset / 23.4;

function inViewport(el) {
    var bb = el.getBoundingClientRect();
    return !(bb.top > innerHeight || bb.bottom < 0);
}
document.addEventListener('scroll', () => {

    if (!inViewport(hero)) {
        sContainer.classList.remove('is-hidden')
    } else {
        if (!sContainer.classList.contains('is-hidden')) {
            sContainer.classList.add('is-hidden')
        }
    }

    sIndicator.setAttribute('style', `height: ${(window.pageYOffset - 912) / 40}%`);
})
var hero = document.getElementById('hero')

function smoothScroll(starget, duration){
    let sctarget = document.querySelector(starget),
    targetPosition = sctarget.getBoundingClientRect().top,
    startPosition = window.pageYOffset,
    distance = targetPosition - startPosition,
    startTime = null



    function animation(currentTime){
        if(startTime === null) startTime = currentTime
        let timeElapsed = currentTime - startTime
        let run = ease(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if(timeElapsed < duration) requestAnimationFrame(animation)
    }

    function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    };

    requestAnimationFrame(animation)
}
function inViewport(el){
    var bb = el.getBoundingClientRect();
    return !(bb.top > innerHeight || bb.bottom < 0);
}

// document.addEventListener('scroll',(e)=>{
//     // if(window.pageYOffset < 500){
//     //     e.preventDefault
//     //     console.log('scrolleando')
//     //     smoothScroll('.model-3d', 1000)
//     //  }
//     // console.log('pageoffset', window.pageYOffset)
// })

