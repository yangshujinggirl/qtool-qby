const deliveryMap={
  '1':'门店自提',
  '2':'同城配送',
  '3':'快递邮寄',
}
const Columns = [{
     title: '订单号',
     dataIndex: 'orderNo',
     key: 'orderNo',
     render:(text,record)=> {
       return<span className="theme-color" style={{'cursor':'pointer'}} onClick={()=>record.onOperateClick()}>{record.orderNo}</span>
     }
   }, {
     title: '门店名称',
     dataIndex: 'spShopName',
     key: 'spShopName',
   },{
     title: '配送方式',
     dataIndex: 'deliveryType',
     key: 'deliveryType',
     render:(text,record)=> {
       return deliveryMap[record.deliveryType]
     }
   },{
     title: '订单状态',
     dataIndex: 'incomeStatusStr',
     key: 'incomeStatusStr',
   },{
     title: '费用类型',
     dataIndex: 'costTypeStr',
     key: 'costTypeStr',
   },{
     title: '商品金额',
     dataIndex: 'amountSum',
     key: 'amountSum',
   },{
     title: '用户支付配送费',
     dataIndex: 'standardExpressAmount',
     key: 'standardExpressAmount',
   },{
     title: '顺丰收取配送费',
     dataIndex: 'shunFengExpressAmount',
     key: 'shunFengExpressAmount',
   },{
     title: '销售收款',
     dataIndex: 'salesReceipts',
     key: 'salesReceipts',
   },{
     title: '收支生成时间',
     dataIndex: 'createTime',
     key: 'createTime',
   }];
export default Columns;
