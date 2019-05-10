import { getListApi } from '../../../services/operate/bActPrice/index'
export default{
  namespace:'bDown',
  state:{
    dataList:[],
    limit:15,
    currentPage:0,
    total:0,
    selectedRowKeys:[],
  },
  reducers:{
    getList(state,{payload:{dataList,limit,currentPage,total} }){
      return { ...state, dataList,limit,currentPage,total}
    },
    clearSelect(state,{payload:{selectedRowKeys}}){
      return { ...state,selectedRowKeys}
    }
  },
  effects:{
    //b端直降list
    *fetchList({payload:values},{call,put}){
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code == '0'){
        const { activityList, currentPage, limit, total } = result;
        activityList.map((item,index)=>{
          item.key = index;
          return item;
        })
        yield put({
          type:'getList',
          payload:{
            dataList:activityList,
            currentPage,
            limit,
            total,
          }
        });
        yield put({
          type:'clearSelect',
          payload:{
            selectedRowKeys:[]
          }
        })
      };
    },
  },
}
