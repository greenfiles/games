//http://stackoverflow.com/questions/1248302/javascript-object-size
function roughSizeOfObject( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 8;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
        	console.log("bool");
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
        	console.log("string");
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
        	console.log("number");
            bytes += 8;
        }
        else if
        (
            typeof value === 'function'
            && objectList.indexOf( value ) === -1
        )
        {
        	console.log("function");
            objectList.push( value );
            bytes += 8;

            for( i in value ) {
                stack.push( value[ i ] );
            }
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
        	console.log("object");
            objectList.push( value );
            bytes += 8;

            for( i in value ) {
                stack.push( value[ i ] );
            }
        }
        else{
        	console.log(typeof value);
        	bytes += 8;
        }
    }
    return bytes;
}

//Fisher-Yates sorting method
//Just give an array and it'll get mixed
function randomSort(myArray){
	var i = myArray.length, j, temp;
	if ( i === 0 ) return false;
	while ( --i ) {
	   j = Math.floor( Math.random() * ( i + 1 ) );
	   temp = myArray[i];
	   myArray[i] = myArray[j]; 
	   myArray[j] = temp;
	 }
}

function addExtention(extentions) {
	if(typeof extentions === "function" || extentions instanceof Function) {
		extentions = [extentions];
	}

	if(extentions.push) {
		var t = null;
		for(var i = 0; i < extentions.length; i++) {
			if(typeof extentions[i] === "function" || extentions[i] instanceof Function) {
				t = new extentions[i](this);
				this[t._packageName] = t;
			}
		}
	}
};

function addExt(ext) {
	if(typeof ext === "function" || ext instanceof Function) {
		ext = [ext];
	}

	if(ext.push) {
		var t = null;
		for(var i = 0; i < ext.length; i++) {
			if(typeof ext[i] === "function" || ext[i] instanceof Function) {
				t = new ext[i](this);
				this[t._packageName] = t;
			}
		}
	}
};

//John Resig's
function extend(a,b) {
    for ( var i in b ) {
        var g = b.__lookupGetter__(i), s = b.__lookupSetter__(i);
       
        if ( g || s ) {
            if ( g )
                a.__defineGetter__(i, g);
            if ( s )
                a.__defineSetter__(i, s);
         } else
             a[i] = b[i];
    }
    return a;
}

/*Math.chop = function(i){
	return ~~ (0.5 + i);
}*/
Math.chop = function(i){
	return (0.5 + i) | 0;
}