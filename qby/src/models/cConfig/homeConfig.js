import { getListApi } from '../../services/cConfig/HomeConfig'
export default{
  namespace:'homeConfig',
  state:{
    dataList:[]
  },
  reducers:{
    getList(state,{payload:{dataList, currentPage, limit, total}}){
      return { ...state, dataList, currentPage, limit, total}
    },
  },
  effects:{
    *fetchList({payload:values},{call,put}){
      yield put({type: 'tab/loding',payload:true});
      // const result =  yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
      const result = {
        code:'0',
        currentPage:0,
        total:3,
        limit:15,
        homepageList:[{
          versionName:'520要发的首页',
          versionCode:'v2019053101',
          releaseTime:'2017-08-31 23:17:52',
          updateTime:'2017-08-31 23:17:52',
          lastUpdateUser:'zhouhongye',
          status:0,
          statusStr:'上线',
        },{
          versionName:'520要发的首页',
          versionCode:'v2019053101',
          releaseTime:'2017-08-31 23:17:52',
          updateTime:'2017-08-31 23:17:52',
          lastUpdateUser:'zhouhongye',
          status:1,
          statusStr:'草稿',
        },{
          versionName:'520要发的首页',
          versionCode:'v2019053101',
          releaseTime:'2017-08-31 23:17:52',
          updateTime:'2017-08-31 23:17:52',
          lastUpdateUser:'zhouhongye',
          status:2,
          statusStr:'待发布',
        },{
          versionName:'520要发的首页',
          versionCode:'v2019053101',
          releaseTime:'2017-08-31 23:17:52',
          updateTime:'2017-08-31 23:17:52',
          lastUpdateUser:'zhouhongye',
          status:3,
          statusStr:'下线',
        }]
      }
      if(result.code == '0'){
        const { homepageList, currentPage, limit, total } = result;
        homepageList.map((item,index) => {
          item.key = item.homepageId;
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
