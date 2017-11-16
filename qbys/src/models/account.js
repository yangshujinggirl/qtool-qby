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
		  },
		total:0
		  
  	},
  	reducers: {
		accountList(state, { payload: {accountInfo,total}}) {
			return {...state,accountInfo,total}
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
				  const total=result.total
              	yield put({type: 'accountList',payload:{accountInfo,total}});
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
