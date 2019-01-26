import moment from 'moment';
import { getListApi } from '../../../services/datapos/shReport/thList';

export default {
  namespace:'thList',
  state: {
    dataList:[],
    currentPage:0,
    limit:15,
    total:0,
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
        const { asns, currentPage, limit,total} = result;
        asns.map((item,index)=>{
          item.key = index;
        });
        yield put ({
          type: 'getList',
          payload:{
            dataList:asns,
            currentPage,
            limit,
            total,
          }
        })
      }
    }
  }
}
