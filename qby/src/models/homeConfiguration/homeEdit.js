import {
  getInfoApi,getSearchGoodsApi
} from '../../services/cConfig/homeConfiguration/homeEdit.js';
import { message } from 'antd';

export default {
  namespace:'homeEdit',
  state: {
    info:{
      banner:{},
      brandDisplay:{isDisplay:1},
      coupon:{isDisplay:1},
      flowProduct:{},
      icon:{isDisplay:1},
      multilineProduct:{},
      picMix:{},
      productDisplay:{isDisplay:1},
      search:{},
      themeActivity:{},
      homepageInfoVo:{}
    },//商品列表
    flowProductList:[],
    checkResult:[],
  },
  reducers: {
    getflowProductList( state, { payload : flowProductList }) {
      return { ...state, flowProductList }
    },
    getInfo( state, { payload : info }) {
      return { ...state, info }
    },
    getCheckResult( state, { payload : checkResult }) {
      // checkResult=[...checkResult]
      return { ...state, checkResult }
    },
    reSetData(state) {
      let info={
        banner:{},
        brandDisplay:{isDisplay:1},
        coupon:{isDisplay:1},
        flowProduct:{},
        icon:{isDisplay:1},
        multilineProduct:{},
        picMix:{},
        productDisplay:{isDisplay:1},
        search:{},
        themeActivity:{},
        homepageInfoVo:{}
      }
      const checkResult = [];
      const flowProductList = [];
      return { ...state, info, checkResult, flowProductList }
    }
  },
  effects: {
    *fetchInfo({ payload: values }, { call, put ,select}) {
      yield put({type: 'tab/loding',payload:true});
      const res=yield call(getInfoApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(res.code=='0') {
        let { homeContent } = res;
        let { flowProduct } =homeContent;
        if(flowProduct&&flowProduct.moduleContent&&flowProduct.moduleContent.length>0) {
          yield put({
            type:'fetchGoodsInfo',
            payload:{
              pdFlowTabId: flowProduct.moduleContent[0].pdFlowTabId
            }
          })
        }
        yield put ({
          type: 'getInfo',
          payload:homeContent
        })
      }
    },
    *fetchGoodsInfo({ payload: values }, { call, put ,select}) {
      yield put({type: 'tab/loding',payload:true});
      const res=yield call(getSearchGoodsApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(res.code=='0') {
        let { flowProductList } =res;
        flowProductList&&flowProductList.map((el,index) => el.key =index);
        yield put ({
          type: 'getflowProductList',
          payload:flowProductList
        })
      } else {
        message.error(res.message)
      }
    },
  }
}
