import { getListApi } from '../../../services/operate/themeAct/index'
export default{
  namespace:'themeAct',
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
        themeActivityList:[
          {themeName:'111',themeActivityId:1,themeStatus:0,themeStatusStr:'未开始',rank:0,showTimeStart:'',linkAddress:'',createTime:'2017',operator:'yulu',operation:0,showTimeEnd:'2017-07-31 00:00:00',endTime:'2017-07-31 23:59:59'},
          {themeName:'111',themeActivityId:1,themeStatus:1,themeStatusStr:'进行中',rank:1,showTimeStart:'',linkAddress:'',createTime:'2017',operator:'yulu',operation:0,showTimeEnd:'2017-07-31 00:00:00',endTime:'2017-07-31 23:59:59'},
          {themeName:'111',themeActivityId:1,themeStatus:2,themeStatusStr:'已结束',rank:2,showTimeStart:'',linkAddress:'',createTime:'2017',operator:'yulu',operation:0,showTimeEnd:'2017-07-31 00:00:00',endTime:'2017-07-31 23:59:59'},
          {themeName:'111',themeActivityId:1,themeStatus:3,themeStatusStr:'已失效',rank:3,showTimeStart:'',linkAddress:'',createTime:'2017',operator:'yulu',operation:0,showTimeEnd:'2017-07-31 00:00:00',endTime:'2017-07-31 23:59:59'},
        ]
      }
      yield put({type: 'tab/loding',payload:false});
      if(result.code == '0'){
        const { themeActivityList, currentPage, limit, total } = result;
        themeActivityList&&themeActivityList.map((item,index)=>{
          item.key = index;
          return item;
        })
        yield put({
          type:'getList',
          payload:{
            dataList:themeActivityList,
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
