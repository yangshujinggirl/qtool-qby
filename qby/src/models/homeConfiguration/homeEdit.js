import {
  getInfoApi,
} from '../../services/cConfig/homeConfiguration/homeEdit.js';


export default {
  namespace:'homeEdit',
  state: {
    info:{
      banner:{},
      brandDisplay:{},
      coupon:{},
      flowProduct:{},
      icon:{},
      multilineProduct:{},
      picMix:{},
      productDisplay:{},
      search:{},
      themActivity:{}
    },//商品列表
  },
  reducers: {
    getInfo( state, { payload : info }) {
      return { ...state, info }
    },
    reSetData(state) {
      const info= {};
      return { ...state, info }
    }
  },
  effects: {
    *fetchInfo({ payload: values }, { call, put ,select}) {
      yield put({type: 'tab/loding',payload:true});
      const res=yield call(getInfoApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(res.code=='0') {
        let { homeContent } = res;
        yield put ({
          type: 'getInfo',
          payload:homeContent
        })
      }
    },
  }
}
