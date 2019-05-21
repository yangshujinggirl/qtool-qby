 const Columns1 = [{
     title: '仓库名称',
     dataIndex: 'name',
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
     dataIndex: 'cname',
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
     dataIndex: 'dispExp',
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
     dataIndex: 'pushPlatformStr'
   },{
     title: '出货方式',
     dataIndex:'shipmentType',
     render:(text,record,index)=>(
       <span>{text==1?'保税仓发货':(text==2?海外直邮:(text==3?'虚拟发货':''))}</span>
     )
   },{
     title: '状态',
     dataIndex: 'statusStr'
   },{
     title: '最后修改人',
     dataIndex: 'userName'
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
 const Columns2 = [{
     title: '仓库名称',
     dataIndex: 'name',
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
     dataIndex: 'cname',
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
     dataIndex: 'dispExp',
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
     dataIndex: 'pushPlatformStr'
   },{
     title: '状态',
     dataIndex: 'statusStr'
   },{
     title: '最后修改人',
     dataIndex: 'userName'
   },{
     title: '操作',
     dataIndex: '',
 }];
 export {Columns1,Columns2}
