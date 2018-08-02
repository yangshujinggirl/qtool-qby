import { goodsInfoApi } from '../../../services/goodsCenter/baseGoods';

export default {
  namespace:'baseGoodsDetail',
  state: {
    pdSpu:{isSkus:false},
    pdSkus:[],
    fileList:[]
  },
  reducers: {
    getGoodsInfo( state, { payload : {pdSpu, pdSkus, fileList} }) {
      return { ...state, pdSpu, pdSkus, fileList}
    },
    resetData(state) {
      const pdSpu = {isSkus:false},
            pdSkus =[],
            fileList =[];
      return {...state, pdSpu, pdSkus, fileList }
    }
  },
  effects: {
    *fetchGoodsInfo({ payload: values },{ call, put ,select}) {
      const { source } =values;
      const oldPdSkus = yield select(state => state.addGoods.pdSkus)
      yield put({type:'resetData'})//重置初始数据
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(goodsInfoApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code == '0') {
        let { iPdSpu, fileDomain } = result;
        let pdSpu = iPdSpu;
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
        //格式化pdSkus数据,//商品规格，//商品属性
        let pdSkus = [];
        //初始化商品信息，有值是pdSkus，没值填充spu值
        if(pdSpu.pdSkus.length>0) {
          pdSpu.isSkus = true;
          pdSkus = pdSpu.pdSkus.map((el,index) => {
            let name1 = el.pdType1Val&&el.pdType1Val.name;
            let name2 = el.pdType2Val&&el.pdType2Val.name;
            el.name = el.pdType2Val?`${name1}/${name2}`:`${name1}`;
            el.key = el.pdSkuId;
            el.imgUrl = `${fileDomain}${el.picUrl}`;
            return el;
          })

        } else {
          //初始化spu商品pdSpu数据
          pdSpu.isSkus = false;
          let initPdspuData;
          if(source == 0) {
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
          payload:{ pdSpu, fileList, pdSkus }
        })
      }
    },
  }
}
