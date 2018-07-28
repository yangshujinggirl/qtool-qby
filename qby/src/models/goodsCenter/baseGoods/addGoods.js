import { message } from 'antd';
import {
  goodsTypeApi,
  goodsInfoApi,
  getCategoryApi
 } from '../../../services/goodsCenter/baseGoods.js';

export default {
  namespace:'addGoods',
  state: {
    specData:{
      specOne:[],//商品属性1
      specTwo:[],//商品属性2
    },
    sizeIdList:{//商品规格id
      pdSkusSizeOne:null,
      pdSkusSizeTwo:null
    },
    categoryData:{//商品分类
      categoryLevelOne:[],//商品分类1列表
      categoryLevelTwo:[],//商品分类2列表
      categoryLevelThr:[],//商品分类3列表
      categoryLevelFour:[],//商品分类4列表
      isLevelTwo:true,
      isLevelThr:true,
      isLevelFour:true,
    },
    goodsType:[],//商品规格列表
    fileList:[],//商品图片
    pdSpu:{},
    pdSkus:[{//商品信息
      code:null,
      barcode:null,
      salePrice:null,
      purchasePrice:null,
      receivePrice:null,
      deliveryPrice:null,
      key:'0000'
    }],
  },
  reducers: {
    getCategory( state, { payload : {categoryData}}) {
      return { ...state, categoryData}
    },
    setTypesId(state, { payload : selectData }) {
      let sizeIdList = state.sizeIdList
      let { type, typeId } = selectData;
      if(type == 'one') {
        sizeIdList.pdSkusSizeOne = typeId;
      } else {
        sizeIdList.pdSkusSizeTwo = typeId;
      }
      return {...state,sizeIdList}
    },
    //获取规格列表
    getType( state, { payload : goodsType }) {
      return { ...state, goodsType}
    },
    //批量设置
    batchSet(state, { payload : pdSkus }) {
      return { ...state, pdSkus }
    },
    //重置store
    resetData(state,{ payload : source }) {
      const pdSpu={};
      const fileList=[];
      let pdSkus;
      if(source == 0) {
        pdSkus=[{
                code:'',
                barcode:'',
                salePrice:'',
                purchasePrice:'',
                receivePrice:'',
                deliveryPrice:'',
                key:'0000'
              }]
      } else {
        pdSkus=[{
                code:'',
                barcode:'',
                toBPrice:'',
                toCPrice:'',
                costPrice:'',
                tagPrice:'',
                key:'0000'
              }]
      }
      const specData={//商品属性
        specOne:[],
        specTwo:[],
      }
      return {...state,pdSpu, fileList, specData, pdSkus}
    },
    //商品详情
    getGoodsInfo(state, { payload : { pdSpu,fileList, pdSkus, specData, sizeIdList } }) {
      return { ...state, pdSpu, fileList, pdSkus, specData, sizeIdList }
    },
    //设置属性
    setSpec(state,{ payload: {specData, pdSkus} }) {
      return { ...state, specData, pdSkus}
    }
  },
  effects: {
    *fetchCategory({ payload: values },{ call, put ,select}) {
      const levelOne = yield select(state => state.addGoods.categoryData.categoryLevelOne);
      const levelTwo = yield select(state => state.addGoods.categoryData.categoryLevelTwo);
      const levelThr = yield select(state => state.addGoods.categoryData.categoryLevelThr);
      const levelFour = yield select(state => state.addGoods.categoryData.categoryLevelFour);
      let categoryLevelOne=[];
      let categoryLevelTwo=[];
      let categoryLevelThr=[];
      let categoryLevelFour=[];
      let isLevelTwo;
      let isLevelThr;
      let isLevelFour;
      const { level } = values;
      let fixedParams = {status:1}
      values = {...values,...fixedParams};
      const result = yield call(getCategoryApi,values);
      //处理分类数据，disabled状态
      if(result.code == '0') {
        let  { pdCategory } = result;
        switch(level) {
          case 1:
            categoryLevelOne = pdCategory;
            categoryLevelTwo = levelTwo;
            categoryLevelThr = levelThr;
            categoryLevelFour = levelFour;
            isLevelTwo = false;
            isLevelThr =true;
            isLevelFour =true;
            break;
          case 2:
            categoryLevelTwo = pdCategory;
            categoryLevelOne = levelOne;
            categoryLevelThr = levelThr;
            categoryLevelFour = levelFour;
            isLevelTwo = false;
            isLevelThr =false;
            isLevelFour =true;
            break;
          case 3:
            categoryLevelThr = pdCategory;
            categoryLevelOne = levelOne;
            categoryLevelTwo = levelTwo;
            categoryLevelFour = levelFour;
            isLevelTwo = false;
            isLevelThr =false;
            isLevelFour =false;
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
    *fetchGoodsType({ payload: values },{ call, put ,select}) {
      const result = yield call(goodsTypeApi,values);
      if(result.code == '0') {
        let { pdTypes } = result;
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
        let { iPdSpu, fileDomain } = result;
        let pdSpu = iPdSpu;
        let fileList = [];
        //格式化图片数据
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
        //格式化pdSkus数据,商品规格，商品属性
        let pdSkus = [];
        let specOne=[];
        let specTwo=[];
        let oldspecOne=[];
        let oldspecTwo=[];
        let sizeIdList={};
        if(pdSpu.pdSkus.length>0) {
          pdSkus = pdSpu.pdSkus.map((el,index) => {
            let name1 = el.pdType1Val&&el.pdType1Val.name;
            let name2 = el.pdType2Val&&el.pdType2Val.name;
            el.name = el.pdType2Val?`${name1}/${name2}`:`${name1}`;
            el.key = el.pdSkuId;
            el.picUrl = `${fileDomain}${el.picUrl}`;
            //获取商品规格值
            sizeIdList.pdSkusSizeOne = el.pdType1&&el.pdType1.pdTypeId;
            sizeIdList.pdSkusSizeTwo = el.pdType1&&el.pdType2.pdTypeId;
            //商品属性数据处理
            if(el.pdType1Val&&(oldspecOne.indexOf(el.pdType1Val.pdTypeValId)==-1)) {
              oldspecOne.push(el.pdType1Val.pdTypeValId);
              specOne.push({
                key:el.pdType1Val.pdTypeValId,
                name:el.pdType1Val.name
              })
            }
            if(el.pdType2Val&&(oldspecTwo.indexOf(el.pdType2Val.pdTypeValId)==-1)) {
              oldspecTwo.push(el.pdType2Val.pdTypeValId);
              specTwo.push({
                key:el.pdType2Val.pdTypeValId,
                name:el.pdType2Val.name
              })
            }
            return el;
          })

        } else {
          pdSkus = oldPdSkus;
        }
        //商品详情
        yield put({
          type:'getGoodsInfo',
          payload:{ pdSpu, fileList, pdSkus, specData:{specOne,specTwo}, sizeIdList}
        })
        //初始化分类
        const { pdCategory1, pdCategory2, pdCategory3, pdCategory4 } =pdSpu;
        yield put({
          type:'handelCategory',
          payload:{ pdCategory1, pdCategory2, pdCategory3, pdCategory4 }
        })
      }
    },
    *handelCategory({ payload: { pdCategory1, pdCategory2, pdCategory3, pdCategory4 } },{ call, put ,select}) {
      if(pdCategory1 !== null) {
        yield put({
          type:'fetchCategory',
          payload:{ level:2, parentId: pdCategory1.pdCategoryId }
        })
      }
      if(pdCategory2 !== null) {
        yield put({
          type:'fetchCategory',
          payload:{ level:3, parentId: pdCategory2.pdCategoryId }
        })
      }
      if(pdCategory3 !== null) {
        yield put({
          type:'fetchCategory',
          payload:{ level:4, parentId: pdCategory3.pdCategoryId }
        })
      }
    },
    *handleSpec({ payload: {specOne, specTwo} },{ call, put ,select}) {
      // let oldSpecOne = specOne;
      // let oldSpecTwo = specTwo;
      let pdSkus=[];
      let infoObject = {//商品信息
            code:'',
            barcode:'',
            salePrice:'',
            purchasePrice:'',
            receivePrice:'',
            deliveryPrice:''
          };

      if(specOne.length >0) {
        if(specTwo.length >0) {
          for(let i=0;i<specOne.length;i++) {
            for(let j=0;j<specTwo.length;j++) {
              let item = {...specOne[i],...infoObject}
              item.name = `${specOne[i].name}/${specTwo[j].name}`;
              item.key = `${specOne[i].key}${specTwo[j].key}`;
              pdSkus.push(item);
            }
          }
        }else {
          for(let i=0;i<specOne.length;i++) {
            let item = {...specOne[i],...infoObject}
            pdSkus.push(item);
          }
        }
      } else {
        pdSkus.push(infoObject)
      }
      yield put({
        type:'setSpec',
        payload:{
          specData:{specOne,specTwo},
          pdSkus
        }
      })
    },
    *addSpec({ payload: {payloadVal, type} },{ call, put ,select}) {
      const oldSpecOne = yield select(state => state.addGoods.specData.specOne)
      const oldSpecTwo = yield select(state => state.addGoods.specData.specTwo)
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
      const oldSpecOne = yield select(state => state.addGoods.specData.specOne)
      const oldSpecTwo = yield select(state => state.addGoods.specData.specTwo)
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
