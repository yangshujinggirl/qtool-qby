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
      const result = yield call(getListApi,values);
      // const result = {
      //   code:'0',
      //   total:4,
      //   limit:15,
      //   currentPage:0,
      //   themeActivityList:[
      //     {pdThemeActivityDetail:[{themeActivityPdDetailId:1,themeActivityId:1,pdSpuId:1}],themeName:'1',themeActivityId:1,themeStatus:0,themeStatusStr:'未开始',rank:0,showTimeStart:'2019-03-02 10:34:45',pageCode:'www.baidu.com',createTime:'2017',operator:'yulu',operation:0,pics:'qtltest/spu/1903/18/1552878163157.jpg',showTimeEnd:'2019-03-02 10:34:46',endTime:'2017-07-31 23:59:59',remark:1,},
      //     {pdThemeActivityDetail:[{themeActivityPdDetailId:1,themeActivityId:1,pdSpuId:1}],themeName:'2',themeActivityId:2,themeStatus:1,themeStatusStr:'进行中',rank:1,showTimeStart:'2019-03-02 10:34:45',pageCode:'www.baidu.com',createTime:'2017',operator:'yulu',operation:0,pics:'qtltest/spu/1903/18/1552876544741.jpg',showTimeEnd:'2019-03-02 10:34:45',endTime:'2017-07-31 23:59:59',remark:4,},
      //     {pdThemeActivityDetail:[{themeActivityPdDetailId:1,themeActivityId:1,pdSpuId:1}],themeName:'3',themeActivityId:3,themeStatus:2,themeStatusStr:'已结束',rank:2,showTimeStart:'2019-03-02 10:34:45',pageCode:'www.baidu.com',createTime:'2017',operator:'yulu',operation:0,pics:'qtltest/spu/1903/08/1552013060136.jpg',showTimeEnd:'2019-03-02 10:34:42',endTime:'2017-07-31 23:59:59',remark:3,},
      //     {pdThemeActivityDetail:[{themeActivityPdDetailId:1,themeActivityId:1,pdSpuId:1}],themeName:'4',themeActivityId:4,themeStatus:3,themeStatusStr:'已失效',rank:3,showTimeStart:'2019-03-02 10:34:45',pageCode:'www.baidu.com',createTime:'2017',operator:'yulu',operation:0,pics:'qtltest/spu/1903/08/1551983287482.jpg',showTimeEnd:'2019-03-02 10:34:41',endTime:'2017-07-31 23:59:59',remark:2,},
      //   ]
      // }
      yield put({type: 'tab/loding',payload:false});
      if(result.code == '0'){
        const { pdThemeActivityList, currentPage, limit, total } = result;
        pdThemeActivityList&&pdThemeActivityList.map((item,index)=>{
          item.key = index;
          return item;
        })
        yield put({
          type:'getList',
          payload:{
            dataList:pdThemeActivityList,
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
