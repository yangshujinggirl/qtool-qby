import {
  getListApi,
  specificationApi,
  goodsTypeApi,
  goodsBrandApi,
  goodsInfoApi
} from '../../../services/goodsCenter/bTipGoods.js';

export default {
  namespace:'productInfo',
  state: {
    isHasSize:false,
    pdSpu:{},
  },
  reducers: {
    //重置store
    resetData(state) {
      const pdSpu={}, fileList=[];
      return {...state,pdSpu,}
    },
    getGoodsInfo(state, { payload : { pdSpu,fileList, pdSkus } }) {
      return { ...state, pdSpu, fileList, pdSkus }
    },
    setSpec(state,{ payload: {specOne, specTwo, pdSkus} }) {
      return { ...state, specOne, specTwo, pdSkus}
    }
  },
  effects: {
    *fetchGoodsInfo({ payload: values },{ call, put ,select}) {
      const oldPdSkus = yield select(state => state.addGoods.pdSkus)
      yield put({type:'resetData'})
      const result = yield call(goodsInfoApi,values);
      if(result.code == '0') {
        let { pdSpu, fileDomain } = result;
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
        pdSpu = {...pdSpu,pdSkus};
        yield put({
          type:'getGoodsInfo',
          payload:{
            pdSpu,
          }
        })
      }
    },
  }
}
