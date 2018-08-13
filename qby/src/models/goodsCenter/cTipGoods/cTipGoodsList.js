import {
  getListApi,
} from '../../../services/goodsCenter/cTipGoods.js';
import {
  getCategoryApi
} from '../../../services/goodsCenter/baseGoods.js';


export default {
  namespace:'cTipGoodsList',
  state: {
    categoryList:[],
    dataList:[],//商品列表
    currentPage:0,
    limit:15,
    total:0,
    authorityList:{
      authorityEdit:false,
      authoritySale:false,
      authorityNew:false,
      authorityHot:false
    },
    selecteKeys:[]
  },
  reducers: {
    setAuthority(state, { payload : authorityData }) {
      let authorityList={};
      authorityData.map((el) => {
        switch(el.urResourceId){
          case 308200:
            authorityList.authorityEdit=true;
            break;
          case 308300:
            authorityList.authoritySale = true;
            break;
          case 308400:
            authorityList.authorityNew = true;
            break;
          case 308500:
            authorityList.authorityHot = true;
            break;
        }
      })
      return { ...state, authorityList }
    },
    getList( state, { payload : {dataList, currentPage, limit, total} }) {
      return { ...state, dataList, currentPage, limit, total}
    },
    getCategoryList( state, { payload : {categoryList} }) {
      return { ...state, categoryList}
    },
    setCheckBox( state, { payload: pdSpuId } ) {
      let dataList = state.dataList;
      let selecteKeys = [];
      dataList.map((el) => {
        if(el.pdSpuId == pdSpuId) {
          el.checked = !el.checked;
        }
        if(el.checked) {
          selecteKeys.push(el.pdSpuId);
        }
        return el;
      })

      return { ...state, dataList, selecteKeys}
    },
  },
  effects: {
    *fetchList({ payload: values }, { call, put ,select}) {
      const fixedLimit = yield select(state => state.cTipGoodsList.limit);
      //默认分页是16
      if(!values.limit) {
        values = {...values,...{ limit: fixedLimit}}
      }
      yield put({type: 'tab/loding',payload:true});

      const result=yield call(getListApi,values);

      yield put({type: 'tab/loding',payload:false});

      if(result.code=='0') {
        const { iPdSpu, currentPage, limit, total } = result;
        iPdSpu.map((el) => {
          el.checked = false;
          return el;
        })
        yield put ({
          type: 'getList',
          payload:{
            dataList:iPdSpu,
            currentPage,
            limit,
            total
          }
        })
      }
    },
    *fetchCategory({ payload: values },{ call, put ,select}) {
      values = {...values,...{ status:1 }};
      yield put({type: 'tab/loding',payload:true});
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
