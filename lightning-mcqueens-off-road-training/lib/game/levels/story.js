ig.module(
	'game.levels.story'
)
.requires(
	'impact.screen'
)
.defines(function()
{
	ig.Menus.screens.story = function()
	{
		var storyScreen = new Screen("story", ig.Menus);
		
		var background = new DisplayObject({data:"media/images/story/story_BG.jpg"});
		storyScreen.Container.addChild(background);

		Buffer.create("gradientTitleBuffer");

		var gradientTitleBuffer = Buffer("gradientTitleBuffer").getContext("2d");

		var gradientTitle = gradientTitleBuffer.createLinearGradient(0, 76, 0, 111);
			gradientTitle.addColorStop("0", "#FF5806");
			gradientTitle.addColorStop("1", "#BE1C00");

		var pageTitle = new DisplayObject({x:720, y:71, width:200, height:60});
			pageTitle.addExtention([Extention.TextField]);
			pageTitle.TextField.textAlign = 'center';
			pageTitle.TextField.textBaseline = 'top';
			pageTitle.TextField.fillStyle = gradientTitle;
			pageTitle.TextField.strokeStyle = "#FDF4E0";
			pageTitle.TextField.lineWidth = 4;
			pageTitle.TextField.font = '40px Roboto';
			pageTitle.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
			pageTitle.TextField.shadowOffsetY = 2;
			pageTitle.TextField.setFillText(Dictionary.translate('storyTitle'));
			pageTitle.TextField.setStrokeText(Dictionary.translate('storyTitle'));
		storyScreen.Container.addChild(pageTitle);

		var pageDescription = new DisplayObject({x: 670, y: 176, width:320, height:60});
			pageDescription.addExtention([Extention.TextField]);
			pageDescription.TextField.textAlign = 'center';
			pageDescription.TextField.textBaseline = 'top';
			pageDescription.TextField.fillStyle = '#000';
			pageDescription.TextField.strokeStyle = "#FFF";
			pageDescription.TextField.lineWidth = 4;
			pageDescription.TextField.font = '25px RobotoRegular';
			pageDescription.TextField.setFillText(Dictionary.translate('storyDescription'));
			pageDescription.TextField.setStrokeText(Dictionary.translate('storyDescription'));
			pageDescription.TextField.verticalSpacing = 6;
			pageDescription.TextField.textWrap = true;
		storyScreen.Container.addChild(pageDescription);

		

		var btnPrev = new DisplayObject({data:"media/images/buttons/Btn_prev.png", x:97, y:513, name:"prev"});
			btnPrev.addExtention(Extention.Dockable);
		storyScreen.Container.addChild(btnPrev);
		
		var btnNext = new DisplayObject({data:"media/images/buttons/Btn_next.png", x:957, y:513, name:"next"});
			btnNext.addExtention(Extention.Dockable);
		storyScreen.Container.addChild(btnNext);
		
		storyScreen.onload = function()
		{
			EventManager.bind("next", storyScreen.next);
			EventManager.bind("prev", storyScreen.prev);
		};

		storyScreen.onunload = function()
		{
			EventManager.unbind("next", storyScreen.next);
			EventManager.unbind("prev", storyScreen.prev);
		};
		
		storyScreen.prev = function()
		{
			ig.Menus.loadMenu("title");
		};

		storyScreen.next = function()
		{			
			ig.Menus.loadMenu("htp");
		};
		
		storyScreen.binds = {
			"next":"next",
			"prev":"prev"
		};
		
		return storyScreen;
	};
});