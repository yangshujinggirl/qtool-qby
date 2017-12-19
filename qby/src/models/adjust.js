import {GetServerData} from '../services/services';
import {message} from 'antd';

export default {
namespace: 'adjust',
state: {
	values:{},
	limit:15,
	currentPage:0,
	total:0,
	wsAdjustslist:[],
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
	wsAdjustslist(state, { payload:{wsAdjustslist,total,limit,currentPage}}) {
		return {...state,wsAdjustslist,total,limit,currentPage}
	},
	select(state, { payload:{selectedRowKeys,selectedRows}}) {
		return {...state,selectedRowKeys,selectedRows}
	},
	infolist(state, { payload:{cardtitle,cardlist,detailstitle,details,logstitle,logs}}) {
		return {...state,cardtitle,cardlist,detailstitle,details,logstitle,logs}
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

	initstate(state, { payload:{}}) {
		const wsInvSearchs=[]
		return {...state,wsInvSearchs}
	},

},

effects: {
	*fetch({ payload: {code,values} }, { call, put ,select}) {
		const result=yield call(GetServerData,code,values);
		yield put({type: 'tab/loding',payload:false});	
		if(result.code=='0'){
			const wsAdjustslist = result.wsAdjusts;
			const limit=result.limit
			const currentPage=result.currentPage
			const total=result.total
			for(var i=0;i<wsAdjustslist.length;i++){
				wsAdjustslist[i].key=wsAdjustslist[i].wsAsnId
			}
			yield put({type: 'wsAdjustslist',payload:{wsAdjustslist,total,limit,currentPage}});
		} 

		}, 
		*infofetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				// card
				const info=result.wsAdjust
				const cardtitle='损益单信息'
				const cardlist=[
						{lable:'损益单号',text:info.adjustNo},
						{lable:'下单时间',text:info.createTime},
						{lable:'订单状态',text:info.statusStr},
						{lable:'创建人',text:info.createUserName},
					]
				
				//商品信息
				const details=info.wsAdjustDetails
				for(var i=0;i<details.length;i++){
					details[i].key=i
					if(details[i].pdSkuBarcode==undefined || details[i].pdSkuBarcode==null || details[i].pdSkuBarcode==''){
						details[i].pdSkuBarcode=details[i].pdSpuBarcode
					}
				}
				const detailstitle='损益商品'
				//日志
					const logs=info.logs
					const logstitle='损益日志'
			
				 yield put({type: 'infolist',payload:{cardtitle,cardlist,detailstitle,details,logstitle,logs}});	
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
