//if (!window.console) 
window.console = {};
window.console.log = function () { };
//if (!window.console.log) 

PIXI.JsonLoader.prototype.loadIe = function(){
	//this.ajaxRequest = new AjaxRequest();
	var scope = this;
	
	$.ajax({
       type: 'GET',
        url: this.url,
        async: true,
        crossDomain:true,
        dataType: "json",
        success:this.onJSONLoadedIE.bind(this),
        error: function(req, reqStatus, reqError)
	    {
	      console.log(req);
	      console.log(reqStatus);
	      console.log(reqError);
		  return;
	    }
   	});
   	/*
	this.ajaxRequest.onreadystatechange = function () {
		scope.onJSONLoaded();
	};

	this.ajaxRequest.open("GET", this.url, true);
	if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType("application/json");
	this.ajaxRequest.send(null);*/
}

PIXI.JsonLoader.prototype.onJSONLoadedIE = function (data) {
//	if (this.ajaxRequest.readyState == 4) {
	//	if (this.ajaxRequest.status == 200 || window.location.href.indexOf("http") == -1) {
			
			if(data instanceof String)data = JSON.parse(data);
			this.json = data;//JSON.parse(this.ajaxRequest.responseText);
			
			if(this.json.frames)
			{
				// sprite sheet
				var scope = this;
				var textureUrl = this.baseUrl + this.json.meta.image;
				var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
				var frameData = this.json.frames;
			
				this.texture = image.texture.baseTexture;
				image.addEventListener("loaded", function (event) {
					scope.onLoaded();
				});
			
				for (var i in frameData) {
					
					//console.log("Frame Added to Cache: " + i)
					var rect = frameData[i].frame;
					if (rect) {
						PIXI.TextureCache[i] = new PIXI.Texture(this.texture, {
							x: rect.x,
							y: rect.y,
							width: rect.w,
							height: rect.h
						});
						if (frameData[i].trimmed) {
							//var realSize = frameData[i].spriteSourceSize;
							PIXI.TextureCache[i].realSize = frameData[i].spriteSourceSize;
							PIXI.TextureCache[i].trim.x = 0; // (realSize.x / rect.w)
							// calculate the offset!
						}
					}
				}
			
				image.load();
				
			}
			else if(this.json.bones)
			{
				// spine animation
				var spineJsonParser = new spine.SkeletonJson();
				var skeletonData = spineJsonParser.readSkeletonData(this.json);
				PIXI.AnimCache[this.url] = skeletonData;
				this.onLoaded();
			}
			else
			{
				this.onLoaded();
			}
		//}
		//else
		//{
		//	this.onError();
		//}
	//}
};



var McBites = function()
{
	
	APP = this;
	
	this.isHigh = true;
		
	APP.tc = PROFILE.mobile ? "#" : "https://www.greenish.xyz/";

	this.profile = PROFILE;
	
	
	var props = getUrlVars();
	this.inAPP = props["inapp"] == "true";
	
	//alert(this.inAPP);
		
	this.startLevel = props["level"];

	if(!this.inAPP)
	{
		FB.init({appId:"#",
					status: false,
					cookie: true});
					
		//console.log("!!!")
		
		FacebookAPI.checkLoggedIn(function(data){
			
			if(FacebookAPI.loggedIn)
			{
				//console.log("done")
				SteveAPI.getUserScore(function(data){
					
					
					APP.userRank = data.rank;
					APP.userScore = data.score.score;
					APP.userName = data.score.username;
					
					console.log(APP.userName + " is ranked " + APP.userRank + " and the score is " + APP.userScore)
				});
			}
			else
			{
				console.log("NOT LOGGED IN")
			}
			
		});
		
	}
	else
	{
	//	alert("YOU ARE IN THE APP! AUTO LOAD!");
	//	window.open("mcd://webapp/promptFacebookToken");
		
		//this.inAPP
	}
	
	this.width = 800;
	this.height = 600;
	
	
	// loader screen
	// startup
	// title screen
	// game screen //
	this.renderer = new PIXI.CanvasRenderer(800, 600);
	document.body.appendChild(this.renderer.view);
	this.renderer.view.style["-webkit-transform"] = "translate3d(0,0,0)";
	this.renderer.context.imageSmoothingEnabled = false;
	this.renderer.context.webkitImageSmoothingEnabled = false;
	this.renderer.context.mozImageSmoothingEnabled = false;

	//this.renderer.view.style["-webkit-filter"] = "invert(1)";
	
	
	this.stage = new PIXI.Stage(0xFFFFFF);
	
	this.container = new PIXI.DisplayObjectContainer();
	this.stage.addChild(this.container);
	
	this.simpleApp = new SimpleApp(this.container);
	
	this.startup = new Startup();
	
	this.startup.run();
	
	requestAnimationFrame(this.update.bind(this));
	
		
	/*
	gui = new dat.GUI({
		//height : 5 * 32 - 1,
		width : 350
	})*/;
	
	//this.audio = new SoundButton();
	//this.stage.addChild(this.audio);

	
	// do a test! what controll mechanism?
	
	this.tiltAvailable = false;
	this.touchAvailable = false;
	this.keyAvailable = false;
	
	
	var newWidth = window.innerWidth  || document.documentElement.clientWidth;
	var newHeight = window.innerHeight  || document.documentElement.clientHeight;

	this.resize(newWidth, newHeight);
	
	
	stats = new Stats();
	//stats.setMode(1); // 0: fps, 1: ms
	
	// Align top-left
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = '3';
	
//	document.body.appendChild( stats.domElement );
	
	//this.
}


McBites.prototype.update = function()
{
	// stats.begin();
	stats.update();
	this.renderer.render(this.stage);
	requestAnimationFrame(this.update.bind(this));
	// stats.end();
}

McBites.prototype.highRez = function()
{
	if(this.isHigh)return;
	this.isHigh = true;
	this.resize(this.w, this.h);
}

McBites.prototype.lowRez = function()
{
	if(!this.isHigh)return;
	this.isHigh = false;
	this.resize(this.w, this.h);
}

McBites.prototype.resize = function(w, h)
{
	//w = 1024//
	//h = 690//
	
	this.w = w;
	this.h = h;
	
	this.renderer.view.style.width = w + "px";	
	this.renderer.view.style.height = h + "px";	
	
	var ratio = w / h;
	
	
	var realHeight = h//Math.min(h, 690);
	var realWidth = w// * (realHeight/h);
	this.container.scale.x = this.container.scale.y = 1;
	
	if(h < 690 || !this.isHigh)
	{
		realHeight = Math.min(h, 690);
		realWidth = w * (realHeight/h);
		this.container.scale.x = this.container.scale.y = realHeight / 690;
		
		h = 690;
	}
	
	if(APP.controlOverlay)
	{
		APP.controlOverlay.position.x = realWidth / 2;
		APP.controlOverlay.position.y = realHeight / 2;
	}
	
	if(APP.background)
	{
		var scale = realWidth < realHeight ? realHeight / 1024 : realWidth / 1024;
		APP.background.position.x = realWidth/2;
		APP.background.position.y = realHeight/2;
		
		APP.background.scale.x = APP.background.scale.y = scale;
	}
	//this.container.position.x = this.container.scale.x / 2;
	
	/*
	if(realWidth > realHeight)
	{
		realWidth = 1024;
		realHeight = 1024 / ratio;
	}
	else
	{
		realHeight = 1024;
		realWidth = 1024 * ratio;
	}*/
	
	
	/*
	if(realWidth > 1024)
	{
		realWidth = 1024;
		realHeight = 1024 / ratio;
	}
	else if(realHeight > 1024)
	{
		realHeight = 1024;
		realWidth = 1024 * ratio;
	}*/
	
	this.renderer.resize(realWidth,realHeight);
	//this.simpleApp.resize(realWidth,realHeight);
	this.simpleApp.resize(realWidth / this.container.scale.x, Math.max(h, 690));
	
//	this.addChild(this.audio);
//	this.audio.position.x = realWidth
//	this.audio.position.y = 100;
}



//window.addEventListener('message',onMessageReturned);	


/*
 * ON READY!
 */

$(document).ready(function(){
	
	var myNav = navigator.userAgent.toLowerCase();
  	var ie =  (myNav.indexOf('msie') != -1)
  	
//  	var ieVersion = parseInt(myNav.split('msie')[1])
  //  alert(ie);
	if(ie)//$.browser.msie)
	{
	//	alert("ie")
		// do sum stuff!
		//console.log("GOOD OLD IE!")
		PIXI.JsonLoader.prototype.load = PIXI.JsonLoader.prototype.loadIe;
	}
    
	//alert(navigator.userAgent);
	PROFILE = new Profile();
	PROFILE.buildProfile();
	
	if(PROFILE.mobile)
	{
		var tab = document.getElementById("mcTab");
		
		if(window.devicePixelRatio != 2)
		{
			tab.src = REMOTE_PATH + "img/super-spice-dash_m.png";
			tab.className = "mobileTab";
		}
		else
		{
			tab.src = REMOTE_PATH + "img/super-spice-dash.png";
		}
		
		var strip = document.getElementById("topStrip");
		strip.style.display = "none";

		var link = document.getElementById("mcdlink");
		link.href = "#";
		
		
	}
	else
	{
		var tab = document.getElementById("mcTab");
		tab.src = REMOTE_PATH + "img/super-spice-dash.png"
	}
	
	
	if(window.devicePixelRatio == 2 && !PROFILE.ipad)
	{
        $('meta[name=viewport]').attr('content','width=device-width, user-scalable=no,initial-scale=.5, maximum-scale=.5, minimum-scale=.5');
	}
	else
	{
		$('meta[name=viewport]').attr('content','width=device-width, user-scalable=no,initial-scale=1, maximum-scale=1, minimum-scale=1');

	}
	
	var props = getUrlVars();
	var inAPP = props["inapp"] == "true";
	
	if(inAPP)
	{
		var tab = document.getElementById("mcTab");
		tab.style.display = "none";
		var strip = document.getElementById("topStrip");
		strip.style.display = "none";
	}
	//if(this.inAPP && )
	
	if(PROFILE.is3g )
	{
		var noPlay = new Image();
		noPlay.src = REMOTE_PATH + "img/prompts/3GS_noplay.jpg";
		noPlay.style.position = "absolute";
		var newWidth = window.innerWidth  || document.documentElement.clientWidth;
		var newHeight = window.innerHeight  || document.documentElement.clientHeight;

		noPlay.width = newWidth
		noPlay.height = newHeight
		
		document.body.style.color = "#FFFFFF";
		document.body.appendChild(noPlay);
		return;
	}
	
	var needsTest = PROFILE.needsProfile;
	var threshhold = inAPP ? 7 : 5;
	if(PROFILE.ios && !inAPP )threshhold = 0;
	
	
	if(!PROFILE.ios)threshhold = 0;
	
	
	
	if(Modernizr.canvas)
	{
		
		if(needsTest)
		{
			// stress test
			stressTest = new PIXI.StressTest(function(result){
			//alert(result + " " + threshhold)
				if(result > threshhold)
				{
					PROFILE.setup((inAPP && PROFILE.ios) ? 0 : result);
					app = new McBites();
				}
				else
				{
					var noPlay = new Image();
					
					if(PROFILE.ipad)
					{
						noPlay.src = REMOTE_PATH + "img/prompts/iPad_noplay.jpg";
						
					}
					else
					{
						noPlay.src = REMOTE_PATH + "img/prompts/iPhone4_browserPlay.jpg";
						noPlay.ontouchstart = function()
						{
							window.open("#", "_blank")
						}
					}
					noPlay.style.position = "absolute";
					var newWidth = window.innerWidth  || document.documentElement.clientWidth;
					var newHeight = window.innerHeight  || document.documentElement.clientHeight;
	
					
					noPlay.width = newWidth
					noPlay.height = newHeight
					
					document.body.style.color = "#FFFFFF";
					document.body.appendChild(noPlay);
					
					return;
				}
				
			//	alert(result)
			});
			
			stressTest.begin();
		//	app = new McBites();
		}
		else
		{
			PROFILE.setup(10000);
			app = new McBites();
		}
	}
	else
	{
		var noPlay = new Image();
		noPlay.src = REMOTE_PATH + "img/warning_ie8.jpg";
		noPlay.style.position = "absolute";
		noPlay.style.top = "50%";
		noPlay.style.left = "50%";
		noPlay.style.marginTop = "-400px";
		noPlay.style.marginLeft = "-640px";
		//	noPlay.style.
		
		document.body.style.color = "#000000";
		document.body.appendChild(noPlay);
	}
	
		
})

$(window).resize(function(){
	
	var newWidth = window.innerWidth  || document.documentElement.clientWidth;
	var newHeight = window.innerHeight  || document.documentElement.clientHeight;
	
	if(app)app.resize(newWidth, newHeight);
	
	//alert("RESIZE: " + newWidth + " : " + newHeight)
	
	window.scrollTo(0,0);
})