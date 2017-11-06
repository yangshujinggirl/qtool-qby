import {isInArray} from '../utils/meth.js';

export default {
  namespace: 'tab',
  state: {
  	pane:[]
  },
  reducers: {
  	tablist(state, { payload:paneitem}) {
        //var pane = eval(sessionStorage.getItem("pane"));
        // if(pane==null){
        //     panes=[]
        // }
        // if(paneitem==null){
        //     //刷新




        // }else{
        //     //新建


        // }


        // sessionStorage.setItem("pane", JSON.stringify(pane));
        // pane = eval(sessionStorage.getItem("pane"));
        // return {...state,pane}















        if(paneitem==null){
            var pane = eval(sessionStorage.getItem("pane"));
            if(pane==null){
                pane=[]
                // pane.push(paneitem)
                sessionStorage.setItem("pane", JSON.stringify(pane));
                pane = eval(sessionStorage.getItem("pane"));
            }
            return {...state,pane}
        }else{
            var pane = eval(sessionStorage.getItem("pane"));
            if(pane==null){
                pane=[]
                pane.push(paneitem)
            }else{
            //判断当前的tab是否存在在数组中，如果存在，则不添加，设置当前的为active,如果不存在则添加,设置当前的为active
            console.log(isInArray)
            const result=isInArray(pane,paneitem.key)
            console.log(result)
            if(result){

            }else{
                pane.push(paneitem)
            }
        }
        sessionStorage.setItem("pane", JSON.stringify(pane));
        var pane = eval(sessionStorage.getItem("pane"));
        return {...state,pane}


        }

        
    },

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
