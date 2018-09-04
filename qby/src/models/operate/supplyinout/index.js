import { getListApi } from '../../../services/operate/supplyinout'
export default{
  namespace:'supplyinout',
  state:{
    selectedRowKeys:[],
  },
  reducers:{
    getList(state,{payload:{dataList, currentPage, limit, total, totalStatusNo}}){
      return { ...state, dataList, currentPage, limit, total, totalStatusNo}
    },
    clearSelect(state,{payload:{selectedRowKeys}}){
      return { ...state,selectedRowKeys}
    }
  },
  effects:{
    *fetchList({payload:values},{call,put}){
      const result =  yield call(getListApi,values);
      if(result.code == '0'){
        const { pdSettles, currentPage, limit, total, totalStatusNo} = result;
        pdSettles.map((item,index)=>{
          item.key = index;
          return item;
        });
        yield put({
          type:'getList',
          payload:{
            dataList:pdSettles,
            currentPage,
            limit,
            total,
            totalStatusNo,
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
