ig.module(
	'game.levels.endGame'
)
.requires(
	'impact.screen'
)

.defines(function()
{
	ig.Menus.screens.endGame = function()
	{
		var endGameScreen = new Screen("endGame", ig.Menus),
			is_overlay = false;
		
		var w = endGameScreen.width,
			h = endGameScreen.height;

		var background = new DisplayObject({data:"media/images/endGame/endGame_bg.jpg"});
		endGameScreen.Container.addChild(background);

		Buffer.create("gradientTitleBuffer");

		var gradientTitleBuffer = Buffer("gradientTitleBuffer").getContext("2d");

		var gradientTitle = gradientTitleBuffer.createLinearGradient(0, 120, 0, 170);
			gradientTitle.addColorStop("0", "#FF5806");
			gradientTitle.addColorStop("1", "#BE1C00");

		var pageTitle = new DisplayObject({x:318, y:115, width:500, height:60});
			pageTitle.addExtention([Extention.TextField]);
			pageTitle.TextField.textAlign = 'center';
			pageTitle.TextField.textBaseline = 'top';
			pageTitle.TextField.fillStyle = gradientTitle;
			pageTitle.TextField.strokeStyle = "#FDF4E0";
			pageTitle.TextField.lineWidth = 4;
			pageTitle.TextField.font = '40px Roboto';
			pageTitle.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
			pageTitle.TextField.shadowOffsetY = 2;
			pageTitle.TextField.setFillText(Dictionary.translate('endGameTitle'));
			pageTitle.TextField.setStrokeText(Dictionary.translate('endGameTitle'));
		endGameScreen.Container.addChild(pageTitle);

		var pageDescription = new DisplayObject({x:318, y:190, width:500, height:60});
			pageDescription.addExtention([Extention.TextField]);
			pageDescription.TextField.textAlign = 'center';
			pageDescription.TextField.textBaseline = 'top';
			pageDescription.TextField.fillStyle = '#000';
			pageDescription.TextField.strokeStyle = "#FFF";
			pageDescription.TextField.lineWidth = 4;
			pageDescription.TextField.font = '22px RobotoRegular';
			pageDescription.TextField.setFillText(Dictionary.translate('endGameDescription'));
			pageDescription.TextField.setStrokeText(Dictionary.translate('endGameDescription'));
			pageDescription.TextField.verticalSpacing = 6;
			pageDescription.TextField.textWrap = true;
		endGameScreen.Container.addChild(pageDescription);

		Buffer.create("gradientButtonBuffer");

		var gradientButtonBuffer = Buffer("gradientButtonBuffer").getContext("2d");

		var gradientButton = gradientButtonBuffer.createLinearGradient(0, 558, 0, 580);
			gradientButton.addColorStop(0, '#F2ECE3');
     		gradientButton.addColorStop(0.49, '#F2ECE3');
      		gradientButton.addColorStop(0.5, '#C4B698');
      		gradientButton.addColorStop(1, '#F2ECE3');

     	var btnNewGame = new DisplayObject({x:214, y:541,name:"newGameContainer"});
					btnNewGame.addExtention(Extention.Container);
				endGameScreen.Container.addChild(btnNewGame);
				var btnNewGameClick = new DisplayObject({x:-100, y:0, width:200, height:60, name:"newGame"});
				var btnNewGame1 = new DisplayObject();
					btnNewGame1.addExtention(Extention.TextField);
				
				if(navigator.userAgent.search("Firefox") == -1){
					var grd = ig.system.context.createLinearGradient(0, 548, 0, 588 );
				     	grd.addColorStop(0, '#f3ede4');
				     	grd.addColorStop(0.49, '#f3ede4');
				      	grd.addColorStop(0.5, '#bbab8b');
				      	grd.addColorStop(1, '#f3ede4');
			    }else{
			    	var grd = "#f3ede4";
			    }
					btnNewGame1.TextField.textAlign="center";
					btnNewGame1.TextField.font="40px Roboto";
					btnNewGame1.TextField.textBaseline="top";
					btnNewGame1.TextField.strokeStyle="#e72100";
					btnNewGame1.TextField.lineWidth = 10;
					btnNewGame1.TextField.fillStyle=grd;
				var btnNewGame2 = new DisplayObject();
					btnNewGame2.addExtention(Extention.TextField);
					btnNewGame2.TextField.textAlign="center";
					btnNewGame2.TextField.font="40px Roboto";
					btnNewGame2.TextField.textBaseline="top";
					btnNewGame2.TextField.strokeStyle="#ffffff";
					btnNewGame2.TextField.lineWidth = 12;
					btnNewGame2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
					btnNewGame2.TextField.shadowOffsetY = 3;
					btnNewGame1.TextField.setStrokeText(Dictionary.translate("newGame"));
					btnNewGame1.TextField.setFillText(Dictionary.translate("newGame"));
					btnNewGame2.TextField.setStrokeText(Dictionary.translate("newGame"));
					btnNewGame.Container.addChild(btnNewGameClick);
					btnNewGame.Container.addChild(btnNewGame2);
					btnNewGame.Container.addChild(btnNewGame1);

				var btnContinue = new DisplayObject({x:922, y:541});
					btnContinue.addExtention(Extention.Container);
				endGameScreen.Container.addChild(btnContinue);
				var btnContinueClick = new DisplayObject({x:-100, y:0, width:200, height:60, name:"continueGame"});
				var btnContinue1 = new DisplayObject();
					btnContinue1.addExtention(Extention.TextField);
				if(navigator.userAgent.search("Firefox") == -1){
 
				var grd = ig.system.context.createLinearGradient(0, 548, 0, 588 );
			     	grd.addColorStop(0, '#f3ede4');
			     	grd.addColorStop(0.49, '#f3ede4');
			      	grd.addColorStop(0.5, '#bbab8b');
			      	grd.addColorStop(1, '#f3ede4');
			      
				}else{
			    var grd = "#f3ede4";
			    }
					btnContinue1.TextField.textAlign="center";
					btnContinue1.TextField.font="40px Roboto";
					btnContinue1.TextField.textBaseline="top";
					btnContinue1.TextField.strokeStyle="#e72100";
					btnContinue1.TextField.lineWidth = 10;
					btnContinue1.TextField.fillStyle=grd;
				var btnContinue2 = new DisplayObject();
					btnContinue2.addExtention(Extention.TextField);
					btnContinue2.TextField.textAlign="center";
					btnContinue2.TextField.font="40px Roboto";
					btnContinue2.TextField.textBaseline="top";
					btnContinue2.TextField.strokeStyle="#ffffff";
					btnContinue2.TextField.lineWidth = 12;
					btnContinue2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
					btnContinue2.TextField.shadowOffsetY = 3;
					btnContinue1.TextField.setStrokeText(Dictionary.translate("continue"));
					btnContinue1.TextField.setFillText(Dictionary.translate("continue"));
					btnContinue2.TextField.setStrokeText(Dictionary.translate("continue"));
					btnContinue.Container.addChild(btnContinueClick);
					btnContinue.Container.addChild(btnContinue2);
					btnContinue.Container.addChild(btnContinue1);

		var overlay = new DisplayObject({name:'overlay', x:0, y:0, width:w, height:h});
			overlay.addExtention([Extention.Container]);
		endGameScreen.Container.addChild(overlay);

		endGameScreen.onload = function()
		{
			EventManager.bind("newGame", endGameScreen.newGame);
			EventManager.bind("continueGame", endGameScreen.continueGame);
			EventManager.bind('close', endGameScreen.close);
			EventManager.bind('reset', endGameScreen.reset);
		};

		endGameScreen.onunload = function()
		{
			EventManager.unbind("newGame", endGameScreen.newGame);
			EventManager.unbind("continueGame", endGameScreen.continueGame);
			EventManager.unbind('close', endGameScreen.close);
			EventManager.unbind('reset', endGameScreen.reset);
		};
		
		endGameScreen.newGame = function()
		{
			if(!is_overlay)
			{
				is_overlay = true;

				var overlayBackground = new DisplayObject({name:'overlayBackground', data:'media/images/overlay/overlay_bg.png'});
				overlay.Container.addChild(overlayBackground);
	
				var overlayPanel = new DisplayObject({name:'overlayPanel', x:159, y:0, width:822, height:672, data:'media/images/overlay/overlay_panel.png'});
					overlayPanel.addExtention([Extention.Container]);
				overlay.Container.addChild(overlayPanel);

				var overlayTitle = new DisplayObject({x:161, y:266, width:500, height:60});
					overlayTitle.addExtention([Extention.TextField]);
					overlayTitle.TextField.textAlign = 'center';
					overlayTitle.TextField.textBaseline = 'top';
					overlayTitle.TextField.fillStyle = '#000';
					overlayTitle.TextField.strokeStyle = "#FFF";
					overlayTitle.TextField.lineWidth = 4;
					overlayTitle.TextField.font = '22px RobotoRegular';
					overlayTitle.TextField.setFillText(Dictionary.translate('resetTitle'));
					overlayTitle.TextField.setStrokeText(Dictionary.translate('resetTitle'));
					overlayTitle.TextField.verticalSpacing = 6;
					overlayTitle.TextField.textWrap = true;
				overlayPanel.Container.addChild(overlayTitle);

				Buffer.create("gradientPanelBuffer");

				var gradientPanelBuffer = Buffer("gradientPanelBuffer").getContext("2d");

				var gradientPanel = gradientPanelBuffer.createLinearGradient(0, 411, 0, 470);
					gradientPanel.addColorStop(0, '#F2ECE3');
     				gradientPanel.addColorStop(0.49, '#F2ECE3');
      				gradientPanel.addColorStop(0.5, '#C4B698');
      				gradientPanel.addColorStop(1, '#F2ECE3');

      			var btnNo = new DisplayObject({x:420, y:406});
					btnNo.addExtention(Extention.Container);
				endGameScreen.Container.addChild(btnNo);
				var btnNoClick = new DisplayObject({x:-50, y:0, width:100, height:60, name:"no"});
				var btnNo1 = new DisplayObject();
					btnNo1.addExtention(Extention.TextField);
					
				if(navigator.userAgent.search("Firefox") == -1){

					var grd = ig.system.context.createLinearGradient(0, 413, 0, 453 );
				     	grd.addColorStop(0, '#f3ede4');
				     	grd.addColorStop(0.49, '#f3ede4');
				      	grd.addColorStop(0.5, '#bbab8b');
				      	grd.addColorStop(1, '#f3ede4'); 
			    }else{
			   		var grd = "#f3ede4";
			    }
					btnNo1.TextField.textAlign="center";
					btnNo1.TextField.font="40px Roboto";
					btnNo1.TextField.textBaseline="top";
					btnNo1.TextField.strokeStyle="#e72100";
					btnNo1.TextField.lineWidth = 10;
					btnNo1.TextField.fillStyle=grd;
				var btnNo2 = new DisplayObject();
					btnNo2.addExtention(Extention.TextField);
					btnNo2.TextField.textAlign="center";
					btnNo2.TextField.font="40px Roboto";
					btnNo2.TextField.textBaseline="top";
					btnNo2.TextField.strokeStyle="#ffffff";
					btnNo2.TextField.lineWidth = 12;
					btnNo2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
					btnNo2.TextField.shadowOffsetY = 3;
					btnNo1.TextField.setStrokeText(Dictionary.translate("no"));
					btnNo1.TextField.setFillText(Dictionary.translate("no"));
					btnNo2.TextField.setStrokeText(Dictionary.translate("no"));
					btnNo.Container.addChild(btnNoClick);
					btnNo.Container.addChild(btnNo2);
					btnNo.Container.addChild(btnNo1);

				var btnYes = new DisplayObject({x:710, y:406});
					btnYes.addExtention(Extention.Container);
				endGameScreen.Container.addChild(btnYes);
				var btnYesClick = new DisplayObject({x:-50, y:0, width:100, height:60, name:"yes"});
				var btnYes1 = new DisplayObject();
					btnYes1.addExtention(Extention.TextField);
				
				if(navigator.userAgent.search("Firefox") == -1){
 
					var grd = ig.system.context.createLinearGradient(0, 413, 0, 453 );
				     	grd.addColorStop(0, '#f3ede4');
				     	grd.addColorStop(0.49, '#f3ede4');
				      	grd.addColorStop(0.5, '#bbab8b');
				      	grd.addColorStop(1, '#f3ede4');
			    
			    }else{
			    	var grd = "#f3ede4";
			    }
					btnYes1.TextField.textAlign="center";
					btnYes1.TextField.font="40px Roboto";
					btnYes1.TextField.textBaseline="top";
					btnYes1.TextField.strokeStyle="#e72100";
					btnYes1.TextField.lineWidth = 10;
					btnYes1.TextField.fillStyle=grd;
				var btnYes2 = new DisplayObject();
					btnYes2.addExtention(Extention.TextField);
					btnYes2.TextField.textAlign="center";
					btnYes2.TextField.font="40px Roboto";
					btnYes2.TextField.textBaseline="top";
					btnYes2.TextField.strokeStyle="#ffffff";
					btnYes2.TextField.lineWidth = 12;
					btnYes2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
					btnYes2.TextField.shadowOffsetY = 3;
					
					btnYes1.TextField.setStrokeText(Dictionary.translate("yes"));
					btnYes1.TextField.setFillText(Dictionary.translate("yes"));
					btnYes2.TextField.setStrokeText(Dictionary.translate("yes"));
					btnYes.Container.addChild(btnYesClick);
					btnYes.Container.addChild(btnYes2);
					btnYes.Container.addChild(btnYes1);
			}
		};

		endGameScreen.close = function(e)
		{
			is_overlay = false;

			overlay.Container.removeChildByName('overlayBackground');
			overlay.Container.removeChildByName('overlayPanel');
		};

		// Reset Event
		endGameScreen.reset = function(e)
		{
			endGameScreen.close();

			LocalStorage.set('firstTime', 'false');
			ig.Menus.loadMenu('story');
		};

		endGameScreen.continueGame = function()
		{
			ig.Menus.loadMenu("lvlSelect");
		};
		
		endGameScreen.binds = {
			"newGame":"newGame",
			"continueGame":"continueGame",
			'close':'close',
			'no':'close',
			'yes':'reset'
		};
		
		return endGameScreen;
	};
});