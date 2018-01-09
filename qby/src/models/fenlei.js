
import {GetServerData} from '../services/services';
export default {
namespace: 'fenlei',
state: {
	pdCategoryslist:[]
},
reducers: {
	pdCategoryslist(state, { payload:pdCategoryslist}) {
		return {...state,pdCategoryslist}
	},
},
effects: {
		*classfetch({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
					const pdCategoryslist=result.pdCategorys
					for(var i=0;i<pdCategoryslist.length;i++){
						pdCategoryslist[i].childrens=pdCategoryslist[i].children
						delete pdCategoryslist[i].children
					}
					yield put({type: 'pdCategoryslist',payload:pdCategoryslist});
				} 
			}, 
},
subscriptions: {},
};
