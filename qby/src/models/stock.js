import {GetServerData} from '../services/services';
export default {
  namespace: 'stock',
  state: {
    values:{},
    limit:15,
    currentPage:0,
    total:0,
    stockList:[]
},
reducers: {
    synchronous(state, { payload:values}) {
        return {...state,values}
    },
    stockList(state, { payload:{stockList,total,limit,currentPage}}) {
        return {...state,stockList,total,limit,currentPage}
    },
    refreshwsPositionInfo(state, { payload:wsPositionInfo}){
        return {...state,wsPositionInfo}
    }
},
effects: {
    *fetch({ payload: {code,values} }, { call, put ,select}) {
        const result=yield call(GetServerData,code,values);
        yield put({type: 'tab/loding',payload:false});	
        if(result.code=='0'){
            const stockList=result.wsInvs;
            for(var i=0;i<stockList.length;i++){
                stockList[i].key=stockList[i].wsInvId;
                stockList[i].barcode= stockList[i].pdSku != null && stockList[i].pdSku.pdSkuId > 0 ? stockList[i].pdSku.barcode : stockList[i].pdSpu.barcode;
                if (stockList[i].pdSku != null && stockList[i].pdSku.pdSkuId > 0) {
                    if (stockList[i].pdSku.pdType1Val != null) {
                        if (stockList[i].pdSku.pdType2Val != null) {
                            stockList[i].specification = stockList[i].pdSku.pdType1Val.name + '/' + stockList[i].pdSku.pdType2Val.name;
                        }else {
                            stockList[i].specification = stockList[i].pdSku.pdType1Val.name
                        }
                    }else if (stockList[i].pdSku.pdType2Val != null) {
                        stockList[i].specification = stockList[i].pdSku.pdType2Val.name
                    }
                }
            }
            const limit=result.limit;
            const currentPage=result.currentPage;
            const total=result.total;
            yield put({type: 'stockList',payload:{stockList,total,limit,currentPage}});
        } 
    }, 
},
subscriptions: {},
};
