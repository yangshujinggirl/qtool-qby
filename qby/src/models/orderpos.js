import {GetServerData} from '../services/services';
export default {
    namespace: 'orderpos',
    state: {
        values:{},
        limit:15,
        currentPage:0,
        total:0,
        tableList:[],
        cardlist:[],
        infoList:[],
        LogsList:[]
    },
    reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		syncTableList(state, { payload:{tableList,total,limit,currentPage}}) {
			return {...state,tableList,total,limit,currentPage}
        },
        syncInfoList(state, { payload:{infoList,cardlist,LogsList}}) {
			return {...state,infoList,cardlist,LogsList}
        }
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                const tableList = result.orders;
                const limit=result.limit;
                const currentPage=result.currentPage;
                const total=result.total;
                for(var i=0;i<tableList.length;i++){
                    tableList[i].key=i+1;
                }
                yield put({type: 'syncTableList',payload:{tableList,total,limit,currentPage}});
            }
        },
        //销售
        *infofetch1({ payload: {code,values} }, { call, put ,select}) {
    				const result=yield call(GetServerData,code,values);
    				yield put({type: 'tab/loding',payload:false});
    				if(result.code=='0'){
                    let infoList=result.orderDetails;
                    if(infoList.length){
                        for(var i=0;i<infoList.length;i++){
                            infoList[i].key=i
                        }
                    };
                    let LogsList=[];
                    if(result.orderLogs){
                         LogsList=result.orderLogs;
                        if(LogsList.length){
                            for(var i=0;i<LogsList.length;i++){
                                LogsList[i].key=i
                            }
                        }
                    }else{
                        LogsList=[];
                    }
                    let spOrder=result.order;
                    // spOrder.scanQr = null;
                    // spOrder.mis = null;
                    spOrder.pays && spOrder.pays.map(item=>{
                      if(item.type == 11){
                        spOrder.scanQr = item.amount||'0.00';
                      }else{
                        spOrder.scanQr = '0.00'
                      };
                      if(item.type == 12){
                        spOrder.mispayAmount = item.amount||'0.00';
                      }else{
                        spOrder.mispayAmount = '0.00'
                      };
                    })
                    let cardlist = [];
                    if(spOrder.pays.length<2){
                        if(spOrder.mbCardMobile && spOrder.mbCardName){
                            cardlist=[
                                 {lable:'门店名称', text:spOrder.spShopName},
                                 {lable:'销售订单', text:spOrder.orderNo},
                                 {lable:'销售时间', text:spOrder.createTime},
                                 {lable:'销售员', text:spOrder.operator},
                                 {lable:'折扣优惠', text:spOrder.discountAmount},
                                 {lable:'抹零优惠', text:spOrder.cutAmount},
                                 {lable:'结算收银', text:spOrder.payAmount+'（'+spOrder.pays[0].typeStr+':'+spOrder.pays[0].amount+'）'},
                                 {lable:'会员姓名', text:spOrder.mbCardName},
                                 {lable:'会员电话', text:spOrder.mbCardMobile},
                                 {lable:'本次积分', text:spOrder.orderPoint},
                                 {lable:'银联MIS', text:spOrder.mispayAmount},
                                 {lable:'扫码支付', text:spOrder.scanQr},
                               ]
                        }else{
                            cardlist=[
                                 {lable:'门店名称', text:spOrder.spShopName},
                                 {lable:'销售订单', text:spOrder.orderNo},
                                 {lable:'销售时间', text:spOrder.createTime},
                                 {lable:'销售员', text:spOrder.operator},
                                 {lable:'折扣优惠', text:spOrder.discountAmount},
                                 {lable:'抹零优惠', text:spOrder.cutAmount},
                                 {lable:'结算收银', text:spOrder.payAmount+'（'+spOrder.pays[0].typeStr+':'+spOrder.pays[0].amount+'）'},
                                 {lable:'银联MIS', text:spOrder.mispayAmount},
                                 {lable:'扫码支付', text:spOrder.scanQr},
                               ]
                        }
                      }else{
                          if(spOrder.mbCardMobile && spOrder.mbCardName){
                            cardlist=[
                                     {lable:'门店名称', text:spOrder.spShopName},
                                     {lable:'销售订单', text:spOrder.orderNo},
                                     {lable:'销售时间', text:spOrder.createTime},
                                     {lable:'销售员', text:spOrder.operator},
                                     {lable:'折扣优惠', text:spOrder.discountAmount},
                                     {lable:'抹零优惠', text:spOrder.cutAmount},
                                     {lable:'结算收银', text:spOrder.payAmount+'（'+spOrder.pays[0].typeStr+':'+spOrder.pays[0].amount +'  '+spOrder.pays[1].typeStr+':'+spOrder.pays[1].amount+'）'},
                                     {lable:'会员姓名', text:spOrder.mbCardName},
                                     {lable:'会员电话', text:spOrder.mbCardMobile},
                                     {lable:'本次积分', text:spOrder.orderPoint},
                                     {lable:'银联MIS', text:spOrder.mispayAmount},
                                     {lable:'扫码支付', text:spOrder.scanQr},
                                   ]
                          }else{
                            cardlist=[
                                    {lable:'门店名称', text:spOrder.spShopName},
                                    {lable:'销售订单', text:spOrder.orderNo},
                                    {lable:'销售时间', text:spOrder.createTime},
                                    {lable:'销售员', text:spOrder.operator},
                                    {lable:'折扣优惠', text:spOrder.discountAmount},
                                    {lable:'抹零优惠', text:spOrder.cutAmount},
                                    {lable:'结算收银', text:spOrder.payAmount+'（'+spOrder.pays[0].typeStr+':'+spOrder.pays[0].amount +'  '+spOrder.pays[1].typeStr+':'+spOrder.pays[1].amount+'）'},
                                    {lable:'银联MIS', text:spOrder.mispayAmount},
                                    {lable:'扫码支付', text:spOrder.scanQr},
                                ]
                          }
                      }
                    yield put({type:'syncInfoList',payload:{infoList,cardlist,LogsList}});
				}else{
                    const infoList=[]
                    const cardlist=[]
                    const LogsList=[]
                    yield put({type:'syncInfoList',payload:{infoList,cardlist,LogsList}});
                }
        },
        //充值
        *infofetch2({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                let spOrder=result.mbCardMoneyChargeInfo;
                let infoList=[{
                    name:spOrder.mbCard.name,
                    cardNo:spOrder.mbCard.cardNo,
                    mobile:spOrder.mbCard.mobile,
                    levelStr:spOrder.mbCard.levelStr,
                    beforeAmount:spOrder.beforeAmount,
                    delta:spOrder.delta,
                    result:spOrder.result,
                    key:0
                }];
                let LogsList=[];
                if(result.orderLogs){
                    LogsList=result.orderLogs;
                    if(LogsList.length){
                        for(var i=0;i<LogsList.length;i++){
                            LogsList[i].key=i
                        }
                    };
                }else{
                    LogsList=[];
                }
                let cardlist = [
                    {lable:'门店名称', text:spOrder.spShopName},
                    {lable:'充值订单', text:spOrder.chargeNo},
                    {lable:'充值时间', text:spOrder.createTime},
                    {lable:'销售员', text:spOrder.operator},
                ];
                yield put({type:'syncInfoList',payload:{infoList,cardlist,LogsList}});
            }else{
                const infoList=[]
                const cardlist=[]
                const LogsList=[]
                yield put({type:'syncInfoList',payload:{infoList,cardlist,LogsList}});
            }
        },
        //退货
        *infofetch3({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                let spOrder=result.odReturn;
                let infoList=result.odReturnDetails;
                if(infoList.length){
                    for(var i=0;i<infoList.length;i++){
                        infoList[i].key=i
                    }
                };
                let LogsList=[];
                let cardlist = [];
                if(spOrder.mbCardMobile && spOrder.mbCardName){
                    cardlist = [
                        {lable:'门店名称', text:spOrder.spShopName},
                        {lable:'退货订单', text:spOrder.returnNo},
                        {lable:'销售订单', text:spOrder.orderNo},
                        {lable:'退货时间', text:spOrder.createTime},
                        {lable:'退货员', text:spOrder.operator},
                        {lable:'抹零优惠', text:spOrder.cutAmount},
                        {lable:'结算退款', text:spOrder.refundAmount+'（'+spOrder.typeStr+'）'},
                        {lable:'会员姓名', text:spOrder.mbCardName},
                        {lable:'会员电话', text:spOrder.mbCardMobile},
                        {lable:'扣除积分', text:spOrder.returnPoint},
                    ]
                }else{
                    cardlist = [
                        {lable:'门店名称', text:spOrder.spShopName},
                        {lable:'退货订单', text:spOrder.returnNo},
                        {lable:'销售订单', text:spOrder.orderNo},
                        {lable:'退货时间', text:spOrder.createTime},
                        {lable:'退货员', text:spOrder.operator},
                        {lable:'抹零优惠', text:spOrder.cutAmount},
                        {lable:'结算退款', text:spOrder.refundAmount+'（'+spOrder.typeStr+'）'}
                    ]
                }
                yield put({type:'syncInfoList',payload:{infoList,cardlist,LogsList}});
            }else{
                const infoList=[]
                const cardlist=[]
                const LogsList=[]
                yield put({type:'syncInfoList',payload:{infoList,cardlist,LogsList}});
            }
        },
  	},
  	subscriptions: {},
};
