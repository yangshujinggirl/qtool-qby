import {GetServerData} from '../services/services';
import {message} from 'antd';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'dataposManage',
    state: {
        initKey:1,
        detailInfo:{},
        headerInfo:{},
        detailId:null
    },
    reducers: {
        initKey(state, { payload: initKey}) {
            return {...state,initKey}
        },
        syncDetailInfo(state, { payload: detailInfo}) {
            return {...state,detailInfo}
        },
        syncHeaderInfo(state, { payload: headerInfo}) {
            return {...state,headerInfo}
        },
        getDetailId(state, { payload: detailId}) {
            return {...state,detailId}
        },
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put }) {
            const result=yield call(GetServerData,code,values);
            if(result.code=='0'){
                yield put({type:'syncDetailInfo',payload:result});
            }
        }
    },
    subscriptions: {
       
    },
};