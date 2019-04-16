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
       url:'',
       rank:'',
       jumpCode:1,
       configureCode:'',
       configureUrl:'',
       code:false,
       Url:true,
     },
    },
    reducers: {
      syncStatus(state,{payload:{code,Url} }){
        let {formValue} = state;
        formValue = Object.assign(formValue,{code,Url});
        return {...state,formValue}
      },
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
              rank:'',
              jumpCode:1,
              configureCode:'',
              configureUrl:'',
              code:false,
              Url:true,
            };
  			return {...state,formValue}
  		},
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
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
            const {name,status,rank,url,configureCode,configureUrl} = result.pdBanner;
            let formValue = {};
    				formValue.name = name;
    				formValue.status = String(status);
    				formValue.rank = rank;
    				formValue.url = url;
    				formValue.configureCode = configureCode;
    				formValue.configureUrl = configureUrl;
            formValue.jumpCode = 1;
            formValue.code = false;
            formValue.Url = true;
            if(configureCode){
              formValue.jumpCode = 1;
              formValue.code = false;
            }
            if(configureUrl){
              formValue.jumpCode = 2;
              formValue.Url = true;
            };
            yield put({type: 'syncEditInfo',payload:formValue});
    			}
    		},
  	},
  	subscriptions: {},
};
