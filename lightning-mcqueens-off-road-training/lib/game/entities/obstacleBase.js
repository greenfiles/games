ig.module(
	'game.entities.obstacleBase'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityObstacleBase = ig.Entity.extend({
        
        _wmIgnore:true,
	
	momentum:{x:0,y:0},
	moving:false,
	
	update:function(){
		
		var theCar = ig.game.currentScene.playerCarRef;
		if (theCar.touches(this)) {
			this.currentAnim = this.anims.hitByCar;
			this.momentum.x += theCar.momentum.x * this.hitByCarMomentumFrac;
			this.momentum.y += theCar.momentum.y * this.hitByCarMomentumFrac;
			this.moving = true;
		}
		
		if (this.moving) {
			
			this.momentum.x *= this.groundFriction;
			this.momentum.y *= this.groundFriction;
			
			var collisionResult = ig.game.collisionMap.trace(this.pos.x,this.pos.y,this.momentum.x,this.momentum.y,this.size.x,this.size.y);
			
			if (collisionResult.collision.x || collisionResult.collision.y) {
				this.pos.x = collisionResult.pos.x;
				this.pos.y = collisionResult.pos.y;
				if (collisionResult.collision.x) this.momentum.x *= -1;
				if (collisionResult.collision.y) this.momentum.y *= -1;
				this.pos.x += this.momentum.x;
				this.pos.y += this.momentum.y;
				this.momentum.x *= this.hitWallMomentumFrac;
				this.momentum.y *= this.hitWallMomentumFrac;
			} else {
				this.pos.x += this.momentum.x;
				this.pos.y += this.momentum.y;
			}
			
			var momentumAmt = Math.sqrt(this.momentum.x*this.momentum.x + this.momentum.y*this.momentum.y);
			this.currentAnim.angle += momentumAmt * this.spinFrac;
			
			if (momentumAmt < 0.2) {
				this.momentum.x = 0;
				this.momentum.y = 0;
				this.moving = false;
			}
			
		}
		
	}
	
});

});