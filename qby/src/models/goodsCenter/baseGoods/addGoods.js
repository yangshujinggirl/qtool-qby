import {
  getListApi,
  specificationApi,
  goodsTypeApi,
  goodsBrandApi,
  goodsInfoApi
 } from '../../../services/goodsCenter/baseGoods.js';

export default {
  namespace:'addGoods',
  state: {
    specOne:[],//商品规格1
    specTwo:[],//商品规格2
    goodsCategory:[],//商品规格
    goodsType:[],//商品类型
    fileList:[],
    pdSpu:{
      pdSkus:[{//商品信息
        code:'',
        barcode:'',
        salePrice:'',
        purchasePrice:'',
        receivePrice:'',
        deliveryPrice:''
      }]
    },
    pdSkus:[{//商品信息
      code:'',
      barcode:'',
      salePrice:'',
      purchasePrice:'',
      receivePrice:'',
      deliveryPrice:''
    }],
  },
  reducers: {
    getCategory( state, { payload : goodsCategory }) {
      return { ...state, goodsCategory}
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
      const pdSpu={}, fileList=[];
      return {...state,pdSpu, fileList}
    },
    getGoodsInfo(state, { payload : { pdSpu,fileList } }) {
      return { ...state, pdSpu, fileList }
    },
    setSpec(state,{ payload: {specOne, specTwo, pdSkus} }) {
      // tags = [...state.tags,tags];
      // let oldPdSkus = state.pdSkus;
      // let pdSkus=[]
      // for(var i = 0;i<tags.length;i++ ) {
      //   for(var j = 0; j<oldPdSkus.length; j++) {
      //     var item = Object.assign(oldPdSkus[j],tags[i]);
      //     pdSkus[i] = item;
      //   }
      // }
      // console.log(oldPdSkus)
      return { ...state, specOne, specTwo, pdSkus}
    }
  },
  effects: {
    *fetchCategory({ payload: values },{ call, put ,select}) {
      const result = yield call(specificationApi,values);
      if(result.code == '0') {
        const { pdCategorys } = result;
        yield put({
          type:'getCategory',
          payload:pdCategorys
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
      const result = yield call(goodsInfoApi,values);
      if(result.code == '0') {
        const { pdSpu, fileDomain } = result;
        let fileList = pdSpu.spuIdPics && pdSpu.spuIdPics.map(el=>(
          {
            url:`${fileDomain}${el.url}`,
            uid:el.uid,
            name: el.url,
            status: 'done',
          }
        ))
        yield put({
          type:'getGoodsInfo',
          payload:{
            pdSpu,
            fileList
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
      if(oldSpecTwo.length >0) {
        for(let i=0;i<oldSpecOne.length;i++) {
          for(let j=0;j<oldSpecTwo.length;j++) {
            let item = {...oldSpecOne[i],...infoObject}
            item.name = `${oldSpecOne[i].name}/${oldSpecTwo[j].name}`;
            item.key = `${oldSpecOne[i].key}${oldSpecTwo[j].key}`;
            pdSkus.push(item);
          }
        }
      } else {
        if(oldSpecOne.length>0) {
          for(let i=0;i<oldSpecOne.length;i++) {
            let item = {...oldSpecOne[i],...infoObject}
            pdSkus.push(item);
          }
        } else {
          pdSkus.push(infoObject)
        }

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
