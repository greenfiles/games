ig.module(
	'game.entities.pointPickup500'
)
.requires(
	'impact.entity',
	'game.entities.pointPickup'
)
.defines(function(){

EntityPointPickup500 = EntityPointPickup.extend({
        
	_wmIgnore:false,
	
        size: {x: 53, y: 80},
        animSheet: new ig.AnimationSheet( 'media/images/points/point500.png', 53, 80 ),
	pointValue:500,
	oilValue:1,
	healthValue:0,
        
        init: function( x, y, settings ) {
		
		this.parent( x, y, settings );
		
		this.addAnim( 'normal', 0, [0], true );
		
	},
	
});

});