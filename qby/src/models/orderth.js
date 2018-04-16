import {GetServerData} from '../services/services';
export default {
    namespace: 'orderth',
    state: {
        values:{},
        limit:15,
        currentPage:0,
        total:0,
        tableList:[],
        headTitle:'',
        headTit:[],
        details:[],
        logs:[],
        //编辑部分
        formValue:{},
        goodsInfo:[],
        selectedRowKeys:[],
        selectedRows:[],
    },
    reducers: {
        select(state, { payload:{selectedRowKeys,selectedRows}}) {
			return {...state,selectedRowKeys,selectedRows}
        },
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		syncTableList(state, { payload:{tableList,total,limit,currentPage}}) {
			return {...state,tableList,total,limit,currentPage}
        },
        syncInfolist(state, { payload:{headTitle,headTit,details,logs}}) {
			return {...state,headTitle,headTit,details,logs}
        },
        syncEditInfo(state, { payload:formValue}) {
			return {...state,formValue}
        },
        syncGoodsInfo(state, { payload:goodsInfo}) {
			return {...state,goodsInfo}
        },
        initState(state, { payload: value}) {
			const formValue={
				spOrderNo:'',
				supplier:'',		
				expectedTime:'',
				wsWarehouseId:[],
                reason:''
              };
              const goodsInfo = [];
			return {...state,formValue,goodsInfo}
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
                const headTitle = "退货单信息";
                let headTit = [{lable:'退货单号',text:asn.asnNo},
                                {lable:'创建时间',text:asn.createTime},
                                {lable:'订单状态',text:asn.statusStr},
                                {lable:'门店名称',text:asn.name},
                                {lable:'门店订单',text:asn.spOrderNo},
                                {lable:'预计到达时间',text:asn.expectedTime},
                                {lable:'退货原因',text:asn.reason},
                                {lable:'退货金额',text:asn.amountSum + '元'}
                            ];
                 yield put({type: 'syncInfolist',payload:{headTitle,headTit,details,logs}});
            }else{
                const headTitle=''
                const headTit=[]
                const details=[]
                const logs=[]
                yield put({type: 'syncInfolist',payload:{headTitle,headTit,details,logs}});
            } 
        },
        *editfetch({ payload: {code,values} }, { call, put }) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
                console.log(result);
                let goodsInfoList = result.details;
                let goodsInfo=[];
                for(var i=0;i<goodsInfoList.length;i++){
                    let tempJson = {};
                    tempJson.key=i
                    tempJson.qtyline=true
                    tempJson.priceline=true	
                    tempJson.pdCode = goodsInfoList[i].pdCode
                    tempJson.pdName = goodsInfoList[i].pdName
                    tempJson.pdSkuType = goodsInfoList[i].pdSkuType
                    tempJson.qty = goodsInfoList[i].qty
                    tempJson.price = goodsInfoList[i].price
                    tempJson.wsAsnDetailId = goodsInfoList[i].wsAsnDetailId
                    tempJson.spOrderDetailId = goodsInfoList[i].spOrderDetailId
                    goodsInfo.push(tempJson);
                }
                let formValue = {};
                formValue.spOrderNo = result.asn.spOrderNo;
				formValue.supplier = result.asn.name;		
				formValue.expectedTime = result.asn.expectedTime;
				formValue.wsWarehouseId = String(result.asn.wsWarehouseId);
                formValue.reason = result.asn.reason;
                yield put({type: 'syncEditInfo',payload:formValue});
                yield put({type: 'syncGoodsInfo',payload:goodsInfo});
			} 
		},
  	},
  	subscriptions: {},
};
