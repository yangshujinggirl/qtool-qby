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
        headTitle:'',
        headTit:[],
        details:[],
        logs:[],
        invoices:[],
        editInfo:{
          shippingFeeType:10,
          shippingFee:null,
          taxRateType:1,
        },
        goodsInfo: [{
          key: 0,
          pdCode:null,
          qty: null,
          price:null,
          pdName:null,
          pdSkuType:null,
          name:null,
          displayName:null,
          createTime:null
        }],
        nothasFacepay:true,
        taxRateDisabled:false,
        mdopdermeth:{},
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
      syncInfolist(state, { payload:{headTitle,headTit,details,logs,invoices}}) {
        return {...state,headTitle,headTit,details,logs,invoices}
      },
      syncEditInfo(state, { payload:editInfo}) {
	      return {...state,editInfo}
      },
      syncGoodsInfo(state, { payload:goodsInfo}) {
	      return {...state,goodsInfo}
      },
      syncNothasFacepay(state, { payload:nothasFacepay}) {
	      return {...state,nothasFacepay}
      },
      syncTaxRateDisabled(state, { payload:taxRateDisabled}) {
	      return {...state,taxRateDisabled}
      },
      mdopdermeth(state, { payload:mdopdermeth}) {
        return {...state,mdopdermeth}
      },
      initState(state, { payload: value}) {
  			const editInfo={
  				shippingFeeType:10,
          shippingFee:null,
          taxRateType:0,
          expectedTime:'',
          name:'',
          pdSupplierId:null,
          wsWarehouseId:[]
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
                };
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
                let invoices = result.invoices;
                for(let i=0;i<logs.length;i++){
                    logs[i].key = i;
                };
                for (var i = 0; i < details.length; i++) {
                  details[i].key = details[i].wsAsnDetailId;
                };
                invoices.map((item,index) => {
                  item.key = index;
                  return item;
                })
                const headTitle = "采购单信息";
                let headTit = [
                  {lable:'采购单号',text:asn.asnNo},
                  {lable:'下单时间',text:asn.createTime},
                  {lable:'订单状态',text:asn.statusStr},
                  {lable:'供应商名称',text:asn.name},
                  {lable:'预计到达时间',text:asn.expectedTime},
                  {lable:'单据类型',text:asn.vouchersTypeStr},
                  {lable:'发票状态',text:asn.invoiceStatusStr},
                  {lable:'是否已结案',text:asn.caseStatusStr},
                  {lable:'备注',text:asn.remark},
                ];
                if (asn.shippingFeeType == 20) {
                  headTit.push({lable:'物流费用',text:'到付'},{lable:'到付金额',text:asn.shippingFee});
                }else{
                  headTit.push({lable:'物流费用',text:'包邮'});
                };
                headTit.push({lable:'收货仓库',text:asn.wsWarehouseName});
                if (asn.taxRateType == 1) {
                  headTit.push({lable:'是否含税',text:'是'},{lable:'含税税点',text:asn.taxRate +'%'});
                }else{
                  headTit.push({lable:'是否含税',text:'否'});
                };
                if(asn.paymentType ==10){
                  asn.paymentTypeStr = '货到'+asn.dayPay+'天'
                }else if(asn.paymentType ==20){
                  asn.paymentTypeStr = '票到'+asn.dayPay+'天'
                }else{
                  asn.paymentTypeStr = '现结'
                };
                headTit.push({lable:'账期类型',text:asn.paymentTypeStr});
                headTit.push({lable:'采购总金额',text:asn.amountSum + '元'});
                yield put({type: 'syncInfolist',payload:{headTitle,headTit,details,logs,invoices}});
            }else{
                const headTitle=''
                const headTit=[];
                const details=[];
                const logs=[];
                const invoices=[];
                yield put({type: 'syncInfolist',payload:{headTitle,headTit,details,logs,invoices}});
            };
        },
        *editfetch({ payload: {code,values} }, { call, put }) {
      			const result=yield call(GetServerData,code,values);
      			yield put({type: 'tab/loding',payload:false});
      			if(result.code=='0'){
              const info = result.asn;
              if(!info.shippingFee){
                  yield put({type: 'syncNothasFacepay',payload:true});
              }else{
                  yield put({type: 'syncNothasFacepay',payload:false});
              }
              if(!info.taxRate =="" ||!info.taxRate == null||!info.taxRate == undefined||info.taxRate == '0'){
                  yield put({type: 'syncTaxRateDisabled',payload:false});
              }else{
                  yield put({type: 'syncTaxRateDisabled',payload:true});
              }
              let editInfo = {};
              editInfo.expectedTime = info.expectedTime;
              editInfo.name = info.name;
              editInfo.pdSupplierId = info.pdSupplierId;
              editInfo.shippingFee = info.shippingFee;
              editInfo.shippingFeeType = info.shippingFeeType;
              editInfo.taxRateType = info.taxRateType;
              editInfo.wsWarehouseId = String(info.wsWarehouseId);
              editInfo.paymentType = info.paymentType;
              editInfo.paymentTypeStr = info.paymentTypeStr;
              editInfo.remark = info.remark;
              if(info.dayPay){
                editInfo.dayPay = info.dayPay;
              }else{
                editInfo.dayPay = '现结'
              }
              editInfo.vouchersType = info.vouchersType;
              if(info.taxRate == null ||info.taxRate == undefined){
                  editInfo.taxRate = [];
              }else if(info.taxRate==-1){
                editInfo.taxRate = '不含税';
              }else{
                editInfo.taxRate = String(info.taxRate)+'%';
              }
              const goodsInfoList =  result.details;
              let goodsInfo = [];
              for(var i=0;i<goodsInfoList.length;i++){
                let json = {
                    key:i+1+'s',
                    price:goodsInfoList[i].price,
                    qty:goodsInfoList[i].qty,
                    pdCode:goodsInfoList[i].pdCode,
                    pdName:goodsInfoList[i].pdName,
                    pdSkuType:goodsInfoList[i].pdSkuType,
                    name:goodsInfoList[i].name,
                    displayName:goodsInfoList[i].displayName,
                    createTime:goodsInfoList[i].createTime,
                    isDetail:true //是否是导入
                };
                goodsInfo.push(json);
              };
              yield put({type: 'syncEditInfo',payload:editInfo});
              yield put({type: 'syncGoodsInfo',payload:goodsInfo});
	         };
        },
  	},
  	subscriptions: {},
};
