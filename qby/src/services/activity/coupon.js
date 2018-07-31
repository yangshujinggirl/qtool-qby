import ajax from '../../utils/req.js'

//优惠券列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.coupon.query',
      data:values
  })
}
//创建优惠券保存
export function addCouponApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.coupon.save',
      data:values
  })
}
//确定注券
export function InjectCouponApi(values){
  values = JSON.stringify(values);
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.coupon.create',
      data:values
  });
}
//优惠券详情
export function couponInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.coupon.detail',
      data:values
  })
}
//熔断优惠券
export function fuseCouponApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.coupon.break',
      data:values
  })
}
