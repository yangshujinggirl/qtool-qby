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
    addkey:0,
    homepageModuleId:''
  },
  reducers: {
    resetData(state) {
      const goods={
        listOne:[],
        listTwo:[],
      };
      const addkey=0;
      const homepageModuleId='';
      return {
        ...state,goods,homepageModuleId,addkey
       }
    },
    getHomeModuleId(state, { payload:homepageModuleId }) {
      return { ...state,homepageModuleId };
    },
    getGoodsList(state, { payload: goods }) {
      goods = {...goods};
      const { listOne, listTwo } =goods;
      let totalList = [...listOne, ...listTwo];
      let addkey = totalList.length;
      addkey++;
      return { ...state, goods, totalList, addkey };
    },
  },
  effects: {
    *fetchList({ payload: values },{ call, put ,select}) {
      yield put({ type: 'resetData',payload:{} });
      let { homepageModuleId } =values;
      yield put({type: 'tab/loding',payload:true});
      const res = yield call(getListApi,values);
      if(res.code == 0) {
        const { pdSpuList } =res;
        let goods={};
        if(pdSpuList.length>0) {

        } else {
          goods={
            listOne:[],
            listTwo:[],
          };
        }
        yield put({type: 'getGoodsList',payload:goods});
      }
      yield put({type: 'getHomeModuleId',payload:homepageModuleId});
      yield put({type: 'tab/loding',payload:false});
    },
  }
}
