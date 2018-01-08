
import {GetServerData} from '../services/services';
import {  Button, message } from 'antd';
export default {
  	namespace: 'feedback',
  	state: {
		values:{},
		cardtitle:'反馈信息',
		cardlist:[
			{lable:'反馈编号',text:'1100'},
			{lable:'反馈门店',text:'1100'},
			{lable:'门店店主',text:'1100'},
			{lable:'店主电话',text:'1100'},
			{lable:'反馈类型',text:'1100'},
			{lable:'反馈状态',text:'1100'},
			{lable:'处理时长',text:'1100'},
			{lable:'反馈时间',text:'1100'}
		],
		logstitle:'处理日志',
		logs:[],
		remark:'我是反馈内容',
		feedbackPics:[{url:'qtltest/spu/1801/03/1514975342433.jpg'},{url:'qtltest/spu/1801/03/1514974955127.jpg'}],
		type:'1',
		status:'2',
		editremark:null,
		feedbacks:[{
			"feedbackId":"33",
			"feedbackNo":"123",
			"remark":"55",
			"type":"45",
			"status":"34",
			"shopName":"23",
			"shopMan":"1",
			"telephone":"34",
			"createTime":"2017-12-27", 
			"handleTime":'12'
		}],
		limit:15,
		currentPage:0,
		total:100
	  },
  	reducers: {
		infolist(state, { payload:{cardtitle,cardlist,logstitle,logs,remark,feedbackPics,type,status}}) {
			return {...state,cardtitle,cardlist,logstitle,logs,remark,feedbackPics,type,status}
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
				//内容
				const remark=result.remark
				const feedbackPics=result.feedbackPics
				const type=result.type
				const status=result.status
				//card
				const cardtitle='反馈信息'
				const cardlist=[
					{lable:'反馈编号',text:result.feedbackNo},
					{lable:'反馈门店',text:result.shopName},
					{lable:'门店店主',text:result.shopMan},
					{lable:'店主电话',text:result.telephone},
					{lable:'反馈类型',text:result.typeStr},
					{lable:'反馈状态',text:result.statusStr},
					{lable:'处理时长',text:result.handleTime},
					{lable:'反馈时间',text:result.createTime}
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
