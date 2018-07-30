import {
  getListApi,
  goodSaveApi
 } from '../../services/goodsCenter/countryManage.js';

export default {
  namespace:'countryManage',
  state: {
    dataList:[],//列表
    currentPage:0,
    limit:15,
    total:0,
    fileDomain:'',
    imgUrl:true,
  },
  reducers: {
    getList( state, { payload : {dataList, currentPage, limit, total, fileDomain} }) {
      return { ...state, dataList, currentPage, limit, total, fileDomain}
    },
    setImg( state, { payload : imgUrl }) {
      return { ...state, imgUrl}
    },
  },
  effects: {
    *fetchList({ payload: values }, { call, put ,select}) {
      const result=yield call(getListApi,values);
      if(result.code=='0') {
        let { countrys, currentPage, limit, total, fileDomain } = result;
        yield put ({
          type: 'getList',
          payload:{
            dataList:countrys,
            currentPage,
            limit,
            total,
            fileDomain
          }
        })
      }
    },
  }
}
