import {
  getDetailApi,
  getSaveApi
} from '../../../services/operate/bAnswer'
export default{
  namespace:'bAddAnswer',
  state:{
    detail:{}
  },
  reducers:{
    getDetail(state,{payload:{dataList, currentPage, limit, total}}){
      return { ...state, dataList, currentPage, limit, total}
    },
    clearSelect(state,{payload:{selectedRowKeys}}){
      return { ...state,selectedRowKeys}
    }
  },
  effects:{
    *fetchInfo({payload:values},{call,put}){
      const result =  yield call(getDetailApi,values);
      // if(result.code == '0'){
      //   const { pdAnswer, currentPage, limit, total } = result;
      //   pdAnswer.map((item,index)=>{
      //     item.key = index;
      //     return item;
      //   });
      //   yield put({
      //     type:'getList',
      //     payload:{
      //       dataList:pdAnswer,
      //       currentPage,
      //       limit,
      //       total,
      //     }
      //   });
      // };
    }
  }
}
