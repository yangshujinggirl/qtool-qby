import {GetServerData} from '../services/services';
export default {
    namespace: 'orderdb',
    state: {
        values:{},
        limit:15,
        currentPage:0,
        total:0,
        tableList:[]
    },
    reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		syncTableList(state, { payload:{tableList,total,limit,currentPage}}) {
			return {...state,tableList,total,limit,currentPage}
		},
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                const tableList = result.exchanges;
                const limit=result.limit;
                const currentPage=result.currentPage;
                const total=result.total;
                for(var i=0;i<tableList.length;i++){
                    tableList[i].key=tableList[i].wsOrderId;
                }
                yield put({type: 'syncTableList',payload:{tableList,total,limit,currentPage}});
            } 
        },
  	},
  	subscriptions: {},
};
