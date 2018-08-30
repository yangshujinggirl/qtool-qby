import { getListApi } from '../../../services/operate/bAnswer'
export default{
  namespace:'bAnswer',
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
      const result =  yield call(getListApi,values);
      if(result.code == '0'){
        const { pdAnswer, currentPage, limit, total } = result;
        pdAnswer.map((item,index)=>{
          item.key = index;
          return item;
        });
        yield put({
          type:'getList',
          payload:{
            dataList:pdAnswer,
            currentPage,
            limit,
            total,
          }
        });
      };
    }
  }
}
