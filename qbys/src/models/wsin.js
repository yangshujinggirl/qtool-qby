import {GetServerData} from '../services/services';
export default {
namespace: 'wsin',
state: {
	values:{},
	limit:10,
	currentPage:0,
	total:0,
	wsorderlist:[],
	selectedRowKeys:[],
	selectedRows:[],
	cardtitle:'',
	cardlist:[],
	detailstitle:'',
	details:[],
	logstitle:'',
	logs:[]
},
reducers: {
	synchronous(state, { payload:values}) {
		return {...state,values}
	},
	wsorderlist(state, { payload:{wsorderlist,total}}) {
		return {...state,wsorderlist,total}
	},
	select(state, { payload:{selectedRowKeys,selectedRows}}) {
		return {...state,selectedRowKeys,selectedRows}
	},
	infolist(state, { payload:{cardtitle,cardlist,detailstitle,details,logstitle,logs}}) {
		return {...state,cardtitle,cardlist,detailstitle,details,logstitle,logs}
	},
	errdetails(state, { payload:index}) {
		const details=state.details.slice(0)
		details[index].datasuccess=false
		return {...state,details}
	},
	successdetails(state, { payload:{index,values}}) {
		const details=state.details.slice(0)
		details[index].datasuccess=true
		details[index].productDate=values
		return {...state,details}
	},
	//倒数第二个框输入失败
	errqtydetails(state, { payload:index}) {
		const details=state.details.slice(0)
		details[index].qtysuccess=false
		return {...state,details}
	},
	//倒数第二个框输入成功
	successqtydetails(state, { payload:{index,values}}) {
		const details=state.details.slice(0)
		details[index].qtysuccess=true
		details[index].qtyInput=values
		return {...state,details}
	},
},

effects: {
	*fetch({ payload: {code,values} }, { call, put ,select}) {
		console.log(values)
		const result=yield call(GetServerData,code,values);
		if(result.code=='0'){
			console.log(result)
			const wsorderlist = result.asns;
			const limit=result.limit
			const currentPage=result.currentPage
			const total=result.total
			for(var i=0;i<wsorderlist.length;i++){
				wsorderlist[i].key=wsorderlist[i].wsAsnId
			}
			yield put({type: 'wsorderlist',payload:{wsorderlist,total,limit,currentPage}});
			yield put({type: 'tab/loding',payload:false});	
		} 
		}, 
		*infofetch({ payload: {code,values} }, { call, put ,select}) {
			console.log(values)
			const result=yield call(GetServerData,code,values);
			console.log(result)
			if(result.code=='0'){
				const asn=result.asn
				const logs=result.logs
				const details=result.details
				for(var i=0;i<details.length;i++){
					details[i].key=i
					details[i].qtyInput=details[i].qty
					details[i].productDate=null
					details[i].datasuccess=true //最后一个框是否变红
					details[i].qtysuccess=true //倒数第二个框是否变红
				}
				for(var i=0;i<logs.length;i++){
					logs[i].key=i
				}
				const cardtitle='入库单信息'
				const cardlist=[
					{lable:'订单号',text:asn.asnNo},
					{lable:'下单时间',text:asn.createTime},
					{lable:'订单状态',text:asn.statusStr},
					{lable:'门店名称',text:asn.name},
					{lable:'预计到到时间',text:asn.expectedTime},
				]
				const logstitle='收货日志'
				const detailstitle='入库商品'

			
				yield put({type: 'infolist',payload:{cardtitle,cardlist,detailstitle,details,logstitle,logs}});
				yield put({type: 'tab/loding',payload:false});	
			} 
			}, 





	},
	subscriptions: {},
};
