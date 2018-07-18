// const Columns = [{
//      title: '推送标题',
//      dataIndex: 'title',
//      render:(text, record)=>{
//        return(
//          <div>
//            <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>{text}</a>
//          </div>
//        )
//      }
//    },{
//      title: '推送类型',
//      dataIndex: 'type'
//    }, {
//      title: '推送人群',
//      dataIndex: 'targetObject'
//    },{
//      title: '创建人',
//      dataIndex: 'creater'
//    },{
//      title: '推送状态',
//      dataIndex: 'status'
//    },{
//      title: '推送时间',
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
     render:(text, record) => {
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
