import {GetServerData} from '../services/services';
export default {
    namespace: 'operateinout',
    state: {
        values:{},
        limit:15,
        currentPage:0,
        total:0,
        tableList:[],
    },
    reducers: {
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		syncTableList(state, { payload:{tableList,total,limit,currentPage}}) {
			return {...state,tableList,total,limit,currentPage}
        },
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
                console.log(result);
                const tableList = result.spMoneyDetails;
                const limit=result.limit;
                const currentPage=result.currentPage;
                const total=result.total;
                for(var i=0;i<tableList.length;i++){
                    tableList[i].key=tableList[i].outId;
                    if(tableList[i].type==21){
                        if(tableList[i].amount>0){
                            tableList[i].amount='订单费用：+'+tableList[i].amount
                        }else{
                            tableList[i].amount='订单费用：'+tableList[i].amount
                        }
                    }
                    if(tableList[i].type==22){
                        if(tableList[i].amount>0){
                            tableList[i].amount='物流费用：+'+tableList[i].amount
                        }else{
                            tableList[i].amount='物流费用：'+tableList[i].amount
                        }
                    }
                    if(tableList[i].type==24){
                        if(tableList[i].amount>0){
                            tableList[i].amount='取消退款：+'+tableList[i].amount
                        }else{
                            tableList[i].amount='取消退款：'+tableList[i].amount
                        }
                    }
                    if(tableList[i].type==11){
                        if(tableList[i].amount>0){
                            tableList[i].amount='充值金额：+'+tableList[i].amount
                        }else{
                            tableList[i].amount='充值金额：'+tableList[i].amount
                        }
                    }
                }
                yield put({type: 'syncTableList',payload:{tableList,total,limit,currentPage}});
            } 
        },
  	},
  	subscriptions: {},
};
