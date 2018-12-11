import {GetServerData} from '../../services/services';
export default {
namespace: 'bStock',
state: {
	datasoucedata:[],
	changedatasouce:[],
	ishindok:false,
},
reducers: {
	stocktableinfo(state, { payload:datasoucedata}) {
		return {...state,datasoucedata}
	},
	stocktablechenge(state, { payload:changedatasouce}) {
		return {...state,changedatasouce}
	},
	stocktablechengeok(state, { payload:ishindok}) {
		return {...state,ishindok}
	},
	initinfo(state, { payload:{}}) {
		const datasoucedata=[]
		const changedatasouce=[]
		const ishindok=false
		return {...state,datasoucedata,changedatasouce,ishindok}
	},

},
effects: {

},
subscriptions: {},
};
