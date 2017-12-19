import {GetServerData} from '../services/services';
import {message} from 'antd';
export default {
namespace: 'jedit',
state: {
	orderArr:[]
},
reducers: {
	syncOrderArr(state, { payload:orderArr}) {
		return {...state,orderArr}
	},
},
effects: {
	//异步请求获取数据
	*fetch({ payload: {code,values} }, { call, put }) {
	const result=yield call(GetServerData,code,values);
	yield put({type: 'tab/loding',payload:false});
	if(result.code=='0'){
		let orderArr = result.wareHouseArr;
		yield put({   
		type: 'syncOrderArr',
		payload:orderArr
		});
	} 
	},
},
subscriptions: {},
};
