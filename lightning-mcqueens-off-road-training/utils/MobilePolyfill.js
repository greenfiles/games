;(function(window){
	var 
		//Constants
		LANDSCAPE = 0,
		PORTRAIT = 1,
		MINWIDTH = 960,
		MINHEIGHT = 536,
		WIDTHGUIDE=1136,
		HEIGHTGUIDE=672,
		
		//Vars
		init = false,
		isMobile = isMobile(),
		prevRatio = ((isMobile&&(window.innerHeight>window.innerWidth))?PORTRAIT:LANDSCAPE),
		canvas = document.getElementById("canvas"),
		backgroundImg = document.getElementById("background"),
		menus = document.getElementById("menus"),
		loading = document.getElementById("loadingBackground"),
		loadingImg = document.getElementById("loadingImg"),
		hidingBar = false,
		newRatio = null,
		badOrientation = document.getElementById("badOrientation"),
		cookiesBlocked = document.getElementById("cookies")
	;
	
	window.isMobile = isMobile;
	window.isLandscape = function(){
		return (prevRatio === LANDSCAPE);
	};
	
	var addEvent = function(elem, type, eventHandle) {
	    if (elem == null || elem == undefined) return;
	    if ( elem.addEventListener ) {
	        elem.addEventListener( type, eventHandle, false );
	    } else if ( elem.attachEvent ) {
	        elem.attachEvent( "on" + type, eventHandle );
	    } else {
	        elem["on"+type]=eventHandle;
	    }
	};
	
	var resizeHandler = function(e){
		
		if(hidingBar) return false;
		
		if(isMobile){
			newRatio = (window.innerHeight>window.innerWidth)?PORTRAIT:LANDSCAPE;
			prevRatio = newRatio;
		}
		setTimeout(resizeCanvas, 10);
	};
	
	function setup(){
		addEvent(document, "touchmove", function ontouchmove(e){
			e = e || window.event;
			e.preventDefault();
		});
		
		addEvent(document, "contextmenu", function oncontextmenu(e) {
			e = e || window.event;
			if (e.preventDefault)
				e.preventDefault();
			else
				return false;
		});
		
		addEvent(window, "resize", resizeHandler);
		
		if(isMobile){
			canvas.className="mobileAlign";
			addEvent(window, "orientationchange", function(e){
				
				if(window.orientation){
					if (window.orientation === -90 || window.orientation === 90) {
						newRatio = LANDSCAPE;
					}
					else{
						newRatio = PORTRAIT;
					}
				}
				else{
					newRatio = (window.innerHeight>window.innerWidth)?PORTRAIT:LANDSCAPE;
				}
				prevRatio = newRatio;
				
				setTimeout(resizeCanvas, 10);
			});
			
			setScroll();
			
			try{
				addEvent(window, "webkitfullscreenchange", resizeHandler);
				addEvent(window, "mozfullscreenchange", resizeHandler);
				addEvent(window, "fullscreenchange", resizeHandler); 
			}
			catch(e){
				console.error("Problem handling resize: ");
				console.error(e);
			}
			
			if(window.offscreenBuffering != undefined) window.offscreenBuffering = false;
		}
		else{
			canvas.width = WIDTHGUIDE;
			canvas.height = HEIGHTGUIDE;
			window.canvasRatio = 1;
			canvas.className="browserAlign";
		}
	}

	function setScroll(){
		window.scrollTo(1,1);
		setTimeout(setScroll, 10)
	}
	
	function resizeCanvas(){
		if(canvas){
			//if(isMobile){		//Think of smaller resolution computer screens!
				
				var
					windowH = window.innerHeight,
					windowW = window.innerWidth,
					ratio = 1,
					scaleX,
					scaleY,
					posX,
					posY
				;
				
				console.log("Resizing to: "+windowW);

				if(!LocalStorage.working()){
					canvas.style.display = backgroundImg.style.display = menus.style.display = loading.style.display = "none";
					cookiesBlocked.src= "media/images/cookies/cookies.jpg";
					cookiesBlocked.style.display = "block";
				}
				
				if (isMobile) {
					var ios7 = document.getElementById('ios7'),
					ios7Class = '';
					if(prevRatio === LANDSCAPE){
						ios7Class = 'landscape';
						badOrientation.style.display = "none";
						canvas.style.display = backgroundImg.style.display = menus.style.display = "block";
					}
					else{
						ios7Class = 'portrait';
						//Handle bad orientation ** just need to had a condition for different devices
						if(navigator.platform.indexOf('iPhone') != -1 || navigator.platform.indexOf('iPod') != -1){
						badOrientation.src= "media/images/page/orientation_iphone.png";
						badOrientation.style.width = "375px";
						badOrientation.style.height = "222px";
						badOrientation.width = "375";
						badOrientation.height = "222";
						}else if(navigator.platform.indexOf('iPad') != -1){
						badOrientation.src= "media/images/page/orientation_ipad.png";
						badOrientation.style.width = "375px";
						badOrientation.style.height = "222px";
						badOrientation.width = "375";
						badOrientation.height = "222";
						}else{
						badOrientation.src= "media/images/page/badOrientation.png";
						}
						badOrientation.style.display = "block";
						canvas.style.display = backgroundImg.style.display = menus.style.display = loading.style.display = "none";
					}
					if(ios7 != undefined)
					{
						ios7.className = ios7Class;
					}
					
				}
				
				if( isMobile &&// don't want it to snap to this while scaling a desktop browser window
				    windowW*2 >= MINWIDTH &&
				    windowW*2 <= WIDTHGUIDE &&
				    windowH*2 >= MINHEIGHT &&
				    windowH*2 <= HEIGHTGUIDE
				) {
					console.log("mobile browser with roughly iphone-sized screen detected");
					ratio = 0.5;
				} else {
					
					scaleX = windowW / MINWIDTH;
					scaleY = windowH / MINHEIGHT;
					ratio = Math.min(scaleX,scaleY);
					ratio = Math.min(1,ratio);
				}
				
				scaleX = Math.round(WIDTHGUIDE*ratio);
				scaleY = Math.round(HEIGHTGUIDE*ratio);
				
				posX = Math.round( (windowW - scaleX) * 0.5 );
				posY = Math.round( (windowH - scaleY) * 0.5 );
				
				loading.style.left = menus.style.left = canvas.style.left = backgroundImg.style.left = posX+"px";
				loading.style.top = menus.style.top = canvas.style.top =  backgroundImg.style.top = posY+"px";
				/*loadingImg.style.height = */loading.style.width = menus.style.width = canvas.style.width =  backgroundImg.style.width = scaleX+"px";
				/*loadingImg.style.height = */loading.style.height = menus.style.height = canvas.style.height = backgroundImg.style.height = scaleY+"px";
				//
				var setCssTransform = function(styleObject,transform){
					styleObject.webkitTransform = transform;
					styleObject.MozTransform = transform;
					styleObject.msTransform = transform;
					styleObject.OTransform = transform;
					styleObject.transform = transform;
				}
				var setCssTransformOrigin = function(styleObject,transform){
					styleObject.webkitTransformOrigin = transform;
					styleObject.MozTransformOrigin = transform;
					styleObject.msTransformOrigin = transform;
					styleObject.OTransformOrigin = transform;
					styleObject.transformOrigin = transform;
				}
				setCssTransform(loading.style,'scale('+ratio+','+ratio+')');
				setCssTransformOrigin(loading.style,'0 0');
				//
				
				backgroundImg.style.display = "block";
				
				
				menus.width = 1136;
				menus.height = 672;
				
				window.canvasRatio = ratio;//.toFixed(2);
				
				window.visibleWidth = Math.round(windowW / ratio);
				window.visibleHeight = Math.round(windowH / ratio);
				
				window.visibleWidth = Math.min(window.visibleWidth,WIDTHGUIDE);
				window.visibleHeight = Math.min(window.visibleHeight,HEIGHTGUIDE);
				
				
				if(window.ig){
					if (window.ig.Menus) window.ig.Menus.handleDeviceUpdate();
					if (window.ig.game) window.ig.game.resized();
				}
				
				//hideBars();
			//}
		}
	}
	
	function isMobile(){
		return (function(a) {
		    if(/android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|playbook|silk/i.test(a)
		    ||
		    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
		    {
		        return true;
		    }
		    else{
		    	return false;
		    }
		})(navigator.userAgent||navigator.vendor||window.opera);
		return true;
	}
	
	function removeDecorations(target){
		if(target.locationbar) target.locationbar.visible=false;
		if(target.menubar) target.menubar.visible=false;
		if(target.personalbar) target.personalbar.visible=false;
		if(target.scrollbars) target.scrollbars.visible=false;
		if(target.statusbar) target.statusbar.visible=false;
		if(target.toolbar) target.toolbar.visible=false;
	}
	
	window.removeDecorations = removeDecorations;
	window.adaptToResolution = function(){if(init === false){init = true;setup();resizeHandler({});resizeCanvas();}};
	
}(window));