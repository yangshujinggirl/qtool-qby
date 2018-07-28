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
    fileDomain:''
  },
  reducers: {
    getList( state, { payload : {dataList, currentPage, limit, total} }) {
      return { ...state, dataList, currentPage, limit, total}
    },
  },
  effects: {
    *fetchList({ payload: values }, { call, put ,select}) {
      const result=yield call(getListApi,values);
      if(result.code=='0') {
        let { countrys, currentPage, limit, total, fileDomain } = result;
        countrys = countrys.map((el) => {
          el.fileList = [{
            uid:el.pdCountryId,
            url:`${fileDomain}${el.url}`,
            name: el.url,
            status: 'done',
          }]
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
          }
        })
      }
    },
  }
}
