import moment from 'moment';
import { getListApi } from '../../../services/datapos/dailyBill/mdDivide';

export default {
  namespace:'mdDivide',
  state: {
    dataList:[],
    currentPage:0,
    limit:15,
    total:0,
    orderNum:'',
    shareProfitSumAmount:'',
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
        const { orders, currentPage, limit, total,shareProfitSumAmount,orderNum} = result;
        for(var i=0;i<orders.length;i++){
          orders[i].key = orders[i].orderId;
        };
        yield put ({
          type: 'getList',
          payload:{
            dataList:orders,
            orderNum,
            shareProfitSumAmount,
            currentPage,
            limit,
            total,
          }
        })
      }
    }
  }
}
