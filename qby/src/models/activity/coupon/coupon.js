import { getListApi,InjectRecordApi } from '../../../services/activity/coupon'
export default{
  namespace:'coupon',
  state:{
    data1:{
      dataList:[]
    },
    data2:{
      dataList:[]
    },
    selectedRowKeys:[],
  },
  reducers:{
    getList(state,{payload:{data1} }){
      return { ...state, data1}
    },
    getInjectList(state,{payload:{data2} }){
      return { ...state, data2}
    },
    clearSelect(state,{payload:{selectedRowKeys}}){
      return { ...state,selectedRowKeys}
    }
  },
  effects:{
    //优惠券list
    *fetchList({payload:values},{call,put}){
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code == '0'){
        const { iPdCoupon, currentPage, limit, total } = result;
        iPdCoupon.map((item,index)=>{
          item.key = index;
          return item;
        })
        yield put({
          type:'getList',
          payload:{
            data1:{
              dataList:iPdCoupon,
              currentPage,
              limit,
              total,
            }
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
