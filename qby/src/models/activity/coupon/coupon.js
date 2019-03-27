import { getListApi,InjectRecordApi,getManageListApi } from '../../../services/activity/coupon'
export default{
  namespace:'coupon',
  state:{
    data1:{
      dataList:[]
    },
    data2:{
      dataList:[]
    },
    data3:{
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
    getManageList(state,{payload:{data3}}){
      return { ...state, data3 }
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
    //获取券包列表
    *fetchManageList({payload:values},{call,put}){
      yield put({type: 'tab/loding',payload:true});
      // const result = yield call(getManageListApi,values);
      yield put({type: 'tab/loding',payload:false});
      const result = {
        code:'0',
        couponPackageList:[{
          couponBatchNo:'1111',
          couponPackageName:'20',
          couponCount:'12',
          updateUserName:'yulu',
          createTime:'2018-9-01',
          couponPackageId:'1',
          couponCodes:'1111\n22222\n3333'
        },{
          couponBatchNo:'111',
          couponPackageName:'520',
          couponCount:'12',
          updateUserName:'yulu',
          createTime:'2018-9-01',
          couponPackageId:'2',
          couponCodes:'111\n2222\n333'
        }]
      }
      if(result.code == '0'){
        const { couponPackageList, currentPage, limit, total } = result;
        couponPackageList&&couponPackageList.map((item,index)=>{
          item.key = index;
          return item;
        });
        yield put({
          type:'getManageList',
          payload:{
            data3:{
              dataList:couponPackageList,
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
