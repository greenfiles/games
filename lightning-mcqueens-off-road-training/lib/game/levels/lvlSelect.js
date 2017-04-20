ig.module(
	'game.levels.lvlSelect'
)
.requires(
	'impact.screen'
)
.defines(function(){
	
	//insert screen manager logic over this
	ig.Menus.screens.lvlSelect = function(){
		var testScreen = new Screen("lvlSelect", ig.Menus);


		var popupScreen = new DisplayObject({data:"media/images/popup/popup_BG.png",name:"popupScreen"});
		popupScreen.addExtention(Extention.Container);
		
		var tutorial = null;
		var tutorialBG =null;

		/* NEW METHOD IN CASE WE WANT TO SCALE TEXT. WE WOULD REQUIRE FREDS UPDATES THOUGH
		var buffer = Buffer("GO");
		if(buffer == null){
				buffer = Buffer.create("GO");
		}
		var 
		ctx = buffer.getContext('2d');

		var grd = ctx.createLinearGradient(0, 0, 0, 90 );
     	grd.addColorStop(0, '#f3ede4');
     	grd.addColorStop(0.49, '#f3ede4');
      	grd.addColorStop(0.5, '#bbab8b');
      	grd.addColorStop(1, '#f3ede4');
		ctx.textAlign="left";
		ctx.font="55px Roboto";
		ctx.textBaseline="top";
		ctx.strokeStyle="#ffffff";
		ctx.lineWidth = 12;
		ctx.shadowColor = "#ccc9bf";
		ctx.shadowOffsetY = 3;
		ctx.shadowOffsetX = 3;
		ctx.strokeText("GO",0,0);
		ctx.textAlign="left";
		ctx.font="55px Roboto";
		ctx.textBaseline="top";
		ctx.strokeStyle="#e72100";
		ctx.lineWidth = 10;
		ctx.fillStyle=grd;
		ctx.shadowColor = "";
		ctx.shadowOffsetY = 0;
		ctx.shadowOffsetX = 0;
		ctx.strokeText("GO",0,0);
		ctx.fillText("GO",0,0);

		var btnGo = new DisplayObject({x:980,y:518, width:60, height:55, name:"forward"});
		btnGo.addExtention(Extention.Canvas);
		btnGo.Canvas.context("GO");
		btnGo.scaleY = 2;
		popupScreen.Container.addChild(btnGo); END OF COMMENT*/ 

		var btnGo = new DisplayObject({x:980,y:518, width:100,height:100, name:"forward"});
		btnGo.addExtention(Extention.Container);
		popupScreen.Container.addChild(btnGo);
		var btnGo1 = new DisplayObject();
			btnGo1.addExtention(Extention.TextField);
		var btnGo2 = new DisplayObject();
			btnGo2.addExtention(Extention.TextField);

		if(navigator.userAgent.search("Firefox") == -1){

			var grd = ig.system.context.createLinearGradient(0, 525, 0, 580 );
		     	grd.addColorStop(0, '#f3ede4');
		     	grd.addColorStop(0.49, '#f3ede4');
		      	grd.addColorStop(0.5, '#bbab8b');
		      	grd.addColorStop(1, '#f3ede4');
			btnGo2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
			btnGo2.TextField.shadowOffsetY = 3;
	    }else{
			var grd = "#f3ede4";
		}

			btnGo1.TextField.textAlign="left";
			btnGo1.TextField.font="50px Roboto";
			btnGo1.TextField.textBaseline="top";
			btnGo1.TextField.strokeStyle="#e72100";
			btnGo1.TextField.lineWidth = 10;
			btnGo1.TextField.fillStyle=grd;
		
			btnGo2.TextField.textAlign="left";
			btnGo2.TextField.font="50px Roboto";
			btnGo2.TextField.textBaseline="top";
			btnGo2.TextField.strokeStyle="#ffffff";
			btnGo2.TextField.lineWidth = 12;
			
			btnGo1.TextField.setStrokeText(Dictionary.translate("go"));
			btnGo1.TextField.setFillText(Dictionary.translate("go"));
			btnGo2.TextField.setStrokeText(Dictionary.translate("go"));
			btnGo.Container.addChild(btnGo2);
			btnGo.Container.addChild(btnGo1);

		popupScreen.x = 2000;
		var popupOpen = false;

		
		var popupTitle = new DisplayObject({x:568,y:80});
		popupTitle.addExtention(Extention.Container);
		popupScreen.Container.addChild(popupTitle);
		var popupTitle1 = new DisplayObject();
		popupTitle1.addExtention(Extention.TextField);
		var grd = ig.system.context.createLinearGradient(0, 85, 0,155 );
     	grd.addColorStop(0, '#fd5606');
      	grd.addColorStop(1, '#bd1e00');
			popupTitle1.TextField.textAlign="center";
			popupTitle1.TextField.font="40px Roboto";
			popupTitle1.TextField.textBaseline="top";
			popupTitle1.TextField.strokeStyle="#fdf4e0";
			popupTitle1.TextField.lineWidth = 4;
			popupTitle1.TextField.fillStyle=grd;
		var popupTitle2 = new DisplayObject();
			popupTitle2.addExtention(Extention.TextField);
			popupTitle2.TextField.textAlign="center";
			popupTitle2.TextField.font="40px Roboto";
			popupTitle2.TextField.textBaseline="top";
			popupTitle2.TextField.strokeStyle="#e0d9ca";
			popupTitle2.TextField.lineWidth = 6;
			popupTitle2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
			popupTitle2.TextField.shadowOffsetY = 4;

		
		var popupObj = new DisplayObject({x:480,y:155});
		popupObj.addExtention(Extention.Container);
		popupScreen.Container.addChild(popupObj);
		var popupObj1 = new DisplayObject();
		popupObj1.addExtention(Extention.TextField);
		popupObj1.TextField.textAlign="left";
		popupObj1.TextField.font="25px Roboto";
		popupObj1.TextField.fillStyle="#36a9ff";
		popupObj1.TextField.textBaseline="top";
		var popupObj2 = new DisplayObject();
		popupObj2.addExtention(Extention.TextField);
		popupObj2.TextField.textAlign="left";
		popupObj2.TextField.lineWidth = 5;
		popupObj2.TextField.font="25px Roboto";
		popupObj2.TextField.strokeStyle="white";
		popupObj2.TextField.textBaseline="top";
		popupObj2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
		popupObj2.TextField.shadowOffsetY = 4;
		popupObj1.TextField.setFillText(Dictionary.translate("objective"));
		popupObj2.TextField.setStrokeText(Dictionary.translate("objective"));


		var popupHigh = new DisplayObject({x:550,y:500});
		popupHigh.addExtention(Extention.Container);
		popupScreen.Container.addChild(popupHigh);
		var popupHigh1 = new DisplayObject();
		popupHigh1.addExtention(Extention.TextField);
		popupHigh1.TextField.textAlign="left";
		popupHigh1.TextField.font="25px Roboto";
		popupHigh1.TextField.textBaseline="top";
		popupHigh1.TextField.fillStyle="#36a9ff";
		var popupHigh2 = new DisplayObject();
		popupHigh2.addExtention(Extention.TextField);
		popupHigh2.TextField.textAlign="left";
		popupHigh2.TextField.lineWidth = 5;
		popupHigh2.TextField.font="25px Roboto";
		popupHigh2.TextField.textBaseline="top";
		popupHigh2.TextField.strokeStyle="white";
		popupHigh2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
		popupHigh2.TextField.shadowOffsetY = 4;
		popupHigh1.TextField.setFillText(Dictionary.translate("highscore"));
		popupHigh2.TextField.setStrokeText(Dictionary.translate("highscore"));

		tutorialBG = new DisplayObject({data:"media/images/popup/popup_paleTextBG.png",x:400,y:270});
		tutorialBG.addExtention(Extention.Container);
		popupScreen.Container.addChild(tutorialBG);

		textBG1 = new DisplayObject({/*data:"media/images/popup/popup_darkTextBG.png",*/x:460,y:200});
		textBG1.addExtention(Extention.Container);
		popupScreen.Container.addChild(textBG1);
		textBG2 = new DisplayObject({/*data:"media/images/popup/popup_darkTextBG.png",*/x:460,y:235});
		textBG2.addExtention(Extention.Container);
		popupScreen.Container.addChild(textBG2);
		textBG3 = new DisplayObject({/*data:"media/images/popup/popup_darkTextBG.png",*/x:495,y:550});
		textBG3.addExtention(Extention.Container);
		popupScreen.Container.addChild(textBG3);


		var textTimeCont1 = new DisplayObject({x:30,y:0});
		textTimeCont1.addExtention(Extention.Container);
		textBG1.Container.addChild(textTimeCont1);
		var textTime1 = new DisplayObject();
		textTime1.addExtention(Extention.TextField);
		textTime1.TextField.textAlign="left";
		textTime1.TextField.font="22px RobotoRegular";
		textTime1.TextField.fillStyle="black";
		textTime1.TextField.textBaseline="top";
		var textTime2 = new DisplayObject();
		textTime2.addExtention(Extention.TextField);
		textTime2.TextField.textAlign="left";
		textTime2.TextField.font="22px RobotoRegular";
		textTime2.TextField.strokeStyle="white";
		textTime2.TextField.lineWidth = 4;
		textTime2.TextField.textBaseline="top";


		var textTimeCont2 = new DisplayObject({x:40,y:0});
		textTimeCont2.addExtention(Extention.Container);
		textBG2.Container.addChild(textTimeCont2);
		var textTime3 = new DisplayObject();
		textTime3.addExtention(Extention.TextField);
		textTime3.TextField.textAlign="left";
		textTime3.TextField.font="22px RobotoRegular";
		textTime3.TextField.fillStyle="black";
		textTime3.TextField.textBaseline="top";
		var textTime4 = new DisplayObject();
		textTime4.addExtention(Extention.TextField);
		textTime4.TextField.textAlign="left";
		textTime4.TextField.font="22px RobotoRegular";
		textTime4.TextField.strokeStyle="white";
		textTime4.TextField.lineWidth = 4;
		textTime4.TextField.textBaseline="top";


		var textTimeCont3 = new DisplayObject({x:65,y:0});
		textTimeCont3.addExtention(Extention.Container);
		textBG3.Container.addChild(textTimeCont3);
		var textTime5 = new DisplayObject();
		textTime5.addExtention(Extention.TextField);
		textTime5.TextField.textAlign="left";
		textTime5.TextField.font="22px RobotoRegular";
		textTime5.TextField.fillStyle="black";
		textTime5.TextField.textBaseline="top";
		var textTime6 = new DisplayObject();
		textTime6.addExtention(Extention.TextField);
		textTime6.TextField.textAlign="left";
		textTime6.TextField.font="22px RobotoRegular";
		textTime6.TextField.strokeStyle="white";
		textTime6.TextField.lineWidth = 4;
		textTime6.TextField.fillStyle="black";
		textTime6.TextField.textBaseline="top";

		var textTimeCont4 = new DisplayObject({x:530,y:415});
		textTimeCont4.addExtention(Extention.Container);
		popupScreen.Container.addChild(textTimeCont4);
		var textTime7 = new DisplayObject({width:320});
		textTime7.addExtention(Extention.TextField);
		textTime7.TextField.textAlign="left";
		textTime7.TextField.font="22px RobotoRegular";
		textTime7.TextField.fillStyle="black";
		textTime7.TextField.textBaseline="top";
		textTime7.TextField.textWrap = true;
		var textTime8 = new DisplayObject({width:320});
		textTime8.addExtention(Extention.TextField);
		textTime8.TextField.textAlign="left";
		textTime8.TextField.font="22px RobotoRegular";
		textTime8.TextField.strokeStyle="white";
		textTime8.TextField.lineWidth = 4;
		textTime8.TextField.fillStyle="black";
		textTime8.TextField.textBaseline="top";
		textTime8.TextField.textWrap = true;
		textTime7.TextField.setFillText(Dictionary.translate("lvlSpecs7"));
		textTime8.TextField.setStrokeText(Dictionary.translate("lvlSpecs7"));


		popupTitle.Container.addChild(popupTitle2);
		popupTitle.Container.addChild(popupTitle1);
		popupObj.Container.addChild(popupObj2);
		popupObj.Container.addChild(popupObj1);
		popupHigh.Container.addChild(popupHigh2);
		popupHigh.Container.addChild(popupHigh1);
		textTimeCont1.Container.addChild(textTime2);
		textTimeCont1.Container.addChild(textTime1);
		textTimeCont2.Container.addChild(textTime4);
		textTimeCont2.Container.addChild(textTime3);
		textTimeCont3.Container.addChild(textTime6);
		textTimeCont3.Container.addChild(textTime5);
		textTimeCont4.Container.addChild(textTime8);
		textTimeCont4.Container.addChild(textTime7);
		
		
		//put the background image here... do it!
		var background = new DisplayObject({data:"media/images/lvlSelect/lvlSelect_bg.jpg"});
		testScreen.Container.addChild(background);

		var screenTitle = new DisplayObject({x:568,y:80, width:100,height:50});
		screenTitle.addExtention(Extention.Container);
		testScreen.Container.addChild(screenTitle);
		var screenTitle1 = new DisplayObject();
		screenTitle1.addExtention(Extention.TextField);
		var grd = ig.system.context.createLinearGradient(0, 80, 0, 160);
     	grd.addColorStop(0, '#fd5606');
      	grd.addColorStop(1, '#bd1e00');
		screenTitle1.TextField.textAlign="center";
		screenTitle1.TextField.font="40px Roboto";
		screenTitle1.TextField.textBaseline="top";
		screenTitle1.TextField.fillStyle=grd;
		var screenTitle2 = new DisplayObject();
		screenTitle2.addExtention(Extention.TextField);
		screenTitle2.TextField.textAlign="center";
		screenTitle2.TextField.font="40px Roboto";
		screenTitle2.TextField.textBaseline="top";
		screenTitle2.TextField.strokeStyle="#e0d9ca";
		screenTitle2.TextField.lineWidth = 6;
		screenTitle2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
		screenTitle2.TextField.shadowOffsetY = 3;
		screenTitle.Container.addChild(screenTitle2);
		screenTitle.Container.addChild(screenTitle1);
		screenTitle1.TextField.setStrokeText(Dictionary.translate("selectTitle"));
		screenTitle1.TextField.setFillText(Dictionary.translate("selectTitle"));
		screenTitle2.TextField.setStrokeText(Dictionary.translate("selectTitle"));


		var enduText = new DisplayObject({x:335,y:180});
		enduText.addExtention(Extention.Container);
		testScreen.Container.addChild(enduText);
		var enduText1 = new DisplayObject();
		enduText1.addExtention(Extention.TextField);
		enduText1.TextField.textAlign="center";
		enduText1.TextField.font="22px Roboto";
		enduText1.TextField.fillStyle="#36a9ff";
		var enduText2 = new DisplayObject();
		enduText2.addExtention(Extention.TextField);
		enduText2.TextField.textAlign="center";
		enduText2.TextField.lineWidth = 3;
		enduText2.TextField.font="22px Roboto";
		enduText2.TextField.strokeStyle="white";
		enduText2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
		enduText2.TextField.shadowOffsetY = 4;
		enduText1.TextField.setFillText(Dictionary.translate("endurance"));
		enduText2.TextField.setStrokeText(Dictionary.translate("endurance"));
		enduText.Container.addChild(enduText2);
		enduText.Container.addChild(enduText1);

		var exploText = new DisplayObject({x:568,y:180});
		exploText.addExtention(Extention.Container);
		testScreen.Container.addChild(exploText);
		var exploText1 = new DisplayObject();
		exploText1.addExtention(Extention.TextField);
		exploText1.TextField.textAlign="center";
		exploText1.TextField.font="22px Roboto";
		exploText1.TextField.fillStyle="#36a9ff";
		var exploText2 = new DisplayObject();
		exploText2.addExtention(Extention.TextField);
		exploText2.TextField.textAlign="center";
		exploText2.TextField.lineWidth = 3;
		exploText2.TextField.font="22px Roboto";
		exploText2.TextField.strokeStyle="white";
		exploText2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
		exploText2.TextField.shadowOffsetY = 4;
		exploText1.TextField.setFillText(Dictionary.translate("exploration"));
		exploText2.TextField.setStrokeText(Dictionary.translate("exploration"));
		exploText.Container.addChild(exploText2);
		exploText.Container.addChild(exploText1);


		var precText = new DisplayObject({x:800,y:180});
		precText.addExtention(Extention.Container);
		testScreen.Container.addChild(precText);
		var precText1 = new DisplayObject();
		precText1.addExtention(Extention.TextField);
		precText1.TextField.textAlign="center";
		precText1.TextField.font="22px Roboto";
		precText1.TextField.fillStyle="#36a9ff";
		var precText2 = new DisplayObject();
		precText2.addExtention(Extention.TextField);
		precText2.TextField.textAlign="center";
		precText2.TextField.lineWidth = 3;
		precText2.TextField.font="22px Roboto";
		precText2.TextField.strokeStyle="white";
		precText2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
		precText2.TextField.shadowOffsetY = 4;
		precText1.TextField.setFillText(Dictionary.translate("precision"));
		precText2.TextField.setStrokeText(Dictionary.translate("precision"));
		precText.Container.addChild(precText2);
		precText.Container.addChild(precText1);

		var posX = [477,708,245,477,708];
		var posY = [215,215,358,358,358];

		var locksToPlace = (LocalStorage.get("levelBeat")== null)?0:LocalStorage.get("levelBeat");
		
			for( var locked = 5 ; locked > locksToPlace; locked--){
				var lockedRect = new DisplayObject({data:"media/images/lvlSelect/lvlSelect_lockedRect.png",x:posX[locked-1],y:posY[locked-1]});
				lockedRect.scaleX = 0.9;
				lockedRect.scaleY = 0.9;
				testScreen.Container.addChild(lockedRect);
			}
		
		
		var minimap1 = new DisplayObject({data:"media/leveltiles/levelBG1_minimap.png",x:248,y:212});
		testScreen.Container.addChild(minimap1);
		var minimap2 = new DisplayObject({data:"media/leveltiles/levelBG2_minimap.png",x:495,y:212});
		testScreen.Container.addChild(minimap2);
		var minimap3 = new DisplayObject({data:"media/leveltiles/levelBG3_minimap_lvl.png",x:735,y:212});
		testScreen.Container.addChild(minimap3);
		var minimap4 = new DisplayObject({data:"media/leveltiles/levelBG4_minimap.png",x:288,y:362});
		testScreen.Container.addChild(minimap4);
		var minimap5 = new DisplayObject({data:"media/leveltiles/levelBG5_minimap.png",x:500,y:360});
		testScreen.Container.addChild(minimap5);
		var minimap6 = new DisplayObject({data:"media/leveltiles/levelBG6_minimap_lvl.png",x:725,y:355});
		testScreen.Container.addChild(minimap6);

		//for the placeholders, we'll probably export fitting assets when the real minimaps are made
		minimap1.scaleX = 0.72;
		minimap1.scaleY = 0.72;
		minimap2.scaleX = 0.72;
		minimap2.scaleY = 0.72;
		minimap3.scaleX = 0.72;
		minimap3.scaleY = 0.72;
		minimap4.scaleX = 0.72;
		minimap4.scaleY = 0.72;
		minimap5.scaleX = 0.72;
		minimap5.scaleY = 0.72;
		minimap6.scaleX = 0.72;
		minimap6.scaleY = 0.72;

		posX = [553,785,315,553,785];
		posY = [238,238,387,387,387];
		
			for(var locked = 5; locked > locksToPlace; locked--){
				var padlock = new DisplayObject({data:"media/images/lvlSelect/lvlSelect_padlock.png",x:posX[locked-1],y:posY[locked-1]});
				padlock.scaleX = 0.9;
				padlock.scaleY = 0.9;
				testScreen.Container.addChild(padlock);
			}
			

		var starShadows = [];
		var starEmpty = [];

		for (var i = 1; i <= 6; i++) {
			 starShadows[i] = new DisplayObject();

			(i>3) ? starShadows[i].y = 460 : starShadows[i].y = 315;

			if(i%3==1){
				starShadows[i].x = 320;
			}else if(i%3==2){
				starShadows[i].x = 553;
			}else if(i%3==0){
				starShadows[i].x = 785;
			}
			starShadows[i].addExtention(Extention.Container);
			
			var numStars = LocalStorage.get("level"+(i-1)+"stars");
			//console.log("level "+i+": "+numStars);
			for (var starNum=0; starNum<3; starNum++) {
				var starImg = ( (starNum+1) <= numStars) ? "lvlSelect_starFull.png" : "lvlSelect_starEmpty.png" ;
				starEmpty[(starNum+1)*i] = new DisplayObject({data:"media/images/lvlSelect/"+starImg,x:starNum*35});
				starEmpty[(starNum+1)*i].scaleY = 0.9;
				starEmpty[(starNum+1)*i].scaleX = 0.9;
			}

			starShadows[i].Container.addChild(starEmpty[1*i]);
			starShadows[i].Container.addChild(starEmpty[2*i]);
			starShadows[i].Container.addChild(starEmpty[3*i]);

			testScreen.Container.addChild(starShadows[i]);
		};

		grd = ig.system.context.createLinearGradient(0, 300, 0, 340);
     	grd.addColorStop(0, '#fd5606');
      	grd.addColorStop(1, '#bd1e00');

		var but1 = new DisplayObject({x:260,y:210,width:180,height:85,name:'level1'});
		but1.addExtention(Extention.Container);
		testScreen.Container.addChild(but1);
		var but1Text = new DisplayObject({x:0,y:80});
		but1Text.addExtention(Extention.TextField);
		but1Text.TextField.textAlign = 'left';
		but1Text.TextField.font = '25px Roboto';
		but1Text.TextField.fillStyle = grd;
		but1Text.TextField.setFillText(Dictionary.translate("1"));
		but1.Container.addChild(but1Text);


		var but2 = new DisplayObject({x:493,y:210,width:180,height:85,name:'level2'});
		but2.addExtention(Extention.Container);
		testScreen.Container.addChild(but2);
		var but2Text = new DisplayObject({x:0,y:80});
		but2Text.addExtention(Extention.TextField);
		but2Text.TextField.textAlign = 'left';
		but2Text.TextField.font = '25px Roboto';
		but2Text.TextField.fillStyle = grd;
		but2Text.TextField.setFillText(Dictionary.translate("2"));
		but2.Container.addChild(but2Text);


		var but3 = new DisplayObject({x:724,y:210,width:180,height:85,name:'level3'});
		but3.addExtention(Extention.Container);
		testScreen.Container.addChild(but3);
		var but3Text = new DisplayObject({x:0,y:80});
		but3Text.addExtention(Extention.TextField);
		but3Text.TextField.textAlign = 'left';
		but3Text.TextField.font = '25px Roboto';
		but3Text.TextField.fillStyle = grd;
		but3Text.TextField.setFillText(Dictionary.translate("3"));
		but3.Container.addChild(but3Text);

		grd = ig.system.context.createLinearGradient(0, 460, 0, 500);
		grd.addColorStop(0, '#fd5606');
      	grd.addColorStop(1, '#bd1e00');

		var but4 = new DisplayObject({x:260,y:360,width:180,height:85, name:"level4"});
		but4.addExtention(Extention.Container);
		testScreen.Container.addChild(but4);
		var but4Text = new DisplayObject({x:0,y:80});
		but4Text.addExtention(Extention.TextField);
		but4Text.TextField.textAlign = 'left';
		but4Text.TextField.font = '25px Roboto';
		but4Text.TextField.fillStyle = grd;
		but4Text.TextField.setFillText(Dictionary.translate("4"));
		but4.Container.addChild(but4Text);


		var but5 = new DisplayObject({x:493,y:360,width:180,height:85, name:"level5"});
		but5.addExtention(Extention.Container);
		testScreen.Container.addChild(but5);
		var but5Text = new DisplayObject({x:0,y:80});
		but5Text.addExtention(Extention.TextField);
		but5Text.TextField.textAlign = 'left';
		but5Text.TextField.font = '25px Roboto';
		but5Text.TextField.fillStyle = grd;
		but5Text.TextField.setFillText(Dictionary.translate("5"));
		but5.Container.addChild(but5Text);


		var but6 = new DisplayObject({x:724,y:360,width:180,height:85, name:"level6"});
		but6.addExtention(Extention.Container);
		testScreen.Container.addChild(but6);
		var but6Text = new DisplayObject({x:0,y:80});
		but6Text.addExtention(Extention.TextField);
		but6Text.TextField.textAlign = 'left';
		but6Text.TextField.font = '25px Roboto';
		but6Text.TextField.fillStyle = grd;
		but6Text.TextField.setFillText(Dictionary.translate("6"));
		but6.Container.addChild(but6Text);
		
		tutorial = new DisplayObject({data:"media/images/popup/map-endurance.png"});
		tutorial = new DisplayObject({data:"media/images/popup/map-exploration.png"});
		tutorial = new DisplayObject({data:"media/images/popup/popup_tutorial1.png"});
		
		// temp car switch
		var carChoicePossible = (locksToPlace >= 3);
		var carChoiceButtons = [];

		var chooseText = new DisplayObject({x:680,y:545});
		chooseText.addExtention(Extention.Container);
		testScreen.Container.addChild(chooseText);
		var chooseText1 = new DisplayObject();
		chooseText1.addExtention(Extention.TextField);
		chooseText1.TextField.textAlign="right";
		chooseText1.TextField.font="22px Roboto";
		chooseText1.TextField.fillStyle="#36a9ff";
		chooseText1.TextField.textBaseline="top";
		var chooseText2 = new DisplayObject();
		chooseText2.addExtention(Extention.TextField);
		chooseText2.TextField.textAlign="right";
		chooseText2.TextField.lineWidth = 3;
		chooseText2.TextField.font="22px Roboto";
		chooseText2.TextField.strokeStyle="white";
		chooseText2.TextField.textBaseline="top";
		chooseText2.TextField.shadowColor = 'rgba(0, 0, 0, 0.15)';
		chooseText2.TextField.shadowOffsetY = 4;
		chooseText1.TextField.setFillText(Dictionary.translate("chooseCar"));
		chooseText2.TextField.setStrokeText(Dictionary.translate("chooseCar"));
		chooseText.Container.addChild(chooseText2);
		chooseText.Container.addChild(chooseText1);

		var butCarAlternate = new DisplayObject({data:"media/images/lvlSelect/lvlSelect_notSelectedCar.png",x:805,y:517});
		var butCarNormal = new DisplayObject({data:"media/images/lvlSelect/lvlSelect_selectedCar.png",x:715,y:517});	
		var lightning1 = new DisplayObject({data:"media/images/lvlSelect/lvlSelect_lightning1.png",x:715,y:523});
		var lightning2 = null;
		
		if (carChoicePossible) {
			var butBoxCarAlternate = new DisplayObject({x:805,y:517, width:75, height:75, name:"alternateCarButton"});
			var butBoxCarNormal = new DisplayObject({x:715,y:517, width:75, height:75, name:"normalCarButton"});	
			testScreen.Container.addChild(butBoxCarNormal);
			testScreen.Container.addChild(butBoxCarAlternate);
			lightning2 = new DisplayObject({data:"media/images/lvlSelect/lvlSelect_lightning2.png",x:805,y:523})
		}else{
			lightning2 = new DisplayObject({data:"media/images/lvlSelect/lvlSelect_altLocked.png",x:805,y:523})
		}

		carChoiceButtons.push(butCarNormal);
		carChoiceButtons.push(butCarAlternate);
		testScreen.Container.addChild(butCarNormal);		
		testScreen.Container.addChild(butCarAlternate);
		testScreen.Container.addChild(lightning1);		
		testScreen.Container.addChild(lightning2);

		var savedCarChoice = (LocalStorage.get("carChoice")==null)? 0 :LocalStorage.get("carChoice");

		butCarAlternate.x = (savedCarChoice=="1") ? 805 : 715 ;
		butCarNormal.x = (savedCarChoice=="1") ? 715 : 805 ;


		testScreen.chooseCar = function(carChoiceNum){
			for (var i=0; i<carChoiceButtons.length; i++) {
				var curButton = carChoiceButtons[i];
				curButton.x = (i==carChoiceNum) ? 715 : 805 ;
			}
			LocalStorage.set("carChoice",carChoiceNum);
			ig.game.carChoice = carChoiceNum;
		};
		
		
		console.log("SAVED CAR CHOICE: ");
		console.log(savedCarChoice);
		console.log(typeof savedCarChoice)
		var defaultCarChoice = (savedCarChoice=="1") ? 1 : 0 ;
		testScreen.chooseCar(defaultCarChoice);
		
		testScreen.normalCarClick = function(){
			console.log("NORMAL CLICKED");
			testScreen.chooseCar(0);
		}
		testScreen.alternateCarClick = function(){
			console.log("ALTERNATE CLICKED");
			testScreen.chooseCar(1);
		}

		var butBackRect = new DisplayObject({data:"media/images/buttons/Btn_back.png",x:95, y:514, name:"back"});
		
		var sargeMic = new DisplayObject({data:"media/images/popup/popup_SargeMic.png",x:60,y:250});
		popupScreen.Container.addChild(sargeMic);

		testScreen.Container.addChild(popupScreen);
		
		testScreen.Container.addChild(butBackRect);
		
		testScreen.onload = function(){
			console.log("Loaded lvl screen!");

			testScreen.unbind();

			testScreen.bind();
			
		};
		
		testScreen.back = function(){
			
			if(!popupOpen){
				ig.Menus.loadMenu("title");
			}else{
				popupScreen.x = 2000;
				tutorialBG.Container.removeChildByName("tutorial");
				popupOpen = false;
				
				if(ig.ua.mobile){
					ig.music.stop();
				}
				else{
					soundManager.stopAll();
				}
				window.playSongPls = true;
				ig.game.currentSong = "MenuBGM";	
				ig.game.playSong();
			}
		};

		testScreen.level1 = function(){
			if(!popupOpen){
				ig.game.levelToLoad = 0;
				popupScreen.x = 0;
				tutorial = new DisplayObject({data:"media/images/popup/map-endurance.png",x:100,y:5, name:"tutorial"});
				tutorialBG.Container.addChild(tutorial);
				popupTitle1.TextField.setStrokeText(Dictionary.translate("popupTitle1"));
				popupTitle1.TextField.setFillText(Dictionary.translate("popupTitle1"));
				popupTitle2.TextField.setStrokeText(Dictionary.translate("popupTitle1"));
				textTime1.TextField.setFillText(Dictionary.translate("lvlSpecs1"));
				textTime2.TextField.setStrokeText(Dictionary.translate("lvlSpecs1"));
				textTime3.TextField.setFillText(Dictionary.translate("lvlSpecs2"));
				textTime4.TextField.setStrokeText(Dictionary.translate("lvlSpecs2"));
				testScreen.fillHighScore(1);

				popupOpen=true;

				if(!ig.ua.mobile){
					testScreen.playObjectiveSfx();
				}
				window.playSongPls = true;
				ig.game.currentSong = "gameplayBGM";
			}
		};

		testScreen.level2 = function(){
			console.log(LocalStorage.get("levelBeat"));
			if(!popupOpen&&LocalStorage.get("levelBeat")>=1){
				ig.game.levelToLoad = 1;
				popupScreen.x=0;
				tutorial = new DisplayObject({data:"media/images/popup/map-exploration.png",x:70,y:0, name:"tutorial"});
				tutorialBG.Container.addChild(tutorial);
				popupTitle1.TextField.setStrokeText(Dictionary.translate("popupTitle2"));
				popupTitle1.TextField.setFillText(Dictionary.translate("popupTitle2"));
				popupTitle2.TextField.setStrokeText(Dictionary.translate("popupTitle2"));
				textTime1.TextField.setFillText(Dictionary.translate("lvlSpecs3"));
				textTime2.TextField.setStrokeText(Dictionary.translate("lvlSpecs3"));
				textTime3.TextField.setFillText(Dictionary.translate("lvlSpecs4"));
				textTime4.TextField.setStrokeText(Dictionary.translate("lvlSpecs4"));
				testScreen.fillHighScore(2);

				popupOpen=true;

				if(!ig.ua.mobile){
					testScreen.playObjectiveSfx();
				}
				window.playSongPls = true;
				ig.game.currentSong = "gameplayBGM";

			}
		};

		testScreen.level3 = function(){
			if(!popupOpen&&LocalStorage.get("levelBeat")>=2){
				ig.game.levelToLoad = 2;
				popupScreen.x=0;
				tutorial = new DisplayObject({data:"media/images/popup/popup_tutorial1.png",x:90,y:10, name:"tutorial"});
				tutorialBG.Container.addChild(tutorial);
				popupTitle1.TextField.setStrokeText(Dictionary.translate("popupTitle3"));
				popupTitle1.TextField.setFillText(Dictionary.translate("popupTitle3"));
				popupTitle2.TextField.setStrokeText(Dictionary.translate("popupTitle3"));
				textTime1.TextField.setFillText(Dictionary.translate("lvlSpecs5"));
				textTime2.TextField.setStrokeText(Dictionary.translate("lvlSpecs5"));
				textTime3.TextField.setFillText(Dictionary.translate("lvlSpecs6"));
				textTime4.TextField.setStrokeText(Dictionary.translate("lvlSpecs6"));
				testScreen.fillHighScore(3);

				popupOpen=true;

				if(!ig.ua.mobile){
					testScreen.playObjectiveSfx();
				}
				window.playSongPls = true;
				ig.game.currentSong = "gameplayBGM";

			}
		};
		// uncomment whenever the levels are integrated
		testScreen.level4 = function(){
			if(!popupOpen&&LocalStorage.get("levelBeat")>=3){
				ig.game.levelToLoad = 3;
				popupScreen.x=0;
				tutorial = new DisplayObject({data:"media/images/popup/map-endurance.png",x:80,y:-5, name:"tutorial"});
				tutorialBG.Container.addChild(tutorial);
				popupTitle1.TextField.setStrokeText(Dictionary.translate("popupTitle4"));
				popupTitle1.TextField.setFillText(Dictionary.translate("popupTitle4"));
				popupTitle2.TextField.setStrokeText(Dictionary.translate("popupTitle4"));
				textTime1.TextField.setFillText(Dictionary.translate("lvlSpecs1"));
				textTime2.TextField.setStrokeText(Dictionary.translate("lvlSpecs1"));
				textTime3.TextField.setFillText(Dictionary.translate("lvlSpecs2"));
				textTime4.TextField.setStrokeText(Dictionary.translate("lvlSpecs2"));
				testScreen.fillHighScore(4);

				popupOpen=true;

				if(!ig.ua.mobile){
					testScreen.playObjectiveSfx();
				}
				window.playSongPls = true;
				ig.game.currentSong = "gameplayBGM";

			}
		};

		testScreen.level5 = function(){
			if(!popupOpen&&LocalStorage.get("levelBeat")>=4){
				ig.game.levelToLoad = 4;
				popupScreen.x=0;
				tutorial = new DisplayObject({data:"media/images/popup/map-exploration.png",x:70,y:0, name:"tutorial"});
				tutorialBG.Container.addChild(tutorial);
				popupTitle1.TextField.setStrokeText(Dictionary.translate("popupTitle5"));
				popupTitle1.TextField.setFillText(Dictionary.translate("popupTitle5"));
				popupTitle2.TextField.setStrokeText(Dictionary.translate("popupTitle5"));
				textTime1.TextField.setFillText(Dictionary.translate("lvlSpecs3"));
				textTime2.TextField.setStrokeText(Dictionary.translate("lvlSpecs3"));
				textTime3.TextField.setFillText(Dictionary.translate("lvlSpecs4"));
				textTime4.TextField.setStrokeText(Dictionary.translate("lvlSpecs4"));
				testScreen.fillHighScore(5);

				popupOpen=true;

				if(!ig.ua.mobile){
					testScreen.playObjectiveSfx();
				}
				window.playSongPls = true;
				ig.game.currentSong = "gameplayBGM";

			}
		};

		testScreen.level6 = function(){
			if(!popupOpen&&LocalStorage.get("levelBeat")>=5){
				ig.game.levelToLoad = 5;
				popupScreen.x=0;
				tutorial = new DisplayObject({data:"media/images/popup/popup_tutorial1.png",x:90,y:10, name:"tutorial"});
				tutorialBG.Container.addChild(tutorial);
				popupTitle1.TextField.setStrokeText(Dictionary.translate("popupTitle6"));
				popupTitle1.TextField.setFillText(Dictionary.translate("popupTitle6"));
				popupTitle2.TextField.setStrokeText(Dictionary.translate("popupTitle6"));
				textTime1.TextField.setFillText(Dictionary.translate("lvlSpecs5"));
				textTime2.TextField.setStrokeText(Dictionary.translate("lvlSpecs5"));
				textTime3.TextField.setFillText(Dictionary.translate("lvlSpecs6"));
				textTime4.TextField.setStrokeText(Dictionary.translate("lvlSpecs6"));
				testScreen.fillHighScore(6);
	
				popupOpen=true;

				if(!ig.ua.mobile){
					testScreen.playObjectiveSfx();
				}
				window.playSongPls = true;
				ig.game.currentSong = "gameplayBGM";

			}
		};
		
		testScreen.playObjectiveSfx = function(){
					
			window.playSongPls = true;
			ig.game.currentSong = "Objective";

			if(ig.ua.mobile){
				ig.music.stop();
				ig.game.playSong();
			}else{
				soundManager.stopAll();
				soundManager.play(ig.game.currentSong);
			}
		};
		
		testScreen.fillHighScore = function(levelNum){
			var levelScore = LocalStorage.get("level"+(levelNum-1)+"score");
			levelScore = levelScore ? levelScore : "0" ;
			textTime5.TextField.setFillText(levelScore);
			textTime6.TextField.setStrokeText(levelScore);
		};

		testScreen.forward = function(){
			popupScreen.x = 2000;
			
			ig.global.menuSongStarted = false;
			
			ig.Menus.loadMenu("gameplay");
			ig.game.loadScene(SceneGameplay);
			
			if(ig.ua.mobile){
				ig.music.stop();
			}
			else{
				soundManager.stopAll();
			}
			ig.game.currentSong = "gameplayBGM";
			window.playSongPls = true;
			ig.game.playSong();

		};
		
		testScreen.onunload = function(){
			console.log("Unloaded lvl screen!");
			testScreen.unbind();
		};
		
		testScreen.unbind = function(){
			EventManager.unbind("level1", testScreen.level1);
			EventManager.unbind("level2", testScreen.level2);
			EventManager.unbind("level3", testScreen.level3);
			EventManager.unbind("level4", testScreen.level4);
			EventManager.unbind("level5", testScreen.level5);
			EventManager.unbind("level6", testScreen.level6);
			EventManager.unbind("back", testScreen.back);
			EventManager.unbind("forward", testScreen.forward);
			
			EventManager.unbind("normalCarButton", testScreen.normalCarClick);
			EventManager.unbind("alternateCarButton", testScreen.alternateCarClick);
		};
		testScreen.bind = function(){
			EventManager.unbind("forward", testScreen.forward);
			EventManager.unbind("back", testScreen.back);
			EventManager.bind("level1", testScreen.level1);
			EventManager.bind("level2", testScreen.level2);
			EventManager.bind("level3", testScreen.level3);
			EventManager.bind("level4", testScreen.level4);
			EventManager.bind("level5", testScreen.level5);
			EventManager.bind("level6", testScreen.level6);
			EventManager.bind("back", testScreen.back);
			EventManager.bind("forward", testScreen.forward);
			
			EventManager.bind("normalCarButton", testScreen.normalCarClick);
			EventManager.bind("alternateCarButton", testScreen.alternateCarClick);
		};
		
		testScreen.binds = {
			"level1":"level1",
			"level2":"level2",
			"level3":"level3",
			"level4":"level4",
			"level5":"level5",
			"level6":"level6",
			"back":"back",
			"forward":"forward",
			"normalCarButton":"normalCarButton",
			"alternateCarButton":"alternateCarButton",
		};
		
		return testScreen;
	};
});
	
	
	
