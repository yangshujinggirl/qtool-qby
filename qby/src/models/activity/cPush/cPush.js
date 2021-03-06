import { getListApi } from '../../../services/activity/cPush'
export default{
  namespace:'cPush',
  selectedRowKeys:[],
  state:{
    dataList:[]
  },
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
      yield put({type: 'tab/loding',payload:true});
      const result =  yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
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
