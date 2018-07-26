import {
  getListApi,
  specificationApi,
  goodsTypeApi
} from '../../../services/goodsCenter/bTipGoods.js';


export default {
  namespace:'productInfo',
  state: {
    dataList:[],//商品列表
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
      const result=yield call(getListApi,values);
      if(result.code=='0') {
        const { pdSpus, currentPage, limit, total } = result;
        yield put ({
          type: 'getList',
          payload:{
            dataList:pdSpus,
            currentPage,
            limit,
            total
          }
        })
      }
    },
  }
}
