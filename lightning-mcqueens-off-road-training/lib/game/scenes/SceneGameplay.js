ig.module( 
	'game.scenes.SceneGameplay' 
)
.requires(
	'impact.game',
	'game.scenes.SceneBase'
)
.defines(function(){
	
SceneGameplay = SceneBase.extend({
	
	joystickCenterOffsetX: 114,
	joystickCenterOffsetY: 112,
	joystickImgW: 256,
	joystickImgH: 234,
	gaspedalImg: new ig.Image( 'media/tempgaspedal.png' ),
	
	mapRedDotImg: new ig.Image( 'media/images/hud/hud_mapPlayer.png' ),
	mapBlueDotImg: new ig.Image( 'media/images/hud/hud_mapMarker.png' ),
	
	
	
	countdown3: new ig.Image( 'media/images/hud/countdown_3.png'),
	countdown2: new ig.Image( 'media/images/hud/countdown_2.png'),
	countdown1: new ig.Image( 'media/images/hud/countdown_1.png'),
	countdown0: new ig.Image( 'media/images/hud/countdown_0.png'),
	
	
	lap1: new ig.Image( 'media/images/hud/lap_1.png'),
	lap2: new ig.Image( 'media/images/hud/lap_2.png'),
	lap3: new ig.Image( 'media/images/hud/lap_3.png'),
	
	lapEmpty1: new ig.Image('media/images/hud/lap1empty.png'),
	lapEmpty2: new ig.Image('media/images/hud/lap2empty.png'),
	lapEmpty3: new ig.Image('media/images/hud/lap3empty.png'),
	
	lapFull1: new ig.Image('media/images/hud/lap1full.png'),
	lapFull2: new ig.Image('media/images/hud/lap2full.png'),
	lapFull3: new ig.Image('media/images/hud/lap3full.png'),
	
	
	
	displayingDebugNumber:0,
	gameover:false,
	gamewon:false,
	
	steeringAng:0,
	
	countingDown:true,
	countdownItem:-1,
	countdownItemTime:0,
	countdownItemTimeFull:50,
	
	lapstatusCountdown:0,
	lapstatusCountdownMax:150,
	lapstatusIndex:0,
	
	
	loadedTilesCount:0,
	totalTilesCount:0,
	
	tilesLoaded:false,
	
	
	debugFrameMeterSupportImg: new ig.Image( 'media/debugFrameRuler.png'),
	debugFrameMeterImg: new ig.Image( 'media/debugFrameMeter.png'),
	
	
	start:function(){
		
		console.log("hello from scenegameplay!");
		
		var levelNum = ig.game.levelToLoad;
		console.log("loading level "+levelNum);
		
		var curLevelInfo = ig.game.levelInfo[levelNum];
		
		this.bgMapTileSize = curLevelInfo.levelBgTileSize;
		ig.game.curGameMode = curLevelInfo.levelMode;
		
		this.fullLevelTime = curLevelInfo.levelTime;
		
		this.starValues = curLevelInfo.scoreStarAmounts;
		
		ig.game.loadLevel( curLevelInfo.levelClass );
		
		this.mapW = ig.game.backgroundMaps[0].width  * ig.game.backgroundMaps[0].tilesize;
		this.mapH = ig.game.backgroundMaps[0].height * ig.game.backgroundMaps[0].tilesize;
		
		var bgMapTilesW = Math.ceil(this.mapW / this.bgMapTileSize);
		var bgMapTilesH = Math.ceil(this.mapH / this.bgMapTileSize);
		
		this.totalTilesCount = bgMapTilesH*bgMapTilesW;
		
		var theThis = this;
		var loadMapTileFunc = function(x,y){
			var callback = function(b) {
				var curImg = b;
				var curCanvas = document.createElement('canvas');
				curCanvas.width = curImg.width;
				curCanvas.height = curImg.height;
				var curContext = curCanvas.getContext('2d');
				curContext.drawImage(curImg,0,0);
				curContext.getImageData(1,1,1,1);
				theThis.bgMapCanvases[y][x] = curCanvas;
				
				theThis.loadedTilesCount++;
				console.log("HELLO FROM IMAGE LOADED: "+theThis.loadedTilesCount+" / "+theThis.totalTilesCount);
				if (theThis.loadedTilesCount == theThis.totalTilesCount) theThis.tilesLoaded = true;
			};
			FileSystem.download('media/leveltiles/'+curLevelInfo.levelBgName+'_'+(1+x)+"x"+(1+y)+".jpg", callback, null, null);
		}
		
		this.bgMapCanvases = [];
		for (var y=0; y<bgMapTilesH; y++) {
			this.bgMapCanvases[y] = [];
			for (var x=0; x<bgMapTilesW; x++) {
				this.bgMapCanvases[y][x] = null;
				loadMapTileFunc(x,y);
			}
		}
		
		this.minimapImg = new ig.Image('media/leveltiles/'+curLevelInfo.levelBgName+'_minimap.png');
		
		var joystickSheet = new ig.AnimationSheet( 'media/images/hud/hud_joystick.png', this.joystickImgW, this.joystickImgH );
		this.joystickAnim = new ig.Animation( joystickSheet, 1, [0], true );
		this.joystickAnim.pivot.x = this.joystickCenterOffsetX;
		this.joystickAnim.pivot.y = this.joystickCenterOffsetY;
		
		
		this.countdownSources = [this.countdown3,this.countdown2,this.countdown1,this.countdown0];
		this.countdownAnims = this.makeSheets(this.countdownSources);
		
		this.lapStatusSources = [this.lap1, this.lap2, this.lap3];
		this.lapStatusAnims = this.makeSheets(this.lapStatusSources);
		
		
		this.debugLastDrawTime = Date.now();
		
		
		this.lapsEmpty = [this.lapEmpty1,this.lapEmpty2,this.lapEmpty3];
		this.lapsFull = [this.lapFull1,this.lapFull2,this.lapFull3];
		
	},
	
	makeSheets:function(imageArray){
		var animArray = [];
		for (var i=0; i<imageArray.length; i++) {
			var curImg = imageArray[i];
			var curSheet = new ig.AnimationSheet(curImg.path,curImg.width,curImg.height);
			animArray[i] = new ig.Animation( curSheet, 1, [0], true );
		}
		return animArray;
	},
	
	resized:function(){
		
		this.ltEdge = ig.game.maxW/2 - ig.game.visibleGameW/2;
		this.rtEdge = ig.game.maxW/2 + ig.game.visibleGameW/2;
		
		this.tpEdge = ig.game.maxH/2 - ig.game.visibleGameH/2;
		this.btEdge = ig.game.maxH/2 + ig.game.visibleGameH/2;
		
		var joyMargin = 32;
		this.joyX = this.ltEdge + joyMargin + this.joystickCenterOffsetX;
		this.joyY = this.btEdge - joyMargin - this.joystickImgH + this.joystickCenterOffsetY;
		
		this.gasX = this.rtEdge - joyMargin - 48;
		this.gasY = this.btEdge - joyMargin - 64;
		
		var minimapMargin = 0;
		this.minimapX = this.rtEdge - minimapMargin;
		this.minimapY = this.tpEdge + minimapMargin;
		
		// the loadbar spans the screen, so adjust its edges to whatever the screen is like
		// (the design being shifted horizontally doesn't matter)
		this.loadbarW = ig.game.visibleGameW;
		this.loadbarX = this.ltEdge;
		
	},
	
	update:function(mainUpdate){
		
		if (!Preloader.isVisible()) {
			
			this.countdownItemTime--;
			if (this.countdownItemTime <= 0) {
				this.countdownItemTime = this.countdownItemTimeFull;
				this.countdownItem++;
				if (this.countdownItem == this.countdownAnims.length-1) {
					this.countingDown = false;
					if (ig.game.curGameMode == 'race') this.showLapStatus(0);
					ig.Menus.curMenuObj.showhud();
				}
			}
			// draw in draw...
			
		}
		
		mainUpdate();
		
	},
	
	gameplayRunning:function(){
		if (this.countingDown) return false;
		if (!ig.Menus.curMenuObj.gameRunning()) return false;
		if (Preloader.isVisible()) return false;
		
		return true;
	},
	
	draw:function(mainDraw){
		
		
		if(this.tilesLoaded){
			
			// draw level background image
			
			var tileStartY = Math.floor(ig.game.screen.y/this.bgMapTileSize);
			var tileStartX = Math.floor(ig.game.screen.x/this.bgMapTileSize);
			var tileEndY = Math.floor((ig.game.screen.y+ig.system.height)/this.bgMapTileSize);
			var tileEndX = Math.floor((ig.game.screen.x+ig.system.width)/this.bgMapTileSize);
			
			tileStartX = Math.max(tileStartX,0);
			tileStartY = Math.max(tileStartY,0);
			tileEndX = Math.min(tileEndX,this.bgMapCanvases[0].length-1);
			tileEndY = Math.min(tileEndY,this.bgMapCanvases.length-1);
			
			var numTilesWide = tileEndX-tileStartX;
			var numTilesHigh = tileEndY-tileStartY;
			//console.log(numTilesWide+"x"+numTilesHigh);
			
			for (var y = tileStartY; y<=tileEndY; y++) {
				for (var x = tileStartX; x<=tileEndX; x++) {
					var drawX = x*this.bgMapTileSize - ig.game.screen.x;
					var drawY = y*this.bgMapTileSize - ig.game.screen.y;
					//this.bgMapImages[y][x].draw(Math.floor(drawX),Math.floor(drawY));
					ig.system.context.drawImage( this.bgMapCanvases[y][x], Math.floor(drawX), Math.floor(drawY) );
				}
			}
			
		}
		
		
		
		mainDraw();
		
		
		if (!this.countingDown) {
			
			var minimapW = this.minimapImg.width;
			var minimapH = this.minimapImg.height;
			var actualMinimapX = this.minimapX-minimapW;
			var actualMinimapY = this.minimapY;
			
			this.minimapImg.draw(actualMinimapX,actualMinimapY);
			
			var mapdots = [];
			mapdots.push( {img:this.mapRedDotImg,x:this.playerCarRef.pos.x,y:this.playerCarRef.pos.y} );
			if (ig.game.curGameMode == 'fetch') {
				for (var fetchItemIndex=0; fetchItemIndex<this.fetchItems.length; fetchItemIndex++){
					var curFetchItem = this.fetchItems[fetchItemIndex];
					mapdots.push( { img:this.mapBlueDotImg, x:curFetchItem.pos.x, y:curFetchItem.pos.y } );
				}
			}
			for (var dotIndex=0; dotIndex<mapdots.length; dotIndex++) {
				var curDotInfo = mapdots[dotIndex];
				curDotInfo.img.draw( actualMinimapX + curDotInfo.x/this.mapW * minimapW - curDotInfo.img.width/2, actualMinimapY + curDotInfo.y/this.mapH * minimapH - curDotInfo.img.height/2 );
			}
			
			if (!ig.game.keyboardMode) {
				this.joystickAnim.angle = this.steeringAng;
				this.joystickAnim.draw(this.joyX-this.joystickCenterOffsetX,this.joyY-this.joystickCenterOffsetY);
				if (ig.game.controlInfo.gaspedal)this.gaspedalImg.draw(this.gasX-48,this.gasY-64);
			}
			
			if (ig.game.curGameMode == 'race') {
				for (var i=0; i<3; i++) {
					var curList = i<this.lapstatusIndex ? this.lapsFull : this.lapsEmpty ;
					curList[i].draw(90+i*100, 70);
				}
			}
			
		}
		
		
		
		
		if ((this.countdownItem < this.countdownAnims.length) && (this.countdownItem >= 0)) {
			var fadeAmt = (this.countdownItemTime / this.countdownItemTimeFull);
			if (this.countdownItem < this.countdownAnims.length-1) fadeAmt = 1-( Math.pow((1-fadeAmt),4) );
			var curImg = this.countdownSources[this.countdownItem];
			var curAnim = this.countdownAnims[this.countdownItem];
			curAnim.alpha = fadeAmt;
			var drawX = ig.game.maxW/2 - curImg.width/2;
			var drawY = ig.game.maxH/2 - curImg.height/2;
			curAnim.draw( drawX, drawY );
		}
		
		if (this.lapstatusCountdown > 0) {
			this.lapstatusCountdown--;
			var lapstatusFrac = this.lapstatusCountdown / this.lapstatusCountdownMax;
			lapstatusFrac = 1-(Math.pow(1-lapstatusFrac,4));
			var curImg = this.lapStatusSources[this.lapstatusIndex];
			var curAnim = this.lapStatusAnims[this.lapstatusIndex];
			curAnim.alpha = lapstatusFrac;
			var drawX = ig.game.maxW/2 - curImg.width/2;
			var drawY = this.btEdge - 20 - curImg.height;
			curAnim.draw( drawX, drawY );
		}
		
		
		
		
		/*
		var newTime = Date.now();
		var timeGap = newTime - this.debugLastDrawTime;
		this.debugLastDrawTime = newTime;
		
		this.debugFrameMeterSupportImg.draw(this.ltEdge,this.btEdge - 128);
		this.debugFrameMeterImg.draw(this.ltEdge,this.btEdge - timeGap);
		*/
		
		
	},
	
	showLapStatus:function(lapNum){
		this.lapstatusIndex = lapNum;
		this.lapstatusCountdown = this.lapstatusCountdownMax;
	},
	
	levelComplete:function(score,stars){
		
		var levelNum = ig.game.levelToLoad;
		if(ig.game.currentScene.gamewon){
			this.saveIfHigher("levelBeat",(levelNum+1));
		}
		this.saveIfHigher("level"+levelNum+"score",score);
		this.saveIfHigher("level"+levelNum+"stars",stars);
		
	},
	saveIfHigher:function(key,newVal){
		console.log(key+" "+newVal);
		if (LocalStorage.get(key) < newVal) LocalStorage.set(key,newVal);
		console.log(key+" "+LocalStorage.get(key));

	},
	
	dispose:function(){
		// destroy images somehow?
		// or can we just trust GC?
	}
	
});
	
});
