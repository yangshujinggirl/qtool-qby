import { getListApi } from '../../services/server/server'
export default{
  namespace:'userFeedBack',
  state:{},
  reducers:{
    getList(state,{payload:{dataList, currentPage, limit, total} }){
      return { ...state, dataList, currentPage, limit, total}
    }
  },
  effects:{
    *fetchList({payload:values},{call,put}){
      const result = yield call(getListApi,values);
      if(result.code == '0'){
        const { feedbacks, currentPage, limit, total } = result;
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
