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
        let { orders, currentPage, limit, total } = result;
        orders = orders?orders:[];
        orders.length>0&&orders.map((el,index) => el.key = el.orderNo)
        yield put ({
          type: 'getList',
          payload:{
            list:orders,
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
