
export default {
  	namespace: 'dataclassdes',
  	state: {
		categoryAnalysis:[],
		updateTime:null
  	},
  	reducers: {
		tablefetch(state, { payload:{categoryAnalysis,updateTime}}) {
			return {...state,categoryAnalysis,updateTime}
		},
	},
  	effects: {},
  	subscriptions: {},
};
