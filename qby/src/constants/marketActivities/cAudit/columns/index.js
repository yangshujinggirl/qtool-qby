const Columns = [
  {
    title: "序号",
    dataIndex: "amountSum",
    render:(text,record,index)=>{
      return <span>{++index}</span>
    }
  },
  {
    title: "审核ID",
    dataIndex: "approvalNo"
  },
 
  {
    title: "审核状态",
    dataIndex: "statusStr"
  },
  {
    title: "审核人",
    dataIndex: "approvalUserStr"
  },
  {
    title: "活动ID",
    dataIndex: "promotionId"
  },
  {
    title: "活动名称",
    dataIndex: "name"
  }, 
  {
    title: "促销类型",
    dataIndex: "promotionTypeStr"
  },
  {
    title: "活动时间",
    dataIndex: "activityTime"
  },
  {
    title: "活动创建人",
    dataIndex: "createUserStr"
  },
  {
    title: "操作",
    dataIndex: "",
    render: (text, record, index) => {
      return record.status == 1 ? (
        <a
          href="javascript:;"
          className="theme-color"
          onClick={() => record.onOperateClick("edit")}
        >
          审核
        </a>
      ) : (
        <a
          href="javascript:;"
          className="theme-color"
          onClick={() => record.onOperateClick("detail")}
        >
          查看
        </a>
      );
    }
  }
];

export default Columns;
