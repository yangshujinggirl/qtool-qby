import {GetServerData} from '../../../services/services';
export default {
    namespace: 'cBanner',
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
            platform:['1','2']
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
  						rank:'',
              platform:['1','2']
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
          const { pdBanner } =result;
            let formValue = {};
            formValue.name = pdBanner.name;
            formValue.status = String(pdBanner.status);
            formValue.rank = pdBanner.rank;
            formValue.url = pdBanner.url;
            if(pdBanner.displayplatform == '1') {
              formValue.platform = ['1']
            } else if(pdBanner.displayplatform == '2') {
              formValue.platform = ['2']
            } else if(pdBanner.displayplatform == '3') {
              formValue.platform = ['1','2']
            }
            yield put({type: 'syncEditInfo',payload:formValue});
  			}
  		},
  	},
  	subscriptions: {},
};
