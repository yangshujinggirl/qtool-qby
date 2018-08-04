import {
  getLogListApi
} from '../../services/goodsCenter/commonGoods.js';

export default {
  namespace:'goodsLogList',
  state: {
    dataList:[],//列表
    currentPage:0,
    limit:15,
    total:0,
  },
  reducers: {
    getList( state, { payload : {dataList, currentPage, limit, total} }) {
      return { ...state, dataList, currentPage, limit, total}
    },
  },
  effects: {
    *fetchList({ payload: values }, { call, put ,select}) {
      const result=yield call(getLogListApi,values);
      if(result.code=='0') {
        let { loge, currentPage, limit, total } = result;
        yield put ({
          type: 'getList',
          payload:{
            dataList:loge,
            currentPage,
            limit,
            total,
          }
        })
      }
    },
  }
}
