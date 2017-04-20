ig.module(
	'game.entities.bridgeCollision'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBridgeCollision = ig.Entity.extend({
	
	size:{x:64,y:64},
	
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 255, 0, 0.5)',
	
	ready:function(){
		var xMinCoords = this.pos.x;
		var xMaxCoords = this.pos.x + this.size.x;
		var yMinCoords = this.pos.y;
		var yMaxCoords = this.pos.y + this.size.y;
		
		console.log("switch runs from pixel "+xMinCoords+","+yMinCoords+" to "+xMaxCoords+","+yMaxCoords);
		
		var tilesize = ig.game.collisionMap.tilesize;
		this.xMin = Math.round(xMinCoords/tilesize);
		this.xMax = Math.round(xMaxCoords/tilesize);
		this.yMin = Math.round(yMinCoords/tilesize);
		this.yMax = Math.round(yMaxCoords/tilesize);
		
		console.log("switch runs from tile "+this.xMin+","+this.yMin+" to "+this.xMax+","+this.yMax);
		
		this.signal(false);
	},
	
	signal: function(signalState){
		/*
		console.log("map before:");
		console.log(ig.game.collisionMap.data);
		*/
		for (var xTile = this.xMin; xTile<this.xMax; xTile++) {
			for (var yTile = this.yMin; yTile<this.yMax; yTile++) {
				ig.game.collisionMap.data[yTile][xTile] = signalState ? 0 : 1 ;
			}
		}
		/*
		console.log("map after:");
		console.log(ig.game.collisionMap.data);
		*/
	},
	
});

});