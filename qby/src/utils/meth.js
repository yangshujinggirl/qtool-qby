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






	export function timeForMat (count) {
		// 拼接时间
		let time1 = new Date()
	   	time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000)) //昨天日期
	   	let Y1 = time1.getFullYear()
		let M1 = ((time1.getMonth() + 1) >= 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
		let D1 = (time1.getDate() >= 10 ? time1.getDate() : '0' + time1.getDate())
		let timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
		let time2 = new Date()
		time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
		let Y2 = time2.getFullYear()
		let M2 = ((time2.getMonth() + 1) >= 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
		let D2 = (time2.getDate() >= 10 ? time2.getDate() : '0' + time2.getDate())
		let timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
		return {
		 	t1: timer1,
		 	t2: timer2
		}
	}

	//最近几天 ：包括今天
	export function timeForMattoday (count) {
		// 拼接时间
		let time1 = new Date()
	   	time1.setTime(time1.getTime()) //今天日期
	   	let Y1 = time1.getFullYear()
		let M1 = ((time1.getMonth() + 1) >= 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
		let D1 = (time1.getDate() >= 10 ? time1.getDate() : '0' + time1.getDate())
		let timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
		let time2 = new Date()
		time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * (count-1)))
		let Y2 = time2.getFullYear()
		let M2 = ((time2.getMonth() + 1) >= 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
		let D2 = (time2.getDate() >= 10 ? time2.getDate() : '0' + time2.getDate())
		let timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
		return {
		 	t1: timer1,
		 	t2: timer2
		}
	}



	export function timeForMats (count) {
		// 拼接时间
		let time1 = new Date()
		time1.setTime(time1.getTime()) //当前日期
	   	let Y1 = time1.getFullYear()  //当前年
		let M1 = ((time1.getMonth() + 1) >= 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1)) //当前月
		let D1 = (time1.getDate() >= 10 ? time1.getDate() : '0' + time1.getDate())  //当前天
		let timer1 = Y1 + '-' + M1 + '-' + D1 + ' 23:59:59' // 当前时间
		let time2 = new Date()
		time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * (count-1)))
		let Y2 = time2.getFullYear()
		let M2 = ((time2.getMonth() + 1) >= 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
		let D2 = (time2.getDate() >= 10 ? time2.getDate() : '0' + time2.getDate())
		let timer2 = Y2 + '-' + M2 + '-' + D2 + ' 00:00:00' // 之前的7天或者30天
		return {
		 	t1: timer1,
		 	t2: timer2
		}
	}



	//默认上个月
	export function timeyesterdaymoute (count) {
		// 拼接时间
		let time1 = new Date()
		time1.setTime(time1.getTime()) //当前日期
		var Y1 = time1.getFullYear()  //当前年
		var Y2=time1.getMonth() //上个月
		if(Y2=='0'){
			Y1=Y1-1
			Y2=12
		}
		let M1 = (Y2> 10 ? Y2 : '0' + Y2) //当前月
		let timer1 = Y1 + '-' + M1

		return {
		 	t1: timer1
		}
	}
