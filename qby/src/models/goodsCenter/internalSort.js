import {
  getListApi,
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
    categoryLevelOne:[],//商品分类1列表
    categoryLevelTwo:[],//商品分类2列表
    categoryLevelThr:[],//商品分类3列表
    categoryLevelFour:[],//商品分类4列表
    dataList:dataList,//商品列表
    detailData:{},
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
    *fetchCategory({ payload: values },{ call, put ,select}) {
      const result = yield call(getListApi,values);
      if(result.code == '0') {
        let  { pdCategory } = result;

        yield put({
          type:'getCategory',
          payload:{dataList: pdCategory}
        })
      }
    },
    *fetchSave({ payload: values },{ call, put ,select}) {
      const result = yield call(getListApi,values);
      if(result.code == '0') {
        let  { pdCategory } = result;

        yield put({
          type:'getCategory',
          payload:{dataList: pdCategory}
        })
      }
    },
  }
}
