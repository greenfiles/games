ig.module(
	'game.entities.fetchItemC'
)
.requires(
	'impact.entity',
        'game.entities.fetchItem'
)
.defines(function(){

EntityFetchItemC = EntityFetchItem.extend({
	
	_wmIgnore:false,
        
        size: {x: 76, y: 126},
        animSheet: new ig.AnimationSheet( 'media/images/objective/fetch_flag.png', 76, 126 ),
        
        init: function( x, y, settings ) {
		
		this.parent( x, y, settings );
		
		this.addAnim( 'normal', 0, [0], true );
		
	},
	
});

});