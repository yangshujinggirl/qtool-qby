import ajax from "../../../utils/req.js";

//info
export function getInfoApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.homePage.config.content',
      data:values
  })
}
//保存
export function getStatusApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.module.hide',
      data:values
  })
}
//保存
export function getSearchGoodsApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.homePage.config.flowProduct',
      data:values
  })
}
