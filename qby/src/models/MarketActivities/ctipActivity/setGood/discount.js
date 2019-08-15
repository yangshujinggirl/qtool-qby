export default {
  namespace: "discount",
  state: {
    dataSource: [
      {
        price: 1000,
        lists: [
          {
            pdCode: 111,
            name: "zengpin",
            bPrice: "12.00",
            max: 34,
            bStock: 12,
            cStock: 14
          }
        ]
      },
      {
        price: 1000,
        lists: [
          {
            pdCode: 111,
            name: "zengpin",
            bPrice: "12.00",
            max: 35,
            bStock: 12,
            cStock: 14
          }
        ]
      }
    ]
  },
  reducers: {},
  effects: {
    *fetchDiscountList({ payload: values }, { call, put }) {
      //获取优惠内容列表
    },
    *fetchGoodsList({ payload: values }, { call, put }) {
      //获取商品列表
    }
  }
};
