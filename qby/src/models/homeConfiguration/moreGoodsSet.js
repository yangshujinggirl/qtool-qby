import { message } from 'antd';
import {
  getListApi
} from '../../services/cConfig/homeConfiguration/moreGoodsSet.js';

export default {
  namespace:'moreGoodsSet',
  state: {
    goods:{
      listOne:[],
      listTwo:[],
    },
    totalList:[],
    homepageModuleId:''
  },
  reducers: {
    resetData(state) {
      const goods={
        listOne:[],
        listTwo:[],
      }
      const homepageModuleId='';
      return {
        ...state,goods,homepageModuleId
       }
    },
    getHomeModuleId(state, { payload:homepageModuleId }) {
      return { ...state,homepageModuleId };
    },
    getGoodsList(state, { payload:goods }) {
      return { ...state,goods };
    },
  },
  effects: {
    *fetchList({ payload: values },{ call, put ,select}) {
      yield put({ type: 'resetData',payload:{} });
      let { position, homepageModuleId } =values;
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(getListApi,values);
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
      yield put({type: 'getHomeModuleId',payload:homepageModuleId});
      yield put({type: 'getGoodsList',payload:goodsList2});
      yield put({type: 'tab/loding',payload:false});
    },
  }
}
