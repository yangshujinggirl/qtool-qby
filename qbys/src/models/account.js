import {GetServerData} from '../services/services';
import {message} from 'antd';

export default {
  namespace: 'account',
  state: {
  	accountInfo:[]
  },
  reducers: {
  	accountList(state, { payload: accountInfo}) {
        return {...state,accountInfo}
    },
  },
  effects: {
  	*fetch({ payload: {code,values} }, { call, put }) {
            const result=yield call(GetServerData,code,values);
            if(result.code=='0'){
              console.log(result);
              const accountInfo = result.urUsers;
              yield put({   
                    type: 'accountList',
                    payload:accountInfo
                });
            }else{
                 message.error(result.message);
            }   
        }, 
  },
  subscriptions: {},
};
