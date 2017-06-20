(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Common          		 = require("./Common");
var GameScreen      		 = require("./screens/GameScreen");
var EditorScreen    		 = require("./screens/EditorScreen");
var SplashScreen    		 = require("./screens/SplashScreen");
var DailyBonusScreen		 = require("./screens/DailyBonusScreen");
var IntroScreen     		 = require("./screens/IntroScreen");
var LevelSelectScreen     	 = require("./screens/LevelSelectScreen");
var CharacterSelectScreen    = require("./screens/CharacterSelectScreen");
var PauseOverlay    		 = require("./overlays/PauseOverlay");
var GameOverOverlay 		 = require("./overlays/GameOverOverlay");
var HelpOverlay 			 = require("./overlays/HelpOverlay");
var CodeOverlay 			 = require("./overlays/CodeOverlay");
var EndlessOverlay 			 = require("./overlays/EndlessOverlay");
var PowerupPurchaseOverlay 	 = require("./overlays/PowerupPurchaseOverlay");
var GenericPopupOverlay 	 = require("./overlays/GenericPopupOverlay");
var CharacterUnlockedOverlay = require("./overlays/CharacterUnlockedOverlay");
var RewardOverlay            = require("./overlays/RewardOverlay");
var EndGameOverlay           = require("./overlays/EndGameOverlay");
var PromoOverlay             = require("./overlays/PromoOverlay");
var InstructionsOverlay      = require("./overlays/InstructionsOverlay");
var ExitOverlay              = require("./overlays/ExitOverlay");
var Transition      		 = require("./lib/Transition");
var CutoutTransition         = require("./lib/CutoutTransition");
var SavedData       		 = require("./SavedData");
var Goals            		 = require("./Goals");

//===================================================
// CONSTRUCTOR
//===================================================

function Application()
{
	/**
	 * @type {AssetManager}
	 * @private
	 */
	this._assetManager = null;

	/**
	 * @type {ScreenManager}
	 * @private
	 */
	this._screenManager = null;

	/**
	 * @type {p3.Screen}
	 */
	this._currentScreen = null;

	/**
	 * @type {p3.Transition}
	 * @private
	 */
	this._transition = null;
}
module.exports = Application;

//===================================================
// PUBLIC METHODS
//===================================================

Application.prototype.init = function()
{
	console.log("APPLICATION INITIALIZED");

	this._assetManager = p3.AssetManager.instance;
	this._screenManager = Common.sceneManager;

	TweenMax.defaultOverwrite = "none";

	//Texture generation: black square
	if(Common.generatedTextures['blackSquare'] == undefined)
	{
		var gr = new PIXI.Graphics();
		gr.beginFill(0x000000);
		gr.drawRect(0, 0, 1, 1);
		Common.generatedTextures['blackSquare'] = gr.generateTexture(Common.renderer, 1.0, PIXI.SCALE_MODES.LINEAR);
	}

	//Texture generation: white square
	if(Common.generatedTextures['whiteSquare'] == undefined)
	{
		var gr = new PIXI.Graphics();
		gr.beginFill(0xffffff);
		gr.drawRect(0, 0, 1, 1);
		Common.generatedTextures['whiteSquare'] = gr.generateTexture(Common.renderer, 1.0, PIXI.SCALE_MODES.LINEAR);
	}

	Common.savedData = new SavedData();
	Common.savedData.init();

	Common.goalsManager = new Goals();
	Common.goalsManager.init();

	p3.Button.audio = p3.AudioManager.instance;

	if(!!window.og.mode && window.og.mode == "editor")
	{
		this.showEditor();
	}
	else if(Common.savedData.levelDebug != "")
	{
		if(Common.savedData.characterDebug != "")
		{
			Common.savedData.character = Common.savedData.characterDebug;
			Common.savedData.characterDebug = "";
		}

		this.showGame();
	}
	else if(Common.savedData.canAwardDailyBonus())
	{
		this.showDailyBonus();
	}
	else
	{
		// this.showDailyBonus();
		this.showSplash();
		// this.showLevelSelect();
		// this.showIntro();
		// this.showOutro();
		// this.showCharacterSelect();
		// this.showGame();
	}
};


/**
 * SPLASH
 */
Application.prototype.showSplash = function()
{
	var screen = new SplashScreen();
	this._screenManager.add(screen, this._getTransition());

	screen.signals.requestedPreviousScreen.addOnce(function()
	{

	}, this);

	screen.signals.requestedNextScreen.addOnce(function(id)
	{
		if(id == 'story')
		{
			this.showLevelSelect();
		}
		else if(id == 'endless')
		{
			this.showCharacterSelect();
		}
		else if(id == 'tutorial')
		{
			this.showGame();
		}
		else if(id == 'intro')
		{
			this.showIntro();
		}
	}, this);

	screen.signals.GUIButtonClicked.add(function(id)
	{
        if(id == 'help')
        {
            this.showHelpOverlay("splash");
        }
		else if(id == 'endless')
        {
            this.showEndlessOverlay(true);
        }
		else if(id == 'endless_unlocked')
        {
            this.showEndlessOverlay(false);
        }
		else if(id == 'code')
        {
            this.showCodeOverlay();
        }
    }, this);

	screen.signals.linkClick.add(function(link, isDisneySite)
	{
		this.showExitOverlay(link, isDisneySite);
	}, this);

	this._currentScreen = screen;
};

/**
 * DAILY BONUS
 */
Application.prototype.showDailyBonus = function()
{
	var screen = new DailyBonusScreen();
	this._screenManager.add(screen, this._getTransition());

	screen.signals.requestedNextScreen.addOnce(function()
	{
		this.showSplash();
	}, this);

	this._currentScreen = screen;
};

/**
 * LEVEL SELECT
 */
Application.prototype.showLevelSelect = function()
{
	var screen = new LevelSelectScreen();
	this._screenManager.add(screen, this._getTransition());

	screen.signals.requestedPreviousScreen.addOnce(function()
	{
		this.showSplash();
	}, this);

	screen.signals.requestedNextScreen.addOnce(function(level)
	{
		this.showCharacterSelect(level);
	}, this);

	screen.signals.GUIButtonClicked.add(function(id)
	{
        if(id == 'help')
        {
            this.showHelpOverlay("levelSelect");
        }
		else if(id == 'reward')
        {
            this.showRewardOverlay();
        }
		else if(id == 'endgame')
        {
            this.showEndGameOverlay("endgame");
        }
		else if(id == 'promo')
        {
            this.showPromoOverlay();
        }
    }, this);

	this._currentScreen = screen;
};

/**
 * CHARACTER SELECT
 */
Application.prototype.showCharacterSelect = function(level)
{
	var screen = new CharacterSelectScreen(level);
	this._screenManager.add(screen, this._getTransition());

	screen.signals.requestedPreviousScreen.addOnce(function()
	{
		if(!Common.savedData.endless)
			this.showLevelSelect();
		else
			this.showSplash();
	}, this);

	screen.signals.requestedNextScreen.addOnce(function()
	{
		this.showGame();
	}, this);

	screen.signals.buyPressed.add(function(prevScreen, cost)
	{
		this.showPowerupPurchase(prevScreen, cost);
	}, this);

	screen.signals.characterUnlocked.addOnce(function(character)
	{
		this.showUnlockedCharacter(character);
	}, this);


	screen.signals.GUIButtonClicked.add(function(id)
	{
        if(id == 'help')
        {
            this.showHelpOverlay("characterSelect");
        }
    }, this);

	this._currentScreen = screen;
};

	Application.prototype.showPowerupPurchase = function(prevScreen, cost)
	{
		var t = new Transition();
		t.replace = false;
		t.push = true;

		var screen = new PowerupPurchaseOverlay(prevScreen, cost);
		this._screenManager.add(screen, t);

		screen.signals.requestedPreviousScreen.addOnce(function(id)
		{
			this._screenManager.remove();
		}, this);
	};

	Application.prototype.showUnlockedCharacter = function(character)
	{
		var t = new Transition();
		t.replace = false;
		t.push = true;

		var screen = new CharacterUnlockedOverlay(character);
		this._screenManager.add(screen, t);

		screen.signals.requestedPreviousScreen.addOnce(function(id)
		{
			this._screenManager.remove();
		}, this);
	};

/**
 * INTRO
 */
Application.prototype.showIntro = function()
{
	Common.savedData.hasSeenIntro = true;
	Common.savedData.save();

	var screen = new IntroScreen("intro");
	this._screenManager.add(screen, this._getTransition());

	screen.signals.requestedPreviousScreen.addOnce(function()
	{
	}, this);

	screen.signals.requestedNextScreen.addOnce(function()
	{
		this.showGame();
	}, this);

	this._currentScreen = screen;

	return screen;
};

/**
 * OUTRO
 */
Application.prototype.showOutro = function()
{
	Common.savedData.hasSeenOutro = true;
	Common.savedData.save();

	var screen = new IntroScreen("outro");
	this._screenManager.add(screen, this._getTransition());

	screen.signals.requestedPreviousScreen.addOnce(function()
	{
	}, this);

	screen.signals.requestedNextScreen.addOnce(function()
	{
		this.showLevelSelect();
	}, this);

	this._currentScreen = screen;

	return screen;
};


/**
 * GAME
 */
Application.prototype.showGame = function()
{
	var screen = new GameScreen();
	this._screenManager.add(screen, this._getTransition());

	screen.signals.requestedPreviousScreen.addOnce(function()
	{
		screen.animateOut(this.showGame, this);
	}, this);

	screen.signals.requestedNextScreen.addOnce(function(level)
	{
		this.showGameOver(level);
	}, this);

	screen.signals.pausePressed.add(function(level)
	{
		this.showPause(level);
	}, this);

	screen.signals.showInstructions.add(function(what)
	{
		this.showInstructionsOverlay(what);
	}, this);

	this._currentScreen = screen;

	// if(showPause && !Common.savedData.hasViewedInstructions)
	// {
		// this._currentScreen._showPause = true;
		// Common.animator.setTimeout(function()
		// {
			// this.showPause(true);
		// }, 0, this);
	// }

	return screen;
};

Application.prototype.showEditor = function()
{
	var screen = new EditorScreen();
	this._screenManager.add(screen, this._getTransition());

	this._currentScreen = screen;

	return screen;
};

Application.prototype.showHelpOverlay = function(section)
{
    var t = new Transition();
    t.replace = false;
    t.push = true;

    var screen = new HelpOverlay(section);
    this._screenManager.add(screen, t);

    screen.signals.requestedPreviousScreen.addOnce(function(id)
	{
        this._screenManager.remove();
    }, this);
};

Application.prototype.showCodeOverlay = function()
{
    var t = new Transition();
    t.replace = false;
    t.push = true;

    var screen = new CodeOverlay();
    this._screenManager.add(screen, t);

    screen.signals.requestedPreviousScreen.addOnce(function(id)
	{
        this._screenManager.remove();
    }, this);
};

Application.prototype.showInstructionsOverlay = function(what)
{
    // var t = new Transition();
    // t.replace = false;
    // t.push = true;

    // var screen = new InstructionsOverlay();
    // this._screenManager.add(screen, t);

    // screen.signals.requestedPreviousScreen.addOnce(function(id)
	// {
        // this._screenManager.remove();
    // }, this, true);


	var t     = new Transition();
	t.replace = false;
	t.push    = true;

	this._currentScreen.hideGUI(function()
	{
		var screen = new InstructionsOverlay(what);
		this._screenManager.add(screen, t);

		// Resume
		screen.signals.requestedNextScreen.addOnce(function()
		{
			this._screenManager.remove();
			this._currentScreen.showGUI();
		}, this);

	}, this, true);

};

Application.prototype.showEndlessOverlay = function(isLocked)
{
    var t = new Transition();
    t.replace = false;
    t.push = true;

    var screen = new EndlessOverlay(isLocked);
    this._screenManager.add(screen, t);

    screen.signals.requestedPreviousScreen.addOnce(function(id)
	{
        this._screenManager.remove();
    }, this);
};

Application.prototype.showRewardOverlay = function()
{
    var t = new Transition();
    t.replace = false;
    t.push = true;

    var screen = new RewardOverlay();
    this._screenManager.add(screen, t);

    screen.signals.requestedPreviousScreen.addOnce(function(id)
	{
        this._screenManager.remove();
    }, this);
};

Application.prototype.showEndGameOverlay = function()
{
    var t = new Transition();
    t.replace = false;
    t.push = true;

    var screen = new EndGameOverlay();
    this._screenManager.add(screen, t);

    screen.signals.requestedPreviousScreen.addOnce(function(id)
	{
        this._screenManager.remove();
    }, this);
};

Application.prototype.showPromoOverlay = function()
{
    var t = new Transition();
    t.replace = false;
    t.push = true;

    var screen = new PromoOverlay();
    this._screenManager.add(screen, t);

    screen.signals.requestedPreviousScreen.addOnce(function(id)
	{
        this._screenManager.remove();
    }, this);

	screen.signals.linkClick.add(function(link, isDisneySite)
	{
		this.showExitOverlay(link, isDisneySite);
	}, this);
};


Application.prototype.showGenericPopupOverlay = function(content, callback, scope)
{
	var t = new Transition();
    t.replace = false;
    t.push = true;

    var screen = new GenericPopupOverlay(content, callback, scope);
    this._screenManager.add(screen, t);

    screen.signals.requestedNextScreen.addOnce(function(){
        this._screenManager.remove();
    }, this);
};

/**
 * PAUSE
 */
Application.prototype.showPause = function(level)
{
	var t     = new Transition();
	t.replace = false;
	t.push    = true;

	this._currentScreen.hideGUI(function()
	{
		var screen = new PauseOverlay(level);
		this._screenManager.add(screen, t);

		// Resume
		screen.signals.requestedNextScreen.addOnce(function()
		{
			this._screenManager.remove();
			this._currentScreen.showGUI();
		}, this);

		// Return to splash
		screen.signals.requestedPreviousScreen.addOnce(function()
		{
			this.showSplash();
		}, this);

		// Restart
		screen.signals.requestedCurrentScreen.addOnce(function()
		{
			this.showGame();
		}, this);

	}, this, true);
};

/**
 * GAMEOVER
 */
Application.prototype.showGameOver = function(level)
{
	var t = new Transition();
	t.replace = false;
	t.push = true;

	var screen = new GameOverOverlay(level);
	this._screenManager.add(screen, t);

	screen.signals.requestedNextScreen.addOnce(function(id)
	{
		if(!Common.savedData.hasSeenOutro && Common.savedData.getCrystalCount() == Common.savedData.getCollectedCrystalCount())
		{
			this.showOutro();
		}
		else
		{
			if(!Common.savedData.endless)
				this.showLevelSelect();
			else
				this.showSplash();
		}
	}, this);

	screen.signals.requestedCurrentScreen.addOnce(function()
	{
		if(!Common.savedData.hasSeenOutro && Common.savedData.getCrystalCount() == Common.savedData.getCollectedCrystalCount())
			this.showOutro();
		else
			this.showGame();
	}, this);

	screen.signals.requestedPreviousScreen.addOnce(function(id)
	{
		if(!Common.savedData.hasSeenOutro && Common.savedData.getCrystalCount() == Common.savedData.getCollectedCrystalCount())
			this.showOutro();
		else
			this.showSplash();
	}, this);
};

/**
 * EXTERNAL LINK OVERLAY
 */
Application.prototype.showExitOverlay = function(link, isDisneySite)
{
    var t = new Transition();
    t.replace = false;
    t.push = true;

    var screen = new ExitOverlay(link, isDisneySite);
    this._screenManager.add(screen, t);

    screen.signals.requestedPreviousScreen.addOnce(function(id)
	{
        this._screenManager.remove();
    }, this);
}

//===================================================
// PRIVATE METHODS
//===================================================

/**
 */
Application.prototype._getTransition = function()
{
	// var transition = new Transition();
	// transition.replace = true;
	// transition.push = false;

    var transition      = new CutoutTransition(this._assetManager.getTexture("transition"), Common.TRANSITION_COLOR);
    // transition.wait     = true;
	// transition.replace = true;
	// transition.push = false;

    // transition.signals.in.addOnce(function() {
        // Common.animator.paused = false;
    // }, this);

	return transition;
}

//===================================================
// EVENTS
//===================================================

//===================================================
// GETTERS/SETTERS
//===================================================

//===================================================


},{"./Common":2,"./Goals":4,"./SavedData":7,"./lib/CutoutTransition":47,"./lib/Transition":52,"./overlays/CharacterUnlockedOverlay":53,"./overlays/CodeOverlay":54,"./overlays/EndGameOverlay":55,"./overlays/EndlessOverlay":56,"./overlays/ExitOverlay":57,"./overlays/GameOverOverlay":58,"./overlays/GenericPopupOverlay":59,"./overlays/HelpOverlay":60,"./overlays/InstructionsOverlay":61,"./overlays/PauseOverlay":62,"./overlays/PowerupPurchaseOverlay":63,"./overlays/PromoOverlay":64,"./overlays/RewardOverlay":65,"./screens/CharacterSelectScreen":66,"./screens/DailyBonusScreen":67,"./screens/EditorScreen":68,"./screens/GameScreen":69,"./screens/IntroScreen":70,"./screens/LevelSelectScreen":71,"./screens/SplashScreen":74}],2:[function(require,module,exports){
/**
 *  Common
 *
 *  Created by Legman on 30/04/2015.
 *
 */

//===================================================
// CONSTRUCTOR
//===================================================

function Common() {}
module.exports = Common;


/* ------GENERIC------ */

/**
 * @type {Number}
 * @const
 */
Common.STAGE_WIDTH = 1900.0;

/**
 * @type {Number}
 * @const
 */
Common.STAGE_HEIGHT = 768.0;

/**
 * @type {PIXI.Container}
 * @static
 */
Common.stage = null;

/**
 * @type {PIXI.CanvasRenderer|PIXI.WebGLRenderer}
 * @static
 */
Common.renderer = null;

/**
 * @type {p3.Timestep}
 * @static
 */
Common.timestep = null;

/**
 * @type {p3.Animator}
 * @static
 */
Common.animator = null;

/**
 * @type {PIXI.Point}
 * @static
 */
Common.touch = new PIXI.Point(0.0, 0.0);

/**
 * @type {Number}
 * @static
 */
Common.paused = false;

/**
 * @type {Boolean}
 * @static
 */
Common.isWebGL = false;

/**
 * @type {Number}
 * @const
 */
Common.DEBUG_PAINT_MODE = 0;

/**
 * @type {Number}
 * @static
 */
Common.frameCount = 0;

/**
 * @type {Number}
 * @const
 */
Common.FPS = 60;

/**
 * @type {SavedData}
 * @static
 */
Common.sceneManager = null;

/**
 * @type {String}
 * @static
 */
Common.generatedTextures = {};

/**
 * @type {String}
 * @static
 */
Common.COUNTRY_CODE = 'en';

/**
 * @type {Object}
 * @static
 */
Common.animationData = {};

/**
 * @type {SavedData}
 * @static
 */
Common.savedData = null;

/**
 * @type {Goals}
 * @static
 */
Common.goalsManager = null;

/**
 * @type {Object}
 * @static
 */
Common.characterAnimationData = [];

Common.bgMusicVolume = 0.3;
Common.bgMusic = null;

//===================================================
},{}],3:[function(require,module,exports){
var Common = require("./Common");

//===================================================
// CONSTRUCTOR
//===================================================
function Ctow()
{

	this.ctow = null;

	if(typeof(CTOW) != "undefined")
		this.ctow = new CTOW();

	this.defaultEventData =
	{
		event          : null,
		page_name      : "emea:uk:games:sws:play:{Game name}",
		page_url       : "{URL}",
		game_name      : "{Game name}",
		game_id        : "{CMS ID}",
		game_source_id : "{CMS Name}",
		game_tier4     : "FrozenNorthernLights"
	};
}
module.exports = Ctow;

//===================================================
// PUBLIC METHODS
//===================================================

/**
 * Init
 */
Ctow.prototype.init = function()
{
	if(this.ctow == null) return;

	console.info("CTOW Init");
	this.ctow.trackPage();
};

Ctow.prototype.trackEvent = function(data)
{
	if(this.ctow == null) return;
	if(!data.event)
	{
		console.error("Field missing: 'event'")
		return;
	}

	var eventData = JSON.parse(JSON.stringify(this.defaultEventData));

	eventData.event = data.event;
	if(!!data.game_level) eventData.game_level = data.game_level;
	if(!!data.game_tier1) eventData.game_tier1 = data.game_tier1;
	if(!!data.game_tier2) eventData.game_tier2 = data.game_tier2;
	if(!!data.game_tier3) eventData.game_tier3 = data.game_tier3;
	if(!!data.game_tier4) eventData.game_tier4 = data.game_tier4;
	if(!!data.game_tier5) eventData.game_tier5 = data.game_tier5;
	if(!!data.game_tier6) eventData.game_tier6 = data.game_tier6;
	if(!!data.game_meta)  eventData.game_meta  = data.game_meta;

	console.group("Event tracked");
	console.info(data);
	console.info(eventData);
	console.groupEnd();

	// this.ctow.trackGame(eventData);
}
},{"./Common":2}],4:[function(require,module,exports){
var Common = require("./Common");

//===================================================
// CONSTRUCTOR
//===================================================

function Goals()
{
	this._assetManager = p3.AssetManager.instance;
	this._activeGoalsCount = 3;
	this._activeGoals = null;
	this._activeGoalsCompleted = null;
	this._gameScreen = null;
}
module.exports = Goals;

//===================================================
// PUBLIC METHODS
//===================================================

/**
 * Init
 */
Goals.prototype.init = function()
{
	var json = this._assetManager.getJSON("config");

	this.goals  = json.goals;

	for(var i = 0; i < this.goals.length; i++)
	{
		if(this.goals[i].value > 1 && !!this._assetManager.getJSON("strings").goal_labels[this.goals[i].type + "_plural"])
		{
			this.goals[i].label = this._assetManager.getJSON("strings").goal_labels[this.goals[i].type + "_plural"][Common.COUNTRY_CODE].replace("{value}", this.goals[i].value);
		}
		else
		{
			this.goals[i].label = this._assetManager.getJSON("strings").goal_labels[this.goals[i].type][Common.COUNTRY_CODE].replace("{value}", this.goals[i].value);
		}
		this.goals[i].icon  = json.goal_icons[this.goals[i].type];
	}
};

/**
 */
Goals.prototype.startRun = function(gameScreen)
{
	this._gameScreen = gameScreen;
	this._activeGoals = this.getActiveGoals();
	this._activeGoalsCompleted = [];
	this._events = [];
}

/**
 */
Goals.prototype.getGoalById = function(id)
{
	for(var i = 0; i < this.goals.length; i++)
	{
		if(this.goals[i].id == id)
			return this.goals[i];
	}
}

/**
 */
Goals.prototype.getGoalStatus = function(id)
{
	if(!Common.savedData.goals[id])
		return 0;

	var goal = this.getGoalById(id);
	return Math.min(1, Common.savedData.goals[id]/goal.value);
}

/**
 */
Goals.prototype.getActiveGoals = function()
{
	var goals = [];

	for(var i = 0; i < this.goals.length && goals.length < this._activeGoalsCount; i++)
	{
		if(this.getGoalStatus(this.goals[i].id) < 1)
		{
			goals.push(this.goals[i]);
		}
	}

	return goals;
}

/**
 */
Goals.prototype.trackEvent = function(event, amount)
{
	amount = !!amount ? amount : 1;
	save = false;

	// Run events count
	if(!this._events[event])
		this._events[event] = amount;
	else
		this._events[event] += amount;

	// Update active goals
	for(var i = 0; i < this._activeGoals.length; i++)
	{
		var goal = this._activeGoals[i];

		if(!Common.savedData.goals[goal.id])
			Common.savedData.goals[goal.id] = 0;


		if(goal.type == event)
		{
			if(Common.savedData.goals[goal.id] >= goal.value) break;

			Common.savedData.goals[goal.id]++;
			// console.log("Goal %s %i/%i", goal.id, Common.savedData.goals[goal.id], goal.value);

			if(Common.savedData.goals[goal.id] >= goal.value)
			{
				console.log("Goal %s completed", goal.id);
				this.goalCompleted(goal);
				save = true;
			}

		}
		else if(goal.type == event + "_run")
		{
			if(this._events[event] > goal.value) break;

			// console.log("Goal %s %i/%i", goal.id, this._events[event], goal.value);

			if(this._events[event] > Common.savedData.goals[goal.id])
				Common.savedData.goals[goal.id] = this._events[event];

			if(this._events[event] == goal.value)
			{
				console.log("Goal %s completed", goal.id);
				this.goalCompleted(goal);
				save = true;
			}
		}
	}

	if(save)
		Common.savedData.save();
}

/**
 * Return an array of the ids of the goals completed during a level
 * @returns {Array}
 */
Goals.prototype.getRunCompletedGoalsIds = function()
{
	var ids = [];

	for(var i = 0; i < this._activeGoalsCompleted.length; i++)
	{
		ids.push(this._activeGoalsCompleted[i].id);
	}

	return ids;
}

/**
 */
Goals.prototype.goalCompleted = function(goal)
{
	Common.savedData.coins += goal.reward;
	this._gameScreen.gameUI.queueGoal(goal.label, goal.reward);

	this._activeGoalsCompleted.push(goal);
}
},{"./Common":2}],5:[function(require,module,exports){
"use strict";

/**
 * Keyboard class
 * ===========================
 * @constructor
 */

function Keyboard()
{
}
module.exports = Keyboard;

var Keyboard = Keyboard.prototype;

/**
 * @type {Signal.Signal}
 */
Keyboard.signalKeyDown = new signals.Signal();
Keyboard.signalKeyUp = new signals.Signal();

/**
 * @type {Object.<boolean>}
 */
Keyboard._keysDown    = null;
Keyboard._keysPressed = null;
Keyboard._keysUp      = null;

/**
 * @const @type {number}
 */
Keyboard.KEY_TAB   = 9;
Keyboard.KEY_ENTER = 13;
Keyboard.KEY_SHIFT = 16;
Keyboard.KEY_CTRL  = 17;
Keyboard.KEY_SPACE = 32;
Keyboard.KEY_LEFT  = 37;
Keyboard.KEY_UP    = 38;
Keyboard.KEY_RIGHT = 39;
Keyboard.KEY_DOWN  = 40;
Keyboard.KEY_A     = 65;
Keyboard.KEY_B     = 66;
Keyboard.KEY_C     = 67;
Keyboard.KEY_D     = 68;
Keyboard.KEY_E     = 69;
Keyboard.KEY_F     = 70;
Keyboard.KEY_G     = 71;
Keyboard.KEY_H     = 72;
Keyboard.KEY_I     = 73;
Keyboard.KEY_J     = 74;
Keyboard.KEY_K     = 75;
Keyboard.KEY_L     = 76;
Keyboard.KEY_M     = 77;
Keyboard.KEY_N     = 78;
Keyboard.KEY_O     = 79;
Keyboard.KEY_P     = 80;
Keyboard.KEY_Q     = 81;
Keyboard.KEY_R     = 82;
Keyboard.KEY_S     = 83;
Keyboard.KEY_T     = 84;
Keyboard.KEY_U     = 85;
Keyboard.KEY_V     = 86;
Keyboard.KEY_W     = 87;
Keyboard.KEY_X     = 88;
Keyboard.KEY_Y     = 89;
Keyboard.KEY_Z     = 90;
Keyboard.KEY_PLUs  = 187;
Keyboard.KEY_MINUS = 189;


/**
 * Initialization
 */
Keyboard.init = function()
{
	this.reset();

	// Key events
	document.body.onkeydown = function(e)
	{
		var code;
		if(window.event) code = e.keyCode;
		else             code = e.which;

		Keyboard._keysDown[code]    = !Keyboard._keysPressed[code];
		Keyboard._keysPressed[code] = true;

		Keyboard.signalKeyDown.dispatch(code);
	}

	document.body.onkeyup = function(e)
	{
		var code;
		if(window.event) code = e.keyCode;
		else             code = e.which;

		Keyboard._keysDown[code]    = false;
		Keyboard._keysPressed[code] = false;
		Keyboard._keysUp[code]      = true;

		Keyboard.signalKeyUp.dispatch(code);
	}
}

/**
 * Update
 */
Keyboard.update = function()
{
	Keyboard._keysDown = {};
	Keyboard._keysUp   = {};
}

/**
 * Reset
 */
Keyboard.reset = function()
{
	Keyboard._keysDown    = {};
	Keyboard._keysPressed = {};
	Keyboard._keysUp      = {};
}

/**
 * Return if the given keyCode is currently pressed
 *
 * @param {Number} keyCode
 * @returns {boolean}
 */
Keyboard.getKeyPressed = function(keyCode)
{
	return Keyboard._keysPressed[keyCode];
}

/**
 * Return if the given keyCode or the given combination of keys has just been pressed
 *
 * @param {Number} keyCode
 * @returns {Boolean}
 */
Keyboard.getKeyJustPressed = function(keyCode)
{
	return Keyboard._keysDown[keyCode];
}

/**
 * Return if the given keyCode or the given combination of keys has just been released
 *
 * @param {Number} keyCode
 * @returns {Boolean}
 */
Keyboard.getKeyJustReleased = function(keyCode)
{
	return Keyboard._keysUp[keyCode];
}
},{}],6:[function(require,module,exports){
/**
 *  Main
 */

var Application   = require("./Application");
var Common        = require("./Common");
var Preloader     = require("./screens/Preloader");
var SceneManager  = require("./lib/SceneManager");
var Keyboard      = require("./Keyboard");
var Ctow          = require("./Ctow");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @param {!Number} width
 * @param {!Number} height
 * @constructor
 */
function Main(width, height)
{
	/**
	 * @type {!Number}
	 * @private
	 */
	this._width  = width;
	this._height = height;

	/**
	 * @type {p3.AssetManager}
	 * @private
	 */
	this._assetManager = null;

	/**
	 * @type {p3.ScreenManager}
	 * @private
	 */
	this._screenManager = null;

	/**
	 * @type {Preloader}
	 * @private
	 */
	this._preloader = null;

	/**
	 * @type {Application}
	 * @private
	 */
	this._game = null;

	/**
	 * @type {Number}
	 * @private
	 */
	this._resolution = 1.0;

	/**
	 * @type {String}
	 * @private
	 */
	this._scale      = "hd/";
	this._renderFPS  = 60.0;
	this._frameCount = 0;

}
window.Main = Main;

//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
Main.prototype.init = function()
{
  	this._assetManager  = p3.AssetManager.instance;
	this._screenManager = new SceneManager();

	Common.COUNTRY_CODE = window.og.language;

	var elementId   = "og-game-holder";
	var params      = new p3.ViewParams();
	params.width    = this._width;
	params.height   = this._height;
	params.holderId = elementId;
	params.rotateImageUrl   = "assets/images/system/" + Common.COUNTRY_CODE + "/rotate_device.jpg";
	params.rotateImageColor = "#000000";

	PIXI.RETINA_PREFIX = /\_(?=[^_]*$)(.+)x/;

	p3.Tracking.DEBUG = true;
	Common.tracking = new p3.Tracking();
	Common.tracking.init(new p3.TrackingModuleEcho(window.stats));

	p3.Device.init(window["bowser"]);

	TweenMax.defaultOverwrite = "none";
	TweenMax.ticker.fps(Common.FPS);

	var canvas = new p3.View(params);
	canvas.signals.ready.addOnce(function(canvas)
	{
		var options = {};
		options.view = canvas;
		options.transparent = false;
		options.antialias = false;
		options.preserveDrawingBuffer = false;
		options.resolution = this._resolution;
		this._assetManager.scaleFactor = this._resolution;

		var stage = new PIXI.Container();
		Common.stage = stage;

		var renderer = PIXI.autoDetectRenderer(this._width, this._height, options);
		Common.renderer = renderer;

		this._screenManager.init(stage, renderer);
		Common.sceneManager = this._screenManager;

		Common.isWebGL = (renderer instanceof PIXI.WebGLRenderer);
		Common.DEBUG_PAINT_MODE = p3.Utils.getURLParameter("paint", 0);

		var timestep = new p3.Timestep();
		timestep.init(this.update, this.render, this);
		Common.timestep = timestep;

		Common.animator = new p3.Animator();
		Common.animator.init();

		Common.keyboard = new Keyboard();
		Common.keyboard.init();

		Common.ctow = new Ctow();
		Common.ctow.init();

		this.loadPreloader();

	}, this);
	canvas.signals.resize.add(this.onCanvasResize, this);

	var hidden;
	"undefined" != typeof document.hidden ? (hidden = "hidden",
		this.visibilityChange = "visibilitychange")    : "undefined" != typeof document.mozHidden ? (hidden = "mozHidden",
		this.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (hidden = "msHidden",
		this.visibilityChange = "msvisibilitychange")  : "undefined" != typeof document.webkitHidden && (hidden = "webkitHidden",
		this.visibilityChange = "webkitvisibilitychange");

	document.addEventListener(this.visibilityChange, function(){
		document[hidden] ? Howler.volume(0) : Howler.volume(1);
	}, false);
	
	// Regain focus for keyboard events
	document.onclick = function(event) 
	{
        window.focus();
    };


	// Stats
	// this._stats = new Stats();
	// this._stats.domElement.style.position	= 'absolute';
	// this._stats.domElement.style.bottom		= '0px';
	// document.body.appendChild(this._stats.domElement);
};

/**
 */
Main.prototype.loadPreloader = function()
{
	var scale  = this._scale;
	var prefix = (scale === "sd/" ? "_0.5x" : "");
	var files =
	[
		{name:"preloader_0",  url:"images/" + scale + "preloader" + prefix + ".json"},
		{name:"preloader_bg", url:"images/" + scale + "titles_" + Common.COUNTRY_CODE + "/preloader" + prefix + ".jpg"}
	];
	var sounds = [
	];

	if (files.length)
	{
		this._assetManager.addFiles(files, window.og.gameDir + "assets/");
		this._assetManager.signalCompleted.addOnce(function() {this.loadAssets();}, this);
		this._assetManager.load();

		p3.AudioManager.instance.addSounds(sounds, [".mp3", ".ogg"], "");
	}
	else
	{
		this.loadAssets();
	}
};


/**
 */
Main.prototype.loadAssets = function()
{
	var scale  = this._scale;
	var prefix = (scale === "sd/" ? "_0.5x" : "");
	var files =
	[
		{name:"config",     url:"strings/config.json"},
		{name:"strings",    url:"strings/strings.json"},
		{name:"ui0",        url:"images/" + scale + "ui0" + prefix + ".json"},
		{name:"ui1",        url:"images/" + scale + "ui1" + prefix + ".json"},
		{name:"ui2",        url:"images/" + scale + "ui2" + prefix + ".json"},
		{name:"map0",       url:"images/" + scale + "map0" + prefix + ".json"},
		{name:"ingame_0",   url:"images/" + scale + "ingame_0" + prefix + ".json"},
		{name:"theme_01_0", url:"images/" + scale + "theme_01_0" + prefix + ".json"},
		{name:"theme_02_0", url:"images/" + scale + "theme_02_0" + prefix + ".json"},
		{name:"theme_03_0", url:"images/" + scale + "theme_03_0" + prefix + ".json"},
		{name:"northern_lights_0", url:"images/" + scale + "northern_lights_0" + prefix + ".json"},

		// Levels
		//{name:"level_bg_0",    url:"images/" + scale + "level_00_bg_0" + prefix + ".json"},
		//{name:"level_bg_1",    url:"images/" + scale + "level_01_bg_0" + prefix + ".json"},
		//{name:"level_bg_2",    url:"images/" + scale + "level_02_bg_0" + prefix + ".json"},
		//{name:"level_00_bg_0", url:"images/" + scale + "level_00_bg_0" + prefix + ".json"},
		//{name:"level_01_bg_0", url:"images/" + scale + "level_01_bg_0" + prefix + ".json"},
		//{name:"level_02_bg_0", url:"images/" + scale + "level_02_bg_0" + prefix + ".json"},


		{name:"editorConfig",      url:"images/hd/editor/config.json"},
		{name:"test_000",          url:"data/test_000.json"},
		{name:"test_001",          url:"data/test_001.json"},
		{name:"test_002",          url:"data/test_002.json"},
		{name:"endless_start_000", url:"data/endless_start_000.json"},
		{name:"endless_part_000",  url:"data/endless_part_000.json"},
		{name:"endless_part_001",  url:"data/endless_part_001.json"},
		{name:"endless_part_002",  url:"data/endless_part_002.json"},
		{name:"endless_part_003",  url:"data/endless_part_003.json"},
		{name:"endless_part_004",  url:"data/endless_part_004.json"},
		{name:"endless_part_005",  url:"data/endless_part_005.json"},
		{name:"endless_part_006",  url:"data/endless_part_006.json"},
		{name:"endless_part_007",  url:"data/endless_part_007.json"},
		{name:"endless_part_008",  url:"data/endless_part_008.json"},
		{name:"endless_part_009",  url:"data/endless_part_009.json"},
		{name:"endless_part_010",  url:"data/endless_part_010.json"},
		{name:"endless_part_011",  url:"data/endless_part_011.json"},
		{name:"endless_part_012",  url:"data/endless_part_012.json"},
		{name:"endless_part_013",  url:"data/endless_part_013.json"},
		{name:"endless_part_014",  url:"data/endless_part_014.json"},
		{name:"endless_part_015",  url:"data/endless_part_015.json"},
		{name:"endless_part_016",  url:"data/endless_part_016.json"},
		{name:"endless_part_017",  url:"data/endless_part_017.json"},
		{name:"endless_part_018",  url:"data/endless_part_018.json"},
		{name:"endless_part_019",  url:"data/endless_part_019.json"},
		{name:"endless_part_020",  url:"data/endless_part_020.json"},
		{name:"endless_part_021",  url:"data/endless_part_021.json"},
		{name:"endless_part_022",  url:"data/endless_part_022.json"},
		{name:"endless_part_023",  url:"data/endless_part_023.json"},
		{name:"endless_part_024",  url:"data/endless_part_024.json"},
		{name:"endless_part_025",  url:"data/endless_part_025.json"},
		{name:"level_00",          url:"data/level_00_tutorial.json"},
		{name:"level_01",          url:"data/level_01.json"},
		{name:"level_02",          url:"data/level_02.json"},
		{name:"level_03",          url:"data/level_03.json"},
		{name:"level_04",          url:"data/level_04.json"},
		{name:"level_05",          url:"data/level_05.json"},
		{name:"level_06",          url:"data/level_06.json"},
		{name:"level_07",          url:"data/level_07.json"},
		{name:"level_08",          url:"data/level_08.json"},
		{name:"level_09",          url:"data/level_09.json"},
		{name:"level_10",          url:"data/level_10.json"},
		{name:"level_11",          url:"data/level_11.json"},

		// Bg
		{name:"ui_bg_characters",  url:"images/hd/ui_bg_characters.jpg"},
		{name:"ui_bg_daily_bonus", url:"images/hd/ui_bg_daily_bonus.jpg"},
		{name:"ui_bg_main_menu",   url:"images/hd/ui_bg_main_menu.jpg"},
		{name:"transition",        url:"images/hd/transition.png"},

		// Particle systems
		{name: "particle_barrel_explosion",        url:"particles/particle_barrel_explosion.json"},
		{name: "particle_ice_explosion",           url:"particles/particle_ice_explosion.json"},
		{name: "particle_coin_collect_burst",      url:"particles/particle_coin_collect_burst.json"},
		{name: "particle_snow_emitter_v1",         url:"particles/particle_snow_emitter_v1.json"},
		{name: "particle_doublejump",              url:"particles/particle_doublejump.json"},
		{name: "particle_ice_bridge",              url:"particles/particle_ice_bridge.json"},
		{name: "particle_marshmallow_land",        url:"particles/particle_marshmallow_land.json"},
		{name: "particle_snowball",                url:"particles/particle_snowball.json"},
		{name: "particle_char_upgrade",            url:"particles/particle_emitter_snow_char_upgrade_00.json"},
		{name: "particle_menu_snow",               url:"particles/particle_emitter_menu_snow.json"},
		{name: "particle_level_unlock",            url:"particles/particle_level_unlock_icemagic3.json"},
		{name: "particle_character_unlock",        url:"particles/particle_snowstorm_char_unlock_00.json"},
		{name: "particle_reward",                  url:"particles/particle_emitter_snowburst_reward_00.json"},
		{name: "particle_troll_magic",             url:"particles/particle_emitter_troll_magic_00.json"},
		{name: "particle_magic_trail",             url:"particles/particle_emitter_trollmagic_trail_01.json"},
		{name: "particle_death",                   url:"particles/particle_emitter_fall_offscreen_00.json"},
		{name: "particle_sparkle_results_blue",    url:"particles/particle_sparkle_results_blue.json"},
		{name: "particle_sparkle_results_green",   url:"particles/particle_sparkle_results_green.json"},
		{name: "particle_sparkle_results_pink",    url:"particles/particle_sparkle_results_pink.json"},
		{name: "particle_sparkle_results_purple",  url:"particles/particle_sparkle_results_purple.json"},
		{name: "particle_sled_shine",              url:"particles/particle_sled_shine_01.json"},
		{name: "particle_map_ripples_lower",       url:"particles/particle_map_ripples_lower_00.json"},
		{name: "particle_map_ripples_upper",       url:"particles/particle_map_ripples_upper_00.json"},
		{name: "particle_map_ripples_bridge",      url:"particles/particle_map_ripples_bridge.json"},
		{name: "particle_map_troll_pool_sparkles", url:"particles/particle_map_troll_pool_sparkles.json"},
		{name: "particle_end_swirltrail_00", 	   url:"particles/particle_end_swirltrail_00.json"},
		{name: "particle_gem_cyan_ending", 	   	   url:"particles/particle_gem_cyan_ending.json"},
		{name: "particle_gem_green_ending", 	   url:"particles/particle_gem_green_ending.json"},
		{name: "particle_gem_pink_ending", 	   	   url:"particles/particle_gem_pink_ending.json"},
		{name: "particle_gem_purple_ending", 	   url:"particles/particle_gem_purple_ending.json"},

		// Fx
		{name:"shockwave",     url:"images/hd/shockwave.png"},

		// Fonts
		{name:"mikadan_title_64pt",          url:"fonts/mikadan_title_64pt.xml"},
		{name:"mikadan_white_64pt",          url:"fonts/mikadan_white_64pt.xml"},
		{name:"superclarendon_level_32pt",   url:"fonts/superclarendon_level_32pt.xml"},
		{name:"superclarendon_numbers_60pt", url:"fonts/superclarendon_numbers_60pt.xml"},
		{name:"superclarendon_results_32pt", url:"fonts/superclarendon_results_32pt.xml"},
		{name:"superclarendon_title_50pt",   url:"fonts/superclarendon_title_50pt.xml"},
		{name:"superclarendon_title_64pt",   url:"fonts/superclarendon_title_64pt.xml"},

		// Level elements
		{name:"theme_01_fill",           url:"images/hd/editor/theme_01_fill.png"},
		{name:"theme_01_ground",         url:"images/hd/editor/theme_01_ground.png"},
		{name:"theme_01_ground_edge",    url:"images/hd/editor/theme_01_ground_edge.png"},
		{name:"theme_01_wall",           url:"images/hd/editor/theme_01_wall.png"},
		{name:"theme_02_fill",           url:"images/hd/editor/theme_02_fill.png"},
		{name:"theme_02_ground",         url:"images/hd/editor/theme_02_ground.png"},
		{name:"theme_02_ground_edge",    url:"images/hd/editor/theme_02_ground_edge.png"},
		{name:"theme_02_wall",           url:"images/hd/editor/theme_02_wall.png"},
		{name:"theme_03_fill",           url:"images/hd/editor/theme_03_fill.png"},
		{name:"theme_03_ground",         url:"images/hd/editor/theme_03_ground.png"},
		{name:"theme_03_ground_edge",    url:"images/hd/editor/theme_03_ground_edge.png"},
		{name:"theme_03_wall",           url:"images/hd/editor/theme_03_wall.png"},
		{name:"theme_04_fill",           url:"images/hd/editor/theme_04_fill.png"},
		{name:"theme_04_ground",         url:"images/hd/editor/theme_04_ground.png"},
		{name:"theme_05_fill",           url:"images/hd/editor/theme_05_fill.png"},
		{name:"theme_05_ground",         url:"images/hd/editor/theme_05_ground.png"},
		{name:"theme_06_fill",           url:"images/hd/editor/theme_06_fill.png"},
		{name:"theme_06_ground",         url:"images/hd/editor/theme_06_ground.png"},
		{name:"elsa_ice_flow_capl_00",   url:"images/hd/editor/elsa_ice_flow_capl_00.png"},
		{name:"elsa_ice_flow_ground_00", url:"images/hd/editor/elsa_ice_flow_ground_00.png"},

		{name:"jump_platform",  url:"images/hd/editor/jump_platform.png"},
		{name:"camera_zoom",    url:"images/hd/editor/camera_zoom.png"},
		{name:"level_end",      url:"images/hd/editor/level_end.png"},
		{name:"level_gameover", url:"images/hd/editor/level_gameover.png"},
		{name:"shrink_unlock",  url:"images/hd/editor/shrink_unlock.png"},
		{name:"shrink_lock",    url:"images/hd/editor/shrink_lock.png"},
		{name:"tutorial",       url:"images/hd/editor/tutorial.png"},
		{name:"sven",           url:"images/hd/editor/sven.png"},
		{name:"marshmallow",    url:"images/hd/editor/marshmallow.png"},
		{name:"troll",          url:"images/hd/editor/troll.png"},
		{name:"troll_pabbie",   url:"images/hd/editor/troll_pabbie.png"}

		// Spine (does it cache?)
		// {name: "char_female",            url:"spine/" + scale + 'char_female' + ".json"},
		// {name:"char_female",      url:"spine/hd/char_female.png"},
		// {name:"char_elsa",        url:"spine/hd/char_elsa.png"},
		// {name:"char_kristoff",    url:"spine/hd/char_kristoff.png"},
		// {name:"char_olaf",        url:"spine/hd/char_olaf.png"},
		// {name:"char_pabbie",      url:"spine/hd/char_pabbie.png"},
		// {name:"char_sven",        url:"spine/hd/char_sven.png"},
		// {name:"sled",             url:"spine/hd/sled.png"},
		// {name:"char_marshmallow", url:"spine/hd/char_marshmallow.png"},
		// {name:"intro",            url:"spine/hd/intro.png"},
		// {name:"intro2",           url:"spine/hd/intro2.png"}
	];


	var sounds =
	[
		"mx_frozen_01_gameplay_lp",
		"mx_frozen_01_gameplay_tension_lp",
		"mx_frozen_02_character_selection",
		"mx_frozen_03_main_menu_edit",
		"mx_frozen_04_pause_lp",
		"mx_frozen_05_map_lp",
		"mx_frozen_05_score_lp",
		"sfx_intro_audio_01",
		"sfx_outro_audio_01",

		"sfx_btn_press_00",
		"sfx_btn_rollover_00",
		"sfx_ui_buy_upgrade_02",
		"sfx_pulley_down_loop_04",
		"sfx_ui_map_level_unlock_02",

		"sfx_pickup_snowflake_00",
		"sfx_pickup_gem_tinkle_01",
		"sfx_pickup_troll_01",
		"sfx_generic_hit_obstacle_00",
		"sfx_iceblock_smash_00",
		"sfx_iceblock_smash_01",
		"sfx_iceblock_smash_02",
		"sfx_iceblock_smash_03",
		"sfx_iceblock_smash_04",
		"sfx_iceblock_smash_05",
		"sfx_iceblock_smash_06",
		"sfx_kristoff_smash_ice_00",
		"sfx_kristoff_smash_ice_01",
		"sfx_kristoff_smash_ice_02",
		"sfx_kristoff_smash_ice_03",
		"sfx_kristoff_smash_ice_04",
		"sfx_kristoff_smash_ice_05",
		"sfx_kristoff_smash_ice_06",
		"sfx_generic_hit_obstacle_00",
		"sfx_generic_fall_offscreen_01",
		"sfx_kristoff_swing_axe_02",
		"sfx_elsa_ice_magic_platform_00",
		"sfx_elsa_ice_magic_platform_01",
		"sfx_elsa_ice_magic_platform_02",
		"sfx_elsa_ice_magic_platform_03",
		"sfx_elsa_ice_magic_platform_fail_00",
		"mx_troll_magic_rush_loop_02",
		"sfx_troll_notify_00",
		"sfx_sven_hitobstacle_stop_00",
		"sfx_sven_jump_00",
		"sfx_sven_jump_01",
		"sfx_sven_jump_02",
		"sfx_sven_jump_03",
		"sfx_sven_jump_04",
		"sfx_sven_run_stop_00",
		"sfx_goals_screen_spotfx_00",
		"sfx_main_screen_spotfx_01",
		"sfx_promo_screen_spotfx_00",
		"sfx_ui_character_unlock_01",

		"sfx_anna_snow_runvsoft_00",
		"sfx_kristoff_snow_runvsoft_00",
		"sfx_generic_olaf_snow_runvsoft_00",
		"sfx_sven_run_02",
		"sfx_snow_slide_loop_00",

		"sfx_generic_jump_00",
		"sfx_generic_jump_01",
		"sfx_generic_jump_02",
		"sfx_generic_land_soft_00",
		"sfx_generic_land_heavy_00",

		"sfx_marshmallow_fall_00",
		"sfx_marshmallow_move_00",
		"sfx_marshmallow_end_00",
		"sfx_marshmallow_grunt_00"
	];
	if (files.length)
	{
		this._assetManager.addFiles(files, window.og.gameDir + "assets/");
		this._assetManager.signalProgress.add(this.onLoadingProgress, this);
		this._assetManager.signalCompleted.addOnce(this.onLoadingCompleted, this);
		this._assetManager.load();

		this._preloader = new Preloader();
		this._screenManager.add(this._preloader);

		p3.AudioManager.instance.addSounds(sounds, [".mp3", ".ogg"], window.og.gameDir + "assets/audio/");
	}
	else
	{
		this.startGame();
	}
};

/**
 */
Main.prototype.startGame = function()
{
	var that = this;
	that._game = new Application();
	that._game.init();
};

/**
 */
Main.prototype.update = function()
{
	// this._stats.begin();

	if(p3.Timestep.deltaTime >= 1/30)
		p3.Timestep.deltaTime = 1/30;

	this._screenManager.update();
	Common.animator.update();
	Common.keyboard.update();

	if (Common.DEBUG_PAINT_MODE > 0)
	{
		this.paintBadImage(Common.stage);
	}

	this._frameCount++;
	Common.frameCount = this._frameCount;
};

/**
 */
Main.prototype.render = function()
{
	Common.renderer.render(Common.stage);

	// this._stats.end();
};

/**
 * @param {!PIXI.DisplayObject} display
 * @param {Number=} color
 */
Main.prototype.paintBadImage = function(display, color)
{
	color = color || 0xAA00FF;

	var child;
	for (var i = 0; i < display.children.length; ++ i) {
		child = display.children[i];
		if (child instanceof PIXI.Sprite) {
			if (Common.DEBUG_PAINT_MODE == 1) {
				if (child.texture.width % 2 != 0 || child.texture.height % 2 != 0) {
					child.tint = color;
				} else {
					child.tint = 0xFFFFFF;
				}
			}
			if (Common.DEBUG_PAINT_MODE == 2) {
				if (child.position.x !== parseInt(child.position.x) || child.position.y !== parseInt(child.position.y)) {
					child.tint = color;
				} else {
					child.tint = 0xFFFFFF;
				}
			}
		}
		this.paintBadImage(child, color);
	}
};

//===================================================
// PRIVATE METHODS
//===================================================


//===================================================
// EVENTS
//===================================================

/**
 */
Main.prototype.onLoadingProgress = function(event)
{
	this._preloader.loadedPercentage = event.progress;
};

// Main.prototype.onLoadingSpineProgress = function(event)
// {
	// this._preloader.loadedPercentage = 0.5 + event.progress/200;
// };

/**
 */
Main.prototype.onLoadingCompleted = function()
{
    var that = this;

	var loader =  new PIXI.loaders.Loader();
	
	// loader.on("progress", function(event)
	// {
		// that.onLoadingSpineProgress(event)
	// })	
	
	loader.add('char_female',      "assets/spine/" + that._scale + 'char_female' + ".json")
				.add('char_elsa',        "assets/spine/" + that._scale + 'char_elsa' + ".json")
				.add('char_kristoff',    "assets/spine/" + that._scale + 'char_kristoff' + ".json")
				.add('char_olaf',        "assets/spine/" + that._scale + 'char_olaf' + ".json")
				.add('char_pabbie',      "assets/spine/" + that._scale + 'char_pabbie' + ".json")
				.add('char_sven',        "assets/spine/" + that._scale + 'char_sven' + ".json")
				.add('sled',             "assets/spine/" + that._scale + 'sled' + ".json")
				.add('char_marshmallow', "assets/spine/" + that._scale + 'char_marshmallow' + ".json")
				.add('char_troll',       "assets/spine/" + that._scale + 'char_troll_sign' + ".json")
				.add('intro',            "assets/spine/" + that._scale + 'intro' + ".json")
				.add('outro',            "assets/spine/" + that._scale + 'outro' + ".json")
				.add('anna',             "assets/spine/" + that._scale + 'anna' + ".json")
				.add('kristoff',         "assets/spine/" + that._scale + 'kristoff' + ".json")
				.add('olaf',             "assets/spine/" + that._scale + 'olaf' + ".json")
				.add('elsa',             "assets/spine/" + that._scale + 'elsa' + ".json")
				.add('pabbie',           "assets/spine/" + that._scale + 'pabbie' + ".json")
				.load(function(loader, resources)
				{
					Common.characterAnimationData.char_female      = resources.char_female.spineData;
					Common.characterAnimationData.char_elsa        = resources.char_elsa.spineData;
					Common.characterAnimationData.char_kristoff    = resources.char_kristoff.spineData;
					Common.characterAnimationData.char_olaf        = resources.char_olaf.spineData;
					Common.characterAnimationData.char_pabbie      = resources.char_pabbie.spineData;
					Common.characterAnimationData.char_sven        = resources.char_sven.spineData;
					Common.characterAnimationData.char_sled        = resources.sled.spineData;
					Common.characterAnimationData.char_marshmallow = resources.char_marshmallow.spineData;
					Common.characterAnimationData.char_troll       = resources.char_troll.spineData;
					Common.introAnimationData                      = resources.intro.spineData;
					Common.outroAnimationData                      = resources.outro.spineData;
					Common.characterAnimationData.anna             = resources.anna.spineData;
					Common.characterAnimationData.kristoff         = resources.kristoff.spineData;
					Common.characterAnimationData.olaf             = resources.olaf.spineData;
					Common.characterAnimationData.elsa             = resources.elsa.spineData;
					Common.characterAnimationData.pabbie           = resources.pabbie.spineData;

					that._preloader.loadedPercentage = 100.0;
					that._preloader.animateOut(null, this);
					that._preloader = null;

					that._assetManager.signalProgress.removeAll();
					that._assetManager.signalCompleted.removeAll();

					window.r2l          = that._assetManager.getJSON("config").r2l;
					window.webfont      = that._assetManager.getJSON("config").webfont;
					Common.COUNTRY_CODE = that._assetManager.getJSON("config").locale;

					// Event Tracking
					Common.ctow.trackEvent(
					{
						event : "game_load"
					});

					that.startGame();
				});
};

/**
 * @param {!Boolean} correct
 */
Main.prototype.onCanvasResize = function(correct)
{
	if (correct)
	{
		Common.renderer.resize(p3.View.width, p3.View.height);

		if (this._screenManager)
		{
			this._screenManager.resize();
		}
	}
};

//===================================================
// GETTERS/SETTERS
//===================================================

//===================================================


},{"./Application":1,"./Common":2,"./Ctow":3,"./Keyboard":5,"./lib/SceneManager":51,"./screens/Preloader":72}],7:[function(require,module,exports){
var Common = require("./Common");

//===================================================
// CONSTRUCTOR
//===================================================

function SavedData()
{
	this._assetManager = p3.AssetManager.instance;

	this.SAVE_NAME    = "frozen_lights_north";
	this.SAVE_VERSION = "16.09.09";
	this.SAVE_SEED    = "y5k0Eo6R177mUkb";

	// Just loaded
	this.showSplashIntro = true;

	// Current level / character
	this.character    = 'anna';
	this.levels       = 12; // (readonly)
	this.level        = 0;  // 0-11
	this.endless      = false;
	this.unit         = 100; // px/m (readonly)

	// Debug
	this.levelDebug     = "";
	this.characterDebug = "";

	// Coins
	this.coins          = 0;
	this.dailyBonusDate = null;

	// Levels unlocked
	this.levelsUnlocked    = 1; // [1-this.levels]
	this.showUnlockedLevel = false;

	// Tutorial
	this.hasSeenIntro    = false;
	this.hasSeenOutro    = false;
	this.hasSeenTutorial =
	{
		anna         : false,
		kristoff     : false,
		olaf         : false,
		elsa         : false,
		pabbie       : false,
		endless      : false
	}

	// Characters unlocked
	this.charactersUnlocked =
	{
		anna         : true, // Always true
		kristoff     : false,
		olaf         : false,
		elsa         : false,
		pabbie       : false
	}
	this.showUnlockedCharacter = "";

	// Characters powerups (flip, magnet, magic)
	this.charactersPower =
	{
		anna         : [0, 0, 0],
		kristoff     : [0, 0, 0],
		olaf         : [0, 0, 0],
		elsa         : [0, 0, 0],
		pabbie       : [0, 0, 0]
	}

	// Crystals
	this.crystals = [];
	for(var level = 0; level < this.levels; level++)
	{
		this.crystals[level] = {};
		this.crystals[level].anna     = [false, false, false];
		this.crystals[level].kristoff = [false, false, false];
		this.crystals[level].olaf     = [false, false, false];
		this.crystals[level].elsa     = [false, false, false];
	}

	// Trolls
	this.trolls = [];
	for(var level = 0; level < this.levels; level++)
	{
		this.trolls[level] = [false, false, false];
	}

	// Goals
	this.goals = {};

	// Highscore
	this.highscore = {};

	// Loss streak reward
	this.lossStreak =
	{
		count   : 0,
		awarded : false
	}

	// All level completed
	this.endGameMessage =
	{
		endless : // When the required amount of levels to unlockendless mode have been completed
		{
			show  : false,
			shown : false
		},
		levels : // When all levels have been completed
		{
			show  : false,
			shown : false
		},
		crystals : // when all crystals have been collected / pabbie unlocked
		{
			show  : false,
			shown : false
		},
		trolls : // when all trolls have been collected
		{
			show  : false,
			shown : false
		}
	}

	// Promo
	this.promoTime  = Math.floor(Date.now() / 1000) + this._assetManager.getJSON("config").promo.time;
	this.promoShown = [];
	
	// Codes
	this.codesUsed = [];
}
module.exports = SavedData;

//===================================================
// PUBLIC METHODS
//===================================================

SavedData.prototype.init = function()
{
	if(!window.localStorage[this.SAVE_NAME + "_" + this.SAVE_VERSION])
	{
		console.log('reset');
		this.reset();
		this.save();
	}
	else
	{
		console.log('load');
		this.load();
	}
};

/**
 * Reset
 */
SavedData.prototype.reset = function()
{

};

/**
 * Load
 */
SavedData.prototype.load = function()
{
	var data = window.localStorage[this.SAVE_NAME + "_" + this.SAVE_VERSION];
	data = JSON.parse(data);

	this.coins                    = parseInt(data.coins),
	this.levelsUnlocked           = parseInt(data.levelsUnlocked),
	this.hasSeenIntro             = data.hasSeenIntro,
	this.hasSeenOutro             = data.hasSeenOutro,
	this.showUnlockedLevel        = data.showUnlockedLevel;
	this.showUnlockedCharacter    = data.showUnlockedCharacter;
	this.hasSeenTutorial          = data.hasSeenTutorial;
	this.charactersUnlocked       = data.charactersUnlocked;
	this.charactersPower          = data.charactersPower;
	this.goals                    = data.goals;
	this.dailyBonusDate           = data.dailyBonusDate;
	this.crystals                 = data.crystals;
	this.trolls                   = data.trolls;
	this.highscore                = data.highscore;
	this.lossStreak               = data.lossStreak;
	this.endGameMessage           = data.endGameMessage;
	this.promoShown               = !!data.promoShown ? data.promoShown : this.promoShown;
	this.codesUsed                = !!data.codesUsed  ? data.codesUsed : this.codesUsed;
	this.levelDebug               = data.levelDebug;
	this.characterDebug           = data.characterDebug;
};

/**
 * Save
 */
SavedData.prototype.save = function()
{
	console.log('save');
	var data =
	{
		coins                    : this.coins,
		levelsUnlocked           : this.levelsUnlocked,
		hasSeenIntro             : this.hasSeenIntro,
		hasSeenOutro             : this.hasSeenOutro,
		showUnlockedLevel        : this.showUnlockedLevel,
		showUnlockedCharacter    : this.showUnlockedCharacter,
		hasSeenTutorial          : this.hasSeenTutorial,
		charactersUnlocked       : this.charactersUnlocked,
		charactersPower          : this.charactersPower,
		goals                    : this.goals,
		dailyBonusDate           : this.dailyBonusDate,
		crystals                 : this.crystals,
		trolls                   : this.trolls,
		highscore                : this.highscore,
		lossStreak               : this.lossStreak,
		endGameMessage           : this.endGameMessage,
		levelDebug               : this.levelDebug,
		characterDebug           : this.characterDebug,
		promoShown               : this.promoShown,
		codesUsed                : this.codesUsed
	};

	var json = JSON.stringify(data);
	data.hash = md5(json + this.SAVE_SEED);

	window.localStorage[this.SAVE_NAME + "_" + this.SAVE_VERSION] = JSON.stringify(data);
};

/**
 * Return how many character have been unlocked
 * @returns {Number}
 */
SavedData.prototype.getUnlockedCharacterCount = function()
{
	var count = 0;

	for (var key in this.charactersUnlocked)
	{
		count += !!this.charactersUnlocked[key] ? 1 : 0;
	}

	return count;
};

/**
 * Return true if it's the first time the player plays today
 * @returns {Boolean}
 */
SavedData.prototype.canAwardDailyBonus = function()
{
	var date = new Date();

	if(this.dailyBonusDate == null)
	{
		this.awardDailyBonus(0);
	}

	return this.dailyBonusDate != null && this.dailyBonusDate != (date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay());
}

/**
 * Award daily bonus points
 * @param {Number} amount
 */
SavedData.prototype.awardDailyBonus = function(amount)
{
	var date = new Date();

	this.coins += amount;
	this.dailyBonusDate = date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay();

	this.save();
}

/**
 * Return the total amout of crystals collected
 * @returns {Number}
 */
SavedData.prototype.getCollectedCrystalCount = function()
{
	var count = 0;

	for(var level = 0; level < this.crystals.length; level++)
	{
		for(var key in this.crystals[level])
		{
			for(var i = 0; i < this.crystals[level][key].length; i++)
			{
				if(this.crystals[level][key][i])
					count++;
			}
		}
	}

	return count;
}

/**
 * Return the total amout of crystals that can be collected
 * @returns {Number}
 */
SavedData.prototype.getCrystalCount = function()
{
	var count = 0;

	for(var level = 0; level < this.crystals.length; level++)
	{
		for(var key in this.crystals[level])
		{
			count += this.crystals[level][key].length;
		}
	}

	return count;
}

/**
 * Return the total amout of crystals collected in a level by a character
 * @param {Number} level
 * @param {String} character
 * @returns {Number}
 */
SavedData.prototype.getLevelCharacterCrystalCount = function(level, character)
{
	var count = 0;

	if(!!this.crystals[level][character])
	{
		for(var crystal = 0; crystal < this.crystals[level][character].length; crystal++)
		{
			if(!!this.crystals[level][character][crystal]) count++;
		}
	}
	return count;
}

/**
 * Return true if a specific crystal has been collected
 * @param {Number} level
 * @param {String} character
 * @param {Number} index
 */
SavedData.prototype.isCrystalCollected = function(level, character, index)
{
	return this.crystals[level][character][index];
}

/**
 * Return the total amout of trolls collected
 * @returns {Number}
 */
SavedData.prototype.getCollectedTrollCount = function()
{
	var count = 0;

	for(var level = 0; level < this.trolls.length; level++)
	{
		for(var troll = 0; troll < this.trolls[level].length; troll++)
		{
			if(!!this.trolls[level][troll])
				count++;
		}
	}

	return count;
}

/**
 * Return the total amout of trolls that can be collected
 * @returns {Number}
 */
SavedData.prototype.getTrollCount = function()
{
	var count = 0;

	for(var level = 0; level < this.trolls.length; level++)
	{
		count += this.trolls[level].length;
	}

	return count;
}

/**
 * Return true if a specific troll has been collected
 * @param {Number} level
 * @param {Number} index
 */
SavedData.prototype.isTrollCollected = function(level, index)
{
	return this.trolls[level][index];
}

/**
 * Return the total amout of trolls collected
 * @param {Number} level
 * @returns {Number}
 */
SavedData.prototype.getLevelCollectedTrollCount = function(level)
{
	var count = 0;

	for(var troll = 0; troll < this.trolls[level].length; troll++)
	{
		if(!!this.trolls[level][troll])
			count++;
	}
	return count;
}


/**
 * Return the color assigned to a character
 * @param {String} character
 * @returns {String}
 */
SavedData.prototype.getColorByCharacter = function(character)
{
	var characterData = this._assetManager.getJSON("config").characters;
	return characterData[character].color;
}

/**
 * Return the character assigned to a color
 * @param {String} color
 * @returns {String}
 */
SavedData.prototype.getCharacterByColor = function(color)
{
	var data = this._assetManager.getJSON("config");
	for(var i = 0; i < data.playableCharacters.length; i++)
	{
		if(data.characters[data.playableCharacters[i]].color == color)
		{
			return data.playableCharacters[i];
		}
	}
}

/**
 * Save the highscore for the given level, if higher
 * @param {String} mode
 * @param {Number} score
 */
SavedData.prototype.recordHighscore = function(mode, score)
{
	if(!this.highscore[mode] || this.highscore[mode] < score)
	{
		this.highscore[mode] = score;
	}
}

/**
 * Return the highscore for the given level
 * @returns {Number}
 */
SavedData.prototype.getHighscore = function(mode)
{
	return !!this.highscore[mode] ? this.highscore[mode] : 0;
}

/**
 * Return if enough time has passed to show a promo and there are still promos to show
 * @returns {bool}
 */
SavedData.prototype.canShowPromo = function()
{
	return (Math.floor(Date.now() / 1000) > this.promoTime) && (this.getNewPromo() != null);
}

/**
 * Return if the given promo has been shown
 * @returns {bool}
 */
SavedData.prototype.hasShownPromo = function(promo)
{
	for(var i = 0; i < this.promoShown.length; i++)
	{
		if(promo.image == this.promoShown[i])
		{
			return true;
		}
	}
	return false;
}

/**
 * Return a promo that has not been shown yet
 * @returns {Object}
 */
SavedData.prototype.getNewPromo = function()
{
	for(var i = 0; i < this._assetManager.getJSON("strings").promos.length; i++)
	{
		if(!this.hasShownPromo(this._assetManager.getJSON("strings").promos[i][Common.COUNTRY_CODE]))
		{
			return this._assetManager.getJSON("strings").promos[i][Common.COUNTRY_CODE];
		}
	}
	return null;
}

/**
 * Set the given promo as shown
 * @param {Objects}
 */
SavedData.prototype.setPromoAsShown = function(promo)
{
	this.promoTime = Math.floor(Date.now() / 1000) + this._assetManager.getJSON("config").promo.time;
	Common.savedData.promoShown.push(promo.image);
}

/**
 * Return if the code is valid
 * @param {string}
 * @returns {bool}
 */
SavedData.prototype.isCodeValid = function(code)
{
	return !!this._assetManager.getJSON("config").codes[code];
}

/**
 * Return if the code has been redeemed
 * @param {string}
 * @returns {bool}
 */
SavedData.prototype.isCodeRedeemed = function(code)
{
	return this.codesUsed.indexOf(code) != -1;
}

/**
 * Set the given code as used
 * @param {string}
 */
SavedData.prototype.setCodeAsUsed = function(code)
{
	Common.savedData.codesUsed.push(code);
}

/**
 * Return a code's reward
 * @param {string}
 */
SavedData.prototype.getCodeValue = function(code)
{
	return parseInt(this._assetManager.getJSON("config").codes[code]);
}
},{"./Common":2}],8:[function(require,module,exports){
var Common          = require("../Common");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function BezierPath()
{
	this.points                = [];
	this.quadWidth             = 96;
	this.cacheDrawingPoints    = true;
	this._drawingPoints        = null;
	this._drawingPointsNormals = null;
}
module.exports = BezierPath;

/**
 *
 */
BezierPath.prototype.addPoint = function(x, y, index)
{
	if(!index)
		this.points.push({x:x, y:y});
	else
		this.points.splice(index, 0, {x:x, y:y})
}

/**
 *
 */
BezierPath.prototype.deletePoint = function(index)
{
	this.points.splice(index, 1);
}

/**
 *
 */
BezierPath.prototype.getFirstPoint = function()
{
	return this.points[0];
}

/**
 *
 */
BezierPath.prototype.getLastPoint = function()
{
	return this.points[this.points.length-1];
}

BezierPath.prototype.getPenultimatePoint = function()
{
	return this.points[this.points.length-2];
}

/**
 *
 */
BezierPath.prototype.getWidth = function()
{
	return this.getLastPoint().x - this.getFirstPoint().x;
}

/**
 *
 */
BezierPath.prototype.calculateBezierPoint = function(t, p0, p1, p2, p3)
{
	var u   = 1 - t;
	var tt  = t*t;
	var uu  = u*u;
	var uuu = uu * u;
	var ttt = tt * t;

	p = {x: uuu * p0.x, y: uuu * p0.y}; //first term
	p.x += 3 * uu * t * p1.x; //second term
	p.y += 3 * uu * t * p1.y;
	p.x += 3 * u * tt * p2.x; //third term
	p.y += 3 * u * tt * p2.y;
	p.x += ttt * p3.x; //fourth term
	p.y += ttt * p3.y;

	return p;
}

/**
 *
 */
BezierPath.prototype.getDrawingPoints = function()
{
	if(this.cacheDrawingPoints && this._drawingPoints != null) return this._drawingPoints;

	this._drawingPoints = [];
	for(var i = 0; i < this.points.length - 3; i+=3)
    {
		var p0 = this.points[i];
		var p1 = this.points[i + 1];
		var p2 = this.points[i + 2];
		var p3 = this.points[i + 3];

		var tentativeLength = Math.sqrt(Math.pow(p0.x  - p3.x, 2) + Math.pow(p0.y - p3.y, 2));
		var nSegments       = Math.ceil(tentativeLength/this.quadWidth);

		if(i == 0) // First endpoint
		{
			this._drawingPoints.push(this.calculateBezierPoint(0, p0, p1, p2, p3));
		}

		for(var j = 1; j <= nSegments; j++)
		{
			var t = j / nSegments;
			this._drawingPoints.push(this.calculateBezierPoint(t, p0, p1, p2, p3));
		}
	}

	return this._drawingPoints;
}

/**
 *
 */
BezierPath.prototype.getDrawingPointsNormals = function()
{
	if(this.cacheDrawingPoints && this._drawingPointsNormals != null) return this._drawingPointsNormals;

	var drawingPoints = this.getDrawingPoints();

	this._drawingPointsNormals = [];

	for(var i = 1; i < drawingPoints.length - 1; i++)
	{
		var prevPoint = drawingPoints[i-1];
		var nextPoint = drawingPoints[i+1];
		var line = {x:nextPoint.x - prevPoint.x, y:nextPoint.y - prevPoint.y};
		var perp = {x:-line.y, y:line.x};
		var perpLength = Math.sqrt(perp.x * perp.x + perp.y * perp.y);
		var perpNorm = {x: perp.x/perpLength, y: perp.y/perpLength};
		this._drawingPointsNormals[i] = perpNorm;
	}

	// TODO: can be improved
	this._drawingPointsNormals[0] = {x:0, y:1};
	this._drawingPointsNormals[drawingPoints.length-1] = {x:0, y:1};

	return this._drawingPointsNormals;
}


BezierPath.prototype.getGroundSegments = function(minAngle, maxAngle)
{
	var segments = [];
	var segment  = null;

	var drawingPoints        = this.getDrawingPoints();
	var drawingPointsNormals = this.getDrawingPointsNormals();

	for(var i = 0; i < drawingPoints.length - 1; i++)
	{
		 var angle = Math.abs(Math.atan2(drawingPoints[i+1].y - drawingPoints[i].y, drawingPoints[i+1].x - drawingPoints[i].x) * PIXI.RAD_TO_DEG);

		 if(angle < minAngle || angle > maxAngle)
		 {
			 if(segment == null) continue;
			 segments.push(segment);
			 segment = null;
		 }
		 else
		 {
			 if(segment == null)
			 {
				 segment =
				 {
					 points  : [drawingPoints[i]],
					 normals : [drawingPointsNormals[i]]
				 }
			 }
			 segment.points.push(drawingPoints[i+1]);
			 segment.normals.push(drawingPointsNormals[i+1]);
		 }
	}

	if(segment != null)
	{
		segments.push(segment);
	}

	for(var i = 0; i < segments.length; i++)
	{
		if(segments[i].normals.length > 2)
		{
			segments[i].normals[0] = segments[i].normals[1];
			segments[i].normals[segments[i].normals.length-1] = segments[i].normals[segments[i].normals.length-2];
			// segments[i].normals[0] = {x:0, y:1};
			// segments[i].normals[segments[i].normals.length-1] = {x:0, y:1};
		}
	}

	return segments;
}


},{"../Common":2}],9:[function(require,module,exports){
var Common     = require("../Common");
var Level      = require("../editor/Level");
var LevelLayer = require("../editor/LevelLayer");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function Editor()
{
	PIXI.Container.call(this);
	this.assetManager = p3.AssetManager.instance;

	// Level list
	this.levels = [];
	this.level  = null;

	// Grid
	this.snapGrid = 16;
	this.grid     = null;

	// Panning
	this.cmb = false;
	this.panMousePosition = null;

	// Config
	this.config = this.assetManager.getJSON("editorConfig");
	var side = 33;

	for(var i = 0; i < this.config.objects.length; i++)
	{
		var sprite = new PIXI.Sprite(this.assetManager.getTexture(this.config.objects[i].texture));
		var scale  = Math.min(1/(sprite.width/side), 1/(sprite.height/side));

		var texture = new PIXI.RenderTexture(Common.renderer, side, side);

			var matrix = new PIXI.Matrix();
			matrix.translate(sprite.width < sprite.height ? (sprite.height - sprite.width)/2 : 1, sprite.height < sprite.width ? (sprite.width - sprite.height)/2 : 1);
			matrix.scale(scale, scale);
			texture.render(sprite, matrix);

		this.config.objects[i].textureBase64 = texture.getBase64();
	}

	// History
	this.history    = [];
	this.historyIndex = 0;

	// Test
	this.character = "anna";

	// Gui
	this.gui =
	{
		selector       : "#controls",
		levelTemplate  : _.template($("#template-level").html(),  {variable: 'editor'}),
		layerTemplate  : _.template($("#template-layer").html(),  {variable: 'editor'}),
		pathTemplate   : _.template($("#template-path").html(),   {variable: 'editor'}),
		objectTemplate : _.template($("#template-object").html(), {variable: 'editor'})
	}
}
module.exports = Editor;
Editor.prototype = Object.create(PIXI.Container.prototype);
Editor.prototype.constructor = Editor;

/**
 * TODO
 */
Editor.prototype.init = function()
{
	this.renderGrid();

	this.newLevel();

	// Zoom
	document.addEventListener("mousewheel", function(e)
	{
		if($('#canvas:hover').length != 0)
		{
			this.zoomDelta(-0.05 * Math.sign(e.wheelDelta));
		}
	}.bind(this), false);

	// Save/Load
	$("body").on("click", ".level_new", function(e)
	{
		this.newLevel();
	}.bind(this));

	$("body").on("click", ".level_export", function(e)
	{
		this.export();
	}.bind(this));

	$("body").on("click", ".level_import", function(e)
	{
		this.load($("textarea[name=level_import_text]").val());
	}.bind(this));

	// $("#level_import").on("change", function(e)
	// {
		// var location = $(e.currentTarget).val();
		// console.log(readTextFile(location));
	// }.bind(this));

	// Export image
	$("body").on("click", ".level_image", function(e)
	{
		var base64 = this.level.toImage();
		if(!!base64)
		{
			var win = window.open(base64, 'level_image');
			win.focus();
		}
	}.bind(this));

	// Level debug
	$("body").on("change", "select[name=level_character]", function(e)
	{
		this.character = $(e.currentTarget).val();
	}.bind(this));

	$("body").on("click", ".level_debug", function(e)
	{
		Common.savedData.characterDebug = this.character;
		Common.savedData.levelDebug = JSON.stringify(this.level.export());
		Common.savedData.save();

		var win = window.open("index.html", 'level_debug');
		win.focus();
	}.bind(this));

	// Level
	$("body").on("change", "input[name=level_name]", function(e)
	{
		this.level.setName($(e.currentTarget).val());
		$("textarea[name=level_import_text]").val(JSON.stringify(this.level.export()));

	}.bind(this));

	$("body").on("click", ".new_layer", function(e)
	{
		this.level.newLayer();
	}.bind(this));

	$("body").on("click", ".edit_layer", function(e)
	{
		var index = parseInt($(e.currentTarget).attr("data-index"));
		this.level.selectLayer(this.level.getLayerAtIndex(index));
	}.bind(this));

	$("body").on("click", ".back", function(e)
	{
		this.back();
	}.bind(this));


	// Layer
	$("body").on("change", "input[name=layer_name]", function(e)
	{
		this.level.layer.setName($(e.currentTarget).val());
	}.bind(this));

	$("body").on("click", ".delete_layer", function(e)
	{
		this.level.deleteLayer(this.level.layer);
		this.back();
	}.bind(this));

	$("body").on("change", "input[name=layer_depth]", function(e)
	{
		this.level.layer.setDepth(parseInt($(e.currentTarget).val()));
		this.render();
	}.bind(this));

	$("body").on("click", ".objects li:not(.selected)", function(e)
	{
		$(".objects li.selected").removeClass("selected");
		// this.level.layer.idObject = $(e.currentTarget).attr("data-id");
		this.level.layer.setIdObject($(e.currentTarget).attr("data-id"));
		$(e.currentTarget).addClass("selected");
	}.bind(this));

	// Path
	$("body").on("change", "select[name=path_open]", function(e)
	{
		this.level.layer.selected.setConfig("closed", !parseInt($(e.currentTarget).val()), e.type == "change");
		this.render();
	}.bind(this));

	$("body").on("click", ".delete_path", function(e)
	{
		this.level.layer.deletePath(this.level.layer.selected);
		this.back();
	}.bind(this));

	$("body").on("change", "input[name=path_depth], input[name=object_depth]", function(e)
	{
		this.level.layer.setSelectedDepth(parseInt($(e.currentTarget).val()));
		this.render();
	}.bind(this));

	$("body").on("change", "select[name=path_collisions]", function(e)
	{
		this.level.layer.selected.setConfig("collisions", parseInt($(e.currentTarget).val()), e.type == "change");
	}.bind(this));

	$("body").on("change input", "input[name=path_texture_walls_angle]", function(e)
	{
		this.level.layer.selected.setConfig("texWallAngle", parseInt($(e.currentTarget).val()), e.type == "change");
		this.level.layer.selected.render();
	}.bind(this));

	$("body").on("change input", "input[name=path_texture_fill_size]", function(e)
	{
		this.level.layer.selected.setConfig("texFillSize", parseInt($(e.currentTarget).val()), e.type == "change");
		this.level.layer.selected.render();
	}.bind(this));

	$("body").on("change input", "input[name=path_texture_fill_padding]", function(e)
	{
		this.level.layer.selected.setConfig("texFillPadding", parseInt($(e.currentTarget).val()), e.type == "change");
		this.level.layer.selected.render();
	}.bind(this));

	$("body").on("change input", "input[name=path_texture_ground_size]", function(e)
	{
		this.level.layer.selected.setConfig("texGroundSize", parseInt($(e.currentTarget).val()), e.type == "change");
		this.level.layer.selected.render();
	}.bind(this));

	$("body").on("change input", "input[name=path_texture_ground_delta]", function(e)
	{
		this.level.layer.selected.setConfig("texGroundDelta", parseFloat($(e.currentTarget).val()), e.type == "change");
		this.level.layer.selected.render();
	}.bind(this));

	$("body").on("change input", "input[name=path_texture_walls_size]", function(e)
	{
		this.level.layer.selected.setConfig("texWallSize", parseInt($(e.currentTarget).val()), e.type == "change");
		this.level.layer.selected.render();
	}.bind(this));

	$("body").on("change input", "input[name=path_texture_walls_delta]", function(e)
	{
		this.level.layer.selected.setConfig("texWallDelta", parseFloat($(e.currentTarget).val()), e.type == "change");
		this.level.layer.selected.render();
	}.bind(this));

	$("body").on("change", "select[name=path_texture_fill]", function(e)
	{
		this.level.layer.selected.setConfig("texFill", $(e.currentTarget).val(), e.type == "change");
		this.level.layer.selected.render();
	}.bind(this));

	$("body").on("change", "select[name=path_texture_ground]", function(e)
	{
		this.level.layer.selected.setConfig("texGround", $(e.currentTarget).val(), e.type == "change");
		this.level.layer.selected.render();
	}.bind(this));

	$("body").on("change", "select[name=path_texture_ground_edge]", function(e)
	{
		this.level.layer.selected.setConfig("texGroundEdge", $(e.currentTarget).val(), e.type == "change");
		this.level.layer.selected.render();
	}.bind(this));

	$("body").on("change", "select[name=path_texture_ground_edge_side]", function(e)
	{
		this.level.layer.selected.setConfig("texGroundEdgeSide", $(e.currentTarget).val(), e.type == "change");
		this.level.layer.selected.render();
	}.bind(this));

	$("body").on("change", "select[name=path_texture_wall]", function(e)
	{
		this.level.layer.selected.setConfig("texWall", $(e.currentTarget).val(), e.type == "change");
		this.level.layer.selected.render();
	}.bind(this));

	$("body").on("change input", "textarea[name=path_data], textarea[name=object_data]", function(e)
	{
		this.level.layer.selected.setConfig("data", $(e.currentTarget).val(), e.type == "change");
		// if(e.type == "change")
			// this.render();
	}.bind(this));

	// Object
	$("body").on("click", ".delete_object", function(e)
	{
		this.level.layer.deleteObject(this.level.layer.selected);
		this.back();
	}.bind(this));

	$("body").on("change input", "input[name=object_scale]", function(e)
	{
		this.level.layer.selected.setScale(parseFloat($(e.currentTarget).val()), e.type == "change");
	}.bind(this));

	$("body").on("change input", "input[name=object_rotation]", function(e)
	{
		this.level.layer.selected.setRotation(parseFloat($(e.currentTarget).val()), e.type == "change");
	}.bind(this));

	// Make range input lose focus after change
	$("body").on("change", "input[type=range]", function(e)
	{
		$(this).blur();
	});
}

/**
 * TODO
 */
Editor.prototype.update = function()
{
	// Pan
	if(this.mouse.centerPressed)
	{
		if(!this.cmb)
		{
			this.cmb = true;
			this.panMousePosition = new PIXI.Point(this.mouse.position.x, this.mouse.position.y);
		}
		else
		{
			this.level.x += (this.mouse.position.x - this.panMousePosition.x) *  (1/this.scale.x);
			this.level.y += (this.mouse.position.y - this.panMousePosition.y) *  (1/this.scale.y);
			this.panMousePosition = new PIXI.Point(this.mouse.position.x, this.mouse.position.y);

			this.updateGridPosition();
		}
	}
	else if(this.cmb)
	{
		this.cmb = false;
	}

	// Level update
	if(this.level != null)
	{
		if(
			(Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_CTRL) && Common.keyboard.getKeyPressed(Common.keyboard.KEY_Z) && Common.keyboard.getKeyPressed(Common.keyboard.KEY_SHIFT)) ||
			(Common.keyboard.getKeyPressed(Common.keyboard.KEY_CTRL) && Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_Z) && Common.keyboard.getKeyPressed(Common.keyboard.KEY_SHIFT)) ||
			(Common.keyboard.getKeyPressed(Common.keyboard.KEY_CTRL) && Common.keyboard.getKeyPressed(Common.keyboard.KEY_Z) && Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_SHIFT)))
		{
			this.historyRedo();
		}
		else if(
			(Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_CTRL) && Common.keyboard.getKeyPressed(Common.keyboard.KEY_Z)) ||
			(Common.keyboard.getKeyPressed(Common.keyboard.KEY_CTRL) && Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_Z)))
		{
			this.historyUndo();
		}


		this.level.update();
	}
}

/**
 * TODO
 */
Editor.prototype.updateGridPosition = function()
{
	this.grid.tilePosition = new PIXI.Point(this.level.x % this.snapGrid, this.level.y % this.snapGrid);
}

/**
 * TODO
 */
Editor.prototype.render = function()
{
	if(this.level == null) return;

	this.level.render();
	this.level.renderGUI();
}

/**
 * TODO
 */
Editor.prototype.getMousePosition = function()
{
	return new PIXI.Point
	(
		Common.STAGE_WIDTH/2  + ((this.mouse.position.x - Common.STAGE_WIDTH/2)/this.scale.x)  - this.level.x,
		Common.STAGE_HEIGHT/2 + ((this.mouse.position.y - Common.STAGE_HEIGHT/2)/this.scale.y) - this.level.y
	);
}

/**
 * TODO
 */
Editor.prototype.zoomDelta = function(deltaZoom)
{
	if(this.scale.x - deltaZoom < 0.01) return;

	var oldWidth = Common.STAGE_WIDTH * this.scale.x;
	var oldHeight = Common.STAGE_HEIGHT * this.scale.y;

	this.scale = new PIXI.Point(this.scale.x - deltaZoom, this.scale.y - deltaZoom);

	var newWidth = Common.STAGE_WIDTH * this.scale.x;
	var newHeight = Common.STAGE_HEIGHT * this.scale.y;

	this.x += (oldWidth - newWidth) /2;
	this.y += (oldHeight - newHeight) /2;
}

/**
 * TODO
 */
Editor.prototype.renderGUI = function(what)
{
	switch(what)
	{
		case "level":
			var html = this.gui.levelTemplate(this);
			break;
		case "layer":
			var html = this.gui.layerTemplate(this);
			break;
		case "path":
			var html = this.gui.pathTemplate(this);
			break;
		case "object":
			var html = this.gui.objectTemplate(this);
			break;
		default:
			console.error("GUI level not found");
			break;
	}

	$(this.gui.selector).html(html);
}

/**
 * TODO
 */
Editor.prototype.back = function(what)
{
	if(!this.level) return;

	this.level.back();
	this.render();
}

/**
 * TODO
 */
Editor.prototype.renderGrid = function()
{
	// BG
	var canvas = document.createElement('canvas');
	canvas.width  = this.snapGrid;
	canvas.height = this.snapGrid;
	var ctx = canvas.getContext("2d");

	ctx.beginPath();
	ctx.strokeStyle = "#666666";
	ctx.lineWidth = 1;
	ctx.moveTo(0,0);
	ctx.lineTo(0,this.snapGrid);
	ctx.lineTo(this.snapGrid,this.snapGrid);
	ctx.stroke();

	this.grid   = new PIXI.extras.TilingSprite(PIXI.Texture.fromCanvas(canvas), this.snapGrid, this.snapGrid);
	this.grid.x = Common.STAGE_WIDTH/2;
	this.grid.y = Common.STAGE_HEIGHT/2;
	this.grid.anchor = new PIXI.Point(0.5, 0.5);
	this.grid.width  = Common.STAGE_WIDTH * 2;
	this.grid.height = Common.STAGE_HEIGHT * 2;
	this.addChild(this.grid);
}

/**
 * TODO
 */
Editor.prototype.newLevel = function()
{
	if(this.level != null)
	{
		this.removeChild(this.level);
	}

	var level = new Level(this);
	this.level = level;
	this.level.init();
	this.levels.push(level);
	this.addChild(this.level);

	this.render();

	// Update panMousePosition
	this.updateGridPosition();

	// Reset history
	this.historyReset();
}

/**
 * TODO
 */
Editor.prototype.getObject = function(id)
{
	for(var i = 0; i < this.config.objects.length ; i++)
	{
		if(this.config.objects[i].id == id)
		{
			return this.config.objects[i];
		}
	}

	return null;
}

/**
 * TODO
 */
// Editor.prototype.save = function()
// {
	// var json = JSON.stringify(this.level.export());
	// return json;
// }

/**
 * TODO
 */
Editor.prototype.load = function(json)
{
	var save = JSON.parse(json);

	this.newLevel();
	this.level.import(save);
	this.render();
}


// function readTextFile(file)
// {
    // var rawFile = new XMLHttpRequest();
    // rawFile.open("GET", file, false);
    // rawFile.onreadystatechange = function ()
    // {
        // if(rawFile.readyState === 4)
        // {
            // if(rawFile.status === 200 || rawFile.status == 0)
            // {
                // var allText = rawFile.responseText;
                // alert(allText);
            // }
        // }
    // }
    // rawFile.send(null);
// }

/**
 * TODO
 */
Editor.prototype.import = function()
{
	$("#level_import").replaceWith($("#level_import").val('').clone(true));
	$("#level_import").trigger("click");
}

/**
 * TODO
 */
Editor.prototype.export = function()
{
	var json = JSON.stringify(this.level.export());
	var filename = this.level.name + "_" + Math.floor(Date.now() / 1000) + ".json";

	var element = document.createElement('a');
	element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(json));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}




/**
 * TODO
 */
Editor.prototype.historyReset = function()
{
	console.info("Resetting history");
	this.history = [JSON.stringify(this.level.export())];
	this.historyIndex = 0;
}

/**
 * TODO
 */
Editor.prototype.historyAddState = function()
{
	var state = JSON.stringify(this.level.export());

	// Remove future exports
	if(this.historyIndex < this.history.length -1)
	{
		this.history.splice(this.historyIndex+1, 10000);
	}

	if(state != this.history[this.history.length-1])
	{
		this.history.push(state);
		this.historyIndex++;

		console.info("Add state %i", this.historyIndex);
	}
}

/**
 * TODO
 */
Editor.prototype.historyUndo = function()
{
	if(this.historyIndex == 0) return;

	this.historyIndex--;

	console.info("Undo state %i", this.historyIndex);
	this.historyRestore();
}

/**
 * TODO
 */
Editor.prototype.historyRedo = function()
{
	if(this.historyIndex == this.history.length-1) return;

	this.historyIndex++;

	console.info("Redo state %i", this.historyIndex);
	this.historyRestore();
}

/**
 * TODO
 */
Editor.prototype.historyRestore = function()
{
	this.level.reset();
	this.level.import(JSON.parse(this.history[this.historyIndex]));
	this.render();
}
},{"../Common":2,"../editor/Level":10,"../editor/LevelLayer":11}],10:[function(require,module,exports){
var Common     = require("../Common");
var LevelLayer = require("../editor/Editor");
var LevelLayer = require("../editor/LevelLayer");

//===================================================
// CONSTRUCTOR
//===================================================


/**
 * @constructor
 */
function Level(editor)
{
	this.editor = editor;
	this.name   = "New level";
	this.layers = [];
	this.layer  = null;

	this.lmb = false;
	this.rmb = false;
	this.dragMovement = null;

	PIXI.Container.call(this);
}
module.exports = Level;
Level.prototype = Object.create(PIXI.Container.prototype);
Level.prototype.constructor = Level;

/**
 * TODO
 */
Level.prototype.init = function()
{
	// Focus
	this.x = Common.STAGE_WIDTH/4;
	this.y = Common.STAGE_HEIGHT/2

	this.startingPoint = new PIXI.Graphics();
	this.startingPoint.beginFill(0x00ff00);
	this.startingPoint.drawCircle(0, 0, 5);
	this.startingPoint.endFill();
	this.addChild(this.startingPoint);
}

/**
 * TODO
 */
Level.prototype.reset = function()
{
	for(var i = this.children.length-1; i >= 0; i--)
	{
		this.removeChild(this.children[i]);
	}

	this.addChild(this.startingPoint);

	this.layers = [];
	this.layer  = null;
}

/**
 * TODO
 */
Level.prototype.update = function()
{
	if(this.layer != null)
	{
		this.layer.update();
	}
	else
	{
		// Right Click: move everything
		if(this.editor.mouse.rightPressed)
		{
			var mousePosition = this.editor.getMousePosition();

			if(!this.rmb)
			{
				this.rmb = true;
				this.dragMovement = new PIXI.Point(0,0);
			}
			else
			{
				// Restore the old position to make an accurate snapping
				for(var i = 0; i < this.layers.length; i++)
				{
					this.layers[i].moveAll(new PIXI.Point(-this.dragMovement.x, -this.dragMovement.y));
				}

				// Move paths and objects to the closest snap point
				var mouseMovement = this.editor.mouse.movement;
				mouseMovement.multiply(1/this.editor.scale.x);

				this.dragMovement.x += mouseMovement.x;
				this.dragMovement.y += mouseMovement.y;

				for(var i = 0; i < this.layers.length; i++)
				{
					this.layers[i].moveAll(new PIXI.Point(this.dragMovement.x, this.dragMovement.y));
					this.layers[i].render();
				}
			}
		}
		else if(this.rmb)
		{
			this.rmb = false;
			this.renderGUI();

			// Add history state
			this.editor.historyAddState();
		}
	}
}

/**
 * TODO
 */
Level.prototype.render = function()
{
	for(var i = 0; i < this.layers.length; i++)
	{
		this.layers[i].render();
	}
}

/**
 * TODO
 */
Level.prototype.renderGUI = function()
{
	if(!!this.layer)
		this.layer.renderGUI();
	else
		this.editor.renderGUI("level");
}

/**
 * TODO
 */
Level.prototype.back = function(what)
{
	if(!!this.layer)
	{
		this.layer.back();
	}
}

/**
 * TODO
 */
Level.prototype.newLayer = function(name)
{
	this.layer = new LevelLayer(this, name);
	this.layers.push(this.layer);
	this.layer.init();
	this.addChild(this.layer);
	this.selectLayer(this.layer);

	// History
	this.editor.historyAddState();
}

/**
 * TODO
 */
Level.prototype.deleteLayer = function(layer)
{
	var index = this.layers.indexOf(layer);
	if (index > -1)
	{
		this.removeChild(this.layers[index]);
		this.layers.splice(index, 1);

		// History
		this.editor.historyAddState();
	}
}

/**
 * TODO
 */
Level.prototype.selectLayer = function(layer)
{
	this.layer = layer;
	this.render();
	this.renderGUI();
}

/**
 * TODO
 */
Level.prototype.getLayerAtIndex = function(index)
{
	return !!this.layers[index] ? this.layers[index] : null
}

/**
 * TODO
 */
Level.prototype.export = function()
{
	var output =
	{
		name   : this.name,
		layers : [],
		length : this.getLength()
	}

	for(var i = 0; i < this.layers.length; i++)
	{
		output.layers.push(this.layers[i].export());
	}

	return output;
}

/**
 * TODO
 */
Level.prototype.getLength = function()
{
	for(var i = 0; i < this.layers.length; i++)
	{
		for(var o = 0; o < this.layers[i].objects.length; o++)
		{
			if(this.layers[i].objects[o].config.id == "level_end")
			{
				return  Math.round(this.layers[i].objects[o].x - this.layers[i].objects[o].width);
			}
		}
	}
	return 0;
}

/**
 * TODO
 */
Level.prototype.getBounds = function()
{
	var x0 = 0;
	var x1 = 0;
	var y0 = 0;
	var y1 = 0;


	for(var i = 0; i < this.layers.length; i++)
	{
		for(var o = 0; o < this.layers[i].paths.length; o++)
		{
			for(var p = 0; p < this.layers[i].paths[o].bezier.points.length; p++)
			{
				if(this.layers[i].paths[o].bezier.points[p].x < x0)      x0 = this.layers[i].paths[o].bezier.points[p].x;
				else if(this.layers[i].paths[o].bezier.points[p].x > x1) x1 = this.layers[i].paths[o].bezier.points[p].x;
				if(this.layers[i].paths[o].bezier.points[p].y < y0)      y0 = this.layers[i].paths[o].bezier.points[p].y;
				else if(this.layers[i].paths[o].bezier.points[p].y > y1) y1 = this.layers[i].paths[o].bezier.points[p].y;
			}
		}
	}

	return [x0, y0, x1, y1];
}

/**
 * TODO
 */
Level.prototype.setName  = function(name)
{
	name = $.trim(name);
	if(name == "") return;

	this.name = name;

	// Add history state
	this.editor.historyAddState();
}

/**
 * TODO
 */
Level.prototype.import = function(save)
{
	this.name = save.name;

	for(var i = 0; i < save.layers.length; i++)
	{
		var layer = new LevelLayer(this, "");
		layer.import(save.layers[i]);
		this.layers.push(layer);
		this.addChild(layer);
	}
}

/**
 * TODO
 */
Level.prototype.toImage = function()
{
	var bounds = this.getBounds();
	if(bounds[2] == bounds[0]) return;

	// Add some padding
	bounds[0] -= 128;
	bounds[1] -= 256;
	bounds[2] += 128;
	bounds[3] += 256;

	var width  = bounds[2]-bounds[0];
	var height = bounds[3]-bounds[1];

	// Set the scale so it doesn't exceed a certain width
	var scale = Math.min(0.5, 8000/width);

	// Render
	var renderTexture = new PIXI.RenderTexture(Common.renderer, width*scale, height*scale);

	for(var i = 0; i < this.layers.length; i++)
	{
		this.layers[i].moveAll(new PIXI.Point(-bounds[0], -bounds[1]));
		this.layers[i].scale.set(scale)
		this.layers[i].render();
	}

	renderTexture.render(this);

	for(var i = 0; i < this.layers.length; i++)
	{
		this.layers[i].moveAll(new PIXI.Point(bounds[0], bounds[1]));
		this.layers[i].scale.set(1)
		this.layers[i].render();
	}

	// Return a base64 string of the texture
	var img = renderTexture.getBase64();
	return img;
}
},{"../Common":2,"../editor/Editor":9,"../editor/LevelLayer":11}],11:[function(require,module,exports){
var Common      = require("../Common");
var Editor      = require("../editor/Editor");
var Level       = require("../editor/Level");
var LevelPath   = require("../editor/LevelPath");
var LevelObject = require("../editor/LevelObject");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function LevelLayer(level, name)
{
	this.editor  = level.editor;
	this.level   = level;
	this.name    = !!name ? name : "New layer #" + (this.level.layers.length+1);
	this.paths   = [];
	this.objects = [];
	this.depth   = 0;

	this.idObject = "";
	this.selected = null;

	this.lmb = false;
	this.rmb = false;
	this.dragMovement = null;

	PIXI.Container.call(this);
}
module.exports = LevelLayer;
LevelLayer.prototype = Object.create(PIXI.Container.prototype);
LevelLayer.prototype.constructor = LevelLayer;

/**
 * TODO
 */
LevelLayer.prototype.init = function()
{
}

/**
 * TODO
 */
LevelLayer.prototype.update = function()
{
	if(this.selected != null)
	{
		this.selected.update();
	}
	else
	{
		// Left click: select path or object
		if(this.editor.mouse.leftPressed)
		{
			var mousePosition = this.editor.getMousePosition();


			if(!this.lmb)
			{
				this.lmb = true;

				var obj = this.getObjectAtPoint(mousePosition);

				if(obj != null)
				{
					this.selectObject(obj);
				}
				else
				{
					var path = this.getPathAtPoint(mousePosition, 50);

					if(path != null)
					{
						this.selectObject(path);
					}
					else
					{
						if(this.idObject == "")
						{
							this.newPath(mousePosition);
						}
						else
						{
							this.newObject(this.idObject, mousePosition);
						}
					}
				}
			}
		}
		else if(this.lmb)
		{
			this.lmb = false;
		}

		// Right Click: move everything
		if(this.editor.mouse.rightPressed)
		{
			var mousePosition = this.editor.getMousePosition();

			if(!this.rmb)
			{
				this.rmb = true;
				this.dragMovement = new PIXI.Point(0,0);
			}
			else
			{
				// Restore the old position to make an accurate snapping
				this.moveAll(new PIXI.Point(-this.dragMovement.x, -this.dragMovement.y));

				// Move paths and objects to the closest snap point
				var mouseMovement = this.editor.mouse.movement;
				mouseMovement.multiply(1/this.editor.scale.x);

				this.dragMovement.x += mouseMovement.x;
				this.dragMovement.y += mouseMovement.y;

				this.moveAll(new PIXI.Point(this.dragMovement.x, this.dragMovement.y));

				this.render();
			}
		}
		else if(this.rmb)
		{
			this.rmb = false;

			// Add history state
			this.editor.historyAddState();
		}
	}

	var inputFocus = $("input:focus, textarea:focus").length > 0;
}

/**
 * TODO
 */
LevelLayer.prototype.render = function()
{
	// Find the minimum and maximum depth values
	var minDepth = 0;
	var maxDepth = 0;

	for(var i = 0; i < this.paths.length; i++)
	{
		this.removeChild(this.paths[i]);
		minDepth = Math.min(this.paths[i].config.depth, minDepth);
		maxDepth = Math.max(this.paths[i].config.depth, maxDepth);
	}

	for(var i = 0; i < this.objects.length; i++)
	{
		this.removeChild(this.objects[i]);
		minDepth = Math.min(this.objects[i].config.depth, minDepth);
		maxDepth = Math.max(this.objects[i].config.depth, maxDepth);
	}

	// Render the objects and paths in order
	for(var depth = minDepth; depth <= maxDepth; depth++)
	{
		for(var i = 0; i < this.paths.length; i++)
		{
			if(this.paths[i].config.depth != depth) continue;
			this.addChild(this.paths[i]);
			this.paths[i].render();
		}

		for(var i = 0; i < this.objects.length; i++)
		{
			if(this.objects[i].config.depth != depth) continue;
			this.addChild(this.objects[i]);
			this.objects[i].render();
		}
	}

	// If this is not the current layers, fade it
	if(this.level.layer != null && this.level.layer != this)
		this.alpha = 0.5;
	else
		this.alpha = 1;
}

/**
 * TODO
 */
LevelLayer.prototype.renderGUI = function()
{
	if(!!this.selected)
		this.selected.renderGUI();
	else
		this.editor.renderGUI("layer");
}

/**
 * TODO
 */
LevelLayer.prototype.back = function(what)
{
	if(!!this.selected)
		this.selected.back();
	else
	{
		this.level.layer = null;
		this.idObject = "";

		// Add history state
		this.editor.historyAddState();
	}
}

/**
 * TODO
 */
LevelLayer.prototype.setIdObject = function(id)
{
	if(this.level.layer.idObject == id) return;

	this.level.layer.idObject = id;

	// Add history state
	this.editor.historyAddState();
}

/**
 * TODO
 */
LevelLayer.prototype.selectObject = function(obj)
{
	this.selected = obj;
	this.render();
	this.renderGUI();

	// Add history state
	this.editor.historyAddState();
}

/**
 * TODO
 */
LevelLayer.prototype.newObject = function(id, point)
{
	var objDB = this.editor.getObject(id);
	if(objDB == null) return;

	// Create new object
	var obj = new LevelObject(this);
	obj.init(objDB);
	obj.x = point.x;
	obj.y = point.y;
	this.objects.push(obj);
	this.addChild(obj);

	// Select it
	this.selectObject(obj);
}

/**
 * TODO
 */
LevelLayer.prototype.newPath = function(point)
{
	// Create new path
	var path = new LevelPath(this);
	path.init();
	path.addPoint(point.x, point.y);
	this.paths.push(path);
	this.addChild(path);

	// Select it
	this.selectObject(path);

	// History
	this.editor.historyAddState();
}


/**
 * TODO
 */
LevelLayer.prototype.deleteObject = function(obj)
{
	var index = this.objects.indexOf(obj);
	if (index > -1)
	{
		this.removeChild(this.objects[index]);
		this.objects.splice(index, 1);

		// History
		this.editor.historyAddState();
	}
}

/**
 * TODO
 */
LevelLayer.prototype.deletePath = function(path)
{
	var index = this.paths.indexOf(path);
	if (index > -1)
	{
		this.removeChild(this.paths[index]);
		this.paths.splice(index, 1);

		// History
		this.editor.historyAddState();
	}
}

/**
 * TODO
 */
LevelLayer.prototype.moveAll = function(v)
{
	for(var i = 0; i < this.paths.length; i++)
	{
		this.paths[i].move
		(
			Math.round(v.x/this.editor.snapGrid) * this.editor.snapGrid,
			Math.round(v.y/this.editor.snapGrid) * this.editor.snapGrid
		)
	}

	for(var i = 0; i < this.objects.length; i++)
	{
		this.objects[i].x += Math.round(v.x/this.editor.snapGrid) * this.editor.snapGrid;
		this.objects[i].y += Math.round(v.y/this.editor.snapGrid) * this.editor.snapGrid;
	}
}


/**
 * TODO
 */
LevelLayer.prototype.getObjectAtPoint  = function(point)
{
	var obj = null;

	for(var i = this.objects.length-1; i >= 0; i--)
	{
		if(this.objects[i].isPointInside(point) && (obj == null || obj.depth < this.objects[i].depth))
		{
			obj = this.objects[i];
		}
	}

	return obj;
}

/**
 * TODO
 */
LevelLayer.prototype.getPathAtPoint  = function(point, maxDistance)
{
	var path     = null;
	var distance = null;

	/*
	if(this.wireframe)
	{
		this.removeChild(this.wireframe);
	}
	this.wireframe = new PIXI.Graphics();
	this.addChild(this.wireframe);
	*/

	for(var i = 0; i < this.paths.length; i++)
	{
		var points = this.paths[i].bezier.getDrawingPoints();

		for(var p = 0; p < points.length-1; p++)
		{
			// Segment of the bezier curve
			var segment = new PIXI.Point(points[p+1].x - points[p].x, points[p+1].y - points[p].y);

			// Normalized segment
			var segmentNormalized = new PIXI.Point(segment.x, segment.y);
			segmentNormalized.normalize();

			// Mouse vector, starts from the first point of the segment
			var vMouse = new PIXI.Point(point.x - points[p].x, point.y - points[p].y);

			// Calculate the projection of vMouse onto the segment
			var vProjLength = vMouse.dotProduct(segment) / segment.getLength();
			var vProj       = new PIXI.Point(segmentNormalized.x * vProjLength, segmentNormalized.y * vProjLength);

			// Calculate the distance
			if(((vProj.x/segment.x < 0 || vProj.x/segment.x > 1) && (vProj.x != segment.x)) || (vProj.y/segment.y < 0 || vProj.y/segment.y > 1))
			{
				// If the projection doens't end on the segment vector, calculate the distance between the segment's ends
				var v1 = new PIXI.Point(point.x - points[p].x,   point.y - points[p].y);
				var v2 = new PIXI.Point(point.x - points[p+1].x, point.y - points[p+1].y);
				var currentDistance = Math.min(v1.getLength(), v2.getLength());

				/*
				var index = v1.getLength() < v2.getLength() ? 0 : 1;
				this.wireframe.lineStyle(2, 0x00ff00, 1);
				this.wireframe.moveTo(points[p+index].x, points[p+index].y);
				this.wireframe.lineTo(x, y);
				*/
			}
			else
			{
				// Calculating the perpendicular of the segment ending on the the mouse position
				var perp  = new PIXI.Point(vMouse.x - vProj.x, vMouse.y - vProj.y);
				var currentDistance = perp.getLength();

				/*
				this.wireframe.lineStyle(2, 0x00ff00, 1);
				this.wireframe.moveTo(points[p].x + vProj.x, points[p].y + vProj.y);
				this.wireframe.lineTo(points[p].x + vProj.x + perp.x, points[p].y + vProj.y + perp.y);
				*/
			}

			if((path == null || distance > currentDistance) && (currentDistance < maxDistance))
			{
				path = this.paths[i];
				distance = currentDistance;
			}

			/*
			this.wireframe.lineStyle(2, 0xff0000, 1);
			this.wireframe.moveTo(points[p].x, points[p].y);
			this.wireframe.lineTo(points[p+1].x, points[p+1].y);
			*/
		}
	}

	return path;
}

/**
 * TODO
 */
LevelLayer.prototype.setName  = function(name)
{
	name = $.trim(name);
	if(name == "") return;

	this.name = name;

	// Add history state
	this.editor.historyAddState();
}

/**
 * TODO
 */
LevelLayer.prototype.setDepth  = function(depth)
{
	this.depth = depth;

	this.level.children.sort(function(a, b)
	{
		if(a.depth < b.depth) return -1;
		if(a.depth > b.depth) return 1;
		return 0;
	});

	this.level.layers.sort(function(a, b)
	{
		if(a.depth < b.depth) return -1;
		if(a.depth > b.depth) return 1;
		return 0;
	});

	// Add history state
	this.editor.historyAddState();
}

/**
 * TODO
 */
LevelLayer.prototype.setSelectedDepth  = function(depth)
{
	if(this.selected == null) return;

	this.selected.config.depth = depth;

	this.children.sort(function(a, b)
	{
		if(a.config.depth < b.config.depth) return -1;
		if(a.config.depth > b.config.depth) return 1;
		return 0;
	});

	this.paths.sort(function(a, b)
	{
		if(a.depth < b.depth) return -1;
		if(a.depth > b.depth) return 1;
		return 0;
	});

	this.objects.sort(function(a, b)
	{
		if(a.depth < b.depth) return -1;
		if(a.depth > b.depth) return 1;
		return 0;
	});

	// Add history state
	this.editor.historyAddState();
}

/**
 * TODO
 */
LevelLayer.prototype.export = function()
{
	var output =
	{
		name     : this.name,
		depth    : this.depth,
		paths    : [],
		objects  : [],
	}

	if(this.level.layer == this)
	{
		output.selected = true;
		output.idObject = this.idObject;
	}

	for(var i = 0; i < this.objects.length; i++)
	{
		output.objects.push(this.objects[i].export());
	}

	for(var i = 0; i < this.paths.length; i++)
	{
		output.paths.push(this.paths[i].export());
	}

	output.objects.sort(function(a, b)
	{
		if(a.x < b.x) return -1;
		if(a.x > b.x) return 1;
		return 0;
	});

	output.paths.sort(function(a, b)
	{
		if(a.bounds[0] < b.bounds[0]) return -1;
		if(a.bounds[0] > b.bounds[0]) return 1;
		return 0;
	});

	return output;
}

/**
 * TODO
 */
LevelLayer.prototype.import = function(save)
{
	this.name  = save.name;
	this.depth = save.depth;

	for(var i = 0; i < save.objects.length; i++)
	{
		var obj = new LevelObject(this);
		obj.import(save.objects[i]);
		this.objects.push(obj);
	}

	for(var i = 0; i < save.paths.length; i++)
	{
		var path = new LevelPath(this);
		path.import(save.paths[i]);
		this.paths.push(path);
	}

	if(!!save.selected)
	{
		this.level.layer = this;
		this.idObject = save.idObject;
	}
}
},{"../Common":2,"../editor/Editor":9,"../editor/Level":10,"../editor/LevelObject":12,"../editor/LevelPath":13}],12:[function(require,module,exports){
var Common     = require("../Common");
var Editor     = require("../editor/Editor");
var Level      = require("../editor/Level");
var LevelLayer = require("../editor/LevelLayer");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function LevelObject(layer)
{
	this.editor = layer.editor;
	this.layer  = layer;
	this.assetManager = p3.AssetManager.instance;

	this.config =
	{
		id       : "",
		texture  : "",
		anchor   : {x:0.5, y:0.5},
		scale    : {x:1,   y:1},
		rotation : 0,
		depth    : 0,
		data     : ""
	}

	this.sprite     = null;
	this.wireframe  = null;
	this.isDragging = false;
	this.lmb        = false;

	PIXI.Container.call(this);
}
module.exports = LevelObject;
LevelObject.prototype = Object.create(PIXI.Container.prototype);
LevelObject.prototype.constructor = LevelObject;

/**
 * TODO
 */
LevelObject.prototype.init = function(objDB)
{
	this.config.id      = objDB.id;
	this.config.texture = objDB.texture;
	this.config.anchor  = objDB.anchor;
	if(!!objDB.scale)
		this.config.scale = {x:objDB.scale, y:objDB.scale};
	if(!!objDB.data)
		this.config.data = objDB.data;
	if(!!objDB.depth)
		this.config.depth = objDB.depth;

	this.lmb = true;
	this.isDragging = true;
}

/**
 * TODO
 */
LevelObject.prototype.update = function()
{
	// Left Click
	if(this.editor.mouse.leftPressed)
	{
		var mousePosition = this.editor.getMousePosition();

		if(!this.lmb)
		{
			var mousePosition = this.editor.getMousePosition();
			var obj = this.layer.getObjectAtPoint(mousePosition);

			if(!this.isPointInside(mousePosition) && obj != this)
			{
				if(obj != null)
				{
					var obj = this.layer.getObjectAtPoint(mousePosition);
					if(obj != null)
					{
						this.layer.selectObject(obj);
						return;
					}
				}
				else
				{
					this.layer.newObject(this.config.id, mousePosition);
					return;
				}
			}
			else
			{
				this.isDragging = true;
			}

			this.lmb = true;
		}
		else
		{
			if(this.isDragging)
			{
				var mouseMovement = this.editor.mouse.movement;
				mouseMovement.multiply(1/this.editor.scale.x);

				this.x += mouseMovement.x;
				this.y += mouseMovement.y;
			}
		}
	}
	else if(this.lmb)
	{
		// End dragging
		this.lmb = false;
		this.isDragging = false;

		// History
		this.editor.historyAddState();
	}

	var inputFocus = $("input:focus, textarea:focus").length > 0;

	// Delete
	if(Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_C) && !Common.keyboard.getKeyPressed(Common.keyboard.KEY_CTRL) && !inputFocus)
	{
		$(".delete_object").trigger("click");
	}

	// Back
	if(Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_B) && !Common.keyboard.getKeyPressed(Common.keyboard.KEY_CTRL) && !inputFocus)
	{
		$(".back").trigger("click");
	}


}

/**
 * TODO
 */
LevelObject.prototype.render = function()
{
	this.rotation = this.config.rotation * PIXI.DEG_TO_RAD;
	this.scale    = new PIXI.Point(this.config.scale.x, this.config.scale.y);

	if(this.sprite != null)    this.removeChild(this.sprite);
	if(this.wireframe != null) this.removeChild(this.wireframe);

	this.sprite          = new PIXI.Sprite(this.assetManager.getTexture(this.config.texture));
	this.sprite.anchor.set(this.config.anchor.x, this.config.anchor.y);
	this.addChild(this.sprite);

	this.wireframe = new PIXI.Graphics();
	this.wireframe.lineStyle(1, 0xff0000, 1);
	this.wireframe.moveTo(- this.sprite.anchor.x * this.sprite.width,     - this.sprite.anchor.y * this.sprite.height);     // Top left
	this.wireframe.lineTo(+ (1-this.sprite.anchor.x) * this.sprite.width, - this.sprite.anchor.y * this.sprite.height);     // Top right
	this.wireframe.lineTo(+ (1-this.sprite.anchor.x) * this.sprite.width, + (1-this.sprite.anchor.y) * this.sprite.height); // Bottom right
	this.wireframe.lineTo(- this.sprite.anchor.x * this.sprite.width,     + (1-this.sprite.anchor.y) * this.sprite.height); // Bottom left
	this.wireframe.lineTo(- this.sprite.anchor.x * this.sprite.width,     - this.sprite.anchor.y * this.sprite.height);     // Top left

	this.wireframe.beginFill(0xff0000);
	this.wireframe.drawCircle(0, 0, 5);
	this.wireframe.endFill;

	this.wireframe.visible = this.layer.selected == this;

	this.addChild(this.wireframe);
}

/**
 * TODO
 */
LevelObject.prototype.renderGUI = function()
{
	this.editor.renderGUI("object");
}

/**
 * TODO
 */
LevelObject.prototype.back = function()
{
	this.layer.selected = null;

	// Add history state
	this.editor.historyAddState();
}

/**
 * TODO
 */
LevelObject.prototype.setScale = function(scale, saveState)
{
	this.config.scale.x = scale;
	this.config.scale.y = scale;
	this.scale.set(scale);
	
	// Add history state
	if(saveState)
	{
		this.editor.historyAddState();	
	}
}

/**
 * TODO
 */
LevelObject.prototype.setRotation = function(degrees, saveState)
{
	this.config.rotation = degrees;
	this.rotation = this.config.rotation * PIXI.DEG_TO_RAD;
	
	// Add history state
	if(saveState)
	{	
		this.editor.historyAddState();	
	}
}

/**
 * TODO
 */
LevelObject.prototype.setConfig = function(parameter, value, saveState)
{
	this.config[parameter] = value;

	if(saveState)
		this.editor.historyAddState();
}

/**
 * TODO
 */
LevelObject.prototype.isPointInside = function(point)
{
	var p = new PIXI.Point(point.x, point.y);

	if(this.rotation != 0)
	{
		p.rotateAround(new PIXI.Point(this.x, this.y), -this.rotation);
	}

	if(p.x < this.x - this.sprite.width  * this.scale.x * this.sprite.anchor.x)     return false;
	if(p.x > this.x + this.sprite.width  * this.scale.x * (1-this.sprite.anchor.x)) return false;
	if(p.y < this.y - this.sprite.height * this.scale.y * this.sprite.anchor.y)     return false;
	if(p.y > this.y + this.sprite.height * this.scale.y * (1-this.sprite.anchor.y)) return false;

	return true;
}

/**
 * TODO
 */
LevelObject.prototype.export = function()
{
	var output = jQuery.extend(true, {}, this.config);
	output.position = {x:Math.round(this.x), y:Math.round(this.y)};

	if(this.layer.selected == this)
	{
		output.selected = true;
	}

	return output;
}

LevelObject.prototype.import = function(save)
{
	this.x               = save.position.x;
	this.y               = save.position.y;
	this.config.id       = save.id;
	this.config.texture  = save.texture;
	this.config.anchor   = {x:save.anchor.x, y:save.anchor.y};
	this.config.scale    = {x:save.scale.x, y:save.scale.y};
	this.config.rotation = save.rotation;
	this.config.depth    = save.depth;
	this.config.data     = save.data;
	
	if(!!save.selected)
	{
		this.layer.selected = this;	
	}
}
},{"../Common":2,"../editor/Editor":9,"../editor/Level":10,"../editor/LevelLayer":11}],13:[function(require,module,exports){
var Common     = require("../Common");
var Editor     = require("../editor/Editor");
var Level      = require("../editor/Level");
var LevelLayer = require("../editor/LevelLayer");
var BezierPath = require("../editor/BezierPath");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function LevelPath(layer)
{
	this.editor = layer.editor;
	this.layer  = layer;
	this.assetManager = p3.AssetManager.instance;

	this.config =
	{
		closed            : false,
		depth             : 0,
		collisions        : 1, //0: no, 1: yes, 2: ground only
		texFill           : "theme_01_fill",
		texGround         : "theme_01_ground",
		texGroundEdge     : "theme_01_ground_edge",
		texWall           : "theme_01_wall",
		texFillPadding    : 512,
		texFillSize       : 256,
		texGroundSize     : 160,
		texGroundDelta    : 0.1,
		texWallSize       : 160,
		texWallDelta      : 0.1,
		texWallAngle      : 70,
		texGroundEdgeSide : "",
		data              : ""
	}

	this.bezier     = new BezierPath();
	this.bezier.cacheDrawingPoints = false;
	this.pointIndex = -1;

	this.wireframe = null;
	this.textures  = null;

	this.lmb = false;
	this.rmb = false;
	this.dragMovement = null;

	PIXI.Container.call(this);
}
module.exports = LevelPath;
LevelPath.prototype = Object.create(PIXI.Container.prototype);
LevelPath.prototype.constructor = LevelPath;

/**
 * TODO
 */
LevelPath.prototype.init = function()
{

}

/**
 * TODO
 */
LevelPath.prototype.update = function()
{
	// Left Click
	if(this.editor.mouse.leftPressed)
	{
		var mousePosition = this.editor.getMousePosition();

		if(!this.lmb && this.editor.mouse.leftJustPressed)
		{
			this.lmb = true;

			// Get point
			this.pointIndex = this.getPointAt(mousePosition.x, mousePosition.y);

			if(this.pointIndex == -1)
			{
				// Add new point
				var prevPoint = this.bezier.points[this.bezier.points.length-1];
				var newPoint  = mousePosition;

				if(this.config.closed || prevPoint.x < newPoint.x)
				{
					// Add point at the end if closed or open and after the last point
					this.addPoint(prevPoint.x + (newPoint.x - prevPoint.x)/2, prevPoint.y);
					this.addPoint(newPoint.x - (newPoint.x - prevPoint.x)/2, newPoint.y);
					this.addPoint(newPoint.x, newPoint.y);
					this.pointIndex = this.bezier.points.length - 1;
				}
				else
				{
					// Add point in the middle of two points if the path is open if the new position is not after the last point
					if(this.bezier.points.length > 1 && newPoint.x > this.bezier.getFirstPoint().x)
					{
						for(var i = 3; i < this.bezier.points.length; i+= 3)
						{
							if(this.bezier.points[i].x > newPoint.x)
							{
								var prevPoint = this.bezier.points[i-3];
								var nextPoint = this.bezier.points[i];

								this.addPoint(nextPoint.x - (nextPoint.x - newPoint.x)/2, newPoint.y, i-1);
								this.addPoint(newPoint.x, newPoint.y, i-1);
								this.addPoint(prevPoint.x + (newPoint.x - prevPoint.x)/2, newPoint.y, i-1);

								this.pointIndex = i;
								break;
							}
						}
					}
				}

				this.render();
			}
		}
		else if(this.lmb)
		{
			if(this.pointIndex != -1)
			{
				var moved = this.movePoint(this.pointIndex, mousePosition.x, mousePosition.y);

				if(moved)
				{
					this.render();
				}
			}
		}
	}
	else if(this.lmb)
	{
		this.lmb = false;
		this.render();

		// Add history state
		this.editor.historyAddState();
	}


	// Right Click
	if(this.editor.mouse.rightPressed)
	{
		var mousePosition = this.editor.getMousePosition();

		if(!this.rmb)
		{
			this.rmb = true;
			this.dragMovement = new PIXI.Point(0,0);
		}
		else
		{
			var mouseMovement = this.editor.mouse.movement;
			mouseMovement.multiply(1/this.editor.scale.x);

			this.move
			(
				-Math.round(this.dragMovement.x/this.editor.snapGrid) * this.editor.snapGrid,
				-Math.round(this.dragMovement.y/this.editor.snapGrid) * this.editor.snapGrid
			);

			this.dragMovement.x += mouseMovement.x;
			this.dragMovement.y += mouseMovement.y;

			this.move
			(
				Math.round(this.dragMovement.x/this.editor.snapGrid) * this.editor.snapGrid,
				Math.round(this.dragMovement.y/this.editor.snapGrid) * this.editor.snapGrid
			);

			this.render();
		}
	}
	else if(this.rmb)
	{
		this.rmb = false;

		// History
		this.editor.historyAddState();
	}

	var inputFocus = $("input:focus, textarea:focus").length > 0;

	// Delete point
	if(Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_C) && !Common.keyboard.getKeyPressed(Common.keyboard.KEY_CTRL) && !inputFocus)
	{
		if(this.pointIndex % 3 == 0 && this.bezier.points.length > 1)
		{
			var isLastPoint = this.pointIndex == (this.bezier.points.length-1);
			this.deletePoint(this.pointIndex);
			if(isLastPoint) this.pointIndex-=3;

			this.render();
		}
	}

	// Back
	if(Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_B) && !Common.keyboard.getKeyPressed(Common.keyboard.KEY_CTRL) && !inputFocus)
	{
		$(".back").trigger("click");
	}

	// Toggle wireframe
	if(Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_W) && !inputFocus)
	{
		this.wireframe.visible = !this.wireframe.visible;
	}
}

/**
 * TODO
 */
LevelPath.prototype.render = function()
{
	if(this.wireframe != null)
	{
		this.removeChild(this.wireframe);
	}

	if(this.textures != null)
	{
		this.removeChild(this.textures);
	}


	this.wireframe = new PIXI.Graphics();
	this.textures = new PIXI.Container();


	if(this.bezier.points.length > 1)
	{
		var drawingPoints = this.bezier.getDrawingPoints();
		var drawingPointsNormals = this.bezier.getDrawingPointsNormals();

		// Draw fill texture
		if(this.config.texFill != "" )
		{
			var lowerPoint = null;
			var contour = [];
			for(var i = 0; i < drawingPoints.length; i++)
			{
				contour.push(new poly2tri.Point(drawingPoints[i].x, drawingPoints[i].y));

				if(lowerPoint == null || lowerPoint < drawingPoints[i].y)
					lowerPoint = drawingPoints[i].y;
			}

			if(!this.config.closed)
			{
				contour.push({x: drawingPoints[drawingPoints.length-1].x, y: lowerPoint + this.config.texFillPadding});
				contour.push({x: drawingPoints[0].x, y: lowerPoint + this.config.texFillPadding});
			}
			else
			{
				// Remove last point if coincides with the first, otherwise the triangulation will fail
				if(contour[0].x == contour[contour.length-1].x && contour[0].y == contour[contour.length-1].y)
				{
					contour.splice(contour.length-1, 1);
				}
			}

			try
			{
				var swctx = new poly2tri.SweepContext(contour);
				swctx.triangulate();
				var triangles = swctx.getTriangles();
			}
			catch(e)
			{
				console.log("Triangulation failed")
			}


			if(!!triangles)
			{
				// Draw the filling mesh
				var texture    = this.assetManager.getTexture(this.config.texFill);
				var vertices   = new Float32Array(6 * triangles.length);
				var uvs        = new Float32Array(6 * triangles.length);
				var indices    = new Uint16Array(3 * triangles.length);

				var size = this.config.texFillSize;

				for(var i = 0; i < triangles.length; i++)
				{
					var points = triangles[i].getPoints();

					vertices.set(
					[
						points[0].x, points[0].y,
						points[1].x, points[1].y,
						points[2].x, points[2].y
					], i*6)

					uvs.set(
					[
						points[0].x/size, points[0].y/size,
						points[1].x/size, points[1].y/size,
						points[2].x/size, points[2].y/size
					], i * 6);

					indices.set([0 + 3*i, 1 + 3*i, 2 + 3*i], i * 3);

					// Wireframe
					/*
					this.wireframe.lineStyle(1, 0x00ff00, 0.5);
					var points = triangles[i].getPoints();

					this.wireframe.moveTo(points[0].x, points[0].y);
					for(var p = 1; p < points.length; p++)
					{
						this.wireframe.lineTo(points[p].x, points[p].y);
					}
					this.wireframe.lineTo(points[0].x, points[0].y);
					*/
				}

				var mesh = new PIXI.mesh.Mesh
				(
					texture,
					vertices,
					uvs,
					indices,
					PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES
				);

				/*
				var shader = new PIXI.AbstractFilter('',
				[
					'precision mediump float;',

					'varying vec2 vTextureCoord;',
					'uniform sampler2D uSampler;',
					'uniform vec4 uUVS;',

					'void main(void)',
					'{',
						'vec2 coords = vTextureCoord;',
						// 'coords.x = uUVS.x + coords.x * (uUVS.z - uUVS.x);',
						// 'coords.y = uUVS.y + coords.y * (uUVS.w - uUVS.y);',
						'gl_FragColor = texture2D(uSampler, coords);',
						'gl_FragColor.r = coords.x;',
						'gl_FragColor.g = coords.y;',
					'}',
				].join('\n'),
				{
					uUVS : {type: '4fv', value : [texture._uvs.x0, texture._uvs.y0, texture._uvs.x1, texture._uvs.y1]}
				});
				mesh.filters = [shader];
				*/

				this.textures.addChild(mesh);
			}
		}


		// Draw the inclined terrain
		if(this.config.texWall != "")
		{
			var segments       = this.bezier.getGroundSegments(this.config.texWallAngle, 360);
			var textureSize    = this.config.texWallSize;
			var textureTopPerc = this.config.texWallDelta

			var segmentsSize = 0;
			for(var s = 0; s < segments.length; s++)
			{
				segmentsSize += segments[s].points.length-1;
			}

			var texture    = this.assetManager.getTexture(this.config.texWall);
			var vertices   = new Float32Array(8 * segmentsSize);
			var uvs        = new Float32Array(8 * segmentsSize);
			var indices    = new Uint16Array(6 * segmentsSize);
			var arrayIndex = 0;

			for(var s = 0; s < segments.length; s++)
			{
				var totalLength  = 0;
				var segmentLength = 0;

				for(var i = 0; i < segments[s].normals.length -1; i++)
				{
					vertices.set(
					[
							segments[s].points[i].x   - segments[s].normals[i].x   * (textureSize * textureTopPerc),     segments[s].points[i].y   - segments[s].normals[i].y   * (textureSize * textureTopPerc),
							segments[s].points[i+1].x - segments[s].normals[i+1].x * (textureSize * textureTopPerc),     segments[s].points[i+1].y - segments[s].normals[i+1].y * (textureSize * textureTopPerc),
							segments[s].points[i+1].x + segments[s].normals[i+1].x * (textureSize * (1-textureTopPerc)), segments[s].points[i+1].y + segments[s].normals[i+1].y * (textureSize * (1-textureTopPerc)),
							segments[s].points[i].x   + segments[s].normals[i].x   * (textureSize * (1-textureTopPerc)), segments[s].points[i].y   + segments[s].normals[i].y   * (textureSize * (1-textureTopPerc))
					], arrayIndex*8)

					var v = new PIXI.Point(segments[s].points[i].x  - segments[s].points[i+1].x, segments[s].points[i].y - segments[s].points[i+1].y);
					segmentLength = v.getLength();

					uvs.set(
					[
						totalLength/textureSize, 0,
						(totalLength+segmentLength)/textureSize, 0,
						(totalLength+segmentLength)/textureSize, 1,
						totalLength/textureSize, 1
					], arrayIndex * 8);


					indices.set(
					[
						0 + 4*arrayIndex,
						1 + 4*arrayIndex,
						2 + 4*arrayIndex,
						0 + 4*arrayIndex,
						2 + 4*arrayIndex,
						3 + 4*arrayIndex
					], arrayIndex * 6);

					totalLength += segmentLength;

					// Wireframe
					this.wireframe.lineStyle(1, 0x00ff00, 0.5);
					this.wireframe.moveTo(vertices[arrayIndex*8+0*2], vertices[arrayIndex*8+0*2+1]); // 0
					this.wireframe.lineTo(vertices[arrayIndex*8+1*2], vertices[arrayIndex*8+1*2+1]); // 1
					this.wireframe.lineTo(vertices[arrayIndex*8+2*2], vertices[arrayIndex*8+2*2+1]); // 2
					this.wireframe.lineTo(vertices[arrayIndex*8+3*2], vertices[arrayIndex*8+3*2+1]); // 3
					this.wireframe.lineTo(vertices[arrayIndex*8+0*2], vertices[arrayIndex*8+0*2+1]); // 0
					this.wireframe.lineTo(vertices[arrayIndex*8+2*2], vertices[arrayIndex*8+2*2+1]); // 2

					arrayIndex++;
				}
			}

			var mesh = new PIXI.mesh.Mesh
			(
				texture,
				vertices,
				uvs,
				indices,
				PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES
			);

			this.textures.addChild(mesh);
		}

		// Draw the terrain
		var segments       = this.bezier.getGroundSegments(0, this.config.texWallAngle, this.config.texGroundEdge == "");
		var textureSizeOr  = this.config.texGroundSize;
		var textureTopPerc = this.config.texGroundDelta

		if(this.config.texGround != "")
		{
			var segmentsSize = 0;
			for(var s = 0; s < segments.length; s++)
			{
				segmentsSize += segments[s].points.length-1;
			}

			var texture    = this.assetManager.getTexture(this.config.texGround);
			var vertices   = new Float32Array(8 * segmentsSize);
			var uvs        = new Float32Array(8 * segmentsSize);
			var indices    = new Uint16Array(6 * segmentsSize);
			var arrayIndex = 0;

			for(var s = 0; s < segments.length; s++)
			{
				// Make the normals perpendicular if the left/right-most segments don't have a cap
				if(s == 0 && (this.config.texGroundEdgeSide == "right" || this.config.texGroundEdgeSide == "none"))
					segments[s].normals[0] = {x:0, y:1};
				if(s == segments.length-1 && (this.config.texGroundEdgeSide == "left" || this.config.texGroundEdgeSide == "none"))
					segments[s].normals[segments[s].normals.length-1] = {x:0, y:1};

				// Calculate the total length of the segment
				var segmentLength  = 0;

				for(var i = 0; i < segments[s].normals.length -1; i++)
				{
					var v = new PIXI.Point(segments[s].points[i].x  - segments[s].points[i+1].x, segments[s].points[i].y - segments[s].points[i+1].y);
					segmentLength += v.getLength();
				}

				// Count how many times the texture can fit in the segment length, then round it to adjust the texture size
				var textureSize = segmentLength/ Math.max(1, Math.round(segmentLength / textureSizeOr));

				// Draw the segment
				var totalLength   = 0;
				var segmentLength = 0;

				for(var i = 0; i < segments[s].normals.length -1; i++)
				{
					vertices.set(
					[
							segments[s].points[i].x   - segments[s].normals[i].x   * (textureSize * textureTopPerc),     segments[s].points[i].y   - segments[s].normals[i].y   * (textureSizeOr * textureTopPerc),
							segments[s].points[i+1].x - segments[s].normals[i+1].x * (textureSize * textureTopPerc),     segments[s].points[i+1].y - segments[s].normals[i+1].y * (textureSizeOr * textureTopPerc),
							segments[s].points[i+1].x + segments[s].normals[i+1].x * (textureSize * (1-textureTopPerc)), segments[s].points[i+1].y + segments[s].normals[i+1].y * (textureSizeOr * (1-textureTopPerc)),
							segments[s].points[i].x   + segments[s].normals[i].x   * (textureSize * (1-textureTopPerc)), segments[s].points[i].y   + segments[s].normals[i].y   * (textureSizeOr * (1-textureTopPerc))
					], arrayIndex*8)

					var v = new PIXI.Point(segments[s].points[i].x  - segments[s].points[i+1].x, segments[s].points[i].y - segments[s].points[i+1].y);
					segmentLength = v.getLength();

					uvs.set(
					[
						totalLength/textureSize, 0,
						(totalLength+segmentLength)/textureSize, 0,
						(totalLength+segmentLength)/textureSize, 1,
						totalLength/textureSize, 1
					], arrayIndex * 8);


					indices.set(
					[
						0 + 4*arrayIndex,
						1 + 4*arrayIndex,
						2 + 4*arrayIndex,
						0 + 4*arrayIndex,
						2 + 4*arrayIndex,
						3 + 4*arrayIndex
					], arrayIndex * 6);

					totalLength += segmentLength;

					// Wireframe
					this.wireframe.lineStyle(1, 0x00ff00, 0.5);
					this.wireframe.moveTo(vertices[arrayIndex*8+0*2], vertices[arrayIndex*8+0*2+1]); // 0
					this.wireframe.lineTo(vertices[arrayIndex*8+1*2], vertices[arrayIndex*8+1*2+1]); // 1
					this.wireframe.lineTo(vertices[arrayIndex*8+2*2], vertices[arrayIndex*8+2*2+1]); // 2
					this.wireframe.lineTo(vertices[arrayIndex*8+3*2], vertices[arrayIndex*8+3*2+1]); // 3
					this.wireframe.lineTo(vertices[arrayIndex*8+0*2], vertices[arrayIndex*8+0*2+1]); // 0
					this.wireframe.lineTo(vertices[arrayIndex*8+2*2], vertices[arrayIndex*8+2*2+1]); // 2

					arrayIndex++;
				}
			}

			var mesh = new PIXI.mesh.Mesh
			(
				texture,
				vertices,
				uvs,
				indices,
				PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES
			);

			this.textures.addChild(mesh);
		}

		// Draw the terrain edges
		if(this.config.texGroundEdge != "")
		{
			var texture    = this.assetManager.getTexture(this.config.texGroundEdge);
			var vertices   = new Float32Array(2 * 8 * segments.length);
			var uvs        = new Float32Array(2 * 8 * segments.length);
			var indices    = new Uint16Array (2 * 6 * segments.length);

			for(var s = 0; s < segments.length; s++)
			{
				// Calculate the total length of the segment
				var segmentLength  = 0;

				for(var i = 0; i < segments[s].normals.length -1; i++)
				{
					var v = new PIXI.Point(segments[s].points[i].x  - segments[s].points[i+1].x, segments[s].points[i].y - segments[s].points[i+1].y);
					segmentLength += v.getLength();
				}

				// Count how many times the texture can fit in the segment length, then round it to adjust the texture size
				var textureSize = segmentLength/ Math.round(segmentLength / textureSizeOr);

				// Left edge
				if(s > 0 || (this.config.texGroundEdgeSide == "left" || this.config.texGroundEdgeSide == ""))
				{
					var p = segments[s].points[0];
					var n = segments[s].normals[0];
					var v = new PIXI.Point(segments[s].points[0].x - segments[s].points[1].x, segments[s].points[0].y - segments[s].points[1].y);
					v.normalize();

					vertices.set(
					[
						p.x - n.x * (textureSize * textureTopPerc) +(v.x * textureSize),     p.y - n.y * (textureSizeOr * textureTopPerc     -(v.y * textureSizeOr)),
						p.x - n.x * (textureSize * textureTopPerc),                          p.y - n.y * (textureSizeOr * textureTopPerc),
						p.x + n.x * (textureSize * (1-textureTopPerc)),                      p.y + n.y * (textureSizeOr * (1-textureTopPerc)),
						p.x + n.x * (textureSize * (1-textureTopPerc)) +(v.x * textureSize), p.y + n.y * (textureSizeOr * (1-textureTopPerc) +(v.y * textureSizeOr))
					], s*8*2);

					uvs.set(
					[
						0, 0,
						1, 0,
						1, 1,
						0, 1
					], s*8*2);

					indices.set(
					[
						0 + (s*2) *4,
						1 + (s*2) *4,
						2 + (s*2) *4,
						0 + (s*2) *4,
						2 + (s*2) *4,
						3 + (s*2) *4
					], s*6*2);

					// Wireframe
					this.wireframe.lineStyle(1, 0x00ff00, 0.5);
					this.wireframe.moveTo(vertices[s*2*8+0*2], vertices[s*2*8+0*2+1]); // 0
					this.wireframe.lineTo(vertices[s*2*8+1*2], vertices[s*2*8+1*2+1]); // 1
					this.wireframe.lineTo(vertices[s*2*8+2*2], vertices[s*2*8+2*2+1]); // 2
					this.wireframe.lineTo(vertices[s*2*8+3*2], vertices[s*2*8+3*2+1]); // 3
					this.wireframe.lineTo(vertices[s*2*8+0*2], vertices[s*2*8+0*2+1]); // 0
					this.wireframe.lineTo(vertices[s*2*8+2*2], vertices[s*2*8+2*2+1]); // 2
				}

				// Right edge
				if(s < segments.length-1 || (this.config.texGroundEdgeSide == "right" || this.config.texGroundEdgeSide == ""))
				{
					var l = segments[s].normals.length-1;
					var p = segments[s].points[segments[s].normals.length-1];
					var n = segments[s].normals[segments[s].normals.length-1];
					var v = new PIXI.Point(segments[s].points[l].x - segments[s].points[l-1].x, segments[s].points[l].y - segments[s].points[l-1].y);
					v.normalize();

					vertices.set(
					[
						p.x - n.x * (textureSize * textureTopPerc) +(v.x * textureSize),     p.y - n.y * (textureSizeOr * textureTopPerc -(v.y * textureSizeOr)),
						p.x - n.x * (textureSize * textureTopPerc),                          p.y - n.y * (textureSizeOr * textureTopPerc),
						p.x + n.x * (textureSize * (1-textureTopPerc)),                      p.y + n.y * (textureSizeOr * (1-textureTopPerc)),
						p.x + n.x * (textureSize * (1-textureTopPerc)) +(v.x * textureSize), p.y + n.y * (textureSizeOr * (1-textureTopPerc)+(v.y * textureSizeOr))
					], (s*2+1)*8);

					uvs.set(
					[
						0, 0,
						1, 0,
						1, 1,
						0, 1
					], (s*2+1)*8);

					indices.set(
					[
						0 + (s*2+1) *4,
						1 + (s*2+1) *4,
						2 + (s*2+1) *4,
						0 + (s*2+1) *4,
						2 + (s*2+1) *4,
						3 + (s*2+1) *4
					], (s*2+1)*6);

					// Wireframe
					this.wireframe.lineStyle(1, 0x00ff00, 0.5);
					this.wireframe.moveTo(vertices[(s*2+1)*8+0*2], vertices[(s*2+1)*8+0*2+1]); // 0
					this.wireframe.lineTo(vertices[(s*2+1)*8+1*2], vertices[(s*2+1)*8+1*2+1]); // 1
					this.wireframe.lineTo(vertices[(s*2+1)*8+2*2], vertices[(s*2+1)*8+2*2+1]); // 2
					this.wireframe.lineTo(vertices[(s*2+1)*8+3*2], vertices[(s*2+1)*8+3*2+1]); // 3
					this.wireframe.lineTo(vertices[(s*2+1)*8+0*2], vertices[(s*2+1)*8+0*2+1]); // 0
					this.wireframe.lineTo(vertices[(s*2+1)*8+2*2], vertices[(s*2+1)*8+2*2+1]); // 2
				}
			}

			var mesh = new PIXI.mesh.Mesh
			(
				texture,
				vertices,
				uvs,
				indices,
				PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES
			);
			this.textures.addChild(mesh);
		}
	}

	// Draw bezier
	this.wireframe.moveTo(this.bezier.points[0].x, this.bezier.points[0].y);
	this.wireframe.lineStyle(2, 0xff0000);
	for(var i = 1; i < this.bezier.points.length; i +=3)
	{
		this.wireframe.bezierCurveTo(this.bezier.points[i].x, this.bezier.points[i].y, this.bezier.points[i+1].x, this.bezier.points[i+1].y, this.bezier.points[i+2].x, this.bezier.points[i+2].y);
	}

	// Draw ancors
	this.wireframe.lineStyle(2, 0x990000, 0.5);
	for(var i = 0; i < this.bezier.points.length-1; i += 3)
	{
		this.wireframe.moveTo(this.bezier.points[i].x, this.bezier.points[i].y);
		this.wireframe.lineTo(this.bezier.points[i+1].x, this.bezier.points[i+1].y);

		this.wireframe.moveTo(this.bezier.points[i+2].x, this.bezier.points[i+2].y);
		this.wireframe.lineTo(this.bezier.points[i+3].x, this.bezier.points[i+3].y);
	}

	// Draw main points
	for(var i = 0; i < this.bezier.points.length; i ++)
	{
		if(i%3 != 0) continue;

		if(i == this.pointIndex)
			this.wireframe.lineStyle(2, 0x00ff00 , 1);
		else
			this.wireframe.lineStyle(0, 0xff0000, 0);

		this.wireframe.beginFill(0xff0000);
		this.wireframe.drawCircle(this.bezier.points[i].x,  this.bezier.points[i].y, 5);
		this.wireframe.endFill();
	}

	// Draw anchor points
	for(var i = 0; i < this.bezier.points.length; i ++)
	{
		if(i%3 == 0) continue;

		if(i == this.pointIndex)
			this.wireframe.lineStyle(2, 0x00ff00 , 1);
		else
			this.wireframe.lineStyle(0, 0xff0000, 0);

		this.wireframe.beginFill(0x990099);
		this.wireframe.drawCircle(this.bezier.points[i].x,  this.bezier.points[i].y, 3);
		this.wireframe.endFill();
	}

	this.addChild(this.textures);
	this.addChild(this.wireframe);

	// Status
	this.wireframe.visible = this.layer.selected == this;
}

/**
 * TODO
 */
LevelPath.prototype.renderGUI = function()
{
	this.editor.renderGUI("path");
}

/**
 * TODO
 */
LevelPath.prototype.back = function()
{
	this.layer.selected = null;

	if(this.bezier.points.length <= 1)
	{
		this.layer.deletePath(this);
	}

	// Reset history
	this.editor.historyAddState();
}


/**
 * TODO
 */
LevelPath.prototype.addPoint = function(x, y, index)
{
	x = Math.round(x/this.editor.snapGrid) * this.editor.snapGrid;
	y = Math.round(y/this.editor.snapGrid) * this.editor.snapGrid;
	this.bezier.addPoint(x,y,index);
}

/**
 * TODO
 */
LevelPath.prototype.deletePoint = function(index)
{
	var firstPoint = index == 0;
	var lastPoint  = index == this.bezier.points.length-1;

	if(firstPoint)
	{
		this.bezier.deletePoint(index+2);
	}

	if(!lastPoint)
	{
		this.bezier.deletePoint(index+1);
	}

	this.bezier.deletePoint(index);

	if(!firstPoint)
	{
		this.bezier.deletePoint(index-1);
	}

	if(lastPoint)
	{
		this.bezier.deletePoint(index-2);
	}
}

/**
 * TODO
 */
LevelPath.prototype.movePoint = function(index, x, y)
{
	var oldPosition = new PIXI.Point(this.bezier.points[index].x, this.bezier.points[index].y);

	this.bezier.points[index].x = Math.round(x/this.editor.snapGrid) * this.editor.snapGrid;
	this.bezier.points[index].y = Math.round(y/this.editor.snapGrid) * this.editor.snapGrid;

	// Not moved
	if(this.bezier.points[index].x == oldPosition.x && this.bezier.points[index].y == oldPosition.y) return false;

	// Move the handles if main point
	if(index % 3 == 0)
	{
		if(index > 0)
		{
			this.bezier.points[index-1].x += this.bezier.points[index].x - oldPosition.x;
			this.bezier.points[index-1].y += this.bezier.points[index].y - oldPosition.y;
		}

		if(index < this.bezier.points.length-1)
		{
			this.bezier.points[index+1].x += this.bezier.points[index].x - oldPosition.x;
			this.bezier.points[index+1].y += this.bezier.points[index].y - oldPosition.y;
		}
	}

	return true;
}

/**
 * TODO
 */
LevelPath.prototype.getPointAt = function(x, y)
{
	x = Math.round(x/this.editor.snapGrid) * this.editor.snapGrid;
	y = Math.round(y/this.editor.snapGrid) * this.editor.snapGrid;

	// Check anchor points first
	for(var i = this.bezier.points.length-1; i >= 0; i--)
	{
		if(i%3 == 0) continue;
		if(this.bezier.points[i].x == x && this.bezier.points[i].y == y) return i;
	}

	// If no anchor points have been found look at the main points
	for(var i = this.bezier.points.length-1; i >= 0; i--)
	{
		if(i%3 != 0) continue;
		if(this.bezier.points[i].x == x && this.bezier.points[i].y == y) return i;
	}

	return -1;
}

/**
 * TODO
 */
LevelPath.prototype.move = function(x, y)
{
	for(var i = 0; i < this.bezier.points.length; i++)
	{
		this.bezier.points[i].x += x;
		this.bezier.points[i].y += y;
	}
}

/**
 * TODO
 */
LevelPath.prototype.setConfig = function(parameter, value, saveState)
{
	this.config[parameter] = value;

	if(saveState)
		this.editor.historyAddState();
}

/**
 * TODO
 */
LevelPath.prototype.export = function()
{
	var output      = jQuery.extend(true, {}, this.config);
	output.points   = this.bezier.points;
	output.bounds   = [null, null];

	for(var i = 0; i < this.bezier.points.length; i++)
	{
		output.bounds[0] = output.bounds[0] === null ? this.bezier.points[i].x : Math.min(output.bounds[0], this.bezier.points[i].x);
		output.bounds[1] = output.bounds[1] === null ? this.bezier.points[i].x : Math.max(output.bounds[1], this.bezier.points[i].x);
	}

	if(this.layer.selected == this)
	{
		output.selected = true;
		output.pointIndex = this.pointIndex;
	}

	return output;
}


/**
 * TODO
 */
LevelPath.prototype.import = function(save)
{
	this.config.closed            = save.closed;
	this.config.depth             = save.depth;
	this.config.collisions        = save.collisions;
	this.config.texFill           = save.texFill;
	this.config.texGround         = save.texGround;
	this.config.texGroundEdge     = save.texGroundEdge;
	this.config.texGroundEdgeSide = save.texGroundEdgeSide;
	this.config.texWall           = save.texWall;
	this.config.texFillPadding    = save.texFillPadding;
	this.config.texFillSize       = save.texFillSize;
	this.config.texGroundSize     = save.texGroundSize;
	this.config.texGroundDelta    = save.texGroundDelta;
	this.config.texWallSize       = save.texWallSize;
	this.config.texWallDelta      = save.texWallDelta;
	this.config.texWallAngle      = save.texWallAngle;
	this.config.data              = save.data;

	if(!!save.selected)
	{
		this.layer.selected = this;
		this.pointIndex = save.pointIndex;
	}

	for(var i = 0; i < save.points.length; i++)
	{
		this.bezier.addPoint(save.points[i].x, save.points[i].y);
	}
}
},{"../Common":2,"../editor/BezierPath":8,"../editor/Editor":9,"../editor/Level":10,"../editor/LevelLayer":11}],14:[function(require,module,exports){
var Common         = require("../Common");
var RunningEntity  = require("./RunningEntity");
var Emitter        = require("../general/Emitter");
var SoundSFX       = require("../general/SoundSFX");
var ObjectAxe       = require("../game/ObjectAxe");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function Avatar()
{
	RunningEntity.call(this, "avatar");

	this.level               = null;
	this.allowPathCollisions = true;

	this.spineData = Common.characterAnimationData.char_female;
	this.currentAnimation	= "";
	this.spineSpeed = 1;

	this._characterData = this._assetManager.getJSON("config").characters[Common.savedData.character];
	this._powerupsData  = this._assetManager.getJSON("config").powerups;

	this.config =
	{
		depth : 0,
	}

	this.abilities =
	{
		doubleJump      : false,
		bridge          : false,
		slash           : false,
		shrink          : false,
		invulnerability : false
	}

	this.areInputActive = true;

	this.isDead     = false;
	this.isImmortal = false;
	this.isGrounded = false;
	this.velocity   = new p3.Vector2(0.0, 0.0);

	this.jumpTime              = 0.45;
	this.jumpHeightMin         = 125;
	this.jumpHeight            = 300;
	this.doubleJumpHeightMin   = 100;
	this.doubleJumpHeight      = 200;
	this.jumpSlopeAngleMax     = 65;

	this.runSpeedMin           = 600.0;
	this.runSpeedMax           = 900.0;
	this.slidingSpeedMax       = 1200.0;
	this.accelerationSliding   = 350;
	this.accelerationSlopeDown = 100;
	this.accelerationSlopeUp   = -500;
	this.accelerationNormal    = -200;
	this.runSpeed              = this.runSpeedMin;

	this.fallTime              = 0;
	this.fallTimeToLand        = 0.7;

	this.isSliding             = false;
	this.timeUnsliding         = 0;
	this.timeUnslidingEnd      = 0.4;
	this.slidingAngleStart     = 35;
	this.slidingAngleEnd       = 15;
	this.slidingSFX            = null;

	this.canTumble             = false;
	this.isTumbling            = false;
	this.tumbleSpeed           = 0;
	this.tumbleSpeedMin        = 180;
	this.tumbleSpeedMax        = 720;
	this.tumbleSpeedTime       = 0.4;
	this.tumbleAngle           = 0;
	this.tumbleSpeedYStart     = 0; // The vertical speed at which the tumbling starts
	this.tumbleDeathAngle      = {min:130, max:130}; // Disabled because it's too hard, poor things

	this.canCreateBridge       = false;
	this.ignoreArtificialPaths = false;

	this.isSlashing            = false;
	this.slashTime             = 0;
	this.slashTimeMax          = 1.5;
	this.slashSFX              = null;
	this.axe                   = null;

	this.isShrinking              = false;
	this.isUnshrinking            = false;
	this.shrinkTime               = 0;
	this.shrinkTimeMax            = 5;
	this.shrinkTransitionTime     = 0.25;
	this.isShrinkLocked           = false;
	this.positionCache            = [];
	this.shrinkPieceDelay         = 0.075;
	this.shrinkPieceRotationSpeed = 1440;

	this.isInvulnerable           = false;
	this.invulnerabilityTime      = 0;
	this.invulnerabilityTimeMax   = 1.5;

	this.isRidingVehicle       = false;
	this.vehicle               = null;

	this.runUpAngle            = -50;
	this.runDownAngle          = 10;

	this.rotation              = 0;
	this.angleTarget           = 0;
	this.angleSpeed            = 0.1;

	this.headbobTime           = 0;
	this.headbobFrequency      = 11;
	this.headbobHeight         = 15;

	this.collisionCircleRadius = 55;
	this.pickupCircle          = null;
	this.pickupCircleRadius    = 70;
	this.axeCircle             = null;

	this.isTrollMagic       = false;
	this.trollMagicTime     = 0;
	this.trollMagicDuration = 10;

	this.focusPointLand        = {point: new PIXI.Point(0.30, 0.60), time : 1.4, delay: 0};
	this.focusPointJump        = {point: new PIXI.Point(0.32, 0.45), time : 0.4, delay: 0};
	this.focusPointFall        = {point: new PIXI.Point(0.32, 0.35), time : 0.4, delay: 0.1};
	this.focusPointTumble      = {point: new PIXI.Point(0.32, 0.25), time : 0.4, delay: 0};
	this.focusPointSlide       = {point: new PIXI.Point(0.28, 0.50), time : 1, delay: 0};
	this.focusPointDeath       = {point: new PIXI.Point(0.4, 0.60),  time : 2, delay: 0};
	this.zoomSlide             = {zoom:-0.25, time: 1};
	this.zoomSlideEnd          = {zoom:0,     time: 1.5};
	this.zoomDeath             = {zoom:+0.4,  time: 2};

	this.kJumpStart            = false;
	this.kJumpPressed          = false;
	this.kJumpEnd              = false;
	this.kAbility              = false;

	this.snowTrailPS           = null;
	this.doubleJumpPS          = null;
	this.trollMagicPS          = null;
	this.bridgeFailMagicPS     = null;

	this.walkLoop = "";
}
module.exports = Avatar;
Avatar.prototype = Object.create(RunningEntity.prototype);
Avatar.prototype.constructor = Avatar;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 * Init
 */
Avatar.prototype.init = function(level)
{
	this.level = level;

	this.initCharacter(Common.savedData.character);

	this.zoomSlide.zoom    += this.level.defaultZoom;
	this.zoomSlideEnd.zoom += this.level.defaultZoom;
	this.zoomDeath.zoom    += this.level.defaultZoom;

	// Collision mask
	this.collisionCircle   = new PIXI.Circle(0, 0, this.collisionCircleRadius);
	this.pickupCircle      = new PIXI.Circle(-20, -20, this.pickupCircleRadius);
	this.axeCircle         = new PIXI.Circle(40, -30, 110);

	// Jump
	this.jumpSpeed     = (2 * this.jumpHeight) / this.jumpTime;
	this.gravity       = this.jumpSpeed/this.jumpTime;
	this.jumpTimeMin   = Math.sqrt(2 * this.jumpHeightMin/this.gravity);
	this.jumpSpeedMin  = this.gravity * this.jumpTimeMin;

	this.doubleJumpTimeMin  = Math.sqrt(2 * this.doubleJumpHeightMin/this.gravity);
	this.doubleJumpSpeedMin = this.gravity * this.doubleJumpTimeMin;
	this.doubleJumpTime     = Math.sqrt(2 * this.doubleJumpHeight/this.gravity);
	this.doubleJumpSpeed    = this.gravity * this.doubleJumpTime;

	// Animations
	this.animationHolder = new PIXI.Container();
	this.addChild(this.animationHolder);

	// Spine
	this.spine = new PIXI.spine.Spine(this.spineData);
	this.spine.skeleton.setToSetupPose();
	this.spine.skeleton.setSkin(null);
	this.spine.skeleton.setSkinByName(Common.savedData.character);
	this.spine.x = 0;
	this.spine.y = this.collisionCircle.radius;
	this.spine.autoUpdate = false;
	this.spine.scale.set(0.5);
	this.animationHolder.addChild(this.spine);
	this.setAnimation('fall', true);

    var animations =
	[
		'run_flat',
		'run_flat_magic',
		'run_up2',
		'run_down',
		'run_down_steep',
		'slide_down_steep',
		'slide_down_exit',
		'jump_normal',
		'jump_double',
		'jump_tuck2',
		'fall',
		'land',
		'land_bad',
		'ride_sven',
		'ride_sven_fall',
		'ride_sled',
		'ride_sled_down',
		'run_roll',
		'run_down_steep_rolling_ball'
	];

	for(var i = 0; i < animations.length; i++)
	{
		var found = false;
		for(var t = 0; t < this.spine.spineData.animations.length; t++)
		{
			if(this.spine.spineData.animations[t].name == animations[i])
			{
				found = true;
				break;
			}
		}

		if(!found)
		{
			console.info("Animation %s missing", animations[i]);
			animations.splice(i,1);
			i--;
			continue;
		}
	}

	for(var i = 0; i < animations.length; i++)
	{
		for(var j = 0; j < animations.length; j++)
		{
			if(i == j) continue;

			if(animations[i] == "jump_tuck2" || animations[j] == "land_bad" || animations[j] == "jump_double" || (animations[j] == "run_flat_magic" && this.isKristoff()))
				this.spine.stateData.setMixByName(animations[i], animations[j], 0.1);
			else if(animations[j] == "land")
				this.spine.stateData.setMixByName(animations[i], animations[j], 0);
			else
				this.spine.stateData.setMixByName(animations[i], animations[j], 0.2);
        }
    }

	// Particles
	this.snowTrailPS = new cloudkid.Emitter(this.level,
	[
		this._assetManager.getTexture("particle_snowflake_00"),
		this._assetManager.getTexture("particle_snowflake_01"),
		this._assetManager.getTexture("particle_snowflake_02"),
		this._assetManager.getTexture("particle_snowflake_03")
	], this._assetManager.getJSON("particle_snow_emitter_v1"));
	this.snowTrailPS.emit = false;

	if(this.level.debug)
	{
		this._particleOrigin = new PIXI.Graphics();
		this._particleOrigin.beginFill(0xff0000);
		this._particleOrigin.drawCircle(0, 0, 4);
		this._particleOrigin.endFill();
		this.addChild(this._particleOrigin);
	}

	this.doubleJumpPS = new cloudkid.Emitter(this.level,
	[
		this._assetManager.getTexture("particle_snowflake_00"),
		this._assetManager.getTexture("particle_snowflake_01"),
		this._assetManager.getTexture("particle_snowflake_02"),
		this._assetManager.getTexture("particle_snowflake_03")
	], this._assetManager.getJSON("particle_doublejump"));
	this.doubleJumpPS.emit = false;

	this.bridgeFailMagicPS = new cloudkid.Emitter(this.level,
	[
		this._assetManager.getTexture("particle_snowflake_00"),
		this._assetManager.getTexture("particle_snowflake_01"),
		this._assetManager.getTexture("particle_snowflake_02"),
		this._assetManager.getTexture("particle_snowflake_03")
	], this._assetManager.getJSON("particle_doublejump"));
	this.bridgeFailMagicPS.emit = false;

	this.trollMagicPS = new cloudkid.Emitter(this.level,
	[
		this._assetManager.getTexture("particle_sparkle_offset_00"),
		this._assetManager.getTexture("particle_sparkle_offset_01"),
		this._assetManager.getTexture("particle_sparkle_offset_02"),
		this._assetManager.getTexture("particle_sparkle_offset_03")
	], this._assetManager.getJSON("particle_magic_trail"));
	this.trollMagicPS.emit = false;

	// Debug
	if(this.level.debug)
	{
		this.drawCollision();

		var pickupCollisionCircle = new PIXI.Graphics();
		this.addChild(pickupCollisionCircle);
		pickupCollisionCircle.lineStyle(1, 0xF7111D);
		pickupCollisionCircle.drawCircle(0, 0, this.pickupCircle.radius);
		pickupCollisionCircle.x = this.pickupCircle.x;
		pickupCollisionCircle.y = this.pickupCircle.y;

		var axeCollisionCircle = new PIXI.Graphics();
		this.addChild(axeCollisionCircle);
		axeCollisionCircle.lineStyle(1, 0x00ff00);
		axeCollisionCircle.drawCircle(0, 0, this.axeCircle.radius);
		axeCollisionCircle.x = this.axeCircle.x;
		axeCollisionCircle.y = this.axeCircle.y;
	}
};

/**
 * Initialize character
 */
Avatar.prototype.initCharacter = function(character)
{
	switch(character)
	{
		case "anna":
			this.abilities.doubleJump = true;
			this.spineData = Common.characterAnimationData.char_female;
			break;

		case "elsa":
			this.abilities.bridge = true;
			this.spineData = Common.characterAnimationData.char_elsa;
			break;

		case "kristoff":
			this.abilities.slash = true;
			this.spineData = Common.characterAnimationData.char_kristoff;
			break;

		case "olaf":
			this.abilities.shrink = true;
			this.spineData = Common.characterAnimationData.char_olaf;

			this.shrinkPieces = [];

			// Debug pieces
			var pieces = ["olaf_chest_upper_01", "olaf_hip_01", "olaf_ankle_r_01", "olaf_ankle_l_01"]

			for(var i = pieces.length-1; i >= 0; i--)
			{
				var piece = new PIXI.Sprite(this._assetManager.getTexture(pieces[i]));
				piece.anchor.set(0.5);
				piece.alpha = 0;
				this.addChild(piece);
				this.shrinkPieces.push(piece);
			}

			/*
			var pieces =
			[
				{color:0xFF0000, size:20},
				{color:0x00ff00, size:15},
				{color:0x0000FF, size:20}
			];

			for(var i = 0; i < pieces.length; i++)
			{
				var piece = new PIXI.Graphics();
				this.addChild(piece);
				piece.beginFill(pieces[i].color);
				piece.drawCircle(0, 0, pieces[i].size);
				this.shrinkPieces.push(piece);
				piece.alpha = 0;
				piece.endFill();
			}
			*/
			break;

		case "pabbie":
			this.abilities.invulnerability = true;
			this.spineData = Common.characterAnimationData.char_pabbie;
			this.collisionCircleRadius = 40;
			break;
	}


	// Apply character modifiers
	if(!!this._characterData.jumpHeight)         this.jumpHeight         = this._characterData.jumpHeight;
	if(!!this._characterData.doubleJumpHeight)   this.doubleJumpHeight   = this._characterData.doubleJumpHeight;
	if(!!this._characterData.tumbleSpeedMin)     this.tumbleSpeedMin     = this._characterData.tumbleSpeedMin;
	if(!!this._characterData.tumbleSpeedMax)     this.tumbleSpeedMax     = this._characterData.tumbleSpeedMax;
	if(!!this._characterData.tumbleSpeedTime)    this.tumbleSpeedTime    = this._characterData.tumbleSpeedTime;
	if(!!this._characterData.pickupCircleRadius) this.pickupCircleRadius = this._characterData.pickupCircleRadius;
	if(!!this._characterData.trollMagicDuration) this.trollMagicDuration = this._characterData.trollMagicDuration;

	// Apply power ups
	this.tumbleSpeedMax     *= this._powerupsData[0].power[Common.savedData.charactersPower[this._characterData.id][0]];
	this.pickupCircleRadius *= this._powerupsData[1].power[Common.savedData.charactersPower[this._characterData.id][1]];
	this.trollMagicDuration *= this._powerupsData[2].power[Common.savedData.charactersPower[this._characterData.id][2]];
}

/**
 * Dispose
 */
Avatar.prototype.dispose = function()
{
	this.stopLoops();
}

/**
 * Update
 */
Avatar.prototype.update = function()
{
	var prevDistance = this.distance;

	// Animation speed update
	if(this.isRidingVehicle)
		this.spine.update(p3.Timestep.deltaTime);
	else
		this.spine.update(p3.Timestep.deltaTime * this.spineSpeed);

	// Animation update
	if(this.isDead)
	{
		// Do nothing
	}
	else if(this.isShrinking && !this.isRidingVehicle)
	{
		this.setAnimation("run_roll", true);
	}
	else if(this.isInvulnerable && !this.isRidingVehicle)
	{
		this.setAnimation("run_down_steep_rolling_ball", true);
	}
	else if(this.isRidingVehicle)
	{
		console.log('isRidingVehicle');
		if(!this.isGrounded && this.velocity.y > 0)
			this.setAnimation(this.vehicle.riderFallAnimation, true);
		else
			this.setAnimation(this.vehicle.riderAnimation, true);

		if(!this.isGrounded && this.velocity.y > 0)
			this.vehicle.setAnimation('fall', true);
		if(this.isGrounded && !this.isSliding)
			this.vehicle.setAnimation('run_flat', true);
	}
	else if(this.isSlashing)
	{
		// Do nothing
	}
	else if(this.isTumbling)
	{
		// Tumble animation
		this.tumbleSpeed += (this.tumbleSpeedMax - this.tumbleSpeedMin) * (p3.Timestep.deltaTime/this.tumbleSpeedTime);
		if(this.tumbleSpeed > this.tumbleSpeedMax)
			this.tumbleSpeed = this.tumbleSpeedMax;

		if(!this.kJumpPressed)
		{
			this.isTumbling = false;
		}
		else
		{
			if(this.currentAnimation != 'jump_tuck2' && this.currentAnimation != '')
			{
				this.level.changeFocusPoint(this.focusPointFall.point, this.focusPointFall.time, this.focusPointFall.delay);
			}

			this.setAnimation('jump_tuck2', true);
			this.tumbleAngle += this.tumbleSpeed * p3.Timestep.deltaTime * PIXI.DEG_TO_RAD;
		}
	}
	else if(this.isGrounded && !this.isSliding && !!this.collisionPoint)
	{
		// Climbing/run animation
		if(this.isGrounded && this.collisionPoint.angle * PIXI.RAD_TO_DEG <  this.runUpAngle)
			this.setAnimation('run_up2', true);
		// else if(this.isGrounded && this.collisionPoint.angle * PIXI.RAD_TO_DEG <  this.runUpAngle)
			// this.setAnimation('run_up', true);
		else if(this.isGrounded && !!this.collisionPoint.path.config.artificial)
			this.setAnimation('run_flat_magic', true);
		else
			this.setAnimation('run_flat', true);
	}
	else if(!this.isGrounded && this.velocity.y > 0)
	{
		// Fall animation
		if(this.currentAnimation != 'fall' && this.currentAnimation != '')
		{
			this.level.changeFocusPoint(this.focusPointFall.point, this.focusPointFall.time, this.focusPointFall.delay);
		}

		this.setAnimation('fall', true);
	}

	// Slash power update
	if(this.isSlashing)
	{
		this.slashTime += p3.Timestep.deltaTime;

		if(this.slashTime > this.slashTimeMax)
		{
			this.isSlashing = false;
		}
	}

	// Invulnerability update
	if(this.isInvulnerable)
	{
		this.invulnerabilityTime += p3.Timestep.deltaTime;

		if(this.invulnerabilityTime > this.invulnerabilityTimeMax)
		{
			this.isInvulnerable = false;
			this.canTumble = true;
		}
	}

	// Increment animation speed relative to the running speed
	if(this.currentAnimation == "run_flat" && this.runSpeed > this.runSpeedMin)
		this.spineSpeed = 1 + 0.5 * ((this.runSpeed-this.runSpeedMin)/(this.runSpeedMax-this.runSpeedMin));
	else
		this.spineSpeed = 1;

	// Movement
	var oldVelocity = new p3.Vector2(this.velocity.x, this.velocity.y);
	var wasSliding  = this.isSliding;
	var wasGrounded = this.isGrounded;
	var wasRiding   = this.isRidingVehicle;

	if(!this.isDead)
	{
		// When touching real ground reset the canCreateBridge flag
		if(!this.canCreateBridge && this.isGrounded)
		{
			if(!this.collisionPoint.path.config.artificial)
			{
				this.canCreateBridge = true;
			}
		}

		// Input
		this.kJumpStart = this.kJumpStart || Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_UP);
		this.kJumpEnd   = this.kJumpEnd   || Common.keyboard.getKeyJustReleased(Common.keyboard.KEY_UP);
		this.kAbility   = this.kAbility   || (Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_Z) || Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_ENTER));

		if(this.areInputActive)
		{
			if(this.kJumpStart)
			{
				this.jump();
				this.kJumpPressed = true;
			}
			else if(this.kJumpEnd)
			{
				this.jumpEnd();
				this.kJumpPressed = false;
			}
			if(this.kAbility)
			{
				if(this.isRidingVehicle)
				{
					this.vehicle.dismount(false);
				}
				else
				{
					if(this.abilities.bridge)
						this.powerBridge();
					else if(this.abilities.slash)
						this.powerSlash();
					else if(this.abilities.shrink)
						this.powerShrink();
					else if(this.abilities.invulnerability)
						this.powerInvulnerability();
				}
			}
		}

		this.kJumpStart = false;
		this.kJumpEnd   = false;
		this.kAbility   = false;

		// Speed increase/decrease
		if(this.isSliding)
			this.runSpeed += this.accelerationSliding * p3.Timestep.deltaTime;
		else if(this.isGrounded && this.collisionPoint.angle * PIXI.RAD_TO_DEG > this.runDownAngle)
			this.runSpeed += this.accelerationSlopeDown * p3.Timestep.deltaTime;
		else if(this.isGrounded && this.collisionPoint.angle * PIXI.RAD_TO_DEG < this.runUpAngle)
			this.runSpeed += this.accelerationSlopeUp * p3.Timestep.deltaTime;
		else
			this.runSpeed += this.accelerationNormal * p3.Timestep.deltaTime;

		this.runSpeed = Math.max(Math.min(this.runSpeed, this.isSliding ? this.slidingSpeedMax : this.runSpeedMax), this.runSpeedMin);
		this.velocity.x = this.runSpeed;

		// Sliding
		if(!this.isSliding && this.isGrounded && this.collisionPoint.angle * PIXI.RAD_TO_DEG >  this.slidingAngleStart && !this.isSlashing)
		{
			this.isSliding     = true;
			this.timeUnsliding = 0;

			if(this.isRidingVehicle)
				this.vehicle.setAnimation('slide_down_steep', true);
			else if(this.isOlaf())
				this.setAnimation('run_down_steep', true);
			else if(this.isPabbie())
				this.setAnimation('run_down_steep_rolling_ball', true);
			else
			{
				this.setAnimation('slide_down_steep', true);
				this.angleTarget = 0;
			}

			// Zoom in while sliding
			this.level.changeZoom(this.zoomSlide.zoom, this.zoomSlide.time);
			this.level.changeFocusPoint(this.focusPointSlide.point, this.focusPointSlide.time, this.focusPointSlide.delay);
		}
		else if(this.isSliding && (!this.collisionPoint || (this.collisionPoint.angle * PIXI.RAD_TO_DEG < this.slidingAngleEnd)))
		{
			this.timeUnsliding += p3.Timestep.deltaTime;

			 if(this.isRidingVehicle)
				this.vehicle.setAnimation('slide_down_exit', true);
			else
				this.setAnimation('slide_down_exit', true);

			if(this.timeUnsliding >= this.timeUnslidingEnd)
			{
				this.isSliding = false;
				this.setAnimation('run_flat', true);
			}
		}

		// Manual movement
		/* if(Common.keyboard.getKeyPressed(Common.keyboard.KEY_A))
		{
			this.velocity.x = -800;
			this.animationHolder.scale.x = -1;
		}
		else if(Common.keyboard.getKeyPressed(Common.keyboard.KEY_D))
		{
			this.velocity.x = +800;
			this.animationHolder.scale.x = 1;
		}
		else
			this.velocity.x = 0; */

	}

	// Gravity
	this.velocity.y += this.gravity * p3.Timestep.deltaTime;
	if(this.velocity.y >= this.gravity/2) this.velocity.y = this.gravity/2;

	// Rotation update
	if(this.isShrinking)
	{
		this.animationHolder.rotation = 0;
	}
	else if(this.isTumbling)
	{
		this.animationHolder.rotation = this.angleTarget;
	}
	else
	{
		var angleDiff = Math.atan2(Math.sin(this.angleTarget - this.animationHolder.rotation), Math.cos(this.angleTarget - this.animationHolder.rotation));
		this.animationHolder.rotation = this.animationHolder.rotation + (angleDiff * this.angleSpeed);
	}


	// Collision Check
	this.move(this.velocity);


	// Shrink power update
	if(this.isShrinking || this.isUnshrinking)
	{
		this.shrinkTime += p3.Timestep.deltaTime;

		// Update old position's timer
		for(var i = 0; i < this.positionCache.length; i++)
		{
			this.positionCache[i].time += p3.Timestep.deltaTime;

			if(this.positionCache[i].time > this.shrinkPieces.length * this.shrinkPieceDelay)
			{
				this.positionCache.splice(i+1, 100);
				break;
			}
		}

		// Add the current position
		this.positionCache.unshift({time:0, position:new PIXI.Point(this.x, this.y)});

		// Update the pieces position
		for(var p = 0; p < this.shrinkPieces.length; p++)
		{
			var targetTime = (this.shrinkPieces.length-p) * this.shrinkPieceDelay;

			// When unshrinking, move the pieces to the characters
			if(this.isUnshrinking)
			{
				targetTime *= (1 - this.shrinkTime/this.shrinkTransitionTime);
			}

			// If there aren't enough points yet keep the pieces to the starting location
			if(this.positionCache[this.positionCache.length-1].time < targetTime)
			{
				this.shrinkPieces[p].x = this.positionCache[this.positionCache.length-1].position.x - this.x;
				this.shrinkPieces[p].y = this.positionCache[this.positionCache.length-1].position.y - this.y;
			}
			else
			{
				for(var i = this.positionCache.length-1; i > 0; i--)
				{
					if(this.positionCache[i-1].time < targetTime)
					{
						var p0 = this.positionCache[i-1];
						var p1 = this.positionCache[i];
						var t0 = p0.time;
						var t1 = p1.time - t0;
						var perc = Math.max(0, Math.min(1, (targetTime - t0) / t1));

						this.shrinkPieces[p].x = p0.position.x + (p1.position.x-p0.position.x)*perc - this.x;
						this.shrinkPieces[p].y = p0.position.y + (p1.position.y-p0.position.y)*perc - this.y + 20;

						break;
					}
				}
			}

			// Update the rotation
			this.shrinkPieces[p].rotation += this.shrinkPieceRotationSpeed * PIXI.DEG_TO_RAD * p3.Timestep.deltaTime;
		}

		// At the end of the shrink delay, unshrink
		if(this.isShrinking && this.shrinkTime > this.shrinkTimeMax && !this.isShrinkLocked)
		{
			this.powerUnshrink();
		}
	}

	// Undo gravity when touching ground
	if(this.isGrounded)
	{
		this.velocity.y = 0;

		if(!wasGrounded && !this.isDead)
		{
			this.land();
		}
	}

	// Falling time
	if(!this.isGrounded && this.velocity.y > 0)
		this.fallTime += p3.Timestep.deltaTime;
	else if(this.fallTime != 0)
		this.fallTime = 0;

	// Collisions with objects
	this.collisions();


	if(!this.isDead)
	{
		// Zoom
		if(wasSliding && !this.isSliding)
		{
			// Zoom out when not sliding anymore
			this.level.changeZoom(this.zoomSlideEnd.zoom, this.zoomSlideEnd.time);

			// Reset the focus point
			if(this.isGrounded)
			{
				this.level.changeFocusPoint(this.focusPointLand.point, this.focusPointLand.time, this.focusPointLand.delay);
			}

			SoundSFX.stop("sfx_snow_slide_loop_00");
		}

		if(this.canTumble && !this.isGrounded && !this.isRidingVehicle && oldVelocity.y <= this.tumbleSpeedYStart && this.velocity.y > this.tumbleSpeedYStart && this.kJumpPressed)
		{
			this.isTumbling    = true;
			this.tumbleAngle   = 0;
			this.canTumble     = false;
			this.canDoubleJump = false;
			this.tumbleSpeed   = this.tumbleSpeedMin;
		}

		// Headbob
		/* if(this.isSliding || !this.isGrounded || this.isDead)
		{
			this.headbobTime = 0;
		}
		else
		{
			this.headbobTime += p3.Timestep.deltaTime;
		} */
	}

	// Running sounds
	if(this.isDead)
	{
		this.stopLoops();
	}
	else if(this.isGrounded && this.isRidingVehicle)
	{
		if(this.isSliding && this.timeUnsliding > 0)
			this.playLoop("sfx_snow_slide_loop_00");
		else if(this.vehicle.type == "sven")
			this.playLoop("sfx_sven_run_02");
	}
	else if(this.isGrounded && (this.isSliding || this.isShrinking))
	{
		this.playLoop("sfx_snow_slide_loop_00");
	}
	else if(this.isGrounded)
	{
		switch(Common.savedData.character)
		{
			case "anna":
			case "elsa":
				this.playLoop("sfx_anna_snow_runvsoft_00");
				break;

			case "kristoff":
				this.playLoop("sfx_kristoff_snow_runvsoft_00");
				break;

			case "olaf":
				this.playLoop("sfx_generic_olaf_snow_runvsoft_00");
				break;
		}
	}
	else
	{
		this.stopLoops();
	}

	// Axe sound
	if(!!this.slashSFX && !this.isSlashing)
	{
		this.slashSFX.stop();
		this.slashSFX = null;
	}

	// Kristoff's axe
	// if(this.axe)
		// this.axe.update();


	// Troll Magic
	if(this.isTrollMagic)
	{
		this.trollMagicTime -= p3.Timestep.deltaTime;

		if(this.trollMagicTime < 0)
		{
			this.trollMagicEnd();
			this.animationHolder.alpha = 1;
		}
		else if(this.trollMagicTime < 2.5 && this.trollMagicTime > 0.5)
		{
			// Blink when the effect is almost ended
			this.animationHolder.alpha = (((this.trollMagicTime-0.5) % 0.2) < 0.1) ? 0.25 : 1;
		}
		else
		{
			this.animationHolder.alpha = 1;
		}
	}

	// Particles
	if(this.isRidingVehicle && this.isGrounded)
	{
		var v1 = new PIXI.Point(this.collisionCircle.radius * Math.cos(this.collisionPoint.angle), this.collisionCircle.radius * Math.sin(this.collisionPoint.angle));
		var v2 = new PIXI.Point(this.collisionCircle.radius * Math.sin(this.collisionPoint.angle), this.collisionCircle.radius * Math.cos(this.collisionPoint.angle));
		this.snowTrailPS.updateSpawnPos(this.x + v1.x - v2.x, this.y + v1.y + v2.y);
	}
	else if(this.timeUnsliding < 0.1)
	{
		this.snowTrailPS.updateSpawnPos(this.x - 10 + p3.Utils.randomInt(-5,5), this.y + this.collisionCircle.radius + 30);
	}
	else
	{
		this.snowTrailPS.updateSpawnPos(this.x + 10, this.y + this.collisionCircle.radius - 10);
	}

	this.snowTrailPS.emit = this.isSliding;
	this.snowTrailPS.update(p3.Timestep.deltaTime);


	this.doubleJumpPS.updateSpawnPos(this.x, this.y + this.collisionCircle.radius);
	this.doubleJumpPS.update(p3.Timestep.deltaTime);

	this.bridgeFailMagicPS.updateSpawnPos(this.x + this.collisionCircle.radius, this.y - this.collisionCircle.radius);
	this.bridgeFailMagicPS.update(p3.Timestep.deltaTime);

	this.trollMagicPS.updateSpawnPos(this.x, this.y);
	this.trollMagicPS.update(p3.Timestep.deltaTime);

	if(this.level.debug)
		this._particleOrigin.position.set(this.snowTrailPS.spawnPos.x - this.x, this.snowTrailPS.spawnPos.y - this.y)

	// Goals: movement
	if(!this.isDead && this.areInputActive && prevDistance < this.distance)
	{
		if(this.isSliding)
			Common.goalsManager.trackEvent("slide", this.distance - prevDistance);

		if(this.isRidingVehicle)
		{
			Common.goalsManager.trackEvent("ride_" + this.vehicle.type, this.distance - prevDistance);
		}

		Common.goalsManager.trackEvent("run", this.distance - prevDistance);
	}
};

/**
 * Stop the current loops
 */
Avatar.prototype.stopLoops = function()
{
	if(this.walkLoop != "")
	{
		SoundSFX.stop(this.walkLoop);
		this.walkLoop = "";
	}
}

/**
 * Stop the current loop and play a new one, if different
 * @param {String} audio
 */
Avatar.prototype.playLoop = function(audio)
{
	if(this.walkLoop == audio) return;

	this.stopLoops();
	this.walkLoop = audio;
	SoundSFX.play(this.walkLoop, {loop:true});
}

/**
 * Handle collisions with objects
 */
Avatar.prototype.collisions = function()
{
	var avatarObstacleCollisionCircle = new PIXI.Circle(this.x + this.collisionCircle.x,  this.y + this.collisionCircle.y, this.collisionCircle.radius);
	var avatarPickupCollisionCircle   = new PIXI.Circle(this.x + this.pickupCircle.x,     this.y + this.pickupCircle.y,    this.pickupCircle.radius);
	var avatarAxeCollisionCircle      = new PIXI.Circle(this.x + this.axeCircle.x,        this.y + this.axeCircle.y,       this.axeCircle.radius);


	// End of level
	var level_end = this.level.objectManager.getObjectsOfType("level_end");

	for(var i = 0; i < level_end.length; i++)
	{
		if(!level_end[i].interactive) continue;
		if(this.checkCollision(avatarObstacleCollisionCircle, level_end[i]))
		{
			level_end[i].hit();
		}
	}

	if(!this.isDead)
	{
		// Zoom
		var camera_zoom = this.level.objectManager.getObjectsOfType("camera_zoom");

		for(var i = 0; i < camera_zoom.length; i++)
		{
			if(!camera_zoom[i].interactive) continue;
			if(this.checkCollision(avatarObstacleCollisionCircle, camera_zoom[i]))
			{
				camera_zoom[i].hit();
			}
		}

		// Coins
		var coins = this.level.objectManager.getObjectsOfType("coin");

		for(var i = 0; i < coins.length; i++)
		{
			if(!coins[i].interactive) continue;
			if(this.checkCollision(avatarPickupCollisionCircle, coins[i]))
			{
				 if(coins[i].pickup(this))
				 {
					 // Score
					 this.level.snowflakes++;

					 // Goals: coins
					 Common.goalsManager.trackEvent("coins");
				 }
			}
		}

		// Crystals
		var crystals = this.level.objectManager.getObjectsOfType("crystal");

		for(var i = 0; i < crystals.length; i++)
		{
			if(!crystals[i].interactive) continue;
			if(this.checkCollision(avatarObstacleCollisionCircle, crystals[i]))
			{
				 if(crystals[i].pickup(this))
				 {
					 // Goals: crystals
					 Common.goalsManager.trackEvent("crystals");
				 }
			}
		}

		// Troll
		if(Common.savedData.character == "pabbie")
		{
			var trolls = this.level.objectManager.getObjectsOfType("troll");

			for(var i = 0; i < trolls.length; i++)
			{
				if(!trolls[i].interactive) continue;
				if(this.checkCollision(avatarObstacleCollisionCircle, trolls[i]))
				{
					 if(trolls[i].pickup(this))
					 {
						 // Goals: trolls
						 // Common.goalsManager.trackEvent("trolls");
					 }
				}
			}
		}

		// Troll magic
		var powerups = this.level.objectManager.getObjectsOfType("powerup");

		for(var i = 0; i < powerups.length; i++)
		{
			if(!powerups[i].interactive) continue;
			if(this.checkCollision(avatarObstacleCollisionCircle, powerups[i]))
			{
				 if(powerups[i].pickup(this))
				 {
					 this.trollMagic();

					 // Goals: powerups
					 Common.goalsManager.trackEvent("powerups");
				 }
			}
		}

		// Obstacles
		var obstacles = this.level.objectManager.getObjectsOfType("obstacle");

		for(var i = 0; i < obstacles.length; i++)
		{
			if(!obstacles[i].interactive) continue;
			if(this.isSlashing && obstacles[i].iceBlock && this.checkCollision(avatarAxeCollisionCircle, obstacles[i]))
			{
				obstacles[i].destroy("axe");
			}
			else if(this.checkCollision(avatarObstacleCollisionCircle, obstacles[i]))
			{
				if(this.isTrollMagic)
				{
					obstacles[i].destroy("magic");
				}
				else if(this.isInvulnerable)
				{
					obstacles[i].destroy("invulnerability");
				}
				else
				{
					obstacles[i].hit(this)
					this.death();
				}
			}
		}

		// Snowballs
		var snowballs = this.level.objectManager.getObjectsOfType("snowball");

		for(var i = 0; i < snowballs.length; i++)
		{
			if(!snowballs[i].interactive) continue;
			if(this.checkCollision(avatarObstacleCollisionCircle, snowballs[i]))
			{
				if(!this.isInvulnerable)
				{
					snowballs[i].hit(this);
					this.level.shake(0.5, new PIXI.Point(8,12));
					this.death();
				}
				else
				{
					snowballs[i].destroy(false);
				}
			}
		}

		// Platforms
		var jump_platforms = this.level.objectManager.getObjectsOfType("jump_platform");

		for(var i = 0; i < jump_platforms.length; i++)
		{
			if(!jump_platforms[i].interactive) continue;
			if(this.checkCollision(avatarObstacleCollisionCircle, jump_platforms[i]))
			{
				jump_platforms[i].hit(this)
			}
		}

		// Vehicles
		if(!this.isShrinking && !this.isUnshrinking && !this.isRidingVehicle)
		{
			var vehicles = this.level.objectManager.getObjectsOfType("sven");

			for(var i = 0; i < vehicles.length; i++)
			{
				if(!vehicles[i].interactive) continue;
				if(this.checkCollision(avatarObstacleCollisionCircle, vehicles[i]))
				{
					vehicles[i].hit(this);
					// Score
					this.level.styleScore += this._assetManager.getJSON("config").score.vehicle;
				}
			}
		}

		if(!this.isShrinking && !this.isUnshrinking && !this.isRidingVehicle)
		{
			var vehicles = this.level.objectManager.getObjectsOfType("sled");

			for(var i = 0; i < vehicles.length; i++)
			{
				if(!vehicles[i].interactive) continue;
				if(this.checkCollision(avatarObstacleCollisionCircle, vehicles[i]))
				{
					vehicles[i].hit(this);

					// Score
					this.level.styleScore += this._assetManager.getJSON("config").score.vehicle;
				}
			}
		}

		// Shrink locks
		if(this.abilities.shrink)
		{
			if(this.isShrinking)
			{
				var locks = this.level.objectManager.getObjectsOfType("shrink_lock");

				for(var i = 0; i < locks.length; i++)
				{
					if(!locks[i].interactive) continue;
					if(this.checkCollision(avatarObstacleCollisionCircle, locks[i]))
					{
						locks[i].hit(this)
					}
				}
			}
		}

		// Tutorial
		var tutorials = this.level.objectManager.getObjectsOfType("tutorial");

		for(var i = 0; i < tutorials.length; i++)
		{
			if(!tutorials[i].interactive) continue;
			if(this.checkCollision(avatarObstacleCollisionCircle, tutorials[i]))
			{
				tutorials[i].hit(this)
			}
		}
	}
}

/**
 * Jump
 */
Avatar.prototype.jump = function()
{
	if(this.isDead) return;

	if(this.isGrounded)
	{
		// Avoid jumping on steep slopes (only works when going right)
		if(this.collisionPoint && (this.collisionPoint.angle * PIXI.RAD_TO_DEG) < -this.jumpSlopeAngleMax) return;

		this.canDoubleJump = true;
		this.isSliding     = false;
		this.rotation      = 0;
		this.angleTarget   = 0;
		this.isGrounded    = false;

		this.velocity.y    = -this.jumpSpeed;
		this.canTumble     = true;

		if(!this.isRidingVehicle)
			this.setAnimation('jump_normal', false);
		else
			this.vehicle.setAnimation('jump_normal', false);

		// Particles
		this.doubleJumpPS.emit = true;

		// Audio
		this.stopLoops();

		if(this.isRidingVehicle && this.vehicle.type == "sven")
			SoundSFX.playRandomFrom(["sfx_sven_jump_00", "sfx_sven_jump_01", "sfx_sven_jump_02", "sfx_sven_jump_03", "sfx_sven_jump_04"]);
		else
			SoundSFX.playRandomFrom(["sfx_generic_jump_00", "sfx_generic_jump_01", "sfx_generic_jump_02"]);
	}
	else if(this.canDoubleJump && !this.isRidingVehicle && this.abilities.doubleJump)
	{
		this.canDoubleJump = false;

		this.velocity.y = -this.doubleJumpSpeed;

		this.setAnimation('jump_double', false);

		// Particles
		this.doubleJumpPS.emit = true;

		// Audio
		this.stopLoops();
		SoundSFX.playRandomFrom(["sfx_generic_jump_00", "sfx_generic_jump_01", "sfx_generic_jump_02"]);
	}

	// Focus Point
	 this.level.changeFocusPoint(this.focusPointJump.point, this.focusPointJump.time, this.focusPointJump.delay);
};

/**
 * Jump end, when the player stops pressing the jump button
 * Allows variable height jumps
 */
Avatar.prototype.jumpEnd = function()
{
	if(this.isDead) return;
	if(this.isGrounded) return;

	if(this.canDoubleJump || !this.abilities.doubleJump)
	{
		// console.info("Jump end");
		if(this.velocity.y < -this.jumpSpeedMin && this.velocity.y >= -this.jumpSpeed)
		{
			this.velocity.y = -this.jumpSpeedMin;
		}
	}
	else
	{
		// console.info("Double jump end");
		if(this.velocity.y < -this.doubleJumpSpeedMin && this.velocity.y >= -this.doubleJumpSpeed)
		{
			this.velocity.y = -this.doubleJumpSpeedMin;
		}
	}
}

/**
 * Land
 */
Avatar.prototype.land = function()
{
	this.canDoubleJump = false;

	// Land animation and screen shake if falling from high
	if(this.fallTime >= this.fallTimeToLand)
	{
		if(!this.isRidingVehicle)
			this.setAnimation('land', false);
		else
			this.vehicle.setAnimation('land', false);

		this.level.shake(0.25, new PIXI.Point(8,12));

		// Audio
		if(this.distance > 5) // Don't play the sound right at the start of the level
		SoundSFX.playRandomFrom(["sfx_generic_land_heavy_00"]);
	}
	else
	{
		// Audio
		if(this.distance > 5) // Don't play the sound right at the start of the level
		SoundSFX.playRandomFrom(["sfx_generic_land_soft_00"]);
	}

	// Tumble
	this.isTumbling = false;
	var tumbleTimes = Math.floor((this.animationHolder.rotation * PIXI.RAD_TO_DEG + 180) /360);

	this.animationHolder.rotation = this.animationHolder.rotation % (Math.PI * 2);
	var angle = this.animationHolder.rotation * PIXI.RAD_TO_DEG;

	if((this.tumbleDeathAngle.min != this.tumbleDeathAngle.max) && (angle > this.tumbleDeathAngle.min) && (angle < this.tumbleDeathAngle.max) && !this.isImmortal)
	{
		// Tumble death
		this.death();
	}
	else if(tumbleTimes > 0)
	{
		// Tumble bonus
		// console.log("Tumble %i", tumbleTimes);

		// Goals: tumble
		Common.goalsManager.trackEvent("tumble");

		if(tumbleTimes >= 2)
			Common.goalsManager.trackEvent("tumble_double");

		if(tumbleTimes >= 3)
			Common.goalsManager.trackEvent("tumble_triple");

		// Score
		//this.level.styleScore += Math.pow(this._assetManager.getJSON("config").score.tumble, tumbleTimes);
		this.level.styleScore += this._assetManager.getJSON("config").score.tumble * Math.pow(2, tumbleTimes-1);
	}
	else
	{
		// Goals: jump
		if(this.distance > 5) // Ignore fall at the start of the level
		Common.goalsManager.trackEvent("jump");
	}

	// Focus Point
	this.level.changeFocusPoint(this.focusPointLand.point, this.focusPointLand.time, this.focusPointLand.delay);

	// Particles
	if(this.distance > 5) // Ignore fall at the start of the level
		this.doubleJumpPS.emit = true;
}


/**
 * Death
 */
Avatar.prototype.death = function()
{
	if(this.isDead) return;
	if(this.isImmortal) return;
	if(this.isRidingVehicle)
	{
		this.vehicle.dismount(true);
		return;
	}

	this.isDead     = true;
	this.isSliding  = false;
	this.isTumbling = false;
	this.isSlashing = false;

	this.powerUnshrink();
	this.trollMagicEnd();

	this.velocity.x = -1000;

	this.deathTween = new TimelineMax();
	this.deathTween.to(this.velocity, 0.5, {x: 0, ease:Bounce.easeOut},  0);
	Common.animator.add(this.deathTween);


	this.setAnimation('land_bad', false);

	this.level.changeFocusPoint(this.focusPointDeath.point, this.focusPointDeath.time, this.focusPointDeath.delay);
	this.level.changeZoom(this.zoomDeath.zoom, this.zoomDeath.time);

	this.level.gameOver();
	this.stopLoops();
}


/**
 * Bridge power
 */
Avatar.prototype.powerBridge = function()
{

	// if(this.isGrounded) console.log(this.collisionPoint.angle);

	// if(this.isGrounded) return;
	if(this.isTumbling)       return;
	if(!this.canCreateBridge) return;

	if(this.isGrounded && (this.collisionPoint.angle * PIXI.RAD_TO_DEG) < -5)
	{
		// Fails
		this.bridgeFailMagicPS.emit = true;
		SoundSFX.playRandomFrom(["sfx_elsa_ice_magic_platform_fail_00"]);
		return;
	}

	this.isTumbling      = false;
	this.canTumble       = false;
	this.canCreateBridge = false;

	// Create an artificial path
	var points = [];
	points.push({x:this.x, y:this.y + this.collisionCircle.radius + (this.isGrounded ? 10 : 50)});

	var segments      = 4;
	var segmentLength = 200;

	for(var i = 0; i < segments; i++)
	{
		points[i*3+1+2] = {x:this.x + segmentLength * (i+1), y: points[0].y + (i % 2 == 0 ? 10 : -10)};

		points[i*3+1] = {x:this.x + segmentLength * (i+0.33), y: points[i*3].y};
		points[i*3+1+1] = {x:this.x + segmentLength * (i+0.66), y: points[(i+1)*3].y};
	}

	var path =
	{
		bounds            : [points[0].x, points[points.length-1].x],
		closed            : false,
		collisions        : 2,
		data              : "",
		depth             : -1,
		points            : points,
		texFill           : "",
		texFillPadding    : 0,
		texFillSize       : 256,
		texGround         : "elsa_ice_flow_ground_00",
		texGroundDelta    : 0.3,
		texGroundEdge     : "elsa_ice_flow_capl_00",
		texGroundEdgeSide : "",
		texGroundSize     : 64,
		texWall           : "",
		texWallAngle      : 70,
		texWallDelta      : 0,
		texWallSize       : 64,
		artificial        : true
	}

	this.level.getLayer("bridge").queuePaths([path]);

	// Audio
	SoundSFX.playRandomFrom(["sfx_elsa_ice_magic_platform_00", "sfx_elsa_ice_magic_platform_01", "sfx_elsa_ice_magic_platform_02", "sfx_elsa_ice_magic_platform_03"]);
}

/**
 * Slash power
 */
Avatar.prototype.powerSlash = function()
{
	if(this.isTumbling) return;
	if(this.isSlashing) return;

	this.slashSFX = SoundSFX.play("sfx_kristoff_swing_axe_02", {loop:true});

	this.setAnimation('run_flat_magic', true);
	this.isSlashing = true;
	this.slashTime = 0;
}

/**
 * Invulnerability power
 */
Avatar.prototype.powerInvulnerability = function()
{
	if(this.isTumbling) return;
	if(this.isInvulnerable) return;
	// if(this.isSliding) return;

	this.setAnimation('run_down_steep_rolling_ball', true);
	this.isInvulnerable = true;
	this.invulnerabilityTime = 0;

	this.canTumble = false;
}

/**
 * Shrink power
 */
Avatar.prototype.powerShrink = function()
{
	if(this.isShrinking)    return;
	if(this.isUnshrinking)  return;
	if(this.isShrinkLocked) return;
	if(this.isTumbling)     return;

	this.isShrinking    = true;
	this.shrinkTime     = 0;
	this.isShrinkLocked = false;
	this.canTumble      = false;
	this.positionCache  = [];

	var tl = new TimelineMax();
	tl.to(this.collisionCircle, this.shrinkTransitionTime, {radius:35, ease:Linear.easeNone, onUpdate:function(){this.spine.y = this.collisionCircle.radius; if(this.level.debug){this.drawCollision();}}, onUpdateScope:this},0);
	// tl.to(this.animationHolder.scale, this.shrinkTransitionTime, {x:0.5, y:0.5, ease:Linear.easeNone},0);

	for(var p = 0; p < this.shrinkPieces.length; p++)
	{
		this.shrinkPieces[p].x = 0;
		this.shrinkPieces[p].y = 0;
		tl.to(this.shrinkPieces[p], this.shrinkTransitionTime, {alpha:1, ease:Sine.easeOut},0);
	}

	Common.animator.add(tl);
}

/**
 * Unshrink
 */
Avatar.prototype.powerUnshrink = function()
{
	if(!this.isShrinking)  return;
	if(this.isUnshrinking) return;

	this.isShrinking    = false;
	this.isUnshrinking  = true;
	this.shrinkTime     = 0;
	this.isShrinkLocked = false;
	this.canTumble      = true;

	var tl = new TimelineMax({onCompleteScope:this, onComplete:function(){this.isUnshrinking = false}});
	tl.to(this.collisionCircle, this.shrinkTransitionTime, {radius:55, ease:Linear.easeNone, onUpdate:function(){this.spine.y = this.collisionCircle.radius; if(this.level.debug){this.drawCollision();}}, onUpdateScope:this},0);
	// tl.to(this.animationHolder.scale, this.shrinkTransitionTime, {x:1, y:1, ease:Linear.easeNone},0);

	for(var p = 0; p < this.shrinkPieces.length; p++)
	{
		tl.to(this.shrinkPieces[p], this.shrinkTransitionTime, {alpha:0, ease:Sine.easeIn},0);
	}

	Common.animator.add(tl);
}


/**
 * Troll magic
 */
Avatar.prototype.trollMagic = function()
{
	this.isTrollMagic      = true;
	this.trollMagicTime    += this.trollMagicDuration;
	this.trollMagicPS.emit = true;

	Common.bgMusic.stop();
	Common.bgMusic.fadeOut(0, 200);
	Common.bgMusic = SoundSFX.play("mx_troll_magic_rush_loop_02", {loop:true});
	Common.bgMusic.fadeIn(Common.bgMusicVolume, 200);
}

Avatar.prototype.trollMagicEnd = function()
{
	if(!!this.isTrollMagic)
	{
		this.isTrollMagic      = false;
		this.trollMagicTime = 0;
		this.trollMagicPS.emit = false;

		Common.bgMusic.stop();
		Common.bgMusic.fadeOut(0, 200);
		Common.bgMusic = SoundSFX.play("mx_frozen_01_gameplay_lp");
		Common.bgMusic.fadeIn(Common.bgMusicVolume, 100);
	}
}


/**
 * Set a spine animation
 * @param {String} id
 * @param {Boolean} loop
 */
Avatar.prototype.setAnimation = function(id, loop)
{
	if(loop && id == this.currentAnimation) return;

	if(this.isShrinking && id != "run_roll" && id != "ride_sven" && id != "ride_sled" ) return;

	if(this.currentAnimation == "land")
		this.spine.state.addAnimationByName(0, id, loop, 0.2);
	else
		this.spine.state.setAnimationByName(0, id, loop, 0);

	this.currentAnimation = id;
}

/**
 * @returns {Boolean}
 */
Avatar.prototype.isOlaf = function()
{
	return Common.savedData.character == "olaf";
}

/**
 * @returns {Boolean}
 */
Avatar.prototype.isKristoff = function()
{
	return Common.savedData.character == "kristoff";
}

/**
 * @returns {Boolean}
 */
Avatar.prototype.isPabbie = function()
{
	return Common.savedData.character == "pabbie";
}


//===================================================
// PRIVATE METHODS
//===================================================


//===================================================
// EVENTS
//===================================================



//===================================================
// GETTERS/SETTERS
//===================================================

Object.defineProperty(Avatar.prototype, "direction", {

	get: function() {
		return Math.sign(this.scale.x);
	}
});

Object.defineProperty(Avatar.prototype, "distance", {

	get: function() {
		return Math.floor(this.x/Common.savedData.unit);
	}
});


//===================================================
},{"../Common":2,"../game/ObjectAxe":21,"../general/Emitter":41,"../general/SoundSFX":44,"./RunningEntity":38}],15:[function(require,module,exports){
var Common          = require("../Common");

//===================================================
// CONSTRUCTOR
//===================================================

function GameObject(type, removeIfOutsideBoundary)
{
    this._assetManager    = p3.AssetManager.instance;

    this.signals          = {};
    this.signals.disposed = new signals.Signal();

    this.id                = null;
	this.type              = type;
	this.collisionRect     = null;
	this.collisionCircle   = null;
	this.areaRect          = null;
	this.interactive       = false;
	this.removeWhenOutside = true;
	
	this.collisionGraphic = null;

	PIXI.Container.call(this);
}
module.exports = GameObject;
GameObject.prototype = Object.create(PIXI.Container.prototype);
GameObject.prototype.constructor = GameObject;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
GameObject.prototype.init = function()
{

};

/**
 */
GameObject.prototype.update = function()
{
    
};

/**
 */
GameObject.prototype.reset = function()
{
	this.x = 0;
	this.y = 0;
    this.removeMe = false;
};

/**
 */
GameObject.prototype.dispose = function()
{
	this.signals.disposed.dispatch(this);
    this.removed = true;
}

/**
 */
GameObject.prototype.pause = function()
{
    
}

/**
 */
GameObject.prototype.resume = function()
{
    
}

/**
 */
GameObject.prototype.drawCollision = function()
{
	if(!!this.collisionGraphic)
		this.removeChild(this.collisionGraphic);
	
    this.collisionGraphic = new PIXI.Graphics();
    this.addChild(this.collisionGraphic);
    this.collisionGraphic.lineStyle(2, 0xF7111D);
	
	if(this.collisionRect != null)
		this.collisionGraphic.drawRect(this.collisionRect.x, this.collisionRect.y, this.collisionRect.width, this.collisionRect.height);
	else if(this.collisionCircle != null)
		this.collisionGraphic.drawCircle(this.collisionCircle.x, this.collisionCircle.y, this.collisionCircle.radius);
}







//===================================================
// PRIVATE METHODS
//===================================================


//===================================================
// EVENTS
//===================================================

//===================================================
// GETTERS/SETTERS
//===================================================




//===================================================


},{"../Common":2}],16:[function(require,module,exports){
var Common        = require("../Common");

//===================================================
// CONSTRUCTOR
//===================================================

function GameUI(level)
{
	this._assetManager = p3.AssetManager.instance;
	PIXI.Container.call(this);

	this.level = level;

	this._canShowGoal      = false;
	this._goalsQueue       = [];
	this._progressBarWidth = 0;
	this._characterData    = this._assetManager.getJSON("config").characters[Common.savedData.character];
	this._crystals         = [];
	this._crystalParticles = [];
	this._crystalSwirlParticle = null;

	this._characters = ["anna", "kristoff", "olaf", "elsa"];

	this._goals = Common.goalsManager.getActiveGoals();

	this._topContainerTween = null;
	this._tutorialTween = null;
}
module.exports = GameUI;
GameUI.prototype = Object.create(PIXI.Container.prototype);
GameUI.prototype.constructor = GameUI;

/**
 * Init
 */
GameUI.prototype.init = function()
{
	// Side stats - coins
	this._coinsContainer = new PIXI.Container();
	this._coinsContainer.y = 60;
	this.addChild(this._coinsContainer);

		this._coinsContainer._bg = new PIXI.Sprite(this._assetManager.getTexture("ui_snowflake_bg"));
		this._coinsContainer._bg.anchor.set(0, 0.5);
		this._coinsContainer._bg.scale.set(0.8);
		this._coinsContainer._bg.x += 10;
		this._coinsContainer.addChild(this._coinsContainer._bg);

		this._coinsContainer._text = new PIXI.extras.BitmapText("0", {font: "28px Superclarendon Numbers", align: "center"});
		this._coinsContainer._text.x = -this._coinsContainer._text.textWidth/2  + this._coinsContainer.width/2 + 18;
		this._coinsContainer._text.y = -this._coinsContainer._text.textHeight/2;
		this._coinsContainer.addChild(this._coinsContainer._text);

		// this._coinsContainer._text = new PIXI.Text("?", {font:"24px Arial", fill:0xffffff, align:'center'});
		// this._coinsContainer._text.x = this._coinsContainer.width/2 + 17;
		// this._coinsContainer._text.anchor.set(0.5);
		// this._coinsContainer.addChild(this._coinsContainer._text);

		this._coinsContainer._snowflake = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_gameplay_snowflake"));
		this._coinsContainer._snowflake.x = 15;
		this._coinsContainer._snowflake.anchor.set(0.5);
		this._coinsContainer.addChild(this._coinsContainer._snowflake);

	// Side stats - style
	this._styleContainer = new PIXI.Container();
	this._styleContainer.y = this._coinsContainer.y + 65;
	this.addChild(this._styleContainer);

		this._styleContainer._bg = new PIXI.Sprite(this._assetManager.getTexture("ui_snowflake_bg"));
		this._styleContainer._bg.anchor.set(0, 0.5);
		this._styleContainer._bg.scale.set(0.8);
		this._styleContainer._bg.x += 10;
		this._styleContainer.addChild(this._styleContainer._bg);

		this._styleContainer._text = new PIXI.extras.BitmapText("0", {font: "28px Superclarendon Numbers", align: "center"});
		this._styleContainer._text.x = -this._styleContainer._text.textWidth/2  + this._styleContainer.width/2 + 18;
		this._styleContainer._text.y = -this._styleContainer._text.textHeight/2;
		this._styleContainer.addChild(this._styleContainer._text);

		// this._styleContainer._text = new PIXI.Text("?", {font:"24px Arial", fill:0xffffff, align:'center'});
		// this._styleContainer._text.x = this._styleContainer.width/2 + 17;
		// this._styleContainer._text.anchor.set(0.5);
		// this._styleContainer.addChild(this._styleContainer._text);

		var snowflake = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_gameplay_style"));
		snowflake.x = 15;
		snowflake.anchor.set(0.5);
		this._styleContainer.addChild(snowflake);

	// Side stats - distance
	if(this.level.endless)
	{
		this._distanceContainer = new PIXI.Container();
		this._distanceContainer.y = this._coinsContainer.y + 130;
		this.addChild(this._distanceContainer);

			this._distanceContainer._bg = new PIXI.Sprite(this._assetManager.getTexture("ui_snowflake_bg"));
			this._distanceContainer._bg.anchor.set(0, 0.5);
			this._distanceContainer._bg.scale.set(0.8);
			this._distanceContainer._bg.x += 10;
			this._distanceContainer.addChild(this._distanceContainer._bg);

			this._distanceContainer._text = new PIXI.extras.BitmapText("0", {font: "28px Superclarendon Numbers", align: "center"});
			this._distanceContainer._text.x = -this._distanceContainer._text.textWidth/2  + this._distanceContainer.width/2 + 18;
			this._distanceContainer._text.y = -this._distanceContainer._text.textHeight/2;
			this._distanceContainer.addChild(this._distanceContainer._text);

			// this._distanceContainer._text = new PIXI.Text("?", {font:"24px Arial", fill:0xffffff, align:'center'});
			// this._distanceContainer._text.x = this._distanceContainer.width/2 + 17;
			// this._distanceContainer._text.anchor.set(0.5);
			// this._distanceContainer.addChild(this._distanceContainer._text);

			var snowflake = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_gameplay_distance"));
			snowflake.x = 15;
			snowflake.anchor.set(0.5);
			this._distanceContainer.addChild(snowflake);
	}


	// Level - Crystals
	if(!this.level.endless)
	{
		this._topContainer = new PIXI.Container();
		this._topContainer.x = Common.STAGE_WIDTH/2;
		this._topContainer.y = 70;
		this.addChild(this._topContainer);

		if(Common.savedData.character != "pabbie")
		{
			var levelBg = new PIXI.Sprite(this._assetManager.getTexture("ingame_level_bg"));
			levelBg.anchor.set(0.5);
			this._topContainer.addChild(levelBg);

				var copy = this._assetManager.getJSON("strings")["LEVEL"][Common.COUNTRY_CODE];

				if(!webfont)
				{
					var text = new PIXI.extras.BitmapText(copy.replace("{value}", (Common.savedData.level+1)), {font: "24px Superclarendon Level", align: "center"});
					text.x = -text.textWidth/2;
					text.y = -text.textHeight/2 - 8;
					text.alpha = 0.65;
					levelBg.addChild(text);
				}
				else
				{
					var text = new PIXI.Text(copy.replace("{value}", (Common.savedData.level+1)), {font:"24px Arial", fill:0x6d534a, align:'center'});
					text.anchor.set(0.5);
					text.y -= 4;
					levelBg.addChild(text);
				}

				// Crystal container
				this._crystalsContainer = new PIXI.Sprite(this._assetManager.getTexture("ui_loading_crystals_bg"));
				this._crystalsContainer.anchor.set(0.5);
				this._crystalsContainer.y = 60
				this._topContainer.addChild(this._crystalsContainer);

				var crystalsPosition =
				[
					{x:73,  y:161},
					{x:137, y:157},
					{x:204, y:170},
					{x:266, y:180},
					{x:336, y:180},
					{x:405, y:191},
					{x:465, y:180},
					{x:526, y:170},
					{x:578, y:183},
					{x:644, y:174},
					{x:715, y:152},
					{x:790, y:129}
				];

				for(var i = 1; i <= 12; i++)
				{
					// Sprite
					var crystal = new PIXI.Sprite(this._assetManager.getTexture("ui_loading_crystals_" + i));
					crystal.anchor = new PIXI.Point(0.5, 0.5);
					crystal.alpha = Common.savedData.isCrystalCollected(Common.savedData.level, this._characters[Math.floor((i-1)/3)], (i-1)%3) ? 1 : 0;
					this._crystalsContainer.addChild(crystal);
					this._crystals.push(crystal);

					// Particle effect
					var colour = Common.savedData.getColorByCharacter(this._characters[Math.floor((i-1)/3)]);

					var particle = new cloudkid.Emitter(this._crystalsContainer,
					[
						this._assetManager.getTexture("particle_sparkle_00"),
						this._assetManager.getTexture("particle_sparkle_01"),
						this._assetManager.getTexture("particle_sparkle_02"),
						this._assetManager.getTexture("particle_sparkle_03"),
					],
					this._assetManager.getJSON("particle_gem_" + colour + "_ending"));

					particle.emit = false;
					particle.updateSpawnPos(-this._crystalsContainer.width/2 + crystalsPosition[i-1].x/2, -this._crystalsContainer.height/2 + crystalsPosition[i-1].y/2);
					this._crystalParticles.push(particle);
				}

				// Swirl
				// this._crystalSwirlParticle = new cloudkid.Emitter(this._crystalsContainer,
				// [
					// this._assetManager.getTexture("particle_sparkle_00"),
					// this._assetManager.getTexture("particle_sparkle_01"),
					// this._assetManager.getTexture("particle_sparkle_02"),
					// this._assetManager.getTexture("particle_sparkle_03"),
				// ],
				// this._assetManager.getJSON("particle_end_swirltrail_00"));
				// this._crystalSwirlParticle.emit = false;
				// this._crystalSwirlParticle.updateSpawnPos(crystal.x - (crystal.width/2) + ((crystal.width/12)*(this._characters.indexOf(Common.savedData.character)*3)), crystal.height - 50);
		}
		else
		{
			// Current level
			var level_bg = new PIXI.Sprite(this._assetManager.getTexture("ui_level_bg_troll"));
			level_bg.anchor.set(0.5);
			this._topContainer.addChild(level_bg);

				var copy = this._assetManager.getJSON("strings")["LEVEL"][Common.COUNTRY_CODE];

				if(!webfont)
				{
					var text = new PIXI.extras.BitmapText(copy.replace("{value}", (Common.savedData.level+1)), {font: "26px Superclarendon Level", align: "center"});
					text.x = -text.textWidth/2  - 40;
					text.y = -text.textHeight/2 - 8;
					level_bg.addChild(text);
				}
				else
				{
					var text = new PIXI.Text("Level " + (Common.savedData.level+1), {font:"24px Arial", fill:0x000000, align:'center'});
					text.x = - 40;
					text.y = -6;
					text.anchor.set(0.5);
					level_bg.addChild(text);
				}

				var trollCollected = Common.savedData.getLevelCollectedTrollCount(Common.savedData.level);
				var trollCount = 3;

				if(!webfont)
				{
					this._trollCount = new PIXI.extras.BitmapText(trollCollected + "/" + trollCount, {font: "32px Superclarendon Level", align: "center"});
					this._trollCount.x = -this._trollCount.textWidth/2  + 120;
					this._trollCount.y = -this._trollCount.textHeight/2 - 12;
					level_bg.addChild(this._trollCount);
				}
				else
				{
					this._trollCount = new PIXI.Text(trollCollected + "/" + trollCount, {font:"32px Arial", fill:0xffffff, align:'center'});
					this._trollCount.anchor.set(0.5);
					this._trollCount.x += 120;
					this._trollCount.y += -12;
					level_bg.addChild(this._trollCount);
				}

				this._trollCount.trollCollected = trollCollected;
		}

		// Hide crystals UI after a while
		this._topContainerTween = new TimelineMax();
		this._topContainerTween.to(this._topContainer, .5, {alpha:0, ease:Sine.easeInOut}, 2);
		Common.animator.add(this._topContainerTween);
	}

	// Progress bar
	if(!this.level.endless)
	{
		this.progressBar = new PIXI.Container();
		this.progressBar.x = Common.STAGE_WIDTH/2 - this.progressBar.width/2;
		this.progressBar.y = Common.STAGE_HEIGHT - 60;
		this.addChild(this.progressBar)

			this.progressBar.capLeft = new PIXI.Sprite(this._assetManager.getTexture("ingame_progress_cap_" + this._characterData.color + "_l"));
			this.progressBar.capLeft.anchor.set(1, 0.5);
			this.progressBar.addChild(this.progressBar.capLeft);

			this.progressBar.capRight = new PIXI.Sprite(this._assetManager.getTexture("ingame_progress_cap_" + this._characterData.color + "_r"));
			this.progressBar.capRight.anchor.set(0, 0.5);
			this.progressBar.addChild(this.progressBar.capRight);

			var texture = this._assetManager.getTexture("ingame_progress_bar_" + this._characterData.color + "_off");
			this.progressBar.barBg = new PIXI.extras.TilingSprite(texture, 0, texture.height);
			this.progressBar.barBg.anchor.set(0, 0.5);
			this.progressBar.addChild(this.progressBar.barBg);

			var texture = this._assetManager.getTexture("ingame_progress_bar_" + this._characterData.color + "_on");
			this.progressBar.bar = new PIXI.extras.TilingSprite(texture, 0, texture.height);
			this.progressBar.bar.anchor.set(0, 0.5);
			this.progressBar.addChild(this.progressBar.bar);

			this.progressBar.chara = new PIXI.Sprite(this._assetManager.getTexture("ingame_progress_char_" + Common.savedData.character));
			this.progressBar.chara.anchor.set(0.5);
			this.progressBar.chara.scale.set(0.5);
			this.progressBar.bar.addChild(this.progressBar.chara);
	}

	// Tutorial
	this._tutorial = new PIXI.Container();
	this._tutorial.x = Common.STAGE_WIDTH/2;
	this._tutorial.y = 100;
	this._tutorial.scale.set(0);
	this.addChild(this._tutorial);

		this._tutorial.bg = new PIXI.Sprite(this._assetManager.getTexture("ingame_tutorial_text_bg"));
		this._tutorial.bg.anchor.set(0.5);
		this._tutorial.addChild(this._tutorial.bg);

		if(!webfont)
		{
			this._tutorial.label = new PIXI.extras.BitmapText("Test", {font: "24px Superclarendon Level", align: "center"});
			this._tutorial.label.x = -this._tutorial.label.textWidth/2;
			this._tutorial.label.y = -this._tutorial.label.textHeight/2 -6;
			this._tutorial.addChild(this._tutorial.label);
		}
		else
		{
			this._tutorial.label = new PIXI.Text("Text", {font:"24px Arial", fill:0x000000, align:'center', wordWrap:false, lineHeight:32, wordWrapWidth:400});
			this._tutorial.label.anchor.set(0.5);
			this._tutorial.addChild(this._tutorial.label);
		}


	// Goal achieved
	this._goal = new PIXI.Container();
	this._goal.x = Common.STAGE_WIDTH/2;
	this._goal.y = Common.STAGE_HEIGHT/2+250;
	this._goal.scale.set(0);
	this.addChild(this._goal);

		var goal = new PIXI.Sprite(this._assetManager.getTexture("ingame_goal_bg"));
		goal.anchor.set(0.5);
		this._goal.addChild(goal);

		if(!webfont)
		{
			this._goal.label = new PIXI.extras.BitmapText("Text", {font: "24px Mikadan Title", align: "left"});
			this._goal.label.x = -270;
			this._goal.label.y = -this._goal.label.textHeight/2;
			goal.addChild(this._goal.label);
		}
		else
		{
			this._goal.label = new PIXI.Text("Text", {font:"24px Arial", fill:0x58EBD2, align:'left', wordWrap:true, wordWrapWidth:400});
			this._goal.label.x = -260;
			this._goal.label.anchor.set(0, 0.5);
			goal.addChild(this._goal.label);
		}

		this._goal.snowflake = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_snowflake"));
		this._goal.snowflake.x = 220;
		this._goal.snowflake.anchor.set(0.5);
		this._goal.snowflake.scale.set(0.75);
		this._goal.addChild(this._goal.snowflake);

		this._goal.reward = new PIXI.extras.BitmapText("0", {font: "24px Superclarendon Numbers", align: "center"});
		this._goal.reward.x = -this._goal.reward.textWidth/2 + 285;
		this._goal.reward.y = -this._goal.reward.textHeight/2;
		goal.addChild(this._goal.reward);

		// this._goal.reward = new PIXI.Text("?", {font:"30px Arial", fill:0x58EBD2, align:'center'});
		// this._goal.reward.x = 285
		// this._goal.reward.anchor.set(0.5);
		// this._goal.addChild(this._goal.reward);

		var progress = new PIXI.Sprite(this._assetManager.getTexture("ui_goals_complete"));
		progress.x = -310;
		progress.anchor.set(0.5);
		progress.scale.set(0.6);
		goal.addChild(progress);

	// Snowflakes
	this._goalSnowflakes = [];
	for(var i = 0; i < 30; i++)
	{
		var snowflake = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_snowflake"));
		snowflake.anchor.set(0.5);
		snowflake.alpha = 0;
		this.addChild(snowflake);

		this._goalSnowflakes.push(snowflake);
	}
}

/**
 * Update
 */
GameUI.prototype.update = function()
{
	// Coins, update the position only if the number of characters changes
	if(this._coinsContainer._text.text.length != this.level.snowflakes.toString().length)
	{
		this._coinsContainer._text.x += this._coinsContainer._text.textWidth/2;
		this._coinsContainer._text.text = this.level.snowflakes;
		this._coinsContainer._text.validate();
		this._coinsContainer._text.x -= this._coinsContainer._text.textWidth/2;
	}
	else if(this._coinsContainer._text.text != this.level.snowflakes)
	{
		this._coinsContainer._text.text = this.level.snowflakes;
	}

	// Style
	if(this._styleContainer._text.text.length != this.level.styleScore.toString().length)
	{
		this._styleContainer._text.x += this._styleContainer._text.textWidth/2;
		this._styleContainer._text.text = this.level.styleScore;
		this._styleContainer._text.validate();
		this._styleContainer._text.x -= this._styleContainer._text.textWidth/2;
	}
	else if(this._styleContainer._text.text != this.level.styleScore)
	{
		this._styleContainer._text.text = this.level.styleScore;
	}

	// Distance
	if(this.level.endless)
	{
		var newDistance = this.level.avatar.distance + "m";
		if(this._distanceContainer._text.text.length != newDistance.length)
		{
			this._distanceContainer._text.x += this._distanceContainer._text.textWidth/2;
			this._distanceContainer._text.text = newDistance;
			this._distanceContainer._text.validate();
			this._distanceContainer._text.x -= this._distanceContainer._text.textWidth/2;
		}
		else if(this._distanceContainer._text.text != newDistance)
		{
			this._distanceContainer._text.text = newDistance;
		}
	}

	// Progress bar
	if(!this.level.endless)
	{
		this.progressBar.bar.width = Math.max(0, Math.min(1, (this.level.avatar.x / this.level.config.length))) * this._progressBarWidth;
		this.progressBar.chara.x = this.progressBar.bar.width;
	}

	// Goals
	if(this._goalsQueue.length > 0 && this._canShowGoal)
	{
		this.showGoal();
	}

	for(var i = 0; i < this._crystalParticles.length; i++)
	{
		this._crystalParticles[i].update(p3.Timestep.deltaTime)
	}

	// if(this._crystalSwirlParticle)
	// {
		// this._crystalSwirlParticle.update(p3.Timestep.deltaTime);
	// }
}

/**
 * Resize
 */
GameUI.prototype.resize = function()
{
	if(this._coinsContainer)
		this._coinsContainer.x = this.parent._getFirstButtonPositionLeft() - 40;

	if(this._styleContainer)
		this._styleContainer.x = this.parent._getFirstButtonPositionLeft() - 40;

	if(this._distanceContainer)
		this._distanceContainer.x = this.parent._getFirstButtonPositionLeft() - 40;

	if(!this.level.endless)
	{
		this._progressBarWidth        = Math.round(Math.min(Common.STAGE_WIDTH, p3.View.width) - 100);
		this.progressBar.capLeft.x   = -this._progressBarWidth/2;
		this.progressBar.capRight.x  = this._progressBarWidth/2;
		this.progressBar.barBg.x     = -this._progressBarWidth/2;
		this.progressBar.barBg.width = this._progressBarWidth;
		this.progressBar.bar.x       = -this._progressBarWidth/2;
	}
}

/**
 * Add a goal to the display queueGoal
 * @param {String} text
 * @param {Number} reward
 */
GameUI.prototype.queueGoal = function(text, reward)
{
	this._goalsQueue.push({text:text, reward:reward});
}

/**
 * Show a goal from the queue
 */
GameUI.prototype.showGoal = function()
{
	this._canShowGoal = false;
	var goal = this._goalsQueue.splice(0,1)[0];

	this._goal.label.text = goal.text;

	this._goal.reward.x += this._goal.reward.textWidth;
	this._goal.reward.text = goal.reward.toString();
	this._goal.reward.validate();
	this._goal.reward.x -= this._goal.reward.textWidth;

	var tl = new TimelineMax(
	{
		onCompleteScope:this,
		onComplete:function(){this._canShowGoal = true;}
	});

	tl.to(this._goal.scale, .5, {x:1, y:1, ease:Back.easeOut},0);
	tl.to(this._goal.scale, .5, {x:0, y:0, ease:Back.easeIn},2);
	Common.animator.add(tl);

	// Snowflakes animation
	/*
	var count    = 0;
	var countMax = 10;
	var tl = new TimelineMax();
	for(var i = 0; i < this._goalSnowflakes.length && count < countMax; i++)
	{
		var s = this._goalSnowflakes[i];
		if(s.alpha > 0) continue;

		s.position.set(this._goal.x + this._goal.snowflake.x, this._goal.y + this._goal.snowflake.y);
		s.scale.set(0);
		s.alpha = 1;

		tl.to(s.scale, 1, {x: 1, y: 1, ease:Quart.easeOut}, count * 0.1);
		tl.to(s, 1, {x: this._coinsContainer.x + this._coinsContainer._snowflake.x, y: this._coinsContainer.y + this._coinsContainer._snowflake.y, ease : Sine.easeInOut}, count * 0.1);
		tl.to(s, 0.01, {alpha: 0, ease:Linear.easeNone});

		count++;
	}
	Common.animator.add(tl);
	*/
}

/**
 * Show the list of all the goal for the current level
 * @param {Boolean} showRewards
 */
GameUI.prototype.showGoals = function(showRewards)
{
	// Goals
	var goalsContainer = new PIXI.Container();
	goalsContainer.x = Common.STAGE_WIDTH/2;
	goalsContainer.y = Common.STAGE_HEIGHT/2+150;
	this.addChildAt(goalsContainer, 0);

	var totalReward = 0;

	for(var i = 0; i < this._goals.length; i++)
	{
		var id = this._goals[i].id;
		var goalStatus = Common.goalsManager.getGoalStatus(id);
		var goalReward = this._goals[i].reward;

		var goal = new PIXI.Container();
		goal.y = 55 * i;
		goalsContainer.addChild(goal);

		var bg = new PIXI.Sprite(this._assetManager.getTexture("ingame_goal_bg"));
		bg.anchor.set(0.5);
		goal.addChild(bg);

		if(!webfont)
		{
			var text = new PIXI.extras.BitmapText(this._goals[i].label, {font: "24px Mikadan Title", align: "left"});
			text.x = -270;
			text.y = -text.textHeight/2;
			goal.addChild(text);
		}
		else
		{
			var text = new PIXI.Text(this._goals[i].label, {font:"24px Arial", fill:(goalStatus == 1 ? 0x58EBD2 : 0xFFFFFF), align:'left'});
			text.x = -270;
			text.anchor.set(0, 0.5);
			goal.addChild(text);
		}

		var progress = new PIXI.Container();
		progress.x = -310;
		progress.scale.set(0.6);
		goal.addChild(progress);

			var progressBg = new PIXI.Sprite(this._assetManager.getTexture("ui_goals_bar"));
			progressBg.anchor.set(0.5);
			progress.addChild(progressBg);

			if(goalStatus == 1)
			{
				var progressBg = new PIXI.Sprite(this._assetManager.getTexture("ui_goals_complete"));
				progressBg.anchor.set(0.5);
				progress.addChild(progressBg);
			}
			else
			{
				var progressBg = new PIXI.Sprite(this._assetManager.getTexture("ui_goals_bar"));
				progressBg.anchor.set(0.5);
				progress.addChild(progressBg);

				if(goalStatus > 0)
				{
					var progressBar = new PIXI.Sprite(this._assetManager.getTexture("ui_goals_fill"));
					progressBar.anchor.set(0.5);
					progress.addChild(progressBar);

						var canvas = document.createElement('canvas');
						canvas.width  = 128;
						canvas.height = 128;
						var ctx = canvas.getContext("2d");

						ctx.moveTo(canvas.width/2, canvas.height/2);
						ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2, -Math.PI/2, 2*Math.PI*goalStatus-Math.PI/2);
						ctx.lineTo(canvas.width/2, canvas.height/2);
						ctx.fillStyle = 'white';
						ctx.fill();

						var mask = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
						mask.anchor.set(0.5);
						progressBar.addChild(mask);
						progressBar.mask = mask;
				}
			}

		if(showRewards && goalStatus == 1)
		{
			totalReward += goalReward;

			var snowflake = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_snowflake"));
			snowflake.x = 220;
			snowflake.anchor.set(0.5);
			snowflake.scale.set(0.75);
			goal.addChild(snowflake);

			if(!webfont)
			{
				var text = new PIXI.extras.BitmapText(goalReward.toString(), {font: "24px Superclarendon Numbers", align: "center"});
				text.x = -text.textWidth/2 + 285;
				text.y = -text.textHeight/2;
				goal.addChild(text);
			}
			else
			{
				var text = new PIXI.Text(goalReward, {font:"24px Arial", fill: (goalStatus == 1 ? 0x58EBD2 : 0xFFFFFF), align:'center'});
				text.x = 285;
				text.anchor.set(0.5);
				goal.addChild(text);
			}

			// Snowflakes particles
			var count    = 0;
			var countMax = 10;
			var tl = new TimelineMax();
			for(var p = 0; p < this._goalSnowflakes.length && count < countMax; p++)
			{
				var s = this._goalSnowflakes[p];
				if(s.alpha > 0) continue;

				s.position.set(goalsContainer.x + goal.x + snowflake.x, goalsContainer.y + goal.y + snowflake.y);
				s.scale.set(0);
				s.alpha = 1;

				tl.to(s.scale, 1,    {x: 1, y: 1, ease:Quart.easeOut}, (count + i/3) * 0.1);
				tl.to(s,       1,    {x: this._coinsContainer.x + this._coinsContainer._snowflake.x, y: this._coinsContainer.y + this._coinsContainer._snowflake.y, ease : Sine.easeInOut}, (count + i/3) * 0.1);
				tl.to(s,       1,    {rotation:2 * Math.PI, ease:Sine.easeInOut}, (count + i/3) * 0.1);
				tl.to(s,       0.01, {alpha: 0, ease:Linear.easeNone});

				count++;
			}
		}
	}

	var tl = new TimelineMax(
	{
		onCompleteScope:this,
		onComplete:function()
		{
			this.removeChild(goalsContainer);
			this._canShowGoal = true;
		}
	});

	// Show goals
	tl.to(goalsContainer, .3, {alpha:1, ease:Sine.easeOut}, 0);
	tl.to(goalsContainer, .3, {y:goalsContainer.y, ease:Sine.easeOut}, 0);

	// Hide goals
	tl.to(goalsContainer, .3, {alpha:0, ease:Sine.easeOut},                  2.5);
	tl.to(goalsContainer, .3, {y:goalsContainer.y + 100, ease:Sine.easeOut}, 2.5);
	Common.animator.add(tl);


	// Increment snowflake score
	if(totalReward != 0)
	{
		var tl = new TimelineMax();
		tl.to(this.level, 1, {snowflakes:this.level.snowflakes + totalReward, ease:Linear.easeNone, onUpdateScope:this, onUpdate:function()
		{
			this.level.snowflakes = Math.floor(this.level.snowflakes);
			console.log(this.level.snowflakes);
		}}, 0.9);

		Common.animator.add(tl);
	}


	goalsContainer.alpha = 0;
	goalsContainer.y += 100;

	this._canShowGoal = false;
}

/**
 * Show a crystal
 * @param {String} character
 * @param {Number} index
 */
GameUI.prototype.crystalCollected = function(character, index)
{
	var tl = new TimelineMax();
		tl.to(this._crystals[this._characters.indexOf(character)*3+index], .25, {alpha:1, ease:Linear.easeNone}, 0.25);
	Common.animator.add(tl);

	// Show and hide the crystal container
	this._topContainerTween.kill();
	this._topContainerTween = new TimelineMax();
		this._topContainerTween.to(this._topContainer, .25, {alpha:1, ease:Sine.easeInOut}, 0);
		this._topContainerTween.to(this._topContainer, .5, {alpha:0, ease:Sine.easeInOut}, 2);
	Common.animator.add(this._topContainerTween);

	if(Common.savedData.getLevelCharacterCrystalCount(Common.savedData.level, character) == 3)
	{
		for(var i = 0; i < 3; i++)
		{
			TweenMax.to(this._crystalParticles[i], 0, {delay:i*.3, onCompleteScope:this, onCompleteParams:[i], onComplete:function(i){
				this._crystalParticles[this._characters.indexOf(character)*3+i].emit = true;
			}});
		}
		// this._crystalSwirlParticle.emit = true;
	}

}

/**
 * Show the troll count
 * @param {String} character
 * @param {Number} index
 */
GameUI.prototype.trollCollected = function()
{
	this._trollCount.trollCollected++;
	var trollCount = 3;
	this._trollCount.text = this._trollCount.trollCollected + "/" + trollCount;

	// Show and hide the crystal container
	this._topContainerTween.kill();
	this._topContainerTween = new TimelineMax();
		this._topContainerTween.to(this._topContainer, .25, {alpha:1, ease:Sine.easeInOut}, 0);
		this._topContainerTween.to(this._topContainer, .5, {alpha:0, ease:Sine.easeInOut}, 2);
	Common.animator.add(this._topContainerTween);
}


/**
 * Show a tutorial message
 * @param {String} text
 */
GameUI.prototype.tutorial = function(text)
{
	if(!webfont)
	{
		this._tutorial.label.x += this._tutorial.label.textWidth/2;
		this._tutorial.label.y += this._tutorial.label.textHeight/2;
		this._tutorial.label.text = text;
		this._tutorial.label.validate();
		this._tutorial.label.x -= this._tutorial.label.textWidth/2;
		this._tutorial.label.y -= this._tutorial.label.textHeight/2;
	}
	else
	{
		this._tutorial.label.text = text;
	}

	// Show and hide the tutorial container
	this._tutorialTween = new TimelineMax();
		this._tutorialTween.to(this._tutorial.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0);
		this._tutorialTween.to(this._tutorial.scale, .5, {x:0, y:0, ease:Back.easeIn}, 2);
	Common.animator.add(this._tutorial);
}

/**
 * Highlight a UI element
 * @param {String} text
 */
GameUI.prototype.highlight = function(what)
{
	if(!this._highlight)
	{
		this._highlight = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_nav_play"));
		this._highlight.anchor.set(0.5);
		this.addChild(this._highlight);
	}

	// Position
	switch(what)
	{
		case "style":
			this._highlight.position.set(this._styleContainer.x + 200, this._styleContainer.y);
			this._highlight.scale.set(-1, 1);
			break;

		default:
			return;
			this._highlight.scale.set(0, 0);
			break;
	}

	// Animation
	if(!!this._highlightTween)
		this._highlightTween.kill();

	this._highlightTween = new TimelineMax();
		this._highlightTween.to(this._highlight.scale, .3, {x:this._highlight.scale.x, y:this._highlight.scale.y, ease:Back.easeOut}, 0);
		this._highlightTween.to(this._highlight.scale, .3, {x:0, y:0, ease:Back.easeIn}, 2);
	Common.animator.add(this._highlightTween);

	this._highlight.scale.set(0, 0);

}

/**
 * Hide the UI when the game's over
 */
GameUI.prototype.gameOver = function()
{
	var tl = new TimelineMax();

		// Show the goals list
		tl.to(this._goal, .5, {alpha:0, ease:Linear.easeNone}, 0);

		// Hide the progress bar
		if(!this.level.endless)
			tl.to(this.progressBar, .5, {alpha:0, ease:Linear.easeNone}, 0);

	Common.animator.add(tl);

	// Show and hide the crystal container
	if(!this.level.endless && this.level.completed)
	{
		this._topContainerTween.kill();
		this._topContainerTween = new TimelineMax();
		this._topContainerTween.to(this._topContainer, .25, {alpha:1, ease:Sine.easeInOut}, 0);
		Common.animator.add(this._topContainerTween);
	}
}
},{"../Common":2}],17:[function(require,module,exports){
var Common        = require("../Common");

var BezierPath         = require("../editor/BezierPath");
var LevelLayer         = require("../game/LevelLayer");
var LevelPath          = require("../game/LevelPath");
var Avatar             = require("../game/Avatar");
var ObjectManager      = require("../game/ObjectManager");
var ObjectCoin         = require("../game/ObjectCoin");
var ObjectPowerup      = require("../game/ObjectPowerup");
var ObjectCrystal      = require("../game/ObjectCrystal");
var ObjectObstacle     = require("../game/ObjectObstacle");
var ObjectDecoration   = require("../game/ObjectDecoration");
var ObjectCameraZoom   = require("../game/ObjectCameraZoom");
var ObjectJumpPlatform = require("../game/ObjectJumpPlatform");
var ObjectLevelEnd     = require("../game/ObjectLevelEnd");
var ObjectShrinkLock   = require("../game/ObjectShrinkLock");
var ObjectTutorial     = require("../game/ObjectTutorial");
var ObjectSven         = require("../game/ObjectSven");
var ObjectSled         = require("../game/ObjectSled");
var ObjectMarshmallow  = require("../game/ObjectMarshmallow");
var ObjectTroll        = require("../game/ObjectTroll");
var ObjectSnowball     = require("../game/ObjectSnowball");
var Shockwave          = require("../game/Shockwave");
var LevelRecord        = require("../game/LevelRecord");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function Level(endless, data, backgroundPrefix)
{
	this._assetManager = p3.AssetManager.instance;
	PIXI.Container.call(this);

	this.debug            = false;
	this.data             = data;
	this.backgroundPrefix = backgroundPrefix;
	this.layerContainer   = null;
	this.layers           = [];
	this.objectManager    = null;
	this.endless          = endless;
	this.completed        = false;
	this.snowflakes       = 0;
	this.score            = 0;
	this.styleScore       = 0;
	this.defaultZoom      = 0.8;

	if(data != "")
	{
		if(!this.endless)
		{
			console.log(this._assetManager.getJSON(data));
			this.config = this._assetManager.getJSON(data);
		}
		else
		{
			console.log(this._assetManager.getJSON(data.start[0]));
			this.config  = this._assetManager.getJSON(data.start[0]);
		}
	}

	// Avatar
	this.avatar     = new Avatar();
	this.focusPoint = new PIXI.Point(this.avatar.focusPointLand.point.x, this.avatar.focusPointLand.point.y);
	this.focusXActive = true;
	this.focusYActive = true;
	this.focusPosition = new PIXI.Point(0,0);
	this.focusPointTween = null;

	// Zoom
	this.zoom       = 1;
	this.zoomTarget = 1;
	this.zoomTween  = null;

	// Shake
	this._isShake       = false;
	this._shakeTime     = 0;
	this._shakeTimeEnd  = 1;
	this._shakeStrength = new PIXI.Point(10,10);

	// Shockwave effect
	this._shockwave = null;
	this._shockwaveTexture = this._assetManager.getTexture("shockwave");
}
module.exports = Level;
Level.prototype = Object.create(PIXI.Container.prototype);
Level.prototype.constructor = Level;

/**
 * Init
 */
Level.prototype.init = function()
{
	// Load objects
	var pools =
	[
		{id:"default",         pool:"default",         base:ObjectDecoration,    args:[], quantity: 20},
		{id:"coin",            pool:"coin",            base:ObjectCoin,          args:[], quantity: 20},
		{id:"troll_magic",     pool:"troll_magic",     base:ObjectPowerup,       args:[]},
		{id:"crystal_cyan",    pool:"crystal_cyan",    base:ObjectCrystal,       args:["cyan"]},
		{id:"crystal_green",   pool:"crystal_green",   base:ObjectCrystal,       args:["green"]},
		{id:"crystal_pink",    pool:"crystal_pink",    base:ObjectCrystal,       args:["pink"]},
		{id:"crystal_purple",  pool:"crystal_purple",  base:ObjectCrystal,       args:["purple"]},
		{id:"jump_platform",   pool:"jump_platform",   base:ObjectJumpPlatform,  args:[]},
		{id:"level_end",       pool:"level_end",       base:ObjectLevelEnd,      args:[true]},
		{id:"level_gameover",  pool:"level_gameover",  base:ObjectLevelEnd,      args:[false]},
		{id:"camera_zoom",     pool:"camera_zoom",     base:ObjectCameraZoom,    args:[]},
		{id:"shrink_lock",     pool:"shrink_lock",     base:ObjectShrinkLock,    args:[true]},
		{id:"shrink_unlock",   pool:"shrink_unlock",   base:ObjectShrinkLock,    args:[false]},
		{id:"tutorial",        pool:"tutorial",        base:ObjectTutorial,      args:[]},
		{id:"sven",            pool:"sven",            base:ObjectSven,          args:[]},
		{id:"sled",            pool:"sled",            base:ObjectSled,          args:[]},
		{id:"troll",           pool:"troll",           base:ObjectTroll,         args:[false]},
		{id:"troll_pabbie",    pool:"troll_pabbie",    base:ObjectTroll,         args:[true]},
		{id:"marshmallow",     pool:"marshmallow",     base:ObjectMarshmallow,   args:[]},
		{id:"snowball",        pool:"snowball",        base:ObjectSnowball,      args:[]},
		{id:"crate_01_00",     pool:"obstacle",        base:ObjectObstacle,      args:[], quantity: 6},
		{id:"crate_01_01",     pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"snowman_01_00",   pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"snowman_02_00",   pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"snowman_03_00",   pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"stones_01_00",    pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"stones_02_00",    pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"stones_03_00",    pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"stones_01_01",    pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"stones_02_01",    pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"stones_03_01",    pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"stones_01_02",    pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"stones_02_02",    pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"stones_03_02",    pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"barrel_01_00",    pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"barrel_02_00",    pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"barrel_03_00",    pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"wood_01_00",      pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"wood_02_00",      pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"wood_03_00",      pool:"obstacle",        base:ObjectObstacle,      args:[]},
		// {id:"carriage_01_00",  pool:"obstacle",        base:ObjectObstacle,      args:[]},
		// {id:"carriage_02_00",  pool:"obstacle",        base:ObjectObstacle,      args:[]},
		// {id:"carriage_03_00",  pool:"obstacle",        base:ObjectObstacle,      args:[]},
		{id:"iceblock_01_00",  pool:"obstacle_ice",    base:ObjectObstacle,      args:[true], quantity: 10},
		{id:"iceblock_02_00",  pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"iceblock_03_00",  pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_01_00",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_02_00",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_03_00",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_01_01",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_02_01",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_03_01",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_01_02",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_02_02",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_03_02",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_01_03",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_02_03",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_03_03",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_01_04",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_02_04",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_03_04",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_01_05",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_02_05",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]},
		{id:"icecube_03_05",   pool:"obstacle_ice",    base:ObjectObstacle,      args:[true]}
	];

	this.objectManager = new ObjectManager(pools);
	this.objectManager.init();

	// Layers
	this.layerContainer = new PIXI.Container();
	this.addChild(this.layerContainer);


	// Background
	this.createBackgroundLayers();

	// Map layers
	for(var i = 0; i < this.config.layers.length; i++)
	{
		var layer = this.addLayer(this.config.layers[i].name, new PIXI.Point(0,0), this.config.layers[i]);
		layer.init();
	}

	// Character
	this.addLayer("avatar", new PIXI.Point(0,0), {name:"avatar", depth:9.5});
	this.getLayer("avatar").addChild(this.avatar);
	this.avatar.init(this);
	this.avatar.x = 0;
	this.avatar.y = 0;

	// Bridge layer
	if(this.avatar.abilities.bridge)
		this.addLayer("bridge", new PIXI.Point(0,0), {name:"bridge", depth:-0.5});

	// Record
	if(this.endless && Common.savedData.getHighscore("endless_distance") > 0)
	{
		this.record = new LevelRecord(Common.savedData.getHighscore("endless_distance"));
		this.record.init(this);
		this.addChild(this.record);
	}

	// Sort layers
	this.sortChildren();

	// Reset crystal and troll cache
	ObjectCrystal.prototype.indexes   = {};
	ObjectCrystal.prototype.collected = {};
	ObjectTroll.prototype.indexes   = 0;
	ObjectTroll.prototype.collected = [];

	// Zoomed at start
	this.zoom = 1.5;
	this.changeZoom(this.defaultZoom, 3);
}

/**
 * Update
 */
Level.prototype.update = function()
{
	var oldPosition = new PIXI.Point(this.avatar.x, this.avatar.y);

	this.avatar.update();

	// Shake
	if(this._isShake)
	{
		this._shakeTime += p3.Timestep.deltaTime;
		if(this._shakeTime >= this._shakeTimeEnd)
		{
			this._shakeTime = 0;
			this._isShake = false;
		}
	}

	// Focus the camera
	if(this.focusXActive) this.focusPosition.x = this.avatar.x;
	if(this.focusYActive) this.focusPosition.y = this.avatar.y;

	this.x = Common.STAGE_WIDTH  * this.focusPoint.x - this.focusPosition.x * this.zoom;
	this.y = Common.STAGE_HEIGHT * this.focusPoint.y - this.focusPosition.y * this.zoom;
	// this.y += this.avatar.headbobHeight * Math.sin(this.avatar.headbobTime * this.avatar.headbobFrequency);

	if(this._isShake)
	{
		this.x += p3.Utils.randomInt(-1,1) * (this._shakeStrength.x * (1 - this._shakeTime/this._shakeTimeEnd));
		this.y += p3.Utils.randomInt(-1,1) * (this._shakeStrength.y * (1 - this._shakeTime/this._shakeTimeEnd));
	}

	// Zoom
	this.scale.x = this.zoom;
	this.scale.y = this.zoom;

	// Move the layers
	var deltaMovement = new PIXI.Point(this.focusXActive ? (this.avatar.x - oldPosition.x) : 0, this.focusYActive ? (this.avatar.y - oldPosition.y) : 0);
	for(var i = 0; i < this.layers.length; i++)
	{
		this.layers[i].update(deltaMovement);
	}

	// Endless mode, add new parts if needed
	if(this.endless)
	{
		// Update the record
		if(!!this.record)
			this.record.update();

		var layer = this.getLayer("path"); // Hardcoded, for now

		if(layer.paths.length == 0)
		{
			var lastPoint = new PIXI.Point();

			for(var i = 0; i < layer.childrenPaths.length; i++)
			{
				if(layer.childrenPaths[i].config.closed) continue;

				if(lastPoint.x < layer.childrenPaths[i].config.points[layer.childrenPaths[i].config.points.length-1].x)
				{
					lastPoint = layer.childrenPaths[i].config.points[layer.childrenPaths[i].config.points.length-1];
				}
			}

			// Pick a random piece
			if(this.data.parts.length > 0)
				var piece = this._assetManager.getJSON(this.data.parts[p3.Utils.randomInt(0, this.data.parts.length-1)]);
			else if(this.data.partDebug != "")
				var piece = this.data.partDebug;

			for(var l = 0; l < piece.layers.length; l++)
			{
				var layer = this.getLayer(piece.layers[l].name);

				if(layer == null)
				{
					var layer = this.addLayer(piece.layers[l].name, new PIXI.Point(0,0), piece.layers[l]);
					this.sortChildren();
				}

				var clone = JSON.parse(JSON.stringify(piece.layers[l]));
				layer.queuePaths(clone.paths, lastPoint);
				layer.queueObjects(clone.objects, lastPoint);
			}
		}
	}
}

/**
 * Dispose
 */
Level.prototype.dispose = function()
{
	this.avatar.dispose();
}

/**
 * Add a layer
 * @param {String} id
 * @param {PIXI.Point} parallax
 * @param {Object} config
 * @returns {LevelLayer}
 */
Level.prototype.addLayer = function(id, parallax, config)
{
	var layer = new LevelLayer(id, parallax, config ? config : {name:id, depth:0});
	layer.level = this;

	this.layers.push(layer);
	this.layerContainer.addChild(layer);

	return layer;
}

/**
 * Return a layer or null if not found
 * @param {String} id
 * @returns {LevelLayer}
 */
Level.prototype.getLayer = function(id)
{
	for(var i = 0; i < this.layers.length; i++)
	{
		if(this.layers[i].id == id)
		{
			return this.layers[i];
		}
	}
	return null;
}

/**
 * Create background layers
 */
Level.prototype.createBackgroundLayers = function()
{
	var layers = [];
	// layers.push({id:"sky",        image:this.backgroundPrefix + "sky_gradients_00", scale:1, xSpeed:0.00, y:0});
	// layers.push({id:"clouds",     image:this.backgroundPrefix + "m1clouds",         scale:1, xSpeed:0.08, y:0});
	//layers.push({id:"mountains",  image:this.backgroundPrefix + "m1bg00",           scale:1, xSpeed:0.05, y:200});
	//layers.push({id:"farFields",  image:this.backgroundPrefix + "m1bg01",           scale:2, xSpeed:0.07, y:350});
	//layers.push({id:"MidFields1", image:this.backgroundPrefix + "m1bg02",           scale:2, xSpeed:0.1,  y:350});

	var lightsAlpha = Common.savedData.getCollectedCrystalCount() / Common.savedData.getCrystalCount();

	layers.push({id:"sky",          image:this.backgroundPrefix + "bg_00",          xScale:1,   yScale:1,   xSpeed:0.00, y:-150,  alpha: 1});
	layers.push({id:"stars",        image:"night_stars",                            xScale:1,   yScale:1,   xSpeed:0.00, y:0,     alpha: 1});
	layers.push({id:"lights_blue",  image:"northern_lights_blue",                   xScale:4,   yScale:2,   xSpeed:0.00, y:-180,  alpha: lightsAlpha, xTiling:15,});
	layers.push({id:"lights_green", image:"northern_lights_green",                  xScale:4,   yScale:2,   xSpeed:0.00, y:-215,  alpha: lightsAlpha, xTiling:-20});
	layers.push({id:"lights_pink",  image:"northern_lights_pink",                   xScale:4,   yScale:2,   xSpeed:0.00, y:-250,  alpha: lightsAlpha, xTiling:10, });
	layers.push({id:"mountains",    image:this.backgroundPrefix + "mountains_00",   xScale:1,   yScale:1,   xSpeed:0.05, y:280,   alpha: 1});
	layers.push({id:"farFields",    image:this.backgroundPrefix + "hills_00",       xScale:1.5, yScale:1.5, xSpeed:0.09, y:300, alpha: 1});
	layers.push({id:"farFields",    image:this.backgroundPrefix + "hills_01",       xScale:1.5, yScale:1.5, xSpeed:0.12, y:300, alpha: 1});

	for(var i = 0; i < layers.length; i++)
	{
		var layer = this.addLayer(layers[i].id, new PIXI.Point(layers[i].xSpeed, 0), {name:layers[i].id, depth:-1000 + i});
		layer.setBackground(layers[i].image, layers[i].y, new PIXI.Point(layers[i].xScale, layers[i].yScale), layers[i].alpha);

		if(layers[i].xTiling)
			layer.xTiling = layers[i].xTiling;
	}
}

/**
 * Reorder layers in canvas using their depth value
 */
Level.prototype.sortChildren = function()
{
	this.layerContainer.children.sort(function(a, b)
	{
		// if(!a.config || !b.config) return 0; // Skip particles when adding layers during endless mode

		if(a.config.depth < b.config.depth) return -1;
		if(a.config.depth > b.config.depth) return 1;
		return 0;
	});
}

/**
 * Change zoom over time
 * @param {Number} zoom (1: 100%)
 * @param {Number} time
 * @param {Number} delay
 */
Level.prototype.changeZoom = function(zoom, time, delay)
{
	if(this.zoomTween != null)
		this.zoomTween.kill();

	if(zoom == this.zoom) return;

	this.zoomTween = new TimelineMax();
	this.zoomTween.to(this, time, {zoom: zoom, ease:Sine.easeInOut}, !!delay ? delay : 0);
	Common.animator.add(this.zoomTween);

	this.zoomTarget = zoom;
}

/**
 * Change the focus point over time
 * @param {PIXI.Point} focusPoint
 * @param {Number} time
 * @param {Number} delay
 */
Level.prototype.changeFocusPoint = function(focusPoint, time, delay)
{
	if(this.focusPointTween != null)
		this.focusPointTween.kill();

	if(this.focusPoint.equal(focusPoint)) return;

	this.focusPointTween = new TimelineMax();
	this.focusPointTween.to(this.focusPoint, time, {x: focusPoint.x, y:focusPoint.y, ease:Sine.easeInOut}, !!delay ? delay : 0);
	Common.animator.add(this.focusPointTween);
}


/**
 * Execute a shake effect
 * @param {Number} time
 * @param {Number} amount
 */
Level.prototype.shake = function(time, amount)
{
	this._isShake       = true;
	this._shakeTime     = 0;
	this._shakeTimeEnd  = time;
	this._shakeStrength = amount;
}

/**
 * Execute a shockwave effect
 * @param {Object} gameobject
 * @param {Number} time
 */
Level.prototype.shockwave = function(gameobject, time)
{
	this._shockwave = new Shockwave(this, this._shockwaveTexture);
	this._shockwave.animate(time);
	gameobject.addChild(this._shockwave);
}

/**
 * Exectuted when the game ends, either by colliding with a ObjectLevelEnd entity
 */
Level.prototype.gameOver = function()
{
	// SCORE
	// ====================

	// Score
	this.score += this.avatar.distance * this._assetManager.getJSON("config").score.distance;
	this.score += this.snowflakes      * this._assetManager.getJSON("config").score.snowflake;
	this.score += this.styleScore;

	// Highscore
	if(!this.endless)
	{
		Common.savedData.recordHighscore(Common.savedData.level, this.score);
	}
	else
	{
		Common.savedData.recordHighscore("endless", this.score);
		Common.savedData.recordHighscore("endless_distance", this.avatar.distance);
	}
	
	// SNOWFLAKES
	// ====================
	Common.savedData.coins += this.snowflakes;

	// CRYSTALS
	// ====================
	// Save collected crystals (even when the player has lost)
	for(var character in ObjectCrystal.prototype.collected)
	{
		for(var i = 0; i < ObjectCrystal.prototype.collected[character].length; i++)
		{
			Common.savedData.crystals[Common.savedData.level][character][ObjectCrystal.prototype.collected[character][i]] = true;
		}
	}

	// All crystals collected message
	if(!Common.savedData.endGameMessage.crystals.shown && Common.savedData.getCrystalCount() == Common.savedData.getCollectedCrystalCount())
	{
		Common.savedData.endGameMessage.crystals.show = true;
	}

	// TROLLS
	// ====================

	// Save collected trolls
	for(var i = 0; i < ObjectTroll.prototype.collected.length; i++)
	{
		Common.savedData.trolls[Common.savedData.level][ObjectTroll.prototype.collected[i]] = true;
	}

	// All trolls collected message
	if(!Common.savedData.endGameMessage.trolls.shown && Common.savedData.getCollectedTrollCount() == Common.savedData.getTrollCount())
	{
		Common.savedData.endGameMessage.trolls.show = true;
	}

	// UNLOCKABLES
	// ====================
	if(!this.endless)
	{
		if(this.completed)
		{
			// Unlock new levels
			if(Common.savedData.level == Common.savedData.levelsUnlocked-1)
			{
				if(Common.savedData.level < (Common.savedData.levels-1))
				{
					Common.savedData.levelsUnlocked++;
					Common.savedData.showUnlockedLevel = true;
				}
				else
				{
					if(!Common.savedData.endGameMessage.levels.shown)
					{
						Common.savedData.endGameMessage.levels.show = true;
					}
				}
			}

			// Unlock endless
			if(!Common.savedData.endGameMessage.endless.shown && Common.savedData.level == this._assetManager.getJSON("config").endless.levelRequired-1)
			{
				Common.savedData.endGameMessage.endless.show = true;
			}

			// Unlock new characters
			if(Common.savedData.level == 0 && !Common.savedData.charactersUnlocked.kristoff)
			{
				Common.savedData.charactersUnlocked.kristoff = true;
				Common.savedData.showUnlockedCharacter = "kristoff";
			}
			if(Common.savedData.level == 2 && !Common.savedData.charactersUnlocked.olaf)
			{
				Common.savedData.charactersUnlocked.olaf = true;
				Common.savedData.showUnlockedCharacter = "olaf";
			}
			if(Common.savedData.level == 4 && !Common.savedData.charactersUnlocked.elsa)
			{
				Common.savedData.charactersUnlocked.elsa = true;
				Common.savedData.showUnlockedCharacter = "elsa";
			}
		}

		// Unlock pabbie
		if((Common.savedData.getCollectedCrystalCount() == Common.savedData.getCrystalCount()) && !Common.savedData.charactersUnlocked.pabbie)
		{
			Common.savedData.charactersUnlocked.pabbie = true;
			Common.savedData.showUnlockedCharacter = "pabbie";
		}

		// Event Tracking
		if(Common.savedData.showUnlockedCharacter != "")
		{
			Common.ctow.trackEvent(
			{
				event      : "game_action",
				game_level : (Common.savedData.level+1),
				game_tier1 : "character_unlocked",
				game_tier2 : Common.savedData.showUnlockedCharacter
			});
		}
	}

	// Loss Streak
	if(!this.endless)
	{
		if(this.completed)
			Common.savedData.lossStreak.count = 0;
		else
			Common.savedData.lossStreak.count++;
	}

	// SAVE
	// ====================
	Common.savedData.save();

	this.parent.gameOver();
}

/**
 * Exectuted when the game is paused
 */
Level.prototype.stopLoops = function()
{
	// Stop loops
	this.avatar.stopLoops();

	var marshmallows = this.objectManager.getObjectsOfType("marshmallow");
	for(var i = 0; i < marshmallows.length; i++)
	{
		marshmallows[i].stopLoops();
	}
}
},{"../Common":2,"../editor/BezierPath":8,"../game/Avatar":14,"../game/LevelLayer":18,"../game/LevelPath":19,"../game/LevelRecord":20,"../game/ObjectCameraZoom":22,"../game/ObjectCoin":23,"../game/ObjectCrystal":24,"../game/ObjectDecoration":25,"../game/ObjectJumpPlatform":26,"../game/ObjectLevelEnd":27,"../game/ObjectManager":28,"../game/ObjectMarshmallow":29,"../game/ObjectObstacle":30,"../game/ObjectPowerup":31,"../game/ObjectShrinkLock":32,"../game/ObjectSled":33,"../game/ObjectSnowball":34,"../game/ObjectSven":35,"../game/ObjectTroll":36,"../game/ObjectTutorial":37,"../game/Shockwave":39}],18:[function(require,module,exports){
var Common     = require("../Common");
var LevelPath  = require("../game/LevelPath");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function LevelLayer(id, parallax, config)
{
	this.level      = null;

	this.id              = id;
	this.parallax        = typeof(parallax) != "undefined" ? parallax : new PIXI.Point(1,1);
	this.bg              = null;
	this.config          = !!config ? config : null;
	this.paths           = [];
	this.objects         = [];
	this.childrenPaths   = [];
	this.childrenObjects = [];

	this.assetManager = p3.AssetManager.instance;
	PIXI.Container.call(this);
}
module.exports = LevelLayer;
LevelLayer.prototype = Object.create(PIXI.Container.prototype);
LevelLayer.prototype.constructor = LevelLayer;

/**
 * Init
 */
LevelLayer.prototype.init = function()
{
	if(this.config == null) return;

	this.queuePaths(this.config.paths);
	this.queueObjects(this.config.objects);
}

/**
 * Update
 */
LevelLayer.prototype.update = function(deltaMovement)
{
	if(!this.bg)
	{
		if(this.parallax.x != 0)
			this.x += deltaMovement.x * this.parallax.x;

		if(this.parallax.y != 0)
			this.y += deltaMovement.y * this.parallax.y;

		var newElements = false;

		// Update paths
		for(var i = 0; i < this.childrenPaths.length; i++)
		{
			this.childrenPaths[i].update();
		}

		// Add new paths
		while(this.paths.length > 0 && (this.paths[0].bounds[0] < (Common.STAGE_WIDTH - this.level.x) * (1/this.level.zoom)) && (this.paths[0].bounds[1] > - this.level.x * (1/this.level.zoom)))
		{
			var levelPath = new LevelPath(this, this.paths[0]);
			levelPath.init();
			levelPath.render();
			this.addChild(levelPath)
			this.childrenPaths.push(levelPath);

			this.paths.splice(0, 1);

			newElements = true;
		}

		// Remove paths outside
		for(var i = 0; i < this.childrenPaths.length; i++)
		{
			if(this.childrenPaths[i].config.bounds[1] < - this.level.x * (1/this.level.zoom))
			{
				this.childrenPaths[i].dispose();
				this.removeChild(this.childrenPaths[i]);
				this.childrenPaths.splice(i, 1);
			}
		}

		// Add new objects
		while(this.objects.length > 0 && (this.objects[0].position.x < (Common.STAGE_WIDTH - this.level.x) * (1/this.level.zoom)) && (this.objects[0].position.x > - this.level.x * (1/this.level.zoom)))
		{
			// Hardcoded troll behaviour
			// Hide signs and troll for pabbie and collectable trolls for other characters
			if((Common.savedData.character == "pabbie" && (this.objects[0].id == "troll_sign" || this.objects[0].id == "troll_sign_arrow" || this.objects[0].id == "troll")
			//|| (Common.savedData.character != "pabbie" && (this.objects[0].id == "troll_pabbie")))
			|| (!Common.savedData.endGameMessage.crystals.shown && (this.objects[0].id == "troll_pabbie")))
			)
			{
				this.objects.splice(0, 1);
				continue;
			}

			// Add object
			this.addObject(this.objects[0].id, this.objects[0]);
			this.objects.splice(0, 1);
			newElements = true;
		}

		// Remove objects outside
		for(var i = 0; i < this.childrenObjects.length; i++)
		{
			if(this.childrenObjects[i].removeWhenOutside && this.childrenObjects[i].x < - this.level.x * (1/this.level.zoom))
			{
				this.childrenObjects[i].dispose();
				this.level.objectManager.dispose(this.childrenObjects[i]); // Free the resource from the pool
				this.removeChild(this.childrenObjects[i]);
				this.childrenObjects.splice(i, 1);
			}
		}

		// Sort objects and paths if new ones have been added
		if(newElements)
			this.sortChildren();
	}
	else
	{
		this.x = -this.level.x * 1/this.level.zoom;
		this.y = -this.level.y * 1/this.level.zoom;// + (Common.STAGE_HEIGHT * (1-this.level.zoom)/2) * 1/this.level.zoom;
		this.bg.tilePosition.x -= deltaMovement.x * this.parallax.x;
		this.bg.tilePosition.y -= deltaMovement.y * this.parallax.y;
		// this.bg.width = Common.STAGE_WIDTH * 1/this.level.zoom;
		// this.bg.tileScale = new PIXI.Point(this.bgScale * 1/this.level.zoom, this.bgScale * 1/this.level.zoom);
		this.bg.scale = new PIXI.Point(1/this.level.zoom, 1/this.level.zoom);
		this.bg.y = this.bg.yOr * 1/this.level.zoom;
		
		if(this.xTiling)
		{
			this.bg.tilePosition.x += p3.Timestep.deltaTime * this.xTiling;	
		}
	}

	// Update children
	for(var i = 0; i < this.childrenObjects.length; i++)
	{
		this.childrenObjects[i].update();
	}
}

/**
 * Store a list of paths that will be added to the level once they are close enough
 * @param {Array} paths
 * @param {PIXI.Point} delta
 */
LevelLayer.prototype.queuePaths = function(paths, delta)
{
	for(var i = 0; i < paths.length; i++)
	{
		if(typeof(delta) != "undefined")
		{
			for(var p = 0; p < paths[i].points.length; p++)
			{
				paths[i].points[p].x += delta.x;
				paths[i].points[p].y += delta.y;
			}
			paths[i].bounds[0] += delta.x;
			paths[i].bounds[1] += delta.x;
		}

		this.paths.push(paths[i])
	}

	this.paths.sort(function(a, b)
	{
		if(a.bounds[0] < b.bounds[0]) return -1;
		if(a.bounds[0] > b.bounds[0]) return 1;
		return 0;
	});
}

/**
 * Store a list of objects that will be added to the level once they are close enough
 * @param {Array} objects
 * @param {PIXI.Point} delta
 */
LevelLayer.prototype.queueObjects = function(objects, delta)
{
	if(!delta) delta = new PIXI.Point(0,0);

	for(var i = 0; i < objects.length; i++)
	{
		if(typeof(delta) != "undefined")
		{
			objects[i].position.x += delta.x;
			objects[i].position.y += delta.y;
		}

		this.objects.push(objects[i]);
	}

	this.objects.sort(function(a, b)
	{
		if(a.position.x < b.position.x) return -1;
		if(a.position.x > b.position.x) return 1;
		return 0;
	});
}

/**
 * Add an object to the level
 * @param {String} id
 * @param {Object} config
 */
LevelLayer.prototype.addObject = function(id, config)
{
	var obj = this.level.objectManager.generate(id);
	obj.configure(this.level, config);
	this.addChild(obj)
	this.childrenObjects.push(obj);
}

/**
 * Initialize a background layerX
 * @param {String} image
 * @param {Number} y
 * @param {PIXI.Point} scale
 */
LevelLayer.prototype.setBackground = function(image, y, scale, alpha)
{
	var texture       = this.assetManager.getTexture(image);
	this.bg           = new PIXI.extras.TilingSprite(texture, Common.STAGE_WIDTH, texture.crop.height * scale.y);
	this.bg.tileScale = new PIXI.Point(scale.x, scale.y);
	this.bg.y         = y;
	this.bg.alpha     = alpha;
	this.addChild(this.bg);

	this.bg.yOr = y;
}


/**
 * Reorder the children in canvas using their depth value
 * If the value is the same render objects on top of paths
 * If both are paths order them using their starting position
 */
LevelLayer.prototype.sortChildren = function()
{
	this.children.sort(function(a, b)
	{
		if(a.config.depth < b.config.depth)
			return -1;
		else if(a.config.depth > b.config.depth)
			return +1;
		else if(!!a.config.bounds && !b.config.bounds)
			return -1;
		else if(!a.config.bounds && !!b.config.bounds)
			return +1;
		else if(!!a.config.bounds && !!b.config.bounds)
			return a.config.bounds[0] < b.config.bounds[0] ? -1 : +1;
		return 0;
	});
}
},{"../Common":2,"../game/LevelPath":19}],19:[function(require,module,exports){
var Common     = require("../Common");
var BezierPath = require("../editor/BezierPath");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function LevelPath(layer, config)
{
	this._assetManager = p3.AssetManager.instance;

	this.layer     = layer;
	this.level     = layer.level;
	this.config    = config;
	this.bezier    = new BezierPath();
	this.wireframe = null;
	this.textures  = null;
	this.toDelete  = false;

	this.iceBridgePS = null;

	this.assetManager = p3.AssetManager.instance;
	PIXI.Container.call(this);
}
module.exports = LevelPath;
LevelPath.prototype = Object.create(PIXI.Container.prototype);
LevelPath.prototype.constructor = LevelPath;

/**
 * Init
 */
LevelPath.prototype.init = function()
{
	for(var i = 0; i < this.config.points.length; i++)
	{
		this.bezier.addPoint(this.config.points[i].x, this.config.points[i].y);
	}

	if(this.config.data != "")
	{
		// TODO: parse the json only the first time
		try
		{
			this.config.data = JSON.parse(this.config.data);
		}
		catch(e)
		{
			console.error("Couldn't parse path JSON");
			console.info(e);
		}
	}
}

/**
 * Update
 */
LevelPath.prototype.update = function()
{
	if(!!this.iceBridgePS)
	{
		this.iceBridgePS.updateSpawnPos(this.textures.mask.x + this.textures.mask.bounds.width , this.textures.mask.y+ 50);
		this.iceBridgePS.update(p3.Timestep.deltaTime);
	}
}


/**
 * Render
 */
LevelPath.prototype.render = function()
{
	if(this.textures != null)
	{
		this.removeChild(this.textures);
	}
	this.textures  = new PIXI.Container();

	if(this.level.debug)
	{
		if(this.wireframe != null)
		{
			this.removeChild(this.wireframe);
		}
		this.wireframe = new PIXI.Graphics();
	}

	if(this.bezier.points.length > 1)
	{
		var drawingPoints = this.bezier.getDrawingPoints();

		// Draw fill texture
		if(this.config.texFill != "" && !this.isHidden())
		{
			var lowerPoint = null;
			var contour = [];
			for(var i = 0; i < drawingPoints.length; i++)
			{
				contour.push(new poly2tri.Point(drawingPoints[i].x, drawingPoints[i].y));

				if(lowerPoint == null || lowerPoint < drawingPoints[i].y)
					lowerPoint = drawingPoints[i].y;
			}

			if(!this.config.closed)
			{
				contour.push({x: drawingPoints[drawingPoints.length-1].x, y: lowerPoint + this.config.texFillPadding});
				contour.push({x: drawingPoints[0].x, y: lowerPoint + this.config.texFillPadding});
			}
			else
			{
				// Remove last point if coincides with the first, otherwise the triangulation will fail
				if(contour[0].x == contour[contour.length-1].x && contour[0].y == contour[contour.length-1].y)
				{
					contour.splice(contour.length-1, 1);
				}
			}

			try
			{
				var swctx = new poly2tri.SweepContext(contour);
				swctx.triangulate();
				var triangles = swctx.getTriangles();
			}
			catch(e)
			{
				console.log("Triangulation failed")
			}


			if(!!triangles)
			{
				// Draw the filling mesh
				var texture    = this.assetManager.getTexture(this.config.texFill);
				var vertices   = new Float32Array(6 * triangles.length);
				var uvs        = new Float32Array(6 * triangles.length);
				var indices    = new Uint16Array(3 * triangles.length);

				var size = this.config.texFillSize;

				for(var i = 0; i < triangles.length; i++)
				{
					var points = triangles[i].getPoints();

					vertices.set(
					[
						points[0].x, points[0].y,
						points[1].x, points[1].y,
						points[2].x, points[2].y
					], i*6)

					uvs.set(
					[
						points[0].x/size, points[0].y/size,
						points[1].x/size, points[1].y/size,
						points[2].x/size, points[2].y/size
					], i * 6);

					indices.set([0 + 3*i, 1 + 3*i, 2 + 3*i], i * 3);

					// Wireframe
					if(this.level.debug)
					{
						/*
						this.wireframe.lineStyle(1, 0x0000ff, 1);
						var points = triangles[i].getPoints();

						this.wireframe.moveTo(points[0].x, points[0].y);
						for(var p = 1; p < points.length; p++)
						{
							this.wireframe.lineTo(points[p].x, points[p].y);
						}
						this.wireframe.lineTo(points[0].x, points[0].y);
						*/
					}
				}

				var mesh = new PIXI.mesh.Mesh
				(
					texture,
					vertices,
					uvs,
					indices,
					PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES
				);
				this.textures.addChild(mesh);
			}
		}


		// Draw the inclined terrain
		if(this.config.texWall != "" && !this.isHidden())
		{
			var segments       = this.bezier.getGroundSegments(this.config.texWallAngle, 360);
			var textureSize    = this.config.texWallSize;
			var textureTopPerc = this.config.texWallDelta

			var segmentsSize = 0;
			for(var s = 0; s < segments.length; s++)
			{
				segmentsSize += segments[s].points.length-1;
			}

			var texture    = this.assetManager.getTexture(this.config.texWall);
			var vertices   = new Float32Array(8 * segmentsSize);
			var uvs        = new Float32Array(8 * segmentsSize);
			var indices    = new Uint16Array(6 * segmentsSize);
			var arrayIndex = 0;

			for(var s = 0; s < segments.length; s++)
			{
				var totalLength  = 0;
				var segmentLength = 0;

				for(var i = 0; i < segments[s].normals.length -1; i++)
				{
					vertices.set(
					[
							segments[s].points[i].x   - segments[s].normals[i].x   * (textureSize * textureTopPerc),     segments[s].points[i].y   - segments[s].normals[i].y   * (textureSize * textureTopPerc),
							segments[s].points[i+1].x - segments[s].normals[i+1].x * (textureSize * textureTopPerc),     segments[s].points[i+1].y - segments[s].normals[i+1].y * (textureSize * textureTopPerc),
							segments[s].points[i+1].x + segments[s].normals[i+1].x * (textureSize * (1-textureTopPerc)), segments[s].points[i+1].y + segments[s].normals[i+1].y * (textureSize * (1-textureTopPerc)),
							segments[s].points[i].x   + segments[s].normals[i].x   * (textureSize * (1-textureTopPerc)), segments[s].points[i].y   + segments[s].normals[i].y   * (textureSize * (1-textureTopPerc))
					], arrayIndex*8)

					var v = new PIXI.Point(segments[s].points[i].x  - segments[s].points[i+1].x, segments[s].points[i].y - segments[s].points[i+1].y);
					segmentLength = v.getLength();

					uvs.set(
					[
						totalLength/textureSize, 0,
						(totalLength+segmentLength)/textureSize, 0,
						(totalLength+segmentLength)/textureSize, 1,
						totalLength/textureSize, 1
					], arrayIndex * 8);

					indices.set(
					[
						0 + 4*arrayIndex,
						1 + 4*arrayIndex,
						2 + 4*arrayIndex,
						0 + 4*arrayIndex,
						2 + 4*arrayIndex,
						3 + 4*arrayIndex
					], arrayIndex * 6);

					totalLength += segmentLength;

					// Wireframe
					if(this.level.debug)
					{
						this.wireframe.lineStyle(1, 0x00ff00, 0.5);
						this.wireframe.moveTo(vertices[arrayIndex*8+0*2], vertices[arrayIndex*8+0*2+1]); // 0
						this.wireframe.lineTo(vertices[arrayIndex*8+1*2], vertices[arrayIndex*8+1*2+1]); // 1
						this.wireframe.lineTo(vertices[arrayIndex*8+2*2], vertices[arrayIndex*8+2*2+1]); // 2
						this.wireframe.lineTo(vertices[arrayIndex*8+3*2], vertices[arrayIndex*8+3*2+1]); // 3
						this.wireframe.lineTo(vertices[arrayIndex*8+0*2], vertices[arrayIndex*8+0*2+1]); // 0
						this.wireframe.lineTo(vertices[arrayIndex*8+2*2], vertices[arrayIndex*8+2*2+1]); // 2
					}

					arrayIndex++;

				}
			}

			var mesh = new PIXI.mesh.Mesh
			(
				texture,
				vertices,
				uvs,
				indices,
				PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES
			);
			this.textures.addChild(mesh);
		}

		// Draw the terrain
		var segments       = this.bezier.getGroundSegments(0, this.config.texWallAngle, this.config.texGroundEdge == "");
		var textureSizeOr  = this.config.texGroundSize;
		var textureTopPerc = this.config.texGroundDelta

		if(this.config.texGround != "" && !this.isHidden())
		{
			var segmentsSize = 0;
			for(var s = 0; s < segments.length; s++)
			{
				segmentsSize += segments[s].points.length-1;
			}

			var texture    = this.assetManager.getTexture(this.config.texGround);
			var vertices   = new Float32Array(8 * segmentsSize);
			var uvs        = new Float32Array(8 * segmentsSize);
			var indices    = new Uint16Array(6 * segmentsSize);
			var arrayIndex = 0;

			for(var s = 0; s < segments.length; s++)
			{
				// Make the normals perpendicular if the left/right-most segments don't have a cap
				if(s == 0 && (this.config.texGroundEdgeSide == "right" || this.config.texGroundEdgeSide == "none"))
					segments[s].normals[0] = {x:0, y:1};
				if(s == segments.length-1 && (this.config.texGroundEdgeSide == "left" || this.config.texGroundEdgeSide == "none"))
					segments[s].normals[segments[s].normals.length-1] = {x:0, y:1};

				// Calculate the total length of the segment
				var segmentLength  = 0;

				for(var i = 0; i < segments[s].normals.length -1; i++)
				{
					var v = new PIXI.Point(segments[s].points[i].x  - segments[s].points[i+1].x, segments[s].points[i].y - segments[s].points[i+1].y);
					segmentLength += v.getLength();
				}

				// Count how many times the texture can fit in the segment length, then round it to adjust the texture size
				var textureSize = segmentLength/ Math.max(1, Math.round(segmentLength / textureSizeOr));

				// Draw the segment
				var totalLength   = 0;
				var segmentLength = 0;

				for(var i = 0; i < segments[s].normals.length -1; i++)
				{
					vertices.set(
					[
							segments[s].points[i].x   - segments[s].normals[i].x   * (textureSize * textureTopPerc),     segments[s].points[i].y   - segments[s].normals[i].y   * (textureSizeOr * textureTopPerc),
							segments[s].points[i+1].x - segments[s].normals[i+1].x * (textureSize * textureTopPerc),     segments[s].points[i+1].y - segments[s].normals[i+1].y * (textureSizeOr * textureTopPerc),
							segments[s].points[i+1].x + segments[s].normals[i+1].x * (textureSize * (1-textureTopPerc)), segments[s].points[i+1].y + segments[s].normals[i+1].y * (textureSizeOr * (1-textureTopPerc)),
							segments[s].points[i].x   + segments[s].normals[i].x   * (textureSize * (1-textureTopPerc)), segments[s].points[i].y   + segments[s].normals[i].y   * (textureSizeOr * (1-textureTopPerc))
					], arrayIndex*8)

					var v = new PIXI.Point(segments[s].points[i].x  - segments[s].points[i+1].x, segments[s].points[i].y - segments[s].points[i+1].y);
					segmentLength = v.getLength();

					uvs.set(
					[
						totalLength/textureSize, 0,
						(totalLength+segmentLength)/textureSize, 0,
						(totalLength+segmentLength)/textureSize, 1,
						totalLength/textureSize, 1
					], arrayIndex * 8);

					indices.set(
					[
						0 + 4*arrayIndex,
						1 + 4*arrayIndex,
						2 + 4*arrayIndex,
						0 + 4*arrayIndex,
						2 + 4*arrayIndex,
						3 + 4*arrayIndex
					], arrayIndex * 6);

					totalLength += segmentLength;

					// Wireframe
					if(this.level.debug)
					{
						this.wireframe.lineStyle(1, 0x00ff00, 0.5);
						this.wireframe.moveTo(vertices[arrayIndex*8+0*2], vertices[arrayIndex*8+0*2+1]); // 0
						this.wireframe.lineTo(vertices[arrayIndex*8+1*2], vertices[arrayIndex*8+1*2+1]); // 1
						this.wireframe.lineTo(vertices[arrayIndex*8+2*2], vertices[arrayIndex*8+2*2+1]); // 2
						this.wireframe.lineTo(vertices[arrayIndex*8+3*2], vertices[arrayIndex*8+3*2+1]); // 3
						this.wireframe.lineTo(vertices[arrayIndex*8+0*2], vertices[arrayIndex*8+0*2+1]); // 0
						this.wireframe.lineTo(vertices[arrayIndex*8+2*2], vertices[arrayIndex*8+2*2+1]); // 2
					}

					arrayIndex++;
				}
			}

			var mesh = new PIXI.mesh.Mesh
			(
				texture,
				vertices,
				uvs,
				indices,
				PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES
			);

			this.textures.addChild(mesh);
		}

		// Draw the terrain edges
		if(this.config.texGroundEdge != "" && !this.isHidden())
		{
			var texture    = this.assetManager.getTexture(this.config.texGroundEdge);
			var vertices   = new Float32Array(2 * 8 * segments.length);
			var uvs        = new Float32Array(2 * 8 * segments.length);
			var indices    = new Uint16Array(2 * 6 * segments.length);

			for(var s = 0; s < segments.length; s++)
			{
				// Calculate the total length of the segment
				var segmentLength  = 0;

				for(var i = 0; i < segments[s].normals.length -1; i++)
				{
					var v = new PIXI.Point(segments[s].points[i].x  - segments[s].points[i+1].x, segments[s].points[i].y - segments[s].points[i+1].y);
					segmentLength += v.getLength();
				}

				// Count how many times the texture can fit in the segment length, then round it to adjust the texture size
				var textureSize = segmentLength/ Math.max(1, Math.round(segmentLength / textureSizeOr));

				// Left edge
				if(s > 0 || (this.config.texGroundEdgeSide == "left" || this.config.texGroundEdgeSide == ""))
				{
					var p = segments[s].points[0];
					var n = segments[s].normals[0];
					var v = new PIXI.Point(segments[s].points[0].x - segments[s].points[1].x, segments[s].points[0].y - segments[s].points[1].y);
					v.normalize();

					vertices.set(
					[
						p.x - n.x * (textureSize * textureTopPerc) +(v.x * textureSize),     p.y - n.y * (textureSizeOr * textureTopPerc     -(v.y * textureSizeOr)),
						p.x - n.x * (textureSize * textureTopPerc),                          p.y - n.y * (textureSizeOr * textureTopPerc),
						p.x + n.x * (textureSize * (1-textureTopPerc)),                      p.y + n.y * (textureSizeOr * (1-textureTopPerc)),
						p.x + n.x * (textureSize * (1-textureTopPerc)) +(v.x * textureSize), p.y + n.y * (textureSizeOr * (1-textureTopPerc) +(v.y * textureSizeOr))
					], s*8*2);

					uvs.set(
					[
						0, 0,
						1, 0,
						1, 1,
						0, 1
					], s*8*2);

					indices.set(
					[
						0 + (s*2) *4,
						1 + (s*2) *4,
						2 + (s*2) *4,
						0 + (s*2) *4,
						2 + (s*2) *4,
						3 + (s*2) *4
					], s*6*2);

					// Wireframe
					if(this.level.debug)
					{
						this.wireframe.lineStyle(1, 0x00ff00, 0.5);
						this.wireframe.moveTo(vertices[s*2*8+0*2], vertices[s*2*8+0*2+1]); // 0
						this.wireframe.lineTo(vertices[s*2*8+1*2], vertices[s*2*8+1*2+1]); // 1
						this.wireframe.lineTo(vertices[s*2*8+2*2], vertices[s*2*8+2*2+1]); // 2
						this.wireframe.lineTo(vertices[s*2*8+3*2], vertices[s*2*8+3*2+1]); // 3
						this.wireframe.lineTo(vertices[s*2*8+0*2], vertices[s*2*8+0*2+1]); // 0
						this.wireframe.lineTo(vertices[s*2*8+2*2], vertices[s*2*8+2*2+1]); // 2
					}
				}

				// Right edge
				if(s < segments.length-1 || (this.config.texGroundEdgeSide == "right" || this.config.texGroundEdgeSide == ""))
				{
					var l = segments[s].normals.length-1;
					var p = segments[s].points[segments[s].normals.length-1];
					var n = segments[s].normals[segments[s].normals.length-1];
					var v = new PIXI.Point(segments[s].points[l].x - segments[s].points[l-1].x, segments[s].points[l].y - segments[s].points[l-1].y);
					v.normalize();

					vertices.set(
					[
						p.x - n.x * (textureSize * textureTopPerc) +(v.x * textureSize),     p.y - n.y * (textureSizeOr * textureTopPerc -(v.y * textureSizeOr)),
						p.x - n.x * (textureSize * textureTopPerc),                          p.y - n.y * (textureSizeOr * textureTopPerc),
						p.x + n.x * (textureSize * (1-textureTopPerc)),                      p.y + n.y * (textureSizeOr * (1-textureTopPerc)),
						p.x + n.x * (textureSize * (1-textureTopPerc)) +(v.x * textureSize), p.y + n.y * (textureSizeOr * (1-textureTopPerc)+(v.y * textureSizeOr))
					], (s*2+1)*8);

					uvs.set(
					[
						0, 0,
						1, 0,
						1, 1,
						0, 1
					], (s*2+1)*8);

					indices.set(
					[
						0 + (s*2+1) *4,
						1 + (s*2+1) *4,
						2 + (s*2+1) *4,
						0 + (s*2+1) *4,
						2 + (s*2+1) *4,
						3 + (s*2+1) *4
					], (s*2+1)*6);

					// Wireframe
					if(this.level.debug)
					{
						this.wireframe.lineStyle(1, 0x00ff00, 0.5);
						this.wireframe.moveTo(vertices[(s*2+1)*8+0*2], vertices[(s*2+1)*8+0*2+1]); // 0
						this.wireframe.lineTo(vertices[(s*2+1)*8+1*2], vertices[(s*2+1)*8+1*2+1]); // 1
						this.wireframe.lineTo(vertices[(s*2+1)*8+2*2], vertices[(s*2+1)*8+2*2+1]); // 2
						this.wireframe.lineTo(vertices[(s*2+1)*8+3*2], vertices[(s*2+1)*8+3*2+1]); // 3
						this.wireframe.lineTo(vertices[(s*2+1)*8+0*2], vertices[(s*2+1)*8+0*2+1]); // 0
						this.wireframe.lineTo(vertices[(s*2+1)*8+2*2], vertices[(s*2+1)*8+2*2+1]); // 2
					}
				}
			}

			var mesh = new PIXI.mesh.Mesh
			(
				texture,
				vertices,
				uvs,
				indices,
				PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES
			);
			this.textures.addChild(mesh);
		}
	}

	this.addChild(this.textures);

	if(this.level.debug)
	{
		// Draw bezier
		this.wireframe.moveTo(this.bezier.points[0].x, this.bezier.points[0].y);
		this.wireframe.lineStyle(2, 0xff0000);
		for(var i = 1; i < this.bezier.points.length; i +=3)
		{
			this.wireframe.bezierCurveTo(this.bezier.points[i].x, this.bezier.points[i].y, this.bezier.points[i+1].x, this.bezier.points[i+1].y, this.bezier.points[i+2].x, this.bezier.points[i+2].y);
		}

		// Draw main points
		for(var i = 0; i < this.bezier.points.length; i ++)
		{
			if(i%3 != 0) continue;

			if(i == this.pointIndex)
				this.wireframe.lineStyle(2, 0x00ff00 , 1);
			else
				this.wireframe.lineStyle(0, 0xff0000, 0);

			this.wireframe.beginFill(0xff0000);
			this.wireframe.drawCircle(this.bezier.points[i].x,  this.bezier.points[i].y, 5);
			this.wireframe.endFill();
		}

		this.addChild(this.wireframe);
	}

	// Artificial: created by the avatar
	if(!!this.config.artificial)
	{
		var bounds = this.textures.getBounds();

		this.textures.mask = new PIXI.Graphics();
		this.textures.mask.beginFill();
		this.textures.mask.drawRect(0, 0, bounds.width, bounds.height);
		this.textures.mask.endFill();
		this.textures.mask.x = bounds.x - bounds.width;
		this.textures.mask.y = bounds.y;
		this.textures.mask.bounds = bounds;
		this.addChild(this.textures.mask);

		this.maskTween = new TimelineMax(
		{
			onComplete: function()
			{
				this.config.collisions = 0
			},
			onCompleteScope: this
		});
		this.maskTween.to(this.textures.mask, 0.5, {x: bounds.x, ease:Sine.easeOut, onComplete:function(){this.iceBridgePS.emit = false;}, onCompleteScope:this},  0);
		this.maskTween.to(this.textures, 0.5, {alpha: 0, ease:Sine.easeIn},  0.9);
		// this.maskTween.to(this.mask, 0.5, {x: bounds.x + bounds.width, ease:Sine.easeIn},  0.75);
		Common.animator.add(this.maskTween);

		// Particles
		this.iceBridgePS = new cloudkid.Emitter(this.level,
		[
			this._assetManager.getTexture("particle_snowflake_00"),
			this._assetManager.getTexture("particle_snowflake_01"),
			this._assetManager.getTexture("particle_snowflake_02"),
			this._assetManager.getTexture("particle_snowflake_03")
		], this._assetManager.getJSON("particle_ice_bridge"));

		this.iceBridgePS.emit = true;
	}
}

/**
 * Dispose
 */
LevelPath.prototype.dispose = function()
{
	if(!!this.iceBridgePS)
	{
		this.iceBridgePS.destroy();
	}
}

/**
 * Return true if the path is invisible
 * @return {Boolean}
 */
LevelPath.prototype.isHidden = function()
{
	return (this.config.data != "" && !!this.config.data.hidden);
}

/**
 * Return true if it's a path that should be ignored when the avatar is using the shrink power
 * @return {Boolean}
 */
LevelPath.prototype.isShrinkPath = function()
{
	return (this.config.data != "" && !!this.config.data.shrinkPath);
}

/**
 * Return true if it's a path that has been created by the player and should be ignored by other entities
 * @return {Boolean}
 */
LevelPath.prototype.isArtificialPath = function()
{
	return !!this.config.artificial;
}
},{"../Common":2,"../editor/BezierPath":8}],20:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
// var Emitter     = require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function LevelRecord(record)
{
	this._assetManager = p3.AssetManager.instance;
	PIXI.Container.call(this);

	this.level  = null;
	this.record = record;

	this.config =
	{
		depth : 100
	}

	this.layers =
	[
		{texture: "ingame_personal_best_01", speed : -160},
		{texture: "ingame_personal_best_01", speed : -120},
		{texture: "ingame_personal_best_00", speed : -80}
	];
	
	this.visible = false;
}
module.exports = LevelRecord;
LevelRecord.prototype = Object.create(GameObject.prototype);
LevelRecord.prototype.constructor = LevelRecord;


//===================================================
// PUBLIC METHODS
//===================================================

LevelRecord.prototype.init = function(level)
{
	this.level = level;

	this.x = this.record * Common.savedData.unit;

	// Sparks
	for(var i = 0; i < this.layers.length; i++)
	{
		var texture   = this._assetManager.getTexture(this.layers[i].texture);
		var sprite    = new PIXI.extras.TilingSprite(texture, texture.width, texture.height);
		sprite.width  = texture.width;
		sprite.height = Common.STAGE_HEIGHT;
		sprite.anchor.set(0.5, 0);
		sprite.scale.x = i % 2 == 0 ? 1 : -1;
		this.addChild(sprite);
		this.layers[i].sprite = sprite;
	}

	// Icon
	var sprite = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_gameplay_distance_record"));
	sprite.anchor.set(0.5);
	sprite.y = 100;
	this.addChild(sprite);
};


LevelRecord.prototype.dispose = function()
{

}

LevelRecord.prototype.update = function()
{
	this.visible = (this.x > this.level.avatar.x - Common.STAGE_WIDTH) && (this.x < this.level.avatar.x + Common.STAGE_WIDTH);
	
	if(!this.visible) return;
	
	var oldY = this.y;

	this.y = -this.level.y * 1/this.level.zoom;
	this.scale.set(1/this.level.zoom);

	for(var i = 0; i < this.layers.length; i++)
	{
		this.layers[i].sprite.tilePosition.y += this.layers[i].speed * p3.Timestep.deltaTime - (this.y - oldY);
	}
};
},{"../Common":2,"../general/SoundSFX":44,"./GameObject":15}],21:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
// var Emitter     = require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectAxe(avatar)
{
	GameObject.call(this, "axe", false);

	this.avatar  = avatar;
	this.level   = null;
	this.sprite  = null;

	this.velocity = new PIXI.Point(0,0);
	this.gravity  = 0;

	this.active   = false;
	this.timeline = null;
}
module.exports = ObjectAxe;
ObjectAxe.prototype = Object.create(GameObject.prototype);
ObjectAxe.prototype.constructor = ObjectAxe;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 * Init
 */
ObjectAxe.prototype.init = function(l)
{
	this.level = l;
	this.gravity = this.level.avatar.gravity;

	this.sprite = new PIXI.Sprite(this._assetManager.getTexture("kristoff_axe_00"));
	this.sprite.anchor.set(.5);
	this.addChild(this.sprite);


	this.collisionCircle = new PIXI.Circle(0, 0, 65);

	if(this.level.debug)
		this.drawCollision();
};

/**
 * Update
 */
ObjectAxe.prototype.update = function()
{
	if(!this.active) return;

	// Update velocity and position
	this.velocity.x -= 100 * p3.Timestep.deltaTime;
	this.velocity.y += this.gravity * p3.Timestep.deltaTime;
	if(this.velocity.x < 0) this.velocity.x = 0;

	this.x += this.velocity.x * p3.Timestep.deltaTime;
	this.y += this.velocity.y * p3.Timestep.deltaTime;

	this.rotation += 360 * PIXI.DEG_TO_RAD * p3.Timestep.deltaTime;

	// Collisions with obstacles
	var collisionCircle = new PIXI.Circle(this.x + this.collisionCircle.x,  this.y + this.collisionCircle.y,    this.collisionCircle.radius);
	var obstacles = this.level.objectManager.getObjectsOfType("obstacle");

	for(var i = 0; i < obstacles.length; i++)
	{
		if(!obstacles[i].interactive) continue;
		if(!obstacles[i].destroyable) continue;

		if(this.avatar.checkCollision(collisionCircle, obstacles[i]))
		{
			obstacles[i].destroy();
		}
	}
};

/**
 * Throw
 */
ObjectAxe.prototype.throw = function()
{
	this.active = true;
	this.sprite.alpha = 1;
	this.velocity.set(1800, -400);

	if(!!this.timeline)
		this.timeline.kill();

	this.timeline = new TimelineMax({onCompleteScope:this, onComplete:function(){this.active = false;}});
		this.timeline.to(this.sprite, 2, {alpha: 0, ease:Quart.easeIn},  0);
	Common.animator.add(this.timeline);
};
},{"../Common":2,"../general/SoundSFX":44,"./GameObject":15}],22:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
var Emitter		= require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectCameraZoom()
{
	GameObject.call(this, "camera_zoom", false);

	this.level        = null;
	this.config       = null;
	this.cameraZoom =
	{
		zoom  : 1,
		time  : 0.4,
		delay : 0
	}

}
module.exports = ObjectCameraZoom;
ObjectCameraZoom.prototype = Object.create(GameObject.prototype);
ObjectCameraZoom.prototype.constructor = ObjectCameraZoom;


//===================================================
// PUBLIC METHODS
//===================================================

ObjectCameraZoom.prototype.init = function(l)
{
	if(this.sprite == null)
	{
		this.sprite = new PIXI.Sprite();
		this.addChild(this.sprite);
	}
};

ObjectCameraZoom.prototype.reset = function()
{
	this.level    = null;
	this.config   = null;
}

ObjectCameraZoom.prototype.configure = function(level, config)
{
	this.level  = level;
	this.config = config;

	this.x = this.config.position.x;
	this.y = this.config.position.y;
	this.sprite.texture = this._assetManager.getTexture(this.config.texture);
	this.sprite.anchor.set(this.config.anchor.x, this.config.anchor.y);
	this.sprite.scale .set(this.config.scale.x, this.config.scale.y);
	this.rotation = this.config.rotation * PIXI.DEG_TO_RAD;

	if(this.config.data != "")
	{
		try
		{
			var data = JSON.parse(this.config.data);
			this.cameraZoom.zoom  = !!data.zoom ? data.zoom   : this.cameraZoom.zoom;
			this.cameraZoom.time  = !!data.time ? data.time   : this.cameraZoom.time;
			this.cameraZoom.delay = !!data.delay ? data.delay : this.cameraZoom.delay;
		}
		catch(e)
		{
			console.error("Camera zoom object data error %s", this.config.data);
		}
	}
		
	// Init code
	this.interactive    = true;
	this.sprite.visible = this.level.debug;
	var width  = this.sprite.width;
	var height = this.sprite.height;
	this.collisionRect = new PIXI.Rectangle(-width * this.sprite.anchor.x, (-this.sprite.anchor.y) * height, width, height);
}

ObjectCameraZoom.prototype.dispose = function()
{

}

ObjectCameraZoom.prototype.update = function()
{

};

ObjectCameraZoom.prototype.hit = function()
{
	if(!this.interactive) return;

	this.interactive = false;
	this.level.changeZoom(this.cameraZoom.zoom, this.cameraZoom.time, this.cameraZoom.delay);
};
},{"../Common":2,"../general/Emitter":41,"../general/SoundSFX":44,"./GameObject":15}],23:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
// var Emitter     = require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectCoin()
{
	GameObject.call(this, "coin", false);

	this.level              = null;
	this.config             = null;

	this.sprite             = null;
	this.attracted          = false;
	this.attractionTimeMax  = 0.3;
	this.attractionPosition = new PIXI.Point();

	this.timeline = null;

	// Particles
	this.pickupPS      = new cloudkid.Emitter(this, [this._assetManager.getTexture("particle_snowflake_00")], this._assetManager.getJSON("particle_coin_collect_burst"));
	this.pickupPS.emit = false;
}
module.exports = ObjectCoin;
ObjectCoin.prototype = Object.create(GameObject.prototype);
ObjectCoin.prototype.constructor = ObjectCoin;


//===================================================
// PUBLIC METHODS
//===================================================

ObjectCoin.prototype.init = function(l)
{
	if(this.sprite == null)
	{
		this.sprite = new PIXI.Sprite();
		this.addChild(this.sprite);
	}
};

ObjectCoin.prototype.reset = function()
{
	this.level    = null;
	this.config   = null;

	this.explosionTween = null;
	if(!!this.explosionTween)
	{
		this.explosionTween.kill();
	}
}

/**
 * Configure
 * @param {Level} level
 * @param {Object} config
 */
ObjectCoin.prototype.configure = function(level, config)
{
	this.level  = level;
	this.config = config;

	this.x = this.config.position.x;
	this.y = this.config.position.y;
	this.sprite.texture = this._assetManager.getTexture("ui_icon_gameplay_snowflake");
	this.sprite.anchor.set(0.5);
	this.sprite.scale .set(1);
	this.sprite.visible = true;

	// Init code
	this.interactive      = true;
	this.sprite.visible   = true;
	this.attracted        = false;
	this.attractionTarget = 0;
	this.attractionTime   = 0;
	this.rotation  = Math.random(0,360) * PIXI.DEG_TO_RAD;
	this.collisionCircle = new PIXI.Circle(0, 0, 55);

	// Animation
	if(!this.timeline)
	{
		this.sprite.position.set(0, -10)
		this.timeline = new TimelineMax();
			this.timeline.to(this.sprite, 0.75, {y: 10, ease:Sine.easeInOut, repeat:-1, yoyo:true},  Math.random());
			this.timeline.to(this.sprite.scale, 0.5, {x: 1.3, y: 1.3, ease:Sine.easeInOut, repeat:-1, yoyo:true},  0);
		Common.animator.add(this.timeline);
	}
	else
	{
		this.timeline.resume();
	}


	// Explosion
	if(!!config.explosion)
		this.explosion(config.explosion.angle, config.explosion.distance, config.explosion.time)

	// Debug
	if(this.level.debug)
		this.drawCollision();
}

/**
 * Dispose
 */
ObjectCoin.prototype.dispose = function()
{
	if(!!this.timeline)
		this.timeline.pause();
}

/**
 * Update
 */
ObjectCoin.prototype.update = function()
{
	this.pickupPS.update(p3.Timestep.deltaTime);

	if(this.attracted)
	{
		this.attractionTime += p3.Timestep.deltaTime;

		if(this.attractionTime > this.attractionTimeMax)
		{
			this.sprite.visible = false;
			this.attracted      = false;
			return;
		}

		this.x = this.attractionPosition.x + (this.attractionTarget.x - 20 - this.attractionPosition.x) * this.attractionTime/this.attractionTimeMax;
		this.y = this.attractionPosition.y + (this.attractionTarget.y - 20 - this.attractionPosition.y) * this.attractionTime/this.attractionTimeMax;
		this.sprite.scale.x = 1-this.attractionTime/this.attractionTimeMax;
		this.sprite.scale.y = 1-this.attractionTime/this.attractionTimeMax;
	}
};

/**
 * An entity has picked up the coin
 * @param {GameObject} target
 */
ObjectCoin.prototype.pickup = function(target)
{
	if(!this.interactive) return;

	this.interactive      = false;
	this.attracted        = true;
	this.attractionTarget = target;
	this.attractionPosition.set(this.x, this.y);
	this.pickupPS.emit    = true;

	if(!!this.explosionTween)
		this.explosionTween.kill();

	SoundSFX.play("sfx_pickup_snowflake_00");

	return true;
};

/**
 * Move the snoflake in a certain direction from the spawn position
 */
ObjectCoin.prototype.explosion = function(angle, distance, time)
{
	this.explosionTween = new TimelineMax();
	this.explosionTween.to(this, time,
	{
		x: this.x + Math.cos(angle * PIXI.DEG_TO_RAD) * distance, ease:Quad.easeOut,
		y: this.y + Math.sin(angle * PIXI.DEG_TO_RAD) * distance, ease:Quad.easeOut
	},  0);
	Common.animator.add(this.explosionTween);

}
},{"../Common":2,"../general/SoundSFX":44,"./GameObject":15}],24:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
// var Emitter     = require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectCrystal(color)
{
	GameObject.call(this, "crystal", false);

	this.level        = null;
	this.config       = null;
	this.color        = color;
	this.character    = Common.savedData.getCharacterByColor(this.color);
	this.index        = 0;

	this.highlight = null;
	this.sprite    = null;
	this.attracted = false;
	this.attractionTimeMax = 0.3;
	this.attractionPosition = new PIXI.Point();

	this.canBePickedUp = true;
	this.pickupPS      = new cloudkid.Emitter(this, [this._assetManager.getTexture("particle_snowflake_00")], this._assetManager.getJSON("particle_coin_collect_burst"));
	this.pickupPS.emit = false;

	this.glow     = null;
	this.timeline = null;
}
module.exports = ObjectCrystal;
ObjectCrystal.prototype = Object.create(GameObject.prototype);
ObjectCrystal.prototype.constructor = ObjectCrystal;

ObjectCrystal.prototype.indexes    = {};
ObjectCrystal.prototype.collected  = {};

//===================================================
// PUBLIC METHODS
//===================================================

ObjectCrystal.prototype.init = function()
{
	if(this.glow == null)
	{
		this.glow = new PIXI.Sprite(this._assetManager.getTexture("ingame_crystal_glow"));
		this.glow.anchor.set(0.5);
		this.addChild(this.glow);
	}

	if(this.sprite == null)
	{
		this.sprite = new PIXI.Sprite();
		this.addChild(this.sprite);
	}
};

ObjectCrystal.prototype.reset = function()
{
	this.level    = null;
	this.config   = null;

	this.canBePickedUp = true;

	if(this.character == "kristoff")
		this.canBePickedUp = false;
	else
		this.canBePickedUp = true;
}

ObjectCrystal.prototype.configure = function(level, config)
{
	this.reset();
	
	// Current index, shared among all crystals (static)
	if(!this.indexes[this.character])
		this.indexes[this.character] = 1;
	else
		this.indexes[this.character]++;

	// Index of the current colored crystal
	this.index = this.indexes[this.character]-1;

	// Config
	this.level  = level;
	this.config = config;

	this.x = this.config.position.x;
	this.y = this.config.position.y;
	this.alpha = 1;
	this.sprite.texture  = this._assetManager.getTexture(this.config.texture);
	this.sprite.anchor.set(this.config.anchor.x, this.config.anchor.y);
	this.sprite.rotation = this.config.rotation * PIXI.DEG_TO_RAD;
	this.sprite.scale.set(1);
	this.sprite.alpha = 1;

	this.glow.rotation = 0;
	this.glow.scale.set(1);
	this.glow.visible = true;
	this.glow.alpha = 1;

	// Init code
	this.interactive      = true;
	this.sprite.visible   = true;
	this.attracted        = false;
	this.attractionTarget = 0;
	this.attractionTime   = 0;
	this.attractionPosition = new PIXI.Point(this.x, this.y);
	this.rotation  = Math.random(0,360) * PIXI.DEG_TO_RAD;

	this.collisionCircle = new PIXI.Circle(0, 0, 150);

	if(this.level.debug)
		this.drawCollision();

	// Animation
	if(!!this.glow && this.character == Common.savedData.character)
	{
		this.sprite.position.set(0, -10)

		this.timeline = new TimelineMax();
			if(this.character != "kristoff")
				this.timeline.to(this.sprite, 1,    {y: 20, ease:Sine.easeInOut, repeat:-1, yoyo:true, onUpdateScope:this, onUpdate:function(){this.glow.y = this.sprite.y}},  0);
			this.timeline.to(this.glow, 8, {rotation: Math.PI * 2, ease:Linear.easeNone, repeat:-1},  0);
			this.timeline.to(this.glow.scale, 0.5, {x: 1.5, y: 1.5, ease:Quad.easeInOut, repeat:-1, yoyo:true},  0);
		Common.animator.add(this.timeline);
	}

	// Already picked up?
	if(Common.savedData.isCrystalCollected(Common.savedData.level, this.character, this.index))
	{
		if(this.character != Common.savedData.character)
		{
			this.alpha = 0;
		}
		else
		{
			this.interactive = false;
			this.sprite.alpha = 0.5;

			if(!!this.glow)
				this.glow.visible = false;
		}
	}

	// Don't pick up other characters' crystals
	if(!!this.chara)
		this.removeChild(this.chara);

	if(this.character != Common.savedData.character)
	{
		if(Common.savedData.character != "pabbie")
		{
			this.interactive = false;
			this.sprite.alpha = 0.5;

			if(!!this.glow)
				this.glow.visible = false;

			// Add head
			this.chara = new PIXI.Sprite(this._assetManager.getTexture("ingame_progress_char_" + this.character));
			this.chara.anchor.set(0.5);
			this.chara.y = this.character == "kristoff" ? -120 : -90;
			this.chara.x = +10;
			this.addChild(this.chara);
		}
		else
		{
			this.interactive = false;
			this.visible = false;
		}
	}
	else if(Common.savedData.character == "kristoff")
	{
		this.sprite.alpha = this.interactive ? 0.75 : 0;
		// this.glow.alpha   = 0;
	}
}

/**
 */
ObjectCrystal.prototype.dispose = function()
{
	if(!!this.timeline)
	{
		this.timeline.kill();
		this.timeline = null;
	}
}

/**
 */
ObjectCrystal.prototype.update = function()
{
	this.pickupPS.update(p3.Timestep.deltaTime);

	if(this.attracted)
	{
		this.attractionTime += p3.Timestep.deltaTime;

		if(this.attractionTime > this.attractionTimeMax)
		{
			this.sprite.visible = false;
			return;
		}

		this.x = this.attractionPosition.x + (this.attractionTarget.x - 20 - this.attractionPosition.x) * this.attractionTime/this.attractionTimeMax;
		this.y = this.attractionPosition.y + (this.attractionTarget.y - 20 - this.attractionPosition.y) * this.attractionTime/this.attractionTimeMax;
		this.sprite.scale.x = 1-this.attractionTime/this.attractionTimeMax;
		this.sprite.scale.y = 1-this.attractionTime/this.attractionTimeMax;
	}

	// this.highlight.rotation += 90 * PIXI.DEG_TO_RAD * p3.Timestep.deltaTime;
};

/**
 * Item collected
 * @param {Object} target
 */
ObjectCrystal.prototype.pickup = function(target)
{
	if(!this.interactive) return;
	if(!this.canBePickedUp) return;

	this.interactive      = false;
	this.attracted        = true;
	this.attractionTarget = target;
	this.pickupPS.emit    = true;

	// Store in the static field that this crystal has been collected
	if(!ObjectCrystal.prototype.collected[this.character])
		ObjectCrystal.prototype.collected[this.character] = [];

	ObjectCrystal.prototype.collected[this.character].push(this.index);

	Common.savedData.crystals[Common.savedData.level][this.character][this.index] = true;
	Common.savedData.save();

	this.level.parent.gameUI.crystalCollected(this.character, this.index);

	// Hide the glow
	if(!!this.timeline)
	{
		this.timeline.kill();
		this.timeline = new TimelineMax();
			this.timeline.to(this.glow.scale, this.attractionTimeMax, {x: 0, y: 0, ease:Quad.easeOut},  0);
		Common.animator.add(this.timeline);
	}

	SoundSFX.play("sfx_pickup_gem_tinkle_01");

	return true;
};
},{"../Common":2,"../general/SoundSFX":44,"./GameObject":15}],25:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
// var Emitter     = require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectDecoration()
{
	this.level  = null;
	this.config = null;

	this.sprite    = null;
	this.character = null;
	this.crystal   = null;

	GameObject.call(this, "decoration", false);
}
module.exports = ObjectDecoration;
ObjectDecoration.prototype = Object.create(GameObject.prototype);
ObjectDecoration.prototype.constructor = ObjectDecoration;


//===================================================
// PUBLIC METHODS
//===================================================

ObjectDecoration.prototype.init = function(l)
{
	if(this.sprite == null)
	{
		this.sprite = new PIXI.Sprite();
		this.addChild(this.sprite);
	}
};

ObjectDecoration.prototype.reset = function()
{
	this.level     = null;
	this.config    = null;
	this.visible   = true;
	this.character = null;
}

ObjectDecoration.prototype.configure = function(level, config)
{
	this.level  = level;
	this.config = config;

	this.x = this.config.position.x;
	this.y = this.config.position.y;
	this.sprite.texture = this._assetManager.getTexture(this.config.texture);
	this.sprite.anchor.set(this.config.anchor.x, this.config.anchor.y);
	this.sprite.scale .set(this.config.scale.x, this.config.scale.y);
	this.sprite.rotation = this.config.rotation * PIXI.DEG_TO_RAD;

	if(this.config.data != "")
	{
		try
		{
			var data = JSON.parse(this.config.data);
			this.character = !!data.character ? data.character : null;
			this.crystal   = !!data.crystal ? (parseInt(data.crystal)-1) : null;
		}
		catch(e)
		{
			console.error("Decoration data error %s", this.config.data);
		}
	}

	// Hide if character is different than the one set
	if(this.character != null && this.character != Common.savedData.character)
	{
		this.visible = false;
	}
	
	// Hide if character is the one set but the crystal has been collected
	if(this.character != null && this.crystal != null && this.character == Common.savedData.character && Common.savedData.isCrystalCollected(Common.savedData.level, this.character, this.crystal))
	{
		this.visible = false;
	}	
}

ObjectDecoration.prototype.dispose = function()
{

}

ObjectDecoration.prototype.update = function()
{

};
},{"../Common":2,"../general/SoundSFX":44,"./GameObject":15}],26:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
var Emitter		= require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectJumpPlatform()
{
	GameObject.call(this, "jump_platform", false);

	this.level        = null;
	this.config       = null;
	this.jumpPlatform =
	{
		speed  : 1800
	}
}
module.exports = ObjectJumpPlatform;
ObjectJumpPlatform.prototype = Object.create(GameObject.prototype);
ObjectJumpPlatform.prototype.constructor = ObjectJumpPlatform;


//===================================================
// PUBLIC METHODS
//===================================================

ObjectJumpPlatform.prototype.init = function(l)
{
	if(this.sprite == null)
	{
		this.sprite = new PIXI.Sprite();
		this.addChild(this.sprite);
	}
};

ObjectJumpPlatform.prototype.reset = function()
{
	this.level    = null;
	this.config   = null;
}

ObjectJumpPlatform.prototype.configure = function(level, config)
{
	this.level  = level;
	this.config = config;

	this.x = this.config.position.x;
	this.y = this.config.position.y;
	this.sprite.texture = this._assetManager.getTexture(this.config.texture);
	this.sprite.anchor.set(this.config.anchor.x, this.config.anchor.y);
	this.sprite.scale .set(this.config.scale.x, this.config.scale.y);
	this.rotation = this.config.rotation * PIXI.DEG_TO_RAD;

	// Init code
	this.interactive = true;
	var width        = this.sprite.width  * 0.6;
	var height       = this.sprite.height;
	this.collisionRect = new PIXI.Rectangle(-width * this.sprite.anchor.x, (-this.sprite.anchor.y) * height, width, height);
}

ObjectJumpPlatform.prototype.dispose = function()
{

}

ObjectJumpPlatform.prototype.update = function()
{

};

ObjectJumpPlatform.prototype.hit = function(target)
{
	if(target.velocity < 0) return;

	target.velocity.y = -this.jumpPlatform.speed;

	if(!!target.isRidingVehicle)
		target.vehicle.setAnimation('jump_normal', false);
	else
		target.setAnimation('jump_normal', false);
	target.y -= 10;
	target.isGrounded = false;
	target.isTumbling = false;
	target.canTumble  = true;
	
	// Audio
	SoundSFX.playRandomFrom(["sfx_generic_jump_00", "sfx_generic_jump_01", "sfx_generic_jump_02"]);
};
},{"../Common":2,"../general/Emitter":41,"../general/SoundSFX":44,"./GameObject":15}],27:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
var Emitter		= require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectLevelEnd(args)
{
	GameObject.call(this, "level_end", false);

	this.level    = null;
	this.config   = null;
	this.gameOver = !args;
}
module.exports = ObjectLevelEnd;
ObjectLevelEnd.prototype = Object.create(GameObject.prototype);
ObjectLevelEnd.prototype.constructor = ObjectLevelEnd;


//===================================================
// PUBLIC METHODS
//===================================================

ObjectLevelEnd.prototype.init = function(l)
{
	if(this.sprite == null)
	{
		this.sprite = new PIXI.Sprite();
		this.addChild(this.sprite);
	}
};

ObjectLevelEnd.prototype.reset = function()
{
	this.level    = null;
	this.config   = null;
}

ObjectLevelEnd.prototype.configure = function(level, config)
{
	this.level  = level;
	this.config = config;

	this.x = this.config.position.x;
	this.y = this.config.position.y;
	this.sprite.texture = this._assetManager.getTexture(this.config.texture);
	this.sprite.anchor.set(this.config.anchor.x, this.config.anchor.y);
	this.sprite.scale .set(this.config.scale.x, this.config.scale.y);
	this.rotation = this.config.rotation * PIXI.DEG_TO_RAD;

	// Init code
	this.interactive    = true;
	this.sprite.visible = this.level.debug;
	var width  = this.sprite.width;
	var height = this.sprite.height;
	this.collisionRect = new PIXI.Rectangle(-width * this.sprite.anchor.x, (-this.sprite.anchor.y) * height, width, height);
}

ObjectLevelEnd.prototype.dispose = function()
{

}

ObjectLevelEnd.prototype.update = function()
{
	if(!!this.deathPS)
		this.deathPS.update(p3.Timestep.deltaTime)
};

ObjectLevelEnd.prototype.hit = function()
{
	if(!this.interactive) return;
	this.interactive = false;

	// If the character was already dead (by failing a tumble for example)
	if(this.level.avatar.isDead)
	{
		this.level.focusYActive = false;
	}
	else
	{
		if(!this.gameOver)
		{
			this.level.completed = true;
			this.level.avatar.isImmortal = true;
		}
		if(this.gameOver)
		{
			this.level.avatar.isDead = true;
			this.level.avatar.velocity.x = 0;

			this.level.focusYActive = false;
			this.level.changeFocusPoint(new PIXI.Point(0.43, 0.5), 1.25);
			// this.level.avatar.deathPS.emit = true;
			// this.level.avatar.alpha = 0;

			// Death animation
			Common.animator.setTimeout(function()
			{
				this.deathPS = new cloudkid.Emitter(this.level,
				[
					this._assetManager.getTexture("particle_snowflake_00"),
					this._assetManager.getTexture("particle_snowflake_01"),
					this._assetManager.getTexture("particle_snowflake_02"),
					this._assetManager.getTexture("particle_snowflake_03")
				], this._assetManager.getJSON("particle_death"));

				this.deathPS.updateSpawnPos(this.level.avatar.x, (-this.level.y + Common.STAGE_HEIGHT) * (1/this.level.zoom));
				this.deathPS.emit = true;
				
			}, 0.5, this);
			
			Common.animator.setTimeout(function()
			{
				SoundSFX.play("sfx_generic_fall_offscreen_01");
			}, 0.2, this);
		}
		else
		{
			this.level.avatar.areInputActive = false;
			this.level.focusXActive = false;

			if(this.level.avatar.isShrinking)
			{
				this.level.avatar.powerUnshrink();
			}
		}

		this.level.gameOver();
	}
};
},{"../Common":2,"../general/Emitter":41,"../general/SoundSFX":44,"./GameObject":15}],28:[function(require,module,exports){
var Common           = require("../Common");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectManager(pools)
{
	this.assetManager = p3.AssetManager.instance;

	this._poolData = pools;
	this._pools    = null;
	this._objects  = [];
	this._id2Pool  = [];

	PIXI.Container.call(this);
}
module.exports = ObjectManager;
ObjectManager.prototype = Object.create(PIXI.Container.prototype);
ObjectManager.prototype.constructor = ObjectManager;

/**
 * TODO
 */
ObjectManager.prototype.init = function()
{
	this._pools = {};
	for(var i = 0; i < this._poolData.length; i++)
	{
		if(!this._pools[this._poolData[i].pool])
		{
			this._pools[this._poolData[i].pool] = new p3.ObjectPool(this._poolData[i].base, !!this._poolData[i].quantity ? this._poolData[i].quantity : 1, this._poolData[i].args);
		}
		this._id2Pool[this._poolData[i].id] = this._poolData[i].pool;
	}
}

/**
 * TODO
 */
ObjectManager.prototype.generate = function(id)
{
	if(!!this._id2Pool[id] && !!this._pools[this._id2Pool[id]])
		var pool = this._pools[this._id2Pool[id]];
	else
		var pool = this._pools["default"];

	// Get one free entity from the pool
	var obj = pool.create();

	// If there are no free entities create some
	if(obj == null)
	{
		pool.expand(2);
		obj = pool.create();
	}

	// Cache it in an array by type
	if(!this._objects[obj.type])
	{
		this._objects[obj.type] = [];
	}
	this._objects[obj.type].push(obj);

	return obj;
};

/**
 * TODO
 */
ObjectManager.prototype.dispose = function(obj)
{
	for(var i in this._pools)
    {
    	if(this._pools[i]._used.indexOf(obj) > -1)
    	{
    		this._pools[i].free(obj);

			var index = this._objects[obj.type].indexOf(obj);
			if(index != -1)
				this._objects[obj.type].splice(index, 1);
    	}
	}
};

/**
 * TODO
 */
ObjectManager.prototype.getObjectsOfType = function(type)
{
	return !!this._objects[type] ? this._objects[type] : [];
};
},{"../Common":2}],29:[function(require,module,exports){
var Common         = require("../Common");
var RunningEntity  = require("./RunningEntity");
var Emitter		   = require("../general/Emitter");
var SoundSFX       = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectMarshmallow()
{
	RunningEntity.call(this, "marshmallow");

	this.level        = null;
	this.avatar       = null;
	this.config       = null;
	this.removeWhenOutside = true;

	this.spine            = null;

	this.currentBodyAnimation = "";
	this.currentLegsAnimation = "";

	this.isJobStarted = false;
	this.isJobDone    = false;
	this.time    = 0;
	this.timeEnd = 7;

	this.isAttacking         = false;
	this.attackTime          = 0;
	this.attackTimeEnd       = 1;
	this.attackCollisionTime = 0.3;
	
	this.walkLoop = "";
}
module.exports = ObjectMarshmallow;
ObjectMarshmallow.prototype = Object.create(RunningEntity.prototype);
ObjectMarshmallow.prototype.constructor = ObjectMarshmallow;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 * Init
 */
ObjectMarshmallow.prototype.init = function(l)
{
	// Collider
	this.collisionCircle    = new PIXI.Circle(0, 0, 100);


	// Init spine animation
	if(this.spine == null)
	{
		this.animationHolder = new PIXI.Container();
		this.addChild(this.animationHolder);

		this.spineData = Common.characterAnimationData.char_marshmallow;
		this.spine = new PIXI.spine.Spine(this.spineData);
		this.spine.skeleton.setToSetupPose();
		this.spine.skeleton.setSkin(null);
		this.spine.skeleton.setSkinByName("olaf");
		this.spine.autoUpdate = false;
		this.spine.y = this.collisionCircle.radius;
		this.animationHolder.addChild(this.spine);

		var animations =
		[
			'idle_body',
			'idle_legs',
			'idle_legs',
			'run_flat_body',
			'run_flat_body_swipe',
			'run_flat_legs',
			// 'jump_normal',
			'fall_body',
			'fall_legs',
			'land_body',
			'land_legs',
			'end_wave'
		];

		for(var i = 0; i < animations.length; i++)
		{
			for(var j = 0; j < animations.length; j++)
			{
				if(i == j) continue;

				if(animations[i] == "fall_body" || animations[i] == "fall_legs")
					this.spine.stateData.setMixByName(animations[i], animations[j], 0.1);
				else if(animations[j] == "run_flat_body_swipe")
					this.spine.stateData.setMixByName(animations[i], animations[j], 0.1);
				else
					this.spine.stateData.setMixByName(animations[i], animations[j], 0.4);
			}
		}
	}

	this.attackCollisionCircle = new PIXI.Circle(300, -50, 300);

	// var debugCircle = new PIXI.Graphics();
	// this.addChild(debugCircle);
	// debugCircle.lineStyle(1, 0xF7111D);
	// debugCircle.drawCircle(0, 0, this.attackCollisionCircle.radius);
	// debugCircle.x = this.attackCollisionCircle.x;
	// debugCircle.y = this.attackCollisionCircle.y;
};

/**
 * Reset
 */
ObjectMarshmallow.prototype.reset = function()
{
	this.level  = null;
	this.config = null;

	this.currentAnimation = "";

	this.velocity.set(0);
	this.gravity        = 0;
	this.isGrounded     = false;
	this.collisionPoint = null;

	this.isJobStarted = false;
	this.isJobDone    = false;
	this.time         = 0;
}

/**
 * Configure
 * @param {Level} level
 * @param {Object} config
 */
ObjectMarshmallow.prototype.configure = function(level, config)
{
	this.level   = level;
	this.avatar  = level.avatar;
	this.config  = config;
	this.gravity = this.avatar.gravity;

	// Position
	this.interactive = true;
	this.x = this.config.position.x;
	this.y = this.config.position.y;
	this.rotation = this.config.rotation * PIXI.DEG_TO_RAD;

	// Animation
	this.spine.state.addAnimationByName(0, 'fall_body', true, 0.2);
	this.spine.state.addAnimationByName(1, 'fall_legs', true, 0.2);

	// Particles
	if(!this.snowLandPS)
	{
		this.snowLandPS = new cloudkid.Emitter(this.level, 
		[
			this._assetManager.getTexture("particle_snowflake_00"), 
			this._assetManager.getTexture("particle_snowflake_01"), 
			this._assetManager.getTexture("particle_snowflake_02"), 
			this._assetManager.getTexture("particle_snowflake_03")
		], this._assetManager.getJSON("particle_marshmallow_land"));
	}
	this.snowLandPS.emit = false;

	// Debug
	if(this.level.debug)
		this.drawCollision();
}

/**
 * Dispose
 */
ObjectMarshmallow.prototype.dispose = function()
{
	this.stopLoops();
}

/**
 * Update
 */
ObjectMarshmallow.prototype.update = function()
{
	// Particles update
	this.snowLandPS.update(p3.Timestep.deltaTime);

	// Animation update
	this.spine.update(p3.Timestep.deltaTime);

	// Animation
	if(this.isGrounded && !!this.collisionPoint && !this.isJobStarted)
	{
		this.setBodyAnimation('idle_body', true);
		this.setLegsAnimation('idle_legs', true);
	}
	else if(this.isGrounded && !!this.collisionPoint && this.isJobStarted && !this.isJobDone)
	{
		this.setBodyAnimation('run_flat_body', true);
		this.setLegsAnimation('run_flat_legs', true);
	}
	else if(!this.isGrounded && this.velocity.y > 0)
	{
		this.setBodyAnimation('fall_body', true);
		this.setLegsAnimation('fall_legs', true);
	}

	// Speed
	if(this.isJobDone || !this.isJobStarted)
		this.velocity.x = 0;
	else
		this.velocity.x = this.avatar.velocity.x;

	// Gravity
	this.velocity.y += this.gravity * p3.Timestep.deltaTime;
	if(this.velocity.y >= this.gravity/2) this.velocity.y = this.gravity/2;

	// Rotation update
	// var angleDiff = Math.atan2(Math.sin(this.angleTarget - this.animationHolder.rotation), Math.cos(this.angleTarget - this.animationHolder.rotation));
	// this.animationHolder.rotation = this.animationHolder.rotation + (angleDiff * 0.01);

	// Movement
	var wasGrounded = this.isGrounded;
	this.move(this.velocity);

	// Undo gravity when touching ground
	if(this.isGrounded)
	{
		this.velocity.y = 0;

		if(!wasGrounded && !this.isDead)
		{
			this.land();
		}
	}

	// When close to the character starts walking
	if(!this.isJobStarted)
	{
		// var distance = Math.sqrt(Math.pow(this.x - this.avatar.x, 2) + Math.pow(this.y - this.avatar.y, 2));
		var distance = Math.abs(this.x - this.avatar.x);
		if(distance < 350)
		{
			this.isJobStarted = true;
			
			// Goals: marshmallow
			Common.goalsManager.trackEvent("marshmallow");
		}
	}
	// When the timer ends or the character dies, stop
	else if(!this.isJobDone)
	{
		this.time += p3.Timestep.deltaTime;
		if(this.time >= this.timeEnd || this.avatar.isDead)
		{
			this.stop();
		}
	}

	var attack = false;
	if(this.isAttacking)
	{
		this.attackTime += p3.Timestep.deltaTime;
		if(this.attackTime > this.attackTimeEnd)
		{
			this.attackTime = 0;
			this.isAttacking = false;

		}

		if(this.attackTime > this.attackCollisionTime && this.attackTime-p3.Timestep.deltaTime <= this.attackCollisionTime) attack = true;
	}

	// Collisions with objects
	this.collisions(attack);
	
	// Audio
	if(this.isJobStarted && !this.isJobDone && this.isGrounded)
		this.playLoop("sfx_marshmallow_move_00");
	else
		this.stopLoops();
}

/**
 * Handle collisions with objects
 * @param {Bool} attack
 */
ObjectMarshmallow.prototype.collisions = function(attack)
{
	// Check if enemies nearby to attack
	if(this.isJobStarted && !this.isJobDone && !this.isAttacking)
	{
		// Snowballs
		var snowballs = this.level.objectManager.getObjectsOfType("snowball");

		for(var i = 0; i < snowballs.length; i++)
		{
			if(snowballs[i].x < this.x)   continue;
			if(!snowballs[i].interactive) continue;
			var distance = Math.sqrt(Math.pow(this.x - snowballs[i].x, 2), Math.pow(this.y - snowballs[i].y, 2));

			if(distance < 700)
			{
				this.isAttacking = true;
				this.setBodyAnimation('run_flat_body_swipe', false);
				SoundSFX.play("sfx_marshmallow_grunt_00");
				break;
			}
		}
	}

	// Attack
	if(attack)
	{
		var attackCollisionCircle = new PIXI.Circle(this.x + this.attackCollisionCircle.x,  this.y + this.attackCollisionCircle.y,  this.attackCollisionCircle.radius);

		// Snowballs
		var snowballs = this.level.objectManager.getObjectsOfType("snowball");

		for(var i = 0; i < snowballs.length; i++)
		{
			if(!snowballs[i].interactive) continue;

			if(this.checkCollision(attackCollisionCircle, snowballs[i]))
			{
				snowballs[i].destroy(true)
				this.level.shake(0.4, new PIXI.Point(8,12));
			}
		}
	}

	/*
	var obstacleCollisionCircle = new PIXI.Circle(this.x + this.collisionCircle.x,  this.y + this.collisionCircle.y,    this.collisionCircle.radius);

	// Obstacles
	var obstacles = this.level.objectManager.getObjectsOfType("obstacle");

	for(var i = 0; i < obstacles.length; i++)
	{
		if(!obstacles[i].interactive) continue;
		if(this.checkCollision(obstacleCollisionCircle, obstacles[i]))
		{
			obstacles[i].hit(this)
		}
	}

	// Platforms
	var jump_platforms = this.level.objectManager.getObjectsOfType("jump_platform");

	for(var i = 0; i < jump_platforms.length; i++)
	{
		if(!jump_platforms[i].interactive) continue;
		if(this.checkCollision(obstacleCollisionCircle, jump_platforms[i]))
		{
			jump_platforms[i].hit(this)
		}
	}*/
}

/**
 * Land
 */
ObjectMarshmallow.prototype.land = function()
{
	this.setBodyAnimation('land_body', false);
	this.setLegsAnimation('land_legs', false);

	this.level.shake(0.8, new PIXI.Point(16,30));

	this.snowLandPS.updateSpawnPos(this.x, this.y + this.collisionCircle.radius - 10);
	this.snowLandPS.emit = true;

	SoundSFX.play("sfx_marshmallow_fall_00");
}

/**
 * Stop
 */
ObjectMarshmallow.prototype.stop = function()
{
	if(this.isJobDone) return;

	this.isJobDone = true;

	this.setBodyAnimation('end_wave', true);
	this.setLegsAnimation('idle_legs', false);

	this.stopLoops();
	SoundSFX.play("sfx_marshmallow_end_00");
}

/**
 * Hit
 * @param {GameObject} target
 */
ObjectMarshmallow.prototype.hit = function(target)
{
};

/**
 * Set the animation for the body
 * @param {String} id
 * @param {Bool} loop
 */
ObjectMarshmallow.prototype.setBodyAnimation = function(id, loop)
{
	if(loop && id == this.currentBodyAnimation) return;

	if(id == '')
		this.spine.state.clearTrack(1);
	else if(this.currentBodyAnimation == "land_body") // Delays animation after landing
		this.spine.state.addAnimationByName(1, id, loop, 0.2);
	else if(this.currentBodyAnimation == "run_flat_body_swipe") // Delays animation after attacking
		this.spine.state.addAnimationByName(1, id, loop, 0.7);
	else
		this.spine.state.setAnimationByName(1, id, loop, 0);

	this.currentBodyAnimation = id;
}


/**
 * Set the animation for the legs
 * @param {String} id
 * @param {Bool} loop
 */
ObjectMarshmallow.prototype.setLegsAnimation = function(id, loop)
{
	if(loop && id == this.currentLegsAnimation) return;

	if(id == '')
		this.spine.state.clearTrack(0);
	else if(this.currentLegsAnimation == "land_legs") // Delays animation after landing
		this.spine.state.addAnimationByName(0, id, loop, 0.2);
	else
		this.spine.state.setAnimationByName(0, id, loop, 0);

	this.currentLegsAnimation = id;
}

/**
 * Stop the current loops
 */
ObjectMarshmallow.prototype.stopLoops = function()
{
	if(this.walkLoop != "")
	{		
		SoundSFX.stop(this.walkLoop);
		this.walkLoop = "";
	}
}

/**
 * Stop the current loop and play a new one, if different
 * @param {String} audio
 */
ObjectMarshmallow.prototype.playLoop = function(audio)
{
	if(this.walkLoop == audio) return;
	
	this.stopLoops();
	this.walkLoop = audio;
	SoundSFX.play(this.walkLoop, {loop:true});
}

},{"../Common":2,"../general/Emitter":41,"../general/SoundSFX":44,"./RunningEntity":38}],30:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
var Emitter		= require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectObstacle(iceBlock, explodes)
{
	GameObject.call(this, "obstacle", false);

	this.level       = null;
	this.config      = null;
	this.iceBlock    = !!iceBlock;
	this.explodes    = !!explodes;
}
module.exports = ObjectObstacle;
ObjectObstacle.prototype = Object.create(GameObject.prototype);
ObjectObstacle.prototype.constructor = ObjectObstacle;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
ObjectObstacle.prototype.init = function(l)
{
	if(this.sprite == null)
	{
		this.sprite = new PIXI.Sprite();
		this.addChild(this.sprite);
	}
};

/**
 */
ObjectObstacle.prototype.reset = function()
{
	this.level    = null;
	this.config   = null;
}

/**
 */
ObjectObstacle.prototype.configure = function(level, config)
{
	this.level  = level;
	this.config = config;

	this.x = this.config.position.x;
	this.y = this.config.position.y;
	this.sprite.texture = this._assetManager.getTexture(this.config.texture);
	this.sprite.anchor.set(this.config.anchor.x, this.config.anchor.y);
	this.sprite.scale .set(this.config.scale.x, this.config.scale.y);
	this.rotation = this.config.rotation * PIXI.DEG_TO_RAD;

	// Init code
	this.interactive    = true;
	this.sprite.visible = true;
	var width  = this.sprite.width  * 0.6;
	var height = this.sprite.height * 0.7;
	this.collisionRect = new PIXI.Rectangle(-width * this.sprite.anchor.x, (-this.sprite.anchor.y) * height, width, height);

	// Custom sprite colliders
	if(this.config.id.match(/carriage\_([0-9]{2})\_([0-9]{2})/i))
	{
		var width  = this.sprite.width * 0.3;
		this.collisionRect = new PIXI.Rectangle(-width * this.sprite.anchor.x*2, (-this.sprite.anchor.y) * height, width, height);
	}

	// Explosion effect
	if(this.explodes)
	{
		if(!!this.explosionPS)
			this.explosionPS.destroy();

		this.explosionPS = new cloudkid.Emitter(this,
		[
			this._assetManager.getTexture("particle_barrel_0"),
			this._assetManager.getTexture("particle_barrel_1"),
			this._assetManager.getTexture("particle_barrel_2"),
			this._assetManager.getTexture("particle_barrel_3"),
			this._assetManager.getTexture("m1dust3"),
			this._assetManager.getTexture("m1dust3")
		],
		this._assetManager.getJSON("particle_barrel_explosion"));

		this.explosionPS.emit = false;
		this.explosionPS.updateSpawnPos(0, -this.sprite.height/3);
	}

	// Destroy effect
	if(!!this.destroyPS)
	{
		this.destroyPS.destroy();
		this.destroyPS = null;
	}

	var theme = this.config.texture.match(/theme\_([0-9]{2})\_([a-z0-9\_]+)/i)[1];

	if(this.iceBlock)
	{
		this.destroyPS = new cloudkid.Emitter(this,
		[
			this._assetManager.getTexture("theme_" + theme + "_ice_block_01"),
			this._assetManager.getTexture("theme_" + theme + "_ice_block_02"),
			this._assetManager.getTexture("theme_" + theme + "_ice_block_03"),
			this._assetManager.getTexture("theme_" + theme + "_ice_block_04")
		], 
		this._assetManager.getJSON("particle_ice_explosion"));
	}
	else if(this.config.id.match(/crate\_([0-9]{2})\_([0-9]{2})/i) ||
			this.config.id.match(/barrel\_([0-9]{2})\_([0-9]{2})/i) ||
			this.config.id.match(/wood\_([0-9]{2})\_([0-9]{2})/i))
	{
		this.destroyPS = new cloudkid.Emitter(this,
		[
			this._assetManager.getTexture("particle_wood_00"),
			this._assetManager.getTexture("particle_wood_01"),
			this._assetManager.getTexture("particle_wood_02")
		], 
		this._assetManager.getJSON("particle_ice_explosion"));			
	}
	else if(this.config.id.match(/snowman\_([0-9]{2})\_([0-9]{2})/i))
	{
		this.destroyPS = new cloudkid.Emitter(this,
		[
			this._assetManager.getTexture("particle_snowflake_00")
		], 
		this._assetManager.getJSON("particle_ice_explosion"));	
	}
	else if(this.config.id.match(/stones\_([0-9]{2})\_([0-9]{2})/i))
	{
		this.destroyPS = new cloudkid.Emitter(this,
		[
			this._assetManager.getTexture("particle_rock_00"),
			this._assetManager.getTexture("particle_rock_01"),
			this._assetManager.getTexture("particle_rock_02")
		],
		this._assetManager.getJSON("particle_ice_explosion"));	
	}
		
	if(this.destroyPS != null)
	{
		this.destroyPS.emit = false;
		this.destroyPS.updateSpawnPos(0, -this.sprite.height/2);
	}


	if(this.level.debug)
		this.drawCollision();
}

/**
 */
ObjectObstacle.prototype.dispose = function()
{
	if(!!this.explosionPS)
	{
		this.explosionPS.destroy();
		this.explosionPS = null;
	}

	if(!!this.destroyPS)
	{
		this.destroyPS.destroy();
		this.destroyPS = null;
	}
}

/**
 */
ObjectObstacle.prototype.update = function()
{
	if(!!this.explosionPS)
		this.explosionPS.update(p3.Timestep.deltaTime);

	if(!!this.destroyPS)
		this.destroyPS.update(p3.Timestep.deltaTime);
};

/**
 */
ObjectObstacle.prototype.hit = function(target)
{
	if(!this.interactive) return;

	this.interactive = false;

	if(this.explodes)
	{
		this.sprite.visible = false;
		this.level.shake(0.6, new PIXI.Point(60,40));
		this.level.shockwave(this,1);

		this.explosionPS.emit = true;
	}
	
	if(this.iceBlock)
		SoundSFX.playRandomFrom(["sfx_iceblock_smash_00", "sfx_iceblock_smash_01", "sfx_iceblock_smash_02", "sfx_iceblock_smash_03", "sfx_iceblock_smash_04", "sfx_iceblock_smash_05", "sfx_iceblock_smash_06"]);
	else
		SoundSFX.playRandomFrom(["sfx_generic_hit_obstacle_00"]);
};

/**
 */
ObjectObstacle.prototype.destroy = function(source)
{
	if(!this.interactive) return;
	if(source == "axe" && !this.iceBlock) return;

	this.interactive = false;
	
	if(this.destroyPS == null) return;
	
	this.sprite.visible = false;
	this.level.shake(0.4, new PIXI.Point(20,10));
	this.destroyPS.emit = true;
	
	// Free crystals from within
	if(Common.savedData.character == "kristoff")
	{
		if(this.config.id.match(/iceblock\_([0-9]{2})\_([0-9]{2})/i))
		{
			var crystals = this.level.objectManager.getObjectsOfType("crystal");
			for(var i = 0; i < crystals.length; i++)
			{
				if(!crystals[i].interactive) continue;
				
				var distance = Math.abs(this.x - crystals[i].x);
				
				if(distance < 40)
				{
					crystals[i].canBePickedUp = true;
					crystals[i].sprite.alpha     = 1;
					crystals[i].glow.alpha       = 1;
					// crystals[i].pickup(this.avatar);
				}
			}
		}
	}
	
	switch(source)
	{
		case "axe":
			SoundSFX.playRandomFrom(["sfx_kristoff_smash_ice_00", "sfx_kristoff_smash_ice_01", "sfx_kristoff_smash_ice_02", "sfx_kristoff_smash_ice_03", "sfx_kristoff_smash_ice_04", "sfx_kristoff_smash_ice_05", "sfx_kristoff_smash_ice_06"]);
			break;
			
		case "magic":
		case "invulnerability":
			SoundSFX.playRandomFrom(["sfx_iceblock_smash_00", "sfx_iceblock_smash_01", "sfx_iceblock_smash_02", "sfx_iceblock_smash_03", "sfx_iceblock_smash_04", "sfx_iceblock_smash_05", "sfx_iceblock_smash_06"]);
			break;
	}
}
},{"../Common":2,"../general/Emitter":41,"../general/SoundSFX":44,"./GameObject":15}],31:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
// var Emitter     = require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectPowerup()
{
	GameObject.call(this, "powerup", false);

	this.level              = null;
	this.config             = null;

	this.sprite             = null;
	this.timeline           = null;
	this.duration           = 10;

	// Particles
	this.fxPS = new cloudkid.Emitter(this,
	[
		this._assetManager.getTexture("particle_sparkle_offset_00"),
		this._assetManager.getTexture("particle_sparkle_offset_01"),
		this._assetManager.getTexture("particle_sparkle_offset_02"),
		this._assetManager.getTexture("particle_sparkle_offset_03")
	], this._assetManager.getJSON("particle_troll_magic"));
	this.fxPS.emit = false;
}
module.exports = ObjectPowerup;
ObjectPowerup.prototype = Object.create(GameObject.prototype);
ObjectPowerup.prototype.constructor = ObjectPowerup;


//===================================================
// PUBLIC METHODS
//===================================================

ObjectPowerup.prototype.init = function(l)
{
	if(this.sprite == null)
	{
		this.sprite = new PIXI.Sprite();
		this.addChild(this.sprite);
	}
};

ObjectPowerup.prototype.reset = function()
{
	this.level    = null;
	this.config   = null;

	this.explosionTween = null;
	if(!!this.explosionTween)
	{
		this.explosionTween.kill();
	}
}

/**
 * Configure
 * @param {Level} level
 * @param {Object} config
 */
ObjectPowerup.prototype.configure = function(level, config)
{
	this.level  = level;
	this.config = config;

	this.x = this.config.position.x;
	this.y = this.config.position.y;

	this.sprite.texture = this._assetManager.getTexture(this.config.texture);
	this.sprite.anchor.set(0.5);
	this.sprite.scale.set(1);
	this.sprite.rotation = 0;
	this.sprite.visible = true;
	this.sprite.blendMode = PIXI.BLEND_MODES.SCREEN;

	// Init code
	this.interactive      = true;
	this.collisionCircle = new PIXI.Circle(0, 0, 70);

	// Particles
	this.fxPS.emit = true;

	// Animation
	if(!!this.timeline)
		this.timeline.kill();

	this.timeline = new TimelineMax();
		this.timeline.to(this.sprite.scale, 0.5, {x: 1.3, y: 1.3, ease:Sine.easeInOut, repeat:-1, yoyo:true},  0);
		this.timeline.to(this.sprite, 0.75, {rotation: 360 * PIXI.DEG_TO_RAD, ease:Linear.easeNone, repeat:-1},  0);
	Common.animator.add(this.timeline);

	// Debug
	if(this.level.debug)
		this.drawCollision();
}

/**
 * Dispose
 */
ObjectPowerup.prototype.dispose = function()
{
	if(!!this.timeline)
		this.timeline.kill();
}

/**
 * Update
 */
ObjectPowerup.prototype.update = function()
{
	// Particles update
	this.fxPS.update(p3.Timestep.deltaTime);
};

/**
 * An entity has picked up the coin
 * @param {GameObject} target
 */
ObjectPowerup.prototype.pickup = function(target)
{
	if(!this.interactive) return;

	this.interactive      = false;
	this.fxPS.emit        = false;

	if(!!this.timeline)
		this.timeline.kill();
	
	this.timeline = new TimelineMax();
		this.timeline.to(this.sprite.scale, 0.25, {x: 0, y: 0, ease:Sine.easeInOut},  0);
	Common.animator.add(this.timeline);	
	
	return true;
};
},{"../Common":2,"../general/SoundSFX":44,"./GameObject":15}],32:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
var Emitter		= require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectShrinkLock(args)
{
	GameObject.call(this, "shrink_lock", false);

	this.level        = null;
	this.config       = null;
	this.lock         = args;
}
module.exports = ObjectShrinkLock;
ObjectShrinkLock.prototype = Object.create(GameObject.prototype);
ObjectShrinkLock.prototype.constructor = ObjectShrinkLock;


//===================================================
// PUBLIC METHODS
//===================================================

ObjectShrinkLock.prototype.init = function(l)
{
	if(this.sprite == null)
	{
		this.sprite = new PIXI.Sprite();
		this.addChild(this.sprite);
	}
};

ObjectShrinkLock.prototype.reset = function()
{
	this.level    = null;
	this.config   = null;
}

ObjectShrinkLock.prototype.configure = function(level, config)
{
	this.level  = level;
	this.config = config;

	this.x = this.config.position.x;
	this.y = this.config.position.y;
	this.sprite.texture = this._assetManager.getTexture(this.config.texture);
	this.sprite.anchor.set(this.config.anchor.x, this.config.anchor.y);
	this.sprite.scale .set(this.config.scale.x, this.config.scale.y);
	this.rotation = this.config.rotation * PIXI.DEG_TO_RAD;

	// Init code
	this.interactive    = true;
	var width  = this.sprite.width;
	var height = this.sprite.height;
	this.sprite.visible = this.level.debug;
	this.collisionRect = new PIXI.Rectangle(-width * this.sprite.anchor.x, (-this.sprite.anchor.y) * height, width, height);
}

ObjectShrinkLock.prototype.dispose = function()
{

}

ObjectShrinkLock.prototype.update = function()
{

};

ObjectShrinkLock.prototype.hit = function(avatar)
{
	if(!this.interactive) return;
	this.interactive = false;

	if(avatar.isShrinking)
	{
		if(this.lock)
		{
			avatar.isShrinkLocked = true;
		}
		else if(!this.lock && avatar.isShrinkLocked)
		{
			avatar.powerUnshrink();
		}
	}
};
},{"../Common":2,"../general/Emitter":41,"../general/SoundSFX":44,"./GameObject":15}],33:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
var Emitter		= require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectSled()
{
	GameObject.call(this, "sled", false);

	this.removeWhenOutside = true;

	this.level        = null;
	this.config       = null;
	this.avatar       = null;

	this.spine        = null;
	this.time         = 0;
	this.timeMax      = 15;
	this.oldParent    = null;
	this.speedBoost   = 400;
	this.magnetBoost  = 1.25;
	this.jumpSpeed    = -1500;

	this.mountTween     = null;
	this.mountSpineX    = 0;
	this.mountSpineY    = 0;
	this.mountSpineTime = 0.6;
	this.mountSpinePerc = 0;

	this.fadeTime = 0.75;
	this.isFading = false;

	this.riderAnimation     = "ride_sled_down";
	this.riderFallAnimation = "ride_sled";

	// Particles
	// this.fxPS = new cloudkid.Emitter(this,
	// [
		// this._assetManager.getTexture("particle_sparkle_offset_02"),
		// this._assetManager.getTexture("particle_sparkle_offset_03")
	// ], this._assetManager.getJSON("particle_sled_shine"));
	// this.fxPS.emit = false;
}
module.exports = ObjectSled;
ObjectSled.prototype = Object.create(GameObject.prototype);
ObjectSled.prototype.constructor = ObjectSled;


//===================================================
// PUBLIC METHODS
//===================================================

ObjectSled.prototype.init = function(l)
{
	if(this.glow == null)
	{
		this.glow = new PIXI.Sprite(this._assetManager.getTexture("ingame_crystal_glow"));
		this.glow.anchor.set(0.5);
		this.glow.position.set(0, -20);
		this.glow.tint = 0xfff495;
		this.addChild(this.glow);
	}
	
	if(this.sprite == null)
	{
		this.sprite = new PIXI.Sprite();
	}

	// Init spine animation
	if(this.spine == null)
	{
		this.spineData = Common.characterAnimationData.char_sled;
		this.spine = new PIXI.spine.Spine(this.spineData);
		// this.spine.skeleton.setToSetupPose();
		// this.spine.skeleton.setSkin(null);
		// this.spine.skeleton.setSkinByName("sled");
		this.spine.autoUpdate = false;
		this.spine.scale.set(0.5);
		this.addChild(this.spine);

		var animations =
		[
		];

		for(var i = 0; i < animations.length; i++)
		{
			for(var j = 0; j < animations.length; j++)
			{
				if(i == j) continue;

				this.spine.stateData.setMixByName(animations[i], animations[j], 0.2);
			}
		}
	}

	// this.fxPS.emit = true;
};

ObjectSled.prototype.reset = function()
{
	this.level    = null;
	this.config   = null;

	this.currentAnimation = "";
	this.time = 0;
}

ObjectSled.prototype.configure = function(level, config)
{
	this.level  = level;
	this.config = config;

	this.x = this.config.position.x;
	this.y = this.config.position.y;
	this.sprite.texture = this._assetManager.getTexture(this.config.texture);
	this.sprite.anchor.set(this.config.anchor.x, this.config.anchor.y);
	this.sprite.scale.set(this.config.scale.x/2, this.config.scale.y/2);
	this.rotation = this.config.rotation * PIXI.DEG_TO_RAD;

	this.glow.rotation = 0;
	this.glow.scale.set(1);
	this.glow.visible = true;
	this.glow.alpha = 1;	
	
	// Init animation
	// this.spine.state.addAnimationByName(0, 'idle', true, 0.2);
	this.alpha = 1;
	this.isFading = false;

	// Init code
	this.interactive    = true;
	this.sprite.visible = false;
	var width  = this.sprite.width;
	var height = this.sprite.height;
	this.collisionRect = new PIXI.Rectangle(20, (-this.sprite.anchor.y) * height, 20, height);

	// Debug
	if(this.level.debug)
		this.drawCollision();
	
	// Animation
	this.timeline = new TimelineMax();
		this.timeline.to(this.glow, 8, {rotation: Math.PI * 2, ease:Linear.easeNone, repeat:-1},  0);
		this.timeline.to(this.glow.scale, 0.5, {x: 1.5, y: 1.5, ease:Quad.easeInOut, repeat:-1, yoyo:true},  0);
	Common.animator.add(this.timeline);

}

ObjectSled.prototype.dispose = function()
{
	// this.fxPS.emit = false;
	
	if(!!this.timeline)
	{
		this.timeline.kill();
		this.timeline = null;
	}	
}

ObjectSled.prototype.update = function()
{
	// Particles update
	// this.fxPS.update(p3.Timestep.deltaTime);

	// Animation update
	this.spine.update(p3.Timestep.deltaTime);

	// Mount update
	if(this.avatar)
	{
		// Automatic dismout countdown
		// this.time += p3.Timestep.deltaTime;

		// if(this.time >= this.timeMax && this.avatar.isGrounded)
		// {
			// this.dismount();
		// }
		if(this.avatar.isGrounded && this.avatar.collisionPoint.angle < 0)
		{
			this.dismount();
		}
		else
		{
			if(this.mountSpinePerc < 1)
			{
				// Tween the mounting
				this.avatar.spine.x = this.mountSpineX + ((this.spineRiderLock.worldX * this.spine.scale.x)-this.mountSpineX) * this.mountSpinePerc;
				this.avatar.spine.y = this.mountSpineY + ((this.spineRiderLock.worldY * this.spine.scale.y + this.avatar.collisionCircle.radius)-this.mountSpineY)* this.mountSpinePerc;
			}
			else
			{
				// Update the mount position
				this.avatar.spine.x = this.spineRiderLock.worldX * this.spine.scale.x;
				this.avatar.spine.y = this.spineRiderLock.worldY * this.spine.scale.y + this.avatar.collisionCircle.radius;
			}

			if(!this.avatar.isGrounded)
			{
				this.avatar.angleSpeed = 0.05;
				if(this.avatar.velocity.y < 50)
					this.avatar.angleTarget = -20 * PIXI.DEG_TO_RAD;
				else
					this.avatar.angleTarget = +20 * PIXI.DEG_TO_RAD;
			}
			else
			{
				this.avatar.angleSpeed = 0.1;
			}

		}
	}
	// Fade out
	else if(this.isFading)
	{
		this.alpha -= p3.Timestep.deltaTime/this.fadeTime;
		if(this.alpha < 0)
		{
			this.alpha = 0;
			this.isFading = false;
		}
	}
};

ObjectSled.prototype.hit = function(target)
{
	if(!this.interactive) return;

	this.interactive = false;
	this.mount(target);
};

ObjectSled.prototype.mount = function(avatar)
{
	this.removeWhenOutside = false;

	// Save a reference of the layer
	this.oldParent = this.parent;

	// Make the character riding the vehicle
	this.avatar = avatar;
	this.avatar.vehicle = this;
	this.avatar.isRidingVehicle = true;

	// Parent the vehicle inside the characte
	this.avatar.animationHolder.addChildAt(this,0);
	this.rotation = 0;
	this.x = 0;
	this.y = this.avatar.collisionCircle.radius;

	// Powerup the character
	this.avatar.runSpeed            += this.speedBoost;
	this.avatar.runSpeedMin         += this.speedBoost;
	this.avatar.runSpeedMax         += this.speedBoost*2;
	this.avatar.slidingSpeedMax     += this.speedBoost*2;
	this.avatar.pickupCircle.radius *= this.magnetBoost;
	this.avatar.isTumbling = false;
	this.avatar.tumbleAngle = 0;
	this.avatar.slidingAngleStart -= 30;

	// Get a reference to the bone where the character has to sit on
	this.spineRiderLock = this.spine.skeleton.findBone("rider_lock");

	// Ease the movement of the character when mounting the vehicle
	this.mountSpineX    = this.avatar.spine.x;
	this.mountSpineY    = this.avatar.spine.y;
	this.mountSpinePerc = 0;

	// this.fxPS.emit = false;
	
	// Hide the glow
	if(!!this.timeline)
	{
		this.timeline.kill();
		this.timeline = new TimelineMax();
			this.timeline.to(this.glow.scale, 0.3, {x: 0, y: 0, ease:Quad.easeOut},  0);
		Common.animator.add(this.timeline);
	}

	this.mountTween = new TimelineMax();
	this.mountTween.to(this, this.mountSpineTime, {mountSpinePerc: 1, ease:Back.easeOut}, 0);
	Common.animator.add(this.mountTween);
}

ObjectSled.prototype.dismount = function()
{
	// Remove the vehicle from the avatar and add it back to its layer
	this.removeWhenOutside = true;
	this.x = this.avatar.x;
	this.y = this.avatar.y + this.avatar.collisionCircle.radius;
	this.avatar.animationHolder.removeChild(this);
	this.oldParent.addChild(this);

	// If the vehicle was on ground show the sliding animation, otherwise, to avoid collision checks with the ground, gravity and such just fade it out
	if(this.avatar.isGrounded)
		this.setAnimation("slide_down_exit", true);
	else
		this.isFading = true;

	// Dismount the chracter
	this.avatar.vehicle = false;
	this.avatar.isRidingVehicle = false;
	this.avatar.y -= -this.avatar.spine.y;
	this.avatar.spine.x = 0;
	this.avatar.spine.y = this.avatar.collisionCircle.radius;

	// Make the character jump
	this.avatar.isGrounded = false;
	this.avatar.isTumbling = false;
	this.avatar.isSliding  = false;
	this.avatar.canTumble  = true;
	this.avatar.velocity.y = this.jumpSpeed;
	this.avatar.y -= 10;
	this.avatar.setAnimation('jump_normal', false);
	this.avatar.slidingAngleStart += 30;

	// Audio
	SoundSFX.playRandomFrom(["sfx_generic_jump_00", "sfx_generic_jump_01", "sfx_generic_jump_02"]);

	// Restore speed and magnet radius
	this.avatar.runSpeed            -= this.speedBoost;
	this.avatar.runSpeedMin         -= this.speedBoost;
	this.avatar.runSpeedMax         -= this.speedBoost*2;
	this.avatar.slidingSpeedMax     -= this.speedBoost*2;
	this.avatar.pickupCircle.radius  = this.avatar.pickupCircle.radius/this.magnetBoost;

	this.avatar = null;
}

ObjectSled.prototype.setAnimation = function(id, loop)
{
	return;
	if(loop && id == this.currentAnimation) return;

	this.currentAnimation = id;
	this.spine.state.setAnimationByName(0, id, loop, 0);
}
},{"../Common":2,"../general/Emitter":41,"../general/SoundSFX":44,"./GameObject":15}],34:[function(require,module,exports){
var Common         = require("../Common");
var RunningEntity  = require("./RunningEntity");
var Emitter		   = require("../general/Emitter");
var SoundSFX       = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectSnowball()
{
	RunningEntity.call(this, "snowball");

	this.level        = null;
	this.config       = null;
	this.removeWhenOutside = true;

	this.speed = 500;
	this.destroyed = false;
}
module.exports = ObjectSnowball;
ObjectSnowball.prototype = Object.create(RunningEntity.prototype);
ObjectSnowball.prototype.constructor = ObjectSnowball;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 * Init
 */
ObjectSnowball.prototype.init = function(l)
{
	if(this.sprite == null)
	{
		this.sprite = new PIXI.Sprite(this._assetManager.getTexture("ingame_obstacle_snowball_1"));
		this.sprite.anchor.set(0.5);
		this.sprite.scale .set(1);
		this.sprite.rotation = 0;
		this.addChild(this.sprite);

		this.sprite.shading = new PIXI.Sprite(this._assetManager.getTexture("ingame_obstacle_snowball_2"));
		this.sprite.shading.anchor.set(0.5);
		this.sprite.addChild(this.sprite.shading);
	}
};

/**
 * Reset
 */
ObjectSnowball.prototype.reset = function()
{
	this.level    = null;
	this.config   = null;

	this.velocity.set(0);
	this.gravity        = 0;
	this.isGrounded     = false;
	this.collisionPoint = null;

	this.sprite.rotation = 0;
	this.sprite.shading.rotation = 0;
	this.sprite.alpha = 1;
	this.alpha = 1;
}

/**
 * Configure
 * @param {Level} level
 * @param {Object} config
 */
ObjectSnowball.prototype.configure = function(level, config)
{
	this.level   = level;
	this.config  = config;
	this.gravity = level.avatar.gravity;

	this.x = this.config.position.x;
	this.y = this.config.position.y;

	// Init code
	this.interactive      = true;
	this.sprite.visible   = true;
	this.sprite.scale.set(this.config.scale.x, this.config.scale.y)
	this.destroyed        = false;

	// Collider
	this.collisionCircle = new PIXI.Circle(0, 0, this.sprite.width*0.425);

	// Particles
	if(!this.trailPS)
	{
		this.trailPS = new cloudkid.Emitter(this.level,
		[
			this._assetManager.getTexture("particle_snowflake_00"),
			this._assetManager.getTexture("particle_snowflake_01"),
			this._assetManager.getTexture("particle_snowflake_02"),
			this._assetManager.getTexture("particle_snowflake_03")
		], this._assetManager.getJSON("particle_snowball"));
	}
	this.trailPS.emit = true;

	this.destroyPS = new cloudkid.Emitter(this,
	[
		this._assetManager.getTexture("particle_snowflake_00")
	],
	this._assetManager.getJSON("particle_ice_explosion"));
	this.destroyPS.updateSpawnPos(0, -this.sprite.height/2);
	this.destroyPS.emit = false;

	// Debug
	if(this.level.debug)
		this.drawCollision();
}

/**
 * Dispose
 */
ObjectSnowball.prototype.dispose = function()
{
	// Stop particles
	this.trailPS.emit = false;
	this.destroyPS.emit = false;
}

/**
 * Update
 */
ObjectSnowball.prototype.update = function()
{
	// Particles update
	this.trailPS.updateSpawnPos(this.x, this.y);
	this.trailPS.update(p3.Timestep.deltaTime);
	this.destroyPS.update(p3.Timestep.deltaTime);

	// Update position
	if(!this.destroyed)
	{
		if(this.isGrounded)
			this.velocity.x = -this.speed;
		else
			this.velocity.x = 0;

		// Gravity
		this.velocity.y += this.gravity * p3.Timestep.deltaTime;
		if(this.velocity.y >= this.gravity/2) this.velocity.y = this.gravity/2;

		// Movement
		var wasGrounded = this.isGrounded;
		this.move(this.velocity);

		// Undo gravity when touching ground
		if(this.isGrounded)
		{
			this.velocity.y = 0;
		}

		this.sprite.rotation -= 360 * PIXI.DEG_TO_RAD * p3.Timestep.deltaTime;
		this.sprite.shading.rotation = -this.sprite.rotation;
	}
}

/**
 * Hit
 * @param {GameObject} target
 */
ObjectSnowball.prototype.hit = function(target)
{
	if(!this.interactive) return;
	this.interactive = false;

	this.destroyPS.emit = true;

	SoundSFX.playRandomFrom(["sfx_generic_hit_obstacle_00"]);
};

/**
 * Destroy
 * @param {bool} reward
 */
ObjectSnowball.prototype.destroy = function(reward)
{
	if(!this.interactive) return;
	this.interactive = false;
	this.destroyed   = true;

	// Stop particles
	this.trailPS.emit   = false;
	this.destroyPS.emit = true;

	// Fade out
	var tl = new TimelineMax();
	tl.to(this.sprite, 0.15, {alpha: 0, ease:Linear.easeNone},  0);
	Common.animator.add(tl);

	// Generate snowflakes
	if(reward)
	{
		for(var i = 0; i < 5; i++)
		{
			this.parent.addObject("coin",
			{
				position : {x:this.x, y:this.y},
				explosion : {angle : -60 - 20 * i, distance: 300, time: 0.5}
			});
		}
	}


	SoundSFX.playRandomFrom(["sfx_iceblock_smash_00", "sfx_iceblock_smash_01", "sfx_iceblock_smash_02", "sfx_iceblock_smash_03", "sfx_iceblock_smash_04", "sfx_iceblock_smash_05", "sfx_iceblock_smash_06"]);
};
},{"../Common":2,"../general/Emitter":41,"../general/SoundSFX":44,"./RunningEntity":38}],35:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
var Emitter		= require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectSven()
{
	GameObject.call(this, "sven", false);

	this.removeWhenOutside = true;

	this.level        = null;
	this.config       = null;
	this.avatar       = null;

	this.spine        = null;
	this.time         = 0;
	this.timeMax      = 10;
	this.oldParent    = null;
	this.speedBoost   = 200;
	this.magnetBoost  = 1.25;
	this.jumpSpeed    = -1500;

	this.mountTween     = null;
	this.mountSpineX    = 0;
	this.mountSpineY    = 0;
	this.mountSpineTime = 0.6;
	this.mountSpinePerc = 0;

	this.fadeTime = 0.75;
	this.isFading = false;
	
	this.riderAnimation     = "ride_sven";
	this.riderFallAnimation = "ride_sven_fall";
}
module.exports = ObjectSven;
ObjectSven.prototype = Object.create(GameObject.prototype);
ObjectSven.prototype.constructor = ObjectSven;


//===================================================
// PUBLIC METHODS
//===================================================

ObjectSven.prototype.init = function(l)
{
	if(this.sprite == null)
	{
		this.sprite = new PIXI.Sprite();
	}

	// Init spine animation
	if(this.spine == null)
	{
		this.spineData = Common.characterAnimationData.char_sven;
		this.spine = new PIXI.spine.Spine(this.spineData);
		this.spine.skeleton.setToSetupPose();
		this.spine.skeleton.setSkin(null);
		this.spine.skeleton.setSkinByName("sven");
		this.spine.autoUpdate = false;
		this.spine.scale.set(0.5);
		this.addChild(this.spine);

		var animations =
		[
			'idle',
			'run_flat',
			'jump_normal',
			'slide_down_steep',
			'slide_down_exit',
			'fall',
			'land_bad'
		];

		for(var i = 0; i < animations.length; i++)
		{
			for(var j = 0; j < animations.length; j++)
			{
				if(i == j) continue;

				if(animations[i] == "fall")
					this.spine.stateData.setMixByName(animations[i], animations[j], 0.1);
				else
					this.spine.stateData.setMixByName(animations[i], animations[j], 0.2);
			}
		}
	}
};

ObjectSven.prototype.reset = function()
{
	this.level    = null;
	this.config   = null;

	this.currentAnimation = "";
	this.time = 0;
}

ObjectSven.prototype.configure = function(level, config)
{
	this.level  = level;
	this.config = config;

	this.x = this.config.position.x;
	this.y = this.config.position.y;
	this.sprite.texture = this._assetManager.getTexture(this.config.texture);
	this.sprite.anchor.set(this.config.anchor.x, this.config.anchor.y);
	this.sprite.scale.set(this.config.scale.x/2, this.config.scale.y/2);
	this.rotation = this.config.rotation * PIXI.DEG_TO_RAD;

	// Init animation
	this.spine.state.addAnimationByName(0, 'idle', true, 0.2);
	this.alpha = 1;
	this.isFading = false;

	// Init code
	this.interactive    = true;
	this.sprite.visible = false;
	var width  = this.sprite.width;
	var height = this.sprite.height;
	this.collisionRect = new PIXI.Rectangle(55, (-this.sprite.anchor.y) * height/2, 20, height/2);

	// Is there already another Sven? Disable it if so
	if(this.level.avatar.isRidingVehicle && this.level.avatar.vehicle.type == this.type)
	{
		this.interactive = false;
		this.alpha = 0;
	}
	
	// Debug
	if(this.level.debug)
		this.drawCollision();
}

ObjectSven.prototype.dispose = function()
{

}

ObjectSven.prototype.update = function()
{
	// Animation update
	this.spine.update(p3.Timestep.deltaTime);

	// Mount update
	if(this.avatar)
	{
		// Automatic dismout countdown
		this.time += p3.Timestep.deltaTime;

		if(this.time >= this.timeMax && this.avatar.isGrounded)
		{
			this.dismount(false);
		}
		else
		{
			if(this.mountSpinePerc < 1)
			{
				// Tween the mounting
				this.avatar.spine.x = this.mountSpineX + ((this.spineRiderLock.worldX * this.spine.scale.x)-this.mountSpineX) * this.mountSpinePerc;
				this.avatar.spine.y = this.mountSpineY + ((this.spineRiderLock.worldY * this.spine.scale.y + this.avatar.collisionCircle.radius)-this.mountSpineY)* this.mountSpinePerc;
			}
			else
			{
				// Update the mount position
				this.avatar.spine.x = this.spineRiderLock.worldX * this.spine.scale.x;
				this.avatar.spine.y = this.spineRiderLock.worldY * this.spine.scale.y + this.avatar.collisionCircle.radius;
			}
		}
	}
	// Fade out
	else if(this.isFading)
	{
		this.alpha -= p3.Timestep.deltaTime/this.fadeTime;
		if(this.alpha < 0)
		{
			this.alpha = 0;
			this.isFading = false;
		}
	}
};

ObjectSven.prototype.hit = function(target)
{
	if(!this.interactive) return;

	this.interactive = false;
	this.mount(target);
};

ObjectSven.prototype.mount = function(avatar)
{
	this.removeWhenOutside = false;

	// Save a reference of the layer
	this.oldParent = this.parent;

	// Make the character riding the vehicle
	this.avatar = avatar;
	this.avatar.vehicle = this;
	this.avatar.isRidingVehicle = true;

	// Parent the vehicle inside the characte
	this.avatar.animationHolder.addChildAt(this,0);
	this.rotation = 0;
	this.x = 0;
	this.y = this.avatar.collisionCircle.radius;

	// Powerup the character
	this.avatar.runSpeed            += this.speedBoost;
	this.avatar.runSpeedMin         += this.speedBoost;
	this.avatar.runSpeedMax         += this.speedBoost;
	this.avatar.slidingSpeedMax     += this.speedBoost;
	this.avatar.pickupCircle.radius *= this.magnetBoost;
	this.avatar.isTumbling = false;
	this.avatar.tumbleAngle = 0;
	this.avatar.animationHolder.rotation = 0;

	// Get a reference to the bone where the character has to sit on
	this.spineRiderLock = this.spine.skeleton.findBone("rider_lock");

	// Ease the movement of the character when mounting the vehicle
	this.mountSpineX    = this.avatar.spine.x;
	this.mountSpineY    = this.avatar.spine.y;
	this.mountSpinePerc = 0;

	this.mountTween = new TimelineMax();
	this.mountTween.to(this, this.mountSpineTime, {mountSpinePerc: 1, ease:Back.easeOut}, 0);
	Common.animator.add(this.mountTween);
}

ObjectSven.prototype.dismount = function(hitByObstacle)
{
	// Remove the vehicle from the avatar and add it back to its layer
	this.removeWhenOutside = true;
	this.x = this.avatar.x;
	this.y = this.avatar.y + this.avatar.collisionCircle.radius;
	this.avatar.animationHolder.removeChild(this);
	this.oldParent.addChild(this);

	// If the vehicle was on ground show the sliding animation, otherwise, to avoid collision checks with the ground, gravity and such just fade it out
	if(this.avatar.isGrounded)
		this.setAnimation("land_bad", false);
	else
		this.isFading = true;
	
	// Audio
	if(hitByObstacle)
		SoundSFX.play("sfx_sven_hitobstacle_stop_00");
	else
		SoundSFX.play("sfx_sven_run_stop_00");		

	// Dismount the character
	this.avatar.vehicle = false;
	this.avatar.isRidingVehicle = false;
	this.avatar.y -= -this.avatar.spine.y;
	this.avatar.spine.x = 0;
	this.avatar.spine.y = this.avatar.collisionCircle.radius;

	// Make the character jump
	this.avatar.isGrounded = false;
	this.avatar.isTumbling = false;
	this.avatar.isSliding  = false;
	this.avatar.canTumble  = true;
	this.avatar.velocity.y = this.jumpSpeed;
	this.avatar.setAnimation('jump_normal', false);

	// Audio
	SoundSFX.playRandomFrom(["sfx_generic_jump_00", "sfx_generic_jump_01", "sfx_generic_jump_02"]);

	// Restore speed and magnet radius
	this.avatar.runSpeed            -= this.speedBoost;
	this.avatar.runSpeedMin         -= this.speedBoost;
	this.avatar.runSpeedMax         -= this.speedBoost;
	this.avatar.slidingSpeedMax     -= this.speedBoost;
	this.avatar.pickupCircle.radius  = this.avatar.pickupCircle.radius/this.magnetBoost;

	this.avatar = null;
}

ObjectSven.prototype.setAnimation = function(id, loop)
{
	if(loop && id == this.currentAnimation) return;

	this.currentAnimation = id;
	this.spine.state.setAnimationByName(0, id, loop, 0);
}
},{"../Common":2,"../general/Emitter":41,"../general/SoundSFX":44,"./GameObject":15}],36:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
var Emitter		= require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectTroll(isCollectable)
{
	GameObject.call(this, "troll", false);

	this.removeWhenOutside = true;

	this.level        = null;
	this.config       = null;
	this.avatar       = null;

	this.spine        = null;
	this.time         = 0;
	this.timeMax      = 10;

	this.isCollectable = isCollectable;
	this.isCollected   = false;

	this.fadeTime = 0.75;
	this.isFading = false;

	this.glow     = null;
	this.timeline = null;

	this.character = "";
	this.crystal   = "";
	this.hasBlinked = false;

	this.pickupPS      = new cloudkid.Emitter(this, [this._assetManager.getTexture("particle_snowflake_00")], this._assetManager.getJSON("particle_coin_collect_burst"));
	this.pickupPS.emit = false;
}
module.exports = ObjectTroll;
ObjectTroll.prototype = Object.create(GameObject.prototype);
ObjectTroll.prototype.constructor = ObjectTroll;

ObjectTroll.prototype.indexes    = 0;
ObjectTroll.prototype.collected  = [];


//===================================================
// PUBLIC METHODS
//===================================================

ObjectTroll.prototype.init = function(l)
{
	if(this.sprite == null)
	{
		this.sprite = new PIXI.Sprite();
	}

	// Init spine animation
	if(this.spine == null)
	{
		this.spineData = Common.characterAnimationData.char_troll;
		this.spine = new PIXI.spine.Spine(this.spineData);
		this.spine.skeleton.setToSetupPose();
		this.spine.skeleton.setSkin(null);
		this.spine.skeleton.setSkinByName("troll_sign");
		this.spine.autoUpdate = false;
		this.spine.scale.set(0.5);
		this.addChild(this.spine);

		var animations =
		[
			'idle1',
			'idle2',
			'idle3'
		];

		for(var i = 0; i < animations.length; i++)
		{
			for(var j = 0; j < animations.length; j++)
			{
				if(i == j) continue;
				this.spine.stateData.setMixByName(animations[i], animations[j], 0.2);
			}
		}
	}
};

ObjectTroll.prototype.reset = function()
{
	this.level     = null;
	this.config    = null;
	this.visible   = true;
	this.character = "";

	this.currentAnimation = "";
	this.time = 0;
}

ObjectTroll.prototype.configure = function(level, config)
{
	if(this.isCollectable)
	{
		// Current index, shared among all trplls (static)
		this.indexes++;

		// Index of the current troll
		this.index = this.indexes-1;

		// Collected
		this.isCollected = Common.savedData.isTrollCollected(Common.savedData.level, this.index)

		// Glow
		if(this.glow == null)
		{
			this.glow = new PIXI.Sprite(this._assetManager.getTexture("ingame_crystal_glow"));
			this.glow.anchor.set(0.5);
			this.glow.y -= 20;
			this.addChildAt(this.glow, 0);
		}

		this.glow.rotation = 0;
		this.glow.scale.set(1);

		// Animation
		this.timeline = new TimelineMax();
			this.timeline.to(this.glow, 8, {rotation: Math.PI * 2, ease:Linear.easeNone, repeat:-1},  0);
			this.timeline.to(this.glow.scale, 0.5, {x: 1.5, y: 1.5, ease:Quad.easeInOut, repeat:-1, yoyo:true},  0);
		Common.animator.add(this.timeline);
	}

	// Config
	this.level  = level;
	this.config = config;

	this.x = this.config.position.x;
	this.y = this.config.position.y;
	this.sprite.texture = this._assetManager.getTexture(this.config.texture);
	this.sprite.anchor.set(this.config.anchor.x, this.config.anchor.y);
	this.sprite.scale.set(this.config.scale.x/2, this.config.scale.y/2);
	this.rotation = this.config.rotation * PIXI.DEG_TO_RAD;
	this.hasBlinked = false;

	// Init animation
	this.alpha = 1;
	this.isFading = false;

	if(this.isCollectable)
	{
		if(this.isCollected)
		{
			this.spine.state.addAnimationByName(0, 'idle2', true, 0.2);
			this.glow.visible = false;
			this.visible = false;
		}
		else
		{
			if(Common.savedData.character == 'pabbie')
			{
				this.spine.state.addAnimationByName(0, 'idle3', true, 0.2);
				this.glow.visible = true;
			}
			else
			{
				this.glow.visible = false;
				this.spine.alpha = 0.5;

				// Add head
				this.chara = new PIXI.Sprite(this._assetManager.getTexture("ingame_progress_char_pabbie"));
				this.chara.anchor.set(0.5);
				this.chara.y = -120;
				this.chara.x = 10;
				this.addChild(this.chara);
			}
		}
	}
	else
	{
		this.spine.state.addAnimationByName(0, 'idle1', true, 0.2);

		if(this.config.data != "")
		{
			try
			{
				var data = JSON.parse(this.config.data);
				this.character = !!data.character ? data.character : null;
				this.crystal   = !!data.crystal ? (parseInt(data.crystal)-1) : null;
			}
			catch(e)
			{
				console.error("Decoration data error %s", this.config.data);
			}
		}

		if(this.character != null && this.character != Common.savedData.character)
		{
			this.visible = false;
		}

		if(this.character != null && this.crystal != null && this.character == Common.savedData.character && Common.savedData.isCrystalCollected(Common.savedData.level, this.character, this.crystal))
		{
			this.visible = false;
		}
	}

	// Init code
	this.interactive    = this.isCollectable && !this.isCollected;
	this.sprite.visible = false;
	var width  = this.sprite.width;
	var height = this.sprite.height;

	this.collisionCircle = new PIXI.Circle(0, -this.sprite.height/2, 100);

	// Debug
	if(this.level.debug)
		this.drawCollision();
}

ObjectTroll.prototype.dispose = function()
{
	if(!!this.timeline)
	{
		this.timeline.kill();
		this.timeline = null;
	}
}

ObjectTroll.prototype.update = function()
{
	this.pickupPS.update(p3.Timestep.deltaTime);

	// Animation update
	this.spine.update(p3.Timestep.deltaTime);

	// Fade out
	if(this.isFading)
	{
		this.alpha -= p3.Timestep.deltaTime/this.fadeTime;
		if(this.alpha < 0)
		{
			this.alpha = 0;
			this.isFading = false;
		}
	}

	// Blink when close enough
	if(!this.hasBlinked && this.visible)
	{
		if(Math.sqrt(Math.pow(this.level.avatar.x - this.x, 2) + Math.pow(this.level.avatar.y - this.y, 2)) < 1000)
		{
			SoundSFX.play("sfx_troll_notify_00");
			this.hasBlinked = true;
		}
	}
};

ObjectTroll.prototype.pickup = function(target)
{
	if(!this.interactive) return;
	if(!this.isCollectable) return;

	this.interactive   = false;
	this.pickupPS.emit = true;

	// Store in the static field that this troll has been collected
	ObjectTroll.prototype.collected.push(this.index);

	Common.savedData.trolls[Common.savedData.level][this.index] = true;
	Common.savedData.save();

	this.setAnimation("idle2");

	// Show the top container
	this.level.parent.gameUI.trollCollected();

	this.spine.state.addAnimationByName(0, 'collected', true, 0.2);
	SoundSFX.play("sfx_pickup_troll_01");

	// Hide the glow
	if(!!this.timeline)
	{
		this.timeline.kill();
		this.timeline = new TimelineMax();
			this.timeline.to(this.glow.scale, 0.3, {x: 0, y: 0, ease:Quad.easeOut},  0);
		Common.animator.add(this.timeline);
	}
};

ObjectTroll.prototype.setAnimation = function(id, loop)
{
	if(loop && id == this.currentAnimation) return;

	this.currentAnimation = id;
	this.spine.state.setAnimationByName(0, id, loop, 0);
}
},{"../Common":2,"../general/Emitter":41,"../general/SoundSFX":44,"./GameObject":15}],37:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
var Emitter		= require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ObjectTutorial()
{
	GameObject.call(this, "tutorial", false);

	this.level        = null;
	this.config       = null;
	this.text         = "";
}
module.exports = ObjectTutorial;
ObjectTutorial.prototype = Object.create(GameObject.prototype);
ObjectTutorial.prototype.constructor = ObjectTutorial;


//===================================================
// PUBLIC METHODS
//===================================================

ObjectTutorial.prototype.init = function(l)
{
	if(this.sprite == null)
	{
		this.sprite = new PIXI.Sprite();
		this.addChild(this.sprite);
	}
};

ObjectTutorial.prototype.reset = function()
{
	this.level    = null;
	this.config   = null;
}

ObjectTutorial.prototype.configure = function(level, config)
{
	this.level  = level;
	this.config = config;

	this.x = this.config.position.x;
	this.y = this.config.position.y;
	this.sprite.texture = this._assetManager.getTexture(this.config.texture);
	this.sprite.anchor.set(this.config.anchor.x, this.config.anchor.y);
	this.sprite.scale .set(this.config.scale.x, this.config.scale.y);
	this.rotation = this.config.rotation * PIXI.DEG_TO_RAD;

	if(this.config.data != "")
	{
		try
		{
			var data = JSON.parse(this.config.data);
			this.text  = !!data.text ? data.text : "WELL_DONE";
		}
		catch(e)
		{
			console.error("Tutorial object data error %s", this.config.data);
		}
	}
		
	// Init code
	this.interactive    = Common.savedData.character != "pabbie";
	this.sprite.visible = this.level.debug;
	var width  = this.sprite.width;
	var height = this.sprite.height;
	this.collisionRect = new PIXI.Rectangle(-width * this.sprite.anchor.x, (-this.sprite.anchor.y) * height, width, height);
}

ObjectTutorial.prototype.dispose = function()
{

}

ObjectTutorial.prototype.update = function()
{

};

ObjectTutorial.prototype.hit = function()
{
	if(!this.interactive) return;

	this.interactive = false;
	this.level.parent.gameUI.tutorial(this._assetManager.getJSON("strings")[this.text][Common.COUNTRY_CODE]);
	
	if(this.text == "TUTORIAL_TUMBLE")
	{
		this.level.parent.gameUI.highlight("style")
	}
};
},{"../Common":2,"../general/Emitter":41,"../general/SoundSFX":44,"./GameObject":15}],38:[function(require,module,exports){
var Common      = require("../Common");
var GameObject  = require("./GameObject");
var Emitter		= require("../general/Emitter");
var SoundSFX    = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function RunningEntity(name)
{
	GameObject.call(this, name, false);

	this.allowPathCollisions   = true;
	this.isGrounded            = false;
	this.collisionPoint        = null;
	this.angleTarget           = 0;
	this.velocity              = new PIXI.Point();
	this.ignoreArtificialPaths = true;
}
module.exports = RunningEntity;
RunningEntity.prototype = Object.create(GameObject.prototype);
RunningEntity.prototype.constructor = RunningEntity;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 * Move the character and handle collisions
 * @param {PIXI.Point} velocity
 */
RunningEntity.prototype.move = function(velocity)
{
	var directionY = Math.sign(velocity.y);
	
	// Calculate speed
	var velocity = new PIXI.Point
	(
		velocity.x * p3.Timestep.deltaTime,
		velocity.y * p3.Timestep.deltaTime
	);

	// Quickfix: Limit vertical speed to diameter to avoid passing through collision lines
	if(velocity.y > 0 && velocity.y >= this.collisionCircle.radius)
	{
		// console.log("speed limit activated")
		velocity.y = this.collisionCircle.radius * 0.99;
	}

	// Adjust speed to slope angle
	if(this.isGrounded && !!this.collisionPoint)
	{
		velocity.x *=  Math.cos(this.collisionPoint.angle)
	}

	// Apply movement
	this.x += velocity.x;
	this.y += velocity.y;

	// Collisions
	if(this.allowPathCollisions)
	{
		var wasGrounded     = this.isGrounded;
		this.collisionPoint = null;
		this.isGrounded     = false;

		if(this.level.debug)
		{
			if(!!this.wireframe)
				this.level.removeChild(this.wireframe)

			this.wireframe = new PIXI.Graphics();
			this.wireframe.config = {depth:1000};
			this.level.addChild(this.wireframe)
		}

		// Top collisions
		for(var i = 0; i < this.level.layers.length; i++)
		{
			for(var j = 0; j < this.level.layers[i].childrenPaths.length; j++)
			{
				// Collide only with closed paths
				// if(!this.level.layers[i].childrenPaths[j].config.closed) continue;

				// Check if the path is relevant
				if(this.level.layers[i].childrenPaths[j].config.collisions != 1) continue;
				if(this.level.layers[i].childrenPaths[j].config.bounds[0] > this.x + this.collisionCircle.x + this.collisionCircle.radius * 2) continue;
				if(this.level.layers[i].childrenPaths[j].config.bounds[1] < this.x + this.collisionCircle.x - this.collisionCircle.radius * 2) continue;
				if(this.isShrinking && this.level.layers[i].childrenPaths[j].isShrinkPath()) continue;
				if(this.ignoreArtificialPaths && this.level.layers[i].childrenPaths[j].isArtificialPath()) continue;

				// Loop through the path segments
				var points = this.level.layers[i].childrenPaths[j].bezier.getDrawingPoints();

				for(var p = 0; p < points.length-1; p++)
				{
					// Segment points
					var p1 = points[p+1];
					var p2 = points[p];

					// Skip segments facing up
					if(p1.x > p2.x) continue;

					// Circle collider center
					var pAvatar = new PIXI.Point(this.x + this.collisionCircle.x, this.y + this.collisionCircle.y);

					// Is the segment close to the collider?
					if(p1.x > pAvatar.x + this.collisionCircle.radius) continue;
					if(p2.x < pAvatar.x - this.collisionCircle.radius) continue;
					if(p1.y > pAvatar.y + this.collisionCircle.radius && p2.y > pAvatar.y + this.collisionCircle.radius) continue;
					if(p1.y < pAvatar.y - this.collisionCircle.radius && p2.y < pAvatar.y - this.collisionCircle.radius) continue;

					// Segment of the bezier curve
					var segment = new PIXI.Point(points[p+1].x - points[p].x, points[p+1].y - points[p].y);
					var segmentNormalized = new PIXI.Point(segment.x, segment.y);
					segmentNormalized.normalize();

					// Avatar-segment vector
					var vAvatar = new PIXI.Point(this.x + this.collisionCircle.x - points[p].x, this.y + this.collisionCircle.y - points[p].y);

					// Calculate the projection of vAvatar onto the segment
					var vProjLength = vAvatar.dotProduct(segment) / segment.getLength();
					var vProj       = new PIXI.Point(segmentNormalized.x * vProjLength, segmentNormalized.y * vProjLength);

					// Clamp the projection vector
					if(vProj.x != segment.x)
					{
						if(vProj.x/segment.x < 0)
							vProj = new PIXI.Point(0,0);
						if(vProj.x/segment.x > 1)
							vProj = new PIXI.Point(segment.x, segment.y);
					}
					else
					{
						if(vProj.y/segment.y < 0)
							vProj = new PIXI.Point(0,0);
						if(vProj.y/segment.y > 1)
							vProj = new PIXI.Point(segment.x, segment.y);
					}

					// Calculate the perpendicular
					var perp = new PIXI.Point(vProj.x - vAvatar.x, vProj.y - vAvatar.y);
					var perpLength = perp.getLength();

					if(this.level.debug)
					{
						this.wireframe.lineStyle(8, 0xffffff, 1);
						this.wireframe.moveTo(p1.x, p1.y);
						this.wireframe.lineTo(p2.x, p2.y);

						this.wireframe.lineStyle(6, 0x0000ff, 1);
						this.wireframe.moveTo(pAvatar.x, pAvatar.y);
						this.wireframe.lineTo(pAvatar.x - vAvatar.x, pAvatar.y - vAvatar.y);
					}

					// If the length of the perpendicular is less than the radius the segment collides with the circle
					if(perpLength < this.collisionCircle.radius)
					{
						if(this.level.debug)
						{
							this.wireframe.lineStyle(3, 0xff00ff, 1);
							this.wireframe.moveTo(points[p].x, points[p].y);
							this.wireframe.lineTo(points[p].x + vProj.x, points[p].y + vProj.y);

							this.wireframe.lineStyle(5, 0x00ff00, 1);
							this.wireframe.moveTo(points[p].x + vProj.x, points[p].y + vProj.y);
							this.wireframe.lineTo(points[p].x + vProj.x - perp.x, points[p].y + vProj.y - perp.y);
						}

						// If the character was moving against the wall, push it back
						if(velocity.x != 0)
						{
							this.x += -Math.sign(velocity.x) * (this.collisionCircle.radius - perpLength);
						}

						// If the character was jumping make it fall
						if(this.velocity.y < 0)
						{
							this.y -= velocity.y;
							this.velocity.y = 200;
						}
					}
				}
			}
		}

		// Ground collision
		var slopeAngleMax = 80;

		for(var i = 0; i < this.level.layers.length; i++)
		{
			for(var j = 0; j < this.level.layers[i].childrenPaths.length; j++)
			{
				// Check if the path is relevant
				if(this.level.layers[i].childrenPaths[j].config.collisions == 0) continue;
				if(this.level.layers[i].childrenPaths[j].config.collisions == 2 && directionY < 0) continue;
				if(this.level.layers[i].childrenPaths[j].config.bounds[0] > this.x + this.collisionCircle.x + this.collisionCircle.radius * 2) continue;
				if(this.level.layers[i].childrenPaths[j].config.bounds[1] < this.x + this.collisionCircle.x - this.collisionCircle.radius * 2) continue;
				if(this.isShrinking && this.level.layers[i].childrenPaths[j].isShrinkPath()) continue;
				if(this.ignoreArtificialPaths && this.level.layers[i].childrenPaths[j].isArtificialPath()) continue;

				// Loop through the path segments
				var points = this.level.layers[i].childrenPaths[j].bezier.getDrawingPoints();

				do
				{
					var repeat = false;

					for(var p = 0; p < points.length-1; p++)
					{
						// Segment points
						var p1 = points[p];
						var p2 = points[p+1];

						// Skip segments facing down
						if(p1.x > p2.x) continue;

						// Circle collider center
						var pAvatar = new PIXI.Point(this.x + this.collisionCircle.x, this.y + this.collisionCircle.y);

						// Is the segment close to the collider?
						if(p1.x > pAvatar.x + this.collisionCircle.radius) continue;
						if(p2.x < pAvatar.x - this.collisionCircle.radius) continue;
						if(p1.y > pAvatar.y + this.collisionCircle.radius && p2.y > pAvatar.y + this.collisionCircle.radius) continue;
						if(p1.y < pAvatar.y - this.collisionCircle.radius && p2.y < pAvatar.y - this.collisionCircle.radius) continue;

						// Skip slopes that are too inclined
						var segmentAngle = Math.atan2((p2.y - p1.y), (p2.x - p1.x));
						if(Math.abs(segmentAngle * PIXI.RAD_TO_DEG) >= slopeAngleMax) continue;

						// Jumpthrough paths
						if(this.level.layers[i].childrenPaths[j].config.collisions == 2)
						{
							if(!wasGrounded)
							{
								// If it's a path that can be jumped through, make sure that the bottom of the circle collider is close enough to the path before attempting to stick to it
								var dX = (pAvatar.x - p1.x)/(p2.x - p1.x);
								dX = Math.min(Math.max(dX, 0), 1);
								var sY = p1.y + (p2.y - p1.y) * dX;

								if(pAvatar.y > sY) continue;
							} 

							if(Math.abs(segmentAngle * PIXI.RAD_TO_DEG) >= this.level.layers[i].childrenPaths[j].config.texWallAngle) continue;
						}

						// Segment of the bezier curve
						var segment = new PIXI.Point(points[p+1].x - points[p].x, points[p+1].y - points[p].y);
						var segmentNormalized = new PIXI.Point(segment.x, segment.y);
						segmentNormalized.normalize();

						// Avatar-segment vector
						var vAvatar = new PIXI.Point(this.x + this.collisionCircle.x - points[p].x, this.y + this.collisionCircle.y - points[p].y);

						// Calculate the projection of vAvatar onto the segment
						var vProjLength = vAvatar.dotProduct(segment) / segment.getLength();
						var vProj       = new PIXI.Point(segmentNormalized.x * vProjLength, segmentNormalized.y * vProjLength);

						// Clamp the projection vector
						if(vProj.x != segment.x)
						{
							if(vProj.x/segment.x < 0 && !wasGrounded) continue; // Test fix: don't extrapolate the projection point if jumping

							if(vProj.x/segment.x < 0)
								vProj = new PIXI.Point(0,0);
							if(vProj.x/segment.x > 1)
								vProj = new PIXI.Point(segment.x, segment.y);
						}
						else
						{
							if(vProj.y/segment.y < 0)
								vProj = new PIXI.Point(0,0);
							if(vProj.y/segment.y > 1)
								vProj = new PIXI.Point(segment.x, segment.y);
						}

						// Calculate the perpendicular
						var perp = new PIXI.Point(vProj.x - vAvatar.x, vProj.y - vAvatar.y);
						var perpLength = perp.getLength();

						if(this.level.debug)
						{
							this.wireframe.lineStyle(8, 0xffffff, 1);
							this.wireframe.moveTo(p1.x, p1.y);
							this.wireframe.lineTo(p2.x, p2.y);

							this.wireframe.lineStyle(6, 0x0000ff, 1);
							this.wireframe.moveTo(pAvatar.x, pAvatar.y);
							this.wireframe.lineTo(pAvatar.x - vAvatar.x, pAvatar.y - vAvatar.y);
						}

						// If the length of the perpendicular is less than the radius the segment collides with the circle
						if(perpLength < this.collisionCircle.radius)
						{
							if(this.level.debug)
							{
								this.wireframe.lineStyle(3, 0xff00ff, 1);
								this.wireframe.moveTo(points[p].x, points[p].y);
								this.wireframe.lineTo(points[p].x + vProj.x, points[p].y + vProj.y);

								this.wireframe.lineStyle(5, 0xff0000, 1);
								this.wireframe.moveTo(points[p].x + vProj.x, points[p].y + vProj.y);
								this.wireframe.lineTo(points[p].x + vProj.x - perp.x, points[p].y + vProj.y - perp.y);
							}

							// Collision!
							velocity.y = 0;
							this.isGrounded = true;

							// Move the character up by the vertical distance between the projection end point and the point on the circumference
							perp.normalize();
							var angleDown = perp.angle(new PIXI.Point(0,1))
							var delta     = (Math.sin(Math.acos(Math.sin(angleDown))) * this.collisionCircle.radius) - (Math.abs(Math.cos(angleDown)) * perpLength);
							this.y        -= delta;

							this.collisionPoint =
							{
								path : this.level.layers[i].childrenPaths[j],
								position:
								{
									x: points[p].x + vProj.x,
									y: points[p].y + vProj.y
								},
								angle: segmentAngle
							}

							if(delta >= 1)
							{
								repeat = true;
							}
						}
					}
				} while(repeat);
			}
		}

		// When descending a slope, stick to it
		if(!this.isGrounded && wasGrounded && velocity.y > 0)
		{
			var slopeAngleMax   = 80;
			var slopeTollerance = 50;
			var slopeDistance   = slopeTollerance;

			for(var i = 0; i < this.level.layers.length; i++)
			{
				for(var j = 0; j < this.level.layers[i].childrenPaths.length; j++)
				{
					// Check if the path is relevant
					if(this.level.layers[i].childrenPaths[j].config.collisions == 0) continue;
					if(this.level.layers[i].childrenPaths[j].config.collisions == 2 && directionY < 0) continue;
					if(this.level.layers[i].childrenPaths[j].config.bounds[0] > this.x + this.collisionCircle.x + this.collisionCircle.radius * 2) continue;
					if(this.level.layers[i].childrenPaths[j].config.bounds[1] < this.x + this.collisionCircle.x - this.collisionCircle.radius * 2) continue;
					if(this.isShrinking && this.level.layers[i].childrenPaths[j].isShrinkPath()) continue;
					if(this.ignoreArtificialPaths && this.level.layers[i].childrenPaths[j].isArtificialPath()) continue;

					// Loop through the path segments
					var points = this.level.layers[i].childrenPaths[j].bezier.getDrawingPoints();

					for(var p = 0; p < points.length-1; p++)
					{
						// Segment points
						var p1 = points[p];
						var p2 = points[p+1];

						// Skip segments facing down
						if(p1.x > p2.x) continue;

						// Circle collider center
						var pAvatar = new PIXI.Point(this.x + this.collisionCircle.x, this.y + this.collisionCircle.y);

						// Is the segment close to the collider?
						if(p1.x > pAvatar.x + this.collisionCircle.radius) continue;
						if(p2.x < pAvatar.x - this.collisionCircle.radius) continue;
						if(p1.y < pAvatar.y - this.collisionCircle.radius && p2.y < pAvatar.y - this.collisionCircle.radius) continue;
						if(p1.y > pAvatar.y + this.collisionCircle.radius + 50 && p2.y > pAvatar.y + this.collisionCircle.radius + 50) continue;

						// Skip slopes that are too inclined
						var segmentAngle = Math.atan2((p2.y - p1.y), (p2.x - p1.x));
						if(Math.abs(segmentAngle * PIXI.RAD_TO_DEG) > slopeAngleMax) continue;

						// Segment of the bezier curve
						var segment = new PIXI.Point(points[p+1].x - points[p].x, points[p+1].y - points[p].y);
						var segmentNormalized = new PIXI.Point(segment.x, segment.y);
						segmentNormalized.normalize();

						// Avatar-segment vector
						var vAvatar = new PIXI.Point(this.x + this.collisionCircle.x - points[p].x, this.y + this.collisionCircle.y - points[p].y);

						// Calculate the projection of vAvatar onto the segment
						var vProjLength = vAvatar.dotProduct(segment) / segment.getLength();
						var vProj       = new PIXI.Point(segmentNormalized.x * vProjLength, segmentNormalized.y * vProjLength);

						// Clamp the projection vector
						if(vProj.x != segment.x)
						{
							if(vProj.x/segment.x < 0)
								vProj = new PIXI.Point(0,0);
							if(vProj.x/segment.x > 1)
								vProj = new PIXI.Point(segment.x, segment.y);
						}
						else
						{
							if(vProj.y/segment.y < 0)
								vProj = new PIXI.Point(0,0);
							if(vProj.y/segment.y > 1)
								vProj = new PIXI.Point(segment.x, segment.y);
						}

						// Calculate the perpendicular
						var perp  = new PIXI.Point(vProj.x - vAvatar.x, vProj.y - vAvatar.y);
						var perpLength = perp.getLength();

						if(this.level.debug)
						{
							this.wireframe.lineStyle(8, 0xffffff, 1);
							this.wireframe.moveTo(p1.x, p1.y);
							this.wireframe.lineTo(p2.x, p2.y);

							this.wireframe.lineStyle(6, 0x0000ff, 1);
							this.wireframe.moveTo(pAvatar.x, pAvatar.y);
							this.wireframe.lineTo(pAvatar.x - vAvatar.x, pAvatar.y - vAvatar.y);
						}

						// If the length of the perpendicular is less than the radius the segment collides with the circle
						if(perp.y > 0 && perpLength > this.collisionCircle.radius)
						{
							if(this.level.debug)
							{
								this.wireframe.lineStyle(3, 0xff00ff, 1);
								this.wireframe.moveTo(points[p].x, points[p].y);
								this.wireframe.lineTo(points[p].x + vProj.x, points[p].y + vProj.y);

								this.wireframe.lineStyle(5, 0xff6600, 1);
								this.wireframe.moveTo(points[p].x + vProj.x, points[p].y + vProj.y);
								this.wireframe.lineTo(points[p].x + vProj.x - perp.x, points[p].y + vProj.y - perp.y);
							}

							perp.normalize();
							var angleDown = perp.angle(new PIXI.Point(0,1));

							var cosLength = perpLength - this.collisionCircle.radius;
							var sinLength = (cosLength * Math.sin(angleDown)) / Math.cos(angleDown);
							var distance  = Math.sqrt(Math.pow(cosLength,2) + Math.pow(sinLength,2));

							if(distance < slopeDistance)
							{
								slopeDistance = distance;

								this.collisionPoint =
								{
									path : this.level.layers[i].childrenPaths[j],
									position:
									{
										x: points[p].x + vProj.x,
										y: points[p].y + vProj.y
									},
									angle: segmentAngle
								}
							}
						}
					}
				}
			}

			if(slopeDistance < slopeTollerance)
			{
				velocity.y = 0;
				this.y += slopeDistance;
				this.isGrounded = true;
			}
		}

		// Sprite angle
		if(this.isGrounded &&  (!((this.isSliding && this.timeUnsliding == 0)) || ((this.isOlaf() || this.isRidingVehicle) && this.isSliding)))
			this.angleTarget = this.collisionPoint.angle;
		else if(this.isTumbling)
			this.angleTarget = 0 + this.tumbleAngle;
		else
			this.angleTarget = 0;
	}
}


/**
 * TODO
 */
RunningEntity.prototype.checkCollision = function(c1, obj)
{
	if(obj.collisionRect != null)
	{
		var points = [];
		points.push(new PIXI.Point(obj.x + obj.collisionRect.x,                           obj.y + obj.collisionRect.y));
		points.push(new PIXI.Point(obj.x + obj.collisionRect.x + obj.collisionRect.width, obj.y + obj.collisionRect.y));
		points.push(new PIXI.Point(obj.x + obj.collisionRect.x + obj.collisionRect.width, obj.y + obj.collisionRect.y + obj.collisionRect.height));
		points.push(new PIXI.Point(obj.x + obj.collisionRect.x,                           obj.y + obj.collisionRect.y + obj.collisionRect.height));

		var pivot = new PIXI.Point(obj.x, obj.y);

		for(var  i = 0; i < points.length; i++)
		{
			points[i].rotateAround(pivot, obj.rotation);
		}


		// if(!!obj.test)
			// this.level.removeChild(obj.test)

		// obj.test = new PIXI.Graphics();
		// this.level.addChild(obj.test);
		// obj.test.lineStyle(2, 0x00ff00);

		// obj.test.moveTo(points[0].x, points[0].y);
		// obj.test.lineTo(points[1].x, points[1].y);
		// obj.test.lineTo(points[2].x, points[2].y);
		// obj.test.lineTo(points[3].x, points[3].y);
		// obj.test.lineTo(points[0].x, points[0].y);
		
		for(var i = 0; i < points.length; i++)
		{
			if(Math.sqrt(Math.pow(points[i].x - c1.x,2) + Math.pow(points[i].y - c1.y,2)) < c1.radius)
			{
				return true;
			}
		}

		for(var p = 0; p < points.length; p++)
		{
			var segment = new PIXI.Point(points[(p+1)%points.length].x - points[p].x, points[(p+1)%points.length].y - points[p].y);
			var segmentNormalized = new PIXI.Point(segment.x, segment.y);
			segmentNormalized.normalize();

			// Avatar-segment vector
			var vAvatar = new PIXI.Point(c1.x - points[p].x, c1.y - points[p].y);

			// Calculate the projection of vAvatar onto the segment
			var vProjLength = vAvatar.dotProduct(segment) / segment.getLength();
			var vProj       = new PIXI.Point(segmentNormalized.x * vProjLength, segmentNormalized.y * vProjLength);

			// Make sure the projection vector is within the segment
			if(vProj.x != segment.x)
			{
				if(vProj.x/segment.x < 0) continue;
				if(vProj.x/segment.x > 1) continue;
			}
			else
			{
				if(vProj.y/segment.y < 0) continue;
				if(vProj.y/segment.y > 1) continue;
			}

			// Calculate the perpendicular
			var perp  = new PIXI.Point(vProj.x - vAvatar.x, vProj.y - vAvatar.y);
			var perpLength = perp.getLength();

			if(perpLength < c1.radius)
			{
				// obj.test.lineStyle(1, 0x0000ff, 1);
				// obj.test.moveTo(c1.x, c1.y);
				// obj.test.lineTo(c1.x - vAvatar.x, c1.y - vAvatar.y);

				// obj.test.lineStyle(2, 0xff00ff, 1);
				// obj.test.moveTo(points[p].x, points[p].y);
				// obj.test.lineTo(points[p].x + vProj.x, points[p].y + vProj.y);

				// obj.test.lineStyle(3, 0xff6600, 1);
				// obj.test.moveTo(points[p].x + vProj.x, points[p].y + vProj.y);
				// obj.test.lineTo(points[p].x + vProj.x - perp.x, points[p].y + vProj.y - perp.y);

				return true;
			}
		}
	}
	else if(obj.collisionCircle != null)
	{
		var c2 = new PIXI.Circle(obj.x, obj.y, obj.collisionCircle.radius)

		// Circle-circle collision
		var diff = new PIXI.Point(c1.x - c2.x, c1.y - c2.y);
		return ((Math.pow(diff.x, 2) + Math.pow(diff.y, 2)) <= Math.pow(c1.radius + c2.radius, 2));
	}

	return false;
}
},{"../Common":2,"../general/Emitter":41,"../general/SoundSFX":44,"./GameObject":15}],39:[function(require,module,exports){
/**
 *  Shockwave
 *
 *  Created by Legman on 10/05/2016.
 *
 */

"use strict";

var Common = require("../Common");

/**
 * @param {!PIXI.DisplayObject} view
 * @param {!PIXI.Texture} texture
 * @constructor
 */
function Shockwave(view, texture)
{
	/**
	 * @type {PIXI.DisplayObject}
	 * @private
	 */
	this._view = view;

	/**
	 * @type {null}
	 * @private
	 */
	this._filter = null;

	PIXI.Sprite.call(this, texture);

	this.anchor = new PIXI.Point(0.5, 0.5);

	this._filter = new PIXI.filters.DisplacementFilter(this);

	if (this._view.filters) {
		this._view.filters.push(this._filter);
	} else {
		this._view.filters = [this._filter];
	}
}
module.exports		= Shockwave;
Shockwave.prototype	= Object.create(PIXI.Sprite.prototype);
Shockwave.prototype.constructor = Shockwave;

Shockwave.prototype.destroy = function()
{
	if (this._view.filters) {
		var index = this._view.filters.indexOf(this._filter);
		if (index != -1) {
			if (this._view.filters.length > 1) {
				this._view.filters.splice(index, 1);
			} else {
				this._view.filters = null;
			}
		}
	}

	this.parent.removeChild(this);
	PIXI.Sprite.prototype.destroy.call(this);
};

/**
 * @param {number=} duration
 */
Shockwave.prototype.animate = function(duration)
{
	duration = duration || 1.4;

	var tl = new TimelineMax({
		onComplete: this.destroy,
		onCompleteScope: this
	});

	this.scale.x = 0.01;
	this.scale.y = 0.01;
	tl.insert(TweenMax.to(this.scale, duration, {
		x: 5.0,
		y: 5.0,
		ease: Power1.easeOut
	}));

	tl.insert(TweenMax.to(this.filter.scale, duration * 0.3, {
		delay: duration - duration * 0.3,
		x: 0.1,
		y: 0.1,
		ease: Power1.easeInOut
	}));
};

Object.defineProperty(Shockwave.prototype, "view",
{
	/**
	 * @returns {DisplayObject}
	 */
	get: function() {
		return this._view;
	}
});

Object.defineProperty(Shockwave.prototype, "filter",
{
	/**
	 * @returns {PIXI.filters.DisplacementFilter}
	 */
	get: function() {
		return this._filter;
	}
});

},{"../Common":2}],40:[function(require,module,exports){
var Common              = require("../Common");
var SoundSFX            = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function CharacterSelectPanel(screen, data)
{
	this._screen         = screen;
	this._assetManager   = p3.AssetManager.instance;
	this._powerupData    = $.extend(true, this._assetManager.getJSON("config").powerups, this._assetManager.getJSON("strings").powerups);
	this._powerupKeys    = ["tumble_speed", "snow_magnet", "troll_magic"];
	this._data           = data;
	this._subPanelActive = false;
	this._subPanelPower  = 0;

	PIXI.Container.call(this);
    this.init();
}
module.exports = CharacterSelectPanel;
CharacterSelectPanel.prototype = Object.create(PIXI.Container.prototype);
CharacterSelectPanel.prototype.constructor = CharacterSelectPanel;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 * Initialization
 */
CharacterSelectPanel.prototype.init = function()
{
	// var character = new PIXI.Sprite(this._assetManager.getTexture("ui_char_" + this._data.id));
	// character.anchor.set(0.5, 1);
	// character.x = 200;
	// character.y = Common.STAGE_HEIGHT/2;
    // this.addChild(character);

	this.spine = new PIXI.spine.Spine(Common.characterAnimationData[this._data.id]);
	this.spine.skeleton.setToSetupPose();
	this.spine.skeleton.setSkin(null);
	this.spine.skeleton.setSkinByName("default");
	this.spine.x = 200;
	this.spine.y = Common.STAGE_HEIGHT/2;
	this.spine.autoUpdate = true;
	this.spine.scale.set(0.5);
	this.spine.state.setAnimationByName(0, "look_left", true, 0);
	this.addChild(this.spine);
	
		this.upgradePS = new cloudkid.Emitter(this,
		[
			this._assetManager.getTexture("particle_snowflake_00"),
			this._assetManager.getTexture("particle_snowflake_01"),
			this._assetManager.getTexture("particle_snowflake_02"),
			this._assetManager.getTexture("particle_snowflake_03")
		], this._assetManager.getJSON("particle_char_upgrade"));

		this.upgradePS.updateSpawnPos(this.spine.x, this.spine.y -200);
		this.upgradePS.emit = false;


	// Upgrade subpanel
	var upgrade_panel = new PIXI.Sprite(this._assetManager.getTexture("ui_upgrade_panel"));
	upgrade_panel.x = -350;
	upgrade_panel.y = -110;
    this.addChild(upgrade_panel);

		this._upgrade_info = new PIXI.Sprite(this._assetManager.getTexture("ui_upgrade_info_2"));
		this._upgrade_info.xStart = 50;
		this._upgrade_info.xEnd   = 370;
		this._upgrade_info.x      = this._upgrade_info.xStart;
		this._upgrade_info.y      = 40;
		this._upgrade_info.alpha  = 0;
		upgrade_panel.addChild(this._upgrade_info);

			// Close button
			var buyClose = new p3.Button
			(
				this._assetManager.getTexture("ui_btn_upgrade_close_out"),
				this._assetManager.getTexture("ui_btn_upgrade_close_over"),
				this._assetManager.getTexture("ui_btn_upgrade_close_down")
			);
			buyClose.position.set(280, 40);
			buyClose.signals.down.add(this.onUpgradeCloseClicked, this);
			buyClose.overSoundName = "sfx_btn_rollover_00";
			this._upgrade_info.addChild(buyClose);

			// Power icon
			this._buyIcon = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_upgrade_tumble"));
			this._buyIcon.anchor.set(0.5);
			this._buyIcon.position.set(168, 70);
			this._upgrade_info.addChild(this._buyIcon);

			// Power-up text
			if(!webfont)
			{
				this._buyDescription = new PIXI.extras.BitmapText("Description", {font: "30px Mikadan White", align: "center", tint: 0x6d38ab});
				this._buyDescription.x = -this._buyDescription.textWidth/2  + 168;
				this._buyDescription.y = -this._buyDescription.textHeight/2 + 175;
				this._upgrade_info.addChild(this._buyDescription);
			}
			else
			{
				this._buyDescription = new PIXI.Text("Description", {font:"30px Arial", fill:0x6d38ab, align:'center'});
				this._buyDescription.position.set(168, 175);
				this._buyDescription.anchor.set(0.5);
				this._upgrade_info.addChild(this._buyDescription);
			}

			// Buy button
			this._buyButton = new p3.Button
			(
				this._assetManager.getTexture("ui_btn_buy_out"),
				this._assetManager.getTexture("ui_btn_buy_over"),
				this._assetManager.getTexture("ui_btn_buy_down")
			);
			this._buyButton.position.set(175, 290);
			this._buyButton.scale.set(0);
			this._buyButton.signals.down.add(this.onBuyClick, this);
			this._buyButton.overSoundName = "sfx_btn_rollover_00";
			this._upgrade_info.addChild(this._buyButton);

				var snowflake = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_snowflake"));
				snowflake.anchor.set(0.5);
				snowflake.position.set(-92, 0);
				this._buyButton.addChild(snowflake);

				if(!webfont)
				{
					this._buyButton._price = new PIXI.extras.BitmapText("0", {font: "40px Superclarendon Numbers", align: "center"});
					this._buyButton._price.x = -this._buyButton._price.textWidth/2 + 5;
					this._buyButton._price.y = -this._buyButton._price.textHeight/2;
					this._buyButton.addChild(this._buyButton._price);
				}
				else
				{
					this._buyButton._price = new PIXI.Text("?", {font:"36px Arial", fill:0xffffff, align:'center'});
					this._buyButton._price.position.set(5, 0);
					this._buyButton._price.anchor.set(0.5);
					this._buyButton.addChild(this._buyButton._price);
				}

			// Disabled buy button without rollover or events
			this._buyDisabledButton = new p3.Button
			(
				this._assetManager.getTexture("ui_btn_buy_out_inactive")
			);
			this._buyDisabledButton.position = this._buyButton.position;
			this._buyDisabledButton.scale.set(0);
			this._buyDisabledButton.signals.down.add(this.onBuyDisabledClick, this);
			this._upgrade_info.addChild(this._buyDisabledButton);

				var snowflake = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_snowflake"));
				snowflake.anchor.set(0.5);
				snowflake.position.set(-92, 0);
				snowflake.filters = [new PIXI.filters.GrayFilter()];
				this._buyDisabledButton.addChild(snowflake);

				if(!webfont)
				{
					this._buyDisabledButton._price = new PIXI.extras.BitmapText("0", {font: "40px Superclarendon Numbers", align: "center"});
					this._buyDisabledButton._price.x = -this._buyDisabledButton._price.textWidth/2 + 5;
					this._buyDisabledButton._price.y = -this._buyDisabledButton._price.textHeight/2;
					this._buyDisabledButton.addChild(this._buyDisabledButton._price);

					var colorMatrix = new PIXI.filters.ColorMatrixFilter();
					colorMatrix.desaturate();
					this._buyDisabledButton._price.filters = [colorMatrix];
				}
				else
				{
					this._buyDisabledButton._price = new PIXI.Text("?", {font:"36px Arial", fill:0xffffff, align:'center'});
					this._buyDisabledButton._price.position.set(5, 0);
					this._buyDisabledButton._price.anchor.set(0.5);
					this._buyDisabledButton.addChild(this._buyDisabledButton._price);
				}

		// Panel
		var panel_bg = new PIXI.Sprite(this._assetManager.getTexture("ui_upgrade_info_1"));
		upgrade_panel.addChild(panel_bg);

		// Powers
		for(var i = 0; i < 3; i++)
		{
			if(!webfont)
			{
				var text = new PIXI.extras.BitmapText(this._powerupData[this._powerupKeys[i]].text[Common.COUNTRY_CODE], {font: "24px Mikadan White", align: "left", tint: 0x6d38ab});
				text.x = 120;
				text.y = -text.textHeight/2 + 58 + 100 * i;
				upgrade_panel.addChild(text);
			}
			else
			{
				var text = new PIXI.Text(this._powerupData[this._powerupKeys[i]].text[Common.COUNTRY_CODE], {font:"24px Arial", fill:0x6d38ab, align:'left'});
				text.anchor.set(r2l ? 1 : 0, 0.5);
				text.position.set(r2l ? 370 : 120, 58 + 100 * i);
				upgrade_panel.addChild(text);
			}
		}

		this._gems = [];
		this._gemsButton = [];

		for(var p = 0; p < 3; p++)
		{
			this._gems[p] = [];

			for(var i = 0; i < 3; i++)
			{
				var gem = new PIXI.Sprite(this._assetManager.getTexture("ui_upgrade_gem"));
				gem.anchor.set(0.5);
				gem.x = 170 + 83 * i;
				gem.y = 102 + 99 * p;
				upgrade_panel.addChild(gem);

				if(Common.savedData.charactersPower[this._data.id][p] <= i)
					gem.visible = false;

				this._gems[p].push(gem);
			}

			if(Common.savedData.charactersPower[this._data.id][p] < 3)
			{
				var plus = new p3.Button
				(
					this._assetManager.getTexture("ui_btn_upgrade_out"),
					this._assetManager.getTexture("ui_btn_upgrade_over"),
					this._assetManager.getTexture("ui_btn_upgrade_down")
				);
				plus.x = 170 + 84  * Common.savedData.charactersPower[this._data.id][p];
				plus.y = 102 + 100 * p;
				plus.id = p;
				plus.signals.down.add(this.onPlusClicked, this);
				plus.overSoundName = "sfx_btn_rollover_00";
				upgrade_panel.addChild(plus);

				this._gemsButton[p] = plus;
				
				// Plus pulse animation
				var cost = this._powerupData[p].cost[Common.savedData.charactersPower[this._data.id][p]];
				if(cost <= Common.savedData.coins)
				{
					plus.timeline =  new TimelineMax();
					plus.timeline.to(plus.scale, 0.5, {x:1.15, y:1.15, ease:Sine.easeInOut, yoyo:true, repeat:-1});
					Common.animator.add(plus.timeline);
				}
				else
				{
					var colorMatrix = new PIXI.filters.ColorMatrixFilter();
					colorMatrix.desaturate();
					plus.filters = [colorMatrix];
				}
			}
		}

	// Current level
	var level_bg = new PIXI.Sprite(this._assetManager.getTexture(this._data.id == "pabbie" ? "ui_level_bg_troll" : "ui_level_bg"));
	level_bg.position.set(upgrade_panel.x, -220);

	if(!Common.savedData.endless) this.addChild(level_bg);

		var copy = this._assetManager.getJSON("strings")["LEVEL"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var text = new PIXI.extras.BitmapText(copy.replace("{value}", (Common.savedData.level+1)), {font: "26px Superclarendon Level", align: "center"});
			text.x = -text.textWidth/2  + level_bg.width/2 - 40;
			text.y = -text.textHeight/2 + 55;
			level_bg.addChild(text);
		}
		else
		{
			var text = new PIXI.Text("Level " + (Common.savedData.level+1), {font:"24px Arial", fill:0x000000, align:'center'});
			text.x = level_bg.width/2 - 50;
			text.y = 57;
			text.anchor.set(0.5);
			level_bg.addChild(text);
		}

		if(this._data.id == "pabbie")
		{
			var trollCollected = Common.savedData.getLevelCollectedTrollCount(Common.savedData.level);
			var trollCount     = 3;

			if(!webfont)
			{
				var text = new PIXI.extras.BitmapText(trollCollected + "/" + trollCount, {font: "32px Superclarendon Level", align: "center"});
				text.x = -text.textWidth/2  + 340;
				text.y = -text.textHeight/2 + 50;
				level_bg.addChild(text);
			}
			else
			{
				var text = new PIXI.Text(trollCollected + "/" + trollCount, {font:"32px Arial", fill:0xffffff, align:'center'});
				text.anchor.set(0.5);
				text.x += 340;
				text.y += 57;
				level_bg.addChild(text);
			}
		}
		else
		{
			// Character crystals for the level
			if(!!Common.savedData.crystals[Common.savedData.level][this._data.id])
			{
				for(var i = 0; i < 3; i++)
				{
					if(!Common.savedData.crystals[Common.savedData.level][this._data.id][i]) continue;

					var crystal = new PIXI.Sprite(this._assetManager.getTexture("ui_level_crystal_" + this._data.color + "_" + (i+1)));
					level_bg.addChild(crystal);
				}
			}
		}
};

/**
 * Function called when a plus button is clicked, will open the subpanel
 * @param {Number} plus - the index of the power (0,1,2)
 */
CharacterSelectPanel.prototype.onPlusClicked = function(plus)
{
	// Skip if the panel for that power is already open
	if(this._subPanelActive && this._subPanelPower == plus.id) return;

	this._subPanelPower  = plus.id;

	if(!!this._subPanelTimeline)
		this._subPanelTimeline.kill();

	this._subPanelTimeline = new TimelineMax();

		// Hide previous panel if open
		if(this._subPanelActive)
		{
			this._subPanelTimeline.to(this._buyButton.scale,         .15, {x:0, y:0, ease:Sine.easeIn});
			this._subPanelTimeline.to(this._buyDisabledButton.scale, .15, {x:0, y:0, ease:Sine.easeIn});
			this._subPanelTimeline.to(this._upgrade_info,            .30, {x:this._upgrade_info.xStart, alpha:0, ease:Sine.easeInOut},0.05);
		}

		// Show the new one
		this._subPanelActive = true;
		var cost = this._powerupData[this._subPanelPower].cost[Common.savedData.charactersPower[this._data.id][this._subPanelPower]];

		this._subPanelTimeline.to(this._upgrade_info, .40, {x:this._upgrade_info.xEnd, alpha:1, ease:Sine.easeInOut, onStartScope:this, onStart:function()
		{
			this._buyIcon.texture = this._assetManager.getTexture(this._powerupData[this._subPanelPower].texture);

			if(!webfont)
			{
				this._buyDescription.x += this._buyDescription.textWidth/2;
				this._buyDescription.y += this._buyDescription.textHeight/2;
				this._buyDescription.text = this._powerupData[this._powerupKeys[this._subPanelPower]].description[Common.COUNTRY_CODE];
				this._buyDescription.validate();
				this._buyDescription.x -= this._buyDescription.textWidth/2;
				this._buyDescription.y -= this._buyDescription.textHeight/2;

				this._buyButton._price.x += this._buyButton._price.textWidth/2;
				this._buyButton._price.text = cost;
				this._buyButton._price.validate();
				this._buyButton._price.x -= this._buyButton._price.textWidth/2;

				this._buyDisabledButton._price.x += this._buyDisabledButton._price.textWidth/2;
				this._buyDisabledButton._price.text = cost;
				this._buyDisabledButton._price.validate();
				this._buyDisabledButton._price.x -= this._buyDisabledButton._price.textWidth/2;

				this._buyDisabledButton._price.x += this._buyButton._price.textWidth/2;
				this._buyDisabledButton._price.text = cost;
				this._buyDisabledButton._price.validate();
				this._buyDisabledButton._price.x -= this._buyButton._price.textWidth/2;
			}
			else
			{
				this._buyDescription.text = this._powerupData[this._powerupKeys[this._subPanelPower]].description[Common.COUNTRY_CODE];
				this._buyButton._price.text = cost;
				this._buyDisabledButton._price.text = cost;
			}
		}});

		if(Common.savedData.coins >= cost)
		{
			this._subPanelTimeline.to(this._buyButton.scale, .25, {x:1, y:1, ease:Back.easeOut});
			this._subPanelTimeline.to(this._buyButton.scale, 1, {x:0.93, y:0.93, ease:Sine.easeInOut, yoyo:true, repeat:-1});
		}
		else
		{
			this._subPanelTimeline.to(this._buyDisabledButton.scale, .25, {x:1, y:1, ease:Back.easeOut});
		}

	Common.animator.add(this._subPanelTimeline);

	SoundSFX.play("sfx_btn_press_00");
}


/**
 * Function called when the close button of the subpanel is clicked
 */
CharacterSelectPanel.prototype.onUpgradeCloseClicked = function()
{
	this.closeSubPanel();

	SoundSFX.play("sfx_btn_press_00");
}

/**
 * Closes the subpanel, if it was active
 */
CharacterSelectPanel.prototype.closeSubPanel = function(onCompleteScope, onComplete)
{
	if(!this._subPanelActive) return;

	if(!!this._subPanelTimeline)
		this._subPanelTimeline.kill();

	this._subPanelTimeline = new TimelineMax({onCompleteScope:onCompleteScope, onComplete:onComplete});
	this._subPanelTimeline.to(this._buyButton.scale,         .15, {x:0, y:0, ease:Sine.easeIn});
	this._subPanelTimeline.to(this._buyDisabledButton.scale, .15, {x:0, y:0, ease:Sine.easeIn});
	this._subPanelTimeline.to(this._upgrade_info,            .30, {x:this._upgrade_info.xStart, alpha:0, ease:Sine.easeInOut},0.05);
	Common.animator.add(this._subPanelTimeline);

	this._subPanelActive = false;

	SoundSFX.play("sfx_btn_press_00");
}


/**
 * Show the confirmation screen when the buy panel is pressed
 */
CharacterSelectPanel.prototype.onBuyClick = function()
{
	var cost = this._powerupData[this._subPanelPower].cost[Common.savedData.charactersPower[this._data.id][this._subPanelPower]];
	this._screen.signals.buyPressed.dispatch(this, cost);

	SoundSFX.play("sfx_btn_press_00");
}

/**
 * Show that the coins are insufficient
 */
CharacterSelectPanel.prototype.onBuyDisabledClick = function()
{
	// Make the snowflake in the coins container shake
	var tl = new TimelineMax();
	tl.to(this.parent.parent._coinsContainer._snowflake, .1, {rotation:PIXI.DEG_TO_RAD * 18, ease:Sine.easeOut},0);
	tl.to(this.parent.parent._coinsContainer._snowflake, .1, {rotation:PIXI.DEG_TO_RAD * -12, ease:Sine.easeOut});
	tl.to(this.parent.parent._coinsContainer._snowflake, .1, {rotation:PIXI.DEG_TO_RAD * 6, ease:Sine.easeOut});
	tl.to(this.parent.parent._coinsContainer._snowflake, .1, {rotation:PIXI.DEG_TO_RAD * 0, ease:Sine.easeOut});
	Common.animator.add(tl);

	SoundSFX.play("sfx_elsa_ice_magic_platform_fail_00");
}

/**
 * Buy the powerup and close the subpanel when the purchase is confirmed
 */
CharacterSelectPanel.prototype.buy = function()
{
	var cost = this._powerupData[this._subPanelPower].cost[Common.savedData.charactersPower[this._data.id][this._subPanelPower]];
	Common.savedData.coins -= cost;
	Common.savedData.charactersPower[this._data.id][this._subPanelPower]++;
	Common.savedData.save();

	// Update the status of the plus buttons of ALL the panels
	for(var c = 0; c < this.parent.parent._characterPanels.length; c++)
	{
		var panel = this.parent.parent._characterPanels[c];
		
		for(var i = 0; i < Common.savedData.charactersPower[panel._data.id].length; i++)
		{
			if(Common.savedData.charactersPower[panel._data.id][i] >= 3)
			{
				panel._gemsButton[i].visible = false;
				
				// Stop animating the plus
				if(!!panel._gemsButton[i].timeline)
					panel._gemsButton[i].timeline.kill();
			}
			else
			{
				if(panel == this && i == panel._subPanelPower)
				{
					panel._gemsButton[i].x += 84;
				}
				
				// Stop animating the plus if insufficient coins
				var cost = panel._powerupData[i].cost[Common.savedData.charactersPower[panel._data.id][i]];
				if(cost > Common.savedData.coins)
				{
					// Stop animating the plus
					if(!!panel._gemsButton[i].timeline)
						panel._gemsButton[i].timeline.kill();
					
					var colorMatrix = new PIXI.filters.ColorMatrixFilter();
					colorMatrix.desaturate();
					panel._gemsButton[i].filters = [colorMatrix];				
				}
			}	
		}
	}
	
	
	// Show the gem
	this._gems[this._subPanelPower][Common.savedData.charactersPower[this._data.id][this._subPanelPower]-1].visible = true;

	// Update coin value
	this.parent.parent._coinsContainer._text.text = Common.savedData.coins;

	// Event Tracking
	Common.ctow.trackEvent(
	{
		event      : "game_action",
		game_tier1 : "shop",
		game_tier2 : "character_screen",
		game_meta  : "{" +
						 "CharacterName="  + Common.savedData.character + "," +
						 "tumble="          + Common.savedData.charactersPower[Common.savedData.character][0] + "," +
						 "magnet="          + Common.savedData.charactersPower[Common.savedData.character][1] + "," +
						 "magic="           + Common.savedData.charactersPower[Common.savedData.character][2] + "," +
						 "remaining_coins=" + Common.savedData.coins +
					 "}"
	});

	// Close the subpanel
	this.closeSubPanel
	(
		this,
		function()
		{
			this.upgradePS.emit = true;
			SoundSFX.play("sfx_ui_buy_upgrade_02");
		}
	);
}
},{"../Common":2,"../general/SoundSFX":44}],41:[function(require,module,exports){

var Common          = require("../Common");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function Emitter() {
}
module.exports = Emitter;

//===================================================
// PUBLIC METHODS
//===================================================


/**
 * @param {!PIXI.Container} parent
 * @param {!Array<String>} textures
 * @param {!String} json
 * @param {Number=} x
 * @param {Number=} y
 * @param {Number=} removeTime
 * @param {Boolean=} autoEmit
 * @returns {cloudkid.Emitter} emitter
 */
Emitter.add = function(parent, textures, json, x, y, removeTime, autoEmit, destroyTime)
{
    if(autoEmit == undefined) autoEmit = true;
    if(destroyTime == undefined) destroyTime = 1;

    x = x || 0;
    y = y || 0;

    var assetManager = p3.AssetManager.instance;

    for(var i = 0; i < textures.length; i++)
    {
        textures[i] = assetManager.getTexture(textures[i]);
    }    

    var emitter = new cloudkid.Emitter(
        parent,
        textures,
        assetManager.getJSON(json)
    );
    if(autoEmit)
        emitter.emit = true;
    else
        emitter.emit = false;

    emitter.updateOwnerPos(x, y);

    Common.animator.add(emitter);

    if(removeTime != null)
    {    
        Common.animator.setTimeout(function(){
            Emitter.destroy(emitter, destroyTime);
        }, removeTime, this);
    }

    return emitter;
};

Emitter.destroy = function(emitter, destroyDelay)
{
    if(emitter != null)
    {    
        destroyDelay = destroyDelay || 0;

        emitter.emit = false;
        Common.animator.setTimeout(function(){
            Common.animator.remove(emitter);
            emitter.destroy();
        }, destroyDelay, this);
    }
}




//===================================================
// PRIVATE METHODS
//===================================================

//===================================================
// EVENTS
//===================================================

//===================================================
// GETTERS/SETTERS
//===================================================

//===================================================
},{"../Common":2}],42:[function(require,module,exports){
var Common          = require("../Common");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function LevelSelectButton(level, active)
{
	this._assetManager = p3.AssetManager.instance;

	this._id = level;

	this.signals          = {};
	this.signals.clicked  = new signals.Signal();
	this.signals.down     = new signals.Signal();
	this.signals.up       = new signals.Signal();

	this.active           = active;

	PIXI.Container.call(this);

    this.init();
}
module.exports = LevelSelectButton;
LevelSelectButton.prototype = Object.create(PIXI.Container.prototype);
LevelSelectButton.prototype.constructor = LevelSelectButton;


//===================================================
// PUBLIC METHODS
//===================================================

LevelSelectButton.prototype.init = function()
{
	if(this.active)
	{
		// Bg
		var crystals_bg = new PIXI.Sprite(this._assetManager.getTexture("ui_map_crystals_bg"));
		crystals_bg.anchor = new PIXI.Point(0.5, 0);
		crystals_bg.y = 38;
		this.addChild(crystals_bg);

		// Crystals
		var characters = ["anna", "kristoff", "olaf", "elsa"]
		var textures   = ["ui_map_crystals_pink", "ui_map_crystals_green", "ui_map_crystals_cyan", "ui_map_crystals_purple"]

		for(var i = 0; i < characters.length; i++)
		{
			if(Common.savedData.getLevelCharacterCrystalCount(this._id, characters[i]) < 3) continue;

			var crystal = new PIXI.Sprite(this._assetManager.getTexture(textures[i]));
			crystal.anchor = new PIXI.Point(0.5, 0);
			crystals_bg.addChild(crystal);
		}

		// Button
		this._button = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_map_out"),
			this._assetManager.getTexture("ui_btn_map_over"),
			this._assetManager.getTexture("ui_btn_map_down"),
			this._assetManager.getTexture("ui_icon_map_play")
		);
		this._button.signals.down.add(this.onClick, this);
		this._button.overSoundName = "sfx_btn_rollover_00";
		this.addChild(this._button);

		// Level number
		// var text = new PIXI.Text(this._id+1, {font:"24px Arial", fill:0x000000, align:'center'});
		// text.anchor = new PIXI.Point(0.5, 0.5);
		var text = new PIXI.extras.BitmapText("" + (this._id+1), {font: "28px Superclarendon Title Purple", align: "center"});
		text.x = - text.textWidth/2 - 2;
		text.y = - 96;
		this.addChild(text);

		if(Common.savedData.endGameMessage.crystals.shown)
		{
			var trollsCounter = new PIXI.Sprite(this._assetManager.getTexture("ui_map_trolls_bg"));
			trollsCounter.anchor = new PIXI.Point(0.5, 0.5);
			trollsCounter.y = 57;
			this.addChild(trollsCounter);

			var trollsText = new PIXI.extras.BitmapText(Common.savedData.getLevelCollectedTrollCount(this._id) + "/3", {font: "20px Superclarendon Level", align: "left"});
			trollsText.x = 0;
			trollsText.y = -19;
			trollsCounter.addChild(trollsText);
		}
	}
	else
	{
		this._button = new p3.MuteButton
		(
			this._assetManager.getTexture("ui_btn_map_out_inactive"),
			this._assetManager.getTexture("ui_btn_map_out_inactive"),
			this._assetManager.getTexture("ui_btn_map_out_inactive"),
			this._assetManager.getTexture("ui_icon_map_lock")
		);
		this._button.interactive = false;
		this.addChild(this._button);
	}
};

LevelSelectButton.prototype.disable = function()
{
	this._button.alpha = 0.5;
	this.disabled = true;
};

//===================================================
// PRIVATE METHODS
//===================================================


//===================================================
// EVENTS
//===================================================

LevelSelectButton.prototype.onClick = function()
{
	this.signals.clicked.dispatch(this);
};


//===================================================
// GETTERS/SETTERS
//===================================================



//===================================================
},{"../Common":2}],43:[function(require,module,exports){
var Common          = require("../Common");
var SoundSFX        = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function NextButton(buttonString, delay)
{
	/**
     * @type {p3.AssetManager}
     */
    this._assetManager = p3.AssetManager.instance;

	/**
     * @type {signals.Signal}
     */
    this.signals = {};
	this.signals.clicked = new signals.Signal();
	this.signals.clickFinish = new signals.Signal();

	/**
     * @type {PIXI.Sprite}
     */
    this._banner = null;

    /**
     * @type {p3.BitmapText}
     */
    this._button = null;

    /**
     * @type {String}
     */
    this._buttonString = buttonString || "next";

    /**
     * @type {Number}
     */
    this._delay = delay || 0;

	PIXI.Container.call(this);
}
module.exports = NextButton;
NextButton.prototype = Object.create(PIXI.Container.prototype);
NextButton.prototype.constructor = NextButton;


//===================================================
// PUBLIC METHODS
//===================================================


/**
 */
NextButton.prototype.init = function()
{
	Common.animator.setTimeout(function(){

		this._banner = new PIXI.Sprite(this._assetManager.getTexture("ui"));
		this._banner.anchor = new PIXI.Point(0.5, 0.5);
		// this._banner.scale.x = 0;
		this.addChild(this._banner);

		this._button = new p3.Button(
			this._assetManager.getTexture("but_big_def"),
			this._assetManager.getTexture("but_big_over"),
			this._assetManager.getTexture("but_big_press"),
			this._assetManager.getTexture(this._buttonString));
		
		// this._button.scale = new PIXI.Point(0, 0);
        this._button.signals.down.addOnce(this.onButtonClick, this);
		this._button.signals.over.add(this.onButtonOver, this);
		this._button.animate = false;
		this.addChild(this._button);

		// var tl = new TimelineMax();
		// tl.to(this._banner.scale, 1, {x:1, ease:Back.easeOut});
		// tl.to(this._button.scale, 1.3, {x:1, ease:Elastic.easeOut}, 0);
		// tl.to(this._button.scale, 1.3, {y:1, ease:Elastic.easeOut}, 0.1);
		// Common.animator.add(tl);

	}, this._delay, this);
};



//===================================================
// PRIVATE METHODS
//===================================================


//===================================================
// EVENTS
//===================================================

/**
 */
NextButton.prototype.onButtonClick = function()
{
/*     TweenMax.killTweensOf(this._button.scale);
    Common.animator.add(TweenMax.to(this._button.scale, .2, {x:0.6, y:0.6, ease:Sine.easeInOut, onComplete:function(){
        Common.animator.add(TweenMax.to(this._button.scale, 1, {x:1, y:1, ease:Elastic.easeOut, onComplete:function(){
        	this.signals.clickFinish.dispatch();
        }, onCompleteScope:this}));
    }, onCompleteScope:this})); */

    // SoundSFX.play("sfx_button_play");
	this.signals.clicked.dispatch();
}

NextButton.prototype.onButtonOver = function()
{
    // SoundSFX.play("sfx_btn_rollover_00");
}


//===================================================
// GETTERS/SETTERS
//===================================================


//===================================================




},{"../Common":2,"../general/SoundSFX":44}],44:[function(require,module,exports){
/**
 *  SoundSFX
 *
 *  Created by Legman on 11/06/2015.
 *
 */

var Common          = require("../Common");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function SoundSFX() {
}
module.exports = SoundSFX;

//===================================================
// PUBLIC METHODS
//===================================================

/**
 * @param {!p3.Button} button
 * @param {Boolean=} enableClickSound
 * @param {Boolean=} enableOverSound
 */
SoundSFX.button = function(button, enableClickSound, enableOverSound) {
    enableClickSound = enableClickSound == undefined ? true : enableClickSound;
    enableOverSound = enableOverSound == undefined ? true : enableOverSound;

    if(enableClickSound)
    {    
        button.signals.click.add(function(button) {
            p3.AudioManager.instance.playSound("sfx_btn_press_reverb");
        }, this);
    }

    if(enableOverSound)
    {    
        button.signals.over.add(function(button) {
            p3.AudioManager.instance.playSound("sfx_btn_rollover_reverb");
        }, this);
    }
};

/**
 * @param {!String} sound
 * @param {Object=} params
 * @param {Number=} delay
 */
SoundSFX.play = function(sound, params, delay) {

    if(delay == null)
    {    
        return p3.AudioManager.instance.playSound(sound, params);
    }
    else
    {    
        setTimeout(function(){
            p3.AudioManager.instance.playSound(sound, params);
        }, delay);
    }
};

SoundSFX.playMusic = function(sound, params, delay) {

    if(delay == null)
    {    
        p3.AudioManager.instance.playMusic(sound, params);
    }
    else
    {    
        setTimeout(function(){
            p3.AudioManager.instance.playMusic(sound, params);
        }, delay);
    }
};

/**
 * @param {!String} sound
 */
SoundSFX.stop = function(sound) {
    var currentSounds = p3.AudioManager.instance.soundsSFX;
    for(var i = 0; i < currentSounds.length; i++)
    {
        if(currentSounds[i].name == sound)
        {
           p3.AudioManager.instance.stopSound(sound);
        }   
    }
};

/**
 * @param {!Array <String>} sounds
 */
SoundSFX.playRandomFrom = function(sounds) {
	p3.AudioManager.instance.playSound(sounds[Math.floor(Math.random()*sounds.length)]);
};




//===================================================
// PRIVATE METHODS
//===================================================

//===================================================
// EVENTS
//===================================================

//===================================================
// GETTERS/SETTERS
//===================================================

//===================================================


},{"../Common":2}],45:[function(require,module,exports){
var Common          = require("../Common");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function WireframeButton(text)
{
	this._text				= text;

	this._button			= null;

	this.signals 			= {};
	this.signals.clicked 	= new signals.Signal();
	this.signals.down 		= new signals.Signal();
	this.signals.up	 		= new signals.Signal();

	this.disabled			= false;

	this.texture 			= null;

	PIXI.Container.call(this);

    this.init();
}
module.exports = WireframeButton;
WireframeButton.prototype = Object.create(PIXI.Container.prototype);
WireframeButton.prototype.constructor = WireframeButton;


//===================================================
// PUBLIC METHODS
//===================================================

WireframeButton.prototype.init = function()
{
	var container = new PIXI.Container();
	var graphic = new PIXI.Graphics();
	graphic.beginFill(0xFFFFFF);
	graphic.drawRect(0, 0, 200, 100);
	container.addChild(graphic);
	var text = new PIXI.Text(this._text, {font:'30px Tahoma', fill:0x000000, align:'center'});
	text.x = 100 - (text.width/2);
	text.y = 30;
	container.addChild(text);
	var texture = container.generateTexture(Common.renderer, 1.0, PIXI.SCALE_MODES.LINEAR);

	this.texture = texture;

	this._button = new p3.Button(texture, texture, texture);
	this._button.animate = false;
	this._button.signals.click.add(this.buttonClicked, this);
	this._button.signals.down.add(this.buttonDown, this);
	this._button.signals.up.add(this.buttonUp, this);
	this.addChild(this._button);
};

WireframeButton.prototype.disable = function()
{
	this._button.alpha = 0.5;
	this.disabled = true;
};



//===================================================
// PRIVATE METHODS
//===================================================



//===================================================
// EVENTS
//===================================================

WireframeButton.prototype.buttonClicked = function()
{
	this.signals.clicked.dispatch(this);
};

WireframeButton.prototype.buttonDown = function()
{
	this.signals.down.dispatch(this);
	console.log('down');
};

WireframeButton.prototype.buttonUp = function()
{
	this.signals.up.dispatch(this);
	console.log('up');
};

//===================================================
// GETTERS/SETTERS
//===================================================



//===================================================








},{"../Common":2}],46:[function(require,module,exports){
/**
 * @param {!PIXI.Texture} texture
 * @param {Number=} scale
 * @param {PIXI.Point=} ratio
 * @constructor
 */
function CutoutShader(texture, scale, ratio) {
    scale   = scale || 0.5;
    ratio   = ratio || new PIXI.Point(1.0, 1.0);

    PIXI.AbstractFilter.call(
        this,
        null,
        "precision highp float;" +

        "varying vec2 vTextureCoord;" +
        "varying vec4 vColor;" +

        "uniform sampler2D uCutoutMap;" +
        "uniform float uScale;" +
        "uniform vec2 uRatio;" +

        "void main(void) {" +
            "vec2 textureCoord  = (((vTextureCoord - vec2(0.5, 0.5)) * uRatio) * uScale) + vec2(0.5, 0.5);" +
            "vec4 mask          = texture2D(uCutoutMap, textureCoord);" +
            "float alpha        = 1.0 - mask.a;" +
            "gl_FragColor       = vec4(vColor.r * alpha, vColor.g * alpha, vColor.b * alpha, vColor.a * alpha);" +
        "}",
        {
            uCutoutMap:     {type: "sampler2D",     value: texture},
            uScale:         {type: "f",             value: 1.0 / Math.max(0.001, scale)},
            uRatio:         {type: "v2",            value: {x: ratio.x, y: ratio.y}}
        }
    );

    texture.baseTexture.isPowerOfTwo = false;
}
module.exports                          = CutoutShader;
CutoutShader.prototype                  = Object.create(PIXI.AbstractFilter.prototype);
CutoutShader.prototype.constructor      = CutoutShader;

Object.defineProperty(CutoutShader.prototype, "scale", {
    /**
     * @returns {Number}
     */
    get: function() {
        return 1.0 / this.uniforms.uScale.value;
    },
    /**
     * @param {!Number} value
     */
    set: function(value) {
        this.uniforms.uScale.value = 1.0 / Math.max(0.001, value);
    }
});

Object.defineProperty(CutoutShader.prototype, "ratio", {
    /**
     * @returns {PIXI.Point}
     */
    get: function() {
        return new PIXI.Point(this.uniforms.uRatio.value.x, this.uniforms.uRatio.value.y);
    },
    /**
     * @param {!PIXI.Point} value
     */
    set: function(value) {
        this.uniforms.uRatio.value.x = value.x;
        this.uniforms.uRatio.value.y = value.y;
    }
});
},{}],47:[function(require,module,exports){
var CutoutShader    = require("./CutoutShader");
var FadeTransition  = require("./FadeTransition");
var Transition      = require("./Transition");

/**
 * @param {!PIXI.Texture} texture
 * @param {!Number} color
 * @param {!Number} duration
 * @constructor
 */
function CutoutTransition(texture, color, duration) {
    /**
     * @type {Number}
     */
    this.startScale = 3;

    /**
     * @type {Number}
     */
    this.endScale = 0.0;

    /**
     * @type {PIXI.Texture}
     * @private
     */
    this._texture = texture;

    /**
     * @type {Number}
     * @private
     */
    this._color = 0xDDF7FD;

    /**
     * @type {Number}
     * @private
     */
    this._duration = duration || 1.2;

    /**
     * @type {PIXI.Sprite}
     * @private
     */
    this._cutout = null;

    Transition.call(this);

    this.requiresWebGL = true;
}
module.exports                              = CutoutTransition;
CutoutTransition.prototype                  = Object.create(Transition.prototype);
CutoutTransition.prototype.constructor      = CutoutTransition;

CutoutTransition.prototype.init = function() {
    var quad = new PIXI.Graphics();
    quad.drawRect(0.0, 0.0, 1.0, 1.0);

    var ratio           = new PIXI.Point(0.0, 0.0);
    var canvasRatio     = p3.View.width / p3.View.height;
    var textureRatio    = this._texture.width / this._texture.height;

    if (canvasRatio / textureRatio > 1.0) {
        ratio.x = 1.0;
        ratio.y = 1.0 / (canvasRatio / textureRatio);
    } else {
        ratio.x = 1.0 / (canvasRatio / textureRatio);
        ratio.y = 1.0;
    }

    this._cutout        = new PIXI.Sprite(quad.generateTexture());
    this._cutout.scale  = new PIXI.Point(p3.View.width, p3.View.height);
    this._cutout.tint   = this._color;
    this._cutout.shader = new CutoutShader(this._texture, 0.0, ratio);
	this._cutout.interactive = true; // Avoid triggering other transitions if one is already active
    this.addChild(this._cutout);
};

CutoutTransition.prototype.in = function() {
    this._cutout.shader.scale = this.startScale;
    TweenMax.to(this._cutout.shader, this._duration * 0.5, {
        scale: this.endScale,
        ease: Power2.easeOut,
        onComplete: function() {
            Transition.prototype.in.call(this, this);
        },
        onCompleteScope: this
    });
};

CutoutTransition.prototype.out = function() {
    this._cutout.shader.scale = this.endScale;
    TweenMax.to(this._cutout.shader, this._duration * 0.5, {
        scale: this.startScale,
        ease: Power2.easeIn,
        onComplete: function() {
            Transition.prototype.out.call(this, this);
        },
        onCompleteScope: this
    });
};

CutoutTransition.prototype.resize = function() {
    var ratio           = new PIXI.Point(0.0, 0.0);
    var canvasRatio     = p3.View.width / p3.View.height;
    var textureRatio    = this._texture.width / this._texture.height;

    if (canvasRatio / textureRatio > 1.0) {
        ratio.x = 1.0;
        ratio.y = 1.0 / (canvasRatio / textureRatio);
    } else {
        ratio.x = 1.0 / (canvasRatio / textureRatio);
        ratio.y = 1.0;
    }

    this._cutout.scale          = new PIXI.Point(p3.View.width, p3.View.height);
    this._cutout.shader.ratio   = ratio;
};

/**
 * @returns {Transition}
 */
CutoutTransition.prototype.fallback = function() {
    return new FadeTransition(this._color);
};
},{"./CutoutShader":46,"./FadeTransition":48,"./Transition":52}],48:[function(require,module,exports){
var Common          = require("../Common");
var Transition      = require("./Transition");

/**
 * @param {!Number} color
 * @param {!Number} duration
 * @constructor
 */
function FadeTransition(color, duration) {
    /**
     * @type {Number}
     * @private
     */
    this._color = color || 0x0;

    /**
     * @type {Number}
     * @private
     */
    this._duration = duration || 0.8;

    /**
     * @type {PIXI.Graphics}
     * @private
     */
    this._quad = null;

    Transition.call(this);
}
module.exports                              = FadeTransition;
FadeTransition.prototype                    = Object.create(Transition.prototype);
FadeTransition.prototype.constructor        = FadeTransition;

FadeTransition.prototype.init = function() {
    this._quad          = new PIXI.Graphics();
    this._quad.visible  = false;
    this._quad.beginFill(this._color);
    this._quad.drawRect(0.0, 0.0, p3.View.width, p3.View.height);
    this._quad.endFill();
    this.addChild(this._quad);
};

FadeTransition.prototype.in = function() {
    this._quad.alpha    = 0.0;
    this._quad.visible  = true;
    TweenMax.to(this._quad, this._duration * 0.5, {
        alpha: 1.0,
        ease: Power2.easeInOut,
        onComplete: function() {
            Transition.prototype.in.call(this, this);
        },
        onCompleteScope: this
    });
};

FadeTransition.prototype.out = function() {
    TweenMax.to(this._quad, this._duration * 0.5, {
        alpha: 0.0,
        ease: Power2.easeInOut,
        onComplete: function() {
            this._quad.visible = false;
            Transition.prototype.out.call(this, this);
        },
        onCompleteScope: this
    });
};

FadeTransition.prototype.resize = function() {
    this._quad.clear();
    this._quad.beginFill(this._color);
    this._quad.drawRect(0.0, 0.0, p3.View.width, p3.View.height);
    this._quad.endFill();
};
},{"../Common":2,"./Transition":52}],49:[function(require,module,exports){
/**
 *  MuteButton
 *
 *  Created by Legman on 16/09/2015.
 *
 */

/**
 * @param {!PIXI.Texture} onNormalTexture
 * @param {!PIXI.Texture} offNormalTexture
 * @param {PIXI.Texture=} onOverTexture
 * @param {PIXI.Texture=} offOverTexture
 * @param {PIXI.Texture=} onDownTexture
 * @param {PIXI.Texture=} offDownTexture
 * @param {PIXI.Texture=} onDisabledTexture
 * @param {PIXI.Texture=} offDisabledTexture
 * @constructor
 */
function MuteButton(
    onNormalTexture,
    offNormalTexture,
    onOverTexture,
    offOverTexture,
    onDownTexture,
    offDownTexture
) {
    var audio = p3.AudioManager.instance;

    /**
     * @type {PIXI.Texture}
     * @private
     */
    this._onNormalTexture = onNormalTexture;

    /**
     * @type {PIXI.Texture}
     * @private
     */
    this._offNormalTexture = offNormalTexture;

    /**
     * @type {PIXI.Texture}
     * @private
     */
    this._onOverTexture = onOverTexture;

    /**
     * @type {PIXI.Texture}
     * @private
     */
    this._offOverTexture = offOverTexture;

    /**
     * @type {PIXI.Texture}
     * @private
     */
    this._onDownTexture = onDownTexture;

    /**
     * @type {PIXI.Texture}
     * @private
     */
    this._offDownTexture = offDownTexture;

    /**
     * @type {PIXI.Texture}
     * @private
     */
    this._normalTexture = audio.isMute ? offNormalTexture : onNormalTexture;

    /**
     * @type {PIXI.Texture}
     * @private
     */
    this._overTexture = audio.isMute ? offOverTexture : onOverTexture;

    /**
     * @type {PIXI.Texture}
     * @private
     */
    this._downTexture = audio.isMute ? offOverTexture : onDownTexture;


    p3.Button.call(
        this,
        this._normalTexture,
        this._overTexture,
        this._downTexture
    );
}
module.exports                      = MuteButton;
MuteButton.prototype                = Object.create(p3.Button.prototype);
MuteButton.prototype.constructor    = MuteButton;

/**
 * @param {!Event} event
 */
MuteButton.prototype.onMouseClick = function(event) {
    var audio = p3.AudioManager.instance;
    audio.mute(!audio.isMute);

    this._normalTexture     = audio.isMute ? this._offNormalTexture    : this._onNormalTexture;
    this._overTexture       = audio.isMute ? this._offOverTexture      : this._onOverTexture;
    this._downTexture       = audio.isMute ? this._offDownTexture      : this._onDownTexture;
    this._disabledTexture   = audio.isMute ? this._offDisabledTexture  : this._onDisabledTexture;

    p3.Button.prototype.onMouseClick.call(this, event);
};

},{}],50:[function(require,module,exports){
/**
 *  Scene
 *
 *  Created by Legman on 4/09/2015.
 *
 */

/**
 * @constructor
 */
function Scene() {
    this.signals            = {};
    this.signals.next       = new signals.Signal();
    this.signals.previous   = new signals.Signal();
    this.signals.home       = new signals.Signal();
    this.signals.pause      = new signals.Signal();

    PIXI.Container.call(this);
}
module.exports                  = Scene;
Scene.prototype                 = Object.create(PIXI.Container.prototype);
Scene.prototype.constructor     = Scene;

/**
 * This method is called when a scene is initialized.
 */
Scene.prototype.init = function() {
    // override
};

/**
 * This method is called when a scene is destroyed.
 */
Scene.prototype.dispose = function() {
    this.signals.next.dispose();
    this.signals.previous.dispose();
    this.signals.home.dispose();
    this.signals.pause.dispose();

    this.removeChildren();
};

/**
 * This method is called when the device dimensions are changed.
 */
Scene.prototype.resize = function() {
    // override
};

/**
 * This method is called when the scene is 'top' of the stack.
 */
Scene.prototype.update = function() {
    // override
};

/**
 * This method is called when the scene is shown for the first time.
 */
Scene.prototype.appear = function() {
    this.animateIn();
};

/**
 * This method is called when the scene is shown - regardless of actual visibility.
 */
Scene.prototype.show = function() {
    this.animateIn();
};

/**
 * This method is called when the scene is hidden - regardless of actual visibility.
 */
Scene.prototype.hide = function() {
    // override
};

/**
 * @param {Function=} callback
 * @param {*=} scope
 */
Scene.prototype.animateIn = function(callback, scope) {
    scope = scope || window;
    if (callback) {
        callback.call(scope);
    }
};

/**
 * @param {!Function} callback
 * @param {*=} scope
 */
Scene.prototype.animateOut = function(callback, scope) {
    scope = scope || window;
    if (callback) {
        callback.call(scope);
    }
};
},{}],51:[function(require,module,exports){
/**
 *  SceneManager
 *
 *  Created by Legman on 4/09/2015.
 *
 */

var Scene       = require("./Scene");
var Transition  = require("./Transition");

/**
 * @constructor
 */
function SceneManager() {
    /**
     * @type {PIXI.DisplayObject}
     * @private
     */
    this._stage = null;

    /**
     * @type {PIXI.CanvasRenderer | PIXI.WebGLRenderer}
     * @private
     */
    this._renderer = null;

    /**
     * @type {Array.<Scene>}
     * @private
     */
    this._stack = [];

    /**
     * @type {Transition}
     * @private
     */
    this._transition = null;
}
module.exports = SceneManager;

/**
 * @param {!PIXI.DisplayObject} stage
 * @param {!PIXI.CanvasRenderer | !PIXI.WebGLRenderer} renderer
 */
SceneManager.prototype.init = function(stage, renderer) {
    this._stage         = stage;
    this._renderer      = renderer;
};

/**
 */
SceneManager.prototype.update = function() {
    if (this._stack.length) {
        this.top.update();
    }
};

/**
 * @param {!Scene} scene
 * @param {Transition=} transition
 */
SceneManager.prototype.add = function(scene, transition) {
    if (this.transitionInProgress) return;

    this._transition = transition || new Transition();
    if (this._transition.requiresWebGL && !(this._renderer instanceof PIXI.WebGLRenderer)) {
        this._transition            = transition.fallback();
        this._transition.push       = transition.push;
        this._transition.replace    = transition.replace;
        this._transition.wait       = transition.wait;
    }
    this._transition.init();
    this._stage.addChild(this._transition);

    this._transition.signals.in.addOnce(function(transition) {
        p3.Timestep.queueCall(swap, [scene], this);
    }, this);
    this._transition.signals.out.addOnce(function(transition) {
        this._transition = null;

        transition.parent.removeChild(transition);
        transition.dispose();

        if (transition.wait) {
            p3.Timestep.queueCall(scene.appear, null, scene);
        }
    }, this);
    this._transition.in();

    function swap(scene) {
        if (this.top) {
            this.top.hide();
            if (!this._transition.push) {
                while (this.top) {
                    this.top.parent.removeChild(this.top);
                    this.top.dispose();
                    this._stack.pop();
                }
            } else if (this._transition.replace) {
                var temp;
                for (var i = 0; i < this._stack.length; ++ i) {
                    temp = this._stack[i];
                    if (temp.parent) {
                        temp.parent.removeChild(temp);
                    }
                }
            }
        }

        scene.init();
        scene.resize();
        if (!scene.parent) {
            this.stage.addChildAt(scene, this._transition.parent.getChildIndex(this._transition));
        }
        this._stack.push(scene);

        if (!this._transition.wait) {
            p3.Timestep.queueCall(scene.appear, null, scene);
        }
        this._transition.out();

        console.log(this._stack);
    }
};

/**
 * @param {Transition=} transition
 * @param {Number=} count
 */
SceneManager.prototype.remove = function(transition, count) {
    if (this.transitionInProgress) return;

    this._transition    = transition || new Transition();
    count               = Math.max(1, count) || 1;
    if (this._transition.requiresWebGL && !(this._renderer instanceof PIXI.WebGLRenderer)) {
        this._transition            = transition.fallback();
        this._transition.push       = transition.push;
        this._transition.replace    = transition.replace;
        this._transition.wait       = transition.wait;
    }
    this._transition.init();
    this._stage.addChild(this._transition);

    this._transition.signals.in.addOnce(function(transition) {
        p3.Timestep.queueCall(swap, [count], this);
    }, this);
    this._transition.signals.out.addOnce(function(transition) {
        this._transition = null;

        transition.parent.removeChild(transition);
        transition.dispose();

        if (transition.wait) {
            this.top.show();
        }
    }, this);
    this._transition.in();

    function swap(count) {
        for (var i = 0; i < count; ++ i) {
            this.top.hide();
            this.top.parent.removeChild(this.top);
            this.top.dispose();
            this._stack.pop();
        }

        var scene = this.top;
        scene.resize();
        if (!scene.parent) {
            this.stage.addChildAt(scene, this._transition.parent.getChildIndex(this._transition));
        }

        if (!this._transition.wait) {
            scene.show();
        }
        this._transition.out();

        console.log(this._stack);
    }
};

/**
 */
SceneManager.prototype.clear = function() {
};

/**
 */
SceneManager.prototype.resize = function() {
    var scene;
    for (var i = 0; i < this._stack.length; ++ i) {
        scene = this._stack[i];
        scene.resize();
    }
    if (this._transition) {
        this._transition.resize();
    }
};

Object.defineProperty(SceneManager.prototype, "stage", {
    /**
     * @returns {PIXI.DisplayObject}
     */
    get: function() {
        return this._stage;
    }
});

Object.defineProperty(SceneManager.prototype, "top", {
    /**
     * @returns {Scene}
     */
    get: function() {
        return this._stack.length ? this._stack[this._stack.length - 1] : null;
    }
});

Object.defineProperty(SceneManager.prototype, "transitionInProgress", {
    /**
     * @returns {Boolean}
     */
    get: function() {
        return (this._transition != null ? true : false);
    }
});

},{"./Scene":50,"./Transition":52}],52:[function(require,module,exports){
/**
 *  Transition
 *
 *  Created by Legman on 4/09/2015.
 *
 */

/**
 * @constructor
 */
function Transition() {
    /**
     * @type {*}
     */
    this.signals        = {};
    this.signals.in     = new signals.Signal();
    this.signals.out    = new signals.Signal();

    /**
     * @type {Boolean}
     */
    this.push = false;

    /**
     * @type {Boolean}
     */
    this.replace = true;

    /**
     * @type {Boolean}
     */
    this.wait = true;

    /**
     * @type {Boolean}
     */
    this.requiresWebGL = false;

    PIXI.Container.call(this);
}
module.exports                      = Transition;
Transition.prototype                = Object.create(PIXI.Container.prototype);
Transition.prototype.constructor    = Transition;

Transition.prototype.init = function() {
    // override
};

Transition.prototype.dispose = function() {
    this.signals.in.dispose();
    this.signals.out.dispose();

    this.removeChildren();
};

Transition.prototype.in = function() {
    this.signals.in.dispatch(this);
};

Transition.prototype.out = function() {
    this.signals.out.dispatch(this);
};

/**
 * @returns {Transition}
 */
Transition.prototype.resize = function() {
    // override
};

Transition.prototype.fallback = function() {
    // override
};
},{}],53:[function(require,module,exports){
var Common       		= require("../Common");
var SimpleScreen 		= require("../screens/SimpleScreen");
var WireframeButton 	= require("../general/WireframeButton");
var SoundSFX            = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function CharacterUnlockedOverlay(character)
{
	this._character   = character;
    this._closeButton = null;

	SimpleScreen.call(this);
}

module.exports = CharacterUnlockedOverlay;
CharacterUnlockedOverlay.prototype = Object.create(SimpleScreen.prototype);
CharacterUnlockedOverlay.prototype.constructor = CharacterUnlockedOverlay;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
CharacterUnlockedOverlay.prototype.init = function()
{
	SimpleScreen.prototype.init.call(this);

	this._bg = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	this._bg.alpha       = 0.75;
	this._bg.width       = Common.STAGE_WIDTH;
	this._bg.height      = Common.STAGE_HEIGHT;
	this._bg.hitArea     = new PIXI.Rectangle(0, 0, Common.STAGE_WIDTH, Common.STAGE_HEIGHT);
	this._bg.interactive = true;
	this.addChild(this._bg);


	this._title = new PIXI.Sprite(this._assetManager.getTexture("ui_title_bg"));
	this._title.anchor.set(0.5);
	this._title.x = Common.STAGE_WIDTH/2;
	this._title.y = 100;
	this.addChild(this._title);

		var copy = this._assetManager.getJSON("strings")["UNLOCKED"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var title = new PIXI.extras.BitmapText(copy, {font: "42px Superclarendon Title Purple", align: "center"});
			title.x = -title.textWidth/2;
			title.y = -title.textHeight/2 - 4;
			this._title.addChild(title);
		}
		else
		{
			var title = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
			title.anchor.set(0.5);
			title.y = -6;
			this._title.addChild(title);
		}

    this._messageBox = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_bg"));
	this._messageBox.anchor.set(0.5);
	this._messageBox.x = Common.STAGE_WIDTH/2;
	this._messageBox.y = Common.STAGE_HEIGHT/2 + 70;
    this.addChild(this._messageBox);

		// Character
		// this._char = new PIXI.Sprite(this._assetManager.getTexture("ui_char_" + this._character));
		// this._char.position.set(250,340);
		// this._char.anchor.set(0.5, 1);
		// this._char.scale.x = -1;
		// this._messageBox.addChild(this._char);
		
		this._char = new PIXI.spine.Spine(Common.characterAnimationData[this._character]);
		this._char.skeleton.setToSetupPose();
		this._char.skeleton.setSkin(null);
		this._char.skeleton.setSkinByName("default");
		this._char.x = 200;
		this._char.y = 340;
		this._char.autoUpdate = true;
		this._char.scale.set(0.5);
		this._char.state.setAnimationByName(0, "look_left", true, 0);
		this._messageBox.addChild(this._char);				

		// Text
		var data = this._assetManager.getJSON("config").characters[this._character];

		var deco = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_deco"));
		deco.anchor.set(0.5);
		deco.position.set(-160, -130);
		this._messageBox.addChild(deco);

		var lock = new PIXI.Sprite(this._assetManager.getTexture(this._character != "pabbie" ? "ui_icon_char_crystal_" + data.color : "ui_icon_results_trolls"));
		lock.anchor.set(0.5);
		lock.position = deco.position;
		this._messageBox.addChild(lock);

		// Name
		var copy = data.name[Common.COUNTRY_CODE];

		if(!webfont)
		{
			this._name = new PIXI.extras.BitmapText(copy, {font: "42px Superclarendon Title Purple", align: "center"});
			this._name.x = - this._name.textWidth/2 - 160;
			this._name.y = - this._name.textHeight/2 - 5;
			this._messageBox.addChild(this._name);
		}
		else
		{
			this._name = new PIXI.Text(data.name[Common.COUNTRY_CODE], {font:"36px Arial", fill:0x000000, align:'center'});
			this._name.position.set(-160,-10);
			this._name.anchor.set(0.5);
			this._messageBox.addChild(this._name);
		}

		// Desc
		var copy = data.description[Common.COUNTRY_CODE];

		if(!webfont)
		{
			this._description = new PIXI.extras.BitmapText(copy, {font: "24px Mikadan White", align: "center", tint: 0x6d38ab});
			this._description.x = - this._description.textWidth/2 - 160;
			this._description.y = + 40;
			this._messageBox.addChild(this._description);
		}
		else
		{
			this._description = new PIXI.Text(data.description[Common.COUNTRY_CODE].replace(/\n/gi, ""), {font:"24px Arial", fill:0x000000, align:'center', wordWrap:true, wordWrapWidth:300});
			this._description.position.set(-160,100);
			this._description.anchor.set(0.5);
			this._messageBox.addChild(this._description);
		}

	this._closeButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_secnav_out"),
		this._assetManager.getTexture("ui_btn_secnav_over"),
		this._assetManager.getTexture("ui_btn_secnav_down"),
		this._assetManager.getTexture("ui_icon_secnav_cross")
	);
	this._closeButton.overSoundName = "sfx_btn_rollover_00";
	this._closeButton.x = r2l ? -400 : 400;
    this._closeButton.y = -240;
	this._closeButton.signals.down.addOnce(this.onCloseClick, this);
	this._messageBox.addChild(this._closeButton);
	
	// Intro
	SoundSFX.play("sfx_ui_character_unlock_01");

	this.snowPSContainer = new PIXI.Container();
	this.snowPSContainer.x = this._getBorderButtonPositionRight();
	this.snowPSContainer.y = Common.STAGE_HEIGHT/2;
	this.addChild(this.snowPSContainer);
	
	this.snowPS = new cloudkid.Emitter(this.snowPSContainer,
	[
		this._assetManager.getTexture("particle_snowflake_offset_00"),
		this._assetManager.getTexture("particle_snowflake_offset_01"),
		this._assetManager.getTexture("particle_snowflake_offset_02"),
		this._assetManager.getTexture("particle_snowflake_offset_03")
	], this._assetManager.getJSON("particle_character_unlock"));
	this.snowPS.emit = true;	
	
	
};

/**
 */
CharacterUnlockedOverlay.prototype.update = function()
{
	this.snowPS.update(p3.Timestep.deltaTime);
};

/**
 */
CharacterUnlockedOverlay.prototype.resize = function()
{

	SimpleScreen.prototype.resize.call(this);
};

/**
 */
CharacterUnlockedOverlay.prototype.dispose = function()
{

}

CharacterUnlockedOverlay.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);

	this._bg.alpha = 0;
	this._title.scale = new PIXI.Point(0,0);
	this._messageBox.scale = new PIXI.Point(0,0);
	this._closeButton.scale = new PIXI.Point(0,0);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,                 .5, {alpha:0.75, ease:Sine.easeOut}, 0);
		tl.to(this._title.scale,        .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._messageBox.scale,   .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._closeButton.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 0.6);
	Common.animator.add(tl);
};

CharacterUnlockedOverlay.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,               .5, {alpha:0, ease:Sine.easeIn},  0);
		tl.to(this._title.scale,      .5, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._messageBox.scale, .5, {x:0, y:0, ease:Back.easeIn}, 0);
	Common.animator.add(tl);
};



//===================================================
// PRIVATE METHODS
//===================================================



//===================================================
// EVENTS
//===================================================

CharacterUnlockedOverlay.prototype.onCloseClick = function()
{
	this.animateOut(function()
	{
		this.signals.requestedPreviousScreen.dispatch();
	}, this);

	SoundSFX.play("sfx_btn_press_00");
}

//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../general/SoundSFX":44,"../general/WireframeButton":45,"../screens/SimpleScreen":73}],54:[function(require,module,exports){
var Common       		= require("../Common");
var SimpleScreen 		= require("../screens/SimpleScreen");
var SoundSFX            = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function CodeOverlay()
{
	this._code        = "";
	this._maxLength   = 10;
    this._closeButton = null;

	SimpleScreen.call(this);
}

module.exports = CodeOverlay;
CodeOverlay.prototype = Object.create(SimpleScreen.prototype);
CodeOverlay.prototype.constructor = CodeOverlay;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
CodeOverlay.prototype.init = function()
{
	SimpleScreen.prototype.init.call(this);

	this._bg = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	this._bg.alpha       = 0.75;
	this._bg.width       = Common.STAGE_WIDTH;
	this._bg.height      = Common.STAGE_HEIGHT;
	this._bg.hitArea     = new PIXI.Rectangle(0, 0, Common.STAGE_WIDTH, Common.STAGE_HEIGHT);
	this._bg.interactive = true;
	this.addChild(this._bg);


	// Code screen
	this._codeScreen = new PIXI.Container();
	this.addChild(this._codeScreen);

		// Title
		this._codeScreen._title = new PIXI.Sprite(this._assetManager.getTexture("ui_title_bg"));
		this._codeScreen._title.anchor.set(0.5);
		this._codeScreen._title.x = Common.STAGE_WIDTH/2;
		this._codeScreen._title.y = 100;
		this._codeScreen.addChild(this._codeScreen._title);

			var copy = this._assetManager.getJSON("strings")["ENTER_CODE"][Common.COUNTRY_CODE];

			if(!webfont)
			{
				var title = new PIXI.extras.BitmapText(copy, {font: "42px Superclarendon Title Purple", align: "center"});
				title.x = -title.textWidth/2;
				title.y = -title.textHeight/2 - 4;
				this._codeScreen._title.addChild(title);
			}
			else
			{
				var title = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
				title.anchor.set(0.5);
				title.y = -6;
				this._codeScreen._title.addChild(title);
			}

		// Codeboard
		this._codeScreen._codeBox = new PIXI.Sprite(this._assetManager.getTexture("ui_redeem_panel"));
		this._codeScreen._codeBox.anchor.set(0.5);
		this._codeScreen._codeBox.x = Common.STAGE_WIDTH/2;
		this._codeScreen._codeBox.y = Common.STAGE_HEIGHT/2 + 70;
		this._codeScreen.addChild(this._codeScreen._codeBox);

			// Close button
			this._codeScreen._closeButton = new p3.Button
			(
				this._assetManager.getTexture("ui_btn_secnav_out"),
				this._assetManager.getTexture("ui_btn_secnav_over"),
				this._assetManager.getTexture("ui_btn_secnav_down"),
				this._assetManager.getTexture("ui_icon_secnav_cross")
			);
			this._codeScreen._closeButton.overSoundName = "sfx_btn_rollover_00";
			this._codeScreen._closeButton.x = (r2l ? -1 : 1) * 260;
			this._codeScreen._closeButton.y = -230;
			this._codeScreen._closeButton.signals.down.addOnce(this.onCloseClick, this);
			this._codeScreen._codeBox.addChild(this._codeScreen._closeButton);

			// Text
			this._codeScreen._codeBox.code = new PIXI.extras.BitmapText("", {font: "40px Mikadan Title", align: "center"});
			this._codeScreen._codeBox.code.x = - this._codeScreen._codeBox.code.textWidth/2;
			this._codeScreen._codeBox.code.y = - this._codeScreen._codeBox.code.textHeight/2 - 148;
			this._codeScreen._codeBox.addChild(this._codeScreen._codeBox.code);

			// Digits button
			this._codeScreen._digitButtons = [];

			for(var i = 0; i < 9; i++)
			{
				var x = i % 3;
				var y = Math.floor(i/3);

				var button = new p3.Button
				(
					this._assetManager.getTexture("ui_btn_input_normal"),
					this._assetManager.getTexture("ui_btn_input_over"),
					this._assetManager.getTexture("ui_btn_input_press"),
					this._assetManager.getTexture("ui_icon_input_00" + (i+1))
				);
				button.overSoundName = "sfx_btn_rollover_00";
				button.x = -148 + x * 94;
				button.y = -60  + y * 98;
				button.digit = i+1;
				button.signals.down.add(this.onDigitClick, this);
				this._codeScreen._codeBox.addChild(button);

				this._codeScreen._digitButtons.push(button);
			}

			// Cancel button
			this._deleteButton = new p3.Button
			(
				this._assetManager.getTexture("ui_btn_input_delete_normal"),
				this._assetManager.getTexture("ui_btn_input_delete_over"),
				this._assetManager.getTexture("ui_btn_input_delete_press"),
				this._assetManager.getTexture("ui_icon_input_delete")
			);
			this._deleteButton.overSoundName = "sfx_btn_rollover_00";
			this._deleteButton.x = this._codeScreen._digitButtons[2].x + (this._codeScreen._digitButtons[2].x - this._codeScreen._digitButtons[1].x);
			this._deleteButton.y = this._codeScreen._digitButtons[2].y;
			this._deleteButton.signals.down.add(this.onDeleteClick, this);
			this._codeScreen._codeBox.addChild(this._deleteButton);

			// Enter button
			this._enterButton = new p3.Button
			(
				this._assetManager.getTexture("ui_btn_input_enter_normal"),
				this._assetManager.getTexture("ui_btn_input_enter_over"),
				this._assetManager.getTexture("ui_btn_input_enter_press"),
				this._assetManager.getTexture("ui_icon_input_enter")
			);
			this._enterButton.overSoundName = "sfx_btn_rollover_00";
			this._enterButton.x = this._codeScreen._digitButtons[5].x + (this._codeScreen._digitButtons[5].x - this._codeScreen._digitButtons[4].x);
			this._enterButton.y = this._codeScreen._digitButtons[5].y - this._codeScreen._digitButtons[5].height/2 + this._enterButton.height/2;
			this._enterButton.signals.down.add(this.onEnterClick, this);
			this._codeScreen._codeBox.addChild(this._enterButton);

	// Reward screen
	this._rewardScreen = new PIXI.Container();
	this.addChild(this._rewardScreen);

		// Title
		this._rewardScreen._title = new PIXI.Sprite(this._assetManager.getTexture("ui_title_bg"));
		this._rewardScreen._title.anchor.set(0.5);
		this._rewardScreen._title.x = Common.STAGE_WIDTH/2;
		this._rewardScreen._title.y = 100;
		this._rewardScreen.addChild(this._rewardScreen._title);

			var copy = this._assetManager.getJSON("strings")["REWARD"][Common.COUNTRY_CODE];

			if(!webfont)
			{
				var title = new PIXI.extras.BitmapText(copy, {font: "42px Superclarendon Title Purple", align: "center"});
				title.x = -title.textWidth/2;
				title.y = -title.textHeight/2 - 4;
				this._rewardScreen._title.addChild(title);
			}
			else
			{
				var title = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
				title.anchor.set(0.5);
				title.y = -6;
				this._rewardScreen._title.addChild(title);
			}

		this._rewardScreen._messageBox = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_bg"));
		this._rewardScreen._messageBox.anchor.set(0.5);
		this._rewardScreen._messageBox.position.set(Common.STAGE_WIDTH/2, Common.STAGE_HEIGHT/2 + 70);
		this.addChild(this._rewardScreen._messageBox);

			var bg = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_snowflakes_bg"));
			bg.anchor.set(0.5);
			bg.position.set(0, -40);
			this._rewardScreen._messageBox.addChild(bg);

			this._rewardScreen._messageBox.value = new PIXI.extras.BitmapText("??", {font: "56px Superclarendon Numbers", align: "center"});
			this._rewardScreen._messageBox.value.x = - this._rewardScreen._messageBox.value.textWidth/2;
			this._rewardScreen._messageBox.value.y = - this._rewardScreen._messageBox.value.textHeight/2 - 62;
			this._rewardScreen._messageBox.addChild(this._rewardScreen._messageBox.value);

			var copy = this._assetManager.getJSON("strings")["REWARD_MESSAGE"][Common.COUNTRY_CODE];

			if(!webfont)
			{
				this._rewardScreen._messageBox.message = new PIXI.extras.BitmapText(copy, {font: "36px Superclarendon Title Purple", align: "center"});
				this._rewardScreen._messageBox.message.x = - this._rewardScreen._messageBox.message.textWidth/2;
				this._rewardScreen._messageBox.message.y = - this._rewardScreen._messageBox.message.textHeight/2 + 140;
				this._rewardScreen._messageBox.addChild(this._rewardScreen._messageBox.message);
			}
			else
			{
				this._rewardScreen._messageBox.message = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
				this._rewardScreen._messageBox.message.anchor.set(0.5);
				this._rewardScreen._messageBox.message.position.set(0, 150);
				this._rewardScreen._messageBox.addChild(this._rewardScreen._messageBox.message);
			}

		this._rewardScreen._closeButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_secnav_out"),
			this._assetManager.getTexture("ui_btn_secnav_over"),
			this._assetManager.getTexture("ui_btn_secnav_down"),
			this._assetManager.getTexture("ui_icon_secnav_cross")
		);
		this._rewardScreen._closeButton.x = (r2l ? -1 : 1) * 400;
		this._rewardScreen._closeButton.y = -240;
		this._rewardScreen._closeButton.signals.down.addOnce(this.onCloseClick, this);
		this._rewardScreen._messageBox .addChild(this._rewardScreen._closeButton);

		this._rewardScreen._title.scale.set(0);
		this._rewardScreen._messageBox.scale.set(0);
		this._rewardScreen._closeButton.scale.set(0);

	// Error screen
	this._errorScreen = new PIXI.Container();
	this.addChild(this._errorScreen);

		this._errorScreen._messageBox = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_bg"));
		this._errorScreen._messageBox.anchor.set(0.5);
		this._errorScreen._messageBox.position.set(Common.STAGE_WIDTH/2, Common.STAGE_HEIGHT/2);
		this.addChild(this._errorScreen._messageBox);

			var copy = this._assetManager.getJSON("strings")["SORRY"][Common.COUNTRY_CODE];

			if(!webfont)
			{
				this._errorScreen._messageBox.message = new PIXI.extras.BitmapText(copy, {font: "48px Superclarendon Title Purple", align: "center"});
				this._errorScreen._messageBox.message.x = - this._errorScreen._messageBox.message.textWidth/2;
				this._errorScreen._messageBox.message.y = - this._errorScreen._messageBox.message.textHeight/2 - 160;
				this._errorScreen._messageBox.addChild(this._errorScreen._messageBox.message);
			}
			else
			{
				this._errorScreen._messageBox.message = new PIXI.Text(copy, {font:"48px Arial", fill:0x000000, align:'center'});
				this._errorScreen._messageBox.message.anchor.set(0.5);
				this._errorScreen._messageBox.message.position.set(0, -150);
				this._errorScreen._messageBox.addChild(this._errorScreen._messageBox.message);
			}

			var bg = new PIXI.Sprite(this._assetManager.getTexture("ui_redeem_warning"));
			bg.anchor.set(0.5);
			bg.position.set(0, -15);
			this._errorScreen._messageBox.addChild(bg);

			var copy = this._assetManager.getJSON("strings")["CODE_WRONG"][Common.COUNTRY_CODE];

			if(!webfont)
			{
				this._errorScreen._messageBox.message = new PIXI.extras.BitmapText(copy, {font: "32px Superclarendon Title Purple", align: "center"});
				this._errorScreen._messageBox.message.x = - this._errorScreen._messageBox.message.textWidth/2;
				this._errorScreen._messageBox.message.y = - this._errorScreen._messageBox.message.textHeight/2 + 140;
				this._errorScreen._messageBox.addChild(this._errorScreen._messageBox.message);
			}
			else
			{
				this._errorScreen._messageBox.message = new PIXI.Text(copy, {font:"32px Arial", fill:0x000000, align:'center'});
				this._errorScreen._messageBox.message.anchor.set(0.5);
				this._errorScreen._messageBox.message.position.set(0, 150);
				this._errorScreen._messageBox.addChild(this._errorScreen._messageBox.message);
			}

		this._errorScreen._closeButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_secnav_out"),
			this._assetManager.getTexture("ui_btn_secnav_over"),
			this._assetManager.getTexture("ui_btn_secnav_down"),
			this._assetManager.getTexture("ui_icon_secnav_cross")
		);
		this._errorScreen._closeButton.x = (r2l ? -1 : 1) * 400;
		this._errorScreen._closeButton.y = -240;
		this._errorScreen._closeButton.signals.down.addOnce(this.onCloseClick, this);
		this._errorScreen._messageBox .addChild(this._errorScreen._closeButton);

		this._errorScreen._messageBox.scale.set(0);
		this._errorScreen._closeButton.scale.set(0);
};

/**
 */
CodeOverlay.prototype.update = function()
{
};

/**
 */
CodeOverlay.prototype.resize = function()
{

	SimpleScreen.prototype.resize.call(this);
};

/**
 */
CodeOverlay.prototype.dispose = function()
{

}

CodeOverlay.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);

	this._bg.alpha = 0;
	this._codeScreen._title.scale       = new PIXI.Point(0,0);
	this._codeScreen._codeBox.scale     = new PIXI.Point(0,0);
	this._codeScreen._closeButton.scale = new PIXI.Point(0,0);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,                             .5, {alpha:0.75, ease:Sine.easeOut}, 0);
		tl.to(this._codeScreen._title.scale,        .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._codeScreen._codeBox.scale,      .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._codeScreen._closeButton.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 0.6);
	Common.animator.add(tl);
};

CodeOverlay.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,                             .5, {alpha:0, ease:Sine.easeIn},  0);
		tl.to(this._codeScreen._title.scale,        .5, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._codeScreen._codeBox.scale,      .5, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._rewardScreen._title.scale,      .5, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._rewardScreen._messageBox.scale, .5, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._errorScreen._messageBox.scale,  .5, {x:0, y:0, ease:Back.easeIn}, 0);
	Common.animator.add(tl);
};


//===================================================
// PRIVATE METHODS
//===================================================

CodeOverlay.prototype.updateCode = function(code)
{
	this._code = code;

	this._codeScreen._codeBox.code.text = this._code;
	this._codeScreen._codeBox.code.validate();
	this._codeScreen._codeBox.code.x = - this._codeScreen._codeBox.code.textWidth/2;
}

CodeOverlay.prototype.showResults = function()
{
	var tl = new TimelineMax();
		tl.to(this._codeScreen._title.scale,        .3, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._codeScreen._codeBox.scale,      .3, {x:0, y:0, ease:Back.easeIn}, 0);

	
	
	// Valid code
	if(Common.savedData.isCodeValid(this._code) && !Common.savedData.isCodeRedeemed(this._code))
	{
		var prize = Common.savedData.getCodeValue(this._code);
		Common.savedData.coins += prize;
		Common.savedData.setCodeAsUsed(this._code);
		Common.savedData.save();
		
		// Change values	
		this._rewardScreen._messageBox.value.x += this._rewardScreen._messageBox.value.textWidth/2;
		this._rewardScreen._messageBox.value.text = prize.toString();
		this._rewardScreen._messageBox.value.validate();
		this._rewardScreen._messageBox.value.x -= this._rewardScreen._messageBox.value.textWidth/2;

		if(!webfont)
		{
			this._rewardScreen._messageBox.message.x   += this._rewardScreen._messageBox.message.textWidth/2;
			this._rewardScreen._messageBox.message.text = this._rewardScreen._messageBox.message.text.replace("{value}", prize.toString());
			this._rewardScreen._messageBox.message.validate();
			this._rewardScreen._messageBox.message.x   -= this._rewardScreen._messageBox.message.textWidth/2;
		}
		else
		{
			this._rewardScreen._messageBox.message.text = this._rewardScreen._messageBox.message.text.replace("{value}", prize.toString());
		}		
		
		// Animation
		tl.to(this._rewardScreen._title.scale,        .5, {x:1, y:1, ease:Back.easeOut}, .3);
		tl.to(this._rewardScreen._messageBox.scale,   .5, {x:1, y:1, ease:Back.easeOut}, .3);
		tl.to(this._rewardScreen._closeButton.scale,  .5, {x:1, y:1, ease:Back.easeOut}, .6 + .3);
	}
	// Invalid code
	else
	{
		// Already redeemed
		if(Common.savedData.isCodeValid(this._code))
			var copy = this._assetManager.getJSON("strings")["CODE_USED"][Common.COUNTRY_CODE];
		// Wrong
		else
			var copy = this._assetManager.getJSON("strings")["CODE_WRONG"][Common.COUNTRY_CODE];
		
		if(!webfont)
		{
			this._errorScreen._messageBox.message.text = copy;
			this._errorScreen._messageBox.message.validate();
			this._errorScreen._messageBox.message.x = -this._errorScreen._messageBox.message.textWidth/2;
		}
		
		tl.to(this._errorScreen._messageBox.scale,  .5, {x:1, y:1, ease:Back.easeOut}, .3);
		tl.to(this._errorScreen._closeButton.scale,  .5, {x:1, y:1, ease:Back.easeOut}, .6 + .3);
	}
	
	
	Common.animator.add(tl);	
}

//===================================================
// EVENTS
//===================================================

CodeOverlay.prototype.onCloseClick = function()
{
	this.animateOut(function()
	{
		this.signals.requestedPreviousScreen.dispatch();
	}, this);

	SoundSFX.play("sfx_btn_press_00");
}

CodeOverlay.prototype.onDigitClick = function(e)
{
	if(this._code.length >= this._maxLength)
	{
		SoundSFX.play("sfx_elsa_ice_magic_platform_fail_00");
		return;
	}

	SoundSFX.play("sfx_btn_press_00");
	this.updateCode(this._code + e.digit);
}

CodeOverlay.prototype.onEnterClick = function(e)
{
	if(this._code == "")
	{
		SoundSFX.play("sfx_elsa_ice_magic_platform_fail_00");
		return;
	}

	SoundSFX.play("sfx_btn_press_00");
	this.showResults();
}

CodeOverlay.prototype.onDeleteClick = function(e)
{
	if(this._code == "")
	{
		SoundSFX.play("sfx_elsa_ice_magic_platform_fail_00");
		return;
	}

	SoundSFX.play("sfx_btn_press_00");
	this.updateCode(this._code.substr(0, this._code.length-1));
}

//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../general/SoundSFX":44,"../screens/SimpleScreen":73}],55:[function(require,module,exports){
var Common          = require("../Common");
var SimpleScreen    = require("../screens/SimpleScreen");
var WireframeButton = require("../general/WireframeButton");
var SoundSFX        = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function EndGameOverlay(content, callback, scope)
{
	this._content = content;
	this._callback = callback;
	this._scope = scope;

	this._closeButton = null;

	SimpleScreen.call(this);
}

module.exports = EndGameOverlay;
EndGameOverlay.prototype = Object.create(SimpleScreen.prototype);
EndGameOverlay.prototype.constructor = EndGameOverlay;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
EndGameOverlay.prototype.init = function()
{
	SimpleScreen.prototype.init.call(this);

	// Background
	this._bg = new PIXI.Sprite(Common.generatedTextures['whiteSquare']);
	this._bg.alpha   = 0.75;
	this._bg.width   = Common.STAGE_WIDTH;
	this._bg.height  = Common.STAGE_HEIGHT;
	this._bg.hitArea = new PIXI.Rectangle(0, 0, Common.STAGE_WIDTH, Common.STAGE_HEIGHT);
	this._bg.tint    = 0x2c3a66;
	this._bg.interactive = true;
	this.addChild(this._bg);

	// Title
	this._title = new PIXI.Sprite(this._assetManager.getTexture("ui_title_bg"));
	this._title.anchor.set(0.5);
	this._title.x = Common.STAGE_WIDTH/2;
	this._title.y = 100;
	this.addChild(this._title);

		var copy = this._assetManager.getJSON("strings")["WELL_DONE"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var title = new PIXI.extras.BitmapText(copy, {font: "42px Superclarendon Title Purple", align: "center"});
			title.x = -title.textWidth/2;
			title.y = -title.textHeight/2 - 4;
			this._title.addChild(title);
		}
		else
		{
			var title = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
			title.anchor = new PIXI.Point(0.5, 0.5);
			title.y = -6;
			this._title.addChild(title);
		}

	// Panel background
	this._messageBox = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_bg"));
	this._messageBox.anchor.set(0.5);
	this._messageBox.position.set(Common.STAGE_WIDTH/2, Common.STAGE_HEIGHT/2 + 70);
	this.addChild(this._messageBox);

		var bg = new PIXI.Sprite(this._assetManager.getTexture("ui_image_pabbie_found"));
		bg.anchor.set(0.5);
		bg.position.set(0, -80);
		this._messageBox.addChild(bg);

		// What message?
		if(Common.savedData.endGameMessage.crystals.show)
			var copy = this._assetManager.getJSON("strings")["ENDGAME_CRYSTALS"][Common.COUNTRY_CODE];
		else if(Common.savedData.endGameMessage.trolls.show)
			var copy = this._assetManager.getJSON("strings")["ENDGAME_TROLLS"][Common.COUNTRY_CODE];
		else
			var copy = this._assetManager.getJSON("strings")["ENDGAME_LEVELS"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			this._messageBox.message = new PIXI.extras.BitmapText(copy, {font: "32px Mikadan White", align: "center", tint: 0x6d38ab});
			this._messageBox.message.maxWidth = 620;
			this._messageBox.message.updateText();
			this._messageBox.message.x = -this._messageBox.message.textWidth/2;
			this._messageBox.message.y = -this._messageBox.message.textHeight/2 + 130;
			this._messageBox.addChild(this._messageBox.message);
		}
		else
		{
			this._messageBox.message = new PIXI.Text(copy, {font:"32px Arial", fill:0x000000, align:'center', wordWrap:true, wordWrapWidth:700});
			this._messageBox.message.anchor.set(0.5);
			this._messageBox.message.position.set(0, 130);
			this._messageBox.addChild(this._messageBox.message);
		}

	this._closeButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_secnav_out"),
		this._assetManager.getTexture("ui_btn_secnav_over"),
		this._assetManager.getTexture("ui_btn_secnav_down"),
		this._assetManager.getTexture("ui_icon_secnav_cross")
	);
	this._closeButton.overSoundName = "sfx_btn_rollover_00";
	this._closeButton.x = r2l ? -400 : 400;
	this._closeButton.y = -240;
	this._closeButton.signals.down.addOnce(this.onClose, this);
	this._messageBox .addChild(this._closeButton);

	this._messageBox.scale.set(0);
	this._closeButton.scale.set(0);

	// Don't show again
	Common.savedData.endGameMessage.levels.shown   = Common.savedData.endGameMessage.levels.show;
	Common.savedData.endGameMessage.crystals.shown = Common.savedData.endGameMessage.crystals.show;
	Common.savedData.endGameMessage.trolls.shown   = Common.savedData.endGameMessage.trolls.show;
	Common.savedData.save();
};

/**
 */
EndGameOverlay.prototype.update = function()
{
};

/**
 */
EndGameOverlay.prototype.resize = function()
{

	SimpleScreen.prototype.resize.call(this);
};

/**
 */
EndGameOverlay.prototype.dispose = function()
{

}

EndGameOverlay.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);

	this._title.scale = new PIXI.Point(0,0);
	this._messageBox.scale = new PIXI.Point(0,0);
	this._closeButton.scale = new PIXI.Point(0,0);

	this._bg.alpha = 0;

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,                .5, {alpha:0.75, ease:Sine.easeOut}, 0);
		tl.to(this._title.scale,       .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._messageBox.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._closeButton.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0.6);
	Common.animator.add(tl);
};

EndGameOverlay.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,               .5, {alpha:0, ease:Sine.easeIn},  0);
		tl.to(this._title.scale,      .5, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._messageBox.scale, .5, {x:0, y:0, ease:Back.easeIn}, 0);
	Common.animator.add(tl);
};



//===================================================
// PRIVATE METHODS
//===================================================



//===================================================
// EVENTS
//===================================================

EndGameOverlay.prototype.onClose = function()
{
	this.animateOut(function()
	{
		this.signals.requestedPreviousScreen.dispatch();
	}, this);
}

//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../general/SoundSFX":44,"../general/WireframeButton":45,"../screens/SimpleScreen":73}],56:[function(require,module,exports){
var Common       		= require("../Common");
var SimpleScreen 		= require("../screens/SimpleScreen");
var WireframeButton 	= require("../general/WireframeButton");
var SoundSFX            = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function EndlessOverlay(isLocked)
{
	this._isLocked = isLocked;
    this._closeButton = null;

	SimpleScreen.call(this);
}

module.exports = EndlessOverlay;
EndlessOverlay.prototype = Object.create(SimpleScreen.prototype);
EndlessOverlay.prototype.constructor = EndlessOverlay;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
EndlessOverlay.prototype.init = function()
{
	SimpleScreen.prototype.init.call(this);

	this._bg = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	this._bg.alpha       = 0.75;
	this._bg.width       = Common.STAGE_WIDTH;
	this._bg.height      = Common.STAGE_HEIGHT;
	this._bg.hitArea     = new PIXI.Rectangle(0, 0, Common.STAGE_WIDTH, Common.STAGE_HEIGHT);
	this._bg.interactive = true;
	this.addChild(this._bg);


	this._title = new PIXI.Sprite(this._assetManager.getTexture("ui_title_bg"));
	this._title.anchor.set(0.5);
	this._title.x = Common.STAGE_WIDTH/2;
	this._title.y = 100;
	this.addChild(this._title);

		if(this._isLocked)
			var copy = this._assetManager.getJSON("strings")["LOCKED"][Common.COUNTRY_CODE];
		else
			var copy = this._assetManager.getJSON("strings")["UNLOCKED"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var title = new PIXI.extras.BitmapText(copy, {font: "42px Superclarendon Title Purple", align: "center"});
			title.x = -title.textWidth/2;
			title.y = -title.textHeight/2 - 4;
			this._title.addChild(title);
		}
		else
		{
			var title = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
			title.anchor.set(0.5);
			title.y = -6;
			this._title.addChild(title);
		}

    this._messageBox = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_bg"));
	this._messageBox.anchor.set(0.5);
	this._messageBox.x = Common.STAGE_WIDTH/2;
	this._messageBox.y = Common.STAGE_HEIGHT/2 + 70;
    this.addChild(this._messageBox);

		var deco = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_deco"));
		deco.anchor.set(0.5);
		deco.position.set(-160, -130);
		this._messageBox.addChild(deco);

		var lock = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_lock"));
		lock.anchor.set(0.5);
		lock.position = deco.position;
		this._messageBox.addChild(lock);

		if(this._isLocked)
			var copy = this._assetManager.getJSON("strings")["LOCKED"][Common.COUNTRY_CODE];
		else
			var copy = this._assetManager.getJSON("strings")["ENDLESS"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var text = new PIXI.extras.BitmapText(copy, {font: "42px Superclarendon Title Purple", align: "center"});
			text.x = -160 -text.textWidth/2;
			text.y = -10 -text.textHeight/2;
			this._messageBox.addChild(text);
		}
		else
		{
			var text = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
			text.anchor.set(0.5);
			text.position.set(-160, -10);
			this._messageBox.addChild(text);
		}

		if(this._isLocked)
		{
			var levelRequired = this._assetManager.getJSON("config").endless.levelRequired;
			var copy = this._assetManager.getJSON("strings")["ENDLESS_LOCKED"][Common.COUNTRY_CODE];
			copy = copy.replace("{value}", levelRequired);
		}
		else
		{
			var copy = this._assetManager.getJSON("strings")["ENDLESS_UNLOCKED"][Common.COUNTRY_CODE];
		}

		if(!webfont)
		{
			var text = new PIXI.extras.BitmapText(copy, {font: "24px Mikadan White", align: "center", tint: 0x6d38ab});
			text.x = -160 -text.textWidth/2;
			text.y = +80 -text.textHeight/2;
			this._messageBox.addChild(text);
		}
		else
		{
			var text = new PIXI.Text(copy, {font:"24px Arial", fill:0x000000, align:'center', wordWrap:true, wordWrapWidth:270});
			text.anchor.set(0.5);
			text.position.set(-160, 80);
			this._messageBox.addChild(text);
		}


	// this._character = new PIXI.Sprite(this._assetManager.getTexture("ui_char_olaf"));
	// this._character.anchor.set(0.5, 1);
	// this._character.x = 170;
	// this._character.y = this._messageBox.height/2 + 35;
    // this._messageBox.addChild(this._character);

	this._char = new PIXI.spine.Spine(Common.characterAnimationData["olaf"]);
	this._char.skeleton.setToSetupPose();
	this._char.skeleton.setSkin(null);
	this._char.skeleton.setSkinByName("default");
	this._char.x = 170;
	this._char.y = this._messageBox.height/2 + 35;
	this._char.autoUpdate = true;
	this._char.scale.set(0.5);
	this._char.state.setAnimationByName(0, "look_left", true, 0);
	this._messageBox.addChild(this._char);

	this._closeButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_secnav_out"),
		this._assetManager.getTexture("ui_btn_secnav_over"),
		this._assetManager.getTexture("ui_btn_secnav_down"),
		this._assetManager.getTexture("ui_icon_secnav_cross")
	);
	this._closeButton.overSoundName = "sfx_btn_rollover_00";
	this._closeButton.x = r2l ? -400 : 400;
    this._closeButton.y = -240;
	this._closeButton.signals.down.addOnce(this.onCloseClick, this);
	this._messageBox.addChild(this._closeButton);
};

/**
 */
EndlessOverlay.prototype.update = function()
{
};

/**
 */
EndlessOverlay.prototype.resize = function()
{

	SimpleScreen.prototype.resize.call(this);
};

/**
 */
EndlessOverlay.prototype.dispose = function()
{

}

EndlessOverlay.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);

	this._bg.alpha = 0;
	this._title.scale = new PIXI.Point(0,0);
	this._messageBox.scale = new PIXI.Point(0,0);
	this._closeButton.scale = new PIXI.Point(0,0);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,                 .5, {alpha:0.75, ease:Sine.easeOut}, 0);
		tl.to(this._title.scale,        .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._messageBox.scale,   .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._closeButton.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 0.6);
	Common.animator.add(tl);
};

EndlessOverlay.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,               .5, {alpha:0, ease:Sine.easeIn},  0);
		tl.to(this._title.scale,      .5, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._messageBox.scale, .5, {x:0, y:0, ease:Back.easeIn}, 0);
	Common.animator.add(tl);
};



//===================================================
// PRIVATE METHODS
//===================================================



//===================================================
// EVENTS
//===================================================

EndlessOverlay.prototype.onCloseClick = function()
{
	this.animateOut(function()
	{
		this.signals.requestedPreviousScreen.dispatch();
	}, this);

	SoundSFX.play("sfx_btn_press_00");
}

//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../general/SoundSFX":44,"../general/WireframeButton":45,"../screens/SimpleScreen":73}],57:[function(require,module,exports){
var Common       		= require("../Common");
var SimpleScreen 		= require("../screens/SimpleScreen");
var WireframeButton 	= require("../general/WireframeButton");
var SoundSFX            = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function ExitOverlay(link, isDisneySite)
{
	this._link         = link;
    this._isDisneySite = isDisneySite;

	SimpleScreen.call(this);
}

module.exports = ExitOverlay;
ExitOverlay.prototype = Object.create(SimpleScreen.prototype);
ExitOverlay.prototype.constructor = ExitOverlay;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
ExitOverlay.prototype.init = function()
{
	SimpleScreen.prototype.init.call(this);

	this._boxContainer = new PIXI.Container();
	this.addChild(this._boxContainer);

	this._bg = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	this._bg.alpha       = 0.75;
	this._bg.width       = Common.STAGE_WIDTH;
	this._bg.height      = Common.STAGE_HEIGHT;
	this._bg.hitArea     = new PIXI.Rectangle(0, 0, Common.STAGE_WIDTH, Common.STAGE_HEIGHT);
	this._bg.interactive = true;
	this._boxContainer.addChild(this._bg);

	this._border = new PIXI.Sprite(Common.generatedTextures['whiteSquare']);
	this._border.position.set(Common.STAGE_WIDTH/2, Common.STAGE_HEIGHT/2);
	this._border.anchor.set(0.5)
	this._border.width  = 602;
	this._border.height = 262;
	this._border.tint = 0x999999;
	this._boxContainer.addChild(this._border);

	this._box = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	this._box.position.set(Common.STAGE_WIDTH/2, Common.STAGE_HEIGHT/2);
	this._box.anchor.set(0.5)
	this._box.width = this._border.width-2;
	this._box.height = this._border.height-2;
	this._boxContainer.addChild(this._box);

	this._innerBox = new PIXI.Sprite(Common.generatedTextures['whiteSquare']);
	this._innerBox.position.set(Common.STAGE_WIDTH/2, Common.STAGE_HEIGHT/2);
	this._innerBox.anchor.set(0.5)
	this._innerBox.width  = this._box.width-20;
	this._innerBox.height = this._box.height-20;
	this._boxContainer.addChild(this._innerBox);

	// Text
	if(this._isDisneySite)
		var copy = this._assetManager.getJSON("strings")["EXIT_DISNEY"][Common.COUNTRY_CODE];
	else
		var copy = this._assetManager.getJSON("strings")["EXIT_NOT_DISNEY"][Common.COUNTRY_CODE];

	var text = new PIXI.Text(copy, {font:"bold 16px Arial", fill:0x000000, align:'left', wordWrap:true, wordWrapWidth:this._box.width-100});
	text.position.set(Common.STAGE_WIDTH/2 - this._innerBox.width/2 + 20, Common.STAGE_HEIGHT/2 - this._innerBox.height/2 + 20)
	this._boxContainer.addChild(text);

	if(!this._isDisneySite)
	{
		var copy = this._assetManager.getJSON("strings")["EXIT_NOT_DISNEY_DESCRIPTION"][Common.COUNTRY_CODE];

		var text = new PIXI.Text(copy, {font:"13px Arial", fill:0x555555, align:'left', lineHeight: 20, wordWrap:true, wordWrapWidth:this._box.width-100});
		text.position.set(Common.STAGE_WIDTH/2 - this._innerBox.width/2 + 20, Common.STAGE_HEIGHT/2 - this._innerBox.height/2 + 50)
		this._boxContainer.addChild(text);
	}

	// Buttons
	this._backButton = new PIXI.Sprite(this._assetManager.getTexture("ui_btn_exit_white"));
	this._backButton.anchor.set(0,1);
	this._backButton.position.set(Common.STAGE_WIDTH/2 - this._innerBox.width/2 + 20, Common.STAGE_HEIGHT/2 + this._innerBox.height/2 - 20);
	this._backButton.interactive = true;
	this._backButton.touchstart = this._backButton.mousedown = function(e){this.onCloseClick(e)}.bind(this);
	this._boxContainer.addChild(this._backButton);

		var copy = this._assetManager.getJSON("strings")["EXIT_NO"][Common.COUNTRY_CODE];
		var text = new PIXI.Text(copy, {font:"14px Arial", fill:0x2a9bfe, align:'center', wordWrap:true, wordWrapWidth:this._box.width-100});
		text.anchor.set(0.5);
		text.position.set(this._backButton.width/2, -this._backButton.height/2)
		this._backButton.addChild(text);

	this._linkButton = new PIXI.Sprite(this._assetManager.getTexture("ui_btn_exit_blue"));
	this._linkButton.anchor.set(0,1);
	this._linkButton.position.set(Common.STAGE_WIDTH/2 - this._innerBox.width/2 + 20 + this._backButton.width + 10, Common.STAGE_HEIGHT/2 + this._innerBox.height/2 - 20);
	this._linkButton.interactive = true;
	this._linkButton.touchstart = this._linkButton.mousedown = function(e){this.onLinkClick(e)}.bind(this);
	this._boxContainer.addChild(this._linkButton);

		var copy = this._assetManager.getJSON("strings")["EXIT_YES"][Common.COUNTRY_CODE];
		var text = new PIXI.Text(copy, {font:"14px Arial", fill:0xffffff, align:'center', wordWrap:true, wordWrapWidth:this._box.width-100});
		text.anchor.set(0.5);
		text.position.set(this._linkButton.width/2, -this._linkButton.height/2)
		this._linkButton.addChild(text);

};

/**
 */
ExitOverlay.prototype.update = function()
{
};

/**
 */
ExitOverlay.prototype.resize = function()
{

	SimpleScreen.prototype.resize.call(this);
};

/**
 */
ExitOverlay.prototype.dispose = function()
{

}

ExitOverlay.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);

	// this._bg.alpha = 0;
	this._boxContainer.alpha = 0;

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		// tl.to(this._bg,                 .5, {alpha:0.75, ease:Sine.easeOut}, 0);
		tl.to(this._boxContainer,       .5, {alpha:1, ease:Sine.easeOut}, 0);
	Common.animator.add(tl);
};

ExitOverlay.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		// tl.to(this._bg,               .5, {alpha:0, ease:Sine.easeIn},  0);
		tl.to(this._boxContainer,     .5, {alpha:0, ease:Sine.easeOut}, 0);
	Common.animator.add(tl);
};

//===================================================
// PRIVATE METHODS
//===================================================



//===================================================
// EVENTS
//===================================================

ExitOverlay.prototype.onCloseClick = function()
{
	this.animateOut(function()
	{
		this.signals.requestedPreviousScreen.dispatch();
	}, this);

	SoundSFX.play("sfx_btn_press_00");
}

ExitOverlay.prototype.onLinkClick = function()
{
	if (!p3.Device.isIframe)
	{
		var win = window.open(this._link, '_blank');
		win.focus();
	}
	else
	{
		console.group("Opening " + this._link);
		try
		{
			// console.info("Tryng to open the page normally.");
			// var win = window.parent.open(this._link, '_blank');
			// win.focus();
			window.open(this._link, '_blank');
		}
		catch(e)
		{
			console.info("Couldn't open the page as it's not on the same domain.");
			// console.info("Tryng to open the page through 'postMessage'.");
			// window.parent.postMessage(this._link, '*');
		}
		console.groupEnd("Opening " + this._link);
	}

	this.animateOut(function()
	{
		this.signals.requestedPreviousScreen.dispatch();
	}, this);

	SoundSFX.play("sfx_btn_press_00");
}


//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../general/SoundSFX":44,"../general/WireframeButton":45,"../screens/SimpleScreen":73}],58:[function(require,module,exports){
var Common       = require("../Common");
var SimpleScreen = require("../screens/SimpleScreen");
var NextButton   = require("../general/NextButton");
var SoundSFX     = require("../general/SoundSFX");
var MuteButton   = require("../lib/MuteButton");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function GameOverOverlay(level)
{
	this.level = level;

	SimpleScreen.call(this);

	this.handleActive = false;
	this.handleMinY   = - 180;
	this.handleMaxY   = + 200;
	this.handleY      = this.handleMinY;
	this.handleSFX = null;
	this.handleSFXCountdown = 0;

	this._characterData = this._assetManager.getJSON("config").characters[Common.savedData.character];

	this.signals.requestedCurrentScreen = new signals.Signal();
}
module.exports = GameOverOverlay;
GameOverOverlay.prototype = Object.create(SimpleScreen.prototype);
GameOverOverlay.prototype.constructor = GameOverOverlay;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
GameOverOverlay.prototype.init = function()
{
	console.log("PAUSE INITIALIZED");

	SimpleScreen.prototype.init.call(this);

	// Bg
	this._bg = new PIXI.Sprite(this._assetManager.getTexture("ui_bg_main_menu"));
	this._bg.alpha       = 1;
	this._bg.width       = Common.STAGE_WIDTH;
	this._bg.height      = Common.STAGE_HEIGHT;
	this._bg.hitArea     = new PIXI.Rectangle(0, 0, Common.STAGE_WIDTH, Common.STAGE_HEIGHT);
	this._bg.interactive = true;
	this.addChild(this._bg);

	// GOALS SCREEN
	this._goalsScreen = new PIXI.Container();
	this.addChild(this._goalsScreen);

		this._goalsScreen._title = new PIXI.Sprite(this._assetManager.getTexture("ui_title_bg"));
		this._goalsScreen._title.anchor.set(0.5);
		this._goalsScreen._title.x = Common.STAGE_WIDTH/2;
		this._goalsScreen._title.y = 100;
		this._goalsScreen.addChild(this._goalsScreen._title);

			var copy = this._assetManager.getJSON("strings")["GOALS"][Common.COUNTRY_CODE];

			if(!webfont)
			{
				var title = new PIXI.extras.BitmapText(copy, {font: "50px Superclarendon Title Purple", align: "center"});
				title.x = -title.textWidth/2;
				title.y = -title.textHeight/2 - 4;
				this._goalsScreen._title.addChild(title);
			}
			else
			{
				var title = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
				title.anchor.set(0.5);
				title.y = -6;
				this._goalsScreen._title.addChild(title);
			}

			this._goalsScreen._goalsContainer = new PIXI.Container();
			this._goalsScreen._goalsContainer.position.set(Common.STAGE_WIDTH/2 - 10, Common.STAGE_HEIGHT/2 - 140);
			this._goalsScreen.addChild(this._goalsScreen._goalsContainer);

			this._goalsScreen._goals = [];

				var activeGoals = Common.goalsManager.getActiveGoals();

				for(var active = 1; active >= 0; active--)
				{
					for(var i = 0; i < Common.goalsManager.goals.length; i++)
					{
						var id = Common.goalsManager.goals[i].id;
						var goalStatus = Common.goalsManager.getGoalStatus(id);

						// Show the active goals first, then the rest
						var keep = (active == 0);

						for(var j = 0; j < activeGoals.length; j++)
						{
							if(activeGoals[j].id == id)
							{
								keep = !keep;
								break;
							}
						}

						if(!keep) continue;


						var goal = new PIXI.Sprite(this._assetManager.getTexture("ui_goals_" + ((i%4)+1)));
						goal.anchor.set(0.5);
						goal.y = i * 100;
						this._goalsScreen._goalsContainer.addChild(goal);
						this._goalsScreen._goals.push(goal);

						var icon = new PIXI.Sprite(this._assetManager.getTexture(Common.goalsManager.goals[i].icon));
						icon.anchor.set(0, 0.5);
						icon.x = - 360;
						goal.addChild(icon);

						if(!webfont)
						{
							var text = new PIXI.extras.BitmapText(Common.goalsManager.goals[i].label, {font: "28px Mikadan Title", align: "left"});
							text.maxWidth = 400;
							text.updateText();
							text.x = -180;
							text.y = -text.textHeight/2;
							goal.addChild(text);
						}
						else
						{
							var text = new PIXI.Text(Common.goalsManager.goals[i].label, {font:"28px Arial", fill:0xFFFFFF, align:(r2l ? 'right' : 'left'), wordWrap:true, wordWrapWidth:400});
							text.x = r2l ? 220 : -180;
							text.anchor.set(r2l ? 1 : 0, 0.5);
							goal.addChild(text);
						}

						var progress = new PIXI.Container();
						progress.x = 300
						goal.addChild(progress);

							var id = Common.goalsManager.goals[i].id;
							var goalStatus = Common.goalsManager.getGoalStatus(id);

							if(goalStatus == 1)
							{
								var progressBg = new PIXI.Sprite(this._assetManager.getTexture("ui_goals_complete"));
								progressBg.anchor.set(0.5);
								progress.addChild(progressBg);
							}
							else
							{
								var progressBg = new PIXI.Sprite(this._assetManager.getTexture("ui_goals_bar"));
								progressBg.anchor.set(0.5);
								progress.addChild(progressBg);

								if(goalStatus > 0)
								{
									var progressBar = new PIXI.Sprite(this._assetManager.getTexture("ui_goals_fill"));
									progressBar.anchor.set(0.5);
									progress.addChild(progressBar);

										var canvas = document.createElement('canvas');
										canvas.width  = 128;
										canvas.height = 128;
										var ctx = canvas.getContext("2d");

										ctx.moveTo(canvas.width/2, canvas.height/2);
										ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2, -Math.PI/2, 2*Math.PI*goalStatus-Math.PI/2);
										ctx.lineTo(canvas.width/2, canvas.height/2);
										ctx.fillStyle = 'white';
										ctx.fill();

										var mask = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
										mask.anchor.set(0.5);
										progressBar.addChild(mask);
										progressBar.mask = mask;
								}
							}
						}
				}

				var snow = new PIXI.Sprite(this._assetManager.getTexture("ui_snow_top"));
				snow.anchor.set(0.5, 1);
				snow.y = -15;
				snow.width = this._goalsScreen._goals[0].width+ 20;
				this._goalsScreen._goals[0].addChild(snow);

				// Mask
				var canvas = document.createElement('canvas');
				canvas.width  = 2;
				canvas.height = 512;
				var ctx = canvas.getContext("2d");

				var gradient = ctx.createLinearGradient(0,0,0,canvas.height);
				gradient.addColorStop(0, "rgba(255,255,255,0)");
				gradient.addColorStop(0.05, "rgba(255,255,255,1)");
				gradient.addColorStop(0.93, "rgba(255,255,255,1)");
				gradient.addColorStop(1, "rgba(255,255,255,0)");

				ctx.fillStyle = gradient;
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				var mask = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
				mask.anchor.set(0.5, 0);
				mask.position.y -= 85;
				mask.width = 800;
				mask.height = 550;
				this._goalsScreen._goalsContainer.addChild(mask);
				this._goalsScreen._goalsContainer.mask = mask;

			this._goalsScreen._goalsScroller = new PIXI.Sprite(this._assetManager.getTexture("ui_scroll_rope_bg"));
			this._goalsScreen._goalsScroller.anchor.set(0.5);
			this._goalsScreen._goalsScroller.position.set(Common.STAGE_WIDTH/2 + 400, Common.STAGE_HEIGHT/2 + 60);
			this._goalsScreen.addChild(this._goalsScreen._goalsScroller);

				var texture = this._assetManager.getTexture("ui_scroll_rope_tile");
				this._goalsScreen._goalsScroller._rope = new PIXI.extras.TilingSprite(texture, texture.width, this._goalsScreen._goalsScroller.height - 10);
				this._goalsScreen._goalsScroller._rope.anchor.set(0.5);
				this._goalsScreen._goalsScroller.addChild(this._goalsScreen._goalsScroller._rope);

				var cap = new PIXI.Sprite(this._assetManager.getTexture("ui_scroll_rope_top"));
				cap.anchor.set(0.5, 1);
				cap.y = -this._goalsScreen._goalsScroller._rope.height/2 + 25;
				this._goalsScreen._goalsScroller._rope.addChild(cap);

				var cap = new PIXI.Sprite(this._assetManager.getTexture("ui_scroll_rope_bottom"));
				cap.anchor.set(0.5, 0);
				cap.y = this._goalsScreen._goalsScroller._rope.height/2 - 22;
				this._goalsScreen._goalsScroller._rope.addChild(cap);

				this._goalsScreen._goalsScroller._handle = new PIXI.Sprite(this._assetManager.getTexture("ui_scroll_handle"));
				this._goalsScreen._goalsScroller._handle.anchor      = new PIXI.Point(0.5, 0.5);
				this._goalsScreen._goalsScroller._handle.y           = this.handleMinY;
				this._goalsScreen._goalsScroller._handle.yReal       = this.handleMinY;
				this._goalsScreen._goalsScroller._handle.interactive = true;
				this._goalsScreen._goalsScroller.addChild(this._goalsScreen._goalsScroller._handle);

				this._goalsScreen._goalsScroller._handle.touchstart = this._goalsScreen._goalsScroller._handle.mousedown = function(e){this.onHandleDown(e)}.bind(this);
				this._goalsScreen._goalsScroller._handle.touchmove  = this._goalsScreen._goalsScroller._handle.mousemove = function(e){this.onHandleMove(e)}.bind(this);

		this._goalsScreen._closeButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_con_out"),
			this._assetManager.getTexture("ui_btn_con_over"),
			this._assetManager.getTexture("ui_btn_con_down"),
			this._assetManager.getTexture("ui_icon_con_cross")
		);
		this._goalsScreen._closeButton.y = this._guiButtonTopMargin;
		this._goalsScreen._closeButton.signals.down.add(this.onCloseGoalsClick, this);
		this._goalsScreen.addChild(this._goalsScreen._closeButton);

	// RESULTS SCREEN
	this._resultsScreen = new PIXI.Container();
	this.addChild(this._resultsScreen);

		// Home button
		this._resultsScreen._homeButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_con_out"),
			this._assetManager.getTexture("ui_btn_con_over"),
			this._assetManager.getTexture("ui_btn_con_down"),
			this._assetManager.getTexture("ui_icon_con_home")
		);
		this._resultsScreen._homeButton.y = this._guiButtonTopMargin;
		this._resultsScreen._homeButton.signals.down.addOnce(this.onHomeClick, this);
		this._resultsScreen._homeButton.overSoundName = "sfx_btn_rollover_00";
		this._resultsScreen.addChild(this._resultsScreen._homeButton);

		// Goals button
		this._resultsScreen._goalsButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_con_out"),
			this._assetManager.getTexture("ui_btn_con_over"),
			this._assetManager.getTexture("ui_btn_con_down"),
			this._assetManager.getTexture("ui_icon_con_goals")
		);
		this._resultsScreen._goalsButton.y = this._guiButtonTopMargin;
		this._resultsScreen._goalsButton.signals.down.add(this.onGoalsClick, this);
		this._resultsScreen._goalsButton.overSoundName = "sfx_btn_rollover_00";
		this._resultsScreen.addChild(this._resultsScreen._goalsButton);

		// Mute button
		this._resultsScreen._muteButton = new p3.MuteButton
		(
			this._assetManager.getTexture("ui_btn_con_out"),
			this._assetManager.getTexture("ui_btn_con_over"),
			this._assetManager.getTexture("ui_btn_con_down"),
			this._assetManager.getTexture("ui_icon_con_sound_on"),
			this._assetManager.getTexture("ui_icon_con_sound_off")
		);
		this._resultsScreen._muteButton.id = "mute";
		this._resultsScreen._muteButton.y = this._guiButtonTopMargin;
		this._resultsScreen._muteButton.init();
		this._resultsScreen.addChild(this._resultsScreen._muteButton);

		// Title
		var copy = this._assetManager.getJSON("strings")[(this.level.completed || this.level.endless) ? "WELL_DONE" : "NICE_TRY"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			this._resultsScreen._title = new PIXI.Container();
			this._resultsScreen._title.position.set(Common.STAGE_WIDTH/2 + 100, 100)
			this.addChild(this._resultsScreen._title);

			var title = new PIXI.extras.BitmapText(copy, {font: "48px Superclarendon Title", align: "center"});
			title.x = - title.textWidth/2;
			title.y = - title.textHeight/2;
			this._resultsScreen._title.addChild(title);
		}
		else
		{
			this._resultsScreen._title = new PIXI.Text(copy, {font:"36px Arial", fill:0xffffff, align:'center'});
			this._resultsScreen._title.anchor.set(0.5);
			this._resultsScreen._title.position.set(Common.STAGE_WIDTH/2 + 100, 100);
			this._resultsScreen.addChild(this._resultsScreen._title);
		}


		// Coins
		this.initCoinCointainer(Common.savedData.coins - this.level.snowflakes);
		this.removeChild(this._coinsContainer);
		this._resultsScreen._coinsContainer = this._coinsContainer;
		this._resultsScreen.addChild(this._resultsScreen._coinsContainer);

			// Coins text animation
			var tl = new TimelineMax();
				tl.coins = Common.savedData.coins - this.level.snowflakes;
				tl.to(tl, 1.1, {coins:Common.savedData.coins, ease:Linear.easeNone, onUpdateScope:this, onUpdate:function()
				{
					this.initCoinCointainer(Math.round(tl.coins));
				}}, 1.8);
			Common.animator.add(tl);


		// Scrolls
		this._resultsScreen._scroll = new PIXI.Sprite(this._assetManager.getTexture("ui_result_bg"));
		this._resultsScreen._scroll.anchor.set(0.5);
		this._resultsScreen._scroll.x = Common.STAGE_WIDTH/2 + 100;
		this._resultsScreen._scroll.y = Common.STAGE_HEIGHT/2 + 60;
		this._resultsScreen.addChild(this._resultsScreen._scroll);

			this._resultsScreen._scroll._content = new PIXI.Container();
			this._resultsScreen._scroll.addChild(this._resultsScreen._scroll._content);

			// Level
			if(!this.level.endless)
			{
				var copy = this._assetManager.getJSON("strings")["LEVEL"][Common.COUNTRY_CODE];

				if(!webfont)
				{
					var text = new PIXI.extras.BitmapText(copy.replace("{value}", (Common.savedData.level + 1)), {font: "36px Mikadan White", align: "center", tint: 0x6d534a});
					text.x = -text.textWidth/2;
					text.y = -text.textHeight/2 - 180;
					this._resultsScreen._scroll._content.addChild(text);
				}
				else
				{
					var text = new PIXI.Text(copy.replace("{value}", (Common.savedData.level + 1)), {font:"36px Arial", fill:0x6d534a, align:'center'});
					text.anchor.set(0.5);
					text.y = -180;
					this._resultsScreen._scroll._content.addChild(text);
				}
			}
			else
			{
				this._resultsScreen._scroll._content.y -= 30;
			}

			// First column
			var copy = this._assetManager.getJSON("strings")[this.level.endless ? "DISTANCE" : (Common.savedData.character == "pabbie" ? "TROLLS" : "CRYSTALS")][Common.COUNTRY_CODE];

			if(!webfont)
			{
				var text = new PIXI.extras.BitmapText(copy, {font: "26px Mikadan White", align: "center", tint: 0x0fa0e4});
				text.x = - text.textWidth/2  - 200;
				text.y = - text.textHeight/2 - 125;
				this._resultsScreen._scroll._content.addChild(text);
			}
			else
			{
				var text = new PIXI.Text(copy, {font:"24px Arial", fill:0x0fa0e4, align:'center'});
				text.anchor.set(0.5);
				text.x = -200;
				text.y = -130;
				this._resultsScreen._scroll._content.addChild(text);
			}

			if(!!this.level.endless)
				var t = "ui_icon_results_distance";
			else if(Common.savedData.character == "pabbie")
				var t = "ui_icon_results_troll";
			else
				var t = "ui_icon_results_crystal_" + this._characterData.color;

			var icon = new PIXI.Sprite(this._assetManager.getTexture(t));
			icon.anchor.set(0.5);
			icon.x = -200;
			icon.y = -45;
			this._resultsScreen._scroll._content.addChild(icon);


			var particle = "particle_sparkle_results_pink";
			if(!this.level.endless && (Common.savedData.character == "kristoff" || Common.savedData.character == "pabbie"))
				particle = "particle_sparkle_results_green";
			else if(this.level.endless || (Common.savedData.character == "olaf"))
				particle = "particle_sparkle_results_blue";
			else if(this.level.endless || (Common.savedData.character == "elsa"))
				particle = "particle_sparkle_results_purple";

			this.crystalSparklePS = new cloudkid.Emitter(icon,
			[
				this._assetManager.getTexture("particle_sparkle_offset_00"),
				this._assetManager.getTexture("particle_sparkle_offset_01"),
				this._assetManager.getTexture("particle_sparkle_offset_02"),
				this._assetManager.getTexture("particle_sparkle_offset_03")
			], this._assetManager.getJSON(particle));
			this.crystalSparklePS.emit = true;

			if(!!this.level.endless)
				var copy = this.level.avatar.distance + "m";
			else if(Common.savedData.character == "pabbie")
				var copy = Common.savedData.getLevelCollectedTrollCount(Common.savedData.level) + "/3";
			else
				var copy = Common.savedData.getLevelCharacterCrystalCount(Common.savedData.level, Common.savedData.character) + "/3";

			var text = new PIXI.extras.BitmapText(copy, {font: "36px Superclarendon Title Purple", align: "center"});
			text.x = - text.textWidth/2 - 200;
			text.y = - text.textHeight/2 + 40;
			this._resultsScreen._scroll._content.addChild(text);

			// var text = new PIXI.Text(copy, {font:"24px Arial", fill:0x000000, align:'center'});
			// text.anchor.set(0.5);
			// text.x = -200;
			// text.y = 40;
			// this._resultsScreen._scroll._content.addChild(text);

			// Second column
			var copy = this._assetManager.getJSON("strings")["STYLE_POINTS"][Common.COUNTRY_CODE];

			if(!webfont)
			{
				var text = new PIXI.extras.BitmapText(copy, {font: "26px Mikadan White", align: "center", tint: 0x0fa0e4});
				text.x = - text.textWidth/2;
				text.y = - text.textHeight/2 - 125;
				this._resultsScreen._scroll._content.addChild(text);
			}
			else
			{
				var text = new PIXI.Text(copy, {font:"24px Arial", fill:0x0fa0e4, align:'center'});
				text.anchor.set(0.5);
				text.x = 0;
				text.y = -130;
				this._resultsScreen._scroll._content.addChild(text);
			}

			var icon = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_results_style"));
			icon.anchor.set(0.5);
			icon.x = 0;
			icon.y = -45;
			this._resultsScreen._scroll._content.addChild(icon);

			this.styleSparklePS = new cloudkid.Emitter(icon,
			[
				this._assetManager.getTexture("particle_sparkle_offset_00"),
				this._assetManager.getTexture("particle_sparkle_offset_01"),
				this._assetManager.getTexture("particle_sparkle_offset_02"),
				this._assetManager.getTexture("particle_sparkle_offset_03")
			], this._assetManager.getJSON("particle_sparkle_results_pink"));
			this.styleSparklePS.emit = true;

			var copy = this._assetManager.getJSON("strings")["STYLE_POINTS"][Common.COUNTRY_CODE];
			var text = new PIXI.extras.BitmapText(this.level.styleScore.toString(), {font: "36px Superclarendon Title Purple", align: "center"});
			text.x = - text.textWidth/2;
			text.y = - text.textHeight/2 + 40;
			this._resultsScreen._scroll._content.addChild(text);

			// var text = new PIXI.Text(this.level.styleScore + "", {font:"24px Arial", fill:0x000000, align:'center'});
			// text.anchor.set(0.5);
			// text.x = 0;
			// text.y = 40;
			// this._resultsScreen._scroll._content.addChild(text);

			// Third column
			var copy = this._assetManager.getJSON("strings")["SNOWFLAKES"][Common.COUNTRY_CODE];

			if(!webfont)
			{
				var text = new PIXI.extras.BitmapText(copy, {font: "26px Mikadan White", align: "center", tint: 0x0fa0e4});
				text.x = - text.textWidth/2 + 200;
				text.y = - text.textHeight/2 - 125;
				this._resultsScreen._scroll._content.addChild(text);
			}
			else
			{
				var text = new PIXI.Text(copy, {font:"24px Arial", fill:0x0fa0e4, align:'center'});
				text.anchor.set(0.5);
				text.x = 200;
				text.y = -130;
				this._resultsScreen._scroll._content.addChild(text);
			}

			this._snowflakeIcon = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_results_snowflake"));
			this._snowflakeIcon.anchor.set(0.5);
			this._snowflakeIcon.x = 200;
			this._snowflakeIcon.y = -45;
			this._resultsScreen._scroll._content.addChild(this._snowflakeIcon);

			this.snowflakeSparklePS = new cloudkid.Emitter(this._snowflakeIcon,
			[
				this._assetManager.getTexture("particle_sparkle_offset_00"),
				this._assetManager.getTexture("particle_sparkle_offset_01"),
				this._assetManager.getTexture("particle_sparkle_offset_02"),
				this._assetManager.getTexture("particle_sparkle_offset_03")
			], this._assetManager.getJSON("particle_sparkle_results_blue"));
			this.snowflakeSparklePS.emit = true;

			var text = new PIXI.extras.BitmapText(this.level.snowflakes.toString(), {font: "36px Superclarendon Title Purple", align: "center"});
			text.x = - text.textWidth/2  + 200;
			text.y = - text.textHeight/2 + 40;
			this._resultsScreen._scroll._content.addChild(text);

			// var text = new PIXI.Text(this.level.snowflakes + "", {font:"24px Arial", fill:0x000000, align:'center'});
			// text.anchor.set(0.5);
			// text.x = 200;
			// text.y = 40;
			// this._resultsScreen._scroll._content.addChild(text);

			// Total title
			var copy = this._assetManager.getJSON("strings")["TOTAL"][Common.COUNTRY_CODE];

			if(!webfont)
			{
				var text = new PIXI.extras.BitmapText(copy, {font: "26px Mikadan White", align: "center", tint: 0x0fa0e4});
				text.x = - text.textWidth/2;
				text.y = - text.textHeight/2 + 90;
				this._resultsScreen._scroll._content.addChild(text);
			}
			else
			{
				var text = new PIXI.Text(copy, {font:"30px Arial", fill:0x0fa0e4, align:'center'});
				text.anchor.set(0.5);
				text.x = 0;
				text.y = 90;
				this._resultsScreen._scroll._content.addChild(text);
			}

			var sprite = new PIXI.Sprite(this._assetManager.getTexture("ui_result_element_1"));
			sprite.anchor.set(0, 0.5);
			sprite.position.set(+60, 90);
			this._resultsScreen._scroll._content.addChild(sprite);

			var sprite = new PIXI.Sprite(this._assetManager.getTexture("ui_result_element_1"));
			sprite.anchor.set(0, 0.5);
			sprite.position.set(-60, 90);
			sprite.rotation = Math.PI;
			this._resultsScreen._scroll._content.addChild(sprite);


			// Total
			var text = new PIXI.extras.BitmapText(this.level.score.toString(), {font: "56px Superclarendon Title Purple", align: "center"});
			text.x = - text.textWidth/2;
			text.y = - text.textHeight/2 + 140;
			this._resultsScreen._scroll._content.addChild(text);

			// var text = new PIXI.Text(this.level.score.toString(), {font:"48px Arial", fill:0x000000, align:'center'});
			// text.anchor.set(0.5);
			// text.x = 0;
			// text.y = 140;
			// this._resultsScreen._scroll._content.addChild(text);

			// Highscore
			var copy = this._assetManager.getJSON("strings")["HISCORE"][Common.COUNTRY_CODE];
			copy = copy.replace("{value}", Common.savedData.getHighscore(this.level.endless ? "endless" : Common.savedData.level));

			if(!webfont)
			{
				var text = new PIXI.extras.BitmapText(copy, {font: "26px Mikadan White", align: "center", tint: 0x0fa0e4});
				text.x = - text.textWidth/2;
				text.y = - text.textHeight/2 + 190;
				this._resultsScreen._scroll._content.addChild(text);
			}
			else
			{
				var text = new PIXI.Text(copy, {font:"24px Arial", fill:0x0fa0e4, align:'center'});
				text.anchor.set(0.5);
				text.x = 0;
				text.y = 190;
				this._resultsScreen._scroll._content.addChild(text);
			}

		// Character
		// this._resultsScreen._char = new PIXI.Sprite(this._assetManager.getTexture("ui_char_" + Common.savedData.character));
		// this._resultsScreen._char.anchor.set(0.5, 1);
		// this._resultsScreen._char.x = Common.STAGE_WIDTH/2 - 330;
		// this._resultsScreen._char.xEnd = this._resultsScreen._char.x;
		// this._resultsScreen._char.y = Common.STAGE_HEIGHT;
		// this._resultsScreen.addChild(this._resultsScreen._char);

		this._resultsScreen._char = new PIXI.spine.Spine(Common.characterAnimationData[Common.savedData.character]);
		this._resultsScreen._char.x = Common.STAGE_WIDTH/2 - 330;
		this._resultsScreen._char.xEnd = this._resultsScreen._char.x;
		this._resultsScreen._char.y = Common.STAGE_HEIGHT;
		this._resultsScreen._char.autoUpdate = true;
		this._resultsScreen._char.scale.set(0.5);
		this._resultsScreen._char.state.setAnimationByName(0, "look_right", true, 0);
		this._resultsScreen.addChild(this._resultsScreen._char);

		// Restart button
		this._resultsScreen._restartButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_nav_out"),
			this._assetManager.getTexture("ui_btn_nav_over"),
			this._assetManager.getTexture("ui_btn_nav_down"),
			this._assetManager.getTexture("ui_icon_nav_restart")
		);
		this._resultsScreen._restartButton.overSoundName = "sfx_btn_rollover_00";
		this._resultsScreen._restartButton.y = Common.STAGE_HEIGHT - 120;
		this._resultsScreen._restartButton.signals.down.addOnce(this.onRestartClick, this);
		this._resultsScreen.addChild(this._resultsScreen._restartButton);

		// Continue button
		this._resultsScreen._continueButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_nav_out_big"),
			this._assetManager.getTexture("ui_btn_nav_over_big"),
			this._assetManager.getTexture("ui_btn_nav_down_big"),
			this._assetManager.getTexture("ui_icon_nav_play")
		);
		this._resultsScreen._continueButton.overSoundName = "sfx_btn_rollover_00";
		this._resultsScreen._continueButton.y = Common.STAGE_HEIGHT - 120;
		this._resultsScreen._continueButton.signals.down.addOnce(this.onContinueClick, this);
		this._resultsScreen.addChild(this._resultsScreen._continueButton);

	// Snowflakes
	this._goalSnowflakes = [];
	for(var i = 0; i < 10; i++)
	{
		var snowflake = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_snowflake"));
		snowflake.anchor.set(0.5);
		snowflake.alpha = 0;
		this.addChild(snowflake);

		this._goalSnowflakes.push(snowflake);
	}

	// Music
	if(!!Common.bgMusic)
	{
		Common.bgMusic.stop();
		Common.bgMusic.fadeOut();
	}
	Common.bgMusic = SoundSFX.play('mx_frozen_05_score_lp', {loop:true, volume:0});
	Common.bgMusic.fadeIn(Common.bgMusicVolume, 1000);

	// Event Tracking
	Common.ctow.trackEvent(
	{
		event      : "game_end",
		game_level : Common.savedData.endless ? null : (Common.savedData.level+1),
		game_tier1 : "play_end",
		game_tier2 : (this.level.completed || this.level.endless) ? "success" : "fail",
		game_meta  : "{" +
						 "CharacterName=" + Common.savedData.character + "," +
						 "tumble="        + Common.savedData.charactersPower[Common.savedData.character][0] + "," +
						 "magnet="        + Common.savedData.charactersPower[Common.savedData.character][1] + "," +
						 "magic="         + Common.savedData.charactersPower[Common.savedData.character][2] + "," +
						 "crystals="      + (this.level.endless ? 0 : (Common.savedData.character == "pabbie" ? Common.savedData.getLevelCollectedTrollCount(Common.savedData.level) : Common.savedData.getLevelCharacterCrystalCount(Common.savedData.level, Common.savedData.character))) + "," +
						 "goals=["         + Common.goalsManager.getRunCompletedGoalsIds().join() + "]," +
						 "coins="         + Common.savedData.coins + "," +
						 "distance="      + this.level.avatar.distance +
					 "}"
	});
};

/**
 */
GameOverOverlay.prototype.update = function()
{
	this._resultsScreen._coinsContainer.x = this._getSecondButtonPositionLeft();

	this._resultsScreen._homeButton.x   = this._getFirstButtonPositionLeft();
	this._resultsScreen._muteButton.x   = this._getFirstButtonPositionRight();
	this._resultsScreen._goalsButton.x  = this._getSecondButtonPositionRight();

	// this._resultsScreen._restartButton.x   = r2l ? (this._getFirstButtonPositionRight() - 20) : (this._getFirstButtonPositionLeft() + 10);
	// this._resultsScreen._continueButton.x  = r2l ? (this._getFirstButtonPositionLeft() + 20) : (this._getFirstButtonPositionRight() - 20);
	this._resultsScreen._restartButton.x   = this._getFirstButtonPositionLeft() + 10;
	this._resultsScreen._continueButton.x  = this._getFirstButtonPositionRight() - 20;

	this._goalsScreen._closeButton.x = r2l ? this._getFirstButtonPositionLeft() : this._getFirstButtonPositionRight();

	this.crystalSparklePS.update(p3.Timestep.deltaTime);
	this.styleSparklePS.update(p3.Timestep.deltaTime);
	this.snowflakeSparklePS.update(p3.Timestep.deltaTime);

	if(!!this.handleSFX && this.handleSFXCountdown > 0)
	{
		this.handleSFXCountdown -= p3.Timestep.deltaTime;

		if(this.handleSFXCountdown <= 0)
		{
			this.handleSFX.stop();
			this.handleSFXCountdown = 0;
		}
	}
	// this._exitButton.x = this._getFirstButtonPositionLeft();
	// this._muteButton.x = this._getFirstButtonPositionRight();
};

/**
 */
GameOverOverlay.prototype.resize = function()
{
	SimpleScreen.prototype.resize.call(this);
};

/**
 */
GameOverOverlay.prototype.dispose = function()
{

}

/**
 * @param {Function=} callback
 * @param {*=}scope
 */
GameOverOverlay.prototype.animateIn = function(callback, scope)
{
	var tl = new TimelineMax();
		tl.to(this._bg, .5, {alpha:1, ease:Sine.easeIn}, 0);
	Common.animator.add(tl);

	this._bg.alpha = 0;

	this.showResults(callback, scope)
	// this.showGoals(callback, scope)

	// Snowflakes particles
	var count    = 0;
	var countMax = 10;
	var tl = new TimelineMax();
	for(var p = 0; p < this._goalSnowflakes.length && count < countMax; p++)
	{
		var s = this._goalSnowflakes[p];
		if(s.alpha > 0) continue;

		s.position.set(this._resultsScreen._scroll.x + this._snowflakeIcon.x, this._resultsScreen._scroll.y + this._snowflakeIcon.y + this._resultsScreen._scroll._content.y);
		s.scale.set(1.5);
		s.alpha = 0;

		tl.to(s.scale, 1,    {x: 1, y: 1, ease:Quart.easeOut},            1 + count * 0.1);
		tl.to(s,       1,    {alpha:1, ease:Quart.easeOut},               1 + count * 0.1);
		tl.to(s,       1,    {rotation:2 * Math.PI, ease:Sine.easeInOut}, 1 + count * 0.1);
		tl.to(s,       1,    {x: this._coinsContainer.x + this._coinsContainer._snowflake.x,
		                      y: this._coinsContainer.y + this._coinsContainer._snowflake.y,
							  ease : Sine.easeInOut}, 1 + count * 0.1);
		tl.to(s,       0.01, {alpha: 0, ease:Linear.easeNone});

		count++;
	}

};


/**
 * @param {Function=} callback
 * @param {*=} scope
 */
GameOverOverlay.prototype.animateOut = function(callback, scope)
{
};

/**
 * @param {Function=} callback
 * @param {*=} scope
 */
GameOverOverlay.prototype.exitGame = function(callback, scope)
{
	this._resultsScreen._homeButton.interactive     = false;
	this._resultsScreen._goalsButton.interactive    = false;
	this._resultsScreen._muteButton.interactive     = false;
	this._resultsScreen._restartButton.interactive  = false;
	this._resultsScreen._continueButton.interactive = false;

	if(callback) callback.call(scope);
};

/**
 * @param {Function=} callback
 * @param {*=} scope
 */
GameOverOverlay.prototype.showGoals = function(callback, scope)
{
	this._goalsScreen.visible = true;
	this._resultsScreen.visible = false;

	this._goalsScreen._title.scale.set(0);
	this._goalsScreen._closeButton.scale.set(0);
	this._goalsScreen._goalsContainer.scale.set(1);
	this._goalsScreen._goalsScroller.scale.set(0);
	for(var i = 0; i < this._goalsScreen._goals.length; i++)
		this._goalsScreen._goals[i].scale.set(0);

	// this._goalsScreen._closeButton.interactive = true;

	this.moveHandle(-1000);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._goalsScreen._title.scale,         .5, {x:1, y:1, ease:Back.easeOut}, 0.2);
		tl.to(this._goalsScreen._closeButton.scale,   .5, {x:1, y:1, ease:Back.easeOut}, 0.6);
		tl.to(this._goalsScreen._goalsScroller.scale, .5, {x:1, y:1, ease:Back.easeOut}, 1);

		for(var i = 0; i < this._goalsScreen._goals.length; i++)
			tl.to(this._goalsScreen._goals[i].scale, .5, {x:1, y:1, ease:Back.easeOut}, Math.min(0.4 + i * 0.1, 2));

	Common.animator.add(tl);

};

/**
 * @param {Function=} callback
 * @param {*=} scope
 */
GameOverOverlay.prototype.hideGoals = function(callback, scope)
{
	// this._goalsScreen._closeButton.interactive = false;

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._goalsScreen._title.scale,       .3, {x:0, y:0, ease:Back.easeIn},       0);
		tl.to(this._goalsScreen._closeButton.scale, .3, {x:0, y:0, ease:Back.easeIn},       0);
		tl.to(this._goalsScreen._goalsScroller.scale,     .3, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._goalsScreen._goalsContainer.scale, .3, {x:0, y:0, ease:Back.easeIn},    0.2);
	Common.animator.add(tl);
};

/**
 * @param {Function=} callback
 * @param {*=} scope
 */
GameOverOverlay.prototype.showResults = function(callback, scope)
{
	this._goalsScreen.visible = false;
	this._resultsScreen.visible = true;

	this._resultsScreen._title.scale.set(0);
	this._resultsScreen._coinsContainer.scale.set(0);
	this._resultsScreen._scroll.scale.set(0);
	this._resultsScreen._homeButton.scale.set(0);
	this._resultsScreen._goalsButton.scale.set(0);
	this._resultsScreen._muteButton.scale.set(0);
	this._resultsScreen._restartButton.scale.set(0);
	this._resultsScreen._continueButton.scale.set(0);

	// this._resultsScreen._homeButton.interactive     = true;
	// this._resultsScreen._goalsButton.interactive    = true;
	// this._resultsScreen._muteButton.interactive     = true;
	// this._resultsScreen._restartButton.interactive  = true;
	// this._resultsScreen._continueButton.interactive = true;

	this._resultsScreen._char.x = 0;
	this._resultsScreen._char.alpha = 0;

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});

		tl.to(this._resultsScreen._title.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._resultsScreen._coinsContainer.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0.4);
		tl.to(this._resultsScreen._scroll.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0.2);

		tl.to(this._resultsScreen._goalsButton.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0.4);
		tl.to(this._resultsScreen._muteButton.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0.5);
		tl.to(this._resultsScreen._homeButton.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0.5);

		tl.to(this._resultsScreen._restartButton.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0.6);
		tl.to(this._resultsScreen._continueButton.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0.8);

		tl.to(this._resultsScreen._char, .5, {alpha:1, x: this._resultsScreen._char.xEnd, ease:Sine.EaseOut}, 0.3);

	Common.animator.add(tl);
};

/**
 * @param {Function=} callback
 * @param {*=} scope
 */
GameOverOverlay.prototype.hideResults = function(callback, scope)
{
	// this._resultsScreen._homeButton.interactive     = false;
	// this._resultsScreen._goalsButton.interactive    = false;
	// this._resultsScreen._muteButton.interactive     = false;
	// this._resultsScreen._restartButton.interactive  = false;
	// this._resultsScreen._continueButton.interactive = false;

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});

		tl.to(this._resultsScreen._title.scale,          .5, {x:0, y:0, ease:Back.easeIn}, 0.1);
		tl.to(this._resultsScreen._coinsContainer.scale, .5, {x:0, y:0, ease:Back.easeIn}, 0.2);
		tl.to(this._resultsScreen._scroll.scale,         .5, {x:0, y:0, ease:Back.easeIn}, 0.3);

		tl.to(this._resultsScreen._goalsButton.scale,    .5, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._resultsScreen._muteButton.scale,     .5, {x:0, y:0, ease:Back.easeIn}, 0.1);
		tl.to(this._resultsScreen._homeButton.scale,     .5, {x:0, y:0, ease:Back.easeIn}, 0.2);

		tl.to(this._resultsScreen._restartButton.scale,  .5, {x:0, y:0, ease:Back.easeIn}, 0.05);
		tl.to(this._resultsScreen._continueButton.scale, .5, {x:0, y:0, ease:Back.easeIn}, 0.15);

		tl.to(this._resultsScreen._char,                 .5, {alpha:0, x: this._resultsScreen._char.x-200, ease:Sine.EaseIn}, 0.35);

	Common.animator.add(tl);
};



//===================================================
// PRIVATE METHODS
//===================================================


//===================================================
// EVENTS
//===================================================


GameOverOverlay.prototype.onCloseGoalsClick = function()
{
	this.hideGoals(function(){this.showResults()}, this);
}

GameOverOverlay.prototype.onRestartClick = function()
{
	this.exitGame(function()
	{
		this.signals.requestedCurrentScreen.dispatch();
	}, this);

	SoundSFX.play("sfx_btn_press_00");
}


GameOverOverlay.prototype.onContinueClick = function()
{
	this.exitGame(function()
	{
		this.signals.requestedNextScreen.dispatch();
	}, this);

	SoundSFX.play("sfx_btn_press_00");
}



GameOverOverlay.prototype.onHomeClick = function()
{
	this.exitGame(function()
	{
		this.signals.requestedPreviousScreen.dispatch();
	}, this);

	SoundSFX.play("sfx_btn_press_00");
}

GameOverOverlay.prototype.onGoalsClick = function()
{
	this.hideResults(function(){this.showGoals()}, this);

	SoundSFX.play("sfx_btn_press_00");
}

/**
 */
GameOverOverlay.prototype.onHandleDown = function(e)
{
	this.handleActive = true;
	this.handleY = e.data.getLocalPosition(this).y;
	this.handleUp = function(){this.onHandleUp();}.bind(this)

	document.body.addEventListener('touchend', this.handleUp);
	document.body.addEventListener('mouseup', this.handleUp);
}

/**
 */
GameOverOverlay.prototype.onHandleUp = function()
{
	this.handleActive = false;
	document.body.removeEventListener("mouseup",  this.handleUp);
	document.body.removeEventListener("touchend", this.handleUp);
}

/**
 */
GameOverOverlay.prototype.onHandleMove = function(e)
{
	if(!this.handleActive) return;

	var newY  = e.data.getLocalPosition(this).y;
	var delta = newY - this.handleY;
	this.moveHandle(delta);

	if(this.handleSFXCountdown == 0)
	{
		this.handleSFX = SoundSFX.play("sfx_pulley_down_loop_04", {loop:true});
	}
	this.handleSFXCountdown = 0.2;
}

GameOverOverlay.prototype.moveHandle = function(delta)
{
	if(this._goalsScreen._goalsScroller._handle.y + delta < this.handleMinY)
		delta = this.handleMinY - this._goalsScreen._goalsScroller._handle.y
	else if(this._goalsScreen._goalsScroller._handle.y + delta > this.handleMaxY)
		delta = this.handleMaxY - this._goalsScreen._goalsScroller._handle.y

	this._goalsScreen._goalsScroller._rope.tilePosition.y += delta;
	this._goalsScreen._goalsScroller._handle.y += delta;

	var perc   = (this._goalsScreen._goalsScroller._handle.y - this.handleMinY)/( this.handleMaxY - this.handleMinY);
	var nSteps = this._goalsScreen._goals.length - 4;
	var step   = (perc /(1/(nSteps-1)));

	for(var i = 0; i < this._goalsScreen._goals.length; i++)
	{
		this._goalsScreen._goals[i].y = 100 * (i-step);
	}

	this.handleY += delta;
}


//===================================================
// GETTERS/SETTERS
//===================================================


//===================================================


},{"../Common":2,"../general/NextButton":43,"../general/SoundSFX":44,"../lib/MuteButton":49,"../screens/SimpleScreen":73}],59:[function(require,module,exports){
var Common       		= require("../Common");
var SimpleScreen 		= require("../screens/SimpleScreen");
var WireframeButton 	= require("../general/WireframeButton");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function GenericPopupOverlay(content, callback, scope)
{
    this._content = content;
    this._callback = callback;
    this._scope = scope;

    this._closeButton = null;

	SimpleScreen.call(this);
}

module.exports = GenericPopupOverlay;
GenericPopupOverlay.prototype = Object.create(SimpleScreen.prototype);
GenericPopupOverlay.prototype.constructor = GenericPopupOverlay;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
GenericPopupOverlay.prototype.init = function()
{
	SimpleScreen.prototype.init.call(this);

    var bg = new PIXI.Sprite(Common.generatedTextures['black']);
    bg.width = Common.STAGE_WIDTH;
    bg.height = Common.STAGE_HEIGHT;
    bg.hitArea = new PIXI.Rectangle(0, 0, Common.STAGE_WIDTH, Common.STAGE_HEIGHT);
    bg.interactive = true;
    bg.alpha = 0.75;
    this.addChild(bg);

    var messageBox = new PIXI.Graphics();
    messageBox.beginFill(0xFFFFFF);
    messageBox.drawRect(-300, -200, 600, 400);
    messageBox.x = Common.STAGE_WIDTH / 2;
    messageBox.y = (Common.STAGE_HEIGHT / 2);
    this.addChild(messageBox);

    messageBox.addChild(this._content);

    this._closeButton = new WireframeButton("Close");
    this._closeButton.x = r2l ? -300 : 300;
    this._closeButton.y = -200;
    this._closeButton.signals.clicked.addOnce(this.onCloseClick, this);
    messageBox.addChild(this._closeButton);
};

/**
 */
GenericPopupOverlay.prototype.update = function()
{
};

/**
 */
GenericPopupOverlay.prototype.resize = function()
{

	SimpleScreen.prototype.resize.call(this);
};

/**
 */
GenericPopupOverlay.prototype.dispose = function()
{

}

GenericPopupOverlay.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);
};

GenericPopupOverlay.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);
};



//===================================================
// PRIVATE METHODS
//===================================================



//===================================================
// EVENTS
//===================================================

GenericPopupOverlay.prototype.onCloseClick = function()
{
	this._callback.call(this._scope);
}

//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../general/WireframeButton":45,"../screens/SimpleScreen":73}],60:[function(require,module,exports){
var Common       		= require("../Common");
var SimpleScreen 		= require("../screens/SimpleScreen");
var WireframeButton 	= require("../general/WireframeButton");
var SoundSFX            = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function GenericPopupOverlay(section)
{
	this._section = section;
    this._closeButton = null;

	this._screenIndex = 0;

	SimpleScreen.call(this);
}

module.exports = GenericPopupOverlay;
GenericPopupOverlay.prototype = Object.create(SimpleScreen.prototype);
GenericPopupOverlay.prototype.constructor = GenericPopupOverlay;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
GenericPopupOverlay.prototype.init = function()
{
	SimpleScreen.prototype.init.call(this);

	this._bg = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	this._bg.alpha       = 0.75;
	this._bg.width       = Common.STAGE_WIDTH;
	this._bg.height      = Common.STAGE_HEIGHT;
	this._bg.hitArea     = new PIXI.Rectangle(0, 0, Common.STAGE_WIDTH, Common.STAGE_HEIGHT);
	this._bg.interactive = true;
	this.addChild(this._bg);


	// Title
	this._title = new PIXI.Sprite(this._assetManager.getTexture("ui_title_bg"));
	this._title.anchor.set(0.5);
	this._title.x = Common.STAGE_WIDTH/2;
	this._title.y = 100;
	this.addChild(this._title);

		var copy = this._assetManager.getJSON("strings")["HELP"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var title = new PIXI.extras.BitmapText(copy, {font: "42px Superclarendon Title Purple", align: "center"});
			title.x = -title.textWidth/2;
			title.y = -title.textHeight/2 - 4;
			this._title.addChild(title);
		}
		else
		{
			var title = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
			title.anchor.set(0.5);
			title.y = -6;
			this._title.addChild(title);
		}

	// Content
    this._messageBox = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_bg"));
	this._messageBox.anchor.set(0.5);
	this._messageBox.x = Common.STAGE_WIDTH/2;
	this._messageBox.y = Common.STAGE_HEIGHT/2 + 70;
    this.addChild(this._messageBox);

	this._closeButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_secnav_out"),
		this._assetManager.getTexture("ui_btn_secnav_over"),
		this._assetManager.getTexture("ui_btn_secnav_down"),
		this._assetManager.getTexture("ui_icon_secnav_cross")
	);
	this._closeButton.overSoundName = "sfx_btn_rollover_00";
	this._closeButton.x = r2l ? -400 : 400;
    this._closeButton.y = -240;
	this._closeButton.signals.down.addOnce(this.onCloseClick, this);
	this._messageBox.addChild(this._closeButton);

	// Help screens
	this._content = [];

	switch(this._section)
	{
		case "splash":
			this._content.push({image:["ui_help_main_menu_bg", "ui_help_main_menu_story"], text:"HELP_MAIN_0"});
			this._content.push({image:["ui_help_main_menu_bg", "ui_help_main_menu_endless"], text:"HELP_MAIN_1"});
			this._content.push({image:["ui_help_main_menu_bg", "ui_help_main_menu_hi_score"], text:"HELP_MAIN_2"});
			this._content.push({image:["ui_help_goals"], text:"HELP_GOALS_0"});
			break;

		case "levelSelect":
			this._content.push({image:["ui_help_map_clean_bg"], text:"HELP_MAP_0"});
			this._content.push({image:["ui_help_map_bg", "ui_help_map_characters"], text:"HELP_MAP_1"});
			this._content.push({image:["ui_help_map_pabbie"], text:"HELP_MAP_2"});
			break;

		case "characterSelect":
			this._content.push({image:["ui_help_characters_bg", "ui_help_characters_arrows"], text:"HELP_CHARACTER_0"});
			this._content.push({image:["ui_help_characters_bg", "ui_help_characters_upgrade"], text:"HELP_CHARACTER_1"});
			this._content.push({image:["ui_help_characters_bg", "ui_help_characters_tumble"], text:"HELP_CHARACTER_2"});
			this._content.push({image:["ui_help_characters_bg", "ui_help_characters_magnet"], text:"HELP_CHARACTER_3"});
			this._content.push({image:["ui_help_characters_bg", "ui_help_characters_magic"], text:"HELP_CHARACTER_4"});
			this._content.push({image:["ui_help_characters_bg", "ui_help_characters_crystals"], text:"HELP_CHARACTER_5"});
			this._content.push({image:["ui_tutorial_bg", "ui_tutorial_anna"], text:"HELP_CHARACTER_6"});
			this._content.push({image:["ui_help_characters_bg", "ui_help_characters_crystals"], text:"HELP_CHARACTER_7"});
			break;
	}

	this._screens = [];
	for(var i = 0; i < this._content.length; i++)
	{
		var screen = new PIXI.Container();
		screen.alpha = i == 0 ? 1 : 0;

		for(var m = 0; m < this._content[i].image.length; m++)
		{
			var image = new PIXI.Sprite(this._assetManager.getTexture(this._content[i].image[m]));
			image.anchor.set(0.5);
			image.y = -30;
			screen.addChild(image);
		}

		var copy = this._assetManager.getJSON("strings")[this._content[i].text][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var text = new PIXI.extras.BitmapText(copy, {font: "24px Mikadan White", align: "center", tint: 0x6d38ab});
			text.maxWidth = 620;
			text.updateText();
			text.x = -text.textWidth/2;
			text.y = -text.textHeight/2 + 185;
			screen.addChild(text);
		}
		else
		{
			var text = new PIXI.Text(copy.replace(/\n/gi, ""), {font:"24px Arial", fill:0x000000, align:'center', wordWrap:true, lineHeight:32, wordWrapWidth:620});
			text.anchor.set(0.5);
			text.y = 180;
			screen.addChild(text);
		}

		this._screens.push(screen);
		this._messageBox.addChild(screen);
	}

	// Prev/Next buttons
	if(this._content.length > 1)
	{
		this._messageBox._leftButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_nav_out"),
			this._assetManager.getTexture("ui_btn_nav_over"),
			this._assetManager.getTexture("ui_btn_nav_down"),
			this._assetManager.getTexture("ui_icon_nav_arrow")
		);
		this._messageBox._leftButton.overSoundName = "sfx_btn_rollover_00";
		this._messageBox._leftButton.children[1].x = -5;
		this._messageBox._leftButton.children[1].scale.x = -1;
		this._messageBox._leftButton.position.set(-385, 210);
		this._messageBox._leftButton.alpha = 0;
		this._messageBox._leftButton.signals.down.add(this.onPrev, this);
		this._messageBox.addChild(this._messageBox._leftButton);

		this._messageBox._rightButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_nav_out"),
			this._assetManager.getTexture("ui_btn_nav_over"),
			this._assetManager.getTexture("ui_btn_nav_down"),
			this._assetManager.getTexture("ui_icon_nav_arrow")
		);
		this._messageBox._rightButton.overSoundName = "sfx_btn_rollover_00";
		this._messageBox._rightButton.position.set(385, 210);
		this._messageBox._rightButton.signals.down.add(this.onNext, this);
		this._messageBox.addChild(this._messageBox._rightButton);

		if(r2l)
		{
			this._messageBox._leftButton.scale.set(-1,1);
			this._messageBox._leftButton.position.set(385, 210);
			this._messageBox._rightButton.scale.set(-1,1);
			this._messageBox._rightButton.position.set(-385, 210);
		}
	}

};

/**
 */
GenericPopupOverlay.prototype.update = function()
{
};

/**
 */
GenericPopupOverlay.prototype.resize = function()
{

	SimpleScreen.prototype.resize.call(this);
};

/**
 */
GenericPopupOverlay.prototype.dispose = function()
{

}

GenericPopupOverlay.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);

	this._bg.alpha = 0;
	this._title.scale = new PIXI.Point(0,0);
	this._messageBox.scale = new PIXI.Point(0,0);
	this._closeButton.scale = new PIXI.Point(0,0);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,                 .5, {alpha:0.75, ease:Sine.easeOut}, 0);
		tl.to(this._title.scale,        .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._messageBox.scale,   .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._closeButton.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 0.6);
	Common.animator.add(tl);
};

GenericPopupOverlay.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,               .5, {alpha:0, ease:Sine.easeIn},  0);
		tl.to(this._title.scale,      .5, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._messageBox.scale, .5, {x:0, y:0, ease:Back.easeIn}, 0);
	Common.animator.add(tl);
};

/**
 */
GenericPopupOverlay.prototype.onPrev = function()
{
	if(this._screenIndex == 0) return;

	nextScreen = this._screenIndex-1;
	if(nextScreen < 0) nextScreen = this._screens.length -1;

	var tl = new TimelineMax();
		tl.to(this._screens[this._screenIndex],  .5, {alpha:0, ease:Sine.easeInOut}, 0);
		tl.to(this._screens[nextScreen],           .5, {alpha:1, ease:Sine.easeInOut}, 0);

		if(this._screenIndex == this._screens.length-1)
		{
			tl.to(this._messageBox._rightButton,  .5, {alpha:1, ease:Sine.easeInOut}, 0);
			this._messageBox._rightButton.interactive = true;
		}

		if(nextScreen == 0)
		{
			tl.to(this._messageBox._leftButton,  .5, {alpha:0, ease:Sine.easeInOut}, 0);
			this._messageBox._leftButton.interactive = false;
		}

	Common.animator.add(tl);

	SoundSFX.play("sfx_btn_press_00");

	this._screenIndex = nextScreen;
}

/**
 */
GenericPopupOverlay.prototype.onNext = function()
{
	if(this._screenIndex == this._screens.length-1) return;

	nextScreen = this._screenIndex+1;
	if(nextScreen >= this._screens.length) nextScreen = 0;

	var tl = new TimelineMax();
		tl.to(this._screens[this._screenIndex],  .5, {alpha:0, ease:Sine.easeInOut}, 0);
		tl.to(this._screens[nextScreen],           .5, {alpha:1, ease:Sine.easeInOut}, 0);

		if(nextScreen == this._screens.length-1)
		{
			tl.to(this._messageBox._rightButton,  .5, {alpha:0, ease:Sine.easeInOut}, 0);
			this._messageBox._rightButton.interactive = false;
		}

		if(this._screenIndex == 0)
		{
			tl.to(this._messageBox._leftButton,  .5, {alpha:1, ease:Sine.easeInOut}, 0);
			this._messageBox._leftButton.interactive = true;
		}

	Common.animator.add(tl);

	SoundSFX.play("sfx_btn_press_00");

	this._screenIndex = nextScreen;
}




//===================================================
// PRIVATE METHODS
//===================================================



//===================================================
// EVENTS
//===================================================

GenericPopupOverlay.prototype.onCloseClick = function()
{
	this.animateOut(function()
	{
		this.signals.requestedPreviousScreen.dispatch();
	}, this);

	SoundSFX.play("sfx_btn_press_00");
}

//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../general/SoundSFX":44,"../general/WireframeButton":45,"../screens/SimpleScreen":73}],61:[function(require,module,exports){
var Common       		= require("../Common");
var SimpleScreen 		= require("../screens/SimpleScreen");
var WireframeButton 	= require("../general/WireframeButton");
var SoundSFX             = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function InstructionsOverlay(what)
{
	this._what = what;
    this._closeButton = null;

	this._screenIndex = 0;

	SimpleScreen.call(this);
}

module.exports = InstructionsOverlay;
InstructionsOverlay.prototype = Object.create(SimpleScreen.prototype);
InstructionsOverlay.prototype.constructor = InstructionsOverlay;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
InstructionsOverlay.prototype.init = function()
{
	SimpleScreen.prototype.init.call(this);

	this._bg = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	this._bg.alpha       = 0.75;
	this._bg.width       = Common.STAGE_WIDTH;
	this._bg.height      = Common.STAGE_HEIGHT;
	this._bg.hitArea     = new PIXI.Rectangle(0, 0, Common.STAGE_WIDTH, Common.STAGE_HEIGHT);
	this._bg.interactive = true;
	this.addChild(this._bg);

	this._title = new PIXI.Sprite(this._assetManager.getTexture("ui_title_bg"));
	this._title.anchor.set(0.5);
	this._title.x = Common.STAGE_WIDTH/2;
	this._title.y = 100;
	this.addChild(this._title);

		var copy = this._assetManager.getJSON("strings")["HELP"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var title = new PIXI.extras.BitmapText(copy, {font: "42px Superclarendon Title Purple", align: "center"});
			title.x = -title.textWidth/2;
			title.y = -title.textHeight/2 - 4;
			this._title.addChild(title);
		}
		else
		{
			var title = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
			title.anchor.set(0.5);
			title.y = -6;
			this._title.addChild(title);
		}

    this._messageBox = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_bg"));
	this._messageBox.anchor.set(0.5);
	this._messageBox.x = Common.STAGE_WIDTH/2;
	this._messageBox.y = Common.STAGE_HEIGHT/2 + 70;
    this.addChild(this._messageBox);

	this._closeButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_secnav_out"),
		this._assetManager.getTexture("ui_btn_secnav_over"),
		this._assetManager.getTexture("ui_btn_secnav_down"),
		this._assetManager.getTexture("ui_icon_secnav_cross")
	);
	this._closeButton.overSoundName = "sfx_btn_rollover_00";
	this._closeButton.x = r2l ? -400 : 400;
    this._closeButton.y = -240;
	this._closeButton.signals.down.addOnce(this.onCloseClick, this);
	this._messageBox.addChild(this._closeButton);

	// Help screens
	this._content = [];

	switch(this._what)
	{
		default:
		case "anna":
			if(p3.Device.isMobile)
				this._content.push({image:["ui_tutorial_bg", "ui_tutorial_anna", "ui_help_tap_highlight_r", "ui_help_gameplay_hand_r"], text:"HELP_CHARACTER_ANNA_0"});
			else
				this._content.push({image:["ui_tutorial_bg", "ui_tutorial_anna","ui_help_gameplay_mouse"], text:"HELP_CHARACTER_ANNA_0"});
			break;

		case "kristoff":
			if(p3.Device.isMobile)
				this._content.push({image:["ui_tutorial_bg", "ui_tutorial_kristoff", "ui_help_tap_highlight_l", "ui_help_gameplay_hand_l"], text:"HELP_CHARACTER_KRISTOFF_0"});
			else
				this._content.push({image:["ui_tutorial_bg", "ui_tutorial_kristoff","ui_help_gameplay_enter"], text:"HELP_CHARACTER_KRISTOFF_0"});
			break;

		case "olaf":
			if(p3.Device.isMobile)
				this._content.push({image:["ui_tutorial_bg", "ui_tutorial_olaf", "ui_help_tap_highlight_l", "ui_help_gameplay_hand_l"], text:"HELP_CHARACTER_OLAF_0"});
			else
				this._content.push({image:["ui_tutorial_bg", "ui_tutorial_olaf","ui_help_gameplay_enter_olaf"], text:"HELP_CHARACTER_OLAF_0"});
			break;

		case "elsa":
			if(p3.Device.isMobile)
				this._content.push({image:["ui_tutorial_bg", "ui_tutorial_elsa", "ui_help_tap_highlight_l", "ui_help_gameplay_hand_l"], text:"HELP_CHARACTER_ELSA_0"});
			else
				this._content.push({image:["ui_tutorial_bg", "ui_tutorial_elsa","ui_help_gameplay_enter"], text:"HELP_CHARACTER_ELSA_0"});
			break;

		case "pabbie":
			if(p3.Device.isMobile)
				this._content.push({image:["ui_tutorial_bg", "ui_tutorial_pabbie", "ui_help_tap_highlight_l", "ui_help_gameplay_hand_l"], text:"HELP_CHARACTER_PABBIE_0"});
			else
				this._content.push({image:["ui_tutorial_bg", "ui_tutorial_pabbie","ui_help_gameplay_enter"], text:"HELP_CHARACTER_PABBIE_0"});
			break;

		case "endless":
			this._content.push({image:["ui_tutorial_bg", "ui_tutorial_distance"], text:"HELP_ENDLESS_0"});
			this._content.push({image:["ui_tutorial_bg", "ui_tutorial_personal_best"], text:"HELP_ENDLESS_1"});
			break;
	}

	this._screens = [];
	for(var i = 0; i < this._content.length; i++)
	{
		var screen = new PIXI.Container();
		// screen.y = -70;
		screen.alpha = i == 0 ? 1 : 0;

		for(var m = 0; m < this._content[i].image.length; m++)
		{
			var image = new PIXI.Sprite(this._assetManager.getTexture(this._content[i].image[m]));
			image.anchor.set(0.5);
			image.y = -30;
			screen.addChild(image);
		};

		var copy = this._assetManager.getJSON("strings")[this._content[i].text][Common.COUNTRY_CODE];
		if(!webfont)
		{
			var text = new PIXI.extras.BitmapText(copy, {font: "22px Mikadan White", align: "center", tint: 0x6d38ab});
			// text.maxWidth = 650;
			// text.updateText();
			text.x = -text.textWidth/2;
			text.y = -text.textHeight/2 + 180;
			screen.addChild(text);
		}
		else
		{
			var copy = this._assetManager.getJSON("strings")[this._content[i].text][Common.COUNTRY_CODE];
			var text = new PIXI.Text(copy.replace(/\n/gi, ""), {font:"24px Arial", fill:0x000000, align:'center', wordWrap:true, wordWrapWidth:620});
			text.anchor.set(0.5);
			text.y = 180;
			screen.addChild(text);
		}

		this._screens.push(screen);
		this._messageBox.addChild(screen);
	}

	// Prev/Next buttons
	if(this._content.length > 1)
	{
		this._messageBox._leftButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_nav_out"),
			this._assetManager.getTexture("ui_btn_nav_over"),
			this._assetManager.getTexture("ui_btn_nav_down"),
			this._assetManager.getTexture("ui_icon_nav_arrow")
		);
		this._messageBox._leftButton.overSoundName = "sfx_btn_rollover_00";
		this._messageBox._leftButton.children[1].x = -5;
		this._messageBox._leftButton.children[1].scale.x = -1;
		this._messageBox._leftButton.position.set(-385, 210);
		this._messageBox._leftButton.alpha = 0;
		this._messageBox._leftButton.signals.down.add(this.onPrev, this);
		this._messageBox.addChild(this._messageBox._leftButton);

		this._messageBox._rightButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_nav_out"),
			this._assetManager.getTexture("ui_btn_nav_over"),
			this._assetManager.getTexture("ui_btn_nav_down"),
			this._assetManager.getTexture("ui_icon_nav_arrow")
		);
		this._messageBox._rightButton.overSoundName = "sfx_btn_rollover_00";
		this._messageBox._rightButton.position.set(385, 210);
		this._messageBox._rightButton.signals.down.add(this.onNext, this);
		this._messageBox.addChild(this._messageBox._rightButton);
	}

	Common.bgMusic.stop();
	Common.bgMusic.fadeOut(0, 500);
	Common.bgMusic = SoundSFX.play('mx_frozen_04_pause_lp', {loop:true, volume:0});
	Common.bgMusic.fadeIn(Common.bgMusicVolume, 500);
};

/**
 */
InstructionsOverlay.prototype.update = function()
{
};

/**
 */
InstructionsOverlay.prototype.resize = function()
{

	SimpleScreen.prototype.resize.call(this);
};

/**
 */
InstructionsOverlay.prototype.dispose = function()
{

}

InstructionsOverlay.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);

	this._bg.alpha = 0;
	this._title.scale = new PIXI.Point(0,0);
	this._messageBox.scale = new PIXI.Point(0,0);
	this._closeButton.scale = new PIXI.Point(0,0);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,                 .5, {alpha:0.75, ease:Sine.easeOut}, 0);
		tl.to(this._title.scale,        .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._messageBox.scale,   .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._closeButton.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 0.6);
	Common.animator.add(tl);
};

InstructionsOverlay.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,               .5, {alpha:0, ease:Sine.easeIn},  0);
		tl.to(this._title.scale,      .5, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._messageBox.scale, .5, {x:0, y:0, ease:Back.easeIn}, 0);
	Common.animator.add(tl);
};

/**
 */
InstructionsOverlay.prototype.onPrev = function()
{
	if(this._screenIndex == 0) return;

	nextScreen = this._screenIndex-1;
	if(nextScreen < 0) nextScreen = this._screens.length -1;

	var tl = new TimelineMax();
		tl.to(this._screens[this._screenIndex],  .5, {alpha:0, ease:Sine.easeInOut}, 0);
		tl.to(this._screens[nextScreen],           .5, {alpha:1, ease:Sine.easeInOut}, 0);

		if(this._screenIndex == this._screens.length-1)
		{
			tl.to(this._messageBox._rightButton,  .5, {alpha:1, ease:Sine.easeInOut}, 0);
			this._messageBox._rightButton.interactive = true;
		}

		if(nextScreen == 0)
		{
			tl.to(this._messageBox._leftButton,  .5, {alpha:0, ease:Sine.easeInOut}, 0);
			this._messageBox._leftButton.interactive = false;
		}

	Common.animator.add(tl);

	SoundSFX.play("sfx_btn_press_00");

	this._screenIndex = nextScreen;
}

/**
 */
InstructionsOverlay.prototype.onNext = function()
{
	if(this._screenIndex == this._screens.length-1) return;

	nextScreen = this._screenIndex+1;
	if(nextScreen >= this._screens.length) nextScreen = 0;

	var tl = new TimelineMax();
		tl.to(this._screens[this._screenIndex],  .5, {alpha:0, ease:Sine.easeInOut}, 0);
		tl.to(this._screens[nextScreen],           .5, {alpha:1, ease:Sine.easeInOut}, 0);

		if(nextScreen == this._screens.length-1)
		{
			tl.to(this._messageBox._rightButton,  .5, {alpha:0, ease:Sine.easeInOut}, 0);
			this._messageBox._rightButton.interactive = false;
		}

		if(this._screenIndex == 0)
		{
			tl.to(this._messageBox._leftButton,  .5, {alpha:1, ease:Sine.easeInOut}, 0);
			this._messageBox._leftButton.interactive = true;
		}

	Common.animator.add(tl);

	SoundSFX.play("sfx_btn_press_00");

	this._screenIndex = nextScreen;
}




//===================================================
// PRIVATE METHODS
//===================================================



//===================================================
// EVENTS
//===================================================

InstructionsOverlay.prototype.onCloseClick = function()
{
	Common.savedData.hasSeenTutorial[this._what] = true;
	Common.savedData.save();

	this.animateOut(function()
	{
		this.signals.requestedNextScreen.dispatch();
	}, this);

	SoundSFX.play("sfx_btn_press_00");
}

//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../general/SoundSFX":44,"../general/WireframeButton":45,"../screens/SimpleScreen":73}],62:[function(require,module,exports){
var Common       = require("../Common");
var SimpleScreen = require("../screens/SimpleScreen");
var NextButton   = require("../general/NextButton");
var SoundSFX     = require("../general/SoundSFX");
var MuteButton   = require("../lib/MuteButton");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function PauseOverlay(level)
{
	SimpleScreen.call(this);

	this._level = level;
	this.signals.requestedCurrentScreen = new signals.Signal();
}
module.exports = PauseOverlay;
PauseOverlay.prototype = Object.create(SimpleScreen.prototype);
PauseOverlay.prototype.constructor = PauseOverlay;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
PauseOverlay.prototype.init = function()
{
	console.log("PAUSE INITIALIZED");

	SimpleScreen.prototype.init.call(this);

	this._bg = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	this._bg.alpha       = 0;
	this._bg.width       = Common.STAGE_WIDTH;
	this._bg.height      = Common.STAGE_HEIGHT;
	this._bg.hitArea     = new PIXI.Rectangle(0, 0, Common.STAGE_WIDTH, Common.STAGE_HEIGHT);
	this._bg.interactive = true;
	this.addChild(this._bg);

	this._title = new PIXI.Sprite(this._assetManager.getTexture("ui_title_bg"));
	this._title.anchor = new PIXI.Point(0.5, 0.5);
	this._title.x = Common.STAGE_WIDTH/2;
	this._title.y = 100;
	this.addChild(this._title);

		var copy = this._assetManager.getJSON("strings")["PAUSE"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var title = new PIXI.extras.BitmapText(copy, {font: "42px Superclarendon Title Purple", align: "center"});
			title.x = -title.textWidth/2;
			title.y = -title.textHeight/2 - 4;
			this._title.addChild(title);
		}
		else
		{
			var title = new PIXI.Text("Pause", {font:"36px Arial", fill:0x000000, align:'center'});
			title.anchor = new PIXI.Point(0.5, 0.5);
			title.y = -6;
			this._title.addChild(title);
		}

    this._messageBox = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_bg"));
	this._messageBox .anchor = new PIXI.Point(0.5, 0.5);
	this._messageBox .x = Common.STAGE_WIDTH/2;
	this._messageBox .y = Common.STAGE_HEIGHT/2 + 70;
    this.addChild(this._messageBox );

	var closeButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_secnav_out"),
		this._assetManager.getTexture("ui_btn_secnav_over"),
		this._assetManager.getTexture("ui_btn_secnav_down"),
		this._assetManager.getTexture("ui_icon_secnav_cross")
	);
	closeButton.overSoundName = "sfx_btn_rollover_00";
	closeButton.x = r2l ? -400 : 400;
    closeButton.y = -240;
	closeButton.signals.down.addOnce(this.resumeClicked, this);
	this._messageBox .addChild(closeButton);


	this._mainScreen = new PIXI.Container();
	this._mainScreen.y = -70;
	this._messageBox.addChild(this._mainScreen);


		// Play button
		this._mainScreen._resumeButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_nav_out_big"),
			this._assetManager.getTexture("ui_btn_nav_over_big"),
			this._assetManager.getTexture("ui_btn_nav_down_big"),
			this._assetManager.getTexture("ui_icon_nav_play")
		);
		this._mainScreen._resumeButton.overSoundName = "sfx_btn_rollover_00";
		this._mainScreen._resumeButton.y = -20;
		this._mainScreen._resumeButton.signals.down.add(this.resumeClicked, this);
		this._mainScreen.addChild(this._mainScreen._resumeButton);

		var image = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_deco_2"));
		image.anchor.set(0.5);
		this._mainScreen._resumeButton.addChild(image);

		// Home button
		this._mainScreen._homeButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_secnav_out"),
			this._assetManager.getTexture("ui_btn_secnav_over"),
			this._assetManager.getTexture("ui_btn_secnav_down"),
			this._assetManager.getTexture("ui_icon_secnav_home")
		);
		this._mainScreen._homeButton.overSoundName = "sfx_btn_rollover_00";
		this._mainScreen._homeButton.x = -225;
		this._mainScreen._homeButton.y = +180;
		this._mainScreen._homeButton.signals.down.add(this.homeScreenClicked, this);
		this._mainScreen.addChild(this._mainScreen._homeButton);

		// Restart button
		this._mainScreen._restartButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_secnav_out"),
			this._assetManager.getTexture("ui_btn_secnav_over"),
			this._assetManager.getTexture("ui_btn_secnav_down"),
			this._assetManager.getTexture("ui_icon_secnav_restart")
		);
		this._mainScreen._restartButton.overSoundName = "sfx_btn_rollover_00";
		this._mainScreen._restartButton.x = -75;
		this._mainScreen._restartButton.y = +180;
		this._mainScreen._restartButton.signals.down.add(this.restartScreenClicked, this);
		this._mainScreen.addChild(this._mainScreen._restartButton);

		// Audio button
		this._mainScreen._muteButton = new p3.MuteButton
		(
			this._assetManager.getTexture("ui_btn_secnav_out"),
			this._assetManager.getTexture("ui_btn_secnav_over"),
			this._assetManager.getTexture("ui_btn_secnav_down"),
			this._assetManager.getTexture("ui_icon_secnav_sound_on"),
			this._assetManager.getTexture("ui_icon_secnav_sound_off")
		);
		this._mainScreen._muteButton.overSoundName = "sfx_btn_rollover_00";
		this._mainScreen._muteButton.id = "mute";
		this._mainScreen._muteButton.x = +75;
		this._mainScreen._muteButton.y = +180;
		// this._mainScreen._muteButton.scale = new PIXI.Point(0, 0);
		// this._muteButton.signals.over.add(this.buttonOver, this);
		this._mainScreen._muteButton.init();
		this._mainScreen.addChild(this._mainScreen._muteButton);

		// Help button
		this._mainScreen._helpButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_secnav_out"),
			this._assetManager.getTexture("ui_btn_secnav_over"),
			this._assetManager.getTexture("ui_btn_secnav_down"),
			this._assetManager.getTexture("ui_icon_secnav_help")
		);
		this._mainScreen._helpButton.overSoundName = "sfx_btn_rollover_00";
		this._mainScreen._helpButton.x = +225;
		this._mainScreen._helpButton.y = +180;
		this._mainScreen._helpButton.signals.down.add(this.helpScreenClicked, this);
		this._mainScreen.addChild(this._mainScreen._helpButton);

	// HOME SCREEN
	this._homeScreen = new PIXI.Container();
	this._homeScreen.y = -70;
	this._homeScreen.visible = false;
	this._homeScreen.alpha = 0;
	this._messageBox.addChild(this._homeScreen);

		var copy = this._assetManager.getJSON("strings")["PAUSE_EXIT"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var title = new PIXI.extras.BitmapText(copy, {font: "36px Mikadan White", align: "center", tint: 0x6d38ab});
			title.x = - title.textWidth/2;
			title.y = - title.textHeight/2;
			this._homeScreen.addChild(title);
		}
		else
		{
			var title = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
			title.anchor = new PIXI.Point(0.5, 0.5);
			title.y = -6;
			this._homeScreen.addChild(title);
		}

		// Home confirm button
		this._homeScreen._homeButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_nav_out"),
			this._assetManager.getTexture("ui_btn_nav_over"),
			this._assetManager.getTexture("ui_btn_nav_down"),
			this._assetManager.getTexture("ui_icon_nav_tick")
		);
		this._homeScreen._homeButton.overSoundName = "sfx_btn_rollover_00";
		this._homeScreen._homeButton.x = (r2l ? -1 : 1) * 125;
		this._homeScreen._homeButton.y = +160;
		this._homeScreen._homeButton.signals.down.addOnce(this.homeClicked, this);
		this._homeScreen.addChild(this._homeScreen._homeButton);

		// Home cancel button
		this._homeScreen._resumeButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_nav_out"),
			this._assetManager.getTexture("ui_btn_nav_over"),
			this._assetManager.getTexture("ui_btn_nav_down"),
			this._assetManager.getTexture("ui_icon_nav_cross")
		);
		this._homeScreen._resumeButton.overSoundName = "sfx_btn_rollover_00";
		this._homeScreen._resumeButton.x = (r2l ? -1 : 1) * -125;
		this._homeScreen._resumeButton.y = +160;
		this._homeScreen._resumeButton.signals.down.addOnce(this.resumeClicked, this);
		this._homeScreen.addChild(this._homeScreen._resumeButton);


	// RESTART SCREEN
	this._restartScreen = new PIXI.Container();
	this._restartScreen.y = -70;
	this._restartScreen.visible = false;
	this._restartScreen.alpha = 0;
	this._messageBox.addChild(this._restartScreen);

		var copy = this._assetManager.getJSON("strings")["PAUSE_RESTART"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var title = new PIXI.extras.BitmapText(copy, {font: "36px Mikadan White", align: "center", tint: 0x6d38ab});
			title.x = - title.textWidth/2;
			title.y = - title.textHeight/2;
			this._restartScreen.addChild(title);
		}
		else
		{
			var title = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
			title.anchor = new PIXI.Point(0.5, 0.5);
			title.y = -6;
			this._restartScreen.addChild(title);
		}

		// Restart confirm button
		this._restartScreen._restartButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_nav_out"),
			this._assetManager.getTexture("ui_btn_nav_over"),
			this._assetManager.getTexture("ui_btn_nav_down"),
			this._assetManager.getTexture("ui_icon_nav_tick")
		);
		this._restartScreen._restartButton.overSoundName = "sfx_btn_rollover_00";
		this._restartScreen._restartButton.x = (r2l ? -1 : 1) * 125;
		this._restartScreen._restartButton.y = +160;
		this._restartScreen._restartButton.signals.down.addOnce(this.restartClicked, this);
		this._restartScreen.addChild(this._restartScreen._restartButton);

		// Restart cancel button
		this._restartScreen._resumeButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_nav_out"),
			this._assetManager.getTexture("ui_btn_nav_over"),
			this._assetManager.getTexture("ui_btn_nav_down"),
			this._assetManager.getTexture("ui_icon_nav_cross")
		);
		this._restartScreen._resumeButton.overSoundName = "sfx_btn_rollover_00";
		this._restartScreen._resumeButton.x = (r2l ? -1 : 1) * -125;
		this._restartScreen._resumeButton.y = +160;
		this._restartScreen._resumeButton.signals.down.addOnce(this.resumeClicked, this);
		this._restartScreen.addChild(this._restartScreen._resumeButton);

	// HELP SCREEN
	this._helpScreen = new PIXI.Container();
	this._helpScreen.visible = false;
	this._helpScreen.alpha = 0;
	this._helpScreen.page  = 0;
	this._helpScreen.pages = [];
	this._messageBox.addChild(this._helpScreen);

		// Prev button
		this._helpScreen._prevButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_nav_out"),
			this._assetManager.getTexture("ui_btn_nav_over"),
			this._assetManager.getTexture("ui_btn_nav_down"),
			this._assetManager.getTexture("ui_icon_nav_arrow")
		);
		this._helpScreen._prevButton.overSoundName = "sfx_btn_rollover_00";
		this._helpScreen._prevButton.x = -387;
		this._helpScreen._prevButton.y = +210;
		this._helpScreen._prevButton.alpha = 0;
		this._helpScreen._prevButton.interactive = false;
		this._helpScreen._prevButton.signals.down.add(this.helpPrevClicked, this);
		this._helpScreen.addChild(this._helpScreen._prevButton);
		this._helpScreen._prevButton.children[1].scale.x = -1;
		this._helpScreen._prevButton.children[1].x = -5;

		// Next button
		this._helpScreen._nextButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_nav_out"),
			this._assetManager.getTexture("ui_btn_nav_over"),
			this._assetManager.getTexture("ui_btn_nav_down"),
			this._assetManager.getTexture("ui_icon_nav_arrow")
		);
		this._helpScreen._nextButton.overSoundName = "sfx_btn_rollover_00";
		this._helpScreen._nextButton.x = 387;
		this._helpScreen._nextButton.y = +210;
		this._helpScreen._nextButton.signals.down.add(this.helpNextClicked, this);
		this._helpScreen.addChild(this._helpScreen._nextButton);
		
		if(r2l)
		{
			this._helpScreen._prevButton.scale.set(-1,1);
			this._helpScreen._prevButton.position.set(387, 210);
			this._helpScreen._nextButton.scale.set(-1,1);
			this._helpScreen._nextButton.position.set(-387, 210);
		}		

		// Screens
		this._content = [];
		
		if(p3.Device.isMobile)
			this._content.push({image:["ui_help_gameplay_bg", "ui_help_gameplay_jump", "ui_help_tap_highlight_r", "ui_help_gameplay_hand_r"], text:"HELP_GENERIC_0" + (p3.Device.isMobile ? "_MOB" : "_PC")});
		else
			this._content.push({image:["ui_help_gameplay_bg", "ui_help_gameplay_jump", "ui_help_gameplay_mouse"], text:"HELP_GENERIC_0" + (p3.Device.isMobile ? "_MOB" : "_PC")});
		
		if(p3.Device.isMobile)
			this._content.push({image:["ui_help_gameplay_bg", "ui_help_gameplay_tumble", "ui_help_tap_highlight_r", "ui_help_gameplay_hand_r"], text:"HELP_GENERIC_1" + (p3.Device.isMobile ? "_MOB" : "_PC")});
		else
			this._content.push({image:["ui_help_gameplay_bg", "ui_help_gameplay_tumble","ui_help_gameplay_mouse"], text:"HELP_GENERIC_1" + (p3.Device.isMobile ? "_MOB" : "_PC")});

		switch(Common.savedData.character)
		{
			default:
			case "anna":
				if(p3.Device.isMobile)
					this._content.push({image:["ui_tutorial_bg", "ui_tutorial_anna", "ui_help_tap_highlight_r", "ui_help_gameplay_hand_r"], text:"HELP_CHARACTER_ANNA_0"});
				else
					this._content.push({image:["ui_tutorial_bg", "ui_tutorial_anna","ui_help_gameplay_mouse"], text:"HELP_CHARACTER_ANNA_0"});
				break;

			case "kristoff":
				if(p3.Device.isMobile)
					this._content.push({image:["ui_tutorial_bg", "ui_tutorial_kristoff", "ui_help_tap_highlight_l", "ui_help_gameplay_hand_l"], text:"HELP_CHARACTER_KRISTOFF_0"});
				else
					this._content.push({image:["ui_tutorial_bg", "ui_tutorial_kristoff","ui_help_gameplay_enter"], text:"HELP_CHARACTER_KRISTOFF_0"});
				break;

			case "olaf":
				if(p3.Device.isMobile)
					this._content.push({image:["ui_tutorial_bg", "ui_tutorial_olaf", "ui_help_tap_highlight_l", "ui_help_gameplay_hand_l"], text:"HELP_CHARACTER_OLAF_0"});
				else
					this._content.push({image:["ui_tutorial_bg", "ui_tutorial_olaf","ui_help_gameplay_enter_olaf"], text:"HELP_CHARACTER_OLAF_0"});
				break;

			case "elsa":
				if(p3.Device.isMobile)
					this._content.push({image:["ui_tutorial_bg", "ui_tutorial_elsa", "ui_help_tap_highlight_l", "ui_help_gameplay_hand_l"], text:"HELP_CHARACTER_ELSA_0"});
				else
					this._content.push({image:["ui_tutorial_bg", "ui_tutorial_elsa","ui_help_gameplay_enter"], text:"HELP_CHARACTER_ELSA_0"});
			break;

			case "pabbie":
				if(p3.Device.isMobile)
					this._content.push({image:["ui_tutorial_bg", "ui_tutorial_pabbie", "ui_help_tap_highlight_l", "ui_help_gameplay_hand_l"], text:"HELP_CHARACTER_PABBIE_0"});
				else
					this._content.push({image:["ui_tutorial_bg", "ui_tutorial_pabbie","ui_help_gameplay_enter"], text:"HELP_CHARACTER_PABBIE_0"});
				break;
		}

		this._content.push({image:["ui_help_gameplay_bg", "ui_help_gameplay_sven_sled"], text:"HELP_GENERIC_3"});
		this._content.push({image:["ui_help_gameplay_bg", "ui_help_gameplay_marshmallow"], text:"HELP_GENERIC_4"});

		if(!this._level.endless)
			this._content.push({image:["ui_help_gameplay_bg", "ui_help_gameplay_crystals"], text:"HELP_STORY_0"});




		for(var i = 0; i < this._content.length; i++)
		{
			var page = new PIXI.Container();
			page.alpha = (i == 0) ? 1 : 0;
			this._helpScreen.pages.push(page);
			this._helpScreen.addChild(page);

			for(var m = 0; m < this._content[i].image.length; m++)
			{
				var image = new PIXI.Sprite(this._assetManager.getTexture(this._content[i].image[m]));
				image.anchor.set(0.5);
				image.y = -30;
				page.addChild(image);
			}

			var copy = this._assetManager.getJSON("strings")[this._content[i].text][Common.COUNTRY_CODE];

			if(!webfont)
			{
				var text = new PIXI.extras.BitmapText(copy, {font: "22px Mikadan White", align: "center", tint: 0x6d38ab});
				// text.maxWidth = 620;
				// text.updateText();
				text.x = -text.textWidth/2;
				text.y = -text.textHeight/2 + 180;
				page.addChild(text);
			}
			else
			{
				var copy = this._assetManager.getJSON("strings")[this._content[i].text][Common.COUNTRY_CODE];
				var text = new PIXI.Text(copy.replace(/\n/gi, ""), {font:"24px Arial", fill:0x000000, align:'center', wordWrap:true, wordWrapWidth:620});
				text.anchor.set(0.5);
				text.y = 180;
				page.addChild(text);
			}
		}

	// this._char = new PIXI.Sprite(this._assetManager.getTexture("ui_char_" + Common.savedData.character));
	// this._char.anchor.set(0.5, 1);
	// this._char.x = Common.STAGE_WIDTH/2 - 390;
	// this._char.y = Common.STAGE_HEIGHT;
	// this._char.visible = false;
	// this._char.scale.x = -1;
	// this.addChild(this._char);

	Common.bgMusic.fadeOut(0, 500);
	Common.bgMusic = SoundSFX.play('mx_frozen_04_pause_lp', {loop:true, volume:0});
	Common.bgMusic.fadeIn(Common.bgMusicVolume, 500);
};

/**
 */
PauseOverlay.prototype.update = function()
{
	// this._exitButton.x = this._getFirstButtonPositionLeft();
	// this._muteButton.x = this._getFirstButtonPositionRight();
};

/**
 */
PauseOverlay.prototype.resize = function()
{
	SimpleScreen.prototype.resize.call(this);
};

/**
 */
PauseOverlay.prototype.dispose = function()
{

}

/**
 */
 /*
PauseOverlay.prototype.setIntroHelpMode = function()
{
	if(Common.savedData.hasViewedInstructions) return;

	if(this._contents.length > 1 )
	{
		this._resumeButton.visible = false;
	}
    this._introHelpMode = true;
}*/

/**
 * @param {Function=} callback
 * @param {*=}scope
 */
PauseOverlay.prototype.animateIn = function(callback, scope)
{
	this._title.scale = new PIXI.Point(0,0);
	this._messageBox.scale = new PIXI.Point(0,0);
	this._mainScreen._resumeButton.scale = new PIXI.Point(0,0);
	this._mainScreen._homeButton.scale = new PIXI.Point(0,0);
	this._mainScreen._restartButton.scale = new PIXI.Point(0,0);
	this._mainScreen._muteButton.scale = new PIXI.Point(0,0);
	this._mainScreen._helpButton.scale = new PIXI.Point(0,0);

	var tl = new TimelineMax();

		tl.to(this._bg,          .5, {alpha:0.75, ease:Sine.easeOut}, 0);
		tl.to(this._title.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0);

		tl.to(this._messageBox.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0);
			tl.to(this._mainScreen._resumeButton.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 0.3);
			tl.to(this._mainScreen._homeButton.scale,    .5, {x:1, y:1, ease:Back.easeOut}, 0.5);
			tl.to(this._mainScreen._restartButton.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0.6);
			tl.to(this._mainScreen._muteButton.scale,    .5, {x:1, y:1, ease:Back.easeOut}, 0.7);
			tl.to(this._mainScreen._helpButton.scale,    .5, {x:1, y:1, ease:Back.easeOut}, 0.8);

		// tl.to(this._char,         .5, {alpha:1, x: this._char.x, ease:Sine.EaseIn}, 0.1);

	Common.animator.add(tl);

	// this._char.x = 0;
	// this._char.alpha = 0;
};


/**
 * @param {Function=} callback
 * @param {*=} scope
 */
PauseOverlay.prototype.animateOut = function(callback, scope)
{
	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._title.scale,      .5, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._messageBox.scale, .5, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._bg,               .5, {alpha:0, ease:Sine.easeIn}, 0);
		// tl.to(this._char,             .5, {alpha:0, x: 0, ease:Sine.EaseIn},0);
	Common.animator.add(tl);

	Common.bgMusic.fadeOut(0, 500);
};

/**
 * @param {Function=} callback
 * @param {*=} scope
 */
PauseOverlay.prototype.exitGame = function(callback, scope)
{
	// var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		// tl.to(this._overlay, .5, {alpha:1, ease:Sine.easeIn}, 0);
	// Common.animator.add(tl);
	if(callback) callback.call(scope);
};



//===================================================
// PRIVATE METHODS
//===================================================


//===================================================
// EVENTS
//===================================================


/**
 */
PauseOverlay.prototype.resumeClicked = function()
{
	this.animateOut(function()
	{
		this.signals.requestedNextScreen.dispatch();
	}, this);

	SoundSFX.play("sfx_btn_press_00");
};

/**
 */
PauseOverlay.prototype.homeScreenClicked = function()
{
	var tl = new TimelineMax();
		tl.to(this._mainScreen, 0.25, {alpha:0, ease:Sine.EaseIn, onCompleteScope:this, onComplete:function(){this._homeScreen.visible = true; this._mainScreen.visible = false;}}, 0);
		tl.to(this._homeScreen, 0.25, {alpha:1, ease:Sine.EaseOut});
	Common.animator.add(tl);

	SoundSFX.play("sfx_btn_press_00");
};

/**
 */
PauseOverlay.prototype.restartScreenClicked = function()
{
	var tl = new TimelineMax();
		tl.to(this._mainScreen,    0.25, {alpha:0, ease:Sine.EaseIn, onCompleteScope:this, onComplete:function(){this._restartScreen.visible = true; this._mainScreen.visible = false;}}, 0);
		tl.to(this._restartScreen, 0.25, {alpha:1, ease:Sine.EaseOut});
	Common.animator.add(tl);

	SoundSFX.play("sfx_btn_press_00");
};

/**
 */
PauseOverlay.prototype.helpScreenClicked = function()
{
	var tl = new TimelineMax();
		tl.to(this._mainScreen, 0.25, {alpha:0, ease:Sine.EaseIn, onCompleteScope:this, onComplete:function(){this._helpScreen.visible = true; this._mainScreen.visible = false;}}, 0);
		tl.to(this._helpScreen, 0.25, {alpha:1, ease:Sine.EaseOut});
		// tl.to(this._char, 0.5, {alpha:0, x: 0, ease:Sine.EaseIn},0);
	Common.animator.add(tl);

	SoundSFX.play("sfx_btn_press_00");
};


/**
 */
PauseOverlay.prototype.homeClicked = function()
{
	this.exitGame(function()
	{
		this.signals.requestedPreviousScreen.dispatch();
	}, this);

	SoundSFX.play("sfx_btn_press_00");
};


/**
 */
PauseOverlay.prototype.restartClicked = function()
{
	this.exitGame(function()
	{
		this.signals.requestedCurrentScreen.dispatch();
	}, this);

	SoundSFX.play("sfx_btn_press_00");
};

/**
 */
PauseOverlay.prototype.helpPrevClicked = function()
{
	if(this._helpScreen.page == 0) return;

	SoundSFX.play("sfx_btn_press_00");

	var tl = new TimelineMax();

		tl.to(this._helpScreen.pages[this._helpScreen.page], 0.5, {alpha:0, ease:Sine.EaseInOut}, 0);
		tl.to(this._helpScreen.pages[this._helpScreen.page-1], 0.5, {alpha:1, ease:Sine.EaseInOut}, 0);

		if(this._helpScreen.page == this._helpScreen.pages.length-1)
		{
			tl.to(this._helpScreen._nextButton, 0.5, {alpha:1, ease:Sine.EaseInOut, onCompleteScope:this._helpScreen._nextButton, onComplete:function(){this.interactive = true}}, 0);
		}
		else if(this._helpScreen.page == 1)
		{
			this._helpScreen._prevButton.interactive = false;
			tl.to(this._helpScreen._prevButton, 0.5, {alpha:0, ease:Sine.EaseInOut}, 0);
		}

	Common.animator.add(tl);

	this._helpScreen.page--;
};

/**
 */
PauseOverlay.prototype.helpNextClicked = function()
{
	if(this._helpScreen.page == this._helpScreen.pages.length-1) return;

	SoundSFX.play("sfx_btn_press_00");

	var tl = new TimelineMax();

		tl.to(this._helpScreen.pages[this._helpScreen.page], 0.5, {alpha:0, ease:Sine.EaseInOut}, 0);
		tl.to(this._helpScreen.pages[this._helpScreen.page+1], 0.5, {alpha:1, ease:Sine.EaseInOut}, 0);

		if(this._helpScreen.page == 0)
		{
			tl.to(this._helpScreen._prevButton, 0.5, {alpha:1, ease:Sine.EaseInOut, onCompleteScope:this._helpScreen._prevButton, onComplete:function(){this.interactive = true}}, 0);
		}
		else if(this._helpScreen.page == this._helpScreen.pages.length-2)
		{
			this._helpScreen._nextButton.interactive = false;
			tl.to(this._helpScreen._nextButton, 0.5, {alpha:0, ease:Sine.EaseInOut}, 0);
		}

	Common.animator.add(tl);

	this._helpScreen.page++;

};




//===================================================
// GETTERS/SETTERS
//===================================================


//===================================================


},{"../Common":2,"../general/NextButton":43,"../general/SoundSFX":44,"../lib/MuteButton":49,"../screens/SimpleScreen":73}],63:[function(require,module,exports){
var Common       		= require("../Common");
var SimpleScreen 		= require("../screens/SimpleScreen");
var WireframeButton 	= require("../general/WireframeButton");
var SoundSFX            = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function PowerupPurchaseOverlay(previousScreen, cost)
{
	this._prevScreen  = previousScreen;
	this._cost        = cost;
    this._closeButton = null;

	SimpleScreen.call(this);
}

module.exports = PowerupPurchaseOverlay;
PowerupPurchaseOverlay.prototype = Object.create(SimpleScreen.prototype);
PowerupPurchaseOverlay.prototype.constructor = PowerupPurchaseOverlay;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 * Initialization
 */
PowerupPurchaseOverlay.prototype.init = function()
{
	SimpleScreen.prototype.init.call(this);

	// Bg
	this._bg = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	this._bg.alpha       = 0.75;
	this._bg.width       = Common.STAGE_WIDTH;
	this._bg.height      = Common.STAGE_HEIGHT;
	this._bg.hitArea     = new PIXI.Rectangle(0, 0, Common.STAGE_WIDTH, Common.STAGE_HEIGHT);
	this._bg.interactive = true;
	this.addChild(this._bg);

	// Panel background
    this._messageBox = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_bg"));
	this._messageBox.anchor.set(0.5);
	this._messageBox.position.set(Common.STAGE_WIDTH/2, Common.STAGE_HEIGHT/2);
    this.addChild(this._messageBox);

		var bg = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_snowflakes_bg"));
		bg.anchor.set(0.5);
		bg.position.set(0, -40);
		this._messageBox.addChild(bg);

		// Cost
		var copy = "-" + this._cost;
		
		var text = new PIXI.extras.BitmapText(copy, {font: "56px Superclarendon Numbers", align: "center"});	
		text.x = - text.textWidth/2 - 10;
		text.y = - text.textHeight/2 - 62;
		this._messageBox.addChild(text);

		// var text = new PIXI.Text("-" + this._cost, {font:"48px Arial", fill:0x000000, align:'center'});
		// text.anchor.set(0.5);
		// text.position.set(-10, -65);
		// this._messageBox.addChild(text);
	

		// Are you sure?
		var copy = this._assetManager.getJSON("strings")["ARE_YOU_SURE"][Common.COUNTRY_CODE];
		
		if(!webfont)
		{
			var text = new PIXI.extras.BitmapText(copy, {font: "40px Mikadan White", align: "center", tint: 0x6d38ab});	
			text.x = - text.textWidth/2;
			text.y = - text.textHeight/2 + 100;
			this._messageBox.addChild(text);
		}
		else
		{
			var text = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
			text.anchor.set(0.5);
			text.position.set(0, 90);
			this._messageBox.addChild(text);
		}

	// Cancel button
	this._closeButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_nav_out"),
		this._assetManager.getTexture("ui_btn_nav_over"),
		this._assetManager.getTexture("ui_btn_nav_down"),
		this._assetManager.getTexture("ui_icon_nav_cross")
	);
	this._closeButton.overSoundName = "sfx_btn_rollover_00";
	this._closeButton.position.set(-150, 200);
	this._closeButton.signals.down.addOnce(this.onCloseClick, this);
	this._messageBox.addChild(this._closeButton);

	// Confirm button
	this._buyButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_nav_out"),
		this._assetManager.getTexture("ui_btn_nav_over"),
		this._assetManager.getTexture("ui_btn_nav_down"),
		this._assetManager.getTexture("ui_icon_nav_tick")
	);
	this._buyButton.overSoundName = "sfx_btn_rollover_00";
	this._buyButton.position.set(150, 200);
	this._buyButton.signals.down.addOnce(this.onBuyClick, this);
	this._messageBox.addChild(this._buyButton);
};

/**
 */
PowerupPurchaseOverlay.prototype.update = function()
{
};

/**
 */
PowerupPurchaseOverlay.prototype.resize = function()
{
	SimpleScreen.prototype.resize.call(this);
};

/**
 */
PowerupPurchaseOverlay.prototype.dispose = function()
{
}

/**
 */
PowerupPurchaseOverlay.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);

	this._bg.alpha = 0;
	this._messageBox.scale.set(0);
	this._closeButton.scale.set(0);
	this._buyButton.scale.set(0);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,                 .5, {alpha:0.75, ease:Sine.easeOut}, 0);
		tl.to(this._messageBox.scale,   .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._closeButton.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 0.5);
		tl.to(this._buyButton.scale,    .5, {x:1, y:1, ease:Back.easeOut}, 0.6);
	Common.animator.add(tl);
};

/**
 */
PowerupPurchaseOverlay.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,               .5, {alpha:0, ease:Sine.easeIn},  0);
		tl.to(this._messageBox.scale, .5, {x:0, y:0, ease:Back.easeIn}, 0);
	Common.animator.add(tl);
};

//===================================================
// PRIVATE METHODS
//===================================================



//===================================================
// EVENTS
//===================================================

/**
 * Purchase cancel
 */
PowerupPurchaseOverlay.prototype.onCloseClick = function()
{	
	this.animateOut(function()
	{
		this.signals.requestedPreviousScreen.dispatch();
	}, this);
	
	SoundSFX.play("sfx_btn_press_00");	
}


/**
 * Purchase confirm
 */
PowerupPurchaseOverlay.prototype.onBuyClick = function()
{
	this._prevScreen.buy();

	this.animateOut(function()
	{
		this.signals.requestedPreviousScreen.dispatch();
	}, this);
	
	SoundSFX.play("sfx_btn_press_00");
}

//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../general/SoundSFX":44,"../general/WireframeButton":45,"../screens/SimpleScreen":73}],64:[function(require,module,exports){
var Common       		= require("../Common");
var SimpleScreen 		= require("../screens/SimpleScreen");
var WireframeButton 	= require("../general/WireframeButton");
var SoundSFX            = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function PromoOverlay()
{
	SimpleScreen.call(this);

	// Pick one promo at random
	this._promoData = Common.savedData.getNewPromo();

	this.signals.linkClick = new signals.Signal();
}

module.exports = PromoOverlay;
PromoOverlay.prototype = Object.create(SimpleScreen.prototype);
PromoOverlay.prototype.constructor = PromoOverlay;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
PromoOverlay.prototype.init = function()
{
	SimpleScreen.prototype.init.call(this);

	// Background
	this._bg = new PIXI.Sprite(Common.generatedTextures['whiteSquare']);
	this._bg.alpha   = 0.75;
	this._bg.width   = Common.STAGE_WIDTH;
	this._bg.height  = Common.STAGE_HEIGHT;
	this._bg.hitArea = new PIXI.Rectangle(0, 0, Common.STAGE_WIDTH, Common.STAGE_HEIGHT);
	this._bg.tint    = 0x2c3a66;
	this._bg.interactive = true;
	this.addChild(this._bg);

	// Title
	this._title = new PIXI.Sprite(this._assetManager.getTexture("ui_title_bg"));
	this._title.anchor.set(0.5);
	this._title.x = Common.STAGE_WIDTH/2;
	this._title.y = 100;
	this.addChild(this._title);

		var copy = this._promoData.title;

		if(!webfont)
		{
			var title = new PIXI.extras.BitmapText(copy, {font: "42px Superclarendon Title Purple", align: "center"});
			title.x = -title.textWidth/2;
			title.y = -title.textHeight/2 - 4;
			this._title.addChild(title);
		}
		else
		{
			var title = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
			title.anchor = new PIXI.Point(0.5, 0.5);
			title.y = -6;
			this._title.addChild(title);
		}

	// Panel background
    this._messageBox = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_bg"));
	this._messageBox.anchor.set(0.5);
	this._messageBox.position.set(Common.STAGE_WIDTH/2, Common.STAGE_HEIGHT/2 + 70);
    this.addChild(this._messageBox);

	// this._messageBox.y -= 70;

		var promo = new PIXI.Container();
		this._messageBox.addChild(promo);

		promo.image = new PIXI.Sprite(PIXI.Texture.fromImage('assets/images/hd/comms/' + this._promoData.image));
		promo.image.anchor.set(0.5, 0);
		promo.image.y = -205;
		promo.image.interactive = true;
		promo.image.buttonMode = true;
		promo.addChild(promo.image);

		promo.image.touchstart = promo.image.mousedown = function(e)
		{
			this.onPromoClick();
		}.bind(this);

		var copy = this._promoData.text;

		if(!webfont)
		{
			promo.text = new PIXI.extras.BitmapText(copy, {font: "28px Mikadan White", align: "center", tint: 0x6d38ab});
			promo.text.maxWidth = 620;
			promo.text.updateText();
			promo.text.x = -promo.text.textWidth/2;
			promo.text.y = -promo.text.textHeight/2 + 170;
			promo.addChild(promo.text);
		}
		else
		{
			promo.text = new PIXI.Text(this._promoData.text, {font:"28px Arial", fill:0x000000, align:'center', wordWrap:true, wordWrapWidth:540});
			promo.text.anchor.set(0.5);
			promo.text.y = 170;
			promo.addChild(promo.text);
		}

		// promo.link = new PIXI.Text(this._promoData.url.replace("https://", "").replace("http://", ""), {font:"28px Arial", fill:0x000000, align:'center', wordWrap:true, wordWrapWidth:400});
		// promo.link.anchor.set(0.5);
		// promo.link.y = 192;
		// promo.link.interactive = true;
		// promo.link.buttonMode = true;
		// promo.addChild(promo.link);

		// promo.link.touchstart = promo.link.mousedown = function(e)
		// {
			// this.onPromoClick();
		// }.bind(this);

		// this._linkButton = new p3.Button
		// (
			// this._assetManager.getTexture("ui_btn_nav_out"),
			// this._assetManager.getTexture("ui_btn_nav_over"),
			// this._assetManager.getTexture("ui_btn_nav_down"),
			// this._assetManager.getTexture("ui_icon_nav_arrow")
		// );
		// this._linkButton.overSoundName = "sfx_btn_rollover_00";
		// this._linkButton.position.set(330, 100);
		// this._linkButton.signals.up.add(this.onPromoClick, this);
		// promo.addChild(this._linkButton);

	this._closeButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_secnav_out"),
		this._assetManager.getTexture("ui_btn_secnav_over"),
		this._assetManager.getTexture("ui_btn_secnav_down"),
		this._assetManager.getTexture("ui_icon_secnav_cross")
	);
	this._closeButton.overSoundName = "sfx_btn_rollover_00";
	this._closeButton.x = r2l ? -400 : 400;
    this._closeButton.y = -240;
	this._closeButton.signals.down.addOnce(this.onClose, this);
	this._messageBox.addChild(this._closeButton);

	this._messageBox.scale.set(0);
	this._closeButton.scale.set(0);

	// Don't show again
	Common.savedData.setPromoAsShown(this._promoData);
	Common.savedData.save();
};

/**
 */
PromoOverlay.prototype.update = function()
{
};

/**
 */
PromoOverlay.prototype.resize = function()
{

	SimpleScreen.prototype.resize.call(this);
};

/**
 */
PromoOverlay.prototype.dispose = function()
{

}

PromoOverlay.prototype.animateIn = function(callback, scope)
{
	// Dirty fix
	if(!!this.shown) return;
	this.shown = true;

	SimpleScreen.prototype.animateIn.call(this);

	this._title.scale = new PIXI.Point(0,0);
	this._messageBox.scale = new PIXI.Point(0,0);
	this._closeButton.scale = new PIXI.Point(0,0);

	this._bg.alpha = 0;

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,                .5, {alpha:0.75, ease:Sine.easeOut}, 0);
		tl.to(this._title.scale,       .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._messageBox.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._closeButton.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0.6);
	Common.animator.add(tl);
};

PromoOverlay.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,               .5, {alpha:0, ease:Sine.easeIn},  0);
		tl.to(this._title.scale,      .5, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._messageBox.scale, .5, {x:0, y:0, ease:Back.easeIn}, 0);
	Common.animator.add(tl);
};


/**
 */
PromoOverlay.prototype.onPromoClick = function()
{
	// Event Tracking
	// Common.ctow.trackEvent(
	// {
		// event      : "game_action",
		// game_tier1 : "com_screen",
		// game_tier2 : "slide" + (this._currentcomm+1)
	// });

	// Open a new window
	// var win = window.open(this._promoData.url, '_system');
	// win.focus();

	this.signals.linkClick.dispatch(this._promoData.url, !!this._promoData.disney);
	SoundSFX.play("sfx_btn_press_00");
}

//===================================================
// PRIVATE METHODS
//===================================================



//===================================================
// EVENTS
//===================================================

PromoOverlay.prototype.onClose = function()
{
	this.animateOut(function()
	{
		this.signals.requestedPreviousScreen.dispatch();
	}, this);

	SoundSFX.play("sfx_btn_press_00");
}

//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../general/SoundSFX":44,"../general/WireframeButton":45,"../screens/SimpleScreen":73}],65:[function(require,module,exports){
var Common       		= require("../Common");
var SimpleScreen 		= require("../screens/SimpleScreen");
var WireframeButton 	= require("../general/WireframeButton");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function RewardOverlay(content, callback, scope)
{
    this._content = content;
    this._callback = callback;
    this._scope = scope;

    this._closeButton = null;

	SimpleScreen.call(this);
}

module.exports = RewardOverlay;
RewardOverlay.prototype = Object.create(SimpleScreen.prototype);
RewardOverlay.prototype.constructor = RewardOverlay;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
RewardOverlay.prototype.init = function()
{
	SimpleScreen.prototype.init.call(this);

	// Background
	this._bg = new PIXI.Sprite(Common.generatedTextures['whiteSquare']);
	this._bg.alpha   = 0.75;
	this._bg.width   = Common.STAGE_WIDTH;
	this._bg.height  = Common.STAGE_HEIGHT;
	this._bg.hitArea = new PIXI.Rectangle(0, 0, Common.STAGE_WIDTH, Common.STAGE_HEIGHT);
	this._bg.tint    = 0x2c3a66;
	this._bg.interactive = true;
	this.addChild(this._bg);

	// Title
	this._title = new PIXI.Sprite(this._assetManager.getTexture("ui_title_bg"));
	this._title.anchor.set(0.5);
	this._title.x = Common.STAGE_WIDTH/2;
	this._title.y = 100;
	this.addChild(this._title);

		var copy = this._assetManager.getJSON("strings")["SURPRISE"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var title = new PIXI.extras.BitmapText(copy, {font: "42px Superclarendon Title Purple", align: "center"});
			title.x = -title.textWidth/2;
			title.y = -title.textHeight/2 - 4;
			this._title.addChild(title);
		}
		else
		{
			var title = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
			title.anchor.set(0.5);
			title.y = -6;
			this._title.addChild(title);
		}

	// Panel background
    this._messageBox = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_bg"));
	this._messageBox.anchor.set(0.5);
	this._messageBox.position.set(Common.STAGE_WIDTH/2, Common.STAGE_HEIGHT/2 + 70);
    this.addChild(this._messageBox);

		var bg = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_snowflakes_bg"));
		bg.anchor.set(0.5);
		bg.position.set(0, -40);
		this._messageBox.addChild(bg);

		this._messageBox.value = new PIXI.extras.BitmapText("" + this._assetManager.getJSON("config").lossStreak.reward, {font: "56px Superclarendon Numbers", align: "center"});
		this._messageBox.value.x = - this._messageBox.value.textWidth/2;
		this._messageBox.value.y = - this._messageBox.value.textHeight/2 - 62;
		this._messageBox.addChild(this._messageBox.value);

		var copy = this._assetManager.getJSON("strings")["REWARD_MESSAGE"][Common.COUNTRY_CODE];
		copy = copy.replace("{value}", this._assetManager.getJSON("config").lossStreak.reward);

		if(!webfont)
		{
			this._messageBox.message = new PIXI.extras.BitmapText(copy, {font: "36px Superclarendon Title Purple", align: "center"});
			this._messageBox.message.x = - this._messageBox.message.textWidth/2;
			this._messageBox.message.y = - this._messageBox.message.textHeight/2 + 140;
			this._messageBox.addChild(this._messageBox.message);
		}
		else
		{
			this._messageBox.message = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
			this._messageBox.message.anchor.set(0.5);
			this._messageBox.message.position.set(0, 150);
			this._messageBox.addChild(this._messageBox.message);
		}


	this._closeButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_secnav_out"),
		this._assetManager.getTexture("ui_btn_secnav_over"),
		this._assetManager.getTexture("ui_btn_secnav_down"),
		this._assetManager.getTexture("ui_icon_secnav_cross")
	);
	this._closeButton.x = r2l ? -400 : 400;
    this._closeButton.y = -240;
	this._closeButton.signals.down.addOnce(this.onClose, this);
	this._messageBox .addChild(this._closeButton);

	this._messageBox.scale.set(0);
	this._closeButton.scale.set(0);

	// Actual reward
	Common.savedData.coins += this._assetManager.getJSON("config").lossStreak.reward;
	Common.savedData.lossStreak.awarded = true;
	Common.savedData.save();
};

/**
 */
RewardOverlay.prototype.update = function()
{
};

/**
 */
RewardOverlay.prototype.resize = function()
{

	SimpleScreen.prototype.resize.call(this);
};

/**
 */
RewardOverlay.prototype.dispose = function()
{

}

RewardOverlay.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);

	this._title.scale = new PIXI.Point(0,0);
	this._messageBox.scale = new PIXI.Point(0,0);
	this._closeButton.scale = new PIXI.Point(0,0);

	this._bg.alpha = 0;

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,                .5, {alpha:0.75, ease:Sine.easeOut}, 0);
		tl.to(this._title.scale,       .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._messageBox.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 0);
		tl.to(this._closeButton.scale, .5, {x:1, y:1, ease:Back.easeOut}, 0.6);
	Common.animator.add(tl);
};

RewardOverlay.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._bg,               .5, {alpha:0, ease:Sine.easeIn},  0);
		tl.to(this._title.scale,      .5, {x:0, y:0, ease:Back.easeIn}, 0);
		tl.to(this._messageBox.scale, .5, {x:0, y:0, ease:Back.easeIn}, 0);
	Common.animator.add(tl);
};



//===================================================
// PRIVATE METHODS
//===================================================



//===================================================
// EVENTS
//===================================================

RewardOverlay.prototype.onClose = function()
{
	this.animateOut(function()
	{
		this.signals.requestedPreviousScreen.dispatch();
	}, this);
}

//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../general/WireframeButton":45,"../screens/SimpleScreen":73}],66:[function(require,module,exports){
var Common       		 = require("../Common");
var SimpleScreen 		 = require("./SimpleScreen");
var WireframeButton 	 = require("../general/WireframeButton");
var CharacterSelectPanel = require("../general/CharacterSelectPanel");
var SoundSFX             = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function CharacterSelectScreen(level)
{
	this._level = !!level ? level : 0;

	this._characterHolder  = null;
	this._characterPanels  = [];
    this._currentCharacter = 0;
	this._isAnimating = false;

    this._leftButton    = null;
    this._rightButton   = null;

	SimpleScreen.call(this);

	this.signals.buyPressed = new signals.Signal();
	this.signals.characterUnlocked = new signals.Signal();
}

module.exports = CharacterSelectScreen;
CharacterSelectScreen.prototype = Object.create(SimpleScreen.prototype);
CharacterSelectScreen.prototype.constructor = CharacterSelectScreen;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 * Initialization
 */
CharacterSelectScreen.prototype.init = function()
{
	SimpleScreen.prototype.init.call(this);

	// Show unlocked character
	// Common.savedData.showUnlockedCharacter = "olaf"; // DEBUG
	if(!!Common.savedData.showUnlockedCharacter)
	{
		Common.savedData.character = Common.savedData.showUnlockedCharacter;
		Common.animator.setTimeout(function()
		{
			this.signals.characterUnlocked.dispatch(Common.savedData.showUnlockedCharacter);
			Common.savedData.showUnlockedCharacter = null;
			Common.savedData.save();
		},0.8, this)
	}

	// Background
	this._bg = new PIXI.Sprite(this._assetManager.getTexture("ui_bg_characters"));
    this.addChild(this._bg);

	// Character panels
    this._characterHolder = new PIXI.Container();
    this._characterHolder.x = Common.STAGE_WIDTH / 2;
    this._characterHolder.y = (Common.STAGE_HEIGHT / 2) + 40;
    this.addChild(this._characterHolder);

	this._playableCharacters = this._assetManager.getJSON("config").playableCharacters;
	this._characterData      = $.extend(true, this._assetManager.getJSON("config").characters, this._assetManager.getJSON("strings").characters);

	for(var i = 0; i < this._playableCharacters.length; i++)
	{
		if(!Common.savedData.charactersUnlocked[this._playableCharacters[i]]) break;

		var characterPanel = new CharacterSelectPanel(this, this._characterData[this._playableCharacters[i]]);
		this._characterHolder.addChild(characterPanel);

		// Set the current character as default
		if(this._playableCharacters[i] == Common.savedData.character)
		{
			this._currentCharacter = i;
		}
		else
		{
			characterPanel.alpha = 0;
			characterPanel.visible = false;
		}

		this._characterPanels.push(characterPanel);
	}

	// Title (character name)
	if(!webfont)
	{
		this._title = new PIXI.extras.BitmapText(this._characterData[Common.savedData.character].name[Common.COUNTRY_CODE], {font: "64px Superclarendon Title", align: "center"});
		this._title.x = - this._title.textWidth/2  + Common.STAGE_WIDTH/2;
		this._title.y = - this._title.textHeight/2 + 100;
		this.addChild(this._title);
	}
	else
	{
		this._title = new PIXI.Text(this._characterData[Common.savedData.character].name[Common.COUNTRY_CODE], {font:"60px Arial", fill:0xffffff, align:'center'});
		this._title.position.set(Common.STAGE_WIDTH / 2, 100);
		this._title.anchor.set(0.5);
		this.addChild(this._title);
	}

	// Coins
	this.initCoinCointainer();

	// Left/right button - if more than one character has been unlocked
	if(Common.savedData.getUnlockedCharacterCount() > 1)
	{
		this._leftButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_sidenav_out"),
			this._assetManager.getTexture("ui_btn_sidenav_over"),
			this._assetManager.getTexture("ui_btn_sidenav_down"),
			this._assetManager.getTexture("ui_icon_sidenav_arrow")
		);
		this._leftButton.children[0].anchor.set(0, 0.5);
		this._leftButton.children[1].anchor.set(0, 0.5);
		this._leftButton.y = Common.STAGE_HEIGHT / 2;
		this._leftButton.signals.down.add(this.onLeftDown, this);
		this._leftButton.overSoundName = "sfx_btn_rollover_00";
		this.addChild(this._leftButton);

		this._rightButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_sidenav_out"),
			this._assetManager.getTexture("ui_btn_sidenav_over"),
			this._assetManager.getTexture("ui_btn_sidenav_down"),
			this._assetManager.getTexture("ui_icon_sidenav_arrow")
		);
		this._rightButton.scale.x = -1;
		this._rightButton.children[0].anchor.set(0, 0.5);
		this._rightButton.children[1].anchor.set(0, 0.5);
		this._rightButton.y = Common.STAGE_HEIGHT / 2;
		this._rightButton.signals.down.add(this.onRightDown, this);
		this._rightButton.overSoundName = "sfx_btn_rollover_00";
		this.addChild(this._rightButton);
	}


	// UI

	// Play button
	this._playButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_nav_out_big"),
		this._assetManager.getTexture("ui_btn_nav_over_big"),
		this._assetManager.getTexture("ui_btn_nav_down_big"),
		this._assetManager.getTexture("ui_icon_nav_play")
	);
	this._playButton.y = Common.STAGE_HEIGHT-120;
	this._playButton.signals.down.add(this.onPlayPressed, this);
	this._playButton.overSoundName = "sfx_btn_rollover_00";
	this.addChild(this._playButton);

	// Back button
	this._backButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_con_out"),
		this._assetManager.getTexture("ui_btn_con_over"),
		this._assetManager.getTexture("ui_btn_con_down"),
		this._assetManager.getTexture("ui_icon_con_back")
	);
	this._backButton.y = this._guiButtonTopMargin;
	this._backButton.scale = new PIXI.Point(1, 1);
	this._backButton.signals.down.add(this.onBackPressed, this);
	this._backButton.overSoundName = "sfx_btn_rollover_00";
	this.addChild(this._backButton);

	// Help button
	this._helpButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_con_out"),
		this._assetManager.getTexture("ui_btn_con_over"),
		this._assetManager.getTexture("ui_btn_con_down"),
		this._assetManager.getTexture("ui_icon_con_help")
	);
	this._helpButton.y = this._guiButtonTopMargin;
	this._helpButton.signals.down.add(this.onHelpPressed, this);
	this._helpButton.overSoundName = "sfx_btn_rollover_00";
	this.addChild(this._helpButton);

	// Mute button
	this._muteButton = new p3.MuteButton
	(
		this._assetManager.getTexture("ui_btn_con_out"),
		this._assetManager.getTexture("ui_btn_con_over"),
		this._assetManager.getTexture("ui_btn_con_down"),
		this._assetManager.getTexture("ui_icon_con_sound_on"),
		this._assetManager.getTexture("ui_icon_con_sound_off")
	);
	this._muteButton.overSoundName = "sfx_btn_rollover_00";
	this._muteButton.id = "mute";
	this._muteButton.y = this._guiButtonTopMargin;
	this._muteButton.init();
	this.addChild(this._muteButton);

	// Music
	if(!!Common.bgMusic) Common.bgMusic.fadeOut(0, 500);
	Common.bgMusic = SoundSFX.play('mx_frozen_02_character_selection', {loop:true, volume:0});
	Common.bgMusic.fadeIn(Common.bgMusicVolume, 500);
};

/**
 */
CharacterSelectScreen.prototype.update = function()
{
	this._characterPanels[this._currentCharacter].upgradePS.update(p3.Timestep.deltaTime);
};

/**
 */
CharacterSelectScreen.prototype.resize = function()
{
	SimpleScreen.prototype.resize.call(this);

	if(!!this._leftButton)
		this._leftButton.x  = this._getBorderButtonPositionLeft();
	if(!!this._rightButton)
		this._rightButton.x = this._getBorderButtonPositionRight();
	this._backButton.x  = this._getFirstButtonPositionLeft();
	this._muteButton.x  = this._getFirstButtonPositionRight();
	this._helpButton.x  = this._getSecondButtonPositionRight();
	// this._playButton.x  = r2l ? (this._getFirstButtonPositionLeft()+30) : (this._getFirstButtonPositionRight()-30);
	this._playButton.x = this._getFirstButtonPositionRight()-30;
};

/**
 */
CharacterSelectScreen.prototype.dispose = function()
{

}

/**
 */
CharacterSelectScreen.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);
};

/**
 */
CharacterSelectScreen.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);
};

//===================================================
// PRIVATE METHODS
//===================================================



//===================================================
// EVENTS
//===================================================

/**
 * Show the previous character
 */
CharacterSelectScreen.prototype.onLeftDown = function()
{
	if(this._isAnimating) return;
	this._isAnimating = true;

	if(!r2l)
	{
		var nextCharacter =  this._currentCharacter-1;
		if(nextCharacter < 0)
			nextCharacter = this._characterPanels.length-1;
	}
	else
	{
		var nextCharacter =  this._currentCharacter+1;
		if(nextCharacter >= this._characterPanels.length)
			nextCharacter = 0;
	}

	this._characterPanels[nextCharacter].x = -p3.View.width;
	this._characterPanels[nextCharacter].visible = true;

	this._characterPanels[this._currentCharacter].closeSubPanel();

	var tl = new TimelineMax(
	{
		onCompleteScope:this,
		onComplete:function()
		{
			this._characterPanels[this._currentCharacter].visible = false;
			this._currentCharacter = nextCharacter;
			this._isAnimating = false;
		}
	});
	tl.to(this._characterPanels[this._currentCharacter],  .5, {x:+p3.View.width, alpha:0, ease:Sine.easeInOut}, 0);
	tl.to(this._characterPanels[nextCharacter],  .5, {x:0, alpha:1, ease:Sine.easeInOut}, 0);
	Common.animator.add(tl);

	var tl = new TimelineMax();
	tl.to(this._title,  .25, {alpha:0, ease:Sine.easeInOut, onCompleteScope:this, onComplete:function()
	{
		this._title.x += this._title.textWidth/2;
		this._title.text = this._characterData[this._playableCharacters[nextCharacter]].name[Common.COUNTRY_CODE];
		this._title.validate(); // Forces the text to update the sizes
		this._title.x -= this._title.textWidth/2;
	}}, 0);
	tl.to(this._title,  .25, {alpha:1, ease:Sine.easeInOut});
	Common.animator.add(tl);

	SoundSFX.play("sfx_btn_press_00");

	Common.savedData.character = this._characterData[this._playableCharacters[nextCharacter]].id;
}

/**
 * Show the next character
 */
CharacterSelectScreen.prototype.onRightDown = function()
{
	if(this._isAnimating) return;
	this._isAnimating = true;

	if(!r2l)
	{
		var nextCharacter =  this._currentCharacter+1;
		if(nextCharacter >= this._characterPanels.length)
			nextCharacter = 0;
	}
	else
	{
		var nextCharacter =  this._currentCharacter-1;
		if(nextCharacter < 0)
			nextCharacter = this._characterPanels.length-1;
	}

	this._characterPanels[nextCharacter].x = p3.View.width;
	this._characterPanels[nextCharacter].visible = true;

	this._characterPanels[this._currentCharacter].closeSubPanel();

	var tl = new TimelineMax(
	{
		onCompleteScope:this,
		onComplete:function()
		{
			this._characterPanels[this._currentCharacter].visible = false;
			this._currentCharacter = nextCharacter;
			this._isAnimating = false;
		}
	});
	tl.to(this._characterPanels[this._currentCharacter],  .5, {x:-p3.View.width, alpha:0, ease:Sine.easeInOut}, 0);
	tl.to(this._characterPanels[nextCharacter],  .5, {x:0, alpha:1, ease:Sine.easeInOut}, 0);
	Common.animator.add(tl);

	var tl = new TimelineMax();
	tl.to(this._title,  .25, {alpha:0, ease:Sine.easeInOut, onCompleteScope:this, onComplete:function()
	{
		if(!webfont)
		{
			this._title.x += this._title.textWidth/2;
			this._title.text = this._characterData[this._playableCharacters[nextCharacter]].name[Common.COUNTRY_CODE];
			this._title.validate();
			this._title.x -= this._title.textWidth/2;
		}
		else
		{
			this._title.text = this._characterData[this._playableCharacters[nextCharacter]].name[Common.COUNTRY_CODE];
		}
	}}, 0);
	tl.to(this._title,  .25, {alpha:1, ease:Sine.easeInOut});
	Common.animator.add(tl);

	SoundSFX.play("sfx_btn_press_00");

	Common.savedData.character = this._characterData[this._playableCharacters[nextCharacter]].id;
}

/**
 * Return to the previous screen
 */
CharacterSelectScreen.prototype.onBackPressed = function()
{
	this.signals.requestedPreviousScreen.dispatch("back");

	SoundSFX.play("sfx_btn_press_00");
};

/**
 * Show the help overlay
 */
CharacterSelectScreen.prototype.onHelpPressed = function(e)
{
	this.signals.GUIButtonClicked.dispatch("help");
	SoundSFX.play("sfx_btn_press_00");
}

/**
 * Start the level
 */
CharacterSelectScreen.prototype.onPlayPressed = function()
{
	this.signals.requestedNextScreen.dispatch();

	// Music end
	Common.bgMusic.fadeOut(0, 600);

	SoundSFX.play("sfx_btn_press_00");
}


//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../general/CharacterSelectPanel":40,"../general/SoundSFX":44,"../general/WireframeButton":45,"./SimpleScreen":73}],67:[function(require,module,exports){
var Common       		= require("../Common");
var SimpleScreen 		= require("./SimpleScreen");
var WireframeButton 	= require("../general/WireframeButton");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function DailyBonusScreen()
{
	this._snowFlakePrizes = null;

	SimpleScreen.call(this);

	this.signals.prizeSelected = new signals.Signal();
}

module.exports = DailyBonusScreen;
DailyBonusScreen.prototype = Object.create(SimpleScreen.prototype);
DailyBonusScreen.prototype.constructor = DailyBonusScreen;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
DailyBonusScreen.prototype.init = function()
{
	SimpleScreen.prototype.init.call(this);

	// Background
	this._bg = new PIXI.Sprite(this._assetManager.getTexture("ui_bg_daily_bonus"));
    this.addChild(this._bg);

	// Title
	this._title = new PIXI.Sprite(this._assetManager.getTexture("ui_title_bg"));
	this._title.anchor = new PIXI.Point(0.5, 0.5);
	this._title.x = Common.STAGE_WIDTH/2;
	this._title.y = 100;
	this.addChild(this._title);

		var copy  = this._assetManager.getJSON("strings")["DAILY_BONUS"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var title = new PIXI.extras.BitmapText(copy, {font: "42px Superclarendon Title Purple", align: "center"});
			title.x = -title.textWidth/2;
			title.y = -title.textHeight/2 - 4;
			this._title.addChild(title);
		}
		else
		{
			var title = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
			title.anchor = new PIXI.Point(0.5, 0.5);
			title.y = -6;
			this._title.addChild(title);
		}

	var copy = this._assetManager.getJSON("strings")["DAILY_BONUS_DESC"][Common.COUNTRY_CODE];

	if(!webfont)
	{
		this._description  = new PIXI.extras.BitmapText(copy, {font: "28px Mikadan Title", align: "center"});
		this._description .x = -this._description.textWidth/2  + Common.STAGE_WIDTH / 2;
		this._description .y = -this._description.textHeight/2 + (Common.STAGE_HEIGHT / 2) - 190;
		this.addChild(this._description);
	}
	else
	{
		this._description = new PIXI.Text(copy, {font:"30px Arial", fill:0xFFFFFF, align:'center'});
		this._description.anchor.x = 0.5;
		this._description.x = Common.STAGE_WIDTH / 2;
		this._description.y = (Common.STAGE_HEIGHT / 2) - 220;
		this.addChild(this._description);
	}

	// Snowflakes
    this._snowflakeHolder = new PIXI.Container();
    this._snowflakeHolder.position.set(Common.STAGE_WIDTH / 2, Common.STAGE_HEIGHT / 2 + 50);
    this.addChild(this._snowflakeHolder);

    var snowflakePrizes  = this._assetManager.getJSON("config").dailyBonus;
	var randomPrizeIndex = Math.floor(Math.random() * snowflakePrizes.length);
	this._snowflakes = [];

	var coords =
	[
		{x : -220, y: -100},
		{x : 0,    y: -50},
		{x : 250,  y: -75},
		{x : -290, y: 140},
		{x : 50,   y: 180},
		{x : 300,  y: 150}
	]

    for(var i = 0; i < 6; i++)
    {
    	var snowflake = new PIXI.Container();
		snowflake.position = coords[i];
		snowflake.scale.set(0);
		snowflake.prize = snowflakePrizes[(randomPrizeIndex + i) % snowflakePrizes.length];

		snowflake.sprite = new PIXI.Sprite(this._assetManager.getTexture("ui_bonus_snowflake_" + (i+1)));
		snowflake.sprite.anchor.set(0.5);
		snowflake.addChild(snowflake.sprite);

		this._snowflakeHolder.addChild(snowflake);
		this._snowflakes.push(snowflake);

		snowflake.text = new PIXI.extras.BitmapText("" + snowflake.prize, {font: "48px Superclarendon Numbers", align: "center"});
		snowflake.text.x -= snowflake.text.textWidth/2;
		snowflake.text.y -= snowflake.text.textHeight/2;
		snowflake.text.alpha = 0;
		snowflake.addChild(snowflake.text);

		// snowflake.text = new PIXI.Text("" + snowflake.prize, {font:"48px Arial", fill:0x000000, align:'center'});
		// snowflake.text.anchor.set(0.5);
		// snowflake.text.alpha = 0;
		// snowflake.addChild(snowflake.text);

		snowflake.tween = new TimelineMax();

			var delay = 0.5 + 0.25 * i;
			var duration = 1;
			snowflake.tween.to(snowflake.scale, duration, {x: 1, y: 1, ease:Elastic.easeOut}, delay);
			snowflake.tween.to(snowflake.scale, 2 + Math.random() * 4, {x: 0.75, y: 0.75, ease:Sine.easeInOut, repeat:-1, yoyo:true}, delay + duration);
			snowflake.tween.to(snowflake, 2 + Math.random()* 3, {x: snowflake.x + 40 * (-1 + 2 * Math.random()), ease:Sine.easeInOut, repeat:-1, yoyo:true}, 0);
			snowflake.tween.to(snowflake, 2 + Math.random()* 3, {y: snowflake.y + 40 * (-1 + 2 * Math.random()), ease:Sine.easeInOut, repeat:-1, yoyo:true}, 0);
			snowflake.tween.to(snowflake.sprite, 30 + Math.random()* 30, {rotation: Math.PI*2 * (Math.floor(Math.random()*2)*2-1), ease:Sine.easeInOut, repeat:-1, yoyo:true}, 0);
		Common.animator.add(snowflake.tween);
    }

	// Panel background
    this._messageBox = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_bg"));
	this._messageBox.anchor.set(0.5);
	this._messageBox.position.set(Common.STAGE_WIDTH/2, Common.STAGE_HEIGHT/2 + 70);
    this.addChild(this._messageBox);

		var bg = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_snowflakes_bg"));
		bg.anchor.set(0.5);
		bg.position.set(0, -40);
		this._messageBox.addChild(bg);

		this._messageBox.value = new PIXI.extras.BitmapText("??", {font: "56px Superclarendon Numbers", align: "center"});
		this._messageBox.value.x = - this._messageBox.value.textWidth/2;
		this._messageBox.value.y = - this._messageBox.value.textHeight/2 - 62;
		this._messageBox.addChild(this._messageBox.value);

		// this._messageBox.value = new PIXI.Text("??", {font:"48px Arial", fill:0x000000, align:'center'});
		// this._messageBox.value.anchor.set(0.5);
		// this._messageBox.value.position.set(0, -65);
		// this._messageBox.addChild(this._messageBox.value);

		var copy = this._assetManager.getJSON("strings")["REWARD_MESSAGE"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			this._messageBox.message = new PIXI.extras.BitmapText(copy, {font: "36px Superclarendon Title Purple", align: "center"});
			this._messageBox.message.x = - this._messageBox.message.textWidth/2;
			this._messageBox.message.y = - this._messageBox.message.textHeight/2 + 140;
			this._messageBox.addChild(this._messageBox.message);
		}
		else
		{
			this._messageBox.message = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
			this._messageBox.message.anchor.set(0.5);
			this._messageBox.message.position.set(0, 150);
			this._messageBox.addChild(this._messageBox.message);
		}

	this._closeButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_secnav_out"),
		this._assetManager.getTexture("ui_btn_secnav_over"),
		this._assetManager.getTexture("ui_btn_secnav_down"),
		this._assetManager.getTexture("ui_icon_secnav_cross")
	);
	this._closeButton.x = 400;
    this._closeButton.y = -240;
	this._closeButton.signals.down.addOnce(this.onClose, this);
	this._messageBox .addChild(this._closeButton);

	this._messageBox.scale.set(0);
	this._closeButton.scale.set(0);

	// HitArea
	this._hitArea = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	this._hitArea.alpha = 0;
	this._hitArea.width = Common.STAGE_WIDTH;
	this._hitArea.height = Common.STAGE_HEIGHT;
	this._hitArea.interactive = true;
	this._hitArea.touchstart  = this._hitArea.mousedown = this.onTouch.bind(this);
	this.addChild(this._hitArea);

	// Event Tracking
	Common.ctow.trackEvent(
	{
		event      : "game_action",
		game_tier1 : "daily_bonus"
	});
};

/**
 */
DailyBonusScreen.prototype.update = function()
{
	// Particles update
	if(!!this.rewardPS)
		this.rewardPS.update(p3.Timestep.deltaTime);
};

/**
 */
DailyBonusScreen.prototype.resize = function()
{
	SimpleScreen.prototype.resize.call(this);
};

/**
 */
DailyBonusScreen.prototype.dispose = function()
{

}

DailyBonusScreen.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);
};

DailyBonusScreen.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);
};



//===================================================
// PRIVATE METHODS
//===================================================



//===================================================
// EVENTS
//===================================================

DailyBonusScreen.prototype.onTouch = function(e)
{
	var clickPosition = e.data.getLocalPosition(this._snowflakeHolder);
	this._hitArea.interactive = false;

	// Find the closest snowflake
	var minDistance = 0;
	var index = -1;

	for(var i = 0; i < this._snowflakes.length; i++)
	{
		var distance = Math.sqrt(Math.pow(this._snowflakes[i].x - clickPosition.x,2) + Math.pow(this._snowflakes[i].y - clickPosition.y, 2));

		if(index == -1 || distance < minDistance)
		{
			index = i;
			minDistance = distance;
		}
	}


	// Make all the snowflake fall except the chosen one
	for(var i = 0; i < this._snowflakes.length; i++)
	{
		this._snowflakes[i].tween.kill();

		this._snowflakes[i].tween = new TimelineMax();

		if(i != index)
		{
			// Other snowflakes
			this._snowflakes[i].tween.to(this._snowflakes[i], 1.5, {alpha: 0, ease:Quad.easeInOut}, 0);
			this._snowflakes[i].tween.to(this._snowflakes[i], 1.5, {y: this._snowflakes[i].y + 100 + 300 * Math.random(), ease:Sine.easeIn}, 0);
			this._snowflakes[i].tween.to(this._snowflakes[i].scale,  1.5, {x: 0.5, y: 0.5, ease:Sine.easeIn}, 0);
			this._snowflakes[i].tween.to(this._snowflakes[i].text, 0.1, {alpha: 1, ease:Sine.easeOut}, 0);
		}
		else
		{
			// Clicked snowflake
			this._snowflakes[i].tween.to(this._snowflakes[i], 1, {x: 0, y: 20, ease:Sine.easeInOut}, 0);
			this._snowflakes[i].tween.to(this._snowflakes[i].scale,  1, {x: 1.6, y: 1.6, ease:Sine.easeInOut}, 0);
			this._snowflakes[i].tween.to(this._snowflakes[i].text, 1, {alpha: 1, ease:Sine.easeOut}, 0);

			this._snowflakes[i].tween.to(this._snowflakes[i].scale, 1, {x: 1.4, y: 1.4, ease:Sine.easeInOut, repeat:-1, yoyo:true}, 1);
			this._snowflakes[i].tween.to(this._snowflakes[i].sprite, 30, {rotation: this._snowflakes[i].rotation + Math.PI*2 * (Math.floor(Math.random()*2)*2-1), ease:Sine.easeInOut, repeat:-1, yoyo:true}, 0);

			this._snowflakes[i].tween.to(this._snowflakes[i], 0.5, {alpha: 0, ease:Sine.easeOut}, 1.75);
		}

		Common.animator.add(this._snowflakes[i].tween);
	}


	this.rewardPS = new cloudkid.Emitter(this._snowflakes[index],
	[
		this._assetManager.getTexture("particle_snowflake_offset_00"),
		this._assetManager.getTexture("particle_snowflake_offset_01"),
		this._assetManager.getTexture("particle_snowflake_offset_02"),
		this._assetManager.getTexture("particle_snowflake_offset_03")
	], this._assetManager.getJSON("particle_reward"));

	this.rewardPS.emit = true;

	// Show the notice
	this._messageBox.value.x += this._messageBox.value.textWidth/2;
	this._messageBox.value.text = this._snowflakes[index].prize;
	this._messageBox.value.validate();
	this._messageBox.value.x -= this._messageBox.value.textWidth/2;

	if(!webfont)
	{
		this._messageBox.message.x += this._messageBox.message.textWidth/2;
		this._messageBox.message.text = this._messageBox.message.text.replace("{value}", this._snowflakes[index].prize);
		this._messageBox.message.validate();
		this._messageBox.message.x -= this._messageBox.message.textWidth/2;
	}
	else
	{
		this._messageBox.message.text = this._messageBox.message.text.replace("{value}", this._snowflakes[index].prize);
	}

	var tl = new TimelineMax();
		tl.to(this._description,        .5, {alpha: 0, ease:Sine.easeOut}, 1.75);
		tl.to(this._messageBox.scale,   .5, {x:1, y:1, ease:Back.easeOut}, 1.75);
		tl.to(this._closeButton.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 2.25);
	Common.animator.add(tl);

	// Store
	Common.savedData.awardDailyBonus(this._snowflakes[index].prize);
	Common.savedData.save();
}

DailyBonusScreen.prototype.onClose = function()
{
	this.signals.requestedNextScreen.dispatch();
}

//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../general/WireframeButton":45,"./SimpleScreen":73}],68:[function(require,module,exports){
var Common                  = require("../Common");
var Editor                  = require("../editor/Editor");
var SimpleScreen            = require("./SimpleScreen");


//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function EditorScreen()
{
	SimpleScreen.call(this);
}
module.exports = EditorScreen;
EditorScreen.prototype = Object.create(SimpleScreen.prototype);
EditorScreen.prototype.constructor = EditorScreen;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
EditorScreen.prototype.init = function()
{
	console.log("EDITOR INITIALIZED");

	// HitArea
	this.hitArea = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	this.hitArea.alpha  = 0;
	this.hitArea.width  = Common.STAGE_WIDTH;
	this.hitArea.height = Common.STAGE_HEIGHT;
	this.hitArea.interactive = true;
	this.addChild(this.hitArea);

	this.mouse =
	{
		position         : new PIXI.Point(0,0),
		lastPosition     : new PIXI.Point(0,0),
		movement         : new PIXI.Point(0,0),
		leftPressed      : false,
		leftJustPressed  : false,
		centerPressed    : false,
		rightPressed     : false,
		rightJustPressed : false,
		update           : function()
		{
			this.leftJustPressed = false;
			this.rightJustPressed = false;
			this.movement.x = this.position.x - this.lastPosition.x;
			this.movement.y = this.position.y - this.lastPosition.y;
			this.lastPosition.x = this.position.x;
			this.lastPosition.y = this.position.y;
		}
	}

	document.getElementById('canvas').onmousedown = function(e)
	{
		e.preventDefault();
		switch(e.which)
		{
			case 1:
				this.mouse.leftPressed = true;
				this.mouse.leftJustPressed = true;
				break;
			case 2:
				this.mouse.centerPressed = true;
				break;
			case 3:
				this.mouse.rightPressed = true;
				this.mouse.rightJustPressed = true;
				break;
		};

	}.bind(this);

	document.getElementById('canvas').onmouseup = function(e)
	{
		switch(e.which)
		{
			case 1:
				this.mouse.leftPressed = false;
				break;
			case 2:
				this.mouse.centerPressed = false;
				break;
			case 3:
				this.mouse.rightPressed = false;
				break;
		};
	}.bind(this);

	this.hitArea.mousemove = function(e)
	{
		this.mouse.position.x = e.data.getLocalPosition(this).x;
		this.mouse.position.y = e.data.getLocalPosition(this).y;
	}.bind(this);


	this.editor = new Editor();
	this.editor.mouse = this.mouse;
	this.addChild(this.editor);
	this.editor.init();

	SimpleScreen.prototype.init.call(this);
}


/**
 */
EditorScreen.prototype.update = function()
{
	this.editor.update();

	this.mouse.update();
}

/**
 */
EditorScreen.prototype.resize = function()
{
	SimpleScreen.prototype.resize.call(this);
}

/**
 */
EditorScreen.prototype.dispose = function()
{

}

/**
 * @param {Function=} callback
 * @param {*=}scope
 */
EditorScreen.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);
}

/**
 * @param {Function=} callback
 * @param {*=} scope
 */
EditorScreen.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);
}


/**
 */
EditorScreen.prototype.hideGUI = function(callback, scope)
{
	this._paused = true;
	TweenMax.pauseAll();
}

/**
 */
EditorScreen.prototype.showGUI = function()
{
	this._paused = false;
	TweenMax.resumeAll();
}


//===================================================
// PRIVATE METHODS
//===================================================




//===================================================
// EVENTS
//===================================================



//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../editor/Editor":9,"./SimpleScreen":73}],69:[function(require,module,exports){
var Common                  = require("../Common");
var SimpleScreen            = require("./SimpleScreen");
var SoundSFX                = require("../general/SoundSFX");
var Level                   = require("../game/Level");
var GameUI                  = require("../game/GameUI");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function GameScreen()
{
	SimpleScreen.call(this);

	this._paused = false;

	this.signals.pausePressed     = new signals.Signal();
	this.signals.showInstructions = new signals.Signal();
}
module.exports = GameScreen;
GameScreen.prototype = Object.create(SimpleScreen.prototype);
GameScreen.prototype.constructor = GameScreen;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
GameScreen.prototype.init = function()
{
	console.log("GAME INITIALIZED");

	SimpleScreen.prototype.init.call(this);

	// Level
	if(Common.savedData.levelDebug != "")
	{
		var config = JSON.parse(Common.savedData.levelDebug);

		if(config.length)
		{
			this._level = new Level(false, "", "theme_01_");
			this._level.config = JSON.parse(Common.savedData.levelDebug);
		}
		else
		{
			this._level = new Level(true,
			{
				start : ["endless_start_000"],
				parts : [],
				partDebug : config
			}, "theme_01_");

		}

		Common.savedData.levelDebug = "";
		Common.savedData.save();
	}
	else if(!Common.savedData.endless)
	{
		var levelName = "";

		switch(Common.savedData.level)
		{
			case 0:
				this._level = new Level(false, "level_00", "theme_01_");
				break;

			default:
			case 1:
				this._level = new Level(false, "level_01", "theme_0" + (((Common.savedData.level-1)%3)+1) + "_");
				break;

			case 2:
				this._level = new Level(false, "level_02", "theme_0" + (((Common.savedData.level-1)%3)+1) + "_");
				break;

			case 3:
				this._level = new Level(false, "level_03", "theme_0" + (((Common.savedData.level-1)%3)+1) + "_");
				break;

			case 4:
				this._level = new Level(false, "level_04", "theme_0" + (((Common.savedData.level-1)%3)+1) + "_");
				break;

			case 5:
				this._level = new Level(false, "level_05", "theme_0" + (((Common.savedData.level-1)%3)+1) + "_");
				break;

			case 6:
				this._level = new Level(false, "level_06", "theme_0" + (((Common.savedData.level-1)%3)+1) + "_");
				break;

			case 7:
				this._level = new Level(false, "level_07", "theme_0" + (((Common.savedData.level-1)%3)+1) + "_");
				break;

			case 8:
				this._level = new Level(false, "level_08", "theme_0" + (((Common.savedData.level-1)%3)+1) + "_");
				break;

			case 9:
				this._level = new Level(false, "level_09", "theme_0" + (((Common.savedData.level-1)%3)+1) + "_");
				break;

			case 10:
				this._level = new Level(false, "level_10", "theme_0" + (((Common.savedData.level-1)%3)+1) + "_");
				break;

			case 11:
				this._level = new Level(false, "level_11", "theme_0" + (((Common.savedData.level-1)%3)+1) + "_");
				break;
		}
	}
	else
	{
		this._level = new Level(true,
		{
			start : ["endless_start_000"],
			parts :
			[
				"endless_part_000",
				"endless_part_001",
				"endless_part_002",
				"endless_part_003",
				"endless_part_004",
				"endless_part_005",
				"endless_part_006",
				"endless_part_007",
				"endless_part_008",
				"endless_part_009",
				"endless_part_010",
				"endless_part_011",
				"endless_part_012",
				"endless_part_013",
				"endless_part_014",
				"endless_part_015",
				"endless_part_016",
				"endless_part_017",
				"endless_part_018",
				"endless_part_019",
				"endless_part_020",
				"endless_part_021",
				"endless_part_022",
				"endless_part_023",
				"endless_part_024",
				"endless_part_025"
			],
		}, "theme_01_");
	}

	// Event Tracking
	Common.ctow.trackEvent(
	{
		event      : "game_start",
		game_level : Common.savedData.endless ? null : (Common.savedData.level+1),
		game_tier1 : "play_start",
		game_meta  : "{" +
						 "CharacterName=" + Common.savedData.character + "," +
						 "tumble="        + Common.savedData.charactersPower[Common.savedData.character][0] + "," +
						 "magnet="        + Common.savedData.charactersPower[Common.savedData.character][1] + "," +
						 "magic="         + Common.savedData.charactersPower[Common.savedData.character][2] +
					 "}"
	});


	this._level.init();
	this.addChild(this._level);

	// Level UI
	this.gameUI = new GameUI(this._level);
	this.gameUI.init();
	this.addChild(this.gameUI);

	// HitArea left: ability
	this._hitAreaLeft = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	this._hitAreaLeft.alpha = 0;
	this._hitAreaLeft.width = Common.STAGE_WIDTH/2;
	this._hitAreaLeft.height = Common.STAGE_HEIGHT;
	this._hitAreaLeft.interactive = true;

	// HitArea right: jump
	this._hitAreaRight = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	this._hitAreaRight.alpha = 0;
	this._hitAreaRight.x = Common.STAGE_WIDTH/2;
	this._hitAreaRight.width = Common.STAGE_WIDTH/2;
	this._hitAreaRight.height = Common.STAGE_HEIGHT;
	this._hitAreaRight.interactive = true;

	if(p3.Device.isMobile)
	{
		this.addChild(this._hitAreaRight);

		// Anna and pabbie don't have powers, they can only jump
		if(Common.savedData.character == "anna")
		{
			this._hitAreaRight.x = 0;
			this._hitAreaRight.width = Common.STAGE_WIDTH;
		}
		else
		{
			this.addChild(this._hitAreaLeft);
		}
	}
	else
	{
		this.addChild(this._hitAreaRight);
		this._hitAreaRight.x = 0;
		this._hitAreaRight.width = Common.STAGE_WIDTH;
	}


	//UI
	this._pauseButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_con_out"),
		this._assetManager.getTexture("ui_btn_con_over"),
		this._assetManager.getTexture("ui_btn_con_down"),
		this._assetManager.getTexture("ui_icon_con_pause")
	);
	this._pauseButton.y = this._guiButtonTopMargin - 20;
	this._pauseButton.scale.set(0);
	this._pauseButton.signals.down.add(this.onPausePressed, this);
	this._pauseButton.overSoundName = "sfx_btn_rollover_00";
	this.addChild(this._pauseButton);

	// this._muteButton = new p3.MuteButton
	// (
		// this._assetManager.getTexture("ui_btn_con_out"),
		// this._assetManager.getTexture("ui_btn_con_over"),
		// this._assetManager.getTexture("ui_btn_con_down"),
		// this._assetManager.getTexture("ui_icon_con_sound_on"),
		// this._assetManager.getTexture("ui_icon_con_sound_off")
	// );

	// this._muteButton.id = "mute";
	// this._muteButton.y = this._guiButtonTopMargin;
	// this._muteButton.scale.set(0);
	// this._muteButton.signals.over.add(this.buttonOver, this);
	// this._muteButton.init();
	// this.addChild(this._muteButton);

	// Touch areas
	this._level.avatar.kAbility = false;
	this._hitAreaLeft.touchstart  = this._hitAreaLeft.mousedown  = this.onTouchLeftStart.bind(this);
	// this._hitAreaLeft.touchend    = this._hitAreaLeft.mouseup    = this.onTouchLeftEnd.bind(this);

	this._hitAreaRight.touchstart = this._hitAreaRight.mousedown = this.onTouchRightStart.bind(this);
	this._hitAreaRight.touchend   = this._hitAreaRight.mouseup   = this.onTouchRightEnd.bind(this);

	Common.goalsManager.startRun(this);
	this.startGame();

	// Common.animator.setTimeout(function()
	// {
		// this.endGame();
	// }, 1.2, this);


	if(Common.savedData.endless && !Common.savedData.hasSeenTutorial["endless"])
	{
		Common.animator.setTimeout(function()
		{
			this.showInstructions("endless");
		}, 1.2, this);
	}
	if(Common.savedData.hasSeenTutorial[Common.savedData.character] == false)
	{
		Common.animator.setTimeout(function()
		{
			this.showInstructions(Common.savedData.character);
		}, 1.2, this);
	}
}

/**
 */
GameScreen.prototype.startGame = function()
{
	this.showGUI();

	Common.animator.setTimeout(function()
	{
		this.gameUI.showGoals(false);
	}, 0.25, this);
}

/**
 */
GameScreen.prototype.endGame = function()
{
	this._paused = true;

	this.signals.requestedNextScreen.dispatch(this._level);
}

/**
 */
GameScreen.prototype.update = function()
{
	// if(Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_Q))
	// {
		// this._paused = !this._paused;

		// if(this._paused)
			// TweenMax.pauseAll();
		// else
			// TweenMax.resumeAll();
	// }

	// if(Common.keyboard.getKeyJustPressed(Common.keyboard.KEY_Z))
	// {
		// this._level.avatar.kAbility = true;
	// }

	if(!this._paused)
	{
		this._level.update();
		this.gameUI.update();
	}
}

/**
 */
GameScreen.prototype.resize = function()
{
	SimpleScreen.prototype.resize.call(this);

	this.gameUI.resize();
	// this._muteButton.x   = this._getFirstButtonPositionRight();
	this._pauseButton.x  = this._getFirstButtonPositionRight();
}

/**
 */
GameScreen.prototype.dispose = function()
{
	this._level.dispose();
	SoundSFX.stop('mx_frozen_01_gameplay_lp');
}

/**
 * @param {Function=} callback
 * @param {*=}scope
 */
GameScreen.prototype.animateIn = function(callback, scope)
{
	// Music
	if(!!Common.bgMusic)
	{
		Common.bgMusic.stop();
		Common.bgMusic.fadeOut(0, 500);
	}
	Common.bgMusic = SoundSFX.play('mx_frozen_01_gameplay_lp', {loop:true, volume:0});
	Common.bgMusic.fadeIn(Common.bgMusicVolume, 500);

	SimpleScreen.prototype.animateIn.call(this);

	if(callback) callback.call(scope);
}

/**
 * @param {Function=} callback
 * @param {*=} scope
 */
GameScreen.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);

	if(callback) callback.call(scope);
}


/**
 */
GameScreen.prototype.hideGUI = function(callback, scope)
{
	this._paused = true;
	TweenMax.pauseAll();

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
	tl.to(this._pauseButton.scale, .35, {x:0, y:0, ease:Back.easeIn}, 0);
	// tl.to(this._muteButton.scale,  .35, {x:0, y:0, ease:Back.easeIn}, 0);
	Common.animator.add(tl);
}

/**
 */
GameScreen.prototype.showGUI = function()
{
	this._paused = false;
	TweenMax.resumeAll();

	// Ugly way to update mute button if changed in the pause screen
	// this._muteButton._enabled = p3.Button.audio._isMute;
	// this._muteButton._currentIconTexture = p3.Button.audio._isMute ? this._muteButton._offIconTexture : this._muteButton._onIconTexture;
	// this._muteButton._icon.texture       = this._muteButton._currentIconTexture;

	var tl = new TimelineMax();
	// tl.to(this._muteButton.scale,   .5, {x:1, y:1, ease:Back.easeOut}, 0);
	tl.to(this._pauseButton.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 1.5);
	Common.animator.add(tl);
}

/**
 */
GameScreen.prototype.gameOver = function(callback, scope)
{
	// Show goals
	this.gameUI.showGoals(true);

	// Hide UI
	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
		tl.to(this._pauseButton.scale,  .35, {x:0, y:0, ease:Back.easeIn}, 0);
		// tl.to(this._muteButton.scale,   .35, {x:0, y:0, ease:Back.easeIn}, 0);
	Common.animator.add(tl);

	this.gameUI.gameOver();

	// Show results after a delay
	Common.animator.setTimeout(function()
	{
		this._level.stopLoops();

		this.signals.requestedNextScreen.dispatch(this._level);
	}, 2, this);

	// Music
	Common.bgMusic.fadeOut(0, 2000);
}

/**
 */
GameScreen.prototype.showInstructions = function(what)
{
	this._level.stopLoops();
	// this._paused = true;
	this.signals.showInstructions.dispatch(what);
}

//===================================================
// PRIVATE METHODS
//===================================================

/**
 */
GameScreen.prototype.onPausePressed = function()
{
	SoundSFX.play("sfx_btn_press_00");

	if(this._level.avatar.isDead) return;
	this.signals.pausePressed.dispatch(this._level);

	this._level.stopLoops();
}

/**
 */
GameScreen.prototype.buttonOver = function()
{
	SoundSFX.play("sfx_btn_rollover_00");
}

/**
 */
GameScreen.prototype.onTouchLeftStart = function(event, id)
{
	this._level.avatar.kAbility = true;
};

/**
 */
GameScreen.prototype.onTouchLeftEnd = function(event, id)
{

};

/**
 */
GameScreen.prototype.onTouchRightStart = function(event, id)
{
	this._level.avatar.kJumpStart = true;
};

/**
 */
GameScreen.prototype.onTouchRightEnd = function(event, id)
{
	this._level.avatar.kJumpEnd = true;
};

/**
 */
GameScreen.prototype.restart = function()
{
	this.signals.requestedPreviousScreen.dispatch();
};


//===================================================
// EVENTS
//===================================================



//===================================================
// GETTERS/SETTERS
//===================================================


},{"../Common":2,"../game/GameUI":16,"../game/Level":17,"../general/SoundSFX":44,"./SimpleScreen":73}],70:[function(require,module,exports){
var Common       = require("../Common");
var SimpleScreen = require("./SimpleScreen");
var SoundSFX     = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function IntroScreen(type)
{
	SimpleScreen.call(this);

	this._type = type;

	switch(this._type)
	{
		case "intro":
			this._spine = Common.introAnimationData
			break;

		case "outro":
			this._spine = Common.outroAnimationData
			break;
	}
}
module.exports = IntroScreen;
IntroScreen.prototype = Object.create(SimpleScreen.prototype);
IntroScreen.prototype.constructor = IntroScreen;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
IntroScreen.prototype.init = function()
{
	console.log("INTRO INITIALIZED");

	SimpleScreen.prototype.init.call(this);

	// Bg
	this._bg = new PIXI.Sprite(Common.generatedTextures['whiteSquare']);
	this._bg.alpha = 1;
	this._bg.width  = Common.STAGE_WIDTH;
	this._bg.height = Common.STAGE_HEIGHT;
	this._bg.tint   = 0x476FA6;
	this.addChild(this._bg)

	// Animation
	var barSize = 160;

	this.spine = new PIXI.spine.Spine(this._spine);
	this.spine.x = Common.STAGE_WIDTH/2;
	this.spine.y = Common.STAGE_HEIGHT-barSize+1;
	this.spine.autoUpdate = true;
	this.spine.scale.set(0.5);
	this.addChild(this.spine);
	this.spine.state.setAnimationByName(0, "animation", false, 0);


	var bar = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	bar.alpha = 1;
	bar.width  = Common.STAGE_WIDTH;
	bar.height = barSize;
	this.addChild(bar)

	var bar = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	bar.alpha = 1;
	bar.width  = Common.STAGE_WIDTH;
	bar.height = barSize;
	bar.y = Common.STAGE_HEIGHT - bar.height;
	this.addChild(bar);

	var bar = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	bar.alpha = 1;
	bar.width  = 441;
	bar.height = Common.STAGE_HEIGHT;
	this.addChild(bar);

	var bar = new PIXI.Sprite(Common.generatedTextures['blackSquare']);
	bar.alpha  = 1;
	bar.width  = 441;
	bar.x      = Common.STAGE_WIDTH-bar.width;
	bar.height = Common.STAGE_HEIGHT;
	this.addChild(bar);

	// Audio
	if(!!Common.bgMusic) Common.bgMusic.fadeOut(0, 500);

	// Subtitles
	if(!webfont)
	{
		this._subtitle = new PIXI.extras.BitmapText("TEST", {font: "38px Superclarendon Title", align: "center"});
		this._subtitle.x = Common.STAGE_WIDTH/2  - this._subtitle.textWidth/2;
		this._subtitle.y = Common.STAGE_HEIGHT - this._subtitle.textHeight/2 -80;
		this.addChild(this._subtitle);
	}
	else
	{
		this._subtitle = new PIXI.Text("TEST", {font:"38px Arial", fill:0xffffff, align:'center'});
		this._subtitle.position.set( Common.STAGE_WIDTH/2, Common.STAGE_HEIGHT - 80);
		this._subtitle.anchor.set(0.5);
		this.addChild(this._subtitle);
	}
	this._subtitle.alpha = 0;


	this._subtitleTl = new TimelineMax();

	switch(this._type)
	{
		case "intro":
			this._subtitleTl.to(this._subtitle, .5, {alpha:1, ease:Sine.easeInOut, onStartScope:this, onStart:function(){this.setSubtitle(this._assetManager.getJSON("strings")["INTRO_0"][Common.COUNTRY_CODE])}}, 0.5);
			this._subtitleTl.to(this._subtitle, .5, {alpha:0, ease:Sine.easeInOut}, 3);
			this._subtitleTl.to(this._subtitle, .5, {alpha:1, ease:Sine.easeInOut, onStartScope:this, onStart:function(){this.setSubtitle(this._assetManager.getJSON("strings")["INTRO_1"][Common.COUNTRY_CODE])}}, 4);
			this._subtitleTl.to(this._subtitle, .5, {alpha:0, ease:Sine.easeInOut}, 6.5);
			this._subtitleTl.to(this._subtitle, .5, {alpha:1, ease:Sine.easeInOut, onStartScope:this, onStart:function(){this.setSubtitle(this._assetManager.getJSON("strings")["INTRO_2"][Common.COUNTRY_CODE])}}, 7);
			this._subtitleTl.to(this._subtitle, .5, {alpha:0, ease:Sine.easeInOut}, 15.5);
			this._subtitleTl.to(this._subtitle, .5, {alpha:1, ease:Sine.easeInOut, onStartScope:this, onStart:function(){this.setSubtitle(this._assetManager.getJSON("strings")["INTRO_3"][Common.COUNTRY_CODE])}}, 16.5);
			this._subtitleTl.to(this._subtitle, .5, {alpha:0, ease:Sine.easeInOut}, 19);
			this._subtitleTl.to(this._subtitle, .5, {alpha:1, ease:Sine.easeInOut, onStartScope:this, onStart:function(){this.setSubtitle(this._assetManager.getJSON("strings")["INTRO_4"][Common.COUNTRY_CODE])}}, 20);
			this._subtitleTl.to(this._subtitle, .5, {alpha:1, ease:Sine.easeInOut, onCompleteScope:this, onComplete:function(){this.animateOut()}}, 30);

			Common.bgMusic = SoundSFX.play('sfx_intro_audio_01', {loop:false, volume:0});
			Common.bgMusic.fadeIn(Common.bgMusicVolume, 500);

			break;

		case "outro":
			this._subtitleTl.to(this._subtitle, .5, {alpha:1, ease:Sine.easeInOut, onStartScope:this, onStart:function(){this.setSubtitle(this._assetManager.getJSON("strings")["OUTRO_0"][Common.COUNTRY_CODE])}}, 0.5);
			this._subtitleTl.to(this._subtitle, .5, {alpha:0, ease:Sine.easeInOut}, 4.5);
			this._subtitleTl.to(this._subtitle, .5, {alpha:1, ease:Sine.easeInOut, onStartScope:this, onStart:function(){this.setSubtitle(this._assetManager.getJSON("strings")["OUTRO_1"][Common.COUNTRY_CODE])}}, 5);
			this._subtitleTl.to(this._subtitle, .5, {alpha:0, ease:Sine.easeInOut}, 9);
			this._subtitleTl.to(this._subtitle, .5, {alpha:1, ease:Sine.easeInOut, onStartScope:this, onStart:function(){this.setSubtitle(this._assetManager.getJSON("strings")["OUTRO_2"][Common.COUNTRY_CODE])}}, 14.5);
			this._subtitleTl.to(this._subtitle, .5, {alpha:0, ease:Sine.easeInOut}, 18.5);
			this._subtitleTl.to(this._subtitle, .5, {alpha:1, ease:Sine.easeInOut, onStartScope:this, onStart:function(){this.setSubtitle(this._assetManager.getJSON("strings")["OUTRO_3"][Common.COUNTRY_CODE])}}, 19);
			this._subtitleTl.to(this._subtitle, .5, {alpha:1, ease:Sine.easeInOut, onCompleteScope:this, onComplete:function(){this.animateOut()}}, 24);

			Common.bgMusic = SoundSFX.play('sfx_outro_audio_01', {loop:false, volume:0});
			Common.bgMusic.fadeIn(Common.bgMusicVolume, 500);

			break;
	}

	Common.animator.add(this._subtitleTl);

	// Buttons
	this._nextButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_nav_out_big"),
		this._assetManager.getTexture("ui_btn_nav_over_big"),
		this._assetManager.getTexture("ui_btn_nav_down_big"),
		this._assetManager.getTexture("ui_icon_nav_skip")
	);

	this._nextButton.y = Common.STAGE_HEIGHT - 250;
	this._nextButton.signals.down.add(this.nextClicked, this);
	this._nextButton.overSoundName = "sfx_btn_rollover_00";
	this.addChild(this._nextButton);

	// Mute button
	this._muteButton = new p3.MuteButton
	(
		this._assetManager.getTexture("ui_btn_con_out"),
		this._assetManager.getTexture("ui_btn_con_over"),
		this._assetManager.getTexture("ui_btn_con_down"),
		this._assetManager.getTexture("ui_icon_con_sound_on"),
		this._assetManager.getTexture("ui_icon_con_sound_off")
	);

	this._muteButton.id = "mute";
	this._muteButton.y = this._guiButtonTopMargin;
	// this._muteButton.scale = new PIXI.Point(0, 0);
	this._muteButton.init();
	this.addChild(this._muteButton);
};

/**
 */
IntroScreen.prototype.update = function()
{

};

/**
 */
IntroScreen.prototype.resize = function()
{
	SimpleScreen.prototype.resize.call(this);

	// this._nextButton.x = r2l ? (this._getFirstButtonPositionLeft() + 30) : (this._getFirstButtonPositionRight() - 30);
	this._nextButton.x = this._getFirstButtonPositionRight() - 30;
	
	this._muteButton.x = this._getFirstButtonPositionRight();
};

/**
 */
IntroScreen.prototype.dispose = function()
{

}

/**
 * @param {Function=} callback
 * @param {*=}scope
 */
IntroScreen.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);

	// Buttons
	// var tl = new TimelineMax();
	// tl.to(this._nextButton.scale, 1, {x:1, y:1, ease:Elastic.easeOut}, 0);
	// Common.animator.add(tl);

	// Common.animator.setTimeout(function()
	// {
		// Common.savedData.hasSeenIntro = true;
		// Common.savedData.save();
		// this.animateOut();
	// }, 4.5, this);
};

/**
 * @param {Function=} callback
 * @param {*=} scope
 */
IntroScreen.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);

	this.signals.requestedNextScreen.dispatch();
};

IntroScreen.prototype.setSubtitle = function(text)
{
	if(!webfont)
	{
		this._subtitle.x += this._subtitle.textWidth/2;
		this._subtitle.y += this._subtitle.textHeight/2;
		this._subtitle.text = text;
		this._subtitle.validate();
		this._subtitle.x -= this._subtitle.textWidth/2;
		this._subtitle.y -= this._subtitle.textHeight/2;
	}
	else
	{
		this._subtitle.text = text;
	}
};

//===================================================
// PRIVATE METHODS
//===================================================


//===================================================
// EVENTS
//===================================================

/**
 */
IntroScreen.prototype.nextClicked = function()
{
	this.animateOut();

	SoundSFX.play("sfx_btn_press_00");
};

/**
 */
IntroScreen.prototype.buttonOver = function()
{
	SoundSFX.play("sfx_btn_rollover_00");
};

/**
 */
IntroScreen.prototype.nextClickFinish = function()
{
	this.signals.requestedNextScreen.dispatch();
};


//===================================================
// GETTERS/SETTERS
//===================================================

},{"../Common":2,"../general/SoundSFX":44,"./SimpleScreen":73}],71:[function(require,module,exports){
var Common            = require("../Common");
var SimpleScreen      = require("./SimpleScreen");
var LevelSelectButton = require("../general/LevelSelectButton");
var SoundSFX          = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function LevelSelectScreen(lastLevel)
{
    this._bg                = null;
    this._leftButtonHeld    = false;
    this._rightButtonHeld   = false;
	this._scrollPercentage  = 0;
	this._speed         = 0;
	this._speedMax      = 1.5;
	this._accelleration = 3;
	this._decelleration = 4;

    this._scrollEnabled     = true;
    this._mapHolderBuffer   = 75;

	this.isTouchScrolling  = false;
	this.touchPosition     = 0;

    SimpleScreen.call(this);

	this.signals.helpPressed = new signals.Signal();
}
module.exports = LevelSelectScreen;
LevelSelectScreen.prototype = Object.create(SimpleScreen.prototype);
LevelSelectScreen.prototype.constructor = LevelSelectScreen;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
LevelSelectScreen.prototype.init = function()
{
    console.log("SPLASH INITIALIZED");
    SimpleScreen.prototype.init.call(this);

	// Background
	this._bg = new PIXI.Sprite(this._assetManager.getTexture("ui_bg_main_menu"));
    this.addChild(this._bg);

	// Background particles
	this._backgroundPSContainer = new PIXI.Container();
	this.addChild(this._backgroundPSContainer);

	this.backgroundPS = new cloudkid.Emitter(this._backgroundPSContainer,
	[
		this._assetManager.getTexture("particle_snowflake_00"),
		this._assetManager.getTexture("particle_snowflake_01"),
		this._assetManager.getTexture("particle_snowflake_02"),
		this._assetManager.getTexture("particle_snowflake_03")
	], this._assetManager.getJSON("particle_menu_snow"));

	this.backgroundPS.updateSpawnPos(Common.STAGE_WIDTH/2, 0);
	this.backgroundPS.update(5);
	this.backgroundPS.emit = true;

	// Map
    this._mapHolder = new PIXI.Container();
    this._mapHolder.x = this._centre.x - (p3.View.width/2) + this._mapHolderBuffer;
    this._mapHolder.y = 175;
    this.addChild(this._mapHolder);

		this._mapHolder._mapPiece1 = new PIXI.Sprite(this._assetManager.getTexture("ui_map_bg_1"));
		this._mapHolder._mapPiece1.anchor.set(0);
		this._mapHolder._mapPiece1.scale.set(1/0.8, 1/0.8);
		this._mapHolder.addChild(this._mapHolder._mapPiece1);

		this._mapHolder._mapPiece2 = new PIXI.Sprite(this._assetManager.getTexture("ui_map_bg_2"));
		this._mapHolder._mapPiece2.anchor.set(0);
		this._mapHolder._mapPiece2.scale.set(1/0.8, 1/0.8);
		this._mapHolder._mapPiece2.x += this._mapHolder._mapPiece1.width-1;
		this._mapHolder.addChild(this._mapHolder._mapPiece2);

		this._bg.interactive = true;
		this._bg.touchstart = this._bg.mousedown = function(e){this.onTouchStart(e)}.bind(this);
		this._bg.touchmove  = this._bg.mousemove = function(e){this.onTouchMove(e)}.bind(this);
		this._bg.touchend   = this._bg.mouseup   = function(e){this.onTouchEnd(e)}.bind(this);


	// this._mapHolder.xMax = this._mapHolder.x;
	// this._mapHolder.xMin = this._mapHolder.x - this._mapHolder._mapPiece1.width - this._mapHolder._mapPiece2.width + p3.View.width - 2 * this._mapHolderBuffer;

		// Dev code for dots placement
		/*
		var that = this;
		this._mapHolder._mapPiece1.interactive = true;
		this._mapHolder._mapPiece1.mousedown = function(e)
		{
			console.log("%i %i", e.data.getLocalPosition(this).x, e.data.getLocalPosition(this).y);

			var dot = new PIXI.Sprite(that._assetManager.getTexture("ui_map_path_off"));
			dot.anchor = new PIXI.Point(0.5, 0.5);
			dot.x = e.data.getLocalPosition(this).x;
			dot.y = e.data.getLocalPosition(this).y;

			that._mapHolder.addChild(dot);
		};

		var that = this;
		this._mapHolder._mapPiece2.interactive = true;
		this._mapHolder._mapPiece2.mousedown = function(e)
		{
			console.log("%i %i", this._mapHolder._mapPiece1.width + e.data.getLocalPosition(this).x, e.data.getLocalPosition(this).y);

			var dot = new PIXI.Sprite(that._assetManager.getTexture("ui_map_path_off"));
			dot.anchor = new PIXI.Point(0.5, 0.5);
			dot.x = this._mapHolder._mapPiece1.width + e.data.getLocalPosition(this).x;
			dot.y = e.data.getLocalPosition(this).y;

			that._mapHolder.addChild(dot);
		};
		*/

	// Map deco
	var birds = [
	             {x:500, y:320},
	             {x:670, y:360}, {x:710, y:370}, {x:690, y:380},
				 {x:900, y:70}, {x:940, y:80},
				 {x:1410, y:370}, {x:1430, y:380}
				];
	for(var i = 0; i < birds.length; i++)
	{
		var animation = new p3.MovieClip(this._generateAnimationSequence("map_bird", 4));
		animation.animationSpeed = animation.totalFrames/1;
		animation.anchor  = new PIXI.Point(0.5, 0.5);
		animation.looping = true;
		animation.position = birds[i];
		animation.gotoAndPlay(p3.Utils.randomInt(0,animation.totalFrames));
		this._mapHolder.addChild(animation);
	}

	this.ripplesLowerPSHolder = new PIXI.Container();
	this.ripplesLowerPSHolder.position.set(500, 480);
	this._mapHolder.addChild(this.ripplesLowerPSHolder);
	this.ripplesLowerPS = new cloudkid.Emitter(this.ripplesLowerPSHolder,
	[
		this._assetManager.getTexture("map_wave_01"),
		this._assetManager.getTexture("map_wave_02"),
		this._assetManager.getTexture("map_wave_03")
	], this._assetManager.getJSON("particle_map_ripples_lower"));
	this.ripplesLowerPS.emit = true;

	this.ripplesUpperPSHolder = new PIXI.Container();
	this.ripplesUpperPSHolder.position.set(380, 410);
	this._mapHolder.addChild(this.ripplesUpperPSHolder);
	this.ripplesUpperPS = new cloudkid.Emitter(this.ripplesUpperPSHolder,
	[
		this._assetManager.getTexture("map_wave_01"),
		this._assetManager.getTexture("map_wave_02"),
		this._assetManager.getTexture("map_wave_03")
	], this._assetManager.getJSON("particle_map_ripples_upper"));
	this.ripplesUpperPS.emit = true;

	this.ripplesBridgePSHolder = new PIXI.Container();
	this.ripplesBridgePSHolder.position.set(1570, 395);
	this._mapHolder.addChild(this.ripplesBridgePSHolder);
	this.ripplesBridgePS = new cloudkid.Emitter(this.ripplesBridgePSHolder,
	[
		this._assetManager.getTexture("map_wave_01"),
		this._assetManager.getTexture("map_wave_02"),
		this._assetManager.getTexture("map_wave_03")
	], this._assetManager.getJSON("particle_map_ripples_bridge"));
	this.ripplesBridgePS.emit = true;	
	
	this.poolSparklesPSHolder = new PIXI.Container();
	this.poolSparklesPSHolder.position.set(1920, 170);
	this._mapHolder.addChild(this.poolSparklesPSHolder);
	this.poolSparklesPS = new cloudkid.Emitter(this.poolSparklesPSHolder,
	[
		this._assetManager.getTexture("map_star_01"),
		this._assetManager.getTexture("map_star_02")
	], this._assetManager.getJSON("particle_map_troll_pool_sparkles"));
	this.poolSparklesPS.emit = true;


	// Text: The story
	var copy = this._assetManager.getJSON("strings")["THE_STORY"][Common.COUNTRY_CODE];
	if(!webfont)
	{
		var text = new PIXI.extras.BitmapText(copy, {font: "36px Mikadan White", align: "center"});
		text.tint = 0x715951;
		text.x = 150-text.textWidth/2;
		text.y = 105-text.textHeight/2;
		this._mapHolder.addChild(text);
	}
	else
	{
		var text = new PIXI.Text(copy, {font:"36px Arial", fill:0x715951, align:'center'});
		text.anchor.set(0.5);
		text.x = 150;
		text.y = 105;
		this._mapHolder.addChild(text);
	}

	// Text: Arendelle
	var copy = this._assetManager.getJSON("strings")["ARENDELLE"][Common.COUNTRY_CODE];
	if(!webfont)
	{
		var text = new PIXI.extras.BitmapText(copy, {font: "32px Mikadan White", align: "center"});
		text.tint = 0x897770;
		text.x = 660-text.textWidth/2;
		text.y = 325-text.textHeight/2;
		this._mapHolder.addChild(text);
	}
	else
	{
		var text = new PIXI.Text(copy, {font:"32px Arial", fill:0x897770, align:'center'});
		text.anchor.set(0.5);
		text.x = 660;
		text.y = 325;
		this._mapHolder.addChild(text);
	}

	// Text: Oaken
	var copy = this._assetManager.getJSON("strings")["OAKEN"][Common.COUNTRY_CODE];
	if(!webfont)
	{
		var text = new PIXI.extras.BitmapText(copy, {font: "32px Mikadan White", align: "center"});
		text.tint = 0x897770;
		text.x = 1220-text.textWidth/2;
		text.y = 165-text.textHeight/2;
		this._mapHolder.addChild(text);
	}
	else
	{
		var text = new PIXI.Text(copy, {font:"32px Arial", fill:0x897770, align:'center'});
		text.anchor.set(0.5);
		text.x = 1220;
		text.y = 165;
		this._mapHolder.addChild(text);
	}

	// Text: Troll's den
	var copy = this._assetManager.getJSON("strings")["TROLLS_DEN"][Common.COUNTRY_CODE];
	if(!webfont)
	{
		var text = new PIXI.extras.BitmapText(copy, {font: "32px Mikadan White", align: "center"});
		text.tint = 0x897770;
		text.x = 1950-text.textWidth/2;
		text.y = 90-text.textHeight/2;
		this._mapHolder.addChild(text);
	}
	else
	{
		var text = new PIXI.Text(copy, {font:"32px Arial", fill:0x897770, align:'center'});
		text.anchor.set(0.5);
		text.x = 1950;
		text.y = 95;
		this._mapHolder.addChild(text);
	}

	// Characters
	var kristoff = new PIXI.Sprite(this._assetManager.getTexture("ui_map_char_kristoff"));
	kristoff.anchor.set(0.5, 1);
	kristoff.position.set(355, 190);
	this._mapHolder.addChild(kristoff);

	var olaf = new PIXI.Sprite(this._assetManager.getTexture("ui_map_char_olaf"));
	olaf.anchor.set(0.5, 1);
	olaf.position.set(770, 140);
	this._mapHolder.addChild(olaf);

	var elsa = new PIXI.Sprite(this._assetManager.getTexture("ui_map_char_elsa"));
	elsa.anchor.set(0.5, 1);
	elsa.position.set(1010, 400);
	this._mapHolder.addChild(elsa);


 	// Map buttons
	this._buttons = [];
	var buttonCoords =
	[
		{x: 180, y: 360},
		{x: 310, y: 160},
		{x: 520, y: 150},
		{x: 710, y: 145},
		{x: 860, y: 260},
		{x: 980, y: 400},
		{x: 1160, y: 410},
		{x: 1300, y: 320},
		{x: 1420, y: 160},
		{x: 1590, y: 220},
		{x: 1770, y: 350},
		{x: 1960, y: 300}
	];

	for(var i = 0; i < buttonCoords.length; i++)
	{
		if(Common.savedData.showUnlockedLevel && i == Common.savedData.levelsUnlocked-1)
		{
			var button = new LevelSelectButton(i, false);
			button.position = buttonCoords[i];
			button.signals.clicked.add(this.onLevelClicked, this);
			this._buttons.push(button);
			this._mapHolder.addChild(button);

			var button = new LevelSelectButton(i, true);
			button.position = buttonCoords[i];
			button.signals.clicked.add(this.onLevelClicked, this);
			button.scale.set(0);
			this._buttons.push(button);
			this._mapHolder.addChild(button);
		}
		else
		{
			var button = new LevelSelectButton(i, Common.savedData.levelsUnlocked > i);
			button.position = buttonCoords[i];
			button.signals.clicked.add(this.onLevelClicked, this);
			this._buttons.push(button);
			this._mapHolder.addChild(button);
		}
	}

	// Map dots
	this._dots = []
	var coords = [];
	coords[0] =
	[
		[212, 298],
		[228, 274],
		[236, 248],
		[240, 221],
		[244, 191]
	];
	coords[1] =
	[
		[373, 119],
		[399, 111],
		[427, 111],
		[451, 120]
	];
	coords[2] =
	[
		[580, 187],
		[600, 198],
		[625, 197],
		[645, 182]
	];
	coords[3] =
	[
		[775, 143],
		[798, 155],
		[814, 177],
		[826, 200]
	];
	coords[4] =
	[
		[917, 306],
		[928, 325],
		[934, 349]
	];
	coords[5] =
	[
		[1035, 441],
		[1055, 448],
		[1078, 446],
		[1097, 434]
	];
	coords[6] =
	[
		[1224, 404],
		[1239, 387],
		[1248, 367]
	];
	coords[7] =
	[
		[1323, 256],
		[1324, 230],
		[1327, 203],
		[1336, 177],
		[1353, 158]
	];
	coords[8] =
	[
		[1487, 147],
		[1512, 158],
		[1532, 176]
	];
	coords[9] =
	[
		[1649, 271],
		[1662, 292],
		[1679, 311],
		[1700, 324]
	];
	coords[10] =
	[
		[1836, 348],
		[1860, 339],
		[1879, 325],
		[1894, 306]
	];


	for(var i = 0; i < coords.length; i++)
	{
		this._dots[i] = [];

		if(Common.savedData.showUnlockedLevel && i == (Common.savedData.levelsUnlocked-2))
		{
			for(var p = 0; p < coords[i].length; p++)
			{
				var dot = new PIXI.Sprite(this._assetManager.getTexture("ui_map_path_off"));
				dot.anchor.set(0.5);
				dot.position.set(coords[i][p][0], coords[i][p][1]);
				this._dots[i].push(dot);
				this._mapHolder.addChildAt(dot,2);

				var dotFull = new PIXI.Sprite(this._assetManager.getTexture("ui_map_path_on"));
				dotFull.anchor.set(0.5);
				dotFull.position.set(coords[i][p][0], coords[i][p][1]);
				dotFull.alpha = 0;
				this._dots[i].push(dotFull);
				this._mapHolder.addChildAt(dotFull,2);
			}
		}
		else
		{
			for(var p = 0; p < coords[i].length; p++)
			{
				var dot = new PIXI.Sprite(this._assetManager.getTexture(Common.savedData.levelsUnlocked > i+1 ? "ui_map_path_on" : "ui_map_path_off"));
				dot.anchor.set(0.5);
				dot.position.set(coords[i][p][0], coords[i][p][1]);
				this._mapHolder.addChildAt(dot,2);
			}
		}
	}

	// Coins
	this.initCoinCointainer();

	// UI
	this._leftButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_sidenav_out"),
		this._assetManager.getTexture("ui_btn_sidenav_over"),
		this._assetManager.getTexture("ui_btn_sidenav_down"),
		this._assetManager.getTexture("ui_icon_sidenav_arrow")
	);
	this._leftButton.children[0].anchor.set(0, 0.5);
	this._leftButton.children[1].anchor.set(0, 0.5);
	this._leftButton.y = Common.STAGE_HEIGHT / 2;
	this._leftButton.signals.down.add(this.onLeftDown, this);
	this._leftButton.signals.up.add(this.onLeftUp, this);
	this._leftButton.overSoundName = "sfx_btn_rollover_00";
	this._leftButton.visible = false;
	this._leftButton.alpha = 0;
	this.addChild(this._leftButton);

	this._rightButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_sidenav_out"),
		this._assetManager.getTexture("ui_btn_sidenav_over"),
		this._assetManager.getTexture("ui_btn_sidenav_down"),
		this._assetManager.getTexture("ui_icon_sidenav_arrow")
	);
	this._rightButton.scale.x = -1;
	this._rightButton.children[0].anchor.set(0, 0.5);
	this._rightButton.children[1].anchor.set(0, 0.5);
	this._rightButton.y = Common.STAGE_HEIGHT / 2;
	this._rightButton.signals.down.add(this.onRightDown, this);
	this._rightButton.signals.up.add(this.onRightUp, this);
	this._rightButton.overSoundName = "sfx_btn_rollover_00";
	this.addChild(this._rightButton);

	// Back button
	this._bkButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_con_out"),
		this._assetManager.getTexture("ui_btn_con_over"),
		this._assetManager.getTexture("ui_btn_con_down"),
		this._assetManager.getTexture("ui_icon_con_back")
	);
	this._bkButton.y = this._guiButtonTopMargin;
	this._bkButton.signals.down.add(this.onBackPressed, this);
	this._bkButton.overSoundName = "sfx_btn_rollover_00";
	this.addChild(this._bkButton);

	// Help button
	this._helpButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_con_out"),
		this._assetManager.getTexture("ui_btn_con_over"),
		this._assetManager.getTexture("ui_btn_con_down"),
		this._assetManager.getTexture("ui_icon_con_help")
	);
	this._helpButton.overSoundName = "sfx_btn_rollover_00";
	this._helpButton.y = this._guiButtonTopMargin;
	this._helpButton.signals.down.add(this.onHelpPressed, this);
	this.addChild(this._helpButton);

	// Mute button
	this._muteButton = new p3.MuteButton
	(
		this._assetManager.getTexture("ui_btn_con_out"),
		this._assetManager.getTexture("ui_btn_con_over"),
		this._assetManager.getTexture("ui_btn_con_down"),
		this._assetManager.getTexture("ui_icon_con_sound_on"),
		this._assetManager.getTexture("ui_icon_con_sound_off")
	);
	this._muteButton.overSoundName = "sfx_btn_rollover_00";
	this._muteButton.id = "mute";
	this._muteButton.y = this._guiButtonTopMargin;
	this._muteButton.init();
	this.addChild(this._muteButton);

	// Show new unlocked level animation
	if(Common.savedData.showUnlockedLevel)
	{
		var tl = new TimelineMax({onCompleteScope:this, onComplete:function()
		{
			Common.savedData.showUnlockedLevel = false;
			Common.savedData.save();
		}});

			// Scroll the view
			var xMin = this._centre.x - (Math.min(Common.STAGE_WIDTH, p3.View.width)/2) + this._mapHolderBuffer;
			var xMax = xMin - this._mapHolder._mapPiece1.width - this._mapHolder._mapPiece2.width + Math.min(Common.STAGE_WIDTH, p3.View.width) - 2 * this._mapHolderBuffer;
			var xTarget = this._centre.x - buttonCoords[Common.savedData.levelsUnlocked-1].x;
			var scrollPercentageTarget = Math.min(1, Math.max(0,(xTarget-xMin)/(xMax-xMin)));
			var delay = 0.25;
			var scrollDuration = scrollPercentageTarget * 2;
			if(scrollDuration != 0 && scrollDuration < 0.5) scrollDuration = 0.5;

			tl.to(this, scrollDuration, {_scrollPercentage:scrollPercentageTarget, ease:Sine.easeInOut, onCompleteScope:this, onComplete:function()
			{
				this.unlockPS.updateSpawnPos(this._buttons[Common.savedData.levelsUnlocked].x, this._buttons[Common.savedData.levelsUnlocked].y);
				this.unlockPS.emit = true;
			}}, delay);


			// Run the particle effect
			this.unlockPSContainer = new PIXI.Container();
			this._mapHolder.addChild(this.unlockPSContainer);

			this.unlockPS = new cloudkid.Emitter(this.unlockPSContainer,
			[
				this._assetManager.getTexture("particle_snowflake_offset_00"),
				this._assetManager.getTexture("particle_snowflake_offset_01"),
				this._assetManager.getTexture("particle_snowflake_offset_02"),
				this._assetManager.getTexture("particle_snowflake_offset_03")
			], this._assetManager.getJSON("particle_level_unlock"));

			this.unlockPS.emit = false;

			// Show the dots
			for(var d = 0; d < this._dots[Common.savedData.levelsUnlocked-2].length; d+=2)
			{
				tl.to(this._dots[Common.savedData.levelsUnlocked-2][d],   0.25, {alpha:0, ease:Linear.easeNone}, delay + scrollDuration * 0.8 + (d/2+1)* 0.25);
				tl.to(this._dots[Common.savedData.levelsUnlocked-2][d+1], 0.25, {alpha:1, ease:Linear.easeNone}, delay + scrollDuration * 0.8 + (d/2)  * 0.25);
			}

			// Show the level button
			tl.to(this._buttons[Common.savedData.levelsUnlocked].scale, 1.25, {x:1, y:1, ease:Elastic.easeOut, onStartScope:this, onStart:function(){SoundSFX.play("sfx_ui_map_level_unlock_02");}});

			// Show side buttons
			this._leftButton.alpha    = 0;
			this._rightButton.alpha   = 0;
			this._leftButton.visible  = false;
			this._rightButton.visible = false;

			if(scrollPercentageTarget < 1)
				tl.to(this._rightButton,  .2, {alpha:1, ease:Linear.easeNone, onStartScope:this, onStart:function(){this._rightButton.visible=true;}}, delay + scrollDuration + 1.25);

			if(scrollPercentageTarget > 0)
				tl.to(this._leftButton,  .2, {alpha:1, ease:Linear.easeNone, onStartScope:this, onStart:function(){this._leftButton.visible=true;}}, delay + scrollDuration + 1.25);


		Common.animator.add(tl);
	}
	else
	{
		// Scroll the view
		var xMin = this._centre.x - (Math.min(Common.STAGE_WIDTH, p3.View.width)/2) + this._mapHolderBuffer;
		var xMax = xMin - this._mapHolder._mapPiece1.width - this._mapHolder._mapPiece2.width + Math.min(Common.STAGE_WIDTH, p3.View.width) - 2 * this._mapHolderBuffer;
		var xTarget = this._centre.x - buttonCoords[Common.savedData.levelsUnlocked-1].x;
		var scrollPercentageTarget = Math.min(1, Math.max(0,(xTarget-xMin)/(xMax-xMin)));
		var delay = 0.25;
		var scrollDuration = scrollPercentageTarget * 2;
		if(scrollDuration != 0 && scrollDuration < 0.5) scrollDuration = 0.5;

		TweenMax.to(this, scrollDuration, {_scrollPercentage:scrollPercentageTarget, ease:Sine.easeInOut}, delay);
		// Show side buttons
		this._leftButton.alpha    = 0;
		this._rightButton.alpha   = 0;
		this._leftButton.visible  = false;
		this._rightButton.visible = false;

		if(scrollPercentageTarget < 1)
			TweenMax.to(this._rightButton,  .2, {alpha:1, ease:Linear.easeNone, onStartScope:this, onStart:function(){this._rightButton.visible=true;}}, delay + scrollDuration + 1.25);

		if(scrollPercentageTarget > 0)
			TweenMax.to(this._leftButton,  .2, {alpha:1, ease:Linear.easeNone, onStartScope:this, onStart:function(){this._leftButton.visible=true;}}, delay + scrollDuration + 1.25);
	}

	// Music
	if(!!Common.bgMusic) Common.bgMusic.fadeOut(0, 500);
	Common.bgMusic = SoundSFX.play('mx_frozen_05_map_lp', {loop:true, volume:0});
	Common.bgMusic.fadeIn(Common.bgMusicVolume, 500);

	// Loss streak reward
	if(Common.savedData.lossStreak.count >= this._assetManager.getJSON("config").lossStreak.losses && !Common.savedData.lossStreak.awarded)
	{
		Common.animator.setTimeout(function()
		{
			this.signals.GUIButtonClicked.dispatch("reward");
		}, 1, this);

		this._coinsContainer._text.text = Common.savedData.coins + this._assetManager.getJSON("config").lossStreak.reward;
	}
	// Show collect all crystals message?
	else if(Common.savedData.endGameMessage.levels.show   && !Common.savedData.endGameMessage.levels.shown ||
	        Common.savedData.endGameMessage.crystals.show && !Common.savedData.endGameMessage.crystals.shown ||
			Common.savedData.endGameMessage.trolls.show   && !Common.savedData.endGameMessage.trolls.shown)
	{
		Common.animator.setTimeout(function()
		{
			this.signals.GUIButtonClicked.dispatch("endgame");
		}, 1, this);
	}
	// Show promo?
	else if(Common.savedData.canShowPromo())
	{
		Common.animator.setTimeout(function()
		{
			this.signals.GUIButtonClicked.dispatch("promo");
		}, 1, this);
	}
};

/**
 * Dispose
 */
LevelSelectScreen.prototype.dispose = function()
{

}

/**
 * Update
 */
LevelSelectScreen.prototype.update = function()
{
    SimpleScreen.prototype.update.call(this);

	this.backgroundPS.update(p3.Timestep.deltaTime);
	this.ripplesLowerPS.update(p3.Timestep.deltaTime);
	this.ripplesUpperPS.update(p3.Timestep.deltaTime);
	this.ripplesBridgePS.update(p3.Timestep.deltaTime);
	this.poolSparklesPS.update(p3.Timestep.deltaTime);

	if(!!this.unlockPS)
		this.unlockPS.update(p3.Timestep.deltaTime);

	if(this._rightButtonHeld)
	{
		this._speed += this._accelleration * p3.Timestep.deltaTime;
		if(this._speed > this._speedMax) this._speed = this._speedMax;
	}
	else if(this._leftButtonHeld)
	{
		this._speed -= this._accelleration * p3.Timestep.deltaTime;
		if(this._speed < -this._speedMax) this._speed = -this._speedMax;
	}
	else
	{
		if(this._speed < 0)
		{
			this._speed += this._decelleration * p3.Timestep.deltaTime;
			if(this._speed > 0)
				this._speed = 0;
		}
		else if(this._speed > 0)
		{
			this._speed -= this._decelleration * p3.Timestep.deltaTime;
			if(this._speed < 0)
				this._speed = 0;
		}
	}

	this._scrollPercentage += this._speed * p3.Timestep.deltaTime;

	if(this._scrollPercentage < 0)
	{
		this._scrollPercentage = 0;
		this._leftButtonHeld = false;

		var tl = new TimelineMax();
		tl.to(this._leftButton,  .2, {alpha:0, ease:Linear.easeNone, onCompleteScope:this, onComplete:function(){this._leftButton.visible = false}}, 0);
		Common.animator.add(tl);
	}
	else if(this._scrollPercentage > 1)
	{
		this._scrollPercentage = 1;
		this._rightButtonHeld = false;

		var tl = new TimelineMax();
		tl.to(this._rightButton,  .2, {alpha:0, ease:Linear.easeNone, onCompleteScope:this, onComplete:function(){this._rightButton.visible = false}}, 0);
		Common.animator.add(tl);

	}
	else if(this._speed != 0)
	{
		if(this._rightButton.alpha == 0)
		{
			this._rightButton.visible = true;
			var tl = new TimelineMax();
			tl.to(this._rightButton,  .2, {alpha:1, ease:Linear.easeNone}, 0);
			Common.animator.add(tl);
		}

		if(this._leftButton.alpha == 0)
		{
			this._leftButton.visible = true;
			var tl = new TimelineMax();
			tl.to(this._leftButton,  .2, {alpha:1, ease:Linear.easeNone}, 0);
			Common.animator.add(tl);
		}
	}

	var xMin = this._centre.x - (Math.min(Common.STAGE_WIDTH, p3.View.width)/2) + this._mapHolderBuffer;;
	var xMax = xMin - this._mapHolder._mapPiece1.width - this._mapHolder._mapPiece2.width + Math.min(Common.STAGE_WIDTH, p3.View.width) - 2 * this._mapHolderBuffer;
	this._mapHolder.x = xMin + (xMax - xMin) * this._scrollPercentage;
};

/**
 * On resize callback
 */
LevelSelectScreen.prototype.resize = function()
{
    SimpleScreen.prototype.resize.call(this);

	this._leftButton.x  = this._getBorderButtonPositionLeft();
	this._rightButton.x = this._getBorderButtonPositionRight();
	this._bkButton.x  = this._getFirstButtonPositionLeft();
	this._muteButton.x  = this._getFirstButtonPositionRight();
	this._helpButton.x  = this._getSecondButtonPositionRight();
};

/**
 * @param {Function=} callback
 * @param {*=}scope
 */
LevelSelectScreen.prototype.animateIn = function(callback, scope) {

    SimpleScreen.prototype.animateIn.call(this);

	// var tl = new TimelineMax();
	// tl.to(this._helpButton.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 1);
	// tl.to(this._muteButton.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 1.1);
	// tl.to(this._bkButton.scale,  .5, {x:1, y:1, ease:Back.easeOut}, 1);
	// Common.animator.add(tl);
};

/**
 * @param {Function=} callback
 * @param {*=} scope
 */
LevelSelectScreen.prototype.animateOut = function(callback, scope) {

    SimpleScreen.prototype.animateOut.call(this);
};

//===================================================
// PRIVATE METHODS
//===================================================


/**
 * @param {!String} character
 * @param {!Number} frameLimit
 * @returns {!p3.MovieClipSequence}
 */
LevelSelectScreen.prototype._generateAnimationSequence = function(character, frameLimit, frameStart)
{
	if(!frameStart) frameStart = 0;

	var textureArr = [];
	for(var i = frameStart + 1; i <= frameStart + frameLimit; i++)
	{
		var n = "" + i;
		while(n.length < 2) n = "0" + n;
		textureArr.push(character + "_" + n);
	}
	for(var i = 0; i < textureArr.length; i++)
	{
		textureArr[i] = this._assetManager.getTexture(textureArr[i]);
	}
	var sequence = new p3.MovieClipSequence();
	sequence.addTextures(textureArr);

	return sequence;
}

//===================================================
// EVENTS
//===================================================

LevelSelectScreen.prototype.onLevelClicked = function(button)
{
	console.log("Selected level %i", button._id);
	Common.savedData.level = button._id;
    this.signals.requestedNextScreen.dispatch(button.id);
	SoundSFX.play("sfx_btn_press_00");
}

LevelSelectScreen.prototype.onHelpPressed = function(e)
{
	this.signals.GUIButtonClicked.dispatch("help");
	SoundSFX.play("sfx_btn_press_00");
}

LevelSelectScreen.prototype.onLeftDown = function()
{
    if(this._scrollEnabled)
    {
        this._leftButtonHeld = true;
    }
};

LevelSelectScreen.prototype.onLeftUp = function()
{
    if(this._scrollEnabled)
    {
        this._leftButtonHeld = false;
    }
};

LevelSelectScreen.prototype.onRightDown = function()
{
    if(this._scrollEnabled)
    {
        this._rightButtonHeld = true;
    }
};

LevelSelectScreen.prototype.onRightUp = function()
{
    if(this._scrollEnabled)
    {
        this._rightButtonHeld = false;
    }
};

LevelSelectScreen.prototype.onBackPressed = function()
{
	this.signals.requestedPreviousScreen.dispatch("back");
	SoundSFX.play("sfx_btn_press_00");
};


LevelSelectScreen.prototype.onTouchStart = function(e)
{
	this.isTouchScrolling = true;
	this.touchPosition = e.data.getLocalPosition(this).x;
};

LevelSelectScreen.prototype.onTouchMove = function(e)
{
	if(this.isTouchScrolling)
	{
		var delta   = e.data.getLocalPosition(this).x - this.touchPosition;
		this._speed = -delta/20; //magic numbers, yay

		this.touchPosition = e.data.getLocalPosition(this).x;
	}
};

LevelSelectScreen.prototype.onTouchEnd = function(e)
{
	this.isTouchScrolling = false;
    this._leftButtonHeld    = false;
    this._rightButtonHeld   = false;
};




//===================================================
// GETTERS/SETTERS
//===================================================



},{"../Common":2,"../general/LevelSelectButton":42,"../general/SoundSFX":44,"./SimpleScreen":73}],72:[function(require,module,exports){
/**
 *  Preloader
 *
 *  Created by Legman on 5/04/2015.
 *
 */

var SimpleScreen        = require("./SimpleScreen");

var Common              = require("../Common");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function Preloader()
{
    this.loadedPercentage   = 0.0;

	this._crystalsContainer = null;
	this._crystals          = [];
    this._loadingText       = null;
	this._index             = 0;

    SimpleScreen.call(this);
}
module.exports = Preloader;
Preloader.prototype = Object.create(SimpleScreen.prototype);
Preloader.prototype.constructor = Preloader;

//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
Preloader.prototype.init = function()
{
    console.log("PRELOADER INITIALIZED");
    SimpleScreen.prototype.init.call(this);

	// Background
    var bg = new PIXI.Sprite(this._assetManager.getTexture("preloader_bg"));
    this.addChild(bg);

	// Crystal container
    this._crystalsContainer = new PIXI.Sprite(this._assetManager.getTexture("ui_loading_crystals_bg"));
    this._crystalsContainer.anchor = new PIXI.Point(0.5, 0.5);
    this._crystalsContainer.x = (Common.STAGE_WIDTH / 2);
    this._crystalsContainer.y = (Common.STAGE_HEIGHT / 2) + 120;
    this.addChild(this._crystalsContainer);

	for(var i = 1; i <= 12; i++)
	{
		var crystal = new PIXI.Sprite(this._assetManager.getTexture("ui_loading_crystals_" + i));
		crystal.anchor = new PIXI.Point(0.5, 0.5);
		crystal.visible = false;
		this._crystalsContainer.addChild(crystal);
		this._crystals.push(crystal);
	}


    this.loadedPercentage = 0.0;

    this._loadingText = new PIXI.Text("0%", {font:"24px Arial", fill:0xFFFFFF, align:'center'});
    this._loadingText.x = Common.STAGE_WIDTH / 2;
    this._loadingText.y = Common.STAGE_HEIGHT / 2;
    // this.addChild(this._loadingText);
};

/**
 */
Preloader.prototype.dispose = function()
{
    SimpleScreen.prototype.dispose.call(this);
};

/**
 */
Preloader.prototype.resize = function()
{
    SimpleScreen.prototype.resize.call(this);

    this.x = (p3.View.width - Common.STAGE_WIDTH) * 0.5;
    this.y = (p3.View.height - Common.STAGE_HEIGHT) * 0.5;
};

/**
 */
Preloader.prototype.update = function()
{
    // console.log("LOADING: " + this.loadedPercentage);
    // this.loadedPercentage += 0.1;

    // if(this.loadedPercentage > 100)
        // this.loadedPercentage = 0;*/

    this._loadingText.text = Math.round(this.loadedPercentage);

	for(var i = 0; i < (this.loadedPercentage * (this._crystals.length))/100; i++)
	{	
		this._crystals[i].visible = true;
	}
};

/**
 * @param {Function=} callback
 * @param {*=} scope
 */
Preloader.prototype.animateIn = function(callback, scope)
{
    SimpleScreen.prototype.animateIn.call(callback, scope);
};

/**
 * @param {Function=} callback
 * @param {*=} scope
 */
Preloader.prototype.animateOut = function(callback, scope) {
    SimpleScreen.prototype.animateOut.call(callback, scope);

    var timeline = new TimelineMax({
        onComplete: callback,
        onCompleteScope: scope
    });
    this._tweens.push(timeline);
};

//===================================================
// PRIVATE METHODS
//===================================================

//===================================================
// EVENTS
//===================================================

//===================================================
// GETTERS/SETTERS
//===================================================

//===================================================


},{"../Common":2,"./SimpleScreen":73}],73:[function(require,module,exports){

var Common          = require("../Common");
var Scene           = require("../lib/Scene");
var WireframeButton = require("../general/WireframeButton");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function SimpleScreen() 
{
    /**
     * @type {signals.Signal}
     */
    this.signals = {};
    this.signals.requestedNextScreen = new signals.Signal();
    this.signals.requestedPreviousScreen = new signals.Signal();
    this.signals.GUIButtonClicked = new signals.Signal();

    /**
     * @type {p3.AssetManager}
     * @protected
     */
    this._assetManager = p3.AssetManager.instance;
	
    /**
     * @type {Array.<TweenMax>}
     * @protected
     */
    this._tweens = null;

    /**
     * @type {PIXI.Point}
     */
    this._centre = null;

    /**
     * @type {Number}
     */
    this._leftEdge = 0;

    /**
     * @type {Number}
     */
    this._rightEdge = 0;

    /**
     * @type {Number}
     */
    this._guiButtonTopMargin = 100;
	
    p3.Screen.call(this);
}
module.exports = SimpleScreen;
SimpleScreen.prototype = Object.create(Scene.prototype);
SimpleScreen.prototype.constructor = SimpleScreen;

//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
SimpleScreen.prototype.init = function() {
    this._tweens = [];
    this._centre = new PIXI.Point(Common.STAGE_WIDTH/2, Common.STAGE_HEIGHT/2);
};

/**
 */
SimpleScreen.prototype.dispose = function() {
    this.signals.requestedNextScreen.dispose();
    this.signals.requestedPreviousScreen.dispose();

    var tween;
    for (var i = 0; i < this._tweens.length; ++ i) {
        tween = this._tweens[i];
        if (tween) {
            tween.kill();
        }
    }
    this._tweens.length = 0;

    console.log("screen disposed");

    TweenMax.killAll();
    Common.animator.removeAll();
};

/**
 */
SimpleScreen.prototype.resize = function() {

    this.x = (p3.View.width - Common.STAGE_WIDTH) * 0.5;

    this._rightEdge = this._centre.x + (p3.View.width/2);
    this._leftEdge = this._centre.x - (p3.View.width/2);

	if(this._coinsContainer)
		this._coinsContainer.x = this._getSecondButtonPositionLeft();

	/*
    if(this._backButton)
    {
        this._backButton.x = this._getFirstButtonPositionLeft();
    }

    if(this._pauseButton)
    {
        this._pauseButton.x = this._getFirstButtonPositionRight();
    }

    if(this._helpButton)
    {
        this._helpButton.x = this._getSecondButtonPositionRight();
    }

    if(this._muteButton)
    {
        this._muteButton.x = this._getFirstButtonPositionRight();
    }
	*/
};

/**
 */
SimpleScreen.prototype.activate = function() {
    this.animateIn(function() {

    }, this);
};

/**
 * @param {Function=} callback
 * @param {*=}scope
 */
SimpleScreen.prototype.animateIn = function(callback, scope) {
    scope = scope || window;
};

/**
 * @param {Function=} callback
 * @param {*=} scope
 */
SimpleScreen.prototype.animateOut = function(callback, scope) {
    scope = scope || window;
};

/*
SimpleScreen.prototype.initPauseButton = function()
{
    this._pauseButton = new WireframeButton("Pause");
    this._pauseButton.id = "pause";
    this._pauseButton.y = this._guiButtonTopMargin;
    this._pauseButton.scale = new PIXI.Point(0.6, 0.6);
    this._pauseButton.signals.clicked.add(this.onGUIButtonClicked, this);
    //this._pauseButton.downSoundName = "sfx_btn_press_fwd_00";
    this.addChild(this._pauseButton);
};

SimpleScreen.prototype.initHelpButton = function()
{
    this._helpButton = new WireframeButton("Help");
    this._helpButton.id = "help";
    this._helpButton.y = this._guiButtonTopMargin;
    this._helpButton.scale = new PIXI.Point(0.6, 0.6);
    this._helpButton.signals.clicked.add(this.onGUIButtonClicked, this);
    //this._pauseButton.downSoundName = "sfx_btn_press_fwd_00";
    this.addChild(this._helpButton);
};

SimpleScreen.prototype.initBackButton = function(home)
{
    this._backButton = new WireframeButton(home ? "Home" : "Back");
    this._backButton.id = "back";
    this._backButton.scale = new PIXI.Point(0.6, 0.6);
    this._backButton.y = this._guiButtonTopMargin;
    this._backButton.signals.clicked.add(this.onGUIButtonClicked, this);
    //this._pauseButton.downSoundName = "sfx_btn_press_fwd_00";
    this.addChild(this._backButton);
};

SimpleScreen.prototype.initMuteButton = function()
{
    var soundOn = new WireframeButton("Sound On");
    var soundOff = new WireframeButton("Sound Off");

    var blank = new PIXI.Container();
    var blankTexture = blank.generateTexture(Common.renderer, 1.0, PIXI.SCALE_MODES.LINEAR);

    this._muteButton = new p3.MuteButton(blankTexture,
                                     blankTexture,
                                     blankTexture,
                                     soundOn.texture,
                                     soundOff.texture
                                     );
    this._muteButton.id = "mute";
    this._muteButton.scale = new PIXI.Point(0.6, 0.6);
    this._muteButton.y = this._guiButtonTopMargin;
    this.addChild(this._muteButton);
};
*/


SimpleScreen.prototype.initCoinCointainer = function(value)
{
	value = (typeof(value) != "undefined") ? value : Common.savedData.coins;
	
	if(!this._coinsContainer)
	{
		this._coinsContainer = new PIXI.Container();
		this._coinsContainer.y = this._guiButtonTopMargin;
		this.addChild(this._coinsContainer);

			this._coinsContainer._bg = new PIXI.Sprite(this._assetManager.getTexture("ui_snowflake_bg"));
			this._coinsContainer._bg.anchor.set(0, 0.5);
			this._coinsContainer.addChild(this._coinsContainer._bg);

			this._coinsContainer._text = new PIXI.extras.BitmapText(value.toString(), {font: "32px Superclarendon Numbers", align: "center"});
			this._coinsContainer._text.x = -this._coinsContainer._text.textWidth/2  + this._coinsContainer.width/2 + 15;
			this._coinsContainer._text.y = -this._coinsContainer._text.textHeight/2;
			this._coinsContainer.addChild(this._coinsContainer._text);

			// this._coinsContainer._text = new PIXI.Text(Common.savedData.coins, {font:"24px Arial", fill:0xffffff, align:'center'});
			// this._coinsContainer._text.x = this._coinsContainer.width/2 + 10;
			// this._coinsContainer._text.anchor.set(0.5);
			// this._coinsContainer.addChild(this._coinsContainer._text);

			this._coinsContainer._snowflake = new PIXI.Sprite(this._assetManager.getTexture("ui_icon_snowflake"));
			this._coinsContainer._snowflake.x = 20;
			this._coinsContainer._snowflake.anchor.set(0.5);
			this._coinsContainer.addChild(this._coinsContainer._snowflake);
	}
	else
	{	
		this._coinsContainer._text.x += this._coinsContainer._text.textWidth/2;
		this._coinsContainer._text.text = value.toString();
		this._coinsContainer._text.validate();
		this._coinsContainer._text.x -= this._coinsContainer._text.textWidth/2;
	}
};

/**
 */
SimpleScreen.prototype.hideGUI = function() {

};

/**
 */
SimpleScreen.prototype.showGUI = function() {

};


//===================================================
// PRIVATE METHODS
//===================================================


/**
 * @returns {Number}
 */
SimpleScreen.prototype._getFirstButtonPositionRight = function()
{
	return this._getBorderButtonPositionRight() - 90;
}

/**
 * @returns {Number}
 */
SimpleScreen.prototype._getSecondButtonPositionRight = function()
{
	return this._getFirstButtonPositionRight() - 100;
}

/**
 * @returns {Number}
 */
SimpleScreen.prototype._getBorderButtonPositionRight = function()
{
	return Math.min(Math.round((Common.STAGE_WIDTH + p3.View.width) * 0.5), Common.STAGE_WIDTH - 150);
}


/**
 * @returns {Number}
 */
SimpleScreen.prototype._getFirstButtonPositionLeft = function()
{
    return this._getBorderButtonPositionLeft() + 90;
}

/**
 * @returns {Number}
 */
SimpleScreen.prototype._getSecondButtonPositionLeft = function()
{
    return this._getFirstButtonPositionLeft() + 100;
}

/**
 * @returns {Number}
 */
SimpleScreen.prototype._getBorderButtonPositionLeft = function()
{
   return Math.max(Math.round((Common.STAGE_WIDTH - p3.View.width) * 0.5), 150);
}


//===================================================
// EVENTS
//===================================================

SimpleScreen.prototype.onGUIButtonClicked = function(button)
{
    if(button.id == "back")
        this.signals.requestedPreviousScreen.dispatch(button.id);
    else
        this.signals.GUIButtonClicked.dispatch(button.id);
};

/**
 * @param {!p3.Button} button
 */
SimpleScreen.prototype.onButtonClickedPrevious = function(button) {

};


//===================================================
// GETTERS/SETTERS
//===================================================

//===================================================


},{"../Common":2,"../general/WireframeButton":45,"../lib/Scene":50}],74:[function(require,module,exports){
var Common       	  = require("../Common");
var SimpleScreen 	  = require("./SimpleScreen");
var WireframeButton   = require("../general/WireframeButton");
var SoundSFX          = require("../general/SoundSFX");

//===================================================
// CONSTRUCTOR
//===================================================

/**
 * @constructor
 */
function SplashScreen()
{
	this.zoom = 1;
	this.focusPosition    = new PIXI.Point(Common.STAGE_WIDTH / 2, Common.STAGE_HEIGHT / 2);
	this.oldFocusPosition = new PIXI.Point(this.focusPosition.x, this.focusPosition.y);
	this.focusPoint    = new PIXI.Point(0.5, 0.5);

	this._mainContainer = null;
	this._centralArea   = null;
	this._leftArea      = null;
	this._rightArea     = null;

	this._leftButton  = null;
	this._rightButton = null;

	this._currentScreen = 1;
	this._currentcomm   = 0;
	this._commsData = null;
	this._comms = [];

	this.handleActive = false;
	this.handleY      = 0;
	this.handleMinY   = - 180;
	this.handleMaxY   = + 200;

	this.handleSFX = null;
	this.handleSFXCountdown = 0;

	this.parallaxLayers = [];

	SimpleScreen.call(this);

	this.isEndlessUnlocked = Common.savedData.levelsUnlocked > this._assetManager.getJSON("config").endless.levelRequired
	this.showIntro = Common.savedData.showSplashIntro;
	Common.savedData.showSplashIntro = false;

	this.signals.linkClick = new signals.Signal();
}

module.exports = SplashScreen;
SplashScreen.prototype = Object.create(SimpleScreen.prototype);
SplashScreen.prototype.constructor = SplashScreen;


//===================================================
// PUBLIC METHODS
//===================================================

/**
 */
SplashScreen.prototype.init = function()
{
	SimpleScreen.prototype.init.call(this);

	// Background
	this._bg = new PIXI.Sprite(this._assetManager.getTexture("ui_bg_main_menu"));
    this.addChild(this._bg);

	// Northern lights
	this._northernLights = new PIXI.Container();

		var layers = [];
		layers.push({image:"northern_lights_blue",  xScale:4,   yScale:2,   y:-180,  xTiling:15,});
		layers.push({image:"northern_lights_green", xScale:4,   yScale:2,   y:-215,  xTiling:-20});
		layers.push({image:"northern_lights_pink",  xScale:4,   yScale:2,   y:-250,  xTiling:10, });

		for(var i = 0; i < layers.length; i++)
		{
			var texture  = this._assetManager.getTexture(layers[i].image);
			var bg       = new PIXI.extras.TilingSprite(texture, Common.STAGE_WIDTH, texture.crop.height * layers[i].yScale);
			bg.tileScale = new PIXI.Point(layers[i].xScale, layers[i].yScale);
			bg.y         = layers[i].y;
			bg.alpha     = Common.savedData.getCollectedCrystalCount() / Common.savedData.getCrystalCount();
			bg.xTiling   = layers[i].xTiling;
			this._northernLights.addChild(bg);
		}

	this._bg.addChild(this._northernLights);


	// Main container
	this._mainContainer = new PIXI.Container();
	this.addChild(this._mainContainer);

	// Background elements
	this._background = new PIXI.Container();
	this._background.x = Common.STAGE_WIDTH/2;
	this._background.y = Common.STAGE_HEIGHT -100;
	this._mainContainer.addChild(this._background);

		// this._background._blur = new PIXI.filters.BlurFilter();
		// this._background._blur.blurX = 6;
		// this._background._blur.blurY = 6;
		// this._background.filters = [this._background._blur];

		this._background._rock_00 =  new PIXI.Sprite(this._assetManager.getTexture("menu_rock_00"));
		this._background._rock_00.anchor.set(0.5, 1);
		this._background._rock_00.x -= 350;
		this._background.addChild(this._background._rock_00);

		this._background._tree_00 =  new PIXI.Sprite(this._assetManager.getTexture("menu_tree_05"));
		this._background._tree_00.anchor.set(0.5, 1);
		this._background._tree_00.x -= 500;
		this._background.addChild(this._background._tree_00);

		this._background._tree_01 =  new PIXI.Sprite(this._assetManager.getTexture("menu_tree_06"));
		this._background._tree_01.anchor.set(0.5, 1);
		this._background._tree_01.x += 480;
		this._background._tree_01.y += 100;
		this._background.addChild(this._background._tree_01);

		this._background._tree_02 =  new PIXI.Sprite(this._assetManager.getTexture("menu_tree_05"));
		this._background._tree_02.anchor.set(0.5, 1);
		this._background._tree_02.x += 950;
		this._background._tree_02.scale.set(-0.8, 0.8);
		this._background.addChild(this._background._tree_02);

		this._background._tree_03 =  new PIXI.Sprite(this._assetManager.getTexture("menu_tree_06"));
		this._background._tree_03.anchor.set(0.5, 1);
		this._background._tree_03.x -= 980;
		this._background._tree_03.y += 40;
		this._background._tree_03.scale.set(0.7, 0.7);
		this._background.addChild(this._background._tree_03);

		this._background._carriage_00 =  new PIXI.Sprite(this._assetManager.getTexture("menu_carriage_00"));
		this._background._carriage_00.anchor.set(0.5, 1);
		this._background._carriage_00.x += 420;
		this._background._carriage_00.y += -110;
		this._background.addChild(this._background._carriage_00);

		var texture = this._assetManager.getTexture("ui_menu_snow");
		this._background._bg = new PIXI.extras.TilingSprite(texture, Common.STAGE_WIDTH * 3, texture.height);
		this._background._bg.anchor.set(0.5, 1);
		this._background._bg.tilePosition.x += texture.width/2;
		this._background.addChild(this._background._bg);

		var fill = new PIXI.Sprite(Common.generatedTextures['whiteSquare']);
		fill.width = Common.STAGE_WIDTH * 3;
		fill.height = 300;
		fill.tint = 0x9bc6e5;
		fill.anchor.set(0.5, 0);
		this._background.addChild(fill);

	// Background particles
	this._backgroundPSContainer = new PIXI.Container();
	this._backgroundPSContainer.x = Common.STAGE_WIDTH/2;
	this._backgroundPSContainer.alpha = this.showIntro ? 0 : 1;
	this._mainContainer.addChild(this._backgroundPSContainer);

	this.backgroundPS = new cloudkid.Emitter(this._backgroundPSContainer,
	[
		this._assetManager.getTexture("particle_snowflake_00"),
		this._assetManager.getTexture("particle_snowflake_01"),
		this._assetManager.getTexture("particle_snowflake_02"),
		this._assetManager.getTexture("particle_snowflake_03")
	], this._assetManager.getJSON("particle_menu_snow"));

	this.backgroundPS.update(5);
	this.backgroundPS.emit = true;

	// Left area
    this._leftArea = new PIXI.Container();
    this._leftArea.x = (Common.STAGE_WIDTH / 2) - 1000;
    this._leftArea.y = Common.STAGE_HEIGHT / 2;
    this._mainContainer.addChild(this._leftArea);

		// Title
		this._leftArea._title = new PIXI.Sprite(this._assetManager.getTexture("ui_title_bg"));
		this._leftArea._title.anchor.set(0.5);
		this._leftArea._title.position.set(- 100, -290);
		this._leftArea.addChild(this._leftArea._title);

			var copy = this._assetManager.getJSON("strings")["GOALS"][Common.COUNTRY_CODE];

			if(!webfont)
			{
				var text = new PIXI.extras.BitmapText(copy, {font: "50px Superclarendon Title Purple", align: "center"});
				text.x = -text.textWidth/2;
				text.y = -text.textHeight/2 - 4;
				this._leftArea._title.addChild(text);
			}
			else
			{
				var copy = this._assetManager.getJSON("strings")["GOALS"][Common.COUNTRY_CODE];
				var text = new PIXI.Text(copy, {font:"36px Arial", fill:0x000000, align:'center'});
				text.anchor.set(0.5);
				text.y -= 5;
				this._leftArea._title.addChild(text);
			}

		// Goals list
		this._leftArea._goalsContainer = new PIXI.Container();
		this._leftArea._goalsContainer.position.set(-100, -140);
		this._leftArea.addChild(this._leftArea._goalsContainer);

		this._leftArea._blur = new PIXI.filters.BlurFilter();
		this._leftArea._blur.blurX = 0;
		this._leftArea._blur.blurY = 0;
		this._leftArea.filters = [this._leftArea._blur];

		this._leftArea._goals = [];

			var activeGoals = Common.goalsManager.getActiveGoals();

			for(var active = 1; active >= 0; active--)
			{
				for(var i = 0; i < Common.goalsManager.goals.length; i++)
				{
					var id = Common.goalsManager.goals[i].id;
					var goalStatus = Common.goalsManager.getGoalStatus(id);

					// Show the active goals first, then the rest
					var keep = (active == 0);

					for(var j = 0; j < activeGoals.length; j++)
					{
						if(activeGoals[j].id == id)
						{
							keep = !keep;
							break;
						}
					}

					if(!keep) continue;

					// Goal
					var goal = new PIXI.Sprite(this._assetManager.getTexture("ui_goals_" + ((i%4)+1)));
					goal.anchor.set(0.5);
					goal.y = this._leftArea._goals.length * 100;
					this._leftArea._goalsContainer.addChild(goal);
					this._leftArea._goals.push(goal);

					var icon = new PIXI.Sprite(this._assetManager.getTexture(Common.goalsManager.goals[i].icon));
					icon.anchor.set(0, 0.5);
					icon.x = - 360;
					goal.addChild(icon);

					if(!webfont)
					{
						var text = new PIXI.extras.BitmapText(Common.goalsManager.goals[i].label, {font: "28px Mikadan Title", align: "left"});
						text.maxWidth = 400;
						text.updateText();
						text.x = -180;
						text.y = -text.textHeight/2;
						goal.addChild(text);
					}
					else
					{
						var text = new PIXI.Text(Common.goalsManager.goals[i].label, {font:"28px Arial", fill:0xFFFFFF, align: (r2l ? 'right' : 'left'), wordWrap:true, wordWrapWidth:400});
						text.x = r2l ? 220 : -180;
						text.anchor.set(r2l ? 1 : 0, 0.5);
						goal.addChild(text);
					}

					var progress = new PIXI.Container();
					progress.x = 300
					goal.addChild(progress);

						if(goalStatus == 1)
						{
							var progressBg = new PIXI.Sprite(this._assetManager.getTexture("ui_goals_complete"));
							progressBg.anchor.set(0.5);
							progress.addChild(progressBg);
						}
						else
						{
							var progressBg = new PIXI.Sprite(this._assetManager.getTexture("ui_goals_bar"));
							progressBg.anchor.set(0.5);
							progress.addChild(progressBg);

							if(goalStatus > 0)
							{
								var progressBar = new PIXI.Sprite(this._assetManager.getTexture("ui_goals_fill"));
								progressBar.anchor.set(0.5);
								progress.addChild(progressBar);

									var canvas = document.createElement('canvas');
									canvas.width  = 128;
									canvas.height = 128;
									var ctx = canvas.getContext("2d");

									ctx.moveTo(canvas.width/2, canvas.height/2);
									ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2, -Math.PI/2, 2*Math.PI*goalStatus-Math.PI/2);
									ctx.lineTo(canvas.width/2, canvas.height/2);
									ctx.fillStyle = 'white';
									ctx.fill();

									var mask = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
									mask.anchor.set(0.5);
									progressBar.addChild(mask);
									progressBar.mask = mask;
							}
						}
				}
			}

			var snow = new PIXI.Sprite(this._assetManager.getTexture("ui_snow_top"));
			snow.anchor.set(0.5, 1);
			snow.y = -15;
			snow.width = this._leftArea._goals[0].width+ 20;
			this._leftArea._goals[0].addChild(snow);

			// Mask
			var canvas = document.createElement('canvas');
			canvas.width  = 2;
			canvas.height = 512;
			var ctx = canvas.getContext("2d");

			var gradient = ctx.createLinearGradient(0,0,0,canvas.height);
			gradient.addColorStop(0, "rgba(255,255,255,0)");
			gradient.addColorStop(0.05, "rgba(255,255,255,1)");
			gradient.addColorStop(0.93, "rgba(255,255,255,1)");
			gradient.addColorStop(1, "rgba(255,255,255,0)");

			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			var mask = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
			mask.anchor.set(0.5, 0);
			mask.position.y -= 85;
			mask.width = 800;
			mask.height = 550;
			this._leftArea._goalsContainer.addChild(mask);
			this._leftArea._goalsContainer.mask = mask;

		// Goals scrollbar
		this._leftArea._goalsScroller = new PIXI.Sprite(this._assetManager.getTexture("ui_scroll_rope_bg"));
		this._leftArea._goalsScroller.anchor.set(0.5);
		this._leftArea._goalsScroller.x = 330;
		this._leftArea._goalsScroller.y = 60;
		this._leftArea.addChild(this._leftArea._goalsScroller);

			var texture = this._assetManager.getTexture("ui_scroll_rope_tile");
			this._leftArea._goalsScroller._rope = new PIXI.extras.TilingSprite(texture, texture.width, this._leftArea._goalsScroller.height - 10);
			this._leftArea._goalsScroller._rope.anchor.set(0.5);
			this._leftArea._goalsScroller.addChild(this._leftArea._goalsScroller._rope);

			var cap = new PIXI.Sprite(this._assetManager.getTexture("ui_scroll_rope_top"));
			cap.anchor.set(0.5, 1);
			cap.y = -this._leftArea._goalsScroller._rope.height/2 + 25;
			this._leftArea._goalsScroller._rope.addChild(cap);

			var cap = new PIXI.Sprite(this._assetManager.getTexture("ui_scroll_rope_bottom"));
			cap.anchor.set(0.5, 0);
			cap.y = this._leftArea._goalsScroller._rope.height/2 - 22;
			this._leftArea._goalsScroller._rope.addChild(cap);

			this._leftArea._goalsScroller._handle = new PIXI.Sprite(this._assetManager.getTexture("ui_scroll_handle"));
			this._leftArea._goalsScroller._handle.anchor      = new PIXI.Point(0.5, 0.5);
			this._leftArea._goalsScroller._handle.y           = this.handleMinY;
			this._leftArea._goalsScroller._handle.yReal       = this.handleMinY;
			this._leftArea._goalsScroller._handle.interactive = true;
			this._leftArea._goalsScroller.addChild(this._leftArea._goalsScroller._handle);

			this._leftArea._goalsScroller._handle.touchstart = this._leftArea._goalsScroller._handle.mousedown = function(e){this.onHandleDown(e)}.bind(this);
			this._leftArea._goalsScroller._handle.touchmove  = this._leftArea._goalsScroller._handle.mousemove = function(e){this.onHandleMove(e)}.bind(this);


	// Right area
    this._rightArea = new PIXI.Container();
    this._rightArea.x = (Common.STAGE_WIDTH / 2) + 1000;
    this._rightArea.y = Common.STAGE_HEIGHT / 2;
    this._mainContainer.addChild(this._rightArea);

		this._rightArea._bg = new PIXI.Sprite(this._assetManager.getTexture("ui_popup_bg"));
		this._rightArea._bg.anchor.set(0.5);
		this._rightArea._bg.y = 50;
		this._rightArea.addChild(this._rightArea._bg);

		var snow = new PIXI.Sprite(this._assetManager.getTexture("ui_snow_top"));
		snow.anchor.set(0.5, 1);
		snow.y = - 233;
		this._rightArea._bg.addChild(snow);

		this._rightArea._commContainer = new PIXI.Container();
		this._rightArea._commContainer.y = 50;
		this._rightArea.addChild(this._rightArea._commContainer);

			this._commsData = this._assetManager.getJSON("strings").comms;

			for(var i = 0; i < this._commsData.length; i++)
			{
				var comm = new PIXI.Container();
				comm.alpha = (i == 0) ? 1 : 0;

				comm.image = new PIXI.Sprite(PIXI.Texture.fromImage('assets/images/hd/comms/' + this._commsData[i].image));
				comm.image.anchor.set(0.5, 0);
				comm.image.y = -205;
				comm.image.interactive = (i == 0);
				comm.image.buttonMode = true;
				comm.image.touchstart = comm.image.mousedown = function(e){this.onCommClick();}.bind(this);
				comm.addChild(comm.image);

				this._rightArea._commContainer.addChild(comm);
				this._comms.push(comm);
			}

			if(this._commsData.length > 1)
			{
				this._rightArea._leftButton = new p3.Button
				(
					this._assetManager.getTexture("ui_btn_nav_out"),
					this._assetManager.getTexture("ui_btn_nav_over"),
					this._assetManager.getTexture("ui_btn_nav_down"),
					this._assetManager.getTexture("ui_icon_nav_arrow")
				);
				this._rightArea._leftButton.overSoundName = "sfx_btn_rollover_00";
				this._rightArea._leftButton.children[1].x = -5;
				this._rightArea._leftButton.children[1].scale.x = -1;
				this._rightArea._leftButton.position.set(-385, 260);
				this._rightArea._leftButton.signals.down.add(this.onCommPrev, this);
				this._rightArea.addChild(this._rightArea._leftButton);

				this._rightArea._rightButton = new p3.Button
				(
					this._assetManager.getTexture("ui_btn_nav_out"),
					this._assetManager.getTexture("ui_btn_nav_over"),
					this._assetManager.getTexture("ui_btn_nav_down"),
					this._assetManager.getTexture("ui_icon_nav_arrow")
				);
				this._rightArea._rightButton.overSoundName = "sfx_btn_rollover_00";
				this._rightArea._rightButton.position.set(385, 260);
				this._rightArea._rightButton.signals.down.add(this.onCommNext, this);
				this._rightArea.addChild(this._rightArea._rightButton);

				if(r2l)
				{
					this._rightArea._leftButton.scale.set(-1,1);
					this._rightArea._leftButton.position.set(385, 260);
					this._rightArea._rightButton.scale.set(-1,1);
					this._rightArea._rightButton.position.set(-385, 260);
				}
			}

	// Characters
	this._characters = new PIXI.Container();
	this._characters.x = Common.STAGE_WIDTH / 2;
	this._characters.y = Common.STAGE_HEIGHT;
	this._mainContainer.addChild(this._characters);

		this._characters._anna = new PIXI.Sprite(this._assetManager.getTexture("ui_menu_character_anna_elsa"));
		this._characters._anna.anchor.set(0.5, 1);
		this._characters._anna.x = 420;
		this._characters._anna.y = 150;
		this._characters.addChild(this._characters._anna);

		this._characters._kristoff = new PIXI.Sprite(this._assetManager.getTexture("ui_menu_character_kristoff"));
		this._characters._kristoff.anchor.set(0.5, 1);
		this._characters._kristoff.x = -200;
		this._characters._kristoff.y = 110;
		this._characters.addChild(this._characters._kristoff);

		this._characters._olaf = new PIXI.Sprite(this._assetManager.getTexture("ui_menu_character_olaf"));
		this._characters._olaf.anchor.set(0.5, 1);
		this._characters._olaf.x = 320;
		this._characters._olaf.y = 0;
		this._characters.addChild(this._characters._olaf);

		this._characters._pabbie = new PIXI.Sprite(this._assetManager.getTexture("ui_menu_character_pabbie"));
		this._characters._pabbie.anchor.set(0.5, 1);
		this._characters._pabbie.x = -370;
		this._characters._pabbie.y = 0;
		this._characters.addChild(this._characters._pabbie);


	// Center area
	this._centralArea = new PIXI.Container();
	this._centralArea.x = Common.STAGE_WIDTH / 2;
	this._centralArea.y = Common.STAGE_HEIGHT / 2;
	this._centralArea.alpha = this.showIntro ? 0.001 : 1;
	this._mainContainer.addChild(this._centralArea);

		// Story mode
		var crystalCount     = Common.savedData.getCrystalCount();
		var crystalCollected = Common.savedData.getCollectedCrystalCount();

		this._storyButton = new p3.Button
		(
			this._assetManager.getTexture("ui_btn_nav_out_big"),
			this._assetManager.getTexture("ui_btn_nav_over_big"),
			this._assetManager.getTexture("ui_btn_nav_down_big"),
			this._assetManager.getTexture("ui_icon_nav_play")
		);
		this._storyButton.overSoundName = "sfx_btn_rollover_00";
		this._storyButton.position.set(-160, 90 + (crystalCollected == crystalCount ? -20 : 0));
		this._storyButton.signals.down.add(this.onStoryClick, this);
		this._centralArea.addChild(this._storyButton);

		// Story label
		var copy = this._assetManager.getJSON("strings")["STORY"][Common.COUNTRY_CODE];
		if(!webfont)
		{
			var text = new PIXI.extras.BitmapText(copy, {font: "50px Superclarendon Title", align: "center"});
			text.x = this._storyButton.position.x - text.textWidth/2;
			text.y = this._storyButton.position.y + 110 - text.textHeight/2;
			this._centralArea.addChild(text);
		}
		else
		{
			var text = new PIXI.Text(copy, {font:"48px Arial", fill:0xffffff, align:'center'});
			text.position.set(this._storyButton.position.x, this._storyButton.position.y + 110);
			text.anchor.set(0.5);
			this._centralArea.addChild(text);
		}

		// Troll count
		if(crystalCollected == crystalCount)
		{
			var trollCollected = Common.savedData.getCollectedTrollCount();
			var trollCount     = Common.savedData.getTrollCount();

			var trollBg = new PIXI.Sprite(this._assetManager.getTexture("ui_menu_trolls"));
			trollBg.anchor.set(0.5, 1);
			trollBg.x = this._storyButton.x;
			trollBg.y = 395;
			this._centralArea.addChild(trollBg);

			if(!webfont)
			{
				var text = new PIXI.extras.BitmapText(trollCollected + "/" + trollCount, {font: "20px Superclarendon Level", align: "center"});
				text.x = -text.textWidth/2 + 46;
				text.y = -text.textHeight/2 - 80;
				trollBg.addChild(text);
			}
			else
			{
				var text = new PIXI.Text(trollCollected + "/" + trollCount, {font:"24px Arial", fill:0x000000, align:'center'});
				text.anchor.set(0.5);
				text.x += 45;
				text.y -= 78;
				trollBg.addChild(text);
			}
		}

		// Crystal count
		var storyBg = new PIXI.Sprite(this._assetManager.getTexture("ui_menu_crystals_bg"));
		storyBg.anchor.set(0.5);
		storyBg.x = this._storyButton.x;
		storyBg.y = this._storyButton.y + 200 - 6;
		this._centralArea.addChild(storyBg);

			if(!webfont)
			{
				var text = new PIXI.extras.BitmapText(crystalCollected + "/" + crystalCount, {font: "20px Superclarendon Level", align: "center"});
				text.x = -text.textWidth/2  - 46;
				text.y = -text.textHeight/2 - 16;
				storyBg.addChild(text);
			}
			else
			{
				var text = new PIXI.Text(crystalCollected + "/" + crystalCount, {font:"24px Arial", fill:0x000000, align:'center'});
				text.anchor.set(0.5);
				text.x -= 45;
				text.y -= 12;
				storyBg.addChild(text);
			}



		// Endless mode
		this._endlessButton = new p3.Button
		(
			this._assetManager.getTexture(this.isEndlessUnlocked ? "ui_btn_nav_out_big"  : "ui_btn_nav_out_big_inactive"),
			this._assetManager.getTexture(this.isEndlessUnlocked ? "ui_btn_nav_over_big" : "ui_btn_nav_over_big_inactive"),
			this._assetManager.getTexture(this.isEndlessUnlocked ? "ui_btn_nav_down_big" : "ui_btn_nav_down_big_inactive"),
			this._assetManager.getTexture(this.isEndlessUnlocked ? "ui_icon_nav_play"    : "ui_icon_nav_lock")
		);
		this._endlessButton.x = 110;
		this._endlessButton.y = this._storyButton.position.y;
		this._endlessButton.signals.down.add(this.onEndlessClick, this);
		this._endlessButton.overSoundName = "sfx_btn_rollover_00";
		this._centralArea.addChild(this._endlessButton);

		if(!this.isEndlessUnlocked)
			this._endlessButton.children[1].position.set(-2, -3);



		// Endless label
		var copy = this._assetManager.getJSON("strings")["ENDLESS"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var text = new PIXI.extras.BitmapText(copy, {font: "50px Superclarendon Title", align: "center"});
			text.x = this._endlessButton.position.x - text.textWidth/2;
			text.y = this._endlessButton.position.y + 110 - text.textHeight/2;
			this._centralArea.addChild(text);
		}
		else
		{
			var text = new PIXI.Text(copy, {font:"48px Arial", fill:0xffffff, align:'center'});
			text.position.set(this._endlessButton.position.x, this._endlessButton.position.y + 110);
			text.anchor.set(0.5);
			this._centralArea.addChild(text);
		}

		// Endless record
		var endlessBg = new PIXI.Sprite(this._assetManager.getTexture("ui_menu_hiscore_bg"));
		endlessBg.anchor.set(0.5);
		endlessBg.x = this._endlessButton.x;
		endlessBg.y = this._endlessButton.y + 185;
		this._centralArea.addChild(endlessBg);

			var copy = this._assetManager.getJSON("strings")["HISCORE"][Common.COUNTRY_CODE];
			copy = copy.replace("{value}", Common.savedData.getHighscore("endless"));

			if(!webfont)
			{
				var text = new PIXI.extras.BitmapText(copy, {font: "20px Superclarendon Level", align: "center"});
				text.x = -text.textWidth/2;
				text.y = -text.textHeight/2 - 6;
				endlessBg.addChild(text);
			}
			else
			{
				var text = new PIXI.Text(copy, {font:"20px Arial", fill:0x000000, align:'center'});
				text.anchor.set(0.5);
				text.y -= 4;
				endlessBg.addChild(text);
			}

	// Foreground particles
	this._foregroundPSContainer = new PIXI.Container();
	this._foregroundPSContainer.x = Common.STAGE_WIDTH/2;
	this._foregroundPSContainer.alpha = this.showIntro ? 0 : 1;
	this._mainContainer.addChild(this._foregroundPSContainer);

	this.foregroundPS = new cloudkid.Emitter(this._foregroundPSContainer,
	[
		this._assetManager.getTexture("particle_snowflake_00"),
		this._assetManager.getTexture("particle_snowflake_01"),
		this._assetManager.getTexture("particle_snowflake_02"),
		this._assetManager.getTexture("particle_snowflake_03")
	], this._assetManager.getJSON("particle_menu_snow"));

	this.foregroundPS.update(5);
	this.foregroundPS.emit = true;

	// Snow overlay
	this._overlay = new PIXI.Container();
	this._overlay.x = Common.STAGE_WIDTH/2;
	this._overlay.y = Common.STAGE_HEIGHT + 90;

	this._mainContainer.addChild(this._overlay);

		var texture = this._assetManager.getTexture("ui_menu_snow");
		this._overlay._bg = new PIXI.extras.TilingSprite(texture, Common.STAGE_WIDTH * 3, texture.height);
		this._overlay._bg.anchor.set(0.5, 1);
		this._overlay.addChild(this._overlay._bg);

		var fill = new PIXI.Sprite(Common.generatedTextures['whiteSquare']);
		fill.width = Common.STAGE_WIDTH * 3;
		fill.height = 300;
		fill.tint = 0x9bc6e5;
		fill.anchor.set(0.5, 0);
		this._overlay.addChildAt(fill, 0);


	//UI
	this._leftButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_sidenav_out"),
		this._assetManager.getTexture("ui_btn_sidenav_over"),
		this._assetManager.getTexture("ui_btn_sidenav_down"),
		this._assetManager.getTexture("ui_icon_sidenav_arrow")
	);
	this._leftButton.children[0].anchor.set(0, 0.5);
	this._leftButton.children[1].anchor.set(0, 0.5);
	this._leftButton.y = Common.STAGE_HEIGHT / 2;
	this._leftButton.alpha = this.showIntro ? 0 : 1;
	this._leftButton.signals.down.add(this.onLeftClick, this);
	this._leftButton.overSoundName = "sfx_btn_rollover_00";
	this.addChild(this._leftButton);

	this._rightButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_sidenav_out"),
		this._assetManager.getTexture("ui_btn_sidenav_over"),
		this._assetManager.getTexture("ui_btn_sidenav_down"),
		this._assetManager.getTexture("ui_icon_sidenav_arrow")
	);
	this._rightButton.scale.x = -1;
	this._rightButton.children[0].anchor.set(0, 0.5);
	this._rightButton.children[1].anchor.set(0, 0.5);
	this._rightButton.y = Common.STAGE_HEIGHT / 2;
	this._rightButton.alpha = this.showIntro ? 0 : 1;
	this._rightButton.signals.down.add(this.onRightClick, this);
	this._rightButton.overSoundName = "sfx_btn_rollover_00";
	this.addChild(this._rightButton);

	// Help button
	this._helpButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_con_out"),
		this._assetManager.getTexture("ui_btn_con_over"),
		this._assetManager.getTexture("ui_btn_con_down"),
		this._assetManager.getTexture("ui_icon_con_help")
	);
	this._helpButton.overSoundName = "sfx_btn_rollover_00";
	this._helpButton.y = this._guiButtonTopMargin;
	this._helpButton.scale.set(0);
	this._helpButton.signals.down.add(this.onHelpPressed, this);
	this.addChild(this._helpButton);

	// Mute button
	this._muteButton = new p3.MuteButton
	(
		this._assetManager.getTexture("ui_btn_con_out"),
		this._assetManager.getTexture("ui_btn_con_over"),
		this._assetManager.getTexture("ui_btn_con_down"),
		this._assetManager.getTexture("ui_icon_con_sound_on"),
		this._assetManager.getTexture("ui_icon_con_sound_off")
	);
	this._muteButton.overSoundName = "sfx_btn_rollover_00";
	this._muteButton.id = "mute";
	this._muteButton.y = this._guiButtonTopMargin;
	this._muteButton.scale.set(0);
	this._muteButton.init();
	this.addChild(this._muteButton);

	// Code button
	this._codeButton = new p3.Button
	(
		this._assetManager.getTexture("ui_btn_code_normal"),
		this._assetManager.getTexture("ui_btn_code_over"),
		this._assetManager.getTexture("ui_btn_code_press"),
		Common.generatedTextures['whiteSquare']
	);
	this._codeButton.overSoundName = "sfx_btn_rollover_00";
	this._codeButton.y = this._guiButtonTopMargin;
	this._codeButton.scale.set(0);
	this._codeButton.signals.down.add(this.onCodePressed, this);
	this.addChild(this._codeButton);

		var copy = this._assetManager.getJSON("strings")["ENTER_CODE"][Common.COUNTRY_CODE];

		if(!webfont)
		{
			var text = new PIXI.extras.BitmapText(copy, {font: "28px Superclarendon Title", align: "center"});
			text.x = -text.textWidth/2;
			text.y = -text.textHeight/2;
			this._codeButton.children[0].addChild(text);
		}
		else
		{
			var text = new PIXI.Text(copy, {font:"28px Arial", fill:0xffffff, align:'center'});
			text.anchor.set(0.5);
			this._codeButton.children[0].addChild(text);
		}


	// Music
	if(!!Common.bgMusic) Common.bgMusic.fadeOut(0, 500);
	Common.bgMusic = SoundSFX.play('mx_frozen_03_main_menu_edit', {loop:true, volume:0});
	Common.bgMusic.fadeIn(Common.bgMusicVolume, 500);

	// Event Tracking
	Common.ctow.trackEvent(
	{
		event      : "game_enter",
		game_tier1 : "enter",
		game_tier2 : "mainmenu"
	});

	// Show endless mode unlocked
	if(Common.savedData.endGameMessage.endless.show && !Common.savedData.endGameMessage.endless.shown)
	{
		Common.animator.setTimeout(function()
		{
			this.signals.GUIButtonClicked.dispatch("endless_unlocked");
		}, 1.2, this);

		Common.savedData.endGameMessage.endless.shown = true;
		Common.savedData.save();
	}

	// Parallax layers
	this.parallaxLayers.push({layer:this._background._rock_00,     parallax:{x:-0.2,   y:0, scale:1}});
	this.parallaxLayers.push({layer:this._background._tree_00,     parallax:{x:-0.15,  y:0, scale:1}});
	this.parallaxLayers.push({layer:this._background._tree_01,     parallax:{x:-0.125, y:0, scale:1}});
	this.parallaxLayers.push({layer:this._background._tree_02,     parallax:{x:-0.15,  y:0, scale:1}});
	this.parallaxLayers.push({layer:this._background._tree_03,     parallax:{x:-0.125, y:0, scale:1}});
	this.parallaxLayers.push({layer:this._background._carriage_00, parallax:{x:-0.13,  y:0, scale:1}});
	this.parallaxLayers.push({layer:this._background._bg,          parallax:{x:-0.1,   y:0, scale:1}});
	this.parallaxLayers.push({layer:this._characters._kristoff,    parallax:{x:0.15,   y:0, scale:1}});
	this.parallaxLayers.push({layer:this._characters._anna,        parallax:{x:0.15,   y:0, scale:1}});
	this.parallaxLayers.push({layer:this._characters._olaf,        parallax:{x:0.05,   y:0, scale:1}});
	this.parallaxLayers.push({layer:this._characters._pabbie,      parallax:{x:0.05,   y:0, scale:1}});
	this.parallaxLayers.push({layer:this._foregroundPSContainer,   parallax:{x:0.25,   y:0, scale:1}});
	this.parallaxLayers.push({layer:this._centralArea,             parallax:{x:0.40,   y:0, scale:1}});
	this.parallaxLayers.push({layer:this._overlay,                 parallax:{x:0.5,    y:0, scale:4}});

	// Animation
	this._leftArea.scale.set(1);
	// this._leftArea.x += 300;

	this._rightArea.scale.set(1);
	// this._rightArea.x -= 300;

	if(this.showIntro)
	{
		this.setZoom(0.6);
		this.changeZoom(1/this._centralArea.scale.x, 2, 1)

		// var tl = new TimelineMax();
		// tl.to(this._leftArea,  2, {x: this._leftArea.x  - 100, ease:Sine.easeInOut}, 1);
		// tl.to(this._leftArea,  2, {x: this._leftArea.x  - 100, ease:Sine.easeInOut}, 1);
		// tl.to(this._rightArea.scale, 2, {x: this._rightArea.x + 100, ease:Sine.easeInOut}, 1);
		// tl.to(this._rightArea, 2, {x: this._rightArea.x + 100, ease:Sine.easeInOut}, 1);
		// Common.animator.add(tl);
		// this._leftArea.x -= 100;
		// this._rightArea.x += 100;
	}
	else
	{
		this._leftArea.x -= 100;
		this._rightArea.x += 100;
	}
};

/**
 * Update
 */
SplashScreen.prototype.update = function()
{
	this._mainContainer.x = Common.STAGE_WIDTH  * this.focusPoint.x - this.focusPosition.x * this.zoom;
	this._mainContainer.y = Common.STAGE_HEIGHT * this.focusPoint.y - this.focusPosition.y * this.zoom;
	this._mainContainer.scale.set(this.zoom, this.zoom);

	this.backgroundPS.update(p3.Timestep.deltaTime);
	this.foregroundPS.update(p3.Timestep.deltaTime);

	if(!!this.handleSFX && this.handleSFXCountdown > 0)
	{
		this.handleSFXCountdown -= p3.Timestep.deltaTime;

		if(this.handleSFXCountdown <= 0)
		{
			this.handleSFX.stop();
			this.handleSFXCountdown = 0;
		}
	}

	// Northern lights
	for(var i = 0; i < this._northernLights.children.length; i++)
	{
		this._northernLights.children[i].tilePosition.x += p3.Timestep.deltaTime * this._northernLights.children[i].xTiling;
	}
};

/**
 * On resize callback
 */
SplashScreen.prototype.resize = function()
{
	SimpleScreen.prototype.resize.call(this);

	this._leftButton.x  = this._getBorderButtonPositionLeft();
	this._rightButton.x = this._getBorderButtonPositionRight();
	this._muteButton.x  = this._getFirstButtonPositionRight();
	this._helpButton.x  = this._getSecondButtonPositionRight();
	this._codeButton.x  = this._getFirstButtonPositionLeft() + 80;
};

/**
 * Dispose
 */
SplashScreen.prototype.dispose = function()
{
}

/**
 * @param {Function=} callback
 * @param {*=}scope
 */
SplashScreen.prototype.animateIn = function(callback, scope)
{
	SimpleScreen.prototype.animateIn.call(this);

	var tl = new TimelineMax();
	tl.to(this._helpButton.scale, .5, {x:1, y:1, ease:Back.easeOut}, 1.3);
	tl.to(this._muteButton.scale, .5, {x:1, y:1, ease:Back.easeOut}, 1.4);
	tl.to(this._codeButton.scale, .5, {x:1, y:1, ease:Back.easeOut}, 1.5);

	if(this.showIntro)
	{
		tl.to(this._centralArea, 1, {alpha: 1, ease:Linear.easeNone}, 1);
		tl.to(this._backgroundPSContainer, 1, {alpha: 1, ease:Linear.easeNone}, 0.5);
		tl.to(this._foregroundPSContainer, 1, {alpha: 1, ease:Linear.easeNone}, 0.5);
		tl.to(this._leftButton,  0.5, {alpha: 1, ease:Linear.easeNone}, 1.5);
		tl.to(this._rightButton, 0.5, {alpha: 1, ease:Linear.easeNone}, 1.5);
	}

	Common.animator.add(tl);
};

/**
 * @param {Function=} callback
 * @param {*=}scope
 */
SplashScreen.prototype.animateOut = function(callback, scope)
{
	SimpleScreen.prototype.animateOut.call(this);

	var tl = new TimelineMax({onCompleteScope:scope, onComplete:callback});
	tl.to(this._helpButton.scale, .35, {x:0, y:0, ease:Back.easeIn}, 0);
	tl.to(this._muteButton.scale, .35, {x:0, y:0, ease:Back.easeIn}, 0);
	tl.to(this._codeButton.scale, .35, {x:0, y:0, ease:Back.easeIn}, 0);
	Common.animator.add(tl);
};

//===================================================
// PRIVATE METHODS
//===================================================

/**
 */
SplashScreen.prototype.animate = function(direction)
{
	if(TweenMax.isTweening(this)) return;
	if(TweenMax.isTweening(this.focusPosition)) return;

	if(Math.sign(direction) == 1)
	{
		this._currentScreen--;

		// Event Tracking
		Common.ctow.trackEvent(
		{
			event      : "game_enter",
			game_tier1 : "enter",
			game_tier2 :  this._currentScreen == 0 ? "goals" : "mainmenu"
		});
	}
	else
	{
		this._currentScreen++;

		// Event Tracking
		Common.ctow.trackEvent(
		{
			event      : "game_enter",
			game_tier1 : "enter",
			game_tier2 :  this._currentScreen == 2 ? "comscreen" : "mainmenu"
		});
	}


	switch(this._currentScreen)
	{
		case 0:
			SoundSFX.play("sfx_goals_screen_spotfx_00");
			this.changeZoom(1/this._leftArea.scale.x, 1)
			this.changeFocusPosition(new PIXI.Point(this._leftArea.x, this._leftArea.y), 1);
			break;

		case 1:
			SoundSFX.play("sfx_main_screen_spotfx_01");
			this.changeZoom(1/this._centralArea.scale.x, 1)
			this.changeFocusPosition(new PIXI.Point(Common.STAGE_WIDTH / 2, Common.STAGE_HEIGHT / 2), 1);
			break;

		case 2:
			SoundSFX.play("sfx_promo_screen_spotfx_00");
			this.changeZoom(1/this._rightArea.scale.x, 1)
			this.changeFocusPosition(new PIXI.Point(this._rightArea.x, this._rightArea.y), 1);
			break;
	}
}

/**
 */
SplashScreen.prototype.setLeftRightButtons = function()
{
	var tl = new TimelineMax();

	if(this._currentScreen <= 0)
		tl.to(this._leftButton,  .5, {alpha:0, ease:Sine.easeOut}, 0);
	else
		tl.to(this._leftButton,  .5, {alpha:1, ease:Sine.easeOut}, 0);

	if(this._currentScreen >= 2)
		tl.to(this._rightButton, .5, {alpha:0, ease:Sine.easeOut}, 0);
	else
		tl.to(this._rightButton, .5, {alpha:1, ease:Sine.easeOut}, 0);

	Common.animator.add(tl);

	this._leftButton.interactive  = this._currentScreen > 0;
	this._rightButton.interactive = this._currentScreen < 2;
}

/**
 * Set zoom
 * @param {Number} zoom (1: 100%)
 */
SplashScreen.prototype.setZoom = function(zoom)
{
	this.zoom = zoom;
}

/**
 * Change zoom over time
 * @param {Number} zoom (1: 100%)
 * @param {Number} time
 * @param {Number} delay
 */
SplashScreen.prototype.changeZoom = function(zoom, time, delay)
{
	if(this.zoomTween != null)
		this.zoomTween.kill();

	if(zoom == this.zoom) return;

	this.zoomTween = new TimelineMax();
	this.zoomTween.to(this, time, {zoom: zoom, ease:Sine.easeInOut}, !!delay ? delay : 0);
	Common.animator.add(this.zoomTween);

	this.zoomTarget = zoom;
}

/**
 * Change the focus point over time
 * @param {PIXI.Point} focusPoint
 * @param {Number} time
 * @param {Number} delay
 */
SplashScreen.prototype.changeFocusPoint = function(focusPoint, time, delay)
{
	if(this.focusPointTween != null)
		this.focusPointTween.kill();

	if(this.focusPoint.equal(focusPoint)) return;

	this.focusPointTween = new TimelineMax();
	this.focusPointTween.to(this.focusPoint, time, {x: focusPoint.x, y:focusPoint.y, ease:Sine.easeInOut}, !!delay ? delay : 0);
	Common.animator.add(this.focusPointTween);
}

/**
 * Change the focus position over time
 * @param {PIXI.Point} focusPoint
 * @param {Number} time
 * @param {Number} delay
 */
SplashScreen.prototype.changeFocusPosition = function(focusPosition, time, delay)
{
	if(this.focusPointTween != null)
		this.focusPointTween.kill();

	if(this.focusPosition.equal(focusPosition)) return;

	this.focusPointTween = new TimelineMax();
	this.focusPointTween.to(this.focusPosition, time, {x: focusPosition.x, y:focusPosition.y, ease:Sine.easeInOut, onUpdateScope:this, onUpdate:function()
		{
			var deltaPosition = new PIXI.Point(this.focusPosition.x - this.oldFocusPosition.x, this.focusPosition.y - this.oldFocusPosition.y);

			for(var i = 0; i < this.parallaxLayers.length; i++)
			{
				this.parallaxLayers[i].layer.x -= deltaPosition.x * this.parallaxLayers[i].parallax.x;
				this.parallaxLayers[i].layer.y -= deltaPosition.y * this.parallaxLayers[i].parallax.y;
			}

			this.oldFocusPosition.set(this.focusPosition.x, this.focusPosition.y);
		}
	}, !!delay ? delay : 0);
	Common.animator.add(this.focusPointTween);
}



//===================================================
// EVENTS
//===================================================

/**
 */
SplashScreen.prototype.onStoryClick = function()
{
	Common.savedData.endless = false;

	if(Common.savedData.levelsUnlocked == 1)
	{
		if(!Common.savedData.hasSeenIntro)
		{
			this.signals.requestedNextScreen.dispatch('intro');
		}
		else
		{
			this.signals.requestedNextScreen.dispatch('tutorial');
		}
	}
	else
	{
		this.signals.requestedNextScreen.dispatch('story');
	}

	Common.ctow.trackEvent(
	{
		event      : "game_enter",
		game_tier1 : "enter",
		game_tier2 : "story"
	});

	SoundSFX.play("sfx_btn_press_00");

	// Music end
	// Common.bgMusic.fadeOut(0, 600);
}

/**
 */
SplashScreen.prototype.onEndlessClick = function()
{
	var levelRequired = this._assetManager.getJSON("config").endless.levelRequired;

	if(!this.isEndlessUnlocked)
	{
		this.signals.GUIButtonClicked.dispatch("endless");
	}
	else
	{
		Common.savedData.endless = true;
		this.signals.requestedNextScreen.dispatch('endless');
	}

	Common.ctow.trackEvent(
	{
		event      : "game_enter",
		game_tier1 : "enter",
		game_tier2 : "endless"
	});

	SoundSFX.play("sfx_btn_press_00");

	// Music end
	// Common.bgMusic.fadeOut(0, 600);
}


/**
 */
SplashScreen.prototype.onHelpPressed = function(e)
{
	this.signals.GUIButtonClicked.dispatch("help");

	Common.ctow.trackEvent(
	{
		event      : "game_enter",
		game_tier1 : "enter",
		game_tier2 : "help"
	});

	SoundSFX.play("sfx_btn_press_00");
}

/**
 */
SplashScreen.prototype.onCodePressed = function(e)
{
	this.signals.GUIButtonClicked.dispatch("code");

	SoundSFX.play("sfx_btn_press_00");
}

/**
 */
SplashScreen.prototype.onLeftClick = function()
{
	this.animate(1);
	this.setLeftRightButtons();
}

/**
 */
SplashScreen.prototype.onRightClick = function()
{
	this.animate(-1);
	this.setLeftRightButtons();
}

/**
 */
SplashScreen.prototype.onHandleDown = function(e)
{
	this.handleActive = true;
	this.handleY = e.data.getLocalPosition(this).y;
	this.handleUp = function(){this.onHandleUp();}.bind(this)

	document.body.addEventListener('touchend', this.handleUp);
	document.body.addEventListener('mouseup', this.handleUp);
}

/**
 */
SplashScreen.prototype.onHandleUp = function()
{
	this.handleActive = false;
	document.body.removeEventListener("mouseup",  this.handleUp);
	document.body.removeEventListener("touchend", this.handleUp);
}

/**
 */
SplashScreen.prototype.onHandleMove = function(e)
{
	if(!this.handleActive) return;

	var newY = e.data.getLocalPosition(this).y;

	var delta = newY - this.handleY;

	if(this._leftArea._goalsScroller._handle.y + delta < this.handleMinY)
		delta = this.handleMinY - this._leftArea._goalsScroller._handle.y
	else if(this._leftArea._goalsScroller._handle.y + delta > this.handleMaxY)
		delta = this.handleMaxY - this._leftArea._goalsScroller._handle.y

	this._leftArea._goalsScroller._rope.tilePosition.y += delta;
	this._leftArea._goalsScroller._handle.y += delta;

	var perc   = (this._leftArea._goalsScroller._handle.y - this.handleMinY)/( this.handleMaxY - this.handleMinY);
	var nSteps = this._leftArea._goals.length - 4;
	var step   = (perc /(1/(nSteps-1)));

	for(var i = 0; i < this._leftArea._goals.length; i++)
	{
		this._leftArea._goals[i].y = 100 * (i-step);
	}

	this.handleY = newY;

	if(this.handleSFXCountdown == 0)
	{
		this.handleSFX = SoundSFX.play("sfx_pulley_down_loop_04", {loop:true});
	}
	this.handleSFXCountdown = 0.2;
}

/**
 */
SplashScreen.prototype.onCommPrev = function()
{
	this._comms[this._currentcomm].image.interactive = false;
	// this._comms[this._currentcomm].link.interactive = false;

	nextcomm = this._currentcomm-1;
	if(nextcomm < 0) nextcomm = this._comms.length -1;

	var tl = new TimelineMax(
	{
		onCompleteScope:this,
		onComplete:function()
		{
			this._comms[nextcomm].image.interactive = true;
			// this._comms[nextcomm].link.interactive = true;
		}
	});
		tl.to(this._comms[this._currentcomm],  .5, {alpha:0, ease:Sine.easeInOut}, 0);
		tl.to(this._comms[nextcomm],           .5, {alpha:1, ease:Sine.easeInOut}, 0);
	Common.animator.add(tl);

	SoundSFX.play("sfx_btn_press_00");

	this._currentcomm = nextcomm;
}

/**
 */
SplashScreen.prototype.onCommNext = function()
{
	this._comms[this._currentcomm].image.interactive = false;
	// this._comms[this._currentcomm].link.interactive = false;

	nextcomm = this._currentcomm+1;
	if(nextcomm >= this._comms.length) nextcomm = 0;

	var tl = new TimelineMax(
	{
		onCompleteScope:this,
		onComplete:function()
		{
			this._comms[nextcomm].image.interactive = true;
			// this._comms[nextcomm].link.interactive = true;
		}
	});
		tl.to(this._comms[this._currentcomm],  .5, {alpha:0, ease:Sine.easeInOut}, 0);
		tl.to(this._comms[nextcomm],           .5, {alpha:1, ease:Sine.easeInOut}, 0);
	Common.animator.add(tl);

	SoundSFX.play("sfx_btn_press_00");

	this._currentcomm = nextcomm;
}

/**
 */
SplashScreen.prototype.onCommClick = function()
{
	// Event Tracking
	Common.ctow.trackEvent(
	{
		event      : "game_action",
		game_tier1 : "com_screen",
		game_tier2 : "slide" + (this._currentcomm+1)
	});

	// this._blur = new PIXI.filters.BlurFilter();
	// this._blur.blurX = 3;
	// this._blur.blurY = 3;
	// this.filters = [this._blur];

	// Open a new window
	// var url = this._commsData[this._currentcomm].url;
	// var win = window.open(url, '_system');
	// win.focus();

	this.signals.linkClick.dispatch(this._commsData[this._currentcomm].url, !!this._commsData[this._currentcomm].disney);
	SoundSFX.play("sfx_btn_press_00");
}
},{"../Common":2,"../general/SoundSFX":44,"../general/WireframeButton":45,"./SimpleScreen":73}]},{},[6])