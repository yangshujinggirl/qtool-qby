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
        detailstitle:'订单内容',
        cardtitle:'',
        cardlist:[],
        expressList:[],
        orderLogList:[]
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
        syncInfolist(state, { payload:{cardtitle,cardlist,expressList,orderLogList}}) {
			return {...state,cardtitle,cardlist,expressList,orderLogList}
        }
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
				} 
            },
            *infofetchTwo({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
                    console.log(result);
                    const cardtitle='入库单信息'
                    let cardlist = [];
                    if(result.spOrder.status == 30){
                        cardlist = [
                            {lable:'订单号', text:result.spOrder.orderNo},
                            {lable:'下单时间', text:result.spOrder.createTime},
                            {lable:'订单状态', text:result.spOrder.statusStr},
                            {lable:'门店名称', text:result.spOrder.shopName},
                            {lable:'收货人', text:result.spOrder.recName},
                            {lable:'收货人电话', text:result.spOrder.recTel},
                            {lable:'收货地址', text:result.spOrder.recAddress},
                            {lable:'订单总价', text:result.spOrder.amountSum},
                            {lable:'创建原因', text:result.spOrder.createTypeStr},
                            {lable:'预售订单', text:result.spOrder.preSellStatusStr},
                            {lable:'取消原因', text:result.spOrder.cancelReason}
                          ]
                    }else{
                        cardlist = [
                            {lable:'订单号', text:result.spOrder.orderNo},
                            {lable:'下单时间', text:result.spOrder.createTime},
                            {lable:'订单状态', text:result.spOrder.statusStr},
                            {lable:'门店名称', text:result.spOrder.shopName},
                            {lable:'收货人', text:result.spOrder.recName},
                            {lable:'收货人电话', text:result.spOrder.recTel},
                            {lable:'收货地址', text:result.spOrder.recAddress},
                            {lable:'订单总价', text:result.spOrder.amountSum},
                            {lable:'创建原因', text:result.spOrder.createTypeStr},
                            {lable:'预售订单', text:result.spOrder.preSellStatusStr},
                            ]
                    }
                    const expressList = result.expressInfos;
                    const orderLogList = result.orderLogs;
                     yield put({type: 'syncInfolist',payload:{cardtitle,cardlist,expressList,orderLogList}});
				} 
			},
  	},
  	subscriptions: {},
};
