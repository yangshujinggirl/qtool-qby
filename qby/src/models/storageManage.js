import {GetServerData} from '../services/services';
import {message} from 'antd';

export default {
  namespace: 'storageManage',
  state: {
	//定义dataList存储返回的表格数据
	dataList:[],
	allData:{},
	loading:false
  },
  reducers: {
	//通过reducer存储后端返回数据
	saveDataList(state, { payload: {allData,dataList}}) {
		return {...state,allData,dataList}
	},
	//更新数据
	updateData(state,{payload:loading}){
		return {...state,loading}
	}
  },
  effects: {
	  //异步请求获取数据
    *fetch({ payload: {code,values} }, { call, put }) {
		const result=yield call(GetServerData,code,values);
		yield put({type: 'tab/loding',payload:false});
		if(result.code=='0'){
			const allData = result;
			const dataList = result.asns;
			yield put({   
				type: 'saveDataList',
				payload:{allData,dataList}
      });
      
			yield put({   
				type: 'updateData',
				payload:false
			});
		}
	},
  },
  subscriptions: {
   
  },
};

