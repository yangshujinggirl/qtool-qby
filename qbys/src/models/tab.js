import {isInArray} from '../utils/meth.js';
import {GetServerData} from '../services/services';
import {message} from 'antd';

export default {
    namespace: 'tab',
    state: {
  	    pane:[],
        activeKey:'',
        menus:[]
    },
    reducers: {
        //menu数据
        menulist(state, { payload: menus}) {
            return {...state,menus}
        },
        
        //刷新,第一次进入页面
        refresh(state, { payload:pannelfirst}) {
            var pane = eval(sessionStorage.getItem("pane"));
            var activeKey = sessionStorage.getItem('activeKey');
            if(pane==null & activeKey==null){
                //第一次进入页面
                pane=[]
                pane.push(pannelfirst)
                activeKey=pannelfirst.key
            }
            sessionStorage.setItem("pane", JSON.stringify(pane));
            sessionStorage.setItem("activeKey", activeKey);
            return {...state,pane,activeKey}
        },

        //新增tab
        addNewTab(state,{ payload:paneitem}){
            //判断是否是第一次
            var pane = eval(sessionStorage.getItem("pane"));
            var activeKey = sessionStorage.getItem('activeKey');
            const result=isInArray(pane,paneitem.key);
            if(!result){
                pane.push(paneitem)
            }
            activeKey=paneitem.key
            sessionStorage.setItem("pane", JSON.stringify(pane));
            sessionStorage.setItem("activeKey", activeKey);
            return {...state,pane,activeKey}
        },
        //删除tab
          delectArr(state,{ payload:targetKey}){
            var pane = eval(sessionStorage.getItem("pane"));
            var activeKey = sessionStorage.getItem('activeKey');
            pane = pane.filter(pane => pane.key !== targetKey)
            activeKey=pane[pane.length-1].key
            sessionStorage.setItem("pane", JSON.stringify(pane));
            sessionStorage.setItem("activeKey", activeKey);
            return {...state,pane,activeKey}
        }
            
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
                
                const pannelfirst={title:menus[0].children[0].name,key:String(menus[0].children[0].urResourceId)}
                yield put({   
                    type: 'menulist',
                    payload:menus
                });
                yield put({   
                    type: 'refresh',
                    payload:pannelfirst
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
