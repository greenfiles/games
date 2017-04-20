ig.module(
	'game.entities.fetchItem'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityFetchItem = ig.Entity.extend({
	
	_wmIgnore:true,
	isFetchItem:true,
	
});

});