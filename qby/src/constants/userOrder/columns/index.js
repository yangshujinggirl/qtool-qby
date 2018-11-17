const platformMap={
  '1':'IOS',
  '2':'ANDROID',
  '3':'APPLET',
}
const deliveryMap={
  '1':'门店自提',
  '2':'同城配送',
  '3':'快递邮寄',
}

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
     title: '下单平台',
     dataIndex: 'platform',
     render:(text,record)=> {
       return platformMap[record.platform]
     }
   },{
     title: '配送方式',
     dataIndex: 'delivery',
     render:(text,record)=> {
       return deliveryMap[record.platform]
     }
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
