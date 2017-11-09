import {isInArray} from '../utils/meth.js';
import {isInArrayMatchName} from '../utils/meth.js';
import {GetServerData} from '../services/services';
import { isClickcom } from '../utils/matching';
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
            console.log(paneitem)
            var pane = eval(sessionStorage.getItem("pane"));
            var activeKey = sessionStorage.getItem('activeKey');
            const result=isInArray(pane,paneitem.key);
            if(!result){
                pane.push(paneitem)
            }
            activeKey=paneitem.key
            console.log(pane)
            console.log(activeKey)
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
        },
        //增加子标签
        addChildrenTab(state,{ payload:tabName}){
            var pane = eval(sessionStorage.getItem("pane"));
            var activeKey = sessionStorage.getItem('activeKey');
            const result=isInArrayMatchName(pane,tabName);
            if(!result){
                pane.forEach(function(value, index, array){//在有子类存在的情况下
                  //删除子类，在父亲后添加新的子类
                  if (value.key.indexOf(activeKey) != -1 && value.key!=activeKey) {
                      pane.splice(index,1,{'title':tabName,'key':activeKey+'new'});
                  }else{//在没有子类存在的情况下
                    //在父亲后添加子类
                      if(value.key == activeKey){
                        pane.splice(index+1,0,{'title':tabName,'key':activeKey+'new'});
                      }
                  }
                });
                console.log(pane);
            }
            activeKey=activeKey+'new';
            sessionStorage.setItem("pane", JSON.stringify(pane));
            sessionStorage.setItem("activeKey", activeKey);
            return {...state,pane,activeKey}
           // let pane = eval(sessionStorage.getItem("pane"));
           // let activeKey = sessionStorage.getItem('activeKey');
           // pane.forEach(function(value, index, array) {
           //    if(value.key == activeKey){
           //      value.children = [];
           //      value.children.push({'title':tabName,'key':value.key+'new'});
           //      activeKey = value.key+'new';
           //    }
           //  });
           // console.log(pane);
           // sessionStorage.setItem("pane",JSON.stringify(pane));
           // sessionStorage.setItem("activeKey", activeKey)
           // return {...state,pane,activeKey}
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
                 const pannelfirst=isClickcom(String(menus[0].children[0].urResourceId))
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
