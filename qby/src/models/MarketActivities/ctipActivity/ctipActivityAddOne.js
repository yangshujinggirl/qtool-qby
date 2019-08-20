import { message } from 'antd';
import {
  getListApi
} from '../../../services/cConfig/homeConfiguration/bannerSet.js';
const bearMap={
  'A':'Qtools',
  'B':'门店',
  'C':'供应商',
}
export default {
  namespace:'ctipActivityAddOne',
  state: {
    activityInfo:{
      promotionScope:1,
      isWarmUp:0
    },
    ratioList:[],
  },
  reducers: {
    resetData(state) {
      const activityInfo={};
      return {
        ...state,activityInfo
       }
    },
    getActivityInfo(state, { payload:activityInfo }) {
      return { ...state,activityInfo };
    },
    getRatioList(state, { payload:ratioList }) {
      ratioList = [...ratioList];
      return { ...state,ratioList };
    },
  },
  effects: {
    *fetchInfo({ payload: values },{ call, put ,select}) {
      yield put({ type: 'resetData',payload:{} });
      let { position, homepageModuleId } =values;
      yield put({type: 'tab/loding',payload:true});
      const res = yield call(getListApi,values);
      if(res.code == 0) {
        yield put({type: 'getActivityInfo',payload:{}});
      }
      yield put({type: 'tab/loding',payload:false});
    },
  }
}
