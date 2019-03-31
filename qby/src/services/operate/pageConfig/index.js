import ajax from '../../../utils/req.js'

//页面配置列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.configureId.list',
      data:values
  })
}
//新增页面保存
export function addPageApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.configureId.save',
      data:values
  })
}
//修改页面保存
export function updataPageApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.configureId.update',
      data:values
  })
}
