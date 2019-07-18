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
//根据商品id或code查询
export function getSearchIdApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.app.slspu.query',
      data:values
  })
}
//商品配置保存
export function getSaveApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.naspu.save',
      data:values
  })
}
//商品模块保存
export function saveModuleApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.singleline.module.save',
      data:values
  })
}
//模块查询
export function getModuleApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.module.query',
      data:values
  })
}

//图片模块保存
export function getSavePicModuleApi(values) {
  values = JSON.stringify(values);
  return ajax.post("/webrest.htm", {
    code: "qerp.web.config.module.picture.setting",
    data: values
  });
}
//主题模块保存
export function getSaveTheModuleApi(values) {
  values = JSON.stringify(values);
  return ajax.post("/webrest.htm", {
    code: "qerp.web.config.module.theme.setting",
    data: values
  });
}