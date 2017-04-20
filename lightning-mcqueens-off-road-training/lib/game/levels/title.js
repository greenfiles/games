ig.module(
	'game.levels.title'
)
.requires(
	'impact.screen'
)

.defines(function()
{
	ig.Menus.screens.title = function()
	{
		var titleScreen = new Screen("title", ig.Menus),
			is_overlay = false;
		
		var w = titleScreen.width,
			h = titleScreen.height;

		var background = new DisplayObject({data:"media/images/title/title_bg.jpg"});
		titleScreen.Container.addChild(background);

		var loadRobotoRegular = new DisplayObject({x: 2000});
			loadRobotoRegular.addExtention([Extention.TextField]);
			loadRobotoRegular.TextField.fillStyle = '#000';
			loadRobotoRegular.TextField.font = '25px RobotoRegular';
			loadRobotoRegular.TextField.setFillText(Dictionary.translate('.'));
		titleScreen.Container.addChild(loadRobotoRegular);

		var property = new DisplayObject({data:"media/images/title/title_property.jpg", x:455, y:97});
			property.addExtention(Extention.Dockable);
		titleScreen.Container.addChild(property);

		Buffer.create("gradientButtonBuffer");

		var gradientButtonBuffer = Buffer("gradientButtonBuffer").getContext("2d");

		var gradientButton = gradientButtonBuffer.createLinearGradient(0, 558, 0, 580);
			gradientButton.addColorStop(0, '#F2ECE3');
     		gradientButton.addColorStop(0.49, '#F2ECE3');
      		gradientButton.addColorStop(0.5, '#C4B698');
      		gradientButton.addColorStop(1, '#F2ECE3');

      		//LocalStorage.set('firstTime', 'false');

		var overlayBackground = new DisplayObject({name:'overlayBackground', data:'media/images/overlay/overlay_bg.png'});

		var overlayPanel = new DisplayObject({name:'overlayPanel', x:159, y:0, width:822, height:672, data:'media/images/overlay/overlay_panel.png'});

		var listOfDO = [];

		titleScreen.updateButtons = function(){
			if(LocalStorage.get('firstTime') == 'true'){
				if(titleScreen.Container.getChildByName('continueContainer')){
					titleScreen.Container.removeChildByName('newGameContainer');
					titleScreen.Container.removeChildByName('continueContainer');
				}

				var btnPlay = new DisplayObject({x:568, y:541, name:"playContainer"});
					btnPlay.addExtention(Extention.Container);
				titleScreen.Container.addChild(btnPlay);
				var btnPlayClick = new DisplayObject({x:-100, y:0, width:200, height:60, name:"play"});
				var btnPlay1 = new DisplayObject();
					btnPlay1.addExtention(Extention.TextField);
				var btnPlay2 = new DisplayObject();
					btnPlay2.addExtention(Extention.TextField);
					btnPlay2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';

				if(navigator.userAgent.search("Firefox") == -1){
 
					var grd = ig.system.context.createLinearGradient(0, 548, 0, 588 );
				     	grd.addColorStop(0, '#f3ede4');
				     	grd.addColorStop(0.49, '#f3ede4');
				      	grd.addColorStop(0.5, '#bbab8b');
				      	grd.addColorStop(1, '#f3ede4');

				   
					btnPlay2.TextField.shadowOffsetY = 3;
			    }else{
			    	var grd = "#f3ede4";
			    	
			    }
					btnPlay1.TextField.textAlign="center";
					btnPlay1.TextField.font="39px Roboto";
					btnPlay1.TextField.textBaseline="top";
					btnPlay1.TextField.strokeStyle="#e72100";
					btnPlay1.TextField.lineWidth = 10;
					btnPlay1.TextField.fillStyle=grd;
				
					btnPlay2.TextField.textAlign="center";
					btnPlay2.TextField.font="39px Roboto";
					btnPlay2.TextField.textBaseline="top";
					btnPlay2.TextField.strokeStyle="#ffffff";
					btnPlay2.TextField.lineWidth = 12;
					
					btnPlay1.TextField.setStrokeText(Dictionary.translate("play"));
					btnPlay1.TextField.setFillText(Dictionary.translate("play"));
					btnPlay2.TextField.setStrokeText(Dictionary.translate("play"));
					btnPlay.Container.addChild(btnPlayClick);
					btnPlay.Container.addChild(btnPlay2);
					btnPlay.Container.addChild(btnPlay1);
			}
			else
			{
				if(titleScreen.Container.getChildByName('play'))
				{
					titleScreen.Container.removeChildByName('playContainer');
					titleScreen.Container.removeChildByName('playStroke');
				}

				var btnNewGame = new DisplayObject({x:214, y:541, name:"newGameContainer"});
					btnNewGame.addExtention(Extention.Container);
				titleScreen.Container.addChild(btnNewGame);
				var btnNewGameClick = new DisplayObject({x:-100, y:0, width:200, height:60, name:"newGame"});
				var btnNewGame1 = new DisplayObject();
					btnNewGame1.addExtention(Extention.TextField);
				var btnNewGame2 = new DisplayObject();
					btnNewGame2.addExtention(Extention.TextField);
					btnNewGame2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
				
				if(navigator.userAgent.search("Firefox") == -1){
 
					var grd = ig.system.context.createLinearGradient(0, 548, 0, 588 );
				     	grd.addColorStop(0, '#f3ede4');
				     	grd.addColorStop(0.49, '#f3ede4');
				      	grd.addColorStop(0.5, '#bbab8b');
				      	grd.addColorStop(1, '#f3ede4');

				    
					btnNewGame2.TextField.shadowOffsetY = 3;
			    }else{
			    	var grd = "#f3ede4";
			    	
			    }
					btnNewGame1.TextField.textAlign="center";
					btnNewGame1.TextField.font="39px Roboto";
					btnNewGame1.TextField.textBaseline="top";
					btnNewGame1.TextField.strokeStyle="#e72100";
					btnNewGame1.TextField.lineWidth = 10;
					btnNewGame1.TextField.fillStyle=grd;
					btnNewGame2.TextField.textAlign="center";
					btnNewGame2.TextField.font="39px Roboto";
					btnNewGame2.TextField.textBaseline="top";
					btnNewGame2.TextField.strokeStyle="#ffffff";
					btnNewGame2.TextField.lineWidth = 12;
					btnNewGame1.TextField.setStrokeText(Dictionary.translate("newGame"));
					btnNewGame1.TextField.setFillText(Dictionary.translate("newGame"));
					btnNewGame2.TextField.setStrokeText(Dictionary.translate("newGame"));
					//btnNewGame2.TextField.setFillText(Dictionary.translate("NEW GAME"));
					btnNewGame.Container.addChild(btnNewGameClick);
					btnNewGame.Container.addChild(btnNewGame2);
					btnNewGame.Container.addChild(btnNewGame1);

				var btnContinue = new DisplayObject({x:922, y:541, name:"continueContainer"});
					btnContinue.addExtention(Extention.Container);
				titleScreen.Container.addChild(btnContinue);
				var btnContinueClick = new DisplayObject({x:-100, y:0, width:200, height:60, name:"continueGame"});
				var btnContinue1 = new DisplayObject();
					btnContinue1.addExtention(Extention.TextField);
				var btnContinue2 = new DisplayObject();
					btnContinue2.addExtention(Extention.TextField);
					btnContinue2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';

				if(navigator.userAgent.search("Firefox") == -1){
 
					var grd = ig.system.context.createLinearGradient(0, 548, 0, 588 );
				     	grd.addColorStop(0, '#f3ede4');
				     	grd.addColorStop(0.49, '#f3ede4');
				      	grd.addColorStop(0.5, '#bbab8b');
				      	grd.addColorStop(1, '#f3ede4');

				    
					btnContinue2.TextField.shadowOffsetY = 3;

			    }else{
			    	var grd = "#f3ede4";
		
			    }
					btnContinue1.TextField.textAlign="center";
					btnContinue1.TextField.font="40px Roboto";
					btnContinue1.TextField.textBaseline="top";
					btnContinue1.TextField.strokeStyle="#e72100";
					btnContinue1.TextField.lineWidth = 10;
					btnContinue1.TextField.fillStyle=grd;
				
					btnContinue2.TextField.textAlign="center";
					btnContinue2.TextField.font="40px Roboto";
					btnContinue2.TextField.textBaseline="top";
					btnContinue2.TextField.strokeStyle="#ffffff";
					btnContinue2.TextField.lineWidth = 12;
					
					btnContinue1.TextField.setStrokeText(Dictionary.translate("continue"));
					btnContinue1.TextField.setFillText(Dictionary.translate("continue"));
					btnContinue2.TextField.setStrokeText(Dictionary.translate("continue"));
					//btnContinue2.TextField.setFillText(Dictionary.translate("continue"));
					btnContinue.Container.addChild(btnContinueClick);
					btnContinue.Container.addChild(btnContinue2);
					btnContinue.Container.addChild(btnContinue1);
					listOfDO.push(btnContinue);
					listOfDO.push(btnContinue1);
					listOfDO.push(btnContinue2);
			}
		};

		titleScreen.updateButtons();

		var overlay = new DisplayObject({name:'overlay', x:0, y:0, width:w, height:h});
			overlay.addExtention([Extention.Container]);
		titleScreen.Container.addChild(overlay);

		titleScreen.onload = function()
		{
			EventManager.bind('play', titleScreen.play);
			EventManager.bind("newGame", titleScreen.newGame);
			EventManager.bind("continueGame", titleScreen.continueGame);
			EventManager.bind('close', titleScreen.close);
			EventManager.bind('reset', titleScreen.reset);
		};

		titleScreen.onunload = function()
		{
			EventManager.unbind('play', titleScreen.play);
			EventManager.unbind("newGame", titleScreen.newGame);
			EventManager.unbind("continueGame", titleScreen.continueGame);
			EventManager.unbind('close', titleScreen.close);
			EventManager.unbind('reset', titleScreen.reset);
		};
		
		titleScreen.newGame = function(){
			if(!is_overlay){
				is_overlay = true;

				overlay.Container.addChild(overlayBackground);
	
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

      			var btnNo = new DisplayObject({x:270, y:406});
					btnNo.addExtention(Extention.Container);
				overlayPanel.Container.addChild(btnNo);
				var btnNoClick = new DisplayObject({x:-50, y:0, width:100, height:60, name:"no"});
				var btnNo1 = new DisplayObject();
					btnNo1.addExtention(Extention.TextField);
				var btnNo2 = new DisplayObject();
					btnNo2.addExtention(Extention.TextField);
					btnNo2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';

				if(navigator.userAgent.search("Firefox") == -1){

				var grd = ig.system.context.createLinearGradient(0, 413, 0, 453 );
			     	grd.addColorStop(0, '#f3ede4');
			     	grd.addColorStop(0.49, '#f3ede4');
			      	grd.addColorStop(0.5, '#bbab8b');
			      	grd.addColorStop(1, '#f3ede4');

			      	btnNo2.TextField.shadowOffsetY = 3;
			    }else{
			    	var grd = "#f3ede4";

			    }
					btnNo1.TextField.textAlign="center";
					btnNo1.TextField.font="40px Roboto";
					btnNo1.TextField.textBaseline="top";
					btnNo1.TextField.strokeStyle="#e72100";
					btnNo1.TextField.lineWidth = 10;
					btnNo1.TextField.fillStyle=grd;
				
					btnNo2.TextField.textAlign="center";
					btnNo2.TextField.font="40px Roboto";
					btnNo2.TextField.textBaseline="top";
					btnNo2.TextField.strokeStyle="#ffffff";
					btnNo2.TextField.lineWidth = 12;
					
					btnNo1.TextField.setStrokeText(Dictionary.translate("no"));
					btnNo1.TextField.setFillText(Dictionary.translate("no"));
					btnNo2.TextField.setStrokeText(Dictionary.translate("no"));
					btnNo.Container.addChild(btnNoClick);
					btnNo.Container.addChild(btnNo2);
					btnNo.Container.addChild(btnNo1);

				var btnYes = new DisplayObject({x:560, y:406});
					btnYes.addExtention(Extention.Container);
				overlayPanel.Container.addChild(btnYes);
				var btnYesClick = new DisplayObject({x:-50, y:0, width:100, height:60, name:"yes"});
				var btnYes1 = new DisplayObject();
					btnYes1.addExtention(Extention.TextField);
				var btnYes2 = new DisplayObject();
					btnYes2.addExtention(Extention.TextField);
					btnYes2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';

				if(navigator.userAgent.search("Firefox") == -1){

					var grd = ig.system.context.createLinearGradient(0, 413, 0, 453 );
				     	grd.addColorStop(0, '#f3ede4');
				     	grd.addColorStop(0.49, '#f3ede4');
				      	grd.addColorStop(0.5, '#bbab8b');
				      	grd.addColorStop(1, '#f3ede4');
				      	btnYes2.TextField.shadowOffsetY = 3;
			    }else{

			    	var grd = "#f3ede4";
			    	
			    }
					btnYes1.TextField.textAlign="center";
					btnYes1.TextField.font="40px Roboto";
					btnYes1.TextField.textBaseline="top";
					btnYes1.TextField.strokeStyle="#e72100";
					btnYes1.TextField.lineWidth = 10;
					btnYes1.TextField.fillStyle=grd;
				
					btnYes2.TextField.textAlign="center";
					btnYes2.TextField.font="40px Roboto";
					btnYes2.TextField.textBaseline="top";
					btnYes2.TextField.strokeStyle="#ffffff";
					btnYes2.TextField.lineWidth = 12;
					
					btnYes1.TextField.setStrokeText(Dictionary.translate("yes"));
					btnYes1.TextField.setFillText(Dictionary.translate("yes"));
					btnYes2.TextField.setStrokeText(Dictionary.translate("yes"));
					//btnYes2.TextField.setFillText(Dictionary.translate("yes"));
					btnYes.Container.addChild(btnYesClick);
					btnYes.Container.addChild(btnYes2);
					btnYes.Container.addChild(btnYes1);
			}
		};

		titleScreen.close = function(e)
		{
			is_overlay = false;

			overlay.Container.removeChildByName('overlayBackground');
			overlay.Container.removeChildByName('overlayPanel');
		};

		titleScreen.play = function()
		{
			if(!is_overlay)
			{
				titleScreen.Container.getChildByName("playContainer").scaleX = 0.9;
				titleScreen.Container.getChildByName("playContainer").scaleX = 0.9;
				LocalStorage.set('firstTime', 'false');
				ig.Menus.loadMenu('story');

				soundManager.stop(ig.game.currentSong);
				window.playSongPls = true;
				ig.game.currentSong = "MenuBGM";		
				if(!ig.ua.mobile){
					ig.game.playSong();
				}
			}
			
		};

		titleScreen.reset = function(e)
		{
			LocalStorage.reset();
			LocalStorage.set('firstTime', 'true');

			titleScreen.updateButtons();
			titleScreen.close();
		};

		titleScreen.continueGame = function()
		{
			
			listOfDO[1].TextField.font = "30px Roboto";
			listOfDO[2].TextField.font = "30px Roboto";
			
			ig.Menus.loadMenu('lvlSelect');

			soundManager.stop(ig.game.currentSong);
			window.playSongPls = true;
			ig.game.currentSong = "MenuBGM";		
			if(!ig.ua.mobile){
				ig.game.playSong();
			}
		};
		
		titleScreen.binds = {
			'play':'play',
			"newGame":"newGame",
			"continueGame":"continueGame",
			'close':'close',
			'no':'close',
			'yes':'reset'
		};

		return titleScreen;
	};
});