ig.module(
	'impact.screen'
)
.requires(
	'impact.image',
	'impact.system'
)
.defines(function(){ "use strict";

ig.Menus = new Engine();

ig.Menus.addExtention(Extention.Container);

});