
import {GetServerData} from '../services/services';
import {  Button, message } from 'antd';
export default {
  	namespace: 'feedback',
  	state: {
		values:{},
		cardtitle:'反馈信息',
		cardlist:[],
		logstitle:'处理日志',
		logs:[],
		remark:'',
		feedbackPics:[],
		type:'1',
		status:'2',
		editremark:null,
		feedbacks:[],
		limit:15,
		currentPage:0,
		total:0
	  },
  	reducers: {

		infolist(state, { payload:{cardtitle,cardlist,logstitle,logs,remark,feedbackPics,type,status}}) {
			return {...state,cardtitle,cardlist,logstitle,logs,remark,feedbackPics,type,status}
		},
		initstatedata(state, { payload:{}}) {
			const editremark=null
			return {...state,editremark}
		},
		typechange(state, { payload:type}) {
			return {...state,type}
		},
		statuschange(state, { payload:status}) {
			return {...state,status}
		},
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		editremarkchange(state, { payload:editremark}) {
			return {...state,editremark}
		},
		fetchlist(state, { payload:{feedbacks,limit,currentPage,total}}) {
			return {...state,feedbacks,limit,currentPage,total}
		},
	  },
  	effects: {
		*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const feedbacks=result.feedbacks
				const limit=result.limit;
                const currentPage=result.currentPage;
				const total=result.total;
			   yield put({type: 'fetchlist',payload:{feedbacks,limit,currentPage,total}});
			} 
  		}, 
    	*infofetch({ payload: {code,values} }, { call, put ,select}) {
      		const result=yield call(GetServerData,code,values);
      		yield put({type: 'tab/loding',payload:false});
      		if(result.code=='0'){
				  console.log(result)
				  const feedbacks=result.feedbacks
				//内容
				const remark=feedbacks[0].remark
				const feedbackPics=result.feedbackPics
				const type=String(feedbacks[0].type)
				const status=String(feedbacks[0].status)
				//card
				const cardtitle='反馈信息'
				const cardlist=[
					{lable:'反馈编号',text:feedbacks[0].feedbackNo},
					{lable:'反馈门店',text:feedbacks[0].spShopName},
					{lable:'门店店主',text:feedbacks[0].shopMan},
					{lable:'店主电话',text:feedbacks[0].telephone},
					{lable:'反馈类型',text:feedbacks[0].typeStr},
					{lable:'反馈状态',text:feedbacks[0].statusStr},
					{lable:'处理时长',text:feedbacks[0].handleTime},
					{lable:'反馈时间',text:feedbacks[0].createTime}
				]
				//日志
				const logstitle='处理日志'
				const logs=result.feedbackLogs
				yield put({type: 'infolist',payload:{cardtitle,cardlist,logstitle,logs,remark,feedbackPics,type,status}});
      		} 
	}, 
	

  },
  subscriptions: {},
};
