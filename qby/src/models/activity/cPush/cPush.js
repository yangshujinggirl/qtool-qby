import { getListApi } from '../../../services/activity/cPush'
export default{
  namespace:'cPush',
  state:{},
  reducers:{
    getList(state,{payload:{dataList, currentPage, limit, total}}){
      return { ...state, dataList, currentPage, limit, total}
    }
  },
  effects:{
    *fetchList({payload:values},{call,put}){
      const result =  yield call(getListApi,values);
      if(result.code == '0'){
        const { spOrders, currentPage, limit, total } = result;
        // for(var i=0;i<marketRes.length;i++){
        //   marketRes[i].key = marketRes[i].marketTypeId;
        // };
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
  }
}