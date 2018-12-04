const Columns = [{
     title: '退单号',
     dataIndex: 'orderNo',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,'detail1')}>{text}</a>
         </div>
       )
     }
   },{
     title: '用户订单',
     dataIndex: 'spShopName',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,"detail2")}>{text}</a>
         </div>
       )
     }
   },{
     title: '用户电话',
     dataIndex: 'nickName'
   }, {
     title: '退款类型',
     dataIndex: 'mobilePhone'
   },{
     title: '退款方式',
     dataIndex: 'qtySum'
   },{
     title: '原订单支付金额',
     dataIndex: 'amountSum'
   },{
     title: '申请金额',
     dataIndex: 'payAmount'
   },{
     title: '实退金额',
     dataIndex: 'orderStatusStr'
   },{
     title: '退单商品数',
     dataIndex: 'createTime'
   },{
     title: '退款状态',
     dataIndex: 'userId'
   },{
     title: '创建时间',
     dataIndex: 'type'
   },];
   export  default Columns
