ig.module(
	'game.entities.bystanderSally'
)
.requires(
	'impact.entity',
        'game.entities.bystanderBase'
)
.defines(function(){

EntityBystanderSally = EntityBystanderBase.extend({
	
	_wmIgnore:false,
        
        size: {x: 107, y: 51},
        animSheet: new ig.AnimationSheet( 'media/images/character/temp_sally.png', 107, 51 ),
        
        init: function( x, y, settings ) {
		
		this.myEyesEntity = EntitySallyEyes;
		
		this.parent( x, y, settings );
		
		this.addAnim( 'normal', 0, [0], true );
		
	},
	
});

EntitySallyEyes = ig.Entity.extend({
	
	size: {x: 0, y: 0},
	checkAgainst:ig.Entity.TYPE.NONE,
	zIndex:2,
	
	
	animSheet: new ig.AnimationSheet( 'media/images/character/temp_sallyEyeAnim.png', 107, 51 ),
	
	
	init: function( x, y, settings ) {
		
		this.parent( x, y, settings );
		
		this.addAnim( 'full', 1, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] );
		
	}
	
});

});