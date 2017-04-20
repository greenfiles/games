;(function(window){
	
	var
		Dictionary={}
	;
				
	Dictionary.translate = function(key, data){
		
		var 
			ret = "", 
			keyword
		;
					
		if(dictionary[key] != undefined) {
			ret = dictionary[key];
			if(data != undefined) {
				for(keyword in data) {
					ret = ret.split(keyword).join(data[keyword])
				}
			}
			return ret;
		}
		return key;
	};
	
	window.Dictionary = Dictionary;
	
})(window);