import {GetServerData} from '../services/service';
export default {
  namespace: 'batchStock',
  state: {
    values:{},
    limit:10,
    currentPage:0,
    total:0,
    list:[]
},
reducers: {
    synchronous(state, { payload:values}) {
        return {...state,values}
    },
    list(state, { payload:{list,total}}) {
        return {...state,list,total}
    },
},
effects: {
    *fetch({ payload: {code,values} }, { call, put ,select}) {
        const result=yield call(GetServerData,code,values);
        if(result.code=='0'){
          const list=result.wsInvBins;
          for(var i=0;i<list.length;i++){
            list[i].key=list[i].wsInvBinId;
            list[i].barcode= list[i].pdSku != null && list[i].pdSku.pdSkuId > 0 ? list[i].pdSku.barcode : list[i].pdSpu.barcode
          if (list[i].pdSku != null && list[i].pdSku.pdSkuId > 0) {
              if (list[i].pdSku.pdType1Val != null) {
                  if (list[i].pdSku.pdType2Val != null) {
                    list[i].specification = list[i].pdSku.pdType1Val.name + '/' + list[i].pdSku.pdType2Val.name;
                  } else {
                    list[i].specification = list[i].pdSku.pdType1Val.name;
                  }
              } else if (list[i].pdSku.pdType2Val != null) {
                list[i].specification = list[i].pdSku.pdType2Val.name;
              }
          }
        }
            const limit=result.limit;
            const currentPage=result.currentPage;
            const total=result.total;
            yield put({type: 'list',payload:{list,total,limit,currentPage}});
            yield put({type: 'tab/loding',payload:false});	
        } 
    }, 
},
subscriptions: {},
};
