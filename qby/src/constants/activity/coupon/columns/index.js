const Columns = [{
     title: '优惠券批次号',
     dataIndex: 'couponCode',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,"info")}>{text}</a>
         </div>
     )}
   },{
     title: '优惠券名称',
     dataIndex: 'couponName'
   }, {
     title: '发放方式',
     dataIndex: 'couponUseSceneStr'
   },{
     title: '优惠券金额',
     dataIndex: 'couponMoney'
   },{
     title: '使用门槛',
     dataIndex: 'couponFullAmount'
   },{
     title: '优惠券总数',
     dataIndex: 'couponCount'
   },{
     title: '已经发放数量',
     dataIndex: 'couponGiveCount',
     render:(text, record)=>{
       return(
           record.injectRecord
           ?
             <div>
               <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,"inject")}>{text}</a>
             </div>
           :
             <span>{text}</span>
       )
   }
   },{
     title: '已使用数',
     dataIndex: 'couponUsedQty'
   },{
     title: '优惠券状态',
     dataIndex: 'statusStr'
   },{
     title: '创建人',
     dataIndex: 'creater'
   },{
     title: '创建时间',
     dataIndex: 'createTime'
   },{
     title: '操作',
     dataIndex: '',
     render:(text,record,index)=>{
       return(
         (record.status==1||record.status==2) &&
         <a className='theme-color' onClick={record.onOperateClick.bind(this,'edit')}>修改</a>
       )
     }
   }];

 export default Columns
