;(function(w){
	var 
		tag = 'canvas',
		pool = {},
		count = 0
	;

	w.Buffer = function(name){
		if(name && pool[name] != undefined){
			return pool[name]
		}
		else if(name && pool[name] == undefined){
			return null;
		}
		return null;
	};
	
	w.Buffer.create = function(name){
		if(name && pool[name] != undefined){
			pool[name].getContext('2d').clearRect(0,0,pool[name].width,pool[name].height);
			//pool[name].getContext('2d').clearRect(-2000,-2000,4000, 4000);
			return pool[name];
		}
		else if(name && pool[name] == undefined){
			pool[name] = createBuffer(name);
			return pool[name];
		}
		console.error("No buffer name specified!");
	};
	
	w.Buffer.kill = function(name){
		if(name && pool[name] != undefined){
			count--;
			delete pool[name];
		}
	};
	
	w.Buffer.count = function(){
		return count;
	};
	
	function createBuffer(name){
		var buffer = document.createElement(tag);
		buffer.width = /*w.visibleWidth ||*/ 1136;
		buffer.height = /*w.visibleHeight ||*/ 672;
		count++;
		return buffer;
	}

})(window);