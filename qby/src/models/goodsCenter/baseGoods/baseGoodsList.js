import { getListApi } from '../../../services/goodsCenter/baseGoods.js';

const dataSource = [
  {
    name:'商品名称0',
    spuId:'25896',
    mainPicUrl:'图片地址',
    skuStatus:'多',
    infoStatus:'缺',
    isPresell:'预',
    isDirectExpress:'直',
    isHot:'畅',
    isNew:'新',
  },
  {
    name:'商品名称1',
    spuId:'25897',
    mainPicUrl:'图片地址',
    skuStatus:'多',
    infoStatus:'缺',
    isPresell:'预',
    isDirectExpress:'直',
    isHot:'畅',
    isNew:'新',
  },
  {
    name:'商品名称2',
    spuId:'25898',
    mainPicUrl:'图片地址',
    skuStatus:'多',
    infoStatus:'缺',
    isPresell:'预',
    isDirectExpress:'直',
    isHot:'畅',
    isNew:'新',
  },
  {
    name:'商品名称3',
    spuId:'25899',
    mainPicUrl:'图片地址',
    skuStatus:'多',
    infoStatus:'缺',
    isPresell:'预',
    isDirectExpress:'直',
    isHot:'畅',
    isNew:'新',
  },
]

export default {
  namespace:'baseGoodsList',
  state: {
    dataList:[],
    currentPage:0,
    limit:15,
    total:0
  },
  reducers: {
    getList( state, { payload : {dataList, currentPage, limit, total} }) {
      return { ...state, dataList, currentPage, limit, total}
    }
  },
  effects: {
    *fetchList({ payload: values }, { call, put ,select}) {
      const result=yield call(getListApi,values);
      if(result.code=='0') {
        const { pdSpus, currentPage, limit, total } = result;
        yield put ({
          type: 'getList',
          payload:{
            dataList:pdSpus,
            currentPage,
            limit,
            total
          }
        })
      }
    }
  }
}
