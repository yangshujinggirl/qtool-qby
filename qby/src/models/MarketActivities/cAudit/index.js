import {getListApi} from '../../../services/MarketActivities/cAudit'
export default {
    namespace:'cAudit',
    state:{
        dataLists:[],
        limit:15,
        currentPage:0,
        total:0
    },
    reducers:{
        getList(state,{payload:{dataLists,limit,currentPage,total}}){
            return {...state,dataLists,limit,currentPage,total}
        }
    },
    effects:{
        *fetchList({payload:values},{call,put}){
            yield put({type:'tab/loading',payload:true})
            const result = yield call(getListApi,values)
            yield put({type:'tab/loading',payload:false})
            if(result.code == '0'){
                const {spOrders,currentPage,limit,total} = result;
                spOrders.map((item,index)=>{
                    item.key = index;
                });
                yield put({
                    type:'getList',
                    payload:{
                        dataLists:spOrders,
                        limit,
                        currentPage,
                        total
                    }
                })
            };
        }
    }
}