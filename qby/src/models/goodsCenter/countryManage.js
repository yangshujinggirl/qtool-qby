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
    countryDetail:{},
    fileDomain:''
  },
  reducers: {
    getList( state, { payload : {dataList, currentPage, limit, total, fileDomain} }) {
      return { ...state, dataList, currentPage, limit, total, fileDomain}
    },
    editCountry(state, { payload : countryDetail }) {
      return {...state, countryDetail }
    },
  },
  effects: {
    *fetchList({ payload: values }, { call, put ,select}) {
      const result=yield call(getListApi,values);
      if(result.code=='0') {
        let { countrys, currentPage, limit, total, fileDomain } = result;
        countrys = countrys.map((el) => {
          el.url = `${fileDomain}${el.url}`;
          return el;
        })
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
