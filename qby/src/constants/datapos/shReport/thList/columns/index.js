const Columns = [{
     title: '退货单号',
     dataIndex: 'asnNo',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>{text}</a>
         </div>
       )
     }
   },{
     title: '关联门店订单',
     dataIndex: 'spOrderNo'
   },{
     title: '退货商品总数',
     dataIndex: 'qtySum',
   },{
     title: '订单状态',
     dataIndex: 'statusStr',
   },{
     title: '退货时间',
     dataIndex: 'createTime'
   }, {
     title: '退货完成时间',
     dataIndex: 'updateTime'
   }];
   export  default Columns
