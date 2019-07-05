import ajax from "../../../utils/req.js";

//info
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.module.icon.query',
      data:values
  })
}
//保存
export function getSaveApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.module.banner.save',
      data:values
  })
}
export function getChangeFrameApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.module.iconr.change',
      data:values
  })
}
//模块保存
export function getSaveModuleApi(values) {
  values = JSON.stringify(values);
  return ajax.post("/webrest.htm", {
    code: "qerp.web.config.module.icon.setting",
    data: values
  });
}
