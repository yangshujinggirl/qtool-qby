import {GetServerData} from '../services/services';
export default {
    namespace: 'operatesupplier',
    state: {
        values:{},
        limit:15,
        currentPage:0,
        total:0,
        tableList:[],
        formValue:{
            name:'',
            shortName:'',
            contactName:'',
            contactTel:'',
            bankName:'',
            bankNo:'',
            accountName:'',
            taxRate:'',
            status:'',
            remark:'',
            billDay:null,
            goodDay:null
        },
    },
    reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		syncTableList(state, { payload:{tableList,total,limit,currentPage}}) {
			return {...state,tableList,total,limit,currentPage}
        },
        syncEditInfo(state, { payload:formValue}) {
			return {...state,formValue}
        },
        initState(state, { payload: value}) {
			const formValue={
                        name:'',
                        shortName:'',
                        contactName:'',
                        contactTel:'',
                        bankName:'',
                        bankNo:'',
                        accountName:'',
                        taxRate:[],
                        status:[],
                        remark:''
                    };
			return {...state,formValue}
		},
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                const tableList = result.suppliers;
                const limit=result.limit;
                const currentPage=result.currentPage;
                const total=result.total;
                for(var i=0;i<tableList.length;i++){
                    tableList[i].key=tableList[i].pdSupplierId;
                }
                yield put({type: 'syncTableList',payload:{tableList,total,limit,currentPage}});
            }
        },
        *editfetch({ payload: {code,values} }, { call, put }) {
    			const result=yield call(GetServerData,code,values);
    			yield put({type: 'tab/loding',payload:false});
    			if(result.code=='0'){
                let formValue = {};
                if(result.pdSupplier.type == 20){
                  formValue.billDay = result.pdSupplier.dayPay;
                };
                if(result.pdSupplier.type == 10){
                  formValue.goodDay = result.pdSupplier.dayPay;
                };
                formValue.type = result.pdSupplier.type;
                formValue.name = result.pdSupplier.name;
                formValue.shortName = result.pdSupplier.shortName;
                formValue.contactName = result.pdSupplier.contactName;
                formValue.contactTel = result.pdSupplier.contactTel;
                formValue.bankName = result.pdSupplier.bankName;
                formValue.bankNo = result.pdSupplier.bankNo;
                formValue.accountName = result.pdSupplier.accountName;
                formValue.taxRate = result.pdSupplier.taxRate||result.pdSupplier.taxRate==0?String(result.pdSupplier.taxRate):'';
                formValue.status = String(result.pdSupplier.status);
                formValue.remark = result.pdSupplier.remark;
                yield put({type: 'syncEditInfo',payload:formValue});
	           }
		},
  	},
  	subscriptions: {},
};
