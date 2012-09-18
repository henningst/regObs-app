/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Wink AMD loader
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Jerome GIRAUD
 */

/**
 * AMD modules definition
 * 
 * @param {string} mid The unique id of the module
 * @param {array} dependencies The list of dependencies of the module
 * @param {function} factory The module constructor
 * 
 * @see For more information <a href="http://www.commonjs.org/" target="_blank">commmonJS</a>
 */
define = function(mid, dependencies, factory)
{
	//--> DUMB AMD define IMPLEMENTATION
	if (typeof wink == 'undefined')
	{
		wink = {};
	}

	var args = arguments, 
		arity = args.length, 
		f, 
		d = null;
	
	if ( arity == 1 )
	{
		f = args[0];
	}
	else if (  arity == 2 )
	{
		f = args[1];
		if (typeof args[0] == "array" || args[0] instanceof Array)
		{
			d = args[0];
		}
	}
	else
	{
		f = args[2];
		d = args[1];
	}
	
	return f(wink);
	//<-- DUMB AMD define IMPLEMENTATION
};


define.amd =
{
	vendor: 'winktoolkit.org'
};

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Definition of the wink object to use in conjunction with an AMD loader
 *
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Jerome GIRAUD
 */

define(function()
{
	if (typeof wink == 'undefined')
	{
		/**
		* @namespace
		*/
		wink = {};
	}
	
	return wink;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Wink main object and core methods
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Jerome GIRAUD
 */

define(['../../_kernel/js/kernel'], function(wink)
{
	/**
	 * The version of Wink currently in use
	 * 
	 * @property
	 * @type string
	 */
	wink.version = '1.4.1';
	
	/**
	 * @namespace Gathers all the HTML5 APIs related components
	 */
	wink.api = {};
	
	/**
	 * @namespace Gathers all things related to CSS effects
	 * 
	 * @see <a href="WINK_ROOT_URL/fx/_xy/test/test_xy_1.html" target="_blank">Test page</a>
	 * @see <a href="WINK_ROOT_URL/fx/_xy/test/test_xy_2.html" target="_blank">Test page (transition)</a>
	 * @see <a href="WINK_ROOT_URL/fx/_xyz/test/test_xyz.html" target="_blank">Test page (3d)</a>
	 */
	             
	
	/**
	 * @namespace A set a of mathematical libraries and methods
	 * 
	 * @see <a href="WINK_ROOT_URL/math/_basics/test/test_basics.html" target="_blank">Test page (basics)</a>
	 * @see <a href="WINK_ROOT_URL/math/_geometric/test/test_geometric.html" target="_blank">Test page (geometric)</a>
	 * @see <a href="WINK_ROOT_URL/math/_matrix/test/test_matrix.html" target="_blank">Test page (matrix)</a>
	 */
	               
	
	/**
	 * @namespace Gathers all the multimedia components
	 */
	wink.mm = {};
	
	/**
	 * @namespace Gathers all the network related components
	 */
	wink.net = {};
	
	/**
	 * @namespace Gathers all the wink plugins
	 */
	wink.plugins = {};
	
	/**
	 * @namespace Gathers all the UI components
	 */
	wink.ui = 
	{
		/**
		 * @namespace Gathers all the form components
		 */
		form: {},
		/**
		 * @namespace Gathers all the layout components
		 */
		layout: {},
		/**
		 * @namespace Gathers all the 2D components
		 */
		xy: {},
		/**
		 * @namespace Gathers all the 3D components
		 */
		xyz: {}
	};
	
	/**
	 * @namespace Gathers all the interactions components
	 */
	wink.ux = {};
	
	var slice = Array.prototype.slice;
	var wd = window;
	
	/**
	 * Returns a DOM element
	 * 
	 * @param {string} id The identifier of the DOM element to return
	 * @returns {HTMLElement} Returns the DOM ellement if it has been found or the id otherwise
	 * 
	 * @example
	 * 
	 * var test = wink.byId('myComponent');
	 * var test2 = $('myComponent');
	 * 
	 */
	wink.byId = function(id)
	{
		if (wink.isString(id)) 
		{
			return document.getElementById(id);
		} else 
		{
			return id;
		}
	};
	
	/**
	 * Execute a query and returns the corresponding DOM elements
	 * 
	 * @param {string} selector The query selector you want to use
	 * @param {HTMLElement} [element] The element where you want to search
	 * 
	 * @returns {array} Returns an array containing the DOM elements corresponding to the query
	 * 
	 * @example
	 * 
	 * var test = wink.query('.MyClass');
	 * var test2 = $$('input[type=radio]');
	 * 
	 */
	wink.query = function(selector, element)
	{
		return slice.call((element||document).querySelectorAll(selector));
	};
	
	var _winklocale = "en_EN";
	/**
	 * Set wink locale used for translation
	 * 
	 * @param {string} locale The lang you want to set
	 */
	wink.setLocale = function(locale)
	{
		_winklocale = locale;
	};
	
	/**
	 * Returns the translated value of a key
	 * 
	 * @param {String} key The key identifying a ressource
	 * @param {Object} [object] The component that holds the resource list (within an i18n object)
	 * 
	 * @returns {string} The translated value of the key
	 * 
	 * @example
	 * 
	 * var test = wink.translate('myText')
	 * var test2 = _('myText');
	 * 
	 */
	wink.translate = function(key, object)
	{
		var result = key;
		var i18n = window.i18n || {};
		if (wink.isSet(object) && wink.isSet(object.i18n))
		{
			i18n = object.i18n;
		}
		var resourceList = i18n[_winklocale];
		if (wink.isUndefined(resourceList)) {
			resourceList = i18n;
		}
		var value = resourceList[key];
		if (!wink.isUndefined(value))
		{
			result = value;
		}
		return result;
	};
	
	/**
	 * Returns true if the given parameter is undefined, false otherwise.
	 * 
	 * @param {object} object The object to test
	 *  
	 * @returns {boolean} True if the object is undefined false otherwise
	 */
	wink.isUndefined = function(object) 
	{
		return (object === undefined);
	};
	
	/**
	 * Returns true if the given parameter is null, false otherwise.
	 * 
	 * @param {object} object The object to test
	 *  
	 * @returns {boolean} True if the object is null false otherwise
	 */
	wink.isNull = function(object)
	{
		return (object === null);
	};
	
	/**
	 * Returns true if the given parameter is set, false otherwise.
	 * 
	 * @param {object} object The object to test
	 * 
	 * @returns {boolean} True if the object is set false otherwise
	 */
	wink.isSet = function(object) 
	{
		return ((!wink.isUndefined(object)) && (!wink.isNull(object)));
	};
	
	/**
	 * Returns true if the given callback object is valid (contains at least a method. It can also contain a context)
	 * 
	 * @parmam {object} callback The object to test
	 * 
	 * @returns {boolean} True if the object is a valid callback false otherwise
	 */
	wink.isCallback = function(callback) 
	{
		return !!(callback && callback.method);
	};
	
	/**
	 * Returns true if the given parameter is a string, false otherwise.
	 * 
	 * @param {object} object The object to test
	 *  
	 * @returns {boolean} True if the object is a string false otherwise
	 */
	wink.isString = function(object) 
	{
		return (typeof object == "string" || object instanceof String);
	};
	
	/**
	 * Returns true if the given parameter is an integer
	 * 
	 * @param {object} object The object to test
	 * 
	 * @returns {boolean} True if the object is an integer false otherwise
	 */
	wink.isInteger = function(object)
	{
		return (parseInt(object)===object);
	};
	
	/**
	 * Returns true if the given parameter is a number
	 * 
	 * @param {object} object The object to test
	 * 
	 * @returns {boolean} True if the object is a number false otherwise
	 */
	wink.isNumber = function(object)
	{
		return (typeof object == "number" || object instanceof Number);
	};
	
	/**
	 * Returns true if the given parameter is an array
	 * 
	 * @param {object} object The object to test
	 * 
	 * @returns {boolean} True if the object is an array false otherwise
	 */
	wink.isArray = function(object)
	{
		return (typeof object == "array" || object instanceof Array);
	};
	
	/**
	 * Returns true if the given parameter is a boolean
	 * 
	 * @param {object} object The object to test
	 * 
	 * @returns {boolean} True if the object is a boolean false otherwise
	 */
	wink.isBoolean = function(object)
	{
		return (typeof object == "boolean" || object instanceof Boolean);
	};
	
	/**
	 * Returns true if the given parameter is a function
	 * 
	 * @param {object} object The object to test
	 * 
	 * @returns {boolean} True if the object is a function false otherwise
	 */
	wink.isFunction = function(object)
	{
		return Object.prototype.toString.call(object) === "[object Function]";
	};
	
	/**
	 * Returns the given string parameter trimed.
	 * 
	 * @param {string} str The string to trim
	 *  
	 * @returns {string} The trimmed string
	 */
	wink.trim = function(str) 
	{
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	};
	
	/**
	 * Binds a method to a given context
	 * 
	 * @param {string} method The method to bind
	 * @param {object} context The scope with which the method will be executed
	 * @param {object} [arguments] Arguments to pass to the binded function
	 * 
	 * @returns {function} The binded function
	 */
	wink.bind = function(method, context /*[, arg1 [, arg2 ... ] ]*/)
	{
		var args = slice.call(arguments, 2);
		return function()
		{
			var finalArgs = args.concat(slice.call(arguments, 0));
			return method.apply(context, finalArgs);
		};
	};
	
	/**
	 * Invokes the given callback
	 * 
	 * @param {object} callback The callback to invoke. The callback must be an object containing a 'method' and a 'context'.
	 * @param {object} [parameters] Parameters to pass to the callback
	 * 
	 * @returns {function} The called function
	 */
	wink.call = function(callback, parameters)
	{
		var context = wd;
		var method = callback.method;
		var args = [];
		
		if (wink.isSet(callback.context))
		{
			context = callback.context;
		}
	
		if (arguments.length == 2)
		{
			args = [parameters];
		}
		if (wink.isSet(callback.arguments))
		{
			var additional = callback.arguments;
			if (!wink.isArray(additional)) {
				additional = [callback.arguments];
			}
			args = args.concat(additional);
		}
		return context[method].apply(context, args);
	};
	
	/**
	 * Connect a method to another method
	 * 
	 * @param {object} source The source context
	 * @param {string} method The source method
	 * @param {object} callback A callback that will be called once the source method will be invoked
	 */
	wink.connect = function(source, method, callback)
	{
		if (!wink.isSet(callback.context)) callback.context = wd;
		
		var f = source[method];
		
		if ( wink.isNull(f) || wink.isUndefined(f.cbs) )
		{

			var _source = function()
			{
				var target = arguments.callee.target;
				var args = [];
				
				var i, l = arguments.length;
				for ( i=0; i<l; i++ )
				{
					var argi = arguments[i];
					if ( wink.isArray(argi))
					{
						args = args.concat([argi]);
					} else
					{
						args = args.concat(argi);
					}
				}
				
				target && target.apply(source, args);
				
				var cbs = source[method].cbs;
				
				for ( var cb in cbs)
				{
					if ( !wink.isArray(cbs[cb].arguments) )
					{
						wink.call({context: cbs[cb].context, method: cbs[cb].method, arguments: args.concat([cbs[cb].arguments])});
					} else
					{
						wink.call({context: cbs[cb].context, method: cbs[cb].method, arguments: args.concat(cbs[cb].arguments)});
					}
				}
			};
			
			_source.target = f;
			_source.cbs = [];
			
			f = source[method] = _source;
		}

		for ( var cb in f.cbs)
		{
			if ( (f.cbs[cb].context == callback.context) && (f.cbs[cb].method == callback.method))
			{
				return
			}
		}

		f.cbs.push(callback);
	};
	
	/**
	 * Disconnect two methods
	 * 
	 * @param {object} source The source context that was previously connected
	 * @param {string} method The source method that was previously connected
	 * @param {object} callback The callback that was previously connected
	 */
	wink.disconnect = function(source, method, callback)
	{
		if (!wink.isSet(callback.context)) callback.context = wd;
		
		var f = source[method];
		
		if ( !wink.isUndefined(f.cbs) )
		{
			for ( var cb in f.cbs)
			{
				if ( (f.cbs[cb].context == callback.context) && (f.cbs[cb].method == callback.method))
				{
					delete f.cbs[cb];
				}
			}
		}
	};
	
	/**
	 * Calls a deferred method.
	 * 
	 * @param {object} context The execution context of the method to call 
	 * @param {string} method The method to call
	 * @param {integer} delay Time to wait before calling method
	 * @param {object} [arguments] A list of caller arguments
	 * 
	 * @returns {object} The timeout object
	 */
	wink.setTimeout = function(context, method, delay /*[, arg1 [, arg2 ... ] ]*/)
	{
		var args = slice.call(arguments, 3);
		var toExecute = function()
		{
			context[method].apply(context, args);
		};
		return setTimeout(toExecute, delay);
	};
	
	/**
	 * Calls a deferred method.
	 * 
	 * @param {object} context The execution context of the method to call 
	 * @param {string} method The method to call
	 * @param {integer} delay Time to wait before calling method
	 * @param {object} [arguments] A list of caller arguments
	 * 
	 * @returns {object} The interval object
	 */
	wink.setInterval = function(context, method, delay /*[, arg1 [, arg2 ... ] ]*/)
	{
		var args = slice.call(arguments, 3);
		var toExecute = function()
		{
			context[method].apply(context, args);
		};
		return setInterval(toExecute, delay);
	};
	

	var _uidSequence = 100;
	/**
	 * Generates a unique identifier
	 * 
	 * @returns {integer} The unique id
	 */
	wink.getUId = function()
	{
		return (_uidSequence += 1);
	};
	
	
	if (wink.isUndefined(wd._))
	{
		/**
		 * @function
		 * @see wink.translate
		 */
		_ = wink.bind(wink.translate, wink);
	}
	
	if (wink.isUndefined(wd.$$))
	{
		/**
		 * @function
		 * @see wink.query
		 */
		$$ = wink.bind(wink.query, wink);
	}
	
	if (wink.isUndefined(wd.$))
	{
		/**
		 * @function
		 * @see wink.byId
		 */
		$ = wink.bind(wink.byId, wink);
	}
	
	return wink;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/** 
 * @fileOverview HTML Elements extensions
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1 (partial), Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Sylvain LALANDE
 */

/**
 * @namespace HTMLElement
 * @name HTMLElement
 */

define(['../../../_base/_base/js/base'], function(wink)
{
	var htmlelement = HTMLElement.prototype;
	
	var isUndef = wink.isUndefined;
	
	/**
	 * @function Extends HTMLElements in order to retrieve their top and left position
	 * 
	 * @name HTMLElement#getPosition
	 * 
	 * @param {HTMLElement} [parentNode] If specified, the returned value is relative to the parentNode node. If parentNode is not a parent node of the current HTML element or if not specified, the returned value will be an absolute position
	 * @param {boolean} [transform] Take CSS transforms into account while calculating the position
	 * 
	 * @returns {object} the x and y position of the element
	 */
	var getPosition = function(parentNode, transform)
	{
		var position = {x: 0, y: 0};
		var obj = this;

		while (obj && obj != parentNode) 
		{
			position.x += obj.offsetLeft;
			position.y += obj.offsetTop;

			if ( transform )
			{
				position.x += wink.fx.getTransformPosition(obj).x;
				position.y += wink.fx.getTransformPosition(obj).y;
			}
			
			obj = obj.offsetParent;
		}
		
		return position;
	};
		
	/**
	 * @function Extends HTMLElements in order to retrieve their top position
	 * 
	 * @name HTMLElement#getTopPosition
	 * 
	 * @param {HTMLElement} [parentNode] If specified, the returned value is relative to the parentNode node. If parentNode is not a parent node of the current HTML element or if not specified, the returned value will be an absolute top position
	 * @param {boolean} [transform] Take CSS transforms into account while calculating the position
	 * 
	 * @returns {integer} the y position of the element
	 */
	var getTopPosition = function(parentNode, transform)
	{
		return (this.getPosition(parentNode, transform).y);
	};
	
	/**
	 * @function Extends HTMLElements in order to retrieve their left position
	 * 
	 * @name HTMLElement#getLeftPosition
	 * 
	 * @param {HTMLElement} [parentNode] If specified, the returned value is relative to the parentNode node. If parentNode is not a parent node of the current HTML element or if not specified, the returned value will be an absolute left position
	 * @param {boolean} [transform] Take CSS transforms into account while calculating the position
	 * 
	 * @returns {integer} The x position of the element
	 */
	var getLeftPosition = function(parentNode, transform)
	{
		return (this.getPosition(parentNode, transform).x);
	};
	
	/**
	 * @function Extends HTMLElements in order to translate the node
	 * 
	 * @name HTMLElement#translate
	 * 
	 * @param {integer|string} x The x position (can be a value in pixels or a value in percentage)
	 * @param {integer|string} y The y position (can be a value in pixels or a value in percentage)
	 * @param {boolean} [force2d] Used to prevent "translate3d"
	 */
	var translate = function(x, y, force2d)
	{
		wink.fx.applyTranslate(this, x, y, force2d);
	};
	
	/**
	 * @function Extends HTMLElements in order to scale the node
	 * 
	 * @name HTMLElement#scale
	 * 
	 * @param {integer} x The x ratio of the scale
	 * @param {integer} y The y ratio of the scale
	 */
	var scale = function(x, y)
	{
		wink.fx.applyScale(this, x, y);
	};
	
	/**
	 * @function Extends HTMLElements in order to rotate the node
	 * 
	 * @name HTMLElement#rotate
	 * 
	 * @param {integer} x The angle of the rotation in degrees
	 */
	var rotate = function(angle)
	{
		wink.fx.applyRotate(this, angle);
	};
	
	/**
	 * @function Extends HTMLElements in order to listen to gesture
	 * 
	 * @name HTMLElement#listenToGesture
	 * 
	 * @param {string} gesture The gesture name to listen
	 * @param {object} callback The callback to invoke when this gesture is done
	 * @param {object} [options] The options associated to the listener
	 * @param {boolean} [options.preventDefault=false] Indicates whether an automatic preventDefault must be done
	 * 
	 * @requires wink.ux.gesture
	 */
	var listenToGesture = function(gesture, callback, options)
	{
		wink.ux.gesture.listenTo(this, gesture, callback, options);
	};
	
	/**
	 * @function Extends HTMLElements in order to unlisten to gesture
	 * 
	 * @name HTMLElement#unlistenToGesture
	 * 
	 * @param {string} gesture The gesture name to unlisten
	 * @param {object} callback The callback that was previously added (identified by { context, method })
	 * 
	 * @requires wink.ux.gesture
	 */
	var unlistenToGesture = function(gesture, callback)
	{
		wink.ux.gesture.unlistenTo(this, gesture, callback);
	};
	
	htmlelement.winkGetPosition = getPosition;
	htmlelement.winkGetTopPosition = getTopPosition;
	htmlelement.winkGetLeftPosition = getLeftPosition;
	htmlelement.winkTranslate = translate;
	htmlelement.winkScale = scale;
	htmlelement.winkRotate = rotate;
	htmlelement.winkListenToGesture = listenToGesture;
	htmlelement.winkUnlistenToGesture = unlistenToGesture;
	
	// Bindings
	if ( isUndef(htmlelement.getPosition)) { htmlelement.getPosition = getPosition; }
	if ( isUndef(htmlelement.getTopPosition)) { htmlelement.getTopPosition = getTopPosition; }
	if ( isUndef(htmlelement.getLeftPosition)) { htmlelement.getLeftPosition = getLeftPosition; }
	if ( isUndef(htmlelement.rotate)) { htmlelement.rotate = rotate; }
	if ( isUndef(htmlelement.scale)) { htmlelement.scale = scale; }
	if ( isUndef(htmlelement.translate)) { htmlelement.translate = translate; }
	if ( isUndef(htmlelement.listenToGesture)) { htmlelement.listenToGesture = listenToGesture; }
	if ( isUndef(htmlelement.unlistenToGesture)) { htmlelement.unlistenToGesture = unlistenToGesture; }
	
	return wink;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Implements an error management system
 *
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Jerome GIRAUD		
 */
define(['../../../_base/_base/js/base'], function(wink)
{
	/**
	 * @namespace Error management system
	 * 
	 * @example
	 * 
	 * wink.error.logLevel = 1;
	 * 
	 * 
	 * @see <a href="WINK_ROOT_URL/_base/error/test/test_error.html" target="_blank">Test page</a>
	 */
	wink.error =
	{
		/**
		 * The current log level. If set to 0, no message will be displayed. If set to 1, the log messages will be displayed.
		 * 
		 * @property logLevel
		 * @type integer
		 * @default 0
		 */
		logLevel: 0,
		
		/**
		 * Display a log message if the log level has been set to 1.
		 * If the console is defined, use the console, otherwise, alert the user
		 * 
		 * @param {string} value The content of the log
		 */
		log: function(value)
		{
			if ( this.logLevel == 1)
			{
				if ( typeof console != 'undefined' )
				{
					console.log(value);
				} else
				{
					alert(value);
				}
			}
		}
	
	};
	
	/**
	 * @function
	 * @see wink.error.log
	 */
	wink.log = wink.bind(wink.error.log, wink.error);
	
	return wink.error;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview JSON utility
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Jerome GIRAUD
 */

define(['../../../_base/_base/js/base'], function(wink)
{
	var windowJson = window.JSON;
	
	/**
	 * @namespace JSON utility
	 * 
	 * @example
	 * 
	 * structure = wink.parseJSON('{"person" : {"name" : "matt", "age" : "26"}}');
	 * 
	 * @see <a href="WINK_ROOT_URL/_base/json/test/test_json.html" target="_blank">Test page</a>
	 * @see <a href="WINK_ROOT_URL/_base/json/test/test_json_extended.html" target="_blank">Test page (json extended)</a>
	 */
	wink.json = 
	{
		/**
		 * Test the validity of a JSON structure and parse it
		 * 
		 * @param {string} str The string to parse
		 * 
		 * @returns {object} The associated JSON structure
		 */
		parse: function(str)
		{
			if (wink.isSet(windowJson) && wink.isSet(windowJson.parse))
			{
				return windowJson.parse(str);
			} else
			{
				var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	     
				str = String(str);
				
				cx.lastIndex = 0;
			    
				if (cx.test(str))
				{
					str = str.replace(cx, function(a)
					{
			            return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
			        });
			    }
		    
			    if (/^[\],:{}\s]*$/.test(str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
			    {
			    	var JSON = eval('(' + str + ')');
			    }
		    
			    return JSON;
			}
		},
		
		/**
		 * Concatenate the given JSON structures
		 * 
		 * @param {object} obj1 The object that will be updated with the second
		 * @param {object} obj2 The object that will be concatenated to the first
		 * 
		 * @returns {object} The final object
		 */
		concat: function(obj1, obj2)
		{
			for (var key in obj2)
			{
				obj1[key] = obj2[key];
			}
			
			return obj1;
		}
	};
	
	/**
	 * @function
	 * @see wink.json.parse
	 */
	wink.parseJSON = wink.bind(wink.json.parse, wink.json);
	
	/**
	 * @function
	 * @see wink.json.concat
	 */
	wink.mixin = wink.bind(wink.json.concat, wink.json);
	
	return wink.json;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Implements an event management system based on a publish/subscribe mechanism
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Jerome GIRAUD
 */

define(['../../../_base/_base/js/base', '../../error/js/error'], function(wink)
{
	var _subscribed_topics = [];
	
	/**
	 * @namespace Event management system
	 * 
	 * @example
	 * 
	 * wink.subscribe('/test/events/alert1', {method: 'dummyMethod2', context: this});
	 * wink.publish('/test/events/alert1', 'value1');
	 * 
	 * @see <a href="WINK_ROOT_URL/_base/topics/test/test_topics_1.html" target="_blank">Test page</a>
	 * @see <a href="WINK_ROOT_URL/_base/topics/test/test_topics_2.html" target="_blank">Test page (with scope)</a>
	 */
	wink.topics = {
		// for tests
		_getTopics: function() {
			return _subscribed_topics;
		}
	};
	
	/**
	 * Attach to the given topic
	 * 
	 * @function
	 * 
	 * @param {string} topic The name of the topic we want to be notified from
	 * @param {object} callback The callback method called when the event related to the topic is triggered. It should contain a 'method' and a 'context'.
	 */
	wink.topics.subscribe = subscribe;
	function subscribe(topic, callback)
	{	
		if (!wink.isCallback(callback))
		{
			
			return;
		}
		var subscription = [topic.toLowerCase(), callback];
		_subscribed_topics.push(subscription);
	};
	
	/**
	 * Detach from the given topic
	 * 
	 * @function
	 * 
	 * @param {string} topic The name of the topic we don't want to be notified from anymore.
	 * @param {object} callback This parameter should be the same as the one passed through the subscribe method
	 */
	wink.topics.unsubscribe = unsubscribe;
	function unsubscribe(topic, callback)
	{
		var topicLower = topic.toLowerCase();
		var i, l = _subscribed_topics.length;
		for (i = 0; i < l; i++) 
		{
			var sti = _subscribed_topics[i];
			if (sti[0] == topicLower && sti[1].method == callback.method && sti[1].context == callback.context) 
			{
				_subscribed_topics.splice(i, 1);
				break;
			}
		}
	};
	
	/**
	 * Publish an event to all the subscribers
	 * 
	 * @function
	 * 
	 * @param {string} topic The name of the topic we are triggering
	 * @param {object} [value] The value to pass to the subscribers' callback methods
	 */
	wink.topics.publish = publish;
	function publish(topic, value)
	{
		_dispatch(topic.toLowerCase(), value);
	};
	
	/**
	 * Triggers all the events which are in the queue
	 * 
	 * @param {string} topic The name of the topic we are triggering
	 * @param {object} [parameters] The value to pass to the subscribers' callback methods
	 */
	var _dispatch = function(topic, parameters)
	{
		var i, l = _subscribed_topics.length;
		for (i = 0; i < l; i++) 
		{
			var sti = _subscribed_topics[i];
			if (sti && sti[0] == topic) 
			{
				if ( wink.isSet(sti[1])) 
				{
					wink.call(sti[1], parameters);
				}
			}
		}
	};
	
	/**
	 * @function
	 * @see wink.topics.publish
	 */
	wink.publish = publish;
	
	/**
	 * @function
	 * @see wink.topics.subscribe
	 */
	wink.subscribe =  subscribe;
	
	/**
	 * @function
	 * @see wink.topics.unsubscribe
	 */
	wink.unsubscribe = unsubscribe;
	
	return wink.topics;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Object providing a layer of abstraction with all specifics related to the platform hosting the code.
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Sylvain LALANDE

 */
define(['../../../_base/_base/js/base'], function(wink)
{
	var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, t, u, v, w, bb, ba, op, ie;
	a = b = c = d = e = f = g = h = bb = ba = op = ie = false;
	i = j= k = l = m = n = o = p = q = r = 0;
	
	var isSet = wink.isSet;
	
	var regTest = function(reg, str) {
		return RegExp(reg).test(str);
	};
	var regExec = function(reg, str) {
		return RegExp(reg).exec(str);
	};
	
	/**
	 * Extracts the version number in the given string.
	 * 
	 * @param {string} str The working source string
	 * @param {string} reg The regular expression that identifies the working substring
	 * @param {string} separator The separator between the version parts
	 */
	var _ext = function(str, reg, separator) {
		var result = {
			v: 0,
			r: 0,
			u: 0
		};
		var fields = regExec(reg, str);
		if (isSet(fields) && fields.length > 1)
		{
			var versionString = fields[2];
			var invalidCharacter = regExec("[^\\" + separator + "0-9]", versionString);
			if (isSet(invalidCharacter))
			{
				versionString = versionString.slice(0, invalidCharacter.index);
			}
			var version = versionString.split(separator);
			if (version.length > 0)
			{
				result.v = version[0];
			}
			if (version.length > 1)
			{
				result.r = version[1];
			}
			if (version.length > 2)
			{
				result.u = version[2];
			}
			if (version.length > 3)
			{
				result.u += "." + version[3];
			}
		}
		return result;
	};

	t = navigator || {}, u = t.userAgent, v = t.platform, w = t.appVersion;

	// Retrieve all necessary informations about the platform.
	a = regTest(" AppleWebKit/", u);
	ba = regTest(/bada/gi, u);
	op = regTest(/Opera/gi, u);
		
	if (isSet(v))
	{
		if (regTest(/iphone/i, v))
		{
			c = true;
		}
		if (regTest(/ipod/i, v))
		{
			d = true;
		}
		if (regTest(/ipad/i, v))
		{
			e = true;
		}
		if (regTest(/blackberry/i, v))
		{
			bb = true;
		}
	}

	if (isSet(w))
	{
		if (regTest(/android/i, w))
		{
			f = true;
		}
		if (regTest(/safari/i, w))
		{
			g = true;
			
			var version = _ext(w, "( Version/)([^ ]+)", ".");
			l = version.v;
			m = version.r;
			n = version.u;
		}
		if (regTest(/MSIE/i, w))
		{
			ie = true;
			
			var version = _ext(w, "( MSIE )([^ ]+)", ".");
			l = version.v;
			m = version.r;
		}
	}
	
	if (!g && !a)
	{
		h = regTest(/mozilla/i, u);
	}
	
	b = c || d || f || bb || ba || regTest(" Mobile/", u);
	
	if (a)
	{
		var version = _ext(u, "( AppleWebKit/)([^ ]+)", ".");
		i = version.v;
		j = version.r;
		k = version.u;
	}
	
	if (b && isSet(w))
	{
		var regvOs = f ? [ "( Android )([^ ]+)", "." ] : [ "( OS )([^ ]+)", "_" ];
		if (bb) {
			regvOs = [ "( BlackBerry )([^ ]+)", "." ];
		}
		var vOs = _ext(w, regvOs[0], regvOs[1]);
		p = vOs.v;
		q = vOs.r;
		r = vOs.u;
	}

	/**
	 * @namespace User Agent properties
	 * 
	 * <pre>
	 * |-----------------------------------------------------------------------------------|
	 * | Plaform          | webkitV | wMV | wUV | browserV | bMV | bUV | osV | osMV | osUV |
	 * |-----------------------------------------------------------------------------------|
	 * |IPhone OS 3       | 528     | 18  | 0   | 4        | 0   | 0   | 3   | 1    | 2    |
	 * |IPhone OS 2       | 525     | 18  | 1   | 3        | 1   | 1   | 2   | 2    | 1    |
	 * |Android HTC Hero  | 528     | 5   | 0   | 3        | 1   | 2   | 1   | 5    | 0    |
	 * |PC                | 531     | 21  | 8   | 4        | 0   | 4   | 0   | 0    | 0    |
	 * |-----------------------------------------------------------------------------------|
	 * </pre>
	 * 
	 * @example
	 * 
	 * if ( wink.ua.isAndroid )
	 * {
	 * 	...
	 * }
	 * 
	 * @see <a href="WINK_ROOT_URL/_base/ua/test/test_ua.html" target="_blank">Test page</a>
	 */
	wink.ua = 
	{
		/**
		 * The webapp is running on webkit
		 * 
		 * @property isWebkit
		 * @type boolean
		 */
		isWebkit : a,
		/**
		 * The webapp is running on a mobile device
		 * 
		 * @property isMobile
		 * @type boolean
		 */
		isMobile : b,
		/**
		 * The webapp is running on an iPhone
		 * 
		 * @property isIPhone
		 * @type boolean
		 */
		isIPhone : c,
		/**
		 * The webapp is running on an iPod
		 * 
		 * @property isIPod
		 * @type boolean
		 */
		isIPod : d,
		/**
		 * The webapp is running on an iPad
		 * 
		 * @property isIPad
		 * @type boolean
		 */
		isIPad : e,
		/**
		 * The webapp is running on IOS
		 * 
		 * @property isIOS
		 * @type boolean
		 */
		isIOS : (c || d || e),
		/**
		 * The webapp is running on an android device
		 * 
		 * @property isAndroid
		 * @type boolean
		 */
		isAndroid : f,
		/**
		 * The webapp is running on a blackberry device
		 * 
		 * @property isBlackBerry
		 * @type boolean
		 */
		isBlackBerry : bb,
		/**
		 * The webapp is running on a bad device
		 * 
		 * @property isBada
		 * @type boolean
		 */
		isBada : ba,
		/**
		 * The webapp is running on Opera
		 * 
		 * @property isOpera
		 * @type boolean
		 */
		isOpera : op,
		/**
		 * The webapp is running on Safari
		 * 
		 * @property isSafari
		 * @type boolean
		 */
		isSafari : g,
		/**
		 * The webapp is running on Firefox
		 * 
		 * @property isMozilla
		 * @type boolean
		 */
		isMozilla : h,
		/**
		 * The webapp is running on Internet Explorer
		 * 
		 * @property isIE
		 * @type boolean
		 */
		isIE : ie,
		/**
		 * The webkit version
		 * 
		 * @property webkitVersion
		 * @type string
		 */
		webkitVersion : i,
		/**
		 * The webkit minor version
		 * 
		 * @property webkitMinorVersion
		 * @type string
		 */
		webkitMinorVersion : j,
		/**
		 * The webkit updateversion
		 * 
		 * @property webkitUpdateVersion
		 * @type string
		 */
		webkitUpdateVersion : k,
		/**
		 * The browser version
		 * 
		 * @property browserVersion
		 * @type string
		 */
		browserVersion : l,
		/**
		 * The browser minor version
		 * 
		 * @property browserMinorVersion
		 * @type string
		 */
		browserMinorVersion : m,
		/**
		 * The browser update version
		 * 
		 * @property browserUpdateVersion
		 * @type string
		 */
		browserUpdateVersion : n,
		/**
		 * The OS version
		 * 
		 * @property osVersion
		 * @type string
		 */
		osVersion : p,
		/**
		 * The OS minor version
		 * 
		 * @property osMinorVersion
		 * @type string
		 */
		osMinorVersion : q,
		/**
		 * The OS update version
		 * 
		 * @property osUpdateVersion
		 * @type string
		 */
		osUpdateVersion : r
	};
	
	return wink.ua;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview The wink feature detection provider.
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Sylvain LALANDE
 */

define(['../../../_base/_base/js/base'], function(wink)
{
	var features = {},
		properties = {},
		isFunc = wink.isFunction;
	
	
	/**
	 * @namespace Feature detection
	 * 
	 * @see <a href="WINK_ROOT_URL/_base/_feat/test/test_feat.html" target="_blank">Test page</a>
	 */
	wink.has = has;
	
	wink.has.prefixes = [ "-webkit-", "-moz-", "-o-", "ms-", "-khtml-" ];
	wink.has.prefix = null;
	
	/**
	 * Test if the given feature is supported
	 * 
	 * @function
	 * @name wink.has#has
	 * 
	 * @param {string} feature The feature to test
	 * 
	 * @returns {boolean} True if the feature is supported false otherwise
	 * 
	 * @example
	 * 
	 * if ( wink.has('native-geolocation') )
	 * {
	 * 	...
	 * }
	 * 
	 * // Supported features:
	 * 
	 * native-geolocation, 
	 * native-device-orientation, 
	 * native-device-motion, 
	 * css-transform, 
	 * css-transition, 
	 * css-translate3d, 
	 * css-border-radius, 
	 * css-text-shadow, 
	 * css-box-shadow, 
	 * css-gradient, 
	 * css-perspective, 
	 * css-matrix, 
	 * css-matrix-stack-inversed, 
	 * css-position-fixed, 
	 * touchstart, 
	 * touchmove, 
	 * touchend, 
	 * touch, 
	 * gesturestart, 
	 * gesturechange, 
	 * transitionend, 
	 * gestureend, 
	 * gesture, 
	 * json-parse
	 * 
	 */
	function has(feature) {
		if (isFunc(features[feature])) {
			features[feature] = features[feature]();
		}
		return features[feature];
	}
	
	/**
	 * Inquires about the given feature
	 * 
	 * @function
	 * @param {string} feature The feature to inquire
	 * @param {function} assertSupported The function that investigates or the boolean value if known
	 * @param {boolean} now Allows to investigate now
	 */
	wink.has.inquire = inquire;
	function inquire(feature, assertSupported, now) {
		if (typeof features[feature] != "undefined") {
			return;
		}
		var assert = assertSupported;
		if (now && isFunc(assertSupported)) {
			assert = assertSupported();
		}
		features[feature] = assert;
	}

	/**
	 * Inquires about a map of features
	 * 
	 * @function
	 * @param {object} map The map of features
	 * @param {boolean} now Allows to investigate now
	 */
	wink.has.inquireMap = inquireMap;
	function inquireMap(map, now) {
		if (!map || map.length == 0) {
			return;
		}
		for (var f in map) {
			inquire(f, map[f], now);
		}
	}
	
	/**
	 * Set a property associated to the feature detection
	 * 
	 * @function
	 * @param {string} key The property
	 * @param {string} value The value
	 */
	wink.has.setProp = setProp;
	function setProp(key, value) {
		properties[key] = value;
	}
	
	/**
	 * Defer the property recovery on a function or on a feature detection
	 * 
	 * @function
	 * @param {string} key The property
	 * @param {function} proc The defered process
	 */
	wink.has.deferProp = deferProp;
	function deferProp(key, proc) {
		if (isFunc(proc)) {
			setProp(key, proc);
		} else {
			setProp(key, function() {
				has(proc);
			});
		}
	}
	
	/**
	 * Get a property associated to the feature detection
	 * 
	 * @function
	 * @param {string} key The property
	 */
	wink.has.prop = prop;
	function prop(key) {
		var v = properties[key];
		if (isFunc(v)) {
			v();
			v = properties[key];
			if (isFunc(v)) {
				v = key;
			}
		}
		return v || key;
	}
	
	return wink.has;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview json features detection.
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Sylvain LALANDE
 * 
 * @features:
 * 	--> TODO json-stringify
 */

define(['../../../_base/_base/js/base', './feat'], function(wink)
{
	var winkhas = wink.has,
		inquire = winkhas.inquire,
		w = window;
	
	inquire("json-parse", function() {
		var parsed, supported = false;
		if (w["JSON"] && typeof JSON.parse == "function") {
			parsed = JSON.parse('{"w":1}');
			supported = !!(parsed && parsed.w);
		}
		return supported;
    });
	
	return winkhas;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview css features detection.
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Sylvain LALANDE
 * 
 * @features:
 * 	--> TODO css-rgba
 * 
 */

define(['../../../_base/_base/js/base', './feat'], function(wink) 
{
	var winkhas = wink.has,
		inquireMap = winkhas.inquireMap,
		setProp = winkhas.setProp,
		deferProp = winkhas.deferProp,
		w = window,
		d = w.document,
		el = d.createElement("div"),
		style = el.style,
		prefixes = winkhas.prefixes,
		stringV = "string",
		cssKeys = {
			a: "transform-property",
			b: "transition-property",
			c: "transition-duration",
			d: "transition-delay",
			e: "transition-timing-function",
			f: "border-radius",
			g: "text-shadow",
			h: "box-shadow",
			i: "gradient",
			j: "perspective",
			k: "transform-origin",
			l: "transform-style",
			m: "transform",
			n: "css-transition",
			o: "css-perspective",
			p: "css-transform",
			q: "perspective-origin",
			r: "backface-visibility",
			s: "tap-highlight-color",
			t: "user-select",
			bg: "background-image"
		};
	
	function normalizeKey(key) {
		var result = key;
		var keyReg = /(-)([a-z])/;
		var matches = key.match(keyReg);
		while (matches != null) {
			result = result.replace(keyReg, RegExp["$2"].toUpperCase());
			matches = result.match(keyReg);
		}
		return result;
	}
	
	function hasCss(prop) {
		var supported = false;
		if (typeof style[prop] == stringV) {
			setProp(prop, prop);
			supported = true;
		} else {
			var pr = winkhas.prefix;
			var prfs = (pr != null) ? [ pr ] : prefixes;
	    	var i, l = prfs.length;
	    	for (i = 0; i < l; i++) {
				var key = normalizeKey(prfs[i] + prop);
				if (typeof style[key] == stringV) {
					winkhas.prefix = prfs[i];
					setProp(prop, key);
					supported = true;
					break;
				}
			}
		}
		return supported;
    }
	
	deferProp(cssKeys.a, cssKeys.p);
	deferProp(cssKeys.m, cssKeys.p);
	deferProp(cssKeys.b, cssKeys.n);
	deferProp(cssKeys.c, cssKeys.n);
	deferProp(cssKeys.d, cssKeys.n);
	deferProp(cssKeys.e, cssKeys.n);
	deferProp(cssKeys.f, "css-border-radius");
	deferProp(cssKeys.g, "css-text-shadow");
	deferProp(cssKeys.h, "css-box-shadow");
	deferProp(cssKeys.i, "css-gradient");
	deferProp(cssKeys.j, cssKeys.o);
	deferProp(cssKeys.k, cssKeys.o);
	deferProp(cssKeys.l, cssKeys.o);
	deferProp(cssKeys.q, cssKeys.o);
	
	function singleProp(p) {
		return function() {
			hasCss(p);
		};
	}
	deferProp(cssKeys.r, singleProp(cssKeys.r));
	deferProp(cssKeys.s, singleProp(cssKeys.s));
	deferProp(cssKeys.t, singleProp(cssKeys.t));
	
	inquireMap({
		"css-transform": function() {
			var support = hasCss(cssKeys.m);
			
			var pr = winkhas.prefix;
	    	var trp = cssKeys.m;
	    	if (pr != null) {
	    		trp = (pr + trp);
	    	}

	    	if (!support) {
	    		setProp(cssKeys.a, cssKeys.m);
	    	} else {
	    		setProp(cssKeys.a, winkhas.prop(cssKeys.m));
	    	}
	    	setProp(cssKeys.m, trp);
			
			return support;
	    },
	    "css-transition": function() {
	    	var support = true;
	    	support = support && hasCss(cssKeys.b);
	    	support = support && hasCss(cssKeys.c);
	    	support = support && hasCss(cssKeys.d);
	    	support = support && hasCss(cssKeys.e);
	    	return support;
	    },
		"css-translate3d": function() {
			return winkhas("css-matrix");
		},
	    "css-border-radius": function() {
			return hasCss(cssKeys.f);
	    },
	    "css-text-shadow": function() {
			return hasCss(cssKeys.g);
	    },
	    "css-box-shadow": function() {
			return hasCss(cssKeys.h);
	    },
	    "css-gradient": function() {
	    	var prop = cssKeys.i,
	    		bg = cssKeys.bg,
            	gr = prop,
            	grval = '(linear,left top,right bottom,from(#9f9),to(white));';
	    	
	    	var pr = winkhas.prefix;
	    	var prfs = (pr != null) ? [ "", pr ] : [ "" ].concat(prefixes);
	    	var i, l = prfs.length;
	    	for (i = 0; i < l; i++) {
				var ps = (prfs[i] + gr);
				var s = ps + grval;
				style.cssText = bg + ":" + s;
				if (style[bg] && style[bg].indexOf(prop) != -1) {
					setProp(prop, ps);
	    			return true;
				}
			}
	    	return false;
	    },
	    "css-perspective": function() {
	    	var prs = hasCss(cssKeys.j) && hasCss(cssKeys.k) && hasCss(cssKeys.l) && hasCss(cssKeys.q);
	    	prs = prs && hasCss(cssKeys.k + "-x") && hasCss(cssKeys.k + "-y") && hasCss(cssKeys.k + "-z");
	    	if (!prs) {
	    		return false;
	    	}
	    	var pr = winkhas.prefix || "";
	    	var s = d.createElement('style');
	    	s.textContent = '@media (' + pr + 'transform-3d){#wink_has{height:2px}}';
	    	d.getElementsByTagName('head')[0].appendChild(s);
	    	el.id = 'wink_has';
	    	d.documentElement.appendChild(el);
	    	var result = (el.offsetHeight === 2);
	    	s.parentNode.removeChild(s);
	    	el.parentNode.removeChild(el);
	    	return result;
	    },
	    "css-matrix": function() {
	    	var wcm = w["WebKitCSSMatrix"];
	    	if (typeof wcm == "undefined") {
	    		return false;
	    	}
	    	var m = new wcm("matrix(1,0,0,1,6,7)");
	    	var sp = (m.m41 == 6 && m.m42 == 7) && (m.m41 == m.e && m.m42 == m.f);
	    	if (sp) {
	    		var m2 = new wcm("matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,6,7,8,1)");
	    		sp = sp && (m.m41 == m2.m41) && (m.m42 == m2.m42) && (m2.m43 == 8);
	    	}
	    	return sp;
	    },
	    "css-matrix-stack-inversed": function() {
	    	var ua = wink.ua;
	    	if (!winkhas("css-matrix") || !ua) {
	    		return false;
	    	}
	    	
	    	var v = ua.isIOS ? parseInt("" + ua.osVersion + ua.osMinorVersion + ua.osUpdateVersion) : 500;
	    	var vandroid = ua.isAndroid ? parseInt("" + ua.osVersion + ua.osMinorVersion + ua.osUpdateVersion) : 300;
	    	return (v < 421 || vandroid < 300);
	    },
	    "css-position-fixed": function() {
	    	var ua = wink.ua;
	    	if((ua.isAndroid && (ua.osVersion == 2) && (ua.osMinorVersion == 1)) || ua.isBada)
	    	{
	    		return false;
	    	}
	    	
	    	if (ua.isIOS)
	    	{
	    		if (ua.osVersion < 5)
	    		{
	    			return false;
	    		}
	    		else
	    		{
	    			return true;
	    		}
	    	}
	    	
	    	var container = document.body;
			if (document.createElement && container && container.appendChild && container.removeChild)
			{
				if (!el.getBoundingClientRect)
				{
					return null;
				}
				el.innerHTML = "x";
				el.style.cssText = "position:fixed;top:100px;";
				container.appendChild(el);
				var originalHeight = container.style.height, originalScrollTop = container.scrollTop;
				container.style.height = "3000px";
				container.scrollTop = 500;
				var elementTop = el.getBoundingClientRect().top;
				container.style.height = originalHeight;
				var isSupported = elementTop === 100;
				container.removeChild(el);
				container.scrollTop = originalScrollTop;
				
				return isSupported;
			}
			return false;
	    }
	});
	
	return winkhas;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview event features detection.
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Sylvain LALANDE
 * 
 * @features:
 * 	--> TODO hashchange
 */

define(['../../../_base/_base/js/base', './feat'], function(wink)
{
	var winkhas = wink.has,
		inquireMap = winkhas.inquireMap,
		setProp = winkhas.setProp,
		deferProp = winkhas.deferProp,
		w = window,
		d = w.document,
		de = d.documentElement,
		events = {
			ts: "touchstart",
			tm: "touchmove",
			te: "touchend",
			gs: "gesturestart",
			gc: "gesturechange",
			ge: "gestureend",
			tre: "transitionend"
		};

	function hasEvent(name) {
		return (('on' + events[name]) in de);
	}
	
	deferProp(events.ts, events.ts);
	deferProp(events.tm, events.tm);
	deferProp(events.te, events.te);
	deferProp(events.tre, events.tre);
	
	inquireMap({
		"touchstart": function() {
			var ts = hasEvent("ts");
			setProp(events.ts, ts ? events.ts : 'mousedown');
			return ts;
		},
		"touchmove": function() {
			var ts = hasEvent("tm");
			setProp(events.tm, ts ? events.tm : 'mousemove');
			return ts;
		},
		"touchend": function() {
			var ts = hasEvent("te");
			setProp(events.te, ts ? events.te : 'mouseup');
			return ts;
		},
		"touch": function() {
			return winkhas(events.ts) && winkhas(events.tm) && winkhas(events.te);
		},
		"gesturestart": function() {
			return hasEvent("gs");
		},
		"gesturechange": function() {
			return hasEvent("gc");
		},
		"gestureend": function() {
			return hasEvent("ge");
		},
		"gesture": function() {
			return winkhas(events.gs) && winkhas(events.gc) && winkhas(events.ge);
		},
		"transitionend": function() {
			if (winkhas("css-transition")) {
				var prefix = winkhas.prefix;
				var val = events.tre;
				if (prefix == "-webkit-") {
					val = "webkitTransitionEnd";
				} else if (prefix == "-o-") {
					val = "oTransitionEnd";
				}
				setProp(events.tre, val);
				return true;
			}
			return false;
		}
	});
	
	return winkhas;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview dom features detection.
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Sylvain LALANDE
 * 
 * @features:
 * 	--> TODO dom-addeventlistener
 * 	--> TODO dom-dataset
 * 	--> TODO dom-html5-elements
 * 	--> TODO dom-dynamic-base
 */

define(['../../../_base/_base/js/base', './feat'], function(wink)
{
	return wink.has;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Object providing a layer of abstraction with all specifics related to the css rules.
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, Bada 1.0, Windows Phone 7.5
 * @author Sylvain LALANDE
 */
define(['../../../_base/_base/js/base', '../../../_base/_feat/js/feat_css'], function(wink) 
{
	var _isSet = wink.isSet;
	var getprop = wink.has.prop;
	var _local = {
		u: undefined
	};
	
	wink.fx = {};

	/**
	 * Add a css class to the node
	 * 
	 * @function
	 * 
	 * @param {HTMLElement} node The DOM node
	 * @param {string} classStr The css class to add
	 * 
	 * @example
	 * 
	 * wink.addClass(node, 'MyCssClass');
	 * 
	 */
	wink.fx.addClass = addClass;
	function addClass(node, classStr) 
	{
		var cls = node.className;
		if ((" " + cls + " ").indexOf(" " + classStr + " ") < 0)
		{
			node.className = cls + (cls ? ' ' : '') + classStr;
		}
	};
	/**
	 * Remove a css class from the node
	 * 
	 * @function
	 * 
	 * @param {HTMLElement} node The DOM node
	 * @param {string} classStr The css class to remove
	 */
	wink.fx.removeClass = removeClass;
	function removeClass(node, classStr)
	{
		var t = wink.trim((" " + node.className + " ").replace(" " + classStr + " ", " "));
		if (node.className != t)
		{
			node.className = t;
		}
	};
	/**
	 * Apply styles to a given node
	 * 
	 * @function
	 * 
	 * @param {HTMLElement} node The node on which styles will be applied
	 * @param {object} properties An object containing all the properties to set
	 */
	wink.fx.apply = apply;
	function apply(node, properties)
	{
		var p, s = node.style;
		for (p in properties)
		{
			var styleResolved = getprop(p);
			s[styleResolved] = properties[p];
		}
	};
	/**
	 * Apply a transition to the given node
	 * 
	 * @function
	 * 
	 * @param {HTMLElement} node The node on which transition will be applied
	 * @param {string} property The transition property
	 * @param {integer} duration The transition duration
	 * @param {integer} delay The transition delay
	 * @param {string} func The transition function
	 * 
	 * @example
	 * 
	 * wink.fx.applyTransition(node, 'opacity', '500ms', '0ms', 'linear');
	 * 
	 */
	wink.fx.applyTransition = applyTransition;
	function applyTransition(node, property, duration, delay, func) 
	{
		apply(node, {
			"transition-property": _resolveProperties(property),
	    	"transition-duration": duration,
	    	"transition-delay": delay,
	    	"transition-timing-function": func
		});
	};
	/**
	 * Apply a transform transition to the given node
	 * 
	 * @function
	 * 
	 * @param {HTMLElement} node The node on which transition will be applied
	 * @param {integer} duration The transition duration
	 * @param {integer} delay The transition delay
	 * @param {string} func The transition function
	 * 
	 * @example
	 * 
	 * wink.fx.applyTransformTransition(node, '800ms', '0ms', 'default');
	 * 
	 */
	wink.fx.applyTransformTransition = applyTransformTransition;
	function applyTransformTransition(node, duration, delay, func) 
	{
		applyTransition(node, "transform", duration, delay, func);
	};
	/**
	 * Connect a function to the end of a transition on the given node.
	 * returns the listener in order to be able to remove it.
	 * 
	 * @function
	 * 
	 * @param {HTMLElement} node The node on which a transition is applied
	 * @param {string} func The function to connect
	 * @param {boolean} [persistent=false] Specify that the listener must be kept
	 * 
	 * @returns {function} The transition end listener
	 */
	wink.fx.onTransitionEnd = onTransitionEnd;
	function onTransitionEnd(node, func, persistent)
	{
		var trend = getprop("transitionend");
		var postwork = function(e) {
			if (persistent !== true) {
				node.removeEventListener(trend, postwork, false);
			}
			func(e);
		};
		node.addEventListener(trend, postwork, false);
		return postwork;
	};
	/**
	 * Returns the instantaneous position of the node, even during a transition.
	 * 
	 * @function
	 * 
	 * @param {HTMLElement} node The DOM node
	 * 
	 * @returns {object} The position of the element
	 */
	wink.fx.getTransformPosition = getTransformPosition;
	function getTransformPosition(node)
	{
		var result = {
			x: null,
			y: null
		};
		var transform = getTransform(node);
		
		if (!wink.has("css-matrix"))
		{
			var reg = new RegExp(/matrix/i);
			if (reg.test(transform)) 
			{
				var reg = new RegExp("[, ()]+", "g");
				var transformSplited = transform.split(reg);
				if (transformSplited.length > 6 && transformSplited[0] == "matrix")
				{
					result.x = parseInt(transformSplited[5]);
					result.y = parseInt(transformSplited[6]);
				}
			}
		}
		else
		{
			if (transform == "none")
			{
				transform = "";
			}
			var transformMatrix = new WebKitCSSMatrix(transform);
			result.x = transformMatrix.m41;
			result.y = transformMatrix.m42;
		}
		return result;
	};
	/**
	 * Apply the CSS Translation to the given node
	 * 
	 * @function
	 * 
	 * @param {HTMLElement} node The node to translate
	 * @param {integer} x The x coordinate of the translation
	 * @param {integer} y The y coordinate of the translation
	 * @param {boolean} [force2d] True to prevent "translate3d"
	 */
	wink.fx.applyTranslate = applyTranslate;
	function applyTranslate(node, x, y, force2d)
	{
		_computeTransform(node, x, y, _local.u, _local.u, _local.u, force2d);
	};
	/**
	 * Apply the CSS Scale to the given node
	 * 
	 * @function
	 * 
	 * @param {HTMLElement} node The node to scale
	 * @param {integer} x The x ratio of the scale
	 * @param {integer} y The y ratio of the scale
	 */
	wink.fx.applyScale = applyScale;
	function applyScale(node, x, y)
	{
		_computeTransform(node, _local.u, _local.u, x, y, _local.u, _local.u);
	};
	/**
	 * Apply the CSS Rotation to the given node
	 * 
	 * @function
	 * 
	 * @param {HTMLElement} node The node to rotate
	 * @param {number} angle The angle of the rotation in degrees
	 */
	wink.fx.applyRotate = applyRotate;
	function applyRotate(node, angle)
	{
		_computeTransform(node, _local.u, _local.u, _local.u, _local.u, angle, _local.u);
	};
	/**
	 * Return the transform affected to the given node
	 * 
	 * @function
	 * 
	 * @param {HTMLElement} node The DOM node
	 *  
	 * @returns {string} The transform
	 */
	wink.fx.getTransform = getTransform;
	function getTransform(node) 
	{
		return window.getComputedStyle(node)[getprop("transform-property")];
	};
	/**
	 * Apply the given transformation to the given node
	 * 
	 * @function
	 * 
	 * @param {HTMLElement} node The DOM node
	 * @param {string} transform The transformation to affect
	 */
	wink.fx.setTransform = setTransform;
	function setTransform(node, transform) 
	{
		apply(node, {
			"transform-property": transform
		});
	};
	/**
	 * apply the computed transformation to the given node
	 * 
	 * @param {HTMLElement} node The DOM node
	 * @param {number} tx The x coordinate of the translation
	 * @param {number} ty The y coordinate of the translation
	 * @param {number} sx The x ratio of the scale
	 * @param {number} sy The y ratio of the scale
	 * @param {number} a The angle of the rotation in degrees
	 * @param {boolean} force2d Used to prevent "translate3d"
	 */
	var _computeTransform = function(node, tx, ty, sx, sy, a, force2d)
	{
		var o = node._cssT || {};
		o = node._cssT = {
			t: (_isSet(tx) || _isSet(ty)) ? { tx: tx, ty: ty } : o.t,
			s: (_isSet(sx) || _isSet(sy)) ? { sx: sx, sy: sy } : o.s,
			r: _isSet(a) ? { a: a } : o.r
		};
		
		var hasT = (o.t && (_isSet(o.t.tx) || _isSet(o.t.ty))),
			hasS = (o.s && (_isSet(o.s.sx) || _isSet(o.s.sy))),
			hasR = (o.r && _isSet(o.r.a)),
			force2d = force2d;
		
		if (!wink.has("css-translate3d")
			|| (wink.ua.isAndroid && (hasS || hasR))) { // WORKAROUND - Android issue 12451 (>= 2.2) : translate3d combined with scale / rotate fails
			force2d = true;
		}
		
		var t = hasT ? _getTranslateTransform(o.t.tx, o.t.ty, force2d) : "",
			s = hasS ? _getScaleTransform(o.s.sx, o.s.sy) : "",
			r = hasR ? _getRotateTransform(o.r.a) : "",
			c = wink.trim(t + " " + s + " " + r);

		setTransform(node, c);
	};
	/**
	 * Get the translation transformation.
	 * 
	 * @param {number} x The x coordinate
	 * @param {number} y The y coordinate
	 * @param {boolean} force2d True to prevent "translate3d"
	 * 
	 * @returns {string} The transform
	 */
	var _getTranslateTransform = function(x, y, force2d)
	{
		var transform = "";
		var xParam = x;
		if (!_isSet(xParam))
		{
			xParam = 0;
		}
		var yParam = y;
		if (!_isSet(yParam))
		{
			yParam = 0;
		}
		var zParam = "0";
		
		var isPercentage = false;
		isPercentage = isPercentage || (wink.isString(xParam) && (xParam.indexOf('%', 0) != -1));
		isPercentage = isPercentage || (wink.isString(yParam) && (yParam.indexOf('%', 0) != -1));
		if (!isPercentage)
		{
			xParam = xParam + "px";
			yParam = yParam + "px";
			zParam = zParam + "px";
		}
		
		if (force2d) 
		{
			transform = "translate(" + xParam + ", " + yParam + ")";
		}
		else
		{
			transform = "translate3d(" + xParam + ", " + yParam + ", " + zParam + ")";
		}
		return transform;
	};
	/**
	 * Get the scale transformation.
	 * 
	 * @param {number} x The ratio on x
	 * @param {number} y The ratio on y
	 * 
	 * @returns {string} The transform
	 */
	var _getScaleTransform = function(x, y)
	{
		var transform = "";
		var xParam = x;
		if (!_isSet(xParam))
		{
			xParam = 1;
		}
		var yParam = y;
		if (!_isSet(yParam))
		{
			yParam = 1;
		}
		if (!wink.has("css-perspective"))
		{
			transform = "scale(" + xParam + ", " + yParam + ")";
		}
		else
		{
			transform = "scale3d(" + xParam + ", " + yParam + ", 1)";
		}
		return transform;
	};
	/**
	 * Get the rotate transformation.
	 * 
	 * @param {number} degree The rotation angle in degree
	 *
	 * @returns {string} The transform
	 */
	var _getRotateTransform = function(angle)
	{
		var transform = "";
		var angleParam = angle;
		if (!_isSet(angleParam))
		{
			angleParam = 0;
		}
		transform = "rotate(" + angleParam + "deg)";
		return transform;
	};
	/**
	 * Resolve the given property which may be a separated list of properties
	 * 
	 * @param {string} str The property to resolve
	 * 
	 * @returns {string} The resolved property
	 */
	var _resolveProperties = function(str)
	{
		var propertyResolved = str;
		if (str.indexOf(",") == -1) {
			propertyResolved = getprop(str);
		} else {
			var parts = str.split(",");
			var i, l = parts.length;
			for (i = 0; i < l; i++) {
				parts[i] = getprop(wink.trim(parts[i]));
			}
			propertyResolved = parts.join(",");
		}
		
		return propertyResolved;
	};
	
	/**
	 * @function
	 * @see wink.fx.addClass
	 */
	wink.addClass = addClass;
	
	/**
	 * @function
	 * @see wink.fx.removeClass
	 */
	wink.removeClass = removeClass;
	
	return wink.fx;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview math basics library.
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Sylvain LALANDE
 */
define(['../../../_base/_base/js/base'], function(wink)
{
	wink.math = 
	{
		/**
		 * Returns the rounded value to a given number of decimal places.
		 * 
		 * @param {number} n The value to round
		 * @param {integer} [d=0] Number of decimal places
		 * 
		 * @returns {mumber} The rounded value
		 */
		round: function(n, d)
		{
			if (!wink.isSet(d))
			{
				d = 0;
			}
			var nd = Math.pow(10, d);
			return Math.round(n * nd) / nd;
		}
	};
	
	return wink.math;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview The Event object is an encapsulation of an event. Only the touch object has to create such events.
 * It can thus be seen as an only readable object.
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0
 * 
 * @author Sylvain LALANDE
 */

define(['../../../_base/_base/js/base', '../../../_base/error/js/error', '../../../_base/json/js/json'], function(wink)
{	
	var undef = wink.isUndefined;
	var isSet = wink.isSet;

	/**
	 * @class The Event object is an encapsulation of an event. Only the touch object has to create such events.
	 * It can thus be seen as an only readable object.
	 * 
	 * @param {object} properties The properties object
	 * @param {string} properties.type Type of event (start, move, end, gesturestart, gesturemove, gestureend)
	 * @param {number} properties.x x coordinate of the event
	 * @param {number} properties.y y coordinate of the event
	 * @param {timestamp} properties.timestamp	The event timestamp
	 * @param {HTMLElement} properties.target The target element
	 * @param {DOMEvent} properties.srcEvent The original source event
	 * @param {boolean} properties.multitouch Indicates whether the current event occurs in a multi-touch context
	 */
	wink.ux.Event = function(properties)
	{
		/**
		 * Unique identifier
		 * 
		 * @property uId
		 * @type integer
		 */
		this.uId = wink.getUId();
		
		/**
		 * Type of event (start, move, end, gesturestart, gesturemove, gestureend)
		 * 
		 * @property type
		 * @type string
		 */
		this.type = null;
		
		/**
		 * x coordinate of the event
		 * 
		 * @property x
		 * @type number
		 */
		this.x = null;
		
		/**
		 * y coordinate of the event
		 * 
		 * @property y
		 * @type number
		 */
		this.y = null;
		
		/**
		 * The event timestamp
		 * 
		 * @property timestamp
		 * @type timestamp
		 */
		this.timestamp = null;
		
		/**
		 * The target element
		 * 
		 * @property target
		 * @type HTMLElement
		 */
		this.target = null;
		
		/**
		 * The original source event
		 * 
		 * @property srcEvent
		 * @type DOMEvent
		 */
		this.srcEvent = null;
		
		/**
		 * Indicates whether the current event occurs in a multi-touch context
		 * 
		 * @property multitouch
		 * @type boolean
		 */
		this.multitouch = null;
		
		wink.mixin(this, properties);
		
		if (this._validateProperties() === false) return;
	};
	
	wink.ux.Event.prototype = 
	{
		/**
		 * Allows to prevent the default behavior
		 */
		preventDefault: function()
		{
			this.srcEvent.preventDefault();
		},
	
		/**
		 * Allows to stop the event propagation
		 */
		stopPropagation: function()
		{
			this.srcEvent.stopPropagation();
		},
	
		/**
		 * Dispatch the source event to the given element with the given type
		 * 
		 * @param {HTMLElement} target the node that will receive the dispatched event
		 * @param {string} [type] the type of event dispatched (eg: click)
		 */
		dispatch: function(target, type)
		{
			var srcEvent = this.srcEvent;
			var targetedType = srcEvent.type;
			if (isSet(type))
			{
				targetedType = type;
			}
			var cloneEvent = _createEvent(srcEvent, targetedType);
			target.dispatchEvent(cloneEvent);
		},
		
		/**
		 * Validate the properties of the component
		 * @returns {boolean} True if the properties are valid, false otherwise
		 */
		_validateProperties: function()
		{
return true;
}
	};
	
	/**
	 * @param {HTMLElement} sourceEvent the source event
	 * @param {HTMLElement} type the event type
	 * 
	 * @returns {DOMEvent} a new event
	 */
	var _createEvent = function(sourceEvent, type)
	{
		var s = sourceEvent;
		var eventInterface = "HTMLEvents";
		
		if (/blur|focus|resize|scroll/i.test(type)) {
			eventInterface = "UIEvent";
		} else if (/click|mouse(down|move|up)/i.test(type)) {
			eventInterface = "MouseEvent";
		} else if (/touch(start|move|end|cancel)/i.test(type)) {
			eventInterface = "TouchEvent";
		}
		
		var event = document.createEvent(eventInterface);
		var ct = s.changedTouches;
		if (eventInterface == "HTMLEvents") {
			event.initEvent(type, s.bubbles, s.cancelable);
		} else if (eventInterface == "UIEvent") {
			event.initUIEvent(type, s.bubbles, s.cancelable, window, s.detail);
		} else if (eventInterface == "MouseEvent") {
			var sx = s.screenX, sy = s.screenY, cx = s.clientX, cy = s.clientY;
			if (s.initTouchEvent && ct && ct.length > 0) {
				var t = ct[0];
				sx = t.screenX;
				sy = t.screenY;
				cx = t.clientX;
				cy = t.clientY;
			}
			event.initMouseEvent(type, s.bubbles, s.cancelable, document.defaultView, s.detail, sx, sy, cx, cy, s.ctrlKey, s.altKey, s.shiftKey, s.metaKey, s.button, s.relatedTarget);
		} else if (eventInterface == "TouchEvent") {
			event.initTouchEvent(type, s.bubbles, s.cancelable, window, s.detail, s.screenX, s.screenY, s.clientX, s.clientY, s.ctrlKey, s.altKey, s.shiftKey, s.metaKey, s.touches, s.targetTouches, ct, s.scale, s.rotation);
		}
		
		return event;
	};
	
	return wink.ux.Event;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview The Touch object provides a layer of abstraction with all event listeners and listened elements.
 * It manages the events of the finger or the mouse so that the caller does not care about the target platform.
 * When events occur, the touch object handles them invoking callbacks with the resulting event and associated arguments.
 *
 * @author Sylvain LALANDE
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0
 */
define(['../../../_base/_base/js/base', '../../../_base/error/js/error', '../../../_base/_feat/js/feat_event', '../../event/js/event'], function(wink) 
{
	var _els = []; // touch elements
	
	var _SE = "start";
	var _ME = "move";
	var _EE = "end";
	var _GS_SE = "gesturestart";
	var _GS_CE = "gesturechange";
	var _GS_EE = "gestureend";
	
	var hasprop = wink.has.prop;
	var _MAP = {
		"start": hasprop("touchstart"),
		"move": hasprop("touchmove"),
		"end": hasprop("touchend"),
		"gesturestart": hasprop("gesturestart"),
		"gesturechange": hasprop("gesturechange"),
		"gestureend": hasprop("gestureend")
	};
	var _MAP_INV = {};
	for (var key in _MAP)
	{
		var value = _MAP[key];
		_MAP_INV[value] = key;
	}
	
	/**
	 * @namespace The Touch object provides a layer of abstraction with all event listeners and listened elements.
	 * It manages the events of the finger or the mouse so that the caller does not care about the target platform.
	 * When events occur, the touch object handles them invoking callbacks with the resulting event and associated arguments.
	 * 
	 * @see <a href="WINK_ROOT_URL/ux/touch/test/test_touch_1.html" target="_blank">Test page</a>
	 * @see <a href="WINK_ROOT_URL/ux/touch/test/test_touch_2.html" target="_blank">Test page (move)</a>
	 * @see <a href="WINK_ROOT_URL/ux/touch/test/test_touch_3.html" target="_blank">Test page (selection)</a>
	 */
	wink.ux.touch = {};

	/**
	 * Adds a new listener
	 * 
	 * @function
	 * 
	 * @param {HTMLElement} domNode The DOM node reference
	 * @param {string} eventType The event type that must match with one of { "start", "move", "end", "gesturestart", "gesturemove", "gestureend" }
	 * @param {object} callback The callback to invoke when event is received by the node : { context, method, arguments }
	 * @param {options} [options] The options associated to the listener
	 * @param {boolean} [options.preventDefault=false] Indicates whether an automatic preventDefault must be done
	 * @param {boolean} [options.tracking=true] Indicates whether the node must be tracked after the first start event (taken into account in the first method call)
	 * @param {boolean} [options.captureFlow=false] Indicates whether the capture event flow is used
	 * 
	 * @example
	 * 
	 * var handleStart = function(uxEvent)
	 * {
	 *   alert("Start At: " + uxEvent.x + ", " + uxEvent.y);
	 * };
	 * 
	 * wink.ux.touch.addListener($("nodeId"), "start", { context: window, method: "handleStart" });
	 * 
	 */
	wink.ux.touch.addListener = addListener;
	function addListener(domNode, eventType, callback, options)
	{
		if (wink.isUndefined(_MAP[eventType]))
		{
			wink.log('[touch] Cannot add listener for unknown eventType: ' + eventType);
			return false;
		}
		
		if (!wink.isSet(options))
		{
			options = {};
		}
		if (options === true)
		{
			options = { preventDefault: true }; // backwards compatibility
		}
		var opts = {
			preventDefault: options.preventDefault === true ? true : false,
			tracking: options.tracking === false ? false : true,
			captureFlow: options.captureFlow === true ? true : false
		};
		
		var touchElement = null;
		var index = _getTouchElementIndex(domNode);
		if (index == null) 
		{
			var properties = { domNode: domNode, tracking: opts.tracking };
			touchElement = new wink.ux.touch.Element(properties);
			_els.push(touchElement);
		}
		else
		{
			touchElement = _els[index];
		}
		
		if (!touchElement.isListening(eventType))
		{
			if (touchElement.eventHandler == null) {
				touchElement.eventHandler = function(e) {
					_handleEvent(e, touchElement);
				};
			}
			touchElement.eventCaptures[eventType] = opts.captureFlow;
			touchElement.domNode.addEventListener(_MAP[eventType], touchElement.eventHandler, touchElement.eventCaptures[eventType]);
		}
		touchElement.addEventCallback(eventType, callback, opts.preventDefault);
	};
	
	/**
	 * Removes an existing listener
	 * 
	 * @function
	 * 
	 * @param {HTMLElement} domNode The DOM node reference
	 * @param {string} eventType The event type that must match with one of { "start", "move", "end", "gesturestart", "gesturemove", "gestureend" }
	 * @param {object} callback The callback that was previously added (identified by { context, method })
	 * 
	 */
	wink.ux.touch.removeListener = removeListener;
	function removeListener(domNode, eventType, callback) 
	{
		var index = _getTouchElementIndex(domNode);
		if (index != null) 
		{
			var touchElement = _els[index];
			touchElement.removeEventCallback(eventType, callback);
			if (!touchElement.isListening(eventType))
			{
				touchElement.domNode.removeEventListener(_MAP[eventType], touchElement.eventHandler, touchElement.eventCaptures[eventType]);
			}
		}
	};
	
	/**
	 * Returns the given touch properties.
	 * 
	 * @function
	 * 
	 * @param {object} touch The touch object
	 * @returns The touch properties (x, y, target)
	 */
	wink.ux.touch.getTouchProperties = getTouchProperties;
	function getTouchProperties(touch)
	{
		var properties = {};
		properties.x = touch.pageX;
		properties.y = touch.pageY;
		properties.target = touch.target;
		return properties;
	};
	
	/**
	 * @param {HTMLElement} domNode The DOM node reference
	 */
	var _getTouchElementIndex = function(domNode) 
	{
		var i, l = _els.length;
		for (i = 0; i < l; i++) 
		{
			var touchElementI = _els[i];
			if (touchElementI.domNode == domNode) 
			{
				return i;
			}
		}
		return null;
	};
	
	/**
	 * @param {DOMEvent} e A DOM event
	 * @param {wink.ux.touch.Element} touchElement The associated touch element
	 */
	var _handleEvent = function(e, touchElement)
	{
		var eventType = _MAP_INV[e.type];
		var uxEvent = _createUxEvent(eventType, e);
		
		if (!touchElement.isListening(_SE) || touchElement.tracking == false) 
		{
			touchElement.tracked = true;
		} 
		else if (eventType == _SE)
		{
			touchElement.tracked = true;
		}
		if (touchElement.tracked == true)
		{
			if (eventType == _EE)
			{
				touchElement.tracked = false;
			}
			touchElement.notifyEvent(uxEvent);
		}
	};
	
	/**
	 * @param {string} type The event type that must maches with one of {"start", "move", "end", "gesturestart", "gesturemove", "gestureend" }
	 * @param {DOMEvent} e A DOM event
	 */
	var _createUxEvent = function(type, e)
	{
		var properties = {};
		
		properties.type 		= type;
		properties.srcEvent 	= e;
		properties.timestamp 	= e.timeStamp;
		properties.multitouch	= false;
		
		if (!properties.timestamp)
		{
			properties.timestamp = new Date().getTime();
		}
		
		if (wink.has("touch"))
		{
			if (type == _GS_SE 
			 || type == _GS_CE
			 || type == _GS_EE)
			{
				properties.target = e.target;
				properties.x = 0;
				properties.y = 0;
			}
			else
			{
				var lastTouch = null;
				if (type == _EE) 
				{
					if (e.changedTouches && e.changedTouches.length > 0) 
					{
						lastTouch = e.changedTouches[0];
					}
				}
				else 
				{
					if (e.targetTouches && e.targetTouches.length > 0) 
					{
						lastTouch = e.targetTouches[0];
					}
					else if (e.changedTouches && e.changedTouches.length > 0) 
					{
						lastTouch = e.changedTouches[0];
					}
				}
				if (lastTouch != null) 
				{
					var props = getTouchProperties(lastTouch);
					properties.x = props.x;
					properties.y = props.y;
					properties.target = props.target;
					if (e.touches && e.touches.length > 1)
					{
						properties.multitouch = true;
					}
				}
			}
		}
		else 
		{
			var props = getTouchProperties(e);
			properties.x = props.x;
			properties.y = props.y;
			properties.target = props.target;
		}
		
		return new wink.ux.Event(properties);
	};

	/**
	 * Implements an object encapsulating the concept of the DOM element receiving user events.
	 * An element is linked to one or more events and each event refers to one or more callbacks.
	 * 
	 * @class The touch Element component handled by the Touch object.
	 * It is an object encapsulating the concept of the DOM element receiving user events.
	 * An element is linked to one or more events and each event refers to one or more callbacks.
	 * 
	 * @param {object} properties The properties object
	 * @param {HTMLElement} properties.domNode The dom node associated to the touch element
	 * @param {boolean} properties.tracking Indicates whether the touch element is in tracking mode
	 * @param {boolean} properties.tracked Indicates whether the touch element is currently tracked
	 * 
	 */
	wink.ux.touch.Element = function(properties)
	{
		/**
		 * Unique identifier
		 * 
		 * @property uId
		 * @type integer
		 */
		this.uId				= wink.getUId();
		
		/**
		 * The dom node associated to the touch element
		 * 
		 * @property domNode
		 * @type HTMLElement
		 */
		this.domNode			= null;
		
		/**
		 * Indicates whether the touch element is in tracking mode
		 * 
		 * @property tracking
		 * @type boolean
		 */
		this.tracking			= false;
		
		/**
		 * Indicates whether the touch element is currently tracked
		 * 
		 * @property tracked
		 * @type boolean
		 */
		this.tracked			= false;
		
		this.eventHandler		= null;
		this.eventCaptures		= {};
		this._els				= {}; // events listened
		wink.mixin(this, properties);
		
		if (this._validateProperties() === false) return;
	};
	
	wink.ux.touch.Element.prototype = 
	{
		/**
		 * Adds a new callback associated to the given event type
		 * 
		 * @param {string} eventType The type of event
		 * @param {object} callback The callback to add : { context, method, arguments }
		 * @param {boolean} preventDefault Lets do a "preventDefault" automatically when receiving the event
		 * 
		 */
		addEventCallback: function(eventType, callback, preventDefault)
		{
			if (!wink.isCallback(callback))
			{
				
				return false;
			}
			
			var listenedEvent = this._els[eventType];
			
			if (!listenedEvent)
			{
				listenedEvent = 
				{
					preventDefault: preventDefault,
					callbacks: []
				};
				this._els[eventType] = listenedEvent;
			}
			else 
			{
				var callbacks = listenedEvent.callbacks;
				var j, l = callbacks.length;
				for (j = 0; j < l; j++)
				{
					var cj = callbacks[j];
					if (callback.context == cj.context && callback.method == cj.method) 
					{
						return false;
					}
				}
			}
			listenedEvent.callbacks.push(callback);
			return true;
		},
	
		/**
		 * Removes a callback associated to the given event type
		 * 
		 * @param {string} eventType The type of event
		 * @param {object} callback The callback to remove (identified by { context, method })
		 */
		removeEventCallback: function(eventType, callback)
		{
			if (!wink.isCallback(callback))
			{
				
				return false;
			}
			var listenedEvent = this._els[eventType];
			if (!listenedEvent)
			{
				return false;
			}
			var callbacks = listenedEvent.callbacks;
			
			var j, l = callbacks.length;
			for (j = 0; j < l; j++)
			{
				var cj = callbacks[j];
				if (callback.context == cj.context && callback.method == cj.method) 
				{
					listenedEvent.callbacks.splice(j, 1);
					break;
				}
			}
			return true;
		},
	
		/**
		 * Indicates whether the element should be notified of events that matches to the given one because at least one callback target exists
		 * 
		 * @param {string} eventType The type of event
		 */
		isListening: function(eventType) 
		{
			var listenedEvent = this._els[eventType];
			if (listenedEvent && listenedEvent.callbacks.length > 0)
			{
				return true;
			}
			return false;
		},
	
		/**
		 * Notifies the element so that it handles the given Wink Event
		 * 
		 * @param {wink.ux.Event} uxEvent The event to handle
		 */
		notifyEvent: function(uxEvent)
		{
			var listenedEvent = this._els[uxEvent.type];
			if (listenedEvent) {
				if (listenedEvent.preventDefault == true)
				{
					uxEvent.preventDefault();
				}
				
				var callbacks = listenedEvent.callbacks;
				for (var j = 0; j < callbacks.length; j++)
				{
					wink.call(callbacks[j], uxEvent);
				}
			}
		},
	
		/**
		 * Validate the properties of the component
		 * @returns {boolean} True if the properties are valid, false otherwise
		 */
		_validateProperties: function()
		{
return true;
}
	};

	return wink.ux.touch;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview XHR utility
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Jerome GIRAUD
 */

define(['../../../_base/_base/js/base', '../../../_base/error/js/error'], function(wink) 
{
	var isSet = wink.isSet;
	var isArray = wink.isArray;
	
	/**
	 * @class The Xhr component can be used to build XmlHttpRequests and send HTTP requests. It supports both GET and POST methods.
	 * The Xhr constructor can optionaly take properties that will be stored (to be used within the callback methods for instance). To send a request, use the 'sendData' method
	 * 
	 * @param {object} [properties] The parameters that will be stored within the request object and can be used in the callbacks methods
	 * 
	 * @example
	 * 
	 * var parameters = 
	 * [
	 * 	{name: 'parameter1', value: 'test1'},
	 * 	{name: 'parameter2', value: 'test2'}
	 * ]
	 * 
	 * xhr = new wink.Xhr();
	 * xhr.sendData('test_xhr.html', parameters, 'GET', {method: 'onsuccess'}, {method: 'onfailure'}, null);
	 * 
	 * onsuccess = function(result)
	 * {
	 * 	...
	 * }
	 * 
	 * onfailure = function(result)
	 * {
	 * 	...
	 * }
	 * 
	 * @see <a href="WINK_ROOT_URL/net/xhr/test/test_xhr.html" target="_blank">Test page</a>
	 */
	wink.net.Xhr = function(properties)
	{
		/**
		 * Unique identifier
		 * 
		 * @property
		 * @type integer
		 */
		this.uId = wink.getUId();
		
		/**
		 * An object containing the actual XHR object and the parameters set at the instantiation time
		 * 
		 * @property
		 * @type object
		 */
		this.request =
		{
		    xhrObject: null,
		    params: properties
		};
	
		this._create();
	};
	
	wink.net.Xhr.prototype =
	{
		/**
		 * Send the datas
		 * 
		 * @param {string} url The URL to call
		 * @param {array} [parameters] The parameters to add to the request URL
		 * @param {string} [method] Either GET or POST
		 * @param {object} [successCallback] The method to call in case of success. The 'callback' is an object that must contain a 'method' and a 'scope'
		 * @param {object} [failureCallback] The method to call in case of success. The 'callback' is an object that must contain a 'method' and a 'scope'
		 * @param {array} [headers] The HTTP headers to add to the request
		 * 
		 * @returns {boolean} Returns true if the request was send, false otherwise
		 */
		sendData: function(url, parameters, method, successCallback, failureCallback, headers)
		{
			var r = this.request, xo = r.xhrObject, enc = encodeURIComponent;
		
			method = method.toUpperCase();
			
			if ( isSet(parameters) && !isArray(parameters) )
			{
				
				return;
			}
		
			if (xo)
			{
				var p = null;
				
				if ( isSet(parameters) )
				{	
					var i, l = parameters.length;
					
					for (i=0; i<l; i++)
					{
						var parami = parameters[i];
						var name = parami.name;
						var value = parami.value;
						
						if ( method == 'GET' )
						{
							if ( i==0 && url.indexOf('?')==-1)	
							{
								url += '?' + enc(name) + '=' + enc(value);
							} else
							{
								url += '&' + enc(name) + '=' + enc(value);
							}
						} else
						{
							if ( i==0 )
							{
								p = enc(name) + '=' + enc(value);
							} else
							{
								p += '&' + enc(name) + '=' + enc(value);
							}
						}
					}
				}
				
				try
				{
					xo.open(method, url, true);
					xo.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
					
					if ( isSet(headers) )
	  				{
	  					if ( !isArray(headers) )
	  					{
	  						
	  					} else
	  					{
	  						var i, l = headers.length;
	  						for (i=0; i<l; i++)
	  						{
	  							var hi = headers[i];
	  							xo.setRequestHeader(hi.name, hi.value);
	  						}
	  					}
	  				}
					
					xo.send(p);
					
				} catch (e)
				{
					return false;
				}
					
				xo.onreadystatechange = function()
				{
					var readyState = xo.readyState;
					
					if (readyState != 4)
					{
						return
					}
					
					var status = xo.status;
					
					if (!((status >= 200 && status < 400) || status == 0))
					{
						if ( isSet(failureCallback) )
						{
							wink.call(failureCallback, r);
						}
					} else
					{
						if ( isSet(successCallback) )
						{
							wink.call(successCallback, r);
						}
					}
				};
			} else
			{
				return false;
			}
		
			return true;
		},
	
		/**
		 * Instantiate a new XMLHttpRequest
		 */
		_create: function()
		{
			var xhrInterface = window.XMLHttpRequest;
			if (xhrInterface)
			{
				var xo;
				try
				{
					xo = new xhrInterface();
				} catch (e)
				{
					xo = false;
				}
				this.request.xhrObject = xo;
			} else
			{
				
			}
		}
	};
	
	/**
	 * @class
	 * @see wink.net.Xhr
	 */
	wink.Xhr = wink.net.Xhr;
	
	return wink.Xhr;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Implement a semitransparent layer 
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5 
 * @author Jerome GIRAUD
 */

define(['../../../../_base/_base/js/base', '../../../../fx/_xy/js/2dfx'], function(wink) 
{
	var applyStyle = wink.fx.apply;
	var _container = null;
	var _sublayer = null;
	var _added = false;
	
	/**
	 * @namespace Implement a semi-transparent layer.<br>
	 * The layer is a literal so it doesn't need to be instantiated.<br>
	 * Use the 'show' and 'hide' method to display the layer or hide it.<br>
	 * The layer object is part of the core so you can either use 'wink.ui.xy.layer.show()' or directly 'wink.layer.show()'.<br>
	 * The layer object is part of the core so you can either use 'wink.ui.xy.layer.hide()' or directly 'wink.layer.hide()'.<br>
	 * You can see if the layer is displayed by checking its 'visible' attribute.<br>
	 * You can also define an 'onclick' method to the layer that will be called if the user clicks on the layer (see the test page for more details).
	 * 
	 * @example
	 * 
	 * wink.layer.show();
	 * 
	 * wink.layer.hide();
	 * 
	 * @see <a href="WINK_ROOT_URL/ui/xy/layer/test/test_layer.html" target="_blank">Test page</a>
	 */
	wink.ui.xy.layer =
	{
		/**
		 * True if the layer is displayed, false otherwise
		 * 
		 * @property visible
		 * @type boolean
		 */
		visible: false,
		/**
		 * The hexa code of the layer color
		 * 
		 * @property color
		 * @type string
		 * @default #000
		 */
		color: '#000',
		/**
		 * Opacity level of the layer
		 * 
		 * @property opacity
		 * @type number
		 * @default 0.3
		 */
		opacity: 0.3,
		/**
		 * The hierarchical level of the layer
		 * 
		 * @property zIndex
		 * @type integer
		 * @default 998
		 */
		zIndex: 998,
		
		/**
		 * Display the layer
		 */
		show: function()
		{
			if (!_added) 
			{
				this._initDom();
			}
			
			_container.onclick = function()
			{
				var onclick = wink.ui.xy.layer.onclick;
				if ( wink.isSet(onclick) )
				{
					onclick();
				}
			};
			
			if (!this.visible)
			{
				applyStyle(_sublayer, {
					height: document.body.scrollHeight + 'px'
				});
				applyStyle(_container, {
					display: 'block'
				});
				this.visible = true;
			}
		},
		
		/**
		 * Hide the layer
		 */
		hide: function()
		{
			if (_added && this.visible) 
			{
				applyStyle(_container, {
					display: 'none'
				});
				this.visible = false;
			}
		},
		
		/**
		 * Update the display. Should be called in case of a change of height in the page for instance
		 */
		refresh: function()
		{
			if (_added && this.visible) {
				applyStyle(_sublayer, {
					height: document.body.scrollHeight + 'px'
				});
			}
		},
		
		/**
		 * Update the color, opacity and zIndex of the layer. Use this method if you want to change the opacity or color or zIndex after you called the 'show' method.
		 */
		update: function()
		{
			if (!_added) 
			{
				this._initDom();
			}
	
			applyStyle(_container, {
				"z-index": this.zIndex
			});
			applyStyle(_sublayer, {
				backgroundColor: this.color,
				opacity: this.opacity
			});
		},
		
		/**
		 * Create the layer
		 */
		_initDom: function()
		{
			var doc = document;
			_container = doc.createElement('div');
			applyStyle(_container, {
				position: 'absolute',
				display: 'none',
				top: 0,
				width: '100%',
				"z-index": this.zIndex,
				"tap-highlight-color": 'rgba(0, 0, 0, 0)'
			});
	
			_sublayer = doc.createElement('div');
			applyStyle(_sublayer, {
				width: '100%',
				backgroundColor: this.color,
				opacity: this.opacity
			});
	
			_container.appendChild(_sublayer);
			doc.body.appendChild(_container);
			
			_added = true;
		}
	};
	
	/**
	 * @class
	 * @see wink.ui.xy.layer
	 */
	wink.layer = wink.ui.xy.layer;

	return wink.layer;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview JSON stringification - a wink.json extension.
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Mathieu HELIOT
 */
define(['../../../_base/_base/js/base', './json'], function(wink)
{
	var _stack = new Array();
	
	/**
	 * Returns the JSON representation of a given value
	 * 
	 * <pre>
	 * Value can be an JS object or an array
	 * 
	 * Values as "undefined" and functions don't have string representation :
	 * 
	 *	- in arrays these values are represented as the null,
	 *	- in objects these values causes the property to be excluded from stringification.
	 * 
	 * Named properties are excluded from the stringification.
	 * 
	 * See also ECMAScript 5 specifications for more informations about the JSON structure. 
	 * </pre>
	 * 
	 * @param {object} value The object or array to transform
	 * 
	 * @returns {string} The stringified value of the object
	 * 
	 */
	wink.json.stringify = function(value)
	{
		var str;
		
		if ( value )
		{				
			if ( wink.isSet(window.JSON) && wink.isSet(window.JSON.stringify) )
			{
				str = window.JSON.stringify(value);
			} else
			{
				str = _str(value);
			}
		}
		
		return str;
	};	
	
	/**
	 * Transform an object to a validate JSON structure
	 * 
	 * according to ECMAScript 5 specifications.
	 * Returns 'undefined' for 'undefined' and function values
	 * 
	 * @param {object} value The value to transform
	 * 
	 * @returns {string} The stringified value
	 */
	var _str = function(value)
	{
		var str;
		var indent = '';
		var wrapper = new Object();
		
		if ( value && wink.isSet(value.toJSON) )
		{
			str = value.toJSON();
			
			if ( wink.isString(str) )
				str = _quote(str);
		} else
		{			
			if ( wink.isString(value) )
				str = _quote(value);
			
			else if ( wink.isNumber(value) )
				str = ( isFinite(value) ) ? value : 'null'; 
			
			else if ( wink.isNull(value) )
				str = 'null';

			else if ( wink.isBoolean(value) )
				str = ( value ) ? 'true' : 'false';
							
			else if ( !wink.isUndefined(value) && typeof(value) != 'function' )
				str = ( wink.isArray(value) ) ? _JA(value) : _JO(value);
		}
		
		return str;
	};
	
	/**
	 * Wraps a String value in double quotes and escapes characters within it.
	 * 
	 * @param {string} str The string to process
	 * 
	 * @returns {string} The escaped and quoted string
	 */
	var _quote = function(str)
	{		
		function _char(c)
		{
			var chars = {
		        '\b': '\\b',
		        '\t': '\\t',
		        '\n': '\\n',
		        '\f': '\\f',
		        '\r': '\\r',
		        '"' : '\\"',
		        '\\': '\\\\'
		    };
			
		    if ( !chars[c] )
		    	chars[c] =  '\\u'+('0000'+(+(c.charCodeAt(0))).toString(16)).slice(-4);
		    
		    return chars[c];
		}
		
		var product = '"',
			txt = str,			
			specialChars = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
		
		str = txt.replace(specialChars, _char);
		str = product + str + product;
		
		return str;
	};
	
	/**
	 * Serializes an object.
	 * 
	 * @param {object} object The object to serialize
	 * 
	 * @returns {string} The serialized object
	 */	
	var _JO = function(object)
	{
		var propertyList = new Array(),
			partial = new Array();
		
		for ( var i=0 ; i<_stack.length ; i++ )	
	    {
			if ( _stack[i] == object )
			{
				
				return undefined;
			}
	    }
		
		_stack.push(object);
		
		for ( var attr in object )
			propertyList.push(attr);
		
		var strP,
			member,
			separator = ',',
			colon = ':';
		
		for ( var i=0 ; i<propertyList.length ; i++ )	
		{
			strP = _str(object[propertyList[i]]);

			if ( !wink.isUndefined(strP) )
			{
				member = _quote(propertyList[i]) + colon + strP;
				partial.push(member);
			}
		}
		
		if ( partial.length == 0 )
			str = '{}';
		
		else
		{
			var properties = '';
			
			for ( var i=0 ; i<partial.length ; i++ )
				properties += partial[i] + separator;
			
			properties = properties.slice(0,-1);
			str = '{' + properties + '}'; 
		}
		
		_stack.pop();
		
		return str;
	};
	
	/**
	 * Serializes an array.
	 * 
	 * @param {array} array The array to serialize
	 * 
	 * @returns {string} The serialized array
	 */
	var _JA = function(array)
	{
		var partial = new Array(),
			separator = ',',
			str;
		
		for ( var i=0 ; i<_stack.length ; i++ )	
	    {
			if ( _stack[i] == array )
			{
				
				return undefined;
			}
	    }
		
		_stack.push(array);
			
		var strP;
		
		for ( var i=0 ; i<array.length ; i++ )	
		{
			strP = _str(array[i]);
			
			partial.push( ( wink.isUndefined(strP) ) ? 'null' : strP );
		}
		
		if ( partial.length == 0 )
			str = '[]';
		
		else
		{
			var properties = '';
			
			for ( var i=0 ; i<partial.length ; i++ )
				properties += partial[i] + separator;
			
			properties = properties.slice(0,-1);
			str = '[' + properties + ']'; 
		}
		
		_stack.pop();
		
		return str;
	};
	
	return wink.json;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview The 3d fx object is an extension of wink.fx (2d fx) that allows more advanced transformations (e.g.: simple or composed 3d transformations).
 * Because a change of scale followed by a translation does not give the same result if you reverse the two transformations, 
 * the main role is to simplify the implementation of composed transformations, it is made by using a user-defined order.
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 3.0, Android 3.1, BlackBerry 7
 * @author Sylvain LALANDE
 */

define(['../../../_amd/core', '../../../math/_matrix/js/matrix'], function(wink)
{
	var _nodeTransforms = [];
	
	/**
	 * Apply to the given node a 3dfx transformation
	 * 
	 * @param {HTMLElement} node The node that hosts the transformation
	 * @param {object} transformation The 3dfx transformation
	 * @param {boolean} keepCurrent True if the previous node transformation must be kept
	 * 
	 * @example
	 * 
	 * //A 3d fx transformation is defined as : 
	 * 
	 * transformation: 
	 * {
	 *    type: value in { "translate", "scale", "rotate" }
	 *    x: x transformation component
	 *    y: y transformation component
	 *    z: z transformation component
	 *    [angle: rotation angle ]
	 * }
	 * 
	 * @requires wink.math (matrix)
	 */
	wink.fx.set3dTransform = function(node, transformation, keepCurrent)
	{
		if (!_is3dfxTransformation(transformation))
		{
			
			return false;
		}
		var cssTransform;
		if (keepCurrent === true)
		{
			cssTransform = wink.fx.getTransform(node);
		}
		var referenceMatrix = wink.math.createTransformMatrix(cssTransform);
		var matrixTransform = _getTransformMatrix(transformation);
		referenceMatrix.multiply(matrixTransform);
		
		wink.fx.setTransform(node, referenceMatrix.toString());
	};
	/**
	 * Initialize a composed transformation to the given node
	 * 
	 * @param {HTMLElement} node The node that hosts the composed transformation
	 * @param {boolean} keepCurrent True if the previous node transformation must be kept
	 * 
	 * @requires wink.math (matrix)
	 */
	wink.fx.initComposedTransform = function(node, keepCurrent)
	{
		var cssTransform;
		if (keepCurrent === true)
		{
			cssTransform = wink.fx.getTransform(node);
		}
		var referenceMatrix = wink.math.createTransformMatrix(cssTransform);
		wink.fx.removeComposedTransform(node); // to ensure unicity
		_nodeTransforms.push({ node: node, transforms: [ referenceMatrix ] });
	};
	/**
	 * Set a composed transformation part at the given index
	 * 
	 * @param {HTMLElement} node The node that hosts the composed transformation
	 * @param {integer} index The index of the given transformation part
	 * @param {object} transformation The 3dfx transformation
	 * 
	 * @example
	 * 
	 * //A 3d fx transformation is defined as : 
	 * 
	 * transformation: 
	 * {
	 *    type: value in { "translate", "scale", "rotate" }
	 *    x: x transformation component
	 *    y: y transformation component
	 *    z: z transformation component
	 *    [angle: rotation angle ]
	 * }
	 * 
	 * var node = $("nodeId");
	 * wink.fx.initComposedTransform(node);
	 * wink.fx.setTransformPart(node, 1, { type: "scale", x: 1.2, y: 1.2, z: 1 });
	 * wink.fx.setTransformPart(node, 2, { type: "translate", x: 50, y: 50, z: 0 });
	 * wink.fx.applyComposedTransform(node);
	 * 
	 * @requires wink.math (matrix)
	 */
	wink.fx.setTransformPart = function(node, index, transformation)
	{
		if (!_is3dfxTransformation(transformation))
		{
			
			return false;
		}
		if (index < 1 || index > 10)
		{
			
			return false;
		}
		var i, list = _nodeTransforms, l = list.length;
		for (i = 0; i < l; i++)
		{
			var item = list[i];
			if (item.node == node)
			{
				var toSet = null;
				if (wink.isSet(transformation))
				{
					toSet = _getTransformMatrix(transformation);
				}
				item.transforms[index] = toSet;
				break;
			}
		}
	};
	/**
	 * Apply a composed transformation to the node
	 * 
	 * @param {HTMLElement} node The node that hosts the composed transformation
	 * @param {boolean} store Indicates if transformation parts must be stored in only one
	 */
	wink.fx.applyComposedTransform = function(node, store)
	{
		var i, list = _nodeTransforms, l = list.length;
		for (i = 0; i < l; i++)
		{
			var item = list[i];
			if (item.node == node)
			{
				var transforms = item.transforms;
				
				var finalMatrix = transforms[0].clone();
				var j, jl = transforms.length;
				for (j = 1; j < jl; j++)
				{
					var tr = transforms[j];
					if (wink.isSet(tr))
					{
						finalMatrix.multiply(tr);
					}
				}
				
				if (store === true)
				{
					item.transforms = [ finalMatrix ];
				}
				wink.fx.setTransform(node, finalMatrix.toString());
				break;
			}
		}
	};
	/**
	 * Store all the composed transformation parts in one to enhance performance
	 * 
	 * @param {HTMLElement} node The node that hosts the composed transformation
	 */
	wink.fx.storeComposedTransform = function(node)
	{
		wink.fx.applyComposedTransform(node, true);
	};
	/**
	 * Close the composed transformation associated to the given node
	 * 
	 * @param {HTMLElement} node The node that hosts the composed transformation
	 */
	wink.fx.removeComposedTransform = function(node)
	{
		var i, list = _nodeTransforms, l = list.length;
		for (i = 0; i < l; i++)
		{
			if (list[i].node == node)
			{
				list.splice(i, 1);
				break;
			}
		}
	};
	/**
	 * Check the validity of the given 3dfx transformation
	 * 
	 * @param {object} transformation The transformation to check
	 * 
	 * @example
	 * 
	 * //A 3d fx transformation is defined as : 
	 * 
	 * transformation: 
	 * {
	 *    type: value in { "translate", "scale", "rotate" }
	 *    x: x transformation component
	 *    y: y transformation component
	 *    z: z transformation component
	 *    [angle: rotation angle ]
	 * }
	 * 
	 */
	var _is3dfxTransformation = function(transformation)
	{
		var validTransformation = true;
		var isSet = wink.isSet;
		
		if (isSet(transformation))
		{
			var knownTypes = [ "translate", "scale", "rotate" ];
			validTransformation = validTransformation && isSet(transformation.type);
			validTransformation = validTransformation && (knownTypes.indexOf(transformation.type) != -1);
			validTransformation = validTransformation && isSet(transformation.x);
			validTransformation = validTransformation && isSet(transformation.y);
			validTransformation = validTransformation && isSet(transformation.z);
			if (validTransformation && transformation.type == "rotate")
			{
				validTransformation = validTransformation && isSet(transformation.angle);
			}
		}
		return validTransformation;
	};
	/**
	 * Returns the associated matrix of the given 3dfx transformation
	 * 
	 * @param {object} transformation The 3dfx transformation
	 * 
	 * @example
	 * 
	 * //A 3d fx transformation is defined as : 
	 * 
	 * transformation: 
	 * {
	 *    type: value in { "translate", "scale", "rotate" }
	 *    x: x transformation component
	 *    y: y transformation component
	 *    z: z transformation component
	 *    [angle: rotation angle ]
	 * }
	 * 
	 * @requires wink.math (matrix)
	 */
	var _getTransformMatrix = function(transformation)
	{
		var matrix = wink.math.createTransformMatrix();
		
		switch (transformation.type)
		{
			case "translate":
				matrix.translate(transformation.x, transformation.y, transformation.z);
				break;
			case "scale":
				matrix.scale(transformation.x, transformation.y, transformation.z);
				break;
			case "rotate":
				matrix.rotateAxisAngle(transformation.x, transformation.y, transformation.z, transformation.angle);
				break;
		}
		return matrix;
	};
	
	return wink.fx;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Implement a windows container
 * Create a windows container container with which you can navigate through pages
 *
 * @compatibility Iphone OS3, Iphone OS4, Android 3.0, Android 3.1, BlackBerry 7
 * 
 * @author Jerome GIRAUD
 */

/**
 * Fired when a slide starts
 * 
 * @name wink.ui.layout.Windows#/windows/events/slidestart
 * @event
 * @param {object} param The parameters object
 * @param {string} param.id The id of the front page
 */

/**
 * Fired when a slide ends
 * 
 * @name wink.ui.layout.Windows#/windows/events/slideend
 * @event
 * @param {object} param The parameters object
 * @param {string} param.id The id of the front page
 */
define(['../../../../_amd/core', '../../../../math/_geometric/js/geometric', '../../../../fx/_xyz/js/3dfx', '../../../../fx/_animation/js/animation'], function(wink)
{
	/**
	 * @class Implement a windows container<br>
	 * Create a windows container container with which you can navigate through pages<br>
	 * To instantiate a windows container, the pages (dom nodes) MUST already be present in the page and each one MUST be defined by a unique id. Use the 'getDomNode' method to add the windows container into the page
	 * 
	 * @param {object} properties The properties object
	 * @param {array} properties.pages An array containing the ids of the pages to add into the windows container. The pages dom nodes MUST be present in the page at instantiation time
	 * @param {integer} [properties.duration=800] The slide duration in milliseconds
	 * 
	 * @requires wink.math._geometric
	 * @requires wink.math._matrix
	 * @requires wink.fx._xyz
	 * @requires wink.fx.animation
	 * 
	 * @example
	 * 
	 * var properties = 
	 * {
	 * 	'duration': 800,
	 * 	'pages': ['page1', 'page2', 'page3', 'page4']
	 * }
	 * windows = new wink.ui.layout.Windows(properties);
	 * document.body.appendChild(windows.getDomNode());
	 * 
	 * @see <a href="WINK_ROOT_URL/ui/layout/windows/test/test_windows.html" target="_blank">Test page</a>
	 * 
	 */
	wink.ui.layout.Windows = function(properties)
	{
		/**
		 * Unique identifier
		 * 
		 * @property uId
		 * @type integer
		 */
		this.uId                    = wink.getUId();
		
		/**
		 * The list of pages ids of the windows container
		 * 
		 * @property pages
		 * @type array
		 */
		this.pages					= null;
		
		/**
		 * The slide duration
		 * 
		 * @property duration
		 * @type integer
		 */
		this.duration	            = 800;
		
		this._domNode				= null;
		
		this._pagesList				= [];
		this._firstPage				= null;
		
		wink.mixin(this, properties);
		
		if (this._validateProperties() === false) return;
			
		this._initDom();
		this._initProperties();
	};
	
	wink.ui.layout.Windows.prototype =
	{
		/**
		 * @returns {HTMLElement} The DOM node containing the window container
		 */
		getDomNode: function()
		{
			return this._domNode;
		},
		
		/**
		 * Move to the selected page
		 * 
		 * @param {string} id The id of the page to display
		 */
		slideTo: function(id)
		{	
			var fp = this._firstPage,
				cp = this._getPageById(id);
	
			if (cp == null || cp == fp )
			{
				return;
			}
			
			var animGroup = new wink.fx.animation.AnimationGroup();
			
			var anim1 = new wink.fx.animation.Animation();
			var anim2 = new wink.fx.animation.Animation();
			
			var offwidth = document.documentElement.offsetWidth,
				x = -40*fp.position,
				y = -x,
				a = -20,
				z = -50+(fp.position * 15),
				z2 = -50+(cp.position * 15);
			
			var transformations11 = 
			[
				{ type: "translate", x: offwidth + 100, y: 0, z: z },
				{ type: "rotate", x: 0, y: 1, z: 0, angle: a }
			];
			
			var transformations12 = 
			[
				{ type: "translate", x: x, y: y, z: z },
				{ type: "rotate", x: 0, y: 1, z: 0, angle: a }
			];
			
			var transformations21 = 
			[
				{ type: "translate", x: -offwidth - 100, y: 40*cp.position, z: z2 },
				{ type: "rotate", x: 0, y: 1, z: 0, angle: a }
			];
			
			var transformations22 = 
			[
				{ type: "translate", x: 0, y: 0, z: 1 },
				{ type: "rotate", x: 0, y: 1, z: 0, angle: 0 }
			];
			
			anim1.addStep({
				property: 'transform',
				value: { context: this, method: '_transform', arguments: [ transformations11 ] },
				duration: this.duration,
				delay: 0,
				func: 'default'
			});
			
			anim1.addStep({
				property: 'transform',
				value: { context: this, method: '_transform', arguments: [ transformations12 ] },
				duration: this.duration,
				delay: 0,
				func: 'default'
			});
			
			anim2.addStep({
				property: 'transform',
				value: { context: this, method: '_transform', arguments: [ transformations21 ] },
				duration: this.duration,
				delay: 0,
				func: 'default'
			});
			
			anim2.addStep({
				property: 'transform',
				value: { context: this, method: '_transform', arguments: [ transformations22 ] },
				duration: this.duration,
				delay: 0,
				func: 'default'
			});
			
			animGroup.addAnimation(fp.getDomNode(), anim1);
			animGroup.addAnimation(cp.getDomNode(), anim2);
			
			animGroup.start(
			{
				onEnd:
				{ 
					context: this, 
					method: '_slideEnd'
				} 
			});
			
			this._firstPage = cp;
			
			wink.publish('/windows/events/slidestart', { 'id': cp.id });
		},
		
		/**
		 * Apply transforms to a node
		 * 
		 * @param {object} params Parameters
		 * @param {HTMLElement} params.node The node to transform
		 * @param {array} transformations The details of the transformations
		 */
		_transform: function(params, transformations) 
		{
			var node = params.node;
			
			wink.fx.initComposedTransform(node);
			
			for (var i = 0; i < transformations.length; i++) 
			{
				wink.fx.setTransformPart(node, (i + 1), transformations[i]);
			}
			
			wink.fx.applyComposedTransform(node);
		},
		
		/**
		 * Publish the slide end event
		 */
		_slideEnd: function()
		{
			wink.publish('/windows/events/slideend', { 'id': this._firstPage.id });
		},
		
		/**
		 * Get a page
		 * 
		 * @param {string} id The id of the page to return
		 * @returns {wink.ui.layout.Windows.Page} The page
		 */
		_getPageById: function(id)
		{
			var i, pl = this._pagesList, l = pl.length;
			for (i = 0; i < l; i++)
			{
				var page = pl[i];
				
				if (page.id == id)
				{
					return page;
				}
			}
			return null;
		},
		
		/**
		 * Validate the properties of the component
		 * @returns {boolean} True if the properties are valid, false otherwise
		 */
		_validateProperties: function()
		{
return true;
},
		
		/**
		 * Initialize the properties
		 */
		_initProperties: function()
		{
			var i, pgs = this.pages, l = pgs.length;
			
			for (i = 0; i < l; i++)
			{
				if (i == 0)
				{
					var page = new wink.ui.layout.Windows.Page({ 'node': $(pgs[i]), 'position': l-1-i, 'front': true });
					this._firstPage = page;
				} else
				{
					var page = new wink.ui.layout.Windows.Page({ 'node': $(pgs[i]), 'position': l-1-i});
				}
				
				var pn = page.getDomNode();
				
				pn.parentNode.removeChild(pn);
				
				this._domNode.appendChild(pn);
				this._pagesList.push(page);
			}
		},
		
		/**
		 * Initialize the windows container node
		 */
		_initDom: function()
		{
			this._domNode = document.createElement('div');
			
			wink.addClass(this._domNode, 'wi_container');
			
			wink.fx.apply(this._domNode, {'perspective': '1000', 'transform-style': 'preserve-3d'});
		}
	};
	
	
	/**
	 * @class Implement a page to be added to the windows
	 * Create a page. Pages should only be instantiated by the windows object
	 * 
	 * @param {object} properties The properties object
	 * @param {HTMLElement} properties.node The DOM node corresponding to the page
	 * @param {integer} properties.position The position of the page in the list of pages
	 */
	wink.ui.layout.Windows.Page = function(properties)
	{
		/**
		 * Unique identifier
		 * 
		 * @property uId
		 * @type integer
		 */
		this.uId			= wink.getUId();
		
		/**
		 * The dom node id of the page
		 * 
		 * @property id
		 * @type string
		 */
		this.id				= null;
		
		/**
		 * The dom node
		 * 
		 * @property node
		 * @type HTMLElement
		 */
		this.node           = null;
		
		/**
		 * The position of the page in the list of pages
		 * 
		 * @property position
		 * @type integer
		 */
		this.position		= 0;
		
		wink.mixin(this, properties);
		
		this._initProperties();
		this._initDom();
	};
	
	wink.ui.layout.Windows.Page.prototype =
	{	
		/**
		 * @returns {HTMLElement} The DOM node containing the Page
		 */
		getDomNode: function()
		{
			return this.node;
		},
		
		/**
		 * Initialize the Page node
		 */
		_initDom: function()
		{
			wink.addClass(this.node, 'wi_page');
			
			wink.fx.apply(this.node, {'transform-origin': '300% 100%'});
			
			var x = -40*this.position,
				y = -x,
				z = -50+(this.position * 15),
				n = this.node;
			
			wink.fx.initComposedTransform(n);
			if ( !this.front )
			{
				wink.fx.setTransformPart(n, 1, { type: "translate", x: x, y: y, z: z });
				wink.fx.setTransformPart(n, 2, { type: "rotate", x: 0, y: 1, z: 0, angle: -20 });
			}
			else
			{
				wink.fx.setTransformPart(n, 1, { type: "translate", x: 0, y: 0, z: 1 });
			}
			wink.fx.applyComposedTransform(n);
		},
		
		/**
		 * Initialize the properties
		 */
		_initProperties: function()
		{
			this.id = this.node.id;
		}
	};
	
	return wink.ui.layout.Windows;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview The Inertia component provides, through collaboration with a Movement Tracker, 
 * datas calculated from the inertia of a movement.
 *
 * @author Sylvain LALANDE
 *
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0
 * 
 */

/**
 * inertia is computed
 * 
 * @name wink.ux.Inertia#/inertia/events/inertiacomputed
 * @event
 * @param {object} param The parameters object
 * @param {wink.ux.Inertia} param.publisher Identifies the Inertia component itself in order, for the caller, to check whether the event relates to it
 * @param {object} param.movement The original movement supplemented by inertia datas
 * @param {wink.ux.Event} param.uxEvent The original end event of the movement
 * @param {HTMLElement} param.target The target of the movement
 */

define(['../../../_amd/core', '../../movementtracker/js/movementtracker'], function(wink)
{
	/**
	 * @class The Inertia component provides, through collaboration with a Movement Tracker, datas calculated from the inertia of a movement.
	 * The user needs to create and pass a movement tracker object to the Inertia, and to listen the end of calculations.
	 * 
	 * @requires wink.ux.MovementTracker
	 * 
	 * @param {object} properties The properties object
	 * @param {wink.ux.MovementTracker} properties.movementtracker The movement tracker that provides datas to interpret
	 * 
	 * @example
	 * 
	 * var node = $("nodeId");
	 * var movementtracker = new wink.ux.MovementTracker({ target: node });
	 * var inertia = new wink.ux.Inertia({ movementtracker: movementtracker });
	 * wink.subscribe('/inertia/events/inertiacomputed', { context: window, method: 'displaySpeed' });
	 * 
	 * @see <a href="WINK_ROOT_URL/ux/inertia/test/test_inertia.html" target="_blank">Test page</a>
	 */
	wink.ux.Inertia = function(properties) 
	{
		/**
		 * Unique identifier
		 * 
		 * @property uId
		 * @type integer
		 */
		this.uId				= wink.getUId();
		
		this._properties 		= properties;
		
		this._movementtracker 	= null;
		
		if (this._validateProperties() === false) return;
		
		this._initProperties();	
		this._initListeners();
	};
	
	wink.ux.Inertia.prototype = {
		_DIRECTION_X: "x",
		_DIRECTION_Y: "y",
		_INTERRUPTION_THRESHOLD: 150,
		_EVENT_INERTIA_COMPUTED: '/inertia/events/inertiacomputed',
		
		/**
		 * Destroys the component
		 */
		destroy: function()
		{
			this._removeListeners();
		},
		/**
		 * Validate the properties of the component
		 * @returns {boolean} True if the properties are valid, false otherwise
		 */
		_validateProperties : function()
		{
return true;
},
		/**
		 * Initialize datas with given properties
		 */
		_initProperties : function()
		{
			this._movementtracker = this._properties.movementtracker;
			delete this._properties;
		},
		/**
		 * Initialize listeners
		 */
		_initListeners : function()
		{
			wink.subscribe('/movementtracker/events/mvtstored', { context: this, method: '_computeInertia' });
		},
		/**
		 * Removes listeners
		 */
		_removeListeners: function()
		{
			wink.unsubscribe('/movementtracker/events/mvtstored', { context: this, method: '_computeInertia' });
		},
		/**
		 * Compute inertia datas which are based on an interpretation of the given raw movement.
		 * 
		 * @param {object} publishedInfos see wink.ux.MovementTracker Events
		 * @see wink.ux.MovementTracker
		 */
		_computeInertia: function(publishedInfos) 
		{
			var publisher = publishedInfos.publisher;
			if (publisher.uId != this._movementtracker.uId) {
				return;
			}
			var rawMovement = publishedInfos.movement;
			
			var movement = {
				pointStatement: rawMovement.pointStatement
			};
				
			var significantMovementX = this._getSignificantMovement(rawMovement, this._DIRECTION_X);
			var significantMovementY = this._getSignificantMovement(rawMovement, this._DIRECTION_Y);
				
			var firstPointX = significantMovementX.pointStatement[0];
			var firstPointY = significantMovementY.pointStatement[0];
			var lastPointX = significantMovementX.pointStatement[significantMovementX.pointStatement.length - 1];
			var lastPointY = significantMovementY.pointStatement[significantMovementY.pointStatement.length - 1];
				
			movement.dx = Math.abs(lastPointX.x - firstPointX.x);
			movement.dy = Math.abs(lastPointY.y - firstPointY.y);
			movement.dtx = lastPointX.globalDuration - firstPointX.globalDuration;
			if (movement.dtx == 0) {
				movement.dtx = 1;
			}
			movement.dty = lastPointY.globalDuration - firstPointY.globalDuration;
			if (movement.dty == 0) {
				movement.dty = 1;
			}
			movement.directionX = significantMovementX.direction;
			movement.directionY = significantMovementY.direction;
			
			movement.speedX = movement.dx / movement.dtx;
			movement.speedY = movement.dy / movement.dty;
			
			wink.publish(this._EVENT_INERTIA_COMPUTED, {
				publisher: this,
				movement: movement,
				uxEvent: publishedInfos.uxEvent,
				target: publishedInfos.target
			});
		},
		/**
		 * Retrieve a significant partial movement with the given raw movement
		 * 
		 * @param {object} rawMovement The input movement
		 * @param {string} direction The direction filter
		 * 
		 * @returns {object} last Interrupted Movement
		 */
		_getSignificantMovement: function(rawMovement, direction) 
		{
			var directedMovements = this._extractDirectedMovement(rawMovement, direction);
			var lastDirectedMovement = directedMovements[directedMovements.length - 1];
				
			var interruptedMovements = this._extractInterruptedMovement(lastDirectedMovement);
			var lastInterruptedMovement = interruptedMovements[interruptedMovements.length - 1];
				
			return lastInterruptedMovement;
		},
		/**
		 * Retrieve all directed partial movements with the given movement
		 * 
		 * @param {object} movement The input movement
		 * @param {string} direction The direction filter
		 * 
		 * @returns {array} directed Movements
		 */
		_extractDirectedMovement: function(movement, direction) 
		{
			var directedMovements = [];
				
			var pts = movement.pointStatement;
			var begin = 0;
			var localDirection = pts[0].directionX;
			if (direction == this._DIRECTION_Y) {
				localDirection = pts[0].directionY;
			}
				
			for (var i = 0; i < pts.length; i++) {
				var pI = pts[i];
					
				var pointDirection = pI.directionX;
				if (direction == this._DIRECTION_Y) {
					pointDirection = pI.directionY;
				}
				var directionChanged = (localDirection != pointDirection);
				
				if (directionChanged || (i == (pts.length - 1))) {
					var end = i;
					if (i == (pts.length - 1)) {
						end = pts.length;
					}
					
					var localPts = pts.slice(begin, end);
					var movementI = {
						pointStatement: localPts,
						direction: localDirection
					};
					directedMovements.push(movementI);
					begin = i;
					localDirection = pointDirection;
				}
			}
			return directedMovements;
		},
		/**
		 * Retrieve all interrupted partial movements with the given movement
		 * 
		 * @param {object} movement The input movement
		 * 
		 * @returns {array} interrupted Movements
		 */
		_extractInterruptedMovement: function(movement) 
		{
			var interruptedMovements = [];
				
			var pts = movement.pointStatement;
			var begin = 0;
			var duration = 0;
				
			for (var i = 0; i < pts.length; i++) {
				var pI = pts[i];
				duration += pI.duration;
					
				var end = i;
					
				if ((duration > this._INTERRUPTION_THRESHOLD) || (i == (pts.length - 1))) {
					if ((i == (pts.length - 1)) && (duration <= this._INTERRUPTION_THRESHOLD)) {
						end = pts.length;
					}
					duration = 0;
					
					var localPts = pts.slice(begin, end);
					var movementI = {
						pointStatement: localPts,
						direction: movement.direction
					};
					interruptedMovements.push(movementI);
					begin = i;
						
					if ((i == (pts.length - 1)) && (duration > this._INTERRUPTION_THRESHOLD)) {
						var localPts = pts.slice(end, end + 1);
						
						var movementI = {
							pointStatement: localPts,
							direction: movement.direction
						};
						interruptedMovements.push(movementI);
					}
				}
			}
			return interruptedMovements;
		}		
	};
	
	return wink.ux.Inertia;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Implements a Movement Tracker. The Movement Tracker follows the touch movement performed on a node.
 * It listens to touch events and elaborates a movement which consists of points statements sequence. 
 * Each point statement includes these informations : a position, a direction, a distance and a duration.
 * 
 * @author Sylvain LALANDE
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0
 * 
 */

/**
 * The movement begins
 * 
 * @name wink.ux.MovementTracker#/movementtracker/events/mvtbegin
 * @event
 * @param {object} param The parameters object
 * @param {wink.ux.MovementTracker} param.publisher Identifies the movement tracker itself in order, for the caller, to check whether the event relates to it
 * @param {object} param.movement A Movement object
 * @param {array} param.movement.pointStatement an array of "points" : a point is an object which is composed as { x, y, timestamp, duration, globalDuration, dx, dy, globalDx, globalDy, directionX, directionY }
 * @param {integer} param.movement.duration duration is the duration of the movement
 * @param {integer} param.movement.dx dx is the distance on x-axis
 * @param {integer} param.movement.dy dy is the distance on x-axis
 * @param {wink.ux.Event} param.uxEvent The Wink Event that is the cause of the event
 * @param {HTMLElement} param.target The target DOM node tracked
 */

/**
 * The movement changes
 * 
 * @name wink.ux.MovementTracker#/movementtracker/events/mvtchanged
 * @event
 * @param {object} param The parameters object
 * @param {wink.ux.MovementTracker} param.publisher Identifies the movement tracker itself in order, for the caller, to check whether the event relates to it
 * @param {object} param.movement A Movement object
 * @param {array} param.movement.pointStatement an array of "points" : a point is an object which is composed as { x, y, timestamp, duration, globalDuration, dx, dy, globalDx, globalDy, directionX, directionY }
 * @param {integer} param.movement.duration duration is the duration of the movement
 * @param {integer} param.movement.dx dx is the distance on x-axis
 * @param {integer} param.movement.dy dy is the distance on x-axis
 * @param {wink.ux.Event} param.uxEvent The Wink Event that is the cause of the event
 * @param {HTMLElement} param.target The target DOM node tracked
 */

/**
 * The movement stops
 * 
 * @name wink.ux.MovementTracker#/movementtracker/events/mvtstored
 * @event
 * @param {object} param The parameters object
 * @param {wink.ux.MovementTracker} param.publisher Identifies the movement tracker itself in order, for the caller, to check whether the event relates to it
 * @param {object} param.movement A Movement object
 * @param {array} param.movement.pointStatement an array of "points" : a point is an object which is composed as { x, y, timestamp, duration, globalDuration, dx, dy, globalDx, globalDy, directionX, directionY }
 * @param {integer} param.movement.duration duration is the duration of the movement
 * @param {integer} param.movement.dx dx is the distance on x-axis
 * @param {integer} param.movement.dy dy is the distance on x-axis
 * @param {wink.ux.Event} param.uxEvent The Wink Event that is the cause of the event
 * @param {HTMLElement} param.target The target DOM node tracked
 */

/**
 * The touch events of the movement are not currently tracked
 * 
 * @name wink.ux.MovementTracker#/movementtracker/events/notrack
 * @event
 * @param {object} param The parameters object
 * @param {wink.ux.MovementTracker} param.publisher Identifies the movement tracker itself in order, for the caller, to check whether the event relates to it
 * @param {wink.ux.Event} param.uxEvent The Wink Event that is the cause of the event
 * @param {HTMLElement} param.target The target DOM node tracked
 */

define(['../../../_amd/core'], function(wink)
{
	/**
	 * @class Implements a Movement Tracker. The Movement Tracker follows the touch movement performed on a node.
	 * It listens to touch events and elaborates a movement which consists of points statements sequence. 
	 * Each point statement includes these informations : a position, a direction, a distance and a duration.
	 * 
	 * @param {object} properties The properties object
	 * @param {HTMLElement} properties.target The target DOM node which must be tracked
	 * @param {boolean} [properties.captureFlow=true] Indicates whether the capture event flow is used
	 * @param {boolean} [properties.preventStart=true] Indicates whether the start event must be prevented
	 * @param {boolean} [properties.preventMove=false] Indicates whether the move event must be prevented
	 * @param {integer} [properties.trackThresholdX=0] The minimum distance on x-axis before tracking the movement - in pixels
	 * @param {integer} [properties.trackThresholdY=0] The minimum distance on y-axis before tracking the movement - in pixels
	 * 
	 * @example
	 * 
	 * var mvt = new wink.ux.MovementTracker({ target: $("nodeId") });
	 * wink.subscribe('/movementtracker/events/mvtbegin', { context: window, method: 'handleMovementBegin' });
	 * wink.subscribe('/movementtracker/events/mvtchanged', { context: window, method: 'handleMovementChanged' });
	 * wink.subscribe('/movementtracker/events/mvtstored', { context: window, method: 'handleMovementStored' });
	 * 
	 * @see <a href="WINK_ROOT_URL/ux/movementtracker/test/test_movementtracker.html" target="_blank">Test page</a>
	 */
	wink.ux.MovementTracker = function(properties) 
	{
		/**
		 * Unique identifier
		 * 
		 * @property uId
		 * @type integer
		 */
		this.uId			= wink.getUId();
		this._properties 	= properties;
		
		this._target 		= null;
		
		this._pointStatement= null;
		this._startPoint	= null;
		this._previousPoint	= null;
		this._tracking		= false;
		this._acceptEvents	= true;
		this._multitouch	= false;
		
		this._params		= {
			captureFlow: true,
			preventStart: true,
			preventMove: false,
			shiftThreshold: 0, // pixel
			trackThresholdX: 0, // pixel
			trackThresholdY: 0 // pixel
		};
		
		if (this._validateProperties() === false) return;
		
		this._initProperties();	
		this._initListeners();
	};
	
	wink.ux.MovementTracker.prototype = {
		/**
		 * Updates the tracking threshold on x-axis
		 * 
		 * @param {integer} threshold The threshold to set
		 */
		updateTrackThresholdX: function(threshold)
		{
			if (!this._isValidThreshold(threshold))
			{
				this._raisePropertyError('trackThresholdX');
			}
			else
			{
				this._params.trackThresholdX = threshold;
			}
		},
		/**
		 * Updates the tracking threshold on y-axis
		 * 
		 * @param {integer} threshold The threshold to set
		 */
		updateTrackThresholdY: function(threshold)
		{
			if (!this._isValidThreshold(threshold))
			{
				this._raisePropertyError('trackThresholdY');
			}
			else
			{
				this._params.trackThresholdY = threshold;
			}
		},
		/**
		 * Destroys the component
		 * 
		 */
		destroy: function()
		{
			this._removeListeners();
		},
		/**
		 * Validate the properties of the component
		 * @returns {boolean} True if the properties are valid, false otherwise
		 */
		_validateProperties: function()
		{
return true;
},
		/**
		 * Returns true if the given threshold is valid
		 */
		_isValidThreshold: function(threshold)
		{
			return wink.isInteger(threshold) && threshold >= 0;
		},
		/**
		 * Raise the property error
		 */
		_raisePropertyError: function(property)
		{
			wink.log('[MovementTracker] Error: ' + property + ' missing or invalid');
		},
		/**
		 * Initialize datas with given properties
		 */
		_initProperties: function()
		{
			this._target = $(this._properties.target);
			if (this._properties.captureFlow === false) {
				this._params.captureFlow = false;
			}
			if (this._properties.preventStart === false) {
				this._params.preventStart = false;
			}
			if (this._properties.preventMove === true) {
				this._params.preventMove = true;
			}
			if (wink.isSet(this._properties.trackThresholdX)) {
				this._params.trackThresholdX = this._properties.trackThresholdX;
			}
			if (wink.isSet(this._properties.trackThresholdY)) {
				this._params.trackThresholdY = this._properties.trackThresholdY;
			}
			delete this._properties;
		},
		/**
		 * Initialize listeners
		 */
		_initListeners: function()
		{
			wink.ux.touch.addListener(this._target, "start", { context: this, method: "_handleTouchStart" }, { preventDefault: this._params.preventStart, captureFlow: this._params.captureFlow });
			wink.ux.touch.addListener(this._target, "move", { context: this, method: "_handleTouchMove" }, { preventDefault: this._params.preventMove, captureFlow: this._params.captureFlow });
			wink.ux.touch.addListener(this._target, "end", { context: this, method: "_handleTouchEnd" }, { captureFlow: this._params.captureFlow });
		},
		/**
		 * Removes listeners
		 */
		_removeListeners: function()
		{
			wink.ux.touch.removeListener(this._target, "start", { context: this, method: "_handleTouchStart" });
			wink.ux.touch.removeListener(this._target, "move", { context: this, method: "_handleTouchMove" });
			wink.ux.touch.removeListener(this._target, "end", { context: this, method: "_handleTouchEnd" });
		},
		/**
		 * Handle touch start
		 * 
		 * @param {wink.ux.Event} uxEvent The wink.ux.Event associated
		 */
		_handleTouchStart: function(uxEvent)
		{
			if (wink.ua.isAndroid) {
				// workaround : android shows a popup (selection) when the start handling is too long. So we must defer the execution in this case
				if (!this.defered) {
					this.defered = true;
					var time = new Date().getTime() - uxEvent.timestamp;
					if (time > 100) {
						this._acceptEvents = false;
						uxEvent.preventDefault();
						var t, ctx = {
							exec: wink.bind(function() {
								clearTimeout(t);
								this._acceptEvents = true;
								this._handleTouchStart(uxEvent);
							}, this)
						};
						t = wink.setTimeout(ctx, 'exec', 0);
						return;
					}
				}
			}
	
			if (this._acceptEvents == false) {
				return;
			}
			
			this._multitouch = false;
			if (uxEvent.multitouch == true) {
				this._multitouch = true;
				return;
			}
			
			this._acceptEvents = false;
			
			this._pointStatement = [];
			this._previousPoint = null;
			this._tracking = false;
			this._startPoint = {
				x: uxEvent.x,
				y: uxEvent.y
			};
			
			var topic = this._onNewTouch(uxEvent);
			wink.publish(topic.name, topic.params);
			
			this._acceptEvents = true;
		},
		/**
		 * Handle touch move
		 * 
		 * @param {wink.ux.Event} uxEvent The wink.ux.Event associated
		 */
		_handleTouchMove: function(uxEvent)
		{
			if (this._acceptEvents == false) {
				return;
			}
			if (this._multitouch) {
				return;
			}
			
			this._acceptEvents = false;
			
			var topic = this._onNewTouch(uxEvent);
			wink.publish(topic.name, topic.params);
			
			this._acceptEvents = true;
		},
		/**
		 * Handle touch end
		 * 
		 * @param {wink.ux.Event} uxEvent The wink.ux.Event associated
		 */
		_handleTouchEnd: function(uxEvent)
		{
			if (this._acceptEvents == false) {
				return;
			}
			if (this._multitouch) {
				return;
			}
			
			this._acceptEvents = false;
			
			var topic = this._onNewTouch(uxEvent);
			wink.publish(topic.name, topic.params);
			
			this._acceptEvents = true;
		},
		/**
		 * Handle a new touch.
		 * 
		 * @param {wink.ux.Event} uxEvent The wink.ux.Event associated
		 * 
		 * @returns {object} the topic to publish
		 */
		_onNewTouch: function(uxEvent)
		{
			if (this._tracking == false) {
				if (this._params.trackThresholdX == 0 || this._params.trackThresholdY == 0) {
					this._tracking = true;
				} else {
					var currentPoint = {
						x: uxEvent.x,
						y: uxEvent.y
					};
					var dx = Math.abs(currentPoint.x - this._startPoint.x);
					var dy = Math.abs(currentPoint.y - this._startPoint.y);
					
					if (dx > this._params.trackThresholdX || dy > this._params.trackThresholdY) {
						this._tracking = true;
					}
				}
			}
			
			var topic = {
				name: '/movementtracker/events/notrack',
				params: {
					publisher: this,
					uxEvent: uxEvent,
					target: this._target
				}
			};
			
			if (this._tracking == false) {
				return topic;
			}
			
			if (this._pointStatement.length == 0) {
				topic.name = '/movementtracker/events/mvtbegin';
			} else if (uxEvent.type == "move") {
				topic.name = '/movementtracker/events/mvtchanged';
			} else if (uxEvent.type == "end") {
				topic.name = '/movementtracker/events/mvtstored';
			}
			
			this._addTouch(uxEvent);
			topic.params.movement = this._getCurrentMovement();
			
			return topic;
		},
		/**
		 * Add a point statement to the movement
		 * 
		 * @param {wink.ux.Event} uxEvent The wink.ux.Event associated to the touch
		 */
		_addTouch: function(uxEvent)
		{
			var point = {
				x: uxEvent.x,
				y: uxEvent.y,
				timestamp : uxEvent.timestamp
			};
	
			var previousX = 0;
			var previousY = 0;
			var previousDx = 0;
			var previousDy = 0;
			var previousDirectionX = 0;
			var previousDirectionY = 0;
	
			if (this._previousPoint == null) {
				// duration
				point.duration = 0;
				point.globalDuration = 0;
				previousX = point.x;
				previousY = point.y;
			} else {
				previousX = this._previousPoint.x;
				previousY = this._previousPoint.y;
				previousDx = this._previousPoint.globalDx;
				previousDy = this._previousPoint.globalDy;
				previousDirectionX = this._previousPoint.directionX;
				previousDirectionY = this._previousPoint.directionY;
			
				// duration
				point.duration = (point.timestamp - this._previousPoint.timestamp);
				point.globalDuration = point.duration + this._previousPoint.globalDuration;
			}
		
			// distance
			point.dx = Math.abs(point.x - previousX);
			point.dy = Math.abs(point.y - previousY);
			point.globalDx = point.dx + previousDx;
			point.globalDy = point.dy + previousDy;
		
			// direction
			point.directionX = previousDirectionX;
			point.directionY = previousDirectionY;
		
			if (previousDirectionX == 0 && this._previousPoint != null) {
				if (point.x < previousX) {
					point.directionX = -1;
				} else if (point.x > previousX) {
					point.directionX = 1;
				}
				this._previousPoint.directionX = point.directionX;
			}
			if (previousDirectionY == 0 && this._previousPoint != null) {
				if (point.y < previousY) {
					point.directionY = -1;
				} else if (point.y > previousY) {
					point.directionY = 1;
				}
				this._previousPoint.directionY = point.directionY;
			}
		
			if (previousDirectionX > 0 && (point.x + this._params.shiftThreshold) < previousX) {
				point.directionX = -1;
			} else if (previousDirectionX < 0 && (point.x - this._params.shiftThreshold) > previousX) {
				point.directionX = 1;
			}
			if (previousDirectionY > 0 && (point.y + this._params.shiftThreshold) < previousY) {
				point.directionY = -1;
			} else if (previousDirectionY < 0 && (point.y - this._params.shiftThreshold) > previousY) {
				point.directionY = 1;
			}
		
			this._pointStatement.push(point);
			this._previousPoint = point;
		},
		/**
		 * Build the current movement
		 * 
		 * @returns {object} the current movement
		 */
		_getCurrentMovement: function()
		{
			var lastPoint = this._pointStatement[(this._pointStatement.length - 1)];
			var movement = {
				pointStatement : this._pointStatement,
				duration : lastPoint.globalDuration,
				dx : lastPoint.globalDx,
				dy : lastPoint.globalDy
			};
			return movement;
		}
	};
	
	return wink.ux.MovementTracker;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Implements the window component that captures resize and scroll events and warns listeners of changes.
 * It Handles these properties: screenWidth, screenHeight, fullWidth, fullHeight, width, height, orientation
 * 
 * @author Sylvain LALANDE
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 */

/**
 * Raised when window is resized
 * 
 * @name wink.ux.window#/window/events/resize
 * @event
 * @param {object} param The parameters object
 * @param {integer} param.height The height of the visible area
 * @param {integer} param.width The width of the visible area
 * @param {string} param.orientation The orientation of the window ("horizontal" or "vertical")
 */

/**
 * Raised when orientation changed
 * 
 * @name wink.ux.window#/window/events/orientationchange
 * @event
 * @param {object} param The parameters object
 * @param {integer} param.height The height of the visible area
 * @param {integer} param.width The width of the visible area
 * @param {string} param.orientation The orientation of the window ("horizontal" or "vertical")
 */

define(['../../../_amd/core'], function(wink)
{
	/**
	 * @namespace Implements the window component that captures resize and scroll events and warns listeners of changes.
	 * It Handles these properties: screenWidth, screenHeight, fullWidth, fullHeight, width, height, orientation
	 * 
	 * @example
	 * 
	 * var handleOrientation = function(properties)
	 * {
	 *   alert("Orientation: " + properties.orientation);
	 * };
	 * wink.subscribe('/window/events/orientationchange', { context: window, method: 'handleOrientation' });
	 * 
	 * @see <a href="WINK_ROOT_URL/ux/window/test/test_window.html" target="_blank">Test page</a>
	 */
	wink.ux.window =
	{
		/**
		 * The height of the visible area
		 * 
		 * @property height
		 * @type integer
		 */
		height: null,
		
		/**
		 * The width of the visible area
		 * 
		 * @property width
		 * @type integer
		 */
		width: null,
		
		/**
		 * The height of the content
		 * 
		 * @property fullHeight
		 * @type integer
		 */
		fullHeight: null,
		
		/**
		 * The width of the content
		 * 
		 * @property fullWidth
		 * @type integer
		 */
		fullWidth: null,
		
		/**
		 * The height of the screen
		 * 
		 * @property screenHeight
		 * @type integer
		 */
		screenHeight: screen.height,
		
		/**
		 * The width of the screen
		 * 
		 * @property screenHeight
		 * @type integer
		 */
		screenWidth: screen.width,
		
		/**
		 * The orientation of the window ("horizontal" or "vertical")
		 * 
		 * @property orientation
		 * @type string
		 */
		orientation: null,
		
		/**
		 * @private
		 */
		_i: null,
		/**
		 * @private
		 */
		_V: "vertical",
		/**
		 * @private
		 */
		_H: "horizontal",
			
		/**
		 * Initialize the component
		 */
		_init: function()
		{
			var h = wink.bind(this._updateData, this);
			
			if ( "onorientationchange" in window )
			{
				window.addEventListener("orientationchange", h, true);
			} else
			{
				window.addEventListener("resize", h, true);
			}
			
			if ( wink.ua.isAndroid )
			{
				scrollTo(0, 1, 0);
				this._i = setInterval(h, 1000);
			} else
			{
				window.addEventListener("scroll", h, true);
			}
			
			h();
		},
		
		/**
		 * Watch for changes
		 */
		_updateData: function()
		{
			var w = window.innerWidth;
			var h = window.innerHeight;
			
			var b = false;
	
			if ( (this.width+2 < w || this.width-2 > w) || (this.height+2 < h || this.height-2 > h ) )
			{
				b = true;
			}
			
			this._updateSize();
			this._updateOrientation();
			
			if ( b )
			{
				wink.publish("/window/events/resize", {height: h, width: w, orientation: this.orientation});
			}
		},
		
		/**
		 * Update the window size
		 */
		_updateSize: function()
		{
			this.height = window.innerHeight;
			this.width 	= window.innerWidth;
			
			try
			{
				this.fullHeight = document.body.scrollHeight;
				this.fullWidth = document.body.scrollWidth;
			} catch(e)
			{
				// document.body does not exist
			}
		},
		
		/**
		 * Update the orientation
		 */
		_updateOrientation: function()
		{
			var o;
	
			if ( wink.isSet(window.orientation) && wink.ua.isIOS )
			{
				if ( Math.abs(window.orientation) == 90 )
				{
					o = this._H;
				} else
				{
					o = this._V;
				}
			} else
			{
				if ( this.width > this.height )
				{
					o = this._H;
				} else
				{
					o = this._V;
				}
			}
	
			if ( o != this.orientation )
			{
				this.orientation = o;
				wink.publish("/window/events/orientationchange", {height: this.height, width: this.width, orientation: o});
			}
		}
	};
	
	window.addEventListener("DOMContentLoaded", function(){wink.ux.window._init();});
	
	/**
	 * @deprecated
	 * @since 1.3.0
	 */
	wink.ux.Window = function()
	{
		
		
		/**
		 * @deprecated
		 * @since 1.3.0
		 */
		this.getProperties = function()
		{
			
			
			var p =
			{
				screenWidth: wink.ux.window.screenWidth,
				screenHeight: wink.ux.window.screenHeight,
				width: wink.ux.window.width,
				height:  wink.ux.window.height,
				orientation:  wink.ux.window.orientation
			};
			
			return p;
		};
	};
	
	return wink.ux.window;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Implement a sliding container
 * Create a sliding panels container container with which you can navigate through pages with an Iphone like UX
 *
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0
 * 
 * @author Jerome GIRAUD
 */

/**
 * slide just started
 * 
 * @name wink.ui.layout.SlidingPanels#/slidingpanels/events/slidestart
 * @event
 * @param {object} param The parameters object
 * @param {string} param.id the current first page
 */

/**
 * slide just ended
 * 
 * @name wink.ui.layout.SlidingPanels#/slidingpanels/events/slideend
 * @event
 * @param {object} param The parameters object
 * @param {string} param.id the current first page
 */

define(['../../../../_amd/core'], function(wink)
{
	/**
	 * @class Implement a sliding container
	 * Create a sliding panels container container with which you can navigate through pages with an Iphone like UX
	 * To instantiate a sliding panels container, the pages (dom nodes) MUST already be present in the page and each one MUST be defined by a unique id. Use the 'getDomNode' method to add the sliding panels container into the page.
	 * 
	 * @param {object} properties The properties object
	 * @param {integer} [properties.duration=800] The slide duration in milliseconds
	 * @param {string} [properties.transitionType="default"] The type of the transition between pages ('default', 'cover' or 'reveal'). If you use the 'cover' or 'reveal' option, all your pages should have the same height
	 * @param {array} properties.pages An array containing the ids of the pages to add into the sliding panels container. The pages dom nodes MUST be present in the page at instantiation time
	 * 
	 * @example
	 * 
	 * var properties = 
	 * {
	 *   'duration': 500,
	 *   'transitionType': 'default',
	 *   'pages': ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8']
	 * }
	 * 
	 * slidingPanels = new wink.ui.layout.SlidingPanels(properties);
	 * document.body.appendChild(slidingPanels.getDomNode());
	 * 
	 * @see <a href="WINK_ROOT_URL/ui/layout/slidingpanels/test/test_slidingpanels_1.html" target="_blank">Test page</a>
	 * @see <a href="WINK_ROOT_URL/ui/layout/slidingpanels/test/test_slidingpanels_2.html" target="_blank">Test page (cover)</a>
	 * @see <a href="WINK_ROOT_URL/ui/layout/slidingpanels/test/test_slidingpanels_3.html" target="_blank">Test page (reveal)</a>
	 * @see <a href="WINK_ROOT_URL/ui/layout/slidingpanels/test/test_slidingpanels_4.html" target="_blank">Test page (with history)</a>
	 */
	wink.ui.layout.SlidingPanels = function(properties)
	{
		/**
		 * Unique identifier
		 * 
		 * @property uId
		 * @type integer
		 */
		this.uId                    = wink.getUId();
		
		/**
		 * The list of pages ids of the slidingpanels
		 * 
		 * @property pages
		 * @type array
		 */
		this.pages					= null;
		
		/**
		 * The type of the transition between pages
		 * 
		 * @property transitionType
		 * @type string
		 */
		this.transitionType		    = 'default';
		
		/**
		 * The slide duration in milliseconds. The default value is 800
		 * 
		 * @property duration
		 * @type integer
		 */
		this.duration	            = 800;
		
		this.HIGHER_INDEX			= 100;
		this.LOWER_INDEX			= 99;
		
		this._domNode				= null;
		this._queue					= [];
		this._pagesList				= [];
		this._firstPage				= null;
		this._currentPage			= null;
		this._isSliding				= false;
		
		wink.mixin(this, properties);
		
		if (this._validateProperties() === false) return;
			
		this._initDom();
		this._initProperties();
	};
	
	wink.ui.layout.SlidingPanels.prototype =
	{
		_TRANSITION_DEFAULT: 'default',
		_TRANSITION_REVEAL: 'reveal',
		_TRANSITION_COVER: 'cover',
		
		/**
		 * @returns {HTMLElement} The DOM node containing the slidingpanels
		 */
		getDomNode: function()
		{
			return this._domNode;
		},
		
		/**
		 * Move to the selected page
		 * 
		 * @param {string} id The id of the page to display
		 */
		slideTo: function(id)
		{	
			if (this._isSliding)
			{
				return;
			}
	
			var queueIdx = this._getQueueIndex(id);
			
			if (queueIdx !== false)
			{
				if ( queueIdx == this._queue.length - 1 )
				{
					this.slideBack();
					return;
				}
				
				this._silentSlideBack(id);
				return;
			}
	
			var fp = this._firstPage,
				cp = this._getPageById(id),
				tt = this.transitionType,
				td = this.duration,
				isReveal = (tt == this._TRANSITION_REVEAL),
				isCover = (tt == this._TRANSITION_COVER);
			
			if (cp == null)
			{
				return;
			}
	
			var context = 
			{
				firstPage: fp,
				currentPage: cp,
				firstPageDuration: isCover ? '' : td,
				currentPageDuration: isReveal ? '' : td,
				pageToListen: isReveal ? fp : cp,
				slideEndHandler: wink.bind(this._onSlideEnd, this, -1),
				firstPageTranslation: isCover ? 0 : '-100%',
				firstPageZIndex: isCover ? this.LOWER_INDEX : undefined,
				currentPageZIndex: isCover ? this.HIGHER_INDEX : undefined
			};
	
			this._slideStart(context);
		},
		
		/**
		 * Come back to the previous page
		 */
		slideBack: function()
		{
			if (this._isSliding)
			{
				return;
			}
			
			var fp = this._firstPage,
				cp = this._queue.pop(),
				tt = this.transitionType,
				td = this.duration,
				isReveal = (tt == this._TRANSITION_REVEAL),
				isCover = (tt == this._TRANSITION_COVER);
			
			var context = 
			{
				firstPage: fp,
				currentPage: cp,
				firstPageDuration: isReveal ? '' : td,
				currentPageDuration: isCover ? '' : td,
				pageToListen: isReveal ? cp : fp,
				slideEndHandler: wink.bind(this._onSlideEnd, this, 1),
				firstPageTranslation: isReveal ? 0 : '100%',
				firstPageZIndex: isReveal ? this.LOWER_INDEX : undefined,
				currentPageZIndex: isReveal ? this.HIGHER_INDEX : undefined
			};
			
			this._slideStart(context);
		},
		
		/**
		 * Slide back without transitions
		 * 
		 * @param {string} id The id of the page to display
		 */
		_silentSlideBack: function(id)
		{		
			var position = this._getQueueIndex(id);
			var skip = this._queue.slice(position + 1, this._queue.length);
			this._queue.splice(position + 1, skip.length);
			
			var i, l = skip.length;
			
			for (i = 0; i < l; i++)
			{
				var p = skip[i];
				p.setTranslateDuration(0);
				p.translate('100%');
				p.setPosition(1);
				if (this.transitionType != this._TRANSITION_DEFAULT)
				{
					p.setZIndex(this.LOWER_INDEX);
				}
			}
			
			this._firstPage = this._currentPage;
			this.slideBack();
		},
		
		/**
		 * Start sliding the pages
		 * 
		 * @param {object} ctx The current context
		 */
		_slideStart: function(ctx)
		{
			this._isSliding = true;
			wink.publish('/slidingpanels/events/slidestart', { 'id': ctx.currentPage.id });
			this._currentPage = ctx.currentPage;
			
			if (ctx.firstPageZIndex)
			{
				ctx.firstPage.setZIndex(this.LOWER_INDEX);
			}
			
			if (ctx.currentPageZIndex)
			{
				ctx.currentPage.setZIndex(this.HIGHER_INDEX);
			}
			ctx.currentPage.display();
			ctx.firstPage.setTranslateDuration(ctx.firstPageDuration);
			ctx.currentPage.setTranslateDuration(ctx.currentPageDuration);
			wink.fx.onTransitionEnd(ctx.pageToListen.getDomNode(), ctx.slideEndHandler);
			ctx.firstPage.translate(ctx.firstPageTranslation, 0);
			ctx.currentPage.translate(0);
		},
		
		/**
		 * Handle the slide end
		 * 
		 * @param {integer} value The direction of the slide
		 */
		_onSlideEnd: function(value)
		{
			var fp = this._firstPage,
				cp = this._currentPage;
			
			if (this.transitionType != this._TRANSITION_DEFAULT)
			{
				fp.setZIndex(this.LOWER_INDEX);
				cp.setZIndex(this.HIGHER_INDEX);
			}
			
			fp.setPosition(value);
			cp.setPosition(0);
			
			if (value == -1)
			{
				this._queue.push(fp);
			}
			
			this._firstPage = this._currentPage;
			this._isSliding = false;
			
			wink.publish('/slidingpanels/events/slideend', { 'id': cp.id });
		},
		
		/**
		 * Get a page
		 * 
		 * @param {string} id The id of the page to return
		 */
		_getPageById: function(id)
		{
			var i, pl = this._pagesList, l = pl.length;
			for (i = 0; i < l; i++)
			{
				var page = pl[i];
				if (page.id == id && page.position == 1)
				{
					return page;
				}
			}
			return null;
		},
		
		/**
		 * Get a page position in the queue
		 * 
		 * @param {string} id The id of the page to return
		 */
		_getQueueIndex: function(id)
		{
			var i, q = this._queue, l = q.length;
			for (i = 0; i < l; i++)
			{
				if (q[i].id == id)
				{
					return i;
				}
			}
			return false;
		},
		
		/**
		 * Validate the properties of the component
		 * @returns {boolean} True if the properties are valid, false otherwise
		 */
		_validateProperties: function()
		{
return true;
},
		
		/**
		 * Initialize the properties
		 */
		_initProperties: function()
		{
			var tt = this.transitionType;
	
			var i, pgs = this.pages, l = pgs.length;
			
			for (i = 0; i < l; i++)
			{
				var page = new wink.ui.layout.SlidingPanels.Page({ 'node': $(pgs[i]) });
		
				if (i == 0)
				{
					page.translate(0);
					page.setPosition(0);
					this._firstPage = page;
				} else
				{
					var xPos = '100%';
					if (tt == this._TRANSITION_REVEAL)
					{
						xPos = 0;
					}
					page.translate(xPos);
					page.setPosition(1);
				}
				
				if (tt != this._TRANSITION_DEFAULT)
				{
					if (i == 0)
					{
						page.setZIndex(this.HIGHER_INDEX);
					} else
					{
						page.setZIndex(this.LOWER_INDEX);
					}
				}
				
				var pn = page.getDomNode();
				pn.parentNode.removeChild(pn);
				this._domNode.appendChild(pn);
				this._pagesList.push(page);
			}
			
			if ( wink.isInteger(this.duration))
			{
				this.duration += 'ms';
			}
			
		},
		
		/**
		 * Initialize the slidingpanels node
		 */
		_initDom: function()
		{
			this._domNode = document.createElement('div');
			wink.addClass(this._domNode, 'sl_container');
		}
	};
	
	
	/**
	 * @class Implement a page to be added to the slidingpanels
	 * 
	 * @param {object} properties The properties object
	 * @param {HTMLElement} properties.node The DOM node corresponding to the page
	 */
	wink.ui.layout.SlidingPanels.Page = function(properties)
	{
		/**
		 * Unique identifier
		 * 
		 * @property uId
		 * @type integer
		 */
		this.uId			= wink.getUId();
		/**
		 * The dom node id of the page
		 * 
		 * @property id
		 * @type string
		 */
		this.id				= null;
		/**
		 * Position of the page (-1: page is on the left ; 0: page is displayed ; 1: page is on the right)
		 * 
		 * @property position
		 * @type integer
		 */
		this.position		= 0;
		
		this._properties	= properties;
		this._domNode		= null;
		this._isDisplayed	= false;
		this._toDefer		= false;
		
		this._initProperties();
		this._initDom();
	};
	
	wink.ui.layout.SlidingPanels.Page.prototype =
	{
		wkArOldIOS: (wink.ua.isIOS && wink.ua.osVersion <= 2),
		
		/**
		 * @returns {HTMLElement} The DOM node containing the Page
		 */
		getDomNode: function()
		{
			return this._domNode;
		},
		
		/**
		 * Set the current position of the page
		 * 
		 * @param {integer} position -1: page is on the left ; 0: page is displayed ; 1: page is on the right
		 */
		setPosition: function(position)
		{
			this.position = position;
			
			if (this.position != 0)
			{
				if (!this.wkArOldIOS)
				{
					this._domNode.style.display = 'none';
					this._isDisplayed = false;
				}
			} else
			{
				wink.fx.apply(this._domNode, {'transform': 'none'});
			}
		},
		
		/**
		 * Display the page
		 */
		display: function()
		{
			this._domNode.style.display = 'block';
			if (this._isDisplayed == false)
			{
				this._isDisplayed = true;
				this._toDefer = true;
			}
		},
		
		/**
		 * Translate the page
		 * 
		 * @param {string|integer} x the translate distance
		 */
		translate: function(x)
		{
			var t, ctx = {
				defered: wink.bind(function() {
					if (t) {
						clearTimeout(t);
					}
					this._domNode.translate(x, null);
				}, this)	
			};
			
			if (this._toDefer)
			{
				t = wink.setTimeout(ctx, 'defered', 0);
				this._toDefer = false;
			} else
			{
				ctx.defered();
			}
		},
		
		/**
		 * Set the z-index of the page
		 * 
		 * @param {integer} z the index to set
		 */
		setZIndex: function(z)
		{
			this._domNode.style.zIndex = z;
		},
		
		/**
		 * Set the translation duration of the page
		 * 
		 * @param {string} d the duration
		 */
		setTranslateDuration: function(d)
		{
			wink.fx.applyTransformTransition(this._domNode, d, '1ms', 'default');
		},
		
		/**
		 * Initialize the Page node
		 */
		_initDom: function()
		{
			wink.addClass(this._domNode, 'sl_page');
		},
		
		/**
		 * Initialize the properties
		 */
		_initProperties: function()
		{
			this._domNode = this._properties.node;
			this.id = this._domNode.id;
		}
	};
	
	return wink.ui.layout.SlidingPanels;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Implements a carousel
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0
 * @author Jerome GIRAUD
 */

/**
 * The event is fired when there is an item switch
 * 
 * @name wink.ui.xy.Carousel#/carousel/events/switch

 * @event
 * 
 * @param {object} param The parameters object
 * @param {integer} param.carouselId The uId of the carousel triggering the event
 * @param {integer} param.currentItemIndex The current carousel item
 */
define(['../../../../_amd/core'], function(wink)
{
	/**
	 * @class Implements a carousel
	 * <br>
	 * Built to add a Carousel in your page. You can insert images or DOM nodes inside your Carousel.
	 * The navigation is handled through touch events (a gesture on the left or on the right will make it switch items).
	 * The carousel also handles the click events on its items.
	 * Note that it could also be used with the 'history' component to handle the 'back' and 'forward' buttons in a custom way
	 * <br><br>
	 * The Carousel needs properties to define its behaviour and its items. As all other graphical components,
	 * it has a getDomNode method that should be used after the instantiation to add the carousel node to the page.
	 * The code sample shows how to instantiate a new carousel and to add it to a section of a webpage.
	 * 
	 * @param {object} properties The properties object
	 * @param {integer} [properties.itemsWidth=250] The width of the items of the Carousel
	 * @param {integer} [properties.itemsHeight=100] The height of the items of the Carousel
	 * @param {string} [properties.display="horizontal"] Either vertical or horizontal
	 * @param {integer} [properties.displayDots=1] Whether or not to display the position indicators
	 * @param {integer} [properties.autoAdjust=1] Should the Carousel auto-adjust items position after each movement
	 * @param {integer} [properties.autoAdjustDuration=800] The transition duration for the auto adjust slide
	 * @param {integer} [properties.autoPlay=0] Does the Carousel automatically starts sliding
	 * @param {integer} [properties.autoPlayDuration=800] The time interval between two autoplays
	 * @param {integer} [properties.firstItemIndex=1] The item to be displayed in the center of the page at startup
	 * @param {integer} [properties.containerWidth=window.innerWidth] The width of the div containing the carousel
	 * @param {string} [properties.itemsAlign="center"] The alignment of the first item of the carousel (either "left" or "center")
	 * @param {array} properties.items An array containing the items of the carousel
	 * @param {string} properties.items.type The type of the content (can be a DOM node or a string)
	 * @param {string|HTMLElement} properties.items.content The content of the item
	 * @param {boolean} [properties.touchPropagation=true] Indicates whether the touch event on the Carousel must be propagated
	 * 
	 * @example
	 * 
	 * var properties = 
	 * {
	 * 	itemsWidth: 280,
	 * 	itemsHeight: 136,
	 * 	autoAdjust: 1,
	 * 	autoAdjustDuration: 400,
	 * 	autoPlay: 1,
	 * 	autoPlayDuration: 4000,
	 * 	firstItemIndex: 2,
	 * 	items:
	 * 	[
	 * 		{'type': 'string', 'content': '&lt;img src="../img/carousel_image_01.png" onclick="alert(1)" /&gt;'},
	 * 		{'type': 'string', 'content': '&lt;img src="../img/carousel_image_02.png" onclick="alert(2)" /&gt;'},
	 * 		{'type': 'string', 'content': '&lt;img src="../img/carousel_image_03.png" onclick="alert(3)"/&gt;'}
	 * 	]
	 * }
	 * 
	 * carousel = new wink.ui.xy.Carousel(properties);
	 * 
	 * $('output').appendChild(carousel.getDomNode());
	 * 
	 * @see <a href="WINK_ROOT_URL/ui/xy/carousel/test/test_carousel_1.html" target="_blank">Test page</a>
	 * @see <a href="WINK_ROOT_URL/ui/xy/carousel/test/test_carousel_2.html" target="_blank">Test page (vertical)</a>
	 */
	wink.ui.xy.Carousel = function(properties)
	{
		/**
		 * Unique identifier
		 * 
		 * @property uId
		 * @type integer
		 */
		this.uId = wink.getUId();
		
		/**
		 * The list of carousel items
		 * 
		 * @property items
		 * @type array
		 */
		this.items = [];
		
		/**
		 * The item to be displayed in the center of the page at startup
		 * 
		 * @property firstItemIndex
		 * @type integer
		 * @default 1
		 */
		this.firstItemIndex = 1;
		
		/**
		 * The width of the items of the Carousel
		 * 
		 * @property itemsWidth
		 * @type integer
		 * @default 250
		 */
		this.itemsWidth = 250;
		
		/**
		 * The height of the items of the Carousel
		 * 
		 * @property itemsHeight
		 * @type integer
		 * @default 100
		 */
		this.itemsHeight = 100;
		
		/**
		 * The type of display: either vertical or horizontal
		 * 
		 * @property display
		 * @type string
		 * @default horizontal
		 */
		this.display = this._HORIZONTAL_POSITION;
		
		/**
		 * The width of the div containing the carousel
		 * 
		 * @property containerWidth
		 * @type integer
		 * @default window.innerWidth
		 */
		this.containerWidth = window.innerWidth;
		
		/**
		 * The height of the div containing the carousel
		 * 
		 * @property containerHeight
		 * @type integer
		 */
		this.containerHeight = null;
		
		/**
		 * Whether or not to display the position indicators
		 * 
		 * @property displayDots
		 * @type integer
		 * @default 1
		 */
		this.displayDots = 1;
		
		/**
		 * Should the Carousel auto-adjust items position after each movement
		 * 
		 * @property autoAdjust
		 * @type integer
		 * @default 1
		 */
		this.autoAdjust = 1;
		
		/**
		 * The transition duration for the auto adjust slide
		 * 
		 * @property autoAdjustDuration
		 * @type integer
		 * @default 800
		 */
		this.autoAdjustDuration = 800;
		
		/**
		 * Does the Carousel automatically starts sliding
		 * 
		 * @property autoPlay
		 * @type integer
		 * @default 0
		 */
		this.autoPlay = 0;
		
		/**
		 * The time interval between two autoplays
		 * 
		 * @property autoPlayDuration
		 * @type integer
		 * @default 3000
		 */
		this.autoPlayDuration = 3000;
		
		/**
		 * The alignment of the first item of the carousel
		 * 
		 * @property itemsAlign
		 * @type string
		 * @default center
		 */
		this.itemsAlign = this._CENTER_POSITION;
		
		/**
		 * Indicates whether the touch event on the Carousel must be propagated
		 * 
		 * @property touchPropagation
		 * @type boolean
		 * @default true
		 */
		this.touchPropagation = true;
		
		this._currentItemIndex  = 0;
		
		this._containerWidthSet = 0;
	
		this._beginXY           = 0;
		this._currentXY         = 0;
		
		this._position          = 0;
		
		this._iD                = 0;
		this._cD                = 0;
		
		this._minXY             = 0;
		this._maxXY             = 0;
		
		this._autoPlayInterval  = null;
		this._autoPlayDirection = 1;
		
		this._startEvent        = null;
		this._endEvent          = null;
		
		this._itemsList         = [];
		this._dotsList          = [];
		
		this._domNode           = null;
		this._headerNode        = null;
		this._itemsNode         = null;
		this._dotsNode          = null;
		this._footerNode        = null;
	
		wink.mixin(this, properties);
		
		if ( this._validateProperties() ===  false )return;
		if ( wink.isSet(properties.containerWidth) )this._containerWidthSet = 1;
		
		this._initProperties();
		this._initDom();
		this._positionItems();
		this._initListeners();
	};
	
	wink.ui.xy.Carousel.prototype =
	{
		_LEFT_POSITION: 'left',
		_CENTER_POSITION: 'center',
		_VERTICAL_POSITION: 'vertical',
		_HORIZONTAL_POSITION: 'horizontal',
	
		/**
		 * Returns the dom node containing the Carousel
		 * 
		 * @returns {HTMLElement} The main dom node
		 */
		getDomNode: function()
		{
			return this._domNode;
		},
		
		/**
		 * Cleans the dom of the Carousel content nodes. To invoke only if Carousel no longer used.
		 */
		clean: function()
		{
			for (var i = 0; i < this._itemsList.length; i++) {
				this._itemsList[i].getDomNode().innerHTML = '';
			}
			this._domNode.innerHTML = '';
		},
		
		/**
		 * Display the selected item
		 * 
		 * @param {integer} index The index of the item we want to move to
		 */
		goToItem: function(index)
		{
			var l = this._itemsList.length;
			
			for ( var i=0; i<l; i++)
			{
				if(this.itemsAlign == this._CENTER_POSITION)
				{
					this._itemsList[i].position = ((i-index)*this._iD + (this._cD-this._iD)/2);
				} else
				{
					this._itemsList[i].position = (i-index)*this._iD;
				}
			}
			
			this.position = (this.firstItemIndex-index)*this._iD;
			
			wink.fx.apply(this._itemsNode, {
				"transition-duration": this.autoAdjustDuration + 'ms',
				"transition-timing-function": 'ease-out'
			});
			
			this._currentXY = (this.firstItemIndex-index)*this._iD;
			
			if ( this.display == this._HORIZONTAL_POSITION )
			{
				this._itemsNode.translate((this.firstItemIndex-index)*this._iD, 0);
			} else
			{
				this._itemsNode.translate(0, (this.firstItemIndex-index)*this._iD);
			}
				
			this._currentItemIndex = index;
			
			this._selectItem(this._currentItemIndex);
			
			wink.publish('/carousel/events/switch', {'carouselId': this.uId, 'currentItemIndex': this._currentItemIndex});
		},
		
		/**
		 * Refresh containerWidth, set container width, refresh min and max values
		 * 
		 * @param {integer} containerWidth The width of the carousel's container
		 */
		refreshContainerWidth: function(containerWidth)
		{	
			this._setContainerWidth(containerWidth);
			this._setMinMaxValues();
		},
		
		/**
		 * Add a new item in the Carousel
		 * 
		 * @param {string} type The type of the content ("node" or "string")
		 * @param {string|HTMLElement} content The content of the item
		 * @param {integer} index The position of the item in the carousel
		 */
		_addItem: function(type, content, index)
		{
			var node, item;
			
			if ( type == 'node' )
			{
				node = content;
			} else
			{
				node = document.createElement('div');
				node.innerHTML = content;
			}
			
			item = new wink.ui.xy.Carousel.Item({'width': this.itemsWidth, 'height': this.itemsHeight, 'node': node, 'index': (index-this.firstItemIndex)});
		
			this._itemsList.push(item);
		},
		
		/**
		 * Listen to the start events
		 * 
		 * @param {wink.ux.Event} event The start event
		 */
		_touchStart: function(event)
		{
			this._startEvent = event;
			
			if (this.display == this._HORIZONTAL_POSITION)
			{
				var _c = event.x;
			} else
			{
				var _c = event.y;
			}
			
			if (this.touchPropagation == false)
			{
				this._startEvent.stopPropagation();
			}
			
			if ( this._autoPlayInterval != null )
			{
				clearInterval(this._autoPlayInterval);
				this._autoPlayInterval = null;
			}
			
			this._beginXY = _c;
			
			wink.fx.apply(this._itemsNode, {
				"transition-duration": '',
				"transition-timing-function": ''
			});
		},
		
		/**
		 * Listen to the move events
		 * 
		 * @param {wink.ux.Event} event The move event
		 */
		_touchMove: function(event)
		{
			if (this.display == this._HORIZONTAL_POSITION)
			{
				var _c = event.x;
			} else
			{
				var _c = event.y;
			}
			
			// If the auto adjust parameter is not set, stop the movement at both ends of the carousel
			if ( (this.autoAdjust == 0) && (((this._currentXY + _c - this._beginXY) > this._minXY) || ((this._currentXY + _c - this._beginXY)< this._maxXY )))
			{
				return;
			}
			
			// Update items positions
			var l = this._itemsList.length;
			
			for ( var i=0; i<l; i++)
			{
				this._itemsList[i].position = (this._itemsList[i].beginXY + _c - this._beginXY);
			}
			
			// Update carousel position
			this.position = this._currentXY + _c - this._beginXY;
			
			if ( this.display == this._HORIZONTAL_POSITION )
			{
				this._itemsNode.translate(this.position, 0);
			} else
			{
				this._itemsNode.translate(0, this.position);
			}
		},
		
		/**
		 * Listen to the end events
		 * 
		 * @param {wink.ux.Event} event The end event
		 */
		_touchEnd: function(event)
		{
			this._endEvent = event;
			
			if (this.display == this._HORIZONTAL_POSITION)
			{
				var _sc = this._startEvent.x;
				var _ec = this._endEvent.x;
			} else
			{
				var _sc = this._startEvent.y;
				var _ec = this._endEvent.y;
			}
			
			// Check if a click event must be generated
			if ( ((this._endEvent.timestamp-this._startEvent.timestamp) < 250) && (Math.abs(_ec - _sc) < 20))
			{
				this._endEvent.dispatch(this._endEvent.target, 'click');
				return;
			}
			
			// Update items positions
			var l = this._itemsList.length;
			
			for ( var i=0; i<l; i++)
			{
				this._itemsList[i].beginXY = this._itemsList[i].position;
			}
			
			// Check which item to set as the currentItem
			var min = (this.itemsAlign == this._CENTER_POSITION)?Math.abs(this._itemsList[0].beginXY-((this._cD-this._iD)/2)):Math.abs(this._itemsList[0].beginXY);
			var minItem = 0;
			
			for ( var i=0; i<l; i++)
			{
				// If we are at the left end of the carousel, even a tiny right-to-left movement will cause the carousel to slide
				if ( this._currentItemIndex == 0 )
				{
					if ( _ec - _sc < 0 )
					{
						if ( this._itemsList.length == 1 )
						{
							minItem = 0;
						} else
						{
							minItem = 1;
						}
						break;
					} 
				}
				
				var condition = (this.itemsAlign == this._CENTER_POSITION)?Math.abs(this._itemsList[i].beginXY-((this._cD-this._iD)/2)):Math.abs(this._itemsList[i].beginXY);
				if (condition < min)
				{
					// a tiny left-to-right or right-to-left movement will cause the carousel to slide
					if ( i != this._currentItemIndex )
					{
						min = (this.itemsAlign == this._CENTER_POSITION)?Math.abs(this._itemsList[i].beginXY-((this._cD-this._iD)/2)):Math.abs(this._itemsList[i].beginXY);
						minItem = i;
					} else
					{
						// If we are at the right end of the carousel, even a tiny left-to-right movement will cause the carousel to slide
						if ( this._currentItemIndex == (l-1) )
						{
							if (_ec - _sc < 0)
							{
								minItem = i;
								break;
							}
						}
					}
				}
			}
			
			this._currentItemIndex = minItem;
			
			// Update the 'dots' indicator
			this._selectItem(this._currentItemIndex);
			
			// Fire the '/carousel/events/switch' event
			wink.publish('/carousel/events/switch', {'carouselId': this.uId, 'currentItemIndex': this._currentItemIndex});
			
			// If the autoAdjust parameter is set, move the items with a transition movement, elese don't
			if ( this.autoAdjust == 1)
			{
				wink.fx.apply(this._itemsNode, {
					"transition-duration": this.autoAdjustDuration + 'ms',
					"transition-timing-function": 'ease-out'
				});
				
				this._currentXY = (this.firstItemIndex-minItem)*this._iD;
				
				if ( this.display == this._HORIZONTAL_POSITION )
				{
					this._itemsNode.translate((this.firstItemIndex-minItem)*this._iD, 0);
				} else
				{
					this._itemsNode.translate(0, (this.firstItemIndex-minItem)*this._iD);
				}
			} else
			{
				if(!wink.isUndefined(this.position))
				{
					this._currentXY = this.position;
				}
			}
		},
		
		/**
		 * Display the selected 'dot'
		 * 
		 * @param {integer} index The index of the item in the list
		 */
		_selectItem: function(index)
		{
			var l = this._itemsList.length;
			
			for ( var i=0; i<l; i++)
			{
				this._itemsList[i].beginXY = (this.itemsAlign == this._CENTER_POSITION)?(i-index)*this._iD + (this._cD-this._iD)/2:(i-index)*this._iD;
				
				if ( i == index )
				{
					wink.addClass(this._dotsList[i], 'ca_selected');
				} else
				{
					wink.removeClass(this._dotsList[i], 'ca_selected');
				}
			}
		},
		
		/**
		 * Set the position of all the items at startup
		 */
		_positionItems: function()
		{
			var l = this._itemsList.length;
			
			for ( var i=0; i<l; i++)
			{
				this._itemsList[i].position = (this.itemsAlign == this._CENTER_POSITION)?(this._itemsList[i].index*this._iD + (this._cD-this._iD)/2):(this._itemsList[i].index*this._iD);
				this._itemsList[i].beginXY = this._itemsList[i].position;
				
				if ( this.display == this._HORIZONTAL_POSITION )
				{
					this._itemsList[i].getDomNode().translate(this._itemsList[i].position, 0);
				} else
				{
					this._itemsList[i].getDomNode().translate((this.itemsAlign == this._CENTER_POSITION)?((this.containerWidth - this.itemsWidth)/2):0, this._itemsList[i].position);
				}
			}
		},
		
		/**
		 * Update the items' positions when the orientation changes
		 */
		_updateItemsPosition: function()
		{
			if ( this._containerWidthSet == 0 )
			{
				this.containerWidth = window.innerWidth;
				
				if ( this.display == this._HORIZONTAL_POSITION )
				{
					this._cD = window.innerWidth;
				}
	
				var l = this._itemsList.length;
				
				for ( var i=0; i<l; i++)
				{
					if(this.itemsAlign == this._CENTER_POSITION)
					{
						if ( this.display == this._HORIZONTAL_POSITION )
						{
							this._itemsList[i].getDomNode().translate((this._itemsList[i].index*this._iD + (this._cD-this._iD)/2), 0);
						} else
						{
							this._itemsList[i].getDomNode().translate((this.containerWidth - this.itemsWidth)/2, (this._itemsList[i].index*this._iD + (this._cD-this._iD)/2));
						}
					} else
					{
						if ( this.display == this._HORIZONTAL_POSITION )
						{
							this._itemsList[i].getDomNode().translate(this._itemsList[i].index*this._iD, 0);
						} else
						{
							this._itemsList[i].getDomNode().translate(0, this._itemsList[i].index*this._iD);
						}
					} 
				}
			}
		},
		
		/**
		 * Slide the carousel automatically
		 */
		_startAutoPlay: function()
		{
			if ( this._currentItemIndex >= (this._itemsList.length-1) )
				this._autoPlayDirection = -1;
			
			if ( this._currentItemIndex <= 0 )
				this._autoPlayDirection = 1;
			
			
			if ( this._autoPlayDirection == 1 )
			{
				this.goToItem(this._currentItemIndex+1);
			} else
			{
				this.goToItem(this._currentItemIndex-1);
			}
		},
		
		/**
		 * Initialize the 'touch' and orientation change listeners
		 */
		_initListeners: function()
		{
			wink.ux.touch.addListener(this._itemsNode, "start", { context: this, method: "_touchStart", arguments: null }, { preventDefault: true });
			wink.ux.touch.addListener(this._itemsNode, "move", { context: this, method: "_touchMove", arguments: null }, { preventDefault: true });
			wink.ux.touch.addListener(this._itemsNode, "end", { context: this, method: "_touchEnd", arguments: null }, { preventDefault: true });
			
			window.addEventListener("orientationchange", wink.bind(function(){this._updateItemsPosition();}, this), false);
		},
		
		/**
		 * Initialize the Carousel DOM nodes
		 */
		_initDom: function()
		{
			this._domNode = document.createElement('div');
			
			if ( this.display == this._HORIZONTAL_POSITION )
			{
				this._domNode.className = 'ca_container';
			} else
			{
				this._domNode.className = 'ca_container ca_vertical';
			}
			
			this._headerNode = document.createElement('div');
			this._headerNode.className = 'ca_header';
			
			this._itemsNode = document.createElement('div');
			this._itemsNode.className = 'ca_items';
			this._itemsNode.style.height = this.itemsHeight + 'px';
			
			this._dotsNode = document.createElement('div');
			this._dotsNode.className = 'ca_dots';
			
			this._footerNode = document.createElement('div');
			this._footerNode.className = 'ca_footer';
			
			var l = this._itemsList.length;
		
			for ( var i=0; i<l; i++)
			{
				var dot = document.createElement('div');

				if ( i == this.firstItemIndex )
				{
					dot.className = 'ca_dot ca_selected';
				} else
				{
					dot.className = 'ca_dot';
				}
				
				if ( i == (l-1) )
				{
					dot.style.clear = 'both';
				}
				
				this._dotsList.push(dot);
				this._dotsNode.appendChild(dot);
				
				this._itemsNode.appendChild(this._itemsList[i].getDomNode());
			}
			
			if ( this.displayDots == 0 )
			{
				this._dotsNode.style.display = 'none';
			}
			
			this._setMinMaxValues();
			
			this._domNode.appendChild(this._headerNode);
			this._domNode.appendChild(this._itemsNode);
			this._domNode.appendChild(this._dotsNode);
			this._domNode.appendChild(this._footerNode);
			
			if ( this.autoPlay == 1 )
			{
				this._autoPlayInterval = wink.setInterval(this, '_startAutoPlay', this.autoPlayDuration);
			}
		},
	  
		/**
		 * Set containerWidth
		 * 
		 * @param {integer} containerWidth The width of the container
		 */
		_setContainerWidth: function(containerWidth)
		{	
			// Check container width
			if (!wink.isUndefined(containerWidth))
			{
				if ( !wink.isInteger(containerWidth) || containerWidth < 0 )
				{
					
					return false;
				}
				
				this.containerWidth = containerWidth;
				
				if ( this.display == this._HORIZONTAL_POSITION )
				{
					this._cD = containerWidth;
				}
			}	
		},
		
		/**
		 * Refresh min and max values
		 */
		_setMinMaxValues: function()
		{	
			if (this.autoAdjust == 0)
			{ 
				if(this.itemsAlign == this._CENTER_POSITION)
				{                  
					this._minXY = ((this.firstItemIndex)*this._iD)-((this._cD-this._iD)/2);
				} else
				{
					this._minXY = ((this.firstItemIndex)*this._iD);
				}
				
				if(this.itemsAlign == this._CENTER_POSITION)
				{
					this._maxXY = ((this.firstItemIndex-this._itemsList.length)*this._iD)+((this._cD+this._iD)/2);
				} else
				{
					this._maxXY = ((this.firstItemIndex-this._itemsList.length)*this._iD)+this._cD;	
				}
			}
		},
		
		/**
		 * Validate the properties of the component
		 * @returns {boolean} True if the properties are valid, false otherwise
		 */
		_validateProperties: function()
		{
return true;
},
		
		/**
		 * Initialize the Carousel properties
		 */
		_initProperties: function()
		{
			// Not displaying the dots if the auto-adjust parameter is not set to 1
			if ( this.autoAdjust == 0 )
			{
				this.displayDots = 0;
			}
			
			// Check propagation
			if ( !wink.isBoolean(this.touchPropagation))
			{
				this.touchPropagation = false;
			}
			
			// Check container width
			if ( !wink.isUndefined(this.containerWidth))
			{
				this._setContainerWidth(this.containerWidth);
			}
			
			var l = this.items.length;
			
			for ( var i=0; i<l; i++)
			{
				this._addItem(this.items[i].type, this.items[i].content, i);
			}
			
			this._currentItemIndex = this.firstItemIndex;
			
			this.containerHeight = this.itemsHeight;
			
			if ( this.display == this._HORIZONTAL_POSITION )
			{
				this._iD = this.itemsWidth;
				this._cD = this.containerWidth;
			} else
			{
				this._iD = this.itemsHeight;
				this._cD = this.containerHeight;
			}
		}
	};
	
	/**
	 * @class Implements a carousel item
	 * 
	 * @param {object} properties The properties object
	 * @param {integer} properties.index The initial position of the item in the Carousel
	 * @param {integer} properties.height The height of the item
	 * @param {integer} properties.width The width of the item
	 * @param {HTMLElement} properties.node The DOM node containing the item
	 */
	wink.ui.xy.Carousel.Item = function(properties)
	{
		/**
		 * Unique identifier
		 * 
		 * @property uId
		 * @type integer
		 */
		this.uId = wink.getUId();
		
		
		/**
		 * The initial position of the item in the Carousel
		 * 
		 * @property index
		 * @type integer
		 */
		this.index = properties.index;
		
		/**
		 * The width of the item
		 * 
		 * @property width
		 * @type integer
		 */
		this.width    = properties.width;
		
		/**
		 * The height of the item
		 * 
		 * @property height
		 * @type integer
		 */
		this.height   = properties.height;
		
		/**
		 * The start position in pixels of the item in the Carousel
		 * 
		 * @property beginXY
		 * @type integer
		 */
		this.beginXY   = 0;
		
		/**
		 * The current position in pixels of the item in the Carousel
		 * 
		 * @property position
		 * @type integer
		 */
		this.position = 0;
		
		this._domNode = properties.node;
		
		this._initDom();
	};
	
	wink.ui.xy.Carousel.Item.prototype =
	{
		/**
		 * Return the dom node containing the item
		 * 
		 * @returns {HTMLElement} The main dom node
		 */
		getDomNode: function()
		{
			return this._domNode;
		},
		
		/**
		 * Initialize the Carousel DOM nodes
		 */
		_initDom: function()
		{
			wink.addClass(this._domNode, 'ca_item');
			
			wink.fx.apply(this._domNode, {
				width: this.width + 'px',
				height: this.height + 'px'
			});
		}
	};
	
	return wink.ui.xy.Carousel;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Implements a popup component
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.1, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0, Windows Phone 7.5
 * @author Frédéric MOULIS, JF CUNAT, Sylvain LALANDE
 */

define(['../../../../_amd/core'], function(wink)
{
	/**
	 * @class Popup is a singleton that allows to open a popup window with one (alert) or two buttons (confirm) or with a fully customizable content
	 * Options are available for each type of popup style
	 * 
	 * @example
	 * 
	 * var popup = new wink.ui.xy.Popup();
	 * 
	 * document.body.appendChild(popup.getDomNode());
	 * 
	 * popup.confirm(
	 * {
	 * 	msg: "Do you confirm ?",
	 * 	callbackOk: { context: window, method: 'confirmOk' },
	 * 	callbackCancel: { context: window, method: 'confirmCancel' }
	 * });
	 * 
	 * @see <a href="WINK_ROOT_URL/ui/xy/popup/test/test_popup_1.html" target="_blank">Test page</a>
	 * @see <a href="WINK_ROOT_URL/ui/xy/popup/test/test_popup_2.html" target="_blank">Test page (add to homescreen)</a>
	 */
	wink.ui.xy.Popup = function()
	{
		if (wink.isUndefined(wink.ui.xy.Popup.singleton))
		{
			/**
			 * Unique identifier
			 * 
			 * @property
			 * @type integer
			 */
			this.uId = 1;
			
			/**
			 * Indicates whether the Popup is displayed
			 * 
			 * @property
			 * @type boolean
			 */
			this.displayed = false;
			
			
			this._domNode		= null;
			this._contentNode 	= null;
			this._btnsNode 		= null;
			this._arrowNode		= null;
			this._absolutePos	= false;
			this._followScrollY = false;
			this._scrollHandler = null;
			this._popupClasses	= "";
			this._inTransition	= false;
			this._transitions	= {};
	
			this._initDom();
			this._initListeners();
			
			wink.ui.xy.Popup.singleton = this;
		} 
		else 
		{
			return wink.ui.xy.Popup.singleton;
		}
	};
	
	wink.ui.xy.Popup.prototype = 
	{
		i18n: {},
		_DEFAULT_ARROW: "none",
		
		/**
		 * Returns the Popup dom node
		 * 
		 * @returns {HTMLElement} The main dom node
		 */
		getDomNode: function()
		{
			return this._domNode;
		},
		/**
		 * Hides the Popup
		 */
		hide: function()
		{
			this._hide();
		},
		/**
		 * @deprecated This method is no longer needed
		 * @since 1.2.0
		 */
		preloadContent: function()
		{
			
			return;
		},
		/**
		 * Opens a 1-button popup with a message. calls a callback function if asked when the button is clicked
		 * 
		 * @param {object} options The options object
		 * @param {string} options.msg The message to display
		 * @param {string} options.btn The text to display in the button. If nothing specified, the default translation is used
		 * @param {object} options.callback The callback to invoke when the user clicks on the button
		 * @param {boolean} options.borderRadius Indicates whether the popup must be displayed with border-radius style
		 * @param {integer} options.duration The duration of the display transition
		 * @param {boolean} options.followScrollY Allows to follow the scroll on y-axis
		 */
		alert: function(options)
		{
			if (this.displayed == true) {
				return;
			}
			var opt = options || {};
			this._initTemplate(this._DEFAULT_ARROW, opt.msg);
	
			var btnNode = document.createElement('div');
			wink.addClass(btnNode, "w_button w_radius pp_popup_btn pp_popup_alert w_bg_light");
			var btnNodeValue = _('alertOk', this);
			if (wink.isSet(opt.btn))
			{
				btnNodeValue = opt.btn;
			}
			btnNode.innerHTML = btnNodeValue;
	
			if (wink.isSet(opt.callback)) {
				btnNode.onclick = wink.bind(function(e) {
					this._invokeCallback(opt.callback);
				}, this);
			}
			this._btnsNode.appendChild(btnNode);
			
			this._setPopupStyle("pp_type_alert", opt);
			this._show();
		},
		/**
		 * Opens a 2-buttons popup with a message. calls a callback function if asked, depending on the clicked button
		 * 
		 * @param {object} options The options object
		 * @param {string} options.msg The message to display
		 * @param {string} options.btnCancel The text to display in the "cancel" button. If nothing specified, the default translation is used
		 * @param {object} options.callbackCancel The callback to invoke when the user clicks on the 'cancel' button { context, method }
		 * @param {string} options.btnOk The text to display in the "ok" button. If nothing specified, the default translation is used
		 * @param {callback} options.callbackOk The callback to invoke when the user clicks on the 'ok' button { context, method }
		 * @param {boolean} options.borderRadius Indicates whether the popup must be displayed with border-radius style
		 * @param {integer} options.duration The duration of the display transition
		 * @param {boolean} options.followScrollY Allows to follow the scroll on y-axis
		 */
		confirm: function(options)
		{
			if (this.displayed == true) {
				return;
			}
			var opt = options || {};
			this._initTemplate(this._DEFAULT_ARROW, opt.msg);
			
			var btnCancelNode = document.createElement('div');
			var btnOkNode = document.createElement('div');
			wink.addClass(btnCancelNode, "w_button w_radius pp_popup_btn pp_popup_confirm w_bg_light");
			wink.addClass(btnOkNode, "w_button w_radius pp_popup_btn pp_popup_confirm w_bg_light");
			
			var btnCancelValue = _('confirmCancel', this);
			if (wink.isSet(opt.btnCancel))
			{
				btnCancelValue = opt.btnCancel;
			}
			var btnOkValue = _('confirmOk', this);
			if (wink.isSet(opt.btnOk))
			{
				btnOkValue = opt.btnOk;
			}
			
			btnCancelNode.innerHTML = btnCancelValue;
			btnOkNode.innerHTML = btnOkValue;
			
			if (wink.isSet(opt.callbackCancel)) {
				btnCancelNode.onclick = wink.bind(function(e) {
					this._invokeCallback(opt.callbackCancel);
				}, this);
			}
			if (wink.isSet(opt.callbackOk)) {
				btnOkNode.onclick = wink.bind(function(e) {
					this._invokeCallback(opt.callbackOk);
				}, this);
			}
			this._btnsNode.appendChild(btnCancelNode);
			this._btnsNode.appendChild(btnOkNode);
			
			this._setPopupStyle("pp_type_confirm", opt);
			this._show();
		},
		/**
		 * Opens a fully customizable popup
		 * 
		 * @param {object} options The options object
		 * @param {string} options.content The HTML code of the content
		 * @param {string} options.arrow The position of the arrow, if needed, values: "top", "bottom", "none" (default value)
		 * @param {integer|string} options.top The top position of the window
		 * @param {HTMLElement} options.targetNode The node pointed by the arrow (top is then ignored)
		 * @param {integer|string} options.arrowLeftPos The left-position of the arrow
		 * @param {boolean} options.borderRadius Indicates whether the popup must be displayed with border-radius style
		 * @param {integer} options.duration The duration of the display transition
		 * @param {boolean} options.followScrollY Allows to follow the scroll on y-axis
		 * @param {object} options.layerCallback The callback invoked when the user click on the layer, if not specified the default action is the popup hiding
		 */
		popup: function(options)
		{
			if (this.displayed == true) {
				return;
			}
			var opt = options || {};
			var arrowValue = this._DEFAULT_ARROW;
			var arrowLeftPos = "50px";
			
			if (wink.isSet(opt.arrowLeftPos)) {
				if (wink.isInteger(opt.arrowLeftPos)) {
					arrowLeftPos = opt.arrowLeftPos + "px";
				} else {
					arrowLeftPos = opt.arrowLeftPos;
				}
			}
			
			if (wink.isSet(opt.arrow)) {
				arrowValue 	= opt.arrow;
			}
			if (arrowValue != 'top' && arrowValue != 'bottom' && arrowValue != this._DEFAULT_ARROW) {
				wink.log('[Popup] popup() : bad arrow value (expected "top", "bottom" or "none")');
				return;
			}
			
			this._initTemplate(arrowValue, opt.content, arrowLeftPos);
			
			var topValue = "0px";
			if (wink.isSet(opt.targetNode)) {
				this._absolutePos = true;			
				if (arrowValue == "bottom") {
					topValue = opt.targetNode.getTopPosition() - this._domNode.offsetHeight - 10 + "px";
				} else if (arrowValue == "top") {
					topValue = opt.targetNode.getTopPosition() + opt.targetNode.offsetHeight + 10 + "px";
				}
			} else if (wink.isSet(opt.top)) {
				this._absolutePos = true;
				if (wink.isInteger(opt.top)) {
					topValue = opt.top + "px";
				} else {
					topValue = opt.top;
				}
			}
			this._domNode.style.top = topValue;
			
			this._setPopupStyle("pp_type_popup", opt);
			
			// for browsers that do not support css gradient
			if(!wink.has('css-gradient'))
			{
				this._arrowNode.style['border'+((arrowValue == 'top') ? 'Bottom' : 'Top')+'Color'] = window.getComputedStyle(this._domNode)['background-color'];
			}
			
			this._show();
			
			if (wink.isSet(opt.layerCallback)) {
				wink.layer.onclick = function() {
					if (!this._inTransition) {
						wink.call(opt.layerCallback);
					}
				};
			} else {
				wink.layer.onclick = this._layerHandler;
			}
		},
		/**
		 * Initialize the popup template
		 * 
		 * @param {string} arrowType The arrow type ("top", "bottom" or "none")
		 * @param {string} content The content
		 * @param {string} arrowLeftPos The left-position of the arrow
		 */
		_initTemplate: function(arrowType, content, arrowLeftPos)
		{
			this._absolutePos = false;
			this._followScrollY = false;
			this._popupClasses = "w_box w_window pp_popup pp_hidden w_bg_dark";
			this._contentNode.innerHTML = content;
			this._btnsNode.innerHTML = "";
			this._arrowNode.className = "pp_popup_arrow pp_" + arrowType;
			this._arrowNode.style.left = arrowLeftPos;
			this._domNode.style.top = "0px";
		},
		/**
		 * Set the popup style
		 * 
		 * @param {string} style The css class of the popup
		 * @param {object} opt The options
		 */
		_setPopupStyle: function(style, opt)
		{
			this._popupClasses += " " + style;
			if (opt.borderRadius !== false) {
				this._popupClasses += " w_radius";
			}
			this._domNode.className = this._popupClasses;
	
			if (wink.isSet(opt.followScrollY) && opt.followScrollY === true) {
				this._followScrollY = true;
			}
			
			this._updatePosition();
			
			var newOpDur = (opt.duration >= 0) ? opt.duration : 400;
			this._updateTransition(newOpDur, 0);
		},
		/**
		 * Updates the popup transitions
		 * 
		 * @param {integer} opacityDuration The opacity duration
		 * @param {integer} topDuration The top duration
		 */
		_updateTransition: function(opacityDuration, topDuration)
		{
			var trsChanged = false;
			if (wink.isInteger(opacityDuration) && this._transitions.opacity != opacityDuration) {
				this._transitions.opacity = opacityDuration;
				trsChanged = true;
			}
			if (wink.isInteger(topDuration) && this._transitions.top != topDuration) {
				this._transitions.top = topDuration;
				trsChanged = true;
			}
			
			if (trsChanged) {
				var dr = this._transitions.opacity + "ms," + this._transitions.top + 'ms';
				wink.fx.applyTransition(this._domNode, 'opacity, transform', dr, '1ms,1ms', 'default,default');
				// WORKAROUND : the second delay must be 1ms instead of 0ms for iOS2
			}
		},
		/**
		 * Updates the popup position
		 */
		_updatePosition: function()
		{
			var y = 0;
			if (this._absolutePos == false) {
				y += ((window.innerHeight - this._domNode.offsetHeight) / 2) + window.pageYOffset;
			} else if (this._followScrollY) {
				y += window.pageYOffset;
			}
			this._domNode.translate(0, y);
		},
		/**
		 * Initialize the DOM nodes
		 */
		_initDom: function()
		{
			this._domNode = document.createElement('div');
			this._contentNode = document.createElement('div');
			this._btnsNode = document.createElement('div');
			this._arrowNode	= document.createElement('div');
	
			wink.addClass(this._domNode, "pp_popup pp_hidden");
			wink.addClass(this._contentNode, "w_bloc");
			wink.addClass(this._arrowNode, "pp_popup_arrow none");
			
			this._domNode.appendChild(this._contentNode);
			this._domNode.appendChild(this._btnsNode);
			this._domNode.appendChild(this._arrowNode);
			
			this._domNode.style.opacity = 0;
			this._transitions.opacity = 0;
			this._transitions.top = 0;
		},
		/**
		 * Initialize listeners
		 */
		_initListeners: function() 
		{
			this._scrollHandler = wink.bind(this._updatePosition, this);
			this._postShowHandler = wink.bind(this._postShow, this);
			this._postHideHandler = wink.bind(this._postHide, this);
			this._layerHandler = wink.bind(this._hide, this);
		},
		/**
		 * Shows the popup
		 */
		_show: function()
		{
			if (this.displayed == true || this._inTransition == true) {
				return;
			}
			this._inTransition = true;
			
			if (this._followScrollY == true) {
				window.addEventListener("scroll", this._scrollHandler, false);
			}
			wink.removeClass(this._domNode, "pp_hidden");
			
			wink.layer.update();
			wink.layer.show();
			
			if(wink.has('css-transition'))
			{
				wink.fx.onTransitionEnd(this._domNode, this._postShowHandler);
			} else
			{
				this._postShowHandler();
			}
			this._domNode.style.opacity = 1;
		},
		/**
		 * Post show management
		 */
		_postShow: function()
		{
			if (this._followScrollY == true) {
				this._updateTransition(this._transitions.opacity, 200);
			}
			this.displayed = true;
			this._inTransition = false;
		},
		/**
		 * Hides the popup
		 */
		_hide: function()
		{
			if (this.displayed == false || this._inTransition == true) {
				return;
			}
			this._inTransition = true;
			
			if (this._followScrollY == true) {
				window.removeEventListener("scroll", this._scrollHandler, false);
			}
			
			wink.layer.hide();
			wink.layer.onclick = null;
			
			
			if(wink.has('css-transition'))
			{
				wink.fx.onTransitionEnd(this._domNode, this._postHideHandler);
			} else
			{
				this._postHideHandler();
			}
			this._domNode.style.opacity = 0;
		},
		/**
		 * Post hide management
		 */
		_postHide: function()
		{
			wink.addClass(this._domNode, "pp_hidden");
			
			this._contentNode.innerHTML = "";
			
			this.displayed = false;
			this._inTransition = false;
		},
		/**
		 * Invokes the given callback
		 * 
		 * @param {object} cb The callback to invoke
		 */
		_invokeCallback: function(cb)
		{
			if (this._inTransition == true || !wink.isSet(cb)) {
				return;
			}
			this._hide();
			wink.call(cb);
		}
	};
	
	return wink.ui.xy.Popup;
});

define(['../../../../../_amd/core', '../../js/popup'], function(wink)
{
	var popup = wink.ui.xy.Popup;
	popup.prototype.i18n.en_EN =
	{
		alertOk: 'ok',
		confirmOk: 'ok',
		confirmCancel: 'cancel'
	};
	
	return popup;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Implements a Scroller with inertia capability.
 * The Scroller allows to scroll vertically or horizontally a content ; it prevents the native scroll.
 * 
 * @compatibility Iphone OS2 (slow), Iphone OS3, Iphone OS4, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0
 * 
 * @author Sylvain LALANDE
 */
define(['../../../../_amd/core', '../../../../ux/inertia/js/inertia'], function(wink)
{
	/**
	 * @class Implements a Scroller with inertia capability.
	 * 
	 * The Scroller allows to scroll vertically or horizontally a content ; it prevents the native scroll.<br>
	 * It is associated with an element of the Web page as a target.<br>
	 * Its operation relies on the Inertia component which provides the information necessary for the production of a movement
	 * taking into account the speed of user movement.<br><br>
	 * The user should be warned about the fact that the size of the viewable area (Viewport) and the size of the scrollable area may be carefully parameterized (see "updateTargetSize" and "updateViewportSize" methods).
	 * Indeed, the size of these areas is useful for determining the edges of the component and whether scrolling is possible.<br>
	 * For this, it is possible to use the public method "autorefresh" to let the component handle changes of the content, which impacts the size of the scrollable area.
	 * Moreover, in order to manage the viewport size changes, this module can be eventually associated with the Window component.<br>
	 * Secondly, it is possible to configure the display of scrollbars, and especially it is possible to specify callbacks during the various stages of scrolling.
	 * <br>
	 * 
	 * @param {object} properties The properties object
	 * @param {string} properties.target
	 * @param {string} properties.direction The direction of the scrollable area - possible values are "x", "y", or "xy"
	 * @param {integer} [properties.friction=14] Value that determines the friction forces and influences the deceleration of the movement (value between 1 and 100)
	 * @param {boolean} [properties.captureFlow=true] indicates whether the capture event flow is used
	 * @param {object} [properties.callbacks] This identifies the callback functions invoked at different stages of the scroll. Callbacks names are : scrollerTouched, startScrolling, scrolling, endScrolling, startSliding, stopSliding 
	 * @param {object} [properties.scrollbars] The scrollbar options
	 * @param {boolean} [properties.scrollbars.active=true] Indicates whether the scrollbars are activated (false is recommended when the performance of the device are low)
	 * @param {integer} [properties.scrollbars.width=5] Width of the scrollbar
	 * @param {string} [properties.scrollbars.backgroundColor="rgba(0, 0, 0, 0.55)"] The background color of the scrollbar
	 * @param {string} [properties.scrollbars.borderColor="rgba(0, 0, 0, 0.2)"] The border color of the scrollbar
	 * @param {boolean} [properties.scrollbars.opacityTransition=true] Indicates whether an opacity transition must be set
	 * @param {integer} [properties.shiftOriginY] Apply a shift on y direction since the origin of the scrollable area (top)
	 * @param {integer} [properties.shiftLimitY] Apply a shift on y direction at the limit of the scrollable area (bottom)
	 * 
	 * @requires wink.ux.MovementTracker
	 * @requires wink.ux.Inertia
	 * 
	 * @example
	 * 
	 * var properties = {
	 *   target: "targetElementId",
	 *   direction: "y"
	 * };
	 * 
	 * scroller = new wink.ui.layout.Scroller(properties);
	 * 
	 * @see <a href="WINK_ROOT_URL/ui/layout/scroller/test/test_scroller_1.html" target="_blank">Test page</a>
	 * @see <a href="WINK_ROOT_URL/ui/layout/scroller/test/test_scroller_2.html" target="_blank">Test page (horizontal)</a>
	 * @see <a href="WINK_ROOT_URL/ui/layout/scroller/test/test_scroller_3.html" target="_blank">Test page (both directions)</a>
	 * @see <a href="WINK_ROOT_URL/ui/layout/scroller/test/test_scroller_4.html" target="_blank">Test page (classical layout)</a>
	 * @see <a href="WINK_ROOT_URL/ui/layout/scroller/test/test_scroller_5.html" target="_blank">Test page (nested)</a>
	 * @see <a href="WINK_ROOT_URL/ui/layout/scroller/test/test_scroller_6.html" target="_blank">Test page (tablet layout)</a>
	 * 
	 */
	wink.ui.layout.Scroller = function(properties) {
		/**
		 * Unique identifier
		 * 
		 * @property uId
		 * @type integer
		 */
		this.uId				= wink.getUId();
		
		this._target			= null;
		this._direction			= null;
		this._captureFlow 		= true;
		this._view 				= {
			x: 0,
			y: 0,
			viewportSizeX: 0,
			viewportSizeY: 0,
			sizeX: 0,
			sizeY: 0,
			limitX: 0,
			limitY: 0,
			shiftOriginY: 0,
			shiftLimitY: 0,
			scrollbars: {
				x: null,
				y: null,
				active: true,
				width: null,
				backgroundColor: null,
				borderColor: null,
				opacityTransition: null
			},
			autoRefreshOptions: {
				active: false,
				checkDelay: 1000,
				handler: null
			},
			timerSize: null
		};
		this._scroll 			= {
			canScrollX: false,
			canScrollY: false,
			mustScrollX: false,
			mustScrollY: false,
			friction: 14,
			acceleration: -0.00126,
			minSpeed: 0.05
		};
		this._transition 		= {
			duration: 0,
			delay: 0,
			func: "cubic-bezier(0.1, 0.2, 0.5, 1)",
			endHandler: null
		};
		this._callbacks			= {
			scrollerTouched: null,
			scrollerClicked: null,
			startScrolling: null,
			scrolling: null,
			endScrolling: null,
			startSliding: null,
			stopSliding: null
		};
		
		this._movementtracker 	= null;
		this._inertia			= null;
		
		this._activated 		= true;
		this._moveOutside		= false;
		this._animated			= false;
		this._selectionEvent	= null;
		
		this._updateContext(properties);
	};
	
	wink.ui.layout.Scroller.prototype = {
		_DIRECTION_X: "x",
		_DIRECTION_Y: "y",
		_DIRECTION_XY: "xy",
			
		/**
		 * Updates target sizes; To Call when target size change. Without parameters, it takes the offsets of the target DOM Node
		 * 
		 * @param {integer} [sizeX=target.offsetWidth] Target size on x
		 * @param {integer} [sizeY=target.offsetHeight] Target size on y
		 * @param {boolean} [recheck=false] Indicates whether there should be an audit delayed to ensure that the size of the content has not changed (useful in cases where the content is not completely loaded)
		 */
		updateTargetSize: function(sizeX, sizeY, recheck)
		{
			if (this._view.timerSize != null) {
				return;
			}
			if (recheck === true && this._view.timerSize == null) {
				this._refreshTargetSize(sizeX, sizeY, false);
				this._view.timerSize = wink.setTimeout(this, '_refreshTargetSize', this._view.autoRefreshOptions.checkDelay, sizeX, sizeY, recheck);
				return;
			}
			this._refreshTargetSize(sizeX, sizeY, recheck);
		},
		/**
		 * Updates viewport sizes ; To call when the viewport change. Without parameters, it takes the client sizes of the target parent
		 * 
		 * @param {integer} [viewportSizeX=target.parentNode.clientWidth] Size of the viewport on x
		 * @param {integer} [viewportSizeY=target.parentNode.clientHeight] Size of the viewport on y
		 */
		updateViewportSize: function(viewportSizeX, viewportSizeY)
		{
			var vsx = this._target.parentNode.clientWidth;
			var vsy = this._target.parentNode.clientHeight;
			if (wink.isSet(viewportSizeX)) {
				vsx = viewportSizeX;
			}
			if (wink.isSet(viewportSizeY)) {
				vsy = viewportSizeY;
			}
			
			if (this._view.viewportSizeX != vsx || this._view.viewportSizeY != vsy) {
				this._setViewportSize(vsx, vsy);
				this._refreshView();
			}
		},
		/**
		 * Updates the shift at bounds of the scrollable area
		 * 
		 * @param {integer} originY The new shift origin
		 * @param {integer} limitY The new shift limit
		 */
		updateShiftBounds: function(originY, limitY)
		{
			var hasChanged = false;
			if (originY != this._view.shiftOriginY) {
				this._view.shiftOriginY = originY;
				if (this._view.y == 0) {
					this._view.y = originY;
				}
				hasChanged = true;
			}
			if (limitY != this._view.shiftLimitY) {
				this._view.shiftLimitY = limitY;
				hasChanged = true;
			}
			if (hasChanged) {
				this._refreshView();
				this._backToBounds();
			}
		},
		/**
		 * Allows to let the component handle changes of the content, which impacts the size of the scrollable area
		 * 
		 * @param {object} options Options
		 * @param {boolean} [options.active=false] True to activate the auto-management, false otherwise
		 * @param {integer} [options.checkDelay=1000] The number of milliseconds before rechecking the size of the content, 0 to indicate that no further verification is necessary
		 */
		autoRefresh: function(options)
		{
			if (wink.isSet(options.checkDelay) && options.checkDelay >= 0) {
				this._view.autoRefreshOptions.checkDelay = options.checkDelay;
			}
			if (wink.isSet(options.active) && this._view.autoRefreshOptions.active !== options.active) {
				this._view.autoRefreshOptions.active = options.active;
				this._listenToContentChanges(options.active);
			}
		},
		/**
		 * Scroll explicitly to the given position
		 * 
		 * @param {number} x x targeted coordinates
		 * @param {number} y y targeted coordinates
		 * @param {integer} [duration=0] The duration of the scroll
		 */
		scrollTo: function(x, y, duration)
		{
			this._slideTo(x, y, { duration : duration });
		},
		/**
		 * Force explicitly the scroller to go back to bounds if necessary
		 */
		backToBounds: function()
		{
			this._backToBounds();
		},
		/**
		 * Returns the scroll position
		 * 
		 * @returns {object} the scroll position as { x, y }
		 */
		getPosition: function()
		{
			return { x: this._view.x, y: this._view.y };
		},
		/**
		 * Returns the view properties
		 * 
		 * @returns {object} the view properties
		 */
		getViewProperties: function()
		{
			return this._view;
		},
		/**
		 * Allows to enable scrolling (enabled by default)
		 */
		enable: function()
		{
			this._activated = true;
		},
		/**
		 * Allows to disable scrolling. 
		 * This can be useful if another component must take control, 
		 * or if you want to reactivate the default behavior when the touch occurs on certain elements (after the scrollerTouched callback).
		 */
		disable: function()
		{
			this._activated = false;
		},
		/**
		 * Destroys the component
		 */
		destroy: function()
		{
			this._removeListeners();
				
			this._movementtracker.destroy();
			delete this._movementtracker;
				
			this._inertia.destroy();
			delete this._inertia;
			
			this._removeScrollbars(true, true);
			
			for (var cn in this._callbacks)
			{
				this._callbacks[cn] = null;
			}
			
			if (this._view.timerSize != null) {
				clearTimeout(this._view.timerSize);
				this._view.timerSize = null;
			}
			
			wink.fx.apply(this._target, {
				"user-select": ""
			});
			wink.fx.applyTransition(this._target, "", "", "", "");
			wink.fx.setTransform(this._target, "");
			this._target = null;
		},
		/**
		 * Changes the context of the component ; a single Scroller can thus be used for multiple content (eg in order to optimize performance)
		 * 
		 * @param {object} properties The same object as to initialize the component
		 */
		changeContext: function(properties)
		{
			this.destroy();
			this._updateContext(properties);
		},
		/**
		 * Updates target sizes
		 * 
		 * @param {integer} sizeX target size on x
		 * @param {integer} sizeY target size on y
		 */
		_setTargetSize: function(sizeX, sizeY)
		{
			this._view.sizeX = sizeX;
			this._view.sizeY = sizeY;
		},
		/**
		 * Updates viewport sizes
		 * 
		 * @param {integer} viewportSizeX Size of the viewport on x
		 * @param {integer} viewportSizeY Size of the viewport on y
		 */
		_setViewportSize: function(viewportSizeX, viewportSizeY)
		{
			this._view.viewportSizeX = viewportSizeX;
			this._view.viewportSizeY = viewportSizeY;
		},
		/**
		 * Updates the context of the component
		 * 
		 * @param {object} properties Properties of the component initialization
		 */
		_updateContext: function(properties)
		{
			this._properties = properties;
			
			if (this._validateProperties() === false) return;
			
			this._initProperties();	
			this._initListeners();
	
			this._slideTo(0, 0);
			this._refreshView();
		},
		/**
		 * Validate the properties of the component
		 * @returns {boolean} True if the properties are valid, false otherwise
		 */
		_validateProperties: function() 
		{
return true;
},
		/**
		 * Raise the property error
		 */
		_raisePropertyError: function(property)
		{
			wink.log('[Scroller] Error: ' + property + ' missing or invalid');
		},
		/**
		 * Initialize datas with given properties
		 */
		_initProperties: function() 
		{
			this._target = $(this._properties.target);
			wink.fx.apply(this._target, {
				"user-select": "none"
			});
			
			if (wink.isSet(this._properties.shiftOriginY)) {
				this._view.shiftOriginY = this._properties.shiftOriginY;
			}
			if (wink.isSet(this._properties.shiftLimitY)) {
				this._view.shiftLimitY = this._properties.shiftLimitY;
			}
			
			this._setTargetSize(this._target.offsetWidth, this._target.offsetHeight);
			this._setViewportSize(this._target.parentNode.clientWidth, this._target.parentNode.clientHeight);
			
			this._direction = this._properties.direction;
			if (this._direction == this._DIRECTION_X || this._direction == this._DIRECTION_XY) {
				this._scroll.mustScrollX = true;
			}
			if (this._direction == this._DIRECTION_Y || this._direction == this._DIRECTION_XY) {
				this._scroll.mustScrollY = true;
			}
			if (this._properties.captureFlow === false) {
				this._captureFlow = false;
			}
			if (wink.isSet(this._properties.callbacks)) {
				for (var c in this._callbacks)
				{
					var cs = this._properties.callbacks[c];
					if (wink.isSet(cs))
					{
						this._callbacks[c] = cs;
					}
				}
			}
			if (wink.isSet(this._properties.scrollbars)) {
				for (var c in this._view.scrollbars)
				{
					var cs = this._properties.scrollbars[c];
					if (wink.isSet(cs))
					{
						this._view.scrollbars[c] = cs;
					}
				}
			}
			
			var f = this._properties.friction;
			if (wink.isSet(f) && wink.isInteger(f)) {
				this._scroll.friction = Math.max(Math.min(f, 100), 1);
				this._scroll.acceleration = Math.min(-0.00009 * this._scroll.friction, -0.0001);
				this._scroll.minSpeed = Math.sqrt(Math.abs(this._scroll.acceleration * 2));
			}
			
			delete this._properties;
		},
		/**
		 * Initialize listeners
		 */
		_initListeners: function() 
		{
			this._movementtracker = new wink.ux.MovementTracker({
				target: this._target, 
				captureFlow: this._captureFlow,
				preventStart: false,
				preventMove: false,
				trackThresholdX: 5,
				trackThresholdY: 5
			});
			wink.subscribe('/movementtracker/events/notrack', { context: this, method: '_handleTouchNotTracked' });
			wink.subscribe('/movementtracker/events/mvtbegin', { context: this, method: '_handleMovementBegin' });
			wink.subscribe('/movementtracker/events/mvtchanged', { context: this, method: '_handleMovementChanged' });
			
			this._inertia = new wink.ux.Inertia({ movementtracker: this._movementtracker });
			wink.subscribe('/inertia/events/inertiaComputed', { context: this, method: '_handleMovementStored' });
			
			this._transition.endHandler = wink.fx.onTransitionEnd(this._target, wink.bind(this._handleTransitionEnd, this), true);
		},
		/**
		 * Removes listeners
		 */
		_removeListeners: function()
		{
			wink.unsubscribe('/movementtracker/events/notrack', { context: this, method: '_handleTouchNotTracked' });
			wink.unsubscribe('/movementtracker/events/mvtbegin', { context: this, method: '_handleMovementBegin' });
			wink.unsubscribe('/movementtracker/events/mvtchanged', { context: this, method: '_handleMovementChanged' });
			wink.unsubscribe('/inertia/events/inertiaComputed', { context: this, method: '_handleMovementStored' });
			this._target.removeEventListener(wink.has.prop("transitionend"), this._transition.endHandler, false);
			this._transition.endHandler = null;
			this._listenToContentChanges(false);
		},
		/**
		 * Updates listening status on changes of the content
		 * 
		 * @param {boolean} listen Indicates whether the component must listen or not
		 */
		_listenToContentChanges: function(listen)
		{
			var eventName = 'DOMSubtreeModified';
			if (listen) {
				var recheck = (this._view.autoRefreshOptions.checkDelay > 0);
				this._view.autoRefreshOptions.handler = wink.bind(function() {
					var sx = this._target.offsetWidth;
					var sy = this._target.offsetHeight;
					if (this._view.sizeX != sx || this._view.sizeY != sy) {
						this.updateTargetSize(null, null, recheck);
					}
				}, this);
				this._target.addEventListener(eventName, this._view.autoRefreshOptions.handler, false);
			} else {
				if (this._view.autoRefreshOptions.handler != null) {
					this._target.removeEventListener(eventName, this._view.autoRefreshOptions.handler, false);
					this._view.autoRefreshOptions.handler = null;
				}
			}
		},
		/**
		 * Updates the target sizes if they have changed and refreshes the view impacted
		 * 
		 * @param {integer} [sizeX=target.offsetWidth] Target size on x
		 * @param {integer} [sizeY=target.offsetHeight] Target size on y
		 * @param {boolean} [recheck=false] Indicates whether there should be an audit delayed to ensure that the size of the content has not changed (useful in cases where the content is not completely loaded)
		 */
		_refreshTargetSize: function(sizeX, sizeY, recheck)
		{
			if (this._view.timerSize != null) {
				clearTimeout(this._view.timerSize);
			}
			
			var sx = this._target.offsetWidth;
			var sy = this._target.offsetHeight;
			if (wink.isSet(sizeX)) {
				sx = sizeX;
			}
			if (wink.isSet(sizeY)) {
				sy = sizeY;
			}
			
			this._view.timerSize = null;
			if (this._view.sizeX != sx || this._view.sizeY != sy) {
				this._setTargetSize(sx, sy);
				this._refreshView();
				
				if (recheck === true) {
					this._view.timerSize = wink.setTimeout(this, '_refreshTargetSize', this._view.autoRefreshOptions.checkDelay, sizeX, sizeY, recheck);
				}
			}
		},
		/**
		 * Refresh the view properties
		 */
		_refreshView: function() 
		{
			var csx = this._scroll.canScrollX;
			var csy = this._scroll.canScrollY;
			
			if (this._view.sizeX > this._view.viewportSizeX) {
				this._view.limitX = this._view.viewportSizeX - this._view.sizeX;
				this._scroll.canScrollX = true;
			} else {
				this._view.limitX = 0;
				this._scroll.canScrollX = false;
			}
			
			var shiftSizeY = this._view.sizeY - (this._view.shiftOriginY + this._view.shiftLimitY);

			if (shiftSizeY > this._view.viewportSizeY) {
				this._view.limitY = this._view.viewportSizeY - shiftSizeY;
				this._scroll.canScrollY = true;
			} else {
				this._view.limitY = 0;
				this._scroll.canScrollY = false;
			}
			
			if (!this._scroll.canScrollX) {
				this._movementtracker.updateTrackThresholdX(999);
			} else {
				this._movementtracker.updateTrackThresholdX(5);
			}
			if (!this._scroll.canScrollY) {
				this._movementtracker.updateTrackThresholdY(999);
			} else {
				this._movementtracker.updateTrackThresholdY(5);
			}
			
			if (csx != this._scroll.canScrollX) {
				if (this._view.x != 0) {
					this._view.x = 0;
					this._slideTo(null, null, { backToBound: true, duration: 1 });
				}
				
			}
			if (csy != this._scroll.canScrollY) {
				if (this._view.y != 0) {
					this._view.y = 0;
					this._slideTo(null, null, { backToBound: true, duration: 1 });
				}
			}
	
			if (this._view.scrollbars.active == true) {
				if (this._scroll.canScrollX && this._scroll.mustScrollX) {
					var sx = this._view.scrollbars.x;
					if (sx == null) {
						sx = this._view.scrollbars.x = new wink.ui.layout.Scroller.Scrollbar({
							direction: 'x',
							width: this._view.scrollbars.width,
							backgroundColor: this._view.scrollbars.backgroundColor,
							borderColor: this._view.scrollbars.borderColor,
							opacityTransition: this._view.scrollbars.opacityTransition
						});
					}
					sx.updateSize(this._view.viewportSizeX, this._view.sizeX);
					this._target.parentNode.appendChild(sx.getDomNode());
				} else {
					this._removeScrollbars(true, false);
				}
				if (this._scroll.canScrollY && this._scroll.mustScrollY) {
					var sy = this._view.scrollbars.y;
					if (sy == null) {
						sy = this._view.scrollbars.y = new wink.ui.layout.Scroller.Scrollbar({
							direction: 'y',
							width: this._view.scrollbars.width,
							backgroundColor: this._view.scrollbars.backgroundColor,
							borderColor: this._view.scrollbars.borderColor,
							opacityTransition: this._view.scrollbars.opacityTransition
						});
					}
					sy.updateSize(this._view.viewportSizeY, shiftSizeY);
					this._target.parentNode.appendChild(sy.getDomNode());
				} else {
					this._removeScrollbars(false, true);
				}
				
				var ctx = {
					timeout: null,
					hide: function(parentCtx) {
						clearTimeout(this.timeout);
						parentCtx._hideScrollbars();
					}
				};
				ctx.timeout = wink.setTimeout(ctx, 'hide', 1000, this);
			}
		},
		/**
		 * Remove the scrollbars
		 * 
		 * @param {boolean} x Indicates whether the scrollbar on x-axis must be removed
		 * @param {boolean} y Indicates whether the scrollbar on y-axis must be removed
		 */
		_removeScrollbars: function(x, y)
		{
			if (x == true && this._view.scrollbars.x != null) {
				this._target.parentNode.removeChild(this._view.scrollbars.x.getDomNode());
				this._view.scrollbars.x = null;
			}
			if (y == true && this._view.scrollbars.y != null) {
				this._target.parentNode.removeChild(this._view.scrollbars.y.getDomNode());
				this._view.scrollbars.y = null;
			}
		},
		/**
		 * Handle the touch events of the movement are not currently tracked
		 * 
		 * @param {object} publishedInfos MovementTracker infos
		 * @see wink.ux.MovementTracker
		 */
		_handleTouchNotTracked: function(publishedInfos)
		{
			var publisher = publishedInfos.publisher;
			if (publisher.uId != this._movementtracker.uId) {
				return;
			}
			
			var uxEvent = publishedInfos.uxEvent;
			if (uxEvent.type == "start")
			{
				if (wink.isSet(this._callbacks.scrollerTouched))
				{
					wink.call(this._callbacks.scrollerTouched, { uxEvent: uxEvent });
				}
			}
			
			if (this._activated == false) {
				return;
			}
			
			uxEvent.preventDefault();
			uxEvent.stopPropagation();
			
			if (uxEvent.type == "start")
			{
				this._selectionEvent = null;
				if (this._animated == false)
				{
					this._selectionEvent = uxEvent;
				}
				
				var position = this._getInstantPosition();
				if (!this._isAtPosition(position.x, position.y)) {
					if (wink.isSet(this._callbacks.stopSliding))
					{
						wink.call(this._callbacks.stopSliding, { });
					}
					
					this._slideTo(position.x, position.y);
				}
			}
			else if (uxEvent.type == "end")
			{
				this._backToBounds();
				this._hideScrollbars();
				if (wink.isSet(this._selectionEvent))
				{
					var d = 0;
					if (!this._scroll.canScrollX && !this._scroll.canScrollY) {
						var p1 = this._selectionEvent,
							p2 = uxEvent,
							dx = p2.x - p1.x,
							dy = p2.y - p1.y;
						d = Math.sqrt((dx * dx) + (dy * dy));
					}

					if (d < 5) {
						if (wink.isSet(this._callbacks.scrollerClicked))
						{
							wink.call(this._callbacks.scrollerClicked, { uxEvent: uxEvent });
						}
						this._handleSelection(uxEvent);
					}
				}
			}
		},
		/**
		 * Handle the Scroll beginning.
		 * 
		 * @param {object} publishedInfos MovementTracker infos
		 * @see wink.ux.MovementTracker
		 */
		_handleMovementBegin: function(publishedInfos) 
		{
			var publisher = publishedInfos.publisher;
			if (publisher.uId != this._movementtracker.uId) {
				return;
			}
			if (this._activated == false) {
				return;
			}
			var uxEvent = publishedInfos.uxEvent;
			
			uxEvent.preventDefault();
			uxEvent.stopPropagation();
			
			if (wink.isSet(this._callbacks.startScrolling))
			{
				wink.call(this._callbacks.startScrolling, { uxEvent: uxEvent });
			}
			if (wink.isSet(this._view.autoRefreshOptions.handler)) {
				this._view.autoRefreshOptions.handler();
			}
		},
		/**
		 * Propagate a scroller touch to others listeners if no drag occurs.
		 * 
		 * @param {wink.ux.Event} uxEvent The event to propagate
		 */
		_handleSelection: function(uxEvent)
		{
			var properTarget = this._getProperEventTarget(uxEvent),
				tn = properTarget.tagName,
				type = properTarget.type,
				tnlower, isInputText, isText;

			if (wink.isSet(tn)) {
				tnlower = tn.toLowerCase();
				isInputText = (tnlower == 'input' && type) ? (type.toLowerCase() == 'text') : false;
				isText = isInputText || (tnlower == 'textarea');
			}
			if (isText || (tnlower == 'select')) {
				properTarget.focus();
			}
			
			if (wink.has("touch")) {
				uxEvent.dispatch(properTarget, "click");
			}
		},
		/**
		 * @param {wink.ux.Event} uxEvent The event
		 * @returns {HTMLElement} the proper target of the given event
		 */
		_getProperEventTarget: function(uxEvent)
		{
			var properTarget = uxEvent.target;
			if (uxEvent.target.nodeType == 3) {
				properTarget = properTarget.parentNode;
			}
			return properTarget;
		},
		/**
		 * Handle the Scroll updates.
		 * 
		 * @param {object} publishedInfos MovementTracker infos
		 * @see wink.ux.MovementTracker
		 */
		_handleMovementChanged: function(publishedInfos) 
		{
			var publisher = publishedInfos.publisher;
			if (publisher.uId != this._movementtracker.uId) {
				return;
			}
			if (this._activated == false) {
				return;
			}
			
			publishedInfos.uxEvent.stopPropagation();
			
			var movement = publishedInfos.movement;
			
			var beforeLastPoint = movement.pointStatement[movement.pointStatement.length - 2];
			var lastPoint = movement.pointStatement[movement.pointStatement.length - 1];
			
			var dx = lastPoint.x - beforeLastPoint.x;
			var dy = lastPoint.y - beforeLastPoint.y;
			var boundFriction = 3;
	
			var ny = this._view.y;
			if (ny > 0) {
				ny -= this._view.shiftOriginY;
			} else if (ny < this._view.limitY) {
				ny += this._view.shiftLimitY;
			}
			
			this._moveOutside = false;
			var boundsInfos = this._getBoundsInfos(this._view.x, ny);
			if (boundsInfos.outsideOfBoundsX) {
				if ( (boundsInfos.directionX > 0 && lastPoint.directionX > 0)
					|| (boundsInfos.directionX < 0 && lastPoint.directionX < 0) ) {
					dx /= boundFriction;
					this._moveOutside = true;
				}
			}
			if (boundsInfos.outsideOfBoundsY) {
				if ( (boundsInfos.directionY > 0 && lastPoint.directionY > 0)
					|| (boundsInfos.directionY < 0 && lastPoint.directionY < 0) ) {
					dy /= boundFriction;
					this._moveOutside = true;
				}
			}
			
			var destX = this._view.x + wink.math.round(dx, 0);
			var destY = this._view.y + wink.math.round(dy, 0);
			this._slideTo(destX, destY);
			
			if (wink.isSet(this._callbacks.scrolling))
			{
				wink.call(this._callbacks.scrolling, { uxEvent: publishedInfos.uxEvent });
			}
		},
		/**
		 * Handle the Scroll end.
		 * 
		 * @param {object} publishedInfos Inertia infos
		 * @see wink.ux.Inertia
		 */
		_handleMovementStored: function(publishedInfos)
		{
			var publisher = publishedInfos.publisher;
			if (publisher.uId != this._inertia.uId) {
				return;
			}
			if (this._activated == false) {
				return;
			}
			if (wink.isSet(this._callbacks.endScrolling))
			{
				wink.call(this._callbacks.endScrolling, { uxEvent: publishedInfos.uxEvent });
			}
			
			var movement = publishedInfos.movement;
			this._interpretInertia(movement);
			
			if (!this._moveOutside && !this._isAtPosition(movement.destX, movement.destY)) {
				this._slideTo(movement.destX, movement.destY, { duration: movement.duration, speed: movement.speed });
			} else {
				this._backToBounds();
				this._hideScrollbars();
			}
		},
		/**
		 * Interpret inertia datas to propel the target in the right place.
		 * 
		 * @param {object} movement The movement that carry inertia datas
		 */
		_interpretInertia: function(movement)
		{
			var onX = this._scroll.canScrollX && this._scroll.mustScrollX;
			var onY = this._scroll.canScrollY && this._scroll.mustScrollY;
			var minDuration = 1;
			var maxDistToBoundX = wink.math.round(this._view.viewportSizeX / 3, 1);
			var maxDistToBoundY = wink.math.round(this._view.viewportSizeY / 3, 1);
			var acc = this._scroll.acceleration;
			var minSpeed = this._scroll.minSpeed;
			
			var sx = movement.speedX, sy = movement.speedY;
			
			sx = sx < minSpeed ? 0 : sx;
			sy = sy < minSpeed ? 0 : sy;
			
			var dx = (-(sx * sx) / (2 * acc)); // (-v0 * v0) / 2a
			var dy = (-(sy * sy) / (2 * acc)); // (-v0 * v0) / 2a
			
			var dtx = -sx / acc; // -v0 / a
			var dty = -sy / acc; // -v0 / a
			
			if (!onX) {
				dx = dtx = 0;
			}
			
			if (!onY) {
				dy = dty = 0;
			}
			
			var destX = this._view.x + (dx * movement.directionX);
			var destY = this._view.y + (dy * movement.directionY);
			
			var boundsInfos = this._getBoundsInfos(destX, destY);
			if (boundsInfos.outsideOfBoundsX && boundsInfos.distanceToBoundX > maxDistToBoundX) {
				var distToMax = boundsInfos.distanceToBoundX - maxDistToBoundX;
				var ratio = distToMax / dx;
				dx -= distToMax;
				dtx -= (ratio * dtx);
			}
			if (boundsInfos.outsideOfBoundsY && boundsInfos.distanceToBoundY > maxDistToBoundY) {
				var distToMax = boundsInfos.distanceToBoundY - maxDistToBoundY;
				var ratio = distToMax / dy;
				dy -= distToMax;
				dty -= (ratio * dty);
			}
			
			movement.destX = this._view.x + wink.math.round(dx * movement.directionX, 0);
			movement.destY = this._view.y + wink.math.round(dy * movement.directionY, 0);
			dtx = Math.max(wink.math.round(dtx, 0), minDuration);
			dty = Math.max(wink.math.round(dty, 0), minDuration);
			
			movement.duration = dty;
			movement.speed = wink.math.round(sy, 3);
			if ((onX && !onY) || (onX && onY && dtx > dty)) {
				movement.duration = dtx;
				movement.speed = wink.math.round(sx, 3);
			}
		},
		/**
		 * At the end of a movement, go back to bounds if necessary.
		 */
		_handleTransitionEnd: function() 
		{
			if (this._animated == true)
			{
				this._animated = false;
				if (wink.isSet(this._callbacks.stopSliding)) {
					wink.call(this._callbacks.stopSliding, { });
				}
				var dl = 0;
				if (this._backToBounds()) {
					dl = 350;
				}
				this._hideScrollbars(dl);
			}
		},
		/**
		 * Go back to bound if necessary.
		 */
		_backToBounds: function()
		{
			var boundsInfos = this._getBoundsInfos(this._view.x, this._view.y);
			if (boundsInfos.outsideOfBounds) {
				var targetX = this._view.x;
				var targetY = this._view.y;
				
				if (boundsInfos.outsideOfBoundsX) {
					targetX = boundsInfos.positionOfBoundX;
				}
				if (boundsInfos.outsideOfBoundsY) {
					targetY = boundsInfos.positionOfBoundY;
				}
				this._slideTo(targetX, targetY, { backToBound: true });
				return true;
			}
			return false;
		},
		/**
		 * Get bounds informations that allows caller to determine if the target is out of bounds,
		 * the direction associated, the distance to the bound and the position to reach.
		 * 
		 * @param {integer} nextX The next position on x
		 * @param {integer} nextY The next position on y
		 */
		_getBoundsInfos: function(nextX, nextY)
		{
			var boundsInfos = {
				outsideOfBoundsX: false,
				outsideOfBoundsY: false,
				distanceToBoundX: 0,
				distanceToBoundY: 0
			};
			
			if (nextX > 0 || nextX < this._view.limitX) {
				boundsInfos.outsideOfBoundsX = true;
				if (nextX > 0) {
					boundsInfos.distanceToBoundX = Math.abs(nextX);
					boundsInfos.directionX = 1;
					boundsInfos.positionOfBoundX = 0;
				} else {
					boundsInfos.distanceToBoundX = Math.abs(nextX - this._view.limitX);
					boundsInfos.directionX = -1;
					boundsInfos.positionOfBoundX = this._view.limitX;
				}
			}
			if (nextY > 0 || nextY < this._view.limitY) {
				boundsInfos.outsideOfBoundsY = true;
				if (nextY > 0) {
					boundsInfos.distanceToBoundY = Math.abs(nextY);
					boundsInfos.directionY = 1;
					boundsInfos.positionOfBoundY = 0;
				} else {
					boundsInfos.distanceToBoundY = Math.abs(nextY - this._view.limitY);
					boundsInfos.directionY = -1;
					boundsInfos.positionOfBoundY = this._view.limitY;
				}
			}
			boundsInfos.outsideOfBounds = boundsInfos.outsideOfBoundsX || boundsInfos.outsideOfBoundsY;
			
			return boundsInfos;
		},
		/**
		 * Determines if the target has currently the given position.
		 * 
		 * @param {integer} x x coordinates
		 * @param {integer} y y coordinates
		 */
		_isAtPosition: function(x, y)
		{
			if (this._view.x == x && this._view.y == y) {
				return true;
			}
			return false;
		},
		/**
		 * Slide nicely to the given position.
		 * 
		 * @param {integer} x x targeted coordinates
		 * @param {integer} y y targeted coordinates
		 * @param {object} [options] Options
		 * @param {integer} [options.duration=0] the duration of the slide
		 * @param {integer} [options.speed=0] the speed of the slide
		 * @param {boolean} [options.backToBound=false] Indicates whether the sliding takes back to the bound
		 */
		_slideTo: function(x, y, options) 
		{
			var dt = (options && options.duration) ? options.duration : 0;
			var s = (options && options.speed) ? options.speed : 0;
			var btb = (options && options.backToBound) ? options.backToBound : false;
			
			this._transition.duration = dt;
			if (dt >= 1) {
				this._animated = true;
				if (wink.isSet(this._callbacks.startSliding))
				{
					wink.call(this._callbacks.startSliding, { duration: dt, speed: s });
				}
			} else {
				this._animated = false;
			}
			
			var d = dt + "ms";
			var dl = this._transition.delay + "ms";
			var tr = this._transition.func;
			if (btb) {
				d = "350ms";
				tr = "cubic-bezier(0.3, 0.1, 1.0, 0.5)";
			}
			
			wink.fx.applyTransformTransition(this._target, d, dl, tr);
			
			if (this._view.scrollbars.active == true) {
				if (this._view.scrollbars.x != null) {
					this._view.scrollbars.x.applyTransition(d, dl, tr);
				}
				if (this._view.scrollbars.y != null) {
					this._view.scrollbars.y.applyTransition(d, dl, tr);
				}
			}
			this._translateTo(x, y);
		},
		/**
		 * Get the instant position of the target. May be different from current position
		 * because of transitions.
		 * 
		 * @returns {object} the current position
		 */
		_getInstantPosition: function() 
		{
			var position = wink.fx.getTransformPosition(this._target);
			position.y = position.y + this._view.shiftOriginY;
			return position;
		},
		/**
		 * Apply translation to the target.
		 * 
		 * @param {integer} x x targeted coordinates
		 * @param {integer} y y targeted coordinates
		 */
		_translateTo: function(x, y)
		{
			var targetX = this._view.x;
			var targetY = this._view.y;
	
			if (wink.isSet(x) && this._scroll.canScrollX && this._scroll.mustScrollX) {
				targetX = x;
			}
			if (wink.isSet(y) && this._scroll.canScrollY && this._scroll.mustScrollY) {
				targetY = y;
			}
			
			this._view.x = parseInt(targetX);
			this._view.y = parseInt(targetY);
			this._target.translate(this._view.x, this._view.y - this._view.shiftOriginY);

			if (this._view.scrollbars.active == true) {
				if (this._view.scrollbars.x != null) {
					this._view.scrollbars.x.updatePosition(this._view.x, this._view.y);
				}
				if (this._view.scrollbars.y != null) {
					this._view.scrollbars.y.updatePosition(this._view.x, this._view.y);
				}
			}
		},
		/**
		 * Hides scrollbars.
		 * 
		 * @param {integer} [delay=300] The delay before hiding (only when opacity transition is active)
		 */
		_hideScrollbars: function(delay)
		{
			if (this._view.scrollbars.active == true) {
				if (this._view.scrollbars.x != null) {
					this._view.scrollbars.x.hide(delay);
				}
				if (this._view.scrollbars.y != null) {
					this._view.scrollbars.y.hide(delay);
				}
			}
		}
	};
	
	/**
	 * @class Implements a Scrollbar for the Scroller.
	 * 
	 * @param {object} properties The properties object
	 * @param {direction} properties.direction The direction : possible values are "x" or "y"
	 * @param {integer} [properties.width=5] width of the scrollbar
	 * @param {string} [properties.backgroundColor="rgba(0, 0, 0, 0.55)"] The background color of the scrollbar
	 * @param {string} [properties.borderColor="rgba(0, 0, 0, 0.2)"] The border color of the scrollbar
	 * @param {boolean} [properties.opacityTransition=true] A boolean that indicates whether an opcaity transition must be set
	 */
	wink.ui.layout.Scroller.Scrollbar = function(properties) {
		/**
		 * Unique identifier
		 * 
		 * @property uId
		 * @type integer
		 */
		this.uId				= wink.getUId();
		this._properties		= properties;
		
		this._direction			= null;
		this._backgroundColor	= "rgba(0, 0, 0, 0.55)";
		this._borderColor		= "rgba(0, 0, 0, 0.2)";
		this._opacityTransition	= true;
		this._view				= {
			x: 0,
			y: 0,
			viewportSize: 0,
			contentSize: 0,
			size: 0,
			width: 0,
			ratioSize: 0,
			ratioPosition: 0,
			ratioBounce: 0,
			borderSize: 1,
			availableSpace: 0,
			showed: true
		};
		this._transition		= {
			duration: '',
			delay: '',
			func: ''
		};
		
		this._domNode			= null;
		this._canvasNode		= null;
		this._ctx				= null;
		this._firstHide			= true;
		
		if (this._validateProperties() === false) return;
		
		this._initProperties();
		this._initDom();
	};
	
	wink.ui.layout.Scroller.Scrollbar.prototype = {
		_DEFAULT_WIDTH: 5,
			
		/**
		 * @returns {HTMLElement} The DOM node of the component
		 */
		getDomNode: function()
		{
			return this._domNode;
		},
		/**
		 * Updates the size of the scrollbar
		 * 
		 * @param {integer} viewportSize The viewport size
		 * @param {integer} contentSize The content size
		 */
		updateSize: function(viewportSize, contentSize)
		{
			var sizeX = 0, sizeY = 0;
			
			this._view.viewportSize = viewportSize - (this._view.borderSize * 2);
			this._view.contentSize = contentSize;
			
			if (viewportSize < contentSize) {
				this._view.ratioSize = (this._view.viewportSize / this._view.contentSize);
				var sizeAdapter = 0.11 * (this._view.contentSize / this._view.viewportSize) + 0.89; // linear function
				this._view.ratioSize *= sizeAdapter;
			} else {
				this._view.ratioSize = 1;
			}
			sizeX = sizeY = this._view.ratioSize * this._view.viewportSize;
			
			if (this._direction == 'y') {
				sizeX = this._view.width;
			} else {
				sizeY = this._view.width;
			}
			this._resize(sizeX, sizeY);
			
			// ratio position = (available space for scrollbar) / (size of the hidden area)
			this._view.availableSpace = (this._view.viewportSize - this._view.size);
			this._view.ratioPosition = this._view.availableSpace / (this._view.contentSize - this._view.viewportSize);
			this._view.ratioBounce = 0.00100 * this._view.contentSize + 3; // linear function
		},
		/**
		 * Updates the position of the scrollbar
		 * 
		 * @param {number} viewX The position of the viewport on x-axis
		 * @param {number} viewY The position of the viewport on y-axis
		 */
		updatePosition: function(viewX, viewY)
		{
			if (this._view.showed == false) {
				this.show();
			}
			
			var x = 0, y = 0;
			
			var avs = this._view.availableSpace;
			
			if (this._direction == 'y') {
				y = -viewY * this._view.ratioPosition;
				
				if (y < 0 || y > avs) {
					if (y < 0) {
						y = Math.max(y + (y * this._view.ratioBounce), -this._view.size + 5);
					} else {
						y = Math.min(y + ((y - avs) * this._view.ratioBounce), this._view.viewportSize - 5);
					}
				}
			} else {
				x = -viewX * this._view.ratioPosition;
				
				if (x < 0 || x > avs) {
					if (x < 0) {
						x = Math.max(x + (x * this._view.ratioBounce), -this._view.size + 5);
					} else {
						x = Math.min(x + ((x - avs) * this._view.ratioBounce), this._view.viewportSize - 5);
					}
				}
			}
			this._translateTo(x, y);
		},
		/**
		 * Shows the scrollbar
		 */
		show: function()
		{
			if (this._view.showed == true) {
				return;
			}
			this._view.showed = true;
			wink.fx.applyTransition(this._canvasNode, 'opacity', '0ms', '0ms', 'default');
			this._canvasNode.style.opacity = 1;
		},
		/**
		 * Hides the scrollbar
		 * 
		 * @param {integer} [delay=300] The delay before hiding (only when opacity transition is active)
		 */
		hide: function(delay)
		{
			if (this._view.showed == false) {
				return;
			}
			this._view.showed = false;
			if (this._opacityTransition == true) {
				var dl = 300; 
				if (wink.isSet(delay)) {
					dl += delay;
				}
				if (this._firstHide) {
					this._firstHide = false;
					dl += 600;
				}
				dl = dl + 'ms';
				wink.fx.applyTransition(this._canvasNode, 'opacity', '200ms', dl, 'default');
			}
			this._canvasNode.style.opacity = 0;
		},
		/**
		 * Applies a transition on the scrollbar
		 * 
		 * @param {string} duration The duration of the transition
		 * @param {string} delay The delay of the transition
		 * @param {string} func The function of the transition
		 */
		applyTransition: function(duration, delay, func)
		{
			var diff = false;
			diff = diff || duration != this._transition.duration;
			diff = diff || delay != this._transition.delay;
			diff = diff || func != this._transition.func;
			
			if (!diff) {
				return;
			}
			this._transition.duration = duration;		
			this._transition.delay = delay;
			this._transition.func = func;
			
			wink.fx.applyTransformTransition(this._domNode, duration, delay, func);
		},
		/**
		 * Validate the properties of the component
		 * @returns {boolean} True if the properties are valid, false otherwise
		 */
		_validateProperties: function() 
		{
return true;
},
		/**
		 * Raise the property error
		 */
		_raisePropertyError: function(property)
		{
			wink.log('[Scrollbar] Error: ' + property + ' missing or invalid');
		},
		/**
		 * Initialize datas with given properties
		 */
		_initProperties: function() 
		{
			this._direction = this._properties.direction;
			
			this._view.width = this._DEFAULT_WIDTH;
			if (wink.isSet(this._properties.width)) {
				this._view.width = this._properties.width;
			}
			if (wink.isSet(this._properties.borderColor)) {
				this._borderColor = this._properties.borderColor;
			}
			if (wink.isSet(this._properties.backgroundColor)) {
				this._backgroundColor = this._properties.backgroundColor;
			}
			if (wink.isSet(this._properties.opacityTransition)) {
				this._opacityTransition = this._properties.opacityTransition;
			}
		},
		/**
		 * Initialize the DOM nodes
		 */
		_initDom: function()
		{
			var dn = this._domNode = document.createElement('div');
			var cn = this._canvasNode = document.createElement('canvas');
			this._ctx = cn.getContext('2d');
			dn.appendChild(cn);
			
			var st = {
				position: "absolute",
				"pointer-events": "none",
				opacity: 1
			};
			
			if (this._direction == 'y') {
				st.top = "0px";
				st.right = "1px";
			} else {
				st.bottom = "2px";
				st.left = "0px";
			}
			
			wink.fx.apply(dn, st);
			wink.fx.apply(cn, {
				position: "absolute"
			});
			cn.translate(0, 0);
		},
		/**
		 * Draws the scrollbar
		 */
		_drawbar: function()
		{
			var v = (this._direction == 'y');
			var c = this._ctx;
			var x = v ? this._view.width / 2 : this._view.width / 2 + 1; 
			var y = v ? this._view.width / 2 + 1 : this._view.width / 2;
			var w = v ? this._view.width : this._view.size - 1;
			var h = v ? this._view.size - 1 : this._view.width;
			var half = v ? w / 2 : h / 2;
			
			c.fillStyle = this._backgroundColor;
			c.strokeStyle = this._borderColor;
			c.lineWidth = this._view.borderSize;
			
			c.beginPath();
			if (v) {
				c.arc(x, y, half, Math.PI, 0, false);
				c.lineTo(x + half, h - half);
				c.arc(x, h - half, half, 0, Math.PI, false);
				c.lineTo(x - half, y);
			} else {
				c.arc(x, y, half, Math.PI / 2, 3 * Math.PI / 2, false);
				c.lineTo(w - half, y - half);
				c.arc(w - half, y, half, 3 * Math.PI / 2, Math.PI / 2, false);
				c.lineTo(x, y + half);
			}
			c.closePath();
			c.fill();
			c.stroke();
		},
		/**
		 * Resizes the scrollbar
		 * 
		 * @param {integer} sizeX Size on x-axis
		 * @param {integer} sizeY Size on y-axis
		 */
		_resize: function(sizeX, sizeY)
		{
			if (this._direction == 'y') {
				this._view.size = sizeY;
			} else {
				this._view.size = sizeX;
			}
			
			var cn = this._canvasNode;
			this._ctx.clearRect(0, 0, cn.width, cn.height);
			
			wink.fx.apply(this._domNode, {
				width: (sizeX + 1) + "px",
				height: sizeY + "px"
			});
			cn.width = sizeX;
			cn.height = sizeY;
			
			this._drawbar();
		},
		/**
		 * Apply translation to the target.
		 * 
		 * @param {integer} x x targeted coordinates
		 * @param {integer} y y targeted coordinates
		 */
		_translateTo: function(x, y)
		{
			this._view.x = x;
			this._view.y = y;
			this._domNode.translate(x, y);
		}
	};
	
	return wink.ui.layout.Scroller;
});

/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/**
 * @fileOverview Implement a spinner
 * 
 * @compatibility Iphone OS2, Iphone OS3, Iphone OS4, Android 1.5, Android 2.1, Android 2.2, Android 2.3, Android 3.0, Android 3.1, BlackBerry 6, BlackBerry 7, Bada 1.0
 * @author Frederic MOULIS
 */

define(['../../../../_amd/core'], function(wink)
{
	/**
	 * @class Implement a spinner.<br>
	 * As spinner images (dark background and light background) are base 64 encoded and included in this class as _DARK_BG_IMAGE
	 * and _LIGHT_BG_IMAGE, you should remove the one you don't need.
	 * <br><br>
	 * To instantiate the spinner, you should specify the image you want to see.<br>
	 * It can be "light","dark" or "personal".<br>
	 * If you choose "personal", you must specify the image yourself in the properties (adding a "backgroundImage" to the properties). In this case, the background image should be of that form: "data:image/[gif/png/jpeg];base64,[base64 image content]"<br>
	 * Use the 'getDomNode' method to add it to your page.
	 * 
	 * @param {object} properties The properties object
	 * @param {string} properties.background The type of background (either "dark", "light" or "personal")
	 * @param {string} [properties.backgroundImage] The spinner image (in case the background was declared as "personal")
	 * 
	 * @example
	 * 
	 * var properties = 
	 * {
	 * 	background: "light"
	 * }
	 * 
	 * var spinner = new wink.ui.xy.Spinner(properties);
	 * 
	 * $('output').appendChild(spinner.getDomNode());
	 * 
	 * @see <a href="WINK_ROOT_URL/ui/xy/spinner/test/test_spinner.html" target="_blank">Test page</a>
	 */
	wink.ui.xy.Spinner = function(properties)
	{
		/**
		 * Unique identifier
		 * 
		 * @property
		 * @type integer
		 */
		this.uId = wink.getUId();
		
		/**
		 * The size of the spinner (in pixels)
		 * 
		 * @property
		 * @type integer
		 */
		this.size = null;
		
		/**
		 * The type of background (either "dark", "light" or "personal")
		 * 
		 * @property
		 * @type string
		 */
		this.background = null;
		
		/**
		 * The spinner image (in case the background was declared as "personal")
		 * 
		 * @property
		 * @type string
		 */
		this.backgroundImage = null;
		
		
		this._domNode = null;
			
		wink.mixin(this, properties);
			
		if (this._validateProperties() === false)return;
		
		this._initDom();
	};
	
	wink.ui.xy.Spinner.prototype = 
	{
		_DARK_BG: 'dark',
		_LIGHT_BG: 'light',
		_PERSONAL_BG: 'personal',
		
		_DARK_BG_IMAGE: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABRZJREFUaN7dmU1sVUUYhp+3lD9pSoGCJbSEnxsBYUFkY0ATiL8LF5q4wYQoG7eGlSvjgp0bdUFiwqIadwZNjCwwsiCICCZIiVghQrmBmlap/NSKhbZ5XTA3np7OuX+co8iX3OSemTNn5p33e7+Z+QYKNNu9/sd6+T+a7e2eaS8W1V9LgVi2R8o23xdAbHfbPmp7wHaf7cdzZHCB7fW2N9pea3t2kYy8AXSH/+3AB7bbcwAxC+gBZoWiecCyIoF0p57bgd05ELIkAaJihTJyIsaS7e57YGM2sDRSdatIIL3AYKT8rXtgY0WkbAL4vTAgkkaBvZGqZyLCL9cjcGBBpGpI0lSh4VfSV8DJSNU7jQLJYONPSX/8W+tIjJVu27sb0MaSDEEP3/M6YrvL9pu237X9mu22DFb6gU8zhF8tHJcT4TYm8BuSxrNCdBhfyfZK23OmjSn18n6glJqdfZKORT7cDhwNIXgaW5J6ba8CLqXqVksqBza6UnVTwM8xbdheGNwwOfi/JJ3Pcq1S6rkL2BsYKkWE/35k8tpDfRl4CTgSfjtCGZE1A+BqGoTt+aHf1SkQAPOrMfIF0FbFNQ4FhsYSbQ4CjybeeUXSiTqi1apE0biki6mVfgWwuMpnpiT9kAVkcxByNTBjwEeSDiRcrCLyk7VARELvVNDGVChfGjxhVjUQwGVJN6NAwofagJeBV2uM5QKwJ8lODvutUtplMqLaDDdsiUSkMUkfAjuBviofLAXAednSGiDGgH5Jw7GA0FJl4RuWtAfY02xsz8nuABckXZB0p+kFUVKfpJ3AvjArSevLccBjER38Iqm/HvdVg37cBjwfgkGfpDyBVL7fFkBca3S/9UCYwkxsAFZm7ESnbeiAU5JGCk5czA0L69w6Xh+VNCrbrwNPNtjXe5JOFQRiMfBIg82utjQBAuC5AgnpaiZ0tzwoGmkBvm6i3ZcFjmmwiTZXk2LfUEeD+1HstyRde7DCbwMzNQ/YEvZEA5IGcmaiA+gAJoFhSZO5A7G9DXiau1nAiu3PC0wAkcwNTwJlSXVpprWODtaEXe6iSPUaIC9WOiJjK4Xk3zlJN5oCYnsR8ELq9Pdf2Dxgs+2RsAserwtI0METwFM1OhgCjuUcdjurnE47gU7bZWAwrR9F3GhXSgdpGwcOS/omESq3hLorkq7UqYnOMDiAi5ImQnl3OM9Xc/tJ4GzS3dJA3q4B4hRwMEmv7V1MvwL4pBaYAGJbouimpCOJ+tZwAq22XZlMpqlaI/4Ys4EAYCg1oK3MvMfoAa6E+p6ExvoTADtTbRbaXlvJpAS3OWd7MADqqCWL1ojfL088Xw8A+jNW38cyXK9ySNqRKH/Y9mfhtDcRabfO9uWKi1XyB0BfYLCUmuixakA+DiJfBFySdLgKtTsiW4jbwI+VgUfa9AA/AZeBdUzP/c4GNgGnI8ftEWAkZC87wmSVM4FIug4cqEOoy4CNkarjkm6H/7HoMyf0M2H7fBh40lbaHkjmq1LjKzedfMiw7Rknte/r3lLc1UPsVmpTs9v4RrcSpeAiaTvURP+nY+uF7eWFA0kJmEbXj4jvD+XBSqP37FuZeY3QLBsVOxspe8j2+iIZid3efhuuGNJ2p05WbgHnI1VLigQyGgm3WdmU6w1892JkbSn0evo48FsCxOeJcNv86e7uIvhdAszNDJbyOSE2qKcu4NlU8RlJZ4rKovyb9muR6aBikgHScPB9Elv1wq4n/gZGzjH4jnexGwAAAABJRU5ErkJggg==',
		_LIGHT_BG_IMAGE: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABSxJREFUeNrcWUtoVFcYnplofUTiaBJjMbFpM5gqglI39VHI0JcLKYhFaEGqm+JOXLnqypVubAVByEJB6KpCS10oFRT6sgU1oWlUMDaaQKxJNUljmEwM7ffrd+F4/M+de+/ck5b88HNmzus/3/86j5vNeKS2V1pPodjLv6f77vbv8yUr6xFEB4pLVvVOgPnah7ycR4N0KHUbfQmbF1PLzSi+BEs5Dt4PDV9JyYK1KFrANeAS+B7mnvZlkQMEIVQHPokF1KUAosYAIbQQvMKnazVb/wVEGgFcb4AIaL5PIJobHaDLJbWGLLhRaZr0CUTS6aBS/1kV1lil1Els/OUNCIJPAvyw0vQuNPumVdcfMcBrlaYhyJrxmn4h4DsUvyhNR+MCcVjjMWT8PVv7iGaVZmh4X4zYqHcE9P2q9xFMvhLFJ2Apu8FfQTsTilV60fcsfu5SAv8sXVCjfiPdagE+irGlkBQtY5aAywIYfcsui4imt3MHFkCdmGBbiFXGlXS8K8S1LrPMK+l2xmUNrGEpinYqWIAsB78a5loF678MPIyJjoELSuB/ocitY7sA2cnFCxdZl1FACA3bAQ6ZiyhXFv2S1X+R89CIQd8SsYvOg0+Y7oYx51CsM/p8XOnYwmzValSVMKbPcqNV1LyLZjDmt4ymmeX5/A0U2xT0psU+QL/pR2OjvRwjQKaYyY5HOXth7DTGTXK/kAx1H3X/EEQjLVAbBkLOYhgz5TzGYyKxyIeMkTC6DT6oJYMqzlsF22UcWe0FN6xRtFUGd0FjFzjxSseEYnaxTFcaQCCvCcWykC6isNsAMBZYL9IxHgME+UFoSjLYoRBAvqnMI/1EVfcRTCAa/wiAAnczk0FXigue0NIx5A+nftVl/GwnmC6CTPN6vIRzC4iHcc9bc4Ky1MRaFKsrpLynBzrwVWhqxPPrywJurAsidB+XzTmLQZ/iz1sxZX2OwVc9gZBsuCbmsOFcAhBC73s0SJLs2JibKzEiQL5PMO6CxzUNJhgzbAb72ggD/o/BPon1PJxb6TeGpuThbBMPdnegiTspWyLPS9cT7upPUgcCIVtRvJN59goYUGdaYAjCfBsWEP2YP1LMzIsg4DUe67WTqbSlZZW8srYCH/9uAtBoIiCYQBa+w7r9/RckHrAR6xnhMb4UCQjjQG6Jb1cQMAT+IeW02xBy1Za2BqxP7v2DdvxkFTfaY8WBTaKRi5joRyNVbmLbAOoHIsZEAxf39LYQfEKgK7VWcHsB0WO6m72zVwIh56sjAQjSbvBm8m4spCUiiK184mnn7+D+I5a5UuGhTkCuD3MtFwgJ6HMQMmQtaEvmxe8YAmSA7S1GjPUa1mqwxixF37bgJYVucxN1g7xu5yuFRU7x++eu8OAzmLhTASEu9YbD9YJLUhHcRC6yLsPXE5va+YnBvJ1O8PLWE8zrulHaFjnDIJeM9QcmuRhi3qJyhJDnmd/5u0kZIxaSJ6d7dClz4fPpLteV67ZkrBEAbaV1SvZLZqKvuphwBePJpksQeo19NqDYYLV3o72b7W22n5Muy0tJktNvEupw3NSuRZ2A8aB9lVqf9Bgf1xoFuohN5xPIv67tF5Dx8mxYpKjURd4/FN8fSsMquZjW2MJ7QhrWCKhHqVsMWa/7tIj29fZnx4edckSrSJzcUprqfQIZV9Kt6zXlURwvU/YWr5+nfwI/MEB8A41OVXta5DnrVwPMmMNK6dwQY8aTPOu859pHfLyizCb96fM5yAvxs0SfWcU6L/SvAAMAnAHvLIvCmF4AAAAASUVORK5CYII=',
		
		/**
		 * Returns the main DOM node of the Spinner
		 * 
		 * @returns {HTMLElement} The main dom node
		 */
		getDomNode: function()
		{
			return this._domNode;
		},
		
		/**
		 * Validate the properties of the component
		 * @returns {boolean} True if the properties are valid, false otherwise
		 */
		_validateProperties: function()
		{
return true;
},
		
		/**
		 * Initialize the Spinner DOM node
		 */
		_initDom: function()
		{
			this._domNode = document.createElement('img');
			this._domNode.className = 'sp_spinner';
			
			if(wink.isSet(this.size))
			{
				wink.fx.apply(this._domNode, {
					width: this.size + 'px',
					height: this.size + 'px'
				});
			}
			
			if ( this.background == this._DARK_BG )
			{
				this._domNode.src= this._DARK_BG_IMAGE;
			} else if ( this.background == this._LIGHT_BG )
			{
				this._domNode.src= this._LIGHT_BG_IMAGE;
			} else if ( this.background == this._PERSONAL_BG )
			{
				this._domNode.src= this.backgroundImage;
			}
		}
	};
	
	return wink.ui.xy.Spinner;
});

