import { getListApi } from '../../services/server/server'
export default{
  namespace:'userFeedBack',
  state:{
    dataList:[]
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
        const { feedbacks, currentPage, limit, total } = result;
        feedbacks.map((item,index)=>{
          item.key = index;
          return item;
        });
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
