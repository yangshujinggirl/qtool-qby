
//js判断元素是否在数组中
    export function isInArray(arr,value) {
  		for(var i = 0; i < arr.length; i++){
        	if(value == arr[i].key){
            	return true;
        	}
    	}
    return false;
	}


	export function isInArrayMatchName(arr,value) {
  		for(var i = 0; i < arr.length; i++){
        	if(value == arr[i].title){
            	return true;
        	}
    	}
        return false;
	}
	//新增tab公用方法
	export function addTab(title,content,key) {
		const panner={title:title,content:content,key:key}
		return panner
  	}








