
const Columns = [{
     title: '用户id',
     dataIndex: 'userId',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>{text}</a>
         </div>
       )
     }
   },{
     title: 'Qtools昵称',
     dataIndex: 'name'
   },,{
     title: '微信昵称',
     dataIndex: 'unionId'
   },{
     title: '手机号',
     dataIndex: 'mobile',
   },{
     title: '注册时间',
     dataIndex: 'createTime'
   },{
     title: '首次绑定手机号时间',
     dataIndex: 'bindingMobileTime'
   },{
     title: '最近一次消费时间',
     dataIndex: 'latelyOrderTime'
   },{
     title: '累积消费金额',
     dataIndex: 'amountSum'
   },{
     title: '购买次数',
     dataIndex: 'purchaseTimes'
   }];
   export  default Columns
