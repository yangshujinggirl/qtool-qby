const Columns = [{
     title: '订单号',
     dataIndex: 'orderNo',
     // render:(text, record)=>{
     //   return(
     //     <div>
     //       <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>{text}</a>
     //     </div>
     //   )
     // }
   },{
     title: '门店名称',
     dataIndex: 'shopName'
   },{
     title: '门店类型',
     dataIndex: 'shopTypeStr',
   },{
     title: '费用类型',
     dataIndex: 'shareTypeStr'
   }, {
     title: '商品实付金额',
     dataIndex: 'amountSum'
   },{
     title: '商品成本',
     dataIndex: 'costAmount'
   },{
     title: '用户支付快递费',
     dataIndex: 'expressAmount'
   },{
     title: '仓库发货快递费',
     dataIndex: 'wsExpressAmount'
   },{
     title: '分润金额',
     dataIndex: 'shareProfitAmount'
   },{
     title: '生成时间',
     dataIndex:'createTime',
   }];
   export  default Columns
