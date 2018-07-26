import {
  goodsInfoApi
} from '../../../services/goodsCenter/cTipGoods.js';

export default {
  namespace:'cTipAddGoods',
  state: {
    isHasSize:false,
    pdSpu:{},
  },
  reducers: {
    //重置store
    resetData(state) {
      const pdSpu={};
      return {...state,pdSpu }
    },
    getGoodsInfo(state, { payload : { pdSpu,fileList } }) {
      return { ...state, pdSpu, fileList }
    },
  },
  effects: {
    *fetchGoodsInfo({ payload: values },{ call, put ,select}) {
      const oldPdSkus = yield select(state => state.addGoods.pdSkus)
      yield put({type:'resetData'})
      const result = yield call(goodsInfoApi,values);
      if(result.code == '0') {
        let { iPdSpu, fileDomain } = result;
        let pdSkus = [];
        if(iPdSpu.pdSkus.length>0) {
          pdSkus = iPdSpu.pdSkus.map((el) => {
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
        let pdSpu = {...iPdSpu,pdSkus};
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
