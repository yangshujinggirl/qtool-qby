import {GetServerData} from '../services/services';
export default {
namespace: 'wspost',
state: {
	data:[],
	initform:null
},
reducers: {
	tabledata(state, { payload:data}) {
		return {...state,data}
	},
	initform(state, { payload:initform}) {
		return {...state,initform}
	},
	




},
effects: {
	*submitdata({ payload: values }, { call, put ,select}) {
		const datasouces = yield select(state => state.wspost.data)
		const data=datasouces.slice(0)
		data.unshift(values)
		for(var i=0;i<data.length;i++){
			data[i].key=i
		}
		yield put({type: 'tabledata',payload:data});
	}, 

},
subscriptions: {},
};


