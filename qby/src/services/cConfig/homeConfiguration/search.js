import ajax from '../../../utils/req.js'

export function savePicApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.module.search.save',
      data:values
  })
}
