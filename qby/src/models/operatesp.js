import {GetServerData} from '../services/services';

export default {
	namespace: 'operatesp',
	state: {
		values:{},
		limit:15,
		currentPage:0,
		total:0,
		spShops:[],
		spShopPics:[],
		bsRegions:[]
	},
	reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		spShopslist(state, { payload:{spShops,total,limit,currentPage}}) {
			return {...state,spShops,total,limit,currentPage}
		},
		spShopPics(state, { payload:spShopPics}) {
			return {...state,spShopPics}
		},
		regionstate(state, { payload:bsRegions}) {
			return {...state,bsRegions}
		},
	},
	effects: {
		*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const spShops = result.spShops;
				for(var i=0;i<spShops.length;i++){
					spShops[i].provinces=spShops[i].province+spShops[i].city
					spShops[i].key=spShops[i].spShopId
				}
				const limit=result.limit
				const currentPage=result.currentPage
				const total=result.total
				yield put({type: 'spShopslist',payload:{spShops,total,limit,currentPage}});
			} 
		}, 
		*region({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const bsRegions=result.bsRegions
				yield put({type: 'regionstate',payload:bsRegions});
			} 
		}, 	
	}
};
