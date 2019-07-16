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
    tabs:[{key:0,tabName:'商品分类',tabId:1},{key:1,tabName:'tab2',tabId:2}],
    selectkey:0,
    goodsList:[{
      key:0,
      pdSpuId:'55',
      cname:'MORPHY RICHARDS摩飞 便携榨汁杯',
      classifyName:'奶粉辅食',
      price:'¥4.00-9.00',
      pdInvQty:'1290',
      outOfStackQty:'200',
      isFixed:1,
    },{
      key:1,
      pdSpuId:'40',
      cname:'MORPHY RICHARDS摩飞 便携榨汁杯',
      classifyName:'奶粉辅食',
      price:'¥4.00-9.00',
      pdInvQty:'B端在售库存',
      outOfStackQty:'1290',
      isFixed:1,
    }],
    totalData:{
      sortType:10,
    }
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
      const totalData = {};
      return {
        ...state,
        categoryData,goodsList,totalData
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
      const res = yield call(getSearchTabApi,values);
      //处理分类数据，disabled状态
      if(res.code == '0') {
        let { pdFlowTabList } =res;
        if(pdFlowTabList&&pdFlowTabList.length>0) {
          pdFlowTabList.map((el,index) => {
            el.key = index
          })
          yield put({
            type:'fetchGoodsList',
            payload:{tabId:pdFlowTabList[0].tabId, selectkey:0}
          })
        } else {
          pdFlowTabList = [];
        }
        yield put({type: 'getTabs',payload:pdFlowTabList});
      } else {
        message.error(res.message)
      }
      yield put({type: 'tab/loding',payload:false});
    },
    *fetchGoodsList({ payload: values },{ call, put ,select}) {
      yield put({type: 'resetData',payload:{}});
      let { selectkey, tabId } =values;
      let params = { tabId };
      yield put({type: 'tab/loding',payload:true});
      const res = yield call(getSearchGoodApi,params);
      //处理分类数据，disabled状态
      if(res.code == '0') {
        if(res.pdFlowSp) {
          const { spuList, sortRule, sortType } =res.pdFlowSpu;
          let totalData = {...sortRule,sortType };
          yield put({type: 'getGoodsList',payload:spuList});
          yield put({
            type: 'getTotalData',
            payload:totalData
          });
        }
        yield put({
          type: 'getSelectkey',
          payload:selectkey
        });
      } else {
        message.error(res.message)
      }
      yield put({type: 'tab/loding',payload:false});
    },
 }
}