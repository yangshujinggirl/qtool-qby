import { getListApi } from '../../../services/activity/bPush'
export default{
  namespace:'bPush',
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
        const { bPushs, currentPage, limit, total } = result;
        for(var i=0;i<bPushs.length;i++){
          bPushs[i].key = bPushs[i].bPushId;
        };
        yield put({
          type:'getList',
          payload:{
            dataList:bPushs,
            currentPage,
            limit,
            total,
          }
        })
      }

    }
  }
}
