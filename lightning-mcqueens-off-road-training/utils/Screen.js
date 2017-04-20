var Screen = function(name, p){
	var ret = new DisplayObject({x: 0, y:0, height:1136, width:672, name: name});
	ret.parent = p;
	ret.addExtention([Extention.Container, Extention.Canvas, Extention.TextField]);
	ret.onload=function(){};
	ret.loaded = false;
	ret.binds={};
	ret.onunload=function(){};
	ret.global_blue = function(){
		if(this.parent){
			return this.blue + this.parent.global_blue();
		}
		return this.blue;
	};
	ret.global_red = function(){
		if(this.parent){
			return this.red + this.parent.global_red();
		}
		return this.red;
	};
	
	ret.global_green = function(){
		if(this.parent){
			return this.green + this.parent.global_green();
		}
		return this.green;
	};
	
	ret.global_alpha = function(){
		if(this.parent && this.parent.global_alpha() == 0){
			return 0;
		}
		return this.alpha;
	};
	
	ret.global_x = function(){
		if(this.parent){
			return this.x + this.parent.global_x();
		}
		return this.x;
	};
	
	ret.global_y = function(){
		if(this.parent){
			return this.y + this.parent.global_y();
		}
		return this.y;
	};
	
	ret.global_width = function(){
		return this.width * this.global_scaleX();
	};
	
	ret.global_height = function(){
		return this.height * this.global_scaleY();
	};
	
	ret.global_scaleX = function(){
		if(this.parent){
			return this.scaleX * this.parent.global_scaleX();
		}
		return this.scaleX;
	};
	
	ret.global_scaleY = function(){
		if(this.parent){
			return this.scaleY * this.parent.global_scaleY();
		}
		return this.scaleY;
	};
	
	ret.global_skewX = function(){
		if(this.parent){
			return this.skewX + this.parent.global_skewX();
		}
		return this.skewX;
	};
	
	ret.global_skewY = function(){
		if(this.parent){
			return this.skewY + this.parent.global_skewY();
		}
		return this.skewY;
	};
	
	ret.global_rotation = function(){
		if(this.parent){
			return this.rotation + this.parent.global_rotation();
		}
		return this.rotation;
	};
	
	ret.global_index = function(){
		if(this.parent){
			return this.index + this.parent.global_index()*10;
		}
		return this.index;
	};
	
	ret.id = function(){
		if(this.parent){
			if(this.parent.id() != ""){
				return this.parent.id()+"."+this.name;
			}
		}
		return this.name;
	};
	
	return ret;
}