ig.module(
	'game.entities.pointPickup1000'
)
.requires(
	'impact.entity',
	'game.entities.pointPickup'
)
.defines(function(){

EntityPointPickup1000 = EntityPointPickup.extend({
        
	_wmIgnore:false,
	
        size: {x: 53, y: 80},
        animSheet: new ig.AnimationSheet( 'media/images/points/point1000.png', 53, 80 ),
	pointValue:1000,
	oilValue:5,
	healthValue:0,
        
        init: function( x, y, settings ) {
		
		this.parent( x, y, settings );
		
		this.addAnim( 'normal', 0, [0], true );
		
	},
	
});

});