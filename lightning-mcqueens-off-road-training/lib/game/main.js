function gameStart(){
window.adaptToResolution();
window.removeDecorations(window);
var canvas = document.getElementById("canvas");
var debugStrip = document.getElementById("debugStrip");

//Put song names here
var songs = ["Collision","Fail","Flag","MenuBGM","Objective","PickUp","Win", "gameplayBGM"/*,"lightStart"*/,"driveSound","idle"];

function loadSongs(){
	for(var i = 0; i<songs.length; i++){
		soundManager.createSound({
			id: songs[i],
			url: 'media/music/'+songs[i]+'.mp3',
			autoLoad: true,
			autoPlay: false,
			onload: function() {
				console.log(this.id + " song has loaded");
				//soundManager.play(this.id);
				//if(this.id != "MenuBGM"){
					soundManager.stop(this.id);
				//}
			}
		});
	}
}

ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.input',
	'impact.screen',
	'plugins.multitouch',
	//'plugins.scale',
	
	//'impact.debug.debug',
	
	'game.scenes.SceneGameplay',
	'game.levels.title',
	'game.levels.story',
	'game.levels.confirmNew',
	'game.levels.htp',
	'game.levels.lvlSelect',
	'game.levels.gameplay',
	'game.levels.endGame',

	'game.conf.levels',
	'game.conf.controls',
	
	'game.levels.emptylevel',
	
	'game.entities.playercar'
	
)
.defines(function(){

MyGame = ig.Game.extend({
	
	gravity: 0,
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	/*
	safezoneDebugImg: new ig.Image( 'media/safezonetestimage.png' ),
	cornerDebugImg: new ig.Image( 'media/testcorner.png' ),
	*/
	
	oldWinW:0,
	oldWinH:0,
	
	minW:960,
	minH:536,
	maxW:1136,
	maxH:672,
	
	logicHeartbeats:0,
	maxHeartbeatsPerFrame:3,
	logicHeartbeatsPerSecond:50,
	
	currentScene:null,
	
	clearColor:false,//to allow drawing behind the game
	
	init: function() {
		// Initialize your game here; bind keys etc.
		
		// Game config here
		LocalStorage.key = 'cars_v1_';
		
		console.log("first time is strictly equal to null:");
		console.log(LocalStorage.get('firstTime') === null);
		
		if(LocalStorage.get('firstTime') === null)
		{
			LocalStorage.set('firstTime', 'true');

			// Is this the right place to set up localstorage ???
		}

		ig.game.currentSong = 'MenuBGM';
    	window.playSongPls = true;

		ig.global.gameMuted = false;
		ig.global.menuSongStarted = false;

		this.keyboardMode = !ig.ua.touchDevice;
		
		if (this.keyboardMode) {
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.UP_ARROW, 'forward');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'backward');
			//ig.input.bind( ig.KEY.MOUSE1, 'default' );
		} else {
			//ig.input.bind( ig.KEY.MOUSE1, 'click' );
		}
		
		if (this.controlInfo.allowCheats) {
			console.log("-=-=-=-=-= DEBUG CHEATS ENABLED! =-=-=-=-=-")
			ig.input.bind(ig.KEY.W, 'win');
		}
		
		ig.BackgroundMap.inject({
			
			visible: true,
			
			draw: function() {
				if (!this.visible) return;
				this.parent();
			}
			
		});
		
		if(window.isMobile){
	   		ig.music.add('media/music/MenuBGM.mp3', 'MenuBGM');
	   		ig.music.add('media/music/gameplayBGM_mobile.mp3', 'gameplayBGM');
	   		ig.music.add('media/music/Objective.mp3', 'Objective');
	   		ig.music.add('media/music/Win.mp3', 'Win');
	   		ig.music.add('media/music/Fail.mp3', 'Fail');
	   		ig.music.loop = true;
	   		//ig.music.play('MenuBGM');
   		}else{
			soundManager.setup({
				url: 'utils/sm_swf/',
				flashVersion: 9, // optional: shiny features (default = 8)
				// optional: ignore Flash where possible, use 100% HTML5 mode
				preferFlash: false,
				onready: function() {
				    // Ready to use; soundManager.createSound() etc. can now be called.
					loadSongs();
				}
			});
		}

		ig.game.clearColor = null;
		
		this.startTime = Date.now();


		if(LocalStorage.working()){
			ig.Menus.loadMenu("title");
		}

	},

	playSong: function(){
		ig.global.menuSongStarted = true;
		if(!ig.global.gameMuted){
			if(ig.ua.mobile){
				window.playSongPls = true;
				ig.music.play(ig.game.currentSong);
				if(ig.game.currentSong == 'MenuBGM' || ig.game.currentSong == 'gameplayBGM'){
					ig.music.loop = true;
				}
				else{
					ig.music.loop = false;
				}
			}else{
				soundManager.play(ig.game.currentSong,{
					onfinish: function() {
		    			ig.game.playSong();
		  			}
				});
			}
		}
	},

	loopSong: function(song){
		soundManager.play(song,{
				onfinish: function() {
		    		ig.game.loopSong(song);
		  		}
		});
	},
	
	loadScene: function(sceneClass){
		if (this.currentScene != null) {
			this.currentScene.dispose();
			this.currentScene = null;
		}
		if (sceneClass != null) {
			this.currentScene = new sceneClass();
			this.currentScene.start();
			this.currentScene.resized();
			// there might be some kinda weird situation around resized, update, start, and ready... sort this out!
		}
	},
	
	resized: function(){
		this.gameScale = window.canvasRatio;
		this.visibleGameW = window.visibleWidth;
		this.visibleGameH = window.visibleHeight;
		
		if (this.currentScene) this.currentScene.resized();
		if (ig.Menus && ig.Menus.curMenuObj && ig.Menus.curMenuObj.resize) ig.Menus.curMenuObj.resize();
	},
	
	update: function() {
		
		// do I need this in both places? who knows at this point...
		this.gameScale = window.canvasRatio;
		this.visibleGameW = window.visibleWidth;
		this.visibleGameH = window.visibleHeight;
		
		
		// call all of the entity updates UNTIL THE GAME IS CAUGHT UP
		//
		// note that this will probably mess up any entities who call the default update parent...
		// playercar substitutes the update parent with its own code for a fixed framerate
		
		var worldTime = (Date.now() - this.startTime) / 1000;
		if(this.currentScene){
			var goalHeartbeats = Math.floor(worldTime * this.logicHeartbeatsPerSecond);
			
			if ( (goalHeartbeats - this.logicHeartbeats) > this.maxHeartbeatsPerFrame ) this.logicHeartbeats = goalHeartbeats - this.maxHeartbeatsPerFrame;//eventually allow the game to just run slowly
			
			while (this.logicHeartbeats < goalHeartbeats) {
				
				this.currentScene.update( this.parent.bind(this) );
				
				this.logicHeartbeats++;
				
			}
		}
		
	},
	
	draw: function() {
		
		//Dont render, it's not worth it. -> should probably be used in update too (in a more efficient way) 
		if(window.isLandscape()){
			//ig.system.context.clearRect( 0 ,0, ig.system.realWidth, ig.system.realHeight );
			this.parent();
			
			if(this.currentScene){
			this.currentScene.draw( this.parent.bind(this) );
			window.reDraw = true;
			}
			//else{
				ig.Menus.draw(this);
			//}
		}
		
		/*
		this.safezoneDebugImg.draw(0,0);
		var cornerX = 1136/2 - this.visibleGameW/2;
		var cornerY = 672/2 + this.visibleGameH/2 - 64;
		this.cornerDebugImg.draw( cornerX, cornerY );
		console.log("corner draw:");
		console.log(cornerX);
		console.log(cornerY);
		*/
		
		//debugStrip.innerHTML = "W:"+canvas.width + " | iW:" + window.innerWidth + " | "+ig.Menus.currentMenu +":"+ig.Menus.Container.getChildByName(ig.Menus.currentMenu).width+ "x"+ ig.Menus.Container.getChildByName(ig.Menus.currentMenu).height+ " | bW:"+ig.Menus._buffer("main").width+ " | H:"+canvas.height + " | iH:" + window.innerHeight+ " | bH:"+ig.Menus._buffer("main").height+" | r:"+window.canvasRatio+"</span>";

	},
	
	rotNorm:function(val) {
		while (val < 0) val += Math.PI * 2;
		while (val > Math.PI * 2) val -= Math.PI * 2
		return val;
	},
		
	rotGap:function(goal, pos) {
		goal = this.rotNorm(goal);
		pos = this.rotNorm(pos);
		
		var defVal = goal - pos;
		var altVal = goal + (Math.PI * 2 * (goal>pos?-1:1)) - pos;
		
		return ( Math.abs(defVal) < Math.abs(altVal) )?defVal:altVal;
	}
	
});


ig.main( '#canvas', MyGame, 60, 1136, 672, 1 );// put the safezone sizes in some global variable somewhere


});
}