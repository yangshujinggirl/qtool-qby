import {GetServerData} from '../services/services';
import NP from 'number-precision'

function databi(sa,sb){
	const a=(sa==null)?0:sa
	const b=(sb==null)?0:sb
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
	namespace: 'dataspsell',
	state: {
		shopSaleData:{},
		data:[],
		listdata:[],
		xdata:[],
		data1:[],
		data2:[],
		data3:[],
		data4:[],
		shopSaleDatas:[],
		datasouce:[],
		tabledatasouce:[],
		values:{},
		updateTime:null
	},
	reducers: {
		selldatalist(state, { payload:{shopSaleData,data,listdata,updateTime}}) {
			return {...state,shopSaleData,data,listdata,updateTime}
		},
		shopSaleDatas(state, { payload:shopSaleDatas}) {
			return {...state,shopSaleDatas}
		},
		initdatasouce(state, { payload:datasouce}) {
			return {...state,datasouce}
		},
		tabledatasouce(state, { payload:tabledatasouce}) {
			return {...state,tabledatasouce}
		},
		synvalues(state, { payload:values}) {
			return {...state,values}
		},
	},
	effects: {
		*sellfetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const shopSaleData=result.shopSaleData
				const updateTime=shopSaleData.updateTime
				const dsa=!shopSaleData.yesterdayCostAmount?0:shopSaleData.yesterdayCostAmount
				const dsb=!shopSaleData.upYesterdayCostAmount?0:shopSaleData.upYesterdayCostAmount
				shopSaleData.yesterdaysellRate=(!shopSaleData.yesterdayAmount || Number(shopSaleData.yesterdayAmount==0))?0:NP.round(NP.divide(NP.minus(shopSaleData.yesterdayAmount, dsa),shopSaleData.yesterdayAmount),2);//昨日毛利率
				shopSaleData.yesterdaysellRates=String(NP.times(shopSaleData.yesterdaysellRate,100))+'%';//昨日毛利率展示
				shopSaleData.upyesterdaysellRate=(!shopSaleData.upYesterdayAmount || Number(shopSaleData.upYesterdayAmount)=='0')?0:NP.round(NP.divide(NP.minus(shopSaleData.upYesterdayAmount, dsb),shopSaleData.upYesterdayAmount),2);//上期昨日毛利率
				shopSaleData.posAmountBi=databi(shopSaleData.posAmount,shopSaleData.upPosAmount) //毛销售额
				shopSaleData.possaleAmountBi=databi(shopSaleData.saleAmount,shopSaleData.upSaleAmount)  //销售额
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
					value:shopSaleData.yesterdaysellRates,
					rate:Math.abs(shopSaleData.yesterdaysellRateBi),
					text:'同比上周',
					type:(shopSaleData.yesterdaysellRateBi<0)?'0':'1'
				}]
				const listdata=[{
					title:'门店排行榜',
					value:shopSaleData.shopRank,
					type:'1',
					bg:'#949494'

				},{
					title:'学习门店',
					value:shopSaleData.studyShop,
					type:'2',
					bg:"#ABDB7D"

				},{
					title:'指导门店',
					value:shopSaleData.guidanceShop,
					type:'3',
					bg:'#71A6F1'

				},{
					title:'注意门店',
					value:shopSaleData.carefulShop,
					type:'4',
					bg:'#BC2739'
				}]
				yield put({type: 'selldatalist',payload:{shopSaleData,data,listdata,updateTime}});
			} 
		},
		*tablefetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const shopSaleDatas=result.shopSaleDatas
				yield put({type: 'shopSaleDatas',payload:shopSaleDatas});
			} 
		},
		*soucetetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const tabledatasouce=result.shopSaleDatas
				for(var i=0;i<tabledatasouce.length;i++){
					tabledatasouce[i].rank=i+1
				}
				yield put({type: 'tabledatasouce',payload:tabledatasouce});
			} 
		},
		
},
	subscriptions: {},
};
