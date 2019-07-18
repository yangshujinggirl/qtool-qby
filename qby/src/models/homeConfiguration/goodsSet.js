import { getPdSpuListApi } from "../../services/cConfig/homeConfiguration/goodSet.js";
export default {
  namespace: "goodsSet",
  state: {
    activeKey: "1",
    pdListDisplayCfgId: "",
    endTime:'',
    beginTime:'',
    activityId:'',
    totalList: [],
    addkey: 0,
    goods: {
      listOne: [],
      listTwo: []
    },
    
  },
  reducers: {
    changeKey(state,{payload: { activeKey }}) {
      return { ...state, activeKey };
    },
    getTimeInfo(state,{payload:{pdListDisplayCfgId,beginTime,endTime,activityId}}){
      return {...state,pdListDisplayCfgId,beginTime,endTime,activityId}
    },
    resetData(state) {
      const goods = {
        listOne: [],
        listTwo: []
      };
      const addkey = 0;
      const homepageModuleId = "";
      return {
        ...state,
        goods,
        homepageModuleId,
        addkey
      };
    },
    getHomeModuleId(state, { payload: homepageModuleId }) {
      return { ...state, homepageModuleId };
    },
    getGoodsList(state, { payload: goods }) {
      goods = { ...goods };
      const { listOne, listTwo } = goods;
      let totalList = [...listOne, ...listTwo];
      let addkey = totalList.length;
      addkey++;
      return { ...state, goods, totalList, addkey };
    }
  },
  effects: {
    *fetchList({ payload: values }, { call, put, select }) {
      yield put({ type: "resetData", payload: {} });
      let { pdListDisplayCfgId } = values;
      // yield put({ type: "tab/loding", payload: true });
      const result = yield call(getPdSpuListApi, values);
      // if(result.code == '0'){
        const {pdSpuList} = result;
        // const goods = {
        //   listOne:pdSpuList.slice(0,9),
        //   listTwo:pdSpuList.slice(9)
        // };
        const goods = {
          listOne: [
            {
              key: "0",
              pdSpuName: "苏州店主",
              pdSpuId: "6789",
              pdCategory: "一级商品分类",
              pdSpuPrice: "¥33.99-¥99.33",
              wsInv: "20",
              outOfStockShopNum: "2家",
              sellingPoints: "2",
              tags: "hot2"
            },
            {
              key: "1",
              pdSpuId: "122",
              pdSpuName: "苏州店主",
              pdCategory: "一级商品分类",
              pdSpuPrice: "¥33.99-¥99.33",
              wsInv: "30",
              outOfStockShopNum: "3家",
              sellingPoints: "3",
              tags: "hot3"
            },
            {
              key: "2",
              pdSpuId: "121",
              pdSpuName: "苏州店主",
              pdCategory: "一级商品分类",
              pdSpuPrice: "¥33.99-¥99.33",
              wsInv: "40",
              outOfStockShopNum: "4家",
              sellingPoints: "4",
              tags: "hot4"
            }
          ],
          listTwo: [
            {
              key: "4",
              pdSpuId: "111",
              pdSpuName: "店主",
              pdCategory: "1级商品分类",
              pdSpuPrice: "¥33.99-¥99.33",
              wsInv: "1290",
              outOfStockShopNum: "2家",
              sellingPoints: "2",
              tags: "hot"
            }
          ]
        };
      
        yield put({ type: "getGoodsList", payload: goods });
        yield put({ type: "tab/loding", payload: false });
      }
      
    // }
  }
};
