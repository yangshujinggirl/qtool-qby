import { message } from 'antd';
import {
  getCategoryApi
} from '../../services/cConfig/homeConfiguration/bannerSet.js';

export default {
  namespace:'bannerSet',
  state: {
    activiKey:0,
    goodsList:[],
  },
  reducers: {
    //重置store
    resetData(state) {
      const goodsList=[];
      const activiKey = 0;
      return {
        ...state,goodsList, activiKey
       }
    },
    getActiviKey(state, { payload:activiKey }) {
      return { ...state,activiKey };
    },
    getGoodsList(state, { payload:goodsList }) {
      return { ...state,goodsList };
    },
  },
  effects: {
    *fetchList({ payload: values },{ call, put ,select}) {
      let { position } =values;
      yield put({type: 'tab/loding',payload:true});
      // const result = yield call(getCategoryApi,values);
      let goodsList1=[
        {
        key:0,
        picUrl:'',
        platform:1,
        title:'MORPHY RICHARDS摩飞 便携榨汁杯',
        linkInfoType:1,
        linkInfo:'',
        beginTime:''
      },{
        key:1,
        picUrl:'',
        platform:1,
        title:'MORPHY RICHARDS摩飞',
        linkInfoType:2,
        linkInfo:'',
        beginTime:''
      },{
        key:2,
        picUrl:'',
        platform:1,
        title:'MORPHY RICHARDS摩飞哥',
        linkInfoType:null,
        linkInfo:'',
        beginTime:''
      }]
      let goodsList2=[
        {
        key:0,
        picUrl:'',
        platform:2,
        title:'MORPHY RICHARDS摩飞 便携榨汁杯',
        linkInfoType:1,
        linkInfo:'',
        beginTime:'',
      },{
        key:1,
        picUrl:'',
        platform:1,
        title:'MORPHY RICHARDS摩飞',
        linkInfoType:2,
        linkInfo:'',
        beginTime:''
      }]
      yield put({type: 'getActiviKey',payload:position});
      yield put({type: 'getGoodsList',payload:goodsList2});
      yield put({type: 'tab/loding',payload:false});
    },
    *fetchFrame({ payload: values },{ call, put ,select}) {
      let { position } =values;
      yield put({type: 'tab/loding',payload:true});
      // const result = yield call(getCategoryApi,values);
      yield put({type: 'getActiviKey',payload:position});
      yield put({type: 'getGoodsList',payload:[goodsList1]});
      yield put({type: 'tab/loding',payload:false});
    },
  }
}
