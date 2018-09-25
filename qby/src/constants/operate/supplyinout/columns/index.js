const Columns = [{
     title: '结算单号',
     dataIndex: 'settlementNo',
     render:(text, record)=>{
       return(
         <div>
           <a
             href="javascript:;"
             className="theme-color"
             onClick={record.onOperateClick.bind(this,'billdetail')}>
             {text}
           </a>
         </div>
       )
     }
   },{
     title: '关联订单',
     dataIndex: 'outNo',
     render:(text, record)=>{
       return(
         <div>
           <a
            href="javascript:;"
            className="theme-color"
            onClick={record.onOperateClick.bind(this,'orderDetail')}>
            {text}
            </a>
         </div>
       )
     }
   }, {
     title: '类型',
     dataIndex: 'typeStr'
   },{
     title: '是否已结算',
     dataIndex: 'statusStr'
   },{
     title: '结算到期日',
     dataIndex: 'expireDate'
   },{
     title: '供应商名称',
     dataIndex: 'name'
   },{
     title: '关联业务人员',
     dataIndex: 'userName'
   },{
     title: '应收/应付金额',
     dataIndex: 'amountSum',
     render:(text,record)=>{
       return(
         <p>
           {record.payType==10
             ? '-' + text
             : '+' + text
           }
         </p>
       )
     }
 }];
export default Columns
