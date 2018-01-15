import {GetServerData} from '../services/services';
import NP from 'number-precision'

export default {
	namespace: 'dataspsell',
	state: {
		shopSaleData:{
			updateTime:"2017/11/17 12:00",
			posAmount:'100',
			saleAmount:'200',
			cleanAmount:'100',
			yesterdayAmount:'200',
			yesterdayCostAmount:'100',
			upPosAmount:'200',
			upSaleAmount:'100',
			upCleanAmount:'200',
			upYesterdayAmount:'100',
			upYesterdayCostAmount:'200',
			shopRank:'100',
			studyShop:'200',
			guidanceShop:'100',
			carefulShop:'200',
			yesterdaysellRate:'20',
			posAmountBi:'10',
			possaleAmountBi:'20',
			poscleanAmountBi:'15',
			yesterdaysellRateBi:"40",
		},
		data:[{
			title:'毛销售额',
			value:'109862',
			rate:'10',
			text:'同比上周',
			type:'0'
		},{
			title:'销售额',
			value:'109862',
			rate:'10',
			text:'同比上周',
			type:'1'
		},{
			title:'净收款',
			value:'109862',
			rate:'10',
			text:'同比上周',
			type:'1'
		},{
			title:'昨日毛利率',
			value:'20%',
			rate:'10',
			text:'同比上周',
			type:'1'
		}],
		listdata:[{
			title:'门店排行榜',
			value:'1000',
			type:'1',
			bg:'pink'
		},{
			title:'学习门店',
			value:'1000',
			type:'2',
			bg:'yellow'

		},{
			title:'指导门店',
			value:'1000',
			type:'3',
			bg:'blue'
		},{
			title:'注意门店',
			value:'1000',
			type:'4',
			bg:'red'
		}],
		shopSaleDatas:[],
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
				shopSaleData.posAmountBi=NP.round(NP.divide(NP.minus(shopSaleData.posAmount, shopSaleData.upPosAmount), shopSaleData.upPosAmount),2); 
				shopSaleData.possaleAmountBi=NP.round(NP.divide(NP.minus(shopSaleData.saleAmount, shopSaleData.upSaleAmount), shopSaleData.upSaleAmount),2); 
				shopSaleData.poscleanAmountBi=NP.round(NP.divide(NP.minus(shopSaleData.cleanAmount, shopSaleData.upCleanAmount), shopSaleData.upCleanAmount),2);
				shopSaleData.yesterdaysellRateBi=NP.round(NP.divide(NP.minus(shopSaleData.yesterdaysellRate, shopSaleData.upyesterdaysellRate), shopSaleData.upyesterdaysellRate),2); 
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
