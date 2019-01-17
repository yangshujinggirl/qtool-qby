const Columns = [{
     title: '退单号',
     dataIndex: 'orderReturnNo',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,'detail1')}>{text}</a>
         </div>
       )
     }
   },{
     title: '用户订单',
     dataIndex: 'orderNo',
     render:(text, record) => {
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,"detail2")}>{text}</a>
         </div>
       )
     }
   },{
     title: '用户电话',
     dataIndex: 'userMoblie'
   }, {
     title: '退款类型',
     dataIndex: 'returnTypeStr'
   },{
     title: '退款方式',
     dataIndex: 'returnWayStr'
   },{
     title: '原订单支付金额',
     dataIndex: 'payMount'
   },{
     title: '申请金额',
     dataIndex: 'expectAmount'
   },{
     title: '实退金额',
     dataIndex: 'actualAmount'
   },{
     title: '退单商品数',
     dataIndex: 'qtySum'
   },{
     title: '退款状态',
     dataIndex: 'returnStatusStr'
   },{
     title: '创建时间',
     dataIndex: 'createTime'
   },];
   export  default Columns
