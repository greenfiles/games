ig.module(
	'game.entities.playercar'
)
.requires(
	'impact.entity',
	'game.entities.pointPickup',
	'game.entities.scaleable'
)
.defines(function(){

EntityPlayercar = ig.Entity.extend({
	
	size: {x: 48, y: 48},
	offset: {x:24,y:0},
	name: "lightning",
	zIndex:1,

	momentum:{x:0,y:0},
	
	facingAng:0,
	turningMomentum:0,
	
	cameraLeadX:0,
	cameraLeadY:0,
	
	score:0,
	oil:0,
	
	lastRaceMarker:0,
	curLap:0,
	highestLap:0,
	
	curEyePt:0,
	
	swerveC:0,
	swerveSpd:0,
	swerveAmt:0,
	swerveLength:0,
	
	currentlyOnTileType:1,
	
	
	awaitingGameOver:false,
	awaitingGameOverWon:false,
	awaitingGameOverCountdown:0,
	
	soundPlayed:false,
	
	smokeCountdown:0,

	lightStart:false,
	
	animSheetNormal: new ig.AnimationSheet( 'media/images/character/lightning.png', 96, 47 ),
	animSheetAlternate: new ig.AnimationSheet( 'media/images/character/lightningAlternate.png', 96, 47 ),
	
	init: function( x, y, settings ) {
		
		this.parent( x, y, settings );
		
		this.animSheet = ig.game.carChoice ? this.animSheetAlternate : this.animSheetNormal ;
		
		this.addAnim( 'normal', 0, [0], true );
		
	},
	
	ready: function(){
		
		this.eyesEntity = ig.game.spawnEntity( EntityEyes, this.pos.x, this.pos.y);
		this.shadowEntity = ig.game.spawnEntity( EntityShadow, this.pos.x, this.pos.y);
		ig.game.sortEntitiesDeferred();
		
		
		this.smokepool = [];
		this.activesmokes = [];
		
		
		this.mapW = ig.game.backgroundMaps[0].width  * ig.game.backgroundMaps[0].tilesize;
		this.mapH = ig.game.backgroundMaps[0].height * ig.game.backgroundMaps[0].tilesize;
		
		this.camX = this.mapW/2;
		this.camY = this.mapH/2;
		
		ig.game.backgroundMaps[0].visible = false;
		
		// copy from config:
		this.bumpFriction = ig.game.controlInfo.collisionFriction;
		
		this.scrollFrac = ig.game.controlInfo.baseCameraSmooth;
		this.cameraLeadAmt = ig.game.controlInfo.cameraLeadAmt;
		this.cameraLeadSpeed = ig.game.controlInfo.cameraLeadSpeed;
		
		this.tankmode = ig.game.controlInfo.tankmode;
		
		this.timeLeft = ig.game.currentScene.fullLevelTime * ig.game.logicHeartbeatsPerSecond;
		
		this.awaitingGameOverCountdown = ig.game.controlInfo.gameOverDelayFrames;
		
		
		this.smokeOffsetDist = ig.game.controlInfo.smokeStartDistance;
		
		
		this.raceMode = false;
		this.obstacleMode = false;
		this.fetchMode = false;

		this.playerInvincibleTimeout = 0;
		
		switch (ig.game.curGameMode) {
			case 'obstacle':
				this.raceMode = true;
				this.obstacleMode = true;
			break;
			case 'race':
				this.raceMode = true;
				//ig.Menus.curMenuObj.setLap(0);
			break;
			case 'fetch':
				this.fetchMode = true;
			break;
		}
		
		if (this.raceMode) {
			var raceMarkersInScene = ig.game.getEntitiesByType(EntityRacemarker);
			this.raceMarkers = [];
			for (var raceMarkerIndex=0; raceMarkerIndex<raceMarkersInScene.length; raceMarkerIndex++) {
				var curRaceMarker = raceMarkersInScene[raceMarkerIndex];
				console.log(curRaceMarker);
				this.raceMarkers[curRaceMarker.order] = curRaceMarker;
			}
			this.goalLaps = 3;//may be overridden
			ig.Menus.curMenuObj.setObj("race");
		}
		
		if (this.obstacleMode) {
			this.playerHealth = 3;
			this.goalLaps = 1;
			ig.Menus.curMenuObj.setObj("obst");
			ig.Menus.curMenuObj.setLifeNum(3);
		}
		
		this.switches = ig.game.getEntitiesByType(EntityBridgeSwitch);
		this.pickupItems = ig.game.getEntitiesByType(EntityPointPickup);
		ig.game.currentScene.fetchItems = [];
		ig.game.currentScene.playerCarRef = this;
		
		if (this.fetchMode) {
			var fetchItemTypes = [EntityFetchItemA,EntityFetchItemB,EntityFetchItemC];
			for (var fetchItemTypeIndex=0; fetchItemTypeIndex<fetchItemTypes.length; fetchItemTypeIndex++) {
				var itemsOfThisType = ig.game.getEntitiesByType(fetchItemTypes[fetchItemTypeIndex]);
				var randIndex = Math.floor(Math.random()*itemsOfThisType.length);
				for (var curItemListIndex=0; curItemListIndex<itemsOfThisType.length; curItemListIndex++) {
					var curItem = itemsOfThisType[curItemListIndex];
					if (curItemListIndex == randIndex) {
						this.pickupItems.push(curItem);
						ig.game.currentScene.fetchItems.push(curItem);
					} else {
						curItem.kill();
					}
				}
			}
			this.fetchItemsFound = 0;
			ig.Menus.curMenuObj.setObj("fetch");
			ig.Menus.curMenuObj.setFlagNum(0);
		}
		
		this.updateCamera(true);
		
	},
	
	getSmoke:function(){
		if (this.smokepool.length > 0) {
			return this.smokepool.pop();
		} else {
			var newSmoke = ig.game.spawnEntity( EntitySmoke, 0,0 );
			ig.game.sortEntities();//Deferred();
			return newSmoke;
		}
	},
	
	destroySmoke:function(theSmoke){
		this.smokepool.push(theSmoke);
	},
	
	update: function(){
		
		
		if (!ig.game.currentScene.gameplayRunning()) return;
		
		
		var turningDir = 0;
		var drivingDir = 0;
		
		var turningGoalAng = 0;
		var useTurningGoalAng = false;
		
		

		if (ig.game.keyboardMode) {
			
			if (this.tankmode) {
				
				if (ig.input.state('left')) turningDir--;
				if (ig.input.state('right')) turningDir++;
				
				if (ig.input.state('forward')){ 
					drivingDir++; 
					soundManager.resume("driveSound");
					soundManager.pause("idle");
					/*if(!this.lightStart){
						this.lightStart = true;
						soundManager.play("lightStart");
					}*/
				}
				if (ig.input.state('backward')){ 
					drivingDir--; 
					soundManager.resume("driveSound");
					soundManager.pause("idle");
					/*if(!this.lightStart){
						this.lightStart = true;
						soundManager.play("lightStart");
					}*/
				}

				if (!ig.input.state('forward') && !ig.input.state('backward')){ 
					soundManager.pause("driveSound");
					soundManager.resume("idle");
					/*soundManager.stop("lightStart"); 
					this.lightStart = false;*/
				}
				
			} else {
				
				var xKey = 0;
				var yKey = 0;
				
				if (ig.input.state('left')) xKey--;
				if (ig.input.state('right')) xKey++;
				
				if (ig.input.state('forward')) yKey--;
				if (ig.input.state('backward')) yKey++;
				
				if (xKey || yKey) {
					drivingDir = 1;
					
					turningGoalAng = Math.atan2(yKey,xKey);//a bit overkill, but less code...
					useTurningGoalAng = true;
					
				}
				
			}
			
		} else {
			
			//console.log("---");
			var _input = window.input();
			
			//for ( var t in ig.input.touches ) {
				
				var touchX = _input.x;
				var touchY = _input.y;
				
				//console.log(touchX);
				
				var joyGapX = touchX - ig.game.currentScene.joyX;
				var joyGapY = touchY - ig.game.currentScene.joyY;
				var joyGapAng = Math.atan2(joyGapY,joyGapX);
				var joyGapDist = Math.sqrt(joyGapX*joyGapX+joyGapY*joyGapY);
				
				if (joyGapDist  < 192) {
					
					turningGoalAng = joyGapAng;
					useTurningGoalAng = true;
					
					if (!ig.game.controlInfo.gaspedal) drivingDir = 1;
					
				}
				
				if (ig.game.controlInfo.gaspedal) {
					
					var gasGapX = touchX - ig.game.currentScene.gasX;
					var gasGapY = touchY - ig.game.currentScene.gasY;
					
					if (Math.abs(gasGapX) < 48 && Math.abs(gasGapY) < 64) {
						drivingDir = 1;
					}
					
				}
				
			//}
		}
		
		if (useTurningGoalAng) {
			var turningGap = ig.game.rotGap(turningGoalAng, this.facingAng);
			if (Math.abs(turningGap) > 0.1) {
				turningDir = (turningGap > 0) ? 1 : -1;
			}
			ig.game.currentScene.steeringAng = turningGoalAng;
		}
		
		var eyeFrameGoal = turningDir * 0.5 + 0.5;
		this.curEyePt += (eyeFrameGoal - this.curEyePt) * 0.1;
		this.eyesEntity.currentAnim.gotoFrame( Math.round(this.curEyePt*15) );
		
		
		var oldTileType = this.currentlyOnTileType;
		this.currentlyOnTileType = ig.game.backgroundMaps[0].getTile(this.pos.x,this.pos.y);
		var curTerrainProperties = ig.game.controlInfo.terrainTypes[this.currentlyOnTileType];
		
		
		if ( (oldTileType == 1) && (this.currentlyOnTileType == 0) ) {
			this.loadSwerve(ig.game.controlInfo.roadToGrassSwerve);
			console.log("INTO DIRT");
		}
		if ( (oldTileType == 0) && (this.currentlyOnTileType == 1) ) {
			this.loadSwerve(ig.game.controlInfo.grassToRoadSwerve);
			console.log("ONTO ROAD");
		}
		
		
		this.turningMomentum += (turningDir - this.turningMomentum) * curTerrainProperties.turnSmooth;
		this.facingAng += this.turningMomentum * curTerrainProperties.turnSpeed;
		
		this.swerveC += this.swerveSpd;
		this.swerveAmt *= this.swerveLength;
		if (this.swerveAmt < 0.01) {
			this.swerveAmt = 0;
			this.swerveC = 0;
		}
		this.currentAnim.angle = this.facingAng + Math.sin(this.swerveC)*this.swerveAmt;
		
		
		if (drivingDir) {
			this.momentum.x += Math.cos(this.facingAng) * drivingDir * curTerrainProperties.driveSpeed;
			this.momentum.y += Math.sin(this.facingAng) * drivingDir * curTerrainProperties.driveSpeed;
		}
		
		this.momentum.x *= curTerrainProperties.driveFriction;
		this.momentum.y *= curTerrainProperties.driveFriction;
		
		var momentumDir = Math.atan2(this.momentum.y,this.momentum.x);
		var momentumAmt = Math.sqrt(this.momentum.y*this.momentum.y + this.momentum.x*this.momentum.x);
		var momentumDirGap = momentumDir - this.facingAng;
		var momentumGapX = Math.cos(momentumDirGap)*momentumAmt;
		var momentumGapY = Math.sin(momentumDirGap)*momentumAmt;
		momentumGapY *= curTerrainProperties.driftFriction;
		var newMomentumDirGap = Math.atan2(momentumGapY,momentumGapX);
		var newMomentumAmt = Math.sqrt(momentumGapY*momentumGapY + momentumGapX*momentumGapX);
		var newMomentumDir = this.facingAng + newMomentumDirGap;
		
		this.momentum.x = Math.cos(newMomentumDir)*newMomentumAmt;
		this.momentum.y = Math.sin(newMomentumDir)*newMomentumAmt;
		
		
		// apply velocity, determine this frame's position
		//this.parent();
		// FORGET IT, we want the movement to be frame-locked, which means custom collision etc
		
		
		
		var collisionResult = ig.game.collisionMap.trace(this.pos.x,this.pos.y,this.momentum.x,this.momentum.y,this.size.x,this.size.y);
		
		if (collisionResult.collision.x || collisionResult.collision.y) {
			this.pos.x = collisionResult.pos.x;
			this.pos.y = collisionResult.pos.y;
			if (collisionResult.collision.x) this.momentum.x *= -1;
			if (collisionResult.collision.y) this.momentum.y *= -1;
			this.momentum.x *= this.bumpFriction;
			this.momentum.y *= this.bumpFriction;
			
			if(!ig.global.gameMuted && !this.soundPlayed){
				if(this.playerInvincibleTimeout == 0){
					this.soundPlayed = true;
					if (ig.game.curGameMode != 'obstacle') {
						this.playerInvincibleTimeout = 10;
					}
					if(!ig.ua.mobile){
						soundManager.play("Collision");
					}
				}
			}

			if (ig.game.curGameMode == 'obstacle') {
				if (this.playerInvincibleTimeout == 0) {
					this.playerHealth--;
					console.log("HIT! "+this.playerHealth);
					ig.Menus.curMenuObj.setLifeNum(this.playerHealth);
					if (this.playerHealth <= 0) {
						this.endGame(false);
					}
					this.playerInvincibleTimeout = 100;
				}
			}
		} else {
			this.pos.x += this.momentum.x;
			this.pos.y += this.momentum.y;
			this.soundPlayed = false;
		}
		
		if (this.playerInvincibleTimeout > 0) this.playerInvincibleTimeout--;
		
		this.shadowEntity.pos.x = this.eyesEntity.pos.x = this.pos.x;
		this.shadowEntity.pos.y = this.eyesEntity.pos.y = this.pos.y;
		this.shadowEntity.currentAnim.angle = this.eyesEntity.currentAnim.angle = this.currentAnim.angle;
		
		if (this.raceMode) {
			var touchingRaceMarker = -1;
			for (var raceMarkerIndex=0; raceMarkerIndex<this.raceMarkers.length; raceMarkerIndex++) {
				var curRaceMarker = this.raceMarkers[raceMarkerIndex];
				if (curRaceMarker.touches(this)) {
					touchingRaceMarker = raceMarkerIndex;
				}
			}
			if (touchingRaceMarker != -1) {
				//console.log("touching: "+touchingRaceMarker);
				if ( (this.lastRaceMarker == this.raceMarkers.length-1) && (touchingRaceMarker == 0) ) {
					this.curLap++;
					console.log("INTERNAL LAP: "+this.curLap);
					if (this.curLap > this.highestLap) {
						this.highestLap = this.curLap;
						console.log("LAP "+this.highestLap);
						
						if (this.highestLap == this.goalLaps) {
							this.endGame(true);
						} else {
							if (!this.obstacleMode) {
								//ig.Menus.curMenuObj.setLap(this.highestLap);
								ig.game.currentScene.showLapStatus(this.highestLap);
							}
						}
					}
				}
				if ( (this.lastRaceMarker == 0) && (touchingRaceMarker == this.raceMarkers.length-1) ) {
					this.curLap--;
					if (this.curLap < this.highestLap-1) {
						this.curLap = this.highestLap-1;
						console.log("user went an entire lap the wrong way...??");
					}
				}
				this.lastRaceMarker = touchingRaceMarker;
			}
		}
		
		
		for (var pickupItemIndex=this.pickupItems.length-1; pickupItemIndex>=0; pickupItemIndex--){
			var curPickupItem = this.pickupItems[pickupItemIndex];
			if (curPickupItem.touches(this)) {
				
				console.log("item get!");
				
				if (curPickupItem.isFetchItem) {
					
					if (this.fetchMode) {
						this.fetchItemsFound++;

					if(!ig.ua.mobile && !ig.global.gameMuted){
						soundManager.play("Flag");
					}	
						ig.Menus.curMenuObj.setFlagNum(this.fetchItemsFound);
						if (this.fetchItemsFound == 3) {
							this.endGame(true);
						}
					}
					
				} else {

					if(!ig.ua.mobile && !ig.global.gameMuted){
						soundManager.play("PickUp");
					}
					this.addPoints( curPickupItem.pointValue );
					this.addOil( curPickupItem.oilValue );
					this.addHealth( curPickupItem.healthValue );
					
				}
				
				ig.game.currentScene.fetchItems.erase(curPickupItem);
				
				curPickupItem.kill();
				this.pickupItems.splice(pickupItemIndex,1);
				
			}
		}
		
		for (var switchIndex=0; switchIndex<this.switches.length; switchIndex++) {
			var curSwitch = this.switches[switchIndex];
			var wasTouching = curSwitch.alreadyBeingTouched;
			var isTouching = curSwitch.touches(this);
			curSwitch.alreadyBeingTouched = isTouching;
			if (!wasTouching && isTouching) curSwitch.newTouch();
		}
		
		
		
		var carSpd = newMomentumAmt;
		
		if (carSpd > 0) {
			
			if (this.smokeCountdown > 0) {
				this.smokeCountdown--;
			} else {
				
				var newSmoke = this.getSmoke();
				
				newSmoke.currentAnim = newSmoke.anims.full;
				newSmoke.realX = this.pos.x + this.size.x/2 + Math.cos(this.currentAnim.angle)*this.smokeOffsetDist;
				newSmoke.realY = this.pos.y + this.size.y/2 + Math.sin(this.currentAnim.angle)*this.smokeOffsetDist;
				newSmoke.pushX = this.momentum.x * -1 * curTerrainProperties.smokeSpeedFrac;
				newSmoke.pushY = this.momentum.y * -1 * curTerrainProperties.smokeSpeedFrac;
				newSmoke.myScale = curTerrainProperties.smokeSizeStart;
				newSmoke.myScaleSpeed = curTerrainProperties.smokeSizeGrow;
				newSmoke.setScale(newSmoke.myScale,newSmoke.myScale);
				newSmoke.currentAnim.alpha = curTerrainProperties.smokeAlphaStartFrac * carSpd;
				newSmoke.myFadeSpeed = curTerrainProperties.smokeAlphaFade;
				
				this.activesmokes.push(newSmoke);
				
				this.smokeCountdown = curTerrainProperties.smokeDelayFrames;
				
			}
			
		}
		
		for (var smokeIndex=this.activesmokes.length-1; smokeIndex >= 0; smokeIndex--) {
			
			var curSmoke = this.activesmokes[smokeIndex];
			
			curSmoke.realX += curSmoke.pushX;
			curSmoke.realY += curSmoke.pushY;
			curSmoke.myScale += curSmoke.myScaleSpeed;
			
			curSmoke.setScale(1,1);
			curSmoke.pos.x = curSmoke.realX;
			curSmoke.pos.y = curSmoke.realY;
			curSmoke.setScale(curSmoke.myScale,curSmoke.myScale);
			
			curSmoke.currentAnim.alpha -= curSmoke.myFadeSpeed;
			curSmoke.currentAnim.angle += 0.1;
			
			if (curSmoke.currentAnim.alpha <= 0) {
				this.activesmokes.splice(smokeIndex,1);
				curSmoke.currentAnim = null;
				this.destroySmoke(curSmoke);
			}
			
		}
		
		
		
		this.updateCamera(false);
		
		
		
		if (!this.awaitingGameOver) {
			this.timeLeft--;
			if (this.timeLeft == 0) {
				this.endGame(false);
			}
		}
		
		var timeSeconds = Math.floor(this.timeLeft / ig.game.logicHeartbeatsPerSecond);
		var clockString = this.secondsToClockString(timeSeconds);
		if (!ig.game.currentScene.gameover) ig.Menus.curMenuObj.setTime(clockString);
		
		
		
		if (ig.game.controlInfo.allowCheats) {
			if (ig.input.pressed('win')) {
				this.endGame(true);
			}
		}
		
		
		
		if (this.awaitingGameOver) {
			if (this.awaitingGameOverCountdown > 0) {
				this.awaitingGameOverCountdown--;
				if (this.awaitingGameOverCountdown == 0) {
					
					ig.game.currentScene.gameover = true;
					ig.game.currentScene.gamewon = this.awaitingGameOverWon;
					
					if (this.awaitingGameOverWon) {
						console.log("YOU WIN!");
					} else {
						console.log("YOU LOSE!");
					}
					
					this.score += timeSeconds * ig.game.controlInfo.pointsPerSecond;
					var spentTime = ig.game.currentScene.fullLevelTime - timeSeconds;
					
					var stars = 0;
					for (var i=0; i<3; i++) {
						var curStarCutoff = ig.game.currentScene.starValues[i];
						if (this.score >= curStarCutoff) {
							stars = i+1;
						}
					}
					
					ig.Menus.curMenuObj.wonTime = this.secondsToClockString(spentTime);
					ig.Menus.curMenuObj.wonOil = this.oil;
					ig.Menus.curMenuObj.wonScore = this.score;
					ig.Menus.curMenuObj.wonStars = stars;
					
					ig.Menus.curMenuObj.showWinFailScreen();
					
					ig.game.currentScene.levelComplete(this.score,stars);
					
					//ig.global.winFailScreenX = 0;
					/*ig.game.loadLevelDeferred( LevelEmptylevel );
					
					ig.Menus.loadMenu("endGame");*/
					
				}
			}
		}
		
	},
	
	updateCamera:function(forceToGoal){
		
		var cameraLeadGoalX = this.momentum.x * this.cameraLeadAmt;
		var cameraLeadGoalY = this.momentum.y * this.cameraLeadAmt;
		
		if (forceToGoal) {
			this.cameraLeadX = cameraLeadGoalX;
			this.cameraLeadY = cameraLeadGoalY;
		} else {
			this.cameraLeadX += (cameraLeadGoalX - this.cameraLeadX) * this.cameraLeadSpeed;
			this.cameraLeadY += (cameraLeadGoalY - this.cameraLeadY) * this.cameraLeadSpeed;
		}
		
		var camGoalX = this.pos.x + this.cameraLeadX;
		var camGoalY = this.pos.y + this.cameraLeadY;
		
		var scrollMarginW = ig.game.visibleGameW/2;
		var scrollMarginH = ig.game.visibleGameH/2;
		
		camGoalX = Math.min(Math.max(scrollMarginW,camGoalX),this.mapW-scrollMarginW);
		camGoalY = Math.min(Math.max(scrollMarginH,camGoalY),this.mapH-scrollMarginH);
		
		if (forceToGoal) {
			this.camX = camGoalX;
			this.camY = camGoalY;
		} else {
			this.camX += (camGoalX - this.camX) * this.scrollFrac;
			this.camY += (camGoalY - this.camY) * this.scrollFrac;
		}
		
		// in case a window resize has made it out of bounds
		// (since the bounds are what's CURRENTLY VISIBLE,
		// not what's technically on the stage)
		this.camX = Math.min(Math.max(scrollMarginW,this.camX),this.mapW-scrollMarginW);
		this.camY = Math.min(Math.max(scrollMarginH,this.camY),this.mapH-scrollMarginH);
		
		ig.game.screen.x = this.camX - ig.system.width / 2;
		ig.game.screen.y = this.camY - ig.system.height / 2;
		
	},
	
	secondsToClockString:function(timeSeconds){
		var clockSeconds = timeSeconds%60;
		var clockMinutes = Math.floor(timeSeconds/60);
		if (clockSeconds < 10) clockSeconds = "0"+clockSeconds;
		return clockMinutes+":"+clockSeconds;
	},
	
	loadSwerve:function(swerveInfo){
		this.swerveSpd = swerveInfo.swerveSpd;
		this.swerveAmt = swerveInfo.swerveAmt;
		this.swerveLength = swerveInfo.swerveLength;
	},
	
	addPoints:function(pointsAmt){
		this.score += pointsAmt;
		console.log("NEW SCORE: "+this.score);
	},
	
	addOil:function(oilAmt){
		this.oil += oilAmt;
		console.log("NEW OIL AMOUNT: "+this.oil);
	},
	
	addHealth:function(healthAmt){
		if (healthAmt == 0) return;
		this.playerHealth += healthAmt;
		console.log("HEAL! "+this.playerHealth);
		ig.Menus.curMenuObj.setLifeNum(this.playerHealth);
	},
	
	endGame:function(won){
		
		if (this.awaitingGameOver) return;
		
		this.awaitingGameOver = true;
		this.awaitingGameOverWon = won;
		
	}
	
});

//below is where i put the shadow and eyes for lightning as entities. 

EntityShadow = ig.Entity.extend({
	
	size: {x: 0, y: 0},
	checkAgainst:ig.Entity.TYPE.NONE,
	offset:{x:20,y:-5},
	zIndex:0,
	
	
	animSheet: new ig.AnimationSheet( 'media/images/character/lightning_shadow.png', 96, 47 ),
	
	
	init: function( x, y, settings ) {
		
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0, [0], true );
		
	}
	
});

EntityEyes = ig.Entity.extend({
	
	size: {x: 0, y: 0},
	checkAgainst:ig.Entity.TYPE.NONE,
	zIndex:2,
	offset:{x:24,y:0},
	
	
	animSheet: new ig.AnimationSheet( 'media/images/character/lightning_eyes.png', 96, 47 ),
	
	
	init: function( x, y, settings ) {
		
		this.parent( x, y, settings );
		
		//I guess we'll see if we want to add more anims for when he turns or just create a loop with him looking right or left once in a while.
		this.addAnim( 'full', 1, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] );
		
	}
	
});

EntitySmoke = EntityScaleable.extend({
	
	zIndex:0,
	animSheet: new ig.AnimationSheet( 'media/images/character/smokeanim.png', 68, 72 ),
	offset:{x:34,y:36},
	
	init: function( x, y, settings ) {
		
		this.parent(x,y,settings);
		
		this.addAnim( 'full', 0.05, [0,1,2] );
		
	}
	
});

});