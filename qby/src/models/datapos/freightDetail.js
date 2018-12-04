import {
  getListApi,
} from '../../services/datapos/freightDetail.js';

export default {
  namespace:'freightDetail',
  state:{
    list:[],
    data:{
      currentPage:0,
      limit:16,
      total:0,
    },
    totalData:{}
  },
  reducers: {
    getList( state, { payload : {list, data, totalData} }) {
      return { ...state, list, data, totalData}
    },
  },
  effects:{
    *fetchList({ payload: values }, { call, put ,select}) {
      const fixedLimit = yield select(state => state.sellManage.data.limit);
      //默认分页是16
      if(!values.limit) {
        values = {...values,...{ limit: fixedLimit}}
      }
      yield put({type: 'tab/loding',payload:true});
      const result=yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code=='0') {
        let { rpDeliveryFeeHead, listDeliveryFeeVos, currentPage, limit, total } = result;
        // listDeliveryFeeVos=[{
        //     orderNo:'1',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'2',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'3',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'4',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'5',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'6',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'7',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'8',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'9',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'10',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'11',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'12',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'13',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'14',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'15',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'16',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'17',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   },{
        //     orderNo:'18',
        //     standardExpressAmount:'23',
        //     createTime:'2018-11-17'
        //   }];
        // total = 18;
        // currentPage=0;
        // limit=16;
        listDeliveryFeeVos = listDeliveryFeeVos?listDeliveryFeeVos:[];
        listDeliveryFeeVos.length>0&&listDeliveryFeeVos.map((el,index) => el.key = el.orderNo);
        yield put ({
          type: 'getList',
          payload:{
            list:listDeliveryFeeVos,
            data:{
              currentPage,
              limit,
              total
            },
            totalData:rpDeliveryFeeHead
          }
        })
      }
    },
  }
}
