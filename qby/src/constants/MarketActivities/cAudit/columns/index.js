const Columns = [
  {
    title: "序号",
    dataIndex: "amountSum"
  },
  {
    title: "活动ID",
    dataIndex: "createTime"
  },
  {
    title: "审核名称",
    dataIndex: "shopName"
  },
  {
    title: "审核人",
    dataIndex: "urUserId"
  },
  {
    title: "活动名称",
    dataIndex: "statusStr"
  },
  {
    title: "活动时间",
    dataIndex: "pushTime"
  },
  {
    title: "活动创建人",
    dataIndex: "recName"
  },
  {
    title: "操作",
    dataIndex: "",
    render: (text,record,index) => {
      return record.status == "0" ? (
        <a
          href="javascript:;"
          className="theme-color"
          onClick={()=>record.onOperateClick("edit")}
        >
          审核
        </a>
      ) : (
        <a
          href="javascript:;"
          className="theme-color"
          onClick={()=>record.onOperateClick("detail")}
        >
          查看
        </a>
      );
    }
  }
];

export default Columns;
