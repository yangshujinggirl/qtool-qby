import {GetServerData} from '../services/services';
import NP from 'number-precision'

export default {
	namespace: 'datagodes',
	state: {
		analysis:{},
		updateTime:null,
		data:[],
		listdata:[],

		xdata:['周一','周二','周三','周四','周五','周六','周日'],
		data1:[11, 21, 15, 13, 12, 13, 10],
		data2:[1, 2, 2, 5, 3, 2, 0],
		data3:[11, 11, 15, 13, 12, 13, 10],
		data4:[1, 22, 2, 5, 3, 2, 0]
	},
	reducers: {
		selldatalist(state, { payload:{analysis,updateTime,data,listdata}}) {
			return {...state,analysis,updateTime,data,listdata}
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
				const analysis=result.analysis
				const updateTime=analysis.updateTime

				console.log('001')
				if(analysis.qbyAmount!=0 && analysis.upQbyAmount!=0){
					analysis.qbyAmountRate=NP.round(NP.divide(NP.minus(analysis.qbyAmount, analysis.upQbyAmount),analysis.upQbyAmount),2); //掌柜金额环比
				}else{
					if(analysis.upQbyAmount==0 ){
						analysis.qbyAmountRate=(analysis.qbyAmount!=0)?100:0
					}else{
						analysis.qbyAmountRate=0
					}
				}
				console.log('002')
				if(analysis.qbyQty!=0 && analysis.upQbyQty!=0){
					analysis.qbyQtyRate=NP.round(NP.divide(NP.minus(analysis.qbyQty, analysis.upQbyQty),analysis.upQbyQty),2); //掌柜数量环比
				}else{
					if(analysis.upQbyQty==0 ){
						analysis.qbyQtyRate=(analysis.qbyQty!=0)?100:0
					}else{
						analysis.qbyQtyRate=0
					}
				}
				console.log('003')
				if(analysis.posAmount!=0 && analysis.upPosAmount!=0){
					analysis.posAmountRate=NP.round(NP.divide(NP.minus(analysis.posAmount, analysis.upPosAmount),analysis.upPosAmount),2); //pos金额环比
				}else{
					if(analysis.upPosAmount==0 ){
						analysis.posAmountRate=(analysis.posAmount!=0)?100:0
					}else{
						analysis.posAmountRate=0
					}
				}
				console.log('004')
				if(analysis.posQty!=0 && analysis.upPosQty!=0){
					analysis.posQtyRate=NP.round(NP.divide(NP.minus(analysis.posQty, analysis.upPosQty),analysis.upPosQty),2); //pos数量环比
				}else{
					if(analysis.upPosQty==0 ){
						analysis.posQtyRate=(analysis.posQty!=0)?100:0
					}else{
						analysis.posQtyRate=0
					}
				}

				console.log(123)
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

				console.log(456)
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
		
},
	subscriptions: {},
};
