import {GetServerData} from '../services/services';
export default {
	namespace: 'datas',
	state: {
		pdAnalysis:[],
		limit:15,
		currentPage:0,
		total:0
	},
	reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		fetchlist(state, { payload:{pdAnalysis,limit,currentPage,total}}) {
			return {...state,pdAnalysis,limit,currentPage,total}
		},
	},
	effects: {
		*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const pdAnalysis=result.pdAnalysis
				const limit=result.limit;
				const currentPage=result.currentPage;
				const total=result.total;
				for(var i=0;i<pdAnalysis.length;i++){
					pdAnalysis[i].index=i+1
				}
				yield put({type: 'fetchlist',payload:{pdAnalysis,limit,currentPage,total}});
			} 
		},
	},
	subscriptions: {},
};
