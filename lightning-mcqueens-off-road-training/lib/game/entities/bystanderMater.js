ig.module(
	'game.entities.bystanderMater'
)
.requires(
	'impact.entity',
        'game.entities.bystanderBase'
)
.defines(function(){

EntityBystanderMater = EntityBystanderBase.extend({
	
	_wmIgnore:false,
        
        size: {x: 124, y: 68},
        animSheet: new ig.AnimationSheet( 'media/images/character/mater.png', 124, 68 ),
        
        init: function( x, y, settings ) {
		
		
		this.parent( x, y, settings );
		
		this.addAnim( 'normal', 0, [0], true );
		
	},
	
});

});