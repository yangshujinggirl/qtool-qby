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
        limit1:50,
        currentPage1:0,
        total1:0,
        values1:{},
        detailsList:[],
        detailstitle:'订单内容',
        cardtitle:'',
        cardlist:[],
        expressList:[],
        orderLogList:[],
        isCancel:false,
        goodsInfo:[],
        mdopdermeth:{}
    },
    reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		syncTableList(state, { payload:{tableList,total,limit,currentPage}}) {
			return {...state,tableList,total,limit,currentPage}
        },
        syncDetailList(state, { payload:{detailsList,limit1,currentPage1,total1}}) {
			return {...state,detailsList,limit1,currentPage1,total1}
        },
        syncInfolist(state, { payload:{cardtitle,cardlist,expressList,orderLogList,isCancel}}) {
			return {...state,cardtitle,cardlist,expressList,orderLogList,isCancel}
        },
        syncGoodsInfo(state, { payload:goodsInfo}) {
			return {...state,goodsInfo}
        },
        mdopdermeth(state, { payload:mdopdermeth}) {
			return {...state,mdopdermeth}
        },
        initsyncDetailList(state, { payload:{}}) {
            const detailsList=[]
            const limit1=50
            const currentPage1=0
            const total1=0
            const cardtitle=''
            const cardlist=[]
            const expressList=[]
            const orderLogList=[]
            const isCancel=false
			return {...state,detailsList,limit1,currentPage1,total1,cardtitle,cardlist,expressList,orderLogList,isCancel}
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
                    if(tableList[i].preSellStatus=='1'){
                        tableList[i].preSellStatusStr='是'
                    }else{
                        tableList[i].preSellStatusStr='否'
                    }
                }
                yield put({type: 'syncTableList',payload:{tableList,total,limit,currentPage}});
            }
        },
        //
        *infofetch({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
                    let detailsList=result.details;
                    if(detailsList.length){
                        for(var i=0;i<detailsList.length;i++){
                            detailsList[i].key=i
                        }
                    }
                    const limit1=result.limit;
                    const currentPage1=result.currentPage;
                    const total1=result.total;
                    yield put({type: 'syncDetailList',payload:{detailsList,limit1,currentPage1,total1}});
				}else{
                    const detailsList=[]
                    const limit1=50
                    const currentPage1=0
                    const total1=0
                    yield put({type: 'syncDetailList',payload:{detailsList,limit1,currentPage1,total1}});
                }
            },
            *infofetchTwo({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
                    const cardtitle='门店信息'
                    let cardlist = [];
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
                        {lable:'备注', text:result.spOrder.remark},
                    ];
                    if(result.wsOrderNos.length){
                        let wsOrderNos = result.wsOrderNos;
                        cardlist.push({lable:'对应配货单', text:wsOrderNos.join(' ')});
                    }
                    if(result.spOrder.status == 30){
                        cardlist.push({lable:'取消原因', text:result.spOrder.cancelReason});
                    };
                    let isCancel = result.spOrder.isCancel;
                    let expressList = result.expressInfos;
                    if(expressList.length){
                        for(var i=0;i<expressList.length;i++){
                            expressList[i].key=i
                        }
                    }
                    let orderLogList = result.orderLogs;
                    if(orderLogList.length){
                        for(var i=0;i<orderLogList.length;i++){
                            orderLogList[i].key=i
                        }
                    }
                    yield put({type: 'syncInfolist',payload:{cardtitle,cardlist,expressList,orderLogList,isCancel}});
				}else{
                    const cardtitle=''
                    const cardlist=[]
                    const expressList=[]
                    const orderLogList=[]
                    const isCancel=false
                    yield put({type: 'syncInfolist',payload:{cardtitle,cardlist,expressList,orderLogList,isCancel}});
                }
			},
  	},
  	subscriptions: {},
};
