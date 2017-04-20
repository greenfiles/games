ig.module(
	'game.entities.bystanderSarge'
)
.requires(
	'impact.entity',
        'game.entities.bystanderBase'
)
.defines(function(){

EntityBystanderSarge = EntityBystanderBase.extend({
	
	_wmIgnore:false,
        
        size: {x: 101, y: 59},
        animSheet: new ig.AnimationSheet( 'media/images/character/sarge.png', 101, 59 ),
        
        init: function( x, y, settings ) {
		
		
		this.parent( x, y, settings );
		
		this.addAnim( 'normal', 0, [0], true );
		
	},
	
});

});