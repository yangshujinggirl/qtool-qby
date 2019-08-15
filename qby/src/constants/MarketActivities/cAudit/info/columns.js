const columns1 = [
  {
    title: "活动预算",
    dataIndex: "pdCode",
    key: "1",
    colSpan: 2
  },
  {
    title: "承担方",
    dataIndex: "name",
    key: "2"
  },
  {
    title: "承担比例",
    dataIndex: "displayName",
    key: "3"
  },
  {
    title: "备注说明",
    dataIndex: "toCPrice",
    key: "4"
  }
];
const columns2 = [
  {
    title: "操作类型",
    dataIndex: "pdCode",
    key: "1"
  },
  {
    title: "操作描述",
    dataIndex: "name",
    key: "2"
  },
  {
    title: "操作时间",
    dataIndex: "displayName",
    key: "3"
  },
  {
    title: "操作人",
    dataIndex: "toCPrice",
    key: "4"
  }
];
const columns3 = [
  {
    title: "赠品编码",
    dataIndex: "pdCode",
    key: "1"
  },
  {
    title: "赠品名称",
    dataIndex: "name",
    key: "2"
  },
  {
    title: "赠品B端售价",
    dataIndex: "displayName",
    key: "3"
  },
  {
    title: "最多可参与活动的赠品数",
    dataIndex: "price",
    key: "4"
  },
  {
    title: "赠品B端在售库存",
    dataIndex: "tobPrice",
    key: "5"
  },
  {
    title: "赠品C端在售库存",
    dataIndex: "toCPrice",
    key: "6"
  }
];
//直降
function getDownColumns() {
  const columns = [
    {
      title: "序号",
      dataIndex: "pdCode",
      key: "1"
    },
    {
      title: "商品编码",
      dataIndex: "name",
      key: "2"
    },
    {
      title: "商品名称",
      dataIndex: "displayName",
      key: "3"
    },
    {
      title: "商品规格",
      dataIndex: "price",
      key: "4"
    },
    {
      title: "商品种类",
      dataIndex: "tobPrice",
      key: "5"
    },
    {
      title: "C端售价",
      dataIndex: "toCPrice",
      key: "6"
    },
    {
      title: "活动价",
      dataIndex: "toCPrice",
      key: "7"
    },
    {
      title: "预计毛利率",
      dataIndex: "toCPrice",
      key: "8"
    },
    {
      title: "金卡价",
      dataIndex: "toCPrice",
      key: "9"
    },
    {
      title: "银卡价",
      dataIndex: "toCPrice",
      key: "10"
    },
    {
      title: "活动最大可售卖数量",
      dataIndex: "toCPrice",
      key: "11"
    },
    {
      title: "活动期间每人每单限购",
      dataIndex: "toCPrice",
      key: "12"
    },
    {
      title: "活动期间每人每天限购",
      dataIndex: "toCPrice",
      key: "13"
    },
    {
      title: "活动期间每人每账号限购",
      dataIndex: "toCPrice",
      key: "14"
    }
  ];
}
//单品满件
function getJianColumns() {
  const columns = [
    {
      title: "序号",
      dataIndex: "pdCode",
      key: "1"
    },
    {
      title: "商品编码",
      dataIndex: "name",
      key: "2"
    },
    {
      title: "商品名称",
      dataIndex: "displayName",
      key: "3"
    },
    {
      title: "商品规格",
      dataIndex: "price",
      key: "4"
    },
    {
      title: "商品种类",
      dataIndex: "tobPrice",
      key: "5"
    },
    {
      title: "优惠内容",
      dataIndex: "toCPrice",
      key: "6"
    },
    {
      title: "商品C端售价",
      dataIndex: "toCPrice",
      key: "7"
    },
    {
      title: "预计到手价",
      dataIndex: "toCPrice",
      key: "8"
    },
    {
      title: "预计毛利率",
      dataIndex: "toCPrice",
      key: "9"
    },
    {
      title: "活动最大可售卖数量",
      dataIndex: "toCPrice",
      key: "10"
    },
    {
      title: "活动期间每人每单限购",
      dataIndex: "toCPrice",
      key: "11"
    },
    {
      title: "活动期间每人每天限购",
      dataIndex: "toCPrice",
      key: "12"
    },
    {
      title: "活动期间每人每账号限购",
      dataIndex: "toCPrice",
      key: "13"
    }
  ];
}
//专区满元
function getYuanColumns() {
  const columns = [
    {
      title: "序号",
      dataIndex: "pdCode",
      key: "1"
    },
    {
      title: "商品编码",
      dataIndex: "name",
      key: "2"
    },
    {
      title: "商品名称",
      dataIndex: "displayName",
      key: "3"
    },
    {
      title: "商品规格",
      dataIndex: "price",
      key: "4"
    },
    {
      title: "商品种类",
      dataIndex: "tobPrice",
      key: "5"
    },
    {
      title: "优惠内容",
      dataIndex: "toCPrice",
      key: "6"
    },
    {
      title: "C端售价",
      dataIndex: "toCPrice",
      key: "7"
    },
    {
      title: "预计最低到手价",
      dataIndex: "toCPrice",
      key: "8"
    },
    {
      title: "预计最低毛利率",
      dataIndex: "toCPrice",
      key: "9"
    },
    {
      title: "活动最大可售卖数量",
      dataIndex: "toCPrice",
      key: "10"
    }
  ];
}
//专区多级满赠+专区满件减免
function getDiscountColumns() {
  const columns = [
    {
      title: "序号",
      dataIndex: "pdCode",
      key: "1"
    },
    {
      title: "商品编码",
      dataIndex: "name",
      key: "2"
    },
    {
      title: "商品名称",
      dataIndex: "displayName",
      key: "3"
    },
    {
      title: "商品规格",
      dataIndex: "price",
      key: "4"
    },
    {
      title: "商品种类",
      dataIndex: "tobPrice",
      key: "5"
    },
    {
      title: "优惠内容",
      dataIndex: "toCPrice",
      key: "6"
    },
    {
      title: "C端售价",
      dataIndex: "toCPrice",
      key: "7"
    },
    {
      title: "活动最大可售卖数量",
      dataIndex: "toCPrice",
      key: "10"
    }
  ];
}
export {columns1,columns2,getDownColumns,getJianColumns,getYuanColumns,getDiscountColumns}
