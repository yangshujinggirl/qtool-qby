import {GetServerData} from '../services/services';
export default {
namespace: 'stock',
state: {
	pdTypes:[],
	datasoucedata:[],
	changedatasouce:[],
	ishindok:false,
},
reducers: {
	stocktableinfo(state, { payload:datasoucedata}) {
		return {...state,datasoucedata}
	},

},
effects: {
		 
},
subscriptions: {},
};
