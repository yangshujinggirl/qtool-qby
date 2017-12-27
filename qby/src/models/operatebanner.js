import {GetServerData} from '../services/services';
export default {
    namespace: 'operatebanner',
    state: {
        values:{},
        limit:15,
        currentPage:0,
        total:0,
        tableList:[],
        formValue:{
            name:'',
            status:[],
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
						status:[],
						url:'',
						rank:''
                    };
			return {...state,formValue}
		},
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
				console.log(result);
                const tableList = result.pdBanners;
                const limit=result.limit;
                const currentPage=result.currentPage;
                const total=result.total;
                for(var i=0;i<tableList.length;i++){
                    tableList[i].key=tableList[i].pdBannerId;
                }
                yield put({type: 'syncTableList',payload:{tableList,total,limit,currentPage}});
            } 
        },
        *editfetch({ payload: {code,values} }, { call, put }) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				console.log(result);
                let formValue = {};
				formValue.name = result.pdBanner.name;
				formValue.status = String(result.pdBanner.status);
				formValue.rank = result.pdBanner.rank;
				formValue.url = result.pdBanner.url;
                // formValue.contactName = result.pdSupplier.contactName;
                // formValue.contactTel = result.pdSupplier.contactTel;
                // formValue.bankName = result.pdSupplier.bankName;
                // formValue.bankNo = result.pdSupplier.bankNo;
                // formValue.accountName = result.pdSupplier.accountName;
                // formValue.taxRate = result.pdSupplier.taxRate||result.pdSupplier.taxRate==0?String(result.pdSupplier.taxRate):'';
                // formValue.remark = result.pdSupplier.remark;		
                yield put({type: 'syncEditInfo',payload:formValue});
			} 
		},
  	},
  	subscriptions: {},
};
