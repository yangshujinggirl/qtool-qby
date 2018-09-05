import {
  getListApi,
  getCategoryApi
 } from '../../../services/goodsCenter/baseGoods.js';


export default {
  namespace:'baseGoodsList',
  state: {
    categoryList:[],
    dataList:[],//商品列表
    dataPag:{
      currentPage:0,
      limit:16,
      total:0,
    },
    authorityList:{
      authorityOnline:false,
      authorityOutLine:false,
    }
  },
  reducers: {
    setAuthority(state, { payload : authorityData }) {
      let authorityList={};
      authorityData.map((el) => {
        switch(el.urResourceId){
          case 301200:
            authorityList.authorityOnline=true;
            break;
          case 301300:
            authorityList.authorityOutLine = true;
            break;
        }
      })
      return { ...state, authorityList }
    },
    getList( state, { payload : {dataList, dataPag} }) {
      return { ...state, dataList, dataPag}
    },
    getCategoryList( state, { payload : {categoryList} }) {
      return { ...state, categoryList}
    },
    reSetData(state) {
      const categoryList=[],
            dataList=[],//商品列表
            dataPag={
              currentPage:0,
              limit:16,
              total:0,
            },
            authorityList={
              authorityOnline:false,
              authorityOutLine:false,
            };
      return { ...state, categoryList, dataList, dataPag, authorityList}
    }
  },
  effects: {
    *fetchList({ payload: values }, { call, put ,select}) {
      const fixedLimit = yield select(state => state.baseGoodsList.dataPag.limit);
      //默认分页是16
      if(!values.limit) {
        values = {...values,...{ limit: fixedLimit}}
      }
      yield put({type: 'tab/loding',payload:true});
      const result=yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code=='0') {
        let { pdSpus, currentPage, limit, total } = result;
        yield put ({
          type: 'getList',
          payload:{
            dataList:pdSpus,
            dataPag:{
              currentPage,
              limit,
              total
            }
          }
        })
      }
    },
    *fetchCategory({ payload: values },{ call, put ,select}) {
      values = {...values,...{ status:1 }};
      const result = yield call(getCategoryApi,values);
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
