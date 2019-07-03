import { Button } from "antd";

const IndexColumns = [
  {
    title: "版本名称",
    dataIndex: "versionName"
  },
  {
    title: "版本编码",
    dataIndex: "versionCode",
    width: "15%"
  },
  {
    title: "发布时间",
    dataIndex: "releaseTime"
  },
  {
    title: "最后修改时间",
    dataIndex: "updateTime"
  },
  {
    title: "最后修改人",
    dataIndex: "lastUpdateUser"
  },
  {
    title: "当前版本状态",
    dataIndex: "statusStr"
  },
  {
    title: "操作",
    dataIndex: "action",
    render: (text, record, index) => {
      return (
        <div>
          <span
            className="action-btn"
            onClick={() => record.onOperateClick("info")}
          >
            查看
          </span>
          {(record.status == 1 || record.status == 2) && (
            <span
              className="action-btn"
              onClick={() => record.onOperateClick("edit")}
            >
              编辑
            </span>
          )}
          {(record.status == 1 || record.status == 2) && (
            <span
              className="action-btn"
              onClick={() => record.onOperateClick("ban")}
            >
              禁用
            </span>
          )}
          <span
            className="action-btn"
            onClick={() => record.onOperateClick("log")}
          >
            日志
          </span>
        </div>
      );
    }
  }
];
export default {
  IndexColumns
};
