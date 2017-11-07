import {GetServerData} from '../services/services';
import {message} from 'antd';
export default {
  namespace: 'sider',
  state: {
  	menus:[]
  },
  reducers: {
  	menulist(state, { payload: menus}) {
        return {...state,menus}
    },
  },
  effects: {
  		*fetch({ payload: {code,values} }, { call, put }) {
            const result=yield call(GetServerData,code,values);
            if(result.code=='0'){
                let {menus}=result;
                let first = menus[0].children[0];
                const firstItem={title:first.name,key:String(first.urResourceId)};
                sessionStorage.setItem("firstItem", JSON.stringify(firstItem)); 
                for(var i=0;i<menus.length;i++){
                	if (menus[i].urResourceId == 200000) {
    				          menus[i].type = 'order'
    				       }else if (menus[i].urResourceId == 300000){
    				          menus[i].type = 'goods'
    				       }else if (menus[i].urResourceId == 400000){
    				          menus[i].type = 'operation'
    				       }else if (menus[i].urResourceId == 700000){
    				          menus[i].type = 'datacenter'
    				       }else if (menus[i].urResourceId == 500000){
    				          menus[i].type = 'wsn'
    				       }else if (menus[i].urResourceId == 600000){
    				          menus[i].type = 'account'
    				       }
                }
                yield put({   
                    type: 'menulist',
                    payload:menus
                });
            }else{
                 message.error(result.message);
            }   
        }, 


  },
  subscriptions: {
  	    setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/home') {
                     dispatch({ type: 'fetch', payload: {code:'qerp.web.bs.menu',values:null}})
                    
                }
            });
        },
    },
};
