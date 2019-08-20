export default {
  namespace: "setGoods",
  state: {
    goodLists: [
      {
        pdCode: 1,
        activityPrice: 1,
        maxQty: 1,
        perOrderLimit: 2,
        perDayLimit: 2,
        perUserLimit: 3,
        sellPrice:'5',
        g: 4,
        h: 3,
        i: 3,
        j: 9,
        k: 9,
        l: 3,
        m: 3,
        n: 0,
        o: 3
      }
    ]
  },
  reducers: {
    refreshLists(state,{payload: {goodLists} }) {
      return {...state, goodLists};
    }
  },
  effects: {
    *fetchGoodList({ payload: values }, { call, put, select }) {}
  }
};
