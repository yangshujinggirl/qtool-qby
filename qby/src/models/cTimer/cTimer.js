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
        taskTimes.map((item,index)=>{
          item.key = index;
          if(item.opstatus==1||item.opstatus==2||item.opstatus==3||item.opstatus==4||item.opstatus==5||item.opstatus==6){
            item.taskType = 1;
          };
          if(item.opstatus == 7){
            item.taskType = 2;
          };
          if(item.opstatus == 8){
            item.taskType = 3;
          }
          return item;
        });
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
