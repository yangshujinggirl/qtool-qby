const Columns = [{
     title: '商品ID',
     key:'ticketId',
     dataIndex: 'udeskTicketId',
     render:(text, record, index)=> {
       return <span
         className="theme-color pointer"
         onClick={()=>record.onOperateClick(record)}>{record.udeskTicketId}</span>
     }
   },{
     title: '商品名称',
     dataIndex: 'subject',
     key: 'subject',
   },{
     title: '商品零售价',
     dataIndex: 'status',
     key: 'status',
   }, {
     title: '兑换所需金币数',
     dataIndex: 'priority',
     key: 'priority',
   },{
     title: '可兑换数量',
     dataIndex: 'agentGroupName',
     key: 'agentGroupName',
   },{
     title: '剩余数量',
     dataIndex: 'createrTime',
     key: 'createrTime',
   }];

export default Columns
