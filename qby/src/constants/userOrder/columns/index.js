
const Columns = [{
     title: '订单号',
     dataIndex: 'orderNo',
   },{
     title: '门店名称',
     dataIndex: 'shopName'
   }, {
     title: '订单类型',
     dataIndex: 'qtySum'
   },{
     title: '用户类型',
     dataIndex: 'amountSum'
   },{
     title: '结算金额',
     dataIndex: 'statusStr'
   },{
     title: '流程状态',
     dataIndex: 'sourceName'
   },{
     title: '操作',
     dataIndex: '',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,'detail')}>详情</a>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,'edit')}>编辑</a>
         </div>
       )
     }
   }];

   export default Columns;
