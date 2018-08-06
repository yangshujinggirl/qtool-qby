import { getListApi,InjectRecordApi } from '../../../services/activity/coupon'
export default{
  namespace:'coupon',
  state:{},
  reducers:{
    getList(state,{payload:{dataList, currentPage, limit, total} }){
      return { ...state, dataList, currentPage, limit, total}
    },
    getInjectList(state,{payload:{dataList, currentPage, limit, total} }){
      return { ...state, dataList, currentPage, limit, total}
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
        for(var i=0;i<iPdCoupon.length;i++){
          iPdCoupon[i].key = iPdCoupon[i].couponId;
        };
        yield put({
          type:'getList',
          payload:{
            dataList:iPdCoupon,
            currentPage,
            limit,
            total,
          }
        });
      };
    },
    //注券记录list
    *fetchAddCouponList({payload:values},{call,put}){
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(InjectRecordApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code == '0'){
        const { iPdCoupon, currentPage, limit, total } = result;
        for(var i=0;i<iPdCoupon.length;i++){
          iPdCoupon[i].key = iPdCoupon[i].couponId;
        };
        yield put({
          type:'getInjectList',
          payload:{
            dataList:iPdCoupon,
            currentPage,
            limit,
            total,
          }
        });
      };
    },
  },
}
