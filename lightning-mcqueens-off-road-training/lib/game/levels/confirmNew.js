ig.module(
	'game.levels.confirmNew'
)
.requires(
	'impact.screen'
)
.defines(function(){
	
	//insert screen manager logic over this
	ig.Menus.screens.confirmNew = function(){
		var testScreen = new Screen("confirmNew", ig.Menus);
		
		//put the background image here... do it!
		var background = new DisplayObject({data:"media/images/screens/temp_BG.png"});
		testScreen.Container.addChild(background);

		var textTitle = new DisplayObject({x:900,y:50});
		textTitle.addExtention(Extention.TextField);
		testScreen.Container.addChild(textTitle);
		textTitle.TextField.shadowColor = '#999999';
		textTitle.TextField.shadowBlur = 0;
		textTitle.TextField.shadowOffsetX = 1;
		textTitle.TextField.shadowOffsetY = 1;
		textTitle.TextField.textAlign = 'right';
		textTitle.TextField.font = 'bold 40px Roboto';
		textTitle.TextField.setFillText("Confirm new game");

		var but1Rect = new DisplayObject({x:300, y:230,width:150,height:100,name:"yes"});
		but1Rect.addExtention(Extention.Canvas);
		testScreen.Container.addChild(but1Rect);
		but1Rect.Canvas.context().fillStyle="#999999";
		but1Rect.Canvas.context().fillRect(0,0,150,100);

		var but1Text = new DisplayObject({x:375,y:300});
		but1Text.addExtention(Extention.TextField);
		testScreen.Container.addChild(but1Text);
		but1Text.TextField.textAlign = 'center';
		but1Text.TextField.font = 'bold 40px Roboto';
		but1Text.TextField.setFillText("Yes");

		
		var but2Rect = new DisplayObject({x:650, y:230,width:150,height:100, name:"no"});
		but2Rect.addExtention(Extention.Canvas);
		testScreen.Container.addChild(but2Rect);
		but2Rect.Canvas.context().fillStyle="#999999";
		but2Rect.Canvas.context().fillRect(0,0,150,100);

		var but2Text = new DisplayObject({x:725,y:300});
		but2Text.addExtention(Extention.TextField);
		testScreen.Container.addChild(but2Text);
		but2Text.TextField.textAlign = 'center';
		but2Text.TextField.font = 'bold 40px Roboto';
		but2Text.TextField.setFillText("No");
		
		testScreen.onload = function(){
			console.log("Loaded test screen!");
			EventManager.bind("yes", testScreen.yes);
			EventManager.bind("no", testScreen.no);
		};
		
		testScreen.yes = function(){
			LocalStorage.reset();
			ig.Menus.loadMenu("story");
		};
		
		testScreen.no = function(){
			ig.Menus.loadMenu("title");
		};
		
		testScreen.onunload = function(){
			console.log("Unloaded test screen!");
			EventManager.unbind("yes", testScreen.yes);
			EventManager.unbind("no", testScreen.no);
		};
		
		testScreen.binds = {
			"yes":"yes",
			"no":"no"
		};
		
		
		return testScreen;
	};
});
	
	
	
