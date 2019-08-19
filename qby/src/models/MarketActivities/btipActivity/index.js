import { message } from 'antd';
import {
  getListApi
} from '../../../services/marketActivities/ctipActivity.js';

export default {
  namespace:'btipActivity',
  state: {
    dataList:[{
      ke:1,
      name:'wq',
      mktActivityId:'2001'
    },{
      ke:2,
      name:'wqer',
      mktActivityId:'2002'
    }],
    dataPag:{
      currentPage:0,
      limit:1,
      total:2,
    },
  },
  reducers: {
    resetData(state) {
      const dataList=[];
      const dataPag = {
        currentPage:0,
        limit:16,
        total:0,
      };
      return {
        ...state,dataList, dataPag
       }
    },
    getList( state, { payload : {dataList, dataPag} }) {
      return { ...state, dataList, dataPag}
    },
  },
  effects: {
    *fetchList({ payload: values },{ call, put ,select}) {
      const fixedLimit = yield select(state => state.ctipActivity.dataPag.limit);
      //默认分页是16
      if(!values.limit) {
        values = {...values,...{ limit: fixedLimit}}
      }
      yield put({type: 'tab/loding',payload:true});
      const res = yield call(getListApi,values);
      if(res.code == 0) {
        let { list, currentPage, limit, total } = result;
        yield put ({
          type: 'getList',
          payload:{
            dataList:list,
            dataPag:{
              currentPage, limit, total
            }
          }
        })
      }
      yield put({type: 'tab/loding',payload:false});
    },
  }
}
