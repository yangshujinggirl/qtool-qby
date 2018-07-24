// const Columns = [{
//      title: '优惠券批次号',
//      dataIndex: 'couponCode',
//      render:(text, record)=>{
           // return(
           //   <div>
           //     <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>{text}</a>
           //   </div>
           // )}
//    },{
//      title: '优惠券名称',
//      dataIndex: 'couponName'
//    }, {
//      title: '优惠券场景',
//      dataIndex: 'couponUseScene'
//    },{
//      title: '优惠券金额',
//      dataIndex: 'couponMoney'
//    },{
//      title: '使用门槛',
//      dataIndex: 'couponFullAmount'
//    },{
//      title: '优惠券总数',
//      dataIndex: 'couponCount'
//    },{
//      title: '已经发放数量',
//      dataIndex: 'couponGiveCount'
//    },{
//      title: '代金券状态',
//      dataIndex: 'status'
//    },{
//      title: '创建人',
//      dataIndex: 'creater'
//    },{
//      title: '创建时间',
//      dataIndex: 'createTime'
//    }];

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
     dataIndex: 'shopName'
   }, {
     title: '订单类型',
     dataIndex: 'qtySum'
   },{
     title: '用户类型',
     dataIndex: 'amountSum'
   },{
     title: '结算金额',
     dataIndex: 'statusStr'
   },{
     title: '流程状态',
     dataIndex: 'sourceName'
   },{
     title: '操作',
     dataIndex: '',

 }];

 export default Columns
