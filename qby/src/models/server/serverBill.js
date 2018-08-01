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
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(getServerListApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code == '0'){
        const { feedbacks, currentPage, limit, total } = result;
        for(var i=0;i<feedbacks.length;i++){
          feedbacks[i].key = feedbacks[i].customServiceId;
        };
        yield put({
          type:'getList',
          payload:{
            dataList:feedbacks,
            currentPage,
            limit,
            total,
          }
        });
      };
    },
  },
}
