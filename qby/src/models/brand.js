
import {GetServerData} from '../services/services';
export default {
namespace: 'brand',
state: {
	pdBrands:[],
	brandurl:'',
},
reducers: {
	pdBrandslist(state, { payload:pdBrands}) {
		return {...state,pdBrands}
	},
	brandurl(state, { payload:brandurl}) {
		return {...state,brandurl}
	},
},
effects: {
	*brandfetch({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
					const pdBrands=result.pdBrands
					yield put({type: 'pdBrandslist',payload:pdBrands});
				} 
			},
},
subscriptions: {},
};
