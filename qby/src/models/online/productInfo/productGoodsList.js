import {
  getListApi,
  specificationApi,
  goodsTypeApi
} from '../../../services/online/productInfo.js';


export default {
  namespace:'productGoodsList',
  state: {
    dataList:[],//商品列表
    dataPag:{
      currentPage:0,
      limit:16,
      total:0,
    },
    authorityList:{
      authorityEdit:false,
      authorityExport:false,
      authoritySale:false,
    }
  },
  reducers: {
    getList( state, { payload : { dataList, dataPag } }) {
      return { ...state, dataList, dataPag }
    },
    setAuthority(state, { payload : authorityData }) {
      let authorityList={};
      authorityData.map((el) => {
        switch(el.urResourceId){
          case 802200:
            authorityList.authorityEdit=true;
            break;
          case 802300:
            authorityList.authorityExport = true;
            break;
          case 802400:
            authorityList.authoritySale = true;
            break;
        }
      })
      return { ...state, authorityList }
    },
    reSetData(state) {
      const dataList=[],//商品列表
            dataPag={
              currentPage:0,
              limit:16,
              total:0,
            },
            authorityList={
              authorityEdit:false,
              authorityExport:false,
              authoritySale:false,
            },
            selecteKeys=[];
      return { ...state, dataList, dataPag, authorityList}
    }
  },
  effects: {
    *fetchList({ payload: values }, { call, put ,select}) {
      const fixedLimit = yield select(state => state.productGoodsList.dataPag.limit);
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
            dataPag:{
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
