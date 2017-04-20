;(function(window){

	var Animations = function(){
	
		var
			TARGET=0,
			ANIMATIONS=1,
			TIME=2,
			CALLBACK=3,
			
			tweenable = {
				"x":"x",
				"y":"y",
				"alpha":"alpha",
				"scaleX":"scaleX",
				"scaleY":"scaleY",
				"height":"height",
				"width":"width"
			},
			
			list = [],
			thisRef = null
		;
		
		
		return{
			tween:function(target, animations, time, callback){
				var 
					a,
					props=0
				;
				
				if(thisRef == null){
					thisRef = this;
				}
				
				for(a in animations){
					if(a in tweenable){
						if((animations[a]+"").indexOf("-=") !== -1){
							animations[a] = target[tweenable[a]]-animations[a].substring(animations[a].indexOf("-=")+2);
						}
						if((animations[a]+"").indexOf("+=") !== -1){
							animations[a] = target[tweenable[a]]+animations[a].substring(animations[a].indexOf("+=")+2);
						}
						props++;
					}
					else{
						console.error("Cannot animate non-tweenable propriety '"+a+"'");
						delete animations[a];
					}
				}
				if(props !== 0){
					list.push([target, animations, time, callback]);
				}
				
				//Think of nice chaining closure...
			},
	
			step:function(){
				
				if(list.length == 0){
					return false;
				}
			
				setTimeout(function(){
					var 
						anim = null,
						a,
						curr,
						trans
						//tstart = (new Date()).getTime();
					;
				
					for(var i=list.length-1; i>=0; i--){
						if(list[i]){
							anim = list[i];
							if(Buffer(anim[TARGET].id) != null){
								Buffer(anim[TARGET].id).getContext('2d').clearRect(0,0,1136,672);
							}
							if(anim[TIME] > 0){
								for(a in anim[ANIMATIONS]){
									curr = anim[TARGET][a];
									trans = (anim[ANIMATIONS][a] - curr)/anim[TIME];
									anim[TARGET][a] = curr+trans;
									
									//anim[ANIMATIONS][a] -= trans;
								}
								
								anim[TIME]--;
						        if(anim[TIME] <= 0){
						            if(anim[CALLBACK]){
						            	anim[CALLBACK](anim[TARGET]);
						            }
						            list.splice(i,1);
						        }
							}
							else{
								list.splice(i,1);
							}
				        }
				    }
					
					//window.log((new Date()).getTime() - tstart);
				},0);
				
				return true;
			},
			
	
			killFor:function(target){
				for(var i=list.length-1; i>=0; i--){
					if(list[i][TARGET] == target){
						list[i][TIME]=0;
						list.splice(i,1);
					}
				}
			}
		}
		
		//WIP
		/*
		 	//Rotates object a certain angle
			this.rotate = function(angle) {
				thisRef._rotation(thisRef._rotation() += angle);
				thisRef.clear();
				ctxRef.rotate(angle);
				thisRef._draw();
				ctxRef.rotate(-angle);
				thisRef._update();
			}
			
			//Skew on the x, y or both axis
			this.skew = function(angle) {
				thisRef.clear();
				ctxRef.setTransform(1, Math.tan(angle[0]), 0, 1, 0, 0);
				ctxRef.setTransform(1, Math.tan(angle[1]), 1, 0, 0, 0);
				thisRef._draw();
				ctxRef.setTransform(1, Math.tan(-angle[0]), 0, 1, 0, 0);
				ctxRef.setTransform(1, Math.tan(-angle[1]), 1, 0, 0, 0);
			}
			//Tints a certain shade (Hex color)
			this.tint = function(color) {
				//create overlay with global alpha composition, so that you can revert to default state
			}
		 */
	}();
		
	window.Animations = Animations;
	
})(window);