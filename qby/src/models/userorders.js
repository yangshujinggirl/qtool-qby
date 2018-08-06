import { GetServerData } from '../services/services';
import { getListApi } from '../services/orderCenter/userOrders.js';

export default {
  namespace:'userorders',
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
        const { orders, currentPage, limit, total } = result;
        for(var i=0;i<orders.length;i++){
          orders[i].key = orders[i].orderId;
        };
        yield put ({
          type: 'getList',
          payload:{
            dataList:orders,
            currentPage,
            limit,
            total
          }
        })
      }
    }
  }
}
