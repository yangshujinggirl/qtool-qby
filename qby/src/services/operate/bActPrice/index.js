import ajax from '../../../utils/req.js'

//b活动进价列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.activity.query',
      data:values
  })
}
//强制失效
export function confirmCancelApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.activity.invalid',
      data:values
  })
}
//详情
export function getInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.activity.detail',
      data:values
  })
}
//根据商品编码请求商品详情
export function getGoodInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.spu.list',
      data:values
  })
}
//新建保存
export function addGoodApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.activity.save',
      data:values
  })
}
//修改保存
export function updataGoodApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.activity.update',
      data:values
  })
}
