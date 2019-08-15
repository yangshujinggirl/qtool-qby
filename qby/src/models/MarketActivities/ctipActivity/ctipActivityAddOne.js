import { message } from 'antd';
import {
  getListApi
} from '../../../services/cConfig/homeConfiguration/bannerSet.js';

export default {
  namespace:'ctipActivityAddOne',
  state: {
    activityInfo:{},
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
      let ratioList=[];
      activityInfo.bearer&&activityInfo.bearer.map((el,index) => {
        if(el!='C') {
          let item={}
          item.bearer = el;
          item.key = index;
          ratioList.push(item)
        }
      })
      return { ...state,activityInfo, ratioList };
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
