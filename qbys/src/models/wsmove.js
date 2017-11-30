import {GetServerData} from '../services/services';
export default {
	namespace: 'wsmove',
	state: {
		values:{},
		limit:10,
		currentPage:0,
		total:0,
		wsMoves:[],
		selectedRowKeys:[],
		selectedRows:[],
		cardtitle:'',
		cardlist:[],
		detailstitle:'',
		details:[],
		logstitle:'',
		logs:[],
		wsInvSearchs:[]
	},
	reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		wsMoves(state, { payload:{wsMoves,total,limit,currentPage}}) {
			return {...state,wsMoves,total,limit,currentPage}
		},
		infolist(state, { payload:{cardtitle,cardlist,logstitle,logs,detailstitle,details}}) {
			return {...state,cardtitle,cardlist,logstitle,logs,detailstitle,details}
		},
		select(state, { payload:{selectedRowKeys,selectedRows}}) {
			return {...state,selectedRowKeys,selectedRows}
		},
		wsInvSearchs(state, { payload:wsInvSearchs}) {
			return {...state,wsInvSearchs}
		},
		//wsInvSearchs
		successdetails(state, { payload:{index,values}}) {
			const wsInvSearchs=state.wsInvSearchs.slice(0)
			wsInvSearchs[index].datasuccess=true
			wsInvSearchs[index].optQty=values
			return {...state,wsInvSearchs}
		},
		errdetails(state, { payload:{index,values}}) {
			const wsInvSearchs=state.wsInvSearchs.slice(0)
			console.log(wsInvSearchs)
			wsInvSearchs[index].datasuccess=false
			wsInvSearchs[index].optQty=values
			return {...state,wsInvSearchs}
		},
		toBinCode(state, { payload:{index,values}}) {
			const wsInvSearchs=state.wsInvSearchs.slice(0)
			console.log(wsInvSearchs)
			wsInvSearchs[index].toBinCode=values
			return {...state,wsInvSearchs}
		},

		//details
		successinfodetails(state, { payload:{index,values}}) {
			const details=state.details.slice(0)
			details[index].datasuccess=true
			details[index].optQty=values
			return {...state,details}
		},
		errinfodetails(state, { payload:{index,values}}) {
			const details=state.details.slice(0)
			console.log(details)
			details[index].datasuccess=false
			details[index].optQty=values
			return {...state,details}
		},
		detailstoBinCode(state, { payload:{index,values}}) {
			const details=state.details.slice(0)
			console.log(details)
			details[index].toBinCode=values
			return {...state,details}
		},



		
	},
	effects: {
		*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			if(result.code=='0'){
				const wsMoves = result.wsMoves;
				const limit=result.limit
				const currentPage=result.currentPage
				const total=result.total
				for(var i=0;i<wsMoves.length;i++){
					wsMoves[i].key=wsMoves[i].wsMoveId
				}
				yield put({type: 'wsMoves',payload:{wsMoves,total,limit,currentPage}});
				yield put({type: 'tab/loding',payload:false});	
			} 
		}, 
		*infofetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			if(result.code=='0'){
				console.log(result)
				const wsMove=result.wsMove
				//card信息
				const cardtitle='移货单信息'
				const cardlist=[
					{lable:'移库单号',text:wsMove.moveNo},
					{lable:'创建人',text:wsMove.createUserName},
					{lable:'创建时间',text:wsMove.updateTime},
					{lable:'移库单状态',text:wsMove.statusStr}
				]

				//配货商品
				const detailstitle='配货商品'
				const details=wsMove.wsMoveDetails
				for(var i=0;i<details.length;i++){
					details[i].key=i
					details[i].datasuccess=true
					details[i].binCode=details[i].toBinCode
				}
				//日志
				const logstitle='移库日志'
				const logs=wsMove.logs
				for(var i=0;i<logs.length;i++){
					logs[i].key=i
				}
				yield put({type: 'infolist',payload:{cardtitle,cardlist,logstitle,logs,detailstitle,details}});
				yield put({type: 'tab/loding',payload:false});	
			} 
		},
		*newsearch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			if(result.code=='0'){
				const wsInvSearchs=result.wsInvSearchs
				for(var i=0;i<wsInvSearchs.length;i++){
					wsInvSearchs[i].key=i
					wsInvSearchs[i].optQty=null
					wsInvSearchs[i].toBinCode=null
					wsInvSearchs[i].datasuccess=true
				}	
				yield put({type: 'wsInvSearchs',payload:wsInvSearchs});
				yield put({type: 'tab/loding',payload:false});	
			} 
		},
		*save({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			if(result.code=='0'){

		
			} 
			yield put({type: 'tab/loding',payload:false});

		},
		




	},
	subscriptions: {},
};
