/*--------------------------------------------------------
 * Copyright (c) 2011, The Dojo Foundation
 * This software is distributed under the "Simplified BSD license",
 * the text of which is available at http://www.winktoolkit.org/licence.txt
 * or see the "license.txt" file for more details.
 *--------------------------------------------------------*/

/** 
 * @fileOverview Ensures compatibility with 1.4.1 version (HTML Elements extensions and $)
 * 
 * @author Sylvain Lalande
 */
define(['../../../_amd/core'], function(wink)
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
		return wink.getPosition(this, parentNode, transform);
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
		return wink.getTopPosition(this, parentNode, transform);
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
		return wink.getLeftPosition(this, parentNode, transform);
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
		wink.fx.translate(this, x, y, force2d);
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
		wink.fx.scale(this, x, y);
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
		wink.fx.rotate(this, angle);
	};
	
	/**
	 * @function Extends HTMLElements in order to listen to gesture
	 * 
	 * @name HTMLElement#listenToGesture
	 * 
	 * @param {string} gesture The gesture name to listen
	 * @param {object|function} callback The callback to invoke when this gesture is done
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
	 * @param {object|function} callback The callback that was previously added (identified by { context, method })
	 * 
	 * @requires wink.ux.gesture
	 */
	var unlistenToGesture = function(gesture, callback)
	{
		wink.ux.gesture.unlistenTo(this, gesture, callback);
	};
	
	/**
	  * @function
	  * @see wink.byId
	  */
	$ = wink.bind(wink.byId, wink);
	
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