import {GetServerData} from '../services/services';
export default {
    namespace: 'ordercg',
    state: {
        values:{},
        limit:15,
        currentPage:0,
        total:0,
        tableList:[],
        selectedRowKeys:[],
        selectedRows:[],
        //
        headTitle:'',
        headTit:[],
        details:[],
        logs:[],
        editInfo:{
            shippingFeeType:10,
            shippingFee:null,
            taxRateType:1,
            taxRate:'',
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
        select(state, { payload:{selectedRowKeys,selectedRows}}) {
			return {...state,selectedRowKeys,selectedRows}
        },
        syncInfolist(state, { payload:{headTitle,headTit,details,logs}}) {
			return {...state,headTitle,headTit,details,logs}
        },
        syncEditInfo(state, { payload:editInfo}) {
			return {...state,editInfo}
        },
        syncGoodsInfo(state, { payload:goodsInfo}) {
			return {...state,goodsInfo}
        },
        initState(state, { payload: value}) {
			const editInfo={
				shippingFeeType:10,
                shippingFee:null,
                taxRateType:1,
                taxRate:'',
                expectedTime:'',
                name:'',
                pdSupplierId:null,
                wsWarehouseId:null
              };
              const goodsInfo = [
                {
                    key: 0,
                    pdCode:null,
                    qty: null,
                    price:null
                }
              ];
			return {...state,editInfo,goodsInfo}
		},
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                const tableList = result.asns;
                const limit=result.limit;
                const currentPage=result.currentPage;
                const total=result.total;
                for(var i=0;i<tableList.length;i++){
                    tableList[i].key=tableList[i].wsAsnId;
                }
                yield put({type: 'syncTableList',payload:{tableList,total,limit,currentPage}});
            } 
        },
        *infofetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                let asn=result.asn;
                let details = result.details;
                let logs = result.logs;
                for(let i=0;i<logs.length;i++){
                    logs[i].key = i;
                }
                for (var i = 0; i < details.length; i++) {
                  details[i].key = details[i].wsAsnDetailId;
                }
                const headTitle = "采购单信息";
                let headTit = [{lable:'采购单号',text:asn.asnNo},
                           {lable:'下单时间',text:asn.createTime},
                           {lable:'订单状态',text:asn.statusStr},
                           {lable:'供应商名称',text:asn.name},
                           {lable:'预计到达时间',text:asn.expectedTime}
                           ];
                if (asn.shippingFeeType == 20) {
                  headTit.push({lable:'物流费用',text:'到付'},{text:'到付金额',text:asn.shippingFee});
                }else{
                  headTit.push({lable:'物流费用',text:asn.wsWarehouseName});
                }
                headTit.push({lable:'收货仓库',text:'包邮'});
                if (asn.taxRateType == 1) {
                  headTit.push({lable:'是否含税',text:'是'},{text:'含税税点',text:asn.taxRate +'%'});
                }else{
                  headTit.push({lable:'是否含税',text:'否'});
                }
                headTit.push({lable:'采购总金额',text:asn.amountSum + '元'});
                 yield put({type: 'syncInfolist',payload:{headTitle,headTit,details,logs}});
            } 
        },
        *editfetch({ payload: {code,values} }, { call, put }) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
                const info = result.asn;
                let editInfo = {};
                editInfo.expectedTime = info.expectedTime;
                editInfo.name = info.name;
                editInfo.pdSupplierId = info.pdSupplierId;
                editInfo.shippingFee = info.shippingFee;
                editInfo.shippingFeeType = info.shippingFeeType;
                editInfo.taxRateType = info.taxRateType;
                editInfo.wsWarehouseId = info.wsWarehouseId;
                if(info.taxRate == null){
                    editInfo.taxRate = ''
                }else{
                    editInfo.taxRate = info.taxRate;
                }
                const goodsInfoList =  result.details;
                let goodsInfo = [];
                for(var i=0;i<goodsInfoList.length;i++){
                    let json = {
                        key:i+1,
                        price:goodsInfoList[i].price,
                        qty:goodsInfoList[i].qty,
                        pdCode:goodsInfoList[i].pdCode
                    }
                    goodsInfo.push(json);
                }
                  yield put({type: 'syncEditInfo',payload:editInfo});
                  yield put({type: 'syncGoodsInfo',payload:goodsInfo});
			} 
		},
  	},
  	subscriptions: {},
};
