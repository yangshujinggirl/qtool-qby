import {GetServerData} from '../services/services';
import {  Button, message } from 'antd';
export default {
	namespace: 'goods',
	state: {
		fileDomain:'',
		pdCategorys:[],
		fileList: [],
		pdTypeslist:[],
		pdBrand:{},
		spuPics:[],
		pdBrandId:null,
		name:'',
		pdCategory1Id:null,
		pdCategory2Id:null,
		checkgood:[],
		limit:16,
		currentPage:0,
		total:0,
		goodslist:[],
		ishindok:false,
		changedatasouce:[],
		datasoucedata:[],
		pdBrands:[],
		pdCategoryslist:[],//分类list数据

		lotStatus:'0',
		expdays:null,
		lotType:null,
		lotLimitInDay:null,
		eventNew:true,
		eventHot:false,
		isDirectExpress:'0',
		isPresell:'0',
		//商品信息
		pdType1Id:null, //规格1的选择id
		pdType2Id:null, //规格2的选择id
		tag1:[],  //规格1的属性列表
		tag2:[],//规格2的属性列表
		isskus:false,   //是否有规格，即展现那个商品信息表
		initdatasouce:[],  //商品信息初始数据
		goodindodatasouce:[], //商品信息数据
		initisskus:false, //初始化数据状态,
		pdTypes:[],
		brandurl:''

	},
	reducers: {
		pdBrandslist(state, { payload:pdBrands}) {
			return {...state,pdBrands}
		},
		stocktableinfo(state, { payload:datasoucedata}) {
			return {...state,datasoucedata}
		},
		goodindodatasouce(state, { payload:goodindodatasouce}) {
			return {...state,goodindodatasouce}
		},


		stocktablechenge(state, { payload:changedatasouce}) {
			return {...state,changedatasouce}
		},
		stocktablechengeok(state, { payload:ishindok}) {
			return {...state,ishindok}
		},
		goodslist(state, { payload:{goodslist,total,limit,currentPage,fileDomain}}) {
			const checkgood=[]
			for(var i=0;i<goodslist.length;i++){
				if(goodslist[i].check){
					checkgood.push(goodslist[i].pdSpuId) 
				}
			}
			return {...state,goodslist,total,limit,currentPage,fileDomain,checkgood}
		},
		lotStatusstate(state, { payload:lotStatus}) {
			return {...state,lotStatus}
		},
		

		brandurl(state, { payload:brandurl}) {
			return {...state,brandurl}
		},
		isskus(state, { payload:isskus}) {
			return {...state,isskus}
		},
		infolist(state, { payload:{name,pdCategory1Id,pdCategory2Id,pdBrandId,spuPics,pdBrand,fileList,pdType1Id,pdType2Id,tag1,tag2,initdatasouce,goodindodatasouce,isskus,initisskus,lotStatus,expdays,lotType,lotLimitInDay,eventNew,eventHot,isDirectExpress,isPresell}}) {
			return {...state,name,pdCategory1Id,pdCategory2Id,pdBrandId,spuPics,pdBrand,fileList,pdType1Id,pdType2Id,tag1,tag2,initdatasouce,goodindodatasouce,isskus,initisskus,lotStatus,expdays,lotType,lotLimitInDay,eventNew,eventHot,isDirectExpress,isPresell}
		},
	
		uploads(state, { payload:spuPics}) {
			return {...state,spuPics}
		},
		pdTypeslists(state, { payload:pdTypeslist}) {
			return {...state,pdTypeslist}
		},
		pdCategorys(state, { payload:pdCategorys}) {
			return {...state,pdCategorys}
		},
		pdTypes(state, { payload:pdTypes}) {
			return {...state,pdTypes}
		},
		pdCategoryslist(state, { payload:pdCategoryslist}) {
			return {...state,pdCategoryslist}
		},
		//商品信息数据拼接
		infolists(state, { payload:{pdType1Id,pdType2Id,tag1,tag2,isskus,goodindodatasouce}}) {
			return {...state,pdType1Id,pdType2Id,tag1,tag2,isskus,goodindodatasouce}
		},

		tagslist(state, { payload:{tag1,tag2}}) {
		return {...state,tag1,tag2}
		},
	},
	effects: {
		*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const fileDomain=result.fileDomain;
				const goodslist = result.pdSpus;
				const limit=result.limit
				const currentPage=result.currentPage
				const total=result.total
				for(var i=0;i<goodslist.length;i++){
					goodslist[i].key=goodslist[i].barcode
					goodslist[i].check=false
					goodslist[i].list_img_name=[]
					if(goodslist[i].skuStatus==1){
						//多规格
						goodslist[i].list_img_name.push('../../assets/icon_skuStatus.png')
					}
					if(goodslist[i].infoStatus==0){
						//缺货
						goodslist[i].list_img_name.push('../../assets/icon_que.png')
					}
					if(goodslist[i].eventHot==true){
						//畅销
						goodslist[i].list_img_name.push('../../assets/icon_hot.png')
					}
					if(goodslist[i].eventNew==true){
						//上新
						goodslist[i].list_img_name.push('../../assets/icon_new.png')
					}
					if(goodslist[i].isDirectExpress==1){
						//直邮
						goodslist[i].list_img_name.push('../../assets/icon_zhi.png')
					}
					if(goodslist[i].isPresell==1){
						//预售
						goodslist[i].list_img_name.push('../../assets/icon_yu.png')
					}
			
				}
				yield put({type: 'goodslist',payload:{goodslist,total,limit,currentPage,fileDomain}});
			} 
			}, 
			*infofetch({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				console.log(result)
				if(result.code=='0'){
					const pdSpuinfo=result.pdSpu
					const fileDomain=result.fileDomain
					const {name,pdCategory1Id,pdCategory2Id,pdBrandId,spuIdPics,pdBrand,pdSkus,lotStatus,expdays,lotType,lotLimitInDay,eventNew,eventHot,isDirectExpress,isPresell}=pdSpuinfo
					//更新图片数据
					const spuPics=[]
					for(var i=0;i<spuIdPics.length;i++){
						spuPics.push(spuIdPics[i].url)
					}
					//更新图片展示
					const fileList=spuIdPics.slice(0)
					for(var i=0;i<fileList.length;i++){
						fileList[i].status='done'
						fileList[i].response={
							code:'0',
							data:[fileList[i].url,fileDomain]
						}
						fileList[i].url=fileDomain+fileList[i].url
					}
					
					//商品规格处理逻辑
					//判断数据表是上传表还是非上传表
					//得到初始select展示数据，
					//得到初始tag1和tag2
					//得到初始数据表数据
					var pdType1Id='00';
					var pdType2Id='00';
					const tag1=[]
					const tag2=[]
					const initdatasouce=[]
					var isskus=false
					var initisskus=false
					console.log(pdSkus)
					if(pdSkus==null || pdSkus==undefined || pdSkus.length<1){
						console.log(123)
						//没有规格
						const values={
							code:pdSpuinfo.code,
							barcode:pdSpuinfo.barcode,
							toBPrice:pdSpuinfo.toBPrice,
							toCPrice:pdSpuinfo.toCPrice,
							tagPrice:pdSpuinfo.tagPrice,
							costPrice:pdSpuinfo.costPrice,
							key:pdSpuinfo.pdSpuId,
							keys:'0000'
						}
						initdatasouce.push(values)
					}else{
						console.log(456)
						//有规格
						initisskus=true
						isskus=true
						pdType1Id=pdSkus[0].pdType1Id
						pdType2Id=pdSkus[0].pdType2Id==null?'00':pdSkus[0].pdType2Id
						for(var i=0;i<pdSkus.length;i++){
							tag1.push({name:pdSkus[i].pdType1Val.name,keys:pdSkus[i].pdType1Val.pdTypeValId})
							if(pdSkus[i].pdType2Val.name){
								tag2.push({name:pdSkus[i].pdType2Val.name,keys:pdSkus[i].pdType2Val.pdTypeValId})
							}
							initdatasouce.push({
								name:(pdSkus[i].pdType2Val==null || pdSkus[i].pdType2Val==undefined || pdSkus[i].pdType2Val=='') ?pdSkus[i].pdType1Val.name:pdSkus[i].pdType1Val.name+'/'+pdSkus[i].pdType2Val.name,
								code:pdSkus[i].code,
								barcode:pdSkus[i].barcode,
								toBPrice:pdSkus[i].toBPrice,
								toCPrice:pdSkus[i].toCPrice,
								tagPrice:pdSkus[i].tagPrice,
								costPrice:pdSkus[i].costPrice,
								picUrl:pdSkus[i].picUrl,
								key:pdSkus[i].pdSkuId,
								keys:(pdSkus[i].pdType2Val==null || pdSkus[i].pdType2Val==undefined || pdSkus[i].pdType2Val=='') ?pdSkus[i].pdType1Val.pdTypeValId:pdSkus[i].pdType1Val.pdTypeValId+pdSkus[i].pdType2Val.pdTypeValId
							})
						}
				
					}

					const goodindodatasouce=initdatasouce.slice(0)
					yield put({type: 'infolist',payload:{name,pdCategory1Id,pdCategory2Id,pdBrandId,spuPics,pdBrand,fileList,pdType1Id,pdType2Id,tag1,tag2,initdatasouce,goodindodatasouce,isskus,initisskus,lotStatus,expdays,lotType,lotLimitInDay,eventNew,eventHot,isDirectExpress,isPresell}});
					//根据id请求类型的opation
					const value={"parentId":pdCategory1Id,"getChildren":true,"enabled":true}
					yield put({type: 'captlistfetch',payload:{code:'qerp.web.pd.category.list',values:value}});
					
				} 
			}, 
			*getAsnFinish({ payload: {code,values} }, { call, put ,select}) {
				const valuedata = yield select(state => state.wsin.values);
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
					message.success('强制完成成功',.8)
					const initselectedRows=[]
					const initselectedRowKeys=[]
					yield put({type: 'select',payload:{initselectedRowKeys,initselectedRows}});
					yield put({type: 'fetch',payload:{code:'qerp.web.ws.asn.query',values:valuedata}});
				} 
			}, 
			*specsfetch({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				if(result.code=='0'){
					const pdTypes=result.pdTypes
					for(var i=0;i<pdTypes.length;i++){
						pdTypes[i].key=i
					}
					yield put({type: 'pdTypes',payload:pdTypes});
					
				} 
			}, 
			
			*captlistfetch({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				console.log(result)
				if(result.code=='0'){
					const pdCategorys=result.pdCategorys
					for(var i=0;i<pdCategorys.length;i++){
						pdCategorys[i].key=i
					}

					yield put({type: 'pdCategorys',payload:pdCategorys});
				} 
			}, 
			*pdTypeslist({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				console.log(result)
				if(result.code=='0'){
					const pdTypeslist=result.pdTypes
					yield put({type: 'pdTypeslists',payload:pdTypeslist});
				} 
			}, 
			


			*classfetch({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				console.log(result)
				if(result.code=='0'){
					const pdCategoryslist=result.pdCategorys
					for(var i=0;i<pdCategoryslist.length;i++){
						pdCategoryslist[i].childrens=pdCategoryslist[i].children
						delete pdCategoryslist[i].children
					}
					yield put({type: 'pdCategoryslist',payload:pdCategoryslist});
				} 
			}, 
			*brandfetch({ payload: {code,values} }, { call, put ,select}) {
				const result=yield call(GetServerData,code,values);
				yield put({type: 'tab/loding',payload:false});
				console.log(result)
				if(result.code=='0'){
					const pdBrands=result.pdBrands
					console.log(pdBrands)
					const fileDomain=result.fileDomain
					 yield put({type: 'pdBrandslist',payload:pdBrands});
					 yield put({type: 'IndexPage/fileDomain',payload:fileDomain});
					 
				} 
			},




			//selec和tag的变动走的程序
			*goodsinfoChange({ payload: {pdType1Ids,pdType2Ids,tag1s,tag2s} }, { call, put ,select}) {
				console.log(pdType1Ids)
				console.log(pdType2Ids)
				console.log(tag1s)
				console.log(tag2s)
				//得到更新后的数据
				var pdType1Id=pdType1Ids;
				var pdType2Id=pdType2Ids;
				var tag1=tag1s
				var tag2=tag2s
				var isskus=false
				var goodindodatasouce=[
					{
						code:null,
						barcode:null,
						toBPrice:null,
						toCPrice:null,
						tagPrice:null,
						costPrice:null,
						keys:'0000'
					}
				]
				
				//上传表
				if(pdType1Ids!='00' && tag1s.length>0){
					if(pdType2Ids=='00' || (pdType2Ids!='00' && tag2s.length>0)){
						console.log('shangchuan')
						//上传表
						isskus=true
						goodindodatasouce=[]
						console.log(tag1)
						console.log(tag2)
						if(tag2.length>0){
							for(var i=0;i<tag1.length;i++){
								for(var j=0;j<tag2.length;j++){
									goodindodatasouce.push({
										name:tag1[i].name+'/'+tag2[j].name,
										code:null,
										barcode:null,
										toBPrice:null,
										toCPrice:null,
										tagPrice:null,
										costPrice:null,
										picUrl:null,
										keys:tag1[i].keys+tag2[j].keys
									})
	
								}
							}

						}else{
							for(var i=0;i<tag1.length;i++){
									goodindodatasouce.push({
										name:tag1[i].name,
										code:null,
										barcode:null,
										toBPrice:null,
										toCPrice:null,
										tagPrice:null,
										costPrice:null,
										picUrl:null,
										keys:tag1[i].keys
									})
	
								
							}

						}




						
					}
				}

				console.log(goodindodatasouce)
				//最终数据和初始化数据对比，先对比状态，是初始化还是非初始化，如果状态相同，则对比里面数据
				const initdatasouce = yield select(state => state.goods.initdatasouce);
				const initisskus=yield select(state => state.goods.initisskus);
				if(initisskus==isskus){
					for(var i=0;i<initdatasouce.length;i++){
						for(var j=0;j<goodindodatasouce.length;j++){
							if(initdatasouce[i].keys==goodindodatasouce[j].keys){
								goodindodatasouce[j].name=initdatasouce[i].name
								goodindodatasouce[j].code=initdatasouce[i].code
								goodindodatasouce[j].barcode=initdatasouce[i].barcode
								goodindodatasouce[j].toBPrice=initdatasouce[i].toBPrice
								goodindodatasouce[j].toCPrice=initdatasouce[i].toCPrice
								goodindodatasouce[j].tagPrice=initdatasouce[i].tagPrice
								goodindodatasouce[j].costPrice=initdatasouce[i].costPrice
								goodindodatasouce[j].picUrl=initdatasouce[i].picUrl
								goodindodatasouce[j].keys=initdatasouce[i].keys
							}
						}
					}

				}



				yield put({type: 'infolists',payload:{pdType1Id,pdType2Id,tag1,tag2,isskus,goodindodatasouce}});	









				

			
			}, 




			*delete({ payload: id }, { call, put ,select}) {
				yield put({type: 'tab/initDeletestate',payload:id});
				yield put({type: 'initstatus',payload:{}});
			},
			*newtags({ payload: {iallpdTypeVals,types} }, { call, put ,select}) {
				console.log(types)
				const tag1in = yield select(state => state.goods.tag1);
				const tag2in = yield select(state => state.goods.tag2);
				const pdType1Ids = yield select(state => state.goods.pdType1Id);
				const pdType2Ids = yield select(state => state.goods.pdType2Id);
				const tag1=tag1in.slice(0)
				const tag2=tag2in.slice(0)
				console.log(tag1)
				console.log(tag2)
				console.log(iallpdTypeVals)


				if(types=='1'){
					tag1.push(iallpdTypeVals)
				}
				if(types=='2'){
					tag2.push(iallpdTypeVals)
				}
				console.log(tag1)
				console.log(tag2)
				const tag1s=tag1
				const tag2s=tag2


				yield put({type: 'tagslist',payload:{tag1,tag2}});
				yield put({type: 'goodsinfoChange',payload:{pdType1Ids,pdType2Ids,tag1s,tag2s}});

			},



	}
};
