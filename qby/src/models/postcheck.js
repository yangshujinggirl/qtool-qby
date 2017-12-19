import {GetServerData} from '../services/services';
import { message } from 'antd';
export default {
namespace: 'postcheck',
state: {
	dataSource:[],
	limit:15,
	total:0,
	text:null,
	text1:null,
	currentPage:0,
	wsOrderId:null,
	qty:1,
	phcode:'',
	barcode:''
},
reducers: {
	tabledata(state, { payload: {dataSource,total,limit,text,currentPage,wsOrderId,qty}}) {
		return {...state,dataSource,total,limit,text,currentPage,wsOrderId,qty}
	},
	phcode(state, { payload:phcode}) {
		return {...state,phcode}
	},
	barcode(state, { payload:barcode}) {
		return {...state,barcode}
	},
	textvalue(state, { payload:text}) {
		return {...state,text}
	},
	qtyvalue(state, { payload:qty}) {
		return {...state,qty}
	},
	datasouce(state, { payload:{dataSource,total,limit,currentPage}}) {
		return {...state,dataSource,total,limit,currentPage}
	},
	initstate(state, { payload:{}}) {
		const dataSource=[]
		const text=null;
		const text1=null;
		const currentPage=0;
		const limit=10;
		const total=0;
		const wsOrderId=null
		const qty=1;
		const phcode=''
		const barcode=''
		return {...state,dataSource,total,limit,currentPage,text,text1,wsOrderId,qty,phcode,barcode}
	},
},
effects: {
	*fetch({ payload: {code,values} }, { call, put ,select}) {
		const result=yield call(GetServerData,code,values);
		yield put({type: 'tab/loding',payload:false});
		if(result.code=='0'){
			const dataSource=result.wsOrder.wsOrderDetails
			for(var i=0;i<dataSource.length;i++){
				if(dataSource[i].pdSkuBarcode==null || dataSource[i].pdSkuBarcode==undefined || dataSource[i].pdSkuBarcode==''){
					dataSource[i].pdSkuBarcode=dataSource[i].pdSpuBarcode
				}
			}
			const total=result.total
			const limit=result.limit 
			const currentPage=result.currentPage
			yield put({type: 'datasouce',payload:{dataSource,total,limit,currentPage}});
		}
},
},
subscriptions: {},
};
