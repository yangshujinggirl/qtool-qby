import {
  getListApi,
  specificationApi,
  goodsTypeApi,
  goodsBrandApi,
  goodsInfoApi
} from '../../../services/goodsCenter/bTipGoods.js';

export default {
  namespace:'bTipAddGoods',
  state: {
    fileList:[],
    pdSpu:{
      isSkus:false
    },
  },
  reducers: {
    //重置store
    resetData(state) {
      const pdSpu={isSkus:false};
      const fileList=[]
      return {...state,pdSpu,fileList}
    },
    getGoodsInfo(state, { payload : { pdSpu, fileList } }) {
      return { ...state, pdSpu, fileList }
    },
  },
  effects: {
    *fetchGoodsInfo({ payload: values },{ call, put ,select}) {
      yield put({type:'resetData'})
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(goodsInfoApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code == '0') {
        let { pdSpu, fileDomain } = result;
        let pdSkus = [];
        let fileList = [];
        //格式化商品图片数据
        if(pdSpu.spuIdPics && pdSpu.spuIdPics) {
           fileList = pdSpu.spuIdPics.map(el=>(
            {
              url:`${fileDomain}${el.url}`,
              uid:el.pdSpuPicId,
              name: el.url,
              status: 'done',
            }
          ))
        }
        //处理商品信息
        if(pdSpu.pdSkus&&pdSpu.pdSkus.length>0) {
          pdSkus = pdSpu.pdSkus.map((el) => {
            let name1 = el.pdType1Val&&el.pdType1Val.name;
            let name2 = el.pdType2Val&&el.pdType2Val.name;
            el.name = el.pdType2Val?`${name1}/${name2}`:`${name1}`;
            el.key = el.pdSkuId;
            el.imgUrl = `${fileDomain}${el.picUrl}`;
            pdSpu.isSkus = el.pdType1Val?true:false;
            return el;
          })
        } else {
          let initPdspuData = {
                  code:pdSpu.code,
                  barcode:pdSpu.barcode,
                  toBPrice:pdSpu.toBPrice,
                  toCPrice:pdSpu.toCPrice,
                  costPrice:pdSpu.costPrice,
                  tagPrice:pdSpu.tagPrice,
                  key:pdSpu.barcode,
                  qty:pdSpu.qty,
                }
          pdSkus.push(initPdspuData);
        }
        //处理商品描述
        let pdSpuInfo = pdSpu.pdSpuInfo?JSON.parse(pdSpu.pdSpuInfo):[];
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
        pdSpu = {...pdSpu, pdSkus, pdSpuInfo};
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
