const Columns1 = [{
     title: '图片',
     dataIndex: 'url',
     render:(text,record)=>{
       const fileDomain = eval(sessionStorage.getItem('fileDomain'));
       return(
         <img
          style={{'width':'102px','height':'102px'}}
          src={text ? (fileDomain+text) : require('../../../../assets/img_brandnologo.png')}/>
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
     title: '预览链接',
     dataIndex: 'configureUrl',
     render:(text, record, index)=> {
        const url = 'http://v5.qby.testin.qtoolsbaby.net:81/config.html?pdConfigureId='+record.pdConfigureId;
        return(
          <a className="theme-color" target='_blank' href={url}>
           {text}
         </a>)
     }
   },{
     title: '跳转页面编码',
     dataIndex: 'configureCode'
   },{
     title: '创建时间',
     dataIndex: 'createTime'
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
      title: '图片',
      dataIndex: 'url',
      render:(text,record)=>{
        const fileDomain = eval(sessionStorage.getItem('fileDomain'));
        return(
          <img
           style={{'width':'102px','height':'102px'}}
           src={text ? (fileDomain+text) : require('../../../../assets/img_brandnologo.png')}/>
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
    }];
 export {Columns1,Columns2}
