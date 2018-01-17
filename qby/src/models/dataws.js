
import {GetServerData} from '../services/services';
export default {
namespace: 'dataws',
	state: {
		values:{},
		headArr:[],
		invdatas:[],
		total:0,
		limit:15,
		currentPage:0
	},
	reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		TableList(state, { payload:{headArr,invdatas,total,limit,currentPage}}) {
			return {...state,headArr,invdatas,total,limit,currentPage}
		},
	},
	effects: {
		*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const headArr=result.headArr
				const invdatas=result.invdatas
				const limit=result.limit;
				const currentPage=result.currentPage;
				const total=result.total;
				for(var i=0;i<headArr.length;i++){
					headArr[i].title=headArr[i].headName
					headArr[i].dataIndex=headArr[i].infoStr
				}
				yield put({type: 'TableList',payload:{headArr,invdatas,total,limit,currentPage}});
			} 
		},
	},
subscriptions: {},
};
