import {GetServerData} from '../services/services';
export default {
	namespace: 'dataspfen',
	state: {
		limit:15,
		currentPage:0,
		values:{},
		divisions:[]
	},
	reducers: {
		synchronous(state, { payload:values}) {
				return {...state,values}
		},
		fetchlist(state, { payload:{divisions,limit,currentPage,total}}) {
			return {...state,divisions,limit,currentPage,total}
		},
	},
	effects: {
		*fetch({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
					const divisions=result.divisions
					const limit=result.limit;
					const currentPage=result.currentPage;
					const total=result.total;
					
				yield put({type: 'fetchlist',payload:{divisions,limit,currentPage,total}});
				} 
			},
	},
	subscriptions: {},
};
