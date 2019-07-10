export default {
  namespace: "goodsSet",
  state: {
    activeKey: "1",
    pdListDisplayCfgId:''
  },
  reducers: {
    changeKey(state,{payload: { activeKey }}) {
      return { ...state, activeKey };
    },
    getpdListDisplayCfgId(state, { payload: {pdListDisplayCfgId} }) {
      return { ...state, pdListDisplayCfgId };
    }
  }
};
