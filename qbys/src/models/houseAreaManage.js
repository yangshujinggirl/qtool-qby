import {GetServerData} from '../services/services';
export default {
    namespace: 'houseAreaManage',
    state: {
        values:{},
        wsArea:{
            code:"",
            name:"",
            status:1,
            wsAreaId:null
        },
        limit:15,
        currentPage:0,
        total:0,
        houseAreaList:[]
    },
    reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		houseAreaList(state, { payload:{houseAreaList,total,limit,currentPage}}) {
			return {...state,houseAreaList,total,limit,currentPage}
		},
		refreshwsArea(state, { payload:wsArea}){
			return {...state,wsArea}
		}
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                const houseAreaList = result.wsAreas;
                const limit=result.limit;
                const currentPage=result.currentPage;
                const total=result.total;
                for(var i=0;i<houseAreaList.length;i++){
                    houseAreaList[i].key=houseAreaList[i].wsAreaId;
                }
                yield put({type: 'houseAreaList',payload:{houseAreaList,total,limit,currentPage}});
            } 
        }, 
                    
        *getInfo({payload: values }, { call, put}){
            yield put({type: 'refreshwsArea',payload:values});
        }
  	},
  	subscriptions: {},
};
