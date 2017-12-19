import {GetServerData} from '../services/services';
export default {
	namespace: 'warehouse',
	state: {
		values:{},
		limit:15,
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
		logs:[],
		detaltotol:0,
		detallimit:50,
		detalcurrentPage:0
	},
	reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		wsorderlist(state, { payload:{wsorderlist,total,limit,currentPage}}) {
			return {...state,wsorderlist,total,limit,currentPage}
		},
		infolist(state, { payload:{cardtitle,cardlist,logstitle,logs,expressInfostit,expressInfos}}) {
			return {...state,cardtitle,cardlist,logstitle,logs,expressInfostit,expressInfos}
		},
		detailinfolist(state, { payload:{detailstitle,details,detaltotol,detallimit,detalcurrentPage}}) {
			return {...state,detailstitle,details,detaltotol,detallimit,detalcurrentPage}
		},
		select(state, { payload:{selectedRowKeys,selectedRows}}) {
			return {...state,selectedRowKeys,selectedRows}
		}
		
	},
	effects: {
		*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const wsorderlist = result.wsOrders;
				const limit=result.limit
				const currentPage=result.currentPage
				const total=result.total
				for(var i=0;i<wsorderlist.length;i++){
					wsorderlist[i].key=wsorderlist[i].wsOrderId
				}
				yield put({type: 'wsorderlist',payload:{wsorderlist,total,limit,currentPage}});
				yield put({type: 'tab/loding',payload:false});	
			} 
		}, 
		*infofetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const wsOrder=result.wsOrder
				var temStr = wsOrder.spOrderNos[0];
				for (var i = 1; i <wsOrder.spOrderNos.length; i++) {
				temStr = temStr+ '   '+wsOrder.spOrderNos[i]
				}
				wsOrder.orderListStr = temStr;
				//card信息
				const cardtitle='配货单信息'
				const cardlist=[
					{lable:'配货单号',text:wsOrder.orderNo},
					{lable:'合单时间',text:wsOrder.createTime},
					{lable:'订单状态',text:wsOrder.statusStr},
					{lable:'门店/供应商名称',text:wsOrder.name},
					{lable:'收货人姓名',text:wsOrder.recName},
					{lable:'收货人电话',text:wsOrder.recTelephone},
					{lable:'收货地址',text:wsOrder.recWholeAddress},
					{lable:'包含订单',text:wsOrder.orderListStr}
				]
				//日志
				const logstitle='配货日志'
				const logs=wsOrder.logs
				for(var i=0;i<logs.length;i++){
					logs[i].key=i
				}
				//物流信息
				const expressInfostit='物流信息'
				const expressInfos=wsOrder.expressInfos
				for(var i=0;i<expressInfos.length;i++){
					expressInfos[i].key=i
				}
				yield put({type: 'infolist',payload:{cardtitle,cardlist,logstitle,logs,expressInfostit,expressInfos}});
				yield put({type: 'tab/loding',payload:false});	
			} 
		}, 
		*detailfetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const detailstitle='配货商品'
				const details=result.detailAllotVos
				for(var i=0;i<details.length;i++){
					details[i].key=i
					if(details[i].pdSkuBarcode==undefined || details[i].pdSkuBarcode==null || details[i].pdSkuBarcode==''){
						details[i].pdSkuBarcode=details[i].pdSpuBarcode
					}
				}
				const detaltotol=result.total 
				const detallimit=result.limit 
				const detalcurrentPage=result.currentPage
				yield put({type: 'detailinfolist',payload:{detailstitle,details,detaltotol,detallimit,detalcurrentPage}});
				yield put({type: 'tab/loding',payload:false});	
			} 
		}
	},
	subscriptions: {},
};
