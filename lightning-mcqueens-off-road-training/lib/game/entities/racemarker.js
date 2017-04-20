ig.module(
	'game.entities.racemarker'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityRacemarker = ig.Entity.extend({
	
	size:{x:64,y:64},
	
	_wmScalable: true,
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 255, 255, 0.5)',
	
});

});