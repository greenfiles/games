ig.module(
	'game.entities.bridgeAnim'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBridgeAnim = ig.Entity.extend({
	
        size: {x: 388, y: 388},
        animSheet: new ig.AnimationSheet( 'media/images/bridge/bridge-sprite.png', 388, 388 ),
	
        init: function( x, y, settings ) {
		
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0, [0], true );
		this.addAnim( 'off', 0.1, [0], true );
		this.addAnim( 'on',  0.1, [1], true );
		
		this.updateAnimState();
		
	},
	
	signal: function(signalState){
		
		this.currentAnim = (signalState ? this.anims.on : this.anims.off).rewind() ;
		
	},
	
	editorChange: function(){
		this.updateAnimState();
	},
	
	updateAnimState: function(){
		
		var myAngle = 0;
		var turned = (this.turned == "true");
		if (turned) myAngle = Math.PI/2;
		
		for (var animName in this.anims) {
			var anim = this.anims[animName];
			anim.angle = myAngle;
		}
		
	}
	
});

});