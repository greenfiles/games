ig.module(
	'game.entities.obstacleCone'
)
.requires(
	'impact.entity',
	'game.entities.obstacleBase'
)
.defines(function(){

EntityObstacleCone = EntityObstacleBase.extend({
        
	_wmIgnore:false,
	
        size: {x: 22, y: 22},
        animSheet: new ig.AnimationSheet( 'media/images/obstacles/cone_sheet.png', 22, 22 ),
	
	hitByCarMomentumFrac:1.5,
	hitWallMomentumFrac:0.5,
	spinFrac:0.05,
	groundFriction:0.985,
	
        init: function( x, y, settings ) {
		
		this.parent( x, y, settings );
		
		this.addAnim( 'start', 1, [1], true );
		this.addAnim( 'hitByCar', 1, [0], true );
		
	},
	
});

});