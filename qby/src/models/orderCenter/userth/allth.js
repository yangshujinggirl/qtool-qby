import { getListApi } from '../../../services/orderCenter/userth/allth';

export default {
  namespace:'allth',
  state: {
    dataList:[],
    currentPage:0,
    limit:15,
    total:0,
    selectedRowKeys:[]
  },
  reducers: {
    getList( state, { payload : {dataList, currentPage, limit, total} }) {
      return { ...state, dataList, currentPage, limit, total}
    },
    clearSelect(state,{payload:{selectedRowKeys}}){
      return { ...state,selectedRowKeys}
    }
  },
  effects: {
    *fetchList({ payload: values }, { call, put ,select}) {
      yield put({type: 'tab/loding',payload:true});
      const result=yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code=='0') {
        const { pdOrderReturnList, currentPage, limit, total } = result;
        pdOrderReturnList.map((item,index)=>{
          item.key = index;
        })
        yield put ({
          type: 'getList',
          payload:{
            dataList:pdOrderReturnList,
            currentPage,
            limit,
            total
          }
        });
        yield put({
          type:'clearSelect',
          payload:{
            selectedRowKeys:[]
          }
        });
      };
    }
  }
}
