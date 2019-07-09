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
