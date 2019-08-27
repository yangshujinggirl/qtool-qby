import { getDiscountInfoApi } from "../../../services/marketActivities/ctipActivity";
export default {
  namespace: "ctipActivityAddTwo",
  state: {
    promotionType:'',
    dataSource:[],
    goodLists:[],
    promotionRules:[],//单行满件赠的规则
  },
  reducers: {
    refreshSingleRules(state,{payload:{promotionRules}}){
      return {...state,promotionRules}
    },
    resetData(state){
      return {...state,promotionType:'',dataSource:[],goodLists:[]}
    },
    refreshdataSource(state,{payload: { dataSource }}) {
      if(dataSource.length == 0){
        switch(state.promotionType){
          case 20:
            dataSource =[{param:{leastAmount:''},promotionGifts:[]}]; break;
          case 21:
            dataSource =[{param:{leastQty:''},promotionGifts:[]}]; break;
          case 22:
            dataSource =[{param:{leastAmount:'',reduceAmount:''}}]; break;
          case 23:
            dataSource =[{param:{leastQty:'',reduceQty:''}}]; break;
        };
      };
      dataSource && dataSource.map((item,index)=>{
        item.key = index
      });
      return { ...state, dataSource };
    },
    refreshLists(state,{payload: { goodLists }}) {
      goodLists && goodLists.length>0 && goodLists.map((item,index)=>{
        item.key = index;
      });
      if(state.promotionType == 10){//单品直降
        goodLists&&goodLists.length>0&&goodLists.map(item=>{
          //一般贸易商品（包括品牌直供商品）：C端活动单品毛利率=（活动价-B端活动售价）/ 活动价
          if(item.pdKind == 1||item.pdKind == 2){ //一般贸易和直供
            if(Number(item.eventPrice)){
              item.profitRate = (((item.activityPrice-item.eventPrice)/item.activityPrice)*100).toFixed(2);
            }else{
              item.profitRate = '';
            };
          };
          //保税商品：C端毛利率=分成比例
          if(item.pdKind == 3){//保税
            item.profitRate = item.shareRatio;
          };
        });
      };
      if(state.promotionType == 11){//单品满件赠
        goodLists&&goodLists.length>0&&goodLists.map(item=>{
          let [arr1,arr2] = [[],[]];
          item.promotionRules&&item.promotionRules.length>0&&item.promotionRules.map(subItem=>{
            //预计到手价=C端售价*优惠门槛/（优惠门槛+赠品数量）
            const price = (Number(item.sellPrice)*(Number(subItem.param.leastQty))/(Number(subItem.param.leastQty)+Number(subItem.param.giftQty))).toFixed(2);
            //毛利率=（到手价-B端活动售价）/ 到手价
            let rate = '';
            if(Number(item.eventPrice)){
              rate = (((Number(price)-Number(item.eventPrice))/Number(price))*100).toFixed(2);
            }else{
              rate = ''
            };
            let obj = {color:'#000'}
            if(rate<0){
              obj={color:'red'}
            };
            arr1.push({price,...obj});
            arr2.push({rate,...obj});
          });
          item.handsPrice = arr1;
          item.profitRate = arr2
        });
      };
      if(state.promotionType == 22){//专区满元减
        goodLists && goodLists.length>0&& goodLists.map(item=>{
          let [arr1,arr2] = [[],[]];
          state.dataSource && state.dataSource.length>0 && state.dataSource.map(subItem=>{
            //预计到手价=C端售价*减钱/优惠门槛
            const price = (Number(item.sellPrice)*(1-Number(subItem.param.reduceAmount)/Number(subItem.param.leastAmount))).toFixed(2);
            console.log(price)
            //毛利率= 
            //一般贸易品：C端毛利率=（到手价-B端售价）/到手价
            //保税商品：C端毛利=分成比率
            let rate = '';
            if(item.pdKind == 1||item.pdKind == 2){//一般贸易和直供
              if(Number(item.eventPrice)){
                rate = (((Number(price)-Number(item.eventPrice))/Number(price))*100).toFixed(2);
              }else{
                rate = '';
              };
            };
            if(item.pdKind == 3){ //保税
              rate = Number(item.shareRatio);
            };
            let obj = {color:'#000'}
            if(rate<0){
              obj={color:'red'}
            };
            arr1.push({price,...obj});
            arr2.push({rate,...obj});
          });
          item.handsPrice = arr1;
          item.profitRate = arr2
        });
      };
      return { ...state, goodLists };
    },
    getProType(state,{payload: { promotionType }}) {
      return { ...state, promotionType };
    }
  },
  effects: {
    *fetchDiscountInfo({ payload: values }, { call, put }) {
      yield put({ type: "tab/loding", payload: true});
      const res = yield call(getDiscountInfoApi, values);
      yield put({ type: "tab/loding", payload: false   });
      const { promotionRules,promotionProducts} = res.data;
      yield put({
        type: "refreshdataSource",
        payload: {
          dataSource: promotionRules,
        }
      });
      yield put({
        type: "refreshLists",
        payload: {
          goodLists: promotionProducts
        }
      });
    }
  }
};
