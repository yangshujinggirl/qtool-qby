import {GetServerData} from '../services/services';
export default {
namespace: 'stock',
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

},
effects: {
		 
},
subscriptions: {},
};