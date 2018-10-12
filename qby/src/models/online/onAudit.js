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
      const auditOrders =[{
        ecOrderId:1,
        ecSuborderId:1,
        iconType:1,
        iconTypeRemark:"xcsxcd",
        nameSign:1,
        nameSignStr:"fjff",
        paySign:1,
        paySignStr:'111',
        sendingSign:1,
        sendingSignStr:"www",
        ecSuborderNo:111,
        outNo:1111,
        sumQty:4,
        suborderAmount:"99.10",
        suborderPayAmount:"99.10",
        payTime:'2018-09-28 09:45:23',
        children:[
          {code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,surpulssumQty:3,sellprice:'23.10',price:'20.20',payAmount:"49.22"},
          {code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,surpulssumQty:3,sellprice:'23.10',price:'20.20',payAmount:"49.33"},
          {code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,surpulssumQty:3,sellprice:'23.10',price:'20.20',payAmount:"49.44"},
        ]
      },{
        nameSign:1,
        nameSignStr:"fjff",
        paySign:1,
        paySignStr:'111',
        sendingSign:0,
        sendingSignStr:"",
        ecOrderId:1,
        ecSuborderId:2,
        iconType:0,
        iconTypeRemark:"",
        sign:1,
        ecSuborderNo:111,
        outNo:1111,
        sumQty:4,
        payTime:20180928,
        suborderAmount:"99.10",
        suborderPayAmount:"99.10",
        children:[
          {skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23',amount:'20',payAmount:"11.00"},
          {skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23',amount:'20',payAmount:"11.00"},
          {skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23',amount:'20',payAmount:"11.00"},
        ]
      },{
        ecOrderId:1,
        ecSuborderId:3,
        iconType:1,
        iconTypeRemark:"兴兴",
        nameSign:1,
        nameSignStr:"fjff",
        paySign:1,
        paySignStr:'111',
        sendingSign:0,
        sendingSignStr:"",
        sign:1,
        key:3,
        ecSuborderNo:111,
        outNo:1111,
        sumQty:4,
        payTime:20180928,
        suborderAmount:"99.00",
        suborderPayAmount:"99.00",
        children:[
          {skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23.22',amount:'20',payAmount:"11.00"},
          {skuCode:111,name:'affff',displayName:'vdv',qty:'1',price:'23.22',amount:'20',payAmount:"11.00"}
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
        // yield put({
        //   type:'clearSelect',
        //   payload:{
        //     selectedRowKeys:[]
        //   }
        // });
      // };
      auditOrders.map((item,index)=>{
        item.children.map((subItem,subIndex) => {
          subItem.key=10*(index+1)+subIndex+1;
          subItem.orderMoney=item.suborderAmount;
          subItem.actmoney=item.suborderPayAmount;
          return subItem;
        });
        item.key = index+1;
        return item;
      });
      yield put({
         type:'getList',
         payload:{
           dataSource:auditOrders,
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
