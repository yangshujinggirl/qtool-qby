// const Columns = [{
//      title: '优惠券批次号',
//      dataIndex: 'couponCode',
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
//      title: '用户手机',
//      dataIndex: 'userMobile'
//    },{
//      title: '注券人',
//      dataIndex: 'voucher'
//    },{
//      title: '注券状态',
//      dataIndex: 'voucherStatus'
//    },{
//      title: '失败原因',
//      dataIndex: 'failReason'
//    },{
//      title: '注券时间',
//      dataIndex: 'voucherTime'
//    }
//  }];

const Columns = [{
     title: '订单号',
     dataIndex: 'orderNo',
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
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,'detail')}>处理</a>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,'edit')}>编辑</a>
         </div>
       )
     }
 }];

 export default Columns
