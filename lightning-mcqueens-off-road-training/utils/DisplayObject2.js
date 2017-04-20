/**
 * Display Object Wrapper. 
 * 
 * Provides common private variables and methods for the D.O as well as
 * AMD Closure and prototypes.
 *
 */
;(function(window){
	
	var 
		buffer = null,
		bufferCtx = null,
		ctxRef = null,
		empty = function(){}
	;
	
	/**
	 * Creates an instance of DisplayObject.
	 *
	 * @constructor
	 * @this {DisplayObject}
	 * @param {string} name The desired name of the display object. Uses timestamp if empty : not recommended
	 */
	var DisplayObject = function(name) {
		
		this.name = name || Date.now();
		
		this.blue = 	0; /** From -255 to 255 */
		this.red = 		0; /** From -255 to 255 */
		this.green =	0; /** From -255 to 255 */
		this.alpha =	1; /** From 0 to 1 */
		
		this.x =		0;
		this.y =		0;
		this.width =	0;
		this.height =	0;
		this.scaleX =	1;
		this.scaleY =	1;
		
		this.skewX =	0;
		this.skewY =	0;
		this.rotation =	0;/** From -180 to 180 */
		
		this.index =	0;/** From 0 to 99 !important */
		
		/**
		 * Provides a placeholder - overridable - function whenever the item is clicked.
		 */	
		this.pressedState = empty;
		this.releasedState = empty;
		this.isPressed = false;
		
		this.data = null;
		this.dataCtx = null;
	};
	
	
	/**
	 * Creates an instance of GlobalAttributes. A holder for generic getter methods
	 *
	 * @constructor
	 * @this {GlobalAttributes}
	 */
	var GlobalAttributes = function(){};
	
	/**
	 * Getter for the global 'blue' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'blue'
	 */
	GlobalAttributes.prototype.global_blue = function(){
		if(this.parent){
			return this.blue + this.parent.global_blue();
		}
		return this.blue;
	};
	
	/**
	 * Getter for the global 'red' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'red'
	 */
	GlobalAttributes.prototype.global_red = function(){
		if(this.parent){
			return this.red + this.parent.global_red();
		}
		return this.red;
	};
	
	/**
	 * Getter for the global 'green' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'green'
	 */
	GlobalAttributes.prototype.global_green = function(){
		if(this.parent){
			return this.green + this.parent.global_green();
		}
		return this.green;
	};
	
	/**
	 * Getter for the global 'alpha' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'alpha'
	 */
	GlobalAttributes.prototype.global_alpha = function(){
		if(this.parent && this.parent.global_alpha() == 0){
			return 0;
		}
		return this.alpha;
	};
	
	/**
	 * Getter for the global 'x' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'x'
	 */
	GlobalAttributes.prototype.global_x = function(){
		if(this.parent){
			return this.x + this.parent.global_x();
		}
		return this.x;
	};
	
	/**
	 * Getter for the global 'y' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'y'
	 */
	GlobalAttributes.prototype.global_y = function(){
		if(this.parent){
			return this.y + this.parent.global_y();
		}
		return this.y;
	};
	
	/**
	 * Getter for the global 'width' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'width'
	 */
	GlobalAttributes.prototype.global_width = function(){
		return this.width * this.global_scaleX();
	};
	
	/**
	 * Getter for the global 'height' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'height'
	 */
	GlobalAttributes.prototype.global_height = function(){
		return this.height * this.global_scaleY();
	};
	
	/**
	 * Getter for the global 'scaleX' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'scaleX'
	 */
	GlobalAttributes.prototype.global_scaleX = function(){
		if(this.parent){
			return this.scaleX * this.parent.global_scaleX();
		}
		return this.scaleX;
	};
	
	/**
	 * Getter for the global 'scaleY' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'scaleY'
	 */
	GlobalAttributes.prototype.global_scaleY = function(){
		if(this.parent){
			return this.scaleY * this.parent.global_scaleY();
		}
		return this.scaleY;
	};
	
	/**
	 * Getter for the global 'skewX' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'skewX'
	 */
	GlobalAttributes.prototype.global_skewX = function(){
		if(this.parent){
			return this.skewX + this.parent.global_skewX();
		}
		return this.skewX;
	};
	
	/**
	 * Getter for the global 'skewY' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'skewY'
	 */
	GlobalAttributes.prototype.global_skewY = function(){
		if(this.parent){
			return this.skewY + this.parent.global_skewY();
		}
		return this.skewY;
	};
	
	/**
	 * Getter for the global 'rotation' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'rotation'
	 */
	GlobalAttributes.prototype.global_rotation = function(){
		if(this.parent){
			return this.rotation + this.parent.global_rotation();
		}
		return this.rotation;
	};
	
	/**
	 * Getter for the global 'index' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'index'
	 */
	GlobalAttributes.prototype.global_index = function(){
		if(this.parent){
			return this.index + this.parent.global_index()*10;
		}
		return this.index;
	};
	
	/**
	 * Getter for the global 'id' attribute. (Includes parents' value)
	 *
	 * @this {GlobalAttributes}
	 * @return {number} GlobalAttributes final value for 'id'
	 */
	GlobalAttributes.prototype.id = function(){
		if(this.parent){
			if(typeof this.parent.id === "function" || this.parent.id instanceof Function){
				if(this.parent.id() != ""){
					return this.parent.id()+"."+this.name;
				}
			}
			else{
				if(this.parent.id != ""){
					return this.parent.id+"."+this.name;
				}
			}
		}
		return this.name;
	};
	
	//Base setting for Display Object Prototype 
	DisplayObject.prototype = new GlobalAttributes();
	DisplayObject.prototype.constructor = DisplayObject;
	
	DisplayObject.prototype.killData = function(){
		if(this.data != null){
			this.data = null;
			this.dataCtx = null;
		}
	}
	
	DisplayObject.prototype.isTouched = function(x,y) {
		var 
			gX = this.global_x(),
			gY = this.global_y()
		;
		
		if(this.global_alpha() === 0){
			return false;
		}
		
		if(x > gX && x < (gX + this.global_width())){
			if(y > gY && y < (gY + this.global_height())){
				return true;
			}
		}
		return false;
	};
	
	/**
	 * Draws the current Display Object onto the canvas
	 *
	 * @this {DisplayObject}
	 * @param {Canvas2dContext} ctx The desired context to which the D.O. should be rendered in.
	 */
	DisplayObject.prototype.draw = function(ctx) {
		
		ctxRef = ctx || ctxRef;
		
		var currentBuffer = ctxRef;
		
		if(this.global_alpha() == 0){
			return;
		}
		
		currentBuffer.globalAlpha = this.alpha;
	
		if(this.Dockable){
			this.Dockable.update();
		}
				
		if(this.data != null) {
			renderElement(this, currentBuffer);
		}
			
		drawChildren(this, currentBuffer);
	}
	
	/**
	 * Loads multiple Bitmaps in one go. Ideal for preloading.
	 * 
	 * @this {DisplayObject}
	 * @param {string | image} url Loads an image to be used as D.O. data
	 */
	DisplayObject.prototype.loadBitmaps = function(urls) {
		var thisRef = this;
		this.loadBitmap(urls[0], function(){if(urls.length > 0){urls.shift();thisRef.loadBitmaps(urls);}});
	};
	
	/**
	 * Loads a Bitmap into the DisplayObject
	 *
	 * @this {DisplayObject}
	 * @param {string | image} url Loads an image to be used as D.O. data
	 */
	DisplayObject.prototype.loadBitmap = function(url, success) {
		var thisRef = this;
		
		if(!(typeof url === 'string') && !(url instanceof String)){
			thisRef.data = url;
			/*if(thisRef.width == 0){
				thisRef.width = url.width;
			}
			if(thisRef.height == 0){
				thisRef.height = url.height;
			}*/
			return;
		}
		
		FileSystem.download(url, function(b) {
			if(thisRef.width == 0){
				thisRef.width = b.width;
			}
			if(thisRef.height == 0){
				thisRef.height = b.height;
			}
			if(thisRef.data == null){
				thisRef.data = document.createElement('canvas');
				thisRef.data.width = b.width;
				thisRef.data.height = b.height;
				thisRef.dataCtx = thisRef.data.getContext('2d');
			}
			else{
				return;
			}
			thisRef.dataCtx.drawImage(b, 0, 0, b.width, b.height);
			thisRef.dataCtx.getImageData(1,1,1,1);
			
			if(success){
				success();
			}
		},
		function(e){
			Preloader.update(e);
		},
		function(e){
			console.error("Error loading image '"+url+"': "+e);
		});
	};
	
	/**
	 * Returns the Display Object's context reference.
	 *
	 * @private
	 * @this {DisplayObject}
	 * @return {Canvas2dContext} The Display Object's context reference.
	 */
	DisplayObject.prototype._getCtx = function(){
		if(buffer){
			return bufferCtx;
		}
		return ctxRef;
	}
	
	/**
	 * Draws extensions of a Display object (TextField, Canvas, etc.)
	 *
	 * @private
	 */	
	function drawChildren(thisRef, ctx){
		if(thisRef.Canvas){
			thisRef.Canvas.draw(ctx);
		}
		
		if(thisRef.Container){
			var c = thisRef.Container.getChildren();
			for(var i = 0; i<c.length; i++) {
				if(c[i].draw) {
					c[i].draw(ctx);
				}
			}
		}
		
		if(thisRef.TextField){
			thisRef.TextField.draw(ctx);
		}
	}
	
	/**
	 * Draws the Display object's data into the selected context
	 * 
	 * @private
	 */	
	function renderElement(thisRef, ctx){
		ctx.drawImage(thisRef.data, Math.chop(thisRef.global_x()), Math.chop(thisRef.global_y()), Math.chop(thisRef.global_width()), Math.chop(thisRef.global_height()));
	}
	
	/**
	 * Adds the 'add extension' method to the display object's prototype
	 */	
	DisplayObject.prototype.addExt = addExt;
	
	/**
	 * AMD Closure (returns object in window without require.js)
	 */	
	window.DisplayObject2 = DisplayObject;

})(window);