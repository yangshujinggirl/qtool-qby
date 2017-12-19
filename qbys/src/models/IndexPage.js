import {GetServerData} from '../services/services';
export default {
	namespace: 'IndexPage',
	state: {
		warehouses:[],
		"citylist": [],
			
		 
	},
	reducers: {
		wsList(state, { payload: warehouses}) {
			return {...state,warehouses}
		},
		cyList(state, { payload: citylist}) {
			return {...state,citylist}
		},

	},
	effects: {
		*wslistfetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
				const warehouses=result.warehouses
              	yield put({type: 'wsList',payload:warehouses});
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
	