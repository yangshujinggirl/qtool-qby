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
      // let [currentPage,limit,total]= [1,1,1];
      // const auditOrders =[{
      //   ecOrderId: 332,
      //   ecSuborderId: 9820,
      //   ecSuborderNo: "YH021810200000100001",
      //   iconType: 1,
      //   iconTypeRemark: "啊啊啊啊",
      //   nameSign: null,
      //   nameSignStr: null,
      //   outNo: "E20181020135231047800001",
      //   paySign: null,
      //   paySignStr: null,
      //   payTime: "2018-10-20 13:54:01",
      //   sendingSign: null,
      //   sendingSignStr: null,
      //   suborderAmount: "120.00",
      //   suborderPayAmount: "0.00",
      //   sumQty: 1,
      //   children:[
      //     {amount: "120.00",code: "20006",displayName: null,name: "有赞商品006",payAmount: "0.00",pdSkuId: 27898,pdSpuId: 26094,price: "120.00",qty: 1},
      //     {code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,surpulssumQty:3,sellprice:'23.10',price:'20.20',payAmount:"49.33"},
      //     {code:'s123232412',name:'小黄鸭泡沫洗脸洗手液250ml*2',displayName:'900g',qty:3,surpulssumQty:3,sellprice:'23.10',price:'20.20',payAmount:"49.44"},
      //   ]
      // }]
      //   auditOrders.map((item,index)=>{
      //     item.children.map((subItem,subIndex) => {
      //       subItem.key=10*(index+1)+subIndex+1;
      //       subItem.len=item.children.length;
      //       subItem.orderMoney=item.suborderAmount;
      //       subItem.actmoney=item.suborderPayAmount;
      //       return subItem;
      //     });
      //     item.key = index+1;
      //     return item;
      //   });
      //   yield put({
      //      type:'getList',
      //      payload:{
      //        dataSource:auditOrders,
      //        currentPage,
      //        limit,
      //        total,
      //      }
      //  });
      //  yield put({
      //    type:'clearSelect',
      //    payload:{
      //      selectedRowKeys:[]
      //    }
      //  });
      let auditOrders = [];
      yield put({
         type:'getList',
         payload:{
           dataSource:auditOrders,
         }
     });
      const result =  yield call(getListApi,values);
      if(result.code == '0'){
        const { currentPage, limit, total } = result;
        auditOrders = result.auditOrders;
        auditOrders.map((item,index)=>{
          item.children.map((subItem,subIndex) => {
            subItem.key=1000*(index+1)+subIndex+1+"";
            subItem.len=item.children.length;
            subItem.orderMoney=item.suborderAmount;
            subItem.actmoney=item.suborderPayAmount;
            return subItem;
          });
          item.key = index+1+"";
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
      };
    }
  }
}
