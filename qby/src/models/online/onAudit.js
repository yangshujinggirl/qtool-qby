import { getListApi } from '../../services/online/onAudit'
export default{
  namespace:'onAudit',
  state:{
    dataSource:[],
    selectedRowKeys:null,
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
           selectedRowKeys:null
         }
       });
      };
    }
  }
}
