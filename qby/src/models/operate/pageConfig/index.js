import { getListApi } from '../../../services/operate/pageConfig/index'
export default{
  namespace:'pageConfig',
  state:{
    dataList:[],
    limit:15,
    currentPage:0,
    total:0,
  },
  reducers:{
    getList(state,{payload:{dataList,limit,currentPage,total} }){
      return { ...state, dataList,limit,currentPage,total}
    },
  },
  effects:{
    //页面list
    *fetchList({payload:values},{call,put}){
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code == '0'){
        const { pdConfigureList, currentPage, limit, total } = result;
        pdConfigureList && pdConfigureList.map((item,index)=>{
          item.key = index;
          return item;
        })
        yield put({
          type:'getList',
          payload:{
            dataList:pdConfigureList,
            currentPage,
            limit,
            total,
          }
        });
      };
    },
  },
}
