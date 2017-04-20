ig.module(
	'game.entities.pointPickupHealth'
)
.requires(
	'impact.entity',
	'game.entities.pointPickup'
)
.defines(function(){

EntityPointPickupHealth = EntityPointPickup.extend({
        
	_wmIgnore:false,
	
        size: {x: 50, y: 70},
        animSheet: new ig.AnimationSheet( 'media/images/points/lifepickup.png', 50, 70 ),
	pointValue:0,
	oilValue:0,
	healthValue:1,
        
        init: function( x, y, settings ) {
		
		this.parent( x, y, settings );
		
		this.addAnim( 'normal', 0, [0], true );
		
	},
	
});

});