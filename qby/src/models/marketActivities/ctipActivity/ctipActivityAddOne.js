import { message } from 'antd';
import {
  getBaseInfoApi
} from '../../../services/marketActivities/ctipActivity.js';
const bearMap={
  'A':'Qtools',
  'B':'门店',
  'C':'供应商',
}
export default {
  namespace:'ctipActivityAddOne',
  state: {
    activityInfo:{
      // isWarmUp:0,
    },
    ratioList:[],
    tagsList:[]
  },
  reducers: {
    resetData(state) {
      const activityInfo={
        // isWarmUp:0
      };
      const ratioList=[],tagsList=[];
      return {
        ...state,activityInfo,ratioList,tagsList
       }
    },
    getActivityInfo(state, { payload:activityInfo }) {
      return { ...state,activityInfo };
    },
    getRatioList(state, { payload:ratioList }) {
      let budgetItem = ratioList.find((el)=>el.budget);
      budgetItem = budgetItem?budgetItem:{};
      ratioList.map((el) =>el.budget = budgetItem.budget)
      ratioList=[...ratioList]
      let tagsList = ratioList.filter(el => el.bearerType=='C');
      return { ...state,ratioList, tagsList };
    },
  },
  effects: {
    *fetchInfo({ payload: values },{ call, put ,select}) {
      let { position, homepageModuleId } =values;
      yield put({type: 'tab/loding',payload:true});
      const res = yield call(getBaseInfoApi,values);
      if(res.code == 0) {
        let { data } =res;
        let ratioList = data.costApportions;
        if(ratioList) {
          ratioList = ratioList.map((el) =>{
            el.key = el.costApportionId;
            if(el.bearer!="A"&&el.bearer!="B") {
              el.bearerType = "C"
            } else {
              el.bearerType = el.bearer;
            }
            return el;
          });
        }
        data.time=[data.beginTime,data.endTime];
        if(data.budget) {
          ratioList.map((el) =>el.budget = data.budget)
        }
        yield put({type: 'getActivityInfo',payload:data});
        yield put({type: 'getRatioList',payload:ratioList});
      }
      yield put({type: 'tab/loding',payload:false});
    },
  }
}
