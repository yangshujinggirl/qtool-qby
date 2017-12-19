import {GetServerData} from '../services/services';

export default {
	namespace: 'wsedit',
	state: {
		warehouses:[],
		warehouse:{},
		recProvinceId:null,
		recCityId:null,
		recDistrictId:null
	},
	reducers: {
		wsWarehouseList(state, { payload: warehouses}) {
			return {...state,warehouses}
		},
		urUserinfo(state, { payload: warehouse}) {
			return {...state,warehouse}
		},
		initstate(state, { payload: value}) {
			const warehouse={}
			const recProvinceId=null
			const recCityId=null
			const recDistrictId=null
			return {...state,warehouse,recProvinceId,recCityId,recDistrictId}
		},
		city(state, { payload: city}) {
			const recProvinceId=city[0]
			const recCityId=city[1]
			const recDistrictId=city[2]
			return {...state,recProvinceId,recCityId,recDistrictId}
		},
	},
	effects: {
		*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type:'tab/loding',payload:false});
			if(result.code=='0'){
				const warehouses = result.warehouses;
				for(var i=0;i<warehouses.length;i++){
					warehouses[i].key=warehouses[i].wsWarehouseId;
				}
				yield put({type:'wsWarehouseList',payload:warehouses});
			} 
		}, 
		*infofetch({ payload: {code,values} }, { call, put }) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				 const warehouse=result.warehouse
				const value=[result.warehouse.recProvinceId,result.warehouse.recCityId,result.warehouse.recDistrictId]
				 yield put({type: 'urUserinfo',payload:warehouse});
				 yield put({type: 'city',payload:value});
			} 
		},
		*delete({ payload: id }, { call, put ,select}) {
			yield put({type: 'tab/initDeletestate',payload:id});
			yield put({type: 'initstate',payload:''});
		},
	}
};
