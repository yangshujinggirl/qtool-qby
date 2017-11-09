import Cgorder from '../constants/cgorder/cgorder';
import Ctorder from '../constants/ctorder/ctorder';
import Sporder from '../constants/sporder/sporder';



const commnect=[
	{key:'201000',title:'门店订单',content:<Cgorder/>},
	{key:'202000',title:'采购订单',content:<Ctorder/>},
	{key:'203000',title:'退货订单',content:'退货订单'},
	{key:'204000',title:'采退订单',content:'采退订单'},
	{key:'205000',title:'pos订单',content:'a'},

	{key:'301000',title:'商品管理',content:'a'},
	{key:'301700',title:'商品库存',content:'a'},
	{key:'302000',title:'分类管理',content:'a'},
	{key:'303000',title:'品牌管理',content:'a'},
	{key:'304000',title:'规格管理',content:'a'},
	{key:'305000',title:'商品定时',content:'a'},

	{key:'402500',title:'会员管理',content:'a'},
	{key:'401000',title:'充值管理',content:'a'},
	{key:'402000',title:'收支管理',content:'a'},
	{key:'403000',title:'门店管理',content:'a'},
	{key:'405000',title:'供应商管理',content:'a'},
	{key:'404000',title:'Banner管理',content:'a'},

	{key:'701000',title:'销售管理',content:'a'},
	{key:'701200',title:'门店销售',content:'a'},
	{key:'701500',title:'库存数据',content:'a'},
	{key:'701700',title:'门店库存',content:'a'},
	{key:'702000',title:'成本管理',content:'a'},
	{key:'702500',title:'采购数据',content:'a'},
	{key:'703000',title:'门店数据',content:'a'},

	{key:'601000',title:'Q本营账号',content:'a'}
	
]
export function isClickcom(key) {
		console.log(key)
  		const result=commnect.filter(function(item){
  			return item.key == key
  		})
  		return result[0]
	}