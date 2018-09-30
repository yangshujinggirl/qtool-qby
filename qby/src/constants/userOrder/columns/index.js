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
   },{
     title: '用户昵称',
     dataIndex: 'nickName'
   }, {
     title: '用户电话',
     dataIndex: 'mobilePhone'
   },{
     title: '商品数量',
     dataIndex: 'qtySum'
   },{
     title: '订单金额',
     dataIndex: 'amountSum'
   },{
     title: '用户支付金额',
     dataIndex: 'payAmount'
   },{
     title: '流程状态',
     dataIndex: 'orderStatusStr'
   },{
     title: '订单时间',
     dataIndex: 'createTime'
   }];

   export  default Columns
