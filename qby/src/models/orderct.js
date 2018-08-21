import {GetServerData} from '../services/services';
export default {
    namespace: 'orderct',
    state: {
        values:{},
        limit:15,
        currentPage:0,
        total:0,
        tableList:[],
        headTit:[],
        details:[],
        orderLogs:[],
        expresslnfos:[],
        formValue:{
            pdSupplierId:null,
        },
        goodsInfo: [{
            key: 0,
            pdCode:null,
            qty: null,
            price:null
        }],
    },
    reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		syncTableList(state, { payload:{tableList,total,limit,currentPage}}) {
			return {...state,tableList,total,limit,currentPage}
        },
        syncInfolist(state, { payload:{headTit,details,orderLogs,expresslnfos}}) {
			return {...state,headTit,details,orderLogs,expresslnfos}
        },
        syncEditInfo(state, { payload:formValue}) {
			return {...state,formValue}
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
                const tableList = result.orders;
                const limit=result.limit;
                const currentPage=result.currentPage;
                const total=result.total;
                for(var i=0;i<tableList.length;i++){
                    tableList[i].key=tableList[i].spOrderId;
                }
                yield put({type: 'syncTableList',payload:{tableList,total,limit,currentPage}});
            }
        },
        *infofetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                console.log("采退单详情信息：",result);
                var spCtorder = result.spCtorder;
                var details = spCtorder.details
                var orderLogs= spCtorder.orderLogs
                var expresslnfos= spCtorder.expresslnfos
                for (var i = 0; i < details.length; i++) {
                    details[i].key = i;
                }
                for (var i = 0; i < orderLogs.length; i++) {
                    orderLogs[i].key = i;
                }
                let address = spCtorder.recProvinceName + spCtorder.recCityName + spCtorder.recDistrictName + spCtorder.recAddress;

                let headTit = [{lable:'采退单号',text:spCtorder.ctorderNo},
                                {lable:'下单时间',text:spCtorder.createTime},
                                {lable:'订单状态',text:spCtorder.statusStr},
                                {lable:'供应商名称',text:spCtorder.pdSupplierName},
                                {lable:'采购单号',text:spCtorder.wsAsnNo},
                                {lable:'出库仓库',text:spCtorder.wsWarehouseName}
                                ];
                    if (spCtorder.taxRateType == 1) {
                        headTit.push({lable:'是否含税',text:'是'},{lable:'含税税点',text:spCtorder.taxRate +'%'});
                    }else{
                        headTit.push({lable:'是否含税',text:'否'});
                    }
                    headTit.push({lable:'收货人',text:spCtorder.recName},
                                {lable:'退货电话',text:spCtorder.recTelephone},
                                {lable:'退货地址',text:address},
                                {lable:'采退金额',text:spCtorder.amountSum + '元'},
                                {lable:'退货原因',text:spCtorder.returnReason},
                                {lable:'退货备注',text:spCtorder.remark}
                   );
                 yield put({type: 'syncInfolist',payload:{headTit,details,orderLogs,expresslnfos}});
            }else{
                const headTit=[]
                const details=[]
                const orderLogs=[]
                const expresslnfos=[]
                yield put({type: 'syncInfolist',payload:{headTit,details,orderLogs,expresslnfos}});
            }
        },
  	},
  	subscriptions: {},
};
