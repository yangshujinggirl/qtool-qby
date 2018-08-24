import { getListApi } from '../../../services/operate/supplyinout'
export default{
  namespace:'supplyinout',
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
        const { pdSettles, currentPage, limit, total } = result;
        pdSettles.map((item,index)=>{
          item.key = index;
          return item;
        })
        yield put({
          type:'getList',
          payload:{
            dataList:pdSettles,
            currentPage,
            limit,
            total,
          }
        })
      }
    }
  }
}
