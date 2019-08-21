function getColumns(type, edit, delt) {
  const columns1 = [
    {
      title: "序号",
      dataIndex: "a",
      render: (text, record, index) => {
        return <span>{++index}</span>;
      },
      key: "1"
    },
    {
      title: "操作",
      dataIndex: "b",
      render: (text, record, index) => {
        return (
          <div>
            <a onClick={() => delt(index)} className="theme-color delt">
              删除
            </a>
            <br />
            <a onClick={() => edit(index, record)} className="theme-color">
              编辑
            </a>
          </div>
        );
      },
      key: "2"
    },
    { title: "商品编码", dataIndex: "pdCode", key: "3" },
    { title: "商品名称", dataIndex: "pdName", key: "4" },
    { title: "商品规格", dataIndex: "pdName", key: "5" },
    { title: "商品种类", dataIndex: "pdKind", key: "6" },
    { title: "C端售价", dataIndex: "sellPrice", key: "7" },
    { title: "活动价", dataIndex: "activityPrice", key: "8" },
    { title: "预计毛利率", dataIndex: "i", key: "9" },
    { title: "金卡价", dataIndex: "goldCardPrice", key: "10" },
    { title: "银卡价", dataIndex: "silverCardPrice", key: "11" },
    { title: "活动最大可售卖数量", dataIndex: "maxQty", key: "12" },
    { title: "活动期间每人每单限购", dataIndex: "perOrderLimit", key: "13" },
    { title: "活动期间每人每天限购", dataIndex: "perDayLimit", key: "14" },
    { title: "活动期间每人每账号限购", dataIndex: "perUserLimit", key: "15" }
  ];
  const columns2 = [
    {
      title: "序号",
      dataIndex: "index",
      key: "1",
      render: (text, record, index) => {
        return <span>{++index}</span>;
      }
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "2",
      render: (text, record, index) => {
        return (
          <div>
            <a onClick={() => delt(index)} className="theme-color delt">
              删除
            </a>
            <br />
            <a onClick={() => edit(index, record)} className="theme-color">
              编辑
            </a>
          </div>
        );
      }
    },
    { title: "商品编码", dataIndex: "pdCode", key: "3" },
    { title: "商品名称", dataIndex: "pdName", key: "4" },
    { title: "商品规格", dataIndex: "pdSpec", key: "5" },
    { title: "商品种类", dataIndex: "pdKind", key: "6" },
    {
      title: "优惠内容",
      dataIndex: "promotionRules",
      key: "7",
      render: (text, record, index) => {
        return (
          <div>
            {record.promotionRules.map(item => (
              <p>
                满{item.param.leastQty}件，送{item.param.reduceQty}件
              </p>
            ))}
          </div>
        );
      }
    },
    { title: "商品C端售价", dataIndex: "sellPrice", key: "8" },
    { title: "预计到手价", dataIndex: "handsPrice", key: "9" },
    { title: "预计毛利率", dataIndex: "profitRate", key: "10" },
    { title: "活动最大可售卖数量", dataIndex: "maxQty", key: "11" },
    { title: "活动期间每人每单限购", dataIndex: "perOrderLimit", key: "12" },
    { title: "活动期间每人每天限购", dataIndex: "perDayLimit", key: "13" },
    { title: "活动期间每人每账号限购", dataIndex: "perUserLimit", key: "14" }
  ];
  return columns1;
}
export default getColumns;
