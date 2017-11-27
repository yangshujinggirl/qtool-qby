import { GetServerData} from '../services/service';
import { message } from 'antd';
export default {
namespace: 'postcheck',
state: {
	dataSource:[],
	limit:10,
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
	datasouce(state, { payload:dataSource,total,limit,currentPage}) {
		return {...state,dataSource,total,limit,currentPage}
	},



},
effects: {
	*fetch({ payload: {code,values} }, { call, put ,select}) {
	const result=yield call(GetServerData,code,values);
	console.log(result)
	if(result.code=='0'){
		const dataSource=result.wsOrder.wsOrderDetails
		const total=result.total
		const limit=result.limit 
		const currentPage=result.currentPage
		yield put({type: 'datasouce',payload:{dataSource,total,limit,currentPage}});
	}else{
		message.error(json.message)
	}
},
},
subscriptions: {},
};
