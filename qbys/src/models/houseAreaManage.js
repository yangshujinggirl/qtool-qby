import {GetServerData} from '../services/services';
export default {
  namespace: 'houseAreaManage',
  state: {
	  values:{  
	  },
	  limit:10,
	  currentPage:0,
      total:0,
      houseAreaList:[]
  },
  reducers: {
	// synchronous(state, { payload:values}) {
	// 	return {...state,values}
	// },
	houseAreaList(state, { payload:{houseAreaList,total}}) {
		return {...state,houseAreaList,total}
	},
  },
  effects: {
    *fetch({ payload: {code,values} }, { call, put ,select}) {
		console.log(values);
      	const result=yield call(GetServerData,code,values);
      	if(result.code=='0'){
			console.log(result);
			const houseAreaList = result.wsAreas;
			const limit=result.limit;
			const currentPage=result.currentPage;
			const total=result.total;
			for(var i=0;i<houseAreaList.length;i++){
				houseAreaList[i].key=houseAreaList[i].wsAreaId;
			}
            yield put({type: 'houseAreaList',payload:{houseAreaList,total,limit,currentPage}});
      		yield put({type: 'tab/loding',payload:false});	
          } 
      	}, 
  	},
  	subscriptions: {},
};
