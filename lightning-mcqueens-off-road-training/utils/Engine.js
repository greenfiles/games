;(function(window){
	
	var 
		canvas = document.getElementById('menus'),
		ctx = canvas.getContext('2d'),
		buffer = Buffer.create("main"),
		bufferCtx = buffer.getContext('2d'),
		mousePos = new Point(0,0),
		mouseDown = false,
		click = false,
		
		//Base
		empty = [0,false,0]
	;
	
	window.input = function(){
		return new Point(mousePos.x,mousePos.y);
	}
	
	if(window.isMobile){
		window.addEventListener('touchmove', handleTouchMove);
		window.addEventListener('touchstart',  function(e){/*e.preventDefault();*/handleTouchMove(e);mouseDown = true;});
		window.addEventListener('touchend',  function(e){/*e.preventDefault();*/;mouseDown = false; click = true;if(window.playSongPls && window.isMobile && !ig.global.gameMuted){window.playSongPls=false; ig.music.play(ig.game.currentSong);}});
		window.document.addEventListener("unload", killSound);
		window.addEventListener("pagehide", function(){
			ig.music.stop();
			window.playSongPls=true;
			soundManager.stopAll();
		});
	}
	else{
		window.addEventListener('mouseup',  function(){mouseDown = false; click = true;});
		window.addEventListener('mousedown',  function(){mouseDown = true;});
		window.addEventListener('mousemove',  handleMouseMove);
	}
    
    function killSound(){
		ig.music.stop();
		window.playSongPls=true;
		soundManager.stopAll();
	}

	function handleMouseMove(event) {
        event = event || window.event; // IE-ism
        setMousePos(event.clientX, event.clientY);
    }
	
	function handleTouchMove(event) {
        event = event.touches[0];
        setMousePos(event.clientX, event.clientY);
    }
	
	function setMousePos(x, y){
		mousePos.x = (x - trimPX(canvas.style.left)) / window.canvasRatio;
        mousePos.y = (y - trimPX(canvas.style.top)) / window.canvasRatio;
	}
	
	function trimPX(pos){
		pos = pos+"";
		return parseFloat(pos.substring(0, pos.indexOf("px")));
	}
	
	var Engine = function(){
		
		var
			thisRef = this
		;
		
		this.blue = 0;
		this.red = 0;
		this.green = 0;
		this.x = 0;
		this.y = 0;
		this.rotation = 0;
		this.scaleX = 1;
		this.scaleY = 1;
		this.skewX = 0;
		this.skewY = 0;
		this.alpha = 1;
		this.width = 1136;
		this.height = 672;
		this.global_blue = function(){
			return this.blue;
		};
		
		this.global_red = function(){
			return this.red;
		};
		
		this.global_green = function(){
			return this.green;
		};
		
		this.global_alpha = function(){
			return this.alpha;
		};
		
		this.global_x = function(){
			return 0;
		};
		
		this.global_y = function(){
			return 0;
		};
		
		this.global_width = function(){
			return this.width;
		};
		
		this.global_height = function(){
			return this.height;
		};
		
		this.global_scaleX = function(){
			return 1;
		};
		
		this.global_scaleY = function(){
			return 1;
		};
		
		this.global_skewX = function(){
			return 0;
		};
		
		this.global_skewY = function(){
			return 0;
		};
		
		this.global_rotation = function(){
			return 0;
		};
		
		this.global_index = function(){
			return 0;
		};
		
		function _collectTargets(currTarget, x, y, strict){
			
			var 
				targets = [],
				children = thisRef.find(currTarget),
				i
			;
			
			if(children.Container){
				children = children.Container.getChildren();
			}
			
			for(i = 0; i<children.length; i++){
				if(strict){
					if(children[i].isTouched(x,y)){
						targets[targets.length] = children[i];
						if(children[i].Container){
							if(typeof children[i].id === "function" || typeof children[i].id instanceof Function){
								targets = targets.concat(_collectTargets(children[i].id(), x, y, strict));
							}
							else{
								targets = targets.concat(_collectTargets(children[i].id, x, y, strict));
							}
						}
					}
				}
				else {
					if(children[i].isTouched(x,y)){
						targets[targets.length] = children[i];
					}
					if(children[i].Container){
						if(typeof children[i].id === "function" || typeof children[i].id instanceof Function){
							targets = targets.concat(_collectTargets(children[i].id(), x, y, strict));
						}
						else{
							targets = targets.concat(_collectTargets(children[i].id, x, y, strict));
						}
					}
				}
			}
			
			return targets;
		}
		
		function _unloadCurrMenu(menuName, param){
			thisRef.Container.getChildByName(thisRef.currentMenu).onunload();
			thisRef.Container.removeChildByName(thisRef.currentMenu);
			EventManager.flush();
			_loadNextMenu(menuName, param);
		}
			
		function _loadNextMenu(menuName, param){
			thisRef.currentMenu = menuName;
			//Loads the next
			if(LocalStorage.working()){
				Preloader.set();
				var newScreen = thisRef.screens[menuName](param);
				thisRef.Container.addChild(newScreen);
				thisRef.curMenuObj = thisRef.Container.getChildByName(thisRef.currentMenu);
			}
		}
		
		this.currentMenu = null;
		this.curMenuObj = null;
		this.froze = false;
		this.name = "main";
		this.id = "";
		
		/*this._update = function() {
			this.froze = false;
		};*/
			
		this._buffer = function(){
			return buffer;
		};
			
		this.screens = {};
		this.dragEnabled = false;
		
		this.draw = function() {
			var rd = true; //Animations.step();
			
			if(click || (this.dragEnabled && mouseDown)){
				click = false;
				this.handleClick();
				rd = true;
				mousePos.x = mousePos.y = 0;
			}
			
			if(window.reDraw || rd){
				canvas.getContext("2d").clearRect( 0 ,0, 1136, 672);
			}
			else{
				return;
			}
			//check for mouse down
			
			
			//if(window.reDraw || rd) {
				//if(this.Container) {
					//window.log("Drawing...");
					//console.log("::Draw->Menu");
					var c = this.Container.getChildren();
					
					//Because it is an overlay, clearRect is handler before the game renders
					bufferCtx.clearRect(0, 0, 1136, 672);
					
					for(var i = 0; i<c.length; i++) {
						if(c[i].draw) {
							c[i].draw(bufferCtx);
						}
					}
					if(this.alpha != 1){
						ctx.save();
						ctx.globalAlpha = this.alpha;
					}
					ctx.drawImage(buffer, this.x, this.y);//, this.width*window.canvasRatio, this.height*window.canvasRatio);
					if(this.alpha != 1){
						ctx.restore();
					}
					
					window.reDraw = false;
				//}
			//}
		};
			
		this.handleDeviceUpdate = function(){
			/*
			this.width = canvas.width;
			this.height = canvas.height;
			
			var cM = this.Container.getChildByName(this.currentMenu);
			if(cM != null){
				cM.width = this.width;
				cM.height = this.width;
			}
			*/
			Buffer.create("main");
			Buffer.kill("main");
			buffer = Buffer.create("main");
			bufferCtx = buffer.getContext('2d');
			//debugStrip.innerHTML += "left:"+window.leftPadding + " | top:" + window.topPadding +"<br/>";
			window.reDraw = true;
			
		};
		
		/*
		this.fadeOut = function(){
				
		};
			
		this._fadeIn = function(){
				
		};
		*/
		
		this.handleClick = function(strict, single){
			var 
				xpos = mousePos.x,
				ypos = mousePos.y,
				items = _collectTargets(this.currentMenu, xpos, ypos),
				i = 0,
				u,
				targets = this.Container.getChildByName(this.currentMenu).binds;
			;
			
			for(i; i<items.length; i++){
				for(u in targets){
					if(items[i].name == u){
						//Eventually detect presence of Event Manager (AMD)
						EventManager.broadcast(targets[u], items[i]);
						if(single){
							return true;
						}
					}
				}
			}
			/*
			//window.reDraw = true;
			Buffer.create("menuDebugSq");
			var screen = this.Container.getChildByName(this.currentMenu);
			var ctx = screen.Canvas.context("menuDebugSq");
			ctx.moveTo(xpos -5 -screen.x, ypos -5- screen.y);
			ctx.strokeStyle ="red";
			ctx.lineTo(xpos +5- screen.x, ypos -5- screen.y);
			ctx.lineTo(xpos +5- screen.x, ypos +5- screen.y);
			ctx.lineTo(xpos -5- screen.x, ypos +5- screen.y);
			ctx.lineTo(xpos -5- screen.x, ypos -5- screen.y);
			ctx.stroke();
			
			debugStrip.innerHTML = "r:"+window.canvasRatio+"cvn Left:"+canvas.style.left+" cvn top:"+canvas.style.top+"<span class='red'>mouseX:"+xpos+" | mouseY:"+ypos+"</span>";
			*/
		};
			
		this.find = function(target){
			var 
				query = null,
				ret = this,
				i
			;
			
			query = target.split(".");
			
			for(i=0; i<query.length; i++){
				ret = ret.Container.getChildByName(query[i]);
			}
			
			if(ret == this){
				console.error("Oups, could not find "+target);
			}
			
			return ret;
		};
			
		this.loadMenu = function(menuName, param){
			if(this.currentMenu != null){
				//Kills the current Menu
				_unloadCurrMenu(menuName, param);
			}
			else{
				_loadNextMenu(menuName, param);
			}
		};
			
		hide = function(){
			this.Container.getChildByName(this.currentMenu).onunload();
			//remove all children from Menus
			this.Container.killChildren();
		};
	}
	
	window.reDraw = window.reDraw || false;
		
	Engine.prototype.addExtention = addExtention;
	
	window.Engine = Engine;

})(window);