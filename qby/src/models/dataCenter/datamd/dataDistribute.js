import { getListApi } from '../../../services/dataCenter/datamd/dataDistribute'
export default{
  namespace:'dataDistribute',
  state:{
    pdSkuId:null,
    pdSpuId:null,
  },
  reducers:{
    getList(state,{payload:{dataList, currentPage, limit, total}}){
      return { ...state, dataList, currentPage, limit, total}
    }

  },
  effects:{
    *fetchList({payload:values},{call,put}){

      const result =  yield call(getListApi,values_);
      if(result.code == '0'){
        const { shopInvs, currentPage, limit, total } = result;
        shopInvs.map((item,index)=>{
          item.key = index;
          return item;
        });
        yield put({
          type:'getList',
          payload:{
            dataList:shopInvs,
            currentPage,
            limit,
            total,
          }
        })
      }
    }
  }
}
