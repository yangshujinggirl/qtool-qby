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
      debugger
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
      const goods={
        listOne:[],
        listTwo:[],
      };
      const addkey=0;
      const homepageModuleId='';
      return {
        ...state,goods,homepageModuleId,addkey
       }
    },
    getAddkey(state, { payload:addkey }) {
      addkey++;
      return { ...state,addkey };
    },
    getGoodsList(state, { payload: pdSpuList }) {
      const diferAttrLight=(arr,attri)=>{ //高亮重复spuId
        const obj = {};
        for(var i=0;i<arr.length;i++){
          if(arr[i][attri]){
            obj[arr[i][attri]] = (obj[arr[i][attri]]+1) || 1 
          };
        };
        arr.map((item,index)=>{
          if(obj[item[attri]]>=2){
            arr[index].highlight = true
          }else{
            arr[index].highlight = false
          };
        });
        return arr;
      };
      pdSpuList = [...pdSpuList];
      pdSpuList = diferAttrLight(pdSpuList,'pdSpuId')
      let listOne=[], listTwo=[], goods;
      if(pdSpuList.length>0) {
        if(pdSpuList.length>=8) {
          listOne = pdSpuList.slice(0,8);
          listTwo = pdSpuList.slice(8);
        } else {
          listOne = pdSpuList;
        }
        goods = { listOne, listTwo };
      } else {
        goods = { listOne, listTwo };
      }
      return { ...state, goods, totalList:pdSpuList };
    },
    getMoveList(state, { payload: goods }) {
      goods = {...goods};
      const { listOne, listTwo } = goods;
      let totalList = [...listOne, ...listTwo];
      return { ...state, goods, totalList };
    },
  },
  effects: {
    *fetchList({ payload: values },{ call, put ,select}) {
      yield put({ type: 'resetData',payload:{} });
      yield put({type: 'tab/loding',payload:true});
      const res = yield call(getPdSpuListApi,values);
      if(res.code == 0) {
        let { pdSpuList } =res;
        pdSpuList = pdSpuList?pdSpuList:[];
        pdSpuList.map((el,index) =>{
           el.key = index;
        })
        let len = pdSpuList.length;
        yield put({type: 'getAddkey',payload:len});
        yield put({type: 'getGoodsList',payload:pdSpuList});
      }
      yield put({type: 'tab/loding',payload:false});
    },
  }
};
