import {GetServerData} from '../services/services';
import {message} from 'antd';

export default {
namespace: 'goodtime',
state: {
	values:{},
	limit:15,
	currentPage:0,
	total:0,
	taskTimes:[],
	taskName:'',
	codes:[],
	check1:null,
	check2:null,
	check3:null,
	check4:null,
	check5:null,
	check6:null,
	salestatus:0,
	statusnew:0,
	statushot:0,
	taskTime:[]
},
reducers: {
	synchronous(state, { payload:values}) {
		return {...state,values}
	},
	taskTimeslist(state, { payload:{taskTimes,total,limit,currentPage}}) {
		return {...state,taskTimes,total,limit,currentPage}
	},
	select(state, { payload:{selectedRowKeys,selectedRows}}) {
		return {...state,selectedRowKeys,selectedRows}
	},
	infolist(state, { payload:{taskName,codes,check1,check2,check3,check4,check5,check6,salestatus,statusnew,statushot,taskTime}}) {
		return {...state,taskName,codes,check1,check2,check3,check4,check5,check6,salestatus,statusnew,statushot,taskTime}
	},
	errdetails(state, { payload:{index,values}}) {
		const wsInvSearchs=state.wsInvSearchs.slice(0)
		wsInvSearchs[index].datasuccess=false
		wsInvSearchs[index].optQty=values
		return {...state,wsInvSearchs}
	},
	successdetails(state, { payload:{index,values}}) {
		const wsInvSearchs=state.wsInvSearchs.slice(0)
		wsInvSearchs[index].datasuccess=true
		wsInvSearchs[index].optQty=values
		return {...state,wsInvSearchs}
	},

	wsInvSearchs(state, { payload:wsInvSearchs}) {
		return {...state,wsInvSearchs}
	},

	initState(state, { payload:{}}) {
		const taskName=''
		const codes=[]
		const check1=null
		const check2=null
		const check3=null
		const check4=null
		const check5=null
		const check6=null
		const salestatus=0
		const statusnew=0
		const statushot=0
		const taskTime=[]
		return {...state,taskName,codes,check1,check2,check3,check4,check5,check6,salestatus,statusnew,statushot,taskTime}
	},

},

effects: {
	*fetch({ payload: {code,values} }, { call, put ,select}) {
		const result=yield call(GetServerData,code,values);
		yield put({type: 'tab/loding',payload:false});	
			if(result.code=='0'){
				const taskTimes = result.taskTimes;
				const limit=result.limit;
				const currentPage=result.currentPage;
				const total=result.total;
				// for(var i=0;i<wsAdjustslist.length;i++){
				// 	wsAdjustslist[i].key=wsAdjustslist[i].wsAsnId
				// }
				yield put({type: 'taskTimeslist',payload:{taskTimes,total,limit,currentPage}});
			} 
		}, 
		*infofetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
					const taskTime=result.taskTime.taskTime
					const taskName=result.taskTime.taskName
					const codes=result.codes.join('\r\n')
					const check1=(result.taskTime.salestatus==1)?true:false
					const check2=(result.taskTime.salestatus==0)?true:false
					const check3=(result.taskTime.statusnew==1)?true:false
					const check4=(result.taskTime.statusnew==0)?true:false
					const check5=(result.taskTime.statushot==1)?true:false
					const check6=(result.taskTime.statushot==0)?true:false
					const salestatus=result.taskTime.salestatus
					const statusnew=result.taskTime.statusnew
					const statushot=result.taskTime.statushot
					yield put({type: 'infolist',payload:{taskName,codes,check1,check2,check3,check4,check5,check6,salestatus,statusnew,statushot,taskTime}});	
				} 
			}, 
			*newsearchfetch({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
					const wsInvSearchs=result.wsInvSearchs
					for(var i=0;i<wsInvSearchs.length;i++){
						wsInvSearchs[i].datasuccess=true
						wsInvSearchs[i].key=wsInvSearchs[i].wsInvBinId
					}
					yield put({type: 'wsInvSearchs',payload:wsInvSearchs});
				} 
			}, 
			*delete({ payload: id }, { call, put ,select}) {
					yield put({type: 'tab/initDeletestate',payload:id});
					yield put({type: 'initstate',payload:{}});
				},
	},
	subscriptions: {},
};
