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
      pdCategory1Id:null,
      pdCategory2Id:null,
      pdCategory3Id:null,
      pdCategory4Id:null,
    },
    tabs:[{key:0, tabId:null }],
    selectkey:0,
    addKey:0,
    gdAddKey:0,
    goodsList:[],
    totalData:{
      sortType:20,
      ruleType:0,
      sortObjArray:[
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
    },
    homePageModuleId:'',
  },
  reducers: {
    //重置store
    resetData(state, { payload :{} }) {
      const categoryData ={//商品分类
        categoryLevelOne:[],//商品分类1列表
        categoryLevelTwo:[],//商品分类2列表
        categoryLevelThr:[],//商品分类3列表
        categoryLevelFour:[],//商品分类4列表
        isLevelTwo:true,
        isLevelThr:true,
        isLevelFour:true,
        pdCategory1Id:null,
        pdCategory2Id:null,
        pdCategory3Id:null,
        pdCategory4Id:null,
      }
      const goodsList = [];
      const totalData = {
        sortType:20,
        ruleType:0,
        sortObjArray:[
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
      };
      const tabs = [{key:0, tabId:null }];
      const selectkey = 0;
      return {
        ...state,
        goodsList,totalData, categoryData
       }
    },
    resetPage(state, { payload :{} }) {
      const categoryData ={//商品分类
        categoryLevelOne:[],//商品分类1列表
        categoryLevelTwo:[],//商品分类2列表
        categoryLevelThr:[],//商品分类3列表
        categoryLevelFour:[],//商品分类4列表
        isLevelTwo:true,
        isLevelThr:true,
        isLevelFour:true,
        pdCategory1Id:null,
        pdCategory2Id:null,
        pdCategory3Id:null,
        pdCategory4Id:null,
      }
      const goodsList = [];
      const totalData = {
        sortType:20,
        ruleType:0,
        sortObjArray:[
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
      };
      const tabs = [{key:0, tabId:null }];
      const selectkey = 0;
      return {
        ...state,
        categoryData,goodsList,totalData,tabs,selectkey
       }
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
    getGdAddKey(state, { payload:gdAddKey }) {
      return { ...state,gdAddKey };
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
      let categoryLevelOne = yield select(state => state.commodityFlow.categoryData.categoryLevelOne);
      let categoryLevelTwo = yield select(state => state.commodityFlow.categoryData.categoryLevelTwo);
      let categoryLevelThr = yield select(state => state.commodityFlow.categoryData.categoryLevelThr);
      let categoryLevelFour = yield select(state => state.commodityFlow.categoryData.categoryLevelFour);
      let pdCategory1Id = yield select(state => state.commodityFlow.categoryData.pdCategory1Id);
      let pdCategory2Id = yield select(state => state.commodityFlow.categoryData.pdCategory2Id);
      let pdCategory3Id = yield select(state => state.commodityFlow.categoryData.pdCategory3Id);
      let pdCategory4Id = yield select(state => state.commodityFlow.categoryData.pdCategory4Id);

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
            pdCategory1Id = null;
            pdCategory2Id = null;
            pdCategory3Id = null;
            pdCategory4Id = null;
            break;
          case 2:
            categoryLevelTwo = pdCategory;
            categoryLevelThr = [];
            categoryLevelFour = [];
            isLevelTwo = false;
            isLevelThr =true;
            isLevelFour =true;
            pdCategory1Id = parentId;
            pdCategory2Id = null;
            pdCategory3Id = null;
            pdCategory4Id = null;
            break;
          case 3:
            categoryLevelThr = pdCategory;
            categoryLevelFour = [];
            isLevelTwo = false;
            isLevelThr =false;
            isLevelFour =true;
            pdCategory2Id = parentId;
            pdCategory3Id = null;
            pdCategory4Id = null;
            break;
          case 4:
            categoryLevelFour = pdCategory;
            isLevelTwo = false;
            isLevelThr =false;
            isLevelFour =false;
            pdCategory3Id = parentId;
            pdCategory4Id = null;
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
              pdCategory1Id,
              pdCategory2Id,
              pdCategory3Id,
              pdCategory4Id
            }
          }
        })
      }
    },
    *fetchTabList({ payload: values },{ call, put ,select}) {
      yield put({type: 'resetPage',payload:{}});
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
      let sortObjArray=[
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
      let params = { tabId };
      yield put({type: 'tab/loding',payload:true});
      const res = yield call(getSearchGoodApi,params);
      if(res.code == '0') {
        if(res.pdFlowSpu) {
          let { spuList, sortRule, sortType } =res.pdFlowSpu;
          let totalData = {...totalData,...sortRule,sortType };
          totalData.sortObjArray = totalData.sortObjArray?totalData.sortObjArray:sortObjArray;
          spuList.length>0&&spuList.map((el,index) =>{
            el.key =index;
            el.FixedPdSpuId = el.pdSpuId;
          })
          yield put({type: 'getGdAddKey',payload:spuList.length});
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
