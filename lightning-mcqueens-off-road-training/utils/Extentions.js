var Extention = {
	
	Container:function(p){
		//Private
		var
			children = [],
			currentIndex = 0,
			_self = p
		;
	
		function getChildIndexByName(/*(String) name*/name) {
			for(var i=0; i<children.length; i++) {
				if(children[i].name == name) {
					return i;
				}
			}
			return -1;
		}
	
		//Public
		return {
			_packageName : "Container",
	
			addChild:function(/*(Clip) clip*/clip) {
				clip.parent = _self;
				clip.name = (clip.name || Date.now());
				children[children.length]=clip;
				window.reDraw = true;
				return children.length-1;
			},
			removeChildByName:function(/*(String) name*/name) {
				var index = getChildIndexByName(name);
				children[index].killData();
				if(children[index].Container){
					children[index].Container.killChildren();
				}
				if(index != -1) {
					if(Buffer(name)){
						Buffer.kill(name);
					}
					children.splice(index,1);
					window.reDraw = true;
					return true;
				}
				console.error("could not find children "+name);
				return false;
			},
			killChildren:function(){
				for(var i=0; i<children.length; i++) {
					if(Buffer(children[i].name)){
						Buffer.kill(children[i]).name;
					}
					if(children[i].Container){
						children[i].Container.killChildren();
					}
					children[i].killData();
					delete children[i];
				}
				children = [];
				window.reDraw = true;
			},
			removeChildAt:function(index) {
				var r = children.splice(index,1);
				window.reDraw = true;
				return r;
			},
			getChildByName:function(name) {
				var index = getChildIndexByName(name);
				if(index != -1) {
					return children[index];
				}
				return null;
			},
			find:function(target){
				var 
					query = target.split("."),
					ret = _self,
					i
				;
				
				for(i=0; i<query.length; i++){
					ret = ret.Container.getChildByName(query[i]);
				}
				
				return ret;
			},
			getChildren:function() {
				return children;
			},
			getChildAt:function() {
				return children[index];
			}/*,
			//Should be to set own index in parent
			setIndex:function(index) {
				if(parent.
			}*/
		}
	},
	
	TextField:function(p){
		//Private
		var
			_self = p,
			thisRef,
			fillText = "",
			strokeText = ""
		;
		
		function init(ctxRef){
			if(thisRef == null){
				thisRef = _self.TextField;
			}
			ctxRef.save();
		}
		
function wrapText(context, x, y, maxWidth, lineHeight) {
			
	        var 
	        	words = [],
	        	paragraphs = [],
	        	line = '',
	        	breakLine = "@@",
	        	n,
	        	i,
	        	testLine,
	        	metrics,
	        	testWidth,
	        	myX = ((_self.global_x)?_self.global_x():_self.x),
				myY = ((_self.global_y)?_self.global_y():_self.y)
	        ;
	        
	        paragraphs = fillText.split(breakLine);
	        if(paragraphs.length <= 1 && strokeText != ""){
	        	paragraphs = strokeText.split(breakLine);
	        }
	        
	        for(i = 0; i < paragraphs.length; i++){
	        	words = paragraphs[i].split(" ");
	        	line = '';
	        	for(n = 0; n < words.length; n++) {
		        	testLine = line + words[n] + ' ';
		        	metrics = context.measureText(testLine);
		        	testWidth = metrics.width;
		        	if(testWidth > maxWidth) {
		        		if(strokeText != ""){
		        			context.strokeText(line, myX + x, myY + y + (i*lineHeight));
						}
						if(fillText != ""){
							context.fillText(line, myX + x, myY + y + (i*lineHeight));
						}
						line = words[n] + ' ';
						y += lineHeight;
		        	}
		        	else {
		        		line = testLine;
		        	}
		        }
		        if(strokeText != ""){
	    			context.strokeText(line, myX + x, myY + y + (i*lineHeight));
				}
				if(fillText != ""){
					context.fillText(line, myX + x, myY + y + (i*lineHeight));
				}
	        }
	    }
	
		//Public
		return {
			_packageName : "TextField",
			draw:function(ctxRef){
				init(ctxRef);
				thisRef._applyStyles(ctxRef);
				
				var myX = ((_self.global_x)?_self.global_x():_self.x);
				var myY = ((_self.global_y)?_self.global_y():_self.y);
				var myWidth = ((_self.global_width)?_self.global_width():_self.width);
				var myHeight = ((_self.global_height)?_self.global_height():_self.height);
				var pad = (thisRef.padding == null)?0:thisRef.padding;
				var vs = (thisRef.verticalSpacing == null)?0:thisRef.verticalSpacing;
				
				var xShift = 0;
				if(thisRef.textAlign === "center"){
					xShift = myWidth*0.5;
				}
				else if(thisRef.textAlign === "right"){
					xShift = myWidth;
				}
				
				var lPad = (thisRef.paddingLeft == null)?0:thisRef.paddingLeft;
				var tPad = (thisRef.paddingTop == null)?0:thisRef.paddingTop;
				var fontSize = thisRef.font.split(" ");
				if(fontSize.length == 3){
					fontSize = parseFloat(fontSize[1].substring(0,fontSize[1].indexOf('px')));
				}
				else{
					fontSize = parseFloat(fontSize[0].substring(0,fontSize[0].indexOf('px')));
				}
			
				if(thisRef.textWrap === true){
					
					wrapText(ctxRef, xShift+lPad, tPad, myWidth-(pad*2), fontSize+vs);
				}
				else{
					if(strokeText != ""){
						ctxRef.strokeText(strokeText, myX+xShift+lPad, myY+tPad);
					}
					if(fillText != ""){
						ctxRef.fillText(fillText, myX+xShift+lPad, myY+tPad);
					}
				}
				
				ctxRef.restore();
			},
			setFillText:function(str){ fillText = str;},
			setStrokeText:function(str){ strokeText = str;},

			font:'14px Arial',
			padding:null,
			verticalSpacing:null,
			textBaseline:null,
			textWrap:null,
			textAlign:null,
			shadowColor:null,
			shadowBlur:null,
			shadowOffsetX:null,
			shadowOffsetY:null,
			fillStyle:null,
			strokeStyle:null,
			lineWidth:null,
			
			_applyStyles:function(ctxRef){
				ctxRef.font = thisRef.font;
				if(thisRef.textAlign != null) ctxRef.textAlign = thisRef.textAlign;
				if(thisRef.shadowColor != null) ctxRef.shadowColor = thisRef.shadowColor;
				if(thisRef.shadowBlur != null) ctxRef.shadowBlur = thisRef.shadowBlur;
				if(thisRef.shadowOffsetX != null) ctxRef.shadowOffsetX = thisRef.shadowOffsetX;
				if(thisRef.shadowOffsetY != null) ctxRef.shadowOffsetY = thisRef.shadowOffsetY;
				if(thisRef.fillStyle != null){ ctxRef.fillStyle = thisRef.fillStyle; ctxRef.fill(); }
				if(thisRef.strokeStyle != null) ctxRef.strokeStyle = thisRef.strokeStyle;
				if(thisRef.lineWidth != null) ctxRef.lineWidth = thisRef.lineWidth;
				if(thisRef.textBaseline != null) ctxRef.textBaseline = thisRef.textBaseline;
			}
		}
	},
	
	//WIP
	Canvas:function(p){
		//Private
		var
			_self = p,
			thisRef = null,
			buffer = null,
			ctx = null,
			_name = "Canvas"
		;
		
		function init(name){
			if(thisRef == null){
				thisRef = _self.Canvas;
			}
			
			_name = name || _name;
			
			buffer = Buffer(_name);
			if(buffer == null){
				buffer = Buffer.create(_name);
			}
			ctx = buffer.getContext('2d');
		}
	
		//Public
		return {
			_packageName : "Canvas",
			context:function(name){
				init(name);
				return ctx
			},
			draw:function(ctxRef){
				init();
				ctxRef.drawImage(buffer, _self.x, _self.y);
			}
		}
	},

	Dockable : function(p){

		var
			_self = p,
			currentXDock = null,
			currentYDock = null
		;
		
		function _relativeDock(x, y){
			if(!_self.parent) {
				console.error("Unable to dock an element with no parent.");
				console.error(_self);
				return false;
			}

			var 
				wWidth = _self.parent.width,
				wHeight = _self.parent.height
			;

			if(x && x != null){
				if(x === "left"){
					_self.x = 0;
				}
				else if(x === "mid"){
					_self.x = (wWidth * 0.5)-(_self.width *  0.5);
				}
				else if(x === "right"){
					_self.x = wWidth - _self.width;
				}
				else{
					if(x >= 50){
						_self.x = ((wWidth-_self.width)*0.01)*x;
					}
					else{
						_self.x = (wWidth*0.01)*x;
					}
				}
				currentXDock = x;
			}

			if(y && y != null){
				if(y === "top"){
					_self.y = 0;
				}
				else if(y === "mid"){
					_self.y = (wHeight * 0.5) - (_self.height * 0.5);
				}
				else if(y === "bottom"){
					_self.y = wHeight - _self.height;
				}
				else{
					if(y >= 50){
						_self.y = ((wHeight-_self.height)*0.01)*y;
					}
					else{
						_self.y = (wHeight*0.01)*y;
					}
				}
				currentYDock = y;
			}
			window.reDraw = true;
		}
	
		return {
			_packageName : "Dockable",
	
			set:function(x, y){
				if(x && x != null){
					currentXDock = x;
				}
				if(y && y != null){
					currentYDock = y;
				}
			},
	
			update : function(){
				if(currentXDock && currentXDock != null){
					_relativeDock(currentXDock, null);
				}
				if(currentYDock && currentYDock != null){
					_relativeDock(null, currentYDock);
				}
			}
		}
	}
};