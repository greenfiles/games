ig.module( 
	'game.conf.controls' 
)
.requires(
	'impact.game'
)
.defines(function(){
	
	ig.Game.inject({
		
		controlInfo:{
			
			
			
			allowCheats:false,
			
			
			//for keyboard mode;
			//true: left+right steer, up+down accelerate/reverse
			//false: arrows are compass directions
			tankmode:true,
			
			
			//for touchscreens;
			//true: gas pedal on screen
			//false: touching joystick is gas pedal
			gaspedal:false,
			
			
			// driveSpeed: speed added each frame
			// driveFriction: closer to 1 = keep rolling while not accelerating
			// driftFriction: closer to 1 = keep sliding 'sideways' after turning
			// turnSpeed: 'full' turning amount per frame
			// turnSmooth: closer to 1 = more abrupt in/out of full turning speed
			terrainTypes:[
				{// grass
					driveSpeed:0.2,
					driveFriction:0.98,
					driftFriction:0.8,
					turnSpeed:0.07,
					turnSmooth:0.5,
					
					smokeSizeStart:0.5,
					smokeSizeGrow:0.15,
					smokeAlphaStartFrac:0.1,
					smokeAlphaFade:0.045,
					smokeSpeedFrac:0.07,
					smokeDelayFrames:1
				},
				{// road
					driveSpeed:0.3,
					driveFriction:0.98,
					driftFriction:0.96,
					turnSpeed:0.07,
					turnSmooth:0.5,
					
					smokeSizeStart:0.7,
					smokeSizeGrow:0.09,
					smokeAlphaStartFrac:0.1,
					smokeAlphaFade:0.06,
					smokeSpeedFrac:0.07,
					smokeDelayFrames:1
				},
				{// mud
					driveSpeed:0.2,
					driveFriction:0.97,
					driftFriction:1,
					turnSpeed:0.06,
					turnSmooth:0.2,
					
					smokeSizeStart:1.0,
					smokeSizeGrow:0.05,
					smokeAlphaStartFrac:0,
					smokeAlphaFade:0.1,
					smokeSpeedFrac:1,
					smokeDelayFrames:5
					
				}
			],
			
			collisionFriction:0.5,
			
			smokeStartDistance:-10,
			
			
			// swerveSpd: higher = car's wiggles are faster
			// swerveAmt: higher = car's wiggles are wider
			// swerveLength: closer to 1 = car keeps wiggling longer
			roadToGrassSwerve:{
				swerveSpd:0.3,
				swerveAmt:0.4,
				swerveLength:0.9
			},
			grassToRoadSwerve:{
				swerveSpd:0.5,
				swerveAmt:0.3,
				swerveLength:0.8
			},
			
			
			// camera
			
			baseCameraSmooth:0.05,// closer to 1 = more abrupt camera tracking of car position
			cameraLeadAmt:30,// how far ahead the camera goes relative to your speed
			cameraLeadSpeed:0.2,// closer to 1 = more abrupt camera moving ahead relative to speed
			
			
			pointsPerSecond:100,
			
			
			gameOverDelayFrames:30
			
			
		}
		
	});
	
});
