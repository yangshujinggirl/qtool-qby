
import {getListApi} from '../../services/cooperate/marketResource'
import {addStaffApi} from '../../services/cooperate/marketResource'
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
            // yield put({
            //   type:'changeStatus',
            //   payload:true
            // })
            values = Object.assign(
              {"dateStart":"2018-06-13 00:00:00","dateEnd":"2018-07-12 23:59:59"},
            values)
            const result =  yield call( getListApi,values );
            if(result.code == '0'){
              const { spOrders, currentPage, limit, total } = result;
              yield put ({
                type: 'getList',
                payload:{
                  dataList:spOrders,
                  currentPage,
                  limit,
                  total,
                  // disabled:false
                }
              });
            };
        },
        *addStaff({payload:values},{call,put}){
          debugger
          const result = yield call(addStaffApi,values)
          if(result.code == '0'){

          }
        }
    },
}
