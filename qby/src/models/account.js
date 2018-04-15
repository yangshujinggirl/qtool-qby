import {GetServerData} from '../services/services';

export default {
  	namespace: 'account',
  	state: {
		values:{},
		accountInfo:[],
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
		limit:10,
		currentPage:0,
		total:0,
		urRoleIds:[],
		checkedKeys:[],
		rolesData:[]
	  },
	  
  	reducers: {
		accountList(state, { payload: {accountInfo,total,limit,currentPage}}) {
			return {...state,accountInfo,total,limit,currentPage}
		},
		urUserinfo(state, { payload: {urUser,urRoleIds,checkedKeys,rolesData}}) {
			return {...state,urUser,urRoleIds,checkedKeys,rolesData}
		},
		cleardata(state, { payload: urUser}) {
			return {...state,urUser}
		},
		totalurRoles(state, { payload: totalurRoles}) {
			return {...state,totalurRoles}
		},
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		//选择权限标签时执行的操作
		urRoleIdschange(state, { payload: {id,checked}}) {
			const selectedTags=state.urRoleIds.concat();
			const nextSelectedTags = checked ?
			        [...selectedTags, id] :
					selectedTags.filter(t => t !== id);
			const urRoleIds=nextSelectedTags
			return {...state,urRoleIds}
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
			  };
			  const urRoleIds=[];
			  const checkedKeys=[]; //选中的权限
			  const rolesData=[]   //提交的权限
			return {...state,urUser,urRoleIds,checkedKeys,rolesData}
		},
		//初始化urRoleIds
		initUrRoleIds(state, { payload: value}){
			const urRoleIds = [];
			return {...state,urRoleIds}
		},
		opUrRoleIds(state, { payload: {checkedKeys,rolesData}}){
			console.log(checkedKeys)
			console.log(rolesData)
			return {...state,checkedKeys,rolesData}
		}



  	},
  	effects: {
  		*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});	
            if(result.code=='0'){
				const accountInfo = result.urUsers;
				const limit=result.limit;
				const currentPage=result.currentPage;
				for(var i=0;i<accountInfo.length;i++){
					accountInfo[i].key=accountInfo[i].urUserId;
				}
				const total=result.total;
              	yield put({type:'accountList',payload:{accountInfo,total,limit,currentPage}});
            } 
        }, 
  		*infofetch({ payload: {code,values} }, { call, put }) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const urUser = result.urUser;
				const urRoleIds=result.urUser.urRoleIds;
				urUser.status=String(urUser.status);
				const checkedKeys=urRoleIds
				const rolesData=urRoleIds
	 	 		yield put({type: 'urUserinfo',payload:{urUser,urRoleIds,checkedKeys,rolesData}});
			} 
		},
		*rolelist({ payload: {code,values} }, { call, put }) {
			yield put({type: 'tab/loding',payload:false});
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
