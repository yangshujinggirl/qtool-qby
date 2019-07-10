import ajax from "../../../utils/req.js";

//info
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.multilineSpu.query',
      data:values
  })
}
//保存
export function getSaveApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.multilineSpu.save',
      data:values
  })
}
//导入
export function getExportApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.mulitilinespu.import',
      data:values
  })
}
