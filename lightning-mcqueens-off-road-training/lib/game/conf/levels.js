ig.module( 
	'game.conf.levels' 
)
.requires(
	'impact.game',
	
	// level files:
	'game.levels.bitmaptest',
	'game.levels.mudtest',
	'game.levels.obstacletest',
	'game.levels.debugmap',
	'game.levels.Level1',
	'game.levels.Level2',
	'game.levels.Level3',
	'game.levels.Level4',
	'game.levels.Level5',
	'game.levels.Level6'
)
.defines(function(){
	
	ig.Game.inject({
		
		
		
		
		levelInfo:[
			{
				//
				levelClass:LevelLevel1,
				levelBgName:'levelBG1',
				/*
				levelClass:LevelDebugmap,
				levelBgName:'debuglevel',
				*/
				levelMode:'race',
				levelTime:120,
				scoreStarAmounts:[10000,20000,30000],
				levelBgTileSize:512
				
			},
			{
				
				levelClass:LevelLevel2,
				levelBgName:'levelBG2',
				levelMode:'fetch',
				levelTime:180,
				scoreStarAmounts:[10000,20000,30000],
				levelBgTileSize:512
				
			},
			{
				
				levelClass:LevelLevel3,
				levelBgName:'levelBG3',
				levelMode:'obstacle',
				levelTime:120,
				scoreStarAmounts:[10000,20000,30000],
				levelBgTileSize:512
				
			},
			{
				levelClass:LevelLevel4,
				levelBgName:'levelBG4',
				levelMode:'race',
				levelTime:120,
				scoreStarAmounts:[10000,20000,30000],
				levelBgTileSize:512
				
			},
			{
				levelClass:LevelLevel5,
				levelBgName:'levelBG5',
				levelMode:'fetch',
				levelTime:180,
				scoreStarAmounts:[10000,20000,30000],
				levelBgTileSize:512
				
			},
			{
				levelClass:LevelLevel6,
				levelBgName:'levelBG6',
				levelMode:'obstacle',
				levelTime:120,
				scoreStarAmounts:[10000,20000,30000],
				levelBgTileSize:512
				
			},
		]
		
		
		
		
		
	});
	
});
