import { getDiscountInfoApi } from "../../../services/marketActivities/ctipActivity";
export default {
  namespace: "ctipActivityAddTwo",
  state: {
    promotionType:'',
    dataSource:[],
    goodLists:[]
  },
  reducers: {
    refreshdataSource(state,{payload: { dataSource }}) {
      dataSource.map((item,index)=>{
        item.key = index
      });
      return { ...state, dataSource };
    },
    refreshLists(state,{payload: { goodLists }}) {
      goodLists.map((item,index)=>{
        item.key = index;
      });
      if(state.promotionType == 10){//单品直降
        goodLists.map(item=>{
          //一般贸易商品（包括品牌直供商品）：C端活动单品毛利率=（活动价-B端活动售价）/ 活动价
          if(item.pdKind == 1||item.pdKind == 2){//一般贸易和直供
            item.profitRate = ((item.activityPrice-item.eventPrice)/item.activityPrice).toFixed(2)*100;
          };
          //保税商品：C端毛利率=活动价*分成比例 / 活动价
          if(item.pdKind == 3){//保税
            item.profitRate = item.shareRatio;
          };
        });
      };
      if(state.promotionType == 11){//单品满件赠
        goodLists.map(item=>{
          let [arr1,arr2] = [[],[]];
          item.promotionRules.map(subItem=>{
            //预计到手价=C端售价*优惠门槛/（优惠门槛+赠品数量）
            const price = (Number(item.sellPrice)*(Number(subItem.param.leastQty))/(Number(subItem.param.leastQty)+Number(subItem.param.reduceQty))).toFixed(2);
            //毛利率=（到手价-B端活动售价）/ 到手价
            const rate = ((Number(price)-Number(item.eventPrice))/Number(price)).toFixed(2)*100;
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
        goodLists.map(item=>{
          let [arr1,arr2] = [[],[]];
          item.promotionRules.map(subItem=>{
            //预计到手价=C端售价*减钱/优惠门槛
            const price = (Number(item.sellPrice)*(1-Number(subItem.param.reduceAmount)/Number(subItem.param.leastAmount))).toFixed(2);
            //毛利率= 
            //一般贸易品：C端毛利率=（到手价-B端售价）/到手价
            //保税商品：C端毛利=分成比率
            let rate = '';
            if(item.pdKind == 1||item.pdKind == 2){//一般贸易和直供
              rate = ((Number(price)-Number(item.eventPrice))/Number(price)).toFixed(2)*100;
            };
            if(item.pdKind == 3){//保税
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
              pdCode: "商品编码",
              maxQty: 99,
              activityPrice: 100,
              eventPrice:90,
              perOrderLimit: 1,
              perDayLimit: 2,
              perUserLimit: 3,
              pdName: "商品名称",
              pdSpec: "商品规格",
              pdKind: "1",
              sellPrice: 200,
              goldCardPrice: 10,
              silverCardPrice: 10,
              shareRatio:'90',
              promotionRules: [
                {param: { leastQty: 3, reduceQty: 1,leastAmount:100, reduceAmount: 20}},
                {param: { leastQty: 6, reduceQty: 100,leastAmount: 200, reduceAmount: 50 }}
              ]
            }
          ]
        }
      };
      const { promotionRules,promotionProducts} = res.data;
      yield put({
        type: "refreshLists",
        payload: {
          goodLists: promotionProducts
        }
      });
      yield put({
        type: "refreshdataSource",
        payload: {
          dataSource: promotionRules,
        }
      });
    }
  }
};
