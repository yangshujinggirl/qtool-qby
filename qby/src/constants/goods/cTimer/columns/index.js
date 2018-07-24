// const Columns = [{
//      title: '定时名称',
//      dataIndex: 'feedbackNo',
//    },{
//      title: '定时操作,
//      dataIndex: 'remark'
//    }, {
//      title: '状态',
//      dataIndex: 'userTel'
//    },{
//      title: '最后修改人',
//      dataIndex: 'status'
//    },{
//      title: '定时时间',
//      dataIndex: 'createTime'
//    },{
//      title: '操作',
//      dataIndex: '',
//      render:(text, record)=>{
//        return(
//          <div>
//            <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>修改</a>
//          </div>
//        )
//      }
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
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>修改</a>
         </div>
       )
     }
 }];

 export default Columns
