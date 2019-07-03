import ajax from '../../utils/req.js'

export function getInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.config.module.search.save',
      data:values
  })
}
