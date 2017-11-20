import {GetServerData} from '../services/services';
export default {
  namespace: 'warehouse',
  state: {},
  reducers: {},
  effects: {
    *fetch({ payload: {code,values} }, { call, put ,select}) {
      	const result=yield call(GetServerData,code,values);
      	if(result.code=='0'){
			  console.log(result)
      		// const accountInfo = result.urUsers;
			// const limit=values.limit
			// const currentPage=values.currentPage
			// console.log(accountInfo)
			// for(var i=0;i<accountInfo.length;i++){
			// 	accountInfo[i].key=accountInfo[i].urUserId
			// }
      		// const total=result.total
            // yield put({type: 'accountList',payload:{accountInfo,total,limit,currentPage}});
      		// yield put({type: 'tab/loding',payload:false});	
          } 
      	}, 
  	},
  	subscriptions: {},
};
