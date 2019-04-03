import {
  goodsInfoApi
} from '../../../services/goodsCenter/cTipGoods.js';

export default {
  namespace:'cTipAddGoods',
  state: {
    fileList:[],
    pdSpu:{
      isSkus:false,//是不是skus商品
    },
  },
  reducers: {
    //重置store
    resetData(state) {
      const pdSpu={ isSkus: false };
      const fileList=[];
      return {...state, pdSpu, fileList }
    },
    getGoodsInfo(state, { payload : { pdSpu, fileList } }) {
      return { ...state, pdSpu, fileList }
    },
    changeSilver(state, { payload : { record, status}}) {
      let pdSpu = state.pdSpu;
      pdSpu.pdSkus.map((el,index) => {
        if(record.key == el.key) {
          el.silverDisabled = status;
        }
      })
      return { ...state, pdSpu }
    },
  },
  effects: {
    *fetchGoodsInfo({ payload: values },{ call, put ,select}) {
      const oldPdSkus = yield select(state => state.addGoods.pdSkus)
      yield put({type:'resetData'})
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(goodsInfoApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code == '0') {
        let { iPdSpu, fileDomain } = result;
        let pdSkus = [];
        let fileList = [];
        if(iPdSpu.plateform){
          const plateform = iPdSpu.plateform.split('-');
          plateform.map(item=>Number(item));
          iPdSpu.plateform = plateform;
        };
        //格式化商品图片数据
        if(iPdSpu.spuIdPics && iPdSpu.spuIdPics) {
           fileList = iPdSpu.spuIdPics.map(el=>(
            {
              url:`${fileDomain}${el.url}`,
              uid:el.pdSpuPicId,
              name: el.url,
              status: 'done',
            }
          ))
        }
        //处理商品信息
        if(iPdSpu.skuStatus ==1) {
          pdSkus = iPdSpu.pdSkus.map((el, index) => {
            let name1 = el.pdType1Val&&el.pdType1Val.name;
            let name2 = el.pdType2Val&&el.pdType2Val.name;
            el.name = el.pdType2Val?`${name1}/${name2}`:`${name1}`;
            el.key = el.pdSkuId;
            el.imgUrl = `${fileDomain}${el.picUrl}`;
            el.silverDisabled = el.goldCardPrice?false:true;
            el.index = index;
            iPdSpu.isSkus = iPdSpu.skuStatus?true:false;
            return el
          })
        } else {
          let initPdspuData = {
                  code:iPdSpu.code,
                  barcode:iPdSpu.barcode,
                  toBPrice:iPdSpu.toBPrice,
                  toCPrice:iPdSpu.toCPrice,
                  costPrice:iPdSpu.costPrice,
                  tagPrice:iPdSpu.tagPrice,
                  key:iPdSpu.barcode,
                  silverCardPrice:iPdSpu.silverCardPrice,
                  goldCardPrice:iPdSpu.goldCardPrice,
                  silverDisabled:iPdSpu.goldCardPrice?false:true
                }
          pdSkus.push(initPdspuData);
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
            pdSpu,fileList
          }
        })
      }
    },
  }
}
