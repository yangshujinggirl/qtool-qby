import moment from 'moment';
import { getListApi } from '../../services/goodsCenter/brand.js';

export default {
  namespace:'brand',
  state: {
    dataList:[],
    currentPage:0,
    limit:15,
    total:0
  },
  reducers: {
    getList( state, { payload : {dataList, currentPage, limit, total} }) {
      return { ...state, dataList, currentPage, limit, total}
    }
  },
  effects: {
    *fetchList({ payload: values }, { call, put ,select}) {
      yield put({type: 'tab/loding',payload:true});
			console.log(values)
      const result=yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
      if(result.code=='0') {
        const { pdBrands, currentPage, limit, total } = result;
        pdBrands.map((item,index)=>{
					item.key = index;
				})
        yield put ({
          type: 'getList',
          payload:{
            dataList:pdBrands,
            currentPage,
            limit,
            total
          }
        })
      }
    }
  }
}
