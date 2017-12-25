import {GetServerData} from '../services/services';
export default {
    namespace: 'orderdb',
    state: {
        values:{},
        limit:15,
        currentPage:0,
        total:0,
        tableList:[],
        orderLogs:[],
        headTit:[],
        details:[],
        goodsInfo:[{
            key: 0,
            code:'',
            qty: '',
            codeline:true,
            qtyline:true,
        }]
    },
    reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		syncTableList(state, { payload:{tableList,total,limit,currentPage}}) {
			return {...state,tableList,total,limit,currentPage}
        },
        syncInfolist(state, { payload:{headTit,details,orderLogs}}) {
			return {...state,headTit,details,orderLogs}
        },
        syncGoodsInfo(state, { payload:goodsInfo}) {
			return {...state,goodsInfo}
        },
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                const tableList = result.exchanges;
                const limit=result.limit;
                const currentPage=result.currentPage;
                const total=result.total;
                for(var i=0;i<tableList.length;i++){
                    tableList[i].key=tableList[i].wsOrderId;
                }
                yield put({type: 'syncTableList',payload:{tableList,total,limit,currentPage}});
            } 
        },
        *infofetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                console.log("调拨单详情信息：",result);
                const headTit=[
					{lable:'调拨单号', text:result.exchange.allocationNo},
					{lable:'下单时间', text:result.exchange.createTime},
					{lable:'调出仓库', text:result.exchange.outWsName},
					{lable:'调入仓库', text:result.exchange.callWsName},
					{lable:'订单状态', text:result.exchange.statusStr},
					{lable:'创建人', text:result.exchange.createUserName},
					{lable:'调拨原因', text:result.exchange.reason}
				]

                const details=result.exchange.details;
                const orderLogs=result.exchange.logs;
                for(var i=0;i<details.length;i++){
                    details[i].key=i
                }
                for(var i=0;i<orderLogs.length;i++){
                    orderLogs[i].key=i
                }
                 yield put({type: 'syncInfolist',payload:{headTit,details,orderLogs}});
            } 
        },
  	},
  	subscriptions: {},
};
