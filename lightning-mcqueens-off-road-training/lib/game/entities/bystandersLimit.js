ig.module(
	'game.entities.bystandersLimit'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBystandersLimit = ig.Entity.extend({
	
	size:{x:16,y:16},
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 255, 255, 0.5)',
	
});

});