ig.module(
	'game.levels.gameplay'
)
.requires(
	'impact.screen'
)
.defines(function(){
	
	//insert screen manager logic over this
	ig.Menus.screens.gameplay = function(){
		var gameplay = new Screen("gameplay", ig.Menus);



		var hud = new DisplayObject2("hud");
		hud.addExt(Extention.Container);

		var winFailScreen = new DisplayObject2("winFailScreen");
		winFailScreen.addExt(Extention.Container);

		var winScreenBG = new DisplayObject2("winBG");
		winScreenBG.loadBitmap("media/images/winfail/lvlWin_BG.png");
		var failScreenBG = new DisplayObject2("failBG");
		failScreenBG.loadBitmap("media/images/winfail/lvlFail_BG.png");
		var textBG3 = new DisplayObject2("textBG3");
		textBG3.loadBitmap("media/images/popup/popup_darkTextBG.png");
		textBG3.x = 410;
		textBG3.y = 420;

		var textBG1 = new DisplayObject2("textBG1");
		textBG1.loadBitmap("media/images/popup/popup_darkTextBG.png");
		textBG1.x = 380;
		textBG1.y = 230;

		var textBG2 = new DisplayObject2("textBG2");
		textBG2.loadBitmap("media/images/popup/popup_darkTextBG.png");
		textBG2.x = 395;
		textBG2.y = 325;

		var lightning = new DisplayObject2("lightning");
		lightning.loadBitmap("media/images/popup/popup_lightning.png");
		lightning.x = 625;
		lightning.y = 200;

		var starBG = new DisplayObject2("starBG")
		starBG.loadBitmap("media/images/popup/popup_paleTextBG.png");
		starBG.x = 430;
		starBG.y = 470;

		var starEmpty1 = new DisplayObject2("starEmpty1");
		starEmpty1.loadBitmap("media/images/popup/popup_starEmpty.png");
		starEmpty1.x = 90;
		starEmpty1.y = 30;
		var starEmpty2 = new DisplayObject2("starEmpty2");
		starEmpty2.loadBitmap("media/images/popup/popup_starEmpty.png");
		starEmpty2.x = 170;
		starEmpty2.y = 30;
		var starEmpty3 = new DisplayObject2("starEmpty3");
		starEmpty3.loadBitmap("media/images/popup/popup_starEmpty.png");
		starEmpty3.x = 250;
		starEmpty3.y = 30;

		var starFull1 = new DisplayObject2("starFull1");
		starFull1.loadBitmap("media/images/popup/popup_starFull.png");
		starFull1.x = 88;
		starFull1.y = 27;
		var starFull2 = new DisplayObject2("starFull2");
		starFull2.loadBitmap("media/images/popup/popup_starFull.png");
		starFull2.x = 168;
		starFull2.y = 27;
		var starFull3 = new DisplayObject2("starFull3");
		starFull3.loadBitmap("media/images/popup/popup_starFull.png");
		starFull3.x = 248;
		starFull3.y = 27;

		var sarge = new DisplayObject2("sarge");
		sarge.loadBitmap("media/images/popup/popup_Sarge.png");
		sarge.x = 475;
		sarge.y = 280;

		var textBG4 = new DisplayObject2("textBG4");
		textBG4.loadBitmap("media/images/popup/popup_paleTallTextBG.png");
		textBG4.x = 315;
		textBG4.y = 140;

		var butQuit = new DisplayObject2("lvlSelect");
		butQuit.loadBitmap("media/images/buttons/Btn_quit.png");
		butQuit.x = 90;
		butQuit.y = 513;

		var yesnoScreen = new DisplayObject2("yesnoScreen");
		yesnoScreen.loadBitmap("media/images/winfail/lvlFail_BG.png");
		yesnoScreen.alpha = 0;
		yesnoScreen.addExt(Extention.Container);
		
		
		//gameplay.Container.addChild(hud);
		//gameplay.Container.addChild(pauseScreen);
		//gameplay.Container.addChild(yesnoScreen);
		//gameplay.Container.addChild(winFailScreen);
		
		
		var yesLink = "";
		var pauseScreenOpen = false;
		var yesnoScreenOpen = false;
		var winFailScreenOpen = false;
		var didWin = false;

		var objFull1 = null;
		var objFull2 = null;
		var objFull3 = null;


		var butPause = new DisplayObject2("pause");
		butPause.loadBitmap("media/images/buttons/Btn_pause.png");
		butPause.x = 960;
		butPause.y = 508;
		hud.Container.addChild(butPause);
		
		
		/*
		//center gameplay text placeholder
		var lapInfo = new DisplayObject({x:568,y:336});
		lapInfo.addExtention(Extention.Container);
		hud.Container.addChild(lapInfo);
		var lapInfo1 = new DisplayObject();
		lapInfo1.addExtention(Extention.TextField);
		var grd = ig.system.context.createLinearGradient(568, 336, 568,310 );
     	grd.addColorStop(0, '#bd1e00');
      	grd.addColorStop(1, '#fd5606');
		lapInfo1.TextField.textAlign="center";
		lapInfo1.TextField.font="32px Roboto";
		lapInfo1.TextField.strokeStyle="white";
		lapInfo1.TextField.lineWidth = 5;
		lapInfo1.TextField.font="32px Roboto";
		lapInfo1.TextField.fillStyle=grd;
		var lapInfo2 = new DisplayObject();
		lapInfo2.addExtention(Extention.TextField);
		lapInfo2.TextField.textAlign="center";
		lapInfo2.TextField.font="32px Roboto";
		lapInfo2.TextField.fillStyle="black";
		lapInfo2.TextField.lineWidth = 9;

		//edit these three lines with the same text
		lapInfo1.TextField.setStrokeText("");
		lapInfo1.TextField.setFillText("");
		lapInfo2.TextField.setStrokeText("");
		*/

		var textTime = new DisplayObject2("textTime");
		textTime.x = 568;
		textTime.y = 110;
		textTime.addExt(Extention.Container);
		hud.Container.addChild(textTime);
		var textTime1 = new DisplayObject2("textTime1");
		textTime1.addExt(Extention.TextField);
		textTime1.TextField.textAlign="center";
		textTime1.TextField.font="40px Roboto";
		textTime1.TextField.strokeStyle="white";
		textTime1.TextField.lineWidth = 5;
		textTime1.TextField.font="40px Roboto";
		textTime1.TextField.fillStyle="black";
		var textTime2 = new DisplayObject2("textTime2");
		textTime2.addExt(Extention.TextField);
		textTime2.TextField.textAlign="center";
		textTime2.TextField.font="40px Roboto";
		textTime2.TextField.fillStyle="black";
		textTime2.TextField.lineWidth = 9;


		var popupScreen = new DisplayObject({data:"media/images/popup/popup_BG.png",name:"popupScreen"});
			popupScreen.addExtention(Extention.Container);
			popupScreen.x = 2000;
		
		var popupOpen = false;

		
		var objpopupTitle = new DisplayObject({x:568,y:80});
		objpopupTitle.addExtention(Extention.Container);
		popupScreen.Container.addChild(objpopupTitle);
		var objpopupTitle1 = new DisplayObject();
		objpopupTitle1.addExtention(Extention.TextField);
		var grd = ig.system.context.createLinearGradient(0, 85, 0,155 );
     	grd.addColorStop(0, '#fd5606');
      	grd.addColorStop(1, '#bd1e00');
		objpopupTitle1.TextField.textAlign="center";
		objpopupTitle1.TextField.font="40px Roboto";
		objpopupTitle1.TextField.textBaseline="top";
		objpopupTitle1.TextField.strokeStyle="#fdf4e0";
		objpopupTitle1.TextField.lineWidth = 4;
		objpopupTitle1.TextField.fillStyle=grd;
		var objpopupTitle2 = new DisplayObject();
		objpopupTitle2.addExtention(Extention.TextField);
		objpopupTitle2.TextField.textAlign="center";
		objpopupTitle2.TextField.font="40px Roboto";
		objpopupTitle2.TextField.textBaseline="top";
		objpopupTitle2.TextField.strokeStyle="#e0d9ca";
		objpopupTitle2.TextField.lineWidth = 6;
		objpopupTitle2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
		objpopupTitle2.TextField.shadowOffsetY = 4;

		
		var objpopupObj = new DisplayObject({x:480,y:155});
		objpopupObj.addExtention(Extention.Container);
		popupScreen.Container.addChild(objpopupObj);
		var objpopupObj1 = new DisplayObject();
		objpopupObj1.addExtention(Extention.TextField);
		objpopupObj1.TextField.textAlign="left";
		objpopupObj1.TextField.font="25px Roboto";
		objpopupObj1.TextField.fillStyle="#36a9ff";
		objpopupObj1.TextField.textBaseline="top";
		var objpopupObj2 = new DisplayObject();
		objpopupObj2.addExtention(Extention.TextField);
		objpopupObj2.TextField.textAlign="left";
		objpopupObj2.TextField.lineWidth = 5;
		objpopupObj2.TextField.font="25px Roboto";
		objpopupObj2.TextField.strokeStyle="white";
		objpopupObj2.TextField.textBaseline="top";
		objpopupObj2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
		objpopupObj2.TextField.shadowOffsetY = 4;
		objpopupObj1.TextField.setFillText(Dictionary.translate("objective"));
		objpopupObj2.TextField.setStrokeText(Dictionary.translate("objective"));


		var objpopupHigh = new DisplayObject({x:550,y:500});
		objpopupHigh.addExtention(Extention.Container);
		popupScreen.Container.addChild(objpopupHigh);
		var objpopupHigh1 = new DisplayObject();
		objpopupHigh1.addExtention(Extention.TextField);
		objpopupHigh1.TextField.textAlign="left";
		objpopupHigh1.TextField.font="25px Roboto";
		objpopupHigh1.TextField.textBaseline="top";
		objpopupHigh1.TextField.fillStyle="#36a9ff";
		var objpopupHigh2 = new DisplayObject();
		objpopupHigh2.addExtention(Extention.TextField);
		objpopupHigh2.TextField.textAlign="left";
		objpopupHigh2.TextField.lineWidth = 5;
		objpopupHigh2.TextField.font="25px Roboto";
		objpopupHigh2.TextField.textBaseline="top";
		objpopupHigh2.TextField.strokeStyle="white";
		objpopupHigh2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
		objpopupHigh2.TextField.shadowOffsetY = 4;
		objpopupHigh1.TextField.setFillText(Dictionary.translate("highscore"));
		objpopupHigh2.TextField.setStrokeText(Dictionary.translate("highscore"));

		tutorialBG = new DisplayObject({data:"media/images/popup/popup_paleTextBG.png",x:400,y:270});
		tutorialBG.addExtention(Extention.Container);
		popupScreen.Container.addChild(tutorialBG);

		objtextBG1 = new DisplayObject({/*data:"media/images/popup/popup_darkTextBG.png",*/x:460,y:200});
		objtextBG1.addExtention(Extention.Container);
		popupScreen.Container.addChild(objtextBG1);
		objtextBG2 = new DisplayObject({/*data:"media/images/popup/popup_darkTextBG.png",*/x:460,y:235});
		objtextBG2.addExtention(Extention.Container);
		popupScreen.Container.addChild(objtextBG2);
		objtextBG3 = new DisplayObject({/*data:"media/images/popup/popup_darkTextBG.png",*/x:495,y:550});
		objtextBG3.addExtention(Extention.Container);
		popupScreen.Container.addChild(objtextBG3);


		var objtextTimeCont1 = new DisplayObject({x:30,y:0});
		objtextTimeCont1.addExtention(Extention.Container);
		objtextBG1.Container.addChild(objtextTimeCont1);
		var objtextTime1 = new DisplayObject();
		objtextTime1.addExtention(Extention.TextField);
		objtextTime1.TextField.textAlign="left";
		objtextTime1.TextField.font="22px RobotoRegular";
		objtextTime1.TextField.fillStyle="black";
		objtextTime1.TextField.textBaseline="top";
		var objtextTime2 = new DisplayObject();
		objtextTime2.addExtention(Extention.TextField);
		objtextTime2.TextField.textAlign="left";
		objtextTime2.TextField.font="22px RobotoRegular";
		objtextTime2.TextField.strokeStyle="white";
		objtextTime2.TextField.lineWidth = 4;
		objtextTime2.TextField.textBaseline="top";


		var objtextTimeCont2 = new DisplayObject({x:40,y:0});
		objtextTimeCont2.addExtention(Extention.Container);
		objtextBG2.Container.addChild(objtextTimeCont2);
		var objtextTime3 = new DisplayObject();
		objtextTime3.addExtention(Extention.TextField);
		objtextTime3.TextField.textAlign="left";
		objtextTime3.TextField.font="22px RobotoRegular";
		objtextTime3.TextField.fillStyle="black";
		objtextTime3.TextField.textBaseline="top";
		var objtextTime4 = new DisplayObject();
		objtextTime4.addExtention(Extention.TextField);
		objtextTime4.TextField.textAlign="left";
		objtextTime4.TextField.font="22px RobotoRegular";
		objtextTime4.TextField.strokeStyle="white";
		objtextTime4.TextField.lineWidth = 4;
		objtextTime4.TextField.textBaseline="top";


		var objtextTimeCont3 = new DisplayObject({x:65,y:0});
		objtextTimeCont3.addExtention(Extention.Container);
		objtextBG3.Container.addChild(objtextTimeCont3);
		var objtextTime5 = new DisplayObject();
		objtextTime5.addExtention(Extention.TextField);
		objtextTime5.TextField.textAlign="left";
		objtextTime5.TextField.font="22px RobotoRegular";
		objtextTime5.TextField.fillStyle="black";
		objtextTime5.TextField.textBaseline="top";
		var objtextTime6 = new DisplayObject();
		objtextTime6.addExtention(Extention.TextField);
		objtextTime6.TextField.textAlign="left";
		objtextTime6.TextField.font="22px RobotoRegular";
		objtextTime6.TextField.strokeStyle="white";
		objtextTime6.TextField.lineWidth = 4;
		objtextTime6.TextField.fillStyle="black";
		objtextTime6.TextField.textBaseline="top";

		var objtextTimeCont4 = new DisplayObject({x:530,y:415});
		objtextTimeCont4.addExtention(Extention.Container);
		popupScreen.Container.addChild(objtextTimeCont4);
		var objtextTime7 = new DisplayObject({width:320});
		objtextTime7.addExtention(Extention.TextField);
		objtextTime7.TextField.textAlign="left";
		objtextTime7.TextField.font="22px RobotoRegular";
		objtextTime7.TextField.fillStyle="black";
		objtextTime7.TextField.textBaseline="top";
		objtextTime7.TextField.textWrap = true;
		var objtextTime8 = new DisplayObject({width:320});
		objtextTime8.addExtention(Extention.TextField);
		objtextTime8.TextField.textAlign="left";
		objtextTime8.TextField.font="22px RobotoRegular";
		objtextTime8.TextField.strokeStyle="white";
		objtextTime8.TextField.lineWidth = 4;
		objtextTime8.TextField.fillStyle="black";
		objtextTime8.TextField.textBaseline="top";
		objtextTime8.TextField.textWrap = true;
		objtextTime7.TextField.setFillText(Dictionary.translate("lvlSpecs7"));
		objtextTime8.TextField.setStrokeText(Dictionary.translate("lvlSpecs7"));


		objpopupTitle.Container.addChild(objpopupTitle2);
		objpopupTitle.Container.addChild(objpopupTitle1);
		objpopupObj.Container.addChild(objpopupObj2);
		objpopupObj.Container.addChild(objpopupObj1);
		objpopupHigh.Container.addChild(objpopupHigh2);
		objpopupHigh.Container.addChild(objpopupHigh1);
		objtextTimeCont1.Container.addChild(objtextTime2);
		objtextTimeCont1.Container.addChild(objtextTime1);
		objtextTimeCont2.Container.addChild(objtextTime4);
		objtextTimeCont2.Container.addChild(objtextTime3);
		objtextTimeCont3.Container.addChild(objtextTime6);
		objtextTimeCont3.Container.addChild(objtextTime5);
		objtextTimeCont4.Container.addChild(objtextTime8);
		objtextTimeCont4.Container.addChild(objtextTime7);
		
		tutorial = new DisplayObject({data:"media/images/popup/map-endurance.png"});
		tutorial = new DisplayObject({data:"media/images/popup/map-exploration.png"});
		tutorial = new DisplayObject({data:"media/images/popup/popup_tutorial1.png"});
	
		//var butBackRect = new DisplayObject({data:"media/images/buttons/Btn_back.png",x:95, y:514, name:"back"});
		
		var sargeMic = new DisplayObject({data:"media/images/popup/popup_SargeMic.png",x:60,y:250});
		popupScreen.Container.addChild(sargeMic);

		//gameplay.Container.addChild(butBackRect);

		
		gameplay.showhud = function(){
			
			ig.game.loopSong("driveSound");
			ig.game.loopSong("idle");
			
			gameplay.Container.addChild(hud);
			gameplay.Container.addChild(pauseScreen);
			gameplay.Container.addChild(yesnoScreen);
		}
		
		
		
		gameplay.resize = function(){
			/*butPause.x = 1136/2 + window.visibleWidth/2 - 108;
			butPause.y = 672/2 + window.visibleHeight/2 - 108;
			
			butPause.width = 90;
			butPause.height = 97;*/
		};
		
		gameplay.setTime = function(timeText){
			textTime1.TextField.setStrokeText(timeText);
			textTime1.TextField.setFillText(timeText);
			textTime2.TextField.setStrokeText(timeText);
		};

		gameplay.showWinFailScreen = function(){
			
			//winFailScreen.x = n;
			gameplay.Container.addChild(winFailScreen);
			winFailScreenOpen = true;

			soundManager.stopAll();

			if(ig.game.currentScene.gamewon){

				winFailTitle2.TextField.setStrokeText(Dictionary.translate("winTitle"));
				winFailTitle1.TextField.setFillText(Dictionary.translate("winTitle"));
				
				gameplay.Container.addChild(popupScreen);
				gameplay.Container.addChild(butNextRect);
				
				winFailScreen.Container.addChild(winScreenBG);

				winFailScreen.Container.addChild(winFailTitle);
				winFailTitle.Container.addChild(winFailTitle2);
				winFailTitle.Container.addChild(winFailTitle1);
								
				
				textBG1.addExt(Extention.Container);
				winFailScreen.Container.addChild(textBG1);
				textBG2.addExt(Extention.Container);
				winFailScreen.Container.addChild(textBG2);
				

				winFailScreen.Container.addChild(lightning);

				/*cone1 = new DisplayObject({data:"media/images/popup/popup_cone.png",x:480,y:185});
				winFailScreen.Container.addChild(cone1);*/
				

				var popupObj = new DisplayObject2("popupObj");
				popupObj.x = 420;
				popupObj.y = 185;
				popupObj.addExt(Extention.Container);
				winFailScreen.Container.addChild(popupObj);
				var popupObj1 = new DisplayObject2("popupObj1");
				popupObj1.addExt(Extention.TextField);
				popupObj1.TextField.textAlign="left";
				popupObj1.TextField.font="22px Roboto";
				popupObj1.TextField.fillStyle="#36a9ff";
				popupObj1.TextField.textBaseline="top";
				var popupObj2 = new DisplayObject2("popupObj2");
				popupObj2.addExt(Extention.TextField);
				popupObj2.TextField.textAlign="left";
				popupObj2.TextField.lineWidth = 5;
				popupObj2.TextField.font="22px Roboto";
				popupObj2.TextField.strokeStyle="white";
				popupObj2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
				popupObj2.TextField.shadowOffsetY = 4;
				popupObj2.TextField.textBaseline="top";
				popupObj1.TextField.setFillText(Dictionary.translate("time"));
				popupObj2.TextField.setStrokeText(Dictionary.translate("time"));
				

				popupObj.Container.addChild(popupObj2);
				popupObj.Container.addChild(popupObj1);


				/*cone2 = new DisplayObject({data:"media/images/popup/popup_cone.png",x:480,y:280});
				winFailScreen.Container.addChild(cone2);*/

				var popupHigh = new DisplayObject2("popupHigh");
				popupHigh.x = 435;
				popupHigh.y = 280;
				popupHigh.addExt(Extention.Container);
				winFailScreen.Container.addChild(popupHigh);
				var popupHigh1 = new DisplayObject2("popupHigh1");
				popupHigh1.addExt(Extention.TextField);
				popupHigh1.TextField.textAlign="left";
				popupHigh1.TextField.font="22px Roboto";
				popupHigh1.TextField.fillStyle="#36a9ff";
				popupHigh1.TextField.textBaseline="top";
				var popupHigh2 = new DisplayObject2("popupHigh2");
				popupHigh2.addExt(Extention.TextField);
				popupHigh2.TextField.textAlign="left";
				popupHigh2.TextField.lineWidth = 5;
				popupHigh2.TextField.font="22px Roboto";
				popupHigh2.TextField.strokeStyle="white";
				popupHigh2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
				popupHigh2.TextField.shadowOffsetY = 4;
				popupHigh2.TextField.textBaseline="top";
				popupHigh1.TextField.setFillText(Dictionary.translate("oilCans"));
				popupHigh2.TextField.setStrokeText(Dictionary.translate("oilCans"));

				popupHigh.Container.addChild(popupHigh2);
				popupHigh.Container.addChild(popupHigh1);

				/*cone3 = new DisplayObject({data:"media/images/popup/popup_cone.png",x:480,y:375});
				winFailScreen.Container.addChild(cone3);*/


				var textTimeCont1 = new DisplayObject2("textTimeCont1");
				textTimeCont1.x = 50;
				textTimeCont1.addExt(Extention.Container);
				textBG1.Container.addChild(textTimeCont1);
				var textTime1 = new DisplayObject2("textTime1");
				textTime1.addExt(Extention.TextField);
				textTime1.TextField.textAlign="left";
				textTime1.TextField.font="22px RobotoRegular";
				textTime1.TextField.fillStyle="black";
				textTime1.TextField.textBaseline="top";
				var textTime2 = new DisplayObject2("textTime2");
				textTime2.addExt(Extention.TextField);
				textTime2.TextField.textAlign="left";
				textTime2.TextField.font="22px RobotoRegular";
				textTime2.TextField.strokeStyle="white";
				textTime2.TextField.lineWidth = 4;
				textTime2.TextField.textBaseline="top";

				textTimeCont1.Container.addChild(textTime2);
				textTimeCont1.Container.addChild(textTime1);

				var textTimeCont2 = new DisplayObject2("textTimeCont2");
				textTimeCont2.x = 50;
				textTimeCont2.addExt(Extention.Container);
				textBG2.Container.addChild(textTimeCont2);
				var textTime3 = new DisplayObject2("textTime3");
				textTime3.addExt(Extention.TextField);
				textTime3.TextField.textAlign="left";
				textTime3.TextField.font="22px RobotoRegular";
				textTime3.TextField.fillStyle="black";
				textTime3.TextField.textBaseline="top";
				var textTime4 = new DisplayObject2("textTime4");
				textTime4.addExt(Extention.TextField);
				textTime4.TextField.textAlign="left";
				textTime4.TextField.font="22px RobotoRegular";
				textTime4.TextField.strokeStyle="white";
				textTime4.TextField.lineWidth = 4;
				textTime4.TextField.textBaseline="top";

				textTimeCont2.Container.addChild(textTime4);
				textTimeCont2.Container.addChild(textTime3);

				
				textTime1.TextField.setFillText(this.wonTime);
				textTime2.TextField.setStrokeText(this.wonTime);
				
				textTime3.TextField.setFillText(this.wonOil);
				textTime4.TextField.setStrokeText(this.wonOil);
				
				
				starBG.addExt(Extention.Container);
				winFailScreen.Container.addChild(starBG);


				starBG.Container.addChild(starEmpty1);
				starBG.Container.addChild(starEmpty2);
				starBG.Container.addChild(starEmpty3);

				
				var fullStars = [starFull1,starFull2,starFull3];
				
				for (var i=0; i<3; i++) {
					if ( (i+1) <= this.wonStars ) starBG.Container.addChild(fullStars[i]);
				}

				soundManager.stop(ig.game.currentSong);
				//window.playSongPls = true;
						
				if(!ig.ua.mobile){
					ig.game.currentSong = "Win";
					soundManager.play(ig.game.currentSong);
				}
				
			}else{
				winFailTitle2.TextField.setStrokeText(Dictionary.translate("failTitle"));
				winFailTitle1.TextField.setFillText(Dictionary.translate("failTitle"));

				
				winFailScreen.Container.addChild(failScreenBG);


				winFailScreen.Container.addChild(winFailTitle);
				winFailTitle.Container.addChild(winFailTitle2);
				winFailTitle.Container.addChild(winFailTitle1);

				winFailScreen.Container.addChild(sarge);

				textBG4.addExt(Extention.Container);
				winFailScreen.Container.addChild(textBG4);


				var textTimeCont1 = new DisplayObject2("textTimeCont1");
				textTimeCont1.x = 75;
				textTimeCont1.y = 20;
				textTimeCont1.addExt(Extention.Container);
				textBG4.Container.addChild(textTimeCont1);
				var textTime1 = new DisplayObject2("textTime1");
				textTime1.width = 300;
				textTime1.addExt(Extention.TextField);
				textTime1.TextField.textAlign="center";
				textTime1.TextField.font="22px RobotoRegular";
				textTime1.TextField.fillStyle="black";
				textTime1.TextField.verticalSpacing=5;
				textTime1.TextField.textBaseline="top";
				textTime1.TextField.textWrap=true;
				var textTime2 = new DisplayObject2("textTime2");
				textTime2.width = 300;
				textTime2.addExt(Extention.TextField);
				textTime2.TextField.textAlign="center";
				textTime2.TextField.font="22px RobotoRegular";
				textTime2.TextField.strokeStyle="white";
				textTime2.TextField.lineWidth = 4;
				textTime2.TextField.verticalSpacing=5;
				textTime2.TextField.textBaseline="top";
				textTime2.TextField.textWrap=true;

				textTimeCont1.Container.addChild(textTime2);
				textTimeCont1.Container.addChild(textTime1);
				winFailScreen.Container.addChild(butRetryRect);

				textTime1.TextField.setFillText(Dictionary.translate("failText"));
				textTime2.TextField.setStrokeText(Dictionary.translate("failText"));

				soundManager.stop(ig.game.currentSong);
				//window.playSongPls = true;
						
				if(!ig.ua.mobile){
					ig.game.currentSong = "Fail";
					soundManager.play(ig.game.currentSong);
				}
				
			}

			
				textBG3.addExt(Extention.Container);
				winFailScreen.Container.addChild(textBG3);
				var popupScore = new DisplayObject2("popupScore");
				popupScore.x = 450;
				popupScore.y = 375;
				popupScore.addExt(Extention.Container);
				winFailScreen.Container.addChild(popupScore);
				var popupScore1 = new DisplayObject2("popupScore1");
				popupScore1.addExt(Extention.TextField);
				popupScore1.TextField.textAlign="left";
				popupScore1.TextField.font="22px Roboto";
				popupScore1.TextField.fillStyle="#36a9ff";
				popupScore1.TextField.textBaseline="top";
				var popupScore2 = new DisplayObject2("popupScore2");
				popupScore2.addExt(Extention.TextField);
				popupScore2.TextField.textAlign="left";
				popupScore2.TextField.lineWidth = 5;
				popupScore2.TextField.font="22px Roboto";
				popupScore2.TextField.strokeStyle="white";
				popupScore2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
				popupScore2.TextField.shadowOffsetY = 4;
				popupScore2.TextField.textBaseline="top";
				popupScore1.TextField.setFillText(Dictionary.translate("score"));
				popupScore2.TextField.setStrokeText(Dictionary.translate("score"));

				var textTimeCont3 = new DisplayObject2("textTimeCont3");
				textTimeCont3.x = 50;
				textTimeCont3.addExt(Extention.Container);
				textBG3.Container.addChild(textTimeCont3);
				var textTime5 = new DisplayObject2("textTime5");
				textTime5.addExt(Extention.TextField);
				textTime5.TextField.textAlign="left";
				textTime5.TextField.font="22px RobotoRegular";
				textTime5.TextField.fillStyle="black";
				textTime5.TextField.textBaseline="top";
				var textTime6 = new DisplayObject2("textTime6");
				textTime6.addExt(Extention.TextField);
				textTime6.TextField.textAlign="left";
				textTime6.TextField.font="22px RobotoRegular";
				textTime6.TextField.strokeStyle="white";
				textTime6.TextField.lineWidth = 4;
				textTime6.TextField.fillStyle="black";

				textTime6.TextField.textBaseline="top";

				if(ig.game.levelToLoad == 2){
				var newcar = new DisplayObject2("newcar");
				newcar.loadBitmap("media/images/hud/newcar50.png");
				newcar.x = 482;
				newcar.y = 563;
				winFailScreen.Container.addChild(newcar);
				}

				textTimeCont3.Container.addChild(textTime6);
				textTimeCont3.Container.addChild(textTime5);

				popupScore.Container.addChild(popupScore2);
				popupScore.Container.addChild(popupScore1);

				textTime5.TextField.setFillText(this.wonScore +"");
				textTime6.TextField.setStrokeText(this.wonScore +"");

				winFailScreen.Container.addChild(butQuit);
		};
		
		/*
		textTime.Container.addChild(lapInfo2);
		textTime.Container.addChild(lapInfo1);
		*/
		textTime.Container.addChild(textTime2);
		textTime.Container.addChild(textTime1);
		
		

		
		
		
		gameplay.setObj = function setObj(type){
			
			var objEmpty1 = new DisplayObject2("objEmpty1");
			hud.Container.addChild(objEmpty1);
			var objEmpty2 = new DisplayObject2("objEmpty2");
			hud.Container.addChild(objEmpty2);
			var objEmpty3 = new DisplayObject2("objEmpty3");
			hud.Container.addChild(objEmpty3);
			
			this.objFull1 = new DisplayObject2("objFull1");
			hud.Container.addChild(this.objFull1);
			this.objFull2 = new DisplayObject2("objFull2");
			hud.Container.addChild(this.objFull2);
			this.objFull3 = new DisplayObject2("objFull3");
			hud.Container.addChild(this.objFull3);
			
			switch(type){

				case "fetch":
					objEmpty1.loadBitmap("media/images/hud/hud_objectiveEmpty.png");
					objEmpty1.x = 90;
					objEmpty1.y = 70;
					objEmpty2.loadBitmap("media/images/hud/hud_objectiveEmpty.png");
					objEmpty2.x = 170;
					objEmpty2.y = 70;
					objEmpty3.loadBitmap("media/images/hud/hud_objectiveEmpty.png");
					objEmpty3.x = 250;
					objEmpty3.y = 70;
					
					this.objFull1.loadBitmap("media/images/hud/hud_objectiveFull.png");
					this.objFull1.x = 100;
					this.objFull1.y = 79;
					this.objFull2.loadBitmap("media/images/hud/hud_objectiveFull.png");
					this.objFull2.x = 180;
					this.objFull2.y = 79;
					this.objFull3.loadBitmap("media/images/hud/hud_objectiveFull.png");
					this.objFull3.x = 260;
					this.objFull3.y = 79;
					
				break;
				case "obst":
					objEmpty1.loadBitmap("media/images/hud/life_empty.png");
					objEmpty1.x = 90;
					objEmpty1.y = 70;
					objEmpty2.loadBitmap("media/images/hud/life_empty.png");
					objEmpty2.x = 190;
					objEmpty2.y = 70;
					objEmpty3.loadBitmap("media/images/hud/life_empty.png");
					objEmpty3.x = 290;
					objEmpty3.y = 70;
				
					this.objFull1.loadBitmap("media/images/hud/life_full.png");
					this.objFull1.x = 90;
					this.objFull1.y = 57;
					this.objFull2.loadBitmap("media/images/hud/life_full.png");
					this.objFull2.x = 190;
					this.objFull2.y = 57;
					this.objFull3.loadBitmap("media/images/hud/life_full.png");
					this.objFull3.x = 290;
					this.objFull3.y = 57;
				break;
			}
		};

		
		gameplay.setFlagNum = function setFlagNum(num){
			var flags = [this.objFull1,this.objFull2,this.objFull3];
			for (var i=0; i<flags.length; i++) {
				console.log(flags[i].y);
				flags[i].y = (i < num) ? 79 : -100;
			}
		};

		gameplay.setLifeNum = function setLifeNum(num){
			var flags = [this.objFull1,this.objFull2,this.objFull3];
			for (var i=0; i<flags.length; i++) {
				flags[i].y = (i < num) ? 70 : -100;
			}
		};
		
		var pauseScreen = new DisplayObject2("pauseScreen");
		pauseScreen.loadBitmap("media/images/popup/popup_BG.png");
		pauseScreen.alpha = 0;
		pauseScreen.addExt(Extention.Container);
		gameplay.Container.addChild(pauseScreen);


		var popupTitle = new DisplayObject2("popupTitle");
		popupTitle.x = 568;
		popupTitle.y = 70;
		popupTitle.addExt(Extention.Container);
		pauseScreen.Container.addChild(popupTitle);
		var popupTitle1 = new DisplayObject2("popupTitle1");
		popupTitle1.addExt(Extention.TextField);
		var grd = ig.system.context.createLinearGradient(0, 70, 0, 160);
     	grd.addColorStop(0, '#fd5606');
      	grd.addColorStop(1, '#bd1e00');
		popupTitle1.TextField.textAlign="center";
		popupTitle1.TextField.font="40px Roboto";
		popupTitle1.TextField.textBaseline="top";
		popupTitle1.TextField.fillStyle=grd;
		var popupTitle2 = new DisplayObject2("popupTitle2");
		popupTitle2.addExt(Extention.TextField);
		popupTitle2.TextField.textAlign="center";
		popupTitle2.TextField.font="40px Roboto";
		popupTitle2.TextField.strokeStyle="#e0d9ca";
		popupTitle2.TextField.textBaseline="top";
		popupTitle2.TextField.lineWidth = 4;
		popupTitle2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
		popupTitle2.TextField.shadowOffsetY = 4;

		popupTitle.Container.addChild(popupTitle2);
		popupTitle.Container.addChild(popupTitle1);
		
		popupTitle1.TextField.setStrokeText(Dictionary.translate("pauseTitle"));
		popupTitle1.TextField.setFillText(Dictionary.translate("pauseTitle"));
		popupTitle2.TextField.setStrokeText(Dictionary.translate("pauseTitle"));

		var butMute = new DisplayObject2("unmute");
		butMute.loadBitmap("media/images/buttons/Btn_soundOff.png");
		butMute.x = 450;
		butMute.y = 190;
		pauseScreen.Container.addChild(butMute);

		var butUnmute = new DisplayObject2("mute");
		butUnmute.loadBitmap("media/images/buttons/Btn_soundOn.png");
		butUnmute.x = 450;
		butUnmute.y = 190;
		pauseScreen.Container.addChild(butUnmute);

		if(ig.global.gameMuted){
			butMute.alpha = 1;
			butUnmute.alpha = 0;
		}else{
			butMute.alpha = 0;
			butUnmute.alpha = 1;
		}
		
		var but5Rect = new DisplayObject2("restart");
		but5Rect.loadBitmap("media/images/buttons/Btn_replay.png");
		but5Rect.x = 615;
		but5Rect.y = 190;
		pauseScreen.Container.addChild(but5Rect);
		
		var but6Rect = new DisplayObject2("quit");
		but6Rect.loadBitmap("media/images/buttons/Btn_quit.png");
		but6Rect.x = 450;
		but6Rect.y = 320;
		pauseScreen.Container.addChild(but6Rect);
		
		var but2Rect = new DisplayObject2("resume");
		but2Rect.loadBitmap("media/images/buttons/Btn_resume.png");
		but2Rect.x = 615;
		but2Rect.y = 320;
		pauseScreen.Container.addChild(but2Rect);

		var sally = new DisplayObject2("sally");
		sally.loadBitmap("media/images/character/Sally.png");
		sally.x = 150;
		sally.y = 450;
		pauseScreen.Container.addChild(sally);

		var matter = new DisplayObject2("matter");
		matter.loadBitmap("media/images/character/Matter.png");
		matter.x = 700;
		matter.y = 300;
		pauseScreen.Container.addChild(matter);


		var btnYes = new DisplayObject2("yes");
		btnYes.x = 716;
		btnYes.y = 417;
		btnYes.width = 50;
		btnYes.height = 55;
		btnYes.addExt(Extention.Container);
		yesnoScreen.Container.addChild(btnYes);
		var btnYes1 = new DisplayObject2("btnYes1");
			btnYes1.addExt(Extention.TextField);
		var btnYes2 = new DisplayObject2("btnYes2");
			btnYes2.addExt(Extention.TextField);
		if(navigator.userAgent.search("Firefox") == -1){
			var grd = ig.system.context.createLinearGradient(0, 417, 0, 479 );
		     	grd.addColorStop(0, '#f3ede4');
		     	grd.addColorStop(0.49, '#f3ede4');
		      	grd.addColorStop(0.5, '#bbab8b');
		      	grd.addColorStop(1, '#f3ede4');
		    btnYes2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
			btnYes2.TextField.shadowOffsetY = 3;
 		}else{
			var grd = "#f3ede4";

		}
		
		btnYes1.TextField.textAlign="left";
		btnYes1.TextField.font="40px Roboto";
		btnYes1.TextField.textBaseline="top";
		btnYes1.TextField.strokeStyle="#e72100";
		btnYes1.TextField.lineWidth = 10;
		btnYes1.TextField.fillStyle=grd;
		
		btnYes2.TextField.textAlign="left";
		btnYes2.TextField.font="40px Roboto";
		btnYes2.TextField.textBaseline="top";
		btnYes2.TextField.strokeStyle="#ffffff";
		btnYes2.TextField.lineWidth = 12;
		
		btnYes1.TextField.setStrokeText(Dictionary.translate("yes"));
		btnYes1.TextField.setFillText(Dictionary.translate("yes"));
		btnYes2.TextField.setStrokeText(Dictionary.translate("yes"));
		btnYes.Container.addChild(btnYes2);
		btnYes.Container.addChild(btnYes1);


		var btnNo = new DisplayObject2("no");
		btnNo.x = 376;
		btnNo.y = 417;
		btnNo.width = 75;
		btnNo.height = 55;
		btnNo.addExt(Extention.Container);
		yesnoScreen.Container.addChild(btnNo);
		var btnNo1 = new DisplayObject2("btnNo1");
		btnNo1.addExt(Extention.TextField);
		var btnNo2 = new DisplayObject2("btnNo2");
		btnNo2.addExt(Extention.TextField);

		if(navigator.userAgent.search("Firefox") == -1){
			var grd = ig.system.context.createLinearGradient(0, 417, 0, 479 );
		     	grd.addColorStop(0, '#f3ede4');
		     	grd.addColorStop(0.49, '#f3ede4');
		      	grd.addColorStop(0.5, '#bbab8b');
		      	grd.addColorStop(1, '#f3ede4');
		      	btnNo2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
			btnNo2.TextField.shadowOffsetY = 3;
		}else{
			var grd = "#f3ede4";

		}
		
		btnNo1.TextField.textAlign="left";
		btnNo1.TextField.font="40px Roboto";
		btnNo1.TextField.textBaseline="top";
		btnNo1.TextField.strokeStyle="#e72100";
		btnNo1.TextField.lineWidth = 10;
		btnNo1.TextField.fillStyle=grd;
		
		btnNo2.TextField.textAlign="left";
		btnNo2.TextField.font="40px Roboto";
		btnNo2.TextField.textBaseline="top";
		btnNo2.TextField.strokeStyle="#ffffff";
		btnNo2.TextField.lineWidth = 12;
		
		btnNo1.TextField.setStrokeText(Dictionary.translate("no"));
		btnNo1.TextField.setFillText(Dictionary.translate("no"));
		btnNo2.TextField.setStrokeText(Dictionary.translate("no"));
		btnNo.Container.addChild(btnNo2);
		btnNo.Container.addChild(btnNo1);

		var textTitle = new DisplayObject2("textTitle");
		textTitle.x = 438;
		textTitle.y = 275;
		textTitle.width = 300;
		textTitle.addExt(Extention.TextField);
		yesnoScreen.Container.addChild(textTitle);
		textTitle.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
		textTitle.TextField.textAlign = 'center';
		textTitle.TextField.font = '22px Roboto';
		textTitle.TextField.textWrap = true;
		textTitle.TextField.setFillText(Dictionary.translate("confirmTitle"));

		var winFailTitle = new DisplayObject2("winFailTitle");
		winFailTitle.x = 568;
		winFailTitle.y = 70;
		winFailTitle.addExt(Extention.Container);
		winFailScreen.Container.addChild(winFailTitle);
		var winFailTitle1 = new DisplayObject2("winFailTitle1");
		winFailTitle1.addExt(Extention.TextField);
		var gradient = ig.system.context.createLinearGradient(0, 70, 0,160 );
     	gradient.addColorStop(0, '#fd5606');
      	gradient.addColorStop(1, '#bd1e00');
		winFailTitle1.TextField.textAlign="center";
		winFailTitle1.TextField.font="40px Roboto";
		winFailTitle1.TextField.textBaseline="top";
		winFailTitle1.TextField.fillStyle=gradient;
		var winFailTitle2 = new DisplayObject2("winFailTitle2");
		winFailTitle2.addExt(Extention.TextField);
		winFailTitle2.TextField.textAlign="center";
		winFailTitle2.TextField.font="40px Roboto";
		winFailTitle2.TextField.textBaseline="top";
		winFailTitle2.TextField.strokeStyle="#e0d9ca";
		winFailTitle2.TextField.lineWidth = 4;
		winFailTitle2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
		winFailTitle2.TextField.shadowOffsetY = 4;

		var butRetryRect = new DisplayObject2("retry");
		butRetryRect.loadBitmap("media/images/buttons/Btn_replay.png");
		butRetryRect.x = 957;
		butRetryRect.y = 513;

		var butNextRect = new DisplayObject2("next");
		butNextRect.loadBitmap("media/images/buttons/Btn_forward.png");
		butNextRect.x = 957;
		butNextRect.y = 513;
	
		gameplay.addObjective = function(flag, x){

			/*placing the objective flag and add objective code below
			flag.x = x;			*/
		};


		gameplay.resume = function(){
			if(yesnoScreenOpen)
				return;
			
			//pauseScreen.x = 2000;
			pauseScreen.alpha = 0;
			pauseScreenOpen=false;
			if(ig.ua.mobile){
				ig.music.volume =1;
			}else{
				soundManager.setVolume(ig.game.currentSong,100);		
			}
			//unpause call
		};

		gameplay.htp = function(){
			if(yesnoScreenOpen)
				return;
			
			yesLink = "htp";
			yesnoScreenOpen = true;
			//yesnoScreen.x = 0;
			//gameplay.Container.addChild(yesnoScreen);
			yesnoScreen.alpha = 1;
		};

		gameplay.mute = function(){
			if(yesnoScreenOpen)
				return;

			console.log(ig.global.gameMuted);
			
			if(ig.global.gameMuted){
				return;
			}
				
				butMute.alpha = 1;
				butUnmute.alpha = 0;
				ig.global.gameMuted = true;
				if(ig.ua.mobile){
					ig.music.stop();
				}else{
					soundManager.stopAll();
				}		
				return;
		
		};

		gameplay.unmute = function(){
			if(yesnoScreenOpen)
				return;

			console.log(ig.global.gameMuted);
			
			if(!ig.global.gameMuted){
				return;
			}
				
				butMute.alpha = 0;
				butUnmute.alpha = 1;
				ig.global.gameMuted = false;
				if(ig.ua.mobile){
					ig.music.play('gameplayBGM');
				}else{
					soundManager.togglePause('gameplayBGM');
				}
				return;
		};

		gameplay.restart = function(){
			if(yesnoScreenOpen)
				return;
			
			yesLink = "restart";
			yesnoScreenOpen = true;
			//yesnoScreen.x = 0;
			//gameplay.Container.addChild(yesnoScreen);
			yesnoScreen.alpha = 1;
		};

		gameplay.quit = function(){
			if(yesnoScreenOpen)
				return;

			yesLink = "lvlSelect";
			yesnoScreenOpen = true;

			window.playSongPls = true;
			ig.game.currentSong = "MenuBGM";

			
			//yesnoScreen.x = 0;
			//gameplay.Container.addChild(yesnoScreen);
			yesnoScreen.alpha = 1;
		};

		gameplay.yes = function(){
			
			// this might cause an error if gameplay is shut down INSIDE of Impact's update loop,
			// but I think it will always be triggered by a DisplayObject instead?
			// in which case, it might be important NOT to use 'loadLevelDeferred',
			// or else the entities might get one more loop after the scene and menu they use are destroyed!
			ig.game.loadLevel( LevelEmptylevel );
			ig.game.loadScene(null);
			soundManager.stop(ig.game.currentSong);
			switch(yesLink){
				case "htp":
				ig.global.menuSongStarted = true;
				soundManager.stop(ig.game.currentSong);
				window.playSongPls = true;
				ig.game.currentSong = "MenuBGM";		
				if(!ig.ua.mobile){
					ig.game.playSong();
				}
				ig.Menus.loadMenu("htp");

				break;
				case "lvlSelect":
				ig.global.menuSongStarted = true;
				if(ig.ua.mobile){
					ig.music.stop();
				}else{
					soundManager.stopAll();
				}
				window.playSongPls = true;
				ig.game.currentSong = "MenuBGM";
				ig.game.playSong();
				ig.Menus.loadMenu("lvlSelect");
				
				break;
				case "restart":
				soundManager.stop(ig.game.currentSong);
				window.playSongPls = true;
				ig.game.currentSong = "gameplayBGM";		
				if(!ig.ua.mobile){
					ig.game.playSong();
				}
				ig.Menus.loadMenu("gameplay");
				ig.game.loadScene(SceneGameplay);
				break;
			}
			
		};

		gameplay.no = function(){
			//yesnoScreen.x = 2000;
			//gameplay.Container.removeChildByName(yesnoScreen.name);
			yesnoScreen.alpha = 0;
			yesnoScreenOpen = false;
		};
		
		gameplay.retry = function(){
			soundManager.stop(ig.game.currentSong);
			ig.Menus.loadMenu("gameplay");
			ig.game.loadScene(SceneGameplay);
		};

		gameplay.objOverlay = function(){


			switch(ig.game.levelToLoad){
				case 0:
				tutorial = new DisplayObject({data:"media/images/popup/map-exploration.png",x:70,y:0, name:"tutorial"});
				tutorialBG.Container.addChild(tutorial);
				objpopupTitle1.TextField.setStrokeText(Dictionary.translate("popupTitle2"));
				objpopupTitle1.TextField.setFillText(Dictionary.translate("popupTitle2"));
				objpopupTitle2.TextField.setStrokeText(Dictionary.translate("popupTitle2"));
				objtextTime1.TextField.setFillText(Dictionary.translate("lvlSpecs3"));
				objtextTime2.TextField.setStrokeText(Dictionary.translate("lvlSpecs3"));
				objtextTime3.TextField.setFillText(Dictionary.translate("lvlSpecs4"));
				objtextTime4.TextField.setStrokeText(Dictionary.translate("lvlSpecs4"));
				gameplay.fillHighScore(2);
				break;
				
				case 1:
				tutorial = new DisplayObject({data:"media/images/popup/popup_tutorial1.png",x:90,y:10, name:"tutorial"});
				tutorialBG.Container.addChild(tutorial);
				objpopupTitle1.TextField.setStrokeText(Dictionary.translate("popupTitle3"));
				objpopupTitle1.TextField.setFillText(Dictionary.translate("popupTitle3"));
				objpopupTitle2.TextField.setStrokeText(Dictionary.translate("popupTitle3"));
				objtextTime1.TextField.setFillText(Dictionary.translate("lvlSpecs5"));
				objtextTime2.TextField.setStrokeText(Dictionary.translate("lvlSpecs5"));
				objtextTime3.TextField.setFillText(Dictionary.translate("lvlSpecs6"));
				objtextTime4.TextField.setStrokeText(Dictionary.translate("lvlSpecs6"));
				gameplay.fillHighScore(3);
				break;
				
				case 2:
				tutorial = new DisplayObject({data:"media/images/popup/map-endurance.png",x:80,y:-5, name:"tutorial"});
				tutorialBG.Container.addChild(tutorial);
				objpopupTitle1.TextField.setStrokeText(Dictionary.translate("popupTitle4"));
				objpopupTitle1.TextField.setFillText(Dictionary.translate("popupTitle4"));
				objpopupTitle2.TextField.setStrokeText(Dictionary.translate("popupTitle4"));
				objtextTime1.TextField.setFillText(Dictionary.translate("lvlSpecs1"));
				objtextTime2.TextField.setStrokeText(Dictionary.translate("lvlSpecs1"));
				objtextTime3.TextField.setFillText(Dictionary.translate("lvlSpecs2"));
				objtextTime4.TextField.setStrokeText(Dictionary.translate("lvlSpecs2"));
				gameplay.fillHighScore(4);
				break;
				
				case 3:
				tutorial = new DisplayObject({data:"media/images/popup/map-exploration.png",x:70,y:0, name:"tutorial"});
				tutorialBG.Container.addChild(tutorial);
				objpopupTitle1.TextField.setStrokeText(Dictionary.translate("popupTitle5"));
				objpopupTitle1.TextField.setFillText(Dictionary.translate("popupTitle5"));
				objpopupTitle2.TextField.setStrokeText(Dictionary.translate("popupTitle5"));
				objtextTime1.TextField.setFillText(Dictionary.translate("lvlSpecs3"));
				objtextTime2.TextField.setStrokeText(Dictionary.translate("lvlSpecs3"));
				objtextTime3.TextField.setFillText(Dictionary.translate("lvlSpecs4"));
				objtextTime4.TextField.setStrokeText(Dictionary.translate("lvlSpecs4"));
				gameplay.fillHighScore(5);
				break;
				
				case 4:
				tutorial = new DisplayObject({data:"media/images/popup/popup_tutorial1.png",x:90,y:10, name:"tutorial"});
				tutorialBG.Container.addChild(tutorial);
				objpopupTitle1.TextField.setStrokeText(Dictionary.translate("popupTitle6"));
				objpopupTitle1.TextField.setFillText(Dictionary.translate("popupTitle6"));
				objpopupTitle2.TextField.setStrokeText(Dictionary.translate("popupTitle6"));
				objtextTime1.TextField.setFillText(Dictionary.translate("lvlSpecs5"));
				objtextTime2.TextField.setStrokeText(Dictionary.translate("lvlSpecs5"));
				objtextTime3.TextField.setFillText(Dictionary.translate("lvlSpecs6"));
				objtextTime4.TextField.setStrokeText(Dictionary.translate("lvlSpecs6"));
				gameplay.fillHighScore(6);
				break;
			}

			popupScreen.x=0;
			popupOpen=true;
		}

		gameplay.fillHighScore = function(levelNum){
			var levelScore = LocalStorage.get("level"+(levelNum-1)+"score");
			levelScore = levelScore ? levelScore : "0" ;
			objtextTime5.TextField.setFillText(levelScore);
			objtextTime6.TextField.setStrokeText(levelScore);
		};

		gameplay.nextlvl = function(){
			soundManager.stop(ig.game.currentSong);
			
			if(popupOpen && ig.game.levelToLoad != 5){
				soundManager.stop(ig.game.currentSong);
				window.playSongPls = true;
				ig.game.currentSong = "gameplayBGM";		
				if(!ig.ua.mobile){
					ig.game.playSong();
				}
				console.log(ig.game.levelToLoad);
				ig.game.levelToLoad++;
				ig.game.loadLevel( LevelEmptylevel );
				ig.Menus.loadMenu("gameplay");
				ig.game.loadScene(SceneGameplay);
				return;
			}

			if(ig.game.levelToLoad == 5){
				ig.game.loadLevel( LevelEmptylevel );
				ig.Menus.loadMenu("endGame");
				ig.game.loadScene(null);
			}
			else{
				gameplay.objOverlay();
			}
		};

		gameplay.onload = function(){
			console.log("Loaded gameplay screen!");
			EventManager.unbind("pause", gameplay.pause);
			EventManager.unbind("resume", gameplay.resume);
			EventManager.unbind("htp", gameplay.htp);
			EventManager.unbind("mute", gameplay.mute);
			EventManager.unbind("unmute", gameplay.unmute);
			EventManager.unbind("restart", gameplay.restart);
			EventManager.unbind("quit", gameplay.quit);
			EventManager.unbind("yes", gameplay.yes);
			EventManager.unbind("no", gameplay.no);
			EventManager.unbind("retry", gameplay.retry);
			EventManager.unbind("next", gameplay.nextlvl);
			EventManager.unbind("lvlSelect", gameplay.lvlSelect);

			EventManager.bind("pause", gameplay.pause);
			EventManager.bind("resume", gameplay.resume);
			EventManager.bind("htp", gameplay.htp);
			EventManager.bind("mute", gameplay.mute);
			EventManager.bind("unmute", gameplay.unmute);
			EventManager.bind("restart", gameplay.restart);
			EventManager.bind("quit", gameplay.quit);
			EventManager.bind("yes", gameplay.yes);
			EventManager.bind("no", gameplay.no);
			EventManager.bind("retry", gameplay.retry);
			EventManager.bind("next", gameplay.nextlvl);
			EventManager.bind("lvlSelect", gameplay.lvlSelect);			
			
			gameplay.resize();
		};

		gameplay.lvlSelect = function(){
			soundManager.stop("Win");
			soundManager.stop("Fail");

			soundManager.stop(ig.game.currentSong);
			window.playSongPls = true;
			ig.game.currentSong = "MenuBGM";		
			if(!ig.ua.mobile){
				ig.game.playSong();
			}
			ig.game.loadLevel( LevelEmptylevel );
			ig.game.loadScene(null);
			ig.Menus.loadMenu("lvlSelect");
		};

		gameplay.pause = function(){
			if(pauseScreenOpen || yesnoScreenOpen || winFailScreenOpen)
				return;

			//pauseScreen.x = 0;
			pauseScreen.alpha = 1;
			pauseScreenOpen = true;
			if(ig.ua.mobile){
				ig.music.volume = 0.25;
			}else{
				soundManager.setVolume(ig.game.currentSong,25);
			}
		};
		
		gameplay.gameRunning = function(){
			if (pauseScreenOpen) return false;
			if (winFailScreenOpen) return false;
			if (yesnoScreenOpen) return false;
			return true;
		};

		gameplay.onunload = function(){
			console.log("Unloaded gameplay screen!");
			EventManager.unbind("pause", gameplay.pause);
			EventManager.unbind("resume", gameplay.resume);
			EventManager.unbind("htp", gameplay.htp);
			EventManager.unbind("mute", gameplay.mute);
			EventManager.unbind("unmute", gameplay.unmute);
			EventManager.unbind("restart", gameplay.restart);
			EventManager.unbind("quit", gameplay.quit);
			EventManager.unbind("yes", gameplay.yes);
			EventManager.unbind("no", gameplay.no);
			EventManager.unbind("retry", gameplay.retry);
			EventManager.unbind("next", gameplay.nextlvl);
			EventManager.unbind("lvlSelect", gameplay.lvlSelect);
		};

		gameplay.binds = {
			"pause":"pause",
			"resume":"resume",
			"htp":"htp",
			"mute":"mute",
			"unmute":"unmute",
			"restart":"restart",
			"quit":"quit",
			"yes":"yes",
			"no":"no",
			"retry":"retry",
			"next":"next",
			"lvlSelect":"lvlSelect"
		};
		
		return gameplay;
	};
});