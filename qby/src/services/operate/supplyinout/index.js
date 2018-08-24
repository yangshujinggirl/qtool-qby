import ajax from '../../../utils/req.js'

//供应商收支列表
export function getListApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.settle.query',
      data:values
  })
}
//结算状态更改
export function changeStatusApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.settle.update',
      data:values
  })
}
