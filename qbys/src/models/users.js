import {GetServerData} from '../services/services';
import { routerRedux } from 'dva/router';
export default {
  	namespace: 'users',
  	state: {},
  	reducers: {},
  	effects: {
  		*layout({ payload: {code,values} }, { call, put }) {
            const result=yield call(GetServerData,code,values);
            if(result.code=='0'){
            	yield put(routerRedux.push('/'));
            } 
        }
  	},
  	subscriptions: {},
}
