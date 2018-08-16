import {
  getListApi,
  goodSaveApi
 } from '../../services/goodsCenter/countryManage.js';

export default {
  namespace:'countryManage',
  state: {
    data: {
      dataList:[],//列表
      currentPage:0,
      limit:15,
      total:0,
    },
    imageUrl:null,
    fileDomain:'',
    authorityList:{
      authorityEdit:false,
    }
  },
  reducers: {
    setAuthority(state, { payload : authorityData }) {
      let authorityList={};
      authorityData.map((el) => {
        switch(el.urResourceId){
          case 311200:
            authorityList.authorityEdit=true;
            break;
        }
      })
      return { ...state, authorityList }
    },
    getList( state, { payload : {data, fileDomain} }) {
      return { ...state, data, fileDomain}
    },
    setFileList( state, { payload : imageUrl }) {
      return { ...state, imageUrl }
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
            data:{
              dataList:countrys,
              currentPage,
              limit,
              total,
            },
            fileDomain
          }
        })
      }
    },
  }
}
