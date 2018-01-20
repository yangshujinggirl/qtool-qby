import {GetServerData} from '../services/services';
import NP from 'number-precision'

function databi(a,b){
	var Rate=0
	if(a>0 && b>0){
		Rate=NP.round(NP.divide(NP.times(NP.minus(a,b),100),b),2); 
	}else{
		if(b<=0){
			Rate=(a>0)?100:0
		}else{
			Rate=0
		}
	}
	return Rate
}

export default {
	namespace: 'dataposorder',
	state: {
		analysis:{},
		updateTime:null,
		datalist1:[],
		datalist2:[],
		listdata:[],

		xdata:[],
		data1:[],
		data2:[],
		data3:[],
		data4:[]
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
				const analysis=result.posOrderData
				const updateTime=analysis.updateTime
				analysis.orderQtySumRate=databi(analysis.orderQtySum,analysis.upOrderQtySum) //销售订单数
				analysis.mbCardQtySumRate=databi(analysis.mbCardQtySum,analysis.upMbCardQtySum) //会员订单数
				analysis.chargeQtySumRate=databi(analysis.chargeQtySum,analysis.upChargeQtySum) //充值订单数
				analysis.returnQtySumRate=databi(analysis.returnQtySum,analysis.upReturnQtySum)//退款订单数

				analysis.amountRate=databi(analysis.amount,analysis.upAmount)//毛利润额
				analysis.saleAmountRate=databi(analysis.saleAmount,analysis.upSaleAmount) //销售额
				analysis.mbCardAmountRate=databi(analysis.mbCardAmount,analysis.upMbCardAmount)//会员销售额
				analysis.chargeAmountRate=databi(analysis.chargeAmount,analysis.upChargeAmount)//充值金额
				analysis.returnAmountRate=databi(analysis.returnAmount,analysis.upReturnAmount)//退款金额

				const datalist1=[{
					title:'销售订单数',
					value:analysis.orderQtySum,
					rate:Math.abs(analysis.orderQtySumRate),
					text:'同比上周',
					type:(analysis.orderQtySumRate<0)?'0':'1'
				},{
					title:'会员订单数',
					value:analysis.mbCardQtySum,
					rate:Math.abs(analysis.mbCardQtySumRate),
					text:'同比上周',
					type:(analysis.mbCardQtySumRate<0)?'0':'1'
				},{
					title:'充值订单数',
					value:analysis.chargeQtySum,
					rate:Math.abs(analysis.chargeQtySumRate),
					text:'同比上周',
					type:(analysis.chargeQtySumRate<0)?'0':'1'
				},{
					title:'退款订单数',
					value:analysis.returnQtySum,
					rate:Math.abs(analysis.returnQtySumRate),
					text:'同比上周',
					type:(analysis.returnQtySumRate<0)?'0':'1'
				}]

				const datalist2=[{
					title:'毛利润额',
					value:analysis.amount,
					rate:Math.abs(analysis.amountRate),
					text:'同比上周',
					type:(analysis.amountRate<0)?'0':'1'
				},{
					title:'销售额',
					value:analysis.saleAmount,
					rate:Math.abs(analysis.saleAmountRate),
					text:'同比上周',
					type:(analysis.saleAmountRate<0)?'0':'1'
				},{
					title:'会员销售额',
					value:analysis.mbCardAmount,
					rate:Math.abs(analysis.mbCardAmountRate),
					text:'同比上周',
					type:(analysis.mbCardAmountRate<0)?'0':'1'
				},{
					title:'充值金额',
					value:analysis.chargeAmount,
					rate:Math.abs(analysis.chargeAmountRate),
					text:'同比上周',
					type:(analysis.chargeAmountRate<0)?'0':'1'
				},{
					title:'退款金额',
					value:analysis.returnAmount,
					rate:Math.abs(analysis.returnAmountRate),
					text:'同比上周',
					type:(analysis.returnAmountRate<0)?'0':'1'
				}]


				yield put({type: 'selldatalist',payload:{analysis,updateTime,datalist1,datalist2}});
			}	
		},
		
},
	subscriptions: {},
};
