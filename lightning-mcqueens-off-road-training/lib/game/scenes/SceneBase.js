ig.module( 
	'game.scenes.SceneBase' 
)
.requires(
	'impact.game'
)
.defines(function(){
	
SceneBase = ig.Class.extend({
	
	start:function(){
		
	},
	
	resized:function(){
		
	},
	
	update:function(mainUpdate){
		mainUpdate();
	},
	
	draw:function(mainDraw){
		mainDraw();
	},
	
	dispose:function(){
		
	}
	
});
	
});
