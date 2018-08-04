const Columns = [{
     title: '反馈编号',
     dataIndex: 'feedbackNo',
   },{
     title: '反馈问题',
     dataIndex: 'remark'
   }, {
     title: '用户手机号',
     dataIndex: 'userTel'
   },{
     title: '反馈状态',
     dataIndex: 'statusStr'
   },{
     title: '反馈时间',
     dataIndex: 'createTime'
   },{
     title: '处理时长',
     dataIndex: 'handleTime',
     render:(text, record)=>{
       return(
         <span>{text}h</span>
       )
     }
   },{
     title: '操作',
     dataIndex: '',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,'detail')}>处理</a>
         </div>
       )
     }
 }];



 export default Columns
