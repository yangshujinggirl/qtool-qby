import { getListApi } from '../../../services/activity/cPush'
export default{
  namespace:'cPush',
  selectedRowKeys:[],
  state:{},
  reducers:{
    getList(state,{payload:{dataList, currentPage, limit, total}}){
      return { ...state, dataList, currentPage, limit, total}
    },
    clearSelect(state,{payload:{selectedRowKeys}}){
      return { ...state,selectedRowKeys}
    }
  },
  effects:{
    *fetchList({payload:values},{call,put}){
      const result =  yield call(getListApi,values);
      if(result.code == '0'){
        const { bsPush, currentPage, limit, total } = result;
        bsPush.map((item,index) => {
          item.key = item.bsPushId;
          return item;
        });
        yield put({
          type:'getList',
          payload:{
            dataList:bsPush,
            currentPage,
            limit,
            total,
          }
        });
        yield put({
          type:'clearSelect',
          payload:{
            selectedRowKeys:[]
          }
        });
      };
    },
  }
}
