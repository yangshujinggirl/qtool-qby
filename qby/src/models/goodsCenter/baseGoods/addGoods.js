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
    goodsCategory:[],//商品规格
    goodsType:[],//商品类型
    fileList:[],
    pdSpu:{},
    pdSkus:[{//商品信息
      code:'1',
      barcode:'2',
      salePrice:'3',
      purchasePrice:'4',
      receivePrice:'5',
      deliveryPrice:'6'
    }],
  },
  reducers: {
    getCategory( state, { payload : goodsCategory }) {
      return { ...state, goodsCategory}
    },
    getType( state, { payload : getType }) {
      return { ...state, getType}
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
  }
}
