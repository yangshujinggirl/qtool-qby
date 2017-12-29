import {GetServerData} from '../services/services';

export default {
  	namespace: 'h5config',
  	state: {
        configArr:[],
        configArrPre:[],
        currentItem:1,
        syncInitFc:{}
	},
	  
  	reducers: {
		syncConfigArr(state, { payload:configArr}) {
            return {...state,configArr}
        },
        syncConfigArrPre(state, { payload:configArrPre}) {
            return {...state,configArrPre}
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
