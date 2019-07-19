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
    getAddkey(state, { payload:addkey }) {
      addkey++;
      return { ...state,addkey };
    },
    getGoodsList(state, { payload: pdSpuList }) {
      pdSpuList = [...pdSpuList];
      let listOne=[], listTwo=[], goods;
      if(pdSpuList.length>0) {
        // pdSpuList.map((el,index) => el.key = index)
        if(pdSpuList.length>=6) {
          listOne = pdSpuList.slice(0,6);
          listTwo = pdSpuList.slice(6);
        } else {
          listOne = pdSpuList;
        }
        goods = { listOne, listTwo };
      } else {
        goods = { listOne, listTwo };
      }
      let addkey = pdSpuList.length;
      // addkey++;
      return { ...state, goods, totalList:pdSpuList };
    },
    getMove(state, { payload: goods }) {
      goods = {...goods};
      const { listOne, listTwo } =goods;
      let totalList = [...listOne, ...listTwo];
      return { ...state, goods, totalList };
    },
    // getGoodsList(state, { payload: goods }) {
    //   goods = {...goods};
    //   const { listOne, listTwo } =goods;
    //   let totalList = [...listOne, ...listTwo];
    //   let addkey = totalList.length;
    //   // addkey++;
    //   return { ...state, goods, totalList };
    // },
  },
  effects: {
    *fetchList({ payload: values },{ call, put ,select}) {
      yield put({ type: 'resetData',payload:{} });
      let { homepageModuleId } =values;
      yield put({type: 'tab/loding',payload:true});
      const res = yield call(getListApi,values);
      if(res.code == 0) {
        let { pdSpuList } =res;
        pdSpuList = pdSpuList?pdSpuList:[];
        pdSpuList.map((el,index) =>{
           el.key = index;
           el.FixedPdSpuId = el.pdSpuId;
        })
        let len = pdSpuList.length;
        yield put({type: 'getAddkey',payload:len});
        yield put({type: 'getGoodsList',payload:pdSpuList});
        // if(pdSpuList.length>0) {
        //   pdSpuList.map((el,index) => el.key = index)
        //   if(pdSpuList.length>=6) {
        //     listOne = pdSpuList.slice(0,6);
        //     listTwo = pdSpuList.slice(6);
        //   }
        //   goods = { listOne, listTwo };
        // } else {
        //   goods={ listOne, listTwo };
        // }
        // let len = pdSpuList.length;
        // yield put({type: 'getAddkey',payload:len});
        // yield put({type: 'getGoodsList',payload:goods});
      }
      yield put({type: 'getHomeModuleId',payload:homepageModuleId});
      yield put({type: 'tab/loding',payload:false});
    },
  }
}
