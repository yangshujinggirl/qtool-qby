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
        const { rpShareProfitOrderVo, currentPage, limit, total,shareProfitSumAmount,orderNum} = result;
        if(rpShareProfitOrderVo[0]){
          rpShareProfitOrder.map((item,index)=>{
            item.key = index;
          });
        }
        yield put ({
          type: 'getList',
          payload:{
            dataList:rpShareProfitOrderVo,
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
