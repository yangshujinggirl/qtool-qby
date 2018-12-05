const Columns = [{
     title: '图片',
     dataIndex: 'url',
     render:(text,record)=>{
       const fileDomain = eval(sessionStorage.getItem('fileDomain'));
       return(
         <img style={{'width':'102px','height':'102px'}} src={fileDomain+text}/>
       )
     }
   },{
     title: '品牌名称',
     dataIndex: 'name'
   }, {
     title: '品牌权重',
     dataIndex: 'rank'
   },{
     title: '品牌状态',
     dataIndex: 'statusStr'
   },{
     title: 'C端品牌馆',
     dataIndex: 'eventStatusStr'
   },{
     title: '创建时间',
     dataIndex: 'createTime'
   },{
     title: '操作',
     dataIndex: '',
     render:(text, record)=>{
       return(
         <div>
         {record.status==1?
            <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>修改</a>:null
         }
         </div>
       )
     }
 }];
 export default Columns
