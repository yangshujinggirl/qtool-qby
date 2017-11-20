import {GetServerData} from '../services/services';
import {message} from 'antd';

export default {
  	namespace: 'account',
  	state: {
		accountInfo:[],
		limit:10,
		currentPage:0,
	  	urUser:{
			username:null,
			name:null,
			job:null,
			email:null,
			mobile:null,
			status:[],
			urRoleIds:[]
		  },
		totalurRoles:[],
		total:0
		  
  	},
  	reducers: {
		accountList(state, { payload: {accountInfo,total,limit,currentPage}}) {
			return {...state,accountInfo,total,limit,currentPage}
		},
		urUserinfo(state, { payload: urUser}) {
			return {...state,urUser}
		},
		cleardata(state, { payload: urUser}) {
			return {...state,urUser}
		},
		totalurRoles(state, { payload: totalurRoles}) {
			return {...state,totalurRoles}
		},
		//选择权限标签时执行的操作
		urRoleIdschange(state, { payload: {id,checked}}) {
			const selectedTags=state.urUser.urRoleIds.concat();
			const nextSelectedTags = checked ?
			        [...selectedTags, id] :
					selectedTags.filter(t => t !== id);
			const urUser=JSON.parse(JSON.stringify(state.urUser));
			urUser.urRoleIds=nextSelectedTags;
			return {...state,urUser}
		},
		initState(state, { payload: value}) {
			const urUser={
				username:null,
				name:null,
				job:null,
				email:null,
				mobile:null,
				status:[],
				urRoleIds:[]
			  }
			return {...state,urUser}
		}


  	},
  	effects: {
  		*fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            if(result.code=='0'){
				const accountInfo = result.urUsers;
				const limit=values.limit;
				const currentPage=values.currentPage;
				for(var i=0;i<accountInfo.length;i++){
					accountInfo[i].key=accountInfo[i].urUserId;
				}
				const total=result.total;
              	yield put({type: 'accountList',payload:{accountInfo,total,limit,currentPage}});
				yield put({type: 'tab/loding',payload:false});	
            } 
        }, 
  		*infofetch({ payload: {code,values} }, { call, put }) {
			const result=yield call(GetServerData,code,values);
			if(result.code=='0'){
				  const urUser = result.urUser;
				  urUser.status=String(urUser.status);
	 	 		yield put({type: 'urUserinfo',payload:urUser});
				yield put({type: 'tab/loding',payload:false});
			} 
		},
		*rolelist({ payload: {code,values} }, { call, put }) {
			const result=yield call(GetServerData,code,values);
			if(result.code=='0'){
	  			 const totalurRoles = result.urRoles;
	 	 		 yield put({type: 'totalurRoles',payload:totalurRoles});
			} 
		}



		



  	},
  	subscriptions: {
		


	  }
};
