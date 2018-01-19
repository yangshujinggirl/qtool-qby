
export default {
  	namespace: 'dataclassdes',
  	state: {
		categoryAnalysis:[],
		updateTime:null,
		values:{}
  	},
  	reducers: {
		tablefetch(state, { payload:{categoryAnalysis,updateTime,values}}) {
			return {...state,categoryAnalysis,updateTime,values}
		},
	},
  	effects: {},
  	subscriptions: {},
};
