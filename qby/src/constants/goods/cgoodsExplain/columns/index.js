const Columns = [{
     title: '简称',
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
     title: '详细说明',
     dataIndex: 'opstatusStr',
     render:(text,record)=>{
       return(
          text.length>100
         ?
          <p>{text.slice(0,100)+'...'}</p>
         :
          <p>{text}</p>
       )
     }
   }, {
     title: '权重',
     dataIndex: 'statusStr'
   },{
     title: '最后修改人',
     dataIndex: 'updateUserName'
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
