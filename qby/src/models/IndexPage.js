import {GetServerData} from '../services/services';
export default {
	namespace: 'IndexPage',
	state: {
		"pdCategorysList":[],
		"citylist": [],
		"pdCategorys":[],
		"fileDomain":''
	},



	reducers: {
		//商品分类
		pdCategorysList(state, { payload: pdCategorysList}) {
			return {...state,pdCategorysList}
		},
		//商品类型
		pdCategorys(state, { payload: pdCategorys}) {
			return {...state,pdCategorys}
		},
		cyList(state, { payload: citylist}) {
			return {...state,citylist}
		},
		fileDomain(state, { payload: fileDomain}) {
			console.log(fileDomain)
			return {...state,fileDomain}
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
		*categorylistfetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
				const pdCategorys=result.pdCategorys
              	yield put({type: 'pdCategorys',payload:pdCategorys});
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
	