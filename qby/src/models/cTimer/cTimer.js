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
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code == '0'){
        const { taskTimes, currentPage, limit, total } = result;
        for(var i=0;i<taskTimes.length;i++){
          taskTimes[i].key = taskTimes[i].pdTaskTimeId;
        };
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
