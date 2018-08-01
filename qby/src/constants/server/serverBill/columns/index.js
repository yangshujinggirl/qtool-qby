const Columns = [{
     title: '客服单号',
     dataIndex: 'customServiceNo',
   },{
     title: '客服主题',
     dataIndex: 'customServiceTheme'
   }, {
     title: '客服人员',
     dataIndex: 'waiter'
   },{
     title: '客服状态',
     dataIndex: 'statusStr'
   },{
     title: '处理时长',
     dataIndex: 'handleTime'
   },{
     title: '开始时间',
     dataIndex: 'createTime'
   },{
     title: '操作',
     dataIndex: '',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>处理</a>
         </div>
       )
     }
 }];

// const Columns = [{
//      title: '订单号',
//      dataIndex: 'orderNo',
//    },{
//      title: '门店名称',
//      dataIndex: 'shopName'
//    }, {
//      title: '订单类型',
//      dataIndex: 'qtySum'
//    },{
//      title: '用户类型',
//      dataIndex: 'amountSum'
//    },{
//      title: '结算金额',
//      dataIndex: 'statusStr'
//    },{
//      title: '流程状态',
//      dataIndex: 'sourceName'
//    },{
//      title: '操作',
//      dataIndex: '',
//      render:(text, record)=>{
//        return(
//          <div>
//            <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>处理</a>
//          </div>
//        )
//      }
//  }];

 export default Columns
