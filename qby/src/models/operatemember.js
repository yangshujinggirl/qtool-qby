import {GetServerData} from '../services/services';
export default {
    namespace: 'operatemember',
    state: {
        values:{},
        limit:15,
        currentPage:0,
        total:0,
        tableList:[],
        cardtitle:null,
        cardlist:[],
        details:[],
        delimit:15,
        decurrentPage:0,
        detotal:0

    },
    reducers: {
					synchronous(state, { payload:values}) {
						return {...state,values}
					},
					syncTableList(state, { payload:{tableList,total,limit,currentPage}}) {
						return {...state,tableList,total,limit,currentPage}
            },
            cardInfoslist(state, { payload:{cardtitle,cardlist}}) {
                return {...state,cardtitle,cardlist}
            },
            details(state, { payload:{details,delimit,decurrentPage,detotal}}) {
                return {...state,details,delimit,decurrentPage,detotal}
            },
    },
    effects: {
        *fetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
            yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
								const tableList = result.mbCards;
								for(var i=0;i<tableList.length;i++){
									tableList[i].key=tableList[i].mbCardId;
								}
                const limit=result.limit;
                const currentPage=result.currentPage;
                const total=result.total;
                yield put({type: 'syncTableList',payload:{tableList,total,limit,currentPage}});
            } 
        },
        *infofetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
                yield put({type: 'tab/loding',payload:false});
                if(result.code=='0'){
                    const cardInfos=result.cardInfo
                    const birthday=result.cardInfo.birthday
                    const birthdaylist=[]
                    for(var i=0;i<birthday.length;i++){
                        if(i==0){
                            birthdaylist.push({
                                lable:'宝宝生日',
                                text:birthday[i].date+'【'+birthday[i].typeStr+'】'
                            })
                        }else{
                            birthdaylist.push({
                                lable:'宝宝生日'+i,
                                text:birthday[i].date+'【'+birthday[i].typeStr+'】'
                            })
                        }
                    }
                    const cardtitle='会员信息'
                    const cardlist1=[
                        {lable:'会员姓名', text:cardInfos.name},
                        {lable:'会员卡号', text:cardInfos.cardNo},
                        {lable:'会员手机', text:cardInfos.mobile},
                        {lable:'会员级别', text:cardInfos.levelStr}
                    ]
                    const cardlist2=[
                        {lable:'账户余额', text:cardInfos.amount},
                        {lable:'会员积分', text:cardInfos.point},
                        {lable:'30日消费总金额', text:cardInfos.amountSum},
                        {lable:'30日消费次数', text:cardInfos.timeSum},
                        {lable:'开卡时间', text:cardInfos.createTime},
                        {lable:'最近使用时间', text:cardInfos.recentTime}
                    ]

                    const cardlist=cardlist1.concat(birthdaylist,cardlist2)
                yield put({type: 'cardInfoslist',payload:{cardtitle,cardlist}});
            } 
        },
        *detailfetch({ payload: {code,values} }, { call, put ,select}) {
            const result=yield call(GetServerData,code,values);
                yield put({type: 'tab/loding',payload:false});
                if(result.code=='0'){
                    const details=result.details
                    const delimit=result.details
                    const decurrentPage=result.currentPage
                    const detotal=result.total
                    yield put({type: 'details',payload:{details,delimit,decurrentPage,detotal}});
            } 
        },



  	},
  	subscriptions: {},
};
