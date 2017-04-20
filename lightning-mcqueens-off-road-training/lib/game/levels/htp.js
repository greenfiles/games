ig.module(
	'game.levels.htp'
)
.requires(
	'impact.screen'
)

.defines(function()
{
	ig.Menus.screens.htp = function()
	{
		var htpScreen = new Screen("htp", ig.Menus);
		
		var background = new DisplayObject({data:"media/images/htp/htp_bg.jpg"});
		htpScreen.Container.addChild(background);

		Buffer.create("gradientBuffer");

		var gradientTitleBuffer = Buffer("gradientTitleBuffer").getContext("2d");

		var gradientTitle = gradientTitleBuffer.createLinearGradient(0, 76, 0, 111);
			gradientTitle.addColorStop("0", "#FF5806");
			gradientTitle.addColorStop("1", "#BE1C00");

		var pageTitle = new DisplayObject({x: 686, y: 71, width:200, height:60});
			pageTitle.addExtention([Extention.TextField]);
			pageTitle.TextField.textAlign = 'center';
			pageTitle.TextField.textBaseline = 'top';
			pageTitle.TextField.fillStyle = gradientTitle;
			pageTitle.TextField.strokeStyle = "#FDF4E0";
			pageTitle.TextField.lineWidth = 4;
			pageTitle.TextField.font = '40px Roboto';
			pageTitle.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
			pageTitle.TextField.shadowOffsetY = 2;
			pageTitle.TextField.setFillText(Dictionary.translate('htpTitle'));
			pageTitle.TextField.setStrokeText(Dictionary.translate('htpTitle'));
		htpScreen.Container.addChild(pageTitle);

		var device = ig.ua.touchDevice ? 'Touch' : 'Keyboard';

		var pageDescription = new DisplayObject({x: 536, y: 152, width:500, height:60});
			pageDescription.addExtention([Extention.TextField]);
			pageDescription.TextField.textAlign = 'center';
			pageDescription.TextField.textBaseline = 'top';
			pageDescription.TextField.fillStyle = '#000';
			pageDescription.TextField.strokeStyle = "#FFF";
			pageDescription.TextField.lineWidth = 4;
			pageDescription.TextField.font = '25px RobotoRegular';
			pageDescription.TextField.setFillText(Dictionary.translate('htp' + device + 'Description'));
			pageDescription.TextField.setStrokeText(Dictionary.translate('htp' + device + 'Description'));
			pageDescription.TextField.verticalSpacing = 6;
			pageDescription.TextField.textWrap = true;
		htpScreen.Container.addChild(pageDescription);

		var pageImage = new DisplayObject({data:"media/images/htp/htp_" + device.toLowerCase() + ".png", x:617, y:239});
			pageImage.addExtention(Extention.Dockable);
		htpScreen.Container.addChild(pageImage);

		var btnPrev = new DisplayObject({data:"media/images/buttons/Btn_prev.png", x:97, y:513, name:"prev"});
			btnPrev.addExtention(Extention.Dockable);
		htpScreen.Container.addChild(btnPrev);
		
		var btnNext = new DisplayObject({data:"media/images/buttons/Btn_next.png", x:957, y:513, name:"next"});
			btnNext.addExtention(Extention.Dockable);
		htpScreen.Container.addChild(btnNext);
		
		htpScreen.onload = function()
		{
			EventManager.bind("next", htpScreen.next);
			EventManager.bind("prev", htpScreen.prev);
		};

		htpScreen.onunload = function()
		{
			EventManager.unbind("next", htpScreen.next);
			EventManager.unbind("prev", htpScreen.prev);
		};
		
		htpScreen.prev = function()
		{
			ig.Menus.loadMenu("story");
		};

		htpScreen.next = function()
		{			
			ig.Menus.loadMenu("lvlSelect");
		};
		
		htpScreen.binds = {
			"next":"next",
			"prev":"prev"
		};
		
		return htpScreen;
	};
});