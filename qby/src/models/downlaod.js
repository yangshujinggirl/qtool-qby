
import {GetServerData} from '../services/services';

export default {
namespace: 'downlaod',
state: {
	sysDownloadDoc:[],
	total:0,
	limit:15,
	currentPage:0
},
reducers: {
	TableList(state, { payload:{sysDownloadDoc,total,limit,currentPage}}) {
		return {...state,sysDownloadDoc,total,limit,currentPage}
	},
},
effects: {
	*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const sysDownloadDoc=result.sysDownloadDoc
				const limit=result.limit;
				const currentPage=result.currentPage;
				const total=result.total;
				yield put({type: 'TableList',payload:{sysDownloadDoc,total,limit,currentPage}});
			} 
		},
},
subscriptions: {},
};
