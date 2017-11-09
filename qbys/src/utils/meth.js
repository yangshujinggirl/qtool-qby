//js判断元素是否在数组中
    export function isInArray(arr,value) {
  		for(var i = 0; i < arr.length; i++){
        	if(value == arr[i].key){
            	return true;
        	}
    	}
    return false;
	}

<<<<<<< HEAD
=======
	export function isInArrayMatchName(arr,value) {
  		for(var i = 0; i < arr.length; i++){
        	if(value == arr[i].title){
            	return true;
        	}
    	}
        return false;
	}

>>>>>>> 400d8993385541ac4875aa430581240539c49b45







