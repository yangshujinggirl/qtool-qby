import {GetServerData} from '../services/services';
import {  Button, message } from 'antd';
export default {
	namespace: 'wsmove',
	state: {
		values:{},
		limit:15,
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
			wsInvSearchs[index].datasuccess=false
			wsInvSearchs[index].optQty=values
			return {...state,wsInvSearchs}
		},
		toBinCode(state, { payload:{index,values}}) {
			const wsInvSearchs=state.wsInvSearchs.slice(0)
			wsInvSearchs[index].toBinCode=values
			return {...state,wsInvSearchs}
		},

		//details
		successinfodetails(state, { payload:{index,values}}) {
			const details=state.details.slice(0)
			details[index].datasuccess=true
			details[index].qty=values
			return {...state,details}
		},
		errinfodetails(state, { payload:{index,values}}) {
			const details=state.details.slice(0)
			details[index].datasuccess=false
			details[index].qty=values
			return {...state,details}
		},
		detailstoBinCode(state, { payload:{index,values}}) {
			const details=state.details.slice(0)
			details[index].binCode=values
			return {...state,details}
		},
		//初始化新建页面数据
		initneweditdata(state, { payload:value}) {
			const wsInvSearchs=[]
			const cardtitle=''
			const cardlist=[]
			const details=[]
			return {...state,wsInvSearchs,cardtitle,cardlist,details}
		},
	},
	effects: {
		*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});	
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
			yield put({type: 'tab/loding',payload:false});	
			if(result.code=='0'){
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
					details[i].index=i+1
					details[i].datasuccess=true
					details[i].originalQty=details[i].qty
					details[i].binCode=details[i].toBinCode
					if(details[i].pdSkuBarcode==undefined || details[i].pdSkuBarcode==null || details[i].pdSkuBarcode==''){
						details[i].pdSkuBarcode=details[i].pdSpuBarcode
					}
				}
				//日志
				const logstitle='移库日志'
				const logs=wsMove.logs
				for(var i=0;i<logs.length;i++){
					logs[i].key=i
				}
				yield put({type: 'infolist',payload:{cardtitle,cardlist,logstitle,logs,detailstitle,details}});
				
			} 
		},
		*newsearch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});	
			if(result.code=='0'){
				const wsInvSearchs=result.wsInvSearchs
				for(var i=0;i<wsInvSearchs.length;i++){
					wsInvSearchs[i].key=i
					wsInvSearchs[i].index=i+1
					wsInvSearchs[i].optQty=null
					wsInvSearchs[i].toBinCode=null
					wsInvSearchs[i].datasuccess=true
					if(!wsInvSearchs[i].qty|| !wsInvSearchs[i].qtyAllocated || !wsInvSearchs[i].qtyOnhold){
						wsInvSearchs[i].qtyCanMove=null
					}else{
						wsInvSearchs[i].qtyCanMove =Number(wsInvSearchs[i].qty)-Number(wsInvSearchs[i].qtyAllocated)-Number(wsInvSearchs[i].qtyOnhold);
					}
				}	
				yield put({type: 'wsInvSearchs',payload:wsInvSearchs});
			} 
		},
		*save({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});	
			if(result.code=='0'){
				message.success('新建成功')
				if(values.wsMoveId){
					yield put({type: 'deleteuse',payload:false});
				}else{
					yield put({type: 'delete',payload:false});
				}
			} 
		},
		//删除当前tab,初始化数据
		*delete({ payload: id }, { call, put ,select}) {
			yield put({type: 'tab/initDeletestate',payload:id});
			yield put({type: 'initneweditdata',payload:''});
		},
		
		




	},
	subscriptions: {},
};
