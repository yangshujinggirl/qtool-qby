import {GetServerData} from '../services/services';

export default {
  	namespace: 'h5config',
  	state: {
        configArr:[],
        currentItem:1,
        syncInitFc:{}
	},
	  
  	reducers: {
		syncConfigArr(state, { payload:configArr}) {
            return {...state,configArr}
        },
        syncCurrentItem(state, { payload:currentItem}) {
            return {...state,currentItem}
        },
        syncInitFc(state, { payload:syncInitFc}) {
            return {...state,syncInitFc}
        }
  	},
  	effects: {
  		
  	},
  	subscriptions: {

	}
};
