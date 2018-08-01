import {
  getListApi,
} from '../../../services/goodsCenter/bTipGoods.js';
import {
  getCategoryApi
} from '../../../services/goodsCenter/baseGoods.js';


export default {
  namespace:'bTipGoodsList',
  state: {
    categoryList:[],
    dataList:[],//商品列表
    currentPage:0,
    limit:16,
    total:0,
  },
  reducers: {
    getList( state, { payload : {dataList, currentPage, limit, total} }) {
      return { ...state, dataList, currentPage, limit, total}
    },
    getCategoryList( state, { payload : {categoryList} }) {
      return { ...state, categoryList}
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
    *fetchCategory({ payload: values },{ call, put ,select}) {
      const result = yield call(getCategoryApi,values);
      yield put({type: 'tab/loding',payload:false});
      //处理分类数据，disabled状态
      if(result.code == '0') {
        let  { pdCategory } = result;
        yield put({
          type:'getCategoryList',
          payload:{ categoryList: pdCategory}
        })
      }
    },
  }
}
