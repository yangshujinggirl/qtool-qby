import { getListApi } from '../../../services/goodsCenter/exchangeAct/index'

export default{
  namespace:'exchangeAct',
  state:{
    dataList:[]
  },
  reducers:{
    getList(state,{payload:{dataList, currentPage, limit, total} }){
      return { ...state, dataList, currentPage, limit, total}
    }
  },
  effects:{
    *fetchList({payload:values},{call,put}){
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
      // const result = {
      //   code:'0',
      //   pdSpuActives:[
      //     {pdSpuActiveId:1,name:'csac',picUrl:'qtltest/spu/1903/18/1552878163157.jpg',price:3,valueQty:7,convertibleQty:9,leftQty:10,createUserId:'cwev'},
      //     {pdSpuActiveId:2,name:'2222',picUrl:'qtltest/spu/1903/08/1552012885981.jpg',price:3,valueQty:7,convertibleQty:9,leftQty:10,createUserId:'cwev'}
      //   ]
      // }
      if(result.code == '0'){
        const { pdSpuActives, currentPage, limit, total } = result;
        pdSpuActives.map((item,index)=>{
          item.key = index;
          return item;
        });
        yield put({
          type:'getList',
          payload:{
            dataList:pdSpuActives,
            currentPage,
            limit,
            total,
          }
        });
      };
    },
  },
}
