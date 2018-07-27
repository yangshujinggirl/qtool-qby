
import { getListApi } from '../../services/cooperate/marketResource'
export default {
    namespace: 'marketResource',
    state:{
      dataList:[],
      currentPage:0,
      limit:15,
      total:0,
      disabled:false
    },
    reducers:{
      changeStatus(state,{payload:disabled}){
        let rrr = {...state,disabled};
        return {...state,disabled}
      },
      getList(state,{payload:{dataList, currentPage, limit, total} }){
        return { ...state,dataList, currentPage, limit, total}
      },
      searchData(state,{payload:values}){
        return {...state,values}
      }
    },
    effects:{
        *fetchList({payload:values},{call, put}) {
            const result =  yield call( getListApi,values );
            if(result.code == '0'){
              const { marketRes, currentPage, limit, total } = result;
              yield put ({
                type: 'getList',
                payload:{
                  dataList:marketRes,
                  currentPage,
                  limit,
                  total,
                  // disabled:false
                }
              });
            };
        },
    },
}
