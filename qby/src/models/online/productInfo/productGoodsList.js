import {
  getListApi,
  specificationApi,
  goodsTypeApi
} from '../../../services/online/productInfo.js';


export default {
  namespace:'productGoodsList',
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
      const fixedLimit = yield select(state => state.baseGoodsList.limit);
      //默认分页是16
      if(!values.limit) {
        values = {...values,...{ limit: fixedLimit}}
      }
      yield put({type: 'tab/loding',payload:true});

      const result=yield call(getListApi,values);

      yield put({type: 'tab/loding',payload:false});

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
