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
		wsWarehouseId:'-1'
		  
	  },
	  
  	reducers: {
		accountList(state, { payload: {accountInfo,total,limit,currentPage}}) {
			return {...state,accountInfo,total,limit,currentPage}
		},
		urUserinfo(state, { payload: {urUser,urRoleIds,wsWarehouseId}}) {
			return {...state,urUser,urRoleIds,wsWarehouseId}
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
			  const wsWarehouseId='-1';
			return {...state,urUser,urRoleIds,wsWarehouseId}
		},
		//初始化urRoleIds
		initUrRoleIds(state, { payload: value}){
			const urRoleIds = [];
			return {...state,urRoleIds}
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
					accountInfo[i].key=accountInfo[i].wsUrUserId;
				}
				const total=result.total;
              	yield put({type: 'accountList',payload:{accountInfo,total,limit,currentPage}});
            } 
        }, 
  		*infofetch({ payload: {code,values} }, { call, put }) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const urUser = result.urUser;
				const urRoleIds=result.urUser.urRoleIds;
				const wsWarehouseId=result.urUser.wsWarehouseId;
				// yield put({
				// 	type:'rolelist',
				// 	payload:{code:'qerp.web.role.list',values:null}
				// });
				urUser.status=String(urUser.status);
	 	 		yield put({type: 'urUserinfo',payload:{urUser,urRoleIds,wsWarehouseId}});
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
