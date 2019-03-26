import ajax from '../utils/req.js'
//根据门店ID获取商品信息
export function getShopInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.shop.info',
      data:values
  })
}

//根据商品编码获取商品信息
export function getGoodInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.spu.list',
      data:values
  })
}
