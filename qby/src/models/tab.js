import {isInArray} from '../utils/meth.js';
import {GetServerData} from '../services/services';


export default {
    namespace: 'tab',
    state: {
  	    pane:[],
        activeKey:'',
        menus:[],
        loding:false,
        openKey:[]
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
            var openKey = eval(sessionStorage.getItem("openKey"));
            if(pane==null & activeKey==null){
                //第一次进入页面
                pane=[]
                pane.push(pannelfirst)
                activeKey=pannelfirst.key
                openKey=[pannelfirst.openkey]
            };
            sessionStorage.setItem("pane", JSON.stringify(pane));
            sessionStorage.setItem("activeKey", activeKey);
            sessionStorage.setItem("openKey", JSON.stringify(openKey));
            return {...state,pane,activeKey,openKey}
        },
        //新增tab
        addNewTab(state,{ payload:{arr,NewactiveKey}}){
            var pane = eval(sessionStorage.getItem("pane"));
            var activeKey = sessionStorage.getItem('activeKey');
            pane = arr
            activeKey=NewactiveKey
            sessionStorage.setItem("pane", JSON.stringify(pane));
            sessionStorage.setItem("activeKey", activeKey);
            return {...state,pane,activeKey}
        },
        //删除tab
        delectArr(state,{ payload:targetKey}){
            //当前tab的index
            var pane = eval(sessionStorage.getItem("pane"));
            var activeKey = sessionStorage.getItem('activeKey');
            var index=0
            for(var i=0;i<pane.length;i++){
                if(pane[i].key==targetKey){
                    index=i
                }
            }
            if(index==0){
                activeKey=pane[1].key
            }else{
                activeKey=pane[(Number(index)-1)].key
            }
            pane = pane.filter(pane => pane.key !== targetKey);
            sessionStorage.setItem("pane", JSON.stringify(pane));
            sessionStorage.setItem("activeKey", activeKey);
            return {...state,pane,activeKey}
        },
        //loding处理
        loding(state,{ payload:loding}){
            return {...state,loding}
        },
        openkey(state,{ payload:key}){
            const openKey=key
            sessionStorage.setItem("openKey", JSON.stringify(openKey));
            return {...state,openKey}
        },
        //直接切
        tabover(state,{ payload:paneitem}){
            var pane = eval(sessionStorage.getItem("pane"));
            var activeKey = sessionStorage.getItem('activeKey');
            activeKey=paneitem.key
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

                /* ------展示不同的logo-------- */
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
                    }else if(menus[i].urResourceId == 1300000){
                        menus[i].type = 'online'
                    }else if(menus[i].urResourceId == 900000){
                        menus[i].type = 'cooperate'
                    }else if(menus[i].urResourceId == 1200000){
                        menus[i].type = 'activity'
                    }else if(menus[i].urResourceId == 1100000){
                        menus[i].type = 'server'
                    }else if(menus[i].urResourceId == 1400000){
                        menus[i].type = 'cConfig'
                    }
                }
                /* ------展示不同的logo-------- */

                const pannelfirst = {
                  title:menus[0].children[0].name,
                  key:String(menus[0].children[0].urResourceId),
                  data:{rolelists:menus[0].children[0].children},
                  componkey:String(menus[0].children[0].urResourceId),
                  openkey:String(menus[0].urResourceId)
                }
                yield put({type: 'menulist',payload:menus});
                yield put({type: 'refresh',payload:pannelfirst});
            }
        },
        //删除前初始化state
        *initDeletestate({ payload: targetKey }, { call, put }) {
            if(targetKey=='30000'){
                yield put({type: 'postcheck/initstate',payload:{}});
            }
            if(targetKey=='40000'){
                const data=[]
                yield put({type: 'wspost/tabledata',payload:data});
            }
            yield put({type: 'delectArr',payload:targetKey});
        },

        //新增前的处理事项
        *firstAddTab({ payload: paneitem }, { call, put }) {
            const pane = eval(sessionStorage.getItem("pane"));
            const activeKey = sessionStorage.getItem('activeKey');
            const result=isInArray(pane,paneitem.key);
            if(!result){
                const itemkey=paneitem.key.search('edit');
                if(itemkey!=-1){
                    //二级
                    const arr=pane.filter((pane)=>{
                        const pankeyindex=pane.key.search('edit')
                        return pane.key.substring(0,pankeyindex)!=paneitem.key.substring(0,itemkey)
                    })
                    const parentkey=paneitem.key.substring(0,itemkey)
                    var index
                    for(var i=0;i<arr.length;i++){
                        if(arr[i].key==parentkey){
                            index=i
                        }
                    }
                    arr.splice(index+1,0,paneitem)
                    const NewactiveKey=paneitem.key
                    yield put({type: 'addNewTab',payload:{arr,NewactiveKey}});

                }else{
                    //不是二级
                    pane.push(paneitem)
                    const arr=pane
                    const NewactiveKey=paneitem.key
                    yield put({type: 'addNewTab',payload:{arr,NewactiveKey}});
                }
            }else{
                //已经存在直接切回去
                yield put({type: 'tabover',payload:paneitem});
            };
        }

    },
    subscriptions: {
  	    setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/home') {
                     dispatch({ type: 'fetch', payload: {code:'qerp.web.bs.menu',values:null}})
                }
            });
        }
    }
};
