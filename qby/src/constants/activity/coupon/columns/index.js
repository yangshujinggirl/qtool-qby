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
     title: '优惠券场景',
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
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,"edit")}>{text}</a>
         </div>
     )}
   },{
     title: '优惠券状态',
     dataIndex: 'statusStr'
   },{
     title: '创建人',
     dataIndex: 'creater'
   },{
     title: '创建时间',
     dataIndex: 'createTime'
   }];

 export default Columns
