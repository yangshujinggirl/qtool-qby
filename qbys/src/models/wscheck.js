import {GetServerData} from '../services/services';

export default {
namespace: 'wscheck',
state: {
	values:{},
	limit:15,
	currentPage:0,
	total:0,
	wsChecks:[],
	selectedRowKeys:[],
	selectedRows:[],
	newselectedRowKeys:[],
	newselectedRows:[],
	cardtitle:'',
	cardlist:[],
	detailstitle:'',
	details:[],
	logstitle:'',
	logs:[],
	wsInvSearchs:[],
	
},
reducers: {
	synchronous(state, { payload:values}) {
		return {...state,values}
	},
	wsCheckslist(state, { payload:{wsChecks,total,limit,currentPage}}) {
		return {...state,wsChecks,total,limit,currentPage}
	},
	select(state, { payload:{selectedRowKeys,selectedRows}}) {
		return {...state,selectedRowKeys,selectedRows}
	},
	infolist(state, { payload:{cardtitle,cardlist,detailstitle,details,logstitle,logs}}) {
		return {...state,cardtitle,cardlist,detailstitle,details,logstitle,logs}
	},
	
	

	wsInvSearchs(state, { payload:wsInvSearchs}) {
		return {...state,wsInvSearchs}
	},

	newselect(state, { payload:{newselectedRowKeys,newselectedRows}}) {
		return {...state,newselectedRowKeys,newselectedRows}
	},
	initstate(state, { payload:{}}) {
		const wsInvSearchs=[]
		const newselectedRowKeys=[]
		return {...state,wsInvSearchs,newselectedRowKeys}
	},

	successqtydetails(state, { payload:{index,values}}) {
		const details=state.details.slice(0)
		details[index].datasuccess=true
		details[index].qty=values
		return {...state,details}
	},
	errqtydetails(state, { payload:{index,values}}) {
		const details=state.details.slice(0)
		details[index].datasuccess=false
		details[index].qty=values
		return {...state,details}
	},


},

effects: {
	*fetch({ payload: {code,values} }, { call, put ,select}) {
		const result=yield call(GetServerData,code,values);
		yield put({type: 'tab/loding',payload:false});
		if(result.code=='0'){
			const wsChecks = result.wsChecks;
			const limit=result.limit
			const currentPage=result.currentPage
			const total=result.total
			for(var i=0;i<wsChecks.length;i++){
				wsChecks[i].key=wsChecks[i].wsAsnId
			}
			yield put({type: 'wsCheckslist',payload:{wsChecks,total,limit,currentPage}});	
		} 
		}, 
		*infofetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				// card
				const info=result.wsCheck
				const cardtitle='盘点单信息'
				const cardlist=[
						{lable:'盘点单号',text:info.checkNo},
						{lable:'下单时间',text:info.createTime},
						{lable:'订单状态',text:info.statusStr},
						{lable:'创建人',text:info.createUserName},
					]
				
				//商品信息
				const details=info.wsCheckDetails
				for(var i=0;i<details.length;i++){
					details[i].key=i
					details[i].datasuccess=true
					details[i].index=i+1
					if(details[i].pdSkuBarcode==undefined || details[i].pdSkuBarcode==null || details[i].pdSkuBarcode==''){
						details[i].pdSkuBarcode=details[i].pdSpuBarcode
					}
					
				}
				const detailstitle='盘点商品'
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
						wsInvSearchs[i].index=i+1
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
