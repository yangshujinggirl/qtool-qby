import {GetServerData} from '../services/services';
export default {
    namespace: 'operateinout',
    state: {
        values:{},
        limit:15,
        currentPage:0,
        total:0,
        tableList:[],
        //
        cardlist:[],
        infoList:[],
        //收银详情
        moneycardlist:[],
        moneyinfoList:[]
    },
    reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		syncTableList(state, { payload:{tableList,total,limit,currentPage}}) {
			return {...state,tableList,total,limit,currentPage}
        },
        syncInfoList(state, { payload:{infoList,cardlist}}) {
			return {...state,infoList,cardlist}
        },
        syncMoneyInfoList(state, { payload:{moneyinfoList,moneycardlist}}) {
			return {...state,moneyinfoList,moneycardlist}
        }
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                const tableList = result.spMoneyDetails;
                const limit=result.limit;
                const currentPage=result.currentPage;
                const total=result.total;
                for(var i=0;i<tableList.length;i++){
                    tableList[i].key=i+1;
                    if(tableList[i].type==21){
                        if(tableList[i].amount>0){
                            tableList[i].amount='订单费用：+'+tableList[i].amount
                        }else{
                            tableList[i].amount='订单费用：'+tableList[i].amount
                        }
                    }
                    if(tableList[i].type==22){
                        if(tableList[i].amount>0){
                            tableList[i].amount='物流费用：+'+tableList[i].amount
                        }else{
                            tableList[i].amount='物流费用：'+tableList[i].amount
                        }
                    }
                    if(tableList[i].type==24){
                        if(tableList[i].amount>0){
                            tableList[i].amount='取消退款：+'+tableList[i].amount
                        }else{
                            tableList[i].amount='取消退款：'+tableList[i].amount
                        }
                    }
                    if(tableList[i].type==11){
                        if(tableList[i].amount>0){
                            tableList[i].amount='充值金额：+'+tableList[i].amount
                        }else{
                            tableList[i].amount='充值金额：'+tableList[i].amount
                        }
                    }
                }
                yield put({type: 'syncTableList',payload:{tableList,total,limit,currentPage}});
            } 
        },
        *infofetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                let infoList=result.spExpressfeeDetails;
                if(infoList.length){
                    for(var i=0;i<infoList.length;i++){
                        infoList[i].key=i
                    }
                };
                let data=result.spExpressFee;
                let cardlist =[
                        {lable:'门店名称', text:data.shopName},
                        {lable:'费用周期', text:data.month+'月物流费用'},
                        {lable:'订单数', text:data.orderSum},
                        {lable:'物流费用', text:data.feeSum}
                    ]
                yield put({type:'syncInfoList',payload:{infoList,cardlist}});
            }
        },
        *moneyInfofetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                let moneyinfoList=result.odOrders;
                if(moneyinfoList.length){
                    for(var i=0;i<moneyinfoList.length;i++){
                        moneyinfoList[i].key=i
                    }
                };
                let data=result.spShop;
                let moneycardlist =[
                        {lable:'门店名称', text:data.shopName},
                        {lable:'账目时间', text:data.createTime},
                        {lable:'结算金额', text:data.sumAmount}
                    ]
                yield put({type:'syncMoneyInfoList',payload:{moneyinfoList,moneycardlist}});
            }
        }
  	},
  	subscriptions: {},
};
