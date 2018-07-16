
import {getListApi} from '../services/cooperate/marketResource'
export default {
    namespace: 'marketResource',
    state:{
        dataList:[]
    },
    reducer:{},
    effects:{
        *fetchList({payload:{values} },{call, put}) {
            const result =  yield call( getListApi,values );
            if(result.code == '0'){

            }
        }
    },
}
