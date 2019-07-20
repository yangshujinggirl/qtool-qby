import { getListApi } from '../../services/cConfig/homeConfiguration/configurationList'
export default{
  namespace:'homeConfig',
  state:{
    dataList:[],
    limit:15,
    currentPage:0,
  },
  reducers:{
    getList(state,{payload:{dataList, currentPage, limit, total}}){
      dataList=[...dataList]
      return { ...state, dataList, currentPage, limit, total}
    },
  },
  effects:{
    *fetchList({payload:values},{call,put}){
      yield put({type: 'tab/loding',payload:true});
      const result =  yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code == '0'){
        const { homepageList, currentPage, limit, total } = result;
        homepageList.map((item,index) => {
          item.key = index;
          return item;
        })
        yield put({
          type:'getList',
          payload:{
            dataList:homepageList,
            currentPage,
            limit,
            total,
          }
        });
      };
    },
  }
}
