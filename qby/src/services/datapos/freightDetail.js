import ajax from '../../utils/req.js'

//提现列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.app.deliveryfee.query',
      data:values
  })
}
