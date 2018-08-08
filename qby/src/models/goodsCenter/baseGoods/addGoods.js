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
    autoComplete:{//品牌和国家id
      pdBrandId:null,
      pdCountryId:null
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
    pdSkus:[{}],//商品信息数据
    linkageLabel:{
      isTimeRequired:false,
      isLotRequired:false,
    }
  },
  reducers: {
    save_fields(state, { payload : {currentField ,index}}) {
      let pdSkus = state.pdSkus;
      pdSkus[index] = {...pdSkus[index],...currentField};
      return {...state, pdSkus}
    },
    getCategory( state, { payload : {pdSpu,categoryData}}) {
      return { ...state, pdSpu, categoryData}
    },
    //获取规格列表
    getType( state, { payload : goodsType }) {
      return { ...state, goodsType}
    },
    //获取规格列表
    setLinkageLabel( state, { payload : label }) {
      const { type, value } =label
      let linkageLabel = state.linkageLabel;
      if(type == 'season') {
        linkageLabel.isTimeRequired = value;
      } else {
        linkageLabel.isLotRequired = value;
      }
      return { ...state, linkageLabel}
    },
    setAutoCompleteId(state, { payload: values }) {
      const { type, selectId } = values;
      let autoComplete = state.autoComplete;
      if(type == 'brand') {
        autoComplete.pdBrandId = selectId;
      } else {
        autoComplete.pdCountryId = selectId;
      }
      return {...state, autoComplete}
    },
    //商品信息图片
    setSkusPicUrl(state, { payload : currentData }) {
      let { index, fileList} =currentData;
      let pdSkus = state.pdSkus;
      pdSkus[index].fileList = fileList;
      return {...state,pdSkus}
    },
    setTypesId(state, { payload : {pdSkus, sizeIdList} }) {
      return {...state, pdSkus, sizeIdList }
    },
    //批量设置
    batchSet(state, { payload : pdSkus }) {
      return { ...state, pdSkus }
    },
    //重置store
    resetData(state,{ payload : source }) {
      const pdSpu={};
      const fileList=[];
      let pdSkus=[{}];//初始化spu数据
      const specData={//商品属性
        specOne:[],
        specTwo:[],
      }
      const autoComplete={
              pdBrandId:null,
              pdCountryId:null
            }
      const  linkageLabel={
              isTimeRequired:false,
              isLotRequired:false,
            }
      const categoryData = {
        categoryLevelOne:[],//商品分类1列表
        categoryLevelTwo:[],//商品分类2列表
        categoryLevelThr:[],//商品分类3列表
        categoryLevelFour:[],//商品分类4列表
        isLevelTwo:true,
        isLevelThr:true,
        isLevelFour:true,
      }
      const sizeIdList = {//商品规格id
        pdSkusSizeOne:null,
        pdSkusSizeTwo:null
      };
      return {
        ...state,
        pdSpu,
        fileList,
        specData,
        pdSkus,
        categoryData,
        sizeIdList,
        autoComplete,
        linkageLabel
       }
    },
    //商品详情
    getGoodsInfo(state, { payload : { pdSpu,fileList, pdSkus, specData, sizeIdList, autoComplete, linkageLabel } }) {
      return { ...state, pdSpu, fileList, pdSkus, specData, sizeIdList,autoComplete, linkageLabel }
    },
    //设置属性
    setSpec(state,{ payload: {specData, pdSkus} }) {
      return { ...state, specData, pdSkus}
    },
  },
  effects: {
    *fetchCategory({ payload: values },{ call, put ,select}) {
      const levelOne = yield select(state => state.addGoods.categoryData.categoryLevelOne);
      const levelTwo = yield select(state => state.addGoods.categoryData.categoryLevelTwo);
      const levelThr = yield select(state => state.addGoods.categoryData.categoryLevelThr);
      const levelFour = yield select(state => state.addGoods.categoryData.categoryLevelFour);
      const pdSpu = yield select(state => state.addGoods.pdSpu);
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
            pdSpu.pdCategory1Id = null;
            pdSpu.pdCategory2Id = null;
            pdSpu.pdCategory3Id = null;
            pdSpu.pdCategory4Id = null;
            break;
          case 2:
            categoryLevelTwo = pdCategory;
            categoryLevelOne = levelOne;
            categoryLevelThr = [];
            categoryLevelFour = [];
            isLevelTwo = false;
            isLevelThr =true;
            isLevelFour =true;
            pdSpu.pdCategory1Id = parentId;
            pdSpu.pdCategory2Id = null;
            pdSpu.pdCategory3Id = null;
            pdSpu.pdCategory4Id = null;
            break;
          case 3:
            categoryLevelThr = pdCategory;
            categoryLevelOne = levelOne;
            categoryLevelTwo = levelTwo;
            categoryLevelFour = [];
            isLevelTwo = false;
            isLevelThr =false;
            isLevelFour =true;
            pdSpu.pdCategory2Id = parentId;
            pdSpu.pdCategory3Id = null;
            pdSpu.pdCategory4Id = null;
            break;
          case 4:
            categoryLevelFour = pdCategory;
            categoryLevelOne = levelOne;
            categoryLevelTwo = levelTwo;
            categoryLevelThr = levelThr;
            isLevelTwo = false;
            isLevelThr =false;
            isLevelFour =false;
            pdSpu.pdCategory3Id = parentId;
            pdSpu.pdCategory4Id = null;
            break;
        }
        yield put({
          type:'getCategory',
          payload:{
            pdSpu,
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
      const { source } =values;
      const oldPdSkus = yield select(state => state.addGoods.pdSkus)
      const linkageLabel = yield select(state => state.addGoods.linkageLabel)
      yield put({type:'resetData',payload:source})//重置初始数据
      yield put({type: 'tab/loding',payload:true});

      const result = yield call(goodsInfoApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code == '0') {
        let { iPdSpu, fileDomain } = result;
        let pdSpu = iPdSpu;
        let pdBrandId =pdSpu.pdBrandId;//存入品牌id
        let pdCountryId =pdSpu.pdCountryId;//存入国家id
        let fileList = [];
        //格式化图片数据
        if(pdSpu.spuIdPics && pdSpu.spuIdPics) {
           fileList = pdSpu.spuIdPics.map(el=>(
            {
              url:`${fileDomain}${el.url}`,
              uid:el.uid,
              name: el.url,
              status: 'done',
            }
          ))
        }
        //格式化pdSkus数据,//商品规格，//商品属性
        let pdSkus = [];
        let specOne=[];
        let specTwo=[];
        let oldspecOne=[];
        let oldspecTwo=[];
        let sizeIdList={};
        linkageLabel.isTimeRequired = !!pdSpu.isSeasonSpu;
        linkageLabel.isLotRequired = !!pdSpu.lotStatus;
        //初始化商品信息，有值是pdSkus，没值填充spu值
        if(pdSpu.pdSkus.length>0) {
          pdSkus = pdSpu.pdSkus.map((el,index) => {
            let name1 = el.pdType1Val&&el.pdType1Val.name;
            let name2 = el.pdType2Val&&el.pdType2Val.name;
            let id1 = el.pdType1ValId;
            let id2 = el.pdType2ValId;
            el.name = el.pdType2Val?`${name1}/${name2}`:`${name1}`;
            el.key = el.pdType2ValId?`${id1}_${id2}`:`${id1}`;//
            // el.picUrl = `${fileDomain}${el.picUrl}`;
            //商品图片
            let fileList = [{
                  name: el.picUrl,
                  url:`${fileDomain}${el.picUrl}`,
                  uid:el.key,
                  status: 'done',
                }]
            el.fileList = el.picUrl&&fileList;
            //获取商品规格值
            sizeIdList.pdSkusSizeOne = el.pdType1&&el.pdType1.pdTypeId;
            sizeIdList.pdSkusSizeTwo = el.pdType2&&el.pdType2.pdTypeId;
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
          //初始化spu商品pdSpu数据
          let initPdspuData;//1是线上，0是线下
          if(source == 1) {
            initPdspuData = {
                    code:pdSpu.code,
                    barcode:pdSpu.barcode,
                    salePrice:pdSpu.salePrice,
                    purchasePrice:pdSpu.purchasePrice,
                    receivePrice:pdSpu.receivePrice,
                    deliveryPrice:pdSpu.deliveryPrice,
                    key:pdSpu.barcode
                  }
          } else {
            initPdspuData = {
                    code:pdSpu.code,
                    barcode:pdSpu.barcode,
                    toBPrice:pdSpu.toBPrice,
                    toCPrice:pdSpu.toCPrice,
                    costPrice:pdSpu.costPrice,
                    tagPrice:pdSpu.tagPrice,
                    key:pdSpu.barcode
                  }
          }
          pdSkus.push(initPdspuData);
        }

        //商品详情
        yield put({
          type:'getGoodsInfo',
          payload:{
            pdSpu,
            fileList,
            pdSkus,
            specData:{specOne,specTwo},
            sizeIdList,
            autoComplete:{ pdBrandId,pdCountryId },
            linkageLabel
          }
        })
        //初始化分类
        yield put({
          type:'handelCategory',
          payload:pdSpu
        })
      }
    },
    *handelCategory({ payload: pdSpu},{ call, put ,select}) {
      const categoryLevelOne = yield select(state => state.addGoods.categoryData.categoryLevelOne)
      const [resultTwo,resultThr,resultFour] = yield [
              call(getCategoryApi, { level:2, parentId: pdSpu.pdCategory1Id }),
              call(getCategoryApi, { level:3, parentId: pdSpu.pdCategory2Id }),
              call(getCategoryApi, { level:4, parentId: pdSpu.pdCategory3Id })
            ];
            let categoryLevelTwo,
                categoryLevelThr,
                categoryLevelFour,
                isLevelTwo,
                isLevelThr,
                isLevelFour;
            if(resultTwo.code == '0') {
              categoryLevelTwo = resultTwo.pdCategory;
              isLevelTwo =false;
            }
            if(resultThr.code == '0') {
              categoryLevelThr = resultThr.pdCategory;
              isLevelThr =false;
            }
            if(resultFour.code == '0') {
              categoryLevelFour = resultFour.pdCategory;
              isLevelFour =false;
            }
            yield put({
              type:'getCategory',
              payload:{
                pdSpu,
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
    },
    *handleSpec({ payload: {specOne, specTwo} },{ call, put ,select}) {
      let oldpdSkus = yield select(state => state.addGoods.pdSkus);
      let newPdSkus=[];
      //处理新增属性数据;
      if(specOne.length >0) {
        if(specTwo.length >0) {
          for(let i=0;i<specOne.length;i++) {
            for(let j=0;j<specTwo.length;j++) {
              let item = {...specOne[i]}
              item.name = `${specOne[i].name}/${specTwo[j].name}`;
              item.key = `${specOne[i].key}_${specTwo[j].key}`;
              item.pdType1ValId = specOne[i].key;
              item.pdType2ValId = specTwo[j].key;
              newPdSkus.push(item);
            }
          }
        }else {
          for(let i=0;i<specOne.length;i++) {
            let item = {...specOne[i]};
            item.pdType1ValId = specOne[i].key;
            item.pdType1Va2Id = null;
            newPdSkus.push(item);
          }
        }
      } else {
        newPdSkus.push({});
        specTwo=[]
      }
      //处理编辑数据,新旧数据进行合关去重
      for(let m = 0;m<newPdSkus.length;m++) {
        for(let n = 0; n<oldpdSkus.length; n++) {
          if(newPdSkus[m].key == oldpdSkus[n].key) {
            let items = {...newPdSkus[m],...oldpdSkus[n]};
            newPdSkus[m] = items;
          }
        }
      }
      let pdSkus = newPdSkus;
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
        let index = oldSpecOne.findIndex(el =>el.key == payloadVal.key);
        specOne.splice(index,1);
      } else {
        let index = oldSpecTwo.findIndex(el =>el.key == payloadVal.key);
        specTwo.splice(index,1);
      }
      yield put({
        type:'handleSpec',
        payload:{specOne, specTwo}
      })
    },
    //规格change事件,要重置属性，规格，数据pdSkus，商品息图片
    *changeTypesId({ payload: selectData },{ call, put ,select}) {
      let sizeIdList = yield select(state => state.addGoods.sizeIdList)//重置规格
      let pdSkus = yield select(state => state.addGoods.pdSkus)//重置数据
      let specData = yield select(state => state.addGoods.specData)//重置属性
      let specOne,specTwo;
      let { type, typeId } = selectData;
      if(type == 'one') {//置空数据，属性1
        sizeIdList.pdSkusSizeOne = typeId;
        specOne = [];
        specTwo = specData.specTwo;
        pdSkus = [{}];
      } else {
        sizeIdList.pdSkusSizeTwo = typeId;
        specOne = specData.specOne;
        specTwo = [];
      }
      //重新计算属性
      yield put({
        type:'handleSpec',
        payload:{specOne, specTwo}
      })
      yield put({
        type:'setTypesId',
        payload:{ pdSkus, sizeIdList }
      })
    },
  }
}
