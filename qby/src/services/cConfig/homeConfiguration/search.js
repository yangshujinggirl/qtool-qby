import ajax from '../../../utils/req.js'

//搜索背景图保存
export function savePicApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.module.search.save',
      data:values
  })
}
export function searchPicApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.module.search.query',
      data:values
  })
}

