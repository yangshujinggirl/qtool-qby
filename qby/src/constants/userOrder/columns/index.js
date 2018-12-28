const platformMap={
  '1':'Qtools App ios端',
  '2':'Qtools App  安卓端',
  '3':'小程序',
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
     title: '订单类型',
     dataIndex: 'orderTypeStr',
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
     dataIndex: 'payAmount'
   },{
     title: '订单状态',
     dataIndex: 'qbOrderStatusStr',
   },{
     title: '优惠金额',
     dataIndex: 'discountAmount'
   },{
     title: '流程状态',
     dataIndex: 'orderStatusStr'
   },{
     title: '支付方式',
     dataIndex: 'payTypeStr',
   },{
     title: '下单时间',
     dataIndex: 'createTime'
   }];
   export  default Columns
