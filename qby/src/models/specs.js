import {GetServerData} from '../services/services';
export default {
namespace: 'specs',
state: {
	pdTypes:[],
},
reducers: {
	pdTypes(state, { payload:pdTypes}) {
		return {...state,pdTypes}
	},

},
effects: {
		*specsfetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const pdTypes=result.pdTypes
				for(var i=0;i<pdTypes.length;i++){
					pdTypes[i].key=i
				}
				yield put({type: 'pdTypes',payload:pdTypes});
				
			} 
		}, 
},
subscriptions: {},
};
