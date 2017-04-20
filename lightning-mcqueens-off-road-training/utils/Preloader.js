//3 places to input your visuals for the preloader

;(function(window){
	
	var
		Preloader={},
		res = [],
		totalRes = 0,
		currProgress = 0,
		delay = 1000,
		//maxLoadTime = 5000,
		loaded = false,
		isShowing = false,
		assetIdCorrector = 0,
		cover = document.getElementById("loadingBackground"),
		mover = document.getElementById("loadingMover"),
		turner = document.getElementById("loadingWheelFront"),
		loadingText = document.getElementById("loadingText"),
		movingDist = 590,
		wheelRadius = 83
	;
	
	Preloader.set = function(){
		console.log("PRELOADER SHOWING");
		Preloader.reset();
		Preloader.show();
		/*
		setTimeout(function(){
			if(loaded == false && res.length != 0){
				loaded = true;
				Preloader.hide();
			}
		},maxLoadTime);
		*/
	};
	
	Preloader.update = function(key, val){
		if(key != 0 && res[0] == undefined){
			assetIdCorrector = key;
		}
		res[key-assetIdCorrector] = val;
		
		
		//console.log("PRELOADER UPDATE: "+key+" ("+(key-assetIdCorrector)+"), "+val);
		
		
		var currPcent = Preloader.totalPercent();
		
		;(function(len){
			if(currPcent == 100 && loaded == false){
				setTimeout(function(){Preloader.checkComplete(len)}, delay);
			}
		})(res.length);
		
		var setCssTransform = function(styleObject,transform){
			styleObject.webkitTransform = transform;
			styleObject.MozTransform = transform;
			styleObject.msTransform = transform;
			styleObject.OTransform = transform;
			styleObject.transform = transform;
		}
		
		// 1:
		//Update visually
		//currPcent is the value in percent of the screen that is loaded
		var translateVal = Math.round(movingDist*currPcent/100);
		setCssTransform(mover.style,"translate("+translateVal+"px,0px)");
		var rotVal = (translateVal * wheelRadius) / 180;
		setCssTransform(turner.style,"rotate("+rotVal+"deg)");
		loadingText.innerHTML = currPcent + "%";
	};
	
	Preloader.checkComplete = function(len){
		//console.log("CHECK COMPLETE: "+len+" vs "+res.length);
		if(len == res.length && loaded == false){
			//console.log("CHECK COMPLETE PASSED!");
			loaded = true;
			Preloader.hide();
		}
	};
	
	Preloader.totalPercent = function(){
		currProgress = 0;
		for(var i = 0; i< res.length; i++){
			currProgress += res[i];
			//console.log("PROGRESS: "+i+" = "+res[i]);
		}
		
		totalRes = res.length*100;
		
		return Math.round((currProgress/totalRes)*100);
	}
	
	Preloader.reset = function(){
		loaded = false;
		res = [];
		totalRes = 0;
		currProgress = 0;
	};
	
	Preloader.show = function(){
		// 2:
		//Show the preloader
		cover.style.display = "block";
		isShowing = true;
		//bar.style.width = "0%";
	};
	
	Preloader.hide = function(){
		if(loaded == true){
			// 3:
			//Hide the preloader
			cover.style.display = "none";
			isShowing = false;
			
			console.log("PRELOADER HIDING");
			
			if(ig.Menus.curMenuObj != null && ig.Menus.curMenuObj.loaded == false){
				ig.Menus.curMenuObj.loaded = true;
				ig.Menus.curMenuObj.onload();
			}
			Preloader.reset();
		}
	};
	
	Preloader.isVisible = function(){
		return isShowing;
	};
	
	window.Preloader = Preloader;
	
})(window);