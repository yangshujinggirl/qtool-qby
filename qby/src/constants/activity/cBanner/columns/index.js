// const Columns = [{
//      title: 'banner名称',
//      dataIndex: 'name',
//    },{
//      title: 'banner id',
//      dataIndex: 'bannerNum'
//    }, {
//      title: '状态',
//      dataIndex: 'status'
//    },{
//      title: '创建人',
//      dataIndex: 'urUser'
//    },{
//      title: '创建时间',
//      dataIndex: 'createTime'
//    },{
//      title: '修改人',
//      dataIndex: 'updateUrUser'
//    },{
//      title: '修改',
//      dataIndex: '',
//      render:(text, record)=>{
//        return(
//          <div>
//            <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,'detail')}>修改</a>
//          </div>
//        )
//      }
//    }];

const Columns = [{
     title: '订单号',
     dataIndex: 'orderNo',
   },{
     title: '门店名称',
     dataIndex: 'shopName'
   }, {
     title: '订单类型',
     dataIndex: 'qtySum'
   },{
     title: '用户类型',
     dataIndex: 'amountSum'
   },{
     title: '结算金额',
     dataIndex: 'statusStr'
   },{
     title: '流程状态',
     dataIndex: 'sourceName'
   },{
     title: '操作',
     dataIndex: '',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,'detail')}>详情</a>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,'edit')}>编辑</a>
         </div>
       )
     }
 }];

 export default Columns
