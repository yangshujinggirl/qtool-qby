const Columns = [{
     title: '主题名称',
     dataIndex: 'themeName',

   },{
     title: '主题状态',
     dataIndex: 'themeStatusStr'
   }, {
     title: '权重',
     dataIndex: 'rank'
   },{
     title: '展示时间',
     render:(text,record,index)=> (
       <span>{record.showTimeStart}~{record.showTimeEnd}</span>
     )
   },{
     title: '预览链接',
     dataIndex: 'pageCode',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,"prev")}>{text}</a>
         </div>
     )}
   },{
     title: '创建时间',
     dataIndex: 'createTime'
   },{
     title: '最后修改人',
     dataIndex: 'operator'
   },{
     title: '操作',
     dataIndex: '',
     render:(text,record,index)=>{
       return(
         record.operation==0&&
         <a className='theme-color' onClick={record.onOperateClick.bind(this,'edit')}>修改</a>
       )
     }
   }];

 export default Columns