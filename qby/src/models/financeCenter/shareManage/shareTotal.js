import moment from 'moment';
import { getListApi } from '../../../services/financeCenter/shareManage/shareTotal.js';


export default {
  namespace:'shareTotal',
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
        const { rpShareProfitOrderVo, currentPage, limit, total } = result;
        rpShareProfitOrderVo.map((item,index)=>{
          item.key = index;
        });
        yield put ({
          type: 'getList',
          payload:{
            dataList:rpShareProfitOrderVo,
            currentPage,
            limit,
            total
          }
        });
      }
    }
  }
}
