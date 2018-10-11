import { getListApi } from '../../services/online/onAudit'
export default{
  namespace:'onAudit',
  state:{
    dataSource:[],
    selectedRowKeys:[],
    currentPage:0,
    limit:15,
    total:null,
  },
  reducers:{
    getList(state,{payload:{dataSource, currentPage, limit, total}}){
      return { ...state, dataSource, currentPage, limit, total}
    },
    clearSelect(state,{payload:{selectedRowKeys}}){
      return { ...state,selectedRowKeys}
    }
  },
  effects:{
    *fetchList({payload:values},{call,put}){
      let [currentPage,limit,total]= [1,1,1];
      const dataSource =[{
        iconType:1,
        iconTypeRemark:"兴兴",
        sign:0,
        key:1,
        ecSuborderNo:111,
        outNo:1111,
        sumQty:4,
        suborderAmount:"99.00",
        suborderPayAmount:"99.00",
        time:'2018-09-28 09:45:23',
        children:[
          {skuCode:'s123232412',key:11,name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,surpulssumQty:3,sellprice:'23.00',price:'20.00',payAmount:"49"},
          {skuCode:'s123232412',key:12,name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,surpulssumQty:3,sellprice:'23.00',price:'20.00',payAmount:"49"},
          {skuCode:'s123232412',key:13,name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,surpulssumQty:3,sellprice:'23.00',price:'20.00',payAmount:"49"},
        ]
      },{
        iconType:1,
        iconTypeRemark:"兴兴",
        sign:1,
        key:2,
        ecSuborderNo:111,
        outNo:1111,
        sumQty:4,
        time:20180928,
        suborderAmount:"99.00",
        suborderPayAmount:"99.00",
        children:[
          {key:21,skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23',amount:'20',payAmount:1},
          {key:22,skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23',amount:'20',payAmount:1},
          {key:23,skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23',amount:'20',payAmount:1},
        ]
      },{
        iconType:1,
        iconTypeRemark:"兴兴",
        sign:1,
        key:3,
        ecSuborderNo:111,
        outNo:1111,
        sumQty:4,
        time:20180928,
        suborderAmount:"99.00",
        suborderPayAmount:"99.00",
        children:[
          {key:31,skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23',amount:'20',payAmount:1},
          {key:32,skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23',amount:'20',payAmount:1}
        ]
      },]
      // const result =  yield call(getListApi,values);
      // if(result.code == '0'){
      //   const { auditOrders, currentPage, limit, total } = result;
      //   auditOrders.map((item,index)=>{
      //     auditOrders.children.map((subItem,subIndex) => {
      //       subItem.key=10*index+1;
      //       return subItem;
      //     })
      //     item.key = index+1;
      //     return item;
      //   });
      //   yield put({
      //     type:'getList',
      //     payload:{
      //       dataList:pdAnswer,
      //       currentPage,
      //       limit,
      //       total,
      //     }
      //   });
      //   yield put({
      //     type:'clearSelect',
      //     payload:{
      //       selectedRowKeys:[]
      //     }
      //   });
      // };
      // auditOrders.map((item,index)=>{
      //   item.children.map((subItem,subIndex) => {
      //     subItem.key=10*(index+1)+subIndex+1;
      //     subItem.orderMoney=item.suborderAmount;
      //     subItem.actmoney=item.suborderPayAmount;
      //     return subItem;
      //   });
      //   item.key = index+1;
      //   return item;
      // });
      yield put({
         type:'getList',
         payload:{
           dataSource:dataSource,
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
     });
    }
  }
}
