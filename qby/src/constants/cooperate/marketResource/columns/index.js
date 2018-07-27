 const Columns = [
    {
        title:'联系人',
        dataIndex:'name',
    },
    {
        title:'联系电话',
        dataIndex:'mobile'
    },
    {
        title:'公司名称',
        dataIndex:'company'
    },
    {
        title:'部门',
        dataIndex:'department'
    },
    {
        title:'职位',
        dataIndex:'job'
    },
    {
        title:'资源类型',
        dataIndex:'typeName'
    },
    {
        title:'操作',
        dataIndex:'operate',
        render:(text, record) => {
          return(
            <div>
              <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>修改</a>
            </div>
          )
        }
    }
]


// const Columns = [{
//      title: '订单号',
//      dataIndex: 'orderNo',
//    },{
//      title: '门店名称',
//      dataIndex: 'shopName'
//    }, {
//      title: '订单类型',
//      dataIndex: 'qtySum'
//    },{
//      title: '用户类型',
//      dataIndex: 'amountSum'
//    },{
//      title: '结算金额',
//      dataIndex: 'statusStr'
//    },{
//      title: '流程状态',
//      dataIndex: 'sourceName'
//    },{
//      title: '操作',
//      dataIndex: '',
//      render:(text, record)=>{
//        return(
//          <div>
//            <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this)}>修改</a>
//          </div>
//        )
//      }
//    }];

   export default Columns;
