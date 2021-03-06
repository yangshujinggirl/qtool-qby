const Columns = [{
     title: '批次号',
     dataIndex: 'no',
     render:(text, record)=>(
       <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,"info")}>{text}</a>
     )
   },{
     title: '批次名称',
     dataIndex: 'name'
   }, {
     title: '批次状态',
     dataIndex: 'statusStr'
   },{
     title: '最后修改人',
     dataIndex: 'lastUpdateUser'
   },{
     title: '生效时间',
     dataIndex: '',
     render:(text,record,index)=>(
       <div>{record.beginTime} ~ {record.endTime}</div>
     )
   },{
     title: '操作',
     render:(text,record,index)=>(
       (record.status == '0' && record.addbActPrice) &&
       <a href='javascript:;' className='theme-color' onClick={record.onOperateClick.bind(this,'edit')}>修改</a>
     )
   }];

 export default Columns
