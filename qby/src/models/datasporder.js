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
	namespace: 'datasporder',
	state: {
		analysis:{},
		updateTime:null,
		datalist1:[],
		datalist2:[],
		listdata:[],

		xdata:['周一','周二','周三','周四','周五','周六','周日'],
		data1:[11, 21, 15, 13, 12, 13, 10],
		data2:[1, 2, 2, 5, 3, 2, 0],
		data3:[11, 11, 15, 13, 12, 13, 10],
		data4:[1, 22, 2, 5, 3, 2, 0]
	},
	reducers: {
		selldatalist(state, { payload:{analysis,updateTime,datalist1,datalist2}}) {
			return {...state,analysis,updateTime,datalist1,datalist2}
		},
		tablefetch(state, { payload:shopSaleDatas}) {
			return {...state,shopSaleDatas}
		},
	},
	effects: {
		*sellfetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			console.log(result)
			if(result.code=='0'){
				const analysis=result.shopOrderData
				const updateTime=analysis.updateTime
				analysis.qtySumRate=databi(analysis.qtySum,analysis.upQtySum) //总订单数
				analysis.validQtySumRate=databi(analysis.validQtySum,analysis.upValidQtySum) //有效订单数
				analysis.preSellQtySumRate=databi(analysis.preSellQtySum,analysis.upPreSellQtySum) //预售订单数
				analysis.deQtySumRate=databi(analysis.deQtySum,analysis.upDeQtySum)//直邮订单数
				analysis.cancelQtySumRate=databi(analysis.cancelQtySum,analysis.upCancelQtySum)//取消订单数

				analysis.amountSumRate=databi(analysis.amountSum,analysis.upAmountSum) //销售额
				analysis.validAmountSumRate=databi(analysis.validAmountSum,analysis.upValidAmountSum)//有效销售额
				analysis.preSellAmountSumRate=databi(analysis.preSellAmountSum,analysis.upPreSellAmountSum)//预售销售额
				analysis.deAmountSumRate=databi(analysis.deAmountSum,analysis.upDeAmountSum)//直邮销售额
				analysis.cancelAmountSumRate=databi(analysis.cancelAmountSum,analysis.upCancelAmountSum)//取消销售额

				const datalist1=[{
					title:'总订单数',
					value:analysis.qtySum,
					rate:Math.abs(analysis.qtySumRate),
					text:'同比上周',
					type:(analysis.qtySumRate<0)?'0':'1'
				},{
					title:'有效订单数',
					value:analysis.validQtySum,
					rate:Math.abs(analysis.validQtySumRate),
					text:'同比上周',
					type:(analysis.validQtySumRate<0)?'0':'1'
				},{
					title:'预售订单数',
					value:analysis.preSellQtySum,
					rate:Math.abs(analysis.preSellQtySumRate),
					text:'同比上周',
					type:(analysis.preSellQtySumRate<0)?'0':'1'
				},{
					title:'直邮订单数',
					value:analysis.deQtySum,
					rate:Math.abs(analysis.deQtySumRate),
					text:'同比上周',
					type:(analysis.deQtySumRate<0)?'0':'1'
				},{
					title:'取消订单数',
					value:analysis.cancelQtySum,
					rate:Math.abs(analysis.cancelQtySumRate),
					text:'同比上周',
					type:(analysis.cancelQtySumRate<0)?'0':'1'
				}]

				const datalist2=[{
					title:'销售额',
					value:analysis.amountSum,
					rate:Math.abs(analysis.amountSumRate),
					text:'同比上周',
					type:(analysis.amountSumRate<0)?'0':'1'
				},{
					title:'有效销售额',
					value:analysis.validAmountSum,
					rate:Math.abs(analysis.validAmountSumRate),
					text:'同比上周',
					type:(analysis.validAmountSumRate<0)?'0':'1'
				},{
					title:'预售销售额',
					value:analysis.preSellAmountSum,
					rate:Math.abs(analysis.preSellAmountSumRate),
					text:'同比上周',
					type:(analysis.preSellAmountSumRate<0)?'0':'1'
				},{
					title:'直邮销售额',
					value:analysis.deAmountSum,
					rate:Math.abs(analysis.deAmountSumRate),
					text:'同比上周',
					type:(analysis.deAmountSumRate<0)?'0':'1'
				},{
					title:'取消销售额',
					value:analysis.cancelAmountSum,
					rate:Math.abs(analysis.cancelAmountSumRate),
					text:'同比上周',
					type:(analysis.cancelAmountSumRate<0)?'0':'1'
				}]


				yield put({type: 'selldatalist',payload:{analysis,updateTime,datalist1,datalist2}});
			}	
		},
		
},
	subscriptions: {},
};
