import {
  getListApi,
 } from '../../services/operate/sellManage.js';

export default {
  namespace:'sellManage',
  state:{
    list:[],
    data:{
      currentPage:0,
      limit:16,
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
      //默认分页是16
      if(!values.limit) {
        values = {...values,...{ limit: fixedLimit}}
      }
      yield put({type: 'tab/loding',payload:true});
      const result=yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
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
      }
    },
  }
}
