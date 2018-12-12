const Columns = [{
     title: '退单号',
     dataIndex: 'orderReturnNo',
   },{
     title: '用户电话',
     dataIndex: 'userPhone'
   },{
     title: '订单类型',
     dataIndex: 'orderTypeStr'
   }, {
     title: '退款类型',
     dataIndex: 'returnTypeStr'
   },{
     title: '退款金额',
     dataIndex: 'actualReturnQuota'
   },{
     title: '创建时间',
     dataIndex: 'createTime'
   },{
     title: '操作',
     dataIndex:'operate',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>审核</a>
         </div>
       )
     }
   }];
   export  default Columns
