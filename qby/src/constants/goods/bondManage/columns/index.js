const Columns = [{
     title: '仓库名称',
     dataIndex: 'taskName',
     render:(text,record)=>{
       return(
          text.length>15
         ?
          <p>{text.slice(0,15)+'...'}</p>
         :
          <p>{text}</p>
       )
     }
   },{
     title: 'C端展示名称',
     dataIndex: 'opstatusStr',
     render:(text,record)=>{
       return(
          text.length>15
         ?
          <p>{text.slice(0,15)+'...'}</p>
         :
          <p>{text}</p>
       )
     }
   }, {
     title: 'C端配送说明',
     dataIndex: 'statusStr',
     render:(text,record)=>{
       return(
          text.length>20
         ?
          <p>{text.slice(0,20)+'...'}</p>
         :
          <p>{text}</p>
       )
     }
   },{
     title: '推送平台',
     dataIndex: 'updateUserName'
   },{
     title: '状态',
     dataIndex: 'type'
   },{
     title: '最后修改人',
     dataIndex: 'statushot'
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
