import ajax from '../../../utils/req.js'

//提现列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.answer.query',
      data:values
  })
}
//提现详情
export function getDetailApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.answer.detail',
      data:values
  })
}
