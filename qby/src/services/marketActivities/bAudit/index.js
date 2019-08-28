import ajax from '../../../utils/req.js';

//b端审核列表
export function getListApi(values) {
  values = JSON.stringify(values)
  return ajax.post('/webrest.htm',{
      code:'qerp.web.ec.od.auditOrder.query',
      data:values
  })
}