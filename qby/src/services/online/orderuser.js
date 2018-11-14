import ajax from '../../utils/req.js';

//待审核列表
export function dismissAuditApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ec.od.userOrder.reject',
      data:values
  })
}
