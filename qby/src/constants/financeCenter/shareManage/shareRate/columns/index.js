const Columns = [{
     title: '订单号',
     dataIndex: 'orderNo',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,'detail1')}>{text}</a>
         </div>
       )
     }
   },{
     title: '门店名称',
     dataIndex: 'spShopName',
   },{
     title: '费用类型',
     dataIndex: 'nickName'
   }, {
     title: '商品名称',
     dataIndex: 'mobilePhone'
   },{
     title: '商品编码',
     dataIndex: 'qtySum'
   },{
     title: '商品售价',
     dataIndex: 'amountSum'
   },{
     title: '商品数量',
     dataIndex: 'payAmount'
   },{
     title: '分润比例',
     dataIndex: 'orderStatusStr'
   },{
     title: '销售收款',
     dataIndex: 'createTime'
   },{
     title: '收支生成时间',
     dataIndex: 'userId'
   },];
   export  default Columns
