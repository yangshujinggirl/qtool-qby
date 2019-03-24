const Columns = [{
     title: '商品ID',
     key:'pdSpuActiveId',
     dataIndex: 'pdSpuActiveId',
     render:(text, record, index)=> {
       return <span
         className="theme-color pointer"
         onClick={()=>record.onOperateClick(record)}>{record.udeskTicketId}</span>
     }
   },{
     title: '商品名称',
     dataIndex: 'name',
     key: 'name',
   },{
     title: '商品零售价',
     dataIndex: 'price',
     key: 'price',
   }, {
     title: '兑换所需金币数',
     dataIndex: 'valueQty',
     key: 'valueQty',
   },{
     title: '可兑换数量',
     dataIndex: 'convertibleQty',
     key: 'convertibleQty',
   },{
     title: '剩余数量',
     dataIndex: 'leftQty',
     key: 'leftQty',
   }];

export default Columns
