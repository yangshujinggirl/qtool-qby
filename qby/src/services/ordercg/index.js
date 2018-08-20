import ajax from '../../utils/req.js'

//发票管理 拿取数据
export function getBillInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ws.invoice.query',
      data:values
  })
}

//发票管理 保存
export function saveBillInfoApi(values){
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ws.invoice.save',
      data:values
  })
}
