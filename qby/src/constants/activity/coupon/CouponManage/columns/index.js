const Columns = [{
     title: '券包批次号',
     dataIndex: 'couponBatchNo',
   },{
     title: '券包名称',
     dataIndex: 'couponPackageName'
   }, {
     title: '优惠券批次数',
     dataIndex: 'couponCount'
   },{
     title: '最后修改人',
     dataIndex: 'updateUserName'
   },{
     title: '创建时间',
     dataIndex: 'createTime'
   },{
     title: '操作',
     dataIndex: '',
     render:(text,record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>修改</a>
         </div>
       )
     }
   }
 ];
 export default Columns
