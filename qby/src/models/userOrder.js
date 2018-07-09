import { GetServerData } from '../services/services';

export default {
  namespace:'userorder',
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
    *fetchList({ payload: {code='qerp.web.sp.order.query',values} }, { call, put ,select}) {
      const result=yield call(GetServerData,code,values);
      if(result.code=='0') {
        const { spOrders, currentPage, limit, total } = result;
        yield put ({
          type: 'getList',
          payload:{
            dataList:spOrders,
            currentPage,
            limit,
            total
          }
        })
      }
    }
  }
}
