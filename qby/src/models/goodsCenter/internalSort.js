import {
  getListApi,
 } from '../../services/goodsCenter/internalSort.js';
import {
  getCategoryApi,
} from '../../services/goodsCenter/commonGoods.js';

export default {
  namespace:'internalSort',
  state: {
    categoryList:{
      categoryLevelOne:[],//商品分类1列表
      categoryLevelTwo:[],//商品分类2列表
      categoryLevelThr:[],//商品分类3列表
      isLevelTwo:true,
      isLevelThr:true,
    },//
    categoryInfo:{},
    data:{
      dataList:[],
      currentPage:0,
      limit:15,
      total:0,
    },
    visible:false,
    authorityList:{
      authorityEdit:false,
    },
  },
  reducers: {
    setAuthority(state, { payload : authorityData }) {
      let authorityList={};
      authorityData.map((el) => {
        switch(el.urResourceId){
          case 302200:
            authorityList.authorityEdit=true;
            break;
        }
      })
      return { ...state, authorityList }
    },
    setVisible(state, { payload : visible }) {
      return {...state,visible}
    },
    getList( state, { payload : {data} }) {
      return { ...state, data}
    },
    getCategoryInfo(state, { payload : { categoryInfo, categoryList } }) {
      return { ...state, categoryInfo, categoryList }
    },
    resetData(state) {
      const categoryInfo = {};
      const categoryList = {
        categoryLevelOne:[],//商品分类1列表
        categoryLevelTwo:[],//商品分类2列表
        categoryLevelThr:[],//商品分类3列表
        isLevelTwo:true,
        isLevelThr:true,
      }
      const data ={
              dataList:[],
              currentPage:0,
              limit:15,
              total:0,
            }
      const visible = false ;
      return { ...state, categoryInfo, categoryList, data, visible }
    },
    resetSorftInfoData(state) {
      const categoryInfo = {};
      const visible = false;
      return { ...state, categoryInfo, visible }
    }
  },
  effects: {
    *fetchList({ payload: values },{ call, put ,select}) {
      const fixedLimit = yield select(state => state.internalSort.data.limit);
      const authorityEdit = yield select(state => state.internalSort.authorityList.authorityEdit);
      //默认分页是16
      if(!values.limit) {
        values = {...values,...{ limit: fixedLimit}}
      }
      const { level } = values;
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});
      //处理分类数据，disabled状态
      if(result.code == '0') {
        let  { pdCategorys, currentPage, limit, total } = result;
        pdCategorys = pdCategorys&&pdCategorys.map((el) => {
          el.key = el.pdCategoryId;
          el.authorityEdit = authorityEdit;
          return el;
        })
        yield put({
          type:'getList',
          payload:{
            data:{
              currentPage,
              limit,
              total,
              dataList:pdCategorys,
            }
          }
        })
      }
    },
    *handleChange({ payload: values },{ call, put ,select}) {
      let categoryLevelOne = yield select(state => state.internalSort.categoryList.categoryLevelOne);
      let categoryLevelTwo = yield select(state => state.internalSort.categoryList.categoryLevelTwo);
      let categoryLevelThr = yield select(state => state.internalSort.categoryList.categoryLevelThr);
      let isLevelTwo = yield select(state => state.internalSort.categoryList.isLevelTwo);
      let isLevelThr = yield select(state => state.internalSort.categoryList.isLevelThr);
      let categoryInfo = yield select(state => state.internalSort.categoryInfo);
      const { level, parentId } = values;
      values = {...values,...{status:1}};
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(getCategoryApi,values);
      yield put({type: 'tab/loding',payload:false});
      //处理分类数据，disabled状态
      if(result.code == '0') {
        let  { pdCategory, currentPage, limit, total } = result;
        pdCategory&&pdCategory.map((el) => el.key = el.pdCategoryId);
        switch(level) {
          case '1':
            categoryLevelOne = pdCategory;
            categoryLevelTwo = [];
            categoryLevelThr = [];
            isLevelTwo = true;
            isLevelThr =true;
            categoryInfo.pdCategoryId1= null;
            categoryInfo.pdCategoryId2 = null;
            categoryInfo.pdCategoryId3 = null;
            break;
          case '2':
            categoryLevelTwo = pdCategory;
            categoryLevelThr = [];
            categoryInfo.pdCategoryId1= parentId;
            categoryInfo.pdCategoryId2 = null;
            categoryInfo.pdCategoryId3 = null;
            isLevelTwo = false;
            isLevelThr =true;
            break;
          case '3':
            categoryLevelThr = pdCategory;
            categoryInfo.pdCategoryId2 = parentId;
            categoryInfo.pdCategoryId3 = null;
            isLevelTwo = false;
            isLevelThr =false;
            break;
        }
        yield put({
          type:'getCategoryInfo',
          payload:{
            categoryInfo,
            categoryList:{
              categoryLevelOne,
              categoryLevelTwo,
              categoryLevelThr,
              isLevelTwo,
              isLevelThr,
            }
          }
        })
      }
    },
    *fetchSortInfo({ payload: values },{ call, put ,select}) {
      let categoryLevelOne = yield select(state => state.internalSort.categoryList.categoryLevelOne);
      let categoryLevelTwo = yield select(state => state.internalSort.categoryList.categoryLevelTwo);
      let categoryLevelThr = yield select(state => state.internalSort.categoryList.categoryLevelThr);
      let isLevelTwo = yield select(state => state.internalSort.categoryList.isLevelTwo);
      let isLevelThr = yield select(state => state.internalSort.categoryList.isLevelThr);
      const { level, pdCategoryId } =values;
      yield put({type: 'tab/loding',payload:true});
      const result = yield call(getListApi,values);
      yield put({type: 'tab/loding',payload:false});

      if(result.code == '0') {
        let  { pdCategorys } = result;
        pdCategorys = pdCategorys&&pdCategorys.length>0&&pdCategorys[0];
        let {
          pdCategoryId1,
          pdCategoryId2,
          pdCategoryId3,
         } = pdCategorys;
        if(level == '2') {
          const resultOne = yield call(getCategoryApi, { level:'1', parentId: null, status:1 });
          if(resultOne.code == '0') {
            categoryLevelOne = resultOne.pdCategory;
            isLevelTwo=false;
          }
        }else if( level == '3') {
          const [resultOne,resultTwo] = yield [
                  call(getCategoryApi, { level:'1', parentId: null, status:1 }),
                  call(getCategoryApi, { level:'2', parentId: pdCategoryId1, status:1 }),
                ];
          if(resultOne.code == '0') {
            categoryLevelOne = resultOne.pdCategory;
            isLevelTwo=false;
          }
          if(resultTwo.code == '0') {
            categoryLevelTwo = resultTwo.pdCategory;
          }
        } else if(level == '4') {
          const [resultOne,resultTwo,resultThr] = yield [
                  call(getCategoryApi, { level:'1', parentId: null, status:1 }),
                  call(getCategoryApi, { level:'2', parentId: pdCategoryId1, status:1 }),
                  call(getCategoryApi, { level:'3', parentId: pdCategoryId2, status:1 }),
                ];
          if(resultOne.code == '0') {
            categoryLevelOne = resultOne.pdCategory;
            isLevelTwo=false;
          }
          if(resultTwo.code == '0') {
            categoryLevelTwo = resultTwo.pdCategory;
            isLevelTwo=false;
          }
          if(resultThr.code == '0') {
            categoryLevelThr = resultThr.pdCategory;
            isLevelThr=false;
          }
        }
        yield put({
          type:'getCategoryInfo',
          payload:{
            categoryInfo:pdCategorys,
            categoryList:{
              categoryLevelOne,
              categoryLevelTwo,
              categoryLevelThr,
              isLevelTwo,
              isLevelThr,
            }
          }
        })
        yield put({type: 'setVisible',payload:true});
      }
    },
  }
}
