import TdPop from "../../../../../components/TdPop";

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
    title: (
      <TdPop
        title="当前版本状态"
        des={
          <div>
            <p>线上版本：即为当前C端线上展示的版本</p>
            <p>待发布版本：被设定好发布时间，等待发布的版本</p>
            <p>草稿版本：不会对线上产生影响的版本。</p>
            <p>已下线：曾在线上，后被迭代替换下来的版本。</p>
          </div>
        }
      />
    ),
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
