import { getListApi, getDetailApi } from '../../services/server/cServerOrder';
import moment from 'moment';

export default{
  namespace:'cServerOrder',
  state:{
    data:{
      currentPage:0,
      limit:15,
      total:0,
      list:[{
        udeskTicketId:'0',
        code:'123',
        status:'1',
        key:0
      }]
    },
    detailInfo:{
      udeskTicketVo:{},
      replys:[],
      fileDomain:''
    },
  },
  reducers:{
    getList(state,{payload:{ data } }){
      return { ...state, data }
    },
    getDetail(state, { payload: { detailInfo }}) {
      return { ...state, detailInfo }
    },
    resetData(state) {
      let detailInfo={
        udeskTicketVo:{},
        replys:[]
      }
      return { ...state, detailInfo }
    }
  },
  effects:{
    *fetchList({payload:values},{ select, call,put}){
      const fixedLimit = yield select(state => state.cServerOrder.data.limit);
      let { createrTime, ...params } =values;
      //默认分页是16
      if(!params.limit) {
        params = {...params,...{ limit: fixedLimit}}
      }
      if(createrTime&&createrTime.length>0) {
        params.createTimeSTStr = moment(createrTime[0]).format('YYYY-MM-DD');
        params.createTimeETStr = moment(createrTime[1]).format('YYYY-MM-DD');
      }
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(getListApi,params);
      yield put({type: 'tab/loding',payload:false});

      if(result.code == '0'){
        let { list, currentPage, limit, total } = result;
        list = list?list:[];
        list.length>0&&list.map((item,index)=>{
          item.key = item.ticketId;
          return item;
        });
        yield put({
          type:'getList',
          payload:{
            data:{
              list,
              currentPage,
              limit,
              total,
            }
          }
        });
      };
    },
    *fetchDetail({ payload:values }, { call, put }) {
      const res = yield call(getDetailApi,values);
      if(res.code == '0') {
        let { udeskTicketVo, replys,  fileDomain} =res;
        replys = replys?replys:[];
        replys&&replys.map((el,index) => (
          el.key = el.replyId
        ))
        yield put({
          type:'getDetail',
          payload:{
            detailInfo:{
              udeskTicketVo,
              replys,
              fileDomain
            }
          }
        });
      }
    }
  },
}
