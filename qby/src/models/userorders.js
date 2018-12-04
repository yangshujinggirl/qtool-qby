import { GetServerData } from '../services/services';
import moment from 'moment';
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
      const fixedLimit = yield select(state => state.userorders.limit);
      let { rangePicker, ...params } =values;
      if(!params.limit) {
        params = {...params,...{ limit: fixedLimit}}
      };
      if(rangePicker&&rangePicker.length>0) {
        params.dateTimeST = moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
        params.dateTimeET = moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
      }
      yield put({type: 'tab/loding',payload:true});
      const result=yield call(getListApi,params);
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
