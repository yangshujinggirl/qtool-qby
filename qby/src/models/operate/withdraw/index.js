import { getListApi } from '../../../services/operate/withdraw'
export default{
  namespace:'withdraw',
  state:{
    selectedRowKeys:[],
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
      const result =  yield call(getListApi,values);
      if(result.code == '0'){
        const { spCarryCashs, currentPage, limit, total } = result;
        spCarryCashs.map((item,index)=>{
          item.key = index;
          return item;
        });
        yield put({
          type:'getList',
          payload:{
            dataList:spCarryCashs,
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
        })
      }
    }
  }
}
