;(function(window){
	
	//Props relative to all Display Objects
	var 
		none = 0,
		additive = 1,
		multiplicative = 2,
		byScale = 3,
		fullId = 4,
		
		STATE = {
			LOADING:0, 
			STOP:1, 
			PLAY:2, 
			PAUSE:3, 
			ERROR:4
		},
		
		//Model
		m = [0, true, additive],
		
		props = {
			blue:m,
			red:m,
			green:m,
			alpha:[1,false, none],
			rotation:m,
			x:m,
			y:m,
			scaleX:[1, true, multiplicative],
			scaleY:[1, true, multiplicative],
			skewX:m,
			skewY:m,
			width:[1, false, byScale],
			height:[1, false, byScale],
			index:[0, false, none],
			state:[STATE.LOADING, false, none],
			id:["", true, fullId]
		}
	;
	
	//Actual display Object Class
	var DisplayObject = function(bag) {
		//Private
		var 
			attributes = {
				blue:null,
				red:null,
				green:null,
				alpha:null,
				rotation:null,
				x:null,
				y:null,
				scaleX:null,
				scaleY:null,
				skewX:null,
				skewY:null,
				data:null,
				width:null,
				height:null,
				index:null,
				state:null,
				id:null
			},
			i = null,
			data = null,
			dataCtx = null,
			ctxRef = null,
			thisRef = this,
			buffer = null,
			bufferCtx = null
		;
		
		//Public properties
		
		this.name = "";
	
		this.draw = function(ctx) {
			ctxRef = ctx || ctxRef;
			
			var currentBuffer = ctxRef;
			
			if(state != STATE.ERROR){
				state = STATE.PLAY;
				if(currentBuffer) {
					if(this.alpha != 1){
						if(buffer == null){
							buffer = Buffer.create(this.id);
							bufferCtx = buffer.getContext('2d');
						}
						currentBuffer = bufferCtx;
					}
					else{
						if(buffer != null){
							Buffer.kill(this.id);
							buffer = null;
							bufferCtx = null;
						}
					}
					ctxRef.save();
					ctxRef.globalAlpha = this.alpha;
					
					if(this.Dockable){
						this.Dockable.update();
					}
					
					if(data && data != null) {
						renderElement(currentBuffer);
					}
					drawChildren(currentBuffer);
					
					if(currentBuffer == bufferCtx){
						ctxRef.drawImage(buffer, 0, 0);
					}
					
					
					ctxRef.restore();
				}
			}
		}
	
		/*this._update = function() {
			//No point in doing lookups at every level... just call the main renderer's update function!
			
			//While we're in impact...
			if(ig.Menus){
				ig.Menus._update();
			}
		}*/
		
		this.killData = function(){
			if(data != null){
				data = null;
				dataCtx = null;
			}
		}
	
		//Methods
		this._getCtx = function(){
			if(buffer){
				return bufferCtx;
			}
			return ctxRef;
		}
		
		//If item is touched by input (Mouse/touch)
		this.isTouched = function(x,y) {
			if(x > thisRef.x && x < (thisRef.x + thisRef.width)){
				if(y > thisRef.y && y < (thisRef.y + thisRef.height)){
					return true;
				}
			}
			return false;
		}
		
		function drawChildren(ctx){
			if(thisRef.Container){
				var c = thisRef.Container.getChildren();
				for(var i = 0; i<c.length; i++) {
					if(c[i].draw) {
						c[i].draw(ctx);
					}
				}
			}
			if(thisRef.Canvas){
				thisRef.Canvas.draw(ctx);
			}
			if(thisRef.TextField){
				thisRef.TextField.draw(ctx);
			}
		}
		
		function renderElement(ctx){
			ctx.drawImage(data, Math.chop(thisRef.x), Math.chop(thisRef.y), Math.chop(thisRef.width), Math.chop(thisRef.height));
		}
	
		function loadBitmap(url) {
			if(typeof url === 'string' || url instanceof String) {
				var prevState = state;
				state = STATE.LOADING;
				FileSystem.download(url, function(b) {
					if(attributes.width == null || attributes.width < b.width){
						attributes.width = b.width;
						if(thisRef.parent && thisRef.parent.width<b.width){
							thisRef.parent.width = b.width;
						}
					}
					if(attributes.height == null || attributes.height < b.height){
						attributes.height = b.height;
						if(thisRef.parent && thisRef.parent.height<b.height){
							thisRef.parent.height = b.height;
						}
					}
					if(data == null){
						data = document.createElement('canvas');
						data.width = b.width;
						data.height = b.height;
						dataCtx = data.getContext('2d');
					}
					else{
						return;
					}
					dataCtx.drawImage(b, 0, 0, b.width, b.height);
					dataCtx.getImageData(1,1,1,1);
					state = prevState;
					window.reDraw = true;
				},
				null, //No progress event
				function(e){
					state = STATE.ERROR;
				});
			}
			else {
				data = url;
	
				if(attributes.width == null || attributes.width < url.width){
					attributes.width = url.width;
				}
				if(attributes.height == null || attributes.height < url.height){
					attributes.height = url.height;
				}
				window.reDraw = true;
			}
		}
	
		(function(d){
			var
				DEFAULT = 0,
				RECURSIVE = 1,
				OPERATOR = 2,
				
				add = function(prop, val){
					return prop + val;
				},
				
				mult = function(prop, val){
					return prop * val
				},
				
				none = function(prop){
					return prop;
				},
				
				dot = function(prop, val){
					if(val === ""){
						return prop;
					}
					return val + "." + prop;
				},
				
				attribute = function(name, prop, curr){
					
					var fct;
					
					switch(prop[OPERATOR]){
						case 0:
							fct = none;
							break;
						case 1:
							fct = add;
							break;
						case 2:
							fct = mult;
							break;
						case 3:
							fct = mult;
							break;
						case 4:
							fct = dot;
							break;
					}
					
					if(d.__defineGetter__){
						d.__defineGetter__(name, function(){
							var 
								v = attributes[name],
								t = attributes
							;
							
							if(v == null){
								v = prop[DEFAULT];
							}
							
							if(prop[RECURSIVE] === true){
								if(d.parent){
									t = d.parent;
								}
								else{
									fct = none;
								}
							}
							
							if(prop[OPERATOR] === 3){
								/*if(d["name"] === "main"){
									return fct(v, 1);
								}*/
								if(name === "width"){
									return fct(v, d.scaleX);
								}
								return fct(v, d.scaleY);
							}
							else if(prop[OPERATOR] === 4){
								return fct(d["name"], t.id);
							}
							/*if(d["name"] === "main" && (name === "scaleX" || name === "scaleY")){
								return fct(v, 1);
							}*/
							return fct(v, t[name]);
					    });
						d.__defineSetter__(name, function(val){
							attributes[name] = val;
							window.reDraw = true;
					    });
					}
					else{
						Object.defineProperty(this, name, {
						    get: function() {
						    	var 
									v = attributes[name],
									t = attributes
								;
								
								if(v == null){
									v = prop[DEFAULT];
								}
								
								if(prop[RECURSIVE] === true){
									if(d.parent){
										t = d.parent;
									}
									else{
										fct = none;
									}
								}
								
								if(prop[OPERATOR] === 3){
									/*if(d["name"] === "main"){
										return fct(v, 1);
									}*/
									if(name === "width"){
										return fct(v, d.scaleX);
									}
									return fct(v, d.scaleY);
								}
								else if(prop[OPERATOR] === 4){
									return fct(d["name"], t.id);
								}
								/*if(d["name"] === "main" && (name === "scaleX" || name === "scaleY")){
									return fct(v, 1);
								}*/
								return fct(v, t[name]);
						    },
						    set: function(val){
						    	attributes[name] = val;
								window.reDraw = true;
						    }
						});
					}
					
					attributes[name] = ((curr != undefined)?curr:prop[DEFAULT]);
				}
			;
			
			d.attribute = attribute;
			
		})(this);
		
		
		bag = bag || {};
		
		for(i in props){
			this.attribute(i, props[i], bag[i]);
		}
		
		if(bag.name){
			thisRef.name = bag.name;
		}
		if(bag.data){
			loadBitmap(bag.data);
		}
	
		state = STATE.STOP;
	};
	
	DisplayObject.prototype.addExtention = addExtention;
	
	window.DisplayObject = DisplayObject;

})(window);