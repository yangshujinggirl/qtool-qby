import {
  goodsInfoApi
} from '../../../services/online/productInfo.js';

export default {
  namespace:'productEditGoods',
  state: {
    isHasSize:false,
    iPdSpu:{},
  },
  reducers: {
    //重置store
    resetData(state) {
      const iPdSpu={}, fileList=[];
      return {...state,iPdSpu,}
    },
    getGoodsInfo(state, { payload : { iPdSpu,fileList, pdSkus } }) {
      return { ...state, iPdSpu, fileList, pdSkus }
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
        let { iPdSpu, fileDomain } = result;
        let pdSkus = [];
        let pdSpuInfo=[];
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
        if(iPdSpu.pdSpuInfo&&iPdSpu.pdSpuInfo!=null) {
          pdSpuInfo = JSON.parse(iPdSpu.pdSpuInfo);
          pdSpuInfo = pdSpuInfo.map((el,index) => {
            if(el.type=='2') {
              // el.content = `${fileDomain}${el.content}`;
              let url = `${fileDomain}${el.content}`;
              el.name = url;
              el.status = 'done';
              el.uid = index;
              el.url = url;
            }
              el.key =index;
            return el;
          })
        }
        iPdSpu = {...iPdSpu,pdSkus,pdSpuInfo};
        yield put({
          type:'getGoodsInfo',
          payload:{
            iPdSpu,
          }
        })
      }
    },
  }
}
