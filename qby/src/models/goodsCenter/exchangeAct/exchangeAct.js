import { getListApi } from '../../../services/goodsCenter/exchangeAct/index'

export default{
  namespace:'exchangeAct',
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
        const { pdSpuActives, currentPage, limit, total } = result;
        pdSpuActives.map((item,index)=>{
          item.key = index;
          return item;
        });
        console.log(pdSpuActives)
        yield put({
          type:'getList',
          payload:{
            dataList:pdSpuActives,
            currentPage,
            limit,
            total,
          }
        });
      };
    },
  },
}
