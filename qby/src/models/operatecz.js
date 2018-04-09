import {GetServerData} from '../services/services';
import {  Button, message } from 'antd';
export default {
	namespace: 'operatecz',
	state: {
		values:{},
		limit:15,
		currentPage:0,
		total:0,
		 cardtitle:'',
		 cardlist:[],
		 amount:'',
		 picUrl:[],
		 logstitle:'',
		 logs:[],
		spVouchers:[],
		fileDomain:''
	},
	reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		spVoucherslist(state, { payload:{spVouchers,total,limit,currentPage,fileDomain}}) {
			return {...state,spVouchers,total,limit,currentPage,fileDomain}
		},

		infolist(state, { payload:{cardtitle,cardlist,logstitle,logs,amount,picUrl}}) {
			return {...state,cardtitle,cardlist,logstitle,logs,amount,picUrl}
		},
		

		
	},
	effects: {
		*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const spVouchers = result.spVouchers;
				const limit=result.limit
				const currentPage=result.currentPage
				const total=result.total
				const fileDomain=result.fileDomain
				
				 yield put({type: 'spVoucherslist',payload:{spVouchers,total,limit,currentPage,fileDomain}});
			} 
			}, 
			*infofetch({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
					const spVoucher=result.spVoucher
					const cardtitle='凭证信息'
					const cardlist=[
						{lable:'充值编码',text:spVoucher.voucherNo},
						{lable:'审核状态',text:spVoucher.statusStr},
						{lable:'门店名称',text:spVoucher.shopName},
						{lable:'充值时间',text:spVoucher.createTime},
					]

					const logstitle='充值日志'
					const logs=result.spVoucherLogs
					const amount=spVoucher.amount
					const picUrl=spVoucher.picUrl
					yield put({type: 'infolist',payload:{cardtitle,cardlist,logstitle,logs,amount,picUrl}});
				}else{
					console.log('wo sdsd')
					const cardtitle=''
					const cardlist=[]
					const logstitle=''
					const logs=[]
					const amount=''
					const picUrl=[]
					yield put({type: 'infolist',payload:{cardtitle,cardlist,logstitle,logs,amount,picUrl}});
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
