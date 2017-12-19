import {GetServerData} from '../services/services';
import {  Button, message } from 'antd';
export default {
	namespace: 'wsin',
	state: {
		values:{},
		limit:15,
		currentPage:0,
		total:0,
		wsorderlist:[],
		selectedRowKeys:[],
		selectedRows:[1,2],
		cardtitle:'',
		cardlist:[],
		detailstitle:'',
		details:[],
		logstitle:'',
		logs:[],
		binCode:''
	},
	reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		wsorderlist(state, { payload:{wsorderlist,total,limit,currentPage}}) {
			return {...state,wsorderlist,total,limit,currentPage}
		},
		select(state, { payload:{selectedRowKeys,selectedRows}}) {
			return {...state,selectedRowKeys,selectedRows}
		},
		infolist(state, { payload:{cardtitle,cardlist,detailstitle,details,logstitle,logs}}) {
			return {...state,cardtitle,cardlist,detailstitle,details,logstitle,logs}
		},
		errdetails(state, { payload:{index,values}}) {
			const details=state.details.slice(0)
			details[index].datasuccess=false
			details[index].lotDate=values
			return {...state,details}
		},
		successdetails(state, { payload:{index,values}}) {
			const details=state.details.slice(0)
			details[index].datasuccess=true
			details[index].lotDate=values
			return {...state,details}
		},
		




		errqtydetails(state, { payload:{index,values}}) {
			const details=state.details.slice(0)
			details[index].qtysuccess=false
			details[index].qtyInput=values
			return {...state,details}
		},
		successqtydetails(state, { payload:{index,values}}) {
			const details=state.details.slice(0)
			details[index].qtysuccess=true
			details[index].qtyInput=values
			return {...state,details}
		},
		binCodevalue(state, { payload:binCode}) {
			return {...state,binCode}
		},
		initstatus(state, { payload:{}}) {
			const cardtitle=''
			const cardlist=[]
			const details=[]
			const binCode=''
			return {...state,cardtitle,cardlist,details,binCode}
		},
	},
	effects: {
		*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const wsorderlist = result.asns;
				const limit=result.limit
				const currentPage=result.currentPage
				const total=result.total
				for(var i=0;i<wsorderlist.length;i++){
					wsorderlist[i].key=wsorderlist[i].wsAsnId
				}
				yield put({type: 'wsorderlist',payload:{wsorderlist,total,limit,currentPage}});
			} 
			}, 
			*infofetch({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
					const asn=result.asn
					const logs=result.logs
					const details=result.details
					for(var i=0;i<details.length;i++){
						details[i].key=i
						details[i].qtyInput=details[i].qty-details[i].qtyReceived
						details[i].lotDate=null
						details[i].datasuccess=true //最后一个框是否变红
						details[i].qtysuccess=true //倒数第二个框是否变红
						details[i].qtyDifference=Number(details[i].qty)-Number(details[i].qtyReceived)
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
						{lable:'预计到达时间',text:asn.expectedTime},
					]
					const logstitle='入库日志'
					const detailstitle='入库商品'
					yield put({type: 'infolist',payload:{cardtitle,cardlist,detailstitle,details,logstitle,logs}});
				} 
			}, 
			*getAsnFinish({ payload: {code,values} }, { call, put ,select}) {
				const valuedata = yield select(state => state.wsin.values);
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
					message.success('强制完成成功',.8)
					const initselectedRows=[]
					const initselectedRowKeys=[]
					yield put({type: 'select',payload:{initselectedRowKeys,initselectedRows}});
					yield put({type: 'fetch',payload:{code:'qerp.web.ws.asn.query',values:valuedata}});
				} 
			}, 
			*delete({ payload: id }, { call, put ,select}) {
				yield put({type: 'tab/initDeletestate',payload:id});
				yield put({type: 'initstatus',payload:{}});
			},
	}
};
