import {GetServerData} from '../services/services';
import { message } from 'antd';

export default {
	namespace: 'storageDetail',
	state: {
		itemDetail:{}
	},
	reducers: {
		saveItemData(state, { payload: itemDetail}) {
			return {...state,itemDetail}
		},
	},
	effects: {
		//异步请求获取数据
		*fetch({ payload: {code,values} }, { call, put }) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const itemDetail= result; 
				yield put({type: 'saveItemData',payload:itemDetail});
			}  
		},
	},
subscriptions: {},
};
