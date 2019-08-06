import { getPdSpuListApi } from "../../services/cConfig/homeConfiguration/goodSet.js";
export default {
  namespace: "goodsSet",
  state: {
    activeKeyLists:[
      {tab:'设置时段',key:'1'},
      {tab:'模块设置',key:'2'},
    ],
    activeKey:'1',
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
  },
  reducers: {
    changeKey(state,{payload: { activeKey }}) {
      return { ...state, activeKey };
    },
    activeKeyLists(state,{payload: { activeKeyLists }}) {
      return { ...state, activeKeyLists };
    },
    getTime(state,{payload:  beginTime, endTime }) {
      return { ...state, beginTime, endTime };
    },
    getTimeInfo(state,{payload: { pdListDisplayCfgId,activityId,activeKeyLists,activeKey }}) {
      return { ...state, pdListDisplayCfgId,activityId,activeKeyLists,activeKey };
    },
    changeActivityId(state,{payload:{activityId}}){
      return { ...state, activityId}
    },
    getGoodType(state,{payload: { goodType }}) {
      return { ...state, goodType};
    },
    resetData2(state){
      return{
        ...state,
        activeKey: "1",
        activeKeyLists:[
          {tab:'设置时段',key:'1'},
          {tab:'模块设置',key:'2'},
        ],
        pdListDisplayCfgId: "",
        endTime: "",
        beginTime: "",
        activityId:null,
        goodType:1,
      }
    },
    resetData(state) {
      const goods={
        listOne:[],
        listTwo:[],
      };
      const addkey=0;
      return {
        ...state,goods,addkey
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
      if(state.goodType == 1){//只有活动商品才需要高亮显示
        pdSpuList = diferAttrLight(pdSpuList,'pdSpuId')
      };
      let listOne=[], listTwo=[], goods;
      if(pdSpuList.length>0) {
        if(pdSpuList.length>=8) {
          listOne = pdSpuList.slice(0,8);
          listTwo = pdSpuList.slice(8);
        } else {
          listOne = pdSpuList;
        };
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
        let { pdSpuList,beginTime,endTime } = res;
        pdSpuList = pdSpuList?pdSpuList:[];
        pdSpuList.map((el,index) =>{
          el.key = index;
          el.FixedPdSpuId = el.pdSpuId;
          el.FixedPdCode = el.pdCode;
        });
        let len = pdSpuList.length;
        yield put({type: 'getAddkey',payload:len});
        yield put({type: 'getGoodsList',payload:pdSpuList});
        yield put({type: 'getTime',payload:beginTime,endTime});
      }
      yield put({type: 'tab/loding',payload:false});
    },
  }
};
