const columnsSingleDown = [
  {
    title: '序号',
    dataIndex: 'key',
  },
  {
    title: '商品编码',
    dataIndex: 'pdCode',
  },
  {
    title: '商品名称',
    dataIndex: 'pdName',
  },
  {
    title: '商品规格',
    dataIndex: 'pdSpec',
  },
  {
    title: '商品种类',
    dataIndex: 'pdKind',
  },
  {
    title: 'C端售价',
    dataIndex: 'sellPrice',
  },
  {
    title: '活动价',
    dataIndex: 'activityPrice',
  },
  {
    title: '预计毛利率',
    dataIndex: 'ml',
  },
  {
    title: '金卡价',
    dataIndex: 'goldCardPrice',
  },
  {
    title: '银卡价',
    dataIndex: 'silverCardPrice',
  },
  {
    title: '活动最大可售卖数量',
    dataIndex: 'maxQty',
  },
  {
    title: '活动期间每人每单限购',
    dataIndex: 'perOrderLimit',
  },
  {
    title: '活动期间每人每天限购',
    dataIndex: 'perDayLimit',
  },
  {
    title: '活动期间每人每账号限购',
    dataIndex: 'perUserLimit',
  },
];
const columnsSingleGift = [
  {
    title: '序号',
    dataIndex: 'key',
  },
  {
    title: '商品编码',
    dataIndex: 'pdCode',
  },
  {
    title: '商品名称',
    dataIndex: 'pdName',
  },
  {
    title: '商品规格',
    dataIndex: 'pdSpec',
  },
  {
    title: '商品种类',
    dataIndex: 'pdKind',
  },
  {
    title: '优惠内容',
    dataIndex: 'sellPrice',
    render:(text,record,index) => {
      record.promotionRules=[{
        params:{
          leastQty:1,
          reduceQty:1,
        }
      }]
      record.promotionRules&&record.promotionRules.map((el)=> (
        <span>满{el.params.leastQty}件，送 {el.params.reduceQty} 件</span>
      ))
    }
  },
  {
    title: '商品C端售价',
    dataIndex: 'sellPrice',
  },
  {
    title: '预计到手价',
    dataIndex: 'activityPrice',
  },
  {
    title: '预计毛利率',
    dataIndex: 'ml',
  },
  {
    title: '活动最大可售卖数量',
    dataIndex: 'maxQty',
  },
  {
    title: '活动期间每人每单限购',
    dataIndex: 'perOrderLimit',
  },
  {
    title: '活动期间每人每天限购',
    dataIndex: 'perDayLimit',
  },
  {
    title: '活动期间每人每账号限购',
    dataIndex: 'perUserLimit',
  },
];
const columnsAreaGift = [
  {
    title: '序号',
    dataIndex: 'key',
  },
  {
    title: '商品编码',
    dataIndex: 'pdCode',
  },
  {
    title: '商品名称',
    dataIndex: 'pdName',
  },
  {
    title: '商品规格',
    dataIndex: 'pdSpec',
  },
  {
    title: '商品种类',
    dataIndex: 'pdKind',
  },
  {
    title: 'C端售价',
    dataIndex: 'sellPrice',
  },
  {
    title: '活动最大可售卖数量',
    dataIndex: 'maxQty',
  },
];
const columnsAreaMinus = [
  {
    title: '序号',
    dataIndex: 'key',
  },
  {
    title: '商品编码',
    dataIndex: 'pdCode',
  },
  {
    title: '商品名称',
    dataIndex: 'pdName',
  },
  {
    title: '商品规格',
    dataIndex: 'pdSpec',
  },
  {
    title: '商品种类',
    dataIndex: 'pdKind',
  },
  {
    title: 'C端售价',
    dataIndex: 'sellPrice',
  },
  {
    title: '预计最低到手价',
    dataIndex: 'activityPrice',
  },
  {
    title: '预计最低毛利率',
    dataIndex: 'ml',
  },
];

export {
  columnsSingleDown,columnsSingleGift,columnsAreaGift,columnsAreaMinus
}
