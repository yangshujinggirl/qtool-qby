import { getListApi } from '../../services/cTimer/cTimer'

export default{
  namespace:'cTimer',
  state:{
    dataList:null,
    currentPage:null,
    limit:null,
    total:null
  },
  reducers:{
    getList(state,{payload:{dataList, currentPage, limit, total} }){
      return { ...state, dataList, currentPage, limit, total}
    }
  },
  effects:{
    *fetchList({payload:values},{call,put}){
      const result = yield call(getListApi,values);
      if(result.code == '0'){
        const { taskTimes, currentPage, limit, total } = result;
        yield put({
          type:'getList',
          payload:{
            dataList:taskTimes,
            currentPage,
            limit,
            total,
          }
        });
      };
    },
  },
}
