import { Modal, Button } from 'antd';
const confirm = Modal.confirm;

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


	export function successdown(data) {
		confirm({
			title: '数据已经进入导出队列',
			content: '请前往下载中心查看导出进度',
			cancelText:'稍后去',
			okText:'去看看',
			onOk() {
			  data.hindOK()
			}
		  });
	}






