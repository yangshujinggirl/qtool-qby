const Columns = [{
     title: '问答标题',
     dataIndex: 'title',

   },{
     title: '问题类型',
     dataIndex: 'typeStr',
   }, {
     title: '问答状态',
     dataIndex: 'statusStr'
   },{
     title: '最后修改人',
     dataIndex: 'updateUrUserName'
   },{
     title: '最后修改时间',
     dataIndex: 'updateTime'
   },{
     title: '操作',
     dataIndex: 'name',
     render:(text, record)=>{
       return(
         <div>
           <a
             href="javascript:;"
             className="theme-color"
             onClick={record.onOperateClick.bind(this,'billdetail')}>
             {text}
           </a>
         </div>
       )
     }
   }];
export default Columns
