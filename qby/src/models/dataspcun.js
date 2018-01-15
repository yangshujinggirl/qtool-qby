import {GetServerData} from '../services/services';
export default {
  namespace: 'dataspcun',
  state: {
    limit:15,
    currentPage:0,
	values:{},
	pdInvVos:[]
  },
  reducers: {
    synchronous(state, { payload:values}) {
			return {...state,values}
	},
	fetchlist(state, { payload:{pdInvVos,limit,currentPage,total}}) {
		return {...state,pdInvVos,limit,currentPage,total}
	},
	
  },
  effects: {
    *fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
			 	const pdInvVos=result.pdInvVos
				const limit=result.limit;
            	const currentPage=result.currentPage;
            	const total=result.total;
			yield put({type: 'fetchlist',payload:{pdInvVos,limit,currentPage,total}});
			} 
  		},
  },
  subscriptions: {},
};
