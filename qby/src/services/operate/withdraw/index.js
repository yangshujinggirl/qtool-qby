import ajax from '../../../utils/req.js'

//提现列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.carry.cash.query',
      data:values
  })
}
//提现详情
export function getDetailApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.carry.cash.detail',
      data:values
  })
}
//审核
export function checkApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.sp.carry.cash.save',
      data:values
  })
}
