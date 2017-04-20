ig.module(
	'game.entities.bystanderBase'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBystanderBase = ig.Entity.extend({
        
        _wmIgnore:true,
	
	ready:function(){
		
		// pos apparently refers to the top left corner of a sprite's bounding box, NOT its rotational origin...???
		this.realX = this.pos.x + this.size.x/2;
		this.realY = this.pos.y + this.size.y/2;
		
		if(this.myEyesEntity != undefined){
			this.eyesEntity = ig.game.spawnEntity( this.myEyesEntity, this.pos.x, this.pos.y);
		}
		var myAngles = [];
		for( var t in this.target ) {
			var curTarget = ig.game.getEntityByName( this.target[t] );
			var targetX = curTarget.pos.x + curTarget.size.x/2;
			var targetY = curTarget.pos.y + curTarget.size.y/2;
			var gapX = targetX - this.realX;
			var gapY = targetY - this.realY;
			var curAng = Math.atan2(gapY,gapX);
			myAngles.push(curAng);
		}
		
		var angGap = ig.game.rotGap(myAngles[1],myAngles[0]);
		this.angMiddle = myAngles[0] + angGap/2;
		this.angRange = Math.abs(angGap)/2;
		
		this.curAng = this.angMiddle;
		
	},
	
	update:function(){
		
		var playerX = ig.game.currentScene.playerCarRef.pos.x + ig.game.currentScene.playerCarRef.size.x/2;
		var playerY = ig.game.currentScene.playerCarRef.pos.y + ig.game.currentScene.playerCarRef.size.y/2;
		var playerGapX = playerX - this.realX;
		var playerGapY = playerY - this.realY;
		
		var playerGapAng = Math.atan2(playerGapY,playerGapX);
		var middleGap = ig.game.rotGap(playerGapAng,this.angMiddle);
		
		var so = (middleGap > 0) ? 1 : -1;
		var bodyCappedMiddleGap = middleGap;
		if (Math.abs(bodyCappedMiddleGap) > this.angRange) bodyCappedMiddleGap = this.angRange * so;
		
		var goalAng = this.angMiddle + bodyCappedMiddleGap;
		
		this.curAng += ig.game.rotGap(goalAng,this.curAng) * 0.2;
		this.currentAnim.angle = this.curAng;
		
		var startAng = this.angMiddle - this.angRange;
		var angGapAmt = ig.game.rotGap(this.curAng,startAng);
		var angGapFrac = angGapAmt / (this.angRange*2);
		if(this.myEyesEntity != undefined){
			var eyesFrame = Math.round(angGapFrac*(this.eyesEntity.currentAnim.sequence.length-1));
			
			this.eyesEntity.currentAnim.angle = this.currentAnim.angle;
			this.eyesEntity.currentAnim.gotoFrame( eyesFrame );
		}
	}
	
});

});