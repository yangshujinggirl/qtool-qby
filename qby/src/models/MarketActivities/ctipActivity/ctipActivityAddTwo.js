import { getDiscountInfoApi } from "../../../services/marketActivities/ctipActivity";
export default {
  namespace: "ctipActivityAddTwo",
  state: {
    promotionType:'',
    dataSource:[],
    goodLists:[]
  },
  reducers: {
    getInitList(state,{payload: {dataSource,goodLists}}) {
      return {...state,dataSource,goodLists}
    },
    refreshdataSource(state,{payload: { dataSource }}) {
      return { ...state, dataSource };
    },
    refreshLists(state,{payload: { goodLists }}) {
      return { ...state, goodLists };
    },
    getProType(state,{payload: { promotionType }}) {
      return { ...state, promotionType };
    }
  },
  effects: {
    *fetchDiscountInfo({ payload: values }, { call, put }) {
      yield put({ type: "tab/loding", payload: true});
      yield call(getDiscountInfoApi, values);
      yield put({ type: "tab/loding", payload: false   });
      const res = {
        data: {
          promotionRules: [
            {
              param: {leastAmount: '',reduceAmount: '',leastQty: '',reduceQty: ''},
              promotionGifts: [{
                pdCode: 111,
                pdName: "zengpin",
                sellPrice: "12.00",
                maxQty: 34,
                toBQty: 12,
                toCQty: 14
              }]
            }
          ],
          promotionProducts: [
            {
              pdCode: "",
              maxQty: 99,
              activityPrice: 10,
              perOrderLimit: 1,
              perDayLimit: 2,
              perUserLimit: 3,
              pdName: "1",
              pdSpec: "2",
              pdKind: "3",
              sellPrice: 10,
              goldCardPrice: 10,
              silverCardPrice: 10,
              promotionRules: [
                {
                  param: { leastQty: 3, reduceQty: 1 }
                }
              ]
            }
          ]
        }
      };
      const { promotionRules, promotionProducts } = res.data;
      yield put({
        type: "getInitList",
        payload: {
          dataSource: promotionRules,
          goodLists: promotionProducts
        }
      });
    }
  }
};
