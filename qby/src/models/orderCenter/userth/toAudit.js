import { getListApi } from '../../../services/orderCenter/userth/toAudit';

export default {
  namespace:'toAudit',
  state: {
    dataList:[],
    currentPage:0,
    limit:15,
    total:0
  },
  reducers: {
    getList( state, { payload : {dataList, currentPage, limit, total} }) {
      return { ...state, dataList, currentPage, limit, total}
    }
  },
  effects: {
    *fetchList({ payload: values }, { call, put ,select}) {
      yield put({type: 'tab/loding',payload:true});
      const result=yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code=='0') {
        const { pdOrderReturnList, currentPage, limit, total } = result;
        pdOrderReturnList.map((item,index)=>{
          item.key = index;
        })
        yield put ({
          type: 'getList',
          payload:{
            dataList:pdOrderReturnList,
            currentPage,
            limit,
            total
          }
        })
      }
    }
  }
}
