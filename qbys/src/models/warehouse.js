import {GetServerData} from '../services/services';
export default {
  namespace: 'warehouse',
  state: {
	  values:{},
	  limit:10,
	  currentPage:0,
	  total:0,
	  wsorderlist:[]
  },
  reducers: {
	synchronous(state, { payload:values}) {
		return {...state,values}
	},
	wsorderlist(state, { payload:{wsorderlist,total}}) {
		return {...state,wsorderlist,total}
	},



  },
  effects: {
    *fetch({ payload: {code,values} }, { call, put ,select}) {
      	const result=yield call(GetServerData,code,values);
      	if(result.code=='0'){
			console.log(result)
			const wsorderlist = result.wsOrders;
			const limit=result.limit
			const total=result.total
			for(var i=0;i<wsorderlist.length;i++){
				wsorderlist[i].key=wsorderlist[i].wsOrderId+wsorderlist[i].type
			}
            yield put({type: 'wsorderlist',payload:{wsorderlist,total}});
      		yield put({type: 'tab/loding',payload:false});	
          } 
      	}, 
  	},
  	subscriptions: {},
};
