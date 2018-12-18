import ajax from '../../../utils/req.js';

//待审核退单列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.order.return.audited.query',
      data:values
  })
}

//审核
export function auditApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.pd.order.return.audited',
      data:values
  })
}
