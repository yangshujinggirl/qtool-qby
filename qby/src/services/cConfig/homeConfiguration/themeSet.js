import ajax from '../../../utils/req.js'

export function searchThemeApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.module.theme.query',
      data:values
  })
}