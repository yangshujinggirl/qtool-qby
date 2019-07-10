import ajax from "../../../utils/req.js";

//获取时间列表
export function getTimeListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.timeslot.query',
      data:values
  })
}
//新增时间段
export function addTimeApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.timeslot.save',
      data:values
  })
}
//删除时间段
export function deleteTimeApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.timeslot.remove',
      data:values
  })
}
//请求活动列表
export function getActivityListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.timesoltactivity.query',
      data:values
  })
}
//请求商品列表
export function getPdSpuListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.naspu.query',
      data:values
  })
}