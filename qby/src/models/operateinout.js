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
        moneyinfoList:[],
        exchangeCardlist:[],
        exchangeList:[],
        exchangeLogList:[]
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
      },
      updateState(state,{payload}){
        return {...state,...payload}
      }
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                let tableList = result.spMoneyDetails;
                const limit=result.limit;
                const currentPage=result.currentPage;
                const total=result.total;
                tableList.map((el) => el.key = el.outId)
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
                        {lable:'费用名称', text:data.week},
                        {lable:'订单数', text:data.orderSum},
                        {lable:'物流费用', text:data.feeSum}
                    ]
                yield put({type:'syncInfoList',payload:{infoList,cardlist}});
            }else{
                const infoList=[]
                const cardlist=[]
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
                        {lable:'账目时间', text:data.dayTime},
                        {lable:'结算金额', text:data.amount}
                    ]
                yield put({type:'syncMoneyInfoList',payload:{moneyinfoList,moneycardlist}});
            }else{
                const moneyinfoList=[]
                const moneycardlist=[]
                yield put({type:'syncMoneyInfoList',payload:{moneyinfoList,moneycardlist}});
            }
        },
      *'exchangeInfofetch'({ payload}, { call, put ,select}) {
        yield put({type: 'tab/loding',payload:true});
        let values = payload.values
        let exchangeCardList = []
        const result = yield call(GetServerData,'qerp.web.sp.exchange.list',{exchangeNo:values.keywords});
        const result1 = yield call(GetServerData,"qerp.web.sp.exchange.detail.info",{qposPdExchangeId:values.Id})
        const result2 = yield call(GetServerData,"qerp.web.sp.exchange.info",{qposPdExchangeId:values.Id})
        if(result.code  == '0' & result1.code == '0' & result2.code == '0'){
          let data = result.exchangeNos[0]
          exchangeCardList.push(
            {lable:'订单号 ', text:data.exchangeNo},
            {lable: values.type == 32 ? `调入门店` : `调出门店`, text:values.type == 32 ? data.inShopName : data.outShopName },
            {lable:'创建人', text:data.urUser},
            {lable:'调拨状态', text:data.statusStr},
            {lable:'商品调拨数量', text:data.qtySum},
            {lable:'商品调拨总价', text:data.amountSum},
            {lable:'创建时间', text:data.createTime},
          )
          yield put({type:'updateState',payload:{exchangeCardlist:exchangeCardList,exchangeList:result1.pdInfo,exchangeLogList:result2.logs}})
          yield put({type: 'tab/loding',payload:false});
        }
      }
  	},
  	subscriptions: {},
};
