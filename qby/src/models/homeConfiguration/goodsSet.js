import { getPdSpuListApi } from "../../services/cConfig/homeConfiguration/goodSet.js";
export default {
  namespace: "goodsSet",
  state: {
    activeKey: "1",
    pdListDisplayCfgId: "",
    endTime: "",
    beginTime: "",
    activityId: "",
    totalList: [],
    addkey: 0,
    goods: {
      listOne: [],
      listTwo: []
    }
  },
  reducers: {
    changeKey(
      state,
      {
        payload: { activeKey }
      }
    ) {
      return { ...state, activeKey };
    },
    getTimeInfo(
      state,
      {
        payload: { pdListDisplayCfgId, beginTime, endTime, activityId }
      }
    ) {
      return { ...state, pdListDisplayCfgId, beginTime, endTime, activityId };
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
      yield put({ type: "tab/loding", payload: true });
      const res = yield call(getPdSpuListApi, values);
      if (res.code == 0) {
        const { pdSpuList } = res;
        let goods = {},
          listOne = [],
          listTwo = [];
        if (pdSpuList.length > 0) {
          pdSpuList.map((el, index) => (el.key = index));
          if (pdSpuList.length >= 8) {
            listOne = pdSpuList.slice(0, 8);
            listTwo = pdSpuList.slice(8);
          }
          goods = { listOne, listTwo };
        } else {
          goods = { listOne, listTwo };
        }
        let len = pdSpuList.length;
        yield put({ type: "getAddkey", payload: len });
        yield put({ type: "getGoodsList", payload: goods });
      }
      yield put({ type: "tab/loding", payload: false });
    }
  }
};
