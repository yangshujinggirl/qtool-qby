import {isInArray} from '../utils/meth.js';
import {GetServerData} from '../services/services';

export default {
    namespace: 'tab',
    state: {
  	    pane:[],
        activeKey:'',
        menus:[],
        loding:false,
        openkeys:[]
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
            var openkeys = eval(sessionStorage.getItem("openkeys"));
            console.log(openkeys)
            if(pane==null & activeKey==null & openkeys==null){
                //第一次进入页面
                pane=[]
                pane.push(pannelfirst)
                activeKey=pannelfirst.key
                openkeys=['0']
            }
            sessionStorage.setItem("pane", JSON.stringify(pane));
            sessionStorage.setItem("activeKey", activeKey);
            sessionStorage.setItem("openkeys", JSON.stringify(openkeys));
            return {...state,pane,activeKey,openkeys}
        },
        //新增tab
        addNewTab(state,{ payload:paneitem}){
            //判断当前key是否是二级，还要知道他的父亲的key
            // 规则：判断key中字符串中是否有‘edit’,如果存在则是二级，如果不存在则是一级，当时二级的时候父亲是edit前面的字符串
            // key的命名规则：一级key+edit+id
            var pane = eval(sessionStorage.getItem("pane"));
            var activeKey = sessionStorage.getItem('activeKey');
            const result=isInArray(pane,paneitem.key);
            if(!result){
                const itemkey=paneitem.key.search('edit')
                if(itemkey!=-1){
                    const parentkey=paneitem.key.substring(0,itemkey)
                    console.log(parentkey)
                    var index
                    for(var i=0;i<pane.length;i++){
                        if(pane[i].key==parentkey){
                            index=i
                        }
                     }
                     pane.splice(index+1,0,paneitem)
                }else{
                    pane.push(paneitem)
                }
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
        },
        //loding处理
        loding(state,{ payload:loding}){
            return {...state,loding}
        },
        openkeys(state,{ payload:openkeys}){
            sessionStorage.setItem("openkeys", JSON.stringify(openkeys));
            return {...state,openkeys}
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
                const pannelfirst={title:menus[0].children[0].name,key:String(menus[0].children[0].urResourceId),data:null,componkey:String(menus[0].children[0].urResourceId)}
                yield put({type: 'menulist',payload:menus});
                yield put({type: 'refresh',payload:pannelfirst});
                yield put({type: 'loding',payload:false});
            } 
        },
        //删除前初始化state
        *initDeletestate({ payload: targetKey }, { call, put }) {
            var pane = eval(sessionStorage.getItem("pane"));
            const paneitem=pane.find((pane)=>{
                return pane.key==targetKey
            })
            console.log(paneitem)
            if(paneitem.componkey=='601000edit'){
                yield put({type: 'account/initState',payload:{}});
            }

            yield put({type: 'delectArr',payload:targetKey});
        },

        //新增前的处理事项
        *firstAddTab({ payload: paneitem }, { call, put }) {
            const pane = eval(sessionStorage.getItem("pane"));
            const result=isInArray(pane,paneitem.key);
            if(!result){
                const itemkey=paneitem.key.search('edit')
                if(itemkey!=-1){
                    const arr1=pane.filter((pane)=>{
                        return pane.key.substring(0,10)==paneitem.key.substring(0,10)
                    })
                   
                    if(arr1.length>0){
                        for(var i=0;i<arr1.length;i++){
                            yield put({type: 'initDeletestate',payload:arr1[i].key});
                        }
                    }
                    yield put({type: 'addNewTab',payload:paneitem});
    
                }else{
                    yield put({type: 'addNewTab',payload:paneitem});
                }

            }else{
                yield put({type: 'addNewTab',payload:paneitem});
            }
        }

    },
    subscriptions: {
  	    setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/home') {
                     dispatch({ type: 'fetch', payload: {code:'qerp.web.bs.menu',values:null}})
                     dispatch({ type: 'loding', payload:true})    
                }
            });
        }
    }
};
