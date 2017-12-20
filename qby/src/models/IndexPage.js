import {GetServerData} from '../services/services';
export default {
	namespace: 'IndexPage',
	state: {
		pdCategorysList:[],
		"citylist": [],
			
		 
	},
	reducers: {
		pdCategorysList(state, { payload: pdCategorysList}) {
			return {...state,pdCategorysList}
		},
		cyList(state, { payload: citylist}) {
			return {...state,citylist}
		},

	},
	effects: {
		*categoryfetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
				const pdCategorysList=result.pdCategorys
              	yield put({type: 'pdCategorysList',payload:pdCategorysList});
            } 
		}, 
		*cityfetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
				const citylist=result.bsRegions
              	yield put({type: 'cyList',payload:citylist});
            } 
        }, 
	},
	
	subscriptions: {
		setup({ dispatch, history }) {  
		},
	},
	
	};
	