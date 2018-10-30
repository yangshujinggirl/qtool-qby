import { getListApi, getDetailApi } from '../../services/server/cServerOrder';

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
      replys:[]
    }
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
      //默认分页是16
      if(!values.limit) {
        values = {...values,...{ limit: fixedLimit}}
      }
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});

      if(result.code == '0'){
        const { list, currentPage, limit, total } = result;
        list&&list.map((item,index)=>{
          item.key = item.udeskTicketId;
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
        const { udeskTicketVo, replys,  fileDomain} =res;
        replys&&replys.map((el,index) => (
          el.key = el.replyId
        ))
        yield put({
          type:'getDetail',
          payload:{
            detailInfo:{
              udeskTicketVo,
              replys
            }
          }
        });
      }
    }
  },
}
