import ajax from '../../utils/req.js'

//app数据
export function getAppBaseApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.rp.qtoolsApp.data',
      data:values
  })
}
