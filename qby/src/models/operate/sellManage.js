import {
  getListApi,
 } from '../../services/operate/sellManage.js';
import { message } from 'antd';
import moment from 'moment';

export default {
  namespace:'sellManage',
  state:{
    list:[],
    data:{
      currentPage:0,
      limit:15,
      total:0,
    },
  },
  reducers: {
    getList( state, { payload : {list, data} }) {
      return { ...state, list, data}
    },
  },
  effects:{
    *fetchList({ payload: values }, { call, put ,select}) {
      const fixedLimit = yield select(state => state.sellManage.data.limit);
      let { time, ...params } =values;
      //默认分页是16
      if(!values.limit) {
        values = {...values,...{ limit: fixedLimit}}
      }
      if(time&&time.length>0) {
        params.dateTimeST = moment(time[0]).format('YYYY-MM-DD HH:mm:ss');
        params.dateTimeET = moment(time[1]).format('YYYY-MM-DD HH:mm:ss');
      }
      yield put({type: 'tab/loding',payload:true});
      const result=yield call(getListApi,params);
      if(result.code=='0') {
        let { ispMoneyReceipts, currentPage, limit, total } = result;
        ispMoneyReceipts = ispMoneyReceipts?ispMoneyReceipts:[];
        ispMoneyReceipts.length>0&&ispMoneyReceipts.map((el,index) => el.key = index)
        yield put ({
          type: 'getList',
          payload:{
            list:ispMoneyReceipts,
            data:{
              currentPage,
              limit,
              total
            }
          }
        })
      } else {
        message.error(result.message)
      }
      yield put({type: 'tab/loding',payload:false});
    },
  }
}
