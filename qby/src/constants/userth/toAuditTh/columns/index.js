const Columns = [{
     title: '退单号',
     dataIndex: 'orderNo',
   },{
     title: '用户电话',
     dataIndex: 'spShopName'
   },{
     title: '订单类型',
     dataIndex: 'nickName'
   }, {
     title: '退款类型',
     dataIndex: 'mobilePhone'
   },{
     title: '退款金额',
     dataIndex: 'qtySum'
   },{
     title: '创建时间',
     dataIndex: 'amountSum'
   },{
     title: '操作',
     dataIndex:'operate',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>审核</a>
         </div>
       )
     }
   }];
   export  default Columns
