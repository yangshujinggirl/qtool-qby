import {isInArray} from '../utils/meth.js';

export default {
  namespace: 'tab',
  state: {
  	pane:[],
    activeKey:''
  },
  reducers: {
    //页面初次加载或点击侧边栏时操作
  	tablist(state, { payload:paneitem}) {
      let pane = eval(sessionStorage.getItem("pane"));
      let activeKey = sessionStorage.getItem('activeKey');
      if(!pane || pane.length == 0 ||pane[0]==null){
          pane=[];
          if(!paneitem){
            let firstList = sessionStorage.getItem("firstItem");
            let fi = JSON.parse(firstList);
            pane.push(fi);
            activeKey = fi.key;
          }else{
            const result=isInArray(pane,paneitem.key);
            if(!result){
              pane.push(paneitem);
            }
            activeKey = paneitem.key;
          }
      }else{
        if(paneitem){
          const result=isInArray(pane,paneitem.key);
          if(!result){
            pane.push(paneitem);
          }
          activeKey = paneitem.key;
        }else{
            activeKey = sessionStorage.getItem('activeKey');
        }
      }
      sessionStorage.setItem("pane", JSON.stringify(pane));
      sessionStorage.setItem("activeKey", activeKey);
      return {...state,pane,activeKey}
    },
    //删除tab标签操作
    delectArr(state,{ payload:targetKey}){
       const paneTemp = eval(sessionStorage.getItem("pane"));
       const pane = paneTemp.filter(pane => pane.key !== targetKey)
       sessionStorage.setItem("pane", JSON.stringify(pane));
       return {...state,pane}
    },
    changeActiveKey(state,{ payload:activeKey}){
       sessionStorage.setItem("activeKey", activeKey);
       return {...state,activeKey}
    }

  },
  effects: {},
  subscriptions: {
  	setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/home') {
                     dispatch({ type: 'tablist', payload:null})
                }
            });
        },
  },
};
