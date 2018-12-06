
const Columns = [{
     title: '用户id',
     dataIndex: 'orderNo',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>{text}</a>
         </div>
       )
     }
   },{
     title: '昵称',
     dataIndex: 'spShopName'
   },{
     title: '手机号',
     dataIndex: 'platform',
   },{
     title: '微信Id',
     dataIndex: 'delivery',
   },{
     title: '注册时间',
     dataIndex: 'nickName'
   }, {
     title: '首次绑定手机号时间',
     dataIndex: 'mobilePhone'
   },{
     title: '最近一次消费时间',
     dataIndex: 'qtySum'
   },{
     title: '累积消费金额',
     dataIndex: 'payAmount'
   },{
     title: '购买次数',
     dataIndex: 'discountAmount'
   }];
   export  default Columns
