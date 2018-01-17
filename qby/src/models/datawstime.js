
import {GetServerData} from '../services/services';

export default {
	namespace: 'datawstime',
	state: {
		validDateInfos:[],
		total:0,
		limit:15,
		currentPage:0,
		values:{}
	},
	reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		TableList(state, { payload:{validDateInfos,total,limit,currentPage}}) {
			return {...state,validDateInfos,total,limit,currentPage}
		},
	},
	effects: {
		*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const validDateInfos=result.invdatas
				const limit=result.limit;
				const currentPage=result.currentPage;
				const total=result.total;
				


				yield put({type: 'TableList',payload:{validDateInfos,total,limit,currentPage}});
			} 
		},
	},
subscriptions: {},
};




