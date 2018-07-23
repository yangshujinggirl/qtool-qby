import {
  getListApi,
  specificationApi,
  goodsTypeApi
 } from '../../services/goodsCenter/internalSort.js';

const dataList = [{
  one:'一级',
  two:'二级',
  thr:'三级',
  four:'四级',
  status1:'一级状态',
  status2:'2级状态',
  status3:'3级状态',
  status4:'4级状态',
  key:'0'
}]
export default {
  namespace:'internalSort',
  state: {
    dataList:dataList,//商品列表
    currentPage:0,
    limit:15,
    total:0,
    goodsCategory:[],//商品规格
    goodsType:[]//商品类型
  },
  reducers: {
    getList( state, { payload : {dataList, currentPage, limit, total} }) {
      return { ...state, dataList, currentPage, limit, total}
    },
    getCategory( state, { payload : goodsCategory }) {
      return { ...state, goodsCategory}
    },
    getType( state, { payload : getType }) {
      return { ...state, getType}
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
    *fetchCategory({ payload: values },{ call, put ,select}) {
      const result = yield call(specificationApi,values);
      if(result.code == '0') {
        const { pdCategorys } = result;
        yield put({
          type:'getCategory',
          payload:pdCategorys
        })
      }
    },
    *fetchGoodsType({ payload: values },{ call, put ,select}) {
      const result = yield call(goodsTypeApi,values);
      if(result.code == '0') {
        const { pdTypes } = result;
        yield put({
          type:'getType',
          payload:pdTypes
        })
      }
    },
  }
}
