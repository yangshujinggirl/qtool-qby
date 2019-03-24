import { getListApi,InjectRecordApi } from '../../../services/operate/bDown/index'
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
    //优惠券list
    *fetchList({payload:values},{call,put}){
      yield put({type: 'tab/loding',payload:true});
      // const result = yield call(getListApi,values);
      const result = {
        code:'0',
        total:4,
        limit:15,
        currentPage:0,
        activityList:[
          {no:'111',activityId:1,name:'52活动',status:0,statusStr:'未开始',lastUpdateUser:'yulu',beginTime:'2017-07-31 00:00:00',endTime:'2017-07-31 23:59:59'},
          {no:'111',activityId:2,name:'52活动',status:1,statusStr:'进行中',lastUpdateUser:'yulu',beginTime:'2017-07-31 00:00:00',endTime:'2017-07-31 23:59:59'},
          {no:'111',activityId:3,name:'52活动',status:2,statusStr:'已结束',lastUpdateUser:'yulu',beginTime:'2017-07-31 00:00:00',endTime:'2017-07-31 23:59:59'},
          {no:'111',activityId:4,name:'52活动',status:3,statusStr:'已失效',lastUpdateUser:'yulu',beginTime:'2017-07-31 00:00:00',endTime:'2017-07-31 23:59:59'},
        ]
      }
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
    //注券记录list
    *fetchAddCouponList({payload:values},{call,put}){
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(InjectRecordApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code == '0'){
        const { iPdCoupon, currentPage, limit, total } = result;
        iPdCoupon.map((item,index)=>{
          item.key = index;
          return item;
        });
        yield put({
          type:'getInjectList',
          payload:{
            data2:{
              dataList:iPdCoupon,
              currentPage,
              limit,
              total,
            },
          }
        });
      };
    },
  },
}
