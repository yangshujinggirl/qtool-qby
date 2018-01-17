import {GetServerData} from '../services/services';
import NP from 'number-precision'

function databi(a,b){
	var Rate=0
	if(a!=0 && b!=0){
		Rate=NP.round(NP.divide(NP.minus(a,b),b),2); 
	}else{
		if(b==0){
			Rate=(a!=0)?100:0
		}else{
			Rate=0
		}
	}
	return Rate
}

export default {
	namespace: 'dataspsell',
	state: {
		shopSaleData:{},
		data:[],
		listdata:[],
		xdata:['周一','周二','周三','周四','周五','周六','周日'],
		data1:[11, 21, 15, 13, 12, 13, 10],
		data2:[1, 2, 2, 5, 3, 2, 0],
		data3:[11, 11, 15, 13, 12, 13, 10],
		data4:[1, 22, 2, 5, 3, 2, 0]
	},
	reducers: {
		selldatalist(state, { payload:{shopSaleData,data,listdata}}) {
			return {...state,shopSaleData,data,listdata}
		},
		tablefetch(state, { payload:shopSaleDatas}) {
			return {...state,shopSaleDatas}
		},
	},
	effects: {
		*sellfetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const shopSaleData=result.shopSaleData
				shopSaleData.yesterdaysellRate=NP.round(NP.divide(NP.minus(shopSaleData.yesterdayAmount, shopSaleData.yesterdayCostAmount),shopSaleData.yesterdayAmount),2);//昨日毛利率
				shopSaleData.upyesterdaysellRate=NP.round(NP.divide(NP.minus(shopSaleData.upYesterdayAmount, shopSaleData.upYesterdayCostAmount),shopSaleData.upYesterdayAmount),2);//上期昨日毛利率
				shopSaleData.posAmountBi=databi(shopSaleData.posAmount,shopSaleData.upPosAmount) //毛销售额
				shopSaleData.possaleAmountBi=databi(shopSaleData.posAmount,shopSaleData.upPosAmount)  //销售额
				shopSaleData.poscleanAmountBi=databi(shopSaleData.cleanAmount,shopSaleData.upCleanAmount)  //净收款
				shopSaleData.yesterdaysellRateBi=databi(shopSaleData.yesterdaysellRate,shopSaleData.upyesterdaysellRate)  //昨日毛利率
				const data=[{
					title:'毛销售额',
					value:shopSaleData.posAmount,
					rate:Math.abs(shopSaleData.posAmountBi),
					text:'同比上周',
					type:(shopSaleData.posAmountBi<0)?'0':'1'
				},{
					title:'销售额',
					value:shopSaleData.saleAmount,
					rate:Math.abs(shopSaleData.possaleAmountBi),
					text:'同比上周',
					type:(shopSaleData.possaleAmountBi<0)?'0':'1'
				},{
					title:'净收款',
					value:shopSaleData.cleanAmount,
					rate:Math.abs(shopSaleData.poscleanAmountBi),
					text:'同比上周',
					type:(shopSaleData.poscleanAmountBi<0)?'0':'1'
				},{
					title:'昨日毛利率',
					value:shopSaleData.yesterdaysellRate,
					rate:Math.abs(shopSaleData.yesterdaysellRateBi),
					text:'同比上周',
					type:(shopSaleData.yesterdaysellRateBi<0)?'0':'1'
				}]
				const listdata=[{
					title:'门店排行榜',
					value:shopSaleData.shopRank,
					type:'1'
				},{
					title:'学习门店',
					value:shopSaleData.studyShop,
					type:'2'

				},{
					title:'指导门店',
					value:shopSaleData.guidanceShop,
					type:'3'
				},{
					title:'注意门店',
					value:shopSaleData.carefulShop,
					type:'4'
				}]
				yield put({type: 'selldatalist',payload:{shopSaleData,data,listdata}});
			} 
		},
		
},
	subscriptions: {},
};
