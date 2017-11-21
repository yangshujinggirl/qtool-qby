import {GetServerData} from '../services/services';
export default {
    namespace: 'wsPositionManage',
    state: {
        values:{},
        wsArea:{
            code:"",
            name:"",
            status:1,
            wsAreaId:null
        },
        limit:10,
        currentPage:0,
        total:0,
        housePositionList:[]
    },
    reducers: {
        synchronous(state, { payload:values}) {
            return {...state,values}
        },
        housePositionList(state, { payload:{housePositionList,total}}) {
            return {...state,housePositionList,total}
        },
        refreshwsArea(state, { payload:wsArea}){
            return {...state,wsArea}
        }
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            if(result.code=='0'){
                const housePositionList = result.wsBins;
                const limit=result.limit;
                const currentPage=result.currentPage;
                const total=result.total;
                for(var i=0;i<housePositionList.length;i++){
                    housePositionList[i].key=housePositionList[i].wsBinId;
                }
                yield put({type: 'housePositionList',payload:{housePositionList,total,limit,currentPage}});
                yield put({type: 'tab/loding',payload:false});	
            } 
        }, 
                    
        *getInfo({payload: values }, { call, put}){
            yield put({type: 'refreshwsArea',payload:values});
        }
    },
    subscriptions: {},
};
