import { message } from 'antd';
import {
  getCategoryApi
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
    goodsList:[{
      key:1,
      SpuId:'55',
      name:'MORPHY RICHARDS摩飞 便携榨汁杯',
      displayName:'奶粉辅食',
      price:'¥4.00-9.00',
      qty:'B端在售库存',
      shop:'200',
      position:1,
    },{
      key:2,
      SpuId:'52',
      name:'MORPHY便携榨汁杯',
      displayName:'奶粉辅食',
      price:'¥4.00-9.00',
      qty:'B端在售库存',
      shop:'200',
      position:1,
    }]
  },
  reducers: {
    //重置store
    resetData(state, { payload : source }) {
      const categoryData = {
        categoryLevelOne:[],//商品分类1列表
        categoryLevelTwo:[],//商品分类2列表
        categoryLevelThr:[],//商品分类3列表
        categoryLevelFour:[],//商品分类4列表
        isLevelTwo:true,
        isLevelThr:true,
        isLevelFour:true,
      }
      return {
        ...state,
        categoryData,
       }
    },
    getCategory(state, { payload:categoryData }) {
      return { ...state,...categoryData };
    },
    getGoodsList(state, { payload:goodsList }) {
      goodsList.map((el,index) => {
        index++;
        el.key= index
      });
      return { ...state,...goodsList };
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
  }
}
