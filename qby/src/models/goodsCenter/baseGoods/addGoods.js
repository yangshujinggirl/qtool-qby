import { message } from 'antd';
import {
  goodsTypeApi,
  goodsInfoApi,
  getCategoryApi
 } from '../../../services/goodsCenter/baseGoods.js';

export default {
  namespace:'addGoods',
  state: {
    isHasSize:false,
    specOne:[],//商品规格1
    specTwo:[],//商品规格2
    categoryLevelOne:[],//商品分类1列表
    categoryLevelTwo:[],//商品分类2列表
    categoryLevelThr:[],//商品分类3列表
    categoryLevelFour:[],//商品分类4列表
    goodsType:[],//商品类型列表
    fileList:[],//商品图片
    pdSpu:{},
    pdSkus:[{//商品信息
      code:'',
      barcode:'',
      salePrice:'',
      purchasePrice:'',
      receivePrice:'',
      deliveryPrice:'',
      key:'0000'
    }],
  },
  reducers: {
    getCategory( state, { payload : {categoryLevelOne,categoryLevelTwo,categoryLevelThr,categoryLevelFour,} }) {
      return { ...state, categoryLevelOne,categoryLevelTwo,categoryLevelThr,categoryLevelFour,}
    },
    getType( state, { payload : goodsType }) {
      return { ...state, goodsType}
    },
    //批量设置
    batchSet(state, { payload : pdSkus }) {
      return { ...state, pdSkus }
    },
    //重置store
    resetData(state) {
      const pdSpu={
              pdSkus:[{
                      code:'',
                      barcode:'',
                      salePrice:'',
                      purchasePrice:'',
                      receivePrice:'',
                      deliveryPrice:'',
                      key:'0000'
                    }]
            };
      const fileList=[];
      const pdSkus = [{//商品信息
              code:'',
              barcode:'',
              salePrice:'',
              purchasePrice:'',
              receivePrice:'',
              deliveryPrice:'',
              key:'0000'
            }]
      const specOne=[];
      const specTwo=[];
      return {...state,pdSpu, fileList,specOne,specTwo,pdSkus}
    },
    getGoodsInfo(state, { payload : { pdSpu,fileList, pdSkus } }) {
      return { ...state, pdSpu, fileList, pdSkus }
    },
    setSpec(state,{ payload: {specOne, specTwo, pdSkus} }) {
      return { ...state, specOne, specTwo, pdSkus}
    }
  },
  effects: {
    *fetchCategory({ payload: values },{ call, put ,select}) {
      const levelOne = yield select(state => state.addGoods.categoryLevelOne);
      const levelTwo = yield select(state => state.addGoods.categoryLevelTwo);
      const levelThr = yield select(state => state.addGoods.categoryLevelThr);
      const levelFour = yield select(state => state.addGoods.categoryLevelFour);
      let categoryLevelOne=[];
      let categoryLevelTwo=[];
      let categoryLevelThr=[];
      let categoryLevelFour=[];
      const { level } = values;
      const result = yield call(getCategoryApi,values);
      if(result.code == '0') {
        let  { pdCategory } = result;
        switch(level) {
          case 1:
            categoryLevelOne = pdCategory;
            categoryLevelTwo = levelTwo;
            categoryLevelThr = levelThr;
            categoryLevelFour = levelFour;
            break;
          case 2:
            categoryLevelTwo = pdCategory;
            categoryLevelOne = levelOne;
            categoryLevelThr = levelThr;
            categoryLevelFour = levelFour;
            break;
          case 3:
            categoryLevelThr = pdCategory;
            categoryLevelOne = levelOne;
            categoryLevelTwo = levelTwo;
            categoryLevelFour = levelFour;
            break;
          case 4:
            categoryLevelFour = pdCategory;
            categoryLevelOne = levelOne;
            categoryLevelTwo = levelTwo;
            categoryLevelThr = levelThr;
            break;
        }
        yield put({
          type:'getCategory',
          payload:{
            categoryLevelOne,
            categoryLevelTwo,
            categoryLevelThr,
            categoryLevelFour,
          }
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
    *fetchGoodsInfo({ payload: values },{ call, put ,select}) {
      const oldPdSkus = yield select(state => state.addGoods.pdSkus)
      yield put({type:'resetData'})
      const result = yield call(goodsInfoApi,values);
      if(result.code == '0') {
        let { pdSpu, fileDomain } = result;
        let fileList = [];
        if(pdSpu.pdSpuPics && pdSpu.pdSpuPics) {
           fileList = pdSpu.pdSpuPics.map(el=>(
            {
              url:`${fileDomain}${el.picUrl}`,
              uid:el.pdSpuPicId,
              name: el.picUrl,
              status: 'done',
            }
          ))
        }

        let pdSkus = [];
        if(pdSpu.pdSkus.length>0) {
          pdSkus = pdSpu.pdSkus.map((el) => {
            let name1 = el.pdType1Val&&el.pdType1Val.name;
            let name2 = el.pdType2Val&&el.pdType2Val.name;
            el.name = el.pdType2Val?`${name1}/${name2}`:`${name1}`;
            el.key = el.pdSkuId;
            el.picUrl = `${fileDomain}${el.picUrl}`
            return el
          })
        } else {
          pdSkus = oldPdSkus;
        }
        yield put({
          type:'getGoodsInfo',
          payload:{
            pdSpu,
            fileList,
            pdSkus
          }
        })
      }
    },
    *handleSpec({ payload: {specOne, specTwo} },{ call, put ,select}) {
      let oldSpecOne = specOne;
      let oldSpecTwo = specTwo;
      let pdSkus=[];
      let infoObject = {//商品信息
            code:'',
            barcode:'',
            salePrice:'',
            purchasePrice:'',
            receivePrice:'',
            deliveryPrice:''
          };

      if(oldSpecOne.length >0) {
        if(oldSpecTwo.length >0) {
          for(let i=0;i<oldSpecOne.length;i++) {
            for(let j=0;j<oldSpecTwo.length;j++) {
              let item = {...oldSpecOne[i],...infoObject}
              item.name = `${oldSpecOne[i].name}/${oldSpecTwo[j].name}`;
              item.key = `${oldSpecOne[i].key}${oldSpecTwo[j].key}`;
              pdSkus.push(item);
            }
          }
        }else {
          for(let i=0;i<oldSpecOne.length;i++) {
            let item = {...oldSpecOne[i],...infoObject}
            pdSkus.push(item);
          }
        }
      } else {
        pdSkus.push(infoObject)
      }
      yield put({
        type:'setSpec',
        payload:{
          specOne,specTwo,pdSkus
        }
      })
    },
    *addSpec({ payload: {payloadVal, type} },{ call, put ,select}) {
      const oldSpecOne = yield select(state => state.addGoods.specOne)
      const oldSpecTwo = yield select(state => state.addGoods.specTwo)
      let specOne;
      let specTwo;
      if(type == 'one') {
        specOne = [...oldSpecOne,...[payloadVal]];
        specTwo = oldSpecTwo;
      } else {
        specOne = oldSpecOne;
        specTwo = [...oldSpecTwo,...[payloadVal]];
      }
      yield put({
        type:'handleSpec',
        payload:{specOne, specTwo}
      })
    },
    *deleteSpec({ payload: {payloadVal, type} },{ call, put ,select}) {
      const oldSpecOne = yield select(state => state.addGoods.specOne)
      const oldSpecTwo = yield select(state => state.addGoods.specTwo)
      let specOne = oldSpecOne;
      let specTwo = oldSpecTwo;
      if(type == 'one') {
        let index = oldSpecOne.indexOf(payloadVal)
        specOne.splice(index,1);
      } else {
        let index = oldSpecOne.indexOf(payloadVal)
        specTwo.splice(index,1);
      }
      yield put({
        type:'handleSpec',
        payload:{specOne, specTwo}
      })
    },
  }
}
