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
            <a onClick={() => delt(index)} className="theme-color delt">删除</a><br/>
            <a onClick={() => edit(index, record)} className="theme-color">编辑</a>
          </div>
        );
      },
      key: "2"
    },
    { title: "商品编码", dataIndex: "pdCode", key: "3" },
    { title: "商品名称", dataIndex: "d", key: "4" },
    { title: "商品规格", dataIndex: "e", key: "5" },
    { title: "商品种类", dataIndex: "f", key: "6" },
    { title: "C端售价", dataIndex: "g", key: "7" },
    { title: "活动价", dataIndex: "activityPrice", key: "8" },
    { title: "预计毛利率", dataIndex: "i", key: "9" },
    { title: "金卡价", dataIndex: "j", key: "10" },
    { title: "银卡价", dataIndex: "k", key: "11" },
    { title: "活动最大可售卖数量", dataIndex: "maxQty", key: "12" },
    { title: "活动期间每人每单限购", dataIndex: "perOrderLimit", key: "13" },
    { title: "活动期间每人每天限购", dataIndex: "perDayLimit", key: "14" },
    { title: "活动期间每人每账号限购", dataIndex: "perUserLimit", key: "15" }
  ];
  const columns2 = [
    { title: "序号", dataIndex: "address", key: "1" },
    { title: "操作", dataIndex: "address", key: "2" },
    { title: "商品编码", dataIndex: "address", key: "3" },
    { title: "商品名称", dataIndex: "address", key: "4" },
    { title: "商品规格", dataIndex: "address", key: "5" },
    { title: "商品种类", dataIndex: "address", key: "6" },
    { title: "优惠内容", dataIndex: "address", key: "6" },
    { title: "商品C端售价", dataIndex: "address", key: "7" },
    { title: "预计到手价", dataIndex: "address", key: "8" },
    { title: "预计毛利率", dataIndex: "address", key: "8" },
    { title: "活动最大可售卖数量", dataIndex: "address", key: "8" },
    { title: "活动期间每人每单限购", dataIndex: "address", key: "8" },
    { title: "活动期间每人每天限购", dataIndex: "address", key: "8" },
    { title: "活动期间每人每账号限购", dataIndex: "address", key: "8" }
  ];
  return columns1;
}
export default getColumns;
