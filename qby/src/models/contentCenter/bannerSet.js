import { message } from 'antd';
import {
  getCategoryApi
} from '../../services/contentCenter/commodityFlow.js';

export default {
  namespace:'bannerSet',
  state: {
    goodsList:[{
      key:1,
      SpuId:'55',
      name:'MORPHY RICHARDS摩飞 便携榨汁杯',
      displayName:'奶粉辅食',
      price:'¥4.00-9.00',
      qty:'B端在售库存',
      shop:'200',
      position:1,
    },{
      key:2,
      SpuId:'52',
      name:'MORPHY便携榨汁杯',
      displayName:'奶粉辅食',
      price:'¥4.00-9.00',
      qty:'B端在售库存',
      shop:'200',
      position:1,
    }]
  },
  reducers: {
    //重置store
    resetData(state, { payload : source }) {
      return {
        ...state,
       }
    },
    getGoodsList(state, { payload:goodsList }) {
      goodsList.map((el,index) => {
        index++;
        el.key= index
      });
      return { ...state,...goodsList };
    },
  },
  effects: {
    *fetchList({ payload: values },{ call, put ,select}) {
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(getCategoryApi,values);
      yield put({type: 'tab/loding',payload:false});
    },
  }
}
