import { getPdSpuListApi } from "../../services/cConfig/homeConfiguration/goodSet.js";
export default {
  namespace: "goodsSet",
  state: {
    activeKey: "1",
    pdListDisplayCfgId: "",
    endTime: "",
    beginTime: "",
    activityId:null,
    totalList: [],
    addkey: 0,
    goods: {
      listOne: [],
      listTwo: []
    },
    goodType:1,
    mark:false
  },
  reducers: {
    setMark(state,{payload:{mark}}){ //区分 tab切换 还是 列表中切换过去 
      return {...state,mark}
    },
    changeKey(state,{payload: { activeKey }}) {
      return { ...state, activeKey };
    },
    getTimeInfo(state,{payload: { pdListDisplayCfgId, beginTime, endTime, activityId,mark,activeKey }}) {
      return { ...state, pdListDisplayCfgId, beginTime, endTime, activityId,mark,activeKey };
    },
    changeActivityId(state,{payload:{activityId}}){
      return { ...state, activityId}
    },
    getGoodType(state,{payload: {goodType }}) {
      return { ...state, goodType};
    },
    resetData2(state){
      return{
        ...state,
        activeKey: "1",
        pdListDisplayCfgId: "",
        endTime: "",
        beginTime: "",
        activityId:null,
        goodType:1,
        mark:false
      }
    },
    resetData(state) {
      const goods = {
        listOne: [],
        listTwo: []
      };
      const addkey = 0;
      return {
        ...state,
        goods,
        addkey
      };
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
    },
   
  }
};
