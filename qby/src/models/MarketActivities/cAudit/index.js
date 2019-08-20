import { getListApi } from "../../../services/marketActivities/cAudit";
export default {
  namespace: "cAudit",
  state: {
    dataLists: [],
    limit: 15,
    currentPage: 0,
    total: 0
  },
  reducers: {
    getList(state,{payload: { dataLists, limit, currentPage, total }}) {
      return { ...state, dataLists, limit, currentPage, total };
    }
  },
  effects: {
    *fetchList({ payload: values }, { call, put }) {
      yield put({ type: "tab/loading", payload: true });
      //   const result = yield call(getListApi, values);
      const result = {
        code: 0,
        list: [
          {
            approvalNo: 111,
            approvalName: "daisff",
            status: 1,
            statusStr: "待审核",
            approvalUser: "dwd",
            promotionId: 123,
            name: "fwef",
            activityTime: "20190909",
            createUser: "fff"
          }
        ],
        limit: 15,
        total: 10,
        currentPage: 1
      };
      yield put({ type: "tab/loading", payload: false });
      if (result.code == "0") {
        const { list, currentPage, limit, total } = result;
        list.map((item, index) => {
          item.key = index;
        });
        yield put({
          type: "getList",
          payload: {
            dataLists: list,
            limit,
            currentPage,
            total
          }
        });
      }
    }
  }
};
