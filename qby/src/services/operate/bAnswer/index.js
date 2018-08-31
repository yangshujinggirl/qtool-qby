import ajax from '../../../utils/req.js'

//提现列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.answer.query',
      data:values
  })
}
//问答详情
export function getDetailApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.answer.detail',
      data:values
  })
}
//问答保存
export function getSaveApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.answer.save',
      data:values
  })
}
