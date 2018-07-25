const Columns = [{
     title: '定时名称',
     dataIndex: 'taskName',
   },{
     title: '定时操作',
     dataIndex: 'opstatusStr'
   }, {
     title: '状态',
     dataIndex: 'statusStr'
   },{
     title: '最后修改人',
     dataIndex: 'updateUserName'
   },{
     title: '定时时间',
     dataIndex: 'taskTime'
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
