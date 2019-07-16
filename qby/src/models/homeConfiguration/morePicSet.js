import { message } from 'antd';
import {
  getListApi
} from '../../services/cConfig/homeConfiguration/morePicSet.js';

export default {
  namespace:'morePicSet',
  state: {
    activiKey:1,
    goodsList:[],
    homepageModuleId:''
  },
  reducers: {
    resetData(state) {
      const goodsList=[];
      const activiKey = 1;
      const homepageModuleId='';
      return {
        ...state,goodsList, activiKey
       }
    },
    getHomeModuleId(state, { payload:homepageModuleId }) {
      return { ...state,homepageModuleId };
    },
    getActiviKey(state, { payload:activiKey }) {
      return { ...state,activiKey };
    },
    getGoodsList(state, { payload:goodsList }) {
      return { ...state,goodsList };
    },
    getCategoryList(state, { payload:categoryList }) {
      return { ...state,categoryList };
    },
  },
  effects: {
    *fetchList({ payload: values },{ call, put ,select}) {
      yield put({ type: 'resetData',payload:{} });
      let { position, homepageModuleId } =values;
      yield put({type: 'tab/loding',payload:true});
      const res = yield call(getListApi,values);
      if(res.code == 0) {
        const { frameListVo } =res;
        let { categoryList, dataList } =frameListVo;
        dataList = dataList?dataList:[];
        dataList.map((el,index) =>el.key = index);
        yield put({type: 'getGoodsList',payload:dataList});
        yield put({type: 'getCategoryList',payload:categoryList});
      }
      yield put({type: 'getActiviKey',payload:position});
      yield put({type: 'getHomeModuleId',payload:homepageModuleId});
      yield put({type: 'tab/loding',payload:false});
    },
  }
}
