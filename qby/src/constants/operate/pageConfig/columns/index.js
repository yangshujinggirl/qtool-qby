const Columns = [{
     title: '页面名称',
     dataIndex: 'pageName',
     key: 'pageName',
   },{
     title: '最后修改人',
     dataIndex: 'updateUser',
     key: 'updateUser',
   }, {
     title: '预览链接',
     dataIndex: 'previewLink',
     key: 'previewLink',
     render:(text, record, index)=> (
       <a className="theme-color" onClick={()=>record.onOperateClick(record,"detail")}>{text}</a>
     )
   },{
     title: '页面编码',
     dataIndex: 'configureCode',
     key: 'configureCode',
   },{
     title: '操作',
     render:(text, record, index)=> (
       <a className="theme-color" onClick={()=>record.onOperateClick(record,'edit')}>修改</a>
     )
   }];

export default Columns
