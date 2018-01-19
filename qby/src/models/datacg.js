import {GetServerData} from '../services/services';
import NP from 'number-precision'

function databi(a,b){
	var Rate=0
	if(a>0 && b>0){
		Rate=NP.round(NP.divide(NP.minus(a,b),b),2); 
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
	namespace: 'datacg',
	state: {
		iRpPurchaseAnalysis:{},
		data:[],
		analysis:[]
	},
	reducers: {
		selldatalist(state, { payload:{iRpPurchaseAnalysis,data}}) {
			return {...state,iRpPurchaseAnalysis,data}
		},
		tablefetchs(state, { payload:analysis}) {
			return {...state,analysis}
		},
	},
	effects: {
		*sellfetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			console.log(result)
			if(result.code=='0'){
				const iRpPurchaseAnalysis=result.iRpPurchaseAnalysis
				iRpPurchaseAnalysis.purchaseAmountRate=databi(iRpPurchaseAnalysis.purchaseAmount,iRpPurchaseAnalysis.upPurchaseAmount) //采购金额
				iRpPurchaseAnalysis.purchaseQtyRate=databi(iRpPurchaseAnalysis.purchaseQty,iRpPurchaseAnalysis.upPurchaseQty) //采购数量
				iRpPurchaseAnalysis.returnAmountRate=databi(iRpPurchaseAnalysis.returnAmount,iRpPurchaseAnalysis.upReturnAmount) //才退金额
				iRpPurchaseAnalysis.returnQtyRate=databi(iRpPurchaseAnalysis.returnQty,iRpPurchaseAnalysis.upReturnQty) //才退数量
				const data=[{
					title:'本月采购金额',
					value:iRpPurchaseAnalysis.purchaseAmount,
					rate:Math.abs(iRpPurchaseAnalysis.purchaseAmountRate),
					text:'同比上月',
					type:(iRpPurchaseAnalysis.purchaseAmountRate<0)?'0':'1'
				},{
					title:'本月采购商品数',
					value:iRpPurchaseAnalysis.purchaseQty,
					rate:Math.abs(iRpPurchaseAnalysis.purchaseQtyRate),
					text:'同比上月',
					type:(iRpPurchaseAnalysis.qbyQtyRate<0)?'0':'1'
				},{
					title:'本月采退金额',
					value:iRpPurchaseAnalysis.returnAmount,
					rate:Math.abs(iRpPurchaseAnalysis.returnAmountRate),
					text:'同比上月',
					type:(iRpPurchaseAnalysis.returnAmountRate<0)?'0':'1'
				},{
					title:'本月采退商品数',
					value:iRpPurchaseAnalysis.returnQty,
					rate:Math.abs(iRpPurchaseAnalysis.returnQtyRate),
					text:'同比上月',
					type:(iRpPurchaseAnalysis.returnQtyRate<0)?'0':'1'
				}]

				yield put({type: 'selldatalist',payload:{iRpPurchaseAnalysis,data}});
			}	
		},
		*tablefetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			console.log(result)
			if(result.code=='0'){
				const analysis=result.analysis
				for(var i=0;i<analysis.length;i++){
					analysis[i].index=i+1
				}
				yield put({type: 'tablefetchs',payload:analysis});
			}	
		},
		
},
	subscriptions: {},
};
