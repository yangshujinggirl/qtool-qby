export default {
    namespace: "ctipActivityAddTwo",
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
      ],
      dataLists:[
        {price1:'200',price2:'300'},
        {price1:'300',price2:'400'},
        {price1:'300',price2:'400'},
        {price1:'300',price2:'400'},
      ],
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
      refreshDataLists(state,{payload:{dataLists}}){
        return {...state,dataLists}
      },
      refreshLists(state,{payload: {goodLists} }) {
        return {...state, goodLists};
      }
    },
    effects: {
      *fetchDiscountList({ payload: values }, { call, put }) {
        //获取优惠内容列表
      },
      *fetchGoodsList({ payload: values }, { call, put }) {
        //获取商品列表
      }
    }
  };
  