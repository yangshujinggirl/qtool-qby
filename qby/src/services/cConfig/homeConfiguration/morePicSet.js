import ajax from "../../../utils/req.js";

//info
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.module.picture.query',
      data:values
  })
}
//保存
export function getSaveApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.module.picture.save',
      data:values
  })
}
