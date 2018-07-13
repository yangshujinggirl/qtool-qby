import { getListApi } from '../../../services/activity/cBanner'
export default{
  namespace: 'cBanner',
  state:{
    dataList:[],
    currentPage:0,
    limit:15,
    total:0,
  },
  reducers:{
    getList(state,{payload:{dataList, currentPage, limit, total} }){
      return { ...state,dataList, currentPage, limit, total}
    }
  },
  effects:{
    *fetchList({payload:values},{call,put}){
       const result = yield call(getListApi,values);
       if(result.code == '0'){
         const { spOrders, currentPage, limit, total } = result;
         yield put({
           type:'getList',
           payload:{
             dataList:spOrders,
             currentPage,
             limit,
             total,
           }
         })
       }
    }
  },
  subscription:{}
}
