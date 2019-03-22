const Columns = [{
     title: '订单号',
     dataIndex: 'orderNo',
     // render:(text, record)=>{
     //   return(
     //     <div>
     //       <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,'detail1')}>{text}</a>
     //     </div>
     //   )
     // }
   },{
     title: '门店名称',
     dataIndex: 'shopName',
   },{
     title: '门店类型',
     dataIndex: 'shopTypeStr',
   },{
     title: '费用类型',
     dataIndex: 'shareTypeStr'
   }, {
     title: '商品名称',
     dataIndex: 'spuName'
   },{
     title: '商品编码',
     dataIndex: 'code'
   },{
     title: '商品售价',
     dataIndex: 'salePrice'
   },{
     title: '商品数量',
     dataIndex: 'qty'
   },{
     title: '分润比例',
     dataIndex: 'shareRatio'
   },{
     title: '分润金额',
     dataIndex: 'shareProfitAmount'
   },{
     title: '收支生成时间',
     dataIndex: 'createTime'
   },];
   export  default Columns
