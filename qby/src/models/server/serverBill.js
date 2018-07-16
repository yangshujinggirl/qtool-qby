import { getServerListApi } from '../../services/server/server'

export default{
  namespace:'serverBill',
  state:{},
  reducers:{
    getList(state,{payload:{dataList, currentPage, limit, total} }){
      return { ...state, dataList, currentPage, limit, total}
    }
  },
  effects:{
    *fetchList({payload:values},{call,put}){
      const result = yield call(getServerListApi,values);
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
        });
      };
    },
  },
}
