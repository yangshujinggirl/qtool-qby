import ajax from '../../../utils/req.js'

//主题活动列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.theme.activity.list',
      data:values
  })
}
//新增主题
export function addThemeApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.theme.activity.save',
      data:values
  })
}
//主题活动强制失效
export function forceInvalidApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.theme.activity.invalid',
      data:values
  })
}
