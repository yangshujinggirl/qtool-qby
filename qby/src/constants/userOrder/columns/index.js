
const Columns = [{
     title: '订单号',
     dataIndex: 'orderNo',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>{text}</a>
         </div>
       )
     }
   },{
     title: '门店名称',
     dataIndex: 'spShopName'
   }, {
     title: '订单类型',
     dataIndex: 'typeStr'
   },{
     title: '用户类型',
     dataIndex: 'statusStr'
   },{
     title: '结算金额',
     dataIndex: 'amountSum'
   },{
     title: '流程状态',
     dataIndex: 'orderStatusStr'
   },{
     title: '订单时间',
     dataIndex: 'createTime'
   }];

   export default Columns;
