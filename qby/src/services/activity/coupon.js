import ajax from '../../utils/req.js'

//优惠券列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ac.coupon.query',
      data:values
  })
}
//创建优惠券保存
export function addCouponApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ac.coupon.save',
      data:values
  })
}
//确定注券
export function InjectCouponApi(values){
  values = JSON.stringify(values);
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ac.coupon.create',
      data:values
  });
}
//优惠券详情
export function couponInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ac.coupon.detail',
      data:values
  })
}
//熔断优惠券
export function fuseCouponApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ac.coupon.break',
      data:values
  })
}
//注券记录
export function InjectRecordApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ac.couponRecond.query',
      data:values
  })
}
//券包列表
export function getManageListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ac.coupon.package.query',
      data:values
  })
}
//新建券包保存
export function addCouponPackApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ac.coupon.package.save',
      data:values
  })
}
//修改优惠券保存
export function updataCouponPackApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ac.coupon.update',
      data:values
  })
}
//指定品牌列表
export function getGoodTypeApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ac.coupon.brand.query',
      data:values
  })
}
//优惠券查询
export function getCouponInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ac.coupon.detail',
      data:values
  })
}
//商品查询
export function getCouponGoodInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ac.coupon.spuQuery',
      data:values
  })
}
//门店查询
export function getCouponShopInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ac.coupon.shopQuery',
      data:values
  })
}
//导出门店明细
export function exportMdApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sys.doc.task',
      data:values
  })
}
export function getSuppliApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.supplier.query',
      data:values
  })
}
