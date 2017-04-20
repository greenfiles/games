ig.module(
	'game.entities.bridgeSwitch'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBridgeSwitch = ig.Entity.extend({
	
        size: {x: 40, y: 40},
        offset:{x:75,y:90},
        animSheet: new ig.AnimationSheet( 'media/images/bridge/switch-sprite.png', 175, 175 ),
	
	isOn:false,
	alreadyBeingTouched:false,
        
        init: function( x, y, settings ) {
		
		this.parent( x, y, settings );
		
		this.addAnim( 'off', 0, [0], true );
		this.addAnim( 'on',  0, [1], true );
		
	},
	
	ready:function(){
		this.targets = [];
		for( var t in this.target ) {
			this.targets.push(ig.game.getEntityByName( this.target[t] ));
		}
	},
	
	newTouch: function(){
		
		if(this.isOn == false)
			this.isOn = !this.isOn;
		
		this.currentAnim = this.isOn ? this.anims.on : this.anims.off ;
		
		for (var targetIndex=0; targetIndex<this.targets.length; targetIndex++) {
			var curTarget = this.targets[targetIndex];
			curTarget.signal(this.isOn);
		}
		
	},
	
});

});