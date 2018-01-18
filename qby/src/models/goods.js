function contains(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i].keys === obj) {
	      return true;
	    }
	  }
	  return false;
	}
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
	this.splice(index, 1);
	}
	};

import {GetServerData} from '../services/services';
import {  Button, message } from 'antd';
export default {
	namespace: 'goods',
	state: {
		values:{},
		limit:16,
		currentPage:0,
		total:0,
		checkgood:[],
		goodslist:[],//商品list
		goodpdCategorys:[],//商品分类
		pdCategorys:[],//商品类型
		pdTypeslist:[],//商品规格
		povisible:false,
		//商品编辑
		name:null,
		pdCategory1Id:[],
		pdCategory2Id:[],
		pdBrand:{},
		pdBrandId:null,
		lotStatus:'0',
		expdays:null,
		lotType:null,
		lotLimitInDay:null,
		eventNew:true,
		eventHot:false,
		isDirectExpress:'0',
		isPresell:'0',
		pdSpuInfo:[],
		shareType:'0',
		containerSpec:null,
		//商品信息
		pdType1Id:'00', //规格1的选择id
		pdType2Id:'00', //规格2的选择id
		tag1:[],  //规格1的属性列表
		tag2:[],//规格2的属性列表
		isskus:false,   //是否有规格，即展现那个商品信息表
		initdatasouce:[{
			code:null,
			barcode:null,
			toBPrice:null,
			toCPrice:null,
			tagPrice:null,
			costPrice:null,
			key:'0000',
			keys:'0000'
		}],  //商品信息初始数据
		goodindodatasouce:[{
			code:null,
			barcode:null,
			toBPrice:null,
			toCPrice:null,
			tagPrice:null,
			costPrice:null,
			key:'0000',
			keys:'0000'
		}], //商品信息数据
		initisskus:false, //初始化数据状态,
		
		//其他
		fileList: [],
		spuPics:[],
		methup:{}

	},
	reducers: {
		//初始化商品编辑
		initgoodedit(state, { payload:{}}) {
			const name=null
			const pdCategory1Id=[]
			const pdCategory2Id=[]
			const pdCategorys=[]
			const pdBrand={}
			const pdBrandId=null
			const spuPics=[]
			const pdType1Id='00'
			const pdType2Id='00'
			const tag1=[]
			const tag2=[]
			const goodindodatasouce=[]
			const initdatasouce=[]
			const lotStatus='0'
			const expdays=null
			const lotType=null
			const lotLimitInDay=null
			const eventNew=true
			const eventHot=false
			const isDirectExpress='0'
			const isPresell='0'
			const pdSpuInfo=[]
			const fileList=[]
			const shareType='0'
			const containerSpec=null


			return {...state,name,pdCategory1Id,pdCategory2Id,pdCategorys,pdBrand,pdBrandId,spuPics,pdType1Id,pdType2Id,tag1,tag2,goodindodatasouce,initdatasouce,lotStatus,expdays,lotType,lotLimitInDay,eventNew,eventHot,isDirectExpress,isPresell,pdSpuInfo,fileList,shareType,containerSpec}
		},
		//商品list
		goodslist(state, { payload:{goodslist,total,limit,currentPage}}) {
			const checkgood=[]
			for(var i=0;i<goodslist.length;i++){
				if(goodslist[i].check){
					checkgood.push(goodslist[i].pdSpuId) 
				}
			}
			return {...state,goodslist,total,limit,currentPage,checkgood}
		},
		//同步value
		synchronous(state, { payload:values}) {
			return {...state,values}
		},
		//商品分类
		goodpdCategorys(state, { payload:goodpdCategorys}) {
			return {...state,goodpdCategorys}
		},
		//商品规格
		pdTypeslists(state, { payload:pdTypeslist}) {
			return {...state,pdTypeslist}
		},
		//商品编辑信息
		infolist(state, { payload:{name,pdCategory1Id,pdCategory2Id,pdBrandId,spuPics,pdBrand,fileList,pdType1Id,pdType2Id,tag1,tag2,initdatasouce,goodindodatasouce,isskus,initisskus,lotStatus,expdays,lotType,lotLimitInDay,eventNew,eventHot,isDirectExpress,isPresell,pdSpuInfo,shareType,containerSpec}}) {
			return {...state,name,pdCategory1Id,pdCategory2Id,pdBrandId,spuPics,pdBrand,fileList,pdType1Id,pdType2Id,tag1,tag2,initdatasouce,goodindodatasouce,isskus,initisskus,lotStatus,expdays,lotType,lotLimitInDay,eventNew,eventHot,isDirectExpress,isPresell,pdSpuInfo,shareType,containerSpec}
		},
		//商品类型
		pdCategorys(state, { payload:pdCategorys}) {
			return {...state,pdCategorys}
		},
		//商品类型id
		pdCategory2Id(state, { payload:pdCategory2Id}) {
			return {...state,pdCategory2Id}
		},

		povisible(state, { payload:povisible}) {
			return {...state,povisible}
		},

		
		
		goodindodatasouce(state, { payload:goodindodatasouce}) {
			return {...state,goodindodatasouce}
		},
		
		pdBrandId(state, { payload:pdBrandId}) {
			return {...state,pdBrandId}
		},

		methup(state, { payload:methup}) {
			return {...state,methup}
		},

		
		lotStatusstate(state, { payload:lotStatus}) {
			return {...state,lotStatus}
		},
		

		
		isskus(state, { payload:isskus}) {
			return {...state,isskus}
		},

		pdSpuInfo(state, { payload:pdSpuInfo}) {
			return {...state,pdSpuInfo}
		},
		
	
		uploads(state, { payload:spuPics}) {
			return {...state,spuPics}
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
		//search
		*fetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				// const fileDomain=result.fileDomain;
				var goodslist = result.pdSpus;
				const limit=result.limit
				const currentPage=result.currentPage
				const total=result.total


				if(goodslist==null || goodslist==undefined || goodslist.length==0){
					goodslist=[]
				}else{
					for(var i=0;i<goodslist.length;i++){
						goodslist[i].key=goodslist[i].barcode
						goodslist[i].check=false
						goodslist[i].list_img_name=[]
						if(goodslist[i].skuStatus==1){
							//多规格
							goodslist[i].list_img_name.push('icon_skuStatus.png')
						}
						if(goodslist[i].infoStatus==0){
							//缺货
							goodslist[i].list_img_name.push('icon_que.png')
						}
						if(goodslist[i].eventHot==true){
							//畅销
							goodslist[i].list_img_name.push('icon_hot.png')
						}
						if(goodslist[i].eventNew==true){
							//上新
							goodslist[i].list_img_name.push('icon_new.png')
						}
						if(goodslist[i].isDirectExpress==1){
							//直邮
							goodslist[i].list_img_name.push('icon_zhi.png')
						}
						if(goodslist[i].isPresell==1){
							//预售
							goodslist[i].list_img_name.push('icon_yu.png')
						}
				
					}
				}

				
				yield put({type: 'goodslist',payload:{goodslist,total,limit,currentPage}});
			} 
		}, 
		//商品分类
		*categoryfetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
            if(result.code=='0'){
				const goodpdCategorys=result.pdCategorys
              	yield put({type: 'goodpdCategorys',payload:goodpdCategorys});
            } 
		}, 
		//商品规格
		*pdTypeslist({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const pdTypeslist=result.pdTypes
				yield put({type: 'pdTypeslists',payload:pdTypeslist});
			} 
		}, 
		//商品类型
		*captlistfetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const pdCategorys=result.pdCategorys
				for(var i=0;i<pdCategorys.length;i++){
					pdCategorys[i].key=i
				}

				yield put({type: 'pdCategorys',payload:pdCategorys});
			} 
		}, 
		
		//商品编辑
		*infofetch({ payload: {code,values} }, { call, put ,select}) {
			const result=yield call(GetServerData,code,values);
			yield put({type: 'tab/loding',payload:false});
			if(result.code=='0'){
				const pdSpuinfos=result.pdSpu
				const fileDomain=result.fileDomain
				const {name,pdCategory1Id,pdCategory2Id,pdBrandId,spuIdPics,pdBrand,pdSkus,lotStatus,expdays,lotType,lotLimitInDay,eventNew,eventHot,isDirectExpress,isPresell,shareType,containerSpec}=pdSpuinfos
				const pdSpuInfo=eval(pdSpuinfos.pdSpuInfo)
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
				if(pdSkus==null || pdSkus==undefined || pdSkus.length<1){
					//没有规格
					const values={
						code:pdSpuinfos.code,
						barcode:pdSpuinfos.barcode,
						toBPrice:pdSpuinfos.toBPrice,
						toCPrice:pdSpuinfos.toCPrice,
						tagPrice:pdSpuinfos.tagPrice,
						costPrice:pdSpuinfos.costPrice,
						key:pdSpuinfos.pdSpuId,
						keys:'0000'
					}
					initdatasouce.push(values)
				}else{	
					//有规格
					initisskus=true
					isskus=true
					pdType1Id=pdSkus[0].pdType1Id
					pdType2Id=pdSkus[0].pdType2Id==null?'00':pdSkus[0].pdType2Id
					for(var i=0;i<pdSkus.length;i++){
						//如果id不在
						const sd=contains(tag1,pdSkus[i].pdType1Val.pdTypeValId)
						if(!sd){
							tag1.push({name:pdSkus[i].pdType1Val.name,keys:pdSkus[i].pdType1Val.pdTypeValId})
						}

						if(pdSkus[i].pdType2Val==null || pdSkus[i].pdType2Val==undefined ||  pdSkus[i].pdType2Val==''){
						}else{
							const sd2=contains(tag2,pdSkus[i].pdType2Val.pdTypeValId)
							if(!sd2){
								tag2.push({name:pdSkus[i].pdType2Val.name,keys:pdSkus[i].pdType2Val.pdTypeValId})
							}
							
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
							keys:(pdSkus[i].pdType2Val==null || pdSkus[i].pdType2Val==undefined || pdSkus[i].pdType2Val=='') ?pdSkus[i].pdType1Val.pdTypeValId:pdSkus[i].pdType1Val.pdTypeValId+pdSkus[i].pdType2Val.pdTypeValId,
							pdType1Id:pdSkus[i].pdType1Id,
							pdType1ValId:pdSkus[i].pdType1ValId,
							pdType2Id:pdSkus[i].pdType2Id,
							pdType2ValId:pdSkus[i].pdType2ValId,
							pdSkuId:pdSkus[i].pdSkuId
						})
					}
			
				}
				const setinitfileList = yield select(state => state.goods.methup.setinitfileList);
				setinitfileList(fileList)
				const goodindodatasouce=initdatasouce.slice(0)
				yield put({type: 'infolist',payload:{name,pdCategory1Id,pdCategory2Id,pdBrandId,spuPics,pdBrand,fileList,pdType1Id,pdType2Id,tag1,tag2,initdatasouce,goodindodatasouce,isskus,initisskus,lotStatus,expdays,lotType,lotLimitInDay,eventNew,eventHot,isDirectExpress,isPresell,pdSpuInfo,shareType,containerSpec}});
				//根据id请求类型的opation
				const value={"parentId":pdCategory1Id,"getChildren":true,"enabled":true}
				yield put({type: 'captlistfetch',payload:{code:'qerp.web.pd.category.list',values:value}});
				
			} 
		}, 
			//selec和tag的变动走的程序
			*goodsinfoChange({ payload: {pdType1Ids,pdType2Ids,tag1s,tag2s} }, { call, put ,select}) {
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
						//上传表
						console.log('上传表')
						console.log(tag1)
						isskus=true
						goodindodatasouce=[]
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
										keys:tag1[i].keys+tag2[j].keys,
										pdType1Id:pdType1Id,
										pdType1ValId:tag1[i].keys,
										pdType2Id:pdType2Id,
										pdType2ValId:tag2[j].keys


										
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
								goodindodatasouce[j].pdSkuId=initdatasouce[i].pdSkuId
								goodindodatasouce[j].pdType1Id=initdatasouce[i].pdType1Id
								goodindodatasouce[j].pdType1ValId=initdatasouce[i].pdType1ValId
								goodindodatasouce[j].pdType2Id=initdatasouce[i].pdType2Id
								goodindodatasouce[j].pdType2ValId=initdatasouce[i].pdType2ValId
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
				const tag1in = yield select(state => state.goods.tag1);
				const tag2in = yield select(state => state.goods.tag2);
				const pdType1Ids = yield select(state => state.goods.pdType1Id);
				const pdType2Ids = yield select(state => state.goods.pdType2Id);
				const tag1=tag1in.slice(0)
				const tag2=tag2in.slice(0)
				if(types=='1'){
					tag1.push(iallpdTypeVals)
				}
				if(types=='2'){
					tag2.push(iallpdTypeVals)
				}
				const tag1s=tag1
				const tag2s=tag2
				yield put({type: 'tagslist',payload:{tag1,tag2}});
				yield put({type: 'goodsinfoChange',payload:{pdType1Ids,pdType2Ids,tag1s,tag2s}});

			},
			*deletetags({ payload: {iallpdTypeVals,types} }, { call, put ,select}) {
				const tag1in = yield select(state => state.goods.tag1);
				const tag2in = yield select(state => state.goods.tag2);
				const pdType1Ids = yield select(state => state.goods.pdType1Id);
				const pdType2Ids = yield select(state => state.goods.pdType2Id);
				const tag1=tag1in.slice(0)
				const tag2=tag2in.slice(0)
				console.log(iallpdTypeVals)
				if(types=='1'){
					tag1.remove(iallpdTypeVals)
				}
				if(types=='2'){
					tag2.remove(iallpdTypeVals)
				}
				const tag1s=tag1
				const tag2s=tag2
				console.log(tag1)
				console.log(tag2s)
				yield put({type: 'tagslist',payload:{tag1,tag2}});
				yield put({type: 'goodsinfoChange',payload:{pdType1Ids,pdType2Ids,tag1s,tag2s}});

			},



	}
};
