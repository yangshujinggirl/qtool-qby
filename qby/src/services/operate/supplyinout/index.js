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
//结算明细
export function billDetailsApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.settle.detail',
      data:values
  })
}
//修改结算日期
export function changeAccountApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.settle.update',
      data:values
  })
}
