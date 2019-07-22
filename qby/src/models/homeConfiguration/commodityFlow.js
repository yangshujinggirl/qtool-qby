import { message } from 'antd';
import {
  getCategoryApi,getSearchTabApi,getSearchGoodApi
} from '../../services/cConfig/homeConfiguration/commodityFlow.js';

export default {
  namespace:'commodityFlow',
  state: {
    categoryData:{//商品分类
      categoryLevelOne:[],//商品分类1列表
      categoryLevelTwo:[],//商品分类2列表
      categoryLevelThr:[],//商品分类3列表
      categoryLevelFour:[],//商品分类4列表
      isLevelTwo:true,
      isLevelThr:true,
      isLevelFour:true,
    },
    tabs:[{key:0, tabId:null }],
    selectkey:0,
    addKey:0,
    goodsList:[],
    totalData:{
      sortType:20,
      ruleType:0
    },
    homePageModuleId:'',
    sortArr:[{
        title:'新品',
        key:'a'
      },{
        title:'热卖商品',
        key:'b'
      },{
        title:'促销商品',
        key:'c'
      },{
        title:'普通商品',
        key:'d'
      }]
  },
  reducers: {
    //重置store
    resetData(state, { payload :{} }) {
      const categoryData = {
        categoryLevelOne:[],//商品分类1列表
        categoryLevelTwo:[],//商品分类2列表
        categoryLevelThr:[],//商品分类3列表
        categoryLevelFour:[],//商品分类4列表
        isLevelTwo:true,
        isLevelThr:true,
        isLevelFour:true,
      }
      const goodsList = [];
      const totalData = {
        sortType:20,
        ruleType:0
      };
      const tabs = [{key:0, tabId:null }];
      const selectkey = 0;
      const sortArr =[
        {
          title:'新品',
          key:'a'
        },{
          title:'热卖商品',
          key:'b'
        },{
          title:'促销商品',
          key:'c'
        },{
          title:'普通商品',
          key:'d'
        }]
      return {
        ...state,
        goodsList,totalData,sortArr
       }
    },
    resetPage(state, { payload :{} }) {
      const categoryData = {
        categoryLevelOne:[],//商品分类1列表
        categoryLevelTwo:[],//商品分类2列表
        categoryLevelThr:[],//商品分类3列表
        categoryLevelFour:[],//商品分类4列表
        isLevelTwo:true,
        isLevelThr:true,
        isLevelFour:true,
      }
      const goodsList = [];
      const totalData = {
        sortType:20,
        ruleType:0
      };
      const tabs = [{key:0, tabId:null }];
      const selectkey = 0;
      const sortArr =[
        {
          title:'新品',
          key:'a'
        },{
          title:'热卖商品',
          key:'b'
        },{
          title:'促销商品',
          key:'c'
        },{
          title:'普通商品',
          key:'d'
        }]
      return {
        ...state,
        categoryData,goodsList,totalData,sortArr,tabs,selectkey
       }
    },
    getSortArr(state, { payload:sortArr }) {
      return { ...state,...sortArr };
    },
    getCategory(state, { payload:categoryData }) {
      return { ...state,...categoryData };
    },
    getGoodsList(state, { payload:goodsList }) {
      goodsList = [...goodsList];
      return { ...state, goodsList };
    },
    getTotalData(state, { payload:totalData }) {
      return { ...state,totalData };
    },
    getSelectkey(state, { payload:selectkey }) {
      return { ...state,selectkey };
    },
    getAddKey(state, { payload:addKey }) {
      return { ...state,addKey };
    },
    getHomePageModuleId(state, { payload:homePageModuleId }) {
      return { ...state,homePageModuleId };
    },
    getTabs(state, { payload:tabs }) {
      tabs =[...tabs];
      return { ...state, tabs };
    },
  },
  effects: {
    *fetchCategory({ payload: values },{ call, put ,select}) {
      const levelOne = yield select(state => state.commodityFlow.categoryData.categoryLevelOne);
      const levelTwo = yield select(state => state.commodityFlow.categoryData.categoryLevelTwo);
      const levelThr = yield select(state => state.commodityFlow.categoryData.categoryLevelThr);
      const levelFour = yield select(state => state.commodityFlow.categoryData.categoryLevelFour);

      let categoryLevelOne=[];
      let categoryLevelTwo=[];
      let categoryLevelThr=[];
      let categoryLevelFour=[];
      let isLevelTwo;
      let isLevelThr;
      let isLevelFour;
      const { level, parentId } = values;
      let fixedParams = {status:1};
      values = {...values,...fixedParams};
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(getCategoryApi,values);
      yield put({type: 'tab/loding',payload:false});
      //处理分类数据，disabled状态
      if(result.code == '0') {
        let  { pdCategory } = result;
        switch(level) {
          case 1:
            categoryLevelOne = pdCategory;
            categoryLevelTwo = [];
            categoryLevelThr = [];
            categoryLevelFour = [];
            isLevelTwo = true;
            isLevelThr =true;
            isLevelFour =true;
            break;
          case 2:
            categoryLevelTwo = pdCategory;
            categoryLevelOne = levelOne;
            categoryLevelThr = [];
            categoryLevelFour = [];
            isLevelTwo = false;
            isLevelThr =true;
            isLevelFour =true;
            break;
          case 3:
            categoryLevelThr = pdCategory;
            categoryLevelOne = levelOne;
            categoryLevelTwo = levelTwo;
            categoryLevelFour = [];
            isLevelTwo = false;
            isLevelThr =false;
            isLevelFour =true;
            break;
          case 4:
            categoryLevelFour = pdCategory;
            categoryLevelOne = levelOne;
            categoryLevelTwo = levelTwo;
            categoryLevelThr = levelThr;
            isLevelTwo = false;
            isLevelThr =false;
            isLevelFour =false;
            break;
        }
        yield put({
          type:'getCategory',
          payload:{
            categoryData:{
              categoryLevelOne,
              categoryLevelTwo,
              categoryLevelThr,
              categoryLevelFour,
              isLevelTwo,
              isLevelThr,
              isLevelFour,
            }
          }
        })
      }
    },
    *fetchTabList({ payload: values },{ call, put ,select}) {
      yield put({type: 'tab/loding',payload:true});
      const selectkey = yield select(state => state.commodityFlow.selectkey);
      const res = yield call(getSearchTabApi,values);
      //处理分类数据，disabled状态
      if(res.code == '0') {
        let { pdFlowTabList } =res;
        if(pdFlowTabList&&pdFlowTabList.length>0) {
          pdFlowTabList.map((el,index) => el.key = index);
          let currentItem = pdFlowTabList.find((el) => el.key == selectkey);
          yield put({
            type:'fetchGoodsList',
            payload:{ tabId:currentItem.tabId, selectkey:selectkey }
          })
        } else {
          pdFlowTabList = [{key:0}];
        }
        yield put({type: 'getTabs',payload:pdFlowTabList});
        yield put({type: 'getAddKey',payload:pdFlowTabList.length});
      } else {
        message.error(res.message);
        yield put({type: 'tab/loding',payload:false});
      }
      yield put({type: 'getHomePageModuleId',payload:values.homePageModuleId});
    },
    *fetchGoodsList({ payload: values },{ call, put ,select}) {
      yield put({type: 'resetData',payload:{}});
      let totalData = yield select(state => state.commodityFlow.totalData);
      let { selectkey, tabId } =values;
      let params = { tabId };
      yield put({type: 'tab/loding',payload:true});
      const res = yield call(getSearchGoodApi,params);
      if(res.code == '0') {
        if(res.pdFlowSpu) {
          let { spuList, sortRule, sortType } =res.pdFlowSpu;
          let totalData = {...totalData,...sortRule,sortType };
          spuList.length>0&&spuList.map((el,index) =>{
            el.key =index;
            el.FixedPdSpuId = el.pdSpuId;
          })
          yield put({type: 'getGoodsList',payload:spuList});
          yield put({ type: 'getTotalData', payload:totalData });
        }
        yield put({ type: 'getSelectkey', payload:selectkey });
      } else {
        message.error(res.message)
      }
      yield put({type: 'tab/loding',payload:false});
    },
 }
}
