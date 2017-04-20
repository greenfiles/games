;(function(window){
	
	var
		LocalStorage = {},
		localStorageEnabled = false
	;
	
	LocalStorage.key = "cars_v1_";
	
	//Check if writing to localStorage is possible
	try {
		localStorage.setItem(LocalStorage.key+"test","a");
		localStorage.removeItem(LocalStorage.key+"test");
		localStorageEnabled = true;
	} catch(e) {
		localStorageEnabled = false;
	}
	
	LocalStorage.working = function(){
		return localStorageEnabled;
	}
	
	LocalStorage.get = function(key) {
		if(localStorageEnabled === false) {
			//throw new Error("LocalStorageManager: Local Storage not enabled");
			return null;
		}
		if(localStorage[LocalStorage.key+key] == undefined) {
			return null;
		}
		else {
			return localStorage[LocalStorage.key+key];
		}
	};
				
	LocalStorage.set = function(key, value){
		if(localStorageEnabled === false) {
			//throw new Error("LocalStorageManager: Local Storage not enabled");
			return null;
		}
		try {
			localStorage[LocalStorage.key+key]=value;
		}
		catch(e) {
			//console.error(e);
			throw new Error("Local Storage update failed");
		}
	};
	
	LocalStorage.removeEntry = function(line) {
		if(localStorageEnabled === false) {
			//throw new Error("LocalStorageManager: Local Storage not enabled");
			return null;
		}
		localStorage.removeItem(LocalStorage.key+line);
	},
	
	LocalStorage.reset = function(){
		if(localStorageEnabled === false) {
			//throw new Error("LocalStorageManager: Local Storage not enabled");
			return null;
		}
		for(var item in localStorage) {
			if (item.substr(0,LocalStorage.key.length) == LocalStorage.key) {
				localStorage.removeItem(item);
			}
		}
	};
	
	window.LocalStorage = LocalStorage;
	
})(window);