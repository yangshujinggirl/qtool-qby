import {GetServerData} from '../services/services';
export default {
    namespace: 'ordermd',
    state: {
        values:{},
        limit:15,
        currentPage:0,
        total:0,
        tableList:[],
        //订单详情信息
        detailsList:[],
        detailstitle:'订单内容'
    },
    reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		syncTableList(state, { payload:{tableList,total,limit,currentPage}}) {
			return {...state,tableList,total,limit,currentPage}
        },
        syncDetailList(state, { payload:{detailsList}}) {
			return {...state,detailsList}
		},
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                const tableList = result.spOrders;
                const limit=result.limit;
                const currentPage=result.currentPage;
                const total=result.total;
                for(var i=0;i<tableList.length;i++){
                    tableList[i].key=tableList[i].spOrderId;
                }
                yield put({type: 'syncTableList',payload:{tableList,total,limit,currentPage}});
            } 
        },
        //
        *infofetch({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
                    console.log(result);
                    let detailsList=result.details;
                    if(detailsList.length){
                        for(var i=0;i<detailsList.length;i++){
                            detailsList[i].key=i
                        }
                    }
                    yield put({type: 'syncDetailList',payload:{detailsList}});
					// const asn=result.asn
					// const logs=result.logs
					// const details=result.details
					// for(var i=0;i<details.length;i++){
					// 	details[i].key=i
					// 	details[i].qtyInput=details[i].qty-details[i].qtyReceived
					// 	details[i].lotDate=null
					// 	details[i].datasuccess=true //最后一个框是否变红
					// 	details[i].qtysuccess=true //倒数第二个框是否变红
					// 	details[i].qtyDifference=Number(details[i].qty)-Number(details[i].qtyReceived)
					// }
					// for(var i=0;i<logs.length;i++){
					// 	logs[i].key=i
					// }
					// const cardtitle='入库单信息'
					// const cardlist=[
					// 	{lable:'订单号',text:asn.asnNo},
					// 	{lable:'下单时间',text:asn.createTime},
					// 	{lable:'订单状态',text:asn.statusStr},
					// 	{lable:'门店名称',text:asn.name},
					// 	{lable:'预计到达时间',text:asn.expectedTime},
					// ]
					// const logstitle='入库日志'
					// const detailstitle='入库商品'
					// yield put({type: 'infolist',payload:{cardtitle,cardlist,detailstitle,details,logstitle,logs}});
				} 
            },
            *infofetchTwo({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
                    console.log(result);
				} 
			},
  	},
  	subscriptions: {},
};
