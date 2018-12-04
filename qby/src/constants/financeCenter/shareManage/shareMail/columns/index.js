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
     title: '费用类型',
     dataIndex: 'orderId'
   }, {
     title: '商品金额',
     dataIndex: 'mobilePhone'
   },{
     title: '商品成本',
     dataIndex: 'qtySum'
   },{
     title: '用户支付快递费',
     dataIndex: 'spShopId'
   },{
     title: '仓库发货快递费',
     dataIndex: 'amountSum'
   },{
     title: '分润金额',
     dataIndex: 'nickName'
   },{
     title: '生成时间',
     dataIndex:'operate',
   }];
   export  default Columns
