import {GetServerData} from '../services/services';

export default {
  	namespace: 'h5config',
  	state: {
        configArr:[],
        currentItem:1
	},
	  
  	reducers: {
		syncConfigArr(state, { payload:configArr}) {
            return {...state,configArr}
        },
        syncCurrentItem(state, { payload:currentItem}) {
            return {...state,currentItem}
        },
  	},
  	effects: {
  		
  	},
  	subscriptions: {

	}
};
