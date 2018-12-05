import { getListApi } from '../../services/goodsCenter/bondManage'

export default{
  namespace:'bondManage',
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
        const { pdTaxWarehouses, currentPage, limit, total } = result;
        pdTaxWarehouses.map((item,index)=>{
          item.key = index;
          return item;
        });
        yield put({
          type:'getList',
          payload:{
            dataList:pdTaxWarehouses,
            currentPage,
            limit,
            total,
          }
        });
      };
    },
  },
}
