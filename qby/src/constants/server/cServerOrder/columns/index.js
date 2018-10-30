const Columns = [{
     title: '工单id',
     key:'ticketId',
     dataIndex: 'ticketId',
     render:(text, record, index)=> {
       return <span
         className="theme-color pointer"
         onClick={()=>record.onOperateClick(record)}>{record.ticketId}</span>
     }
   },{
     title: '主题',
     dataIndex: 'subject',
     key: 'subject',
   },{
     title: '状态',
     dataIndex: 'status',
     key: 'status',
   }, {
     title: '优先级',
     dataIndex: 'priority',
     key: 'priority',
   },{
     title: '渠道',
     dataIndex: 'channel',
     key: 'channel',
   },{
     title: '用户电话',
     dataIndex: 'cellPhone',
     key: 'cellPhone'
   },{
     title: '受理客服',
     dataIndex: 'agentGroupName',
     key: 'agentGroupName',
   },{
     title: '创建时间',
     dataIndex: 'createrTime',
     key: 'createrTime',
   }];

export default Columns
