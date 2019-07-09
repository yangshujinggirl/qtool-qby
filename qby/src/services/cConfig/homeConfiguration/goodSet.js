import ajax from "../../../utils/req.js";

//info
export function getTimeListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.timeslot.query',
      data:values
  })
}