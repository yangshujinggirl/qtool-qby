import {
  goodsInfoApi
} from '../../../services/online/productInfo.js';

export default {
  namespace:'productEditGoods',
  state: {
    fileList:[],
    iPdSpu:{
      isSkus:false
    },
  },
  reducers: {
    //重置store
    resetData(state) {
      const iPdSpu={isSkus:false}, fileList=[];
      return {...state,iPdSpu,}
    },
    getGoodsInfo(state, { payload : { iPdSpu, fileList } }) {
      return { ...state, iPdSpu, fileList }
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
        let fileList = [];
        if(iPdSpu.platform){
          const platform = iPdSpu.platform.split(',');
          for(var i=0;i<platform.length;i++){
            platform[i]=Number( platform[i] );
          };
          iPdSpu.platform = platform;
        };
        console.log(iPdSpu)
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
        if(iPdSpu.pdSkus.length>0) {
          pdSkus = iPdSpu.pdSkus.map((el) => {
            let name1 = el.pdType1Val&&el.pdType1Val.name;
            let name2 = el.pdType2Val&&el.pdType2Val.name;
            el.name = el.pdType2Val?`${name1}/${name2}`:`${name1}`;
            el.key = el.pdSkuId;
            el.imgUrl = `${fileDomain}${el.picUrl}`;
            iPdSpu.isSkus = el.pdType1Val?true:false;
            return el
          })
        } else {
          let initPdspuData = {
                  code:iPdSpu.code,
                  barcode:iPdSpu.barcode,
                  salePrice:iPdSpu.salePrice,
                  purchasePrice:iPdSpu.purchasePrice,
                  receivePrice:iPdSpu.receivePrice,
                  deliveryPrice:iPdSpu.deliveryPrice,
                  key:iPdSpu.barcode
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
        iPdSpu = {...iPdSpu, pdSkus, pdSpuInfo};
        yield put({
          type:'getGoodsInfo',
          payload:{
            iPdSpu,fileList
          }
        })
      }
    },
  }
}
