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
	namespace: 'datagodes',
	state: {
		analysis:{},
		updateTime:null,
		updateTimes:null,
		data:[],
		listdata:[],
		datasouce:[],

		xdata:[],
		data1:[],
		data2:[],
		data3:[],
		data4:[]
	},
	reducers: {
		selldatalist(state, { payload:{analysis,updateTime,data,listdata}}) {
			return {...state,analysis,updateTime,data,listdata}
		},
		tablefetch(state, { payload:shopSaleDatas}) {
			return {...state,shopSaleDatas}
		},
		datasouce(state, { payload:{datasouce,updateTimes}}) {
			return {...state,datasouce,updateTimes}
		},
	},
	effects: {
		*sellfetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const analysis=result.analysis
				const updateTime=analysis.updateTime
				analysis.qbyAmountRate=databi(analysis.qbyAmount,analysis.upQbyAmount) //掌柜销售金额
				analysis.qbyQtyRate=databi(analysis.qbyQty,analysis.upQbyQty) //掌柜销售数量
				analysis.posAmountRate=databi(analysis.posAmount,analysis.upPosAmount) //pos销售金额
				analysis.posQtyRate=databi(analysis.posQty,analysis.upPosQty) //pos销售数量
				const data=[{
					title:'掌柜销售金额',
					value:analysis.qbyAmount,
					rate:Math.abs(analysis.qbyAmountRate),
					text:'同比上周',
					type:(analysis.qbyAmountRate<0)?'0':'1'
				},{
					title:'掌柜销售数量',
					value:analysis.qbyQty,
					rate:Math.abs(analysis.qbyQtyRate),
					text:'同比上周',
					type:(analysis.qbyQtyRate<0)?'0':'1'
				},{
					title:'POS销售金额',
					value:analysis.posAmount,
					rate:Math.abs(analysis.posAmountRate),
					text:'同比上周',
					type:(analysis.posAmountRate<0)?'0':'1'
				},{
					title:'POS销售数量',
					value:analysis.posQty,
					rate:Math.abs(analysis.posQtyRate),
					text:'同比上周',
					type:(analysis.posQtyRate<0)?'0':'1'
				}]

				const listdata=[{
					title:'POS热销商品',
					value:analysis.posSellPd,
					type:'1',
					bg:'#949494'
				},{
					title:'掌柜热销商品',
					value:analysis.qbySellPd,
					type:'2',
					bg:"#ABDB7D"

				},{
					title:'建议采购商品',
					value:analysis.proposalPd,
					type:'3',
					bg:'#71A6F1'
				},{
					title:'掌柜滞销商品',
					value:analysis.unsalablePd,
					type:'4',
					bg:'#BC2739'
				}]
				

				yield put({type: 'selldatalist',payload:{analysis,updateTime,data,listdata}});
			}	
		},
		*soucetetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const datasouce=result.analysis
				for(var i=0;i<datasouce.length;i++){
					datasouce[i].rank=(i+1)
				}

				const updateTimes=result.updateTime?result.updateTime:null
				yield put({type: 'datasouce',payload:{datasouce,updateTimes}});
			}	
		},
		





		
},
	subscriptions: {},
};
