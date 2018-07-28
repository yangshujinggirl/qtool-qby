import {
  goodsInfoApi
} from '../../../services/goodsCenter/cTipGoods.js';

export default {
  namespace:'cTipAddGoods',
  state: {
    pdSpu:{
      isHasSize:false,
    },
  },
  reducers: {
    //重置store
    resetData(state) {
      const pdSpu={ isSkus: false };
      return {...state,pdSpu }
    },
    getGoodsInfo(state, { payload : { pdSpu } }) {
      return { ...state, pdSpu }
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
        //处理商品信息
        if(iPdSpu.pdSkus.length>0) {
          pdSkus = iPdSpu.pdSkus.map((el) => {
            let name1 = el.pdType1Val&&el.pdType1Val.name;
            let name2 = el.pdType2Val&&el.pdType2Val.name;
            el.name = el.pdType2Val?`${name1}/${name2}`:`${name1}`;
            el.key = el.pdSkuId;
            el.picUrl = `${fileDomain}${el.picUrl}`;
            iPdSpu.isSkus = el.pdType1Val?true:false;
            return el
          })
        } else {
          pdSkus = oldPdSkus;
        }
        //处理商品描述
        let pdSpuInfo = iPdSpu.pdSpuInfo?JSON.parse(iPdSpu.pdSpuInfo):[];
        if(pdSpuInfo.length>0) {
          pdSpuInfo = pdSpuInfo.map((el,index) => {
            if(el.type == '2') {
              el.content = {
                uid:index,
                name:el.content,
                url: `${fileDomain}${el.content}`,
                status:'done',
              }
            }
            el.key = index
            return el;
          })
        }
        let pdSpu = {...iPdSpu, pdSkus, pdSpuInfo};
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
