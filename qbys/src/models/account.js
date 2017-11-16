import {GetServerData} from '../services/services';
import {message} from 'antd';

export default {
  	namespace: 'account',
  	state: {
	  	accountInfo:[],
	  	urUser:{
			username:null,
			name:null,
			job:null,
			email:null,
			mobile:null,
			status:''
	  	}
  	},
  	reducers: {
		accountList(state, { payload: accountInfo}) {
			return {...state,accountInfo}
		},
		urUserinfo(state, { payload: urUser}) {
			return {...state,urUser}
		},
		cleardata(state, { payload: urUser}) {
			return {...state,urUser}
		}
  	},
  	effects: {
  		*fetch({ payload: {code,values} }, { call, put }) {
            const result=yield call(GetServerData,code,values);
            if(result.code=='0'){
              	const accountInfo = result.urUsers;
              	yield put({type: 'accountList',payload:accountInfo});
				yield put({type: 'tab/loding',payload:false});	
            } 
        }, 
  		*infofetch({ payload: {code,values} }, { call, put }) {
			const result=yield call(GetServerData,code,values);
			if(result.code=='0'){
	  			const urUser = result.urUser;
	 	 		yield put({type: 'urUserinfo',payload:urUser});
				yield put({type: 'tab/loding',payload:false});
			} 
		}
  	},
  	subscriptions: {}
};
